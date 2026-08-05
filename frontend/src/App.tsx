/*
 * react-router-dom içinden:
 *
 * Navigate:
 * Kullanıcıyı başka bir route'a yönlendirmek için kullanılır.
 *
 * Route:
 * Belirli bir URL ile hangi componentin gösterileceğini eşleştirir.
 *
 * Routes:
 * Uygulamadaki bütün Route tanımlarını kapsayan ana router bileşenidir.
 */
import { Navigate, Route, Routes } from "react-router-dom";

/*
 * ProtectedRoute:
 * Kullanıcının giriş yapıp yapmadığını kontrol eder.
 *
 * Giriş yapılmamışsa kullanıcı login sayfasına yönlendirilir.
 */
import ProtectedRoute from "./components/ProtectedRoute";

/*
 * RoleRoute:
 * Giriş yapan kullanıcının gerekli role sahip olup olmadığını kontrol eder.
 *
 * Örneğin yalnızca ROLE_ADMIN kullanıcısının admin paneline
 * erişebilmesini sağlar.
 */
import RoleRoute from "./components/RoleRoute";

/*
 * Route'larda gösterilecek sayfa componentleri içe aktarılır.
 */
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

/*
 * App componenti uygulamanın route yapısını tanımlar.
 *
 * Hangi URL'de hangi sayfanın açılacağını,
 * hangi sayfaların giriş gerektirdiğini ve
 * hangi sayfaların belirli rollere açık olduğunu burada belirliyoruz.
 *
 * Bu nedenle App.tsx uygulamanın yönlendirme merkezi olarak düşünülebilir.
 */
export default function App() {
    return (
        /*
         * Routes componenti, içerisindeki Route tanımlarını inceler
         * ve tarayıcıdaki mevcut URL ile eşleşen componenti gösterir.
         */
        <Routes>
            {/*
             * Kullanıcı ana adrese, yani "/" yoluna gelirse
             * doğrudan login sayfasına yönlendirilir.
             *
             * Burada ayrıca ayrı bir ana sayfa hazırlamadığımız için
             * başlangıç noktası olarak login ekranını seçtik.
             *
             * replace kullanıldığı için "/" adresi tarayıcı geçmişinde
             * ayrı bir kayıt olarak tutulmaz.
             */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/*
             * Public route'lardır.
             *
             * Kullanıcının bu sayfalara erişebilmesi için
             * giriş yapmış olması gerekmez.
             */}
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            {/*
             * Kullanıcı giriş yapmış olsa bile gerekli role sahip değilse
             * bu sayfaya yönlendirilir.
             *
             * Unauthorized sayfası, authentication ile authorization
             * arasındaki farkı kullanıcıya açık şekilde gösterir.
             */}
            <Route
                path="/unauthorized"
                element={<UnauthorizedPage />}
            />

            {/*
             * Bu Route grubunun altında bulunan bütün sayfalar
             * ProtectedRoute kontrolünden geçer.
             *
             * Yani kullanıcı giriş yapmamışsa:
             * /admin veya /customer sayfaları gösterilmez.
             *
             * ProtectedRoute içinde Outlet bulunduğu için,
             * kontrol başarılı olduğunda aşağıdaki iç route'lar render edilir.
             */}
            <Route element={<ProtectedRoute />}>
                {/*
                 * Admin route grubu.
                 *
                 * allowedRoles dizisinde sadece ROLE_ADMIN bulunduğu için
                 * yalnızca Admin rolüne sahip kullanıcılar bu grubun
                 * altındaki sayfalara erişebilir.
                 */}
                <Route
                    element={
                        <RoleRoute
                            allowedRoles={["ROLE_ADMIN"]}
                        />
                    }
                >
                    {/*
                     * /admin adresi AdminDashboard componentini gösterir.
                     *
                     * Ancak bu sayfa iki kontrolden geçer:
                     *
                     * 1. ProtectedRoute:
                     * Kullanıcı giriş yapmış mı?
                     *
                     * 2. RoleRoute:
                     * Kullanıcının rolü ROLE_ADMIN mi?
                     */}
                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />
                </Route>

                {/*
                 * Customer route grubu.
                 *
                 * Burada hem ROLE_CUSTOMER hem de ROLE_ADMIN rolüne
                 * izin verilmiştir.
                 *
                 * Bunun nedeni Admin kullanıcının gerektiğinde
                 * müşteri panelini de görüntüleyebilmesini sağlamaktır.
                 *
                 * Yalnızca müşterilerin girmesi istenseydi dizide
                 * sadece ROLE_CUSTOMER bulunurdu.
                 */}
                <Route
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "ROLE_CUSTOMER",
                                "ROLE_ADMIN",
                            ]}
                        />
                    }
                >
                    {/*
                     * /customer adresi CustomerDashboard componentini gösterir.
                     *
                     * Kullanıcının giriş yapmış olması ve
                     * izin verilen rollerden birine sahip olması gerekir.
                     */}
                    <Route
                        path="/customer"
                        element={<CustomerDashboard />}
                    />
                </Route>
            </Route>

            {/*
             * "*" herhangi bir Route ile eşleşmeyen bütün adresleri temsil eder.
             *
             * Örneğin kullanıcı:
             * /abc
             * /test
             * /olmayan-sayfa
             *
             * gibi bir adrese giderse login sayfasına yönlendirilir.
             *
             * Bu yaklaşım uygulamanın boş veya hatalı bir sayfa göstermesini önler.
             *
             * Daha gelişmiş bir sürümde burada özel bir NotFoundPage
             * yani 404 sayfası kullanılabilir.
             */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}