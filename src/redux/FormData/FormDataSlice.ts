// formDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataState {
  name: string;
  email: string;
  phoneNumber: string;
}

const initialState: FormDataState = {
  name: '',
  email: '',
  phoneNumber: '',
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateField: (state, action:any) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.phoneNumber = action.payload.phoneNumber
      
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { updateField, resetForm } = formDataSlice.actions;
export default formDataSlice.reducer;

