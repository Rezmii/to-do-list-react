import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TaskGrid from "./components/TaskGrid";
import SetDetailsHeader from "./components/SetDetailsHeader";

export interface Set {
  id: number;
  icon: string;
  title: string;
  tasks: number;
}

export interface Task {
  id: number;
  title: string;
}

function App() {
  const [sets, setSets] = useState<Set[]>([
    { id: 1, icon: "💪", title: "Fitness1", tasks: 3 },
    { id: 2, icon: "💪", title: "Fitness2", tasks: 1 },
    { id: 3, icon: "💪", title: "Fitness3", tasks: 0 },
    { id: 4, icon: "💪", title: "Fitness4", tasks: 0 },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Fitness1" },
    { id: 2, title: "Fitness1" },
    { id: 1, title: "Fitness1" },
    { id: 1, title: "Fitness1" },
  ]);

  const maxSetId = Math.max(...sets.map((set) => set.id));

  const increaseTasks = (id: number) => {
    setSets(
      sets.map((set) =>
        set.id === id ? { ...set, tasks: set.tasks + 1 } : set
      )
    );
  };

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
                        { id: maxSetId + 1, title, icon, tasks: 0 },
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
                    onSubmit={(id, title) => {
                      setTasks([...tasks, { id, title }]);
                      increaseTasks(id);
                    }}
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
