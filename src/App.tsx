import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TaskGrid from "./components/TaskGrid";
import SetDetailsHeader from "./components/SetDetailsHeader";

export interface Set {
  id: number;
  icon: string;
  title: string;
  progress: string;
}

export interface Task {
  id: number;
  title: string;
}

export const SetsContext = createContext(1);

function App() {
  const [sets, setSets] = useState<Set[]>([
    { id: 1, icon: "💪", title: "Fitness1", progress: "3/5" },
    { id: 2, icon: "💪", title: "Fitness2", progress: "3/5" },
    { id: 3, icon: "💪", title: "Fitness3", progress: "3/5" },
    { id: 4, icon: "💪", title: "Fitness4", progress: "3/5" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Fitness1" },
    { id: 2, title: "Fitness1" },
    { id: 1, title: "Fitness1" },
    { id: 1, title: "Fitness1" },
  ]);

  const maxSetId = Math.max(...sets.map((set) => set.id));

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
                      setSets([
                        ...sets,
                        { id: maxSetId + 1, title, icon, progress: "0/0" },
                      ])
                    }
                  />
                </GridItem>
                <GridItem area="main">
                  <SetGrid sets={sets} />
                </GridItem>
              </>
            }
          />
          <Route
            path="/set/:id"
            element={
              <>
                <GridItem area="header">
                  <SetDetailsHeader
                    onSubmit={(id, title) =>
                      setTasks([...tasks, { id, title }])
                    }
                    sets={sets}
                  />
                </GridItem>
                <GridItem area="main">
                  <TaskGrid tasks={tasks} />
                </GridItem>
              </>
            }
          />
        </Routes>
      </Grid>
    </>
  );
}

export default App;
