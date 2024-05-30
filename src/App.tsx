import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskGrid from "./components/TaskGrid";
import TasksHeader from "./components/TasksHeader";

export interface Set {
  id: number;
  icon: string;
  title: string;
  tasks: number;
}

export interface Task {
  taskId: number;
  setId: number;
  title: string;
}

function App() {
  const navigate = useNavigate();
  const [sets, setSets] = useState<Set[]>([
    { id: 1, icon: "💪", title: "Fitness1", tasks: 3 },
    { id: 2, icon: "💪", title: "Fitness2", tasks: 1 },
    { id: 3, icon: "💪", title: "Fitness3", tasks: 0 },
    { id: 4, icon: "💪", title: "Fitness4", tasks: 0 },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { taskId: 1, setId: 1, title: "Fitness1" },
    { taskId: 2, setId: 1, title: "Fitness1" },
    { taskId: 3, setId: 1, title: "Fitness1" },
    { taskId: 4, setId: 2, title: "Fitness2" },
  ]);

  const maxSetId = Math.max(...sets.map((set) => set.id));
  const maxTaskId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;

  const increaseTasks = (id: number) => {
    setSets(
      sets.map((set) =>
        set.id === id ? { ...set, tasks: set.tasks + 1 } : set
      )
    );
  };

  const deleteTask = (taskId: number, setId: number) => {
    setTasks(tasks.filter((task) => task.taskId !== taskId));
    setSets(
      sets.map((set) =>
        set.id === setId ? { ...set, tasks: set.tasks - 1 } : set
      )
    );
  };

  console.log(tasks);
  console.log(sets);

  const deleteSet = (id: number) => {
    setSets(sets.filter((set) => set.id !== id));
    setTasks(tasks.filter((task) => task.setId !== id));
    navigate(`/`);
    console.log(tasks);
    console.log(sets);
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
                  <TasksHeader
                    onSubmit={(id, title) => {
                      setTasks([
                        ...tasks,
                        { taskId: maxTaskId + 1, setId: id, title },
                      ]);
                      increaseTasks(id);
                    }}
                    sets={sets}
                    onDeleteButton={(id) => deleteSet(id)}
                  />
                </GridItem>
                <GridItem area="main">
                  <TaskGrid
                    onDeleteButton={(taskId, setId) =>
                      deleteTask(taskId, setId)
                    }
                    tasks={tasks}
                  />
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
