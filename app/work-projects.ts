type LocalizedText = { ru: string; en: string };

export const workProjects: {
  name: string;
  url?: string;
  category: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  stack: string[];
}[] = [
  {
    name: 'Integrator',
    url: 'https://integratoresb.ru',
    category: {
      ru: 'Интеграционная платформа',
      en: 'Enterprise integration platform',
    },
    description: {
      ru: 'Сервисная шина и продукт для интеграции данных с визуальной настройкой потоков.',
      en: 'An enterprise service bus and data integration product with a visual flow editor.',
    },
    highlights: [
      {
        ru: 'Разработал frontend с нуля: архитектура интерфейса, выбор библиотек и разграничение доступа по ролям.',
        en: 'Built the frontend from scratch, selected libraries and implemented role-based access.',
      },
      {
        ru: 'Создал визуальный редактор проектов и конструктор отчётов с настраиваемыми полями, источниками данных и правилами доступа.',
        en: 'Built a visual project editor and a report designer with configurable fields, data sources and access rules.',
      },
    ],
    stack: ['Angular 18', 'TypeScript', 'PrimeNG', 'Zod', 'OpenAPI'],
  },
  {
    name: 'Unions',
    url: 'https://unions.me',
    category: { ru: 'B2B-платформа сообществ', en: 'B2B community platform' },
    description: {
      ru: 'Веб- и мобильный продукт для участников объединений: профили, мероприятия, опросы и общение.',
      en: 'Web and mobile products for member profiles, community management, events, surveys and messaging.',
    },
    highlights: [
      {
        ru: 'Вёл frontend-разработку: адаптивные интерфейсы по макетам Figma, мероприятия, опросы, мессенджер, интеграция с Telegram и локализация.',
        en: 'Led frontend delivery from Figma designs, including events, surveys, messaging, Telegram integration and localization.',
      },
      {
        ru: 'Разработал приложения для iOS и Android на Cordova, добавил push-уведомления и выпустил релизы в App Store, Google Play и RuStore.',
        en: 'Built Cordova apps for iOS and Android, added push notifications and shipped releases to the App Store, Google Play and RuStore.',
      },
    ],
    stack: [
      'Angular 16',
      'TypeScript',
      'Taiga UI',
      'WebSockets',
      'Cordova',
      'Firebase',
    ],
  },
  {
    name: 'PremiumCode',
    url: 'https://premiumcode.ru',
    category: {
      ru: 'Корпоративная программа лояльности',
      en: 'Enterprise B2B loyalty platform',
    },
    description: {
      ru: 'Брендированные веб- и мобильные приложения для программ лояльности клиентов.',
      en: 'Branded web and mobile applications for customer loyalty programs.',
    },
    highlights: [
      {
        ru: 'Создал адаптивный frontend по макетам Figma с локализацией, ролями и вариантами оформления для разных клиентов.',
        en: 'Built responsive frontends from Figma designs with localization, role-based access and branded client variants.',
      },
      {
        ru: 'Разработал аналитику, семейный доступ, поиск партнёров на Яндекс Картах и мобильные приложения с push-уведомлениями.',
        en: 'Delivered analytics, family access, Yandex Maps venue search and mobile apps with push notifications.',
      },
    ],
    stack: [
      'Angular 16',
      'TypeScript',
      'Taiga UI',
      'OpenAPI',
      'Cordova',
      'Firebase',
    ],
  },
  {
    name: 'Metrology & Diagnostics',
    category: {
      ru: 'Инструменты для энергетики',
      en: 'Enterprise operations tools',
    },
    description: {
      ru: 'Системы учёта измерительных приборов и диагностики тепловых сетей.',
      en: 'Systems for measuring instruments and district heating network diagnostics.',
    },
    highlights: [
      {
        ru: 'Начал с тест-кейсов и ручного функционального тестирования, затем разрабатывал новые функции и поддерживал существующие.',
        en: 'Started with test cases and manual functional QA, then developed new features and maintained both applications.',
      },
    ],
    stack: ['Angular', 'TypeScript', 'DevExtreme', 'OData', 'Webpack'],
  },
];
