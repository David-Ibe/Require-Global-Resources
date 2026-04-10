import { NextResponse } from "next/server";

import { getSupabaseAnon } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const message = body.message?.trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAnon();
    const { error } = await supabase.from("contact_inquiries").insert({
      name,
      phone,
      message
    });

    if (error) {
      return NextResponse.json(
        { error: "Could not save inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error while processing request." },
      { status: 500 }
    );
  }
}
