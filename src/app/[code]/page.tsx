// src/app/[code]/page.tsx
import { ThemeToggle } from "@/components/ThemeToggle"
import { getAndIncrement } from "@/db/queries"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: Props) {
  const { code } = await params

  const url = await getAndIncrement(code)

  if (!url) {
    return <NoUrlFound code={code} />
  }

  redirect(url)
}

function NoUrlFound({ code }: { code: string }) {
  return (
    <div className="flex flex-col items-center justify-center dark:bg-neutral-900 min-h-screen">
      <ThemeToggle />
      <h1 className="text-2xl font-bold dark:text-white">Short URL not found</h1>
      <p className="mt-2 text-gray-600 dark:text-white/50">
        The code <code>{code}</code> does not exist or has expired.
      </p>
    </div>
  )
}