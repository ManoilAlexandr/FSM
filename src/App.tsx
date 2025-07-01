import './App.css'
import {Alert, Container, Paper, Stack, TextField} from "@mui/material";
import {ExpressionFSM} from "./services/FSM";
import {ErrorsObserver} from "./services/ErrorHandler";
import {useEffect, useMemo, useState} from "react";
import {FSMTypedElement} from "./services/FSM/types";

function App() {
  const [errors, setErrors] = useState([]);

  const FSM = useMemo(() => new ExpressionFSM(),[]);
  const ErrorsHandler = useMemo(() => new ErrorsObserver(), []);

  const onInput = (inputValue: string) => {
    const lastSymbol = inputValue.slice(-1),
      positionOfSymbol = inputValue.lastIndexOf(lastSymbol) + 1;

    FSM.onAction({
      element: {
        value: lastSymbol,
        pos: positionOfSymbol
      },
      ErrorsHandler
    });
  }

  const errorHandler = (error: FSMTypedElement) => {
    error ? setErrors([error]) : setErrors([]);
  }

  useEffect(() => {
    ErrorsHandler.subscribe(errorHandler);

    return () => {
      ErrorsHandler.unsubscribe(errorHandler);
    }
  }, []);

  return (
    <Container sx={{padding: 1}}>
      <Stack gap={2}>
        <Paper sx={{padding: 1, display: 'flex'}}>
          <TextField
            placeholder={'Input expression'}
            label={'Expression Input'}
            fullWidth
            variant={'filled'}
            onChange={(input: any) => onInput(input.target.value)}
          />
        </Paper>
        <Paper sx={{padding: 1}}>
          {!errors.length && (<Alert severity="success"> There's no errors </Alert>)}
          {!!errors.length && errors.map((error) => (
            <Alert severity={'error'} key={error.pos}>{`${error.value} at pos ${error.pos}`}</Alert>))}
        </Paper>
      </Stack>
    </Container>
  )
}

export default App
