import { useEffect, useRef, useState } from "react"
import { Slider } from "@mui/material"
import ReactPlayer from "react-player"
import { Song } from "./page"

const minDistance = 1

type VideoPlayerProps = {
  selectedSong: Song | null
  updateSelectedSong: (song: Song) => void
}

const VideoPlayer = ({ selectedSong, updateSelectedSong }: VideoPlayerProps) => {
  const [value1, setValue1] = useState<[number, number]>([0, 1])
  const [playing, setPlaying] = useState(true)
  const player = useRef<ReactPlayer>(null)
  // const [timeOutId, setTimeOutId] = useState<number>(0)
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  )
  const [songLength, setSongLength] = useState<number>(0)
  const [songCurrentTime, setSongCurrentTime] = useState<number>(0)

  // 曲が選択されたら
  useEffect(() => {
    if (selectedSong === null) return
    // YouTubeのURLを設定
    setYoutubeUrl(`https://www.youtube.com/watch?v=${selectedSong.songId}`)
  }, [selectedSong])

  const onReady = () => {
    if (selectedSong === null) return
    if (player.current === null) return
    // 曲の再生位置を設定
    player.current.seekTo(selectedSong.startTime)
    // シークバーの設定
    setValue1([selectedSong.startTime, selectedSong.endTime])
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

  const handleChange1 = (_event: Event, _newValue: number | number[], activeThumb: number) => {
    const newValue = _newValue as [number, number]

    if (player.current === null) return

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
      player.current.seekTo(value1[0])
      setPlaying(true)
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }

    // selectedSongを更新
    if (selectedSong === null) return
    updateSelectedSong({
      ...selectedSong,
      startTime: value1[0],
      endTime: value1[1],
    })
  }

  return (
    <>
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

export { VideoPlayer }
