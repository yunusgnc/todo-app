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
import { toast } from "react-toastify";
import DeleteModal from "../modal/DeleteModal";
import ComplateModal from "../modal/ComplateModal";
import EditModal from "../modal/EditModal";

const Card = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const dispatch = useDispatch();
  const [todoId, setTodoId] = useState(null);
  const todos = useSelector((state) => state.todos.data);
  const tags = useSelector((state) => state.tags.data);
  const [modalState, setModalState] = useState({
    delete: null,
    complete: null,
    edit: null,
  });

  const toggleModal = (modalName, todoId) => {
    setTodoId(todoId);
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: prevState[modalName] === todoId ? null : todoId,
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todoId))
      .then((res) => {
        setModalState((prevState) => ({
          ...prevState,
          delete: null,
        }));
        toast.success("Todo deleted successfully");
        dispatch(fetchTodos());
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handleComplete = () => {
    dispatch(updateTodo({ _id: todoId, is_completed: true }))
      .then((res) => {
        setModalState((prevState) => ({
          ...prevState,
          complete: null,
        }));
        toast.success("Todo completed successfully");
        dispatch(fetchTodos());
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    dispatch(fetchTodos()).then((res) => {
      console.log(res.payload);
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
        <div key={todo.id} className='col-lg-4 col-sm-12 '>
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
                <CardBody
                  style={{
                    minHeight: "300px",
                    maxHeight: "300px",
                  }}>
                  <CardTitle className='text-black texet-center' tag='h2'>
                    {todo?.title?.slice(0, 30)}
                    {todo?.title?.length > 20 && "..."}
                  </CardTitle>
                  <div className='col-12'>
                    <CardText
                      tag={"p"}
                      style={{
                        minHeight: "100px",
                        maxHeight: "100px",
                        overflowY: "hidden",
                      }}>
                      {todo?.description?.slice(0, 200)}
                      {todo?.description?.length > 100 && "..."}
                    </CardText>
                    {tags.map((tag) => {
                      if (todo?.tags?.includes(tag?.value)) {
                        return (
                          <Badge
                            key={tag.value}
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
          <EditModal
            key={`edit-${todo.id}`}
            modalState={modalState.edit === todo.id}
            toggleModal={() => toggleModal("edit", todo.id)}
            todoId={todo.id}
            deleteId={todo.id}
          />
          <ComplateModal
            key={`update-${todo.id}`}
            modalState={modalState.complete === todo.id}
            toggleModal={() => toggleModal("complete", todo.id)}
            handleComplete={() => handleComplete()}
            todoId={todo.id}
          />

          <DeleteModal
            key={`delete-${todo.id}`}
            modalState={modalState.delete === todo.id}
            toggleModal={() => toggleModal("delete", todo.id)}
            handleDelete={() => handleDelete()}
            deleteId={todo.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Card;
