import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, ChevronUp, Music2, Play, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { YouTubeTitle } from "@/components/youtube-title"
import { Song } from "./songs"

type SongListProps = {
  songs: Song[]
  selectedIndex: number | null
  // 選んだ曲のインデックスを設定する関数 引数はindex
  setSelectedSong: (index: number | null) => void
} & (
  | {
      modifiable: true
      deleteSong: (index: number) => void
      swapSongs: (a: number, b: number) => void
      addSong: (song: Song) => void
    }
  | {
      modifiable: false
      deleteSong?: undefined
      swapSongs?: undefined
      addSong?: undefined
    }
)

const SongList = ({
  songs,
  modifiable,
  selectedIndex,
  setSelectedSong,
  deleteSong = () => {},
  swapSongs = () => {},
  addSong = () => {},
}: SongListProps) => {
  // 合計再生時間を計算
  const totalPlayTime = songs.reduce((acc, song) => {
    return acc + (song.end - song.start)
  }, 0)

  const handleDeleteSong = (index: number) => {
    deleteSong(index)
  }

  const handleMakeSelected = (index: number) => {
    setSelectedSong(index)
  }

  const handleSwapUpSong = (index: number) => {
    if (index === 0) {
      return
    }
    // songs[index] と songs[index - 1] を入れ替える
    swapSongs(index, index - 1)
  }

  const handleSwapDownSong = (index: number) => {
    if (index === songs.length - 1) {
      return
    }
    // songs[index] と songs[index + 1] を入れ替える
    swapSongs(index, index + 1)
  }

  return (
    <div className="w-160">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">タイトル</TableHead>
            <TableHead className="w-1/6">長さ</TableHead>
            <TableHead></TableHead>
            {modifiable && (
              <>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center">
                  {index === selectedIndex && (
                    <Music2 className="shrink-0 animate-bounce h-6 w-6" />
                  )}
                  <YouTubeTitle youtubeId={song.videoId} />
                </div>
              </TableCell>
              <TableCell> {song.end - song.start} 秒</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleMakeSelected(index)}
                >
                  <Play />
                </Button>
              </TableCell>
              {modifiable && (
                <>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-10 h-10 m-0 p-0"
                      onClick={() => handleDeleteSong(index)}
                    >
                      <X />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="m-0 p-0">
                      <Button
                        onClick={() => handleSwapUpSong(index)}
                        size="icon"
                        variant="ghost"
                      >
                        <ChevronUp />
                      </Button>
                      <Button
                        onClick={() => handleSwapDownSong(index)}
                        size="icon"
                        variant="ghost"
                      >
                        <ChevronDown />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>合計</TableCell>
            <TableCell>{totalPlayTime}秒</TableCell>
            <TableCell></TableCell>
            {modifiable && (
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
      {modifiable && <AddSongDialog addSong={addSong} />}
    </div>
  )
}

export { SongList }

const addSongDialogFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: "YouTube の URLを入力してください" })
    .superRefine((value, context) => {
      if (!value) {
        return false
      }

      const url = (() => {
        try {
          return new URL(value)
        } catch {
          // TypeError: Invalid URL
          return null
        }
      })()
      if (url === null) {
        context.addIssue({
          message: "URL が不正です",
          code: z.ZodIssueCode.custom,
        })
        return false
      }

      const videoId = url.searchParams.get("v")

      if (url.hostname !== "www.youtube.com") {
        context.addIssue({
          message: "YouTube の URLを入力してください",
          code: z.ZodIssueCode.custom,
        })
      }

      if (!videoId) {
        context.addIssue({
          message: "URL に Video ID が見つかりません",
          code: z.ZodIssueCode.custom,
        })
      }

      return true
    }),
})

type AddSongDialogProps = {
  addSong: (song: Song) => void
}

const AddSongDialog = ({ addSong }: AddSongDialogProps) => {
  const form = useForm<z.infer<typeof addSongDialogFormSchema>>({
    resolver: zodResolver(addSongDialogFormSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (values: z.infer<typeof addSongDialogFormSchema>) => {
    const url = new URL(values.url)
    const videoId = url.searchParams.get("v") as string

    addSong({
      videoId,
      start: 0,
      end: 10,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTubeのURLで曲を追加</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
