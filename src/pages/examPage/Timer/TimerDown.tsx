import { Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface TimerDownProps {
  initialMinutes: number;
  onTimerEnd: () => void;
}

export default function TimerDown({
  initialMinutes,
  onTimerEnd,
}: TimerDownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem("remainingTime");
    return savedTime ? Number(savedTime) : initialMinutes * 60;
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerId);
          onTimerEnd(); // Call the callback when the timer ends
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [onTimerEnd]);

  useEffect(() => {
    localStorage.setItem("remainingTime", String(timeLeft));
    if (timeLeft === 0) {
      localStorage.removeItem("remainingTime");
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box>
      <Text c={"rgba(34, 166, 241, 1)"} fw={700} fz={18}>
        الوقت المتبقى: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </Box>
  );
}
