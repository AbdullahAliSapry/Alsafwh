import { Box } from "@mantine/core";
import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

export default function Stars({ num }: { num: number }) {
  const fullStars = Math.floor(num); // Number of full stars
  const hasHalfStar = num % 1 !== 0; // Check if there is a half star

  const starsArray = [];
  if (hasHalfStar) {
    starsArray.push(
      <IconStarHalfFilled
        key="half"
        style={{ width: "20px", height: "20px" }}
      />
    );
  }
  for (let i = 0; i < fullStars; i++) {
    starsArray.push(<IconStarFilled key={`full-${i}`} style={{ width: "20px", height: "20px" }} />);
  }



  return (
    <Box display={"flex"}  style={{ gap: "5px" }} c={"yellow"} mt={10} mb={3}>
      {starsArray}
    </Box>
  );
}
