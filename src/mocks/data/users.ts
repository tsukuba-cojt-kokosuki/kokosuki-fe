import { components } from "@/lib/api/schema"

type User = components["schemas"]["User"]

const users: User[] = [
  {
    id: "6a696d02-e879-4a20-b387-c009d4c702ec",
    name: "Mock User Alice",
  },
  {
    id: "0bddc2ec-e543-4e13-91a8-4a6b980389e5",
    name: "Mock User Bob",
  },
  {
    id: "f79e9cc2-09c0-4db1-a7f7-59b6916d378e",
    name: "Mock User Charlie",
  },
  {
    id: "e4f0d6a8-6e0d-4b6a-8e1b-8b1f2d7c6a0b",
    name: "Mock User David",
  },
  {
    id: "f3e6b5f7-7f9e-4c4e-9c7f-9e8e4b5f3e6b",
    name: "Mock User Eve",
  },
]

export { users }
