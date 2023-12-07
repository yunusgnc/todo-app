// EditModal component
import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateTodo, fetchTodos } from "@/redux/todosSlice";
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({ modalState, toggleModal, todoId }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.data);
  const activeLink = useSelector((state) => state.setLink.activeLink);
  const linkFilters = useSelector((state) => state.setLink.linkFilters);

  const selectedTodo = useSelector((state) =>
    state.todos.data.find((todo) => todo.id === todoId)
  );

  if (!selectedTodo) {
    return null;
  }

  const initialValues = {
    title: selectedTodo ? selectedTodo.title : "",
    description: selectedTodo ? selectedTodo.description : "",
    is_completed: selectedTodo ? selectedTodo.is_completed : false,
    tags: selectedTodo
      ? tags.filter((tag) => selectedTodo.tags.includes(tag.value))
      : [],
    created_at: selectedTodo ? selectedTodo.created_at : "",
    updated_at: selectedTodo ? selectedTodo.updated_at : "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
  });

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    toggleModal();

    const todoData = {
      title: values.title,
      description: values.description,
      tags: values.tags.map((tag) => tag.value),
      is_completed: values.is_completed,
    };

    // Güncelleme işlemini başlat
    dispatch(updateTodo({ _id: todoId, ...todoData }))
      .then((res) => {
        console.log(res);
        dispatch(fetchTodos(linkFilters[activeLink]));
        toast.success("Todo updated successfully");
      })
      .catch((err) => {
        toast.error(`Something went wrong : ${err}`);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleTagsChange = (selectedTags) => {
    formik.setFieldValue("tags", selectedTags);
  };

  return (
    <Modal isOpen={modalState} toggle={toggleModal} size='lg'>
      <ModalHeader toggle={toggleModal}>Edit Task</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input
              type='text'
              name='title'
              id='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.title && !!formik.errors.title}
            />
            <FormFeedback>{formik.errors.title}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for='description'>Description</Label>
            <Input
              type='textarea'
              name='description'
              id='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={
                formik.touched.description && !!formik.errors.description
              }
            />
            <FormFeedback>{formik.errors.description}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for='tags'>Tags</Label>
            <Select
              isMulti
              value={formik.values.tags.map((tag) => ({
                label: tag?.label,
              }))}
              options={tags.map((tag) => ({
                value: tag.value,
                label: tag.label,
              }))}
              className='basic-multi-select'
              classNamePrefix='select'
              onChange={handleTagsChange}
            />
          </FormGroup>
          <FormGroup>
            <Label check>
              <Input
                type='checkbox'
                name='is_completed'
                id='is_completed'
                checked={formik.values.is_completed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Completed
            </Label>
          </FormGroup>

          <ModalFooter>
            <Button color='primary' type='submit'>
              Save Changes
            </Button>
            <Button color='secondary' onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
