import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!firstName || !lastName || !email || !password || !passwordAgain) {
            setError("Tüm alanları doldurmalısınız.");
            return;
        }

        if (password.length < 6) {
            setError("Şifre en az 6 karakter olmalıdır.");
            return;
        }

        if (password !== passwordAgain) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        try {
            setLoading(true);

            await register({
                firstName,
                lastName,
                email,
                password,
            });

            navigate("/login");
        } catch {
            setError("Kayıt sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Kayıt Ol</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">Ad</label>

                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Soyad</label>

                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">E-posta</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Şifre</label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="passwordAgain">Şifre Tekrar</label>

                    <input
                        id="passwordAgain"
                        type="password"
                        value={passwordAgain}
                        onChange={(event) => setPasswordAgain(event.target.value)}
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
                </button>
            </form>

            <p>
                Zaten hesabın var mı? <Link to="/login">Giriş yap</Link>
            </p>
        </main>
    );
}