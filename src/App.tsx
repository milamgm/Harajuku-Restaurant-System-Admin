import React from "react";
import { useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "../src/loading.css";
import "./styles/styles.css";

const Products = React.lazy(() => import("./pages/Products"));
const CompletedOrders = React.lazy(() => import("./pages/CompletedOrders"));
const DeletedOrders = React.lazy(() => import("./pages/DeletedOrders"));
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <AppContext>
      <Navbar />
      <div className="main-div">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="content-div">
          <div className="display-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/products"
                element={
                  <Suspense fallback={<>Loading...</>}>
                    <Products />
                  </Suspense>
                }
              />
              <Route
                path="/completedorders"
                element={
                  <Suspense fallback={<>Loading...</>}>
                    <CompletedOrders />
                  </Suspense>
                }
              />
              <Route
                path="/deletedorders"
                element={
                  <Suspense fallback={<>Loading...</>}>
                    <DeletedOrders />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext>
  );
}

export default App;
