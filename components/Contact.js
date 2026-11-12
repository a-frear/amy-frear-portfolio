import styled from 'styled-components';
import { hotPink } from '../styles/colors';
import { SectionHeading, BodyTextSize } from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';
import OutlinedText from './OutlinedText';

const EMAIL = 'frearprojects@gmail.com';

export default function Contact() {
  return (
    <ContactWrapper id="contact">
      <Heading>
        <OutlinedText>Contact</OutlinedText>
      </Heading>
      <Content>
        <Body>
          Frear Projects is booking freelance and agency work. Have a project in
          mind, or need an extra set of hands on your team? I'd love to hear
          about it. Email me at{' '}
          <a href={`mailto:${EMAIL}?subject=Hello%20Frear%20Projects`}>
            {EMAIL}
          </a>
          .
        </Body>
        <Body className="centered">
          <a
            href="https://www.linkedin.com/in/amy-frear"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {' | '}
          <a
            href="https://github.com/a-frear"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://vimeo.com/amyfrear"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vimeo
          </a>
        </Body>
      </Content>
    </ContactWrapper>
  );
}

// Layout mirrors the About section exactly: the same side padding as
// .full-section, then capped at 70% width on desktop. Description text is
// centered on mobile and left-aligned on desktop; links stay centered.
const ContactWrapper = styled.footer`
  position: relative;
  display: block;
  background-color: white;
  color: black;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px 50px;
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 70%;
    padding: 0 60px 100px;
  }
  @media (min-width: 1528px) {
    padding-left: calc((100vw - 1440px) / 2);
    padding-right: calc((100vw - 1440px) / 2);
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  ${SectionHeading}
`;

const Content = styled.div`
  text-align: center;
  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
  }
  .centered {
    text-align: center;
  }
`;

const Body = styled.p`
  ${BodyTextSize}
  color: black;
  line-height: 165%;
  & + & {
    margin-top: 1.5rem;
  }
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
`;
