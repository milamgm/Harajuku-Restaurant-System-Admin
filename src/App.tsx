import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
//import "../src/style.css";
import "../src/loading.css";
import "./styles/styles.css";

import Products from "./pages/Products";
import CompletedOrders from "./pages/CompletedOrders";
import DeletedOrders from "./pages/DeletedOrders";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <AppContext>
      <Navbar />
      <div className="main-div">
      
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

        <div className="content-div">
          <div className="display-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/completedorders" element={<CompletedOrders />} />
              <Route path="/deletedorders" element={<DeletedOrders />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext>
  );
}

export default App;
