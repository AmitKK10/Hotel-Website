import { SITE_CONFIG } from '@/src/config/site';

interface JsonLdProps {
  type?: 'Hotel' | 'LocalBusiness' | 'Organization' | 'Restaurant' | 'Breadcrumb' | 'FAQ' | 'All';
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export function JsonLd({ type = 'All', faqItems, breadcrumbs }: JsonLdProps) {
  const siteUrl = 'https://dighabeachresort.com';

  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${siteUrl}/#hotel`,
    name: SITE_CONFIG.name,
    alternateName: 'Digha Beach Resort & Spa',
    description: SITE_CONFIG.description,
    url: siteUrl,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    priceRange: '₹₹₹₹',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Digha Science City Road, New Digha',
      addressLocality: 'Digha',
      addressRegion: 'West Bengal',
      postalCode: '721428',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '21.6264',
      longitude: '87.5028',
    },
    image: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    ],
    checkinTime: '12:00',
    checkoutTime: '11:00',
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Private Ocean Balcony', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Infinity Oceanfront Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private Beach Access', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Ayurvedic Spa & Wellness', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Bayfront Fine Dining Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Concierge Service', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Complimentary High-Speed Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Secure Valet Parking', value: true },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.contact.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Bengali', 'Hindi'],
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
    ],
  };

  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: 'Bayfront Restaurant at Digha Beach Resort',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    telephone: SITE_CONFIG.contact.phone,
    servesCuisine: ['Seafood', 'Bengali Cuisine', 'Continental', 'Pan-Asian'],
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Digha Science City Road, New Digha',
      addressLocality: 'Digha',
      addressRegion: 'West Bengal',
      postalCode: '721428',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '23:00',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  let schemaGraph: Array<Record<string, unknown>> = [];

  if (type === 'All') {
    schemaGraph = [hotelSchema, organizationSchema, restaurantSchema, websiteSchema];
  } else if (type === 'Hotel') {
    schemaGraph = [hotelSchema];
  } else if (type === 'Organization') {
    schemaGraph = [organizationSchema];
  } else if (type === 'Restaurant') {
    schemaGraph = [restaurantSchema];
  } else if (type === 'FAQ' && faqItems) {
    schemaGraph = [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ];
  } else if (type === 'Breadcrumb' && breadcrumbs) {
    schemaGraph = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ];
  }

  return (
    <>
      {schemaGraph.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

