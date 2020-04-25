import React from "react";
import { Calculator } from "./calculator/containers/Calculator";
import Box from "@material-ui/core/Box";

function App() {
  return (
    <Box
      style={{ height: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Calculator />
    </Box>
  );
}

export default App;
