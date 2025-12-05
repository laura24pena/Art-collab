// src/App.jsx
import React from "react";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import AppRouter from "../routes/AppRouter.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
