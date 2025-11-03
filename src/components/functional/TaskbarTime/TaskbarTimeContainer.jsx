import React, { useState, useEffect } from "react";
import { TaskbarTime } from "@design/TaskbarTime/TaskbarTime";

export const TaskbarTimeContainer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <TaskbarTime time={formattedTime} />;
};

export default TaskbarTimeContainer;
