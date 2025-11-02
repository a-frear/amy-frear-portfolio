import styled from 'styled-components';
import {
  orange,
  lightYellow,
  lightGreen,
  green,
  pink,
  hotPink,
  darkBlue,
  red,
  blue,
  chartreuse,
  darkPurple,
  purple,
} from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function Projects() {
  return (
    <ProjectsWrapper id="projects" className="full-section">
      <Heading>Personal Projects</Heading>
      <ProjectsGrid>
        <Project>
          <ProjectLink
            href="https://eyesite.club/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <img
              src={eyesiteImg.src}
              alt="Eye Site Home Page"
              className="portfolio-img"
              id="eye-site-home-page"
            /> */}
            <ProjectTitle>EYE SITE</ProjectTitle>
          </ProjectLink>
          <ProjectSubtitle>A SITE FOR SORE EYES</ProjectSubtitle>
          <p>
            <ProjectSpecial>
              "This year my workload has been double. Mouth and nose aren’t
              allowed to be seen in public anymore. So I’ve been doing double
              duty in terms of seeing and expressing. People are relying on me
              for a smile instead of mouth, and I don’t even know if I’m doing a
              good job. It's been rough. Eye Site is a website I can go to that
              is just for me."
            </ProjectSpecial>{' '}
            -Anonymous Eye
          </p>
          <p>
            Discover videos about eyes, for eyes. Submit your own eye inspired
            work. Like and comment to connect with other eye lovers.
          </p>
          <p>Built with React, CSS, Node, Express, PostgreSQL. </p>
          <p>
            <a
              href="https://github.com/a-frear/eye-site"
              className="repo"
              target="_blank"
              rel="noreferrer"
            >
              Client repo
            </a>
            ,{' '}
            <a
              href="https://github.com/a-frear/eye-site-api"
              className="repo"
              target="_blank"
              rel="noreferrer"
            >
              Eye Site API.
            </a>
          </p>
        </Project>
        <Project>
          <ProjectLink
            href="https://a-frear.github.io/nyt-shakes/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <img
              src={shakesNyTimes.src}
              alt="Shakespeare in the New York Times"
              className="portfolio-img"
              id="nyt-shakes-img"
            /> */}
            <ProjectTitle>Shakespeare in the NYT</ProjectTitle>
          </ProjectLink>
          <ProjectSubtitle>
            Find reviews for your favorite Shakespeare plays in the New York
            Times.
          </ProjectSubtitle>
          <p>
            One of the joys of seeing a Shakespeare play is to see unique
            interpretations of these classic texts through the eyes of new
            directors, actors, and designers. With this app, users can compare
            different takes of the Bard through reviews in the New York Times
            API. Google Books are also suggested so the user can refresh
            themselves with Shakespeare's scripts after exploring contemporary
            productions.
          </p>
          <p>
            Built with HTML, CSS, JavaScript, and JQuery.{' '}
            <ProjectLink
              href="https://github.com/a-frear/nyt-shakes"
              className="repo"
              target="_blank"
              rel="noreferrer"
            >
              Github repo.
            </ProjectLink>
          </p>
          <p>
            <ProjectSpecial>
              Once you catch up on your Shakespeare, take a stab at{' '}
              <a href="https://a-frear.github.io/shakespeare-quiz/">
                this quiz!
              </a>{' '}
            </ProjectSpecial>
            {'  '}
            JavaScript and JQuery keep track of your score and crown you with a
            Shakespearean quote (or insult) depending on your grade.
          </p>
        </Project>
      </ProjectsGrid>
      <ClientWork>
        <div className="wave" />
        <p>
          Client work includes{' '}
          <a
            href="https://capabilities.gore.com/"
            target="_blank"
            rel="noreferrer"
          >
            W.L Gore and Associates,
          </a>{' '}
          <a
            href="https://collegeofphysicians.org/"
            target="_blank"
            rel="noreferrer"
          >
            College of Physicians,
          </a>{' '}
          and{' '}
          <a
            href="https://www.gse.harvard.edu/"
            target="_blank"
            rel="noreferrer"
          >
            Harvard Graduate School of Education.
          </a>
        </p>
        <p>More available on request.</p>
      </ClientWork>
    </ProjectsWrapper>
  );
}

const ProjectsWrapper = styled.section`
  display: block;
  background-color: ${darkBlue};
  text-align: left;
  @media (min-width: 750px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

const ProjectsGrid = styled.div`
  margin-top: 40px;
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    grid-gap: 10%;
    margin-top: 80px;
  }
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;

  @media (min-width: 750px) {
    grid-column: 1 / -1;
  }
`;

const Project = styled.div`
  color: ${lightYellow};
  margin-bottom: 80px;
  &:last-of-type {
    margin-bottom: 0;
  }
  @media (min-width: 750px) {
    margin-bottom: 0;
  }
  img {
    max-width: 100%;
  }
  p {
    font-family: 'Share', sans-serif;
    font-size: 19px;
    line-height: 150%;
    margin-bottom: 14px;
    a {
      font-family: 'Share', sans-serif;
      color: #bbc085;
      &:hover {
        color: ${hotPink};
      }
    }
  }
`;

const ProjectLink = styled.a`
  &:hover {
    h3 {
      color: ${hotPink};
    }
  }
`;

const ProjectTitle = styled.h3`
  margin-top: 24px;
  font-size: 28px;
  color: ${lightYellow};
  text-decoration: underline;
`;

const ProjectSubtitle = styled.p`
  font-size: 24px !important;
  margin: 20px 0;
`;

const ProjectSpecial = styled.span`
  font-family: 'Share', sans-serif;
  font-style: italic;
`;

const ClientWork = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-bottom: 50px;
  color: ${lightYellow};
  p {
    margin-bottom: 20px;
  }
  a {
    color: #bbc085;
    &:hover {
      color: ${hotPink};
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
