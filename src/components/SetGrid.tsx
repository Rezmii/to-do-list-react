import { SimpleGrid } from "@chakra-ui/react";
import SetCard from "./SetCard";

const SetGrid = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 4 }} spacing={5}>
      <SetCard></SetCard>
      <SetCard></SetCard>
      <SetCard></SetCard>
      <SetCard></SetCard>
      <SetCard></SetCard>
      <SetCard></SetCard>
      <SetCard></SetCard>
    </SimpleGrid>
  );
};

export default SetGrid;
