import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import {DarkModeToggle} from "../components/DarkModeToggle";

export default function Login() {
    const { darkMode, setDarkMode } = useDarkMode();
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();
    const errors: Record<string, string> = {};
    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        UserName: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.UserName.trim().length < 11) {
            errors.UserName = "Username must be 11 characters.";
        }
        if (!/^\d+$/.test(form.UserName)) {
            errors.UserName = "Username must consist of numbers only.";
        }
        if (!form.UserName || !form.password) {
            errors.password = "Username and password should not be left blank!";
        }
        if (form.password !== form.confirmPassword) {
            errors.password = "Passwords do not match!";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log("Login successful:", form);
        navigate("/payment");
    };

    const togglePasswordVisibility = () => setPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex items-center justify-center">
            {/* DARK MODE TOGGLE BUTONU */}
            <DarkModeToggle></DarkModeToggle>

            <div>
                <div className="text-center py-5">
                    <h2 className="text-5xl font-bold">LOGIN</h2>
                    <h1 className="mt-3">Welcome to the Payment Plan System</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex divide-x divide-gray-300 dark:divide-gray-600 w-[800px]">
                    {/* Sol taraf */}
                    <form onSubmit={handleSubmit} className="w-1/2 p-8 space-y-4">
                        {/* UserName */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF00FF]">
                                <IoPersonOutline />
                            </span>
                            <input
                                type="text"
                                name="UserName"
                                value={form.UserName}
                                onChange={handleChange}
                                placeholder="Your ID Number"
                                className="w-full p-2 border rounded pl-10 bg-white dark:bg-gray-700 dark:text-white"
                                onKeyDown={(e) => {
                                    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {formErrors.UserName && <p className="text-sm text-red-400">{formErrors.UserName}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF00FF]">
                                <IoIosLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded pr-10 pl-10 bg-white dark:bg-gray-700 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-2 text-sm text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Repeat Password */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF00FF]">
                                <IoIosUnlock />
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Repeat Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-2 border rounded pr-10 pl-10 bg-white dark:bg-gray-700 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-2 text-sm text-gray-500"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                            {formErrors.password && <p className="text-sm text-red-400">{formErrors.password}</p>}
                        </div>

                        <div className="flex justify-between text-sm">
                            <label>
                                <input type="checkbox" className="mr-2" /> Remember me
                            </label>
                            <Link to="/forgotPassword" className="text-black dark:text-white hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="bg-black dark:bg-purple-600 text-white w-full py-2 rounded hover:bg-gray-800 dark:hover:bg-purple-700"
                        >
                            Log in
                        </button>

                        <p className="text-center text-sm">
                            Create an account{" "}
                            <Link to="/signUp" className="text-black dark:text-purple-300 font-bold">
                                Sign Up
                            </Link>
                        </p>
                    </form>

                    {/* "or" bölümü */}
                    <div className="flex items-center justify-center w-px bg-gray-300 dark:bg-gray-600 relative">
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-black dark:text-white">
                            or
                        </span>
                    </div>

                    {/* Sağ taraf - sosyal medya */}
                    <div className="w-1/2 p-8 flex flex-col justify-center space-y-4">
                        <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>
                        <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                            <img src="public/icons8-apple-500.svg" alt="Apple" className="w-5 h-5 mr-2" />
                            Continue with Apple
                        </button>
                        <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                            <img src="public/icons8-facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                            Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
