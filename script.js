// Səhifə yükləndikdə məlumatları dolduran skript
document.addEventListener("DOMContentLoaded", () => {

    // 1. Hero məlumatlarını doldur
    document.getElementById('hero-title').textContent = SITE_DATA.hero.title;
    document.getElementById('hero-slogan').textContent = SITE_DATA.hero.slogan;

    // 2. Footer linklərini bağla
    const btnSeller = document.getElementById('footer-seller');
    if (btnSeller) btnSeller.href = SITE_DATA.links.sellerLink;

    const btnChannel = document.getElementById('footer-channel');
    if (btnChannel) btnChannel.href = SITE_DATA.links.channelLink;

    const btnSponsor = document.getElementById('footer-sponsor');
    if (btnSponsor) btnSponsor.href = SITE_DATA.links.sponsorLink;

    // 2. Info (Məlumatlandırıcı) Kartlarını Yarat (ƏSAS SƏHİFƏ ÜÇÜN)
    const infoGrid = document.getElementById('info-grid');
    if (infoGrid && SITE_DATA.info) {
        infoGrid.innerHTML = `
            <div class="card" style="text-align: left; cursor: pointer;" onclick="switchTab('tab-premium', document.querySelector('.nav-links a[onclick*=\\'tab-premium\\']'))" title="Qiymətlər bölməsinə keçid">
                <h3 class="card-title" style="color: var(--premium-color); margin-bottom: 15px;">${SITE_DATA.info.premiumTitle}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${SITE_DATA.info.premiumDesc}</p>
            </div>
            <div class="card" style="text-align: left; cursor: pointer;" onclick="switchTab('tab-stars', document.querySelector('.nav-links a[onclick*=\\'tab-stars\\']'))" title="Qiymətlər bölməsinə keçid">
                <h3 class="card-title" style="color: var(--star-color); margin-bottom: 15px;">${SITE_DATA.info.starsTitle}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${SITE_DATA.info.starsDesc}</p>
            </div>
            <div class="card" style="text-align: left; cursor: pointer;" onclick="switchTab('tab-nfts', document.querySelector('.nav-links a[onclick*=\\'tab-nfts\\']'))" title="Qiymətlər bölməsinə keçid">
                <h3 class="card-title" style="color: var(--accent-blue); margin-bottom: 15px;">${SITE_DATA.info.nftsTitle}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${SITE_DATA.info.nftsDesc}</p>
            </div>
        `;
    }

    // 3. Telegram Premium Kartlarını Yarat
    const premiumGrid = document.getElementById('premium-grid');

    // Üstünlükləri bir dəfə HTML elementi olaraq yaradırıq
    let featuresHtml = '<ul class="premium-features-list">';
    if (SITE_DATA.premiumFeatures) {
        SITE_DATA.premiumFeatures.forEach(feature => {
            featuresHtml += `<li>${feature}</li>`;
        });
    }
    featuresHtml += '</ul>';

    SITE_DATA.premiumPlans.forEach(plan => {
        const isPop = plan.isPopular ? '<div class="popular-badge">Ən Çox Satılan</div>' : '';
        const cardClass = plan.isPopular ? 'card popular' : 'card';

        premiumGrid.innerHTML += `
            <div class="${cardClass}">
                ${isPop}
                <div class="card-title">${plan.duration}</div>
                <div class="card-price" style="color: var(--premium-color);">${plan.price}</div>
                <div class="card-divider"></div>
                ${featuresHtml}
                <button class="cyber-btn" onclick="window.location.href='${SITE_DATA.links.buyLink}'">Sifariş Ver</button>
            </div>
        `;
    });

    // 4. Telegram Ulduzlar Kartlarını Yarat
    const starsGrid = document.getElementById('stars-grid');
    SITE_DATA.starPackages.forEach(pack => {
        const isPop = pack.isPopular ? '<div class="popular-badge">Populyar</div>' : '';
        const cardClass = pack.isPopular ? 'card popular' : 'card';

        let itemsHtml = '<ul style="margin-top: 15px; margin-bottom: 25px; text-align: left; padding: 0;">';
        if (pack.items) {
            pack.items.forEach(item => {
                itemsHtml += `
                    <li style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); list-style: none;">
                        <span style="color: var(--text-muted); font-size: 1.05rem;">${item.amount}</span>
                        <span style="color: var(--star-color); font-weight: 700; font-size: 1.2rem;">${item.price}</span>
                    </li>
                `;
            });
        }
        itemsHtml += '</ul>';

        starsGrid.innerHTML += `
            <div class="${cardClass}">
                ${isPop}
                <div class="card-title" style="margin-bottom: 5px; color: #fff; font-size: 1.8rem;">${pack.name}</div>
                ${itemsHtml}
                <button class="cyber-btn" onclick="window.location.href='${SITE_DATA.links.buyLink}'">Sifariş Ver</button>
            </div>
        `;
    });

    // 5. NFT Kartlarını Göstərmə Funksiyası (Google Sheets və ya Manual)
    const nftsGrid = document.getElementById('nfts-grid');

    function renderNFTs(nftArray) {
        if (!nftArray || nftArray.length === 0) {
            nftsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Hal-hazırda aktiv NFT satışda yoxdur, amma yaxın gələcəkdə nadir və eksklüziv kolleksiyalar təqdim olunacaq.<br>Siz ilk xəbərdar olanlardan olun və nadir rəqəmsal əsərləri əldə etmək fürsətini qaçırmayın.</p>';
            return;
        }

        nftsGrid.innerHTML = '';
        nftArray.forEach(nft => {
            nftsGrid.innerHTML += `
                <div class="card nft-card">
                    <img src="${nft.image}" alt="${nft.name}" class="nft-image">
                    <div class="card-title" style="text-align: center;">${nft.name}</div>
                    
                    <div class="nft-details">
                        <div class="nft-detail-row">
                            <span class="nft-detail-label">Model:</span>
                            <span class="nft-detail-value" style="font-weight: 600;">${nft.modelName} <span style="color: var(--accent-blue); margin-left: 5px;">${nft.modelRarity}</span></span>
                        </div>
                        <div class="nft-detail-row">
                            <span class="nft-detail-label">Symbol:</span>
                            <span class="nft-detail-value" style="font-weight: 600;">${nft.symbolName} <span style="color: var(--accent-blue); margin-left: 5px;">${nft.symbolRarity}</span></span>
                        </div>
                        <div class="nft-detail-row">
                            <span class="nft-detail-label">Backdrop:</span>
                            <span class="nft-detail-value" style="font-weight: 600;">${nft.backdropName} <span style="color: var(--accent-blue); margin-left: 5px;">${nft.backdropRarity}</span></span>
                        </div>
                    </div>
                    
                    <div class="card-price" style="text-align: center; font-size: 2rem; margin-top: 15px; margin-bottom: 20px;">${nft.price}</div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button class="cyber-btn nft-btn" style="flex: 1;" onclick="window.location.href='${SITE_DATA.links.buyLink}'">Sifariş</button>
                        <button class="cyber-btn nft-btn" style="flex: 1; background: transparent; border: 1px solid var(--accent-blue); color: var(--accent-blue);" onclick="window.location.href='${nft.link}'">Link</button>
                    </div>
                </div>
            `;
        });
    }

    // Google Cədvəli çağırırıq (Əgər ID yazılıbsa)
    if (SITE_DATA.nftGoogleSheetId) {
        nftsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Məlumatlar cədvəldən yüklənir...</p>';
        const url = `https://docs.google.com/spreadsheets/d/${SITE_DATA.nftGoogleSheetId}/gviz/tq?tqx=out:json`;

        fetch(url)
            .then(res => res.text())
            .then(text => {
                const jsonStr = text.substring(47).slice(0, -2);
                const json = JSON.parse(jsonStr);

                // Məcburi sütunları özümüz veririk çünki bəzən Google ilk sətri başlıq kimi tanımır
                const expectedCols = ["name", "image", "link", "modelName", "modelRarity", "symbolName", "symbolRarity", "backdropName", "backdropRarity", "price"];

                const fetchedNfts = [];
                json.table.rows.forEach(r => {
                    // Əgər ilk sətir sadəcə başlıqdırsa (name sözü varsa) onu atlayırıq
                    if (r.c[0] && r.c[0].v === 'name') return;

                    const rowObj = {};
                    expectedCols.forEach((col, i) => {
                        rowObj[col] = r.c[i] && r.c[i].v !== null ? r.c[i].v : "";
                    });

                    // Sətir boşdursa (və ya səhvdirsə) əlavə etmirik
                    if (rowObj.name || rowObj.image) {
                        fetchedNfts.push(rowObj);
                    }
                });

                renderNFTs(fetchedNfts);
            })
            .catch(err => {
                console.error("Cədvəl xətası:", err);
                renderNFTs(SITE_DATA.nfts); // Xəta baş versə köhnə (data.js) datanı yüklə
            });
    } else {
        renderNFTs(SITE_DATA.nfts);
    }

});

// TABLAR ÜÇÜN FUNKSİYA
function switchTab(tabId, btnElement) {
    // Prevent default scroll if it's an a tag
    event.preventDefault();

    // Bütün tabları gizlət
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active-tab');
    });

    // Seçilən tabı göstər
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active-tab');
        window.scrollTo(0, 0); // Səhifənin başına qayıt
    }

    // Bütün menyu linklərindən "active" sinfini sil
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Əgər kliklənən element varsa ona "active" əlavə et
    if (btnElement && btnElement.classList.contains('nav-btn')) {
        btnElement.classList.add('active');
    }
}
