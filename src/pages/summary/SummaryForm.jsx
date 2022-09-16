import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);

  const popOver = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popOver}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleCheckBox = () => setIsChecked((prevState) => !prevState);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckBox}
          label={checkboxLabel}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm;
