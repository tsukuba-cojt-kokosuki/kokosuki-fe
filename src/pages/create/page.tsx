import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SongList } from "./song-list"
import { VideoPlayer } from "./video-player"

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
    endTime: 172,
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

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  const updateSelectedSong = (song: Song) => {
    if (selectedSongIndex === null) return
    const newSongs = [...songs]
    newSongs[selectedSongIndex] = song
    setSongs(newSongs)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-20">
        <div>
          <SongList
            songs={songs}
            setSongs={setSongs}
            setSelectedSong={setSelectedSongIndex}
          />
        </div>
        <div>
          <VideoPlayer
            selectedSong={selectedSongIndex === null ? null : (songs[selectedSongIndex] as Song)}
            updateSelectedSong={updateSelectedSong}
          />
        </div>
      </div>
      <Button variant="outline">保存</Button>
      <Button variant="outline">完成</Button>
    </>
  )
}

export default Create
