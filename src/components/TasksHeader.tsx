import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Button, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
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
    <>
      <Grid
        templateAreas={{
          base: `"title" "buttons"`,
          lg: `"title buttons"`,
        }}
        gap={{ base: "1em", lg: "0" }}
        alignItems="center"
        justifyContent={{
          base: "center",
          lg: "space-between",
        }}
      >
        <GridItem area="title">
          <Box display="flex" justifyContent="center">
            <HStack>
              <Text fontSize="3xl">{set.icon}</Text>
              <Text fontSize="3xl">{set.title}</Text>
              <Text>
                {set.tasksDone}/
                {set.tasks === 1
                  ? `${set.tasks} task done`
                  : `${set.tasks} tasks done`}
              </Text>
            </HStack>
          </Box>
        </GridItem>
        <GridItem area="buttons">
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
        </GridItem>
      </Grid>
    </>
  );
};

export default TasksHeader;
