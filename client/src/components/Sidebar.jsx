import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from './SideMenu';
import {AiOutlineHome} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineHistory, MdOutlineAccountCircle, MdOutlineLibraryMusic, MdOutlineSportsBaseball, MdBrightnessMedium, MdOutlineBrightnessMedium} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';

const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  height: 100vh;
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  /* padding: 18px 26px; */
`;



const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding: .5rem;
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin: 16px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 12px auto 6px;
  gap: 5px;
`;

const Sidebar = ({darkMode, setDarkMode}) => {
  const currentUser = useSelector(selectCurrentUser)

  const themeChangeHandler = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Container>
      <Wrapper>
        <SideMenu type='logo' Icon={GiHamburgerMenu} />
        
        <SideMenu title='Home' Icon={AiOutlineHome} />
        <SideMenu title='Explore' Icon={MdOutlineExplore} link='trending' />
        <SideMenu title='Subcription' Icon={MdOutlineSubscriptions} link='subscription' />
        <SideMenu title='Library' Icon={MdOutlineVideoLibrary} />
        <SideMenu title='History' Icon={MdOutlineHistory} />
        <Hr />
        {currentUser ? (
        <>
        </>
        ) : (
        <Login>
          Sign in to like videos, comment, and subscribe.
          <Link to="login" style={{textDecoration:"none"}}>
            <Button>
              <MdOutlineAccountCircle />
              SIGN IN
            </Button>
          </Link>
        </Login>
        )
      }
        <SideMenu title='Music' Icon={MdOutlineLibraryMusic} />
        <SideMenu title='Sports' Icon={MdOutlineSportsBaseball} />
        <SideMenu title={darkMode ? "Light Mode" : "Dark Mode"} Icon={darkMode? MdBrightnessMedium: MdOutlineBrightnessMedium} onThemeChange={() => themeChangeHandler()} />

      </Wrapper>
    </Container>
  )
}

export default Sidebar