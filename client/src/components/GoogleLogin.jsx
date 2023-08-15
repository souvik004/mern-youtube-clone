import React from 'react'
import styled from 'styled-components'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import axios from 'axios'

const Button = styled.button`
  background-color: #2a72f9;  
  color: #fff;
  width: 100%;
  padding: 8px 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
`

const GoogleLogin = () => {
  const googleAuthHandler = () => {
    window.open('http://localhost:3500/auth/google', "_self")
  }

  const githubAuthHandler = () => {
    window.open('http://localhost:3500/auth/github', "_self")
  }

  return (
    <>
      <Button onClick={googleAuthHandler}>
        Sign in with Google <FcGoogle />
      </Button>

      <Button onClick={githubAuthHandler}>
        Sign in with Github <FaGithub />
      </Button>
    </>
  )
}

export default GoogleLogin