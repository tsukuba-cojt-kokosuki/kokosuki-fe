import { useContext, useState } from "react"
import { Trash2 } from "lucide-react"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { Button } from "@/components/ui/button"
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
import { mutate } from "swr"
import { UserContext } from "@/pages/user-context"

type DeleteCrossfadeDialogProps = {
  crossfadeId: string;
  title: string;
};

const DeleteCrossfadeDialog = ({ crossfadeId, title }: DeleteCrossfadeDialogProps) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id: userId } = useContext(UserContext);

  const DeleteCrossfade = async () => {
    setSending(true);
    const res = await fetch(`${apiOrigin}/crossfades/${crossfadeId}`, {
      method: "DELETE",
    });
    setSending(false);
    if (!res.ok) {
      setError("削除するのに失敗しました");
      return;
    }
    await Promise.all([
      mutate("/crossfades/latest"),
      mutate("/crossfades/popular"),
      mutate(`/users/${userId}/crossfades`),
    ]);
    window.location.href = `/play/list`;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-fit" disabled={sending}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title} を削除しますか?</AlertDialogTitle>
          <AlertDialogDescription>
            {error && <div className="error-message">{error}</div>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction  onClick={DeleteCrossfade} disabled={sending}>
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteCrossfadeDialog }