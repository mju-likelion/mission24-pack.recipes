import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CategoryIcon } from '../images/Category.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';
import useCategory from '../hooks/useCategory';
import { toast } from 'react-toastify';
import { ReactComponent as Logo } from '../images/logo.svg';

const NavBar = () => {
  const setTitle = useSetRecoilState(TitleAtom);
  const [isShowMainCategory, setIsShowMainCategory] = useState(false); //대분류 카테고리 isShow
  const [isShowDetailCategory, setIsShowDetailCategory] = useState(false); //소분류 카테고리
  const { category, categoryLoading } = useCategory();
  const [isMobileCategory, setIsMobileCategory] = useState(false);
  const selectTitle = (id, name) => {
    const newObj = {
      id,
      name,
    };
    setTitle(newObj);
  };

  const [selectedCategory, setSelectedCategory] = useState(0);
  const token = localStorage.getItem('accessToken');
  const width = document.body.clientWidth;

  const isHoverMainCategory = () => {
    if (width > 599) {
      setIsShowMainCategory((prev) => {
        if (prev) {
          setSelectedCategory(false);
          setIsMobileCategory(false);
          return false;
        } else {
          return true;
        }
      });
    }
  };

  const isClickMainCategory = () => {
    setIsShowMainCategory((prev) => {
      if (prev) {
        setSelectedCategory(false);
        setIsMobileCategory(false);
        return false;
      } else {
        return true;
      }
    });
  };

  const isHoverDetailCategory = () => {
    setIsShowDetailCategory(false);
    setIsShowMainCategory(false);
    setIsMobileCategory(false);
  };

  const onBackClick = () => {
    setIsShowDetailCategory(false);
  };

  const onMobileClick = () => {
    if (width >= 375) {
      if (width <= 599) setIsMobileCategory(!isMobileCategory);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem('accessToken');
    setIsMobileCategory(false);
    toast('로그아웃 되었습니다.');
  };

  return (
    <>
      {categoryLoading ? (
        <LoadingComponent>Loading...</LoadingComponent>
      ) : (
        <NavBarStyled>
          <Link to={'/'}>
            <MoblieLogo />
          </Link>

          <CategoryBox
            onMouseEnter={() => {
              isHoverMainCategory();
            }}
          >
            <CategoryIcon
              onClick={() => {
                onMobileClick();
              }}
            />
            <CategoryTitle>카테고리</CategoryTitle>
          </CategoryBox>
        </NavBarStyled>
      )}

      {isMobileCategory && (
        <DropDownMenu>
          <MobileMenu
            onClick={() => {
              isClickMainCategory();
            }}
          >
            카테고리
          </MobileMenu>
          {token ? (
            <MobileMenuBox onClick={onLogOut}>
              <MobileMenu>로그아웃</MobileMenu>
            </MobileMenuBox>
          ) : (
            <MobileMenuBox>
              <Link to={'/login'}>
                <MobileMenu>로그인</MobileMenu>
              </Link>
              <Link to={'/register'}>
                <MobileMenu>회원가입</MobileMenu>
              </Link>
            </MobileMenuBox>
          )}
        </DropDownMenu>
      )}

      {isShowMainCategory && (
        <DropDownMenu>
          {category?.categories.map((Topic, index) => (
            <DropDownItem
              key={index}
              onMouseOver={() => {
                setSelectedCategory(index);
                setIsShowDetailCategory(true);
              }}
            >
              <MajorTopicBox>
                <MajorTopic>{Topic?.categoryName}</MajorTopic>
              </MajorTopicBox>
            </DropDownItem>
          ))}
        </DropDownMenu>
      )}

      {isShowDetailCategory && category?.categories[selectedCategory] ? (
        <SubThemeBox>
          {category?.categories[selectedCategory]?.downCategories.map(
            (theme, idx) => (
              <SubTheme
                onClick={() => {
                  selectTitle(theme?._id, theme?.categoryName);
                  isHoverDetailCategory();
                }}
                key={idx}
              >
                {theme?.categoryName}
              </SubTheme>
            ),
          )}
          <Back
            onClick={() => {
              onBackClick();
            }}
          >
            뒤로 가기
          </Back>
        </SubThemeBox>
      ) : undefined}
    </>
  );
};

const NavBarStyled = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  margin: 0;
  border-top: solid 2px #d3d3d3;
  border-bottom: solid 2px #d3d3d3;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin: 0 20px 0 auto;
  }
`;

const CategoryTitle = styled.p`
  color: #797979;
  margin-left: 30px;
  user-select: none;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    display: none;
  }
`;

const DropDownMenu = styled.div`
  width: 200px;
  height: 260px;

  position: absolute;

  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #ffffff;
  padding: 30px 0;

  cursor: pointer;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MobileMenuBox = styled.div`
  height: 260px;
`;

const MobileMenu = styled.button`
  display: none;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    display: flex;
    padding: 30px 0;
    cursor: pointer;

    background: none;
    border: none;
  }
`;

const DropDownItem = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 0;
`;

//카테고리 대분류 박스
const MajorTopicBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    animation-name: 'topicHover';
    animation-duration: 100ms;
    animation-fill-mode: both;
    &::after {
      content: '>';
      position: absolute;
      right: 30px;
    }
  }

  @keyframes topicHover {
    to {
      color: #a2c79a;
    }
  }
`;

const MajorTopic = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

//카테고리 소분류 박스
const SubThemeBox = styled.div`
  width: 200px;

  background-color: white;
  position: absolute;
  left: 200px;

  display: flex;
  flex-direction: column;

  box-shadow: 0px 4px 4px 0px #00000040;

  cursor: pointer;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    height: 320px;
    position: absolute;
    display: flex;
    left: auto;
    right: 0;
  }
`;

const SubTheme = styled.div`
  height: 40px;
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 5px 0;
  user-select: none;

  :hover {
    animation-name: 'slidein';
    animation-duration: 100ms;
    animation-fill-mode: both;
  }

  @keyframes slidein {
    to {
      color: #a2c79a;
    }
  }
`;

const Back = styled.div`
  display: none;
  @media screen and (max-width: 599px) and (min-width: 375px) {
    height: 40px;
    width: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding: 5px 0;
  }
`;

const LoadingComponent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding-top: 300px;
`;

const MoblieLogo = styled(Logo)`
  display: none;
  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 126px;
    display: block;
    margin-left: 15px;
  }
`;

export default NavBar;
