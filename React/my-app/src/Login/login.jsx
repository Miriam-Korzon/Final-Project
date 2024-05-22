import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { setToken } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import "../index.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { classNames } from 'primereact/utils'
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import { useForm, Controller } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { useLoginMutation } from '../auth/authApiSlice';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
// import { Password } from 'primereact/password';
import FromToken from '../fromToken';


const Login = () => {

const userToken=FromToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, { isError, isSuccess, isLoading, data, error }] = useLoginMutation()
    const [myUser, setMyUser] = useState("")
    const user = {
        username: '',
        password: ''
    }
    const register = () => {
        setVisible(true)
        navigate('/logOut')
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            setMyUser(userToken)
            navigate('/home')
            window.location.reload(false);
        }
    }, [isSuccess])

    const [visible, setVisible] = useState(true);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ user });

    const onSubmit = (data) => {
        console.log('data', data);
        loginFunc(data)
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="login">
            {/* <Button label="כניסה למערכת" onClick={() => setVisible(true)} /> */}
            {/* icon="pi pi-external-link" */}
            <Dialog header="כניסה למערכת" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">username</label>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="username" control={control} rules={{ required: 'user name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'w-12rem': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    {getFormErrorMessage('username')}
                                </div>

                            </div>
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Password</label>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="password" control={control} rules={{ required: 'password is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} type="password" className={classNames({ 'w-12rem': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    {getFormErrorMessage('password')}
                                </div>
                            </div>
                            {isError ? <h4>נסו שנית</h4> : <></>}
                            <Button type='submit' label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>

                        </div>
                        <div className="w-full md:w-2">
                            <Divider layout="vertical" className="hidden md:flex">
                                <b>OR</b>
                            </Divider>
                            <Divider layout="horizontal" className="flex md:hidden" align="center">
                                <b>OR</b>
                            </Divider>                 </div>
                        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                            <Button onClick={() => register()} label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                        </div>
                    </div>
                </form>
            </Dialog >
        </div>

    )


}

export default Login









