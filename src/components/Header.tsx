'use client';

import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>예약 시스템</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>홈</Nav.Link>
            </Link>
            <Link href="/bookings" passHref legacyBehavior>
              <Nav.Link>내 예약</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;