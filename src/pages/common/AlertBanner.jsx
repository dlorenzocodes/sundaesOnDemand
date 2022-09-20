import Alert from "react-bootstrap/Alert";

function AlertBanner({ message, variant }) {
  const alertMessage = message || "An unexpected error occured.";
  const alertVariant = variant || "danger";

  return (
    <Alert
      variant={alertVariant}
      style={{ backgroundColor: "red" }}
      aria-label={alertMessage}
    >
      {alertMessage}
    </Alert>
  );
}

export default AlertBanner;
