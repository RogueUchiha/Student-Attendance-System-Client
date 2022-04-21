import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { NotificationsProvider } from "@mantine/notifications";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

ReactDOM.render(
  <NotificationsProvider>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </LocalizationProvider>
  </NotificationsProvider>,
  document.getElementById("root")
);
