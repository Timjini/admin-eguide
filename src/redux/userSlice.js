import { createSlice } from '@reduxjs/toolkit';
import { rehydrate, register } from 'redux-persist';



export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            user: null,
        },
        reducers: {
            setUser: (state, action) => {
              state.user = action.payload;
            },
            clearUser: state => {
              state.user = null;
            },
             // Add the updateUser reducer
            updateUser: (state, action) => {
              state.user = action.payload;
            },
            // Mark the rehydrate action as non-serializable
            rehydrate: (state, action) => {},
            // Mark the register action as non-serializable
            register: (state, action) => {},
          },
    },

)

export const { setUser ,clearUser,updateUser } = userSlice.actions;
export default userSlice.reducer;