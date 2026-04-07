import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Chip,
  CircularProgress
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Refresh,
  Login as LoginIcon,
  School,
  Person,
  Lock
} from "@mui/icons-material";
import "./Login.css";

const API_BASE = "http://localhost:5000/api";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      const captchaResponse = await axios.post(
        `${API_BASE}/verify-captcha`,
        { captcha: captchaInput },
        { withCredentials: true }
      );

      if (!captchaResponse.data.success) {
        throw new Error("Captcha verification failed");
      }

      const token = captchaResponse.data.temp_token;
      setCsrfToken(token);

      const loginResponse = await axios.post(
        `${API_BASE}/login`,
        { id, password, captcha: captchaInput, csrf_token: token },
        { 
          withCredentials: true,
          headers: {
            'X-CSRFToken': token
          }
        }
      );

      if (loginResponse.data.success) {
        const { dashboard, id: userId, role, name } = loginResponse.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name || userId);
        window.location.href = dashboard;
      } else {
        setError(loginResponse.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setCaptchaInput("");
      fetchCaptcha();
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={10} className="dashboard-paper">
            <Box textAlign="center" p={4}>
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <School sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
                <Typography variant="h4" color="primary" gutterBottom>
                  Welcome to Dashboard
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  You are logged in as: <strong>{user}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  size="large"
                >
                  Logout
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-wrapper"
      >
        <Paper elevation={20} className="modern-login-box">
          <Box display="flex" height="100%">
           
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="login-left-modern"
            >
              <Box className="login-left-content-modern">
                <motion.div
                 
                >
                  <School sx={{ fontSize: 80, color: 'white', mb: 2 }} />
                </motion.div>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  EDUNEXUS
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Streamline your educational institution
                </Typography>
              </Box>
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="login-right-modern"
            >
              <Box p={4}>
                <Typography variant="h4" component="h2" textAlign="center" sx={{ mb: 3, fontWeight: 'bold' }}>
                  LOGIN
                </Typography>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}

                <Box component="form" onSubmit={handleLogin}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <TextField
                      fullWidth
                      label="ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Chip
                        label={captcha}
                        variant="outlined"
                        sx={{ fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: 2 }}
                      />
                      <IconButton onClick={fetchCaptcha} color="primary">
                        <Refresh />
                      </IconButton>
                    </Box>
                    <TextField
                      fullWidth
                      label="Enter Captcha"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                      required
                      inputProps={{ maxLength: 4 }}
                      sx={{ mb: 3 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                      sx={{ py: 1.5, fontSize: '1.1rem' }}
                    >
                      {loading ? "Logging in..." : "LOGIN"}
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </div>
  );
}