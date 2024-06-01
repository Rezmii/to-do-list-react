import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SetGrid from "./components/SetGrid";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskGrid from "./components/TaskGrid";
import TasksHeader from "./components/TasksHeader";

export interface Set {
  id: number;
  icon: string;
  title: string;
  tasks: number;
  tasksDone: number;
}

export interface Task {
  taskId: number;
  setId: number;
  title: string;
  done: boolean;
  description: string;
  deadline: Date;
}

function App() {
  const navigate = useNavigate();

  const initialSets = JSON.parse(localStorage.getItem("sets") || "[]");
  const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const [sets, setSets] = useState<Set[]>(
    initialSets.length
      ? initialSets
      : [
          { id: 1, icon: "💪", title: "Fitness", tasks: 3, tasksDone: 1 },
          { id: 2, icon: "📕", title: "Studying", tasks: 1, tasksDone: 0 },
          { id: 3, icon: "🏡", title: "House Tasks", tasks: 0, tasksDone: 0 },
        ]
  );

  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.length
      ? initialTasks
      : [
          {
            taskId: 1,
            setId: 1,
            title: "Go to a gym",
            done: true,
            description: "Chest and back",
            deadline: new Date(2024, 6, 10),
          },
          {
            taskId: 2,
            setId: 1,
            title: "Go for a run",
            done: false,
            description: "Atleast 3 km",
            deadline: new Date(2024, 6, 16),
          },
          {
            taskId: 3,
            setId: 1,
            title: "Stretch",
            done: false,
            description: "Do a light stretch for back pain",
            deadline: new Date(2024, 7, 2),
          },
          {
            taskId: 4,
            setId: 2,
            title: "Learn to math exam",
            done: false,
            description: "Need to know geometry and trigonometry",
            deadline: new Date(2024, 6, 12),
          },
        ]
  );

  const maxSetId = Math.max(...sets.map((set) => set.id));
  const maxTaskId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;

  useEffect(() => {
    localStorage.setItem("sets", JSON.stringify(sets));
  }, [sets]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const increaseTasks = (id: number) => {
    setSets(
      sets.map((set) =>
        set.id === id ? { ...set, tasks: set.tasks + 1 } : set
      )
    );
  };

  const deleteTask = (taskId: number, setId: number) => {
    const taskToDelete = tasks.find((task) => task.taskId === taskId);
    setTasks(tasks.filter((task) => task.taskId !== taskId));
    setSets(
      sets.map((set) =>
        set.id === setId
          ? {
              ...set,
              tasks: set.tasks - 1,
              tasksDone: taskToDelete?.done ? set.tasksDone - 1 : set.tasksDone,
            }
          : set
      )
    );
  };

  const markTask = (taskId: number, markButton: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.taskId === taskId ? { ...task, done: markButton } : task
      )
    );
    const task = tasks.find((task) => task.taskId === taskId);
    if (task) {
      setSets(
        sets.map((set) =>
          set.id === task.setId
            ? {
                ...set,
                tasksDone: markButton ? set.tasksDone + 1 : set.tasksDone - 1,
              }
            : set
        )
      );
    }
  };

  const deleteSet = (id: number) => {
    setSets(sets.filter((set) => set.id !== id));
    setTasks(tasks.filter((task) => task.setId !== id));
    navigate(`/`);
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
                        {
                          id: maxSetId + 1,
                          title,
                          icon,
                          tasks: 0,
                          tasksDone: 0,
                        },
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
                    onSubmit={(id, title, description, deadline) => {
                      setTasks([
                        ...tasks,
                        {
                          taskId: maxTaskId + 1,
                          setId: id,
                          title,
                          done: false,
                          description,
                          deadline,
                        },
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
                    onMarkButton={(setId, markButton) =>
                      markTask(setId, markButton)
                    }
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
