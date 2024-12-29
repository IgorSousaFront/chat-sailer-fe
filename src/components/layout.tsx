import { Toaster } from "@/components/ui/toaster"

export default function Layout({children}: {children: React.ReactNode}) {
  return(
    <main className="h-screen">
      {children}
      <Toaster />
    </main>
  )
}