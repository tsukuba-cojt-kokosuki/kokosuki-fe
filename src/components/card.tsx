import { useState } from "react"
import { Heart, SquarePen, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import twemoji from "twemoji"
import { Button } from "@/components/ui/button"
import { DeleteCrossfadeDialog } from "@/components/delete-crossfade-dialog"
import { components } from "@/lib/api/schema"
import { ShareCrossfadeDialog } from "./share-crossfade-dialog"

type CardProps = {
  crossfade: components["schemas"]["Crossfade"]
  showEditButton?: boolean
  showDeleteButton?: boolean
}

const Card = ({ crossfade, showEditButton, showDeleteButton }: CardProps) => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = () => {
    setLiked(!liked)
  }
  return (
    <>
      <div className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] m-2 shadow-xl hover:bg-stone-600 flex flex-col">
        <Link
          to={`/play/${crossfade.id}`}
          className="flex flex-col flex-grow p-5"
        >
          <div className="mx-auto mb-4">
            <Thumbnail {...crossfade.icon} />
          </div>
          <div className="flex flex-col justify-start h-20">
            <h3 className="text-xl sm:text-lg md:text-xl lg:text-xl line-clamp-3 hover:underline">
              {crossfade.title}
            </h3>
          </div>
        </Link>
        <div className="flex px-4 py-4 space-x-2 border-t">
          <Button
            variant="ghost"
            className="p-0 h-fit"
            onClick={handleLikeClick}
          >
            <Heart className={liked ? "fill-current" : ""} />
          </Button>
          <ShareCrossfadeDialog crossfade={crossfade} />
          {showEditButton && <SquarePen />}
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
      <div className="flex justify-center w-full h-full">
        <img
          src={iconUrl}
          className="block w-1/2 m-auto h-1/2"
        />
      </div>
    </div>
  )
}

export { Thumbnail }
