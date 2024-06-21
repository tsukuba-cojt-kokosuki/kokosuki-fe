import { ReactNode } from "react"

type CardContainerProps = {
    children: ReactNode,
}

const CardContainer = ({children}: CardContainerProps) => {
  return (
    <>
        <div className="grid gap-4 grid-cols-5">
        {children}
        </div>
    </>
  )
}

export { CardContainer }