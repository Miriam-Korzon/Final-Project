import { Button } from "primereact/button"
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useDeleteTodoMutation } from "./todoApiSlice";
const DeleteTodo = ({_id}) => {
    console.log(_id)
    const toast = useRef(null);
    const [deleteTodo, { isError, isSuccess, error }] = useDeleteTodoMutation()
    useEffect(() => {
        if (isSuccess) {
            
            toast.current.show({ severity: 'success', summary: 'מחיקה', detail: `נמחק בהצלחה` });
        }
    }, [isSuccess])

    useEffect(() => {
        if(isError){
            console.log(isError);
            alert("הקורס בשימוש")
        }

    }, [error])

    const accept = () => {
        //  toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have deleted' });

        
        deleteTodo(_id)
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });

    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>
        </>
    )
}
export default DeleteTodo