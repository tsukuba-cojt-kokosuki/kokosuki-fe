import { ReactNode } from "react"

type CardContainerProps = {
    children: ReactNode,
}

const CardContainer = ({children}: CardContainerProps) => {
  return (
    <>
 <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-start -mx-2">
        {children}
          </div>
        </div>
    </>
  )
}

export { CardContainer }