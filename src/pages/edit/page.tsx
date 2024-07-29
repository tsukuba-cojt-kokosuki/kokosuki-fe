import { useState } from "react"
import useSWR from "swr"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { apiOrigin } from "@/lib/api/fetch"
import { components, paths } from "@/lib/api/schema"
import { crossfadeSchema } from "@/lib/crossfade-validator"
import { SongList } from "../create/song-list"
import { Song, useSongs } from "../create/songs"
import { VideoPlayer } from "../create/video-player"
import { VideoPlayerSkeleton } from "../create/video-player-skeleton"

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
      toast.error(validationErrors.error.issues.map((issue) => issue.message).join("\n"))
      return
    }

    const res = await fetch(`${apiOrigin}/crossfades/${crossfade.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast.success(`クロスフェード ${title} を更新しました`)
      navigate(`/play/${crossfade.id}`)
    } else {
      toast.error("更新に失敗しました")
    }
  }

  return (
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
          onClick={saveCrossfade}
          className="block mt-8"
        >
          更新
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
              onChange={(e) => setTitle(e.target.value)}
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
  )
}
