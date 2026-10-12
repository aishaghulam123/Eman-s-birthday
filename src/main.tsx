import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BirthdayCard } from "./components/birthday-card";
import "./styles.css";
const root = document.getElementById("root");
if (root) createRoot(root).render(<StrictMode><BirthdayCard /></StrictMode>);
