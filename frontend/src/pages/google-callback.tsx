import { useAuth } from '@hooks/use-auth'
import { googleAuth } from '@http/google-auth'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export function GoogleCallback() {
  const [searchParams] = useSearchParams()

  const code = searchParams.get('code')

  const { signIn } = useAuth()

  const { data } = useQuery({
    queryKey: ['google/auth', code],
    queryFn: () => googleAuth(code ?? ''),
    enabled: !!code,
  })

  useEffect(() => {
    if (!data?.accessToken) {
      return
    }

    signIn(data?.accessToken)
  }, [data?.accessToken, signIn])

  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Loader2 className="size-10" />
        </motion.div>
      </motion.div>
    </div>
  )
}
