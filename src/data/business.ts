// src/data/business.ts
export const business = {
  name: 'BHC | Broker Hipotecario Castellón',
  shortName: 'BHC',
  legalName: 'BHC | Broker Hipotecario Castellón',
  tagline: 'No trabajamos para los bancos. Trabajamos para ti.',
  description:
    'Tu broker hipotecario en Castellón de la Plana. Comparamos más de 30 bancos para conseguirte la mejor hipoteca. Estudio gratuito y sin compromiso.',
  url: 'https://brokerhipotecariocastellon.es',
  email: 'info@brokerhipotecariocastellon.es',
  phone: '+34864872186',
  phoneDisplay: '864 87 21 86',
  whatsapp: '34864872186',
  whatsappMessage: 'Hola, me interesa información sobre hipotecas',
  address: {
    street: 'Calle Egual, 34',
    locality: 'Castellón de la Plana',
    postalCode: '12002',
    region: 'Castellón',
    country: 'ES',
    countryName: 'España',
  },
  geo: {
    latitude: 39.9864,
    longitude: -0.0513,
  },
  hours: [{ days: 'Lunes a Viernes', opens: '09:00', closes: '19:00' }],
  hoursMachine: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  registroLey5_2019: 'PENDIENTE — cliente proporcionará nº de inscripción',
  ogImage: '/img/og-default.jpg',
  social: {},
} as const;
