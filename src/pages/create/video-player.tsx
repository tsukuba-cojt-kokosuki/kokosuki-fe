import { useEffect, useRef, useState } from "react"
import { Music } from "lucide-react"
import { set } from "react-hook-form"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RangeSlider, Slider } from "@/components/ui/slider"
import { YouTubeTitle } from "@/components/youtube-title"
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
  const [timeRangeValues, setTimeRangeValues] = useState<[number, number]>([0, 1])
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
    setYoutubeUrl(`https://www.youtube.com/watch?v=${selectedSong.videoId}`)
  }, [selectedSong])

  const updateSongRangeValues = () => {
    // selectedSongを更新
    if (selectedSong === null) return
    updateSelectedSong({
      ...selectedSong,
      start: timeRangeValues[0],
      end: timeRangeValues[1],
    })
  }

  const onReady = () => {
    if (selectedSong === null) return
    if (player.current === null) return
    setPlaying(true)
    // 曲の再生位置を設定
    player.current.seekTo(selectedSong.start)
    // シークバーの設定
    setTimeRangeValues([selectedSong.start, selectedSong.end])
    // 曲の長さを取得
    setSongLength(player.current.getDuration())
  }

  // 現在の再生位置を始点にする
  const setSongStartTime = () => {
    if (player.current === null) return
    const currentTime = Math.round(player.current.getCurrentTime())
    setTimeRangeValues([currentTime, timeRangeValues[1]])
    updateSongRangeValues()
  }

  // 現在の再生位置を終点にする
  const setSongEndTime = () => {
    if (player.current === null) return
    const currentTime = Math.round(player.current.getCurrentTime())
    setTimeRangeValues([timeRangeValues[0], currentTime])
    updateSongRangeValues()
  }

  // 試聴開始
  function startPreview() {
    if (player.current === null) return
    player.current.seekTo(timeRangeValues[0])
    onPlay()
  }

  function onPlay() {
    setPlaying(true)
    setVolume(1.0)
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
    if (timeRangeValues[0] <= currentTime && currentTime <= timeRangeValues[0] + 2) {
      setVolume(easeOutCirc((currentTime - timeRangeValues[0]) / 2))
    }
    if (timeRangeValues[1] - 2 <= currentTime && currentTime <= timeRangeValues[1]) {
      setVolume(easeInCirc((timeRangeValues[1] - currentTime) / 2))
    }
    if (currentTime > timeRangeValues[1] && currentTime < timeRangeValues[1] + 0.3) {
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
    setTimeRangeValues(handleNewValues)
    setVolume(1.0)

    updateSongRangeValues()
    updateSongRangeValues()
  }

  return (
    <>
      <ReactPlayer
        url={youtubeUrl}
        ref={player}
        playing={playing}
        onPlay={onPlay}
        onPause={() => setPlaying(false)}
        onReady={onReady}
        onProgress={handleSongCurrentTime}
        progressInterval={50}
        volume={volume}
        controls={!isPlayer}
      />
      {!isPlayer && (
        <>
          <RangeSlider
            value={timeRangeValues}
            onValueChange={handleRangeSliderChange}
            min={0}
            max={songLength}
            className="mt-6 mb-6"
            disabled={isPlayer}
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={setSongStartTime}>現在の再生箇所を始点に</Button>
            <Button onClick={setSongEndTime}>現在の再生箇所を終点に</Button>
            <Button onClick={startPreview}>プレビュー</Button>
          </div>
        </>
      )}
      <div className="flex items-center pt-4">
        <Music className="m-4" /> <YouTubeTitle youtubeId={selectedSong?.videoId} />
      </div>
      {isPlayer && (
        <Progress
          value={
            ((songCurrentTime - timeRangeValues[0]) * 100) /
            (timeRangeValues[1] - timeRangeValues[0])
          }
          max={100}
        />
      )}
    </>
  )
}

export { VideoPlayer }
