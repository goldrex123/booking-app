'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('회원가입에 성공했습니다. 이제 로그인해주세요.');
      setIsRegistering(false);
      setName("");
      setEmail("");
      setPassword("");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container fluid className="p-0 m-0">
      <Row className="vh-100 g-0">
        <Col md={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <Card style={{ width: '24rem' }} className="shadow">
            <Card.Body className="p-5">
              <Card.Title as="h2" className="text-center mb-4">
                {isRegistering ? '회원가입' : '로그인'}
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
                {isRegistering && (
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}
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
                    {isRegistering ? '회원가입' : '로그인'}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
                </Button>
              </div>
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
