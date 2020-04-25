export type OperationType = "add" | "substract" | "multiply" | "divide";
export type Mode = "first" | "second";

export type State = {
  firstInput: number;
  secondInput?: number;
  mode: Mode;
  operation?: OperationType;
};

export const initialState: State = {
  mode: "first",
  firstInput: 0,
};

export type Action = {
  type: ActionTypes;
  payload: number;
};

type Actions<M extends { [key: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  SET_NUMBER = "SET_NUMBER",
  SET_OPERATION = "SET_OPERATION",
  CALCULATE = "CALCULATE",
  CLEAR = "CLEAR",
}

type ActionPayload = {
  [ActionTypes.SET_OPERATION]: {
    value: OperationType;
  };
  [ActionTypes.SET_NUMBER]: {
    value: number;
  };
  [ActionTypes.CLEAR]: {};
  [ActionTypes.CALCULATE]: {};
};

export type CalculatorActions = Actions<ActionPayload>[keyof Actions<
  ActionPayload
>];

const MAX_DIGITS = 12;

const calculate = (first: number, second: number, operation: OperationType) => {
  switch (operation) {
    case "add":
      return first + second;
    case "substract":
      return first - second;
    case "multiply":
      return first * second;
    case "divide":
      return first / second;
  }
};

export const calculatorReducer = (
  state: State,
  action: CalculatorActions
): State => {
  switch (action.type) {
    case ActionTypes.SET_OPERATION:
      if (state.mode === "first" && state.firstInput) {
        return {
          ...state,
          operation: action.payload.value,
          secondInput: undefined,
          mode: "second",
        };
      } else if (state.secondInput !== undefined && state.operation) {
        return {
          ...state,
          firstInput: calculate(
            state.firstInput,
            state.secondInput,
            state.operation
          ),
          secondInput: undefined,
          mode: "second",
        };
      } else return state;

    case ActionTypes.SET_NUMBER:
      const value = action.payload.value.toString();
      const getNewNumber = (current?: number) =>
        parseInt(
          ((current ? current.toString() : "") + value).substring(0, MAX_DIGITS)
        );

      if (state.mode === "first") {
        return {
          ...state,
          firstInput: getNewNumber(state.firstInput),
          secondInput: undefined,
          mode: "first",
        };
      } else if (state.mode === "second") {
        return {
          ...state,
          secondInput: getNewNumber(state.secondInput),
        };
      }
      break;
    case ActionTypes.CALCULATE:
      const { firstInput, secondInput, operation } = state;
      if (secondInput !== undefined && operation) {
        return {
          ...state,
          firstInput: calculate(firstInput, secondInput, operation),
          mode: "first",
        };
      }
      return state;
    case ActionTypes.CLEAR:
      return {
        ...state,
        firstInput: 0,
        secondInput: undefined,
        operation: undefined,
        mode: "first",
      };
  }
  return state;
};
