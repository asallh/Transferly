import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";

function App() {
  return (
    <>
      <center>
        <div>Hello Transferly</div>
        <div>
          <TextField label="User" variant="outlined" />
          <TextField label="Password" variant="outlined" />
          <TextField label="Port" variant="outlined" />
        </div>
      </center>
    </>
  );
}

export default App;
