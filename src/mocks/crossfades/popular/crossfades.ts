import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/popular"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetPopularCrossfades = http.get("http://localhost:8787/crossfades/popular", () => {
  return HttpResponse.json<Response>([
    {
      id: "crossfade1",
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
      likes: 1
    },
    {
      id: "crossfade2",
      creatorId: "creatorId2",
      title: "Crossfade 2",
      icon: {
        character: "crossfade2",
        backgroundColor: "#000002",
      },
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
      likes: 2
    },
    {
      id: "crossfade3",
      creatorId: "creatorId3",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
    {
      id: "crossfade4",
      creatorId: "creatorId4",
      title: "Crossfade 4",
      icon: {
        character: "crossfade4",
        backgroundColor: "#000004",
      },
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
      likes: 4
    },
    {
      id: "crossfade3",
      creatorId: "creatorId3",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
    {
      id: "crossfade3",
      creatorId: "creatorId4",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
    {
      id: "crossfade3",
      creatorId: "creatorId5",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
    {
      id: "crossfade3",
      creatorId: "creatorId6",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
    {
      id: "crossfade3",
      creatorId: "creatorId7",
      title: "Crossfade 3",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000003",
      },
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
      likes: 3
    },
  ])
})

export { GetPopularCrossfades }
