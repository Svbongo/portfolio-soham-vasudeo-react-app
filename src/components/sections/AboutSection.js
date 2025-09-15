import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AboutPic from '../../assets/pictures/About_Pic.png';
import VT_Masters from '../../assets/transcripts/VT_Transcript_Masters.pdf';
import VT_Undergrad from '../../assets/transcripts/VT_Transcript_UnderGrad.pdf';
import NMIMS_Undergrad from '../../assets/transcripts/NMIMS_Transcript_UnderGrad.PDF';

const AboutCard = styled.section`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
  align-items: start;
  width: 100%;
  height: 90vh; /* keep same height as Home card per request */
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
  padding: 40px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(14,165,164,0.12), rgba(99,102,241,0.10));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* make left column span the card so content can be vertically centered */
`;

const AboutImage = styled.img`
  width: 320px;
  height: 440px; /* portrait orientation */
  border-radius: 8px; /* subtle rounded rectangle */
  object-fit: cover;
  justify-self: center;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  justify-content: center;
`;

const Heading = styled.h2`
  font-size: 32px;
  margin: 0 0 6px 0;
  color: #222;
`;

const Paragraph = styled.p`
  color: #555;
  line-height: 1.6;
  margin: 0;
  font-size: 16px;
`;

/* Timeline-style education */
const Education = styled.div`
  margin-top: 1px;
  padding-top: 28px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  /* horizontal connector line */
  &::before {
    content: '';
    position: absolute;
    left: 8%;
    right: 8%;
    top: 100px; /* line height from top of section */
    height: 2px;
    background: rgba(0,0,0,0.06);
    z-index: 1;
  }
`;

const EduItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 18px 8px 6px 8px;
  min-width: 160px;
  z-index: 2; /* above the line */

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
  left: 180px;
  top: -14px;
  width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
  z-index: 80;
  font-size: 14px;
  overflow-wrap: hidden;
`;


const EduTitle = styled.div`
  font-weight: 700;
  color: #333;
`;

/* PopupTitle, PopupSub and EduSub were intentionally removed because styles were inlined */



const AboutSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const eduRef = useRef(null);
  const [previewIndex, setPreviewIndex] = useState(null);

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

  // Close popup on Escape key or click outside
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape') {
        setOpenIndex(null);
      }
    };

    const onDown = (ev) => {
      // if a popup is pinned and the click is outside the education area, close it
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
    <AboutCard id="about">
      <Left>
        <AboutImage src={AboutPic} alt="About picture" />
      </Left>
      <Right>
        <Heading>About Me</Heading>
        <Paragraph>
          Graduated with a Master’s in Global Business Analytics from Virginia Tech, with a multidisciplinary academic background in Data Science (Computer Science and Engineering, NMIMS University) and Cybersecurity (BIT, Virginia Tech). Bringing over 1 years of professional experience across AI research, data engineering, and analytics roles in enterprise and startup environments. Hands-on experience in data analytics, governance, and cloud-based systems through internships and startup consulting. Skilled in SQL, Python, Tableau, and Power BI with exposure to cloud data environments including Azure and AWS. Passionate about driving insights from structured and unstructured data, building data pipelines, and supporting business transformation through advanced analytics.
        </Paragraph>

  <Education>
          <Heading>Education</Heading>
          <div ref={eduRef} style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'flex-start', width: '100%', paddingTop: 12 }}>
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
                      style={{ left: '50%', transform: 'translateX(-50%)', top: '100%', marginTop: '12px' }}
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
                            {previewIndex === e.id ? 'Hide transcript preview' : 'View transcript (preview)'}
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
      </Right>
    </AboutCard>
  );
};

export default AboutSection;
