
import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { useRegisterMutation } from '../auth/authApiSlice';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import FromToken from '../fromToken';
import { Message } from 'primereact/message';

const LogOut = () => {
    const toast = useRef(null);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(null);
    const [myUser, setMyUser] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const defaultValues = { value: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;
    const user=FromToken()

    const [RegisterFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            setMyUser(user)
            navigate('/home')
            window.location.reload(false)
        }
    }, [isSuccess])


    const onSubmit = (data) => {
        console.log(data);
        form.reset();
        RegisterFunc(data)

    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <div className="card flex justify-content-center">
            <Dialog header="כניסה למערכת" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                    <Toast ref={toast} />
                    <Controller
                        name="name"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    שם מלא
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="username"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    שם משתמש
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                              {isError ? <div className="flex flex-wrap align-items-center mb-3 gap-2">
                        <Message severity="error" text={error.data.message} /></div> : <></>}
                    <Controller
                        name="password"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    סיסמה
                                </label>
                                <InputText type="password" inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="ID"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    תעודת זהות
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field}) => (
                            <>
                                <label htmlFor="ab">
                                    כתובת מייל
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} />
                            </>
                        )}
                    />

                    <Controller
                        name="phone"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    פלאפון
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}

                            </>
                        )}
                    />

                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field}) => (
                            <>

                                <label htmlFor="ad">
                                    כתובת
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} />

                            </>
                        )}
                    />
                    <Controller
                        name="secondPhone"
                        control={form.control}
                        render={({ field}) => (
                            <>
                                <label htmlFor="ae">
                                    פלאפון נוסף
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} />

                            </>
                        )}
                    />
                    <Controller
                        name="birthDate"
                        control={form.control}
                        render={({ field}) => (
                            <>
                                <label htmlFor="af">
                                    תאריך לידה
                                </label>
                                <Calendar inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} suggestions={items} />
                            </>
                        )}
                    />
                    <Button label="Submit" type="submit" icon="pi pi-check"></Button>

                </form>

            </Dialog >
        </div>
    )
}
export default LogOut       