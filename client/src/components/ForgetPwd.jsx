import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPublicRequest } from '../apiRequest'

const ForgetPwd = () => {
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const forgetPwdHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await apiPublicRequest.post('/user/forgetpassword', {email})
            setMsg(res.data?.msg)
            // if(res.data?.status === 'success'){
            //     navigate('/resetpassword', {replace: true})
            // }
        } catch (error) {
            setMsg(error.response.data.msg)
            // console.log(error)
        }
    }

  return (
    <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={forgetPwdHandler}>
        <label>Enter email</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Submit</button>
        <p>{msg}</p>
    </form>
  )
}

export default ForgetPwd