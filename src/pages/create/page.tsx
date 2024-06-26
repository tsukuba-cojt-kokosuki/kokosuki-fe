import { useState } from "react"
import { SongList } from "./song-list"

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
    startTime: 0,
    endTime: 60,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "114yuwqcQhM",
    startTime: 30,
    endTime: 40,
    createDate: new Date(),
    updateDate: new Date(),
  },
]

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)

  return (
    <>
      <SongList
        songs={songs}
        setSongs={setSongs}
      />
    </>
  )
}

export default Create
