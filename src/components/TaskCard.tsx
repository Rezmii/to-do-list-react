import { Card, CardBody, Text } from "@chakra-ui/react";

import { Task } from "../App";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  return (
    <Card>
      <CardBody>
        <Text fontWeight="bold">{task.title}</Text>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
