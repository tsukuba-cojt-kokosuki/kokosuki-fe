import { useState } from "react"
import { SongList } from "./song-list"

export type Song = {
  songId: string
  startTime: number
  endTime: number
  createDate: Date
  updateDate: Date
}

const defaultSongs = [
  {
    songId: "dQw4w9WgXcQ",
    startTime: 20,
    endTime: 25,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "71u0i6J-Qes",
    startTime: 30,
    endTime: 35,
    createDate: new Date(),
    updateDate: new Date(),
  },
]

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
  }

  const getIframeSrc = () => {
    if (!selectedSong) return ""
    const { songId, startTime, endTime } = selectedSong
    return `https://www.youtube.com/embed/${songId}?start=${startTime}&end=${endTime}`
  }

  // selectedSong に0番目を代入しておく
  if (selectedSong === null) {
    setSelectedSong(songs[0] || null)
  }

  return (
    <>
      <SongList
        songs={songs}
        setSongs={setSongs}
        setSelectedSong={handleSongSelect}
      />
      <iframe
        id="player"
        width="640"
        height="360"
        src={getIframeSrc()}
        frameBorder="0"
        allowFullScreen
      />
    </>
  )
}

export default Create
