export type FSMState = "initial" | "letter" | "digit" | "operator" | "leftParenthesis" | "rightParenthesis";

export type FSMSchemeFunction = {
  [Property in FSMState]: (ExFSM: FSM) => void
}

export type FSMSchemeType = {
  [Property in FSMState]: FSMSchemeFunction
};

export type FSMConverter = {
  [Property in FSMState]: string // find the solution for RegExp
}

export type FSM = {
  state: FSMState,
  setState: (state: FSMState) => void
  getState: () => FSMState
  onAction: (value: string) => void
}

const FSMScheme: FSMSchemeType = {
  initial: {
    initial: () => {
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    // operator: () => {},
    // leftParenthesis: () => {},
    // rightParenthesis: () => {}
  },
  letter: {
    initial: (fsm) => {
      fsm.setState('initial');
    },
    letter: () => {
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    leftParenthesis: (_, error) => {
      error();
    },
    rightParenthesis: (fsm) => {
      fsm.setState('rightParenthesis');
    }
  },
  digit: {
    initial: (fsm) => {
      fsm.setState('initial');
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: () => {
    },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    // leftParenthesis: () => {},
    rightParenthesis: (fsm) => {
      fsm.setState('rightParenthesis');
    }
  },
  operator: {
    initial: () => {
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    // operator: () => {},
    leftParenthesis: (fsm) => {
      fsm.setState('leftParenthesis')
    },
    // rightParenthesis: () => {}
  },
  leftParenthesis: {
    // initial: () => {
    // },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    // operator: () => {},
    // leftParenthesis: () => {},
    // rightParenthesis: () => {}
  },
  rightParenthesis: {
    // initial: (fsm) => {
    //   fsm.setState('initial') // Только в том случае если дозволено только 1 выражение в скобках
    // },
    // letter: () => {
    // },
    // digit: () => {
    // },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    // leftParenthesis: () => {},
    // rightParenthesis: () => {}
  }
}

export class ExpressionFSM implements FSM {
  state: FSMState = "initial";
  converter: FSMConverter = {
    letter: /[a-zA-Z]/,
    digit: /[0-9]/,
    operator: /[-+*]/,
    leftParenthesis: /\(/,
    rightParenthesis: /\)/,
    initial: /^$/g,
  }

  getState(): FSMState {
    return this.state;
  }

  setState(state: FSMState): void {
    this.state = state;
  }

  onAction(value: string) {
    const newState = this.getStateFromValue(value);
    const action = FSMScheme[this.state][newState];

    // console.log(newState)
    action && action(this);

    console.log(this.getState());
  }

  getStateFromValue(value: string): FSMState {
    const _converter = this.converter;
    const isLetter = _converter.letter.test(value),
      isDigit = _converter.digit.test(value),
      isOperator = _converter.operator.test(value),
      isLeftParenthesis = _converter.leftParenthesis.test(value),
      isRightParenthesis = _converter.rightParenthesis.test(value),
      isInitial = _converter.initial.test(value);

    if(isLetter) {
      return "letter";
    } else if(isDigit) {
      return "digit";
    } else if(isOperator) {
      return "operator";
    } else if(isLeftParenthesis) {
      return "leftParenthesis";
    } else if(isRightParenthesis) {
      return "rightParenthesis";
    } else if(isInitial) {
      return "initial";
    }

    return "initial";
  }
}
