import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string } = {
    value: 'pokemon',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
    },
})


export const { set } = searchSlice.actions

export default searchSlice.reducer