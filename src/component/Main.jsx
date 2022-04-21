import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import {callTheApi} from "./ReduxSlice"
function Main(){
    const dispatch = useDispatch()
    const data = useSelector((state) => state)

    useEffect(() => {
        dispatch(callTheApi())
    }, [])
    console.log(data)
    return(
        <h1>This is Main</h1>
    )
}
export default Main