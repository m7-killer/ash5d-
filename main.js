import { saveCommissionToDB, recordVisitor, listenToConfig, isDbActive } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('ASH Digital Hub Initialized');
    
    // Record visitor in Firebase if DB is active
    recordVisitor();
    
    // test
    // Multi-language support
    const translations = {
        ar: {
            nav_home: 'الرئيسية',
            nav_clips: 'مقاطع',
            nav_schedule: 'جدول البث',
            nav_commissions: 'الطلبات',
            nav_about: 'عن آش',
            nav_news: 'الأخبار',
            nav_credits: 'الشكر والتقدير',
            nav_fan_art: 'فن المعجبين',
            clips_title: 'أحدث المقاطع',
            news_title: 'أحدث الأخبار',
            news_insta_title: 'ريلز انستغرام',
            news_insta_desc: 'المقاطع والريلز الجديدة على انستغرام ستظهر هنا تلقائياً.',
            news_insta_btn: 'شاهد على انستغرام',
            news_tiktok_title: 'فيديو تيك توك',
            news_tiktok_desc: 'مقاطع تيك توك الجديدة سيتم عرضها مباشرة في هذه المساحة.',
            news_tiktok_btn: 'شاهد على تيك توك',
            commissions_title: 'طلبات الرسم',
            commissions_btn: 'فتح الطلبات',
            commissions_modal_title: 'طلب رسم إيموتات',
            commissions_price_starting: 'تبدأ من $',
            commissions_option_1: 'إيموت واحد',
            commissions_option_3: '3 إيموتات',
            commissions_option_5: '5 إيموتات',
            commissions_option_custom: 'عدد مخصص',
            commissions_terms_accept: 'أوافق على الشروط للبدء',
            commissions_start_request: 'بدء الطلب',
            commissions_chat_placeholder: 'اكتب رسالتك هنا...',
            commissions_send_msg: 'إرسال',
            commissions_chat_title: 'الدردشة مع الفنان',
            discord_signin: 'تسجيل الدخول باستخدام ديسكورد',
            clip_label_racist: 'مقطع عنصري',
            hero_title: 'آش',
            hero_subtitle: 'احسنت صنعاً يا بطل ✨',
            role_handle: '@ASH5D',
            role_content: 'صانع محتوى',
            role_dev: 'مبرمج',
            role_designer: 'رسام',
            follow_btn: 'تابع القناة',
            dont_click_btn: "لا تضغط",
            status_offline: 'أوفلاين',
            status_online: 'أونلاين',
            section_view_all: 'عرض الكل',
            schedule_title: 'جدول بث آش',
            stream_starts: 'يبدأ في: ',
            about_title: 'مرحباً! أنا آش ✨',
            about_name: 'اش ستريمر فيتيوبر احب الرسم واللعب واقضي اغلب وقتي بين اللوحه والشاشه',
            about_p1: 'احب الالوان الخياليه مثل الوردي والبنفسجي والازرق',
            about_p2: 'انا اش اخترت الاسم لان شعري رمادي <img src="https://cdn.discordapp.com/emojis/1393399566728171550.webp?size=40" class="about-emoji">',
            about_p3: 'فيتيوبر نص قط تصميمها بسيط لاني مابي اتعب احد برسمها <img src="https://cdn.discordapp.com/emojis/1374426150763237477.webp?size=40" class="about-emoji">',
            about_p4: 'جمهوري اسميه frens لان وش الحياه بدون اصدقاء؟',
            about_p5: 'احب ارسم واحب القطط اكثر شي بالحياه',
            fan_art_title: 'فن المعجبين',
            view_all: 'عرض الكل',
            hide_all: 'إخفاء الكل',
            credits_section_title: 'المساهمين',
            credits_visit: 'زيارة الملف',
            credits_linkpea_role: 'مشاهد',
            credits_linkpea_desc: 'Killer Lover',
            credits_mona_role: 'مصمم شاشة الانتظار',
            credits_mona_desc: 'تصميم شاشة العودة قريباً',
            credits_tvj_role: 'مصمم الخلفية',
            credits_tvj_desc: 'تصميم خلفية البث',
            credits_alznoy_role: 'مبرمج',
            credits_alznoy_desc: 'برمج بوت ديسكورد وموقع الكتروني',
            stat_followers: 'متابع',
            stat_streams: 'بث',
            stat_hours: 'ساعة بث',
            stat_community: 'مجتمع نشط',
            stat_active_value: 'نشط',
            footer_join_title: 'انضم إلى مجتمع آش',
            footer_join_desc: 'تابعني على منصات التواصل الاجتماعي للبقاء على اطلاع بآخر التحديثات والأخبار',
            footer_stream_time: 'أوقات البث عشوائية',
            footer_community_title: 'المجتمع',
            footer_discord_btn: 'انضم إلى الديسكورد',
            footer_copyright: '© 2026 آش 5دي . جميع الحقوق محفوظة',
            footer_made_with: 'صنع بكل حب ❤️ Vault',
            footer_quote: '"احسنت صنعاً يا بطل"',
            social_twitch: 'تويتش',
            social_kick: 'كيك',
            social_twitter: 'تويتر',
            social_instagram: 'انستغرام',
            social_discord: 'ديسكورد',
            social_tiktok: 'تيك توك',
            stream_title_drawing: 'رسم مع الأصدقاء',
            stream_title_random: 'لعب ألعاب عشوائية',
            stream_title_flora: 'البث حسب مزاج فلورا'
        },
        en: {
            nav_home: 'Home',
            nav_clips: 'Clips',
            nav_schedule: 'Schedule',
            nav_commissions: 'Commissions',
            nav_about: 'About',
            nav_news: 'News',
            nav_credits: 'Credits',
            nav_fan_art: 'Fan Art',
            clips_title: 'Latest Clips',
            news_title: 'Latest News',
            news_insta_title: 'Instagram Reel',
            news_insta_desc: 'New Instagram posts and reels will automatically appear here when uploaded.',
            news_insta_btn: 'View on Instagram',
            news_tiktok_title: 'TikTok Video',
            news_tiktok_desc: 'New TikTok videos and clips will be showcased directly in this space.',
            news_tiktok_btn: 'View on TikTok',
            commissions_title: 'Art Commissions',
            commissions_btn: 'Open Commissions',
            commissions_modal_title: 'Emote Commissions',
            commissions_price_starting: 'Starting at $',
            commissions_option_1: '1 Emote',
            commissions_option_3: '3 Emotes',
            commissions_option_5: '5 Emotes',
            commissions_option_custom: 'Custom Number Emote',
            commissions_terms_accept: 'Accept terms to start request',
            commissions_start_request: 'Start Request',
            commissions_chat_placeholder: 'Type your message here...',
            commissions_send_msg: 'Send',
            commissions_chat_title: 'Chat with Artist',
            discord_signin: 'Sign in with Discord',
            clip_label_racist: 'Racist clip',
            hero_title: 'ASH',
            hero_subtitle: 'Way To Go Superstar✨',
            role_handle: '@ASH5D',
            role_content: 'Content Creator',
            role_dev: 'Developer',
            role_designer: 'Artist',
            follow_btn: 'Follow the channel',
            dont_click_btn: "Don't Click",
            status_offline: 'Offline',
            status_online: 'Live Now',
            section_view_all: 'View all',
            schedule_title: 'ASH Stream Schedule',
            stream_starts: 'Starts: ',
            about_title: "Hello! I'm ASH ✨",
            about_name: 'ASH is a streamer & VTuber. I love drawing and gaming, and spend most of my time between the canvas and the screen.',
            about_p1: 'I love magical colors like pink, purple, and blue.',
            about_p2: 'I am ASH, I chose this name because my hair is gray <img src="https://cdn.discordapp.com/emojis/1393399566728171550.webp?size=40" class="about-emoji">',
            about_p3: 'A half-cat VTuber with a simple design so I don\'t trouble anyone with drawing it <img src="https://cdn.discordapp.com/emojis/1374426150763237477.webp?size=40" class="about-emoji">',
            about_p4: 'I call my audience "frens" because what is life without friends?',
            about_p5: 'I love to draw and I love cats more than anything in life.',
            fan_art_title: 'Fan Art',
            view_all: 'View all',
            hide_all: 'Hide all',
            credits_section_title: 'Contributors',
            credits_visit: 'Visit Profile',
            credits_linkpea_role: 'VIEWER',
            credits_linkpea_desc: 'Killer Lover',
            credits_mona_role: 'Waiting Screen Designer',
            credits_mona_desc: 'Soon screen design',
            credits_tvj_role: 'Background Designer',
            credits_tvj_desc: 'Stream background design',
            credits_alznoy_role: 'Programmer',
            credits_alznoy_desc: 'Discord bot & website',
            stat_followers: 'FOLLOWERS',
            stat_streams: 'STREAMS',
            stat_hours: 'HOURS LIVE',
            stat_community: 'COMMUNITY',
            stat_active_value: 'Active',
            footer_join_title: 'Join ASH Community',
            footer_join_desc: 'Follow me on social media to stay updated with the latest news and updates',
            footer_stream_time: 'Random streams time',
            footer_community_title: 'Community',
            footer_discord_btn: 'Join Discord',
            footer_copyright: '© 2026 Ash5d . All Rights Reserved',
            footer_made_with: 'Made with love ❤️ Vault',
            footer_quote: '"Way to go superstar"',
            social_twitch: 'Twitch',
            social_kick: 'Kick',
            social_twitter: 'Twitter',
            social_instagram: 'Instagram',
            social_discord: 'Discord',
            social_tiktok: 'TikTok',
            stream_title_drawing: 'Drawing with friends',
            stream_title_random: 'Playing random games',
            stream_title_flora: "Stream according to flora's mood"
        }
    };

    let currentLang = localStorage.getItem('selectedLanguage') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update lang toggle button text
        const langBtnSpan = document.querySelector('#lang-btn span');
        if (langBtnSpan) {
            langBtnSpan.innerText = lang === 'en' ? 'AR' : 'EN';
        }

        updateStartRequestButton();
    }

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }

    // Initialize language
    updateLanguage(currentLang);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Active Nav State
    const navLinks = document.querySelectorAll('.nav-links .nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Add scroll listener for active state
    window.addEventListener('scroll', updateActiveNav);
    // Initial call to set active state on load
    updateActiveNav();

    navLinks.forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('main-nav')?.classList.remove('open');
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    // Live Status Logic
    const statusBadge = document.getElementById('live-status');
    const statusText = statusBadge?.querySelector('span');
    const kickStatusBadge = document.getElementById('kick-live-status');
    const kickStatusText = kickStatusBadge?.querySelector('span');

    function setOnline(isOnline) {
        if (!statusBadge || !statusText) return;

        if (isOnline) {
            statusBadge.classList.add('online');
            statusText.setAttribute('data-i18n', 'status_online');
            statusText.innerText = translations[currentLang].status_online;
        } else {
            statusBadge.classList.remove('online');
            statusText.setAttribute('data-i18n', 'status_offline');
            statusText.innerText = translations[currentLang].status_offline;
        }
    }

    function setKickOnline(isOnline) {
        if (!kickStatusBadge || !kickStatusText) return;

        if (isOnline) {
            kickStatusBadge.classList.add('online');
            kickStatusText.setAttribute('data-i18n', 'status_online');
            kickStatusText.innerText = translations[currentLang].status_online;
        } else {
            kickStatusBadge.classList.remove('online');
            kickStatusText.setAttribute('data-i18n', 'status_offline');
            kickStatusText.innerText = translations[currentLang].status_offline;
        }
    }

    // Stream status check for Twitch and Kick
    async function checkStreamStatus() {
        try {
            // Twitch Status
            const twResponse = await fetch('https://decapi.me/twitch/uptime/ash5d');
            const twData = await twResponse.text();
            const isTwLive = !twData.toLowerCase().includes('offline');
            setOnline(isTwLive);

            // Kick Status (Using AllOrigins proxy as a more robust fallback)
            const kickUrl = 'https://kick.com/api/v1/channels/ash5d';
            const kickResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(kickUrl)}`);
            
            if (kickResponse.ok) {
                const data = await kickResponse.json();
                if (data.contents) {
                    const kickData = JSON.parse(data.contents);
                    const isKickLive = kickData.livestream !== null;
                    setKickOnline(isKickLive);
                }
            }
        } catch (error) {
            console.error('Failed to fetch stream status:', error);
            // Default to offline on error
            setOnline(false);
            setKickOnline(false);
        }
    }

    // Automated Latest Clip Logic
    async function loadLatestClip() {
        const clipIframe = document.getElementById('latest-clip-iframe');
        if (!clipIframe) return;

        try {
            // Using Twitch's public GQL to get the latest clip slug
            // This works without an OAuth token for public data
            const response = await fetch('https://gql.twitch.tv/gql', {
                method: 'POST',
                headers: {
                    'Client-ID': 'kimne78kx3ncx6brs9et7cd9hr7z1qe',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{
                    operationName: "ClipsCards__User",
                    variables: {
                        login: "ash5d",
                        limit: 1,
                        cursor: null,
                        criteria: { filter: "ALL_TIME" }
                    },
                    extensions: {
                        persistedQuery: {
                            version: 1,
                            sha256Hash: "d5bad44ad3c1fc60317e0ef5f7243c5b36449bccb7dd680376d494f1ff8c62b9"
                        }
                    }
                }])
            });

            const result = await response.json();
            const clips = result[0]?.data?.user?.clips?.edges;

            if (clips && clips.length > 0) {
                const latestSlug = clips[0].node.slug;
                const parentHost = window.location.hostname;
                clipIframe.src = `https://clips.twitch.tv/embed?clip=${latestSlug}&parent=${parentHost}`;
                console.log('Latest clip loaded:', latestSlug);
            }
        } catch (error) {
            console.error('Failed to auto-load latest clip:', error);
            // Keeps the hardcoded fallback if API fails
        }
    }

    checkStreamStatus();
    loadLatestClip();
    setInterval(checkStreamStatus, 60000); // Check every minute

    // Fan Art View All Toggle
    const viewAllBtn = document.querySelector('.view-all-arts-btn');
    const fanArtGrid = document.querySelector('.fan-art-grid');

    if (viewAllBtn && fanArtGrid) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isCollapsing = fanArtGrid.classList.toggle('expanded');

            const btnText = viewAllBtn.querySelector('span');


            if (isCollapsing) {
                btnText.setAttribute('data-i18n', 'hide_all');
                btnText.innerText = translations[currentLang].hide_all;

            } else {
                btnText.setAttribute('data-i18n', 'view_all');
                btnText.innerText = translations[currentLang].view_all;


                // Scroll back to top of fan art section when hiding
                document.getElementById('fan-art')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    // Scroll Glitch Logic
    let isScrolling;
    let glitchInterval;

    window.addEventListener('scroll', () => {
        // Clear previous state
        window.clearTimeout(isScrolling);
        if (!glitchInterval) {
            glitchInterval = setInterval(() => {
                const rand = Math.floor(Math.random() * 3) + 1;
                document.body.classList.remove('glitch-1', 'glitch-2', 'glitch-3');
                document.body.classList.add(`glitch-${rand}`);
            }, 50); // Flicker every 50ms
        }

        isScrolling = setTimeout(() => {
            clearInterval(glitchInterval);
            glitchInterval = null;
            document.body.classList.remove('glitch-1', 'glitch-2', 'glitch-3');
        }, 150);
    }, false);

    // Cat Footprint Click Effect
    document.addEventListener('click', (e) => {
        const footprint = document.createElement('div');
        footprint.className = 'cat-footprint';

        // Random rotation and variety
        const rotation = Math.random() * 360;
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        footprint.style.setProperty('--rot', `${rotation}deg`);
        footprint.style.color = randomColor;
        footprint.style.filter = `drop-shadow(0 0 8px ${randomColor})`;

        // Paw SVG
        footprint.innerHTML = `
            <svg viewBox="0 0 50 50" width="100%" height="100%" fill="currentColor">
                <path d="M25,31c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S20.6,31,25,31z"/>
                <circle cx="12" cy="22" r="6"/>
                <circle cx="21" cy="12" r="7"/>
                <circle cx="29" cy="12" r="7"/>
                <circle cx="38" cy="22" r="6"/>
            </svg>
        `;

        footprint.style.left = `${e.clientX}px`;
        footprint.style.top = `${e.clientY}px`;

        document.body.appendChild(footprint);

        // Remove after animation
        setTimeout(() => footprint.remove(), 1500);
    });

    // Commissions Logic
    const commissionsModal = document.getElementById('commissions-modal');
    // If we are on commissions.html, this will exist. If on index.html, it's null (since we removed it).
    const termsCheckbox = document.getElementById('vgen-accept-terms');
    const startRequestBtn = document.getElementById('vgen-start-request');
    const closeCommissionsBtn = commissionsModal ? commissionsModal.querySelector('.modal-close') : null;
    
    // WEEBOOK AND CHANNEL CONFIG
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1497176661089849505/TQhpStDViMkl20szKdJrqeG9ixPvu7TIv60UF_OYocUGNB1Y_Us2-9FHhV_ZS5dLlnSk';
    const DISCORD_CHANNEL_ID = '1497990868001357825';
    const DISCORD_BOT_TOKEN = 'MTQ1ODE2NTY3Nzk4NTc2MzQ3NA.GMm2Ng.tHYFVU6lar7PHyOrcsI7AZdp8frZrmBTC_hxps';
    
    // CORS Proxy for fetching replies (GET only)
    const CORS_PROXY = 'https://corsproxy.io/?url=';
    let lastMessageId = null;
    let isDiscordLoggedIn = false;
    let isCommissionsOpenGlobal = true;

    function updateStartRequestButton() {
        const startReqBtn = document.getElementById('vgen-start-request');
        if (!startReqBtn) return;

        if (!isCommissionsOpenGlobal) {
            startReqBtn.disabled = true;
            startReqBtn.textContent = currentLang === 'ar' ? 'الطلبات مغلقة حالياً' : 'Commissions Closed';
        } else if (!isDiscordLoggedIn) {
            startReqBtn.disabled = true;
            startReqBtn.style.opacity = '0.7';
            startReqBtn.textContent = currentLang === 'ar' ? 'سجل دخول أولاً' : 'Sign in with Discord first';
        } else {
            startReqBtn.disabled = false;
            startReqBtn.style.opacity = '1';
            startReqBtn.textContent = translations[currentLang].commissions_start_request;
        }
    }

    if (closeCommissionsBtn && commissionsModal) {
        closeCommissionsBtn.addEventListener('click', () => {
            commissionsModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Discord OAuth Login Logic
    const discordLoginBtn = document.getElementById('discord-login-btn');
    const discordUserInfo = document.getElementById('discord-user-info');
    const discordAvatar = document.getElementById('discord-avatar');
    const discordUsernameDisplay = document.getElementById('discord-username-display');
    const chatUsernameInput = document.getElementById('chat-username');
    const chatUserIdInput = document.getElementById('chat-user-id');
    
    // Extracted Client ID from the bot token provided earlier
    const CLIENT_ID = '1458165677985763474';
    // Use the current origin and pathname for the redirect URI
    const REDIRECT_URI = window.location.origin + window.location.pathname;

    // Helper to apply Discord user info to UI
    function applyDiscordUser(user) {
        const { username, id, avatar } = user;
        if (!discordLoginBtn || !discordUserInfo) return;

        discordLoginBtn.style.display = 'none';
        discordUserInfo.style.display = 'flex';
        discordUsernameDisplay.textContent = username;
        
        if (avatar) {
            discordAvatar.src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
        } else {
            discordAvatar.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
        }
        
        if (chatUsernameInput) {
            chatUsernameInput.value = username;
            chatUsernameInput.readOnly = true;
        }
        if (chatUserIdInput) {
            chatUserIdInput.value = id;
        }

        isDiscordLoggedIn = true;
        updateStartRequestButton();
    }

    if (discordLoginBtn) {
        discordLoginBtn.addEventListener('click', () => {
            const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
            window.location.href = oauthUrl;
        });
    }

    // Check for OAuth token in URL fragment
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken) {
        console.log('Attempting Discord login with token...');
        // Fetch user data from Discord
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
        .then(result => {
            if (!result.ok) throw new Error('Discord API error: ' + result.status);
            return result.json();
        })
        .then(response => {
            if (response.id) {
                console.log('Discord login successful:', response.username);
                localStorage.setItem('discordUser', JSON.stringify(response));
                applyDiscordUser(response);
            }
            // Clean up the URL hash
            window.history.replaceState(null, null, window.location.pathname);
        })
        .catch(err => {
            console.error('Discord login failed:', err);
            // If token is invalid, clean it up
            window.history.replaceState(null, null, window.location.pathname);
        });
    } else {
        // Check for existing session
        const savedUser = localStorage.getItem('discordUser');
        if (savedUser) {
            try {
                applyDiscordUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('discordUser');
            }
        }
    }

    // Call this immediately to set initial button state
    updateStartRequestButton();

    // Start polling automatically if on the standalone commissions page
    if (window.location.pathname.includes('commissions.html') || commissionsModal) {
        if (DISCORD_BOT_TOKEN) {
            startPolling();
        }
    }

    // Listen to Commission Configuration (Gallery, Pricing & Status) - RUN GLOBALLY
    listenToConfig((config) => {
        if (!config) return;
        console.log('Received Commission Config:', config);

        // Update Gallery
        const gallery = document.getElementById('vgen-gallery-images');
        if (gallery && config.images && config.images.length > 0) {
            gallery.innerHTML = '';
            config.images.forEach((url, i) => {
                const img = document.createElement('img');
                img.src = url;
                img.style.display = i === 0 ? 'block' : 'none';
                img.alt = `Emote Preview ${i + 1}`;
                gallery.appendChild(img);
            });
            // Add dots if multiple
            if (config.images.length > 1) {
                const dotsCont = document.createElement('div');
                dotsCont.className = 'vgen-gallery-dots';
                config.images.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = `dot ${i === 0 ? 'active' : ''}`;
                    dot.onclick = () => {
                        Array.from(gallery.querySelectorAll('img')).forEach((img, idx) => img.style.display = idx === i ? 'block' : 'none');
                        Array.from(dotsCont.querySelectorAll('.dot')).forEach((d, idx) => d.classList.toggle('active', idx === i));
                    };
                    dotsCont.appendChild(dot);
                });
                gallery.appendChild(dotsCont);
            }
        }

        // Update Pricing Options
        const optionsList = document.getElementById('vgen-options-list');
        const customQtyContainer = document.getElementById('custom-qty-container');
        
        if (optionsList && config.slots && config.slots.length > 0) {
            optionsList.innerHTML = '';
            config.slots.forEach((slot, i) => {
                const label = document.createElement('label');
                label.className = 'vgen-option';
                
                // Check if this is the custom slot (handle 'costume' typo as well)
                const slotLabelLower = slot.label.toLowerCase();
                const isCustom = slotLabelLower.includes('custom') || slotLabelLower.includes('costume');
                const slotValue = isCustom ? 'custom' : slot.value;

                // Attempt to translate common labels
                let displayLabel = slot.label;
                if (slot.label === '1 Emote') displayLabel = translations[currentLang].commissions_option_1;
                else if (slot.label === '3 Emotes') displayLabel = translations[currentLang].commissions_option_3;
                else if (slot.label === '5 Emotes') displayLabel = translations[currentLang].commissions_option_5;
                else if (isCustom) displayLabel = translations[currentLang].commissions_option_custom;

                if (isCustom) {
                    label.classList.add('custom-option-row');
                    label.innerHTML = `
                        <input type="radio" name="emote-option" value="custom" data-price="${slot.price}" data-qty="1" style="display:none;" ${i === 0 ? 'checked' : ''}>
                        <div class="custom-counter">
                            <button type="button" class="counter-btn minus">-</button>
                            <span class="counter-val">1</span>
                            <button type="button" class="counter-btn plus">+</button>
                        </div>
                        <span class="option-label" data-i18n="commissions_option_custom">${displayLabel}</span>
                        <span class="option-price custom-price-display">$${slot.price}</span>
                    `;
                } else {
                    // Find matching key for data-i18n
                    let i18nKey = '';
                    if (slot.label === '1 Emote') i18nKey = 'commissions_option_1';
                    else if (slot.label === '3 Emotes') i18nKey = 'commissions_option_3';
                    else if (slot.label === '5 Emotes') i18nKey = 'commissions_option_5';

                    label.innerHTML = `
                        <input type="radio" name="emote-option" value="${slotValue}" data-price="${slot.price}" ${i === 0 ? 'checked' : ''}>
                        <span class="option-label" ${i18nKey ? `data-i18n="${i18nKey}"` : ''}>${displayLabel}</span>
                        <span class="option-price">$${slot.price}</span>
                    `;
                }
                optionsList.appendChild(label);
            });

            // Update "Starting at" price (Target the specific span for the value)
            const priceStartingDiv = document.querySelector('.price-starting');
            if (priceStartingDiv) {
                const priceValSpan = priceStartingDiv.querySelector('span:not([data-i18n])');
                if (priceValSpan && config.slots.length > 0) {
                    priceValSpan.textContent = config.slots[0].price;
                }
            }
        }

        // Handle Global Commission Status Badge
        const statusBadge = document.getElementById('global-commission-badge');
        const isOpen = config.isCommissionsOpen !== false; // true by default
        
        if (statusBadge) {
            statusBadge.style.display = 'flex';
            statusBadge.className = 'commission-badge ' + (isOpen ? 'open' : 'closed');
            const badgeTextSpan = statusBadge.querySelector('.badge-text');
            
            // Keep translation logic intact by updating both text and innerHTML if not using i18n completely
            if (isOpen) {
                badgeTextSpan.textContent = currentLang === 'ar' ? 'طلبات مفتوحة' : 'OPEN COMMISSIONS';
                badgeTextSpan.setAttribute('data-i18n', 'commission_badge_open');
            } else {
                badgeTextSpan.textContent = currentLang === 'ar' ? 'طلبات مغلقة' : 'CLOSED COMMISSIONS';
                badgeTextSpan.setAttribute('data-i18n', 'commission_badge_closed');
            }
        }

        // Also disable the "Start Request" button if commissions are closed or not logged in
        isCommissionsOpenGlobal = isOpen;
        updateStartRequestButton();

        // Disable "Open Commissions" button on homepage
        const openCommBtn = document.getElementById('open-commissions-btn');
        if (openCommBtn) {
            if (isOpen) {
                openCommBtn.style.pointerEvents = 'auto';
                openCommBtn.style.opacity = '1';
                openCommBtn.querySelector('span').textContent = translations[currentLang].commissions_btn;
            } else {
                openCommBtn.style.pointerEvents = 'none';
                openCommBtn.style.opacity = '0.5';
                openCommBtn.querySelector('span').textContent = currentLang === 'ar' ? 'الطلبات مغلقة' : 'Commissions Closed';
            }
        }
    });

    // Function to send to Discord Webhook
    async function sendToDiscord(message, type = 'Notification', username = 'Guest') {
        console.log(`Sending to Discord: [${type}] ${message}`);
        try {
            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    content: `**[${type}]** (User: ${username}) ${message}\n*Channel: <#${DISCORD_CHANNEL_ID}>*`,
                    username: "ASH Commission Bot",
                    avatar_url: "https://i.postimg.cc/g2dq6KZH/panel-699650139-image-a9cc0c41-1603-4d8c-8856-36dc086fbef6.png"
                })
            });
            return response.ok || response.status === 204;
        } catch (error) {
            console.error('Webhook Error:', error);
            return true; 
        }
    }



    // Global event listener for custom counters
    document.addEventListener('click', (e) => {
        if (e.target.closest('.counter-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.counter-btn');
            const row = btn.closest('.custom-option-row');
            if (!row) return;

            const radio = row.querySelector('input[type="radio"]');
            const valSpan = row.querySelector('.counter-val');
            const priceDisplay = row.querySelector('.custom-price-display');
            let qty = parseInt(valSpan.textContent) || 1;
            const basePrice = parseInt(radio.getAttribute('data-price')) || 20;

            if (btn.classList.contains('minus') && qty > 1) {
                qty--;
            } else if (btn.classList.contains('plus')) {
                qty++;
            }

            valSpan.textContent = qty;
            priceDisplay.textContent = '$' + (qty * basePrice);
            radio.setAttribute('data-qty', qty);
            radio.checked = true;
        }
    });

    if (startRequestBtn) {
        startRequestBtn.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="emote-option"]:checked');
            if (!selectedRadio) return;

            let selectedValue = selectedRadio.value;
            let basePricePerEmote = parseInt(selectedRadio.getAttribute('data-price')) || 20;
            let price = basePricePerEmote;
            let detailString = `${selectedValue} Option`;

            // If it's a fixed number (1, 3, 5) but NOT custom, 
            // ensure the price is always calculated correctly based on the count
            if (selectedValue !== 'custom' && !isNaN(parseInt(selectedValue))) {
                const count = parseInt(selectedValue);
                price = count * basePricePerEmote;
                detailString = `${count} Emote(s)`;
            }

            // Handle Custom Quantity
            if (selectedValue === 'custom') {
                let qty = parseInt(selectedRadio.getAttribute('data-qty')) || 1;
                price = qty * basePricePerEmote;
                detailString = `${qty} Custom Emotes`;
            }

            const chatUsernameInput = document.getElementById('chat-username');
            const chatUserIdInput = document.getElementById('chat-user-id');
            const username = chatUsernameInput ? chatUsernameInput.value.trim() || 'Guest' : 'Guest';
            const userId = chatUserIdInput ? chatUserIdInput.value.trim() || ('guest_' + Math.random().toString(36).substr(2, 9)) : 'Guest';
            
            startRequestBtn.disabled = true;
            startRequestBtn.textContent = 'Opening Chat...';

            // Save to Firebase DB in background
            if (isDbActive) {
                saveCommissionToDB(username, detailString, price).catch(console.error);
            }

            // Still send discord alert in background
            sendToDiscord(`New Commission Request started! Options: ${selectedOption} Emote(s)`, 'COMMISSION', username).catch(console.error);
            
            // Open the new persistent chat window immediately!
            const chatUrl = `chat.html?uid=${encodeURIComponent(userId)}&uname=${encodeURIComponent(username)}`;
            window.open(chatUrl, '_blank', 'width=450,height=600,menubar=no,toolbar=no,location=no,status=no');
            
            setTimeout(() => {
                startRequestBtn.disabled = false;
                startRequestBtn.textContent = 'Start Request';
            }, 1000);
        });
    }

});
