import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const LoginMessage = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ?? "https://kokosuki-be-prod.tsukuba-cojt-kokosuki.workers.dev"

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">このページへのアクセスには、ログインが必要です</div>
      <Link to={`${backendUrl}/login?redirect_to=${window.location.origin}`}>
        <Button>ログイン</Button>
      </Link>
    </div>
  )
}

export { LoginMessage }
