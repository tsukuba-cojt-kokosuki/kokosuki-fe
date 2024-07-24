import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { components } from "@/lib/api/schema"
import { SongList } from "./song-list"
import { VideoPlayer } from "./video-player"

export type Song = components["schemas"]["Song"]

const SaveCrossfade = () => {
  // post
  console.log("SaveCrossfade")
  // playページに遷移
}

const Create = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null)
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
