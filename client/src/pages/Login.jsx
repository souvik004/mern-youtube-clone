import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { apiPublicRequest } from "../apiRequest";
import GoogleLogin from "../components/GoogleLogin";
import { selectCurrentUser, selectError, userLogin } from "../features/authSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Forget = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  color: inherit
`;

const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const error = useSelector(selectError)

  const loginHandler = async (e) => {
    e.preventDefault()

    dispatch(userLogin({email, password}))

    // if(currentUser?.status === "success") {
    //   navigate('/')
    // }
  }

  useEffect(() => {
    if(currentUser?.status === "success"){
      navigate('/')
    }
  }, [currentUser, navigate])
  

  const signupHandler = async (e) => {
    e.preventDefault()
    const res = await apiPublicRequest.post('/user/register', {name, email, password})
    console.log(res.data)
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input type='email' placeholder="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={loginHandler}>Sign in</Button>
        <Forget to="/forgetpassword">Forget Password</Forget>
        {error && <p>{error}</p>}
        <GoogleLogin />
        <Title>or</Title>
        <Input placeholder="name" name="name" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={signupHandler}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
      </More>
    </Container>
  )
}

export default Login