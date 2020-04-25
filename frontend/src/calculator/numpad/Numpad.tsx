import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "./Button";
import { CalculatorContext } from "../Calculator";
import { ActionTypes, OperationType } from "../reducer";
import Box from "@material-ui/core/Box";

const Numpad: React.FC = () => {
  const { dispatch } = React.useContext(CalculatorContext);

  const handleNumber = (value: number) => () => {
    dispatch({ type: ActionTypes.SET_NUMBER, payload: { value } });
  };

  const handleOperation = (operation: OperationType) => () => {
    dispatch({
      type: ActionTypes.SET_OPERATION,
      payload: { value: operation },
    });
  };

  const handleClear = () => {
    dispatch({ type: ActionTypes.CLEAR, payload: {} });
  };

  const handleCalculate = () => {
    dispatch({ type: ActionTypes.CALCULATE, payload: {} });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row">
        <Button onClick={handleNumber(7)}>{7}</Button>
        <Button onClick={handleNumber(8)}>{8}</Button>
        <Button onClick={handleNumber(9)}>{9}</Button>
        <Button onClick={handleOperation("divide")} type="operation">
          {"\u00f7"}
        </Button>
      </Box>
      <Box display="flex" flexDirection="row">
        <Button onClick={handleNumber(4)}>{4}</Button>
        <Button onClick={handleNumber(5)}>{5}</Button>
        <Button onClick={handleNumber(6)}>{6}</Button>
        <Button onClick={handleOperation("multiply")} type="operation">
          {"\u00d7"}
        </Button>
      </Box>
      <Box display="flex" flexDirection="row">
        <Button onClick={handleNumber(1)}>{1}</Button>
        <Button onClick={handleNumber(2)}>{2}</Button>
        <Button onClick={handleNumber(3)}>{3}</Button>
        <Button onClick={handleOperation("substract")} type="operation">
          {"\u2013"}
        </Button>
      </Box>
      <Box display="flex" flexDirection="row">
        <Button onClick={handleClear} type="operation">
          {"C"}
        </Button>
        <Button onClick={handleNumber(0)}>{0}</Button>
        <Button onClick={handleCalculate} type="operation">
          {"="}
        </Button>
        <Button onClick={handleOperation("add")} type="operation">
          {"+"}
        </Button>
      </Box>
    </Box>
  );
};

export default Numpad;
