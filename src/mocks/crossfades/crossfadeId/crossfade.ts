import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetCrossfadeIdCrossfades = http.get("http://localhost:8787/crossfades/:crossfadeId", () => {
  return HttpResponse.json<Response>({
    id: "crossfadeId",
    creatorId: "creatorId1",
    title: "Crossfade 1",
    icon: {
      character: "crossfade1",
      backgroundColor: "#000001",
    },
    songs: [
      {
        videoId: "videoId1",
        start: 0,
        end: 10,
      },
      {
        videoId: "videoId2",
        start: 10,
        end: 20,
      },
    ],
    likes: 1,
  })
})

export { GetCrossfadeIdCrossfades }
