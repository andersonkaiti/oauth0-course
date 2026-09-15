import { GoogleIcon } from '@components/google-icon'
import { Button } from '@components/ui/button'
import { useAuth } from '@hooks/use-auth'

export function SignIn() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Button variant="outline" onClick={signInWithGoogle} className="gap-2">
        <GoogleIcon />
        Entrar com o Google
      </Button>
    </div>
  )
}
