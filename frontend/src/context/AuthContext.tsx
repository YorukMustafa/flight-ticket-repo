import {
    createContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

/* Uygulamanın her yerinden erişilebilen ortak verileri tutmak. */
/*
 * Login, register ve kullanıcı tiplerini ayrı bir dosyada tanımladık.
 * Böylece AuthContext dosyasında veri yapısını tekrar tekrar yazmıyoruz.
 * Bu yaklaşım kod tekrarını azaltır ve tiplerin tek merkezden yönetilmesini sağlar.
 */
import type {
    LoginRequest,
    RegisterRequest,
    User,
} from "../types/auth";

/*
 * AuthContext üzerinden uygulamanın diğer componentlerine hangi
 * bilgilerin ve fonksiyonların sunulacağını belirler.
 *
 * user:
 * Giriş yapan kullanıcının e-posta ve rol bilgilerini tutar.
 * Kullanıcı giriş yapmamışsa null olur.
 *
 * token:
 * Kullanıcının oturum bilgisini temsil eder.
 * Şu an gerçek JWT yerine mock token kullanılmaktadır.
 *
 * isAuthenticated:
 * Kullanıcının giriş yapmış olup olmadığını kolayca kontrol etmek için kullanılır.
 *
 * login, register, logout:
 * Kimlik doğrulama işlemlerinin bütün componentler tarafından kullanılmasını sağlar.
 */
interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<User>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}

/* Ben AuthContext isminde ortak bir alan oluşturuyorum */
/*
 * Başlangıç değeri undefined verilir.
 * Bunun amacı, AuthContext'in AuthProvider dışında yanlışlıkla
 * kullanılması durumunu tespit edebilmektir.
 *
 * useAuth hookunda context undefined ise hata fırlatılarak
 * geliştiriciye AuthProvider'ın eksik olduğu açıkça bildirilir.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

/*
 * AuthProvider içine yerleştirilecek bütün componentleri temsil eder.
 *
 * ReactNode; component, metin, element veya birden fazla React içeriğini
 * kapsayabilen genel bir React tipidir.
 */
interface AuthProviderProps {
    children: ReactNode;
}

/* AuthProvider uygulamanın tamamını sarar ve içindeki bütün componentlerin kullanıcı bilgisine ulaşmasını sağlar. */
/*
 * AuthProvider, authentication ile ilgili state ve fonksiyonları oluşturur.
 * Daha sonra bunları AuthContext.Provider aracılığıyla alt componentlere dağıtır.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    /* Bu JWT Token saklıyor.*/
    /*
     * useState'in başlangıç değeri bir fonksiyon olarak verildi.
     * Bu yönteme lazy initialization denir.
     *
     * localStorage okuma işlemi yalnızca component ilk oluşturulduğunda yapılır.
     * Her render işleminde localStorage tekrar okunmaz.
     *
     * Gerçek backend bağlandığında burada gerçek JWT token tutulacaktır.
     */
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );

    /* Kullanıcı bilgisini saklıyor */
    /*
     * Kullanıcı daha önce giriş yaptıysa localStorage içindeki bilgi okunur.
     * Böylece kullanıcı sayfayı yenilediğinde oturumu hemen kaybolmaz.
     */
    const [user, setUser] = useState<User | null>(() => {
        /* Kullanıcı çıkış yapana kadar verilerin açık durmasını sağlar*/
        /*
         * localStorage yalnızca string veri tutar.
         * Bu nedenle kullanıcı bilgisi JSON biçiminde saklanır ve okunurken parse edilir.
         */
        const storedUser = localStorage.getItem("user");

        /*
         * localStorage içinde kullanıcı yoksa sistemde açık bir oturum yoktur.
         */
        if (!storedUser) {
            return null;
        }

        try {
            /*
             * JSON metnini tekrar User nesnesine dönüştürür.
             *
             * "as User" ifadesi TypeScript'e bu verinin User tipinde
             * kullanılacağını bildirir.
             */
            return JSON.parse(storedUser) as User;
        } catch {
            /*
             * localStorage içindeki veri bozuk veya geçersiz JSON ise
             * uygulamanın hata verip kapanmasını önleriz.
             *
             * Geçersiz kullanıcı kaydı temizlenir ve oturum kapalı kabul edilir.
             */
            localStorage.removeItem("user");
            return null;
        }
    });

    /*
     * Kullanıcının giriş işlemini simüle eder.
     *
     * Fonksiyon Promise<User> döndürür çünkü gerçek backend bağlantısında
     * login işlemi asenkron bir HTTP isteği olacaktır.
     *
     * Şu an backend hazır olmadığı için mock authentication kullanıyoruz.
     */
    const login = async (data: LoginRequest): Promise<User> => {
        /*
         * Gerçek API isteğinin kısa bir bekleme süresi olacağı düşünülerek
         * 500 milisaniyelik yapay gecikme oluşturulmuştur.
         *
         * Bu sayede loading durumunun frontend üzerinde test edilmesi mümkün olur.
         */
        await new Promise((resolve) => setTimeout(resolve, 500));

        /*
         * Test amacıyla admin@test.com adresi Admin olarak kabul edilir.
         * Diğer bütün e-posta adreslerine Customer rolü atanır.
         *
         * Gerçek backend bağlantısında rol bilgisi sunucudan gelecektir.
         */
        const loggedInUser: User =
            data.email === "admin@test.com"
                ? {
                    email: data.email,
                    role: "ROLE_ADMIN",
                }
                : {
                    email: data.email,
                    role: "ROLE_CUSTOMER",
                };

        /*
         * Kullanıcının rolüne göre geçici bir token oluşturulur.
         *
         * Bunlar gerçek JWT değildir.
         * Sadece frontend oturum akışını geliştirmek ve test etmek için kullanılır.
         */
        const mockToken =
            loggedInUser.role === "ROLE_ADMIN"
                ? "mock-admin-token"
                : "mock-customer-token";

        /*
         * React state güncellenir.
         * State değiştiğinde AuthContext'i kullanan componentler yeniden render edilir.
         */
        setUser(loggedInUser);
        setToken(mockToken);

        /*
         * Sayfa yenilendiğinde oturumun kaybolmaması için
         * kullanıcı ve token bilgisi localStorage içine yazılır.
         *
         * Kullanıcı nesnesi doğrudan saklanamadığı için JSON.stringify kullanılır.
         */
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", mockToken);

        /*
         * LoginPage, dönen kullanıcının rolünü kontrol ederek
         * kullanıcıyı Admin veya Customer paneline yönlendirir.
         */
        return loggedInUser;
    };

    /*
     * Yeni kullanıcı kayıt işlemini simüle eder.
     *
     * Gerçek backend bağlantısında burada POST /register isteği gönderilecektir.
     */
    const register = async (
        data: RegisterRequest,
    ): Promise<void> => {
        /*
         * Gerçek kayıt isteğini taklit etmek için yapay gecikme eklenmiştir.
         */
        await new Promise((resolve) => setTimeout(resolve, 500));

        /*
         * Daha önce kaydedilen mock kullanıcılar localStorage üzerinden okunur.
         *
         * Veri yoksa null yerine boş dizi kullanılır.
         * "??" operatörü yalnızca değer null veya undefined olduğunda sağ tarafı seçer.
         */
        const registeredUsers = JSON.parse(
            localStorage.getItem("registeredUsers") ?? "[]",
        ) as RegisterRequest[];

        /*
         * Formdan gelen yeni kullanıcı mevcut kullanıcı listesine eklenir.
         */
        registeredUsers.push(data);

        /*
         * Güncellenen liste yeniden JSON metnine çevrilip localStorage'a kaydedilir.
         *
         * Bu yalnızca frontend simülasyonudur.
         * Gerçek projede kullanıcı bilgileri veritabanında tutulmalıdır.
         */
        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(registeredUsers),
        );
    };

    /*
     * Kullanıcının oturumunu sonlandırır.
     */
    const logout = () => {
        /*
         * React state temizlenir.
         * Böylece uygulama kullanıcıyı artık giriş yapmış olarak kabul etmez.
         */
        setUser(null);
        setToken(null);

        /*
         * Sayfa yenilendiğinde eski oturumun geri yüklenmemesi için
         * kalıcı tarayıcı kayıtları da temizlenir.
         *
         * registeredUsers silinmez çünkü onlar kayıtlı kullanıcıları simüle eder.
         */
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    /*
     * Provider üzerinden paylaşılacak değerleri tek bir nesnede toplar.
     *
     * useMemo, user veya token değişmediği sürece aynı value nesnesini kullanır.
     * Böylece gereksiz nesne oluşturulması ve bazı gereksiz render işlemleri azaltılır.
     */
    const value = useMemo(
        () => ({
            user,
            token,

            /*
             * Hem kullanıcı hem token varsa oturum açık kabul edilir.
             *
             * Boolean ifadesi sonucu açıkça true veya false değerine dönüştürür.
             */
            isAuthenticated: Boolean(user && token),

            login,
            register,
            logout,
        }),
        /*
         * user veya token değiştiğinde value nesnesi yeniden oluşturulur.
         */
        [user, token],
    );

    /*
     * Provider'ın value alanına verdiğimiz bilgiler,
     * AuthProvider'ın altında bulunan bütün componentler tarafından kullanılabilir.
     *
     * children; LoginPage, dashboardlar, route componentleri ve diğer
     * uygulama içeriklerini temsil eder.
     */
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}