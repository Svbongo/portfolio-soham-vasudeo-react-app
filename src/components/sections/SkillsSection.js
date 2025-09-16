import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
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
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  margin: 6px 0 18px 12px;
  color: #111827;
`;

const Grid = styled.div`
  display: grid;
  /* left two columns contain skills (3 rows each), right column is certifications */
  grid-template-columns: 1fr 1fr 400px;
  /* desktop: keep equal row heights for a balanced card grid */
  grid-template-rows: repeat(3, 1fr);
  align-items: start;
  gap: 12px;
  padding: 12px;

`;

const Card = styled.article`
  background: #ffffff;
  border: 1px solid rgba(15,23,42,0.04);
  border-radius: 12px;
  padding: 18px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 10;
  box-shadow: 0 6px 14px rgba(15,23,42,0.03);
`;

const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #0f1720;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: #f1f5f9;
  border: 1px solid rgba(15,23,42,0.04);
  color: #0f1720;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;

`;

const CertificationsCard = styled(Card)`
  max-width: none;
  width: 100%;
  grid-column: 3 / 4;
  grid-row: 1 / 4;
  align-self: start;
  overflow-y: auto;
`;

const CertItem = styled.div`
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
  return (
    <Section id="skills">
      <SectionTitle>Skills & Technologies</SectionTitle>

      <Grid>
        {/* Column 1 */}
        <Card style={{ gridColumn: 1, gridRow: 1 }}>
          <CardTitle>Programming &amp; Scripting</CardTitle>
          <Tags>{['Python','SQL','JavaScript'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

        <Card style={{ gridColumn: 1, gridRow: 2 }}>
          <CardTitle>Cloud &amp; Data Platforms</CardTitle>
          <Tags>{['Azure Data Lake','Snowflake','Azure','AWS'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

        <Card style={{ gridColumn: 1, gridRow: 3 }}>
          <CardTitle>AI &amp; Machine Learning</CardTitle>
          <Tags>{['Python','Machine Learning','Gen AI','Agentic AI','Azure OpenAI Services','AWS Bedrock'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

        {/* Column 2 */}
        <Card style={{ gridColumn: 2, gridRow: 1 }}>
          <CardTitle>Data &amp; Analytics</CardTitle>
          <Tags>{['SQL','Data Modelling','Power BI','Tableau'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

        <Card style={{ gridColumn: 2, gridRow: 2 }}>
          <CardTitle>AI Tooling &amp; Services</CardTitle>
          <Tags>{['Azure OpenAI Services','AWS Bedrock','Cortex'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

        <Card style={{ gridColumn: 2, gridRow: 3 }}>
          <CardTitle>Web &amp; Backend</CardTitle>
          <Tags>{['MERN Stack','Django','CRM Systems','Git'].map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        </Card>

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
