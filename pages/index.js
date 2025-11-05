import styled from 'styled-components';
import SEO from '../components/SEO';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Intro from '../components/Intro';
import About from '../components/About';
import HeaderMedia from '../components/HeaderMedia';
import Work from '../components/Work';

export default function Home() {
  return (
    <>
      <SEO />
      <HomeWrapper>
        <HeaderWrapper>
          <Header />
          <HeaderMobile />
          <HeaderMedia />
        </HeaderWrapper>
        <MainContent>
          <Intro />
          <About />
          <Work />
        </MainContent>
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.div`
  position: relative;
  background-color: white;
`;

const HeaderWrapper = styled.header`
  position: relative;
`;

const MainContent = styled.main`
  position: relative;
`;
