import { crossfades } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

const GetCrossfadesCrossfadeId = http.get(
  "http://localhost:8787/crossfades/:crossfadeId",
  ({ params }) => {
    type Schema = paths["/crossfades/{crossfadeId}"]["get"]
    type Response = Schema["responses"]["200"]["content"]["application/json"]
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

const PostCrossfadesCrossfadeId = http.post(
  "http://localhost:8787/crossfades/:crossfadeId",
  async ({ request }) => {
    type Schema = paths["/crossfades/{crossfadeId}"]["put"]
    type Request = Schema["requestBody"]["content"]["application/json"]
    type Response = Schema["responses"]["201"]["content"]["application/json"]

    const newCrossfade = (await request.json()) as Request
    return HttpResponse.json<Response>(
      {
        id: newCrossfade.id,
      },
      { status: 201 },
    )
  },
)

const PutCrossfadesCrossfadeId = http.put(
  "http://localhost:8787/crossfades/:crossfadeId",
  async ({ request }) => {
    type Schema = paths["/crossfades/{crossfadeId}"]["put"]
    type Request = Schema["requestBody"]["content"]["application/json"]
    type Response = Schema["responses"]["201"]["content"]["application/json"]

    const newCrossfade = (await request.json()) as Request
    return HttpResponse.json<Response>(
      {
        id: newCrossfade.id,
      },
      { status: 200 },
    )
  },
)

export { GetCrossfadesCrossfadeId, PostCrossfadesCrossfadeId, PutCrossfadesCrossfadeId }
