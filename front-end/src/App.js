import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#AA7575",
      },
      secondary: {
        main: "#F9AC66",
        dark: "#ED6B5B",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
