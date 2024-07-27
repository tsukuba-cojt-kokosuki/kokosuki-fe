import { components } from "@/lib/api/schema"

type Crossfade = components["schemas"]["Crossfade"] & {
  likes: number
  createdAt: number
}

const crossfades: Crossfade[] = [
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
        videoId: "z6x_Xk0WFko",
        start: 0,
        end: 10,
      },
      {
        videoId: "0P0aQreFs8w",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 10,
    createdAt: 1630000000000,
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
        videoId: "gNUyc4mIRws",
        start: 0,
        end: 10,
      },
      {
        videoId: "iyU1t8G0LZw",
        start: 10,
        end: 20,
      },
    ],
    liked: false,
    likes: 5,
    createdAt: 1631000000000,
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
        videoId: "Za9xAlR6-W8",
        start: 0,
        end: 10,
      },
      {
        videoId: "kd5LJ4r-vEY",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 7,
    createdAt: 1632000000000,
  },
  {
    id: "0ecbeaf8-aacf-4e6a-a137-0fdffbe89628",
    creatorId: "6a696d02-e879-4a20-b387-c009d4c702ec",
    title: "Crossfade 4",
    icon: {
      character: "🍅",
      backgroundColor: "#123456",
    },
    songs: [
      {
        videoId: "dCfKciwvc3k",
        start: 0,
        end: 10,
      },
      {
        videoId: "8xZREULMjVM",
        start: 10,
        end: 20,
      },
    ],
    liked: false,
    likes: 3,
    createdAt: 1234000000000,
  },
  {
    id: "1e89e61a-f239-49ab-a1f5-6e1c44866ae1",
    creatorId: "0bddc2ec-e543-4e13-91a8-4a6b980389e5",
    title: "Crossfade 5",
    icon: {
      character: "🍄",
      backgroundColor: "#66FF66",
    },
    songs: [
      {
        videoId: "Av9DvtlJ9_M",
        start: 0,
        end: 10,
      },
      {
        videoId: "NGObhsQsXpA",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 8,
    createdAt: 1835000000000,
  },
  {
    id: "fe4025bc-2dfc-4614-821c-153b8b4db795",
    creatorId: "f79e9cc2-09c0-4db1-a7f7-59b6916d378e",
    title: "Crossfade 6",
    icon: {
      character: "🌽",
      backgroundColor: "#ABABAB",
    },
    songs: [
      {
        videoId: "J_DE2d1F9wU",
        start: 0,
        end: 10,
      },
      {
        videoId: "VxjledMkwyk",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 6,
    createdAt: 1936000000000,
  },
  {
    id: "76f5df2d-b8c7-4acc-bb53-63c7dc6bf446",
    creatorId: "e4f0d6a8-6e0d-4b6a-8e1b-8b1f2d7c6a0b",
    title: "Crossfade 7",
    icon: {
      character: "🍉",
      backgroundColor: "#CD00CA",
    },
    songs: [
      {
        videoId: "RnB8V5Syuo0",
        start: 0,
        end: 10,
      },
      {
        videoId: "L_Vcc5v1Cks",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 9,
    createdAt: 5637000000000,
  },
  {
    id: "92ba7ec2-7053-42d2-bce0-6461a086b4aa",
    creatorId: "e4f0d6a8-6e0d-4b6a-8e1b-8b1f2d7c6a0b",
    title: "Crossfade 8",
    icon: {
      character: "🥦",
      backgroundColor: "#9A1287",
    },
    songs: [
      {
        videoId: "1q_B-yWMJA4",
        start: 0,
        end: 10,
      },
      {
        videoId: "Ssj-NhrKOdg",
        start: 10,
        end: 20,
      },
    ],
    liked: false,
    likes: 2,
    createdAt: 6738000000000,
  },
  {
    id: "ac7da669-b861-4ff4-96c3-fca6e86517a0",
    creatorId: "f3e6b5f7-7f9e-4c4e-9c7f-9e8e4b5f3e6b",
    title: "Crossfade 9",
    icon: {
      character: "🥕",
      backgroundColor: "#000009",
    },
    songs: [
      {
        videoId: "jgjlCcnePk4",
        start: 0,
        end: 10,
      },
      {
        videoId: "t9GqF-oeIl0",
        start: 10,
        end: 20,
      },
    ],
    liked: true,
    likes: 4,
    createdAt: 3679000000000,
  },
  {
    id: "e38f27a8-5429-435e-b40c-461e4e3feff8",
    creatorId: "f3e6b5f7-7f9e-4c4e-9c7f-9e8e4b5f3e6b",
    title: "Crossfade 10",
    icon: {
      character: "🍆",
      backgroundColor: "#753125",
    },
    songs: [
      {
        videoId: "u6OKRQDpC_s",
        start: 0,
        end: 10,
      },
      {
        videoId: "TmwCl9wUrC8",
        start: 10,
        end: 20,
      },
    ],
    liked: false,
    likes: 1,
    createdAt: 4739000000000,
  },
]

export { crossfades }
