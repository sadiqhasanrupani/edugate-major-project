import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const BackButton = ({ onClick }) => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const [hover, setHover] = React.useState(false);

  const colors = {
    light: {
      bg: "#7958fde6",
      hoverBg: "#8668FD",
      border: "#7958fd",
      text: "white",
      shadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    dark: {
      bg: "#3A3D42",
      hoverBg: "#4A4D52",
      text: "#E6E6E6",
      border: "none",
      shadow: "0px 3px 10px 3px rgba(0, 0, 0, 0.265)",
    },
  };

  const theme = isDarkMode ? colors.dark : colors.light;

  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
    },
    button: {
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : "none",
      borderRadius: "50%",
      width: "42px",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: theme.text,
      transition: "all 0.2s ease-in-out",
      boxShadow: hover ? theme.shadow : "none",
    },
    icon: {
      width: "20px",
      height: "20px",
      stroke: theme.text,
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.button,
          backgroundColor: hover ? theme.hoverBg : theme.bg,
        }}
        onClick={onClick || (() => navigate(-1))}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={styles.icon}
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </button>
    </div>
  );
};
