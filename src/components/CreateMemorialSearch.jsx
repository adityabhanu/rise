import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignInSignUpPrompt from "./SignInSingUpPrompt";

const CreateMemorialSearch = () => {
  const [openPrompt, setOpenPrompt] = useState(true);
  const user = useSelector((state) => state.app.user);
  const isLoggedIn = useSelector((state) => state.app.loggedInStatus);
  return (
    <div style={{ marginTop: "64px" }}>
      {isLoggedIn ? (
        <div>Create Memorial Search</div>
      ) : (
        <SignInSignUpPrompt
          open={openPrompt}
          onClose={() => setOpenPrompt(false)}
        />
      )}
    </div>
  );
};

export default CreateMemorialSearch;
