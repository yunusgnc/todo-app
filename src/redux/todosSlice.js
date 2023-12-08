import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (params) => {
    const { is_deleted = false, ...otherParams } = params;

    const response = await api.get("/todos", {
      params: {
        _sort: "created_at",
        _order: "desc",
        is_deleted,
        ...otherParams,
      },
    });

    return response.data;
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await api.post("/todos", todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await api.patch(`/todos/${id}`, { is_deleted: true });
  return id;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await api.patch(`/todos/${todo._id}`, todo);
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter((todo) => todo._id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default todosSlice.reducer;
