import { useSpring, animated } from "react-spring";

const Modal = ({ title, body, onClose }) => {
  const props = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.3)" },
    config: { tension: 350, friction: 20 },
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <animated.div
        style={{
          ...props,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "30px",
          width: "500px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: 600 }}>
          {title}
        </h2>
        <p style={{ marginBottom: "30px", fontSize: "16px", color: "#555" }}>
          {body}
        </p>
        <button
          onClick={onClose}
          style={{
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease",
            backgroundColor: "#d9534f",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Close
        </button>
      </animated.div>
    </div>
  );
};

export default Modal;
