import { Grid, GridItem, Text } from "@chakra-ui/react";
import FormButton from "./FormButton";

interface Props {
  onSubmit: (title: string, emoji: string) => void;
}

const Header = ({ onSubmit }: Props) => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"title" "button"`,
          sm: `"title button"`,
        }}
        gap={{ base: "1em", sm: "0" }}
        alignItems="center"
        justifyContent={{
          base: "center",
          sm: "space-between",
        }}
      >
        <GridItem area="title">
          <Text fontSize="4xl">To Do List</Text>
        </GridItem>
        <GridItem area="button">
          <FormButton onSubmit={(title, emoji) => onSubmit(title, emoji)} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Header;
