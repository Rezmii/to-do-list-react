import { Box } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Box height="90vh" width="90vw" borderRadius="25px" bg="lightgray">
      <Header />
    </Box>
  );
}

export default App;
