import { SimpleGrid, Text } from "@chakra-ui/react";
import SetCard from "./SetCard";
import { Set } from "../App";

interface Props {
  sets: Set[];
}

const SetGrid = ({ sets }: Props) => {
  if (sets.length === 0) return <Text>No sets added.</Text>;
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 4 }} spacing={5}>
      {sets.map((set, i) => (
        <SetCard key={i} set={set}></SetCard>
      ))}
    </SimpleGrid>
  );
};

export default SetGrid;
