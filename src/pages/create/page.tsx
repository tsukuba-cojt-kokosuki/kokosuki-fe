import { useEffect, useRef, useState } from "react"
import Slider from "@mui/material/Slider"
import { Play } from "lucide-react"
import ReactPlayer from "react-player/youtube"
import YouTubePlayer from "react-player/youtube"
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

function valuetext(value: number) {
  return `${value}°C`
}

const minDistance = 1

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [value1, setValue1] = useState<[number, number]>([20, 25])
  const [playing, setPlaying] = useState(true)
  const player = useRef<YouTubePlayer>(null)
  const [timeOutId, setTimeOutId] = useState<number>(0)

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
    setValue1([song.startTime, song.endTime])
  }

  useEffect(() => {
    if (selectedSong) {
      setValue1([selectedSong.startTime, selectedSong.endTime])
    }
  }, [selectedSong])

  const handleChange1 = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (player.current === null) return

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0] as number, value1[1] - minDistance), value1[1]])
      player.current.seekTo(value1[0])
      setPlaying(true)
    } else {
      setValue1([value1[0], Math.max(newValue[1] as number, value1[0] + minDistance)])
      // 終了時間を設定
    }
    clearTimeout(timeOutId)
    setTimeOutId(
      setTimeout(
        () => {
          setPlaying(false)
        },
        (value1[1] - value1[0]) * 1000,
      ),
    )
    console.log((value1[1] - value1[0]) * 1000)
  }

  return (
    <>
      <SongList
        songs={songs}
        setSongs={setSongs}
        setSelectedSong={handleSongSelect}
      />
      <ReactPlayer
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ref={player}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </>
  )
}

export default Create
