import useSWR from "swr"
import { Button } from "@/components/ui/button"

const Login = () => {
  const { data, error, isLoading } = useSWR("/")

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  return (
    <div>
      <h1>Login</h1>
      <p>{JSON.stringify(data)}</p>
      <Button asChild>
        <a href={`http://localhost:8787/login?redirect_to=${window.location.origin}`}>Login</a>
      </Button>
    </div>
  )
}

export default Login
