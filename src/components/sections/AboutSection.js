import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AboutPic from '../../assets/pictures/About_Pic.png';
import VT_Masters from '../../assets/transcripts/VT_Transcript_Masters.pdf';
import VT_Undergrad from '../../assets/transcripts/VT_Transcript_UnderGrad.pdf';
import NMIMS_Undergrad from '../../assets/transcripts/NMIMS_Transcript_UnderGrad.PDF';

const Section = styled.section`
  height: 90vh;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  color: #111827;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* contain the ::before blur */

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }

  @media (max-width: 1024px) {
  height: 90vh;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  color: #111827;
  display: flex;
  flex-direction: column;
  position: relative;

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

// Grid layout for the AboutSection on desktop
const AboutGrid = styled.div`
  display: grid; // Defines a grid layout
  grid-template-rows: 1fr 1fr; /* Two rows in the second column */
  grid-template-columns: 350px 1fr; // Two columns: fixed width for image, flexible width for content
  gap: 40px; // Space between columns
  align-items: start; // Align items to the top of the grid
  width: 100%; // Full width of the parent container
  height: 100%; // Full height of the parent container
  padding: 36px; // Padding around the grid
  margin: 0 auto; // Center the grid horizontally
  box-sizing: border-box; // Include padding and border in the element's dimensions

  /* Adjust the layout for the first column */
  & > div:first-child {
    grid-row: span 2; // First column spans both rows
  }

  @media (max-width: 1024px) {
  display: grid;
  grid-template-columns: 220px 550px; /* Two columns: fixed width for image, flexible width for content */
  grid-template-rows: 1fr auto; /* Two rows: first row for image and summary, second row for education */
  gap: 20px; // Space between rows and columns
  padding: 16px; // Padding around the grid
  width: 100%; // Full width of the parent container
  align-items: start; // Align items to the top of the grid

  /* Adjust the layout for the first column */
  & > div:first-child {
    grid-row: span 2; // First column spans both rows
  }

  /* Adjust the layout for the second row */
  & > div:nth-child(3) {
    grid-column: span 2; // Second row spans both columns
  }
}
`;

// Left column containing the profile image
const Left = styled.div`
  display: flex; // Flex container for centering
  align-items: center; // Vertically center the image
  justify-content: center; // Horizontally center the image
  height: 100%; // Full height of the column

  @media (max-width: 1024px) {
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
`;

// Profile image styling
const AboutImage = styled.img`
  width: 320px; // Fixed width for the image
  height: 440px; // Fixed height for the image
  border-radius: 8px; // Rounded corners
  object-fit: cover; // Ensure the image covers the container without distortion
  box-shadow: 0 8px 18px rgba(0,0,0,0.08); // Subtle shadow effect

  @media (max-width: 1024px) {
    width: 220px;
    height: 300px;
    margin: 0 auto;
  }
`;

// Right column containing the "About Me" and "Education" sections
const Right = styled.div`
  /* Desktop Layout */
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;

  @media (max-width: 1024px) {
    align-items: flex-start;
    text-align: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 20px;
  }
`;

// Heading styling for section titles
const Heading = styled.h2`
  font-size: 32px; // Large font size for desktop
  margin: 0 0 6px 0; // Bottom margin for spacing
  color: #222; // Dark text color
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 26px;
    margin-bottom: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;
}
`;

// Paragraph styling for descriptive text
const Paragraph = styled.p`
  color: #555; // Medium text color
  line-height: 1.6; // Comfortable line spacing
  margin: 0; // No margin
  font-size: 16px; // Medium font size

  @media (max-width: 1024px) {
    color: #555;
    line-height: 1.6;
    margin: 0;
    font-size: 16px;
}
`;

// Flex container for the Education section
const Education = styled.div`
  margin-top: 1px; // Slight top margin
  padding-top: 28px; // Padding above the section
  position: relative; // Relative positioning for layout adjustments
  width: 100%; // Full width of the parent container
  display: flex; // Flex container for horizontal alignment
  justify-content: center; // Center items horizontally
  align-items: flex-start; // Align items to the top
  flex-direction: row; // Arrange items in a row
  flex-wrap: wrap; // Allow items to wrap if necessary
  gap: 16px; // Space between items

  @media (max-width: 1024px) {

    width: 90%; /* Adjust width for smaller screens */
    flex-direction: row;
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
    gap: 12px; /* Reduce gap for smaller screens */
    justify-content: center; /* Center items horizontally */
    align-items: center; /* Center items vertically */
    margin: 0 auto; /* Center the container */
  }
`;

// Individual education entry styling
const EduItem = styled.div`
  display: flex; // Flex container for vertical stacking
  flex-direction: column; // Stack details vertically
  align-items: center; // Center items horizontally
  gap: 8px; // Space between details
  position: relative; // Relative positioning for layout adjustments
  padding: 18px 8px 6px 8px; // Padding around the entry
  z-index: 2; // Ensure the entry is above other elements

  @media (max-width: 1024px) {
    padding: 16px 8px 8px 8px;
    margin: 0 4px;
  }

  /* dot at each entry centered on the horizontal line */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5px; /* place over the line */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #e67e22;
    box-shadow: 0 0 8px rgba(230,126,34,0.25);
  }
`;

const EduDate = styled.div`
  font-size: 13px;
  color: #666;
`;

const EduContent = styled.div`
  flex: 1;
`;

const EduTitle = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 14px;
  line-height: 1.4;
`;


const NodeButton = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  text-align: left;
`;


const TranscriptButton = styled.button`
  background: linear-gradient(90deg,#fa6b1f,#e67e22);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  box-shadow: 0 6px 16px rgba(230,126,34,0.18);
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover { transform: translateY(-2px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
`;

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
  z-index: 80;
  font-size: 14px;
  max-width: 420px;
  width: max-content;
  min-width: 320px;
  
  @media (max-width: 1024px) {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
  z-index: 80;
  font-size: 14px;
  max-width: 420px;
  width: max-content;
  min-width: 320px;
  }
`;

const AboutSection = () => {
  const [previewIndex, setPreviewIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const eduRef = useRef(null);

  const education = [
    {
      id: 0,
      date: 'Aug 2024 – May 2025',
      title: 'Virginia Tech – Alexandria, VA',
      program: 'Master of Science (M.S)',
      field: 'Business Administration – Global Business Analytics',
      cgpa: '3.88',
      transcriptUrl: VT_Masters,
      graduation: 'May 2025'
    },
    {
      id: 1,
      date: 'Aug 2023 – May 2024',
      title: 'Virginia Tech – Blacksburg, VA',
      program: 'Bachelor of Science (B.S)',
      field: 'Business Information Technology – Cybersecurity Management and Analytics',
      cgpa: '3.33',
      transcriptUrl: VT_Undergrad,
      graduation: 'May 2024'
    },
    {
      id: 2,
      date: 'Jun 2020 – Aug 2024',
      title: 'NMIMS University – Mumbai, India',
      program: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering – Data Science',
      cgpa: '3.12',
      transcriptUrl: NMIMS_Undergrad,
      graduation: 'Aug 2024'
    }
  ];

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape') {
        setOpenIndex(null);
      }
    };

    const onDown = (ev) => {
      if (openIndex !== null && eduRef.current && !eduRef.current.contains(ev.target)) {
        setOpenIndex(null);
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
    };
  }, [openIndex]);

  return (
    <Section id="about">
      <AboutGrid>
        <Left>
          <AboutImage src={AboutPic} alt="About picture" />
        </Left>
        <Right>
          <Heading>About Me</Heading>
          <Paragraph>
            Graduated with a Master’s in Global Business Analytics from Virginia Tech, with a multidisciplinary academic background in Data Science (Computer Science and Engineering, NMIMS University) and Cybersecurity (BIT, Virginia Tech). Bringing over 1 years of professional experience across AI research, data engineering, and analytics roles in enterprise and startup environments. Hands-on experience in data analytics, governance, and cloud-based systems through internships and startup consulting. Skilled in SQL, Python, Tableau, and Power BI with exposure to cloud data environments including Azure and AWS. Passionate about driving insights from structured and unstructured data, building data pipelines, and supporting business transformation through advanced analytics.
          </Paragraph>
        </Right>
        <Education>
          <Heading>Education</Heading>
          <div ref={eduRef} style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: 12, flexWrap: 'wrap' }}>
            {education.map((e) => (
              <EduItem key={e.id} style={{ textAlign: 'center' }}>
                <EduDate>{e.date}</EduDate>
                <EduContent>
                  <NodeButton
                    onMouseEnter={() => setHoverIndex(e.id)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setOpenIndex((i) => (i === e.id ? null : e.id))}
                    onKeyDown={(ev) => { if (ev.key === 'Enter') setOpenIndex((i) => (i === e.id ? null : e.id)); }}
                    aria-haspopup="dialog"
                    aria-expanded={openIndex === e.id}
                  >
                    <EduTitle>{e.title}</EduTitle>
                  </NodeButton>

                  {(openIndex === e.id || hoverIndex === e.id) && (
                    <Popup
                      role="dialog"
                      aria-label={`${e.title} details`}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{e.program}</div>
                      <div style={{ marginBottom: 6 }}>{e.field}</div>
                      <div style={{ color: '#666', marginBottom: 8 }}>CGPA: <strong>{e.cgpa}</strong></div>
                      <div style={{ color: '#666', marginBottom: 8 }}>Graduation: <strong>{e.graduation}</strong></div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                        {e.transcriptUrl ? (

                          <TranscriptButton
                            onClick={() => setPreviewIndex((i) => (i === e.id ? null : e.id))}
                            aria-expanded={previewIndex === e.id}
                            aria-controls={previewIndex === e.id ? `transcript-${e.id}` : undefined}
                          >

                            {previewIndex === e.id ? 'Hide transcript' : 'View transcript'}
                          </TranscriptButton>
                        ) : (
                          <span style={{ color: '#999' }}>Transcript not available</span>
                        )}
                      </div>

                      {previewIndex === e.id && e.transcriptUrl && (
                        <div style={{ marginTop: 12 }}>
                          <iframe
                            src={e.transcriptUrl}
                            title={`${e.title} transcript preview`}
                            style={{ width: '100%', height: 360, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8 }}
                          />
                        </div>
                      )}
                    </Popup>
                  )}

                </EduContent>
              </EduItem>
            ))}
          </div>
        </Education>
      </AboutGrid>
    </Section>
  );
};

export default AboutSection;
