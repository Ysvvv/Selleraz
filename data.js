const SITE_DATA = {
    // 1. BAŞLIQ MƏLUMATLARI (Hero Section)
    hero: {
        title: "Telegram E-Mağazası",
        slogan: "Ən sərfəli və güvənli şərtlərlə təqdim olunan Telegram Premium, Ulduz və NFT xidmətlərimiz, müştərilərimizə yüksək keyfiyyətli və etibarlı rəqəmsal məhsullarımız vasitəsilə üstün istifadəçi təcrübəsi təmin edir.",
        logo: "" // Gələcəkdə loqo linki bura əlavə edilə bilər
    },

    // 2. MƏLUMATLANDIRICI MƏTNLƏR (Əsas Səhifə üçün)
    info: {
        premiumTitle: "Telegram Premium",
        premiumDesc: "Telegram Premium, tətbiqin davamlı inkişafını dəstəkləmək və istifadəçilərə daha geniş imkanlar ilə xüsusi funksiyalar təqdim etmək üçün yaradılmış könüllü abunə xidmətidir. Mövcud bütün əsas funksiyalar pulsuz olaraq qalmaqda davam edərkən, Premium istifadəçilər təcrübələrini daha yüksək səviyyəyə qaldıran əlavə üstünlüklərə sahib olurlar.",

        starsTitle: "Telegram Stars",
        starsDesc: "Telegram Stars, Telegram ekosistemi daxilində rəqəmsal məhsul və xidmətlər almaq, kontent istehsalçılarını dəstəkləmək və mini tətbiqlərdə ödəniş etmək üçün istifadə olunan tətbiqdaxili virtual valyutadır. Bundan əlavə, digər Telegram istifadəçilərinə və kanallara dəstək göstərmək, həmçinin dostlar arasında hədiyyə mübadiləsini həyata keçirmək məqsədilə istifadə olunur.",

        nftsTitle: "Telegram NFTs",
        nftsDesc: "Telegram NFTs, The Open Network blokçeyn üzərində fəaliyyət göstərən və istifadəçilərə rəqəmsal kimliklərini və hədiyyələrini mülkiyyətində saxlama imkanı verən rəqəmsal kolleksiyalardır. Telegram, ənənəvi NFT mühitindən fərqli olaraq, bu texnologiyanı mesajlaşma interfeysinə inteqrasiya edərək, onların Social Media Skins kimi istifadə olunmasını təmin etmişdir."
    },

    // 3. AŞAĞI KEÇİDLƏR (FOOTER LİNKLƏRİ)
    links: {
        buyLink: "https://t.me/onlykbye",  // Sifariş (Almaq) düymələrinin gedəcəyi link
        sellerLink: "https://t.me/idealseller", // Footer-də "Satıcı" düyməsinin linki
        channelLink: "https://t.me/onlykbye",   // Footer-də "Kanal" düyməsinin linki
        sponsorLink: "https://t.me/mrktaze"       // Footer-də "Sponsor" düyməsinin linki
    },

    // 4. TELEGRAM PREMIUM QİYMƏTLƏRİ VƏ ÜSTÜNLÜKLƏRİ
    premiumFeatures: [
        "Yüksək və limitsiz yükləmə sürəti.",
        "4 GB-a qədər böyük həcmli faylların göndərilməsi.",
        "Kanallardakı bütün reklamların ləğv edilməsi.",
        "Səsli və video mesajların avtomatik olaraq mətnə çevrilməsi.",
        "Eksklüziv Premium stikerlər və animasiyalı reaksiyalar.",
        "Profilinizin adının yanında xüsusi Premium nişanı.",
        "Qovluq, kanal və sabitlənmə limitlərinin ikiqat artırılması.",
        "Tətbiq ikonu və profil rənglərini fərdiləşdirmək imkanı."
    ],
    premiumPlans: [
        {
            id: 1,
            duration: "3 Aylıq",
            price: "22.00 ₼"
        },
        {
            id: 2,
            duration: "6 Aylıq",
            price: "29.00 ₼",
            isPopular: true // Əgər ən çox satılan budursa "true" qalsın
        },
        {
            id: 3,
            duration: "12 Aylıq",
            price: "52.00 ₼"
        }
    ],

    // 5. TELEGRAM ULDUZ (STARS) QİYMƏTLƏRİ
    starPackages: [
        {
            id: 1,
            name: "Ucuz",
            // isPopular: true,
            items: [
                { price: "3 ₼", amount: "105 Stars" },
                { price: "4 ₼", amount: "130 Stars" },
                { price: "5 ₼", amount: "160 Stars" },
                { price: "6 ₼", amount: "205 Stars" },
                { price: "7 ₼", amount: "240 Stars" },
                { price: "8 ₼", amount: "270 Stars" },
                { price: "9 ₼", amount: "315 Stars" }
            ]
        },
        {
            id: 2,
            name: "Orta",
            isPopular: true,
            items: [
                { price: "10 ₼", amount: "325 Stars" },
                { price: "11 ₼", amount: "370 Stars" },
                { price: "12 ₼", amount: "420 Stars" },
                { price: "13 ₼", amount: "440 Stars" },
                { price: "14 ₼", amount: "500 Stars" },
                { price: "15 ₼", amount: "525 Stars" },
                { price: "16 ₼", amount: "555 Stars" }
            ]
        },
        {
            id: 3,
            name: "Bahalı",
            items: [
                { price: "20 ₼", amount: "700 Stars" },
                { price: "21 ₼", amount: "735 Stars" },
                { price: "22 ₼", amount: "740 Stars" },
                { price: "23 ₼", amount: "790 Stars" },
                { price: "24 ₼", amount: "840 Stars" },
                { price: "25 ₼", amount: "860 Stars" },
                { price: "26 ₼", amount: "900 Stars" }
            ]
        }
    ],

    // 6. NFT VƏ HƏDİYYƏLƏR (GOOGLE SHEETS İLƏ MÜMKÜNDÜR)
    // Əgər NFT-ləri avtomatik Google Cədvəldən (Excel) oxumağını istəyirsinizsə, aşağıya həmin Cədvəlin ID-sini yapışdırın:
    // Cədvəlin başlıq sütunları (A1, B1, C1..) mütləq bu adlarda olmalıdır:
    // name | image | link | modelName | modelRarity | symbolName | symbolRarity | backdropName | backdropRarity | price
    nftGoogleSheetId: "",

    // Əgər yuxarıdakı ID qutusu boşdursa (""), sayt əl ilə (manual) yazılmış bu siyahını göstərəcək:
    nfts: [
        {
            id: 1,
            name: "Telegram",
            image: "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/7e47be-setting/dynamic/400/premium.webp", // Şəklin URL-i
            link: "https://t.me/mrktaze", // NFT-yə gedən link
            modelName: "None",
            modelRarity: "0", // Faiz (%) olaraq
            symbolName: "None",
            symbolRarity: "0",
            backdropName: "None",
            backdropRarity: "0",
            price: "Satış Yoxdur"
        }
    ]
};
