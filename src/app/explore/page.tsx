'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import {
  BookmarkFill,
  CalendarEvent,
  EyeFill,
  Fire,
  GeoAltFill,
  HeartFill,
  LockFill,
  StarFill,
  TagFill,
} from 'react-bootstrap-icons';

type Flyer = {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  views: number;
  likes: number;
  saves: number;
  image?: string;
};

const flyers: Flyer[] = [
  {
    id: 1,
    title: 'Study Group',
    category: 'Study Group',
    description: 'Biology, Chemistry, Physics',
    date: 'Mondays at 3 PM',
    location: 'Keller 310, Honolulu, HI',
    views: 128,
    likes: 42,
    saves: 18,
  },
  {
    id: 2,
    title: 'Part-Time Clerical Position',
    category: 'Job',
    description: 'Student Assistants',
    date: 'Open Now',
    location: 'UH Registration Office',
    views: 245,
    likes: 86,
    saves: 32,
  },
  {
    id: 3,
    title: 'Professor Moore Appreciation Day',
    category: 'Event',
    description: 'Celebrate Professor Moore with classmates.',
    date: 'Apr 4, 2025',
    location: 'trantom@hawaii.edu',
    views: 307,
    likes: 96,
    saves: 57,
  },
  {
    id: 4,
    title: 'Volunteer Opportunity',
    category: 'Volunteer',
    description: 'Help with campus service projects.',
    date: 'Wednesdays, 2 PM',
    location: 'Various Locations',
    views: 189,
    likes: 63,
    saves: 21,
  },
  {
    id: 5,
    title: 'Public Assistant',
    category: 'Job',
    description: 'Registration Office Room 386',
    date: 'Hiring Now',
    location: 'Honolulu, HI',
    views: 198,
    likes: 74,
    saves: 27,
  },
  {
    id: 6,
    title: 'Picnic at the Park!',
    category: 'Event',
    description: 'Come relax, eat, and meet other students.',
    date: 'April 27',
    location: 'Kapiolani Park',
    views: 422,
    likes: 132,
    saves: 61,
    image: '/picnic.png',
  },
];

const trending = [
  { title: 'Campus Club Fair 2025', views: 512, likes: 128 },
  { title: 'Spring Internship Fair', views: 476, likes: 102 },
  { title: 'Study Abroad Info Session', views: 389, likes: 89 },
];

const popular = [
  { title: 'Volunteer Opportunity', views: 189, likes: 63 },
  { title: 'Job Fair – April 12', views: 341, likes: 95 },
  { title: 'Yoga on the Lawn', views: 267, likes: 78 },
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'liked'>('all');
  const [search, setSearch] = useState('');

  const [category, setCategory] = useState('All Categories');
  const [datePosted, setDatePosted] = useState('Anytime');
  const [sortBy, setSortBy] = useState('Most Recent');

  const [draftCategory, setDraftCategory] = useState('All Categories');
  const [draftDatePosted, setDraftDatePosted] = useState('Anytime');
  const [draftSortBy, setDraftSortBy] = useState('Most Recent');

  const [currentPage, setCurrentPage] = useState(1);
  const [flyersPerPage, setFlyersPerPage] = useState(8);

  useEffect(() => {
    const updateFlyersPerPage = () => {
      setFlyersPerPage(window.innerWidth <= 768 ? 4 : 8);
    };

    updateFlyersPerPage();
    window.addEventListener('resize', updateFlyersPerPage);

    return () => window.removeEventListener('resize', updateFlyersPerPage);
  }, []);

  const filteredFlyers = useMemo(() => {
    let results = flyers.filter((flyer) => {
      const matchesSearch =
        flyer.title.toLowerCase().includes(search.toLowerCase()) ||
        flyer.category.toLowerCase().includes(search.toLowerCase()) ||
        flyer.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All Categories' || flyer.category === category;

      return matchesSearch && matchesCategory;
    });

    if (activeTab === 'recent' || sortBy === 'Most Recent') {
      results = [...results].sort((a, b) => b.id - a.id);
    }

    if (activeTab === 'liked' || sortBy === 'Most Liked') {
      results = [...results].sort((a, b) => b.likes - a.likes);
    }

    if (sortBy === 'Most Viewed') {
      results = [...results].sort((a, b) => b.views - a.views);
    }

    return results;
  }, [search, category, sortBy, activeTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFlyers.length / flyersPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * flyersPerPage;
  const endIndex = startIndex + flyersPerPage;
  const currentFlyers = filteredFlyers.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const applyFilters = () => {
    setCategory(draftCategory);
    setDatePosted(draftDatePosted);
    setSortBy(draftSortBy);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All Categories');
    setDatePosted('Anytime');
    setSortBy('Most Recent');

    setDraftCategory('All Categories');
    setDraftDatePosted('Anytime');
    setDraftSortBy('Most Recent');

    setActiveTab('all');
    setCurrentPage(1);
  };

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <Container>
          <h1>Browse Bulletins</h1>
          <p className="hero-subtitle">Discover what&apos;s happening on campus and beyond.</p>
        </Container>
      </section>

      <Container fluid className="explore-content px-4 py-4">
        <Row className="g-4">
          <Col lg={9}>
            <div className="d-flex justify-content-end mb-2">
              <button type="button" className="clear-link" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <Card className="filter-panel">
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                  >
                    <option>All Categories</option>
                    <option>Job</option>
                    <option>Internship</option>
                    <option>Event</option>
                    <option>Study Group</option>
                    <option>Volunteer</option>
                  </Form.Select>
                </Col>

                <Col md={4}>
                  <Form.Label>Date Posted</Form.Label>
                  <Form.Select
                    value={draftDatePosted}
                    onChange={(e) => setDraftDatePosted(e.target.value)}
                  >
                    <option>Anytime</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={draftSortBy}
                    onChange={(e) => setDraftSortBy(e.target.value)}
                  >
                    <option>Most Recent</option>
                    <option>Most Liked</option>
                    <option>Most Viewed</option>
                  </Form.Select>
                </Col>

                <Col md={1}>
                  <Button className="apply-filter-btn" onClick={applyFilters}>
                    Apply
                  </Button>
                </Col>
              </Row>
            </Card>

            <div className="explore-tabs">
              <button
                type="button"
                className={activeTab === 'all' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('all');
                  setCurrentPage(1);
                }}
              >
                All Flyers
              </button>

              <button
                type="button"
                className={activeTab === 'recent' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('recent');
                  setCurrentPage(1);
                }}
              >
                <CalendarEvent /> Most Recent
              </button>

              <button
                type="button"
                className={activeTab === 'liked' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('liked');
                  setCurrentPage(1);
                }}
              >
                <HeartFill /> Most Liked
              </button>
            </div>

            <Row className="g-4">
              {currentFlyers.map((flyer) => (
                <Col md={6} xl={3} key={flyer.id}>
                  <Link href={`/flyers/${flyer.id}`} className="flyer-link">
                    <Card className="flyer-card">
                      <div className="flyer-pin" />

                      <Card.Body>
                        <Badge className="flyer-category">
                          <TagFill className="me-1" />
                          {flyer.category}
                        </Badge>

                        <h3>{flyer.title}</h3>
                        <p>{flyer.description}</p>

                        <div className="flyer-detail">
                          <CalendarEvent />
                          <span>{flyer.date}</span>
                        </div>

                        <div className="flyer-detail">
                          <GeoAltFill />
                          <span>{flyer.location}</span>
                        </div>
                      </Card.Body>

                      <div className="flyer-stats">
                        <span><EyeFill /> {flyer.views}</span>
                        <span><HeartFill /> {flyer.likes}</span>
                        <span><BookmarkFill /> {flyer.saves}</span>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="w-100 d-flex justify-content-center">
                <div className="explore-pagination">
                  <Button
                    className="page-nav-btn"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </Button>

                  <Button className="active">
                    {currentPage}
                  </Button>

                  {currentPage < totalPages && (
                    <Button className="ellipsis">...</Button>
                  )}

                  <Button
                    className="page-nav-btn"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </Button>
                </div>
              </div>
            )}
          </Col>

          <Col lg={3}>
            <aside className="explore-sidebar">
<Card className="sidebar-card light-card campus-board-card">
  <Card.Body>
    <h4 className="campus-board-title">Why Bow-lletins?</h4>
    <p className="campus-board-subtitle">
      A cleaner way to find what is usually lost on crowded campus boards.
    </p>

    <Carousel indicators controls={false} interval={3500}>
      <Carousel.Item>
        <div className="campus-slide">
          <div className="campus-slide-image board-one" />
          <h5>Crowded Boards</h5>
          <p>Campus flyers can get buried, covered, or missed completely.</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="campus-slide">
          <div className="campus-slide-image board-two" />
          <h5>Hard to Search</h5>
          <p>Students should not have to walk around campus to find opportunities.</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="campus-slide">
          <div className="campus-slide-image board-three" />
          <h5>All in One Place</h5>
          <p>Bow-lletins makes flyers easier to browse, filter, and discover.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  </Card.Body>
</Card>

              <Card className="signup-unlock-card">
                <Card.Body>
                  <LockFill className="lock-icon" />
                  <h4>Sign up to unlock full features!</h4>
                  <p>
                    Saved flyers, RSVPs, comments, and reactions are only available
                    to registered users.
                  </p>
                  <Link href="/auth/signup">
                    <Button>Sign Up Now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </aside>
          </Col>
        </Row>
      </Container>
    </main>
  );
}