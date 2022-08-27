import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Category } from '../images/Category.svg';
import { ReactComponent as DropdownBtn } from '../images/DropdownBtn.svg';
import { useEffect, useState } from 'react';
import Axios from '../lib/axios';
import { useSetRecoilState } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';

const NavBar = () => {
  const setTitle = useSetRecoilState(TitleAtom);
  const [categoryList, setList] = useState([]);
  const [TopicList, setTopicList] = useState(false);
  const [subcategorySelected, setSubcategorySelected] = useState(false);
  const selectTitle = (id) => {
    const newObj = {
      id,
    };
    setTitle(newObj);
  };
  const [selectedCategory, setSelectedCategory] = useState(0);
  const getCategory = async () => {
    try {
      const ListData = await Axios.get('/category');
      setList(ListData.data.categories);
    } catch (e) {
      return;
    }
  };
  useEffect(() => {
    getCategory();
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
        <CategoryText>카테고리</CategoryText>
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
              <div>
                <MajorTopic>{Topic.categoryName}</MajorTopic>
                <StyledBtn />
              </div>
            </DropDownItem>
          ))}
        </DropDownMenu>
      )}

      {subcategorySelected && categoryList[selectedCategory] ? (
        <SubThemeBox>
          {categoryList[selectedCategory].downCategories.map((theme, idx) => (
            <SubTheme
              onClick={() => {
                selectTitle(theme._id);
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
const DropDownMenu = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 70px;
  left: 0;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const DropDownItem = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBtn = styled(DropdownBtn)`
  opacity: 0;
  position: absolute;
  left: 200px;
`;

const CategoryImg = styled.div`
  margin-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const MajorTopic = styled.span`
  margin-right: 20px;
`;

/*
const MajorTopicBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #bedbb8;

  > div {
    color: black;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 0;
    left: 250px;
    box-shadow: 0px 4px 4px 0px #00000040;
    :nth-child(1) {
      align-self: center;
    }
  }
  ${StyledBtn} {
    display: inline;
    opacity: 1;
    margin-left: 40px;
    margin: 0px;
  }

  width: 100%;
  text-align: center;
`;
*/
const SubThemeBox = styled.div`
  position: relative;
  width: 200px;
  left: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
const SubTheme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  width: 200px;
  :hover {
    color: #bedbb8;
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

const CategoryText = styled.p`
  color: #797979;
  margin-left: 30px;
`;
