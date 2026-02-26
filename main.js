document.addEventListener('DOMContentLoaded', () => {
    console.log('ASH Digital Hub Initialized');
    // test
    // Multi-language support
    const translations = {
        ar: {
            nav_home: 'الرئيسية',
            nav_clips: 'مقاطع',
            nav_schedule: 'جدول البث',
            nav_about: 'عن آش',
            nav_credits: 'الشكر والتقدير',
            nav_fan_art: 'فن المعجبين',
            clips_title: 'أحدث المقاطع',
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
            social_twitter: 'تويتر',
            social_instagram: 'انستغرام',
            social_discord: 'ديسكورد',
            stream_title_drawing: 'رسم مع الأصدقاء',
            stream_title_random: 'لعب ألعاب عشوائية',
            stream_title_flora: 'البث حسب مزاج فلورا'
        },
        en: {
            nav_home: 'Home',
            nav_clips: 'Clips',
            nav_schedule: 'Schedule',
            nav_about: 'About',
            nav_credits: 'Credits',
            nav_fan_art: 'Fan Art',
            clips_title: 'Latest Clips',
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
            social_twitter: 'Twitter',
            social_instagram: 'Instagram',
            social_discord: 'Discord',
            stream_title_drawing: 'Drawing with friends',
            stream_title_random: 'Playing random games',
            stream_title_flora: "Stream according to flora's mood"
        }
    };

    let currentLang = 'en';

    function updateLanguage(lang) {
        currentLang = lang;
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

    // Mock check (Since Twitch API requires OAuth and Client ID)
    async function checkStreamStatus() {
        try {
            // DecAPI returns the uptime if live, or "Channel is offline" if not.
            // This is a free, CORS-friendly way to check status without an OAuth token.
            const response = await fetch('https://decapi.me/twitch/uptime/ash5d');
            const data = await response.text();

            const isLive = !data.toLowerCase().includes('offline');
            setOnline(isLive);
        } catch (error) {
            console.error('Failed to fetch stream status:', error);
            // Default to mock/previous state if API fails
            setOnline(false);
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
});

