import {FSM, FSMConverter, FSMOnActionProps, FSMSchemeType, FSMState} from "./types";

const FSMScheme: FSMSchemeType = {
  initial: {
    initial: (_, props) => {
      const {ErrorsHandler} = props;
      ErrorsHandler.broadcast(null);
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    operator: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    leftParenthesis: (fsm, props) => {
      fsm.setState('leftParenthesis');

      const {ErrorsHandler} = props;
      ErrorsHandler.broadcast(null);
    },
    rightParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    }
  },
  letter: {
    initial: (fsm, props) => {
      fsm.setState('initial');

      // const {ErrorsHandler} = props;
      // ErrorsHandler.broadcast(null);
    },
    letter: () => {
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    leftParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    rightParenthesis: (fsm) => {
      fsm.setState('rightParenthesis');
    }
  },
  digit: {
    initial: (fsm, props) => {
      fsm.setState('initial');

      // const {ErrorsHandler} = props;
      // ErrorsHandler.broadcast(null);
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: () => {
    },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    leftParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    rightParenthesis: (fsm) => {
      fsm.setState('rightParenthesis');
    }
  },
  operator: {
    initial: (fsm, props) => {
      fsm.setState('initial');

      // const {ErrorsHandler} = props;
      // ErrorsHandler.broadcast(null);
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    operator: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    leftParenthesis: (fsm) => {
      fsm.setState('leftParenthesis')
    },
    rightParenthesis: (fsm) => {
      fsm.setState('rightParenthesis')
    }
  },
  leftParenthesis: {
    initial: (fsm, props) => {
      fsm.setState('initial');

      const {ErrorsHandler} = props;
      ErrorsHandler.broadcast(null);
    },
    letter: (fsm) => {
      fsm.setState('letter');
    },
    digit: (fsm) => {
      fsm.setState('digit');
    },
    operator: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    leftParenthesis: (_, props) => {
      console.log(_.state, props.element)
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    rightParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    }
  },
  rightParenthesis: {
    initial: (fsm, props) => {
      fsm.setState('initial');

      const {ErrorsHandler} = props;
      ErrorsHandler.broadcast(null);
    },
    letter: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    digit: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    operator: (fsm) => {
      fsm.setState('operator');
    },
    leftParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    },
    rightParenthesis: (_, props) => {
      const {ErrorsHandler, element} = props;
      ErrorsHandler.broadcast(element);
    }
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

  onAction(props: FSMOnActionProps) {
    const {element} = props;
    const {value} = element;
    const newState = this.getStateFromValue(value);
    const action = FSMScheme[this.state][newState];

    console.log(newState,
      // newState, value
    )
    action && action(this, props);
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
