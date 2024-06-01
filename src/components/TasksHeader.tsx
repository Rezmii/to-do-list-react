import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
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
  const [isBase] = useMediaQuery("(max-width: 30em)");
  const [isTablet] = useMediaQuery("(min-width: 30em) and (max-width: 48em)");
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
        textAlign={{ base: "center", lg: "left" }}
      >
        <GridItem area="title">
          <Box display="flex" justifyContent="center">
            {isBase || isTablet ? (
              <HStack spacing={3} alignItems="center">
                <Text fontSize="3xl">{set.icon}</Text>
                <Text fontSize="3xl">{set.title}</Text>
                <Text fontSize={{ base: "sm", md: "md" }} whiteSpace="nowrap">
                  {set.tasksDone}/
                  {set.tasks === 1
                    ? `${set.tasks} task done`
                    : `${set.tasks} tasks done`}
                </Text>
              </HStack>
            ) : (
              <VStack spacing={1} alignItems="flex-start">
                <HStack spacing={3} alignItems="center">
                  <Text fontSize="3xl">{set.icon}</Text>
                  <Text fontSize="3xl">{set.title}</Text>
                </HStack>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  whiteSpace="nowrap"
                  textAlign="left"
                >
                  {set.tasksDone}/
                  {set.tasks === 1
                    ? `${set.tasks} task done`
                    : `${set.tasks} tasks done`}
                </Text>
              </VStack>
            )}
          </Box>
        </GridItem>
        <GridItem area="buttons">
          <HStack spacing={3} justifyContent="center">
            <TasksFormButton
              onSubmit={(id, title, description, deadline) =>
                onSubmit(id, title, description, deadline)
              }
            />
            <Button
              leftIcon={
                isBase ? undefined : <IoIosRemoveCircleOutline size={20} />
              }
              onClick={() => onDeleteButton(set.id)}
              size={{ base: "lg", md: "md" }}
            >
              {isBase ? <IoIosRemoveCircleOutline /> : "Delete set"}
            </Button>
            <Button
              leftIcon={isBase ? undefined : <IoArrowBack />}
              variant="solid"
              onClick={handleClick}
              size={{ base: "lg", md: "md" }}
            >
              {isBase ? <IoArrowBack /> : "Go Back"}
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TasksHeader;
