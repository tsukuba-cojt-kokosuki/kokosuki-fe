import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, ChevronUp, Play, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
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
      <Table className="[&_td]:p-2 [&_th]:px-2">
        <TableHeader>
          <TableRow>
            <TableHead>タイトル</TableHead>
            <TableHead className="px-2 w-14">長さ</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>
                {index === selectedIndex && modifiable && <Badge className="my-1">編集中</Badge>}
                {index === selectedIndex && !modifiable && <Badge className="my-1">再生中</Badge>}
                <YouTubeTitle youtubeId={song.videoId} />
              </TableCell>
              <TableCell>{song.end - song.start}秒</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleMakeSelected(index)}
                  >
                    <Play />
                  </Button>
                  {modifiable && (
                    <>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-10 h-10 p-0 m-0"
                        onClick={() => handleDeleteSong(index)}
                      >
                        <X />
                      </Button>
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => handleSwapUpSong(index)}
                          variant="ghost"
                          size="icon"
                        >
                          <ChevronUp />
                        </Button>
                        <Button
                          onClick={() => handleSwapDownSong(index)}
                          variant="ghost"
                          size="icon"
                        >
                          <ChevronDown />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell>合計</TableCell>
            <TableCell>{totalPlayTime}秒</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {modifiable && <AddSongForm addSong={addSong} />}
    </div>
  )
}

export { SongList }

const addSongFormSchema = z.object({
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

      if (
        !(
          url.hostname === "www.youtube.com" ||
          url.hostname === "m.youtube.com" ||
          url.hostname === "youtu.be"
        )
      ) {
        context.addIssue({
          message: "YouTube の URL を入力してください",
          code: z.ZodIssueCode.custom,
        })
      }

      const videoId =
        url.hostname === "youtu.be" ? url.pathname.substring(1) : url.searchParams.get("v")
      if (!videoId) {
        context.addIssue({
          message: "URL に Video ID が見つかりません",
          code: z.ZodIssueCode.custom,
        })
      }

      return true
    }),
})

type AddSongFormProps = {
  addSong: (song: Song) => void
}

const AddSongForm = ({ addSong }: AddSongFormProps) => {
  const form = useForm<z.infer<typeof addSongFormSchema>>({
    resolver: zodResolver(addSongFormSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (values: z.infer<typeof addSongFormSchema>) => {
    const url = new URL(values.url)
    const videoId =
      url.hostname === "youtu.be"
        ? url.pathname.substring(1)
        : (url.searchParams.get("v") as string)

    addSong({
      videoId,
      start: 0,
      end: 10,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-2 mt-3"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-grow block">
              <FormControl>
                <Input
                  {...field}
                  placeholder="YouTube の 動画 URL を入力"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="block"
          variant="secondary"
        >
          追加
        </Button>
      </form>
    </Form>
  )
}
