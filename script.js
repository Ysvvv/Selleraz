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
                    <div class="nft-image-wrapper">
                        <img src="${nft.image}" alt="${nft.name}" class="nft-image">
                        <div class="nft-name-overlay">${nft.name}</div>
                        <div class="nft-details-tooltip">
                            <div class="nft-detail-row">
                                <span class="nft-detail-label">Model</span>
                                <span class="nft-detail-value">${nft.modelName} <span style="color: var(--accent-blue);">${nft.modelRarity}</span></span>
                            </div>
                            <div class="nft-detail-row">
                                <span class="nft-detail-label">Symbol</span>
                                <span class="nft-detail-value">${nft.symbolName} <span style="color: var(--accent-blue);">${nft.symbolRarity}</span></span>
                            </div>
                            <div class="nft-detail-row">
                                <span class="nft-detail-label">Backdrop</span>
                                <span class="nft-detail-value">${nft.backdropName} <span style="color: var(--accent-blue);">${nft.backdropRarity}</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="nft-card-footer">
                        <span class="nft-card-price">${nft.price}</span>
                        <div class="nft-card-actions">
                            <a href="${SITE_DATA.links.buyLink}" class="nft-mini-btn primary">Al</a>
                            <a href="${nft.link}" class="nft-mini-btn outline">Link</a>
                        </div>
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

    // 6. GIVEAWAY SİSTEMİ
    renderGiveaways();

});

// ==========================================
// GIVEAWAY RENDER VƏ COUNTDOWN FUNKSİYALARI
// ==========================================

function renderGiveaways() {
    const container = document.getElementById('giveaway-container');
    if (!container || !SITE_DATA.giveaways) return;

    const activeGiveaways = SITE_DATA.giveaways.filter(g => g.active && !g.winner);
    if (activeGiveaways.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    activeGiveaways.forEach(giveaway => {
        const now = new Date().getTime();
        const endTime = new Date(giveaway.endDate).getTime();
        const isEnded = now >= endTime;
        const totalSlots = giveaway.totalSlots || 10;
        const filledSlots = giveaway.filledSlots || 0;
        const isSoldOut = filledSlots >= totalSlots;
        const slotsRemaining = totalSlots - filledSlots;
        const slotPercent = Math.round((filledSlots / totalSlots) * 100);

        // Şərtlər HTML
        let conditionsHtml = '';
        if (giveaway.conditions && giveaway.conditions.length > 0) {
            conditionsHtml = `
                <div class="giveaway-conditions">
                    <div class="giveaway-conditions-title"></div>
                    <ul class="giveaway-conditions-list">
                        ${giveaway.conditions.map((c, i) => `
                            <li>
                                <span class="condition-icon">✓</span>
                                <span>${c}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Status badge
        let statusBadge;
        if (isSoldOut) {
            statusBadge = `<div class="giveaway-ended-badge">Dolub</div>`;
        } else if (isEnded) {
            statusBadge = `<div class="giveaway-ended-badge">Yoxdur</div>`;
        } else {
            statusBadge = `<div class="giveaway-live-badge"><span class="giveaway-live-dot"></span>Canlı</div>`;
        }

        // Düymə
        let btnHtml;
        if (isSoldOut) {
            btnHtml = ``;
        } else if (isEnded) {
            btnHtml = `<button class="giveaway-participate-btn ended" disabled>Çekiliş Başa Çatıb</button>`;
        } else {
            btnHtml = `<a href="${giveaway.participateLink}" target="_blank" class="giveaway-participate-btn">${giveaway.price || '1 ₼'}</a>`;
        }

        // Slot progress bar rəngi
        const progressColor = slotPercent >= 80 ? '#ff5252' : slotPercent >= 50 ? '#ffa726' : 'var(--accent-blue)';



        html += `
            <div class="giveaway-card" id="giveaway-${giveaway.id}">
                <div class="giveaway-inner">
                    <!-- Sol tərəf — NFT və ya Böyük Şəkil -->
                    <div class="giveaway-nft-side${giveaway.imageOnly ? ' giveaway-image-only-side' : ''}">
                        ${giveaway.imageOnly ? `
                            <img src="${giveaway.largeImage}" alt="${giveaway.title}" class="giveaway-large-image" onerror="this.style.background='rgba(255,255,255,0.05)';">
                        ` : `
                            <img src="${giveaway.nft.image}" alt="${giveaway.nft.name}" class="giveaway-nft-image" onerror="this.style.background='linear-gradient(135deg, rgba(0,136,204,0.2), rgba(163,125,252,0.2))'; this.style.display='flex';">
                            <div class="giveaway-nft-name">${giveaway.nft.name}</div>
                            <div class="giveaway-nft-details">
                                <div class="giveaway-nft-detail-row">
                                    <span class="giveaway-nft-detail-label">Model</span>
                                    <span class="giveaway-nft-detail-value">${giveaway.nft.modelName} <span class="rarity">${giveaway.nft.modelRarity}</span></span>
                                </div>
                                <div class="giveaway-nft-detail-row">
                                    <span class="giveaway-nft-detail-label">Symbol</span>
                                    <span class="giveaway-nft-detail-value">${giveaway.nft.symbolName} <span class="rarity">${giveaway.nft.symbolRarity}</span></span>
                                </div>
                                <div class="giveaway-nft-detail-row">
                                    <span class="giveaway-nft-detail-label">Backdrop</span>
                                    <span class="giveaway-nft-detail-value">${giveaway.nft.backdropName} <span class="rarity">${giveaway.nft.backdropRarity}</span></span>
                                </div>
                            </div>
                            <a href="${giveaway.nft.link}" class="giveaway-nft-link-btn">
                                <span style="margin-right: 8px;"></span> Link
                            </a>
                        `}
                    </div>

                    <!-- Sağ tərəf — Məlumat -->
                    <div class="giveaway-info-side">
                        <div class="giveaway-header">
                            <div class="giveaway-title">${giveaway.title}</div>
                            ${statusBadge}
                        </div>

                        <p class="giveaway-desc">${giveaway.description}</p>



                        <!-- Slot Progress -->
                        <div class="giveaway-slots-section">
                            <div class="giveaway-slots-header">
                                <span class="giveaway-slots-label">SLOTLAR</span>
                                <span class="giveaway-slots-count"><strong>${filledSlots}</strong> / ${totalSlots} dolu</span>
                            </div>
                            <div class="giveaway-slots-bar">
                                <div class="giveaway-slots-fill" style="width: ${slotPercent}%; background: ${progressColor};"></div>
                            </div>
                        </div>

                        <!-- Geri Sayım -->
                        <div class="giveaway-countdown-section">
                            <div class="giveaway-countdown-label">Qalan vaxt</div>
                            <div class="giveaway-countdown" id="countdown-${giveaway.id}">
                                <div class="countdown-box">
                                    <span class="countdown-value" data-unit="days">00</span>
                                    <span class="countdown-unit">Gün</span>
                                </div>
                                <div class="countdown-box">
                                    <span class="countdown-value" data-unit="hours">00</span>
                                    <span class="countdown-unit">Saat</span>
                                </div>
                                <div class="countdown-box">
                                    <span class="countdown-value" data-unit="minutes">00</span>
                                    <span class="countdown-unit">Dəqiqə</span>
                                </div>
                                <div class="countdown-box">
                                    <span class="countdown-value" data-unit="seconds">00</span>
                                    <span class="countdown-unit">Saniyə</span>
                                </div>
                            </div>
                        </div>

                        ${conditionsHtml}



                        <div class="giveaway-winners">
                            Sadəcə <strong>${giveaway.winnersCount}</strong> nəfər qazanacaq
                        </div>

                        ${btnHtml}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Countdown taymerləri başlat
    activeGiveaways.forEach(giveaway => {
        startCountdown(giveaway.id, giveaway.endDate);
    });
}

function startCountdown(giveawayId, endDateStr) {
    const countdownEl = document.getElementById(`countdown-${giveawayId}`);
    if (!countdownEl) return;

    const endTime = new Date(endDateStr).getTime();

    function update() {
        const now = new Date().getTime();
        const diff = endTime - now;

        if (diff <= 0) {
            // Vaxt bitdi
            const values = countdownEl.querySelectorAll('.countdown-value');
            values.forEach(v => v.textContent = '00');

            // Badge-i dəyiş
            const card = document.getElementById(`giveaway-${giveawayId}`);
            if (card) {
                const liveBadge = card.querySelector('.giveaway-live-badge');
                if (liveBadge) {
                    liveBadge.outerHTML = '<div class="giveaway-ended-badge">Bitib</div>';
                }

                const btn = card.querySelector('.giveaway-participate-btn');
                if (btn && !btn.classList.contains('ended')) {
                    btn.outerHTML = '<button class="giveaway-participate-btn ended" disabled>Çekiliş Başa Çatıb</button>';
                }
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = countdownEl.querySelector('[data-unit="days"]');
        const hoursEl = countdownEl.querySelector('[data-unit="hours"]');
        const minutesEl = countdownEl.querySelector('[data-unit="minutes"]');
        const secondsEl = countdownEl.querySelector('[data-unit="seconds"]');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        requestAnimationFrame(() => setTimeout(update, 1000));
    }

    update();
}

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


