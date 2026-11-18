// Registration lists. Keys are stored in the database (English, stable for analysis); labels are shown.
window.QUIZ_LISTS = {
  // Engineering disciplines practised in Saudi Arabia (SCE divisions and common university programmes)
  disciplines: [
    ["civil", "مدنية", "Civil"],
    ["structural", "إنشائية", "Structural"],
    ["architectural", "معمارية", "Architectural"],
    ["urban_planning", "تخطيط عمراني", "Urban Planning"],
    ["construction_mgmt", "إدارة التشييد", "Construction Management"],
    ["transportation", "نقل ومرور", "Transportation & Traffic"],
    ["water_env", "مياه وبيئة", "Water & Environmental"],
    ["environmental", "بيئية", "Environmental"],
    ["surveying", "مساحة ومعلومات جغرافية", "Surveying & Geomatics"],
    ["electrical_power", "كهربائية (قوى)", "Electrical (Power)"],
    ["electronics_comm", "إلكترونيات واتصالات", "Electronics & Communications"],
    ["mechanical", "ميكانيكية", "Mechanical"],
    ["hvac", "تكييف وتبريد", "HVAC & Refrigeration"],
    ["energy", "طاقة وطاقة متجددة", "Energy & Renewable Energy"],
    ["industrial", "صناعية", "Industrial"],
    ["chemical", "كيميائية", "Chemical"],
    ["petroleum", "بترول وغاز", "Petroleum & Natural Gas"],
    ["mining_geology", "تعدين وجيولوجيا", "Mining & Geology"],
    ["materials", "مواد وفلزات", "Materials & Metallurgical"],
    ["computer", "حاسب", "Computer"],
    ["software", "برمجيات", "Software"],
    ["biomedical", "طبية حيوية", "Biomedical"],
    ["aerospace", "طيران وفضاء", "Aerospace"],
    ["marine", "بحرية", "Marine"],
    ["agricultural", "زراعية", "Agricultural"],
    ["nuclear", "نووية", "Nuclear"],
    ["safety_fm", "سلامة وإدارة مرافق", "Safety & Facilities Management"],
    ["other", "أخرى", "Other"]
  ],

  cities: [
    ["riyadh", "الرياض", "Riyadh"], ["jeddah", "جدة", "Jeddah"], ["makkah", "مكة المكرمة", "Makkah"],
    ["madinah", "المدينة المنورة", "Madinah"], ["dammam", "الدمام", "Dammam"], ["khobar", "الخبر", "Al Khobar"],
    ["dhahran", "الظهران", "Dhahran"], ["jubail", "الجبيل", "Jubail"], ["ahsa", "الأحساء", "Al-Ahsa"],
    ["qatif", "القطيف", "Qatif"], ["hafr_albatin", "حفر الباطن", "Hafr Al-Batin"], ["taif", "الطائف", "Taif"],
    ["yanbu", "ينبع", "Yanbu"], ["rabigh", "رابغ", "Rabigh"], ["tabuk", "تبوك", "Tabuk"], ["neom", "نيوم", "NEOM"],
    ["alula", "العلا", "AlUla"], ["abha", "أبها", "Abha"], ["khamis", "خميس مشيط", "Khamis Mushait"],
    ["jazan", "جازان", "Jazan"], ["najran", "نجران", "Najran"], ["albaha", "الباحة", "Al Baha"],
    ["buraidah", "بريدة", "Buraidah"], ["unaizah", "عنيزة", "Unaizah"], ["hail", "حائل", "Hail"],
    ["kharj", "الخرج", "Al-Kharj"], ["arar", "عرعر", "Arar"], ["sakaka", "سكاكا", "Sakaka"],
    ["qurayyat", "القريات", "Qurayyat"], ["outside_ksa", "خارج المملكة", "Outside Saudi Arabia"], ["other", "أخرى", "Other"]
  ],

  nationalities: [
    ["SA", "سعودي", "Saudi"], ["EG", "مصري", "Egyptian"], ["JO", "أردني", "Jordanian"], ["SY", "سوري", "Syrian"],
    ["LB", "لبناني", "Lebanese"], ["PS", "فلسطيني", "Palestinian"], ["IQ", "عراقي", "Iraqi"], ["YE", "يمني", "Yemeni"],
    ["SD", "سوداني", "Sudanese"], ["AE", "إماراتي", "Emirati"], ["KW", "كويتي", "Kuwaiti"], ["BH", "بحريني", "Bahraini"],
    ["QA", "قطري", "Qatari"], ["OM", "عماني", "Omani"], ["MA", "مغربي", "Moroccan"], ["DZ", "جزائري", "Algerian"],
    ["TN", "تونسي", "Tunisian"], ["LY", "ليبي", "Libyan"], ["MR", "موريتاني", "Mauritanian"], ["SO", "صومالي", "Somali"],
    ["PK", "باكستاني", "Pakistani"], ["IN", "هندي", "Indian"], ["BD", "بنغلاديشي", "Bangladeshi"], ["PH", "فلبيني", "Filipino"],
    ["ID", "إندونيسي", "Indonesian"], ["MY", "ماليزي", "Malaysian"], ["TR", "تركي", "Turkish"], ["NG", "نيجيري", "Nigerian"],
    ["GB", "بريطاني", "British"], ["US", "أمريكي", "American"], ["CA", "كندي", "Canadian"], ["OTHER", "أخرى", "Other"]
  ]
};

// Original pixel-art engineer (hard hat, safety vest). Each letter is a 4px pixel.
window.PIXEL_ENGINEER = {
  size: 4,
  palette: { Y: "#ffd23e", D: "#d49a00", S: "#ffcc99", K: "#3d2b5a", M: "#e55252", G: "#43d14f", O: "#ff8c1a", W: "#ffffff", P: "#5a6b7d", B: "#6b3a12", L: "#2a9d3a" },
  rows: [
    "....YYYYYY....",
    "...YYYWYYYY...",
    "..YYYYYYYYYY..",
    ".DDDDDDDDDDDD.",
    "...SSSSSSSS...",
    "...SKSSSSKS...",
    "...SSSSSSSS...",
    "....SSMMSS....",
    ".....SSSS.....",
    "..GGOGGGGOGG..",
    ".SGGOGGGGOGGSL",
    ".SGGWWWWWWGGLL",
    "..GGOGGGGOGG.L",
    "...PPPP.PPPP..",
    "...PPPP.PPPP..",
    "..BBBBB.BBBBB."
  ]
};
