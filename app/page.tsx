"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [counter, setCounter] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch the initial counter value
  useEffect(() => {
    fetchCounter()
  }, [])

  // Function to fetch the current counter value
  const fetchCounter = async () => {
    try {
      const response = await fetch("/api/counter")
      const data = await response.json()
      setCounter(data.value)
    } catch (error) {
      console.error("Error fetching counter:", error)
    }
  }

  // Function to increment the counter
  const incrementCounter = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/counter", {
        method: "POST",
      })
      const data = await response.json()
      setCounter(data.value)
    } catch (error) {
      console.error("Error incrementing counter:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Next.js 14 Counter App</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400 mb-2">Current Count:</p>
            <div className="text-6xl font-bold">{counter !== null ? counter : "Loading..."}</div>
          </div>

          <Button onClick={incrementCounter} disabled={loading} className="w-full py-6 text-lg">
            {loading ? "Incrementing..." : "Increment Counter"}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            The counter is stored in a PostgreSQL database and updated via an API route.
          </p>
        </div>
      </div>
    </main>
  )
}
