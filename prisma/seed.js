import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoriesSeed = [
  { title: 'Бани', sortOrder: 1 },
  { title: 'Беседки и веранды', sortOrder: 2 },
  { title: 'Другие садовые объекты', sortOrder: 3 },
]

const projectsSeed = [
  {
    title: 'Баня бочка',
    description:
      'Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над входом.',
    categoryTitle: 'Бани',
  },
  {
    title: 'Беседка семейная',
    description: 'Уютная беседка для семейных встреч на участке.',
    categoryTitle: 'Беседки и веранды',
  },
  {
    title: 'Веранда панорамная',
    description: 'Просторная веранда с панорамным остеклением.',
    categoryTitle: 'Беседки и веранды',
  },
  {
    title: 'Садовый павильон',
    description: 'Лёгкий павильон для отдыха на участке.',
    categoryTitle: 'Другие садовые объекты',
  },
]

const productCategoriesSeed = [
  { title: 'Бани', sortOrder: 1 },
  { title: 'Беседки и веранды', sortOrder: 2 },
  { title: 'Другие садовые объекты', sortOrder: 3 },
]

const productsSeed = [
  {
    title: 'Баня бочка',
    description:
      'Корпус бани выполнен из качественной древесины ели, собранной по надежной системе «лунный паз».',
    materials: 'Брус / металл / кирпичи',
    stove: 'Термофор Допропар -14',
    interiorHtml:
      'Корпус бани выполнен из качественной древесины ели, собранной по надежной системе «лунный паз», что обеспечивает отличную теплоизоляцию. Для долговечности и эстетики корпус снаружи обработан защитными составами (цвет на выбор клиента), а верхняя часть бочки покрыта мягкой черепицей (доступны зеленый, красный или коричневый цвета). Устойчивость конструкции обеспечивают три подставки из бруса.<br /><br /><strong>Двери и Электрика</strong><br />Входная дверь выполнена из массива древесины и комплектуется ручками и наличниками. Дверь в парилку изготовлена из массива липы. Проведена полная электрическая проводка под ключ: в каждом отделении установлены лампочка с плафоном, розетка и выключатель.',
    characteristicsHtml:
      'Размеры - 5х10<br />Площадь помещений - 29 м²<br />Пятно застройки - 50 м²<br />Этажность - 1<br />Технология - Клееный брус',
    kitHtml:
      'Внутри баня полностью оборудована для комфортного парения:<br /><ul><li>Дровяная печь поставляется в сборе с дымоходом.</li><li>Установлен бак для воды из нержавеющей стали с краном, объемом 50 литров.</li><li>В парилке и предбаннике уложены трапики и установлены пологи (2 шт.) и скамейки (2 шт. в предбаннике).</li><li>В парилку и предбанник установлены открывающиеся окна со стеклопакетами (по 1 шт. в каждом отделении).</li><li>Для слива воды в парилке предусмотрено специальное сливное отверстие.</li><li>В комплект включены камни для каменки (100–60 кг).</li></ul>',
    categoryTitle: 'Бани',
    sizes: [
      { label: '4,2х2,2х2,5 м.', value: '4.2x2.2x2.5', price: 2270000, code: '4197410' },
      { label: '5,0х2,2х2,5 м.', value: '5.0x2.2x2.5', price: 2580000, code: '4197411' },
      { label: '6,0х2,2х2,5 м.', value: '6.0x2.2x2.5', price: 2890000, code: '4197412' },
      { label: '7,0х2,2х2,5 м.', value: '7.0x2.2x2.5', price: 3200000, code: '4197413' },
    ],
  },
  {
    title: 'Беседка семейная',
    description: 'Уютная беседка для семейных встреч на участке.',
    materials: 'Брус / металл',
    stove: null,
    interiorHtml: 'Уютная беседка для семейных встреч на участке.',
    characteristicsHtml: 'Размеры - 3х3<br />Площадь помещений - 9 м²<br />Технология - Клееный брус',
    kitHtml:
      'Комплектация включает кровлю, ограждения и настил пола.<br /><ul><li>Каркас из бруса.</li><li>Декоративные ограждения.</li></ul>',
    categoryTitle: 'Беседки и веранды',
    sizes: [{ label: '3,0х3,0 м.', value: '3.0x3.0', price: 890000, code: '5197410' }],
  },
  {
    title: 'Веранда панорамная',
    description: 'Просторная веранда с панорамным остеклением.',
    materials: 'Брус / стекло / металл',
    stove: null,
    interiorHtml: 'Просторная веранда с панорамным остеклением для отдыха в любое время года.',
    characteristicsHtml: 'Размеры - 4х6<br />Площадь помещений - 24 м²<br />Технология - Клееный брус',
    kitHtml:
      'Комплектация включает остекление, крышу и напольное покрытие.<br /><ul><li>Остекление по периметру.</li><li>Кровля с водостоком.</li></ul>',
    categoryTitle: 'Беседки и веранды',
    sizes: [{ label: '4,0х6,0 м.', value: '4.0x6.0', price: 1250000, code: '6197410' }],
  },
  {
    title: 'Садовый павильон',
    description: 'Лёгкий павильон для отдыха на участке.',
    materials: 'Брус / металл',
    stove: null,
    interiorHtml: 'Лёгкий павильон для отдыха на участке.',
    characteristicsHtml: 'Размеры - 3х4<br />Площадь помещений - 12 м²',
    kitHtml:
      'Комплектация включает каркас и кровлю.<br /><ul><li>Каркас из бруса.</li><li>Кровля с утеплением.</li></ul>',
    categoryTitle: 'Другие садовые объекты',
    sizes: [{ label: '3,0х4,0 м.', value: '3.0x4.0', price: 990000, code: '7197410' }],
  },
]

const placeholderImages = [
  { url: '/images/OurProducts/1.png', sortOrder: 1 },
  { url: '/images/OurProducts/1.png', sortOrder: 2 },
  { url: '/images/OurProducts/1.png', sortOrder: 3 },
]

const ensureSeo = async () => {
  await prisma.seo.upsert({
    where: { key: 'main' },
    update: {
      title: 'Бани 21 века',
      description: 'Проекты бань, беседок и веранд под ключ.',
    },
    create: {
      key: 'main',
      title: 'Бани 21 века',
      description: 'Проекты бань, беседок и веранд под ключ.',
    },
  })
}

const seedCategories = async () => {
  for (const category of categoriesSeed) {
    await prisma.projectCategory.upsert({
      where: { title: category.title },
      update: {
        sortOrder: category.sortOrder,
      },
      create: category,
    })
  }
}

const seedProjects = async () => {
  const categories = await prisma.projectCategory.findMany({
    select: { id: true, title: true },
  })
  const categoryMap = new Map(categories.map((category) => [category.title, category.id]))

  for (const project of projectsSeed) {
    const categoryId = categoryMap.get(project.categoryTitle)
    if (!categoryId) continue

    const existing = await prisma.project.findFirst({
      where: {
        title: project.title,
        categoryId,
      },
      select: { id: true },
    })

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: {
          description: project.description,
          images: {
            deleteMany: {},
            create: placeholderImages,
          },
        },
      })
      continue
    }

    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        categoryId,
        images: { create: placeholderImages },
      },
    })
  }
}

const seedProductCategories = async () => {
  for (const category of productCategoriesSeed) {
    await prisma.productCategory.upsert({
      where: { title: category.title },
      update: {
        sortOrder: category.sortOrder,
      },
      create: category,
    })
  }
}

const seedProducts = async () => {
  const categories = await prisma.productCategory.findMany({
    select: { id: true, title: true },
  })
  const categoryMap = new Map(categories.map((category) => [category.title, category.id]))

  for (const product of productsSeed) {
    const categoryId = categoryMap.get(product.categoryTitle)
    if (!categoryId) continue

    const existing = await prisma.product.findFirst({
      where: {
        title: product.title,
        categoryId,
      },
      select: { id: true },
    })

    const sizes = product.sizes.map((size, index) => ({
      ...size,
      sortOrder: index + 1,
    }))

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          description: product.description,
          materials: product.materials,
          stove: product.stove,
          interiorHtml: product.interiorHtml,
          characteristicsHtml: product.characteristicsHtml,
          kitHtml: product.kitHtml,
          images: {
            deleteMany: {},
            create: placeholderImages,
          },
          sizes: {
            deleteMany: {},
            create: sizes,
          },
        },
      })
      continue
    }

    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        materials: product.materials,
        stove: product.stove,
        interiorHtml: product.interiorHtml,
        characteristicsHtml: product.characteristicsHtml,
        kitHtml: product.kitHtml,
        categoryId,
        images: { create: placeholderImages },
        sizes: { create: sizes },
      },
    })
  }
}

const main = async () => {
  await ensureSeo()
  await seedCategories()
  await seedProjects()
  await seedProductCategories()
  await seedProducts()
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
