import { Link } from "react-router-dom"

const Index = () => (
  <div>
    <h1>title</h1>
    <Link to="create">createlink</Link>
    <br />
    <Link to="list">listlink</Link>
    <br />
    <Link to="login">loginlink</Link>
  </div>
)

export default Index
