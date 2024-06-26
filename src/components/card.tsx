import { Heart, Share, SquarePen } from 'lucide-react';

const Card = (props: {
  link: string | undefined;
  image: string | undefined; title: string
  showSquarePen?: boolean;
}) => {
  return (
    <>
      <div className="box-border m-4 shadow-xl sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7 hover:bg-stone-600">
        <a href={props.link}>
          <img src={props.image} className="box-border h-64 w-full p-4 object-contain " ></img>
          <div className="pl-4 pr-4 pb-4 text-xl ">{props.title}</div>
        </a>
        <div className="pl-4 pr-4 pb-4 flex space-x-2">
          <Heart />
          <Share />
          {props.showSquarePen && <SquarePen />}
        </div>
      </div>
    </>
  )
}

export default Card