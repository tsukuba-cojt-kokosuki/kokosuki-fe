import useSWRImmutable from "swr/immutable"

type YouTubeTitleProps = {
  youtubeId: string
}

// youtubeのタイトルを取得しstringで返す
const YouTubeTitle = ({ youtubeId }: YouTubeTitleProps) => {
  // YouTube の動画タイトルは頻繁に変わるものではないので、useSWRImmutable を使って一度取得したらキャッシュを使い回す
  const { data, error, isLoading } = useSWRImmutable(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=AIzaSyClGx_5aGhwIivUhduJiQO8twAUW8Rb-_w`,
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (!data.items.length) {
    return <div>動画が見つかりません</div>
  }

  // stringで返す
  return <div>{data.items[0].snippet.title}</div>
}

export { YouTubeTitle }
