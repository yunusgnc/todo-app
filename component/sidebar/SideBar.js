import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaBars, FaTag, FaCaretDown, FaCaretUp, FaTasks } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "@/redux/todosSlice";
import { setActiveLink } from "@/redux/setLinkSlice";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeLink = useSelector((state) => state.setLink.activeLink);
  const linkFilters = useSelector((state) => state.setLink.linkFilters);

  const dispatch = useDispatch();

  const handleLinkClick = (link) => {
    dispatch(setActiveLink(link));
    dispatch(fetchTodos(linkFilters[link]));
    setSidebarOpen(false);
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
                href='/'
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
                href='/'
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
                href='/'
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
