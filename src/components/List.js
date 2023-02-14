import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as Like } from '../images/like.svg';
import { ReactComponent as RedLike } from '../images/redLike.svg';
import { ReactComponent as Report } from '../images/Report.svg';
import Modal from './ItemPlus';
import Alert from './Alert';
import { TitleAtom } from '../atoms/TitleAtom';

import useCategory from '../hooks/useCategory';
import useList from '../hooks/useList';
import useLike from '../hooks/useLike';
import useDislike from '../hooks/useDislike';
import useReport from '../hooks/useReport';
import { toast } from 'react-toastify';
import Loading from './Loading';
import Error from './Error';

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalDialog, setAlertModalDialog] = useState('');
  const [reportItemId, setReportItemId] = useState('');

  const [sort, setSort] = useState('likeCount');
  const token = localStorage.getItem('accessToken');

  const modalClose = () => {
    if (!token) {
      toast('로그인을 먼저 해 주세요!');
      return;
    }

    setModalOpen(!modalOpen);
    if (!modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const { category, categoryLoading, isCategoryError } = useCategory();
  const categories = category?.categories;

  const { name, id } = useRecoilValue(TitleAtom);
  const setTitleState = useSetRecoilState(TitleAtom);

  const { list, listFetch, isListError } = useList(sort, id);

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

  useEffect(() => {
    if (id) listFetch();
  }, [id, sort]);

  const postLike = useLike(sort, id);
  const deleteLike = useDislike(sort, id);
  const reportQuery = useReport();

  const report = async () => {
    await reportQuery.mutateAsync(reportItemId);
  };

  const like = async (itemId) => {
    await postLike.mutateAsync(itemId);
    listFetch();
  };

  const dislike = async (itemId) => {
    await deleteLike.mutateAsync(itemId);
    listFetch();
  };

  const openAlert = async (alertDialog) => {
    setAlertModalOpen(true);
    setAlertModalDialog(alertDialog);
  };

  return (
    <ListWrapper>
      {isListError || isCategoryError ? (
        <Error errorMsg='리스트 정보 가져오기를 실패했습니다.' />
      ) : (
        <>
          {categoryLoading && <Loading />}
          <Header>
            {name}
            <SortDiv>
              <button onClick={() => setSort('createdAt')}>최신순</button> |
              <button onClick={() => setSort('likeCount')}>인기순</button>
            </SortDiv>
          </Header>
          <ListBox>
            <ListBoxWrapper>
              {list?.items?.map((item, index) => (
                <ListElement key={index}>
                  <ListItemBox>
                    <ListItem>{item.name}</ListItem>
                  </ListItemBox>
                  <LikeBox>
                    {item?.likes ? (
                      <RedLike
                        onClick={() => {
                          dislike(item._id);
                        }}
                      />
                    ) : (
                      <Like
                        onClick={() => {
                          like(item._id);
                        }}
                      />
                    )}
                    <LikeNum>{item.likeCount}</LikeNum>
                  </LikeBox>
                  <ReportBox
                    onClick={() => {
                      openAlert('해당 아이템을 정말 신고하시겠습니까?');
                      setReportItemId(item._id);
                    }}
                  >
                    <Report />
                    <ReportText>신고하기</ReportText>
                  </ReportBox>
                </ListElement>
              ))}
            </ListBoxWrapper>
            <ButtonWrapper>
              <Button onClick={modalClose}>추가하기</Button>
            </ButtonWrapper>
            {modalOpen && <Modal sort={sort} modalClose={modalClose} />}
          </ListBox>
          {alertModalOpen && (
            <Alert
              title={'신고하기'}
              dialog={alertModalDialog}
              onYesHandler={() => report()}
              modalCloseDelegate={() => setAlertModalOpen(false)}
            />
          )}
        </>
      )}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin: 2% auto;
  width: 560px;
  min-height: 774px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 85%;
    min-height: 80vh;
    margin: 2% auto 10%;
  }
`;

const Header = styled.div`
  height: 74px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-left: 40px;
  margin-bottom: 2%;
  font-size: 44px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 90%;
    font-size: 30px;
    margin-left: 8%;
  }
`;

const SortDiv = styled.span`
  height: 30px;
  font-size: 20px;
  margin: 34px 25px 0 0;
  user-select: none;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #424242;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    font-size: 12px;
    margin: 34px 10px -10px 0;
  }
`;

const ListBox = styled.div`
  height: 630px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.yellow};
  padding: 70px 0 0 0;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    height: 508px;
    padding: 12% 0 0 0;
  }
`;

const ListBoxWrapper = styled.div`
  margin: 0 auto;
  height: 520px;
  width: 400px;
  overflow: auto;
  padding-left: 10px;
  /* background-color: red; */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary}; /* 스크롤바의 색상 */
    height: 1%; /* 스크롤바의 길이 */
  }
  &::-webkit-scrollbar-track {
    background: #fff; /* 스크롤바 뒷 배경 색상 */
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 90%;
    height: 410px;
    margin: 0 3%;
  }
`;

const ListItemBox = styled.div`
  width: 300px;
  font-size: 24px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 70%;
    margin-left: 2%;
  }
`;

const ListItem = styled.div`
  width: 300px;
  border-bottom: solid 2px #ffe5a4;
  font-size: 24px;
  margin: 34px 0 0 0;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 100%;
    font-size: 20px;
  }
`;

const ListElement = styled.div`
  display: flex;
  flex-direction: row;
`;

const LikeBox = styled.div`
  width: 16px;
  height: 30px;

  margin-left: 5%;
  margin-top: 34px;
`;

const ReportBox = styled.div`
  width: 24px;
  height: 38px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 30px;
  margin-left: 16px;
`;

const ReportText = styled.div`
  width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 7px;
`;

const LikeNum = styled.div`
  font-size: 10px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #a2c79a;
  margin: 7% 14% 0 0;
  padding: 10px;

  border-radius: 10px;
  border: none;
  color: white;
  z-index: 50;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin: 7% 5% 0 0;
  }
`;

export default List;
