import prisma from "../lib/prisma"

async function main() {
  // Check if a counter already exists
  const existingCounter = await prisma.counter.findFirst()

  if (!existingCounter) {
    // Create a new counter with initial value 0
    const counter = await prisma.counter.create({
      data: { value: 0 },
    })
    console.log("Created new counter:", counter)
  } else {
    console.log("Counter already exists:", existingCounter)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
