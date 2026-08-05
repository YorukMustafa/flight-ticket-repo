/*
 * React'in geliştirme modunda kullanılacak bileşenleri içe aktarıyoruz.
 *
 * StrictMode:
 * Geliştirme sırasında olası hataları ve yanlış kullanımları
 * daha erken tespit etmemizi sağlar.
 *
 * Production ortamında kullanıcıya görünmez.
 */
import { StrictMode } from "react";
import "./i18n";

/*
 * React uygulamasını tarayıcıya bağlamak için kullanılır.
 *
 * createRoot React 18 ile gelen yeni render yöntemidir.
 */
import { createRoot } from "react-dom/client";

/*
 * React Router'ın temel router bileşenidir.
 *
 * Uygulamanın URL tabanlı çalışmasını sağlar.
 *
 * Böylece:
 * /login
 * /register
 * /admin
 * /customer
 *
 * gibi sayfalar arasında geçiş yapılabilir.
 */
import { BrowserRouter } from "react-router-dom";

/*
 * Uygulamanın ana componenti.
 *
 * Route yapıları App.tsx içerisinde tanımlanmıştır.
 */
import App from "./App";

/*
 * Authentication işlemlerini yöneten Provider.
 *
 * AuthContext içerisindeki
 *
 * user
 * token
 * login
 * logout
 * register
 *
 * bilgilerinin bütün uygulama tarafından kullanılmasını sağlar.
 */
import { AuthProvider } from "./context/AuthContext";

/*
 * Uygulamanın genel CSS dosyası.
 */
import "./index.css";

/*
 * React uygulamasını index.html içerisindeki
 *
 * <div id="root"></div>
 *
 * elementine bağlar.
 *
 * "!" (Non-null assertion)
 * document.getElementById("root") değerinin
 * null olmayacağını TypeScript'e bildirir.
 */
createRoot(document.getElementById("root")!).render(

    /*
     * StrictMode yalnızca geliştirme ortamında çalışır.
     *
     * Yan etkileri, eski API kullanımlarını ve olası hataları
     * daha kolay tespit etmemizi sağlar.
     */
    <StrictMode>

        {/*
         * BrowserRouter bütün uygulamayı sarar.
         *
         * Böylece uygulama içerisinde
         * Link
         * Navigate
         * Route
         * Routes
         *
         * gibi React Router özellikleri kullanılabilir.
         */}
        <BrowserRouter>

            {/*
             * AuthProvider bütün uygulamayı sarar.
             *
             * Böylece App içerisindeki bütün componentler
             * AuthContext'e erişebilir.
             *
             * LoginPage
             * RegisterPage
             * Dashboard
             * ProtectedRoute
             * RoleRoute
             *
             * gibi componentler ortak authentication bilgisini kullanabilir.
             */}
            <AuthProvider>

                {/*
                 * Uygulamanın ana componenti çalıştırılır.
                 *
                 * Route yapısı ve sayfalar
                 * App.tsx içerisinde yönetilmektedir.
                 */}
                <App />

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>
);