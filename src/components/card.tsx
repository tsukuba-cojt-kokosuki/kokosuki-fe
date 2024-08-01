import { useContext, useState } from "react"
import { mutate } from "swr"
import { UserContext } from "@/pages/user-context"
import { Heart, SquarePen, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import twemoji from "twemoji"
import { Button } from "@/components/ui/button"
import { DeleteCrossfadeDialog } from "@/components/delete-crossfade-dialog"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { components } from "@/lib/api/schema"
import { ShareCrossfadeDialog } from "./share-crossfade-dialog"

type CardProps = {
  crossfade: components["schemas"]["Crossfade"]
  showEditButton?: boolean
  showDeleteButton?: boolean
}

const Card = ({ crossfade, showEditButton, showDeleteButton }: CardProps) => {
  const [liked, setLiked] = useState(crossfade.liked)
  const user = useContext(UserContext)

  const handleLikeClick = async () => {
    const method = liked ? "DELETE" : "POST"
    setLiked((liked) => !liked) // optimistic update

    const res = await fetch(`${apiOrigin}/crossfades/${crossfade.id}/likes`, {
      method,
    })

    if (!res.ok) {
      console.error(`Failed to like crossfade ${crossfade.id} ${crossfade.title}`)
      setLiked(method === "DELETE" ? true : false) // revert optimistic update
    }

    mutate("/crossfades/latest")
    mutate("/crossfades/popular")
    if (user) mutate(`/users/${user.id}/crossfades`)
  }

  return (
    <div className="flex flex-col w-full shadow-xl hover:bg-stone-600">
      <Link
        to={`/play/${crossfade.id}`}
        className="flex flex-col flex-grow p-5"
      >
        <Thumbnail
          {...crossfade.icon}
          className="flex-grow-0 flex-shrink-0 w-24 h-24 mx-auto mb-2 aspect-square lg:h-40 lg:w-40"
        />
        <div className="flex-grow">
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
        {showEditButton && (
          <Link to={`/edit/${crossfade.id}`}>
            <Button
              variant="ghost"
              className="p-0 h-fit"
            >
              <SquarePen />
            </Button>
          </Link>
        )}
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
