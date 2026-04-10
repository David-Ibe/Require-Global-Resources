"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slugify";
import type {
  OrderRow,
  PricingOption,
  ProductRow,
  ReviewRow
} from "@/lib/supabase/types";

type Tab = "overview" | "products" | "orders" | "reviews" | "analytics";

const STATUS_OPTIONS = [
  "pending",
  "paid",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled"
] as const;

const statusClass: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-900",
  paid: "bg-emerald-100 text-emerald-900",
  confirmed: "bg-blue-100 text-blue-900",
  shipped: "bg-purple-100 text-purple-900",
  delivered: "bg-green-100 text-green-900",
  cancelled: "bg-red-100 text-red-900"
};

const CATEGORIES = ["Car Accessories", "Smart Home", "Bundle Deal"] as const;
const BADGES = ["", "HOT SELLER", "NEW", "BEST VALUE"] as const;

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [
    keys.join(","),
    ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);

  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const [analyticsDays, setAnalyticsDays] = useState<7 | 30 | 90>(30);

  const [productModal, setProductModal] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);

  const [reviewModal, setReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewRow | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, o, r] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("reviews").select("*").order("created_at", { ascending: false })
      ]);
      if (p.data) setProducts(p.data as ProductRow[]);
      if (o.data) setOrders(o.data as OrderRow[]);
      if (r.data) setReviews(r.data as ReviewRow[]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  const overview = useMemo(() => {
    const revenue = orders.reduce((sum, o) => {
      const n = Number.parseInt(String(o.package_price).replace(/[^\d]/g, ""), 10);
      const qty = typeof o.quantity === "number" && o.quantity > 0 ? o.quantity : 1;
      return sum + (Number.isFinite(n) ? n * qty : 0);
    }, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    const active = products.filter((p) => p.active).length;
    return { totalOrders: orders.length, revenue, pending, active };
  }, [orders, products]);

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (orderFilter !== "all") {
      list = list.filter((o) => o.status === orderFilter);
    }
    const q = orderSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(q) ||
          o.phone.replace(/\D/g, "").includes(q.replace(/\D/g, ""))
      );
    }
    return list;
  }, [orders, orderFilter, orderSearch]);

  const analyticsCutoff = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - analyticsDays);
    return d;
  }, [analyticsDays]);

  const analyticsOrders = useMemo(
    () => orders.filter((o) => new Date(o.created_at) >= analyticsCutoff),
    [orders, analyticsCutoff]
  );

  const dailyOrders = useMemo(() => {
    const map = new Map<string, { date: string; orders: number; revenue: number }>();
    for (let i = analyticsDays - 1; i >= 0; i--) {
      const day = addDays(new Date(), -i);
      const key = day.toISOString().slice(0, 10);
      map.set(key, { date: key, orders: 0, revenue: 0 });
    }
    analyticsOrders.forEach((o) => {
      const key = o.created_at.slice(0, 10);
      if (!map.has(key)) {
        map.set(key, { date: key, orders: 0, revenue: 0 });
      }
      const row = map.get(key)!;
      row.orders += 1;
      const n = Number.parseInt(String(o.package_price).replace(/[^\d]/g, ""), 10);
      const qty = typeof o.quantity === "number" && o.quantity > 0 ? o.quantity : 1;
      row.revenue += Number.isFinite(n) ? n * qty : 0;
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [analyticsOrders, analyticsDays]);

  const ordersByState = useMemo(() => {
    const map = new Map<string, number>();
    analyticsOrders.forEach((o) => {
      map.set(o.state, (map.get(o.state) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [analyticsOrders]);

  const ordersByProduct = useMemo(() => {
    const map = new Map<string, number>();
    analyticsOrders.forEach((o) => {
      map.set(o.product_name, (map.get(o.product_name) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [analyticsOrders]);

  const ordersByStatus = useMemo(() => {
    const map = new Map<string, number>();
    analyticsOrders.forEach((o) => {
      map.set(o.status, (map.get(o.status) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [analyticsOrders]);

  const COLORS = ["#1246D6", "#F5A623", "#16A34A", "#DC2626", "#9333EA", "#64748B"];

  async function updateOrderStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    await load();
  }

  async function bulkOrderStatus(status: string) {
    if (!selectedOrders.size) return;
    const ids = Array.from(selectedOrders);
    await supabase.from("orders").update({ status }).in("id", ids);
    setSelectedOrders(new Set());
    await load();
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-[#08142A] p-4 text-white md:block">
        <p className="font-display text-xl tracking-wide">RGR ADMIN</p>
        <nav className="mt-8 flex flex-col gap-1">
          {(
            [
              ["overview", "📊 Overview"],
              ["products", "📦 Products"],
              ["orders", "🛒 Orders"],
              ["reviews", "⭐ Reviews"],
              ["analytics", "📈 Analytics"]
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-lg px-3 py-2 text-left text-sm ${
                tab === id ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <Link
          href="/admin/whatsapp-playbook"
          className="mt-6 block rounded-lg px-3 py-2 text-left text-sm text-white/90 ring-1 ring-white/20 hover:bg-white/10"
        >
          💬 WhatsApp sales playbook
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-8 w-full rounded-lg border border-white/30 py-2 text-sm"
        >
          Sign out
        </button>
      </aside>

      <nav className="flex shrink-0 border-b border-slate-200 bg-white px-2 py-2 md:hidden">
        {(
          [
            ["overview", "📊"],
            ["products", "📦"],
            ["orders", "🛒"],
            ["reviews", "⭐"],
            ["analytics", "📈"]
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex-1 rounded-lg py-2 text-center text-lg ${
              tab === id ? "bg-slate-100" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl tracking-wide text-[#08142A]">
            {tab === "overview" && "Overview"}
            {tab === "products" && "Products"}
            {tab === "orders" && "Orders"}
            {tab === "reviews" && "Reviews"}
            {tab === "analytics" && "Analytics"}
          </h1>
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/admin/whatsapp-playbook"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#1246D6]"
            >
              WhatsApp playbook
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : (
          <>
            {tab === "overview" ? (
              <div className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Total Orders</p>
                    <p className="mt-1 font-display text-3xl text-[#08142A]">
                      {overview.totalOrders}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Total Revenue (₦)</p>
                    <p className="mt-1 font-display text-3xl text-[#08142A]">
                      {overview.revenue.toLocaleString("en-NG")}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Pending Orders</p>
                    <p className="mt-1 font-display text-3xl text-[#08142A]">
                      {overview.pending}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Products Active</p>
                    <p className="mt-1 font-display text-3xl text-[#08142A]">
                      {overview.active}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="font-display text-xl text-[#08142A]">
                    Recent orders
                  </h2>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="py-2">Date</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 10).map((o) => (
                          <tr key={o.id} className="border-b border-slate-100">
                            <td className="py-2">
                              {new Date(o.created_at).toLocaleString("en-NG")}
                            </td>
                            <td>{o.customer_name}</td>
                            <td>{o.product_name}</td>
                            <td>
                              <span
                                className={`rounded px-2 py-0.5 text-xs ${statusClass[o.status] ?? "bg-slate-100"}`}
                              >
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTab("products");
                      setProductModal(true);
                      setEditing(null);
                    }}
                    className="rounded-xl bg-[#1246D6] px-6 py-3 font-display text-white"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("orders")}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-display"
                  >
                    View Pending Orders
                  </button>
                </div>
              </div>
            ) : null}

            {tab === "products" ? (
              <ProductsPanel
                products={products}
                onRefresh={load}
                onEdit={(p) => {
                  setEditing(p);
                  setProductModal(true);
                }}
                onAdd={() => {
                  setEditing(null);
                  setProductModal(true);
                }}
              />
            ) : null}

            {tab === "orders" ? (
              <OrdersPanel
                filteredOrders={filteredOrders}
                orderFilter={orderFilter}
                setOrderFilter={setOrderFilter}
                orderSearch={orderSearch}
                setOrderSearch={setOrderSearch}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                onStatusChange={updateOrderStatus}
                onBulkStatus={bulkOrderStatus}
                onExportCsv={() =>
                  downloadCsv(
                    `orders-${new Date().toISOString().slice(0, 10)}.csv`,
                    filteredOrders as unknown as Record<string, unknown>[]
                  )
                }
                statusClass={statusClass}
              />
            ) : null}

            {tab === "reviews" ? (
              <ReviewsPanel
                reviews={reviews}
                products={products}
                onRefresh={load}
                onEdit={(r) => {
                  setEditingReview(r);
                  setReviewModal(true);
                }}
                onAdd={() => {
                  setEditingReview(null);
                  setReviewModal(true);
                }}
              />
            ) : null}

            {tab === "analytics" ? (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {([7, 30, 90] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAnalyticsDays(d)}
                      className={`rounded-lg px-4 py-2 text-sm ${
                        analyticsDays === d
                          ? "bg-[#1246D6] text-white"
                          : "bg-white border border-slate-200"
                      }`}
                    >
                      {d} days
                    </button>
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="font-display text-lg text-[#08142A]">
                      Daily orders
                    </h3>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyOrders}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#1246D6"
                            name="Orders"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="font-display text-lg text-[#08142A]">
                      Revenue by day (₦)
                    </h3>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyOrders}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#F5A623"
                            name="Revenue"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
                    <h3 className="font-display text-lg text-[#08142A]">
                      Orders by state (top 10)
                    </h3>
                    <div className="mt-4 h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ordersByState}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="state" tick={{ fontSize: 10 }} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#1246D6" name="Orders" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="font-display text-lg text-[#08142A]">
                      By product
                    </h3>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ordersByProduct}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {ordersByProduct.map((_, i) => (
                              <Cell
                                key={i}
                                fill={COLORS[i % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="font-display text-lg text-[#08142A]">
                      By status
                    </h3>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ordersByStatus}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={2}
                          >
                            {ordersByStatus.map((_, i) => (
                              <Cell
                                key={i}
                                fill={COLORS[i % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </main>

      {productModal ? (
        <ProductFormModal
          editing={editing}
          onClose={() => setProductModal(false)}
          onSaved={() => {
            setProductModal(false);
            void load();
          }}
          slugify={slugify}
        />
      ) : null}

      {reviewModal ? (
        <ReviewFormModal
          editing={editingReview}
          products={products}
          onClose={() => setReviewModal(false)}
          onSaved={() => {
            setReviewModal(false);
            void load();
          }}
        />
      ) : null}
    </div>
  );
}

function ProductsPanel({
  products,
  onRefresh,
  onEdit,
  onAdd
}: {
  products: ProductRow[];
  onRefresh: () => void;
  onEdit: (p: ProductRow) => void;
  onAdd: () => void;
}) {
  const supabase = useMemo(() => createClient(), []);

  async function toggleActive(p: ProductRow) {
    await supabase.from("products").update({ active: !p.active }).eq("id", p.id);
    await onRefresh();
  }

  async function deleteProduct(p: ProductRow) {
    if (!confirm(`Delete ${p.name}?`)) return;
    await supabase.from("products").delete().eq("id", p.id);
    await onRefresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={onAdd}
        className="mb-4 rounded-xl bg-[#1246D6] px-6 py-3 font-display text-white"
      >
        Add New Product
      </button>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0] ?? "/og-default.svg"}
                    alt=""
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.current_price}</td>
                <td className="p-3">{p.stock_count}</td>
                <td className="p-3">
                  {p.active ? (
                    <span className="text-green-700">active</span>
                  ) : (
                    <span className="text-slate-500">inactive</span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    type="button"
                    className="text-[#1246D6] underline"
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-slate-600 underline"
                    onClick={() => void toggleActive(p)}
                  >
                    Toggle
                  </button>
                  <button
                    type="button"
                    className="text-red-600 underline"
                    onClick={() => void deleteProduct(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersPanel({
  filteredOrders,
  orderFilter,
  setOrderFilter,
  orderSearch,
  setOrderSearch,
  selectedOrders,
  setSelectedOrders,
  onStatusChange,
  onBulkStatus,
  onExportCsv,
  statusClass
}: {
  filteredOrders: OrderRow[];
  orderFilter: string;
  setOrderFilter: (v: string) => void;
  orderSearch: string;
  setOrderSearch: (v: string) => void;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
  onStatusChange: (id: string, status: string) => Promise<void>;
  onBulkStatus: (status: string) => Promise<void>;
  onExportCsv: () => void;
  statusClass: Record<string, string>;
}) {
  function toggleSelect(id: string) {
    setSelectedOrders((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search name or phone"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={onExportCsv}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
        >
          Export CSV
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600">Bulk status:</span>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void onBulkStatus(s)}
            className="rounded border border-slate-200 px-2 py-1 text-xs"
          >
            Set {s}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-600">
              <th className="p-2">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={
                    filteredOrders.length > 0 &&
                    filteredOrders.every((o) => selectedOrders.has(o.id))
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOrders(new Set(filteredOrders.map((o) => o.id)));
                    } else {
                      setSelectedOrders(new Set());
                    }
                  }}
                />
              </th>
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Phone</th>
              <th className="p-2">WhatsApp</th>
              <th className="p-2">Product</th>
              <th className="p-2">Package</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">State</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-b border-slate-100">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(o.id)}
                    onChange={() => toggleSelect(o.id)}
                  />
                </td>
                <td className="p-2 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                <td className="p-2 whitespace-nowrap">
                  {new Date(o.created_at).toLocaleString("en-NG")}
                </td>
                <td className="p-2">{o.customer_name}</td>
                <td className="p-2">{o.phone}</td>
                <td className="p-2">{o.whatsapp}</td>
                <td className="p-2">{o.product_name}</td>
                <td className="p-2">{o.package_label}</td>
                <td className="p-2 tabular-nums">
                  {typeof o.quantity === "number" && o.quantity > 0 ? o.quantity : 1}
                </td>
                <td className="p-2">{o.package_price}</td>
                <td className="p-2">{o.state}</td>
                <td className="p-2">
                  <select
                    value={o.status}
                    onChange={(e) => void onStatusChange(o.id, e.target.value)}
                    className={`rounded border px-2 py-1 text-xs ${statusClass[o.status] ?? ""}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReviewsPanel({
  reviews,
  products,
  onRefresh,
  onEdit,
  onAdd
}: {
  reviews: ReviewRow[];
  products: ProductRow[];
  onRefresh: () => void;
  onEdit: (r: ReviewRow) => void;
  onAdd: () => void;
}) {
  const supabase = useMemo(() => createClient(), []);

  async function toggleVerified(r: ReviewRow) {
    await supabase.from("reviews").update({ verified: !r.verified }).eq("id", r.id);
    await onRefresh();
  }

  async function deleteReview(r: ReviewRow) {
    if (!confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", r.id);
    await onRefresh();
  }

  const productName = (id: string | null) =>
    products.find((p) => p.id === id)?.name ?? "—";

  return (
    <div>
      <button
        type="button"
        onClick={onAdd}
        className="mb-4 rounded-xl bg-[#1246D6] px-6 py-3 font-display text-white"
      >
        Add Review
      </button>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Product</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Text</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="p-3">{r.reviewer_name}</td>
                <td className="p-3">{r.reviewer_location}</td>
                <td className="p-3">{productName(r.product_id)}</td>
                <td className="p-3">{r.rating}</td>
                <td className="p-3 max-w-xs truncate">{r.review_text}</td>
                <td className="p-3">
                  <button
                    type="button"
                    className="text-[#1246D6] underline"
                    onClick={() => void toggleVerified(r)}
                  >
                    {r.verified ? "Yes" : "No"}
                  </button>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    type="button"
                    className="text-[#1246D6] underline"
                    onClick={() => onEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-600 underline"
                    onClick={() => void deleteReview(r)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductFormModal({
  editing,
  onClose,
  onSaved,
  slugify
}: {
  editing: ProductRow | null;
  onClose: () => void;
  onSaved: () => void;
  slugify: (s: string) => string;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [name, setName] = useState(editing?.name ?? "");
  const [slug, setSlug] = useState(editing?.slug ?? "");
  const [category, setCategory] = useState(editing?.category ?? CATEGORIES[0]);
  const [badge, setBadge] = useState(editing?.badge ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [features, setFeatures] = useState<string[]>(editing?.features ?? [""]);
  const [images, setImages] = useState<string[]>(editing?.images ?? [""]);
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>(
    (editing?.pricing_options as PricingOption[])?.length
      ? (editing?.pricing_options as PricingOption[])
      : [{ label: "", price: "", savings: "", qty: "1" }]
  );
  const [youtubeUrl, setYoutubeUrl] = useState(editing?.youtube_url ?? "");
  const [currentPrice, setCurrentPrice] = useState(editing?.current_price ?? "");
  const [oldPrice, setOldPrice] = useState(editing?.old_price ?? "");
  const [stockCount, setStockCount] = useState(editing?.stock_count ?? 0);
  const [active, setActive] = useState(editing?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `${slug || "product"}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      upsert: true
    });
    if (error) {
      setErr(error.message);
      return;
    }
    const {
      data: { publicUrl }
    } = supabase.storage.from("product-images").getPublicUrl(path);
    setImages((prev) => [...prev.filter(Boolean), publicUrl]);
  }

  async function save() {
    setErr("");
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || slugify(name),
        category,
        badge: badge || null,
        description: description.trim(),
        features: features.filter((f) => f.trim()),
        images: images.filter((u) => u.trim()),
        pricing_options: pricingOptions.filter((o) => o.label && o.price),
        youtube_url: youtubeUrl.trim() || null,
        current_price: currentPrice.trim(),
        old_price: oldPrice.trim() || null,
        stock_count: stockCount,
        active
      };

      if (editing) {
        const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
      onSaved();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-[#08142A]">
            {editing ? "Edit product" : "Add product"}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-500">
            ✕
          </button>
        </div>
        <div className="mt-4 max-h-[70vh] space-y-3 overflow-y-auto pr-1">
          <label className="block text-sm">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Badge
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              {BADGES.map((b) => (
                <option key={b || "none"} value={b}>
                  {b || "none"}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </label>
          <div>
            <p className="text-sm font-medium">Features</p>
            {features.map((f, i) => (
              <input
                key={i}
                value={f}
                onChange={(e) => {
                  const n = [...features];
                  n[i] = e.target.value;
                  setFeatures(n);
                }}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              />
            ))}
            <button
              type="button"
              className="mt-1 text-sm text-[#1246D6] underline"
              onClick={() => setFeatures([...features, ""])}
            >
              + Add feature
            </button>
          </div>
          <div>
            <p className="text-sm font-medium">Image URLs</p>
            {images.map((u, i) => (
              <input
                key={i}
                value={u}
                onChange={(e) => {
                  const n = [...images];
                  n[i] = e.target.value;
                  setImages(n);
                }}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
                placeholder="https://..."
              />
            ))}
            <label className="mt-2 block text-sm">
              Upload to storage
              <input type="file" accept="image/*" onChange={(e) => void uploadFile(e)} />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium">Pricing options</p>
            {pricingOptions.map((o, i) => (
              <div key={i} className="mt-2 grid gap-2 sm:grid-cols-2">
                <input
                  placeholder="Label"
                  value={o.label}
                  onChange={(e) => {
                    const n = [...pricingOptions];
                    n[i] = { ...n[i], label: e.target.value };
                    setPricingOptions(n);
                  }}
                  className="rounded border px-2 py-1 text-sm"
                />
                <input
                  placeholder="Price"
                  value={o.price}
                  onChange={(e) => {
                    const n = [...pricingOptions];
                    n[i] = { ...n[i], price: e.target.value };
                    setPricingOptions(n);
                  }}
                  className="rounded border px-2 py-1 text-sm"
                />
                <input
                  placeholder="Savings"
                  value={o.savings}
                  onChange={(e) => {
                    const n = [...pricingOptions];
                    n[i] = { ...n[i], savings: e.target.value };
                    setPricingOptions(n);
                  }}
                  className="rounded border px-2 py-1 text-sm"
                />
                <input
                  placeholder="Qty"
                  value={o.qty}
                  onChange={(e) => {
                    const n = [...pricingOptions];
                    n[i] = { ...n[i], qty: e.target.value };
                    setPricingOptions(n);
                  }}
                  className="rounded border px-2 py-1 text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-sm text-[#1246D6] underline"
              onClick={() =>
                setPricingOptions([
                  ...pricingOptions,
                  { label: "", price: "", savings: "", qty: "1" }
                ])
              }
            >
              + Add option
            </button>
          </div>
          <label className="block text-sm">
            YouTube URL
            <input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Current price (display)
            <input
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Old price
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Stock count
            <input
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active (visible on store)
          </label>
        </div>
        {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-lg bg-[#1246D6] px-6 py-2 text-white"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewFormModal({
  editing,
  products,
  onClose,
  onSaved
}: {
  editing: ReviewRow | null;
  products: ProductRow[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [reviewerName, setReviewerName] = useState(editing?.reviewer_name ?? "");
  const [location, setLocation] = useState(editing?.reviewer_location ?? "");
  const [productId, setProductId] = useState<string | "">(editing?.product_id ?? "");
  const [rating, setRating] = useState(editing?.rating ?? 5);
  const [text, setText] = useState(editing?.review_text ?? "");
  const [verified, setVerified] = useState(editing?.verified ?? false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function save() {
    setErr("");
    setSaving(true);
    try {
      const payload = {
        reviewer_name: reviewerName.trim(),
        reviewer_location: location.trim(),
        product_id: productId || null,
        rating,
        review_text: text.trim(),
        verified
      };
      if (editing) {
        const { error } = await supabase.from("reviews").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("reviews").insert(payload);
        if (error) throw error;
      }
      onSaved();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="font-display text-2xl text-[#08142A]">
          {editing ? "Edit review" : "Add review"}
        </h2>
        <div className="mt-4 space-y-3">
          <input
            placeholder="Reviewer name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">General store (no product)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded border px-3 py-2"
          />
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
            />
            Verified purchase
          </label>
        </div>
        {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-lg bg-[#1246D6] px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
