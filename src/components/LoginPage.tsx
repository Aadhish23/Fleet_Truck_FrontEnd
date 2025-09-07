import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
// Default credentials for demo
function LoginPage() {
  const [email, setEmail] = useState('aa@gmail.com');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
    const [regName, setRegName] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('fleetToken');
    if (token) {
      const parsedToken = JSON.parse(token); // 👈 Parse it back
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Login failed');
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // ✅ Use localStorage
      localStorage.setItem('fleetToken', JSON.stringify(data.token));
      sessionStorage.removeItem('fleetToken'); // clean up

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">🚛 Fleet Manager Login</CardTitle>
        </CardHeader>
        <CardContent>
          {!registerMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => {
                setRegisterMode(true);
                setRegEmail("");
                setRegPassword("");
                setRegError("");
                setRegSuccess("");
              }}>
                Register New User
              </Button>
            </form>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setRegError('');
              setRegSuccess('');
              try {
                const res = await fetch('/api/auth/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
                });
                if (!res.ok) {
                  const text = await res.text();
                  throw new Error(text || 'Registration failed');
                }
                const data = await res.json();
                if (!data.success) throw new Error(data.message);
                setRegSuccess('Registration successful! Logging you in...');
                setEmail(regEmail);
                setPassword(regPassword);
                setRegisterMode(false);
              } catch (err: any) {
                setRegError(err.message);
              }
            }} className="space-y-6">
                        <Input
                          type="text"
                          placeholder="Name"
                          value={regName}
                          onChange={e => setRegName(e.target.value)}
                          required
                          autoFocus
                        />
              <Input
                  type="email"
                  placeholder="New Email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  required
              />
              <Input
                type="password"
                placeholder="New Password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                Register
              </Button>
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setRegisterMode(false)}>
                Back to Login
              </Button>
              {regError && <div className="text-red-500 text-sm mt-2">{regError}</div>}
              {regSuccess && <div className="text-green-500 text-sm mt-2">{regSuccess}</div>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;