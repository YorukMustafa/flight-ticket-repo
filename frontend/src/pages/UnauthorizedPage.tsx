import { Link } from "react-router-dom";

/*
 * UnauthorizedPage, sisteme giriş yapan ancak
 * gerekli yetkiye sahip olmayan kullanıcıların
 * göreceği bilgilendirme sayfasıdır.
 *
 * Bu sayfa Authentication (giriş yapma) başarılı olmasına rağmen
 * Authorization (yetkilendirme) başarısız olduğunda gösterilir.
 */
export default function UnauthorizedPage() {
    return (
        <main>

            {/*
             * Kullanıcıya neden bu sayfaya geldiği açık şekilde belirtilir.
             */}
            <h1>Yetkisiz Erişim</h1>

            {/*
             * Kullanıcının sisteme giriş yaptığı ancak
             * bu sayfaya erişme yetkisinin olmadığı açıklanır.
             *
             * Böylece kullanıcı bunun bir sistem hatası değil,
             * yetki kısıtlaması olduğunu anlayabilir.
             */}
            <p>

                Bu sayfaya erişmek için gerekli yetkiye sahip değilsiniz.

            </p>

            {/*
             * Kullanıcının uygulamada kalmasını sağlamak amacıyla
             * erişebileceği güvenli bir sayfaya yönlendirme bağlantısı sunulur.
             *
             * Link kullanıldığı için sayfa yenilenmeden route değişir.
             */}
            <Link to="/customer">

                Müşteri paneline dön

            </Link>

        </main>
    );
}