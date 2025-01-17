import useSWR from "swr"
import Card from "@/components/card"
import { CardContainer } from "@/components/card-container"
import HelmetPack from "@/components/helmet-pack"
import { paths } from "@/lib/api/schema"

type latestCrossfadesResponse =
  paths["/crossfades/latest"]["get"]["responses"]["200"]["content"]["application/json"]
type popularCrossfadesResponse =
  paths["/crossfades/popular"]["get"]["responses"]["200"]["content"]["application/json"]

const Index = () => {
  return (
    <>
      <HelmetPack
        title="Kokosuki"
        description="Let's create your crossfade!"
      />

      <div>
        <LatestCrossfades />
        <PopularCrossfades />
      </div>
    </>
  )
}

const LatestCrossfades = () => {
  const { data, error } = useSWR<latestCrossfadesResponse>("/crossfades/latest")
  if (error) {
    return <div className="text-center">Failed to load</div>
  }

  if (!data) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <section className="mb-12">
      <h1 className="text-3xl font-bold">新着のクロスフェード</h1>
      <div className="line-clamp-2">
        <CardContainer>
          {data.map((crossfade, i) => (
            <Card
              key={i}
              showEditButton={false}
              showDeleteButton={false}
              crossfade={crossfade}
            />
          ))}
        </CardContainer>
      </div>
    </section>
  )
}

const PopularCrossfades = () => {
  const { data, error } = useSWR<popularCrossfadesResponse>("/crossfades/popular")
  if (error) {
    return <div className="text-center">Failed to load</div>
  }

  if (!data) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <section className="mb-12">
      <h1 className="text-3xl font-bold">人気のクロスフェード</h1>
      <div className="line-clamp-2">
        <CardContainer>
          {data.map((crossfade, i) => (
            <Card
              key={i}
              showEditButton={false}
              showDeleteButton={false}
              crossfade={crossfade}
            />
          ))}
        </CardContainer>
      </div>
    </section>
  )
}

export default Index
