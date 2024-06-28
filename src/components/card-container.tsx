import { ReactNode } from "react"

type CardContainerProps = {
    children: ReactNode,
}

const CardContainer = ({children}: CardContainerProps) => {
  return (
    <>
        <div className="container pt-8 mt-0 mx-auto px-5 py-20">
          <div className="flex flex-wrap -m-4">
        {children}
          </div>
        </div>
    </>
  )
}

export { CardContainer }