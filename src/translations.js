// src/translations.js

export const translations = {
    fr: {
      // --- NAVIGATION ---
      nav: {
        links: [
          { label: "Accueil", href: "#hero" },
          { label: "Services", href: "#services" },
          { label: "Réalisations", href: "#portfolio" },
          { label: "Équipe", href: "#equipe" },
          { label: "Contact", href: "#contact" },
        ],
        cta: "Nous contacter",
        themeToLight: "Activer le mode clair",
        themeToDark: "Activer le mode sombre",
        menuOpen: "Ouvrir le menu",
        menuClose: "Fermer le menu",
        switchLang: "Changer de langue",
      },
  
      // --- HERO SECTION ---
      hero: {
        badge: "Studio digital — Bamako, Mali",
        titleStart: "On construit ",
        titleHighlight: "votre présence",
        titleEnd: " numérique.",
        description:
          "WorldDigital accompagne particuliers et entreprises maliennes dans leurs projets web, mobile et maintenance informatique — de l'idée au lancement.",
        ctaPrimary: "Discuter de votre projet",
        ctaSecondary: "Voir nos services",
        features: [
          "Développement web",
          "Applications mobiles",
          "Maintenance informatique",
        ],
        floatingCard: {
          founders: "2 fondateurs",
          location: "basés à Bamako",
        },
        imageAlt: "Équipe WorldDigital au travail",
        imagePlaceholder: "Image à venir",
        scrollCue: "Découvrir",
      },
  
      // --- SERVICES SECTION ---
      services: {
        badge: "Nos services",
        titleStart: "Ce qu'on peut faire ",
        titleHighlight: "pour vous",
        titleEnd: ".",
        description:
          "Cinq domaines, un même objectif : rendre le digital accessible et fiable au Mali.",
        readMore: "En savoir plus",
        items: [
          {
            title: "Développement web",
            desc: "Sites vitrines, plateformes sur-mesure et applications web pensées pour vos clients.",
          },
          {
            title: "Applications mobiles",
            desc: "Apps natives ou hybrides, du design au déploiement sur les stores, pensées pour une connexion instable.",
          },
          {
            title: "Maintenance & support",
            desc: "Dépannage sur site et à distance, entretien préventif, contrats de support mensuels.",
          },
          {
            title: "Réseaux & infrastructure",
            desc: "Installation et configuration de réseaux d'entreprise, serveurs, Wi-Fi et câblage.",
          },
          {
            title: "Conseil & accompagnement",
            desc: "Audit digital, stratégie technologique et formation de vos équipes aux outils numériques.",
          },
          {
            title: "Conseil & Solutions IA",
            desc: "Audit digital, intégration de l'intelligence artificielle et automatisation de vos processus métier.",
          }
        ],
      },
  
      // --- PORTFOLIO SECTION ---
      portfolio: {
        badge: "Portfolio",
        titleStart: "Projets ",
        titleHighlight: "récents",
        titleEnd: ".",
        description:
          "Une sélection de nos réalisations . ",
        visitCTA: "Visiter",
        viewProjectAria: "Voir le projet {title} (nouvel onglet)",
        projects: [
          {
            n: "01",
            title: "Cosméthique",
            description: "Application web pour la vente de produits cosmétiques.",
            url: "https://cosmethique.vercel.app/",
          },
          {
            n: "02",
            title: "Africa Transit Express",
            description:
              "Application de voyage en ligne pour l'Africa Transit Express.",
            url: "https://mamadou6455.github.io/Africa-transit-express/",
          },
          {
            n: "03",
            title: "Gestion de parc informatique",
            description:
              "Application web pour la gestion de parc informatique avec authentification et base de données.",
            url: "https://mamadou6455.github.io/quiz_reseau-v3/",
          },
        ],
      },
  
      // --- PARTENAIRE SECTION ---
      partner: {
        badge: "Partenaire",
        titleStart: "Ils nous font ",
        titleHighlight: "confiance",
        titleEnd: ".",
        partnerTag: "Partenaire",
        name: "Cigogne du mande",
        role: "cyber café et centre de formation",
      },
  
      // --- EQUIPE SECTION ---
      team: {
        badge: "L'équipe",
        
        titleEnd: ".",
        description:
          "Ce projet est né de deux jeunes maliens convaincus que le numérique peut changer le quotidien des entreprises et des particuliers au Mali. Passionnés de technologie depuis toujours, on a choisi de mettre nos compétences au service de projets concrets — avec la volonté de livrer un travail sérieux, accessible et durable.",
        members: [
          {
            name: "Adama KONE",
            role: "Développeur logiciel",
          },
          {
            name: "Mamadou TRAORÉ",
            role: "Cofondateur — Design & Mobile",
          },
        ],
        signature: "SiraSolf",
      },
  
      // --- CONTACT SECTION ---
      contact: {
        badge: "Contact",
        titleStart: "Discutons de ",
        titleHighlight: "votre projet",
        titleEnd: ".",
        description:
          "Une idée, un besoin de maintenance, un projet web ou mobile ? Écrivez-nous, on revient vers vous rapidement.",
        infoLabels: {
          email: "Email",
          whatsapp: "WhatsApp",
          location: "Localisation",
          locationValue: "Bamako, Mali",
        },
        form: {
          nameLabel: "Nom",
          namePlaceholder: "Votre nom",
          emailLabel: "Email",
          emailPlaceholder: "vous@exemple.com",
          messageLabel: "Message",
          messagePlaceholder: "Parlez-nous de votre projet…",
          submit: "Envoyer le message",
          sending: "Envoi en cours…",
          successTitle: "Message envoyé",
          successMessage: (name) =>
            `Merci ${name || ""}, on vous répond très vite.`,
          errorMessage:
            "Une erreur est survenue. Réessayez ou écrivez-nous directement par email.",
        },
      },
  
      // --- FOOTER SECTION ---
      footer: {
        brand: "World",
        brandHighlight: "Digital",
        links: [
          { label: "Accueil", href: "#hero" },
          { label: "Services", href: "#services" },
          { label: "Réalisations", href: "#portfolio" },
          { label: "Équipe", href: "#equipe" },
          { label: "Contact", href: "#contact" },
        ],
        location: "📍 Bamako, Mali",
        partnership: "en partenariat avec",
        partnerName: "Cigogne du Mande",
        rights: "Tous droits réservés.",
      },
    },
  
    // =========================================================================
    // ENGLISH (EN)
    // =========================================================================
    en: {
      // --- NAVIGATION ---
      nav: {
        links: [
          { label: "Home", href: "#hero" },
          { label: "Services", href: "#services" },
          { label: "Works", href: "#portfolio" },
          { label: "Team", href: "#equipe" },
          { label: "Contact", href: "#contact" },
        ],
        cta: "Get in touch",
        themeToLight: "Switch to light mode",
        themeToDark: "Switch to dark mode",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        switchLang: "Change language",
      },
  
      // --- HERO SECTION ---
      hero: {
        badge: "Digital Studio — Bamako, Mali",
        titleStart: "Building ",
        titleHighlight: "your digital",
        titleEnd: " presence.",
        description:
          "WorldDigital supports individuals and Malian businesses in their web, mobile, and IT maintenance projects — from concept to launch.",
        ctaPrimary: "Discuss your project",
        ctaSecondary: "View our services",
        features: [
          "Web development",
          "Mobile applications",
          "IT maintenance",
        ],
        floatingCard: {
          founders: "2 founders",
          location: "based in Bamako",
        },
        imageAlt: "WorldDigital team at work",
        imagePlaceholder: "Coming soon",
        scrollCue: "Discover",
      },
  
      // --- SERVICES SECTION ---
      services: {
        badge: "Our services",
        titleStart: "What we can do ",
        titleHighlight: "for you",
        titleEnd: ".",
        description:
          "Five domains, one single goal: making digital technology accessible and reliable in Mali.",
        readMore: "Learn more",
        items: [
          {
            title: "Web development",
            desc: "Showcase websites, custom platforms, and web apps tailored to your customers' needs.",
          },
          {
            title: "Mobile applications",
            desc: "Native and hybrid apps, from design to app store deployment, built for unstable network connectivity.",
          },
          {
            title: "Maintenance & support",
            desc: "On-site and remote troubleshooting, preventive maintenance, and monthly support contracts.",
          },
          {
            title: "Networks & infrastructure",
            desc: "Installation and configuration of corporate networks, servers, Wi-Fi, and cabling.",
          },
          {
            title: "Consulting & advisory",
            desc: "Digital audits, technology strategy, and team training on digital tools.",
          },
        ],
      },
  
      // --- PORTFOLIO SECTION ---
      portfolio: {
        badge: "Portfolio",
        titleStart: "Recent ",
        titleHighlight: "projects",
        titleEnd: ".",
        description:
          "A selection of web and mobile creations. Click on a card to open the live site.",
        visitCTA: "Visit",
        viewProjectAria: "View project {title} (new tab)",
        projects: [
          {
            n: "01",
            title: "Cosméthique",
            description: "Web application for selling cosmetics products online.",
            url: "https://cosmethique.vercel.app/",
          },
          {
            n: "02",
            title: "Africa Transit Express",
            description:
              "Online travel booking application for Africa Transit Express.",
            url: "https://mamadou6455.github.io/Africa-transit-express/",
          },
          {
            n: "03",
            title: "IT Asset Management",
            description:
              "Web application for IT asset tracking with user authentication and database management.",
            url: "https://mamadou6455.github.io/quiz_reseau-v3/",
          },
        ],
      },
  
      // --- PARTENAIRE SECTION ---
      partner: {
        badge: "Partner",
        titleStart: "They trust ",
        titleHighlight: "our work",
        titleEnd: ".",
        partnerTag: "Partner",
        name: "Cigogne du mande",
        role: "Cyber café & training center",
      },
  
      // --- EQUIPE SECTION ---
      team: {
        badge: "The Team",
        titleStart: "Passionate minds dedicated to ",
        titleHighlight: "your success",
        titleEnd: ".",
        description:
          "This venture was born from two young Malians convinced that digital tools can transform everyday life for businesses and individuals in Mali. Driven by technology, we chose to dedicate our skills to concrete projects — committed to delivering dependable, accessible, and long-lasting work.",
        members: [
          {
            name: "Adama KONE",
            role: "Web & mobile developer",
          },
          {
            name: "Co-founder 2",
            role: "Co-founder — Design & Mobile",
          },
        ],
        signature: "SiraSolf",
      },
  
      // --- CONTACT SECTION ---
      contact: {
        badge: "Contact",
        titleStart: "Let's discuss ",
        titleHighlight: "your project",
        titleEnd: ".",
        description:
          "An idea, a maintenance need, a web or mobile project? Get in touch, we'll respond promptly.",
        infoLabels: {
          email: "Email",
          whatsapp: "WhatsApp",
          location: "Location",
          locationValue: "Bamako, Mali",
        },
        form: {
          nameLabel: "Name",
          namePlaceholder: "Your name",
          emailLabel: "Email",
          emailPlaceholder: "you@example.com",
          messageLabel: "Message",
          messagePlaceholder: "Tell us about your project…",
          submit: "Send message",
          sending: "Sending…",
          successTitle: "Message sent",
          successMessage: (name) =>
            `Thank you ${name || ""}, we will get back to you shortly.`,
          errorMessage:
            "An error occurred. Please try again or reach out directly by email.",
        },
      },
  
      // --- FOOTER SECTION ---
      footer: {
        brand: "World",
        brandHighlight: "Digital",
        links: [
          { label: "Home", href: "#hero" },
          { label: "Services", href: "#services" },
          { label: "Works", href: "#portfolio" },
          { label: "Team", href: "#equipe" },
          { label: "Contact", href: "#contact" },
        ],
        location: "📍 Bamako, Mali",
        partnership: "in partnership with",
        partnerName: "Cigogne du Mande",
        rights: "All rights reserved.",
      },
    },
  };