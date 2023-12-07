import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "All",
  linkFilters: {
    All: { is_deleted: false },
    Active: { is_completed: false, is_deleted: false },
    Done: { is_completed: true, is_deleted: false },
    Trash: { is_deleted: true },
  },
};

const setLinkSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setActiveLink, (state, action) => {
      const newActiveLink = action.payload;
      if (state.linkFilters[newActiveLink]) {
        state.linkFilters[newActiveLink] = {
          ...state.linkFilters[newActiveLink],
        };
      }
    });
  },
});

export const { setActiveLink } = setLinkSlice.actions;
export default setLinkSlice.reducer;
