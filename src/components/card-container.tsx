import { ReactNode } from "react"

type CardContainerProps = {
  children: ReactNode
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <>
      <div className="px-4 py-8 mx-auto">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">{children}</div>
      </div>
    </>
  )
}

export { CardContainer }
