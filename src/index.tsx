import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FormTest from "./FormTest";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./Components/Tabs/_variables.module.scss";

//ReactDOM.render(<FormTest />, document.getElementById("root"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme = createTheme({
  palette: {
    primary: {
      main: styles.primaryColor,
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <FormTest />
  </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
