import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/crossfades/popular"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetPopularCrossfades = http.get("http://localhost:8787/crossfades/popular", () => {
  return HttpResponse.json<Response>([
    {
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
      likes: 1,
    },
    {
      id: "f0738af4-8c25-4d85-b536-50c7ffd7eca8",
      creatorId: "0bddc2ec-e543-4e13-91a8-4a6b980389e5",
      title: "Crossfade 2",
      icon: {
        character: "🍖",
        backgroundColor: "#1F1F1F",
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
      likes: 2,
    },
    {
      id: "a771c731-b30e-4138-ad90-e9413069941b",
      creatorId: "f79e9cc2-09c0-4db1-a7f7-59b6916d378e",
      title: "Crossfade 3",
      icon: {
        character: "🥟",
        backgroundColor: "#545454",
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
      likes: 3,
    },
    {
      id: "0ecbeaf8-aacf-4e6a-a137-0fdffbe89628",
      creatorId: "d22431f4-b38a-46f0-a87f-2a1bcfb23217",
      title: "Crossfade 4",
      icon: {
        character: "🍅",
        backgroundColor: "#123456",
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
      likes: 4,
    },
    {
      id: "1e89e61a-f239-49ab-a1f5-6e1c44866ae1",
      creatorId: "7e2767b5-4e07-4de9-95b9-188abb52af08",
      title: "Crossfade 5",
      icon: {
        character: "🍄",
        backgroundColor: "#66FF66",
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
      likes: 5,
    },
    {
      id: "fe4025bc-2dfc-4614-821c-153b8b4db795",
      creatorId: "3fba5f12-37c8-4261-9dd6-db8ce79e9878",
      title: "Crossfade 6",
      icon: {
        character: "crossfade3",
        backgroundColor: "#ABABAB",
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
      likes: 6,
    },
    {
      id: "76f5df2d-b8c7-4acc-bb53-63c7dc6bf446",
      creatorId: "49bce3a1-00b7-49ce-819c-5d808ba56580",
      title: "Crossfade 7",
      icon: {
        character: "🍉",
        backgroundColor: "#CD00CA",
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
      likes: 7,
    },
    {
      id: "92ba7ec2-7053-42d2-bce0-6461a086b4aa",
      creatorId: "bbfdb457-8c7d-4896-b318-e999be9fcb39",
      title: "Crossfade 8",
      icon: {
        character: "🥦",
        backgroundColor: "#9A1287",
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
      likes: 8,
    },
    {
      id: "ac7da669-b861-4ff4-96c3-fca6e86517a0",
      creatorId: "fb6e8914-c592-482e-be16-6233b1fd95a9",
      title: "Crossfade 9",
      icon: {
        character: "crossfade3",
        backgroundColor: "#000009",
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
      likes: 9,
    },
    {
      id: "e38f27a8-5429-435e-b40c-461e4e3feff8",
      creatorId: "427800a6-47ca-499c-9696-309955ce8c7b",
      title: "Crossfade 10",
      icon: {
        character: "🍆",
        backgroundColor: "#753125",
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
      likes: 9,
    },
  ])
})

export { GetPopularCrossfades }
