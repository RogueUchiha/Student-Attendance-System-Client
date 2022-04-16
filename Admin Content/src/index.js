import React from "react";
import ReactDOMClient from "react-dom/client";
import Main from "./Main";
import "./index.css";

const container = document.getElementById("admin");

const root = ReactDOMClient.createRoot(container);

root.render(<Main tab="/" />);