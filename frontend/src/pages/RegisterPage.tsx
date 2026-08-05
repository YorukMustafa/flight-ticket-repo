import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/*
 * RegisterPage, yeni bir kullanıcının sisteme kayıt olmasını sağlayan sayfadır.
 *
 * Kullanıcıdan:
 * - ad
 * - soyad
 * - e-posta
 * - şifre
 * - şifre tekrar
 *
 * bilgileri alınır.
 *
 * Form gönderilmeden önce frontend doğrulamaları yapılır.
 * Doğrulamalar başarılıysa AuthContext içerisindeki register()
 * fonksiyonu çağrılır.
 */
export default function RegisterPage() {
    /*
     * useNavigate, kayıt işlemi başarıyla tamamlandıktan sonra
     * kullanıcıyı login sayfasına yönlendirmek için kullanılır.
     *
     * React Router üzerinden yönlendirme yapıldığı için
     * sayfa tamamen yenilenmez.
     */
    const navigate = useNavigate();

    /*
     * AuthContext içerisindeki register fonksiyonuna erişiyoruz.
     *
     * RegisterPage kayıt işleminin nasıl saklandığını bilmez.
     * Sadece register() fonksiyonuna gerekli verileri gönderir.
     *
     * Bu yaklaşım sorumlulukların ayrılmasını sağlar.
     */
    const { register } = useAuth();

    /*
     * Form alanlarının değerleri React state ile tutulur.
     *
     * Her input alanı controlled component olarak çalışır.
     * Yani input değeri doğrudan React state tarafından yönetilir.
     */

    /* Kullanıcının adı */
    const [firstName, setFirstName] = useState("");

    /* Kullanıcının soyadı */
    const [lastName, setLastName] = useState("");

    /* Kullanıcının e-posta adresi */
    const [email, setEmail] = useState("");

    /* Kullanıcının belirlediği şifre */
    const [password, setPassword] = useState("");

    /*
     * Kullanıcının şifresini doğru yazdığını kontrol etmek için
     * ikinci kez girilen şifre tutulur.
     *
     * Bu alan backend'e gönderilmez.
     * Sadece frontend doğrulaması için kullanılır.
     */
    const [passwordAgain, setPasswordAgain] = useState("");

    /*
     * Kullanıcıya gösterilecek hata mesajını tutar.
     *
     * Örneğin:
     * - boş alan
     * - kısa şifre
     * - eşleşmeyen şifreler
     * - kayıt sırasında oluşan hata
     */
    const [error, setError] = useState("");

    /*
     * Kayıt işleminin devam edip etmediğini tutar.
     *
     * true olduğunda:
     * - buton devre dışı bırakılır
     * - "Kayıt oluşturuluyor..." mesajı gösterilir
     *
     * Bu sayede kullanıcı aynı isteği birden fazla kez gönderemez.
     */
    const [loading, setLoading] = useState(false);

    /*
     * Form gönderildiğinde çalışan ana fonksiyondur.
     *
     * Önce frontend doğrulamaları yapılır.
     * Daha sonra kayıt işlemi çağrılır.
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        /*
         * HTML formunun varsayılan davranışını engeller.
         *
         * Normalde form gönderildiğinde tarayıcı sayfayı yeniler.
         * React SPA yapısında sayfanın yenilenmesini istemiyoruz.
         */
        event.preventDefault();

        /*
         * Önceki denemeden kalan hata mesajını temizler.
         */
        setError("");

        /*
         * Bütün zorunlu alanların dolu olup olmadığını kontrol eder.
         *
         * Herhangi bir alan boşsa kayıt işlemi başlamaz.
         * Böylece gereksiz işlem ve istek engellenir.
         */
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !passwordAgain
        ) {
            setError("Tüm alanları doldurmalısınız.");
            return;
        }

        /*
         * Şifrenin minimum uzunluğunu kontrol eder.
         *
         * Şu an temel bir kural olarak en az 6 karakter seçilmiştir.
         *
         * Gerçek projede bu kural backend tarafında da
         * zorunlu olarak kontrol edilmelidir.
         */
        if (password.length < 6) {
            setError("Şifre en az 6 karakter olmalıdır.");
            return;
        }

        /*
         * Kullanıcının iki şifre alanına aynı değeri girip
         * girmediğini kontrol eder.
         *
         * Eşleşmiyorsa kayıt işlemi durdurulur.
         */
        if (password !== passwordAgain) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        /*
         * Kayıt işlemi asenkron olduğu için try-catch-finally
         * yapısı kullanılır.
         *
         * Gerçek backend entegrasyonunda HTTP isteği başarısız olabilir.
         */
        try {
            /*
             * İşlem başladığında loading aktif edilir.
             */
            setLoading(true);

            /*
             * AuthContext içerisindeki register fonksiyonu çağrılır.
             *
             * Şifre tekrar alanı gönderilmez çünkü sadece
             * frontend doğrulaması amacıyla kullanılmıştır.
             *
             * Şu an mock kayıt sistemi çalışmaktadır.
             * Gerçek backend hazır olduğunda burada API çağrısı yapılacaktır.
             */
            await register({
                firstName,
                lastName,
                email,
                password,
            });

            /*
             * Kayıt başarılı olduğunda kullanıcı login sayfasına gönderilir.
             *
             * Bu projede kayıt sonrası otomatik giriş yerine
             * kullanıcının giriş yapması tercih edilmiştir.
             */
            navigate("/login");
        } catch {
            /*
             * Kayıt sırasında beklenmeyen bir hata oluşursa
             * kullanıcıya genel bir hata mesajı gösterilir.
             */
            setError("Kayıt sırasında bir hata oluştu.");
        } finally {
            /*
             * İşlem başarılı veya başarısız olsa da loading kapatılır.
             *
             * finally bloğu her durumda çalışır.
             */
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Kayıt Ol</h1>

            {/*
             * Form gönderildiğinde handleSubmit çalışır.
             */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">Ad</label>

                    {/*
                     * Controlled input:
                     * Değer firstName state'inden gelir.
                     * Kullanıcı yazdıkça setFirstName ile state güncellenir.
                     */}
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Soyad</label>

                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="email">E-posta</label>

                    {/*
                     * type="email" kullanılması tarayıcının
                     * temel e-posta format kontrolünden yararlanmamızı sağlar.
                     *
                     * Ancak gerçek doğrulama backend tarafında da yapılmalıdır.
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
                    <label htmlFor="password">Şifre</label>

                    {/*
                     * type="password" girilen karakterlerin
                     * ekranda gizlenmesini sağlar.
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

                <div>
                    <label htmlFor="passwordAgain">
                        Şifre Tekrar
                    </label>

                    {/*
                     * Bu input yalnızca şifre eşleşme kontrolü için kullanılır.
                     * RegisterRequest içine eklenmez.
                     */}
                    <input
                        id="passwordAgain"
                        type="password"
                        value={passwordAgain}
                        onChange={(event) =>
                            setPasswordAgain(event.target.value)
                        }
                    />
                </div>

                {/*
                 * Hata varsa ekranda gösterilir.
                 * Buna koşullu render denir.
                 */}
                {error && <p>{error}</p>}

                {/*
                 * Kayıt işlemi devam ederken buton kapatılır.
                 * Böylece çift kayıt isteği gönderilmesi önlenir.
                 */}
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Kayıt oluşturuluyor..."
                        : "Kayıt Ol"}
                </button>
            </form>

            {/*
             * Daha önce hesabı olan kullanıcı login sayfasına gider.
             *
             * Link kullanıldığı için sayfa yenilenmeden route değişir.
             */}
            <p>
                Zaten hesabın var mı?{" "}
                <Link to="/login">Giriş yap</Link>
            </p>
        </main>
    );
}