import { addTo, removeTo } from "../store/toastSlice";
import { useDispatch } from "react-redux";
//hooks는 앞에 무조건 use를 붙힌다.
const useToast = ()=>{
    const dispatch = useDispatch();
    //토스트 생성, toasts에는 id값이 들어있다.
    const addToast = (toasts)=>{
        dispatch(addTo(toasts));
        setTimeout(()=>{
            deleteToast(toasts.id);
        },3000);
    }
    //토스트 삭제
    const deleteToast = (id)=>{
        dispatch(removeTo(id));
    }
    return {
        addToast,   
        deleteToast,
    };
}
export default useToast;