import { Copy, Heart, Share, SquarePen, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import * as DialogPrimitive from "@radix-ui/react-dialog"

const Card = (props: {
  link: string | undefined
  image: string | undefined
  title: string
  showSquarePen?: boolean
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopyClick = () => {
    if (props.link) {
      navigator.clipboard.writeText(props.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }
  const handleLikeClick = () => {
    setLiked(!liked);
  };  return (
    <>
    <div className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] m-2 shadow-xl hover:bg-stone-600 flex flex-col">
        <a href={props.link} className="flex-grow flex flex-col"> {/* ここを変更 */}
          <div className="block p-4">
            <div className="aspect-square w-full overflow-hidden bg-white">
              <img
                src={props.image}
                className="w-full h-full object-cover"
                alt={props.title}
              />
            </div>
          </div>
          <div className="px-4 pb-2 h-24 flex flex-col justify-start"> 
            <h3 className="text-xl sm:text-lg md:text-xl lg:text-xl line-clamp-3 hover:underline">
              {props.title}
            </h3>
          </div>
        </a>
        <div className="px-4 py-4 flex space-x-2 border-t">
          <Button variant="ghost" className="p-0 h-fit" onClick={handleLikeClick}>
            <Heart className={liked ? "fill-current" : ""} />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="p-0 h-fit"><Share /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
  <div className="relative">
    <DialogHeader>
      <DialogTitle>{props.title} を共有</DialogTitle>
      <DialogDescription>
        以下のリンクから共有できます。
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2 mt-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">
          Link
        </Label>
        <Input
          id="link"
          defaultValue={props.link}
          readOnly
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="px-3"
        onClick={handleCopyClick}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
    <DialogPrimitive.Close asChild>
      <Button
        type="button"
        variant="secondary"
        className="absolute right-0 top-0"
      >
        Close
      </Button>
    </DialogPrimitive.Close>
  </div>
</DialogContent>
            </Dialog>
          {props.showSquarePen && <SquarePen />}
        </div>
      </div>
    </>
  )
}

export default Card