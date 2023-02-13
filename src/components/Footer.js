import styled from 'styled-components';
import { ReactComponent as GithubIcon } from '../images/github.svg';

const Footer = () => {
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
};

const FooterWrapper = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 10%;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    height: 40px;
    margin-top: 10%;
  }
`;

const FooterEmail = styled.div`
  margin-left: 46px;
  letter-spacing: 1px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    font-size: 12px;
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
  width: 24px;
  height: 24px;
  background-color: #424242;
  cursor: pointer;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

export default Footer;
