import {
  Card,
  CardBody,
  Text,
  Button,
  HStack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { Task } from "../App";
import { useState, useEffect } from "react";

interface Props {
  task: Task;
  onMarkButton: (taskId: number, markButton: boolean) => void;
  onDeleteButton: (taskId: number, setId: number) => void;
}

const TaskCard = ({ task, onMarkButton, onDeleteButton }: Props) => {
  const [markButton, setMarkButton] = useState(task.done);

  useEffect(() => {
    setMarkButton(task.done);
  }, [task.done]);

  const handleMarkButton = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newMarkButtonState = !markButton;
    setMarkButton(newMarkButtonState);
    onMarkButton(task.taskId, newMarkButtonState);
  };

  const handleDeleteButton = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteButton(task.taskId, task.setId);
  };

  const sliceDate = (date: string) => {
    const newDate = date.split(",")[0];
    return newDate;
  };

  return (
    <Card>
      <CardBody paddingX={3} paddingY={4}>
        <Accordion allowToggle>
          <AccordionItem sx={{ border: "none" }}>
            <AccordionButton>
              <HStack width="100%" justifyContent="space-between">
                <Box>
                  <Text fontWeight="bold" textAlign="left">
                    {task.title}
                  </Text>
                </Box>

                <Box display="flex" alignItems="center">
                  <Button
                    size="sm"
                    padding={2}
                    marginRight={2}
                    onClick={handleMarkButton}
                  >
                    {markButton ? (
                      <IoIosCheckmarkCircle size={20} />
                    ) : (
                      <IoIosCheckmarkCircleOutline size={20} />
                    )}
                  </Button>
                  <Button
                    colorScheme="red"
                    padding={2}
                    size="sm"
                    onClick={handleDeleteButton}
                  >
                    <MdDelete size={16} />
                  </Button>
                </Box>
              </HStack>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" fontWeight="bold" marginTop={2}>
                {sliceDate(task.deadline.toLocaleString())}
              </Text>
              <hr />
              <Text fontSize="sm">{task.description}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
