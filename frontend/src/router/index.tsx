import { AuthGuard } from '@guards/auth-guard'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const SignIn = lazy(async () =>
  import('@pages/sign-in').then((m) => ({
    default: m.SignIn,
  })),
)

const Home = lazy(async () =>
  import('@pages/home').then((m) => ({
    default: m.Home,
  })),
)

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path={routes.signIn} element={<SignIn />} />
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route path={routes.home} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
