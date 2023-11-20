import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useToDoPage = () => { 

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return {
        navigate,
        dispatch
    }
}