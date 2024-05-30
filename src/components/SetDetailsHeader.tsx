import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import DetailsFormButton from "./DetailsFormButton";

interface SetDetailsProps {
  sets: Set[];
  onSubmit: (title: string) => void;
}

const SetDetailsHeader = ({ sets, onSubmit }: SetDetailsProps) => {
  const { title } = useParams<{ title: string }>();
  const set = sets.find((s) => s.title === title);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };

  if (!set) {
    return <Text>Set not found</Text>;
  }

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Box>
        <HStack>
          <Text fontSize="3xl">{set.icon}</Text>
          <Text fontSize="3xl">{set.title}</Text>
        </HStack>
        <Text>{set.progress} done</Text>
      </Box>
      <HStack>
        <DetailsFormButton onSubmit={(title) => onSubmit(title)} />
        <Button
          leftIcon={<IoArrowBack />}
          variant="solid"
          onClick={handleClick}
        >
          Go Back
        </Button>
      </HStack>
    </HStack>
  );
};

export default SetDetailsHeader;
