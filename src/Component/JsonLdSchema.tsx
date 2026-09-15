import React from 'react';

export default function JsonLdSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://pentacloud.in/#organization',
    name: 'Pentacloud Consulting',
    legalName: 'Pentacloud Consulting India Pvt Ltd',
    url: 'https://pentacloud.in',
    logo: 'https://pentacloud.in/Logo/Penta%20Favicon.png',
    foundingDate: '2020',
    description: 'Leading IT consulting, Salesforce implementation, Zoho integration, Cloud Solutions, and Digital Marketing agency.',
    sameAs: [
      'https://www.linkedin.com/company/pentacloudconsulting',
      'https://www.facebook.com/profile.php?id=61573242994665',
      'https://www.instagram.com/pentacloud_consulting/',
      'https://x.com/pentacloudind'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8147897286',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Kannada']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+971-545-132-807',
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+974-7200-7930',
        contactType: 'sales',
        areaServed: 'QA',
        availableLanguage: ['English', 'Arabic']
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://pentacloud.in/#localbusiness',
    name: 'Pentacloud Consulting India',
    image: 'https://pentacloud.in/Logo/Penta%20Favicon.png',
    url: 'https://pentacloud.in',
    telephone: '+91-8147897286',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jagan Arcade, 4th Floor, 1st Main Road, Anandnagar, RT Nagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560032',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.02384,
      longitude: 77.58948
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      }
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pentacloud.in/#website',
    url: 'https://pentacloud.in',
    name: 'Pentacloud Consulting',
    description: 'Empowering businesses with Salesforce, Zoho, Cloud Services, and Digital Transformation.',
    publisher: {
      '@id': 'https://pentacloud.in/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pentacloud.in/blogs?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
