import React, { useState } from "react";
import { AiFillDashboard } from "react-icons/Ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdDoneOutline, MdCancel, MdFastfood } from "react-icons/Md";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <aside
      className={`sidebar ${showSidebar === true ? "active" : "isClosed"}`}
    >
      <div className="sidebar-content">
        <div className="sidebar-links">
          <Nav.Link
            className={`sidebar-link ${
              splitLocation[1] === "" ? "active" : ""
            }`}
            to="/"
            as={NavLink}
          >
            <AiFillDashboard /> &nbsp;Dashboard
          </Nav.Link>
          <hr />
          <Nav.Link
            className={`sidebar-link ${
              splitLocation[1] === "completedorders" ? "active" : ""
            }`}
            to="/completedorders"
            as={NavLink}
          >
            <MdDoneOutline /> &nbsp;Completed Orders
          </Nav.Link>
          <Nav.Link
            className={`sidebar-link ${
              splitLocation[1] === "deletedorders" ? "active" : ""
            }`}
            to="/deletedorders"
            as={NavLink}
          >
            <MdCancel /> &nbsp;Deleted Orders
          </Nav.Link>
          <hr />
          <Nav.Link
            className={`sidebar-link ${
              splitLocation[1] === "products" ? "active" : ""
            }`}
            to="/products"
            as={NavLink}
          >
            <MdFastfood />
            &nbsp;Products
          </Nav.Link>
        </div>
      </div>
      <div className="sidebar-footer">
        <h4>
          {showSidebar ? (
            <IoChevronBack
              style={{ cursor: "pointer" }}
              onClick={() => setShowSidebar((prev) => !prev)}
            />
          ) : (
            <IoChevronForward
              style={{ cursor: "pointer" }}
              onClick={() => setShowSidebar((prev) => !prev)}
            />
          )}
        </h4>
      </div>
    </aside>
  );
};

export default Sidebar;
