import { useNavigate, useParams } from "react-router-dom";
import { Set } from "../App";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import DetailsFormButton from "./DetailsFormButton";

interface SetDetailsProps {
  sets: Set[];
  onSubmit: (id: number, title: string) => void;
}

const SetDetailsHeader = ({ sets, onSubmit }: SetDetailsProps) => {
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
    <HStack justifyContent="space-between" alignItems="center">
      <Box>
        <HStack>
          <Text fontSize="3xl">{set.icon}</Text>
          <Text fontSize="3xl">{set.title}</Text>
        </HStack>
        <Text>{set.progress} done</Text>
      </Box>
      <HStack>
        <DetailsFormButton onSubmit={(id, title) => onSubmit(id, title)} />
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
