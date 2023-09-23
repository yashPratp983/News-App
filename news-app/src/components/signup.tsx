import classes from './login.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
// import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { useUserContext } from '../contexts/user'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues={
    email:string,
    password:string
}

const Signup=()=>{
    const {user,setUser}=useUserContext()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is mendatory')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is mendatory')
            .min(6, 'Password must be at least 6 char long'),

    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>(formOptions)

    const emailHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }

    const getUser=async(token:string)=>{
        try{
            let user1=await axios.get('https://6408b80201472000081e9bcc--beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/getuser',{
                headers:{
                    authorisation:`Bearer ${token}`
                }
            })
            setUser(user1.data.user)
            console.log(user1)
            setLoading(false)
            navigate('/');
        }catch(err:any){
            setLoading(false)
            toast.error(`${err.response.data.error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(err)
        }
    }

    const submitHandler=async (data:FormValues)=>{
        
        // console.log(data);
        try {
            setLoading(true)
            let tok = await axios.post('https://6408b80201472000081e9bcc--beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/signup', data);
            console.log(tok)
            localStorage.setItem('token', tok.data.token);
            getUser(tok.data.token)
            setLoading(false)
         

        } catch (err: any) {
            setLoading(false)
            toast.error(`${err.response.data.error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
          console.log(err)
        }
        
    }


    return(
        <>
        <div className={classes.page}>
       
        <div className={classes.image}>
            {/* <img src="https://images.unsplash.com/photo-1554731617-8eafa9975365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80" className={classes.background}></img> */}
        </div>
        <div className={classes.form}>
        <div className={classes.content}>
        <h1 className={classes.title}>News App</h1>
        <form className={classes.login} onSubmit={handleSubmit(submitHandler)}>
            <label htmlFor="Email" className={classes.emaillabel}>Email</label>
            <input type="text" {...register("email")} onChange={emailHandler}  id="username" className={classes.email} placeholder="Enter your email"/>
            <p className={classes.error}>{errors.email?.message}</p>
            <label htmlFor="password" className={classes.passwordlabel}>Password</label>
            <input type="password" {...register("password")} onChange={passwordHandler} id="password" className={classes.password} placeholder="password"/>
            <p className={classes.error}>{errors.password?.message}</p>
            {!loading && <button type="submit" className={classes.submitButton}>Sign up</button>}
            {loading && <button type="button" disabled={true} className={classes.submitButton2}>Loading...</button>}
        </form>
        <div style={{display:'flex'}}>
        <p>Already have an account?</p>
        <p style={{paddingLeft:'5px',cursor:'pointer',color:"#4CAF50"}} onClick={()=>{navigate('/login')}}>Sign in</p>
        </div>
        </div>
        </div>
        </div>
        <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Signup