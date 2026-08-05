import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "../components/LanguageSwitcher";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError(t("auth.errors.loginRequired"));
            return;
        }

        try {
            setLoading(true);
            const user = await login({ email: email.trim(), password });
            navigate(user.role === "ROLE_ADMIN" ? "/admin" : "/customer", {
                replace: true,
            });
        } catch {
            setError(t("auth.errors.loginFailed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <LanguageSwitcher variant="floating" />

            <section className="auth-container">
                <div className="auth-brand-panel">
                    <div className="auth-brand-content">
                        <div className="auth-plane-icon" aria-hidden="true">
                            ✈
                        </div>
                        <p className="auth-brand-name">
                            {t("common.appName")}
                        </p>
                        <h2 className="auth-brand-title">
                            {t("auth.welcomeTitle")}
                        </h2>
                        <p className="auth-brand-description">
                            {t("auth.welcomeDescription")}
                        </p>
                    </div>
                </div>

                <div className="auth-form-panel">
                    <div className="auth-form-wrapper">
                        <h1 className="auth-title">
                            {t("auth.loginTitle")}
                        </h1>
                        <p className="auth-subtitle">
                            {t("auth.loginSubtitle")}
                        </p>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label className="auth-label" htmlFor="email">
                                    {t("auth.email")}
                                </label>
                                <input
                                    className="auth-input"
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder={t("auth.emailPlaceholder")}
                                    autoComplete="email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>

                            <div className="auth-field">
                                <label
                                    className="auth-label"
                                    htmlFor="password"
                                >
                                    {t("auth.password")}
                                </label>
                                <input
                                    className="auth-input"
                                    id="password"
                                    type="password"
                                    value={password}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>

                            {error && (
                                <p className="auth-error" role="alert">
                                    {error}
                                </p>
                            )}

                            <button
                                className="auth-submit-button"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? t("auth.loggingIn")
                                    : t("auth.loginButton")}
                            </button>
                        </form>

                        <p className="auth-footer">
                            {t("auth.noAccount")} {" "}
                            <Link className="auth-link" to="/register">
                                {t("auth.goToRegister")}
                            </Link>
                        </p>

                        <p className="auth-demo-info">
                            {t("auth.demoAdmin")}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
