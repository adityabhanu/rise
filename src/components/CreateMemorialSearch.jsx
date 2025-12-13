import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignInSignUpPrompt from "./SignInSingUpPrompt";
import AddMemorialStep1 from "./Memorial/AddMemorialStep1";

const CreateMemorialSearch = () => {
  const [openPrompt, setOpenPrompt] = useState(true);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.loggedInStatus);
  return (
    <div style={{ marginTop: "64px" }}>
      {isLoggedIn ? (
        <AddMemorialStep1 />
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
