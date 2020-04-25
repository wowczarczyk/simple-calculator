import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React, { useReducer } from "react";
import Display from "../components/Display";
import Numpad from "../components/numpad/Numpad";
import { CalculatorContext } from "../context";
import { calculatorReducer, initialState } from "../reducer";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#e3e3e3",
    padding: 16,
    border: "2px solid black",
    borderRadius: 8,
  },
});

export const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const classes = useStyles();

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      <Paper elevation={10} className={classes.root}>
        <Box display="inline-block">
          <Box display="flex" flexDirection="column">
            <Display />
            <Numpad />
          </Box>
        </Box>
      </Paper>
    </CalculatorContext.Provider>
  );
};
