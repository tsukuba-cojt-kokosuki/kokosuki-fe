import { useContext, useState } from "react"
import useSWR from "swr"
import { Pencil, Trash2 } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Thumbnail } from "@/components/card"
import { DeleteCrossfadeDialog } from "@/components/delete-crossfade-dialog"
import HelmetPack from "@/components/helmet-pack"
import { UserName } from "@/components/username"
import { paths } from "@/lib/api/schema"
import { SongList } from "../../components/song-list"
import { Song } from "../../components/songs"
import { UserContext } from "../../components/user-context"
import { VideoPlayer } from "../../components/video-player"
import { VideoPlayerSkeleton } from "../../components/video-player-skeleton"

type CrossfadesGetResponse =
  paths["/crossfades/{crossfadeId}"]["get"]["responses"]["200"]["content"]["application/json"]

const Play = () => {
  const user = useContext(UserContext)
  const { id: crossFadeId } = useParams()
  const { data, isLoading, error } = useSWR<CrossfadesGetResponse>("/crossfades/" + crossFadeId)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(0)

  if (error) {
    throw new Error() // 404
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  const nextSong = () => {
    setSelectedSongIndex((selectedSongIndex) => {
      if (selectedSongIndex === null || selectedSongIndex === data.songs.length - 1)
        return selectedSongIndex

      return selectedSongIndex + 1
    })
  }

  return (
    <>
      <HelmetPack
        title={`${data.title} | Kokosuki`}
        description="Let's create your crossfade!"
      />

      <div className="flex flex-col justify-between w-full h-full gap-4 lg:gap-20 lg:flex-row">
        <div className="order-2 grow lg:order-1">
          <SongList
            modifiable={false}
            songs={data.songs}
            selectedIndex={selectedSongIndex}
            setSelectedSong={setSelectedSongIndex}
          />
        </div>
        <div className="sticky top-0 order-1 pb-4 lg:order-2 bg-background">
          <header className="flex gap-3 py-4 mb-2 lg:gap-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-row h-full gap-3 lg:gap-6">
                <Thumbnail
                  {...data.icon}
                  className="w-16 h-16 lg:h-24 lg:w-24 shrink-0"
                />
                <div className="flex flex-col justify-center shrink">
                  <h1 className="mb-1 text-lg font-bold leading-5 lg:text-xl">{data.title}</h1>
                  <div className="text-xs lg:text-sm">
                    作成者:
                    <UserName
                      userId={data.creatorId}
                      className="mx-2"
                    />
                  </div>
                </div>
              </div>
              {user?.id === data.creatorId && (
                <div className="flex flex-row gap-2 h-fit">
                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link to={`/edit/${crossFadeId}`}>
                      <span className="hidden lg:inline">編集</span>
                      <Pencil className="inline w-6 h-6 lg:hidden" />
                    </Link>
                  </Button>
                  <DeleteCrossfadeDialog crossfade={data}>
                    <Button variant="outline">
                      <span className="hidden lg:inline">削除</span>
                      <Trash2 className="inline lg:hidden" />
                    </Button>
                  </DeleteCrossfadeDialog>
                </div>
              )}
            </div>
          </header>
          {selectedSongIndex === null ? (
            <VideoPlayerSkeleton />
          ) : (
            <VideoPlayer
              modifiable={false}
              selectedSong={data.songs[selectedSongIndex] as Song}
              toNextSong={nextSong}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default Play
