"use client";

import { FormEvent, useState } from "react";

import { storeSurface } from "@/lib/store-ui";

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

const inputClass =
  "w-full rounded-lg border border-rgr-gray300 bg-rgr-surface px-3 py-2.5 text-sm text-rgr-navy outline-none transition focus:border-rgr-navy focus:ring-2 focus:ring-rgr-navy/15";

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
    <form
      onSubmit={onSubmit}
      className={`space-y-5 ${storeSurface.cardSm}`}
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-rgr-navy">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-rgr-navy">
          Phone number
        </label>
        <input
          id="phone"
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-rgr-navy">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-rgr-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-rgr-charcoal disabled:cursor-not-allowed disabled:opacity-80"
      >
        {submitting ? "Submitting…" : "Send"}
      </button>
      {status ? (
        <p
          className={`text-sm ${
            status.includes("successfully") ? "text-rgr-success" : "text-rgr-danger"
          }`}
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}
