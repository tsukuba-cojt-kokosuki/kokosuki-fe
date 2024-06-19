import { Heart } from 'lucide-react';

const Card = (props: {
  link: string | undefined;
  image: string | undefined; title: string 
}) => {
  return (
    <>
      <div className="box-border m-4 shadow-xl w-1/5 hover:bg-stone-600">
        <a href={props.link}>
          <img src={props.image} className="box-border h-64 w-64 p-4 " ></img>
          <div className="pl-4 pr-4 pb-4 ">{props.title}</div>
        </a>
        <div className="pl-4 pr-4 pb-4 "><Heart></Heart></div>
      </div>
    </>
  )
}

export default Card
