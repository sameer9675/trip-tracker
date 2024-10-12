import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate(); // previously used as useHistory

  {
    /**
     * -1 -> indicate we have go one step back
     *
     * event.preventDefault -> its needed because this button is inside the form element (for Form component) -> on button click it will trigger form submitted that cause page to be re leaod
     *
     */
  }

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
