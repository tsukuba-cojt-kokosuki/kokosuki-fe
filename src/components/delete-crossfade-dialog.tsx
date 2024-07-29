import { MouseEventHandler, ReactNode, useContext, useState } from "react"
import { useSWRConfig } from "swr"
import { UserContext } from "@/pages/user-context"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
  const [open, setOpen] = useState(false)
  const { id: userId } = useContext(UserContext)
  const { mutate } = useSWRConfig()

  const handleDeleteCrossfade: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    setSending(true)
    const res = await fetch(`${apiOrigin}/crossfades/${crossfade.id}`, {
      method: "DELETE",
    })
    setSending(false)
    if (!res.ok) {
      toast.error("削除に失敗しました")
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
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={sending}>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCrossfade}
            disabled={sending}
            className="w-16"
          >
            {sending ? <LoaderCircle className="animate-spin" /> : "削除"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteCrossfadeDialog }
