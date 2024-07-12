import useSWR from "swr"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Card from "@/components/card"
import { CardContainer } from "@/components/card-container"
import { paths } from "@/lib/api/schema"

type latestCrossfadesResponse =
  paths["/crossfades/latest"]["get"]["responses"]["200"]["content"]["application/json"]
type popularCrossfadesResponse =
  paths["/crossfades/popular"]["get"]["responses"]["200"]["content"]["application/json"]

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <LatestCrossfades />
      <PopularCrossfades />
    </div>
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
      <h1 className="text-3xl font-bold mb-6">新着のクロスフェード</h1>
      <div className="line-clamp-2">
        <CardContainer>
          {data.map((crossfade, i) => (
            <Card
              key={i}
              title={crossfade.title}
              link={`/play/${crossfade.id}`}
              image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
              showSquarePen={false}
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
      <h1 className="text-3xl font-bold mb-6">人気のクロスフェード</h1>
      <div className="line-clamp-2">
        <CardContainer>
          {data.map((crossfade, i) => (
            <Card
              key={i}
              title={crossfade.title}
              link="https://google.com"
              image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
              showSquarePen={false}
            />
          ))}
        </CardContainer>
      </div>
    </section>
  )
}

export default Index
