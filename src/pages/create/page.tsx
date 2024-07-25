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
type Icon = components["schemas"]["Crossfade"]["icon"]

const SaveCrossfade = () => {
  // post
  console.log("SaveCrossfade")
  // playページに遷移
}

const Create = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null)
  const [icon, setIcon] = useState<Icon>({ character: "🎵", backgroundColor: "#eeffff" })

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
          <div className="flex gap-6 p-4 mb-2">
            <Thumbnail {...icon} />
            <div className="h-40 flex flex-col justify-around">
              <Input
                type="text"
                placeholder="クロスフェードのタイトル"
                className="text-2xl w-80 font-bold"
              />
              <div className="w-fit">
                <ThumbnailEditor
                  icon={icon}
                  updateIcon={setIcon}
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
