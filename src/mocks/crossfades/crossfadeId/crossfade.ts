import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/{crossfadeId}"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetCrossfadesCrossfadeId = http.get("http://localhost:8787/crossfades/:crossfadeId", () => {
  const crossfadeId = "0d3cb9e9-9f1b-40a1-8482-20f13eedf7b8"

  if (crossfadeId === "0d3cb9e9-9f1b-40a1-8482-20f13eedf7b8") {
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
          videoId: "dQw4w9WgXcQ",
          start: 0,
          end: 10,
        },
        {
          videoId: "33HhfJsg2LE",
          start: 10,
          end: 20,
        },
      ],
      liked: true,
    })
  } else if (crossfadeId === "f0738af4-8c25-4d85-b536-50c7ffd7eca8") {
    return HttpResponse.json<Response>({
      id: "f0738af4-8c25-4d85-b536-50c7ffd7eca8",
      creatorId: "6a696d02-e879-4a20-b387-c009d4c702ec",
      title: "Crossfade 1",
      icon: {
        character: "🍣",
        backgroundColor: "#ffffff",
      },
      songs: [
        {
          videoId: "33HhfJsg2LE",
          start: 0,
          end: 10,
        },
        {
          videoId: "33HhfJsg2LE",
          start: 10,
          end: 20,
        },
      ],
      liked: true,
    })
  } else {
    return HttpResponse.json<Response>({
      id: "f0738af4-8c25-4d85-b536-50c7ffd7eca8",
      creatorId: "6a696d02-e879-4a20-b387-c009d4c702ec",
      title: "Crossfade 1",
      icon: {
        character: "🍣",
        backgroundColor: "#ffffff",
      },
      songs: [
        {
          videoId: "33HhfJsg2LE",
          start: 0,
          end: 10,
        },
        {
          videoId: "33HhfJsg2LE",
          start: 10,
          end: 20,
        },
      ],
      liked: true,
    })
  }
})

export { GetCrossfadesCrossfadeId }
