import styled from 'styled-components';

import { ReactComponent as GithubIcon } from '../images/github.svg';
// import { ReactComponent as InstagramIcon } from '../images/instagram.svg';

function Footer() {
  return (
    <>
      <FooterWrapper>
        <FooterEmail>pack.recipes@gmail.com</FooterEmail>
        <FooterIcons>
          <GithubStyledIcon
            onClick={() =>
              window.open(
                'https://github.com/mju-likelion/mission24-team3-frontend',
                '_blank',
                'rel = noopener noreferrer ',
              )
            }
          />
        </FooterIcons>
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 5%;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    height: 40px;
  }
`;

const FooterEmail = styled.div`
  margin-left: 46px;
  letter-spacing: 1px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    font-size: 10px;
    margin-left: 15px;
  }
`;

const FooterIcons = styled.div`
  display: flex;
  margin-right: 60px;
  align-items: center;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin-right: 16px;
  }
`;

const GithubStyledIcon = styled(GithubIcon)`
  background-color: #424242;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 16px;
    height: 16px;
  }
`;

export default Footer;
