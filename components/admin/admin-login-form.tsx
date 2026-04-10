"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

function safeNextPath(nextParam: string | null): string {
  if (!nextParam) return "/admin";
  if (!nextParam.startsWith("/")) return "/admin";
  if (nextParam.startsWith("//") || nextParam.includes("://") || nextParam.startsWith("/\\")) {
    return "/admin";
  }
  return nextParam;
}

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (signErr) {
        setError(signErr.message);
        return;
      }
      router.push(nextPath);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rgr-navy px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <Image
            src="/logo-mark.png"
            alt="Require Global Resources"
            width={56}
            height={56}
            className="h-14 w-14"
          />
          <h1 className="mt-4 font-display text-3xl tracking-wide text-rgr-navy">
            ADMIN LOGIN
          </h1>
          <p className="mt-2 text-center text-sm text-rgr-gray500">
            Require Global Resources Dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-rgr-gray700">Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rgr-gray300 px-4 py-3 text-sm outline-none transition focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-rgr-gray700">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rgr-gray300 px-4 py-3 text-sm outline-none transition focus:border-rgr-blue focus:ring-2 focus:ring-rgr-blue/20"
            />
          </label>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rgr-gold py-3.5 font-display text-lg uppercase tracking-wider text-rgr-navy shadow-lg transition hover:bg-amber-400 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
