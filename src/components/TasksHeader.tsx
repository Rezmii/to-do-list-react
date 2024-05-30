import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import TasksFormButton from "./TasksFormButton";

interface SetDetailsProps {
  sets: Set[];
  onSubmit: (id: number, title: string) => void;
}

const TasksHeader = ({ sets, onSubmit }: SetDetailsProps) => {
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
        {set.tasks === 1 ? (
          <Text>{set.tasks} task</Text>
        ) : (
          <Text>{set.tasks} tasks</Text>
        )}
      </Box>
      <HStack>
        <TasksFormButton onSubmit={(id, title) => onSubmit(id, title)} />
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
