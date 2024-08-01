import { useContext, useState } from "react"
import useSWR, { mutate } from "swr"
import { Check } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { components, paths } from "@/lib/api/schema"
import { crossfadeSchema } from "@/lib/crossfade-validator"
import { SongList } from "../create/song-list"
import { Song, useSongs } from "../create/songs"
import { VideoPlayer } from "../create/video-player"
import { VideoPlayerSkeleton } from "../create/video-player-skeleton"
import { UserContext } from "../user-context"

type Icon = components["schemas"]["Crossfade"]["icon"]

type Response =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]

type Request =
  paths["/crossfades/{crossfadeId}"]["put"]["requestBody"]["content"]["application/json"]

const Edit = () => {
  const { id: crossFadeId } = useParams()
  const { data, isLoading, error } = useSWR<Response>("/crossfades/" + crossFadeId)

  if (error) {
    throw new Error() // 404
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  return <Editor crossfade={data} />
}

export default Edit

type EditorProps = {
  crossfade: Response
}

const Editor = ({ crossfade }: EditorProps) => {
  const navigate = useNavigate()
  const {
    songs,
    selectedSongIndex,
    addSong,
    deleteSong,
    swapSongs,
    setSelectedSongIndex,
    updateSelectedSong,
  } = useSongs(crossfade.songs, 0)
  const [icon, setIcon] = useState<Icon>(crossfade.icon)
  const [title, setTitle] = useState<string>(crossfade.title)
  const user = useContext(UserContext)

  const saveCrossfade = async () => {
    const body: Request = {
      id: crossfade.id,
      creatorId: "",
      title: title,
      liked: false,
      icon: icon,
      songs: songs,
    }

    const validationErrors = crossfadeSchema.safeParse(body)
    if (!validationErrors.success) {
      const errorMessages = validationErrors.error.errors.map((err) => err.message)
      toast.error(
        <div>
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>❗️{message}</li>
            ))}
          </ul>
        </div>,
      )
      return
    }

    const res = await fetch(`${apiOrigin}/crossfades/${crossfade.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })
    if (res.ok) {
      mutate("/crossfades/latest")
      mutate("/crossfades/popular")
      if (user) mutate(`/users/${user.id}/crossfades`)

      toast.success(`クロスフェード ${title} を更新しました`)
      navigate(`/play/${crossfade.id}`)
    } else {
      toast.error("更新に失敗しました")
    }
  }

  return (
    <>
      <HelmetPack
        title="編集 | Kokosuki"
        description="Let's create your crossfade!"
      />

      <div className="flex flex-col justify-between w-full h-full gap-4 lg:gap-20 lg:flex-row">
        <div className="order-2 grow lg:order-1">
          <SongList
            modifiable={true}
            songs={songs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
            addSong={addSong}
            deleteSong={deleteSong}
            swapSongs={swapSongs}
          />
        </div>
        <div className="sticky top-0 order-1 pb-4 lg:order-2 bg-background">
          <header className="flex gap-3 py-4 mb-2 lg:gap-6">
            <Thumbnail
              {...icon}
              className="w-20 h-20 lg:h-24 lg:w-24 shrink-0"
            />
            <div className="flex flex-col justify-between h-20 lg:h-24">
              <Input
                type="text"
                placeholder="クロスフェードのタイトル"
                className="text-base font-semibold h-9 lg:font-bold lg:text-xl lg:w-80 w-44 lg:h-auto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="w-fit">
                <ThumbnailEditor
                  icon={icon}
                  updateIcon={setIcon}
                />
              </div>
            </div>
            <div className="flex items-center h-20 gap-2 ml-auto lg:h-24">
              <Button onClick={saveCrossfade}>
                <Check className="w-4 h-4 mr-1 translate-y-[1px] hidden lg:inline" />
                更新
              </Button>
            </div>
          </header>
          {selectedSongIndex === null ? (
            <VideoPlayerSkeleton />
          ) : (
            <VideoPlayer
              modifiable={true}
              selectedSong={songs[selectedSongIndex] as Song}
              updateSelectedSong={updateSelectedSong}
            />
          )}
        </div>
      </div>
    </>
  )
}
