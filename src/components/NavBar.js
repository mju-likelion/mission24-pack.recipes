import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Category } from '../images/Category.svg';
import { useEffect, useState } from 'react';
import Axios from '../lib/axios';
import { useSetRecoilState } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';

const NavBar = () => {
  const setTitle = useSetRecoilState(TitleAtom);

  const [categoryList, setList] = useState([]);
  const [TopicList, setTopicList] = useState(false);
  const [subcategorySelected, setSubcategorySelected] = useState(false);

  const selectTitle = (id, name) => {
    const newObj = {
      id,
      name,
    };

    setTitle(newObj);
  };

  const [selectedCategory, setSelectedCategory] = useState(0);

  const fetchCategory = async () => {
    try {
      const ListData = await Axios.get('/category');
      setList(ListData.data.categories);
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <NavBarStyled>
        <CategoryImg />
        <Category
          onClick={() => {
            setTopicList((prev) => {
              if (prev) {
                setSelectedCategory(false);
                return false;
              } else {
                return true;
              }
            });
          }}
        />
        <CategoryText
          onClick={() => {
            setTopicList((prev) => {
              if (prev) {
                setSelectedCategory(false);
                return false;
              } else {
                return true;
              }
            });
          }}
        >
          카테고리
        </CategoryText>
      </NavBarStyled>
      {TopicList && (
        <DropDownMenu>
          {categoryList.map((Topic, index) => (
            <DropDownItem
              key={index}
              onClick={() => {
                setSelectedCategory(index);
                setSubcategorySelected(true);
              }}
            >
              <MajorTopicBox>
                <MajorTopic>{Topic.categoryName}</MajorTopic>
              </MajorTopicBox>
            </DropDownItem>
          ))}
        </DropDownMenu>
      )}

      {subcategorySelected && categoryList[selectedCategory] ? (
        <SubThemeBox>
          {categoryList[selectedCategory].downCategories.map((theme, idx) => (
            <SubTheme
              onClick={() => {
                selectTitle(theme._id, theme.categoryName);
                setSubcategorySelected(false);
                setTopicList(false);
              }}
              key={idx}
            >
              {theme.categoryName}
            </SubTheme>
          ))}
        </SubThemeBox>
      ) : undefined}
    </>
  );
};

export default NavBar;

const NavBarStyled = styled.div`
  width: 100%;
  border-top: solid 2px #d3d3d3;
  border-bottom: solid 2px #d3d3d3;
  margin: 0;
  display: flex;
  align-items: center;
  height: 64px;
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

const DropDownItem = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const CategoryImg = styled.div`
  margin-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const MajorTopic = styled.span``;

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
