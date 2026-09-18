import { Button } from '@components/ui/button'
import { User } from '@components/user'
import { useAuth } from '@hooks/use-auth'
import { LogOut } from 'lucide-react'

export function Home() {
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <User />

      <Button variant="outline" onClick={signOut}>
        <LogOut className="size-4" />
        Deslogar
      </Button>
    </div>
  )
}
