import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useActions } from "../../hooks/useActions";
import TransitionModal from "../ui/TransitionModal";

type TypeData = {
  isOpen: boolean;
  handleClose: () => void;
  setIsOpen: (open: boolean) => void;
};

const Auth: FC<TypeData> = ({ handleClose, isOpen, setIsOpen }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authType, setAuthType] = useState<"register" | "login">("login");
  const { register, login } = useActions();

  const handleRegister = () => {
    register({ email, username, password });
    setIsOpen(false);
    setEmail("");
    setPassword("");
    setUsername("");
  };
  const handleLogin = () => {
    login({ username, password });
    setIsOpen(false);
    setPassword("");
    setUsername("");
  };
  return (
    <div>
      <TransitionModal handleClose={handleClose} isOpen={isOpen}>
        <div className="bg-white rounded-xl pb-10 pt-5 px-10 text-center flex flex-col">
          <div className="ml-auto" onClick={handleClose}>
            <FaXmark />
          </div>
          <div className="mb-5 text-xl">
            {authType === "login" ? "Log in" : "Sign Up"}
          </div>
          <div className="flex flex-col gap-4">
            <TextField
              id="outlined-controlled"
              label="Name"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            {authType === "register" && (
              <TextField
                id="outlined-controlled"
                label="Email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
                type="email"
              />
            )}
            <TextField
              id="outlined-controlled"
              label="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
              type="password"
            />
          </div>
          <div className="mt-5">
            <Button
              variant="contained"
              className="w-full"
              onClick={() => {
                if (authType === "register") {
                  handleRegister();
                }
                if (authType === "login") {
                  handleLogin();
                }
              }}
            >
              Send
            </Button>
          </div>
          {authType === "login" ? (
            <div
              className="hover:cursor-pointer mt-5"
              onClick={() => setAuthType("register")}
            >
              Sign Up
            </div>
          ) : (
            <div
              className="hover:cursor-pointer mt-5"
              onClick={() => setAuthType("login")}
            >
              Log In
            </div>
          )}
        </div>
      </TransitionModal>
    </div>
  );
};

export default Auth;
