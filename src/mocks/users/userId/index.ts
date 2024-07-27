import { crossfades, users } from "@/mocks/data"
import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

const GetUsersUserId = http.get("http://localhost:8787/users/:userId", ({ params }) => {
  type Schema = paths["/users/{userId}"]["get"]
  type Response = Schema["responses"]["200"]["content"]["application/json"]

  const userId = params.userId
  const user = users.find((user) => user.id === userId)

  if (!user) {
    return new HttpResponse(null, { status: 404 })
  }

  return HttpResponse.json<Response>(user)
})

const GetUsersUserIdCrossfades = http.get(
  "http://localhost:8787/users/:userId/crossfades",
  ({ params }) => {
    type Schema = paths["/users/{userId}/crossfades"]["get"]
    type Response = Schema["responses"]["200"]["content"]["application/json"]

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

export { GetUsersUserId, GetUsersUserIdCrossfades }
