import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}/likes"]["post"]
type Response = Schema["responses"]["200"]["content"]

const PostCrossfadeIdLikes = http.post(
  "http://localhost:8787/crossfades/:crossfadeId/likes",
  () => {
    return HttpResponse.json<Response>()
  },
)

export { PostCrossfadeIdLikes }
