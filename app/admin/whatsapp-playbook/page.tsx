import Link from "next/link";

import {
  whatsappPlaybookIntro,
  whatsappPlaybookSections
} from "@/lib/whatsapp-playbook";

export const metadata = {
  title: "WhatsApp sales playbook | Admin",
  robots: { index: false, follow: false }
};

export default function WhatsAppPlaybookPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin"
            className="text-sm font-medium text-[#1246D6] hover:underline"
          >
            ← Back to admin
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <h1 className="font-display text-3xl tracking-wide text-[#08142A] md:text-4xl">
          {whatsappPlaybookIntro.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{whatsappPlaybookIntro.subtitle}</p>

        <div className="mt-10 space-y-12">
          {whatsappPlaybookSections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-xl tracking-wide text-[#08142A] md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-6">
                {section.blocks.map((block, i) => (
                  <div key={i}>
                    {block.label ? (
                      <p className="mb-2 text-sm font-semibold text-slate-800">
                        {block.label}
                      </p>
                    ) : null}
                    <pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm">
                      {block.text}
                    </pre>
                </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          Website entry messages are defined in{" "}
          <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-xs">
            lib/whatsapp-sales.ts
          </code>{" "}
          — keep them aligned with how you open chats here.
        </p>
      </article>
    </div>
  );
}
