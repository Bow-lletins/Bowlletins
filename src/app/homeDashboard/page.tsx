'use client';
import {Container, Row, Col, Nav, Image} from 'react-bootstrap';


const BoardPage = () => {
    return (
        <Container fluid className="dashboard-layout-bg">
            <Row>
                <Col md={3} lg = {2}        className="sidebar-column">
                    <SidebarContent />
                </Col>
                <Col md={9} lg = {10} className="main-column">
                    <MainFeed />
                    
                </Col>
            </Row>
        </Container>
    );
};

const SidebarContent: React.FC = () => {
  return (
    <div className="py-4 px-3 d-flex flex-column h-100">
      {/* Profile Section */}
      <div className="text-center mb-5">
        <Image 
          src="https://via.placeholder.com/120" 
          rounded 
          className="profile-avatar mb-3 shadow-sm" 
        />
        <h5 className="fw-bold m-0">Tamela Brinson</h5>
        <p className="text-muted small">Marketing Major</p>
      </div>

      {/* Navigation */}
      <Nav variant = "tabs" className="flex-column nav-pills custom-nav">
        <Nav.Item className="nav-item">
            <Nav.Link href="#">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="#" className="nav-item active">Saved Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="#" className="nav-item">Recently Viewed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="#">Messages</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="#">Settings</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

const MainFeed: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="welcome-heading mb-5">Welcome back, Tamela!</h1>
      
      <section>
        <h3 className="section-subtitle mb-4">Saved Posts</h3>
        
        {/* Paper Item 1 */}
        <div className="post-card d-flex align-items-center p-3 mb-3 shadow-sm">
          <div className="post-icon me-3">📔</div>
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-0">Part-Time Library Assistant</h6>
            <small className="text-muted">Hamilton Library • 2 hrs ago</small>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardPage;        
