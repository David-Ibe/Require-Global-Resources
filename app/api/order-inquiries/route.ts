import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      product_name?: string;
      customer_whatsapp?: string | null;
      source_page?: string;
    };

    if (!body.product_name?.trim() || !body.source_page?.trim()) {
      return NextResponse.json(
        { error: "product_name and source_page are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("order_inquiries").insert({
      product_name: body.product_name.trim(),
      customer_whatsapp: body.customer_whatsapp?.trim() ?? null,
      source_page: body.source_page.trim()
    });

    if (error) {
      return NextResponse.json(
        { error: "Could not log order inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while processing request." },
      { status: 500 }
    );
  }
}
