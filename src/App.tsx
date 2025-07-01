import './App.css'
import {Container, Paper, Stack, TextField} from "@mui/material";
import {ExpressionFSM} from "./services/FSM/FSM";

function App() {
  const fsm = new ExpressionFSM();

  const onInput = (inputValue: string) => {
      const lastSymbol = inputValue.slice(-1),
        positionOfSymbol = inputValue.indexOf(lastSymbol) + 1;

    fsm.onAction(lastSymbol, () => console.log(`error on pos ${positionOfSymbol}`));

  }

  return (
    <Container sx={{padding: 1}}>
      <Stack gap={2}>
        <Paper sx={{padding: 1, display: 'flex'}}>
          <TextField
            placeholder={'Input expression'}
            label={'Expression Input'}
            fullWidth
            variant={'standard'}
            onChange={(input: any) => onInput(input.target.value)}
          />
        </Paper>
        <Paper sx={{padding: 1}}>
          Errors
        </Paper>
      </Stack>
    </Container>
  )
}

export default App
