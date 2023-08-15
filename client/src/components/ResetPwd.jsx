import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiPublicRequest } from '../apiRequest'

const ResetPwd = () => {
    const [pwd, setPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [msg, setMsg] = useState("")

    const params = useParams()
    const {id, token} = params

    const navigate = useNavigate()

    const resetPwdHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await apiPublicRequest.post(`/user/resetpassword/${id}/${token}`, {password: pwd, confirm_password: confirmPwd})
            console.log(res.data)
            setMsg(res.data?.msg + '... redirecting to Login page')
            if(res.data?.status === 'success'){
                setTimeout(() => {
                    navigate('/login', {replace: true})
                }, 3000);
            }
        } catch (error) {
            setMsg(error.response.data.msg)
            console.log(error.response.data.msg)
        }
    }

  return (
    <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={resetPwdHandler}>
        <label>Enter password</label>
        <input type="password" name="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        <label>Enter confirm password</label>
        <input type="password" name="confirmPwd" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
        <button>Submit</button>
        <p>{msg}</p>
    </form>
  )
}

export default ResetPwd