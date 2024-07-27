import { crossfades } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/popular"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetPopularCrossfades = http.get("http://localhost:8787/crossfades/popular", () => {
  const popularCrossfades = crossfades
    .sort((a, b) => b.likes - a.likes)
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

  return HttpResponse.json<Response>(popularCrossfades)
})

export { GetPopularCrossfades }
