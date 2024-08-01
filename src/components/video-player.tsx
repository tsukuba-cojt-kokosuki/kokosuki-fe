import { useRef, useState } from "react"
import { Music } from "lucide-react"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RangeSlider } from "@/components/ui/slider"
import { YouTubeTitle } from "@/components/youtube-title"
import { Song } from "./songs"

const minDistance = 1

type VideoPlayerProps = {
  selectedSong: Song
} & (
  | {
      modifiable: true
      updateSelectedSong: (song: Song) => void
      toNextSong?: undefined
    }
  | {
      modifiable: false
      updateSelectedSong?: undefined
      toNextSong: () => void
    }
)

const VideoPlayer = ({
  modifiable,
  selectedSong,
  toNextSong = () => {},
  updateSelectedSong = () => {},
}: VideoPlayerProps) => {
  const player = useRef<ReactPlayer>(null)
  const [timeRangeValues, setTimeRangeValues] = useState<[number, number]>([0, 10])
  const [playing, setPlaying] = useState(true)
  const [songLength, setSongLength] = useState<number>(0)
  const [songCurrentTime, setSongCurrentTime] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)
  const youtubeUrl = `https://www.youtube.com/watch?v=${selectedSong.videoId}`

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
    // もし、終点よりも後ろに設定しようとしたら、終点はその1秒うしろにする
    if (currentTime >= timeRangeValues[1]) {
      setTimeRangeValues([timeRangeValues[1] - 1, timeRangeValues[1]])
      updateSongRangeValues()
      return
    }
    setTimeRangeValues([currentTime, timeRangeValues[1]])
    updateSongRangeValues()
  }

  // 現在の再生位置を終点にする
  const setSongEndTime = () => {
    if (player.current === null) return
    const currentTime = Math.round(player.current.getCurrentTime())
    // もし、始点よりも前に設定しようとしたら、始点はその1秒前にする
    if (currentTime <= timeRangeValues[0]) {
      setTimeRangeValues([timeRangeValues[0], timeRangeValues[0] + 1])
      updateSongRangeValues()
      return
    }
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
    updateSongRangeValues()

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
      if (!modifiable) {
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
  }

  return (
    <div>
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
        controls={modifiable}
        style={{
          aspectRatio: "16 / 9",
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
        }}
        height="100%"
        witdh="100%"
      />
      <div className="flex items-center py-2 text-sm md:text-base">
        <Music className="mr-3" />
        <YouTubeTitle youtubeId={selectedSong.videoId} />
      </div>
      {modifiable && (
        <>
          <RangeSlider
            value={timeRangeValues}
            onValueChange={handleRangeSliderChange}
            min={0}
            max={songLength}
            className="py-4"
            disabled={!modifiable}
          />
          <div className="flex flex-col gap-2 pt-2 lg:gap-4 lg:flex-row">
            <div className="flex justify-between gap-2 lg:gap-4">
              <Button
                onClick={setSongStartTime}
                variant="secondary"
                size="sm"
                className="flex-grow text-xs lg:text-sm"
              >
                現在の再生箇所を始点に
              </Button>
              <Button
                onClick={setSongEndTime}
                variant="secondary"
                size="sm"
                className="flex-grow text-xs lg:text-sm"
              >
                現在の再生箇所を終点に
              </Button>
            </div>
            <Button
              onClick={startPreview}
              variant="secondary"
              size="sm"
            >
              プレビュー
            </Button>
          </div>
        </>
      )}
      {!modifiable && (
        <Progress
          value={
            ((songCurrentTime - timeRangeValues[0]) * 100) /
            (timeRangeValues[1] - timeRangeValues[0])
          }
          max={100}
          className="h-2 md:h-3"
        />
      )}
    </div>
  )
}

export { VideoPlayer }
