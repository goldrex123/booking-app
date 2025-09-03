'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Col, Row, Spinner, Alert, Button } from 'react-bootstrap';
import BookingModal from '@/components/BookingModal';
import BookingCalendar from '@/components/BookingCalendar';

// Type definitions
interface Resource {
  id: number;
  name: string;
}
interface Room extends Resource {
  description: string;
  capacity: number;
}

interface Booking {
  id: number;
  resource_name: string;
  start_time: string;
  end_time: string;
}

const BookingsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (resource: Resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  // Data fetching
  const fetchAllData = useCallback(async () => {
    try {
      const [resourcesRes, bookingsRes] = await Promise.all([
        fetch('/api/resources'),
        fetch('/api/bookings'),
      ]);

      if (!resourcesRes.ok || !bookingsRes.ok) {
        throw new Error('데이터를 불러오는 데 실패했습니다.');
      }

      const resourcesData = await resourcesRes.json();
      const bookingsData = await bookingsRes.json();

      const roomBookings = bookingsData.filter((booking: Booking) => 
        resourcesData.rooms.some((room: Room) => room.name === booking.resource_name)
      );

      setRooms(resourcesData.rooms);
      setBookings(roomBookings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAllData();
  }, [fetchAllData]);

  const handleBookingSuccess = () => {
    fetchAllData();
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">오류: {error}</Alert>;
  }

  return (
    <div>
      <h1>부속실 예약</h1>
      <p>예약을 원하는 부속실을 선택해주세요.</p>
      
      <h2 className="mt-4">부속실 목록</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {rooms.map((room) => (
          <Col key={room.id}>
            <Card>
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>
                  {room.description} (최대 {room.capacity}인)
                </Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(room)}>
                  예약하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5">부속실 예약 현황</h2>
      <BookingCalendar bookings={bookings} />

      <BookingModal
        show={showModal}
        onHide={handleCloseModal}
        resource={selectedResource}
        resourceType="room"
        onBookingSuccess={handleBookingSuccess}
        mode="create"
      />
    </div>
  );
};

export default BookingsPage;