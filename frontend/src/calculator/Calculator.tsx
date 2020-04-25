import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React, { createContext, Dispatch, useReducer } from "react";
import Display from "./Display";
import Numpad from "./numpad/Numpad";
import {
  CalculatorActions,
  calculatorReducer,
  initialState,
  State,
} from "./reducer";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#e3e3e3",
    padding: 16,
    border: "2px solid black",
    borderRadius: 8,
  },
});

export const CalculatorContext = createContext<{
  state: State;
  dispatch: Dispatch<CalculatorActions>;
}>({
  state: initialState,
  dispatch: () => null,
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
