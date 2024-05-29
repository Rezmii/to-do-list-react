import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"header" "main"`}
        templateRows={"auto 1fr"}
        width="85vw"
        borderRadius="25px"
        bg="lightgray"
        padding="20px"
        gap="3em"
        marginY="3em"
      >
        <GridItem area="header">
          <Header />
        </GridItem>
        <GridItem area="main">
          <SetGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
