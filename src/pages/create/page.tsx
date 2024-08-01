import { useContext, useState } from "react"
import { mutate } from "swr"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import { LoginMessage } from "@/components/login-message"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { components, paths } from "@/lib/api/schema"
import { crossfadeSchema } from "@/lib/crossfade-validator"
import { UserContext } from "../user-context"
import { SongList } from "./song-list"
import { Song, useSongs } from "./songs"
import { VideoPlayer } from "./video-player"
import { VideoPlayerSkeleton } from "./video-player-skeleton"

type Icon = components["schemas"]["Crossfade"]["icon"]

type RequestBody = paths["/crossfades/new"]["post"]["requestBody"]["content"]["application/json"]
type ResponseBody =
  paths["/crossfades/new"]["post"]["responses"]["201"]["content"]["application/json"]

const defaultSongs = [
  {
    videoId: "HyavGNrcTjw",
    start: 15,
    end: 30,
  },
]

const Create = () => {
  const navigate = useNavigate()
  const {
    songs,
    selectedSongIndex,
    addSong,
    deleteSong,
    swapSongs,
    setSelectedSongIndex,
    updateSelectedSong,
  } = useSongs(defaultSongs, 0)
  const [icon, setIcon] = useState<Icon>({ character: "🎵", backgroundColor: "#eeffff" })
  const [title, setTitle] = useState<string>("新規クロスフェード")
  const user = useContext(UserContext)

  if (!user.id) {
    return (
      <>
        <h1 className="text-3xl font-bold">新規作成</h1>
        <LoginMessage />
      </>
    )
  }

  const SaveCrossfade = async () => {
    const body: RequestBody = {
      id: "",
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

    const res = await fetch(`${apiOrigin}/crossfades/new`, {
      method: "POST",
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast.success(`クロスフェード ${title} を作成しました`)
      const data: ResponseBody = await res.json()

      await mutate("/crossfades/latest")
      await mutate("/crossfades/popular")
      await mutate(`/users/${user.id}/crossfades`)

      navigate(`/play/${data.id}`)
    } else {
      toast.error("クロスフェードの作成に失敗しました")
    }
  }

  return (
    <>
      <HelmetPack
        title="新規作成 | Kokosuki"
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
              <Button onClick={SaveCrossfade}>
                <Check className="w-4 h-4 mr-1 translate-y-[1px] hidden lg:inline" />
                完成
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

export default Create
