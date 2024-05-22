import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useRegisterMutation } from '../auth/authApiSlice';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { Message } from 'primereact/message';



const NewUser = (props) => {
    const navigate = useNavigate()
    const defaultValues = { value: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;
    const options_active = ['true', 'false'];
    const options = ['User', 'Admin'];
    const [value, setValue] = useState(options[0]);
    const [value_active, setValue_active] = useState(options_active[0]);

    const [RegisterFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    // const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (isSuccess) {
            props.setVisible(false)
            navigate('/users')
            // window.location.reload(false);
            props.refetch()
        }
    }, [isSuccess])

    const onSubmit = (data) => {
        form.reset()
        const newobj = Object.assign({}, data, { "roles": value, "active": value_active })
        RegisterFunc(newobj)
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <div className="card flex justify-content-center">
            <Dialog header="כניסה למערכת" visible={props.visible} style={{ width: '50vw' }} onHide={() => props.setVisible(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                    <Controller
                        name="name"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    שם מלא
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
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
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
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
                                <InputText type="password" inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
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
                                <InputText type='text' inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="ab">
                                    כתובת מייל
                                </label>
                                <InputText type='email' inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
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
                                <InputText type='tel' inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}

                            </>
                        )}
                    />

                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                            <>

                                <label htmlFor="ad">
                                    כתובת
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />

                            </>
                        )}
                    />
                    <Controller
                        name="secondPhone"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="ae">
                                    פלאפון נוסף
                                </label>
                                <InputText type='tel' inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />

                            </>
                        )}
                    />
                    <Controller
                        name="birthDate"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="af">
                                    תאריך לידה
                                </label>
                                <Calendar inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                            </>
                        )}
                    />
                    <>
                        <label >
                            תפקיד
                        </label><div className="card flex justify-content-center">
                            <SelectButton name="roles" value={value} onChange={(e) => { console.log(e.value); setValue(e.value) }} options={options} />
                        </div>
                    </>

                    <>
                        <label >
                            פעיל/לא פעיל
                        </label><div className="card flex justify-content-center">
                            <SelectButton name="active" value={value_active} onChange={(e) => setValue_active(e.value)} options={options_active} />
                        </div>
                    </>
                    <Button label="Submit" type="submit" icon="pi pi-check"></Button>

                </form>

            </Dialog >
        </div>
    )

}
export default NewUser