import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";

const CustomToast = ({ title, body }) => {
    const [hovered, setHovered] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => setLocation({ latitude: coords.latitude, longitude: coords.longitude }),
                (error) => console.error("Error getting location:", error)
            );
        }
    }, []);

    const containerAnimation = useSpring({
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.08)",
        config: { tension: 250, friction: 25 },
    });

    return (
        <animated.div
            style={{
                ...containerAnimation,
                backgroundColor: "#AAAAAA",
                backdropFilter: "blur(10px)",
                borderRadius: "5px",
                color: "#ecf0f1",
                padding: "10px",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
                willChange: "box-shadow",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                width: "400px",
                maxWidth: "100vw",
                minHeight: "90px",
                top: "50px",
                right: "10px",
                zIndex: 9999,
                position: "relative",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                    src="https://res.cloudinary.com/dt2akiv9y/image/upload/v1743097602/unnamed_ewf2fc.webp"
                    alt="Website Logo"
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                />
                <div>
                    <div style={{ fontWeight: "600", fontSize: "20px", lineHeight: "1.4", color: "#fff" }}>
                        {title}
                    </div>
                    <div style={{ fontSize: "13px", marginTop: 6, color: "#ecf0f1", lineHeight: "1.6" }}>
                        {body}
                    </div>
                </div>
            </div>

            {/* Expandable content */}
            {location && (
                <div
                    style={{
                        overflow: "hidden",
                        maxHeight: hovered ? "400px" : "0px",
                        opacity: hovered ? 1 : 0,
                        marginTop: hovered ? "12px" : "0px",
                        transition: "all 0.5s ease",
                        width: "100%",
                        color: "#bdc3c7",
                    }}
                >
                    <div style={{ width: "100%", height: "240px", marginBottom: "14px" }}>
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ borderRadius: "6px", border: "none" }}
                            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=10&output=embed&markers=${location.latitude},${location.longitude}`}
                            allowFullScreen
                        />
                    </div>
                    <div>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                backgroundColor: "#f5f5f5",
                                color: "#3498db",
                                padding: "5px 12px",
                                borderRadius: "4px",
                                fontWeight: "500",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease, transform 0.2s ease",
                                fontSize: "12px",
                                gap: "6px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#e0e0e0";
                                e.target.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#f5f5f5";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            <i className="fas fa-directions" style={{ fontSize: "16px" }}></i>
                            <span>Đường đi</span>
                        </a>
                    </div>
                </div>
            )}
        </animated.div>
    );
};

export default CustomToast;