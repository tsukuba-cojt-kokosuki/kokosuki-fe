import { useState } from "react"
import { Check, Copy, Share } from "lucide-react"
import { components } from "@/lib/api/schema"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type ShareCrossfadeDialogProps = {
  crossfade: components["schemas"]["Crossfade"]
}

const ShareCrossfadeDialog = ({ crossfade }: ShareCrossfadeDialogProps) => {
  const [copied, setCopied] = useState(false)
  const crossfadeUrl = `${window.location.origin}/play/${crossfade.id}`

  const handleCopyClick = () => {
    navigator.clipboard.writeText(crossfadeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-fit"
        >
          <Share />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="relative">
          <DialogHeader>
            <DialogTitle>{crossfade.title} を共有</DialogTitle>
            <DialogDescription>以下のリンクから共有できます。</DialogDescription>
          </DialogHeader>
          <div className="flex items-center mt-2 space-x-2">
            <div className="grid flex-1 gap-2">
              <Label
                htmlFor="link"
                className="sr-only"
              >
                Link
              </Label>
              <Input
                id="link"
                defaultValue={crossfadeUrl}
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleCopyClick}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ShareCrossfadeDialog }
