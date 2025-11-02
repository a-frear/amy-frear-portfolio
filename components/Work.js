import styled from 'styled-components';
import {
  orange,
  lightYellow,
  lightGreen,
  green,
  pink,
  hotPink,
  red,
  blue,
  darkBlue,
  chartreuse,
  darkPurple,
  purple,
} from '../styles/colors';

export default function Projects() {
  const projects = [
    {
      client: 'National Gallery of Art',
      link: 'https://www.nga.gov/',
      role: 'Developer',
      year: '2025',
    },
    {
      client: 'Clark Foundation',
      link: 'https://clarkfoundationdc.org/overview',
      role: 'Developer',
      year: '2025',
    },
    {
      client: 'Princeton Campus Life Resources',
      link: 'https://tigerlife.princeton.edu/',
      role: 'Lead Developer',
      year: '2024',
    },
    {
      client: 'Harvard Graduate School of Education',
      link: 'https://www.gse.harvard.edu/',
      role: 'Developer',
      year: '2023',
    },
    {
      client: 'Capabilities: W.L Gore and Associates',
      link: 'https://capabilities.gore.com/',
      role: 'Developer',
      year: '2022',
    },
    {
      client: 'Mütter Museum',
      link: 'https://muttermuseum.org/',
      role: 'Developer',
      year: '2021',
    },
  ];
  return (
    <WorkWrapper id="work" className="full-section">
      <Heading>Work</Heading>
      <ProjectsGrid>
        {projects.map((project) => (
          <Project key={project.client}>
            <ProjectLink href={project.link} target="_blank" rel="noreferrer">
              <ProjectTitle>{project.client}</ProjectTitle>
            </ProjectLink>
            <ProjectSubtitle>{project.role}</ProjectSubtitle>
            <p>{project.year}</p>
          </Project>
        ))}
      </ProjectsGrid>
      <ClientWork>
        <div className="wave" />
        <p>More available on request.</p>
        <p id="contact">
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
        </p>
      </ClientWork>
    </WorkWrapper>
  );
}

const WorkWrapper = styled.section`
  display: block;
  text-align: left;
  @media (min-width: 750px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${green};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;

  @media (min-width: 750px) {
    grid-column: 1 / -1;
  }
`;

const ProjectsGrid = styled.ul`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    margin-top: 60px;
  }
`;

const Project = styled.li`
  position: relative;
  color: black;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:nth-child(1) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(purple.slice(1, 3), 16)},
        ${parseInt(purple.slice(3, 5), 16)},
        ${parseInt(purple.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:nth-child(2) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(blue.slice(1, 3), 16)},
        ${parseInt(blue.slice(3, 5), 16)},
        ${parseInt(blue.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:nth-child(3) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(orange.slice(1, 3), 16)},
        ${parseInt(orange.slice(3, 5), 16)},
        ${parseInt(orange.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:nth-child(4) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(hotPink.slice(1, 3), 16)},
        ${parseInt(hotPink.slice(3, 5), 16)},
        ${parseInt(hotPink.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:nth-child(5) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(chartreuse.slice(1, 3), 16)},
        ${parseInt(chartreuse.slice(3, 5), 16)},
        ${parseInt(chartreuse.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:nth-child(6) {
    background: linear-gradient(
      135deg,
      rgba(
        ${parseInt(darkPurple.slice(1, 3), 16)},
        ${parseInt(darkPurple.slice(3, 5), 16)},
        ${parseInt(darkPurple.slice(5, 7), 16)},
        0.3
      ),
      rgba(0, 0, 0, 0.1)
    );
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  p {
    font-family: 'Share', sans-serif;
    font-size: 16px;
    color: ${lightGreen};
    margin-top: 12px;
  }
`;

const ProjectLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &:hover {
    h3 {
      color: ${green};
    }
  }
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  color: black;
  transition: color 0.3s ease;
`;

const ProjectSubtitle = styled.p`
  font-size: 18px !important;
  margin: 8px 0 0 0;
  color: black;
  font-family: 'Share', sans-serif;
`;

const ClientWork = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-bottom: 50px;
  color: black;
  p {
    margin-bottom: 20px;
  }
  a {
    color: black;
    transition: color 0.3s ease;
    &:hover {
      color: ${green};
    }
  }
  @media (min-width: 750px) {
    margin-top: 60px;
    max-width: 50%;
  }

  .wave {
    background: ${hotPink};
    height: 200px;
    --mask: radial-gradient(
          38.99px at 50% calc(100% + 18px),
          #0000 calc(99% - 8px),
          #000 calc(101% - 8px) 99%,
          #0000 101%
        )
        calc(50% - 60px) calc(50% - 19px + 0.5px) / 120px 38px repeat-x,
      radial-gradient(
          38.99px at 50% -18px,
          #0000 calc(99% - 8px),
          #000 calc(101% - 8px) 99%,
          #0000 101%
        )
        50% calc(50% + 19px) / 120px 38px repeat-x;
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }
`;
