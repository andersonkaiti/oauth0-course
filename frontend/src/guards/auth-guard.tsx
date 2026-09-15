import { useAuth } from '@hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

interface IAuthGuardProps {
  isPrivate?: boolean
}

export function AuthGuard({ isPrivate = false }: IAuthGuardProps) {
  const { signedIn } = useAuth()

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}
