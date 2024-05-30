import { Card, CardBody, Text, Button, HStack, Box } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { Task } from "../App";
import { useState } from "react";

interface Props {
  task: Task;
  onMarkButton: () => void;
  onDeleteButton: (taskId: number, setId: number) => void;
}

const TaskCard = ({ task, onMarkButton, onDeleteButton }: Props) => {
  const [markButton, setMarkButton] = useState(false);

  const handleMarkButton = () => {
    setMarkButton(!markButton);
  };

  return (
    <Card>
      <CardBody paddingX={3} paddingY={4}>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">{task.title}</Text>
          <Box>
            <Button padding="2" marginRight={2} onClick={handleMarkButton}>
              {markButton ? (
                <IoIosCheckmarkCircle size={27} />
              ) : (
                <IoIosCheckmarkCircleOutline size={27} />
              )}
            </Button>
            <Button
              colorScheme="red"
              padding={1}
              onClick={() => onDeleteButton(task.taskId, task.setId)}
            >
              <MdDelete size={20} />
            </Button>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
