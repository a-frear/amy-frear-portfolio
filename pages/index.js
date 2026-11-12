import styled from 'styled-components';
import SEO from '../components/SEO';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Intro from '../components/Intro';
import About from '../components/About';
import HeaderMedia from '../components/HeaderMedia';
import Work from '../components/Work';
import Services from '../components/Services';
import Contact from '../components/Contact';
import FadeInSection from '../components/FadeInSection';

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
          {/* Each section fades up as you scroll to it (Animate on only) */}
          <FadeInSection>
            <Intro />
          </FadeInSection>
          <FadeInSection>
            <About />
          </FadeInSection>
          <FadeInSection>
            <Work />
          </FadeInSection>
          <FadeInSection>
            <Services />
          </FadeInSection>
        </MainContent>
        <FadeInSection>
          <Contact />
        </FadeInSection>
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
