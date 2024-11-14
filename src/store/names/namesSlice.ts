import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NamesState {
  names: NameObject[] ;
}

export interface NameObject {
  name: string;
  description: string;
  isFavorite?: boolean;
}
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

    selectName: (state, action: PayloadAction<NameObject>) => {

      console.log('hola')
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

export const { setNames, selectName } = namesSlice.actions;
export default namesSlice.reducer;
