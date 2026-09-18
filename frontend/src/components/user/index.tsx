import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { useMe } from '@hooks/use-me'
import { getFullName } from '@utils/get-full-name'
import { getInitials } from '@utils/get-initials'
import { UserSkeleton } from './skeleton'

export function User() {
  const { data: user, isLoading } = useMe()

  if (isLoading) {
    return <UserSkeleton />
  }

  const fullName = getFullName(user?.first_name, user?.last_name)
  const initials = getInitials(user?.first_name, user?.last_name)

  return (
    <>
      <Avatar className="size-24">
        <AvatarImage src={user?.avatar ?? undefined} alt={fullName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1">
        <span className="font-semibold text-lg">{fullName}</span>
        <span className="text-muted-foreground text-sm">{user?.email}</span>
      </div>
    </>
  )
}
