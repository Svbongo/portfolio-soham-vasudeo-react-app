import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  height: 90vh;
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  justify-self: center;
  background: #fff; /* light theme background */
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  color: #111827;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin: 6px 0 18px 6px;
  color: #7a3b2b; /* warm heading color similar to the design */
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  /* make the left 'Get in Touch' column larger (60%) and the form column 40% */
  grid-template-columns: 60% 40%;
  gap: 40px;
  align-items: start;
  width: 90%;
  height: 60vh;
  margin: 0 auto;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid rgba(15,23,42,0.04);
  border-radius: 12px;
  padding: 28px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  width: 100%;
  /* allow a bit more room inside the card */
  max-width: 1300px;
  margin: 0 auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* give the left column a bigger min-height so the content area feels larger */
  min-height: 380px;
`;

const Heading = styled.h3`
  margin: 0;
  font-size: 28px;
  color: #4a2a20;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(15,23,42,0.75);
  line-height: 1.6;
  max-width: 520px;
`;

const ContactLine = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: #4a2a20;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin-top: 75px;
  background: #fff;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(15,23,42,0.12);
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 10px 12px;
  border: 1px solid rgba(15,23,42,0.12);
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
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
`;

const Note = styled.div`
  font-size: 13px;
  color: rgba(15,23,42,0.6);
`;

const ConnectSection = () => {
  // keep EMAIL for the mailto used by the form; show location/visa/phone as requested
  const EMAIL = 'sohamvasudeo@gmail.com';
  // user-provided contact info
  const LOCATION = 'Falls Church, VA';
  const VISA_STATUS = 'F-1 OPT valid for 2 yrs (1 + 2-year STEM extension)';
  const PHONE = '540-558-3822';

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.email || !form.message) {
      alert('Please provide your email and a short message.');
      return;
    }

    // Build a mailto link as a simple fallback to send the message
    const subject = encodeURIComponent(`Contact from ${form.firstName} ${form.lastName}`.trim());
    const body = encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\n${form.message}`);
    const mailto = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <Section id="connect">
      <Card>
        <Grid>
        <Left>
          <SectionTitle>Get in Touch</SectionTitle>
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

            <SendButton type="submit">Send</SendButton>
          </Form>
        </div>
        </Grid>
      </Card>
    </Section>
  );
};

export default ConnectSection;
