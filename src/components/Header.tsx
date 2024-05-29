import { HStack, Text, VStack } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";

const Header = () => {
  return (
    <HStack justifyContent="space-between">
      <Text fontSize="4xl">Welcome</Text>
      <VStack alignItems="flex-end">
        <CiSquarePlus size={60} onClick={() => console.log("clicked")} />
        <Text marginTop={-4} fontSize="sm">
          Add a new set
        </Text>
      </VStack>
    </HStack>
  );
};

export default Header;
