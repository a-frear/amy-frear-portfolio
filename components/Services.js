import styled from "styled-components";
import { SectionHeading, SmallBodyTextSize } from "../styles/typography";
import { breakpoints } from "../styles/breakpoints";
import { green } from "../styles/colors";
import FPLogo from "./icons/FPLogo";
import OutlinedText from "./OutlinedText";

const services = [
  {
    name: "Agency partnership",
    description:
      "I am available for contract and overflow front-end support. I can slot into your team’s process, tools, and timelines.",
  },
  {
    name: "CMS builds",
    description:
      "Drupal and WordPress theming, plus headless builds with Sanity. From component libraries to editor-friendly content models and launch.",
  },
  {
    name: "Modern front ends",
    description:
      "React and Next.js sites with responsive layouts, purposeful motion, and accessibility considered and built in from the very beginning. Translate your designs into a polished build.",
  },
];

export default function Services() {
  return (
    <ServicesWrapper id="services" className="full-section">
      <Heading>
        <OutlinedText>Services</OutlinedText>
      </Heading>
      <Layout>
        <ServicesList>
          {services.map((service) => (
            <ServiceItem key={service.name}>
              <ServiceName>{service.name}</ServiceName>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceItem>
          ))}
        </ServicesList>
        {/* Round green border, like the headshot in the intro */}
        <LogoCircle>
          <Logo />
        </LogoCircle>
      </Layout>
    </ServicesWrapper>
  );
}

const ServicesWrapper = styled.section`
  text-align: left;
  &.full-section {
    margin-bottom: 0;
  }
`;

const Heading = styled.h2`
  ${SectionHeading}
  text-align: center;
`;

const Layout = styled.div`
  display: grid;
  gap: 60px;
  margin-top: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: center;
    margin-top: 60px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ServicesList = styled.ul`
  display: grid;
  gap: 32px;
  padding: 0;
  list-style: none;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 36px;
  }
`;

const LogoCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 10px solid ${green};
  border-radius: 50%;
  /* Keeps the green dot inside the circle while it rises into place */
  overflow: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    width: clamp(200px, 20vw, 300px);
    height: clamp(200px, 20vw, 300px);
  }
`;

const Logo = styled(FPLogo)`
  display: block;
  width: 62%;
  height: auto;
`;

const ServiceItem = styled.li`
  font-family: "Share", sans-serif;
`;

const ServiceName = styled.h3`
  font-size: 22px;
  line-height: 1.4;
  color: black;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 26px;
  }
`;

const ServiceDescription = styled.p`
  ${SmallBodyTextSize}
  margin-top: 6px;
  line-height: 1.5;
  color: black;
  max-width: 60ch;
`;
