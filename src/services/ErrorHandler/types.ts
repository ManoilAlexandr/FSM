import {FSMTypedElement} from "../FSM/types";

export type ErrorObserverFunction = (element: FSMTypedElement) => void

export type ErrorsObserverType = {
  errors: ErrorObserverFunction[]

  subscribe: (fn: ErrorObserverFunction) => void

  unsubscribe: (fn: ErrorObserverFunction) => void

  broadcast: (element: FSMTypedElement) => void;
}
