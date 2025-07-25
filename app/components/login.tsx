import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    console.log("Component yüklendi.")

    const [form, setForm] = useState({
        UserName: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});//önemli

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormErrors((form) => ({ ...form, [name]: '' })); // Hata varsa temizle
    };

    const navigate = useNavigate();
    const errors: Record<string, string> = {};
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.UserName.trim().length < 11){
            errors.UserName = 'Username must be 11 characters.';
        }
        if (!/^\d+$/.test(form.UserName)) {
            errors.UserName = 'Username must consist of numbers only.';
        }
        if (!form.UserName || !form.password) {
            errors.password = "Username and password should not be left blank!";
        }
        if (form.password !== form.confirmPassword) {
            errors.password = "Passwords do not match!";
        }
        // Eğer hata varsa state'e yaz ve işlemi durdur
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        console.log("Login successful:", form);
        navigate("/home");
        return errors;
    };

    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setPassword(prev => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev)
    };

    return (
        <div className="page-wrapper bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
            <main className="bg-gray-100 min-h-screen py-10">
                <div className="text-center justify-center bg-gray-100">
                    <h2 className="text-2xl font-bold">LOGİN</h2>
                    <h1 className="text-gray-600 m-3">Welcome to the Payment Plan System</h1>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md  w-[440px] space-y-4">
                        {/* UserName Kısmı */}
                        <div className="space-y-2">
                            <label htmlFor="UserName" className="block text-sm font-medium text-black">User
                                Name</label>
                            <input
                                type="text"
                                name="UserName"
                                id="UserName"
                                value={form.UserName}
                                onChange={handleChange}
                                placeholder="T.C. Kimlik"
                                className="w-full p-2 border rounded"
                                onKeyDown={(e) => {
                                    const allowedKeys = [
                                        "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
                                    ];

                                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {formErrors.UserName && <p className="text-sm text-red-500">{formErrors.UserName}</p>}
                        </div>
                        {/* Password Kısmı */}
                        <div className="relative">
                            <label htmlFor="UserName" className="block text-sm py-2 font-medium text-black">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-11.5 text-sm text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {/* confirmPassword(Tekrar) */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Password (Repeat)</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-2 border rounded pr-10"
                            />
                            {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
                        </div>

                        {/* Şifremi Unuttum */}
                        <div className="text-right">
                            <a href="#" className="text-sm font-normal text-black hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        <button type="submit" className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">Log in</button>

                        <p className="text-center text-sm">
                            Create an account{" "}
                            <a href="#" className="text-black font-bold">Sign Up</a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};
