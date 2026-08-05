import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/*
 * AdminDashboard, ROLE_ADMIN yetkisine sahip kullanıcıların
 * giriş yaptıktan sonra göreceği yönetim panelidir.
 *
 * Bu sayfa şu an Aşama 1 kapsamında temel bir iskelet olarak hazırlanmıştır.
 *
 * İlerleyen aşamalarda:
 * - Uçuş yönetimi
 * - Koltuk yönetimi
 * - Rezervasyon yönetimi
 * - Kullanıcı yönetimi
 *
 * gibi admin işlemleri bu sayfaya eklenecektir.
 */
export default function AdminDashboard() {

    /*
     * React Router'ın yönlendirme hookudur.
     *
     * Çıkış yaptıktan sonra kullanıcıyı
     * login ekranına göndermek için kullanılır.
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
     * Giriş yapan kullanıcının bilgilerini içerir.
     *
     * logout:
     * Kullanıcının oturumunu sonlandırır.
     */
    const { user, logout } = useAuth();

    /*
     * Kullanıcı çıkış yaptığında çalışan fonksiyondur.
     */
    const handleLogout = () => {

        /*
         * AuthContext içerisindeki logout fonksiyonunu çağırır.
         *
         * Bu işlem:
         *
         * - user bilgisini temizler.
         * - token bilgisini temizler.
         * - localStorage'daki oturumu siler.
         */
        logout();

        /*
         * Logout tamamlandıktan sonra
         * kullanıcı tekrar Login ekranına yönlendirilir.
         *
         * Böylece korunan sayfalara tekrar erişebilmek için
         * yeniden giriş yapılması gerekir.
         */
        navigate("/login");
    };

    return (

        <main>

            {/*
             * Sayfanın başlığını gösterir.
             */}
            <h1>Admin Paneli</h1>

            {/*
             * Giriş yapan admin kullanıcısının
             * e-posta adresini gösterir.
             *
             * ?. (Optional Chaining)
             *
             * user henüz yüklenmemişse
             * uygulamanın hata vermesini önler.
             */
            }
            <p>

                Hoş geldin,

                {user?.email}

            </p>

            {/*
             * Bu proje Aşama 1 olduğu için
             * Admin paneli henüz geliştirilmemiştir.
             *
             * İlerleyen aşamalarda
             * yönetim ekranları buraya eklenecektir.
             */}
            <p>

                Uçuş ve koltuk yönetimi Aşama 2'de eklenecektir.

            </p>

            {/*
             * Logout işlemini başlatır.
             *
             * type="button"
             * kullanılarak butonun yanlışlıkla
             * form submit etmesi engellenmiştir.
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