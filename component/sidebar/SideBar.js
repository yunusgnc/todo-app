import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaBars, FaTag, FaCaretDown, FaCaretUp, FaTasks } from "react-icons/fa";
import Content from "../content/Content";
import Link from "next/link";

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
              <Link
                className={`s-sidebar__nav-link ${
                  activeLink === "All" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='/'
                onClick={() => handleLinkClick("All")}>
                <FaTasks />
                <em>All</em>
              </Link>
            </li>
            <li>
              <Link
                className={`s-sidebar__nav-link ${
                  activeLink === "Active" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#'
                onClick={() => handleLinkClick("Active")}>
                <FaCaretUp />
                <em>Active</em>
              </Link>
            </li>
            <li>
              <Link
                className={`s-sidebar__nav-link ${
                  activeLink === "Done" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#'
                onClick={() => handleLinkClick("Done")}>
                <FaCaretDown />
                <em>Done</em>
              </Link>
            </li>
            <li>
              <Link
                className={`s-sidebar__nav-link ${
                  activeLink === "Task" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='/tags'
                onClick={() => handleLinkClick("Task")}>
                <FaTag />
                <em>Tags</em>
              </Link>
            </li>
            <li>
              <Link
                className={`s-sidebar__nav-link ${
                  activeLink === "Trash" ? "s-sidebar__nav-link-active" : ""
                }`}
                href='#'
                onClick={() => handleLinkClick("Trash")}>
                <BsTrash />
                <em>Trash</em>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
