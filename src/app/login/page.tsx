'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just call login without validation
    login();
  };

  return (
    <Container fluid className="p-0 m-0">
      <Row className="vh-100 g-0">
        <Col md={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <Card style={{ width: '24rem' }} className="shadow">
            <Card.Body className="p-5">
              <Card.Title as="h2" className="text-center mb-4">로그인</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    로그인
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <style jsx global>{`
        .bg-image {
          background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </Container>
  );
}
