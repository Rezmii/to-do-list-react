import { useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Text } from "@chakra-ui/react";

interface SetDetailsProps {
  sets: Set[];
}

const SetDetails = ({ sets }: SetDetailsProps) => {
  const { title } = useParams<{ title: string }>();
  const set = sets.find((s) => s.title === title);

  if (!set) {
    return <Text>Set not found</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl">{set.icon}</Text>
      <Text fontSize="xl">{set.title}</Text>
      <Text>{set.progress} done</Text>
    </Box>
  );
};

export default SetDetails;
