import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import ThumbnailEditor from "@/components/thumbnail-editor"
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

const SaveCrossfade = () => {
  // post
  console.log("SaveCrossfade")
  // playページに遷移
}

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)
  const [thumbnailEmoji, setThumbnailEmoji] = useState<string>("🎵")
  const [thumbnailBackgroundColor, setThumbnailBackgroundColor] = useState<string>("#eeffff")

  const updateSelectedSong = (song: Song) => {
    if (selectedSongIndex === null) return
    const newSongs = [...songs]
    newSongs[selectedSongIndex] = song
    setSongs(newSongs)
  }

  return (
    <>
      <HelmetPack
        title="Kokosuki Create Page"
        description="Let's make your crossfade!"
        image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
        link="https://kokosuki.com/create"
      />

      <div className="grid grid-cols-2 gap-20">
        <div>
          <SongList
            isPlayer={false}
            songs={songs}
            setSongs={setSongs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
          />
        </div>
        <div>
          <div className="flex p-4">
            <Thumbnail
              backgroundColor={thumbnailBackgroundColor}
              character={thumbnailEmoji}
            />

            <div className="items-center p-4">
              <ThumbnailEditor
                emoji={thumbnailEmoji}
                backgroundColor={thumbnailBackgroundColor}
                setEmoji={setThumbnailEmoji}
                setBackgroundColor={setThumbnailBackgroundColor}
              />
              <div className="pb-6 pt-6  font-bold">
                <Input
                  type="text"
                  placeholder="クロスフェードのタイトル名"
                  className="text-2xl"
                />
              </div>
            </div>
          </div>

          <VideoPlayer
            selectedSong={selectedSongIndex === null ? null : (songs[selectedSongIndex] as Song)}
            updateSelectedSong={updateSelectedSong}
          />
        </div>
      </div>
      <div className="flex gap-10 pt-10">
        <Button onClick={SaveCrossfade}>完成</Button>
      </div>
    </>
  )
}

export default Create
