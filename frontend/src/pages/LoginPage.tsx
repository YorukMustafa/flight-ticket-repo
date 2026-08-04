import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("E-posta ve şifre zorunludur.");
            return;
        }

        try {
            setLoading(true);

            const user = await login({
                email,
                password,
            });

            if (user.role === "ROLE_ADMIN") {
                navigate("/admin");
            } else {
                navigate("/customer");
            }
        } catch {
            setError("Giriş sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Giriş Yap</h1>

            <form onSubmit={handleSubmit}>
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

                {error && <p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
            </form>

            <p>
                Hesabın yok mu? <Link to="/register">Kayıt ol</Link>
            </p>
        </main>
    );
}