import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  task: {
    taskData: string;
    startTime: string;
    currentTime: string;
    endTime: string;
  };
  className: string;
}

const TaskCard = ({ task, className }: Props) => {
  const { startUnit, endUnit, currUnit, unitString } = calculateTimeScale(
    task.startTime,
    task.endTime,
    task.currentTime
  );

  return (
    <Card className={className}>
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
            <span className="text-4xl font-semibold">{endUnit - currUnit}</span>
            {/* <Separator /> */}

            <span className="text-sm text-gray-400 mt-1"></span>
            <span className="text-xs text-gray-400">{unitString}</span>
          </div>
        </CircularProgressbarWithChildren>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

function calculateTimeScale(
  startTime: string,
  endTime: string,
  currentTime: string
) {
  // Parse the input strings as dates
  const start = new Date(startTime);
  const end = new Date(endTime);
  const current = new Date(currentTime);

  // Calculate differences in milliseconds
  const totalDiff = end.getTime() - start.getTime();
  const currentDiff = current.getTime() - start.getTime();

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
