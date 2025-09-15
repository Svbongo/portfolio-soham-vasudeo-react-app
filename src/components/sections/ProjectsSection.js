import React, { useState } from 'react';
import styled from 'styled-components';

// Use local project images so they can be maintained in repo
import Socio_img_1 from '../../assets/projects/Socio_img_1.png';
import Socio_img_2 from '../../assets/projects/Socio_img_2.png';
import Socio_img_3 from '../../assets/projects/Socio_img_3.png';
import Socio_img_4 from '../../assets/projects/Socio_img_4.png';
import Socio_img_5 from '../../assets/projects/Socio_img_5.png';
import Socio_img_6 from '../../assets/projects/Socio_img_6.png';
import Hand_img_1 from '../../assets/projects/Hand_img_1.png';
import Hand_img_2 from '../../assets/projects/Hand_img_2.png';
import Hand_img_3 from '../../assets/projects/Hand_img_3.png';
import Hand_img_4 from '../../assets/projects/Hand_img_4.png';
import Hand_img_5 from '../../assets/projects/Hand_img_5.png';
import Hand_perf from '../../assets/projects/Hand_perf.png';

const Section = styled.div`
  height: 90vh; /* Full viewport height */
  width: 100%; /* Full width */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 16px; /* Consistent rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,164,0.08));
    filter: blur(18px);
    transform: translateY(8px) scale(1.02);
    z-index: -1;
    pointer-events: none;
    opacity: 0.95;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  text-align: left;
  color: #333;
  margin-bottom: 10px;
`;

/* grid & column wrappers to allow independent scrolling */
const GridWrapper = styled.div`
  width: 90%;
  align-self: center;
  margin-top: 12px;
  flex: 1; /* fill remaining vertical space in Section */
  max-height: 73vh; /* allow children to shrink and scroll */

`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: stretch;
  height: 100%;
  min-height: 0;

`;

const LeftColumn = styled.div`
  min-height: 0; /* important for flex child scrolling */
  height: 100%;
  overflow-y: auto;
  padding-right: 4px;

  @media (max-width: 1024px) {
    padding-right: 0;
  }
`;

const RightColumn = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 0; /* allow children to shrink horizontally (for text-overflow) */
`;



const ProjectCard = styled.article`
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.04);
  /* fill parent column and allow internal scrolling for long details */
  height: 100%;
  min-height: 0;
  overflow-y: auto;
`;

/* Left column items (tabs) */
const LeftCard = styled.article`
  background: #fff;
  border-radius: 10px;
  justify-content: center;
  padding: 8px 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
`;

const LeftButton = styled.button`
  all: unset;
  display: block;
  width: 95%;
  text-align: left;
  padding: 8px;
  overflow: break-word;
  margin-top: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: background .12s ease, transform .08s ease;
  &:hover { background: rgba(230,126,34,0.04); transform: translateY(-1px); }
  &[aria-selected="true"] { background: linear-gradient(90deg, rgba(250,107,31,0.06), rgba(230,126,34,0.04)); box-shadow: 0 8px 20px rgba(230,126,34,0.06); }
`;

const LeftTitle = styled.div`
  font-weight: 700;
  color: #111;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const ProjectBullets = styled.ul`
  margin: 8px 0 0 18px;
  li { margin: 8px 0; }
`;

const ProjectImage = styled.img`
  object-fit: cover;
  margin: 8px 0;
  border-radius: 6px;
  display: block;
  width: 100%;
  max-height: 320px;

  @media (max-width: 1024px) {
    max-height: 260px;
  }
`;

/* Note: carousel/tab components removed to reuse Experience-section layout */

const projects = [
  {
    id: 'snowflake-devops',
    title: 'Snowflake DevOps Automation',
    bullets: [
      'Wrote custom Python logic to parse and execute only modified or version-incremented .sql files in a deterministic and auditable sequence.',
      'Designed a release workflow with branch/tag strategies for dry runs and controlled production deployments, integrating GitHub metadata (commits, SHAs, authors) for traceability.',
      'Enabled environment-specific rollouts with deployment logs and Slack notifications to ensure transparency and release governance.'
    ],
    detail: (
      <div>
        <h3>🚀 CI/CD for Prefect + Snowflake</h3>
        <h4>📊 Project Overview</h4>
        <p>
          A production-ready template to orchestrate data workflows with <strong>Prefect</strong> and integrate them with
          <strong> Snowflake</strong>, backed by a Git-based CI/CD pipeline. It standardizes local development, secure connections,
          automated quality checks, and deployments via GitHub Actions.
        </p>
        <hr />
        <h4>🎯 Objectives</h4>
        <ul>
          <li>Standardize development and deployment of Prefect flows.</li>
          <li>Enforce code quality with automated linting and tests.</li>
          <li>Enable secure, repeatable Snowflake connections.</li>
          <li>Ship changes safely using CI gates and branch protections.</li>
        </ul>
        <hr />
        <h4>✨ Features</h4>
        <ul>
          <li>Automated CI: format, lint, test, and type-check on every PR.</li>
          <li>Continuous Delivery: auto-deploy Prefect deployments on merge to main.</li>
          <li>Secrets management via GitHub secrets / Prefect Blocks.</li>
          <li>Snowflake integration using official Python connector.</li>
          <li>Example flow patterns (ELT, SQL tasks, idempotent runs).</li>
        </ul>
        <hr />
        <h4>🧭 Architecture</h4>
        <p>Developer pushes &rarr; CI runs checks &rarr; merge to main triggers deployment &rarr; Prefect executes flows against Snowflake.</p>
        <hr />
        <h4>🗂️ Project Structure (example)</h4>
        <pre style={{ background: '#f7f7f7', padding: 8, borderRadius: 6, overflowX: 'auto' }}>{`cicd-prefect-snowflake/
├── src/
│   ├── flows/
│   ├── tasks/
│   ├── snowflake_utils.py
│   └── __init__.py
├── prefect/deployments/
├── tests/
├── .github/workflows/
├── requirements.txt
└── .env.example`}</pre>
        <hr />
        <h4>🧰 Tools &amp; Technologies</h4>
        <p>Python, Prefect, Snowflake Connector, GitHub Actions, pytest, black, ruff/flake8, mypy.</p>
        <hr />
        <h4>▶️ Getting Started (summary)</h4>
        <ol>
          <li>Clone repo and create virtualenv.</li>
          <li>Install deps: <code>pip install -r requirements.txt</code>.</li>
          <li>Configure secrets (use .env locally, GitHub secrets for CI).</li>
          <li>Authenticate Prefect and run flows locally or deploy via Prefect CLI.</li>
        </ol>
        <hr />
        <h4>🔁 CI/CD</h4>
        <p>Typical GitHub Actions: on PR run format/lint/tests; on merge to main build and apply Prefect deployments. Store Prefect/Snowflake credentials in GitHub Secrets.</p>
        <hr />
        <h4>📈 Key Practices</h4>
        <ul>
          <li>Keep flows idempotent and parameterized.</li>
          <li>Use Prefect Blocks for credentials.</li>
          <li>Add retries/timeouts and smoke tests for flows.</li>
        </ul>
        <hr />
        <h4>👥 Author</h4>
        <p>Soham Vasudeo</p>
      </div>
    )
  },
  {
    id: 'hand-gesture-recognition',
    title: 'Hand Gesture Recognition System',
    bullets: [
      'Real-time hand gesture recognition using MediaPipe, OpenCV, and LSTM/CNN models.',
      'Extracts 21 hand landmarks per frame and classifies gestures into predefined categories.',
      'Optimized for low-latency inference and deployable via Flask / TFLite for edge/mobile.'
    ],
    detail: (
      <div>
        <h3>📌 Hand Gesture Recognition System</h3>

        <h4>📊 Project Overview</h4>
        <p>
          A real-time gesture-based communication system that leverages MediaPipe Hands for tracking, OpenCV for
          preprocessing, and deep learning (LSTM / CNN) to recognize hand gestures. The system is designed to enable
          gesture-to-text translation for accessibility and low-latency interaction.
        </p>

        <hr />
        <h4>👥 Team Members</h4>
        <p>Soham Vasudeo, Om Agrawal, Vanshaj Ajmera, Shardul Patki, Ritika Shetty<br/>Course: Machine Learning Project 2022-23 — NMIMS University</p>

        <hr />
        <h4>🎯 Objectives</h4>
        <ul>
          <li>Enable gesture-based communication for speech-impaired users.</li>
          <li>Provide a real-time, accurate recognition pipeline with low inference latency.</li>
          <li>Design a scalable model that can learn new gestures dynamically.</li>
        </ul>

        <hr />
        <h4>🗂 Data &amp; Preparation</h4>
        <p>Keypoints (21 landmarks) were extracted per frame using MediaPipe Hands and converted into structured NumPy arrays. Data augmentation and cleaning improved robustness to lighting and background variation.</p>

        <hr />
        <h4>🧠 Modeling</h4>
        <ul>
          <li>LSTM to capture temporal dependencies across frames.</li>
          <li>CNN/ANN components for spatial feature extraction and final classification.</li>
          <li>Optimized with Adam and categorical cross-entropy; hyperparameters tuned for best validation accuracy.</li>
        </ul>

        <hr />
        <h4>📈 Results</h4>
        <ul>
          <li>Test accuracy: ~87.5% (example metric from evaluation).</li>
          <li>Real-time inference: ~3.8 ms per frame (low-latency).</li>
          <li>Expandable gesture set and mobile/edge deployment via TFLite.</li>
        </ul>

        <hr />
        <h4>📊 Visuals (Success Metrics and Demo)</h4>
  <ProjectImage alt="Hand_img_1" src={Hand_img_1} />
  <ProjectImage alt="Hand_img_2" src={Hand_img_2} />
  <ProjectImage alt="Hand_img_3" src={Hand_img_3} />
  <ProjectImage alt="Hand_img_4" src={Hand_img_4} />
  <ProjectImage alt="Hand_img_5" src={Hand_img_5} />
  <ProjectImage alt="Hand_perf" src={Hand_perf} />

        <hr />
        <h4>🛠 Tools &amp; Tech</h4>
        <p>Python, MediaPipe, OpenCV, TensorFlow / Keras, LSTM/CNN models, Flask/FastAPI, TFLite for edge deployment.</p>
      </div>
    )
  },
  {
    id: 'socioeconomic-capstone',
    title: 'Socioeconomic Restructuring Analysis — Capstone Project',
    bullets: [
      'Analyzed U.S. Census Microdata (1994–1996) using regression and classification models to study income inequality, migration, and education trends.',
      'Achieved 100% ROC AUC in migration prediction, 99.8% ROC AUC in family instability modeling, and 97.85% ROC AUC in dropout risk prediction.',
      'Developed Power BI dashboards for dynamic storytelling and simulated policy interventions using data insights.'
    ]
    ,
    detail: (
      <div>
        <h3>📊 Socioeconomic Restructuring in Mid-1990s America</h3>
        <h4>📌 Project Overview</h4>
        <p>
          This project examines the socioeconomic restructuring of the United States from 1994–1996, a period marked by
          globalization, early digital adoption, and major policy shifts such as NAFTA (1994) and the welfare reform of 1996 (PRWORA).
        </p>

        <p>We used U.S. Census microdata (1994–1996) to study:</p>
        <ul>
          <li>Workforce composition and shifts</li>
          <li>Rising income inequality</li>
          <li>Migration and mobility patterns</li>
          <li>Family and education trends</li>
          <li>Race, gender, and citizenship disparities</li>
        </ul>

        <p>The project integrates exploratory data analysis, regression modeling, and predictive analytics to identify structural inequalities and policy implications.</p>

        <hr />
        <h4>🗂 Data Description</h4>
        <p>
          Source: U.S. Census Bureau, person-level microdata (1994–1996). Scope: 1% population samples, weighted for national representation.
        </p>
        <ul>
          <li>Demographics: Age, race, gender, citizenship</li>
          <li>Socioeconomic: Education, occupation, income (labor + passive)</li>
          <li>Household: Family structure, marital status, children</li>
          <li>Migration: County/state movement, MSA/non-MSA shifts</li>
          <li>Unit of Analysis: Individual records, scaled by census weights</li>
        </ul>

        <hr />
        <h4>📊 Statistical Analysis Performed</h4>
        <h5>Descriptive Statistics</h5>
        <ul>
          <li>Workforce growth by occupation &amp; industry</li>
          <li>Wage distribution across demographics</li>
          <li>Household and education enrollment breakdowns</li>
        </ul>

        <h5>Regression Analysis</h5>
        <ul>
          <li>Multiple Linear Regression → determinants of wages</li>
          <li>Variables: education, gender, race, occupation, migration, citizenship</li>
        </ul>

        <h5>Predictive Modeling</h5>
        <ul>
          <li>Migration Likelihood Model (logistic regression) → 100% classification accuracy</li>
          <li>Dropout Risk Model (logistic regression) → 95.9% accuracy, ROC AUC = 0.9785</li>
          <li>Family Instability Model → 97.65% accuracy, ROC AUC = 0.9980</li>
        </ul>

        <h5>Feature Importance</h5>
        <p>Identified education, household type, and legal status as primary predictors for income, mobility, and family stability.</p>

        <hr />
        <h4>📈 Visualization Inferences</h4>
        <h5>Workforce Shifts</h5>
        <ul>
          <li>Sales: +2.55% growth (6.24% of workforce, 83% full-time)</li>
          <li>Executives/Managers: +4.75% growth, 86% full-time</li>
          <li>Machine Operators: +5.87% growth but lower job stability (80% full-time)</li>
          <li>Armed Forces: –45% workforce share (military drawdown)</li>
        </ul>
        <p>➡️ Takeaway: Growth favored professional/managerial jobs, while industrial roles shrank, signaling transition to service economy.</p>
  <ProjectImage alt="Socio_img_1" src={Socio_img_1} />

        <h5>Income Inequality</h5>
        <ul>
          <li>Education effect: Associate’s degree holders earned $117/hour; bachelor’s $109/hour; master’s $89/hour; non–HS $16/hour</li>
          <li>Race: White $59/hour, Asian/Pacific Islander $51, Black $56, Other $31</li>
          <li>Gender: Men $65/hour vs Women $51/hour</li>
          <li>Passive income: White $724 avg vs Black $203 avg</li>
        </ul>
        <p>➡️ Takeaway: Education boosted wages, but race and gender gaps persisted, with capital income amplifying inequality.</p>
  <ProjectImage alt="Socio_img_2" src={Socio_img_2} />
        <br />
  <ProjectImage alt="Socio_img_3" src={Socio_img_3} />

        <h5>Migration &amp; Mobility</h5>
        <ul>
          <li>County-to-county movers: $52/hour</li>
          <li>Interstate movers (Midwest): $61/hour</li>
          <li>Non-movers: $60/hour</li>
          <li>International movers (to non-MSA): $27/hour</li>
        </ul>
        <p>➡️ Takeaway: Internal migration improved wages, but international migrants and non-citizens faced suppressed earnings.</p>
  <ProjectImage alt="Socio_img_4" src={Socio_img_4} />

        <h5>Family &amp; Education Trends</h5>
        <ul>
          <li>42% “never married” vs 43% “married” — cultural shift toward delayed marriage</li>
          <li>25% households had children &lt;18, many in single-parent homes</li>
          <li>6.38% enrolled in school, mostly ages 18–24</li>
        </ul>
        <p>➡️ Takeaway: Families diversified (rise in single-parent households). Education became a defensive strategy, but unevenly accessible.</p>
  <ProjectImage alt="Socio_img_5" src={Socio_img_5} />

        <h5>Demographic Disparities</h5>
        <ul>
          <li>High-income by race (U.S.-born): White 7%, Black 2.5%, Native American 2%</li>
          <li>Gender wage gap (same degree): Men outperformed women (BA → 33% men vs 14% women)</li>
        </ul>
        <p>➡️ Takeaway: Education wasn’t an equalizer. Inequality was structural, not individual.</p>
  <ProjectImage alt="Socio_img_6" src={Socio_img_6} />

        <hr />
        <h4>🧪 Hypotheses Made &amp; Tested</h4>
        <ul>
          <li>Education would mitigate wage inequality — ❌ Rejected</li>
          <li>Migration leads to higher income — ✅ Supported</li>
          <li>Family instability linked to lower income/education — ✅ Supported</li>
          <li>Citizenship status is neutral in wage outcomes — ❌ Rejected</li>
        </ul>

        <hr />
        <h4>🏁 Overall Conclusion</h4>
        <ul>
          <li>The mid-1990s reshaped the U.S. economy and society: workforce tilted toward services and tech, sidelining low-skill jobs.</li>
          <li>Income inequality widened: Education mattered, but structural barriers (gender, race, citizenship) kept inequality entrenched.</li>
          <li>Migration became both an opportunity and a filter — benefiting domestic movers but disadvantaging international migrants.</li>
          <li>Family structures diversified, with delayed marriage and rising single-parent households.</li>
          <li>Predictive modeling confirmed that structural inequality was systemic, not incidental.</li>
          <li><strong>Policy Implication:</strong> Workforce retraining, childcare support, and equitable wage policies could have mitigated long-term inequality trends.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'automated-financial-data',
    title: 'Automated Financial Data Processing and Dynamic Reporting',
    bullets: [
      'Designed a conceptual framework to automate financial data workflows using RPA, ML, and Gen AI.',
      'Implemented RPA for data extraction, cleaning, ETL, and storage in a Data Warehouse.',
      'Integrated RLHF for continuous optimization and real-time financial decisions.'
    ]
    ,
    detail: (
      <div>
        <h3>🔁 Transforming Financial Planning &amp; Analysis (FP&amp;A) with Generative AI</h3>
        <h4>📊 Project Overview</h4>
        <p>
          This project, <strong>"Transforming Financial Planning and Analysis (FP&amp;A) with Generative AI,"</strong> explores the integration of
          Robotic Process Automation (RPA), deep learning, and Generative AI to modernize FP&amp;A workflows. The goal is to automate data
          collection and preparation, improve forecasting accuracy, and surface real-time actionable insights for faster, data-driven decisions.
        </p>
        <hr />
        <h4>👥 Team Members</h4>
        <ul>
          <li><strong>Kavit Navadia</strong></li>
          <li><strong>Shardul Patki</strong></li>
          <li><strong>Soham Vasudeo</strong></li>
        </ul>
        <p><strong>Course:</strong> BIT 5524 - Conceptual Project Report<br /><strong>Institution:</strong> Virginia Tech</p>
        <hr />
        <h4>🎯 Objectives</h4>
        <p>The project aims to modernize FP&amp;A by automating routine tasks, improving forecasting accuracy, and providing scenario-driven insights.</p>
        <ul>
          <li>Automate FP&amp;A processes to reduce manual effort.</li>
          <li>Improve forecasting accuracy using ML models.</li>
          <li>Optimize resource allocation through data-driven decision-making.</li>
          <li>Proactively detect financial anomalies to mitigate risk.</li>
        </ul>
        <hr />
        <h4>🗂 Data Understanding</h4>
        <ol>
          <li>
            <strong>Historical Financial Data</strong>
            <ul>
              <li>Profit &amp; Loss statements</li>
              <li>Balance Sheets</li>
              <li>Cash Flow statements</li>
              <li>Budget vs Actuals</li>
            </ul>
          </li>
          <li>
            <strong>Market &amp; External Data</strong>
            <ul>
              <li>Inflation, GDP, interest rates</li>
              <li>Competitor benchmarks</li>
            </ul>
          </li>
          <li>
            <strong>AI-Generated Data</strong>
            <ul>
              <li>Simulated market scenarios</li>
              <li>Scenario-based financial projections</li>
            </ul>
          </li>
        </ol>
        <hr />
        <h4>⚙️ Data Preparation</h4>
        <ul>
          <li>Data cleaning: imputation, standardizing currencies and dates, deduplication.</li>
          <li>Transformation: scaling, encoding, and feature engineering (growth rates, ratios).</li>
          <li>Data splitting: training/validation/test (70/15/15) to prevent leakage.</li>
        </ul>
        <hr />
        <h4>🧠 Modeling</h4>
        <p>We used a mix of time-series forecasting, anomaly detection, and generative techniques for scenario analysis:</p>
        <ul>
          <li><strong>Time-series:</strong> LSTM, GRU, SARIMA for revenue and cashflow forecasting.</li>
          <li><strong>Anomaly detection:</strong> Isolation Forest and Autoencoders to surface unusual financial patterns.</li>
          <li><strong>Generative &amp; LLMs:</strong> LLMs (OpenAI) and RLHF for qualitative insight generation and scenario text synthesis.</li>
        </ul>
        <hr />
        <h4>📈 Model Evaluation</h4>
        <ul>
          <li>Forecasting: MAE, RMSE</li>
          <li>Anomaly detection: Precision, Recall, F1</li>
          <li>Generative outputs: relevance, user satisfaction, governance checks</li>
        </ul>
        <hr />
        <h4>🚀 Deployment Strategy</h4>
        <ol>
          <li>Infrastructure: AWS (S3, Redshift), Azure, or GCP for storage and hosting.</li>
          <li>RPA: UiPath / Power Automate for data ingestion and automation.</li>
          <li>ETL: Apache Airflow and dbt for robust pipelines.</li>
          <li>Model serving: AWS SageMaker / Azure ML for real-time or batch scoring.</li>
          <li>Monitoring: CloudWatch and Azure Monitor for retraining triggers and performance.</li>
        </ol>
        <hr />
        <h4>📊 Key Insights &amp; Results</h4>
        <ul>
          <li>Reduced manual effort by automating repetitive FP&amp;A tasks.</li>
          <li>Improved forecast accuracy (example: ~15% reduction in error) using hybrid ML models.</li>
          <li>Detected cost anomalies enabling targeted savings.</li>
          <li>Scenario planning enhanced strategic decision-making.</li>
        </ul>
        <hr />
        <h4>🛠 Tools &amp; Technologies</h4>
        <p>Python, Pandas, NumPy, TensorFlow, Scikit-learn, AWS/Azure/GCP, Power BI, LangChain, OpenAI API, UiPath, Airflow, dbt.</p>
      </div>
    )
  },
  {
    id: 'covid-analysis',
    title: 'Covid-19 Analysis',
    bullets: [
      'Analyzed COVID-19 patient and vaccine data; predicted recovery and mortality using SARIMAX.',
      'Built a Power BI dashboard to visualize vaccination and recovery predictions.'
    ],
    detail: (
      <div>
        <h3>🦠 COVID-19 Analysis and Forecasting</h3>
        <h4>📊 Project Overview</h4>
        <p>
          This project, <strong>"Future Predictions of COVID-19,"</strong> was conducted as part of a Data Science competition during my
          studies at <strong>NMIMS Mukesh Patel School of Technology Management &amp; Engineering.</strong> The project aimed to analyze COVID-19 trends in India and
          predict future cases using <strong>Python, Power BI, and the SARIMA model</strong> for time-series forecasting.
        </p>
        <hr />
        <h4>👥 Team Members</h4>
        <ul>
          <li><strong>Soham Vasudeo</strong></li>
          <li><strong>Ritika Shetty</strong></li>
        </ul>
        <hr />
        <h4>🎯 Goal / Problem Statement</h4>
        <p>
          The objective was to leverage Python, Business Visualization, and Statistics &amp; Analytics to analyze COVID-19 data and forecast future cases using the
          <strong> SARIMA </strong> model.
        </p>
        <hr />
        <h4>🗂 Dataset Details</h4>
        <ol>
          <li>
            <strong>COVID-19 Cases Data</strong>
            <ul>
              <li>States/Union Territories</li>
              <li>Dates and times</li>
              <li>Confirmed cases (Indian and Foreign Nationals)</li>
              <li>Cured cases</li>
              <li>Deaths</li>
            </ul>
          </li>
          <li>
            <strong>COVID-19 Vaccination Data</strong>
            <ul>
              <li>Total doses administered</li>
              <li>First and second dose distribution</li>
              <li>Gender-wise breakdown</li>
              <li>Vaccine types: Covaxin, Covishield, Sputnik V</li>
              <li>Age-group analysis and AEFI</li>
            </ul>
          </li>
        </ol>
        <hr />
        <h4>🔍 Data Analysis Steps</h4>
        <ol>
          <li><strong>Data Cleaning &amp; Preprocessing</strong> — removal of missing values, datetime parsing, duplicate handling.</li>
          <li><strong>Exploratory Data Analysis (EDA)</strong> — growth rates, mortality/recovery rates, geo maps, time-series plots.</li>
          <li><strong>Modeling Approach</strong> — SARIMA model, ACF/PACF analysis, grid-search for ARIMA params, model fitting &amp; evaluation.</li>
        </ol>
        <hr />
        <h4>📈 Dashboards</h4>
        <p>Two interactive Power BI dashboards were developed:</p>
        <ul>
          <li><strong>COVID Cases Dashboard</strong> — active/confirmed/recovered/deaths overview, map-based analytics, recovery &amp; mortality trends.</li>
          <li><strong>COVID Vaccination Dashboard</strong> — gender-wise analysis, dose vs AEFI, age-wise breakdown, date filters.</li>
        </ul>
        <hr />
        <h4>🛠 Tools &amp; Technologies</h4>
        <p>Python (Pandas, NumPy, Statsmodels, Matplotlib, Seaborn), Power BI, SARIMA.</p>
        <hr />
        <h4>🚀 Key Insights and Results</h4>
        <ul>
          <li>Mortality rate peaked at <strong>3.14%</strong> early 2020 and declined to <strong>1.32%</strong> by mid-2021.</li>
          <li>Recovery rate improved to <strong>97%</strong> after the first vaccination wave.</li>
          <li>Vaccination impact: states with higher vaccination rates showed lower case growth.</li>
        </ul>
        <hr />
        <h4>📂 Project Structure</h4>
        <pre style={{ background: '#f7f7f7', padding: 8, borderRadius: 6, overflowX: 'auto' }}>{`.
├── data/
│   ├── covid_19_india.csv
│   ├── covid_analysis.csv
│   ├── covid_vaccine_statewise.xlsx
│   ├── StatewiseTestingDetails.csv
│   ├── Covid Analysis - NMIMS.xlsx
├── dashboards/
│   ├── Covid Analysis - NMIMS.pbix
├── README.md
`}</pre>
        <hr />
        <h4>🏆 Achievements</h4>
        <ul>
          <li>In-depth data analysis and SARIMA forecasting.</li>
          <li>Interactive Power BI dashboards for policy insight.</li>
        </ul>
      </div>
    )
  }
  ,
  {
    id: 'sales-dashboard-competition',
    title: 'Sales Dashboard',
    bullets: [
      'Built an interactive Sales Dashboard (Excel) with pivot tables and pivot charts.',
      'Provided regional and product-line insights with slicers for dynamic analysis.',
      'Included key KPIs: total revenue, profit, and quantities sold with drill-down capability.'
    ],
    detail: (
      <div>
        <h3>📊 Sales Dashboard (Dashboard Competition)</h3>
        <h4>🏆 Overview</h4>
        <p>
          This project showcases an interactive Sales Dashboard developed as part of a dashboard competition during my
          Bachelor of Technology – Computer Science and Engineering (Major: Data Science) at NMIMS, Mumbai, India.
        </p>

        <p>
          The dashboard provides actionable insights into sales performance across regions, product lines, and sales channels using
          Microsoft Excel pivot tables and visualizations.
        </p>

        <hr />
        <h4>🔍 Project Objectives</h4>
        <ul>
          <li>Monitor Key Sales KPIs across regions, channels, and categories.</li>
          <li>Provide stakeholders with intuitive visualizations for decision-making.</li>
          <li>Evaluate sales trends and profitability across multiple dimensions.</li>
        </ul>

        <hr />
        <h4>⚙️ Features</h4>
        <ul>
          <li>Interactive filters (slicers) for regions and product lines.</li>
          <li>Sales breakdown by channel (Retail, Internet, Catalog).</li>
          <li>Geographical sales visualization and product performance analysis.</li>
          <li>Key metrics: total revenue, profit, and quantities sold.</li>
        </ul>

        <hr />
        <h4>📊 Dashboard Highlights</h4>
        <ul>
          <li>Sales by Channel: revenue split between Catalog, Internet, and Retail.</li>
          <li>Regional Sales Performance across states (Australia dataset).</li>
          <li>Product Line Analysis: Sports, Clothes & Shoes, Outdoors, etc.</li>
          <li>Key Metrics Overview: overall revenue, profit, and volume.</li>
        </ul>

        <hr />
        <h4>📂 Files</h4>
        <ul>
          <li><strong>Sales_Dashboard.xlsx</strong> — Interactive Excel dashboard with pivot tables, charts, raw data, and calculations.</li>
          <li><strong>README.md</strong> — Documentation and usage instructions.</li>
        </ul>

        <hr />
        <h4>🛠 Tools &amp; Technologies</h4>
        <p>Microsoft Excel, Pivot Tables, Pivot Charts, Conditional Formatting, Data Cleaning &amp; Aggregation.</p>

        <hr />
        <h4>📅 Timeline &amp; Achievements</h4>
        <p>November 2020 – December 2020. Developed a user-friendly dashboard that provided actionable insights and improved decision-making.</p>

        <hr />
        <h4>🚀 How to use</h4>
        <ol>
          <li>Download <code>Sales_Dashboard.xlsx</code>.</li>
          <li>Open in Microsoft Excel.</li>
          <li>Use slicers to filter by region, product line, and channel to explore insights.</li>
        </ol>
      </div>
    )
  }
];

const ProjectsSection = () => {
  const [selectedId, setSelectedId] = useState(projects[0]?.id);

  // optional autoplay (commented out by default)
  // useEffect(() => {
  //   const t = setInterval(() => setIndex(i => (i + 1) % count), 6000);
  //   return () => clearInterval(t);
  // }, [count]);

  return (
    <Section id="projects">
      <SectionTitle>Projects</SectionTitle>

      <GridWrapper>
        <Grid>
          <LeftColumn>
            {projects.map((p) => (
              <LeftCard key={p.id} style={{ marginBottom: 10 }}>
                <LeftButton
                  aria-selected={selectedId === p.id}
                  onClick={() => setSelectedId(p.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedId(p.id); }}
                >
                  <LeftTitle style={{ marginBottom: 6 }}>{p.title}</LeftTitle>
                </LeftButton>
              </LeftCard>
            ))}
          </LeftColumn>

          <RightColumn>
            {(() => {
              const selected = projects.find(p => p.id === selectedId);
              if (!selected) {
                return (
                  <ProjectCard>
                    <div style={{ color: '#666' }}>Select a project on the left to view details.</div>
                  </ProjectCard>
                );
              }

              return (
                <ProjectCard>
                  {selected.detail ? (
                    /* render the provided JSX detail for rich projects (covid-analysis etc.) */
                    selected.detail
                  ) : (
                    <>
                      <ProjectTitle>{selected.title}</ProjectTitle>
                      <ProjectBullets>
                        {selected.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ProjectBullets>
                    </>
                  )}
                </ProjectCard>
              );
            })()}
          </RightColumn>
        </Grid>
      </GridWrapper>
    </Section>
  );
};

export default ProjectsSection;
