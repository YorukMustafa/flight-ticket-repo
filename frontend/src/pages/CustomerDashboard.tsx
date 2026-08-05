import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/*
 * CustomerDashboard, ROLE_CUSTOMER yetkisine sahip kullanıcıların
 * giriş yaptıktan sonra göreceği ana ekrandır.
 *
 * Bu sayfa Aşama 1 kapsamında temel bir iskelet olarak hazırlanmıştır.
 *
 * İlerleyen aşamalarda buraya;
 *
 * - Uçuş listeleme
 * - Bilet satın alma
 * - Rezervasyon görüntüleme
 * - Profil işlemleri
 *
 * gibi müşteri işlemleri eklenecektir.
 */
export default function CustomerDashboard() {

    /*
     * React Router'ın yönlendirme hookudur.
     *
     * Logout işlemi tamamlandıktan sonra
     * kullanıcı Login sayfasına yönlendirilir.
     */
    const navigate = useNavigate();

    /*
     * AuthContext içerisindeki
     *
     * user
     * logout()
     *
     * bilgilerine erişiyoruz.
     *
     * user:
     * Giriş yapan müşterinin bilgilerini içerir.
     *
     * logout():
     * Oturumu sonlandırır.
     */
    const { user, logout } = useAuth();

    /*
     * Kullanıcı çıkış yaptığında çalışan fonksiyondur.
     */
    const handleLogout = () => {

        /*
         * AuthContext içerisindeki logout fonksiyonunu çağırır.
         *
         * Böylece:
         *
         * - user temizlenir
         * - token temizlenir
         * - localStorage temizlenir
         */
        logout();

        /*
         * Oturum kapandıktan sonra
         * kullanıcı tekrar giriş ekranına yönlendirilir.
         */
        navigate("/login");
    };

    return (

        <main>

            {/*
             * Sayfa başlığını gösterir.
             */}
            <h1>Müşteri Paneli</h1>

            {/*
             * Giriş yapan kullanıcının e-posta adresi gösterilir.
             *
             * Optional Chaining (?.)
             * sayesinde user henüz yüklenmemiş olsa bile
             * uygulama hata vermez.
             */}
            <p>

                Hoş geldin,

                {user?.email}

            </p>

            {/*
             * Aşama 1 kapsamında yalnızca temel ekran hazırlanmıştır.
             *
             * Uçuş listeleme ve rezervasyon işlemleri
             * sonraki aşamalarda geliştirilecektir.
             */}
            <p>

                Uçuş listeleme işlemleri Aşama 2'de eklenecektir.

            </p>

            {/*
             * Logout işlemini başlatır.
             *
             * type="button"
             * kullanılarak butonun
             * yanlışlıkla form submit etmesi engellenmiştir.
             */}
            <button

                type="button"

                onClick={handleLogout}

            >

                Çıkış Yap

            </button>

        </main>

    );
}