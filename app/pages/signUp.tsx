import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
// import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import {DarkModeToggle} from "~/components/DarkModeToggle";
export default function SignUp() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { darkMode, setDarkMode } = useDarkMode();
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const navigation = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!form.email.includes("@")) {
            errors.email = "Please enter a valid email address.";
        }
        if (form.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
        }
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log("Registration successful:", form);
        // navigation("/dashbord")
        // yönlendirme işlemi yapılabilir
    };

    return (
        <div className="page-wrapper ">
            {/* DARK MODE TOGGLE BUTONU */}
            <DarkModeToggle></DarkModeToggle>

            <main className="min-h-screen dark:bg-gray-900 text-black dark:text-white bg-gray-100 flex items-center justify-center">

                <div>
                    <div className="text-center justify-center py-10">
                        <h2 className="text-5xl font-bold">Sign Up</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-[800px] flex divide-x divide-gray-300  dark:divide-gray-600">
                        {/* Sol taraf - eposta ile kayıt */}
                        <form onSubmit={handleSubmit} className="w-1/2 p-8 space-y-4">
                            {/* Email */}
                            <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF00FF]">
                            <IoMailOutline />
                        </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full p-2 pl-10 border rounded dark:bg-gray-700 dark:text-white"
                                />
                                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
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
                                    className="w-full p-2 pr-10 pl-10 border rounded dark:bg-gray-700 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-2 text-sm text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF00FF]">
                            <IoIosUnlock />
                        </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 pr-10 pl-10 border rounded dark:bg-gray-700 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-2 text-sm text-gray-500"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                                {formErrors.confirmPassword && <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className="w-full py-2 bg-black dark:bg-purple-600 text-white rounded hover:bg-gray-800 dark:hover:bg-purple-700">
                                Create Account
                            </button>

                            <p className="text-center text-sm">
                                Already have an account? <Link to="/" className="font-bold dark:text-purple-300">Log in</Link>{/*login sayfasına geçer.*/}
                            </p>
                        </form>

                        {/* Or Part*/}
                        <div className="flex items-center justify-center w-px bg-gray-300 dark:bg-gray-600 relative">
                            <span className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-black dark:text-white">or</span>
                        </div>

                        {/* Sağ taraf - sosyal hesaplar */}
                        <div className="w-1/2 p-8 flex flex-col justify-center space-y-4">
                            <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                                Sign up with Google
                            </button>
                            <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                                <img src="../../public/icons8-apple-500.svg" alt="Apple" className="w-5 h-5 mr-2" />
                                Sign up with Apple
                            </button>
                            <button className="flex items-center justify-center border p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                                <img src="../../public/icons8-facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                                Sign up with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
