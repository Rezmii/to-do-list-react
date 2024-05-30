import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Set } from "../App";

interface Props {
  set: Set;
}

const SetCard = ({ set }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/set/${set.id}`);
  };

  return (
    <Card onClick={handleClick} cursor="pointer">
      <CardHeader textAlign="right">
        <Text fontSize="3xl">{set.icon}</Text>
      </CardHeader>
      <CardBody>
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{set.title}</Text>
          {set.tasks === 1 ? (
            <Text>{set.tasks} task</Text>
          ) : (
            <Text>{set.tasks} tasks</Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SetCard;
