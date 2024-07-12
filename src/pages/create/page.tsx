import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    endTime: 92,
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

// 保存するときに走らせる関数
const SaveCrossfade = () => {}

// 完成ボタン
const Complete = () => {
  SaveCrossfade()
  console.log("complete")
  // 保存後にページ遷移
}

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
      <div className="pb-6 w-1/2 font-bold">
        <Input
          type="text"
          placeholder="クロスフェードのタイトル名"
          className="text-2xl"
        />
      </div>
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
      <div className="flex gap-10 pt-10">
        <Button onClick={SaveCrossfade}>保存</Button>
        <Button onClick={Complete}>完成</Button>
      </div>
    </>
  )
}

export default Create
