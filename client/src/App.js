import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import ForgetPwd from './components/ForgetPwd'
import Navbar from './components/Navbar'
import ResetPwd from './components/ResetPwd'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Video from './pages/Video'
import { darkTheme, lightTheme } from './utils/theme'

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 1.5rem 1.8rem;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path='/'>
                <Route index element={<Home type="featured" />} />
                <Route path='trending' element={<Home type="trending" />} />
                <Route path='subscription' element={<Home type="subscriptions" />} />
                <Route path='login' element={<Login />} />
                <Route path='profile' element={<Profile />} />
                <Route path='forgetpassword' element={<ForgetPwd />} />
                <Route path='api/user/resetpassword/:id/:token' element={<ResetPwd />} />
                <Route path='video' >
                  <Route path=':id' element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  )
}

export default App