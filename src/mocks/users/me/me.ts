import { HttpResponse, http } from "msw"
import { paths } from "@/lib/api/schema"

type Schema = paths["/users/me"]["get"]
type Response = Schema["responses"]["200"]["content"]["application/json"]

const GetUsersMe = http.get("http://localhost:8787/users/me", () => {
  return HttpResponse.json<Response>(
    {
      id: "id",
      name: "name",
    })
})

export { GetUsersMe }