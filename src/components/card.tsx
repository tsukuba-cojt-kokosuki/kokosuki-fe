import { Copy, Heart, Share, SquarePen, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Card = (props: {
  link: string | undefined
  image: string | undefined
  title: string
  showSquarePen?: boolean
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = () => {
    if (props.link) {
      navigator.clipboard.writeText(props.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <>
      <div className="box-border m-4 shadow-xl sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7 hover:bg-stone-600">
        <a href={props.link}>
          <img
            src={props.image}
            className="box-border h-64 w-full p-4 object-contain "
          ></img>
          <div className="pl-4 pr-4 pb-4 text-xl ">{props.title}</div>
        </a>
        <div className="pl-4 pr-4 pb-4 flex space-x-2">
          <Heart />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="p-0 h-fit"><Share></Share></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>クロスフェードを共有</DialogTitle>
                  <DialogDescription>
                    {props.title}の共有リンクです。
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label
                      htmlFor="link"
                      className="sr-only"
                    >
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
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          {props.showSquarePen && <SquarePen />}
        </div>
      </div>
    </>
  )
}

export default Card