import { useContext, useState } from "react"
import useSWR from "swr"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Thumbnail } from "@/components/card"
import { DeleteCrossfadeDialog } from "@/components/delete-crossfade-dialog"
import { UserName } from "@/components/username"
import { paths } from "@/lib/api/schema"
import { Song } from "../create/songs"
import { VideoPlayerSkeleton } from "../create/video-player-skeleton"
import { UserContext } from "../user-context"
import { SongList } from "./../create/song-list"
import { VideoPlayer } from "./../create/video-player"

type CrossfadesGetResponse =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]

const Play = () => {
  const user = useContext(UserContext)
  const { id: crossFadeId } = useParams()
  const { data, isLoading, error } = useSWR<CrossfadesGetResponse>("/crossfades/" + crossFadeId)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  if (error) {
    throw new Error() // 404
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  const nextSong = () => {
    setSelectedSongIndex((selectedSongIndex) => {
      if (selectedSongIndex === null || selectedSongIndex === data.songs.length - 1)
        return selectedSongIndex

      return selectedSongIndex + 1
    })
  }

  return (
    <div className="grid grid-cols-2 gap-20">
      <div>
        <SongList
          modifiable={false}
          songs={data.songs}
          selectedIndex={selectedSongIndex}
          setSelectedSong={setSelectedSongIndex}
        />
      </div>
      <div>
        <div className="flex gap-6 py-4 mb-2">
          <Thumbnail
            {...data.icon}
            className="h-24 w-24 shrink-0"
          />
          <div className="flex justify-between w-full items-center">
            <div className="h-24 flex flex-col justify-center">
              <h1 className="text-xl font-bold mb-1">{data.title}</h1>
              <div className="text-sm">
                作成者:
                <UserName
                  userId={data.creatorId}
                  className="mx-2"
                />
              </div>
            </div>
            {user?.id === data.creatorId && (
              <div className="flex gap-2 h-fit">
                <Button
                  variant="outline"
                  asChild
                >
                  <Link to={`/edit/${crossFadeId}`}>編集</Link>
                </Button>
                <DeleteCrossfadeDialog crossfade={data}>
                  <Button variant="outline">削除</Button>
                </DeleteCrossfadeDialog>
              </div>
            )}
          </div>
        </div>
        {selectedSongIndex === null ? (
          <VideoPlayerSkeleton />
        ) : (
          <VideoPlayer
            modifiable={false}
            selectedSong={data.songs[selectedSongIndex] as Song}
            toNextSong={nextSong}
          />
        )}
      </div>
    </div>
  )
}
export default Play
