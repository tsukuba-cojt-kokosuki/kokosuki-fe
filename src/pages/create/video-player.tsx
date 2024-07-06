import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { RangeSlider, Slider } from "@/components/ui/slider"
import { Song } from "./page"

const minDistance = 1

type VideoPlayerProps = {
  selectedSong: Song | null
  updateSelectedSong: (song: Song) => void
}

const VideoPlayer = ({ selectedSong, updateSelectedSong }: VideoPlayerProps) => {
  const [values, setValues] = useState<[number, number]>([0, 1])
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
    setValues([selectedSong.startTime, selectedSong.endTime])
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

  const handleRangeSliderChange = (newValues: [number, number]) => {
    if (player.current === null) return

    const handleNewValues = (prevValues: [number, number]): [number, number] => {
      const activeThumb = prevValues[0] === newValues[0] ? 1 : 0

      if (activeThumb === 0) {
        player.current?.seekTo(newValues[0])
        setPlaying(true)
        return [Math.min(newValues[0], prevValues[1] - minDistance), prevValues[1]]
      } else {
        return [prevValues[0], Math.max(newValues[1], prevValues[0] + minDistance)]
      }
    }
    setValues(handleNewValues)

    // selectedSongを更新
    if (selectedSong === null) return
    updateSelectedSong({
      ...selectedSong,
      startTime: values[0],
      endTime: values[1],
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
      <RangeSlider
        value={values}
        onValueChange={handleRangeSliderChange}
        min={0}
        max={songLength}
        className="mb-12"
        tooltip={true}
      />
      <Slider
        disabled
        value={songCurrentTime}
        min={0}
        max={songLength}
        tooltip={true}
      />
    </>
  )
}

export { VideoPlayer }
