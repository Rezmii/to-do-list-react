import { SimpleGrid } from "@chakra-ui/react";
import SetCard from "./SetCard";
import { Set } from "../App";

interface Props {
  sets: Set[];
}

const SetGrid = ({ sets }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 4 }} spacing={5}>
      {sets.map((set) => (
        <SetCard key={set.title} set={set}></SetCard>
      ))}
    </SimpleGrid>
  );
};

export default SetGrid;
