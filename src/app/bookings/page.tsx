'use client';

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

const BookingsPage = () => {
  return (
    <div>
      <h1>예약하기</h1>
      <p>예약을 원하는 자원 종류를 선택해주세요.</p>

      <Row xs={1} md={2} className="g-4 mt-4">
        <Col>
          <Link href="/bookings/rooms" passHref style={{ textDecoration: 'none' }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>부속실 예약</Card.Title>
                <Card.Text>
                  회의실, 휴게실 등 부속실을 예약합니다.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link href="/bookings/vehicles" passHref style={{ textDecoration: 'none' }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>차량 예약</Card.Title>
                <Card.Text>
                  업무용 차량을 예약합니다.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default BookingsPage;
