import { useState } from "react"
import { SongList } from "./song-list"
import HelmetPack from "@/components/helmet-pack"

export type Song = {
  songId: string
  url: string
  startTime: number
  endTime: number
  createDate: Date
  updateDate: Date
}

const defaultSongs = [
  {
    songId: "1",
    url: "https://www.youtube.com/watch?v=1",
    startTime: 0,
    endTime: 60,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "2",
    url: "https://www.youtube.com/watch?v=2",
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
    <HelmetPack
      title="Kokosuki Create Page"
      description="Let's make your crossfade!"
      image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
      link="https://kokosuki.com/create"
    />
    <SongList
      songs={songs}
      setSongs={setSongs}
    />
    </>
  )
}

export default Create
