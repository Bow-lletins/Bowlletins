'use client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BriefcaseFill,
  CalendarEventFill,
  BookFill,
  HeartFill,
  ChatFill,
  FileBinaryFill,
  ExclamationCircleFill,
  EyeFill,
  MicMuteFill,
  PaletteFill,
} from 'react-bootstrap-icons';

const problems = [
  {
    icon: <ExclamationCircleFill />,
    title: 'Scattered Information',
    items: [
      'Jobs, events, and deadlines live across bulletin boards, GroupMe, Instagram, and email',
      'No single place to find everything — students have to check multiple platforms',
      'A lot of opportunities never reach the students who need them',
    ],
  },
  {
    icon: <EyeFill />,
    title: 'Posts Are Easy to Miss',
    items: [
      'Physical flyers get covered by newer ones within days',
      'Group chat posts scroll away and get buried fast',
      'No system to surface the right content to the right student',
    ],
  },
  {
    icon: <MicMuteFill />,
    title: 'No Interaction, No Community',
    items: [
      'Current boards are completely one-way — read only',
      'No RSVP, no reactions, no way to ask questions',
      "Organizers can't gauge interest or build community",
    ],
  },
  {
    icon: <PaletteFill />,
    title: 'Hard to Post',
    items: [
      'Need design skills just to make a flyer',
      'No easy way to digitally distribute to the right audience',
      'High barrier stops students from sharing opportunities at all',
    ],
  },
];

const features = [
  { icon: <BriefcaseFill />,     title: 'Jobs & Internships',     bg: '#FFF3CD', accent: '#D4A017',
    description: 'Browse on-campus and off-campus job listings posted by employers and students.' },
  
  { icon: <CalendarEventFill />, title: 'Events & Deadlines',     bg: '#D4E8F0', accent: '#2A7DA0',
     description: 'Never miss a club event, scholarship deadline, or campus activity again.' },
  
  { icon: <BookFill />,          title: 'Study Groups',           bg: '#FFE5CC', accent: '#C0602A',
     description: 'Create or join study groups for any class. Connect with fellow classmates easily.' },
  
  { icon: <HeartFill />,         title: 'Anonymous Reactions',    bg: '#FADADD', accent: '#B03050',
     description: 'React to posts with emoji anonymously — no pressure, just engagement.' },
  
  { icon: <ChatFill />,          title: 'Comments & Discussion',  bg: '#E8E0F0', accent: '#6A3DA0',
     description: 'Ask questions, leave feedback, and build community around any post.' },
  
  { icon: <FileBinaryFill />,         title: 'AI Flyer Generator',     bg: '#D8EAD8', accent: '#2E6B2E',
     description: "No design skills? Type your info and let AI generate a professional flyer." },
];

export default function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-hero-emoji">🌈</span>
          <h1 className="about-hero-title">About Bow-lletins</h1>
          <p className="about-hero-subtitle">
            A clean, modern, online campus bulletin board built specifically
            for UH Mānoa — one place for every student to find and share opportunities.
          </p>
        </div>
      </section>

      <Container className="py-5">
        <div className="about-label-wrap">
          <span className="about-label green">The Problem</span>
        </div>
        <div className="about-alert">
          UH Mānoa students are missing out on jobs, events, and opportunities — and they
          don&apos;t even know it.
        </div>
        <Row className="g-3">
          {problems.map((p) => (
            <Col key={p.title} sm={6} lg={3}>
              <div className="about-problem-card">
                <div className="about-problem-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <section className="about-vision">
        <Container>
          <div className="about-label-wrap">
            <span className="about-label green">Our Vision</span>
          </div>
          <h2 className="about-vision-title">One platform. Every opportunity.</h2>
          <Row className="g-3">
            {features.map((f) => (
              <Col key={f.title} sm={6} md={4} lg={2}>
                <div
                  className="about-feature-card"
                  style={{ background: f.bg }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = f.accent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; }}
                >
                  <div className="about-feature-card-emoji">{f.icon}</div>
                  <h3 style={{ color: f.accent }}>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="about-goal-card">
              <h2>🎯 Our Goal</h2>
              <p>
                Strengthen the UH Mānoa community by giving every student — whether
                they&apos;re looking for work, forming a study group, or hosting an event —{' '}
                <strong>one accessible, easy-to-use platform to connect.</strong>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}