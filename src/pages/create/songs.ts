import { Dispatch, SetStateAction, useState } from "react"
import { components } from "@/lib/api/schema"

type Song = components["schemas"]["Song"]

type UseSongs = (
  defaultSongs: Song[],
  defaultSelectedSongIndex: number,
) => {
  songs: Song[]
  addSong: (song: Song) => void
  deleteSong: (index: number) => void
  updateSong: (index: number, song: Song) => void
  swapSongs: (a: number, b: number) => void
  selectedSongIndex: number | null
  setSelectedSongIndex: Dispatch<SetStateAction<number | null>>
}

const useSongs: UseSongs = (defaultSongs, defaultSelectedSongIndex) => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(
    defaultSelectedSongIndex,
  )

  const addSong = (song: Song) => {
    setSongs((songs) => [...songs, song])
  }

  const deleteSong = (index: number) => {
    setSongs((songs) => {
      if (
        selectedSongIndex !== null &&
        !(songs.length - 1 <= selectedSongIndex && selectedSongIndex >= 0)
      ) {
        setSelectedSongIndex(null)
      }
      return songs.filter((_, i) => i !== index)
    })
  }

  const updateSong = (index: number, song: Song) => {
    setSongs((songs) => {
      if (!(index >= 0 && index < songs.length)) return songs

      const updatedSongs = [...songs]
      updatedSongs[index] = song

      return updatedSongs
    })
  }

  const swapSongs = (a: number, b: number) => {
    setSongs((songs) => {
      if (!(a >= 0 && a < songs.length && b >= 0 && b < songs.length)) return songs

      const updatedSongs = [...Array(songs.length)].map((_, i) => {
        if (i === a) return songs[b] as Song
        if (i === b) return songs[a] as Song
        return songs[i] as Song
      })

      return updatedSongs
    })
  }

  return {
    songs,
    addSong,
    deleteSong,
    updateSong,
    swapSongs,
    selectedSongIndex,
    setSelectedSongIndex,
  }
}

export { useSongs }
export type { Song, UseSongs }
