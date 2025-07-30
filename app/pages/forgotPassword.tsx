import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
// import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import {DarkModeToggle} from "~/components/DarkModeToggle";
export default function ForgotPassword() {

    const [form, setForm] = useState({
        email: "",
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    // const navigation = useNavigate();
    const { darkMode, setDarkMode } = useDarkMode();

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
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log("Registration successful:", form);
        // navigation("/dashbord")
        // yönlendirme işlemi yapılabilir
    };

    return (
        <div className="page-wrapper">
            <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex items-center justify-center">
                {/* DARK MODE TOGGLE BUTONU */}
                <DarkModeToggle></DarkModeToggle>

                <div>
                    <div className="text-center justify-center py-10">
                        <h2 className="text-5xl font-bold">Forgot Password</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-[800px] flex divide-x divide-gray-300 dark:divide-gray-600">
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
