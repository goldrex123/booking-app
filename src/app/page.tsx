'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <ProtectedRoute>
      <Container>
        <div className="p-5 mb-4 bg-light rounded-3">
          <Container fluid className="py-5">
            <h1 className="display-5 fw-bold">환영합니다!</h1>
            <p className="col-md-8 fs-4">
              부속실 및 차량 예약 시스템입니다. 아래에서 원하시는 서비스를 선택해주세요.
            </p>
          </Container>
        </div>
        <Row className="align-items-md-stretch">
          <Col md={6}>
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>부속실 예약</h2>
              <p>회의실, 접견실 등 부속실을 예약합니다.</p>
              <Link href="/bookings/rooms" passHref legacyBehavior>
                <Button variant="outline-light">예약하기</Button>
              </Link>
            </div>
          </Col>
          <Col md={6}>
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>차량 예약</h2>
              <p>업무용 차량을 예약합니다.</p>
              <Link href="/bookings/vehicles" passHref legacyBehavior>
                <Button variant="outline-secondary">예약하기</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>
  );
}
