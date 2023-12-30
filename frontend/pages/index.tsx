/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/gnAPKutjwIH
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center min-h-screen mt-auto">
        <h1 className="text-2xl font-serif mb-10">Party Task Planner</h1>
        <Link href="/create">
          <Button
            aria-label="Create Button"
            className="bg-blue-500 mx-auto flex items-center justify-center h-14 w-14 rounded"
            variant="outline"
          >
            <PlusIcon className="text-white w-6 h-6" />
          </Button>
        </Link>
      </div>
    </main >
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}