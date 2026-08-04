import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
    return (
        <main>
            <h1>Yetkisiz Erişim</h1>

            <p>Bu sayfaya erişmek için gerekli yetkiye sahip değilsiniz.</p>

            <Link to="/customer">Müşteri paneline dön</Link>
        </main>
    );
}