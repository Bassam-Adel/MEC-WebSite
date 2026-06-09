const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const languageModal = document.getElementById('language-modal');
const langSelector = document.getElementById('lang-selector');
const languageButtons = document.querySelectorAll('.lang-option');
const langToggle = document.getElementById('lang-toggle');
const languageDropdown = document.getElementById('language-dropdown');

const translations = {
  ar: {
    brand: 'صراع الشرق الأوسط 3',
    'nav.features': 'ميزات المود',
    'nav.releases': 'سجل الإصدار',
    'nav.process': 'طريقة التثبيت',
    'nav.cta': 'تحميل الآن',
    'language.label': 'اللغة',
    'hero.eyebrow': 'مود جنرال زيرو أور',
    'hero.title': 'تحميل مود صراع الشرق الأوسط 3',
    'hero.description': 'أقوى مود عربي لجنرال زيرو أور مع خرائط جديدة، فرق متوازنة، ووحدات حربية مميزة.',
    'hero.bullet1': 'محتوى عربي كامل ومناسب',
    'hero.bullet2': 'توافق تام مع النسخة الأصلية',
    'hero.bullet3': 'تنصيب بسيط بخطوات واضحة',
    'hero.primary': 'تحميل المود',
    'hero.secondary': 'شاهد المميزات',
    'hero.cardTag': 'مود عربي',
    'hero.screenTitle': 'خرائط جديدة ووحدات محدثة',
    'hero.screenDescription': 'تجربة قتالية جديدة مع معارك الشرق الأوسط، تجهيزات متوازنة وتحسينات للفريق.',
    'hero.featureTag1': 'خرائط عربية',
    'hero.featureTag2': 'وحدات جديدة',
    'hero.featureTag3': 'تحسين التوازن',
    'hero.stat1.value': '15+',
    'hero.stat1.label': 'خريطة جديدة',
    'hero.stat2.value': '8',
    'hero.stat2.label': 'فصائل مميزة',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'توافق ZH',
    'preview.title': 'لمحة عن المود',
    'preview.desc': 'مود صراع الشرق الأوسط 3 يعيد بناء تجربة اللعب في جنرال زيرو أور بعناصر جديدة ومحتوى عربي أصلي.',
    'preview.feature1.title': 'فصائل عربية مميزة',
    'preview.feature1.desc': 'وحدات جديدة مثل المدرعات الخفيفة، مدفعية الصحراء، والدعم الجوي الموجه.',
    'preview.feature2.title': 'خرائط قتالية',
    'preview.feature2.desc': 'خرائط تصميمها عربي لقتال المدن، القفار، وقواعد العدو المتطورة.',
    'preview.feature3.title': 'تحديثات توازن',
    'preview.feature3.desc': 'تحسين قدرات الجنرالات وأساليب اللعب للحصول على معارك عادلة وسريعة.',
    'features.title': 'ميزات مود صراع الشرق الأوسط 3',
    'features.desc': 'تحميل مجاني لأقوى مود جنرال زيرو أور مع تحسينات قتالية عربية.',
    'features.feature1.title': 'خرائط جديدة',
    'features.feature1.desc': 'خرائط عربية متوازنة لأحجام مختلفة من المعارك والقوات.',
    'features.feature2.title': 'وحدات متطورة',
    'features.feature2.desc': 'تشكيلة وحدات حربية جديدة ومعدلة تعكس طابع الشرق الأوسط.',
    'features.feature3.title': 'توازن لعب',
    'features.feature3.desc': 'تعديلات لكل الجنرالات لضمان معارك عادلة وممتعة.',
    'release.title': 'سجل الإصدار',
    'release.desc': 'جميع إصدارات المود مع تفاصيل الإضافات والتصحيحات لكل إصدار.',
    'process.title': 'طريقة التثبيت',
    'process.desc': 'اتبع الخطوات البسيطة لتشغيل المود على لعبة Generals Zero Hour.',
    'process.step1.title': 'تحميل المود',
    'process.step1.desc': 'اضغط زر التحميل لتحصل على ملف المضغوط للمود.',
    'process.step2.title': 'فك ضغط ملف اللانشر',
    'process.step2.desc': 'قم بفك ضغط ملف اللانشر الذي قمت بتحميله في أي مكان في جهازك.',
    'process.step3.title': 'تشغيل اللانشر',
    'process.step3.desc': 'افتح اللانشر، قم بتحميل اللعبة من خلاله، ثم شغلها مباشرة من اللانشر.',
    'cta.title': 'حمل مود صراع الشرق الأوسط 3 الآن',
    'cta.desc': 'نقرات قليلة وتصبح جاهز للعب بأقوى مود عربي لجنرال زيرو أور.',
    'cta.button': 'تحميل المود',
    'footer.text': 'مود صراع الشرق الأوسط 3 للعبة Generals Zero Hour.',
    'footer.email': 'support@example.com',
    'langModal.title': 'اختر لغتك',
    'langModal.subtitle': 'اختر اللغة التي تناسبك الآن. سيتم حفظ الخيار لزياراتك القادمة.'
  },
  en: {
    brand: 'Middle East Conflict 3',
    'nav.features': 'Mod Features',
    'nav.releases': 'Release Notes',
    'nav.process': 'Install Guide',
    'nav.cta': 'Download Now',
    'language.label': 'Language',
    'hero.eyebrow': 'Generals Zero Hour Mod',
    'hero.title': 'Download Middle East Conflict 3 Mod',
    'hero.description': 'The strongest Arabic mod for Generals Zero Hour with new maps, balanced factions, and unique units.',
    'hero.bullet1': 'Full Arabic content',
    'hero.bullet2': 'Perfect Zero Hour compatibility',
    'hero.bullet3': 'Simple installation steps',
    'hero.primary': 'Download Mod',
    'hero.secondary': 'See Features',
    'hero.cardTag': 'Arabic Mod',
    'hero.screenTitle': 'New Maps and Updated Units',
    'hero.screenDescription': 'A refreshed combat experience with Middle East battles, balanced gear, and improved teamwork.',
    'hero.featureTag1': 'Arabic Maps',
    'hero.featureTag2': 'New Units',
    'hero.featureTag3': 'Balance Tuning',
    'hero.stat1.value': '15+',
    'hero.stat1.label': 'new maps',
    'hero.stat2.value': '8',
    'hero.stat2.label': 'unique factions',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'ZH compatibility',
    'preview.title': 'Mod Overview',
    'preview.desc': 'Middle East Conflict 3 rebuilds the Generals Zero Hour experience with fresh content and Arabic-themed gameplay.',
    'preview.feature1.title': 'Distinct Arabic factions',
    'preview.feature1.desc': 'New units such as light armor, desert artillery, and guided air support.',
    'preview.feature2.title': 'Battle-focused maps',
    'preview.feature2.desc': 'Maps designed for city, desert, and base combat scenarios.',
    'preview.feature3.title': 'Balance improvements',
    'preview.feature3.desc': 'Updated general strengths for fair and exciting battles.',
    'features.title': 'Middle East Conflict 3 Features',
    'features.desc': 'Free download of the strongest Arabic Generals Zero Hour mod with combat improvements.',
    'features.feature1.title': 'New maps',
    'features.feature1.desc': 'Balanced Arabic maps for different battle sizes and armies.',
    'features.feature2.title': 'Advanced units',
    'features.feature2.desc': 'A lineup of new and modified combat units reflecting Middle Eastern flair.',
    'features.feature3.title': 'Gameplay balance',
    'features.feature3.desc': 'General adjustments for fair and enjoyable skirmishes.',
    'release.title': 'Release Notes',
    'release.desc': 'All mod releases with the latest features and fixes for each version.',
    'process.title': 'Installation Steps',
    'process.desc': 'Follow simple steps to launch the mod with Generals Zero Hour.',
    'process.step1.title': 'Download the mod',
    'process.step1.desc': 'Click the download button to get the mod archive.',
    'process.step2.title': 'Extract files',
    'process.step2.desc': 'Open the archive and move the mod files into the game folder.',
    'process.step3.title': 'Play the game',
    'process.step3.desc': 'Launch Generals Zero Hour and enjoy the new maps and units.',
    'cta.title': 'Download Middle East Conflict 3 Now',
    'cta.desc': 'A few clicks and you are ready to play the strongest Arabic Generals Zero Hour mod.',
    'cta.button': 'Download Mod',
    'footer.text': 'Middle East Conflict 3 mod for Generals Zero Hour.',
    'footer.email': 'support@example.com',
    'langModal.title': 'Choose your language',
    'langModal.subtitle': 'Pick the language you prefer. Your choice will be remembered for future visits.'
  },
  ru: {
    brand: 'Ближний Восток Конфликт 3',
    'nav.features': 'Особенности мода',
    'nav.releases': 'Журнал изменений',
    'nav.process': 'Как установить',
    'nav.cta': 'Скачать сейчас',
    'language.label': 'Язык',
    'hero.eyebrow': 'Мод для Generals Zero Hour',
    'hero.title': 'Скачать мод Ближний Восток Конфликт 3',
    'hero.description': 'Лучший арабский мод для Generals Zero Hour с новыми картами, сбалансированными фракциями и уникальными юнитами.',
    'hero.bullet1': 'Полный арабский контент',
    'hero.bullet2': 'Полная совместимость с Zero Hour',
    'hero.bullet3': 'Простая установка',
    'hero.primary': 'Скачать мод',
    'hero.secondary': 'Посмотреть функции',
    'hero.cardTag': 'Арабский мод',
    'hero.screenTitle': 'Новые карты и обновленные юниты',
    'hero.screenDescription': 'Свежий боевой опыт с боями на Ближнем Востоке, сбалансированным вооружением и улучшенной командной игрой.',
    'hero.featureTag1': 'Арабские карты',
    'hero.featureTag2': 'Новые юниты',
    'hero.featureTag3': 'Балансировка',
    'hero.stat1.value': '15+',
    'hero.stat1.label': 'новых карт',
    'hero.stat2.value': '8',
    'hero.stat2.label': 'уникальных фракций',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'совместимость с ZH',
    'preview.title': 'Обзор мода',
    'preview.desc': 'Ближний Восток Конфликт 3 перестраивает Generals Zero Hour с новыми материалами и арабской тематикой.',
    'preview.feature1.title': 'Отдельные арабские фракции',
    'preview.feature1.desc': 'Новые юниты, такие как легкая бронетехника, пустынная артиллерия и управляемая авиационная поддержка.',
    'preview.feature2.title': 'Карты для боя',
    'preview.feature2.desc': 'Карты, рассчитанные на городские, пустынные и базовые сражения.',
    'preview.feature3.title': 'Улучшения баланса',
    'preview.feature3.desc': 'Обновленные силы генералов для честных и захватывающих боев.',
    'features.title': 'Функции Ближний Восток Конфликт 3',
    'features.desc': 'Бесплатное скачивание лучшего арабского мода для Generals Zero Hour с улучшениями боя.',
    'features.feature1.title': 'Новые карты',
    'features.feature1.desc': 'Сбалансированные арабские карты для разных размеров сражений и армий.',
    'features.feature2.title': 'Продвинутые юниты',
    'features.feature2.desc': 'Линия новых и измененных юнитов в арабском стиле.',
    'features.feature3.title': 'Баланс игры',
    'features.feature3.desc': 'Настройки генералов для честных и увлекательных стычек.',
    'release.title': 'Журнал изменений',
    'release.desc': 'Все версии мода с последними функциями и исправлениями для каждой версии.',
    'process.title': 'Шаги установки',
    'process.desc': 'Следуйте простым шагам, чтобы запустить мод в Generals Zero Hour.',
    'process.step1.title': 'Скачать мод',
    'process.step1.desc': 'Нажмите кнопку скачивания, чтобы получить архив мода.',
    'process.step2.title': 'Распаковать файлы',
    'process.step2.desc': 'Откройте архив и переместите файлы мода в папку игры.',
    'process.step3.title': 'Играть',
    'process.step3.desc': 'Запустите Generals Zero Hour и наслаждайтесь новыми картами и юнитами.',
    'cta.title': 'Скачать Ближний Восток Конфликт 3 сейчас',
    'cta.desc': 'Пару кликов — и вы готовы играть в лучший арабский мод для Generals Zero Hour.',
    'cta.button': 'Скачать мод',
    'footer.text': 'Мод Ближний Восток Конфликт 3 для Generals Zero Hour.',
    'footer.email': 'support@example.com',
    'langModal.title': 'Выберите язык',
    'langModal.subtitle': 'Выберите предпочитаемый язык. Ваш выбор будет сохранен для будущих визитов.'
  }
};

const releaseData = {
  ar: [
    {
      version: '3.5.2.4',
      badge: 'أحدث إصدار',
      date: 'الآن',
      title: 'دعم لغات واسع وواجهة HUD',
      bullets: [
        'دعم ترجمة كامل لـ 11 لغة جديدة كالإسبانية واليابانية والفرنسية.',
        'تبويب مخصص للدعم الفني المباشر داخل اللانشر.',
        'تصميم زجاجي حديث وعصري لواجهات الدخول وإنشاء الحساب.',
        'تثبيت التحديثات المتراكمة دفعة واحدة بشكل تلقائي وتتابعي.',
        'واجهة داخلية (HUD) تعرض صورة اللاعب، رتبته، وحالة السيرفر أثناء اللعب.',
        'مزامنة ونسخ ملف لغة اللعبة (generals.csf) للغات الـ 13 تلقائياً.',
        'حل مشكلة انهيار اللعبة عند الخروج المفاجئ.'
      ]
    },
    {
      version: '3.5.2.1',
      badge: 'تحديث اللانشر والشبكة',
      date: 'مؤخراً',
      title: 'قفل الأسماء والدخول التلقائي',
      bullets: [
        'كتابة اسم المستخدم المسجل في اللانشر تلقائياً داخل اللعبة (SkirmishStats.ini).',
        'ترميز الاسم (UTF-16) وتحديث ملف Network.ini ليظهر في لوبي الشبكة LAN.',
        'قفل خانة تعديل الاسم في اللوبي لمنع التلاعب وتغيير الأسماء يدوياً.',
        'تفعيل تسجيل الدخول التلقائي الذكي بصلاحية تمتد لـ 30 يوماً.',
        'تغيير لغة اللعبة بين العربية والإنجليزية تلقائياً بنسخ ملفات CSF.',
        'زر تطبيق متفاعل يضيء باللون الأخضر عند إجراء أي تعديل لتنبيهك بالحفظ.'
      ]
    },
    {
      version: '3.5.2',
      badge: 'تحديث رئيسي',
      date: 'سابقاً',
      title: 'تذكرني ذكي وإعدادات مخصصة',
      bullets: [
        'ميزة "تذكرني" لتسجيل الدخول التلقائي دون الحاجة لضغط زر LOGIN.',
        'حل مشكلة حقل كلمة المرور الفارغ وتعبئة البيانات بنجاح.',
        'تسجيل خروج آمن يبطل الجلسة ويسمح بتبديل الحسابات بسهولة.',
        'كاشف دقة الشاشة التلقائي لجلب وتحديث دقة الجهاز في ملف Options.ini.',
        'تبسيط إعدادات اللعبة وحذف الخيارات القديمة غير المستخدمة.',
        'تأكيد وجود مجلد المستندات قبل تطبيق إعدادات اللعبة لحماية الملفات.'
      ]
    },
    {
      version: '3.5.1.3',
      badge: 'إصدار سابق',
      date: 'مايو 2026',
      title: 'حلول اتصال ZeroTier والـ LAN',
      bullets: [
        'مغادرة الشبكات الأخرى تلقائياً عند اختيار سيرفر جديد.',
        'تعيين كرت ZeroTier إلى Private وأولوية Metric 10.',
        'إنشاء قواعد جدار حماية تلقائياً لملفات generals.exe و game.dat.',
        'تشغيل خدمة ZeroTier الخلفية تلقائياً دون تعليق.',
      ]
    },
    {
      version: '3.5.1.2',
      badge: 'تحسين تنظيمي',
      date: 'أبريل 2026',
      title: 'إدارة مجلد MEC 3 تلقائياً',
      bullets: [
        'إنشاء مجلد MEC 3 تلقائياً عند اختيار مسار التثبيت.',
        'تنزيل التحديثات وفك الضغط مباشرة داخل مجلد MEC 3.',
        'حفظ بنية الملفات نظيفة ومرتبة تلقائياً.',
      ]
    },
    {
      version: '3.5.1.1',
      badge: 'تحسين تجربة التنزيل',
      date: 'مارس 2026',
      title: 'شريط تحميل أفضل وإدارة ZeroTier',
      bullets: [
        'زر التثبيت يتحول إلى شريط تحميل واسع أثناء التنزيل.',
        'عرض الحجم المحمّل بالميجابايت مباشرة فوق شريط التقدم.',
        'تشغيل ZeroTier تلقائياً عند الدخول وإيقافه عند الخروج.',
        'طلب صلاحيات المسؤول مع تنبيهات واضحة باللغة العربية.',
      ]
    }
  ],
  en: [
    {
      version: '3.5.1.3',
      badge: 'Latest Release',
      date: 'May 2026',
      title: 'ZeroTier & LAN Connection Fixes',
      bullets: [
        'Automatically leave other networks when switching servers.',
        'Set ZeroTier adapter to Private with metric priority 10.',
        'Create firewall rules for generals.exe and game.dat automatically.',
        'Start the ZeroTier service silently to avoid hanging on startup.',
      ]
    },
    {
      version: '3.5.1.2',
      badge: 'Path Management',
      date: 'April 2026',
      title: 'Automatic MEC 3 Folder Handling',
      bullets: [
        'Automatically create MEC 3 folder at install path.',
        'Download updates directly into MEC 3 to keep files organized.',
        'Keep future updates contained and clean.',
      ]
    },
    {
      version: '3.5.1.1',
      badge: 'Download UX Upgrade',
      date: 'March 2026',
      title: 'Improved Download UI & ZeroTier Lifecycle',
      bullets: [
        'Install button becomes a large progress bar during download.',
        'Show downloaded MB out of total size in real time.',
        'Launch ZeroTier automatically on login and shutdown on exit.',
        'Request admin rights with clear localized permission warnings.',
      ]
    }
  ],
  ru: [
    {
      version: '3.5.1.3',
      badge: 'Последний релиз',
      date: 'май 2026',
      title: 'Исправления подключения ZeroTier и LAN',
      bullets: [
        'Автоматически покидает другие сети при смене сервера.',
        'Устанавливает адаптер ZeroTier в Private с приоритетом metric 10.',
        'Создает правила брандмауэра для generals.exe и game.dat.',
        'Запускает службу ZeroTier автоматически без зависаний.',
      ]
    },
    {
      version: '3.5.1.2',
      badge: 'Управление папкой',
      date: 'апрель 2026',
      title: 'Автоматическое создание папки MEC 3',
      bullets: [
        'Автоматически создает папку MEC 3 в выбранном пути установки.',
        'Скачивает обновления прямо в папку MEC 3.',
        'Держит файлы организованными и чистыми.',
      ]
    },
    {
      version: '3.5.1.1',
      badge: 'Обновление загрузки',
      date: 'март 2026',
      title: 'Улучшенный интерфейс загрузки и ZeroTier',
      bullets: [
        'Кнопка установки заменяется большой полосой прогресса.',
        'Показывает загруженные МБ из общего объема.',
        'Запускает ZeroTier при входе и завершает при выходе.',
        'Просит права администратора с понятными сообщениями.',
      ]
    }
  ]
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', lang === 'ar');
  document.body.classList.toggle('ltr', lang !== 'ar');

  // Set text content
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[lang][key];
    if (value) {
      element.textContent = value;
    }
  });

  // Set placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = translations[lang][key];
    if (value) {
      element.setAttribute('placeholder', value);
    }
  });

  // Set title attributes
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    const key = element.dataset.i18nTitle;
    const value = translations[lang][key];
    if (value) {
      element.setAttribute('title', value);
    }
  });

  renderReleaseCards(lang);
  if (langSelector) {
    langSelector.value = lang;
  }
  // Update custom toggle label if present
  const toggleLabel = document.getElementById('lang-toggle-label');
  if (toggleLabel) {
    const map = { ar: 'العربية', en: 'English', ru: 'Русский' };
    toggleLabel.textContent = map[lang] || lang;
  }
}

function renderReleaseCards(lang) {
  const releaseList = document.getElementById('release-list');
  if (!releaseList) return;

  releaseList.innerHTML = releaseData[lang]
    .map((item) => `
      <article class="release-card" data-reveal>
        <div class="release-head">
          <span class="release-badge">${item.version}</span>
          <strong>${item.badge}</strong>
          <span class="release-date">${item.date}</span>
        </div>
        <h3>${item.title}</h3>
        <ul>
          ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
        </ul>
      </article>
    `)
    .join('');

  document.querySelectorAll('#release-list [data-reveal]').forEach((element) => {
    revealObserver.observe(element);
  });
}

function setLanguage(lang, save = true) {
  if (!translations[lang]) {
    lang = 'ar';
  }
  applyTranslations(lang);
  if (save) {
    localStorage.setItem('siteLanguage', lang);
  }
}

// saveLanguageSelection هي مجرد alias لـ setLanguage مع الحفظ الافتراضي
function saveLanguageSelection(lang) {
  setLanguage(lang); // setLanguage تحفظ في localStorage داخلياً
}

function openLanguageModal() {
  if (!languageModal) return;
  languageModal.classList.add('active');
  languageModal.setAttribute('aria-hidden', 'false');
}

function closeLanguageModal() {
  if (!languageModal) return;
  languageModal.classList.remove('active');
  languageModal.setAttribute('aria-hidden', 'true');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (langSelector) {
  langSelector.addEventListener('change', (event) => {
    saveLanguageSelection(event.target.value);
  });
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    saveLanguageSelection(lang);
    // Close modal if it is open
    closeLanguageModal();
    // Close header dropdown if used
    if (languageDropdown) {
      languageDropdown.classList.remove('active');
    }
    if (langToggle) {
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Header dropdown toggle behavior
if (langToggle && languageDropdown) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = languageDropdown.classList.toggle('active');
    langToggle.setAttribute('aria-expanded', isOpen);
    languageDropdown.setAttribute('aria-hidden', !isOpen);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageDropdown.contains(e.target) && !langToggle.contains(e.target)) {
      languageDropdown.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
      languageDropdown.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      languageDropdown.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
      languageDropdown.setAttribute('aria-hidden', 'true');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('siteLanguage');
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang, false);
    closeLanguageModal();
  } else {
    setLanguage('ar', false);
    openLanguageModal();
  }

  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
});
