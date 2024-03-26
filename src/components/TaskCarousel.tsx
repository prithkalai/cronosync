import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const TaskCarousel = () => {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const [activeButton, setActiveButton] = useState<"next" | "prev">("next");

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        activeButton === "next" &&
        nextButtonRef.current &&
        !nextButtonRef.current.disabled
      ) {
        nextButtonRef.current.click();
      } else if (
        activeButton === "prev" &&
        prevButtonRef.current &&
        !prevButtonRef.current.disabled
      ) {
        prevButtonRef.current.click();
      }

      // Check if the current button is disabled, switch to the other button
      if (activeButton === "next" && nextButtonRef.current?.disabled) {
        setActiveButton("prev");
      } else if (activeButton === "prev" && prevButtonRef.current?.disabled) {
        setActiveButton("next");
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeButton]);

  const tasks = [
    {
      taskData: "Scratch Nose",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:00:30Z",
      currentTime: "2024-01-01T00:00:19Z",
      unit: "second(s)",
    },
    {
      taskData: "Study Break",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:45:00Z",
      currentTime: "2024-01-01T00:01:07Z",
      unit: "minute(s)",
    },
    {
      taskData: "Take Nyquil",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T12:00:00Z",
      currentTime: "2024-01-01T03:18:01Z",
      unit: "hour(s)",
    },
    {
      taskData: "Oil Hair",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-11T00:00:00Z",
      currentTime: "2024-01-03T05:34:14Z",
      unit: "day(s)",
    },
    {
      taskData: "Wash Bed-Sheets",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-06-01T00:00:00Z",
      currentTime: "2024-04-21T22:38:49Z",
      unit: "month(s)",
    },
    {
      taskData: "Dental Appointment",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2027-01-01T00:00:00Z",
      currentTime: "2025-05-09T16:00:56Z",
      unit: "year(s)",
    },
  ];

  return (
    <div className="w-[500px] h-fit flex justify-center">
      <Carousel className="w-[300px]">
        <CarouselContent className="flex items-center p-0">
          {tasks.map((task, index) => {
            const { startUnit, endUnit, currUnit, unitString } =
              calculateTimeScale(
                task.startTime,
                task.endTime,
                task.currentTime
              );

            return (
              <CarouselItem key={index}>
                <Card className="shadow-md h-fit w-[300px] p-0">
                  <CardHeader className="p-0">
                    <div className="pl-6 pt-6 pr-6">
                      <CardTitle className="text-3xl font-normal">
                        {task.taskData}
                      </CardTitle>
                      <CardDescription>
                        <p className="w-fit">
                          Every {endUnit} {unitString}
                        </p>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-0">
                    <CircularProgressbarWithChildren
                      className="size-[170px] pl-4 pr-4 flex items-center"
                      strokeWidth={6}
                      value={currUnit}
                      minValue={startUnit}
                      maxValue={endUnit}
                      circleRatio={0.8}
                      styles={buildStyles({
                        rotation: 0.6,
                        strokeLinecap: "round",
                      })}
                    >
                      <div className=" flex flex-col w-fit h-fit items-center justify-end">
                        <span className="text-sm text-gray-400">Next In</span>
                        <span className="text-4xl font-semibold">
                          {endUnit - currUnit}
                        </span>
                        {/* <Separator /> */}

                        <span className="text-sm text-gray-400 mt-1"></span>
                        <span className="text-xs text-gray-400">
                          {unitString}
                        </span>
                      </div>
                    </CircularProgressbarWithChildren>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden" ref={prevButtonRef} />
        <CarouselNext className="hidden" ref={nextButtonRef} />
      </Carousel>
    </div>
  );
};

export default TaskCarousel;

function calculateTimeScale(
  startTime: string,
  endTime: string,
  currentTime: string
) {
  const end = new Date(endTime);
  const start = new Date(startTime);
  const current = new Date(currentTime);

  // Calculate differences in milliseconds
  const totalDiff = end.getTime() - start.getTime();
  const currentDiff = current.getTime() - current.getTime();

  // Determine the unit and calculate the differences in that unit
  let unitString:
    | "second(s)"
    | "minute(s)"
    | "hour(s)"
    | "day(s)"
    | "month(s)"
    | "year(s)";
  let endUnit: number;
  let currUnit: number;
  const oneSecond = 1000;
  const oneMinute = 60 * oneSecond;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneMonth = 30.44 * oneDay; // Average month length
  const oneYear = 365.25 * oneDay; // Accounting for leap years

  if (totalDiff < oneMinute) {
    unitString = "second(s)";
    endUnit = Math.floor(totalDiff / oneSecond);
    currUnit = Math.floor(currentDiff / oneSecond);
  } else if (totalDiff < oneHour) {
    unitString = "minute(s)";
    endUnit = Math.floor(totalDiff / oneMinute);
    currUnit = Math.floor(currentDiff / oneMinute);
  } else if (totalDiff < oneDay) {
    unitString = "hour(s)";
    endUnit = Math.floor(totalDiff / oneHour);
    currUnit = Math.floor(currentDiff / oneHour);
  } else if (totalDiff < oneMonth) {
    unitString = "day(s)";
    endUnit = Math.floor(totalDiff / oneDay);
    currUnit = Math.floor(currentDiff / oneDay);
  } else if (totalDiff < oneYear) {
    unitString = "month(s)";
    endUnit = Math.floor(totalDiff / oneMonth);
    currUnit = Math.floor(currentDiff / oneMonth);
  } else {
    unitString = "year(s)";
    endUnit = Math.floor(totalDiff / oneYear);
    currUnit = Math.floor(currentDiff / oneYear);
  }

  return {
    startUnit: 0, // This is always zero
    endUnit, // nth unit from the startDay
    currUnit, // nth unit from the start for currentTime
    unitString, // The unit of measurement
  };
}
