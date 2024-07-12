import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, ChevronUp, Delete, Play } from "lucide-react"
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
import { Song } from "./page"

type SongListProps = {
  songs: Song[]
  isPlayer: boolean
  setSongs: Dispatch<SetStateAction<Song[]>>
  // 選んだ曲のインデックスを設定する関数 引数はindex
  setSelectedSong: Dispatch<SetStateAction<number | null>>
}

const SongList = ({ songs, isPlayer, setSongs, setSelectedSong }: SongListProps) => {
  // 合計再生時間を計算
  const totalPlayTime = songs.reduce((acc, song) => {
    return acc + (song.endTime - song.startTime)
  }, 0)

  const handleDeleteSong = (index: number) => {
    setSongs((songs) => songs.filter((_, i) => i !== index))
  }

  const handleMakeSelected = (index: number) => {
    setSelectedSong(index)
  }

  const swapSong = (songs: Song[], index1: number, index2: number) => {
    const newSongs = [...songs]
    const tmp = newSongs[index1]
    newSongs[index1] = newSongs[index2]
    newSongs[index2] = tmp
    setSongs(newSongs)
  }

  const handleSwapUpSong = (index: number) => {
    if (index === 0) {
      return
    }
    // songs[index] と songs[index - 1] を入れ替える
    swapSong(songs, index, index - 1)
  }

  const handleSwapDownSong = (index: number) => {
    if (index === songs.length - 1) {
      return
    }
    // songs[index] と songs[index + 1] を入れ替える
    swapSong(songs, index, index + 1)
  }

  return (
    <div className="w-160">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>長さ</TableHead>
            {!isPlayer && (
              <>
                <TableHead></TableHead>
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
                <YouTubeTitle youtubeId={song.songId} />
              </TableCell>
              <TableCell> {song.endTime - song.startTime} 秒</TableCell>
              {!isPlayer && (
                <>
                  <TableCell>
                    <Button onClick={() => handleMakeSelected(index)}>
                      <Play />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteSong(index)}>
                      <Delete />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="m-0 p-0">
                      <Button
                        onClick={() => handleSwapUpSong(index)}
                        variant="ghost"
                      >
                        <ChevronUp className="w-8 h-8" />
                      </Button>
                      <Button
                        onClick={() => handleSwapDownSong(index)}
                        variant="ghost"
                      >
                        <ChevronDown className="w-8 h-8" />
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
          </TableRow>
        </TableBody>
      </Table>
      {!isPlayer && <AddSongDialog setSongs={setSongs} />}
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

      const songId = url.searchParams.get("v")

      if (url.hostname !== "www.youtube.com") {
        context.addIssue({
          message: "YouTube の URLを入力してください",
          code: z.ZodIssueCode.custom,
        })
      }

      if (!songId) {
        context.addIssue({
          message: "URL に Video ID が見つかりません",
          code: z.ZodIssueCode.custom,
        })
      }

      return true
    }),
})

type AddSongDialogProps = {
  setSongs: Dispatch<SetStateAction<Song[]>>
}

const AddSongDialog = ({ setSongs }: AddSongDialogProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof addSongDialogFormSchema>>({
    resolver: zodResolver(addSongDialogFormSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (values: z.infer<typeof addSongDialogFormSchema>) => {
    const url = new URL(values.url)
    const songId = url.searchParams.get("v") as string

    setSongs((songs) => {
      return [
        ...songs,
        {
          songId: songId,
          startTime: 0,
          endTime: 999,
          createDate: new Date(),
          updateDate: new Date(),
        },
      ]
    })
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YoutubeのURLで曲を追加</FormLabel>
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
