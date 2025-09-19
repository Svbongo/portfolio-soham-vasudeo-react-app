import React, { useEffect } from 'react';
import styled from 'styled-components';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ConnectSection from './sections/ConnectSection';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Allow vertical scrolling inside main content */
  scroll-behavior: smooth; /* enable smooth css scrolling as a baseline */
  z-index: 4; /* above particles but below sidebar if needed */
  position: relative; /* create stacking context so z-index takes effect */
  box-sizing: border-box;
  margin-left: 15%; /* Reserve space for the fixed sidebar */
  width: calc(100% - 15%); /* Fill remaining space next to sidebar */
  min-height: 100vh; /* Ensure it fills viewport height */
  background: transparent;
  padding: 50px 15px 50px 15px; /* top/right/bottom/left padding */
  gap: 50px; /* space between sections */

  @media (max-width: 1024px) {
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Allow vertical scrolling inside main content */
  box-sizing: border-box;
  margin-left: 15%; /* Reserve space for the fixed sidebar */
  width: calc(100% - 15%); /* Fill remaining space next to sidebar */
  min-height: 100vh; /* Ensure it fills viewport height */
  background: transparent;
  padding: 20px 15px 80px 15px; /* top/right/bottom/left padding */
  gap: 72px; /* space between sections */
}
`;

const MainContent = () => {
  useEffect(() => {
    const contentContainer = document.querySelector('#content-container');
    if (contentContainer) {
      contentContainer.scrollTop = 0; // Directly set scroll position to the top
    }
  }, []);

  return (
    <ContentContainer id="content-container"> {/* Added id for ContentContainer */}
      <HomeSection id="home" /> {/* Added id for Home section */}
      <AboutSection id="about" />
      <ExperienceSection id="experience" />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <ConnectSection id="connect" />
    </ContentContainer>
  );
};

export default MainContent;
