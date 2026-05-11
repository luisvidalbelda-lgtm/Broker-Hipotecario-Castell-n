// src/data/locations.ts
export interface Location {
  slug: string;
  name: string;
  comarca: string;
  postalCode: string;
  population: number;
  distanceFromOfficeKm: number;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  marketDataM2: number;
  marketDataYoY: number;
  marketSource: string;
  references: string[];
  uniqueText: string;
  faq: { q: string; a: string }[];
}

export const locations: Location[] = [
  {
    slug: 'vila-real',
    name: 'Vila-real',
    comarca: 'Plana Baixa',
    postalCode: '12540',
    population: 51367,
    distanceFromOfficeKm: 8,
    primaryKeyword: 'broker hipotecario Vila-real',
    metaTitle: 'Broker hipotecario Vila-real | BHC — Tu asesor independiente',
    metaDescription:
      'Broker hipotecario en Vila-real. Te conseguimos la mejor hipoteca comparando +30 bancos. Oficina a 8 km en Castellón centro. Estudio gratis.',
    description:
      'Vila-real es la segunda ciudad más poblada de la provincia y tiene mercado inmobiliario propio con dinámica distinta a Castellón ciudad: precio medio más bajo, ritmo de compraventa estable y demanda de jóvenes que trabajan en Castellón pero compran en Vila-real por relación calidad-precio.',
    marketDataM2: 1095,
    marketDataYoY: 4.2,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Estadio de la Cerámica', 'Termet', 'Centro histórico', 'Polígono Carinyena'],
    uniqueText:
      'Si vives o quieres comprar en Vila-real, estamos a 8 km de tu casa. No hace falta que vengas a Castellón ciudad — gestionamos toda la operación por WhatsApp, teléfono y email. Solo tendrás que venir a firmar a notaría (o lo hacemos en una notaría de Vila-real si lo prefieres). Conocemos bien el mercado local: el corredor de la N-340, las zonas residenciales del barrio Sant Pasqual, la oferta de obra nueva en el sector Madrigal. Sabemos qué bancos valoran las viviendas de Vila-real con mejor tasación.',
    faq: [
      {
        q: '¿Tenéis oficina en Vila-real?',
        a: 'No, nuestra oficina está en Castellón ciudad (C. Egual 34), a 8 km. Pero gestionamos operaciones de Vila-real con la misma agilidad — solo necesitas venir a firmar.',
      },
      {
        q: '¿Cuál es el precio medio de la vivienda en Vila-real?',
        a: 'En 2026 el precio medio en Vila-real ronda los 1.095 €/m², con una variación del +4,2% respecto al año anterior (fuente: Idealista). Más asequible que Castellón ciudad (~1.450 €/m²).',
      },
    ],
  },
  {
    slug: 'almassora',
    name: 'Almassora',
    comarca: 'Plana Alta',
    postalCode: '12550',
    population: 26194,
    distanceFromOfficeKm: 6,
    primaryKeyword: 'broker hipotecario Almassora',
    metaTitle: 'Broker hipotecario Almassora | BHC — Asesor hipotecario',
    metaDescription:
      'Broker hipotecario en Almassora. Negociamos con +30 bancos para conseguirte la mejor hipoteca. A 6 km de tu casa. Estudio gratuito.',
    description:
      'Almassora combina núcleo histórico, urbanizaciones residenciales y playa. Es un mercado con perfil familiar consolidado y demanda creciente de segundas residencias en la franja de costa.',
    marketDataM2: 1180,
    marketDataYoY: 5.1,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Playa de Almassora', 'Riu Millars', 'Centro histórico', 'Urbanización Boqueres'],
    uniqueText:
      'Almassora es uno de los mercados más activos del cinturón de Castellón. Trabajamos tanto viviendas habituales en el núcleo urbano como segundas residencias en la playa. Si compras en zona de playa, conocemos los bancos que mejor valoran tasaciones en costa.',
    faq: [
      {
        q: '¿Cuál es el precio medio en Almassora?',
        a: 'En 2026 ronda los 1.180 €/m² de media (Idealista), con variación del +5,1% YoY. La playa puede llegar a 1.500-1.800 €/m² en obra nueva.',
      },
      {
        q: '¿Financiáis vivienda en la playa de Almassora?',
        a: 'Sí, distinguimos vivienda habitual (más fácil de financiar al 80%) de segunda residencia en la franja de playa (suele financiarse al 70%).',
      },
    ],
  },
  {
    slug: 'benicassim',
    name: 'Benicàssim',
    comarca: 'Plana Alta',
    postalCode: '12560',
    population: 18098,
    distanceFromOfficeKm: 14,
    primaryKeyword: 'broker hipotecario Benicàssim',
    metaTitle: 'Broker hipotecario Benicàssim | BHC — También no residentes',
    metaDescription:
      'Broker hipotecario en Benicàssim. Especialistas en segunda vivienda y no residentes en costa Castellón. Estudio gratuito.',
    description:
      'Benicàssim es el mercado por excelencia de segunda residencia en Castellón: alta presencia de compradores británicos, alemanes y belgas, oferta consolidada en primera línea y planes urbanísticos en zonas como Las Villas y Heliópolis.',
    marketDataM2: 1820,
    marketDataYoY: 6.8,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Las Villas', 'Voramar', 'Heliópolis', 'Castillo del Toro Bonete'],
    uniqueText:
      'Benicàssim es donde más operaciones de segunda vivienda y no residentes hacemos. Conocemos las particularidades: tasación en primera línea (los bancos son cautos), hipotecas a clientes UE no residentes, financiación para inversores que alquilan vacacional. Si compras en Benicàssim, somos los que mejor entendemos tu caso.',
    faq: [
      {
        q: '¿Atendéis a no residentes que compran en Benicàssim?',
        a: 'Sí, es una de nuestras especialidades. Atendemos en inglés. Tenemos página específica sobre <a href="/servicios/hipoteca-no-residentes">hipoteca no residentes</a>.',
      },
      {
        q: '¿Cuánto financiaría un banco una vivienda en primera línea de Benicàssim?',
        a: 'Si es vivienda habitual y eres residente: 80%. Si es segunda residencia: 70-75%. Si eres no residente: 60-70%. Tasación en primera línea suele ser conservadora.',
      },
    ],
  },
  {
    slug: 'borriol',
    name: 'Borriol',
    comarca: 'Plana Alta',
    postalCode: '12190',
    population: 5341,
    distanceFromOfficeKm: 5,
    primaryKeyword: 'broker hipotecario Borriol',
    metaTitle: 'Broker hipotecario Borriol | BHC — Asesor hipotecario',
    metaDescription:
      'Broker hipotecario en Borriol. Te conseguimos la mejor hipoteca. A solo 5 km de tu casa en Castellón centro. Estudio gratuito.',
    description:
      'Borriol es un mercado pequeño pero muy específico: predominio de chalets en urbanizaciones (Sant Vicent, Pedrera, Les Forques), precios medios más altos que núcleos urbanos por el tipo de vivienda, y compradores que buscan zona residencial cerca de Castellón ciudad.',
    marketDataM2: 1340,
    marketDataYoY: 3.8,
    marketSource: 'Idealista índice de precios — actualizar trimestralmente',
    references: ['Urbanización Sant Vicent', 'Pedrera', 'Les Forques', 'Centro histórico'],
    uniqueText:
      'Borriol tiene mercado de chalets en urbanización: precios por encima de la media del cinturón, mayor superficie por vivienda, y tasaciones más variables. Trabajamos con bancos que entienden las urbanizaciones de Borriol y dan buena financiación a chalets unifamiliares.',
    faq: [
      {
        q: '¿Financiáis chalets en urbanización en Borriol?',
        a: 'Sí, conocemos bien los proyectos urbanos de Sant Vicent y Pedrera. Sabemos qué bancos tasan mejor los chalets unifamiliares.',
      },
    ],
  },
];
