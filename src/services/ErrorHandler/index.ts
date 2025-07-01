import {ErrorObserverFunction, ErrorsObserverType} from "./types";
import {FSMTypedElement} from "../FSM/types";

export class ErrorsObserver implements ErrorsObserverType {
  errors: ErrorObserverFunction[] = [];

  subscribe(fn: ErrorObserverFunction): void {
    if(!this.errors.includes(fn)) {
      this.errors.push(fn);
    }
  }

  unsubscribe(fn: ErrorObserverFunction): void {
    this.errors.filter(sub => sub !== fn);
  }

  broadcast(element: FSMTypedElement): void {
    this.errors.forEach(obs => obs(element));
  }
}