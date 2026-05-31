import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST() {
  revalidatePath("/", "layout")
  revalidatePath("/explore", "page")
  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
