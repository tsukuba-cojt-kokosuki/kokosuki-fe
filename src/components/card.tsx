import { Heart } from 'lucide-react';
import { Share } from 'lucide-react';
import { SquarePen } from 'lucide-react';

const Card = (props: {
  link: string | undefined;
  image: string | undefined; title: string
}) => {
  return (
    <>
      <div className="box-border shadow-xl w-56 hover:bg-stone-600 p-4">
        <a href={props.link} className="block pb-3">
          <img src={props.image} className="box-border h-48 w-48 mb-2" />
          <div>{props.title}</div>
        </a>
        <div className="flex">
          <Heart></Heart>
          <Share className='pl-1'></Share>
          <SquarePen className='pl-1'></SquarePen>
        </div>
      </div>
    </>
  )
}

export default Card
