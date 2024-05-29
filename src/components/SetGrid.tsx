import { SimpleGrid } from "@chakra-ui/react";
import SetCard from "./SetCard";
import { useContext } from "react";
import { SetsContext } from "../App";
import { Set } from "../App";

interface Props {
  sets: Set[];
}

const SetGrid = ({ sets }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 4 }} spacing={5}>
      {sets.map((set) => (
        <SetCard set={set}></SetCard>
      ))}
    </SimpleGrid>
  );
};

export default SetGrid;
