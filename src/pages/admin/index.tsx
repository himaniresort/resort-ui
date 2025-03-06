import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function Admin() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 403) throw new Error("Something went wrong");
          else setIsLoggedIn(true);
        })
        .catch(() => router.push("/login"));
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="3rem" />
        </Box>
      )}
    </>
  );
}
