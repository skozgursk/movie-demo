import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './search/searchSlice'

export default configureStore({
    reducer: {
        search: searchSlice
    },
})