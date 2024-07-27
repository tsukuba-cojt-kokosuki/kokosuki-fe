import { crossfades } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/latest"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetLatestCrossfades = http.get("http://localhost:8787/crossfades/latest", () => {
  const sortedCrossfades = crossfades
    .sort((a, b) => {
      return b.createdAt - a.createdAt
    })
    .slice(0, 10)
    .map((crossfade) => {
      return {
        id: crossfade.id,
        creatorId: crossfade.creatorId,
        title: crossfade.title,
        icon: crossfade.icon,
        songs: crossfade.songs,
        liked: crossfade.liked,
      }
    })

  return HttpResponse.json<Response>(sortedCrossfades)
})

export { GetLatestCrossfades }