import { useEffect } from 'react';
import { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import {MdOutlineAccountCircle, MdOutlineVideoCall} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { selectCurrentUser } from '../features/authSlice';
import Toolbox from './Toolbox';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  border-radius: 3px;
`;

const Input = styled.input`
  flex: 1;
  padding-left: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  outline: none;
  color: ${({ theme }) => theme.text};
  height: 40px;
  border: 0.5px solid ${({ theme }) => theme.soft};

  &:focus{
    border: 0.6px solid #3ea6ff;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.soft};
  padding: 0 .8rem 0 1.2rem;
  font-size: 3.2rem;
  height: 40px;
  cursor: pointer;
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;


const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser)
  // console.log(currentUser)

  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    document.addEventListener("click", () => setShowOptions(prev => !prev))
    
    return () => {
      document.removeEventListener("click", () => setShowOptions(prev => !prev))
    }
  }, [])
  

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchIcon />
        </Search>
        {!currentUser ? 
        (
          <Link to="login" style={{ textDecoration: "none" }}>
            <Button>
              <MdOutlineAccountCircle style={{fontSize: '1.2rem'}} />
              SIGN IN
            </Button>
          </Link>
        ) 
        : (
          <>
            <User>
              <MdOutlineVideoCall style={{fontSize: '1.6rem'}} />
              <Avatar src={currentUser?.data?.img} onClick={() => setShowOptions(prev => !prev)} />
              <p>{currentUser?.data?.name.split(" ")[0]}</p>
              {showOptions && <Toolbox  />}
            </User>
          </>
        )
        }
      </Wrapper>
    </Container>
  )
}

export default Navbar