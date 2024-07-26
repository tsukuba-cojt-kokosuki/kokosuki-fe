import useSWRImmutable from "swr/immutable"
import { Skeleton } from "./ui/skeleton"

type YouTubeTitleProps = {
  youtubeId: string
}

const YouTubeTitle = ({ youtubeId }: YouTubeTitleProps) => {
  // YouTube の動画タイトルは頻繁に変わるものではないので、useSWRImmutable を使って一度取得したらキャッシュを使い回す
  const { data, error, isLoading } = useSWRImmutable(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
  )

  if (error) return <div>Failed to Load</div>
  if (isLoading) return <Skeleton className="h-6 w-48" />

  if (!data?.items?.length || !data?.items[0]?.snippet?.title) {
    return <div>動画が見つかりません</div>
  }

  return <div>{data.items[0].snippet.title}</div>
}

export { YouTubeTitle }
