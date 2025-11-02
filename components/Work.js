import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green, hotPink } from '../styles/colors';
import { useParallax } from '../hooks/useParallax';

export default function Projects() {
  const waveRef = useRef(null);
  const waveY = useParallax(0.05, waveRef);
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
      <ProjectsList>
        {projects.map((project) => (
          <ProjectItem key={project.client}>
            <ProjectLink href={project.link} target="_blank" rel="noreferrer">
              <ProjectText>
                <span className="client-role">
                  {project.client}, {project.role}
                </span>
                <span className="dots" />
                <span className="year">{project.year}</span>
              </ProjectText>
            </ProjectLink>
          </ProjectItem>
        ))}
      </ProjectsList>
      <ClientWork>
        <ParallaxWave ref={waveRef} className="wave" style={{ y: waveY }} />
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
  text-align: left;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${green};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;

  @media (min-width: 750px) {
    grid-column: 1 / -1;
  }
`;

const ProjectsList = styled.ul`
  margin-top: 40px;
  list-style: none;
  padding: 0;
  display: grid;

  @media (min-width: 750px) {
    margin-top: 60px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ProjectItem = styled.li`
  margin-bottom: 18px;

  @media (min-width: 750px) {
    margin-bottom: 12px;
  }

  &:hover {
    .client-role {
      color: ${green};
    }
  }
`;

const ProjectText = styled.div`
  display: flex;
  align-items: baseline;
  font-family: 'Share', sans-serif;
  font-size: 18px;
  line-height: 1.4;

  .client-role {
    color: black;
    transition: color 0.3s ease;
  }

  .dots {
    flex: 1;
    border-bottom: 2px dotted black;
    margin: 0 8px;
    height: 1px;
    margin-bottom: 4px;
    opacity: 0;
    @media (min-width: 750px) {
      opacity: 1;
    }
  }

  .year {
    color: ${hotPink};
    font-weight: 500;
  }
`;

const ProjectLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ParallaxWave = styled(motion.div)`
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
`;
