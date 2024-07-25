import { useState } from "react"
import useSWR from "swr"
import { useParams } from "react-router-dom"
import { paths } from "@/lib/api/schema"
import { Song } from "../create/songs"
import { VideoPlayerSkeleton } from "../create/video-player-skeleton"
import { SongList } from "./../create/song-list"
import { VideoPlayer } from "./../create/video-player"

type CrossfadesGetResponse =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]

const Play = () => {
  const { id: crossFadeId } = useParams()
  const { data, error } = useSWR<CrossfadesGetResponse>("/crossfades/" + crossFadeId)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  if (error) {
    return <div>Error loading data.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const nextSong = () => {
    console.log("nextSong")
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
