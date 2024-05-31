import { SimpleGrid, Text } from "@chakra-ui/react";
import { Task } from "../App";
import TaskCard from "./TaskCard";
import { useParams } from "react-router-dom";

interface Props {
  tasks: Task[];
  onMarkButton: (setId: number, markButton: boolean) => void;
  onDeleteButton: (taskId: number, setId: number) => void;
}

const TaskGrid = ({ tasks, onMarkButton, onDeleteButton }: Props) => {
  const { id } = useParams<{ id: string }>();
  const filteredTasks = id
    ? tasks.filter((task) => task.setId === parseInt(id))
    : [];
  if (filteredTasks.length === 0) return <Text>No tasks added.</Text>;
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 4 }} spacing={5}>
      {filteredTasks.map((task, i) => (
        <TaskCard
          onDeleteButton={onDeleteButton}
          onMarkButton={onMarkButton}
          key={i}
          task={task}
        ></TaskCard>
      ))}
    </SimpleGrid>
  );
};

export default TaskGrid;
