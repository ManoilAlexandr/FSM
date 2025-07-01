import {ErrorsObserverType} from "../ErrorHandler/types";

export type FSMState = "initial" | "letter" | "digit" | "operator" | "leftParenthesis" | "rightParenthesis";

export type FSMSchemeFunction = {
  [Property in FSMState]?: (ExFSM: FSM, actionProps: FSMOnActionProps) => void
}

export type FSMSchemeType = {
  [Property in FSMState]: FSMSchemeFunction
};

export type FSMConverter = {
  [Property in FSMState]: RegExp
}

export type FSMTypedElement = {
  value: string
  pos: number
} | null;

export type FSMOnActionProps = {
  element: FSMTypedElement
  ErrorsHandler: ErrorsObserverType
}

export type FSM = {
  state: FSMState,
  setState: (state: FSMState) => void
  getState: () => FSMState
  onAction: (props: FSMOnActionProps) => void
}