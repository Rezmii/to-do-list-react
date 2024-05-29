import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";

const SetCard = () => {
  return (
    <Card>
      <CardHeader textAlign="right">
        <Text fontSize="3xl">💪</Text>
      </CardHeader>
      <CardBody>
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">Fitness</Text>
          <Text>3/5 done</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SetCard;
