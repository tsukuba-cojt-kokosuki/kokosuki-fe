import { useState } from "react"
import { useEffect } from "react"
import useSWR from "swr"
import { set } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Thumbnail } from "@/components/card"
import { paths } from "@/lib/api/schema"
import { components } from "@/lib/api/schema"
import { SongList } from "./../create/song-list"
import { VideoPlayer } from "./../create/video-player"

type crossfadesGetResponse =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]
export type Song = components["schemas"]["Song"]

const Play = () => {
  const { id: crossFadeId } = useParams()
  const { data, error } = useSWR<crossfadesGetResponse>("/crossfades/" + crossFadeId)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  if (error) {
    return <div>Error loading data.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const nextSong = () => {
    if (selectedSongIndex === null) return
    if (selectedSongIndex + 1 >= songs.length) {
      // 終了
    } else {
      setSelectedSongIndex(selectedSongIndex + 1)
    }
  }

  return (
    <>
      これはidが{crossFadeId}
      <div className="grid grid-cols-2 gap-20">
        <div>
          <SongList
            isPlayer={true}
            songs={data.songs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
          />
        </div>
        <div>
          <VideoPlayer
            isPlayer={true}
            selectedSong={
              selectedSongIndex === null ? null : (data.songs[selectedSongIndex] as Song)
            }
            toNextSong={nextSong}
          />
        </div>
      </div>
    </>
  )
}
export default Play

/*

      
      
 */
