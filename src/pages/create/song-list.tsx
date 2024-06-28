import { Dispatch, SetStateAction, useState } from "react"
import useSWR from "swr"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Song } from "./page"

type SongListProps = {
  songs: Song[]
  setSongs: Dispatch<SetStateAction<Song[]>>
}

// 楽曲を削除
const DeleteSong = ({
  index,
  setSongs,
}: {
  index: number
  setSongs: Dispatch<SetStateAction<Song[]>>
}) => {
  return (
    <Button
      onClick={() => {
        setSongs((songs) => {
          return songs.filter((_, i) => i !== index)
        })
      }}
    >
      削除
    </Button>
  )
}

const SongList = ({ songs, setSongs }: SongListProps) => {
  // 合計再生時間を計算
  const totalPlayTime = songs.reduce((acc, song) => {
    return acc + (song.endTime - song.startTime)
  }, 0)

  return (
    <div className="w-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>再生時間</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>
                <YouTubeTitle youtubeId={song.songId} />
              </TableCell>
              <TableCell> {song.endTime - song.startTime} </TableCell>
              <TableCell>
                <DeleteSong
                  index={index}
                  setSongs={setSongs}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>合計</TableCell>
            <TableCell>{totalPlayTime}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <AddSongDialog setSongs={setSongs} />
    </div>
  )
}

export { SongList }

type YouTubeTitleProps = {
  youtubeId: string
}

const YouTubeTitle = ({ youtubeId }: YouTubeTitleProps) => {
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=AIzaSyClGx_5aGhwIivUhduJiQO8twAUW8Rb-_w`,
  )

  console.log(data)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (!data.items.length) {
    return <div>動画が見つかりません</div>
  }

  return <div>{data.items[0].snippet.title}</div>
}

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

  const form = useForm<z.infer<typeof addSongFormSchema>>({
    resolver: zodResolver(addSongFormSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (values: z.infer<typeof addSongFormSchema>) => {
    const url = new URL(values.url)
    const songId = url.searchParams.get("v") as string

    setSongs((songs) => {
      return [
        ...songs,
        {
          songId: songId,
          startTime: 0,
          endTime: 60,
          createDate: new Date(),
          updateDate: new Date(),
        },
      ]
    })

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>曲を追加</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>曲を追加</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button type="submit">追加</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
