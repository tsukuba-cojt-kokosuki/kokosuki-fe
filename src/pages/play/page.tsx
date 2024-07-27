import { useState } from "react"
import useSWR from "swr"
import { useParams } from "react-router-dom"
import { Thumbnail } from "@/components/card"
import { UserName } from "@/components/username"
import { paths } from "@/lib/api/schema"
import { Song } from "../create/songs"
import { VideoPlayerSkeleton } from "../create/video-player-skeleton"
import { SongList } from "./../create/song-list"
import { VideoPlayer } from "./../create/video-player"

type CrossfadesGetResponse =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]

const Play = () => {
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
            className="h-24 w-24"
          />
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
