import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}) {
  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center ",
        caption_label: "text-sm font-medium ",
        nav: "space-x-1 flex items-center ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 border-[#dddddd] hover:bg-[#f4f4f4] text-[#0d1220] opacity-100",
        nav_button_next: "absolute right-1 border-[#dddddd] hover:bg-[#f4f4f4] text-[#0d1220] opacity-100",
        table: "w-full border-collapse space-y-1",
        head_row: "flex space-x-2",
        head_cell: "rounded-md w-9 font-normal text-[0.8rem] text-[#0d1220] opacity-100",
        row: "flex w-full mt-2 space-x-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 bg-",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-[#dddddd]"
        ),
        day_selected:
          "bg-gray-800 text-white hover:text-white hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800",
        day_today: "bg-[#dddddd] cursor-default",
        day_outside:
          "text-[#f4f4f4] duration-0 hover:bg-[#f4f4f4] hover:text-[#f4f4f4] bg-opacity-0 hover:bg-opacity-0 bg-[#f4f4f4] active:bg-[#f4f4f4] focus:bg-[#f4f4f4] cursor-default",
        day_disabled: "opacity-100",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
