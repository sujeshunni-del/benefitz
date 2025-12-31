/**
 * BETTER CALL IMMIGRATION - GLOBAL STRUCTURE TEMPLATE
 * Handles: Header, Footer, Mobile Dock, Floating Buttons, Styles, Animations, and Navigation Logic.
 */

const GLOBAL_CONFIG = {
    logoUrl: "https://raw.githubusercontent.com/thebettercall/app/9ca2db3d96700f0412c9f2f420422ed1ccfb52bb/Bettercall%20Logo%20SVG%2003.svg",
    destinations: [
        { name: "Montenegro", url: "montenegro.html", flag: "🇲🇪", code: "ME", region: "Non-EU", featured: true },
        { name: "Germany", url: "germany.html", flag: "🇩🇪", code: "DE", region: "Schengen" },
        { name: "Finland", url: "finland.html", flag: "🇫🇮", code: "FI", region: "Schengen" },
        { name: "Sweden", url: "sweden.html", flag: "🇸🇪", code: "SE", region: "Schengen" },
        { name: "Holland", url: "netherlands.html", flag: "🇳🇱", code: "NL", region: "Schengen" },
        { name: "Italy", url: "italy.html", flag: "🇮🇹", code: "IT", region: "Schengen" },
        { name: "France", url: "france.html", flag: "🇫🇷", code: "FR", region: "Schengen" },
        { name: "Poland", url: "poland.html", flag: "🇵🇱", code: "PL", region: "Schengen" },
        { name: "Czech", url: "czech.html", flag: "🇨🇿", code: "CZ", region: "Schengen" },
        { name: "Latvia", url: "latvia.html", flag: "🇱🇻", code: "LV", region: "Schengen" },
        { name: "Slovakia", url: "slovakia.html", flag: "🇸🇰", code: "SK", region: "Schengen" },
        { name: "Croatia", url: "croatia.html", flag: "🇭🇷", code: "HR", region: "Schengen" },
        { name: "Serbia", url: "serbia.html", flag: "🇷🇸", code: "RS", region: "Non-EU" },
        { name: "Macedonia", url: "macedonia.html", flag: "🇲🇰", code: "MK", region: "Non-EU" },
        { name: "Albania", url: "albania.html", flag: "🇦🇱", code: "AL", region: "Non-EU" },
        { name: "Belarus", url: "belarus.html", flag: "🇧🇾", code: "BY", region: "Non-EU" }
    ]
};

class BetterCallPage {
    constructor(config) {
        this.pageConfig = config; // { primaryColor, secondaryColor, countryName }
        this.lenis = null;
        this.init();
    }

    init() {
        this.injectTailwindConfig();
        this.injectStyles();
        this.injectHTML();
        this.initScripts();
    }

    injectTailwindConfig() {
        const script = document.createElement('script');
        script.textContent = `
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Outfit', 'Noto Sans Devanagari', 'Noto Sans Malayalam', 'Noto Sans Tamil', 'Noto Sans Sinhala', 'sans-serif'],
                            serif: ['Outfit', 'sans-serif'], 
                        },
                        colors: {
                            'brand-black': '#0F172A',
                            'brand-grey': '#64748B',
                            'brand-blue': '#2563EB',      
                            'brand-purple': '#7C3AED',     
                            'brand-white': '#FFFFFF',
                            'vfs-teal': '#14B8A6',
                            // Dynamic Country Theme
                            'country-primary': '${this.pageConfig.primaryColor}', 
                            'country-secondary': '${this.pageConfig.secondaryColor}',
                        },
                        animation: {
                            'float': 'float 8s ease-in-out infinite',
                            'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        },
                        keyframes: {
                            float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
                            fadeInUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
                        }
                    }
                }
            }
        `;
        document.head.appendChild(script);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body { 
                background-color: #F8F9FA; 
                background-image: 
                    radial-gradient(circle at 0% 0%, ${this.hexToRgba(this.pageConfig.primaryColor, 0.03)} 0%, transparent 50%), 
                    radial-gradient(circle at 100% 0%, ${this.hexToRgba(this.pageConfig.secondaryColor, 0.05)} 0%, transparent 50%),
                    radial-gradient(circle at 100% 100%, ${this.hexToRgba(this.pageConfig.primaryColor, 0.03)} 0%, transparent 50%);
                background-attachment: fixed;
                color: #0F172A; 
                overflow-x: hidden; 
                font-family: 'Outfit', sans-serif; 
                font-size: 16px; 
            }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #F0F4F8; }
            ::-webkit-scrollbar-thumb { background: ${this.pageConfig.primaryColor}; border-radius: 10px; }

            /* Glass Classes */
            .glass-frosted {
                background: rgba(255, 255, 255, 0.65);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .glass-frosted:hover {
                background: rgba(255, 255, 255, 0.85);
                border-color: ${this.hexToRgba(this.pageConfig.secondaryColor, 0.4)}; 
                box-shadow: 0 15px 40px ${this.hexToRgba(this.pageConfig.primaryColor, 0.1)};
                transform: translateY(-4px);
            }
            .dropdown-glass { 
                background: rgba(255, 255, 255, 0.85); 
                backdrop-filter: blur(20px); 
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.6); 
                box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255,255,255,0.5); 
            }
            .floating-nav {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 9999px; 
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease; transform: translateZ(0); 
            }
            .floating-nav.scrolled { 
                background: rgba(255, 255, 255, 0.9); 
                border-color: ${this.hexToRgba(this.pageConfig.secondaryColor, 0.3)}; 
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 4px 8px ${this.hexToRgba(this.pageConfig.primaryColor, 0.03)}; 
            }
            .glass-input { 
                background: rgba(255, 255, 255, 0.5); 
                border: 1px solid rgba(203, 213, 225, 0.6); 
                color: #0F172A; 
                transition: all 0.3s; 
                backdrop-filter: blur(5px);
            }
            .glass-input:focus { 
                border-color: ${this.pageConfig.primaryColor}; 
                background: rgba(255, 255, 255, 0.9); 
                outline: none; 
                box-shadow: 0 0 0 4px ${this.hexToRgba(this.pageConfig.primaryColor, 0.1)}; 
            }
            .modern-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.6);
                border-radius: 24px; 
                overflow: hidden;
                transition: all 0.3s ease; 
                box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
            }
            .modern-card:hover { 
                background: rgba(255, 255, 255, 0.9); 
                transform: translateY(-5px); 
                box-shadow: 0 20px 50px -12px ${this.hexToRgba(this.pageConfig.primaryColor, 0.15)}; 
                border-color: ${this.hexToRgba(this.pageConfig.secondaryColor, 0.5)}; 
            }
            .job-card-grid {
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.5); 
                border-top: 4px solid ${this.pageConfig.primaryColor}; 
                border-radius: 16px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;
                height: 100%; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; min-height: 140px; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            @media (min-width: 768px) { .job-card-grid { padding: 24px; } }
            .job-card-grid:hover {
                border-color: ${this.hexToRgba(this.pageConfig.secondaryColor, 0.6)}; 
                border-top-color: ${this.pageConfig.secondaryColor}; 
                background: rgba(255, 255, 255, 0.9);
                transform: translateY(-6px); 
                box-shadow: 0 15px 35px -10px ${this.hexToRgba(this.pageConfig.primaryColor, 0.15)};
            }
            .text-country-primary { color: ${this.pageConfig.primaryColor}; }
            .bg-country-primary { background-color: ${this.pageConfig.primaryColor}; }
            .border-country-primary { border-color: ${this.pageConfig.primaryColor}; }
            .text-country-secondary { color: ${this.pageConfig.secondaryColor}; }
            .bg-country-secondary { background-color: ${this.pageConfig.secondaryColor}; }
            .modal-header-country { background-color: ${this.pageConfig.primaryColor}; color: #FFFFFF; }
            .text-highlight { color: ${this.pageConfig.primaryColor}; font-weight: 700; background: ${this.hexToRgba(this.pageConfig.primaryColor, 0.1)}; border-radius: 2px; padding: 0 1px; }
            
            /* Animations */
            .reveal-item {
                opacity: 0; transform: translateY(40px);
                transition: opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1);
                will-change: opacity, transform;
            }
            .reveal-item.active { opacity: 1; transform: translateY(0); }
            .dropdown-menu {
                opacity: 0; visibility: hidden; transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .group:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
            .modal-open { overflow: hidden; }
            .modal-backdrop { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(5px); }
            .modal-scroll {
                overflow-y: auto !important; max-height: 60vh; overscroll-behavior: contain; 
                -webkit-overflow-scrolling: touch; scrollbar-width: thin; 
                scrollbar-color: ${this.pageConfig.secondaryColor} #F1F5F9; padding-right: 6px;
            }
            .modal-scroll::-webkit-scrollbar { width: 6px; }
            .modal-scroll::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 4px; margin: 4px 0; }
            .modal-scroll::-webkit-scrollbar-thumb { background-color: ${this.pageConfig.secondaryColor}; border-radius: 4px; }
            .glass-panel-dock {
                background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(25px) saturate(200%);
                -webkit-backdrop-filter: blur(25px) saturate(200%); border: 1px solid rgba(255, 255, 255, 0.4);
                border-top: 1px solid rgba(255, 255, 255, 0.6); border-bottom: 3px solid ${this.pageConfig.primaryColor};
                box-shadow: 0 20px 50px -10px ${this.hexToRgba(this.pageConfig.primaryColor, 0.25)}; 
                border-radius: 9999px; position: relative; z-index: 50;
            }
            .dock-icon-btn { color: #475569; transition: all 0.3s; }
            .dock-icon-btn.active { color: ${this.pageConfig.primaryColor}; }
            .dock-icon-btn:hover { color: ${this.pageConfig.primaryColor}; transform: translateY(-3px) scale(1.1); }
            .explore-btn-wrapper {
                position: relative; top: -20px; width: 56px; height: 56px; border-radius: 50%;
                background: #FFFFFF; border: 2px solid ${this.pageConfig.primaryColor};
                box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.8), 0 10px 25px ${this.hexToRgba(this.pageConfig.primaryColor, 0.3)};
                display: flex; align-items: center; justify-content: center; transition: all 0.3s; z-index: 10;
            }
            .explore-btn-wrapper:hover { transform: translateY(-4px) scale(1.05); border-color: ${this.pageConfig.secondaryColor}; }
            .explore-icon { font-size: 24px; color: ${this.pageConfig.primaryColor}; }
            .lang-fab-new { position: fixed; bottom: 2rem; left: 2rem; z-index: 50; }
            .lang-toggle-btn {
                background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.5); color: #475569; padding: 0.75rem 1.25rem;
                border-radius: 9999px; box-shadow: 0 8px 32px 0 ${this.hexToRgba(this.pageConfig.primaryColor, 0.1)};
                display: flex; align-items: center; gap: 0.75rem; cursor: pointer; transition: all 0.3s ease;
            }
            .lang-toggle-btn:hover { 
                background: rgba(255, 255, 255, 0.85); box-shadow: 0 10px 40px ${this.hexToRgba(this.pageConfig.primaryColor, 0.2)}; 
                color: ${this.pageConfig.primaryColor}; transform: translateY(-2px);
            }
            .language-dropdown {
                position: absolute; bottom: 100%; left: 0; margin-bottom: 1rem; width: 13rem;
                background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.6); padding: 0.5rem; border-radius: 1.5rem; 
                display: flex; flex-direction: column; gap: 0.25rem; opacity: 0; visibility: hidden; transform: scale(0.9); transform-origin: bottom left; 
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
            }
            .lang-toggle-btn.active + .language-dropdown { opacity: 1; visibility: visible; transform: scale(1); }
            .lang-option {
                padding: 0.6rem 1rem; color: #475569; font-size: 0.875rem; font-weight: 600;
                border-radius: 1rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; text-align: left;
            }
            .lang-option:hover { background: rgba(255, 255, 255, 0.9); color: ${this.pageConfig.primaryColor}; transform: translateX(4px); }
            .lang-option.active { background: ${this.hexToRgba(this.pageConfig.primaryColor, 0.1)}; color: ${this.pageConfig.primaryColor}; font-weight: 700; }
            .glass-creative-popup {
                background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 -15px 40px -10px rgba(0, 0, 0, 0.1); transform-origin: bottom center;
            }
        `;
        document.head.appendChild(style);
    }

    // Helper to convert hex to rgba
    hexToRgba(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    injectHTML() {
        const schengenHTML = GLOBAL_CONFIG.destinations.filter(d => d.region === "Schengen").map(d => 
            `<a href="${d.url}" class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all group">
                ${d.name} <i class="fa-solid fa-arrow-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 text-blue-400"></i>
            </a>`
        ).join('');

        const nonEuHTML = GLOBAL_CONFIG.destinations.filter(d => d.region === "Non-EU").map(d => 
            d.name === this.pageConfig.countryName ?
            `<a href="${d.url}" class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-country-primary bg-country-primary/5 border border-country-primary/10 hover:bg-country-primary/10 transition-all group shadow-sm">
                ${d.name} <i class="fa-solid fa-star text-[10px]"></i>
            </a>` :
            `<a href="${d.url}" class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-country-primary hover:bg-red-50 transition-all group">
                ${d.name} <i class="fa-solid fa-arrow-right text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 text-country-primary/50"></i>
            </a>`
        ).join('');

        const mobileDestinations = GLOBAL_CONFIG.destinations.map(d => 
            `<a href="${d.url}" class="flex flex-col items-center gap-1 group">
                <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg border ${d.name === this.pageConfig.countryName ? 'border-2 border-country-primary' : 'border-slate-300'} group-hover:scale-110 transition-transform">${d.flag}</div>
                <span class="text-[9px] font-bold ${d.name === this.pageConfig.countryName ? 'text-country-primary' : 'text-slate-600'} truncate w-full text-center">${d.code}</span>
            </a>`
        ).join('');

        const headerHTML = `
        <nav class="fixed top-2 md:top-6 left-0 right-0 z-50 flex justify-center px-2 md:px-4" id="navbar-container">
            <div class="floating-nav w-full max-w-7xl px-3 py-2 md:px-3 md:py-3 flex justify-between items-center transition-all duration-300 shadow-lg shadow-slate-200/20" id="navbar">
                <a href="index.html" class="flex items-center gap-1.5 md:gap-4 group px-2 md:px-4">
                    <div class="w-7 h-7 md:w-12 md:h-12 rounded-full flex items-center justify-center glass-frosted overflow-hidden p-1 flex-shrink-0 transition-all duration-500 border border-slate-200">
                        <img src="${GLOBAL_CONFIG.logoUrl}" alt="Better Call Logo" class="w-full h-full object-contain">
                    </div>
                    <div class="block leading-tight">
                        <h1 class="font-bold text-brand-black text-xs md:text-xl tracking-wide whitespace-nowrap">BETTER CALL</h1>
                        <p class="text-[7px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.2em] md:tracking-[0.2em]">Immigration</p>
                    </div>
                </a>
                <div class="hidden lg:flex items-center gap-2">
                    <a href="index.html" class="px-5 py-2.5 text-base text-brand-black hover:text-brand-blue font-medium transition rounded-full hover:bg-white/70">Home</a>
                    <div class="relative group">
                        <button class="px-5 py-2.5 text-base text-brand-black hover:text-brand-blue font-medium transition rounded-full hover:bg-white/70 flex items-center gap-1">Programs <svg class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                        <div class="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] dropdown-glass rounded-3xl p-8 flex gap-8 shadow-2xl z-50">
                            <div class="w-2/3 border-r border-slate-100 pr-6">
                                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span class="w-1.5 h-4 rounded-full bg-blue-500"></span> Schengen Area</h3>
                                <div class="grid grid-cols-2 gap-y-1 gap-x-4">${schengenHTML}</div>
                            </div>
                            <div class="w-1/3">
                                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span class="w-1.5 h-4 rounded-full bg-country-primary"></span> Non-EU</h3>
                                <div class="flex flex-col gap-2">${nonEuHTML}</div>
                            </div>
                        </div>
                    </div>
                    <div class="relative group">
                        <button class="px-5 py-2.5 text-base text-brand-black hover:text-brand-blue font-medium transition rounded-full hover:bg-white/70 flex items-center gap-1">Services <svg class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                        <div class="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 dropdown-glass rounded-2xl p-2 flex flex-col gap-1 shadow-2xl z-50">
                            <a href="vfs.html" class="px-4 py-3 rounded-xl text-base text-vfs-teal font-medium hover:bg-vfs-teal/10 transition block">Visa Appointment</a>
                            <a href="visa_documentation.html" class="px-4 py-3 rounded-xl text-base text-slate-700 hover:text-brand-black hover:bg-brand-blue/20 transition block">Visa Documentation</a>
                            <a href="travel_assistance.html" class="px-4 py-3 rounded-xl text-base text-slate-700 hover:text-brand-black hover:bg-brand-blue/20 transition block">Travel Assistance</a>
                            <a href="corporate_b2b.html" class="px-4 py-3 rounded-xl text-base text-brand-purple font-bold hover:text-brand-black hover:bg-brand-purple/20 transition block">Corporate B2B Solution</a>
                        </div>
                    </div>
                    <a href="assessment.html" class="px-5 py-2.5 text-base text-brand-black hover:text-brand-blue font-medium transition rounded-full hover:bg-white/70">Free Assessment</a>
                    <a href="about.html" class="px-5 py-2.5 text-base text-brand-black hover:text-brand-blue font-medium transition rounded-full hover:bg-white/70">About Us</a>
                </div>
                <div class="flex items-center gap-4 sm:gap-3 px-2">
                    <button id="mobile-menu-btn" class="lg:hidden p-2 text-brand-black hover:text-country-primary transition rounded-full hover:bg-slate-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <a href="book.html" class="hidden sm:flex px-8 py-3 rounded-full bg-country-primary text-white font-bold text-base hover:bg-country-secondary transition-colors shadow-lg">Book Now</a>
                </div>
            </div>
            
            <div id="mobileMenu" class="pointer-events-auto fixed top-20 left-3 right-3 max-h-[85vh] bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-2xl z-[100] transform origin-top transition-all duration-300 ease-out opacity-0 invisible scale-95 flex flex-col md:hidden overflow-hidden">
                <div class="p-4 grid grid-cols-2 gap-3 border-b border-slate-100/50">
                    <a href="index.html" class="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-brand-blue transition group">
                        <i class="fa-solid fa-house text-xl mb-1 group-hover:scale-110 transition-transform"></i>
                        <span class="text-[10px] font-bold uppercase tracking-wider">Home</span>
                    </a>
                    <a href="assessment.html" class="flex flex-col items-center justify-center p-3 rounded-2xl bg-country-primary/10 text-country-primary hover:bg-country-primary/20 transition group">
                        <i class="fa-solid fa-clipboard-check text-xl mb-1 group-hover:scale-110 transition-transform"></i>
                        <span class="text-[10px] font-bold uppercase tracking-wider">Assess</span>
                    </a>
                </div>
                <div class="py-4 overflow-y-auto custom-scrollbar max-h-[50vh]" data-lenis-prevent>
                    <div class="flex items-center justify-between px-5 mb-2">
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destinations</span>
                        <i class="fa-solid fa-earth-europe text-slate-300 text-xs"></i>
                    </div>
                    <div class="px-4 pb-2">
                         <div class="text-[9px] font-bold text-country-primary/80 uppercase tracking-wider mb-3 pl-2 border-l-2 border-country-primary flex items-center gap-2">
                            Non-EU Opportunities <i class="fa-solid fa-star text-[8px]"></i>
                        </div>
                        <div class="grid grid-cols-4 gap-y-4 gap-x-2">
                            ${mobileDestinations.split('</a>').filter(s=>s.includes('Non-EU')).join('</a>')}
                        </div>
                    </div>
                    <div class="relative py-4 px-8">
                        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-dashed border-slate-300"></div></div>
                        <div class="relative flex justify-center"><span class="bg-white px-2 text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1"><i class="fa-solid fa-plane-arrival"></i> EU Zone</span></div>
                    </div>
                    <div class="px-4 pb-2">
                        <div class="text-[9px] font-bold text-blue-500/80 uppercase tracking-wider mb-3 pl-2 border-l-2 border-blue-500 flex items-center gap-2">Schengen Area <i class="fa-solid fa-passport text-[8px]"></i></div>
                        <div class="grid grid-cols-4 gap-y-4 gap-x-2">
                             ${mobileDestinations.split('</a>').filter(s=>s.includes('Schengen')).join('</a>')}
                        </div>
                    </div>
                </div>
                <div class="px-4 pb-4 border-t border-slate-100 pt-4 bg-slate-50/50">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">Services</span>
                    <div class="grid grid-cols-3 gap-2">
                        <a href="vfs.html" class="p-2.5 rounded-xl bg-white text-center hover:bg-slate-50 transition border border-slate-200 shadow-sm"><i class="fa-solid fa-calendar-check text-slate-400 text-base mb-1 block"></i><span class="text-[9px] font-bold text-slate-600 block">Visa Appt</span></a>
                        <a href="visa_documentation.html" class="p-2.5 rounded-xl bg-white text-center hover:bg-slate-50 transition border border-slate-200 shadow-sm"><i class="fa-solid fa-file-contract text-slate-400 text-base mb-1 block"></i><span class="text-[9px] font-bold text-slate-600 block">Docs</span></a>
                        <a href="travel_assistance.html" class="p-2.5 rounded-xl bg-white text-center hover:bg-slate-50 transition border border-slate-200 shadow-sm"><i class="fa-solid fa-plane text-slate-400 text-base mb-1 block"></i><span class="text-[9px] font-bold text-slate-600 block">Travel</span></a>
                    </div>
                </div>
                <div class="p-4 bg-white border-t border-slate-100 flex justify-between items-center">
                    <a href="about.html" class="text-xs font-bold text-slate-500 hover:text-brand-black transition">About Us</a>
                    <a href="book.html" class="px-6 py-2.5 rounded-xl bg-brand-black text-white text-xs font-bold shadow-lg hover:bg-slate-800 transition uppercase tracking-wider">Book Now</a>
                </div>
            </div>
        </nav>`;

        const footerHTML = `
        <footer class="hidden md:block bg-white/70 backdrop-blur-sm border-t border-slate-200 relative z-10">
            <div class="container mx-auto px-4 py-12 md:py-24">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-16 mb-8 md:mb-20">
                    <div class="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                        <a href="index.html" class="flex items-center gap-5 group mb-4 md:mb-8 w-fit">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center glass-frosted p-2 border border-white/80 bg-white/70 backdrop-blur-md">
                                <img src="${GLOBAL_CONFIG.logoUrl}" alt="Better Call Logo" class="w-full h-full object-contain">
                            </div>
                            <div class="block text-left">
                                <h4 class="font-bold text-brand-black text-xl tracking-wide">BETTER CALL</h4><p class="text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">Immigration</p>
                            </div>
                        </a>
                        <p class="text-base leading-relaxed max-w-sm mb-6 md:mb-10 font-normal text-slate-600">Defining the industry benchmark for professionalism, absolute transparency, and sustained client success in global migration.</p>
                    </div>
                    <div><h4 class="text-brand-black font-bold mb-8 text-base uppercase tracking-widest">Destinations</h4><ul class="space-y-5 text-base font-normal text-slate-600"><li><a href="germany.html" class="hover:text-brand-blue transition-colors">Germany</a></li><li><a href="montenegro.html" class="text-country-primary font-bold">Montenegro</a></li></ul></div>
                    <div><h4 class="text-brand-black font-bold mb-8 text-base uppercase tracking-widest">Company</h4><ul class="space-y-5 text-base font-normal text-slate-600"><li><a href="about.html">Our Story</a></li><li><a href="assessment.html">Free Assessment</a></li></ul></div>
                    <div><h4 class="text-brand-black font-bold mb-8 text-base uppercase tracking-widest">Office</h4><ul class="space-y-5 text-base font-normal text-slate-600"><li class="flex items-start gap-4"><i class="fa-solid fa-location-dot text-brand-gold mt-1"></i><span>Dubai Healthcare City<br>UAE</span></li></ul></div>
                </div>
                <div class="border-t border-slate-200 pt-10 text-center text-sm text-slate-500 font-normal flex flex-col md:flex-row justify-between items-center"><p>&copy; 2025 Better Call Immigration. All rights reserved.</p></div>
            </div>
        </footer>`;

        const dockHTML = `
        <div class="fixed bottom-2 inset-x-0 z-[90] md:hidden flex justify-center pointer-events-none animate-slide-up">
            <div class="pointer-events-auto glass-panel-dock px-8 py-3 flex justify-between items-center w-[85%] max-w-sm relative z-50">
                <a href="index.html" class="dock-icon-btn flex-1 group text-center flex flex-col items-center justify-center transition-transform active:scale-95"><i class="fa-solid fa-house text-xl"></i></a>
                <button onclick="toggleMobileLanguage()" class="dock-icon-btn flex-1 group text-center flex flex-col items-center justify-center transition-transform active:scale-95"><i class="fa-solid fa-language text-xl"></i></button>
                <div class="relative w-12 flex justify-center">
                    <button onclick="toggleMobileDestinations()" class="group flex flex-col items-center justify-center absolute -top-8 transition-transform active:scale-95">
                        <div class="explore-btn-wrapper ring-4 ring-white/60 !top-0 !w-14 !h-14"><i class="fa-solid fa-earth-europe explore-icon text-2xl"></i></div>
                    </button>
                </div>
                <button onclick="toggleMobileApply()" class="dock-icon-btn flex-1 group text-center flex flex-col items-center justify-center transition-transform active:scale-95"><i class="fa-solid fa-paper-plane text-xl"></i></button>
                <a href="https://wa.me/971503666382" target="_blank" class="dock-icon-btn flex-1 group text-center flex flex-col items-center justify-center transition-transform active:scale-95"><i class="fa-brands fa-whatsapp text-2xl"></i></a>
            </div>
            <!-- Mobile Popups -->
            <div id="mobile-destinations-menu" class="pointer-events-auto absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] p-4 rounded-[2rem] glass-creative-popup opacity-0 invisible transition-all duration-300 transform translate-y-8 scale-90 z-40">
                <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-200"><span class="text-xs font-black text-slate-800 uppercase tracking-widest pl-2">Select Country</span><button onclick="toggleMobileDestinations()" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button></div>
                <div class="grid grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar px-1 pb-1" data-lenis-prevent>${mobileDestinations}</div>
            </div>
            <!-- Language & Apply Menus (Simplified for brevity in template, can be expanded) -->
            <div id="mobile-language-menu" class="pointer-events-auto absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] p-4 rounded-[2rem] glass-creative-popup opacity-0 invisible transition-all duration-300 transform translate-y-8 scale-90 z-40">
                <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-200"><span class="text-xs font-black text-slate-800 uppercase tracking-widest pl-2">Select Language</span><button onclick="toggleMobileLanguage()" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button></div>
                <div class="grid grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto pr-1">
                    <button onclick="setLanguage('en', this)" class="text-left p-3 rounded-xl hover:bg-slate-100 text-sm font-bold">English</button>
                    <button onclick="setLanguage('ml', this)" class="text-left p-3 rounded-xl hover:bg-slate-100 text-sm font-bold font-['Noto_Sans_Malayalam']">മലയാളം</button>
                    <button onclick="setLanguage('hi', this)" class="text-left p-3 rounded-xl hover:bg-slate-100 text-sm font-bold">हिंदी</button>
                    <button onclick="setLanguage('ta', this)" class="text-left p-3 rounded-xl hover:bg-slate-100 text-sm font-bold font-['Noto_Sans_Tamil']">தமிழ்</button>
                </div>
            </div>
            <div id="mobile-apply-menu" class="pointer-events-auto absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] p-4 rounded-[2rem] glass-creative-popup opacity-0 invisible transition-all duration-300 transform translate-y-8 scale-90 z-40">
                <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-200"><span class="text-xs font-black text-slate-800 uppercase tracking-widest pl-2">Start Journey</span><button onclick="toggleMobileApply()" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button></div>
                <div class="grid grid-cols-2 gap-3">
                    <a href="assessment.html" class="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100"><i class="fa-solid fa-clipboard-list text-country-primary mb-2 text-xl"></i><span class="text-xs font-bold uppercase">Assessment</span></a>
                    <a href="book.html" class="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100"><i class="fa-solid fa-calendar-check text-country-secondary mb-2 text-xl"></i><span class="text-xs font-bold uppercase">Book Now</span></a>
                </div>
            </div>
        </div>`;

        const fabHTML = `
        <div class="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
            <a href="https://bettercall.online/appointment" target="_blank" class="flex items-center gap-2 bg-country-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-country-secondary hover:scale-105 transition-all duration-300 border border-white/40 backdrop-blur-md">
                <span class="uppercase tracking-wider text-sm">Apply Now</span> <i class="fa-solid fa-paper-plane"></i>
            </a>
        </div>
        <a href="https://wa.me/971503666382" target="_blank" class="hidden md:flex fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-white/50"><i class="fa-brands fa-whatsapp text-3xl"></i></a>
        <div class="lang-fab-new hidden md:block">
            <div id="lang-toggle-btn" onclick="toggleLanguageDropdown(event)" class="lang-toggle-btn">
                <i class="fa-solid fa-globe text-xl text-country-secondary transition-colors"></i>
                <span class="font-bold text-sm uppercase tracking-wider hidden sm:block">Language</span>
                <i class="fa-solid fa-chevron-up text-xs opacity-70 transition-transform duration-300"></i>
            </div>
            <div id="language-dropdown" class="language-dropdown language-dropdown-up">
                <button onclick="setLanguage('en', this);" class="lang-option active"><span>English</span> <span class="text-xs text-slate-400">EN</span></button>
                <button onclick="setLanguage('ml', this);" class="lang-option font-['Noto_Sans_Malayalam']"><span>മലയാളം</span> <span class="text-xs text-slate-400">ML</span></button>
                <button onclick="setLanguage('hi', this);" class="lang-option"><span>हिंदी</span> <span class="text-xs text-slate-400">HI</span></button>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        document.body.insertAdjacentHTML('beforeend', dockHTML);
        document.body.insertAdjacentHTML('beforeend', fabHTML);
    }

    initScripts() {
        // Initialize Lenis Smooth Scroll
        if (typeof Lenis !== 'undefined') {
            this.lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
            const raf = (time) => { this.lenis.raf(time); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
            window.lenis = this.lenis;
        }

        // Scroll Effects for Navbar
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 20) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // Mobile Menu Logic
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                const menu = document.getElementById('mobileMenu');
                const isHidden = menu.classList.contains('invisible');
                if (isHidden) {
                    menu.classList.remove('invisible', 'opacity-0', 'scale-95');
                    menu.classList.add('visible', 'opacity-100', 'scale-100');
                    if (this.lenis) this.lenis.stop();
                } else {
                    menu.classList.add('invisible', 'opacity-0', 'scale-95');
                    menu.classList.remove('visible', 'opacity-100', 'scale-100');
                    if (this.lenis) this.lenis.start();
                }
            });
        }

        // Global functions for inline HTML calls (like onclick)
        window.toggleMobileDestinations = () => this.toggleMobilePopup('mobile-destinations-menu');
        window.toggleMobileLanguage = () => this.toggleMobilePopup('mobile-language-menu');
        window.toggleMobileApply = () => this.toggleMobilePopup('mobile-apply-menu');
        
        window.toggleLanguageDropdown = (event) => {
            const button = document.getElementById('lang-toggle-btn');
            const isActive = button.classList.toggle('active');
            event.stopPropagation();
            if (isActive) document.addEventListener('click', this.closeLanguageDropdown);
            else document.removeEventListener('click', this.closeLanguageDropdown);
        };

        // Close Popups on Outside Click
        document.addEventListener('click', (event) => {
            const dock = event.target.closest('.glass-panel-dock');
            if (!dock) {
                ['mobile-destinations-menu', 'mobile-language-menu', 'mobile-apply-menu'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el && !el.classList.contains('invisible') && !el.contains(event.target)) {
                        el.classList.add('invisible', 'opacity-0', 'translate-y-8', 'scale-90');
                    }
                });
            }
        });
    }

    toggleMobilePopup(id) {
        const target = document.getElementById(id);
        if (!target) return;
        ['mobile-destinations-menu', 'mobile-language-menu', 'mobile-apply-menu'].filter(x => x !== id).forEach(oid => {
            document.getElementById(oid).classList.add('invisible', 'opacity-0', 'translate-y-8', 'scale-90');
        });
        const isHidden = target.classList.contains('invisible');
        if (isHidden) {
            target.classList.remove('invisible', 'opacity-0', 'translate-y-8', 'scale-90');
            target.classList.add('visible', 'opacity-100', 'scale-100');
        } else {
            target.classList.add('invisible', 'opacity-0', 'translate-y-8', 'scale-90');
            target.classList.remove('visible', 'opacity-100', 'scale-100');
        }
    }

    closeLanguageDropdown(event) {
        const dropdown = document.getElementById('language-dropdown');
        const button = document.getElementById('lang-toggle-btn');
        if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
            button.classList.remove('active');
            document.removeEventListener('click', this.closeLanguageDropdown); // 'this' needs binding if not arrow function context
        }
    }
}