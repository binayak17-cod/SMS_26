import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css";

const API_BASE = "http://localhost:5000/api";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch captcha on component mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get(`${API_BASE}/captcha`, {
        withCredentials: true,
      });
      setCaptcha(response.data.captcha);
    } catch (err) {
      setError("Failed to load captcha. Please refresh.");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Verify captcha
      const captchaResponse = await axios.post(
        `${API_BASE}/verify-captcha`,
        { captcha: captchaInput },
        { withCredentials: true }
      );

      if (!captchaResponse.data.success) {
        throw new Error("Captcha verification failed");
      }

      // Step 2: If captcha is correct, verify ID and password
      const loginResponse = await axios.post(
        `${API_BASE}/login`,
        { id, password },
        { withCredentials: true }
      );

      if (loginResponse.data.success) {
        // Both captcha and credentials are correct - redirect directly
        setUser(loginResponse.data.id);
      } else {
        setError(loginResponse.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setCaptchaInput("");
      fetchCaptcha(); // Regenerate captcha on failure
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
      setUser(null);
      setId("");
      setPassword("");
      setCaptchaInput("");
      setError("");
      fetchCaptcha();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (user) {
    return (
      <div className="login-container">
        <div className="login-box dashboard">
          <h2>✅ Welcome to Dashboard</h2>
          <p>You are logged in as: <strong>{user}</strong></p>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="captcha">Captcha</label>
            <div className="captcha-section">
              <span className="captcha-box">{captcha}</span>
              <button
                type="button"
                onClick={fetchCaptcha}
                className="btn-small btn-refresh"
              >
                🔄 Refresh
              </button>
            </div>
            <input
              id="captcha"
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              placeholder="Enter the 4-character captcha"
              required
              maxLength="4"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-login">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
