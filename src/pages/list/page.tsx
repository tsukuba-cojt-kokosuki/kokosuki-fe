import { useContext } from "react"
import useSWR from "swr"
import Card from "@/components/card"
import { CardContainer } from "@/components/card-container"
import HelmetPack from "@/components/helmet-pack"
import { LoginMessage } from "@/components/login-message"
import { paths } from "@/lib/api/schema"
import { UserContext } from "../../components/user-context"

type CrossfadesResponse =
  paths["/users/{userId}/crossfades"]["get"]["responses"]["200"]["content"]["application/json"]

const List = () => {
  const { id: userId } = useContext(UserContext)

  return (
    <>
      <HelmetPack
        title="マイ クロスフェード | Kokosuki"
        description="Let's check this crossfade!"
      />
      <h1 className="text-3xl font-bold">マイ クロスフェード</h1>
      {userId === null ? <LoginMessage /> : <MyCrossfades userId={userId} />}
    </>
  )
}

export default List

type MyCrossfadesProps = {
  userId: string
}

const MyCrossfades = ({ userId }: MyCrossfadesProps) => {
  const { data: crossfades, error } = useSWR<CrossfadesResponse>(`/users/${userId}/crossfades`)

  if (error) {
    return <div className="text-center">Failed to load</div>
  }

  if (!crossfades) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <>
      <CardContainer>
        {crossfades.map((crossfade, i) => (
          <Card
            key={i}
            showEditButton={true}
            showDeleteButton={true}
            crossfade={crossfade}
          />
        ))}
      </CardContainer>
    </>
  )
}
