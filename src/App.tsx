import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SetDetails from "./components/SetDetails";

export interface Set {
  icon: string;
  title: string;
  progress: string;
}

export const SetsContext = createContext(1);

function App() {
  const [sets, setSets] = useState<Set[]>([
    { icon: "💪", title: "Fitness1", progress: "3/5" },
    { icon: "💪", title: "Fitness2", progress: "3/5" },
    { icon: "💪", title: "Fitness3", progress: "3/5" },
    { icon: "💪", title: "Fitness4", progress: "3/5" },
  ]);

  return (
    <>
      <Grid
        templateAreas={`"header" "main"`}
        templateRows={"auto 1fr"}
        width="85vw"
        minHeight="85vh"
        borderRadius="25px"
        bg="lightgray"
        padding="20px"
        gap="3em"
        marginY="3em"
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <GridItem area="header">
                  <Header
                    onSubmit={(title, icon) =>
                      setSets([...sets, { title, icon, progress: "0/0" }])
                    }
                  />
                </GridItem>
                <GridItem area="main">
                  <SetGrid sets={sets} />
                </GridItem>
              </>
            }
          />
          <Route path="/set/:title" element={<SetDetails sets={sets} />} />
        </Routes>
      </Grid>
    </>
  );
}

export default App;
