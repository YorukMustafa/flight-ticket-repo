import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/*
 * LoginPage kullanıcının sisteme giriş yapmasını sağlayan sayfadır.
 *
 * Kullanıcıdan e-posta ve şifre bilgisi alınır.
 * Bilgiler doğrulandıktan sonra AuthContext içerisindeki
 * login() fonksiyonu çağrılır.
 *
 * Giriş başarılı olursa kullanıcının rolüne göre
 * Admin veya Customer paneline yönlendirme yapılır.
 */
export default function LoginPage() {

    /*
     * useNavigate React Router'ın yönlendirme hookudur.
     *
     * Login başarılı olduktan sonra
     * kullanıcıyı uygun panele göndermek için kullanıyoruz.
     */
    const navigate = useNavigate();

    /*
     * AuthContext içerisindeki login fonksiyonuna erişiyoruz.
     *
     * Böylece LoginPage authentication işleminin detayını bilmez.
     * Sadece login() fonksiyonunu çağırır.
     *
     * Authentication işleminin merkezi AuthContext'tir.
     */
    const { login } = useAuth();

    /*
     * Form alanlarını React State ile yönetiyoruz.
     *
     * Böylece input içerikleri her değiştiğinde
     * component güncellenir.
     */

    /* Kullanıcının girdiği e-posta */
    const [email, setEmail] = useState("");

    /* Kullanıcının girdiği şifre */
    const [password, setPassword] = useState("");

    /*
     * Oluşabilecek hata mesajlarını tutar.
     *
     * Örneğin:
     * - Alanlar boş bırakılırsa
     * - Login başarısız olursa
     */
    const [error, setError] = useState("");

    /*
     * Login işlemi devam ederken kullanılır.
     *
     * true olduğunda
     *
     * Buton pasif olur.
     * "Giriş Yapılıyor..." yazısı görünür.
     *
     * Böylece kullanıcı aynı anda birden fazla kez
     * giriş isteği gönderemez.
     */
    const [loading, setLoading] = useState(false);

    /*
     * Form gönderildiğinde çalışan ana fonksiyondur.
     *
     * Login işleminin bütün kontrolü burada yapılmaktadır.
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {

        /*
         * Formun varsayılan davranışını engeller.
         *
         * Normalde form gönderildiğinde
         * sayfa tamamen yenilenirdi.
         *
         * React SPA mantığında
         * sayfanın yenilenmesini istemiyoruz.
         */
        event.preventDefault();

        /*
         * Önceki hata mesajını temizliyoruz.
         */
        setError("");

        /*
         * Basit frontend doğrulaması.
         *
         * Kullanıcı e-posta veya şifreyi boş bırakırsa
         * backend'e istek göndermeden kullanıcı uyarılır.
         *
         * Böylece gereksiz istekler önlenmiş olur.
         */
        if (!email || !password) {

            setError("E-posta ve şifre zorunludur.");

            return;
        }

        /*
         * Login işlemi hata oluşturabileceği için
         * try-catch yapısı kullanılmıştır.
         */
        try {

            /*
             * Loading durumunu başlatıyoruz.
             */
            setLoading(true);

            /*
             * AuthContext içerisindeki login fonksiyonunu çağırıyoruz.
             *
             * Gerçek projede burada backend API çağrısı yapılacaktır.
             *
             * Şu an mock authentication kullanılmaktadır.
             */
            const user = await login({

                email,

                password,

            });

            /*
             * Login başarılı olduktan sonra
             * kullanıcının rolü kontrol edilir.
             *
             * ROLE_ADMIN ise Admin paneline,
             * diğer kullanıcılar Customer paneline yönlendirilir.
             */
            if (user.role === "ROLE_ADMIN") {

                navigate("/admin");

            } else {

                navigate("/customer");

            }

        } catch {

            /*
             * Login sırasında beklenmeyen bir hata oluşursa
             * kullanıcı bilgilendirilir.
             */
            setError("Giriş sırasında bir hata oluştu.");

        } finally {

            /*
             * İşlem başarılı da olsa
             * başarısız da olsa
             * loading kapatılır.
             *
             * finally bloğu her durumda çalışır.
             */
            setLoading(false);

        }
    };

    return (
        <main>

            <h1>Giriş Yap</h1>

            {/*
             * Form submit edildiğinde
             * handleSubmit fonksiyonu çalışır.
             */}
            <form onSubmit={handleSubmit}>

                <div>

                    <label htmlFor="email">

                        E-posta

                    </label>

                    {/*
                     * Controlled Component
                     *
                     * Input değeri React State tarafından yönetilir.
                     *
                     * Kullanıcı yazdıkça
                     * email state'i güncellenir.
                     */}
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                </div>

                <div>

                    <label htmlFor="password">

                        Şifre

                    </label>

                    {/*
                     * Şifre alanı da Controlled Component'tir.
                     *
                     * type=password sayesinde
                     * girilen karakterler gizlenir.
                     */}
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />

                </div>

                {/*
                 * Eğer hata mesajı varsa
                 * ekrana gösterilir.
                 *
                 * React'te buna koşullu render denir.
                 */}
                {error && <p>{error}</p>}

                {/*
                 * Login işlemi devam ederken
                 * buton devre dışı bırakılır.
                 *
                 * Böylece kullanıcı aynı anda
                 * tekrar tekrar giriş yapamaz.
                 */}
                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Giriş yapılıyor..."
                        : "Giriş Yap"}

                </button>

            </form>

            {/*
             * Hesabı olmayan kullanıcıyı
             * Register sayfasına yönlendirir.
             *
             * Link kullanıldığı için
             * sayfa yenilenmeden route değişir.
             */}
            <p>

                Hesabın yok mu?

                <Link to="/register">

                    Kayıt ol

                </Link>

            </p>

        </main>
    );
}