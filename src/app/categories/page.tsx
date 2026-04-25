import Link from 'next/link';
import { Container, Row, Col, Card } from 'react-bootstrap';

const categories = [
  { label: 'Jobs', slug: 'Jobs' },
  { label: 'Internships', slug: 'Internships' },
  { label: 'Volunteer', slug: 'Volunteer' },
  { label: 'Events', slug: 'Events' },
  { label: 'Academics', slug: 'Academics' },
  { label: 'Social', slug: 'Social' },
  { label: 'Clubs & Organizations', slug: 'Clubs_Organizations' },
];

export default function CategoriesPage() {
  return (
    <main className="category-page">
      <Container className="py-5">
        <div className="category-header">
          <h1 className="category-title">Categories</h1>
          <p className="category-subtitle">Browse flyers by category</p>
        </div>
        <Row className="g-4 mt-2">
          {categories.map(({ label, slug }) => (
            <Col key={slug} xs={12} sm={6} md={4} lg={3}>
              <Link href={`/categories/${slug}`} className="flyer-link">
                <Card className="flyer-card text-center py-4">
                  <Card.Body>
                    <h5 className="mb-0">{label}</h5>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}
