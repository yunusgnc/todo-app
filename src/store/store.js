import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todosSlice";
import tagsSlice from "@/redux/tagsSlice";
import setLinkSlice from "@/redux/setLinkSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    tags: tagsSlice,
    setLink: setLinkSlice,
  },
});

export default store;
