import React, { useEffect, useState } from "react";
import { useLoginUserMutation, useSignupUserMutation } from "../services/api";
import { newToast } from "../services/toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const isLoggedIn = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const [signupUser, { isLoading: isLoadingSignup, error: errorSignup }] =
    useSignupUserMutation();
  const [loginUser, { isLoading: isLoadingLogin, error: errorLogin }] =
    useLoginUserMutation();

  const switchForm = (isLogin) => {
    setIsLogin(isLogin);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return newToast("Passwords do not match!", "red");
    // signup the user
    signupUser({ username, email, password }).then(({ data }) => {
      if (data) {
        newToast(data.message, "green");
        setIsLogin(true);
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // login the user
    loginUser({ username, password }).then(({ data }) => {
      if (data) {
        newToast(data.message, "green");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex justify-center items-center gap-10 bg-slate-800 rounded-lg p-4">
      <div className="bg-slate-900 p-4 rounded-lg h-[790px] w-[600px] flex flex-col items-center gap-7">
        {/* switch login / register */}
        <div className="flex items-center gap-4 justify-center h-full">
          <button
            onClick={() => switchForm(true)}
            className={`border w-32 h-10 rounded-md ${
              isLogin ? "bg-orange-500" : "hover:bg-slate-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchForm(false)}
            className={`border w-32 h-10 rounded-md ${
              !isLogin ? "bg-orange-500" : "hover:bg-slate-700"
            }`}
          >
            Register
          </button>
        </div>
        {/* show login or register */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <div>
              <p>username: test</p>
              <p>password: 123456</p>
            </div>

            {errorLogin && (
              <p className="text-red-500">
                {errorLogin.data?.message || errorLogin.data}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="p-1 rounded-md w-full"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="p-1 rounded-md w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="border py-2 w-full rounded-md bg-blue-800 border-blue-400 text-lg hover:bg-blue-400 hover:bg-border-800 transition-all duration-500"
              >
                {isLoadingLogin ? "Submitting..." : "Login"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-2 w-full">
            {errorSignup && (
              <p className="text-red-500">
                {errorSignup.data?.message || errorSignup.data}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="p-1 rounded-md w-full"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="p-1 rounded-md w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="p-1 rounded-md w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="p-1 rounded-md w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="border py-2 w-full rounded-md bg-blue-800 border-blue-400 text-lg hover:bg-blue-400 hover:bg-border-800 transition-all duration-500"
              >
                {isLoadingSignup ? "Signing you up..." : "Signup"}
              </button>
            </div>
          </form>
        )}
        <img
          src="https://img.freepik.com/free-photo/happy-teen-couple-holding-blank-speech-bubbles-purple-background_74952-2025.jpg?w=1380&t=st=1696000645~exp=1696001245~hmac=3c25597ce01b163a54587bba28a8eb04c23b416393a06cdd37c2ac1bd3599ca4"
          alt="img"
          className="h-[300px] w-full rounded-md"
        />
      </div>
    </div>
  );
}

export default Auth;
