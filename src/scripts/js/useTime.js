import { useState, useEffect } from "react";

export const useTime = () => {
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = localTime.toLocaleTimeString("be-BE", {
    hour: "numeric",
    minute: "numeric",
  });

  return { localTime, formattedTime };
};
