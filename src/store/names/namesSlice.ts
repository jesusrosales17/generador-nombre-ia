import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameObject, NamesState } from "../interfaces/namesObject";


const initialState: NamesState = {
  names: []
}
const namesSlice = createSlice({
  name: "names",
  initialState,
  reducers: {
    setNames: (state, action: PayloadAction<NameObject[]>) => {
      state.names = action.payload;
    },

    updateName: (state, action: PayloadAction<NameObject>) => {

      const newNames = state.names.map((name) => {
        if (name.name === action.payload.name) {
          return { ...name, isFavorite: !name.isFavorite };
        }
        return name;
      });
      state.names = newNames;
      
    }
  },
});

export const { setNames, updateName } = namesSlice.actions;
export default namesSlice.reducer;
