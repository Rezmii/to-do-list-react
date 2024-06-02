import { Box, Flex, Text } from "@chakra-ui/react";
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
    <Flex wrap="wrap" gap={3}>
      {filteredTasks.map((task, i) => (
        <Box
          key={i}
          flexBasis={{
            base: "100%",
            md: "calc(50% - 10px)",
            lg: "calc(25% - 10px)",
          }}
          marginBottom="20px"
        >
          <TaskCard
            onDeleteButton={onDeleteButton}
            onMarkButton={onMarkButton}
            task={task}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default TaskGrid;
