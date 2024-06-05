import { useState } from "react"
import { Button } from "./components/ui/button"

function App() {
  const [count, setCount] = useState<number>(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Hello, World!</h1>
      <p className="text-lg">Count: {count}</p>
      <Button onClick={handleIncrement}>Increment!</Button>
      <Button onClick={handleDecrement}>Decrement!</Button>
    </>
  )
}

export default App
