import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CustomerDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <main>
            <h1>Müşteri Paneli</h1>

            <p>Hoş geldin, {user?.email}</p>

            <p>Uçuş listeleme işlemleri Aşama 2'de eklenecektir.</p>

            <button type="button" onClick={handleLogout}>
                Çıkış Yap
            </button>
        </main>
    );
}