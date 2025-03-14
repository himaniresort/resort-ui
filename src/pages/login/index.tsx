import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      router.push("/login");
    } else {
      fetch("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 403) {
            setIsLoggedIn(false);
            throw new Error("Something went wrong"); 
          }
          else {
            router.push("/admin");
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          router.push("/login") 
        });
    }
  }, []);

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    try {
      if (res.ok) {
        setError(null);
        localStorage.setItem("token", data.token);
        router.push("/admin");
      } else if (res.status === 400) {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    !isLoggedIn &&
    <Box
      sx={{ flexGrow: 1, p: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* Login Modal */}
      <Modal open>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Admin Login
          </Typography>
          <TextField
            error={!!error}
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            error={!!error}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={error}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Login;
