import { HStack, Text, VStack } from "@chakra-ui/react";
import FormButton from "./FormButton";

interface Props {
  onSubmit: (title: string, emoji: string) => void;
}

const Header = ({ onSubmit }: Props) => {
  return (
    <HStack justifyContent="space-between">
      <Text fontSize="4xl">To Do List</Text>
      <VStack alignItems="flex-end">
        <FormButton onSubmit={(title, emoji) => onSubmit(title, emoji)} />
      </VStack>
    </HStack>
  );
};

export default Header;
