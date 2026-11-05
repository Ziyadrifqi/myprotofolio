import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json().catch(() => ({}));
    const expectedSecret = process.env.REVALIDATION_SECRET || "revalidate-secret-token";

    if (token !== expectedSecret) {
      return NextResponse.json({ error: "Invalid revalidation token" }, { status: 401 });
    }

    revalidatePath("/");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}
