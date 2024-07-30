import { ChangeEventHandler, useState } from "react"
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react"
import { MouseDownEvent } from "emoji-picker-react/dist/config/config"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import { components } from "@/lib/api/schema"

type Icon = components["schemas"]["Crossfade"]["icon"]

type ThumbnailEditorProps = {
  icon: Icon
  updateIcon: (icon: Icon) => void
}

const ThumbnailEditor = ({
  icon: crossfadeIcon,
  updateIcon: updateCrossfadeIcon,
}: ThumbnailEditorProps) => {
  const [icon, setIcon] = useState<Icon>(crossfadeIcon)

  const handleColorClick: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIcon((icon) => ({ ...icon, backgroundColor: e.target.value }))
  }

  const handleEmojiClick: MouseDownEvent = (emojiObject) => {
    setIcon((icon) => ({ ...icon, character: emojiObject.emoji }))
  }

  const handleClose = (open: boolean) => {
    if (open) return

    updateCrossfadeIcon(icon)
  }

  return (
    <>
      <Dialog onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
          >
            サムネ設定
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>サムネイル作成</DialogTitle>
            <DialogDescription>
              背景色と絵文字を選んで、サムネイルを作成しましょう！
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <h2 className="font-semibold">背景色</h2>
                <Input
                  className="w-20 h-20"
                  type="color"
                  value={icon.backgroundColor}
                  onChange={handleColorClick}
                />
              </div>
              <div className="flex gap-4">
                <h2 className="font-semibold">絵文字</h2>
                <EmojiPicker
                  emojiStyle={EmojiStyle.TWITTER}
                  theme={Theme.DARK}
                  onEmojiClick={handleEmojiClick}
                  searchDisabled={true}
                  previewConfig={{
                    showPreview: false,
                  }}
                  height="20rem"
                />
              </div>
            </div>
            <Thumbnail {...icon} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button>決定</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ThumbnailEditor
