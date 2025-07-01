export type FSMState = "initial" | "letter" | "digit" | "operator" | "leftParenthesis" | "rightParenthesis";

export type FSMSchemeFunction = {
  [Property in FSMState]: (ExFSM: FSM) => void
}

export type FSMSchemeType = {
  [Property in FSMState]: FSMSchemeFunction
};

export type FSMConverter = {
  [Property in FSMState]: any // find the solution for RegExp
}

export type FSM = {
  state: FSMState,
  setState: (state: FSMState) => void
  getState: () => FSMState
  onAction: (value: string) => void
}
