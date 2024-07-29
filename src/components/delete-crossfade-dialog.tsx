import { ReactNode, useContext, useState } from "react"
import { useSWRConfig } from "swr"
import { UserContext } from "@/pages/user-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { components } from "@/lib/api/schema"

type DeleteCrossfadeDialogProps = {
  crossfade: components["schemas"]["Crossfade"]
  children: ReactNode
}

const DeleteCrossfadeDialog = ({ crossfade, children }: DeleteCrossfadeDialogProps) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { id: userId } = useContext(UserContext)
  const { mutate } = useSWRConfig()
  const [open, setOpen] = useState(false)

  const DeleteCrossfade = async () => {
    setSending(true)
    const res = await fetch(`${apiOrigin}/crossfades/${crossfade.id}`, {
      method: "DELETE",
    })
    setSending(false)
    if (!res.ok) {
      setError("削除するのに失敗しました")
      return
    }
    mutate(`/users/${userId}/crossfades`)
    mutate("/crossfades/latest")
    mutate("/crossfades/popular")
    setOpen(false)
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{crossfade.title} を削除しますか?</AlertDialogTitle>
          <AlertDialogDescription>
            {error && <div className="error-message">{error}</div>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={DeleteCrossfade}
            disabled={sending}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteCrossfadeDialog }
