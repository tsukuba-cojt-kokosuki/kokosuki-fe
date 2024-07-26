import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Thumbnail } from "@/components/card"
import HelmetPack from "@/components/helmet-pack"
import ThumbnailEditor from "@/components/thumbnail-editor"
import { components } from "@/lib/api/schema"
import { SongList } from "./song-list"
import { Song, useSongs } from "./songs"
import { VideoPlayer } from "./video-player"
import { VideoPlayerSkeleton } from "./video-player-skeleton"

type Icon = components["schemas"]["Crossfade"]["icon"]

const SaveCrossfade = () => {
  // post
  console.log("SaveCrossfade")
  // playページに遷移
}

const defaultSongs = [
  {
    videoId: "dQw4w9WgXcQ",
    start: 15,
    end: 30,
  },
]

const Create = () => {
  const {
    songs,
    selectedSongIndex,
    addSong,
    deleteSong,
    swapSongs,
    setSelectedSongIndex,
    updateSelectedSong,
  } = useSongs(defaultSongs, 0)
  const [icon, setIcon] = useState<Icon>({ character: "🎵", backgroundColor: "#eeffff" })

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
            modifiable={true}
            songs={songs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
            addSong={addSong}
            deleteSong={deleteSong}
            swapSongs={swapSongs}
          />
          <Button
            onClick={SaveCrossfade}
            className="block mt-8"
          >
            完成
          </Button>
        </div>
        <div>
          <div className="flex gap-6 py-4 mb-2">
            <Thumbnail
              {...icon}
              className="h-24 w-24"
            />
            <div className="h-24 flex flex-col justify-between">
              <Input
                type="text"
                placeholder="クロスフェードのタイトル"
                className="text-xl w-80 font-bold"
                defaultValue="新規クロスフェード"
              />
              <div className="w-fit">
                <ThumbnailEditor
                  icon={icon}
                  updateIcon={setIcon}
                />
              </div>
            </div>
          </div>
          {selectedSongIndex === null ? (
            <VideoPlayerSkeleton />
          ) : (
            <VideoPlayer
              modifiable={true}
              selectedSong={songs[selectedSongIndex] as Song}
              updateSelectedSong={updateSelectedSong}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Create
