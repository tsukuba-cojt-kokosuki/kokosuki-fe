import useSWR from "swr"
import Card from "@/components/card"
import { paths } from "@/lib/api/schema"

type CrossfadesResponse =
  paths["/users/me/crossfades"]["get"]["responses"]["200"]["content"]["application/json"]

const List = () => {
  const { data: crossfades, error } = useSWR<CrossfadesResponse>("/users/me/crossfades")

  if (error) {
    return <div className="text-center">Failed to load</div>
  }

  if (!crossfades) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="flex flex-wrap place-content-center">
      {crossfades.map((crossfade, i) => (
        <Card
          key={i}
          title={crossfade.title}
          link="https://google.com"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg"
        />
      ))}
    </div>
  )
}

export default List
