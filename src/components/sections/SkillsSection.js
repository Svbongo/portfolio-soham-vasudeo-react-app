import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  /* wrapper for gradient background */
  position: relative;
  width: 100%;
  height: 90vh;
  padding: 20px;
  margin: 0 auto;
  color: #111827;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* contain the ::before blur */
  border-radius: 16px;

  /* Gradient background effect */
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

  /* Tablet and mobile adjustments */
  @media (max-width: 1024px) {
  height: 92vh;
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
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  margin: 6px 0 18px 12px;
  color: #111827;

  @media (max-width: 1024px) {
    font-size: 26px;
    margin: 6px 0 18px 12px;
    color: #111827;
  }
`;

const Grid = styled.div`
  /* Desktop grid layout */
  display: grid;
  height: 90%;
  grid-template-columns: 1fr 1fr 400px;    /* Two flexible columns for skills + fixed width for certifications */
  grid-template-rows: auto;               /* Auto height for desktop */
  align-items: start;                     /* Align items to top */
  column-gap: 24px;                       /* Horizontal spacing between columns */
  row-gap: 20px;                         /* Vertical spacing between rows */
  padding: 12px;                          /* Padding around the entire grid */

  /* Tablet/Mobile adjustments */
  @media (max-width: 1024px) {
    grid-template-columns: 200px 200px 400px;        /* Switch to two columns */
    grid-template-rows: repeat(3, 1fr);              /* Let rows size naturally */
    column-gap: 12px;                     /* Horizontal spacing for mobile */
    row-gap: 5px;                        /* Vertical spacing for mobile */
    padding: 12px;
    height: 87%;                        /* Maintain padding */
  }
`;


const getResponsiveCardHeight = (column, row) => {
  // Heights for each position at 1024px
  const mobileHeights = {
    '1-1': '190px',  // Programming & Scripting
    '1-2': '200px',  // Cloud & Data Platforms
    '1-3': '250px',  // AI & Machine Learning
    '2-1': '190px',  // Data & Analytics
    '2-2': '200px',  // AI Tooling & Services
    '2-3': '200px',  // Web & Backend
  };
  return mobileHeights[`${column}-${row}`] || 'auto';
};

const Card = styled.article`
  /* Card base styles */
  background: #ffffff;                    /* White background */
  border: 1px solid rgba(15,23,42,0.04); /* Subtle border */
  border-radius: 12px;                   /* Rounded corners */
  padding: 18px;                         /* Internal spacing */
  width: 100%;                          /* Full width of grid cell */
  box-sizing: border-box;               /* Include padding in width calculation */
  display: flex;                        /* Flexbox for content layout */
  flex-direction: column;               /* Stack content vertically */
  justify-content: flex-start;          /* Align content to top */
  box-shadow: 0 6px 14px rgba(15,23,42,0.03);
  height: auto;                         /* Default height auto */

  @media (max-width: 1024px) {
    height: ${props => props.isExpanded ? getResponsiveCardHeight(props.gridColumn, props.gridRow) : '80px'};
    transition: all 0.3s ease;
    overflow: hidden;
    width: 100%;

    .card-content {
      opacity: ${props => props.isExpanded ? 1 : 0};
      transition: opacity 0.3s ease;
      overflow-y: auto;                 /* Enable vertical scrolling */
      max-height: calc(100% - 50px);    /* Leave space for header */
      padding-right: 8px;              /* Space for scrollbar */
    }

    /* Customize scrollbar */
    .card-content::-webkit-scrollbar {
      width: 4px;
    }

    .card-content::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 2px;
    }

    .card-content::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 2px;
    }
  }
  height: 95%;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: default;
  margin-bottom: 12px;

  @media (max-width: 1024px) {
    cursor: pointer;
    padding-bottom: ${props => props.isExpanded ? '12px' : '0'};
    border-bottom: ${props => props.isExpanded ? '1px solid rgba(15,23,42,0.08)' : 'none'};
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #0f1720;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: none;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    display: block;
    transform: ${props => props.isExpanded ? 'rotate(-180deg)' : 'rotate(0)'};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 1024px) {
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
  }
`;

const Tag = styled.span`
  background: #f1f5f9;
  border: 1px solid rgba(15,23,42,0.04);
  color: #0f1720;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;

  @media (max-width: 1024px) {
    background: #f1f5f9;
    border: 1px solid rgba(15,23,42,0.04);
    color: #0f1720;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 13px;
    white-space: nowrap;
  }
`;

const CertificationsCard = styled(Card)`
  width: 100%;
  grid-column: 3 / 4;
  grid-row: 1 / 4;
 
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 98.5%;

  /* make internal list scroll if content overflows while keeping card height consistent */
  > div { overflow-y: auto; }

  @media (max-width: 1024px) {
   width: 93%;
   grid-column: 3 / 4;
   grid-row: 1 / 4;
   align-self: stretch; /* stretch to match grid row heights */
   overflow-y: auto;
   display: flex;
   flex-direction: column;
   height:100%;

    /* make internal list scroll if content overflows while keeping card height consistent */
    > div { overflow-y: auto; }
  }

`;

const CertItem = styled.div`
  /* Individual certification card styling */
  background: #f8fafc;                    /* Light background for contrast */
  border-radius: 10px;                   /* Rounded corners */
  padding: 12px;                         /* Internal spacing */
  margin-bottom: 10px;                   /* Space between items */
  color: #0f1720;                       /* Dark text for readability */
  display: flex;                        /* Flexbox for content layout */
  flex-direction: column;               /* Stack content vertically */
  align-items: flex-start;             /* Align content to left */
  gap: 6px;                            /* Space between elements */
  border: 1px solid rgba(15,23,42,0.03); /* Subtle border */

  @media (max-width: 1024px) {
    background: #f8fafc;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
    color: #0f1720;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    border: 1px solid rgba(15,23,42,0.03);
  }
`;

// (removed unused `categories` constant) If you'd like this data-driven approach restored
// we can wire `categories` into the JSX to render cards dynamically.

const certifications = [
  { title: 'Building Generative AI Applications Using Amazon Bedrock – AWS Skill Builder', date: '07/2025' },
  { title: 'Gen AI Fundamentals – Databricks', date: '11/2024' },
  { title: 'Google Analytics Certification – Google', date: '04/2024' },
  { title: 'Machine Learning Specialization – Coursera', date: '01/2023' },
  { title: 'Base SAS & Predictive Modeling – Tier 2 – SAS', date: '02/2022' },
  { title: 'Base SAS & Visual Analytics – Tier 1 – SAS', date: '12/2021' },
  { title: 'Data Science – SkillVertex', date: '12/2021' }
];

// Helper to format 'MM/YYYY' into short month name + year (e.g. '07/2025' -> 'Jul 2025')
const formatShortMonth = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length !== 2) return dateStr;
  const month = parseInt(parts[0], 10);
  const year = parts[1];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const m = months[(month - 1) >= 0 && (month - 1) < 12 ? (month - 1) : 0];
  return `${m} ${year}`;
};

const SkillsSection = () => {
  const [expandedCards, setExpandedCards] = React.useState({});

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderCard = (id, title, tags, gridColumn, gridRow) => (
    <Card 
      style={{ gridColumn, gridRow }}
      gridColumn={gridColumn}
      gridRow={gridRow}
      isExpanded={expandedCards[id]}
    >
      <CardHeader 
        isExpanded={expandedCards[id]} 
        onClick={() => toggleCard(id)}
      >
        <CardTitle>
          {title}
          <ArrowIcon 
            isExpanded={expandedCards[id]}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </ArrowIcon>
        </CardTitle>
      </CardHeader>
      <div className="card-content">
        <Tags>{tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
      </div>
    </Card>
  );

  return (
    <Section id="skills">
      <SectionTitle>Skills & Technologies</SectionTitle>

      <Grid>
        {/* Column 1 */}
        {renderCard('programming', 'Programming & Scripting', 
          ['Python','SQL','JavaScript'], 1, 1)}

        {renderCard('cloud', 'Cloud & Data Platforms',
          ['Azure Data Lake','Snowflake','Azure','AWS'], 1, 2)}

        {renderCard('ai', 'AI & Machine Learning',
          ['Python','Machine Learning','Gen AI','Agentic AI','Azure OpenAI Services','AWS Bedrock'], 1, 3)}

        {/* Column 2 */}
        {renderCard('data', 'Data & Analytics',
          ['SQL','Data Modelling','Power BI','Tableau'], 2, 1)}

        {renderCard('aitools', 'AI Tooling & Services',
          ['Azure OpenAI Services','AWS Bedrock','Cortex'], 2, 2)}

        {renderCard('web', 'Web & Backend',
          ['MERN Stack','Django','CRM Systems','Git'], 2, 3)}

        <CertificationsCard>
          <CardTitle>Certifications</CardTitle>
          <div style={{ marginTop: 6 }}>
            {certifications.map((c) => (
              <CertItem key={c.title}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(15,23,42,0.6)' }}>{formatShortMonth(c.date)}</div>
              </CertItem>
            ))}
          </div>
        </CertificationsCard>
      </Grid>
    </Section>
  );
};

export default SkillsSection;
