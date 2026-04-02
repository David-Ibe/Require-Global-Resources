"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Could not submit inquiry.");
      }

      setStatus("Your message has been sent successfully.");
      setForm(initialState);
    } catch {
      setStatus("We could not submit your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-100 bg-white p-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-brand-dark">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-electric focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-brand-dark">
          Phone Number
        </label>
        <input
          id="phone"
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-electric focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-brand-dark">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-electric focus:ring-2"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-electric px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-80"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {status ? (
        <p
          className={`text-sm ${
            status.includes("successfully") ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}
