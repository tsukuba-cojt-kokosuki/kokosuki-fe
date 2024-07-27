import useSWR from "swr"
import { twMerge } from "tailwind-merge"
import { paths } from "@/lib/api/schema"
import { Skeleton } from "./ui/skeleton"

type ResponseBody =
  paths["/users/{userId}"]["get"]["responses"]["200"]["content"]["application/json"]

type UserNameProps = {
  userId: string
  className?: string
}

const UserName = ({ userId, className }: UserNameProps) => {
  const { data, isLoading, error } = useSWR<ResponseBody>(`/users/${userId}`)

  if (error) {
    return <span className={className}>Unknown User</span>
  }

  if (isLoading || !data) {
    return <Skeleton className={twMerge("w-24", className)} />
  }

  return <span className={className}>{data.name}</span>
}

export { UserName }
