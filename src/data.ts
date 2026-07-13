import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Engenharia do Corpo',
  tagline: 'A maior estrutura de musculação e bem-estar de Natal com preço justo',
  description: 'Treine na melhor academia de Lagoa Nova. Ampla área de musculação, salas de ginástica, spinning, professores qualificados e planos que cabem no seu bolso.',
  aboutText: 'A Engenharia do Corpo nasceu com o propósito de tornar a atividade física acessível a todos, sem abrir mão de um padrão premium de atendimento e infraestrutura. Nossa unidade em Lagoa Nova conta com equipamentos modernos de alta tecnologia, equipe técnica sempre disponível e uma grade completa de aulas coletivas para que você encontre a modalidade ideal para o seu estilo de vida.',
  aboutImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
  phone: '(84) 99900-1111',
  phoneFormatted: '84999001111',
  whatsappNumber: '5584999001111',
  whatsappMessage: 'Olá! Gostaria de mais informações sobre os planos da academia ou agendar uma aula experimental.',
  address: 'Av. Prudente de Morais, 3720 - Lagoa Nova, Natal - RN, 59020-400',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.213271167727!2d-35.216391!3d-5.811394599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301c435be799b%3A0xe54e6fa16b0b2302!2sAv.%20Prudente%20de%20Morais%2C%203720%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059020-400!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/u1XvXQ5V9c7s6b6C7',
  businessHours: {
    weekdays: 'Segunda a Sexta: 05:00 às 23:00',
    saturday: 'Sábado: 08:00 às 18:00',
    sunday: 'Domingo: 09:00 às 13:00',
  },
  colors: {
    primaryHex: '#1e293b', // Slate Escuro Industrial
    accentHex: '#f59e0b',  // Laranja Estimulante
  },
  typography: {
    displayFontFamily: 'Oswald',
    bodyFontFamily: 'Roboto',
    importUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap',
  },
  features: [
    {
      title: 'Maquinário de Ponta',
      description: 'Equipamentos modernos e ergonômicos para otimizar os seus treinos diários.',
      iconName: 'Dumbbell',
    },
    {
      title: 'Aulas Coletivas Inclusas',
      description: 'Spinning, funcional, zumba e ritmos inclusos em todos os planos mensais.',
      iconName: 'Flame',
    },
    {
      title: 'Fácil Estacionamento',
      description: 'Estacionamento próprio amplo na Prudente de Morais com total segurança.',
      iconName: 'MapPin',
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Plano Mensal Livre',
      description: 'Acesso ilimitado à área de musculação, cárdio e a todas as aulas coletivas da grade, sem taxa de cancelamento.',
      price: 'R$ 99,90/mês',
      iconName: 'Dumbbell',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Plano Anual Corporativo',
      description: 'Acesso total garantido por 12 meses com preço promocional reduzido no cartão ou boleto recorrente.',
      price: 'R$ 79,90/mês equivalente',
      iconName: 'Timer',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Personal Trainer Parceiro',
      description: 'Consultoria de treino e acompanhamento individual no salão com profissionais qualificados credenciados.',
      price: 'Consulte taxas dos profissionais',
      iconName: 'HeartPulse',
      imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
    },
  ],
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};
