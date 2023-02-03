import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo.svg';
import { removeCookie } from '../util/Cookie';
import { toast } from 'react-toastify';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    removeCookie('refreshToken');
    setIsLogin(!isLogin);
    navigate('/');
    toast('로그아웃 되었습니다.');
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <HeaderWrapper>
      <Link to={'/'}>
        <LogoBox />
      </Link>
      <LinkBox>
        {isLogin ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <>
            <Link to={'/login'}>
              <Button>로그인</Button>
            </Link>
            <p>|</p>
            <Link to={'/register'}>
              <Button>회원가입</Button>
            </Link>
          </>
        )}
      </LinkBox>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 90px;
  padding: 0px 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    display: none;
  }
`;

const LogoBox = styled(Logo)`
  cursor: pointer;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Header;
