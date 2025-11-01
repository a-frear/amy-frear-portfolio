import styled from 'styled-components';
import {
  orange,
  lightYellow,
  lightGreen,
  green,
  gold,
  pink,
  hotPink,
  red,
  blue,
  chartreuse,
  darkPurple,
  purple,
} from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function Contact() {
  return (
    <ContactSection className="full-section" id="contact">
      <Heading>Contact</Heading>
      <Body>
        <span>
          <a href="mailto:amy.frear@gmail.com">amy.frear@gmail.com</a>
          {' | '}
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
        </span>
      </Body>
    </ContactSection>
  );
}

const ContactSection = styled.section`
  background-color: ${gold};
  text-align: left;
  align-items: start;
  @media (min-width: 750px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
    -2px -2px 0 #000;
`;

const Body = styled.p`
  margin-top: 2rem;
  color: black;
  font-size: 28px;
`;
