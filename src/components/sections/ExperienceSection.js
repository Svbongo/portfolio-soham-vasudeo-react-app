import React, { useState } from 'react';
import styled from 'styled-components';

/* Follow Skills pattern: Section with ::before and inner ContentSurface */
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
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(16px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
  }
`;

// ContentSurface removed for ExperienceSection: grid/cards will sit directly under Section
// to expose the Section ::before gradient in the padding and gaps.

const SectionTitle = styled.h2`
  font-size: 32px;
  margin: 6px 0 18px 12px;
  color: #111827;
  @media (max-width: 1024px) {
  font-size: 26px;
  color: #111827;
}
`;

const Cards = styled.div`
  width: 85%;
  /* center the two-column card under the left-aligned title */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 260px 1fr; /* slightly narrower left column */
  gap: 20px;
  margin-top: 50px;
  align-items: start; /* stretch columns to full height */
  flex: 1; /* allow Cards to grow inside Section */
  min-height: 0; /* allow children to shrink and enable internal scrolling */
  scroll-behavior: smooth;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
  /* center the two-column card under the left-aligned title */
    display: grid;
    grid-template-columns: 200px 500px; /* slightly narrower left column */
    gap: 20px;
    margin-top: 50px;
    align-items: stretch; /* stretch columns to full height */
    flex: 1; /* allow Cards to grow inside Section */
    scroll-behavior: smooth;
    padding: 20px;
    box-sizing: border-box;
}
`;

const LeftColumnExp = styled.div`
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  padding-right: 6px;

  @media (max-width: 1024px) {
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  padding-right: 6px;
}
`;

const RightColumnExp = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Card = styled.article`
  background: rgba(255,255,255,0.96);
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.035);
`;

const CardButton = styled.button`
  all: unset;
  display: block;
  width: 95%;
  text-align: center;
  justify-content: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background .12s ease, transform .08s ease;
  &:hover { background: rgba(230,126,34,0.04); transform: translateY(-1px); }
  &[aria-selected="true"] { background: linear-gradient(90deg, rgba(250,107,31,0.06), rgba(230,126,34,0.04)); box-shadow: 0 8px 20px rgba(230,126,34,0.06); }
`;

const Company = styled.div`
  font-weight: 700;
  color: #111;
`;

const Dates = styled.div`
  color: #666;
  font-size: 13px;
  white-space: nowrap;
`;

const Panel = styled.div`
  background: rgba(255,255,255,0.96);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.035);
  color: #444;
  line-height: 1.45;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  height: 90%;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const Location = styled.div`
  color: #666;
  font-size: 13px;
  margin-bottom: 6px;
`;

const DatePill = styled.div`
  background: rgba(230,126,34,0.06);
  color: #e67e22;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;
`;

const RoleSubtitle = styled.div`
  color: #333;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: #f1f1f1;
  margin: 12px 0;
`;


const Bullets = styled.ul`
  margin: 10px 0 0 18px;
  li { margin: 8px 0; }
  flex: 1 1 auto; /* allow bullets list to grow and fill available space */
  overflow-y: auto;
  padding-right: 6px; /* avoid scrollbar overlapping text */
`;

/* Metric removed (unused) */

const experiences = [
  {
    id: 'theoremlabs-2025',
    company: 'TheoremLabs',
    role: 'Art of Possible Lab Intern - Engineer',
    location: 'Charlotte, NC',
    dates: '08/2025 – Present',
    bullets: [
      'Spearheading the development of a Reconciliation AI Bot — a proof-of-concept system that automates financial data reconciliation for ERISA-regulated retirement accounts (401(k)), eliminating the need for manual intervention.',
      'Built a full-stack solution involving React (UI), Flask (API layer), and PostgreSQL (JSONB storage) to ingest and manage structured and semi-structured financial data.',
      'Engineered an intelligent backend pipeline using LangChain and an Ollama-hosted Mistral LLM to extract reconciliation logic from YAML rules or natural language prompts and execute matching logic dynamically.',
      'Integrated ChromaDB as a vector store to enable Retrieval-Augmented Generation (RAG), allowing semantic search across compliance documents, reconciliation rules, and database schema.',
      'Enabled users to upload CSV, XLSX, YAML, or connect PostgreSQL, interact with the data through a chat UI, and receive context-aware responses based on retrieved rules and schema.',
      'Key innovations include dynamic YAML rule generation, vector-based retrieval of logic snippets, privacy-first local LLM deployment, and reconciliation match tracking via JSONB records.'
    ]
  },
  {
    id: 'atos-2024',
    company: 'Atos Syntel',
    role: 'Intern',
    location: 'Mumbai, India',
    dates: '05/2024 – 07/2024',
    bullets: [
      'Developed a cloud-native Healthcare Data Platform using Azure services, Python, and Django to streamline patient intake and discharge workflows.',
      'Built automated pipelines to ingest and process blood reports into Azure Data Lake ensuring near real-time availability.',
      'Integrated Azure OpenAI to generate AI-powered diagnostic summaries to aid clinician decision-making.'
    ]
  },
  {
    id: 'fanden-2022',
    company: 'FanDen',
    role: 'Technology Consultant',
    location: 'Mumbai, India',
    dates: '08/2022 – 08/2023',
    bullets: [
      'Led a cross-functional team to rebuild an event ticketing platform using MERN, improving load times and UX by ~40%.',
      'Designed and implemented a custom CRM to centralize customer support and backend workflows.',
      'Integrated QR-based ticketing and order confirmation across venues, reducing wait times by 25%.'
    ]
  },
  {
    id: 'brandbuddiez-2022',
    company: 'BrandBuddiez',
    role: 'Business Intern',
    location: 'Mumbai, India',
    dates: '04/2022 – 06/2022',
    bullets: [
      'Analyzed client operations and optimized digital platforms for regional electronics brands (SEO, UI/UX, funnel optimization).',
      'Created UML process diagrams to redesign end-to-end supply chain workflows.',
      'Built interactive Power BI dashboards to visualize sales KPIs and regional performance.'
    ]
  }
];

// Format date ranges like "05/2024 – 07/2024" to "May 2024 – Jul 2024".
const monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function formatDates(raw) {
  if (!raw) return '';
  // split on en-dash or hyphen variants
  const parts = raw.split(/\s*[–-]\s*/);
  const fmt = parts.map(p => {
    const trimmed = p.trim();
    // handle present-like values
    if (/^(present|now)$/i.test(trimmed)) return 'Present';
    const m = trimmed.match(/^(\d{1,2})\/(\d{4})$/);
    if (m) {
      const mm = parseInt(m[1], 10);
      const yyyy = m[2];
      const name = monthShort[Math.max(0, mm - 1)] || m[1];
      return `${name} ${yyyy}`;
    }
    return trimmed;
  });
  return fmt.join(' – ');
}

const ExperienceSection = () => {
  const [selectedId, setSelectedId] = useState(experiences[0]?.id || null);

  const selected = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <Section id="experience">
      <SectionTitle>Professional Experience</SectionTitle>
      <Cards>
        <LeftColumnExp>
          {experiences.map((exp) => (
            <Card key={exp.id} style={{ marginBottom: 10 }}>
              <CardButton
                aria-selected={selectedId === exp.id}
                onClick={() => setSelectedId(exp.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedId(exp.id); }}
              >
                <Company style={{ marginBottom: 6 }}>{exp.company}</Company>
                <Dates style={{ fontSize: 12 }}>{formatDates(exp.dates)}</Dates>
              </CardButton>
            </Card>
          ))}
        </LeftColumnExp>

        <RightColumnExp>
          {selected ? (
            <Panel>
              <Company style={{ fontSize: 18, marginBottom: 6 }}>{selected.company}</Company>

              <MetaRow>
                <div>
                  <Location>{selected.location}</Location>
                  <RoleSubtitle>{selected.role}</RoleSubtitle>
                </div>
                <DatePill>{formatDates(selected.dates)}</DatePill>
              </MetaRow>

              <Divider />

              <Bullets>
                {selected.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </Bullets>
            </Panel>
          ) : (
            <Panel>
              <div style={{ color: '#666' }}>Select an item on the left to view details.</div>
            </Panel>
          )}
        </RightColumnExp>
      </Cards>
    </Section>
  );
};

export default ExperienceSection;
