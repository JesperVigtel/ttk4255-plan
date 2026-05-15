import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Minimal test first
const TestApp = () => (
  <div style={{padding: "2rem"}}>
    <h1>Test: This is a placeholder</h1>
    <p>If you see this, React is working.</p>
  </div>
);

const root = document.getElementById("root");
if (!root) {
  document.body.innerHTML = '<div style="padding: 2rem; color: red;">ERROR: root div not found</div>';
} else {
  try {
    createRoot(root).render(<TestApp />);
  } catch (e) {
    document.body.innerHTML = `<div style="padding: 2rem; color: red;"><strong>Render Error:</strong> ${e.message}</div>`;
  }
}
