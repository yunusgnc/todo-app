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
import { fetchTags } from "@/redux/tagsSlice";
import { addTodo, fetchTodos } from "@/redux/todosSlice";

import { useDispatch, useSelector } from "react-redux";

const AddModal = ({ modal = false, toggle = () => {} }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.data);

  const initialValues = {
    title: "",
    description: "",
    is_completed: false,
    tags: [],
  };

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
  });

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    toggle();

    const todoData = {
      title: values.title,
      description: values.description,
      tags: values.tags.map((tag) => {
        return tag.value;
      }),
      is_completed: values.is_completed,
      created_at: new Date(),
      updated_at: new Date(),
    };

    dispatch(addTodo(todoData))
      .then((res) => {
        console.log(res);
        dispatch(fetchTodos());
      })
      .catch((err) => {
        console.log(err);
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
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Add Task</ModalHeader>
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
              defaultValue={tags[0]}
              isMulti
              value={formik.values.tags}
              name='colors'
              options={tags.map((tag) => ({
                value: tag.value,
                label: tag.label,
                key: tag.value,
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
              />{" "}
              Completed
            </Label>
          </FormGroup>

          <ModalFooter>
            <Button color='primary' type='submit'>
              Add Task
            </Button>
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddModal;
