import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Check, Copy, Heart, Share, SquarePen, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import twemoji from "twemoji"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DeleteCrossfadeDialog } from "@/components/delete-crossfade-dialog"
import { components } from "@/lib/api/schema"

type CardProps = {
  crossfade: components["schemas"]["Crossfade"]
  showEditButton?: boolean
  showDeleteButton?: boolean
}

const Card = ({ crossfade, showEditButton, showDeleteButton }: CardProps) => {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)

  const crossfadeUrl = `${window.location.origin}/play/${crossfade.id}`
  const editUrl = `${window.location.origin}/edit/${crossfade.id}`

  const handleCopyClick = () => {
    navigator.clipboard.writeText(crossfadeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const handleLikeClick = () => {
    setLiked(!liked)
  }
  return (
    <>
      <div className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] m-2 shadow-xl hover:bg-stone-600 flex flex-col">
        <Link
          to={`/play/${crossfade.id}`}
          className="flex-grow flex flex-col p-5"
        >
          <div className="mx-auto mb-4">
            <Thumbnail {...crossfade.icon} />
          </div>
          <div className="h-20 flex flex-col justify-start">
            <h3 className="text-xl sm:text-lg md:text-xl lg:text-xl line-clamp-3 hover:underline">
              {crossfade.title}
            </h3>
          </div>
        </Link>
        <div className="px-4 py-4 flex space-x-2 border-t">
          <Button
            variant="ghost"
            className="p-0 h-fit"
            onClick={handleLikeClick}
          >
            <Heart className={liked ? "fill-current" : ""} />
          </Button>
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
                <div className="flex items-center space-x-2 mt-2">
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
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <DialogPrimitive.Close asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="absolute right-0 top-0"
                  >
                    Close
                  </Button>
                </DialogPrimitive.Close>
              </div>
            </DialogContent>
          </Dialog>
          {showEditButton && <a href={editUrl}><SquarePen /></a>}
          {showDeleteButton && (
            <DeleteCrossfadeDialog crossfade={crossfade}>
              <Button
                variant="ghost"
                className="p-0 h-fit"
              >
                <Trash2 />
              </Button>
            </DeleteCrossfadeDialog>
          )}
        </div>
      </div>
    </>
  )
}

export default Card

type ThumbnailProps = components["schemas"]["Crossfade"]["icon"] & {
  className?: string
}

const Thumbnail = ({ backgroundColor, character, className }: ThumbnailProps) => {
  const codePoint = twemoji.convert.toCodePoint(character)
  const iconUrl = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/72x72/${codePoint}.png`

  return (
    <div
      className={twMerge("h-40 w-40", className)}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className="h-full w-full flex justify-center">
        <img
          src={iconUrl}
          className="m-auto h-1/2 w-1/2 block"
        />
      </div>
    </div>
  )
}

export { Thumbnail }
