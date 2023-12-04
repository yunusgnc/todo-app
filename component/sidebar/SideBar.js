import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaBars, FaTag, FaCaretDown, FaCaretUp, FaTasks } from "react-icons/fa";
import Content from "../content/Content";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setSidebarOpen(false); // Linke tıklandığında, mobilde menüyü kapat
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`s-layout ${sidebarOpen ? "s-layout--sidebar-open" : ""}`}>
      <div className='s-layout__sidebar'>
        <a
          className='s-sidebar__trigger'
          href='#0'
          onClick={handleSidebarToggle}>
          <FaBars />
        </a>
        <nav
          className={`s-sidebar__nav ${
            sidebarOpen ? "s-sidebar--open" : "s-sidebar--close"
          }`}>
          <ul>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  activeLink === "All" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#0'
                onClick={() => handleLinkClick("All")}>
                <FaTasks />
                <em>All</em>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  activeLink === "Active" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#0'
                onClick={() => handleLinkClick("Active")}>
                <FaCaretUp />
                <em>Active</em>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  activeLink === "Done" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#0'
                onClick={() => handleLinkClick("Done")}>
                <FaCaretDown />
                <em>Done</em>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  activeLink === "Task" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#0'
                onClick={() => handleLinkClick("Task")}>
                <FaTag />
                <em>Tags</em>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  activeLink === "Trash" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#0'
                onClick={() => handleLinkClick("Trash")}>
                <BsTrash />
                <em>Trash</em>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
