import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";
import { Set } from "../App";

interface Props {
  set: Set;
}

const SetCard = ({ set }: Props) => {
  return (
    <Card>
      <CardHeader textAlign="right">
        <Text fontSize="3xl">{set.icon}</Text>
      </CardHeader>
      <CardBody>
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{set.title}</Text>
          <Text>{set.progress} done</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SetCard;
