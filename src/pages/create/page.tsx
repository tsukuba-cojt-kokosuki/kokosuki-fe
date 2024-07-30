import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { apiOrigin, fetch } from "@/lib/api/fetch"
import { components, paths } from "@/lib/api/schema"
import { crossfadeSchema } from "@/lib/crossfade-validator"
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
    videoId: "dQw4w9WgXcQ",
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
  const [title, setTItle] = useState<string>("新規クロスフェード")

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
      const errorMessages = validationErrors.error.errors.map(err => err.message)
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
    const data: ResponseBody = await res.json()

    toast.success(`クロスフェード ${title} を作成しました`)
    navigate(`/play/${data.id}`)
  }

  return (
    <>
      <HelmetPack
        title="Kokosuki Create Page"
        description="Let's make your crossfade!"
        image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
        link="https://kokosuki.com/create"
      />

      <div className="grid grid-cols-2 gap-20">
        <div>
          <SongList
            modifiable={true}
            songs={songs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
            addSong={addSong}
            deleteSong={deleteSong}
            swapSongs={swapSongs}
          />
          <Button
            onClick={SaveCrossfade}
            className="block mt-8"
          >
            完成
          </Button>
        </div>
        <div>
          <div className="flex gap-6 py-4 mb-2">
            <Thumbnail
              {...icon}
              className="h-24 w-24"
            />
            <div className="h-24 flex flex-col justify-between">
              <Input
                type="text"
                placeholder="クロスフェードのタイトル"
                className="text-xl w-80 font-bold"
                value={title}
                onChange={(e) => setTItle(e.target.value)}
              />
              <div className="w-fit">
                <ThumbnailEditor
                  icon={icon}
                  updateIcon={setIcon}
                />
              </div>
            </div>
          </div>
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
