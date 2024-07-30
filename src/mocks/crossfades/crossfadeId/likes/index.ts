import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

const PostCrossfadeIdLikes = http.post(
  "http://localhost:8787/crossfades/:crossfadeId/likes",
  () => {
    type Schema = paths["/crossfades/{crossfadeId}/likes"]["post"]
    type Response = Schema["responses"]["200"]["content"]
    return HttpResponse.json<Response>()
  },
)

const DeleteCrossfadeIdLikes = http.delete(
  "http://localhost:8787/crossfades/:crossfadeId/likes",
  () => {
    type Schema = paths["/crossfades/{crossfadeId}/likes"]["delete"]
    type Response = Schema["responses"]["200"]["content"]
    return HttpResponse.json<Response>()
  },
)

export { DeleteCrossfadeIdLikes, PostCrossfadeIdLikes }
