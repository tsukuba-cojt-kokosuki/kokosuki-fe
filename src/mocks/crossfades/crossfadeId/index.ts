import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const getCrossfadesCrossfadeId = http.get("/crossfades/{crossfadeId}", () => {
  return HttpResponse.json<Response>({
    id: "crossfade1",
    title: "Crossfade 1",
    songs: [
      {
        videoId: "dCEMSaho0io",
        start: 20,
        end: 40,
      },
      {
        videoId: "fxPcJTU-A8U",
        start: 45,
        end: 70,
      },
    ],
    creatorId: "12345",
    icon: {
      character: "🍎",
      backgroundColor: "#66FFA6",
    },
  })
})

export { getCrossfadesCrossfadeId }
