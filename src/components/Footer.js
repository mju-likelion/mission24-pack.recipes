import styled from 'styled-components';

import { ReactComponent as GithubIcon } from '../images/github.svg';
import { ReactComponent as InstagramIcon } from '../images/instagram.svg';

function Footer() {
  return (
    <>
      <FooterWrapper>
        <FooterEmail>mju@likelion.org</FooterEmail>
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
          <VerticalLine />
          <InstagramStyledIcon />
        </FooterIcons>
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterEmail = styled.div`
  margin-left: 46px;
  letter-spacing: 1px;
`;

const FooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 60px;
  align-items: center;
`;

const VerticalLine = styled.div`
  height: 20px;
  border-left: 2px solid #424242;
`;

const GithubStyledIcon = styled(GithubIcon)`
  background-color: #424242;
  margin-right: 19px;
  width: 24px;
  height: 24px;
`;

const InstagramStyledIcon = styled(InstagramIcon)`
  margin-left: 19px;
  width: 24px;
  height: 24px;
`;

export default Footer;
