import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetCrossfadesCrossfadeId = http.get("http://localhost:8787/crossfades/:crossfadeId", () => {
  return HttpResponse.json<Response>({
    id: "0d3cb9e9-9f1b-40a1-8482-20f13eedf7b8",
    creatorId: "6a696d02-e879-4a20-b387-c009d4c702ec",
    title: "Crossfade 1",
    icon: {
      character: "🍣",
      backgroundColor: "#121212",
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
    liked: true,
  })
})

export { GetCrossfadesCrossfadeId }
