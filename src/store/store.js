import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todosSlice";
import tagsSlice from "@/redux/tagsSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    tags: tagsSlice,
  },
});

export default store;
