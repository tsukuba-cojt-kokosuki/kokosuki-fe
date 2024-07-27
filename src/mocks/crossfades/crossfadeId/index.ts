import { crossfades } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetCrossfadesCrossfadeId = http.get(
  "http://localhost:8787/crossfades/:crossfadeId",
  ({ params }) => {
    const crossfadeId = params.crossfadeId
    const crossfade = crossfades.find((crossfade) => crossfade.id === crossfadeId)
    if (!crossfade) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json<Response>({
      id: crossfade.id,
      creatorId: crossfade.creatorId,
      title: crossfade.title,
      icon: crossfade.icon,
      songs: crossfade.songs,
      liked: crossfade.liked,
    })
  },
)

export { GetCrossfadesCrossfadeId }
