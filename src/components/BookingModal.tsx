'use client';

import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

interface Resource {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  resource_name: string;
  start_time: string;
  end_time: string;
}

interface BookingModalProps {
  show: boolean;
  onHide: () => void;
  resource?: Resource | null;
  resourceType?: 'room' | 'vehicle' | null;
  onBookingSuccess?: () => void;
  booking?: Booking | null;
  mode: 'create' | 'details';
}

const BookingModal = ({ show, onHide, resource, resourceType, onBookingSuccess, booking, mode }: BookingModalProps) => {
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    if (!resource || !startTime || !endTime) {
      setError('모든 정보를 입력해주세요.');
      return;
    }
    if (startTime >= endTime) {
      setError('종료 시간은 시작 시간보다 나중이어야 합니다.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceType,
          resourceId: resource.id,
          startTime,
          endTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '예약에 실패했습니다.');
      }

      alert('예약이 성공적으로 완료되었습니다!');
      onBookingSuccess(); // Notify parent component
      onHide(); // Close the modal on success
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOnHide = () => {
    setError(null);
    setIsSubmitting(false);
    onHide();
  }

  return (
    <Modal show={show} onHide={handleOnHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'create' && resource ? `'${resource.name}' 예약` : '예약 상세 정보'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {mode === 'create' ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>시작 시간</Form.Label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd, h:mm aa"
                className="form-control"
                locale="ko"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>종료 시간</Form.Label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd, h:mm aa"
                className="form-control"
                locale="ko"
              />
            </Form.Group>
          </Form>
        ) : (
          booking && (
            <div>
              <p><strong>자원:</strong> {booking.resource_name}</p>
              <p><strong>시작 시간:</strong> {new Date(booking.start_time).toLocaleString()}</p>
              <p><strong>종료 시간:</strong> {new Date(booking.end_time).toLocaleString()}</p>
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        {mode === 'create' ? (
          <>
            <Button variant="secondary" onClick={handleOnHide} disabled={isSubmitting}>
              취소
            </Button>
            <Button variant="primary" onClick={handleBooking} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {' '}
                  예약 중...
                </>
              ) : (
                '예약 확정'
              )}
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={handleOnHide}>
            닫기
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
