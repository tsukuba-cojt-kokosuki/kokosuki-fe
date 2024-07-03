import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import Slider from "@mui/material/Slider"
import { clear } from "console"
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
    songId: "33HhfJsg2LE",
    startTime: 143,
    endTime: 172,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "0oPZr_b-P54",
    startTime: 48,
    endTime: 70,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "ftU99KUGIMk",
    startTime: 61,
    endTime: 75,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "YGh0i_yTru0",
    startTime: 59,
    endTime: 81,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    songId: "mIqLF3KfIJs",
    startTime: 37,
    endTime: 70,
    createDate: new Date(),
    updateDate: new Date(),
  },
]

const minDistance = 1

const Create = () => {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [selectedSong, setSelectedSong] = useState<number | null>(0)
  const [value1, setValue1] = useState<[number, number]>([0, 1])
  const [playing, setPlaying] = useState(true)
  const player = useRef<YouTubePlayer>(null)
  // const [timeOutId, setTimeOutId] = useState<number>(0)
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  )
  const [songLength, setSongLength] = useState<number>(0)
  const [songCurrentTime, setSongCurrentTime] = useState<number>(0)

  const handleSongSelect = (index: number | null) => {
    setSelectedSong(index)
  }

  // 曲が選択されたら
  useEffect(() => {
    if (selectedSong === null) return
    const song = songs[selectedSong]

    if (song === undefined) return
    // YouTubeのURLを設定
    setYoutubeUrl(`https://www.youtube.com/watch?v=${song.songId}`)
  }, [selectedSong])

  const onReady = () => {
    if (selectedSong === null) return
    const song = songs[selectedSong]

    if (song === undefined) return
    if (player.current === null) return
    // 曲の再生位置を設定
    player.current.seekTo(song.startTime)
    // シークバーの設定
    setValue1([song.startTime, song.endTime])
    // 曲の長さを取得
    setSongLength(player.current.getDuration())
  }

  const handleSongCurrentTime = () => {
    if (player.current === null) return
    setSongCurrentTime(player.current.getCurrentTime())
    // 終点より後ろに行ったら再生を止めるみたいな処理をいれたら良さそうなんだけどうまくいかない
  }

  useEffect(() => {
    setInterval(handleSongCurrentTime, 1000)
  }, [])

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
    }

    // selectedSongを更新
    if (selectedSong === null) return
    const newSongs = [...songs]
    newSongs[selectedSong] = {
      ...newSongs[selectedSong],
      startTime: value1[0],
      endTime: value1[1],
    }
    setSongs(newSongs)
  }

  return (
    <>
      <SongList
        songs={songs}
        setSongs={setSongs}
        setSelectedSong={handleSongSelect}
      />
      <ReactPlayer
        url={youtubeUrl}
        ref={player}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReady={onReady}
      />
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        min={0}
        max={songLength}
        valueLabelDisplay="on"
        disableSwap
      />
      <Slider
        size="small"
        disabled
        value={songCurrentTime}
        min={0}
        max={songLength}
        valueLabelDisplay="on"
      />
    </>
  )
}

export default Create
