import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

const Section = styled.section`
  height: 85vh;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  color: #111827;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

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
    height: 85vh;
    width: 100%;
    padding: 20px;
    border-radius: 16px;
    color: #111827;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;

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

// ContentSurface removed for ConnectSection: grid/card will sit directly under Section
// to expose the Section ::before gradient in the padding and gaps.

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
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 40px;
  align-items: start;
  flex: 1;
  justify-content: center;
  width: 90%;
  margin: 12px auto 0;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 40px;
    align-items: start;
    flex: 1;
    justify-content: center;
    width: 90%;
    margin: 12px auto 0;
  }
`;

const Card = styled.div`
  /* make slightly translucent so the outer gradient subtly shows through gaps */
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(15,23,42,0.04);
  border-radius: 12px;
  padding: 28px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0,0,0,0.05);
  width: 100%;

  @media (max-width: 1024px) {
    background: rgba(255,255,255,0.92);
    border: 1px solid rgba(15,23,42,0.04);
    border-radius: 12px;
    padding: 28px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 14px rgba(0,0,0,0.05);
    width: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 380px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 380px;
  }
`;

const Heading = styled.h3`
  margin: 0;
  font-size: 28px;
  color: #4a2a20;

  @media (max-width: 1024px) {
    margin: 0;
    font-size: 24px;
    color: #4a2a20;
  }
`;

const Description = styled.p`
  margin: 0;
  color: rgba(15,23,42,0.75);
  line-height: 1.6;
  max-width: 520px;

  @media (max-width: 1024px) {
    margin: 0;
    color: rgba(15,23,42,0.75);
    line-height: 1.6;
    max-width: 520px;
  }
`;

const ContactLine = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: #4a2a20;
  font-size: 14px;

  @media (max-width: 1024px) {
    display: flex;
    gap: 12px;
    align-items: center;
    color: #4a2a20;
    font-size: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin-top: 36px;
  background: #fff;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-top: 36px;
    background: #fff;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 1024px) {
    display: flex;
    gap: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(15,23,42,0.12);
  border-radius: 4px;
  font-size: 14px;
  background: #fff;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid rgba(15,23,42,0.12);
    border-radius: 4px;
    font-size: 14px;
    background: #fff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 10px 12px;
  border: 1px solid rgba(15,23,42,0.12);
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;

  @media (max-width: 1024px) {
    width: 100%;
    min-height: 110px;
    padding: 10px 12px;
    border: 1px solid rgba(15,23,42,0.12);
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
  }
`;

const SendButton = styled.button`
  align-self: flex-end;
  background: #a14b2b;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover { opacity: 0.95; transform: translateY(-1px); }

  @media (max-width: 1024px) {
    align-self: flex-end;
    background: #a14b2b;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;

    &:hover { opacity: 0.95; transform: translateY(-1px); }
  }
`;

const Note = styled.div`
  font-size: 13px;
  color: rgba(15,23,42,0.6);

  @media (max-width: 1024px) {
    font-size: 13px;
    color: rgba(15,23,42,0.6);
  }
`;

const ConnectSection = () => {
  const LOCATION = 'Falls Church, VA';
  const VISA_STATUS = 'F-1 OPT valid for 3 yrs (1 + 2-year STEM extension)';
  const PHONE = '+1 (540)-558-3822';

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      setFeedback('Please provide your email and a short message.');
      return;
    }
    setSending(true);
    setFeedback('');

    // Replace these with your EmailJS values
    const SERVICE_ID = 'service_8etacse';
    const TEMPLATE_ID = 'template_wv2ekwn';
    const USER_ID = 'zcakmBuOepF1KjHo0';

    const templateParams = {
      from_name: `${form.firstName} ${form.lastName}`,
      from_email: form.email,
      message: form.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setFeedback('Message sent! Thank you for reaching out.');
        setForm({ firstName: '', lastName: '', email: '', message: '' });
      })
      .catch(() => {
        setFeedback('Failed to send message. Please try again later or email me directly.');
      })
      .finally(() => setSending(false));
  };

  return (
    <Section id="connect">
      <SectionTitle>Get in Touch</SectionTitle>
      <Card>
        <Grid>
            <Left>
              <Heading>I'd like to hear from you!</Heading>
              <Description>If you have any inquiries or just want to say hi, please use the contact form on the right or feel free to give me a call.</Description>

              <div>
                <ContactLine style={{ gap: 8, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 15, color: '#4a2a20' }}><strong>Location:</strong> {LOCATION}</div>
                  <div style={{ fontSize: 15, color: '#4a2a20' }}><strong>Visa status:</strong> {VISA_STATUS}</div>
                  <div style={{ fontSize: 15, color: '#4a2a20' }}><strong>Phone:</strong> {PHONE}</div>
                </ContactLine>
              </div>

              <Note>Alternatively, fill in the form and press Send — it will open your mail client with the details pre-filled.</Note>
            </Left>

            <div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                  <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                </Row>

                <Input name="email" placeholder="Email *" value={form.email} onChange={handleChange} />

                <Textarea name="message" placeholder="Message *" value={form.message} onChange={handleChange} />

                <SendButton type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</SendButton>
                {feedback && <Note style={{ marginTop: 8, color: feedback.startsWith('Message sent') ? 'green' : '#a14b2b' }}>{feedback}</Note>}
              </Form>
            </div>
          </Grid>
        </Card>
    </Section>
  );
};

export default ConnectSection;
