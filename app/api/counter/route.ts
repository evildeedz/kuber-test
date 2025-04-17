import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET handler to fetch the current counter value
export async function GET() {
  try {
    // Get the first counter or create it if it doesn't exist
    let counter = await prisma.counter.findFirst()

    if (!counter) {
      counter = await prisma.counter.create({
        data: { value: 0 },
      })
    }

    return NextResponse.json({ value: counter.value })
  } catch (error) {
    console.error("Error fetching counter:", error)
    return NextResponse.json({ error: "Failed to fetch counter" }, { status: 500 })
  }
}

// POST handler to increment the counter
export async function POST(request: NextRequest) {
  try {
    // Check if the middleware processed this request
    const middlewareProcessed = request.headers.get("x-middleware-processed")
    console.log(`Middleware processed: ${middlewareProcessed}`)

    // Get the first counter or create it if it doesn't exist
    let counter = await prisma.counter.findFirst()

    if (!counter) {
      counter = await prisma.counter.create({
        data: { value: 1 }, // Start at 1 if creating for the first time
      })
    } else {
      // Increment the counter
      counter = await prisma.counter.update({
        where: { id: counter.id },
        data: { value: counter.value + 1 },
      })
    }

    return NextResponse.json({ value: counter.value })
  } catch (error) {
    console.error("Error incrementing counter:", error)
    return NextResponse.json({ error: "Failed to increment counter" }, { status: 500 })
  }
}
