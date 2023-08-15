import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../features/authSlice'

const options = ['profile', 'logout']

const Container = styled.div`
    width: 120px;
    height: 80px;
    background-color: #efefef;
    position: absolute;
    top: 100%;
    right: 30%;
    border-radius: 5px;
    padding: 2px
`

const Items = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Item = styled(Link)`
    text-decoration: none;
    color: inherit;
    margin-bottom: 5px;
    padding: 5px;
    cursor: pointer;
    text-transform: capitalize;
    &:hover{
        background-color: #ffffff;
    }
`

const Toolbox = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        /* setShowOptions(false) */
    }

  return (
    <Container>
        <Items>
            {options.map((item, i) => {
                if(item === 'logout'){
                    return (<Item onClick={logoutHandler}>Logout</Item>)
                } else{
                    return <Item key={i} to={`/profile`}>{item}</Item>
                }            
            })}
        </Items>
    </Container>
  )
}

export default Toolbox