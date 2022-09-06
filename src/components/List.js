import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { ReactComponent as Like } from '../images/like.svg';
import { ReactComponent as RedLike } from '../images/redLike.svg';
import Modal from './Modal';
import { TitleAtom } from '../atoms/TitleAtom';

import useCategory from '../hooks/useCategory';
import useList from '../hooks/useList';
import useLike from '../hooks/useLike';
import useDisLike from '../hooks/useDisLike';

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState('likeCount');
  const modalClose = () => {
    setModalOpen(!modalOpen);
    // fetchList();
  };
  const { category, categoryLoading } = useCategory();
  const categories = category?.categories;

  const { name, id } = useRecoilValue(TitleAtom);
  const setTitleState = useSetRecoilState(TitleAtom);

  const { list } = useList(sort, id);
  const [itemId, setItemId] = useState([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetch = async () => {
      if (!categoryLoading) {
        const subcategories = [];
        for (const category of categories) {
          for (const subcategory of category.downCategories) {
            subcategories.push(subcategory);
          }
        }
        const randIndex = Math.floor(Math.random() * subcategories.length);
        const selectedCategory = subcategories[randIndex];
        const id = selectedCategory._id;
        const name = selectedCategory.categoryName;

        setTitleState({ name, id });
      }
    };
    fetch();
  }, [categoryLoading]);

  const postLike = useLike(sort, id, itemId);
  const deleteLike = useDisLike(sort, id, itemId);

  const like = async () => {
    await postLike.mutateAsync();
    queryClient.invalidateQueries([
      `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
    ]);
  };

  const dislike = async () => {
    await deleteLike.mutateAsync();
    queryClient.invalidateQueries([
      `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
    ]);
  };

  return (
    <ListWrapper>
      <Header>
        {name}
        <SortDiv>
          <button onClick={() => setSort('createdAt')}>최신순</button> |
          <button onClick={() => setSort('likeCount')}>인기순</button>
        </SortDiv>
      </Header>
      {categoryLoading ? (
        <LoadingComponent>Loading...</LoadingComponent>
      ) : (
        <ListBox>
          <ListBoxWrapper>
            {list?.items?.map((item, index) => (
              <div key={index}>
                <ListItemBox>
                  <ListItem>{item.name}</ListItem>
                </ListItemBox>
                <LikeBox>
                  {item?.likes ? (
                    <RedLike
                      onClick={() => {
                        {
                          setItemId(item._id);
                          dislike();
                        }
                      }}
                    />
                  ) : (
                    <Like
                      onClick={() => {
                        {
                          setItemId(item._id);
                          like();
                        }
                      }}
                    />
                  )}
                  <LikeNum>{item.likeCount}</LikeNum>
                </LikeBox>
              </div>
            ))}
          </ListBoxWrapper>
          <ButtonWrapper>
            <Button onClick={modalClose}>추가하기</Button>
          </ButtonWrapper>
          {modalOpen && <Modal modalClose={modalClose}></Modal>}
        </ListBox>
      )}
    </ListWrapper>
  );
};

const LoadingComponent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding-top: 300px;
`;

const ListWrapper = styled.div`
  margin: 5px auto;
  width: 560px;
  min-height: 774px;
`;

const Header = styled.div`
  display: flex;
  margin-left: 24px;
  height: 74px;
  font-size: 44px;
  justify-content: space-between;
  align-items: flex-end;
`;

const SortDiv = styled.span`
  height: 30px;
  font-size: 20px;
  margin: 34px 12px 0 0;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ListBox = styled.div`
  height: 630px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.yellow};
  padding: 70px 0 0 0;
`;

const ListBoxWrapper = styled.div`
  margin: 0 auto;
  height: 576px;
  width: 400px;

  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary}; /* 스크롤바의 색상 */
    height: 2%; /* 스크롤바의 길이 */
  }
  &::-webkit-scrollbar-track {
    background: #fff; /* 스크롤바 뒷 배경 색상 */
  }
`;

const ListItemBox = styled.div`
  width: 344px;
  font-size: 24px;
`;

const ListItem = styled.div`
  width: 328px;
  border-bottom: solid 2px #ffe5a4;
  font-size: 24px;
  margin: 34px 0 0 0;
`;

const LikeBox = styled.div`
  width: 16px;
  height: 30px;
  margin: -30px 0 0 370px;
`;

const LikeNum = styled.div`
  font-size: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #a2c79a;
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: white;
  z-index: 100;
  margin-right: 15px;
`;

export default List;
