import useSWR from "swr"

type YouTubeTitleProps = {
  youtubeId: string
}

const YouTubeTitle = ({ youtubeId }: YouTubeTitleProps) => {
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=AIzaSyClGx_5aGhwIivUhduJiQO8twAUW8Rb-_w`,
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (!data.items.length) {
    return <div>動画が見つかりません</div>
  }

  return <div>{data.items[0].snippet.title}</div>
}

export { YouTubeTitle }
