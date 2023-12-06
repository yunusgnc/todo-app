import React, { useEffect, useState } from "react";
import { BsSearch, BsPlus } from "react-icons/bs";
import AddModal from "../modal/AddModal";
import { fetchTodos } from "@/redux/todosSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchTodos(searchTerm))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <a
                className='navbar-brand d-flex fs-2 justify-content-center'
                href='#'>
                TASKS
              </a>
            </div>
            <div className='col-6'>
              <a
                className='navbar-brand fs-6 d-flex justify-content-end border-end pe-3'
                href='#'>
                Home
              </a>
            </div>
            <div className='col-6'>
              <a
                className='navbar-brand fs-6 d-flex justify-content-start border-start ps-3'
                href='#'>
                About
              </a>
            </div>
          </div>

          <div
            className='navbar-collapse justify-content-between flex-wrap'
            id='navbarTogglerDemo01'>
            <form
              className='d-flex position-relative  mb-2 mb-lg-0'
              style={{ height: "50px", width: "250px" }}>
              <input
                className='form-control rounded-start '
                type='search'
                placeholder='Search'
                aria-label='Search'
                onChange={handleSearch}
              />
              <span className='position-absolute top-50 translate-middle-y end-0 pe-3'>
                <BsSearch />
              </span>
            </form>
            <button
              className='btn btn-outline-primary  w-lg-auto p-2 border border-primary'
              onClick={toggle}
              style={{ height: "50px", width: "200px" }}
              data-bs-toggle='modal'
              data-bs-target='#addTodoModal'>
              <BsPlus color='#007bff' size={20} />
              New Task
            </button>
          </div>
        </div>
      </nav>
      <AddModal modal={modal} toggle={toggle} />
    </div>
  );
}
