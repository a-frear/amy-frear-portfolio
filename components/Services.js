import styled from 'styled-components';
import { SectionHeading } from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';
import FPLogo from './icons/FPLogo';
import OutlinedText from './OutlinedText';

const services = [
  {
    name: 'Agency partnership',
    description:
      'I am available for contract and overflow front-end support. I can slot into your team’s process, tools, and timelines... translating your designs into polished builds.',
  },
  {
    name: 'CMS builds',
    description:
      'Drupal and WordPress theming and implementation, from component libraries to editor-friendly content models and launch.',
  },
  {
    name: 'Modern front ends',
    description:
      'React and Next.js sites with responsive layouts, purposeful motion, and accessibility considered and built in from the very beginning.',
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
        <Logo />
      </Layout>
    </ServicesWrapper>
  );
}

const ServicesWrapper = styled.section`
  text-align: left;
`;

const Heading = styled.h2`
  ${SectionHeading}
  text-align: center;
`;

const Layout = styled.div`
  display: grid;
  gap: 40px;
  margin-top: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 60px;
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

const Logo = styled(FPLogo)`
  display: block;
  width: 180px;
  height: auto;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tablet}) {
    width: clamp(180px, 20vw, 300px);
  }
`;

const ServiceItem = styled.li`
  font-family: 'Share', sans-serif;
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
  margin-top: 6px;
  font-size: 18px;
  line-height: 1.5;
  color: black;
  max-width: 60ch;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 20px;
  }
`;
