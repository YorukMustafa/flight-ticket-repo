import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "../components/LanguageSwitcher";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { t } = useTranslation();

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

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password ||
            !passwordAgain
        ) {
            setError(t("auth.errors.allFieldsRequired"));
            return;
        }

        if (password.length < 6) {
            setError(t("auth.errors.passwordTooShort"));
            return;
        }

        if (password !== passwordAgain) {
            setError(t("auth.errors.passwordMismatch"));
            return;
        }

        try {
            setLoading(true);
            await register({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password,
            });
            navigate("/login", { replace: true });
        } catch {
            setError(t("auth.errors.registerFailed"));
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
                            {t("auth.registerTitle")}
                        </h1>
                        <p className="auth-subtitle">
                            {t("auth.registerSubtitle")}
                        </p>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="auth-row">
                                <div className="auth-field">
                                    <label
                                        className="auth-label"
                                        htmlFor="firstName"
                                    >
                                        {t("auth.firstName")}
                                    </label>
                                    <input
                                        className="auth-input"
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        autoComplete="given-name"
                                        onChange={(event) =>
                                            setFirstName(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="auth-field">
                                    <label
                                        className="auth-label"
                                        htmlFor="lastName"
                                    >
                                        {t("auth.lastName")}
                                    </label>
                                    <input
                                        className="auth-input"
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        autoComplete="family-name"
                                        onChange={(event) =>
                                            setLastName(event.target.value)
                                        }
                                    />
                                </div>
                            </div>

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

                            <div className="auth-row">
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
                                        autoComplete="new-password"
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="auth-field">
                                    <label
                                        className="auth-label"
                                        htmlFor="passwordAgain"
                                    >
                                        {t("auth.passwordAgain")}
                                    </label>
                                    <input
                                        className="auth-input"
                                        id="passwordAgain"
                                        type="password"
                                        value={passwordAgain}
                                        autoComplete="new-password"
                                        onChange={(event) =>
                                            setPasswordAgain(event.target.value)
                                        }
                                    />
                                </div>
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
                                    ? t("auth.registering")
                                    : t("auth.registerButton")}
                            </button>
                        </form>

                        <p className="auth-footer">
                            {t("auth.hasAccount")} {" "}
                            <Link className="auth-link" to="/login">
                                {t("auth.goToLogin")}
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
