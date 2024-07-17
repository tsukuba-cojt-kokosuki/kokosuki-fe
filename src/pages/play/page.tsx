import { useState } from "react"
import { useParams } from "react-router-dom"
import { SongList } from "./../create/song-list"
import { VideoPlayer } from "./../create/video-player"

export type Song = {
  songId: string
  startTime: number
  endTime: number
  createDate: Date
  updateDate: Date
}

const defaultSongs = [
  {
    songId: "dQw4w9WgXcQ",
    startTime: 20,
    endTime: 25,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "33HhfJsg2LE",
    startTime: 143,
    endTime: 154,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "0oPZr_b-P54",
    startTime: 48,
    endTime: 70,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "ftU99KUGIMk",
    startTime: 61,
    endTime: 75,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "YGh0i_yTru0",
    startTime: 59,
    endTime: 81,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "mIqLF3KfIJs",
    startTime: 37,
    endTime: 70,
    createDate: new Date(),
    updateDate: new Date(),
  },
]

const Play = () => {
  const { id: crossFadeId } = useParams()

  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  const updateSelectedSong = (song: Song) => {
    if (selectedSongIndex === null) return
    const newSongs = [...songs]
    newSongs[selectedSongIndex] = song
    setSongs(newSongs)
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
            songs={songs}
            selectedIndex={selectedSongIndex}
            setSongs={setSongs}
            setSelectedSong={setSelectedSongIndex}
          />
        </div>
        <div>
          <VideoPlayer
            isPlayer={true}
            selectedSong={selectedSongIndex === null ? null : (songs[selectedSongIndex] as Song)}
            updateSelectedSong={updateSelectedSong}
            toNextSong={nextSong}
          />
        </div>
      </div>
    </>
  )
}
export default Play
