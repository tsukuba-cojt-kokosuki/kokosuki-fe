import { Dispatch, SetStateAction, useState } from "react"
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

const SongList = ({ songs, setSongs }: SongListProps) => {
  return (
    <div className="w-96">
      <Table>
                <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>start</TableHead>
            <TableHead>end</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell> {song.url} </TableCell>
              <TableCell> {song.startTime} </TableCell>
              <TableCell> {song.endTime} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddSongDialog setSongs={setSongs} />
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

      const url = new URL(value)
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
          songId,
          url: values.url,
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
