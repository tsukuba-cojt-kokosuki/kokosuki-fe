import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/popular"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetPopularCrossfades = http.get("/crossfades/popular", () => {
  return HttpResponse.json<Response>([
    {
      id: "crossfade1",
      title: "Crossfade 1",
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
    },
    {
      id: "crossfade2",
      title: "Crossfade 2",
      songs: [
        {
          videoId: "videoId3",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId4",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade4",
      title: "Crossfade 4",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
    {
      id: "crossfade3",
      title: "Crossfade 3",
      songs: [
        {
          videoId: "videoId5",
          start: 0,
          end: 10,
        },
        {
          videoId: "videoId6",
          start: 10,
          end: 20,
        },
      ],
    },
  ])
})

export { GetPopularCrossfades }
