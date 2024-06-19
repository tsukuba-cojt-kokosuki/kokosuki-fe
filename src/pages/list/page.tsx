import Card from "@/components/card";
import { useState } from "react"

type CrossFade = {
  crossFadeId: string
  user: string
  createDate: Date
  image: string
  title: string
}

const defaultCrossFade = [
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "9182739812748124",
    user: "Alice",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
    title: "タイトル"
  },
  {
    crossFadeId: "2745739812748124",
    user: "Bob",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png",
    title: "supercalifragilisticexpialidocious"
  },
  {
    crossFadeId: "2745818124",
    user: "Bob",
    createDate:  new Date(),
    image: "https://images.ctfassets.net/in6v9lxmm5c8/7J6X29QCpCjoReVMQFOC1D/f091383d411092eaa4487bad33560ca6/golang.png?q=50&fm=webp",
    title: "あ"
  } ,
  {
    crossFadeId: "27439818124",
    user: "Bob",
    createDate:  new Date(),
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    title: "あいうえおかきくけこさしすせそ"
  } 
]


const List = () => {
  const [crossFades, setCrossFades] = useState<CrossFade[]>(defaultCrossFade)
  return (
    <>
      <div className="flex flex-wrap place-content-center">
      {crossFades.map((crossFade, index) => (
        <Card title={crossFade.title} link="https://google.com" image={crossFade.image} />
      ))}
      </div>
    </>  
    )
}

export default List