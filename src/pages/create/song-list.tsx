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
import { Song } from "./page"

type SongListProps = {
  songs: Song[]
  setSongs: (songs: Song[]) => void
}

const SongList = ({ songs, setSongs }: SongListProps) => {
  return (
    <div>
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
                YouTube URL
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
    </div>
  )
}

export { SongList }
