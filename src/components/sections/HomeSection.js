import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfilePic from '../../assets/pictures/Profile_Pic.png';
import { icons } from '../../assets/icons';
import ResumePDF from '../../assets/resume/Soham_Vasudeo_Resume Tailored.pdf';

const ProfileSection = styled.section`
  /* wrapper so the decorative gradient can sit behind an inner white content surface */
  position: relative;
  width: 100%;
  height: 90vh;
  padding: 20px; /* outer padding; inner content keeps the stronger padding */
  overflow: hidden; /* contain the ::before blur */
  border-radius: 16px;

  /* Gradient background effect */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    /* Match SkillsSection gradient for visual consistency */
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }

    /* at smaller widths we hide it by default (it will appear when the sidebar is hovered) */
  @media (max-width: 1024px) {
  /* wrapper so the decorative gradient can sit behind an inner white content surface */
  position: relative;
  width: 100%;
  height: 90vh;
  padding: 20px; /* outer padding; inner content keeps the stronger padding */
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    /* Match SkillsSection gradient for visual consistency */
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
  }
`;

// ContentSurface removed for HomeSection: columns will sit directly under ProfileSection
// to expose the ProfileSection ::before gradient in the padding and gaps.

// Updated HomeSection component to include ContentSurface
const HomeSection = () => {
  const typed = useTypewriter(typedTexts, 70, 1600);
  const handleDownloadCV = () => {
    window.open(ResumePDF, '_blank', 'noopener,noreferrer');
  };
  return (
    <ProfileSection id="home">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 80, width: 'calc(100% - 48px)', height: 'calc(100% - 48px)', padding: 36, boxSizing: 'border-box' }}>
        <LeftColumn>
          <ProfileImage src={ProfilePic} alt="Profile Picture" />
        </LeftColumn>
        <RightColumn>
          <ProfileName>Soham Vasudeo</ProfileName>
          <ProfileDescription>
            <TypedContainer>
              <TypedText className="epunda-slab-typed">{typed}</TypedText>
              <Caret />
            </TypedContainer>
          </ProfileDescription>
          <ButtonContainer>
            <Button onClick={handleDownloadCV}>Download CV</Button>
          </ButtonContainer>
          <SocialIcons>
            <a href="https://www.linkedin.com/in/soham-vasudeo/" target="_blank" rel="noopener noreferrer">
              <img src={icons.linkedin} alt="LinkedIn" />
            </a>
            <a href="https://github.com/Svbongo" target="_blank" rel="noopener noreferrer">
              <img src={icons.github} alt="GitHub" />
            </a>
            <a href="mailto:sohamvasudeo@gmail.com">
              <img src={icons.email} alt="Email" />
            </a>
          </SocialIcons>
        </RightColumn>
      </div>
    </ProfileSection>
  );
};

const LeftColumn = styled.div`
  align-items: left;
  justify-content: left;
`;

const RightColumn = styled.div`
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;

`;

const ProfileImage = styled.img`
  width: 350px; /* Fixed size in px */
  height: 350px; /* Fixed size in px */
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 270px;
    height: 270px;
  }
`;

const ProfileName = styled.h1`
  font-size: 50px;
  justify-content: center;
  color: #333;
  margin: 0 0 5px 0;
  @media (max-width: 1024px) {
  font-size: 30px;
  justify-content: center;
  text-align: center;
  color: #333;
  margin: 0 0 0 0;
  }
`;

const ProfileDescription = styled.p`
  font-size: 18px;
  justify-content: center;
  text-align: center;
  color: #666;
  margin-bottom: 10px;
`;

const TypedContainer = styled.div`
  display: absolute;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const TypedText = styled.span`
  font-size: 18px;
  color: #666;
  white-space: pre-wrap;
  overflow-wrap: hidden;
`;

const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 15px;
  background: #111827;
  margin-left: 4px;
  animation: blink 900ms steps(2, start) infinite;

  @keyframes blink {
    to { visibility: hidden; }
  }
`;

// --- Typewriter data + logic ---
// Edit this array to add more subtitle lines; the animation cycles through them.
const typedTexts = [
  'Data/Agentic AI Enthusiast',
  'Problem Solver • Critical Thinker',
  'Building ML & Prompting Tools',
];

function useTypewriter(texts, typingSpeed = 80, pauseDuration = 1400) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let typingTimer;
    if (charIndex < texts[textIndex].length) {
      typingTimer = setTimeout(() => {
        setDisplayed((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else {
      // Pause, then move to next text
      typingTimer = setTimeout(() => {
        setDisplayed('');
        setCharIndex(0);
        setTextIndex((t) => (t + 1) % texts.length);
      }, pauseDuration);
    }

    return () => clearTimeout(typingTimer);
  }, [charIndex, textIndex, texts, typingSpeed, pauseDuration]);

  return displayed;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const Button = styled.button`
  --accent-a: #ff9a3c; /* light orange */
  --accent-b: #e67e22; /* deep orange */
  padding: 10px 22px;
  border: 2px solid transparent;
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: #111; /* default black */
  font-size: 16px;
  color: #fff; /* white text on black */
  transition: background 320ms cubic-bezier(.2,.9,.2,1), transform 280ms ease, box-shadow 280ms ease, color 200ms ease;

  /* Hover: gradient orange background, translateX like the sidebar nav, and orange glow */
  &:hover {
    background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
    transform: translateX(10px);
    box-shadow: 0 0 12px rgba(230,126,34,0.45);
    color: #fff;
  }

  &:active {
    transform: translateX(6px);
    box-shadow: 0 0 6px rgba(230,126,34,0.36);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 6px rgba(230,126,34,0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
    &:hover { transform: none; }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px; /* spacing between icons */
  margin-top: 20px;
  justify-content: center;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px; /* clickable area */
    height: 80px;
    border-radius: 50%; /* make round */
    transition:
      transform 200ms cubic-bezier(.2,.9,.2,1),
      background-color 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;
    color: inherit;
    text-decoration: none;
    background: transparent; /* transparent by default */
  }

  a:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(50, 115, 220, 0.12);
  }

  a:hover {
    transform: translateY(-8px) scale(1.08);
    background-color: rgba(230,126,34,0.08); /* subtle accent tint on hover */
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
    border-color: rgba(230,126,34,0.18);
  }

  img {
    width: 40px; /* icon size */
    height: 40px;
    object-fit: contain;
    display: block;
  }

  @media (min-width: 1400px) {
    a { width: 96px; height: 96px; }
    img { width: 48px; height: 48px; }
  }
`;

export default HomeSection;
