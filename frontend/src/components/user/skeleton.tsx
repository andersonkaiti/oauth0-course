import { Skeleton } from '@components/ui/skeleton'

export function UserSkeleton() {
  return (
    <>
      <Skeleton className="size-24 rounded-full" />

      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-44" />
      </div>
    </>
  )
}
