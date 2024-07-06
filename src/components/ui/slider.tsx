import * as React from "react"
import { cn } from "@/lib/utils"
import * as SliderPrimitive from "./radix-primitives/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> & {
  tooltip?: boolean
  value: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  onValueCommit?: (value: number) => void
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
      value={[props.value]}
      defaultValue={props.defaultValue === undefined ? undefined : [props.defaultValue]}
      onValueChange={([value]) => props.onValueChange?.(value as number)}
      onValueCommit={([value]) => props.onValueCommit?.(value as number)}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <TooltipProvider>
        <Tooltip open={props.tooltip}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </TooltipTrigger>
          <TooltipContent>{props.value}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SliderPrimitive.Root>
  ),
)
Slider.displayName = SliderPrimitive.Root.displayName

type RangeSliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> & {
  tooltip?: boolean
  value: [number, number]
  defaultValue?: [number, number]
  onValueChange?: (value: [number, number]) => void
  onValueCommit?: (value: [number, number]) => void
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      minStepsBetweenThumbs={1}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <TooltipProvider>
        <Tooltip open={props.tooltip}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </TooltipTrigger>
          <TooltipContent>{props.value[0]}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip open={props.tooltip}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </TooltipTrigger>
          <TooltipContent>{props.value[1]}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider, Slider }
