import { useState } from "react"
import { components } from "@/lib/api/schema"

type Song = components["schemas"]["Song"]

type State = {
  songs: Song[]
  selectedSongIndex: number | null
}

type UseSongs = (
  defaultSongs: Song[],
  defaultSelectedSongIndex: number,
) => State & {
  addSong: (song: Song) => void
  deleteSong: (index: number) => void
  swapSongs: (a: number, b: number) => void
  setSelectedSongIndex: (index: number | null) => void
  selectNextSong: () => void
  updateSelectedSong: (song: Song) => void
}

const useSongs: UseSongs = (defaultSongs, defaultSelectedSongIndex) => {
  const [state, setState] = useState<State>({
    songs: defaultSongs,
    selectedSongIndex: defaultSelectedSongIndex,
  })

  const addSong = (song: Song) => {
    setState((state) => ({ ...state, songs: [...state.songs, song] }))
  }

  const deleteSong = (index: number) => {
    setState(({ songs, selectedSongIndex }) => {
      const updatedSelectedSongIndex =
        selectedSongIndex !== null &&
        !(0 <= selectedSongIndex && selectedSongIndex < songs.length - 1)
          ? null
          : selectedSongIndex

      const updatedSongs = songs.filter((_, i) => i !== index)

      return {
        songs: updatedSongs,
        selectedSongIndex: updatedSelectedSongIndex,
      }
    })
  }

  const swapSongs = (a: number, b: number) => {
    setState((state) => {
      if (!(a >= 0 && a < state.songs.length && b >= 0 && b < state.songs.length)) return state

      const updatedSongs = [...Array(state.songs.length)].map((_, i) => {
        if (i === a) return state.songs[b] as Song
        if (i === b) return state.songs[a] as Song
        return state.songs[i] as Song
      })

      return { ...state, songs: updatedSongs }
    })
  }

  const setSelectedSongIndex = (index: number | null) => {
    setState((state) => ({ ...state, selectedSongIndex: index }))
  }

  const selectNextSong = () => {
    setState(({ songs, selectedSongIndex }) => {
      const updatedSelectedSongIndex =
        selectedSongIndex === null || selectedSongIndex === songs.length - 1
          ? null
          : selectedSongIndex + 1

      return { songs, selectedSongIndex: updatedSelectedSongIndex }
    })
  }

  const updateSelectedSong = (song: Song) => {
    setState(({ songs, selectedSongIndex }) => {
      if (selectedSongIndex === null) return { songs, selectedSongIndex }

      const updatedSongs = [...songs]
      updatedSongs[selectedSongIndex] = song

      return { songs: updatedSongs, selectedSongIndex }
    })
  }

  return {
    ...state,
    addSong,
    deleteSong,
    swapSongs,
    setSelectedSongIndex,
    selectNextSong,
    updateSelectedSong,
  }
}

export { useSongs }
export type { Song, UseSongs }
