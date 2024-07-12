import { useEffect, useRef, useState } from "react"
import { set } from "react-hook-form"
import ReactPlayer from "react-player"
import { RangeSlider, Slider } from "@/components/ui/slider"
import { Song } from "./page"

const minDistance = 1

type VideoPlayerProps = {
  isPlayer: boolean
  selectedSong: Song | null
  updateSelectedSong: (song: Song) => void
  toNextSong: () => void
}

const VideoPlayer = ({
  isPlayer,
  selectedSong,
  updateSelectedSong,
  toNextSong,
}: VideoPlayerProps) => {
  const [values, setValues] = useState<[number, number]>([0, 1])
  const [playing, setPlaying] = useState(true)
  const player = useRef<ReactPlayer>(null)
  // const [timeOutId, setTimeOutId] = useState<number>(0)
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  )
  const [songLength, setSongLength] = useState<number>(0)
  const [songCurrentTime, setSongCurrentTime] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)

  // 曲が選択されたら
  useEffect(() => {
    if (selectedSong === null) return
    // YouTubeのURLを設定
    setYoutubeUrl(`https://www.youtube.com/watch?v=${selectedSong.songId}`)
  }, [selectedSong])

  const onReady = () => {
    if (selectedSong === null) return
    if (player.current === null) return
    setPlaying(true)
    // 曲の再生位置を設定
    player.current.seekTo(selectedSong.startTime)
    // シークバーの設定
    setValues([selectedSong.startTime, selectedSong.endTime])
    // 曲の長さを取得
    setSongLength(player.current.getDuration())
  }

  const handleSongCurrentTime = () => {
    // イージング関数を作る
    const easeOutCirc = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2))
    const easeInCirc = (t: number) => 1 - Math.sqrt(1 - Math.pow(t, 2))

    if (player.current === null) return
    const currentTime = player.current.getCurrentTime()
    setSongCurrentTime(currentTime)

    // 再生停止していたらreturn
    if (!playing) return

    // 音量を再生箇所によって変えていく
    if (values[0] <= currentTime && currentTime <= values[0] + 2) {
      setVolume(easeOutCirc((currentTime - values[0]) / 2))
    }
    if (values[1] - 2 <= currentTime && currentTime <= values[1]) {
      setVolume(easeInCirc((values[1] - currentTime) / 2))
    }
    if (currentTime > values[1]) {
      if (isPlayer) {
        // 次の曲へ移動
        setPlaying(false)
        toNextSong()
      } else {
        setPlaying(false)
      }
    }
  }

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
    setVolume(1.0)

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
        onProgress={handleSongCurrentTime}
        progressInterval={50}
        volume={volume}
      />
      <RangeSlider
        value={values}
        onValueChange={handleRangeSliderChange}
        min={0}
        max={songLength}
        className="mb-6"
        tooltip={true}
        disabled={isPlayer}
      />
      <Slider
        value={songCurrentTime}
        min={0}
        max={songLength}
        tooltip={false}
        disabled={isPlayer}
      />
    </>
  )
}

export { VideoPlayer }
