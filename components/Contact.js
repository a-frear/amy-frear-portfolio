import styled from "styled-components";
import { hotPink } from "../styles/colors";
import {
  SectionHeading,
  BodyTextSize,
  MobileJustified,
} from "../styles/typography";
import { breakpoints } from "../styles/breakpoints";
import OutlinedText from "./OutlinedText";
import ParallaxWave from "./icons/ParallaxWave";
import { SmallBodyTextSize } from "../styles/typography";

const EMAIL = "frearprojects@gmail.com";

export default function Contact() {
  return (
    <ContactWrapper id="contact">
      {/* Pink wave tops off the contact section. It's laid out like the
          other sections (wider than the contact text), as it was under
          Services. */}
      <WaveArea>
        <WaveWrapper>
          <ParallaxWave />
        </WaveWrapper>
      </WaveArea>
      <Inner>
        <Heading>
          <OutlinedText>Contact</OutlinedText>
        </Heading>
        <Content>
          <Body className="small">
            Frear Projects is booking freelance and agency work for 2027. Have a project in mind, or need an extra set of hands on your team?
            I'd love to hear about it.
          </Body>
          <Body>
            <a href={`mailto:${EMAIL}?subject=Hello%20Frear%20Projects`}>
              {EMAIL}
            </a>
          </Body>
          <Body>
            <a
              href="https://www.linkedin.com/in/amy-frear"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {" | "}
            <a
              href="https://github.com/a-frear"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {" | "}
            <a
              href="https://vimeo.com/amyfrear"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vimeo
            </a>
          </Body>
        </Content>
      </Inner>
    </ContactWrapper>
  );
}

const ContactWrapper = styled.footer`
  position: relative;
  display: block;
  background-color: white;
  color: black;
`;

// Same side padding as .full-section sections, with the wave at half that
// width on desktop: the size it had at the bottom of Services
const WaveArea = styled.div`
  padding: 0 20px;
  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 60px;
  }
  @media (min-width: 1528px) {
    padding: 0 calc((100vw - 1440px) / 2);
  }
`;

// The heading and text: the same side padding as .full-section, then
// capped at 50% width on desktop.
const Inner = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px 50px;
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 80%;
    padding: 0 60px 100px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    max-width: 50%;
  }
  @media (min-width: 1528px) {
    padding-left: calc((100vw - 1440px) / 2);
    padding-right: calc((100vw - 1440px) / 2);
  }
`;

const WaveWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 50%;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  ${SectionHeading}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  text-align: center;
  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
  }
`;

const Body = styled.p`
  ${BodyTextSize}
  color: black;
  line-height: 165%;
  text-align: center;
  a {
    color: black;
    transition: color 0.3s ease;
  }
  @media (pointer: fine) {
    a:hover {
      color: ${hotPink};
    }
  }
  a:focus-visible {
    color: ${hotPink};
  }
  /* The booking paragraph is justified on phones; the email and link
     lines stay centered */
  &.small {
    ${MobileJustified}
  }
`;
