// src/data/services.ts
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  intro: string;
  what: string[];
  howWeHelp: { icon: string; text: string }[];
  process: { step: number; title: string; description: string }[];
  forWho: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'hipoteca-primera-vivienda',
    title: 'Hipoteca para primera vivienda en Castellón',
    shortTitle: 'Primera vivienda',
    primaryKeyword: 'hipoteca primera vivienda Castellón',
    metaTitle: 'Hipoteca primera vivienda Castellón | BHC Broker Hipotecario',
    metaDescription:
      'Conseguimos la mejor hipoteca para tu primera casa en Castellón. Comparamos +30 bancos por ti. Estudio gratuito y sin compromiso.',
    icon: 'lucide:home',
    intro:
      'Comprar la primera casa es la decisión financiera más importante de tu vida. En BHC negociamos por ti con más de 30 entidades para conseguir el tipo de interés y las condiciones que mejor encajen con tu perfil.',
    what: [
      'Negociamos hipotecas fijas, variables y mixtas con las principales entidades de Castellón.',
      'Analizamos tu viabilidad financiera antes de mover ficha — sabemos qué bancos van a decirte que sí y cuáles no merece la pena ni consultar.',
      'Te acompañamos desde el primer cálculo hasta la firma ante notario, sin que tengas que pisar una sucursal.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Buscamos el tipo de interés más bajo: fijo, variable o mixto.' },
      { icon: 'lucide:shield-check', text: 'Negociamos eliminar vinculaciones innecesarias (seguros, planes, tarjetas).' },
      { icon: 'lucide:calculator', text: 'Calculamos el coste real total (TAE) más allá del nominal.' },
      { icon: 'lucide:file-check', text: 'Revisamos cláusulas suelo, comisiones y gastos antes de firmar.' },
    ],
    process: [
      { step: 1, title: 'Estudio gratuito', description: 'Nos cuentas tu situación (ingresos, ahorro, vivienda objetivo). Analizamos viabilidad en 24h.' },
      { step: 2, title: 'Negociación con bancos', description: 'Presentamos tu caso a las entidades que mejor encajan. Recibimos ofertas oficiales.' },
      { step: 3, title: 'Comparativa y decisión', description: 'Te presentamos las 2-3 mejores ofertas con coste real comparado. Tú decides.' },
      { step: 4, title: 'Firma ante notario', description: 'Acompañamiento en la firma. Te avisamos de cualquier cláusula a vigilar.' },
    ],
    forWho: [
      'Tienes ahorrado al menos un 10-20% del precio de la vivienda',
      'Tu trabajo es estable (indefinido o autónomo con histórico)',
      'No tienes deudas pendientes significativas en CIRBE',
      'Quieres comparar varias entidades sin pisar bancos uno a uno',
    ],
    faq: [
      {
        q: '¿Cuánto tiempo tarda todo el proceso?',
        a: 'Desde el primer estudio hasta la firma, lo habitual son 4-8 semanas. Si la documentación está completa desde el inicio, puede cerrarse en 4 semanas. Casos complejos llegan a 10.',
      },
      {
        q: '¿Qué documentación necesito para empezar?',
        a: 'Para el estudio inicial basta con: DNI, contratos laborales, últimas 3 nóminas, declaración de IRPF del último año, y vida laboral. Nada más al principio.',
      },
      {
        q: '¿Puedo conseguir hipoteca con menos del 20% de entrada?',
        a: 'Sí, en algunos perfiles llegamos al 90% de financiación e incluso 95% o 100% en casos concretos (avales ICO, vivienda joven, perfiles muy solventes). Lo evaluamos en el estudio inicial.',
      },
    ],
  },
  {
    slug: 'hipoteca-segunda-vivienda',
    title: 'Hipoteca para segunda vivienda en Castellón',
    shortTitle: 'Segunda vivienda',
    primaryKeyword: 'hipoteca segunda vivienda Castellón',
    metaTitle: 'Hipoteca segunda vivienda Castellón | BHC Broker Hipotecario',
    metaDescription:
      'Hipoteca para segunda residencia en Castellón y costa (Benicàssim). Comparamos +30 bancos. Estudio sin compromiso.',
    icon: 'lucide:palmtree',
    intro:
      'La hipoteca para una segunda vivienda funciona distinta: menor porcentaje de financiación, plazos más cortos y bancos más exigentes. En BHC sabemos cuáles aceptan operaciones de segunda residencia en costa de Castellón con buenas condiciones.',
    what: [
      'Hipotecas para segunda residencia en Castellón y alrededores: Benicàssim, Vila-real, Almassora, Borriol.',
      'Hipotecas para inversión inmobiliaria (alquilar tu segunda vivienda).',
      'Refinanciación de segundas viviendas con condiciones mejorables.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Identificamos bancos que financian segunda vivienda hasta el 70-80%.' },
      { icon: 'lucide:trending-up', text: 'Calculamos rentabilidad si vas a alquilarla (vacacional o larga estancia).' },
      { icon: 'lucide:scale', text: 'Comparamos hipoteca segunda vivienda vs. ampliación de la primera (más barato a veces).' },
      { icon: 'lucide:building-2', text: 'Trabajamos con bancos que aceptan complejos turísticos en costa.' },
    ],
    process: [
      { step: 1, title: 'Estudio de viabilidad', description: 'Evaluamos tu primera hipoteca (si la tienes) + capacidad para segunda.' },
      { step: 2, title: 'Selección de entidades', description: 'No todos los bancos financian segunda vivienda. Vamos directos a los que sí.' },
      { step: 3, title: 'Negociación y oferta', description: 'Recibimos ofertas y te las presentamos comparadas.' },
      { step: 4, title: 'Firma con tranquilidad', description: 'Acompañamiento en escritura.' },
    ],
    forWho: [
      'Ya tienes hipoteca de primera vivienda (o está pagada)',
      'Buscas vivienda en costa Castellón o pueblos interior',
      'Tu intención puede ser uso propio o alquiler vacacional',
      'Quieres invertir parte de tu patrimonio en inmueble',
    ],
    faq: [
      {
        q: '¿Hasta qué porcentaje me financian una segunda vivienda?',
        a: 'Lo habitual en segunda residencia es 70-80% del valor de tasación. En algunos casos (inversor solvente, primera ya pagada) llegamos al 80% sin problema.',
      },
      {
        q: '¿Es mejor pedir una segunda hipoteca o ampliar la primera?',
        a: 'Depende. Si tu primera hipoteca tiene buen interés y quedan pocos años, suele ser mejor segunda. Si la primera es cara, a veces ampliarla (refinanciar todo a la vez) sale mejor. Lo calculamos.',
      },
      {
        q: '¿Acepta el banco que la alquile como vacacional?',
        a: 'Algunos sí y otros no. En BHC vamos solo a los que aceptan uso vacacional desde el principio, para que no haya sorpresas.',
      },
    ],
  },
  {
    slug: 'subrogacion-hipotecaria',
    title: 'Subrogación hipotecaria en Castellón (cambio de banco)',
    shortTitle: 'Subrogación',
    primaryKeyword: 'subrogación hipoteca Castellón',
    metaTitle: 'Subrogación hipoteca Castellón | Cambio de banco — BHC',
    metaDescription:
      'Cambia tu hipoteca a un banco que te dé mejores condiciones. Ahorra hasta miles de € en intereses. Subrogación en Castellón con BHC.',
    icon: 'lucide:repeat',
    intro:
      'Si firmaste tu hipoteca hace años y los tipos han cambiado, probablemente estés pagando de más. La subrogación (también llamada "cambio de banco" o "refinanciación") consiste en trasladar tu hipoteca actual a otra entidad con mejores condiciones. En BHC lo gestionamos íntegro.',
    what: [
      'Analizamos tu hipoteca actual (interés, plazo, cuota, capital pendiente) y la comparamos con lo que el mercado ofrece hoy.',
      'Negociamos con tu banco actual primero (ahorra costes) — si no mejoran, ejecutamos la subrogación.',
      'Cubrimos también la novación: cambiar condiciones manteniendo el mismo banco.',
      'Refinanciación: ampliar plazo, reducir cuota, consolidar préstamos personales.',
    ],
    howWeHelp: [
      { icon: 'lucide:trending-down', text: 'Calculamos el ahorro real (en €) durante toda la vida restante de la hipoteca.' },
      { icon: 'lucide:scissors', text: 'Estudiamos eliminar bonificaciones que no usas (seguros, planes, tarjetas).' },
      { icon: 'lucide:file-text', text: 'Gestionamos todos los trámites: tasación, gestoría, notaría.' },
      { icon: 'lucide:wallet', text: 'Algunas subrogaciones tienen coste 0€ — buscamos esas primero.' },
    ],
    process: [
      { step: 1, title: 'Auditoría de tu hipoteca actual', description: 'Nos enseñas tu cuadro de amortización + escritura. Calculamos cuánto estás pagando de más.' },
      { step: 2, title: 'Negociación con tu banco', description: 'Antes de cambiar, le damos opción de mejorar. Muchas veces aceptan.' },
      { step: 3, title: 'Búsqueda de banco objetivo', description: 'Si el tuyo no mejora, presentamos tu caso a entidades que ofrecen subrogación con costes mínimos.' },
      { step: 4, title: 'Firma de subrogación', description: 'Acompañamos en la firma ante notario. Sale más barato de lo que parece.' },
    ],
    forWho: [
      'Tu hipoteca actual tiene interés superior al 3% (revisa tu última factura)',
      'Te quedan al menos 10 años de hipoteca por delante',
      'Tu situación laboral/económica es similar o mejor que cuando firmaste',
      'Pagas seguros o productos vinculados que no usas',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta hacer una subrogación?',
        a: 'Por ley, la subrogación a otro banco tiene costes muy reducidos: tasación (~300€) y notaría (~500€). Algunos bancos los asumen ellos. La comisión por subrogación de tu banco actual está limitada por ley al 0,5%-0,15% según años transcurridos.',
      },
      {
        q: '¿Cuánto puedo ahorrar al subrogar?',
        a: 'Depende del diferencial. Bajar 1 punto de interés en una hipoteca de 150.000€ a 20 años son ~17.000€ de ahorro. Calculamos tu caso real en el estudio gratuito.',
      },
      {
        q: '¿Cuál es la diferencia entre subrogación, novación y refinanciación?',
        a: 'Subrogación = cambias de banco. Novación = mismo banco, mejores condiciones. Refinanciación = término amplio que engloba ambos + ampliar plazo o consolidar deudas. En la práctica buscamos la opción que más te ahorre, sea cual sea.',
      },
      {
        q: '¿Mi banco puede negarse a la subrogación?',
        a: 'No. Por ley tiene derecho a igualar la oferta del nuevo banco (derecho de tanteo), pero si no la iguala, la subrogación se ejecuta.',
      },
    ],
  },
  {
    slug: 'maxima-financiacion',
    title: 'Hipoteca al 100% en Castellón (máxima financiación)',
    shortTitle: 'Máxima financiación',
    primaryKeyword: 'hipoteca 100 financiación Castellón',
    metaTitle: 'Hipoteca 100% Castellón | Máxima financiación — BHC',
    metaDescription:
      'Hipoteca al 100% en Castellón sin entrada. Buscamos los bancos que financian el máximo según tu perfil. Estudio gratis.',
    icon: 'lucide:trending-up',
    intro:
      'No tener el 20% de ahorro para una entrada no significa quedarte sin casa. Hay bancos que financian al 90%, 95% e incluso 100% según perfil. En BHC sabemos cuáles y bajo qué condiciones. También gestionamos los avales ICO que permiten llegar al 95-100% para jóvenes y familias.',
    what: [
      'Identificamos bancos que ofrecen máxima financiación según tu perfil concreto.',
      'Gestionamos el aval público ICO (jóvenes <35 y familias con menores).',
      'Estudiamos doble garantía (segundo inmueble) para llegar al 100%.',
      'Combinamos préstamos puente si estás vendiendo tu vivienda anterior.',
    ],
    howWeHelp: [
      { icon: 'lucide:percent', text: 'Conocemos qué bancos financian al 90/95/100% en cada perfil.' },
      { icon: 'lucide:shield', text: 'Tramitamos el aval ICO si calificas (joven, familia con hijos).' },
      { icon: 'lucide:home', text: 'Estudiamos garantía hipotecaria adicional con familiares.' },
      { icon: 'lucide:lightbulb', text: 'Alternativas creativas: hipoteca tasación > compra, préstamo personal complementario.' },
    ],
    process: [
      { step: 1, title: 'Diagnóstico de perfil', description: 'Ingresos, edad, situación familiar, ahorro existente, vivienda objetivo.' },
      { step: 2, title: 'Estrategia de financiación', description: 'Decidimos qué vía usar: 100% banco, 90% + aval ICO, doble garantía, etc.' },
      { step: 3, title: 'Negociación', description: 'Presentamos tu caso a los bancos que financian máximo según tu vía.' },
      { step: 4, title: 'Firma', description: 'Acompañamos hasta notaría.' },
    ],
    forWho: [
      'Tienes ahorrado menos del 20% de la vivienda',
      'Eres joven (<35) o familia con menores (aval ICO)',
      'Tienes ingresos sólidos pero poco ahorro acumulado',
      'Cuentas con familia que puede aportar garantía hipotecaria',
    ],
    faq: [
      {
        q: '¿Realmente hay hipotecas al 100% en 2026?',
        a: 'Sí, pero no para todos los perfiles. Los bancos las dan a perfiles muy solventes (ingresos altos, trabajo estable) o con apoyo público (aval ICO para jóvenes y familias). En BHC vemos rápido si encajas.',
      },
      {
        q: '¿Qué es el aval ICO y cómo funciona?',
        a: 'Es un aval del Estado que cubre hasta el 20% del préstamo. Permite que el banco te financie el 100% (el suyo 80% + aval ICO 20%). Lo gestionamos por ti si calificas.',
      },
      {
        q: '¿Me sale más caro pedir el 100% que el 80%?',
        a: 'Habitualmente sí, en interés (entre 0,1 y 0,5 puntos más). Pero te permite comprar antes y empezar a amortizar antes. Calculamos si compensa en tu caso.',
      },
    ],
  },
  {
    slug: 'hipoteca-no-residentes',
    title: 'Hipoteca para no residentes en Castellón',
    shortTitle: 'No residentes',
    primaryKeyword: 'hipoteca no residentes Castellón',
    metaTitle: 'Hipoteca no residentes Castellón | Mortgage Spain — BHC',
    metaDescription:
      'Hipoteca en España para extranjeros no residentes. Compra tu vivienda en Castellón o Benicàssim. Asesoramiento bilingüe.',
    icon: 'lucide:globe',
    intro:
      'Si vives fuera de España pero quieres comprar vivienda en costa Castellón, los bancos te tratan distinto: financian un porcentaje menor (60-70%), piden más documentación y son más exigentes con el perfil. En BHC trabajamos a diario con compradores británicos, alemanes, belgas, holandeses y franceses.',
    what: [
      'Hipotecas para no residentes en Castellón y alrededores: Benicàssim, Vila-real, Almassora, Borriol.',
      'Asesoramiento en NIE (Número de Identificación de Extranjero) — necesario para escriturar.',
      'Acompañamiento en apertura de cuenta bancaria española.',
      'Coordinación con asesor fiscal si es necesario (ITP, Impuesto sobre Bienes Inmuebles).',
    ],
    howWeHelp: [
      { icon: 'lucide:globe', text: 'Trabajamos con bancos especializados en clientes internacionales.' },
      { icon: 'lucide:file-text', text: 'Sabemos qué documentación piden y cómo traducirla.' },
      { icon: 'lucide:euro', text: 'Negociamos en euros incluso si cobras en libras/dólares.' },
      { icon: 'lucide:map-pin', text: 'Conocemos el mercado de costa Castellón al detalle.' },
    ],
    process: [
      { step: 1, title: 'Análisis de tu situación', description: 'País de residencia, moneda de ingresos, vivienda objetivo en España.' },
      { step: 2, title: 'Trámites previos', description: 'NIE, cuenta bancaria española, documentación traducida si hace falta.' },
      { step: 3, title: 'Negociación con bancos', description: 'Bancos que financian a no residentes con buenas condiciones.' },
      { step: 4, title: 'Firma en España (o por poder)', description: 'Podemos coordinar firma por poder si no puedes venir.' },
    ],
    forWho: [
      'Vives fuera de España (UE o no UE)',
      'Quieres comprar vivienda en Castellón, principalmente costa',
      'Tienes ingresos demostrables en tu país de residencia',
      'No tienes (o no quieres usar) financiación de tu banco extranjero',
    ],
    faq: [
      {
        q: '¿Cuánto me financia el banco si no soy residente?',
        a: 'Lo habitual son 60-70% del valor de tasación para no residentes de la UE, y 50-60% para no residentes fuera de la UE. Hay excepciones para perfiles muy solventes.',
      },
      {
        q: '¿Qué es el NIE y cómo lo consigo?',
        a: 'NIE = Número de Identificación de Extranjero. Es obligatorio para comprar inmueble en España. Se solicita en consulados españoles en tu país o en comisarías en España. Nosotros te indicamos el proceso paso a paso.',
      },
      {
        q: '¿Puedo firmar sin venir a España?',
        a: 'Sí, mediante poder notarial otorgado en tu país (con apostilla de La Haya si aplica). Coordinamos toda la operación remotamente.',
      },
      {
        q: '¿Atendéis en inglés / otros idiomas?',
        a: 'Sí. Atención principal en castellano e inglés. Para otros idiomas (alemán, francés) facilitamos traductor.',
      },
    ],
  },
  {
    slug: 'hipoteca-autonomos',
    title: 'Hipoteca para autónomos en Castellón',
    shortTitle: 'Autónomos',
    primaryKeyword: 'hipoteca autónomos Castellón',
    metaTitle: 'Hipoteca autónomos Castellón | Sin trabas — BHC Broker',
    metaDescription:
      'Hipoteca para autónomos en Castellón. Los bancos no te lo ponen fácil; nosotros sí. Conocemos qué entidades aceptan tu perfil.',
    icon: 'lucide:briefcase',
    intro:
      'Ser autónomo es la condición laboral que más rechazan los bancos al pedir hipoteca, aunque tus ingresos sean superiores a un asalariado. En BHC sabemos qué entidades sí valoran al autónomo, qué documentación les convence y cómo presentar tu caso para que digan que sí.',
    what: [
      'Hipotecas para autónomos con al menos 2 años de actividad demostrable.',
      'Hipotecas para profesionales del régimen RETA: médicos, abogados, ingenieros, consultores.',
      'Asesoramiento para mejorar tu perfil antes de pedir (gestión de IRPF, módulos vs estimación directa).',
      'Estudiamos también societarios (administrador único de SL).',
    ],
    howWeHelp: [
      { icon: 'lucide:briefcase', text: 'Vamos solo a bancos que aceptan autónomos sin penalizar.' },
      { icon: 'lucide:trending-up', text: 'Sabemos qué cuadros de cuentas convencen al risk de cada banco.' },
      { icon: 'lucide:scale', text: 'Comparamos hipoteca personal vs. como administrador SL — la mejor opción depende del caso.' },
      { icon: 'lucide:file-check', text: 'Preparamos el dossier financiero para que parezca de empleado fijo.' },
    ],
    process: [
      { step: 1, title: 'Auditoría fiscal', description: 'IRPF últimos 2-3 años, modelo 130, vida laboral. Vemos qué muestra el SII al banco.' },
      { step: 2, title: 'Selección de bancos', description: 'Solo bancos friendly con autónomos. Otros directamente no los pisamos.' },
      { step: 3, title: 'Presentación reforzada', description: 'Preparamos memoria de actividad, evolución facturación, cartera de clientes recurrentes.' },
      { step: 4, title: 'Negociación y firma', description: 'Acompañamos hasta el final.' },
    ],
    forWho: [
      'Llevas al menos 2 años como autónomo',
      'Tu IRPF muestra ingresos sólidos (no oculta beneficios)',
      'No tienes deudas con Hacienda ni Seguridad Social',
      'Puedes acreditar facturación regular o clientes recurrentes',
    ],
    faq: [
      {
        q: '¿Cuántos años tengo que llevar de autónomo para que me den hipoteca?',
        a: 'Mínimo 2 años fiscales completos como autónomo. Algunos bancos piden 3. Si tienes menos, conviene esperar o que un cónyuge asalariado sea titular principal.',
      },
      {
        q: '¿Me penaliza tener "pocos beneficios" en el IRPF aunque facture mucho?',
        a: 'Sí. El banco mira beneficio neto en IRPF, no facturación bruta. Si llevas años "minimizando" para pagar menos impuestos, te penaliza ahora. Lo ideal es planificar 2 ejercicios antes de pedir hipoteca.',
      },
      {
        q: '¿Es mejor pedir la hipoteca como persona física o como SL?',
        a: 'Casi siempre como persona física (administrador único de la SL). Las hipotecas a sociedades son más caras y restrictivas. Excepciones: locales comerciales y operaciones de inversión grandes.',
      },
    ],
  },
  {
    slug: 'hipoteca-joven',
    title: 'Hipoteca joven en Castellón (avales ICO + ayudas)',
    shortTitle: 'Hipoteca joven',
    primaryKeyword: 'hipoteca joven Castellón',
    metaTitle: 'Hipoteca joven Castellón | Aval ICO 2026 — BHC',
    metaDescription:
      'Hipoteca para jóvenes <35 en Castellón con aval ICO + ayudas Generalitat Valenciana. Hasta 95-100% financiación. Estudio gratis.',
    icon: 'lucide:sparkles',
    intro:
      'Si tienes menos de 35 años, hay ayudas públicas para comprar tu primera vivienda. El aval ICO te permite financiar hasta el 100% (cubre lo que el banco no financia), y las ayudas de la Generalitat Valenciana pueden cubrir parte del IBI, ITP o gastos de gestión. En BHC tramitamos todo.',
    what: [
      'Aval público ICO para vivienda habitual (cubre hasta el 20% del precio).',
      'Ayudas autonómicas Generalitat Valenciana: bonos jóvenes, ayudas a entrada.',
      'Hipoteca al 95-100% combinando aval ICO + banco.',
      'Asesoramiento sobre límites de renta, edad, ubicación de vivienda elegible.',
    ],
    howWeHelp: [
      { icon: 'lucide:sparkles', text: 'Sabemos qué jóvenes califican para aval ICO y cuáles para ayudas GVA.' },
      { icon: 'lucide:file-text', text: 'Tramitamos toda la documentación de las ayudas por ti.' },
      { icon: 'lucide:calculator', text: 'Calculamos el ahorro real combinando ayudas + mejor hipoteca.' },
      { icon: 'lucide:home', text: 'Te decimos qué viviendas en Castellón califican para qué ayudas (no todas).' },
    ],
    process: [
      { step: 1, title: 'Verificación de elegibilidad', description: 'Edad, ingresos, vivienda objetivo. Vemos qué ayudas aplican.' },
      { step: 2, title: 'Solicitud de ayudas', description: 'Tramitamos aval ICO + bonos GVA en paralelo.' },
      { step: 3, title: 'Hipoteca complementaria', description: 'Negociamos con bancos que aceptan combinar aval ICO.' },
      { step: 4, title: 'Firma con ahorro máximo', description: 'Acompañamos en notaría.' },
    ],
    forWho: [
      'Tienes menos de 35 años (algunas ayudas <40)',
      'Compras tu primera vivienda habitual',
      'Tu renta no supera el límite (suele ser 4-4,5 veces IPREM)',
      'Vivienda objetivo en Castellón cumple criterios de superficie/precio',
    ],
    faq: [
      {
        q: '¿Cuál es el límite de renta para el aval ICO 2026?',
        a: 'Aproximadamente 4,5 veces el IPREM (límite varía cada año, en 2026 está cerca de 37.800€/año individual, 50.000€ en familia). Verificamos tu caso concreto.',
      },
      {
        q: '¿Las ayudas son compatibles con cualquier banco?',
        a: 'No todos los bancos están adheridos al programa de avales ICO. En BHC vamos directos a los que sí.',
      },
      {
        q: '¿Cuánto tarda el aval ICO?',
        a: 'La aprobación del aval ICO suele tardar 2-4 semanas. Si la operación corre prisa, planificamos el calendario al detalle.',
      },
    ],
  },
];
