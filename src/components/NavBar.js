/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CategoryIcon } from '../images/Category.svg';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';
import useCategory from '../hooks/useCategory';

const NavBar = () => {
  const setTitle = useSetRecoilState(TitleAtom);

  const [categoryList, setCategoryList] = useState([]); //카테고리 리스트가 카테고리 변경하는거
  const [isShowMainCategory, setIsShowMainCategory] = useState(false); //대분류 카테고리 isShow
  const [isShowDetailCategory, setIsShowDetailCategory] = useState(false); //소분류 카테고리

  const { category } = useCategory();
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  const selectTitle = (id, name) => {
    const newObj = {
      id,
      name,
    };

    setTitle(newObj);
  };

  const [selectedCategory, setSelectedCategory] = useState(0);

  // const fetchCategory = () => {
  //   setCategoryList(category?.categories);
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, [categoryList]);
  // console.log(categoryList, 'categoryList');

  // console.log(useCategory(), 'useCategory()');
  // console.log(categoryList, 'setCategoryList(category?.categories)');
  // console.log(category, 'category');
  // console.log(category?.categories, 'category?.categories');

  return (
    <>
      <NavBarStyled>
        <CategoryBox
          onClick={() => {
            setIsShowMainCategory((prev) => {
              if (prev) {
                setSelectedCategory(false);
                return false;
              } else {
                return true;
              }
            });
            // setIsHoverIcon(0);
          }}
        >
          <CategoryIcon />
          <CategoryText>카테고리</CategoryText>
        </CategoryBox>
      </NavBarStyled>
      {isShowMainCategory && (
        // <DropDownIs>
        <DropDownMenu>
          {category?.categories.map((Topic, index) => (
            <DropDownItem
              key={index}
              onClick={() => {
                setSelectedCategory(index);
                setIsShowDetailCategory(true);
              }}
            >
              <MajorTopicBox>
                <MajorTopic>{Topic?.categoryName}</MajorTopic>
                {/* {isHoverIcon ? <HoverText>&gt;</HoverText> : ' '} */}
              </MajorTopicBox>
            </DropDownItem>
          ))}
        </DropDownMenu>
        // </DropDownIs>
      )}
      {isShowDetailCategory && category?.categories[selectedCategory] ? (
        <SubThemeBox>
          {category?.categories[selectedCategory]?.downCategories.map(
            (theme, idx) => (
              <SubTheme
                onClick={() => {
                  selectTitle(theme?._id, theme?.categoryName);
                  setIsShowDetailCategory(false);
                  setIsShowMainCategory(false);
                }}
                key={idx}
              >
                {theme?.categoryName}
              </SubTheme>
            ),
          )}
        </SubThemeBox>
      ) : undefined}
      <TestBox1>p</TestBox1>
      <TestBox2>c</TestBox2>
    </>
  );
};

export default NavBar;

const TestBox1 = styled.div`
  width: 20px;
  height: 20px;
  background-color: pink;
  margin-top: 100px;
`;

const TestBox2 = styled.div`
  width: 30px;
  height: 30px;
  background-color: aqua;

  ${TestBox1}:hover + & {
    background-color: pink;
  }
`;

const NavBarStyled = styled.div`
  width: 100%;
  border-top: solid 2px #d3d3d3;
  border-bottom: solid 2px #d3d3d3;
  margin: 0;
  display: flex;
  align-items: center;
  height: 64px;
`;

const CategoryBox = styled.div`
  width: 149px;
  height: 40px;

  margin-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: blue;
`;

const DropDownMenu = styled.div`
  position: absolute;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #ffffff;
  padding: 30px 0;
`;

// const DropDownIs = styled.div`
//   ${CategoryBox}:hover + & {
//     display: block;
//   }
// `;

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
`;

// const HoverText = styled.p`
//   position: absolute;
//   left: 150px;
// `;

//카테고리 소분류 박스
const SubThemeBox = styled.div`
  position: absolute;
  width: 200px;
  left: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const SubTheme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  width: 200px;
  background-color: white;
  padding: 5px 0;

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

const CategoryText = styled.p`
  color: #797979;
  margin-left: 30px;
`;
