import React, { useEffect, useState } from "react";
import {
  Card as StrapCard,
  CardBody,
  CardTitle,
  CardText,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Badge,
} from "reactstrap";
import { FaCheckCircle, FaCircleNotch, FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../../src/redux/todosSlice";
import DeleteModal from "../modal/DeleteModal";

const Card = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const todos = useSelector((state) => state.todos.data);
  const tags = useSelector((state) => state.tags.data);
  const [modalState, setModalState] = useState({
    delete: false,
    complete: false,
    edit: false,
  });

  const toggleModal = (modalName, todoId) => {
    setDeleteId(todoId);
    console.log(deleteId);
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(deleteId)).then((res) => {
      setModalState((prevState) => ({
        ...prevState,
        delete: !prevState.delete,
      }));
      dispatch(fetchTodos());
    });
  };

  useEffect(() => {
    dispatch(fetchTodos()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  const toggleMenu = (cardId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  return (
    <div className='row'>
      {todos.map((todo) => (
        <div key={todo.id} className='col-lg-6 col-xl-4 col-sm-12 col-md-6'>
          <StrapCard>
            <div className='row'>
              <div className='col-1'>
                {todo.is_completed ? (
                  <FaCheckCircle size={30} color='blue' />
                ) : (
                  <FaCircleNotch size={30} color='blue' />
                )}
              </div>
              <div className='col-8'>
                <CardBody>
                  <CardTitle className='text-black texet-center' tag='h2'>
                    {todo.title.slice(0, 30)}
                    {todo.title.length > 20 && "..."}
                  </CardTitle>
                  <div className='col-12'>
                    <CardText tag={"p"}>
                      {todo.description.slice(0, 150)}{" "}
                      {todo.description.length > 150 && "..."}
                    </CardText>
                    {tags.map((tag) => {
                      if (todo.tags.includes(tag.value)) {
                        return (
                          <Badge
                            color='transparent'
                            className='text-black m-1 border border-danger'>
                            {tag.label}
                          </Badge>
                        );
                      }
                    })}
                  </div>
                </CardBody>
              </div>
              <div className='col-1'>
                <div className='edit-icon'>
                  <Dropdown
                    isOpen={dropdownOpen[todo.id]}
                    toggle={() => toggleMenu(todo.id)}>
                    <DropdownToggle
                      color='transparent'
                      size='sm'
                      id={`dropdownMenuButton${todo.id}`}>
                      <FaEllipsisH size={20} color='blue' />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => toggleModal("edit", todo.id)}>
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => toggleModal("complete", todo.id)}>
                        Completed
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => toggleModal("delete", todo.id)}>
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </StrapCard>
          <DeleteModal
            modalState={modalState.delete}
            toggleModal={() => toggleModal("delete", todo.id)} // Pass a function that closes the modal directly
            handleDelete={() => handleDelete()} // Pass the handleDelete function
          />
        </div>
      ))}
    </div>
  );
};

export default Card;
