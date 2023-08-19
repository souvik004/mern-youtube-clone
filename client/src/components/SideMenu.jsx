import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png'

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: .5rem 2.5rem .5rem 1.5rem;
  &:hover {
    background-color: ${(props) => props.type ? 'transparent' : props.theme.soft};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 25px;
`;

const SideMenu = ({Icon, title, onThemeChange, type, link}) => {
  return (
    <Link to={link ? `${link}` : ''} style={{textDecoration: "none", color: "inherit"}}>
      <Item onClick={onThemeChange} type={type} >
        <Icons>
          <Icon />
        </Icons>
        {!type ? 
          <span style={{fontWeight: 600}}>{title}</span> 
          : 
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={logo} />SouvikPalTube
            </Logo>
          </Link>
        }
      </Item>
    </Link>
  )
}

const Icons = styled.span`
  font-size: 1.2rem;
`

export default SideMenu