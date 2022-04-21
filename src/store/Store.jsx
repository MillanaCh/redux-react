import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../component/ReduxSlice"

const store = configureStore({
    reducer: userSlice.reducer
})
export default store