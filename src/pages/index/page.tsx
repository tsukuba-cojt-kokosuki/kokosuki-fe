import useSWR from "swr"
import Card from "@/components/card"
import { paths } from "@/lib/api/schema"
import { CardContainer } from "@/components/card-container"

type latestCrossfadesResponse =
  paths["/crossfades/latest"]["get"]["responses"]["200"]["content"]["application/json"]
type popularCrossfadesResponse =
  paths["/crossfades/popular"]["get"]["responses"]["200"]["content"]["application/json"]

const Index = () => {
  return (
    <>
     <LatestCrossfades />
     <PopularCrossfades />
    </>
  )
}

const LatestCrossfades = () => {
  const { data , error } = useSWR<latestCrossfadesResponse>("/crossfades/latest")
  if (error) {
    return <div className="text-center">Failed to load</div>
  }

  if (!data) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <>
    <h1 className="text-2xl font-bold"> 新着のクロスフェード </h1>
    <CardContainer>
      {data.map((crossfade, i) => (
        <Card
          key={i}
          title={crossfade.title}
          link="https://google.com"
          image="https://www.hitachi-solutions-create.co.jp/column/img/image-generation-ai.jpg"
          showSquarePen = {false}
        />
      ))}
    </CardContainer>
    </>
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
    <>
    <h1 className=" text-2xl font-bold"> 人気のクロスフェード </h1>
    <CardContainer>
      {data.map((crossfade, i) => (
        <Card
          key={i}
          title={crossfade.title}
          link="https://google.com"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqudxP5dIcrv35nuiDU4l8Qrtwhwiv_os-w&s"
          showSquarePen = {false}
        />
      ))}
    </CardContainer>
    </>
  )
}

export default Index
