import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useLoginMutation } from "../redux/api/auth/authApi";
import { setName, setPassword } from "../redux/features/loginSlice";
import { setToken } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, password } = useAppSelector((state: RootState) => state.login);

  const { token } = useAppSelector((state: RootState) => state.user);

  // console.log("token", token);

  const [login, { data }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await login({ username: name, password });

    const { token } = data?.data;

    const user = jwtDecode(token);

    console.log("token", token, "user:", user);
    dispatch(setToken(token));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 via-red-700 to-green-600">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-red-700">
          Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              User name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-red-700 hover:text-red-500"
              >
                New here? Register now
              </Link>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-red-700 hover:text-red-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
