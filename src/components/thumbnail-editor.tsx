import EmojiPicker from "emoji-picker-react"
import { set } from "react-hook-form"
import twemoji from "twemoji"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Thumbnail } from "@/components/card"

type ThumbnailEditorProps = {
  emoji: string
  backgroundColor: string
  setEmoji: (emoji: string) => void
  setBackgroundColor: (backgroundColor: string) => void
}

const ThumbnailEditor = (props: ThumbnailEditorProps) => {
  const onEmojiClick = (emojiObject, event) => {
    console.log(emojiObject)
    props.setEmoji(emojiObject.emoji)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">サムネ設定</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>サムネイル作成</DialogTitle>
            <DialogDescription>絵文字と色を選んで、サムネイルを作成しましょう！</DialogDescription>
            <div className="flex justify-center gap-4">
              <Thumbnail
                backgroundColor={props.backgroundColor}
                character={props.emoji}
              />
              <Input
                className="w-20 h-20"
                type="color"
                value={props.backgroundColor}
                onChange={(e) => props.setBackgroundColor(e.target.value)}
              />
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <EmojiPicker
                emojiStyle="twitter"
                onEmojiClick={onEmojiClick}
                Theme="dark"
              />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ThumbnailEditor
