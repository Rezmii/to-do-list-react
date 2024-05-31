import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import TasksFormButton from "./TasksFormButton";

interface Props {
  sets: Set[];
  onSubmit: (
    id: number,
    title: string,
    description: string,
    deadline: Date
  ) => void;
  onDeleteButton: (id: number) => void;
}

const TasksHeader = ({ sets, onSubmit, onDeleteButton }: Props) => {
  const { id } = useParams<{ id: string }>();
  const setId = id ? parseInt(id) : undefined;
  const set = setId ? sets.find((s) => s.id === setId) : undefined;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };

  if (!set) {
    return <Text>Set not found</Text>;
  }

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Box>
        <HStack>
          <Text fontSize="3xl">{set.icon}</Text>
          <Text fontSize="3xl">{set.title}</Text>
        </HStack>
        <Text>
          {set.tasksDone}/
          {set.tasks === 1
            ? `${set.tasks} task done`
            : `${set.tasks} tasks done`}
        </Text>
      </Box>
      <HStack>
        <TasksFormButton
          onSubmit={(id, title, description, deadline) =>
            onSubmit(id, title, description, deadline)
          }
        />
        <Button
          leftIcon={<IoIosRemoveCircleOutline size={20} />}
          onClick={() => onDeleteButton(set.id)}
        >
          Delete set
        </Button>
        <Button
          leftIcon={<IoArrowBack />}
          variant="solid"
          onClick={handleClick}
        >
          Go Back
        </Button>
      </HStack>
    </HStack>
  );
};

export default TasksHeader;
