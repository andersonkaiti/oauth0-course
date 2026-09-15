import { Button } from '@components/ui/button'
import { useAuth } from '@hooks/use-auth'
import { LogOut } from 'lucide-react'

export function Home() {
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-3xl tracking-tighter">Home</h1>

      <Button variant="outline" onClick={signOut}>
        <LogOut className="size-4" />
        Deslogar
      </Button>
    </div>
  )
}
