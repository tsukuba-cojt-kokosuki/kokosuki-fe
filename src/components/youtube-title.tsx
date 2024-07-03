import useSWR from "swr"

type YouTubeTitleProps = {
  youtubeId: string
}

const YouTubeTitle = ({ youtubeId }: YouTubeTitleProps) => {
  return (
    <div>
      現在の再生時刻を高頻度に取得しようとしたらリクエストが無限に飛ぶようになってしまったので一時的にこうしています
    </div>
  )
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=AIzaSyClGx_5aGhwIivUhduJiQO8twAUW8Rb-_w`,
  )
  console.log(data)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (!data.items.length) {
    return <div>動画が見つかりません</div>
  }

  return <div>{data.items[0].snippet.title}</div>
}

export { YouTubeTitle }
