import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TaskCard from "./TaskCard";
import { useEffect, useRef, useState } from "react";

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
          {tasks.map((task, index) => (
            <CarouselItem key={index}>
              <TaskCard className="shadow-md h-fit w-[300px] p-0" task={task} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" ref={prevButtonRef} />
        <CarouselNext className="hidden" ref={nextButtonRef} />
      </Carousel>
    </div>
  );
};

export default TaskCarousel;
