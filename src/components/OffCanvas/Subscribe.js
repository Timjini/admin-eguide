import Logout from "../../Authentication/Logout";

const Subscribe = () => {
    return (
              <><div
            className="overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                backdropFilter: "blur(5px)", // Blurred background effect
                zIndex: 9998, // Slightly below the popup
            }}
        ></div><div
            className="popup"
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                zIndex: 9999, // Above the overlay
            }}
        >
                <p>Please check your subscription. Your agency is currently inactive.</p>
                <Logout />
            </div></>
          );
        }
export default Subscribe;
