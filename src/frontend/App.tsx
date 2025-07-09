import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { FileInfo } from "./types/FileType";

function App() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("22");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [error, setError] = useState("");

  const connect = async () => {
    const result = await window.api.connectSFTP({
      host,
      port: parseInt(port),
      username,
      password,
    });

    if (result.success) {
      setFiles(result.files || []);
      setError("");
    } else {
      setError(result.error || "Unknown error");
    }
  };

  return (
    <center>
      <h1>Hello Transferly</h1>
      <div style={{ maxWidth: 400, marginBottom: 20 }}>
        <TextField
          fullWidth
          label="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <TextField
          fullWidth
          label="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <TextField
          fullWidth
          label="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={connect}
          style={{ marginTop: 10 }}
        >
          Connect
        </Button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {files.length > 0 && (
        <div style={{ textAlign: "left", maxWidth: 400 }}>
          <h3>Files:</h3>
          <ul>
            {files.map((f) => (
              <li key={f.name}>
                {f.name} ({f.type}) — {f.size} bytes
              </li>
            ))}
          </ul>
        </div>
      )}
    </center>
  );
}

export default App;
