import { googleAuth } from '@http/google-auth'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export function GoogleCallback() {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const code = queryParams.get('code')

  useQuery({
    queryKey: ['google/auth', code],
    queryFn: () => googleAuth(code ?? ''),
    enabled: !!code,
  })

  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <Loader2 className="size-6 animate-spin" />
      <h1 className="font-semibold text-2xl tracking-tight">Carregando...</h1>
    </div>
  )
}
