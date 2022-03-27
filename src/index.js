import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <NotificationsProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </NotificationsProvider>,
  document.getElementById("root")
);
