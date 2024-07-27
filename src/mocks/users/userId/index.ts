import { crossfades } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/users/{userId}/crossfades"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetUsersUserIdCrossfades = http.get(
  "http://localhost:8787/users/:userId/crossfades",
  ({ params }) => {
    const userId = params.userId
    const filteredCrossfades = crossfades
      .filter((crossfade) => crossfade.creatorId === userId)
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

    return HttpResponse.json<Response>(filteredCrossfades)
  },
)

export { GetUsersUserIdCrossfades }
