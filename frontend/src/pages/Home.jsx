import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Welcome, {user?.name}! 🎬</h2>
        <p style={{ color: "#555" }}>You are logged in as: {user?.email}</p>
        <p style={{ color: "#888" }}>Movie listings coming in Phase 2...</p>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
  box: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "12px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Home;