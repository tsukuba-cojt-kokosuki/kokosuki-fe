import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Song = {
  songId: string
  url: string
  startTime: number
  endTime: number
  createDate: Date
  updateDate: Date
}

const defaultSongs = [
  {
    songId: "1",
    url: "https://www.youtube.com/watch?v=1",
    startTime: 0,
    endTime: 60,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "2",
    url: "https://www.youtube.com/watch?v=2",
    startTime: 30,
    endTime: 40,
    createDate: new Date(),
    updateDate: new Date(),
  },
]

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)

  return (
    <>
      <h1>create</h1>

      <Table>
        <TableCaption>キャプション</TableCaption>
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add </DialogTitle>
            <DialogDescription>Add a Youtube URL</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="url"
                className="text-right"
              >
                Youtube URL
              </Label>
              <Input
                id="url"
                defaultValue=""
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add music</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Create
