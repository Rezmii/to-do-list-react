import { Box, HStack, Text } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Box height="90vh" width="90vw" borderRadius="25px" bg="lightgray">
      <HStack margin={5}>
        <Text fontSize="3xl">Welcome</Text>
      </HStack>
    </Box>
  );
}

export default App;
