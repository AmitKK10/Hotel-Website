import {
  AttractionCategory,
  AttractionItem,
  ItineraryDay,
  LocalService,
  WeatherData,
} from '../types/attractions';

// ================================================================
// LOCAL ATTRACTION IMAGES
// These files are served from: public/images/attractions/
// ================================================================

/* ================================================================
   ATTRACTION CATEGORIES
================================================================ */

export const ATTRACTION_CATEGORIES: {
  id: AttractionCategory;
  label: string;
}[] = [
  { id: 'all', label: 'All Places' },
  { id: 'beaches', label: 'Beaches & Coasts' },
  { id: 'family', label: 'Family & Aquariums' },
  { id: 'parks', label: 'Parks & Gardens' },
  { id: 'temples', label: 'Temples & Heritage' },
  { id: 'food', label: 'Seafood Markets' },
  { id: 'shopping', label: 'Local Handicrafts' },
  { id: 'nature', label: 'Nature & Confluence' },
  { id: 'adventure', label: 'Water Sports' },
];

/* ================================================================
   RESORT COORDINATES
================================================================ */

export const RESORT_COORDINATES = {
  name: 'Digha Beach Resort',
  lat: 21.6268,
  lng: 87.5074,
};

/* ================================================================
   ATTRACTIONS DATA
================================================================ */

export const ATTRACTIONS_DATA: AttractionItem[] = [
  /* ==============================================================
     1. NEW DIGHA BEACH
     KEEPING CURRENT APPROPRIATE IMAGE
  ============================================================== */

  {
    id: 'attr-1',
    slug: 'new-digha-beach',
    title: 'New Digha Beach & Sea Promenade',
    category: 'beaches',
    distance: '400 m',
    travelTime: '2 min walk',
    bestTime: '5:30 AM - 8:00 AM & 4:30 PM - 7:00 PM',
    description:
      'A sprawling soft-sand beach with calm ocean currents, gentle gradients, and vibrant evening lighting. Ideal for morning jogging, horse rides, water sports, and breathtaking golden sunsets.',
    highlights: [
      'Flat gentle waves safe for bathing',
      'Beachfront cashew & coconut stalls',
      'Water sports & ATV rides available',
    ],
    coordinates: {
      lat: 21.6255,
      lng: 87.505,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/New%20Digha%20Beach.webp',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=New+Digha+Sea+Beach',
  },

  /* ==============================================================
     2. MARINE AQUARIUM
     KEEPING CURRENT APPROPRIATE IMAGE
  ============================================================== */

  {
    id: 'attr-2',
    slug: 'marine-aquarium-regional-centre',
    title: 'Marine Aquarium & Regional Centre (MARC)',
    category: 'family',
    distance: '1.2 km',
    travelTime: '4 min drive / 12 min walk',
    bestTime: '10:00 AM - 5:30 PM (Closed on Tuesdays)',
    description:
      'Asia’s largest sea-water research aquarium maintained by the Zoological Survey of India. Features giant sea turtles, sharks, stingrays, sea anemones, and rare Bay of Bengal marine biodiversity.',
    highlights: [
      '30+ marine species tanks',
      'Air-conditioned educational exhibits',
      'Family-friendly guided tours',
    ],
    coordinates: {
      lat: 21.6291,
      lng: 87.512,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Marine%20Aquarium%20and%20Regional%20Centre%20%28MARC%29%20in%20Digha%2001.jpg',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Marine+Aquarium+and+Regional+Centre+Digha',
  },

  /* ==============================================================
     3. AMARABATI PARK
     KEEPING CURRENT APPROPRIATE IMAGE
  ============================================================== */

  {
    id: 'attr-3',
    slug: 'amarabati-park',
    title: 'Amarabati Park & Toy Train',
    category: 'parks',
    distance: '800 m',
    travelTime: '3 min drive / 8 min walk',
    bestTime: '3:30 PM - 7:00 PM',
    description:
      'A lush manicured green sanctuary centered around a serene natural lake. Features pedal boating, miniature toy train rides, colorful flower gardens, and shaded gazebos.',
    highlights: [
      'Lakeside paddle boating',
      'Heritage toy train circuit',
      'Musical fountain show at 6:30 PM',
    ],
    coordinates: {
      lat: 21.6282,
      lng: 87.509,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Digha%20Amravati%20Park%20Garden.jpg',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Amarabati+Park+Digha',
  },

  /* ==============================================================
     4. DIGHA SCIENCE CENTRE
     ACTUAL DIGHA SCIENCE CENTRE PHOTO
  ============================================================== */

  {
    id: 'attr-4',
    slug: 'digha-science-centre',
    title: 'Digha Science Centre & Space Theatre',
    category: 'family',
    distance: '1.5 km',
    travelTime: '5 min drive',
    bestTime: '9:30 AM - 6:00 PM',
    description:
      'An interactive science park featuring 3D digital space theater shows, physics outdoor gardens, planetarium demonstrations, and interactive marine science exhibits.',
    highlights: [
      '3D Space & Galaxy planetarium show',
      'Interactive physics playground',
      'Fun dinosaur park for children',
    ],
    coordinates: {
      lat: 21.6315,
      lng: 87.515,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Digha%20Science%20Centre%20and%20National%20Science%20Camp.jpg',
    featured: false,
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Science+Centre',
  },

  /* ==============================================================
     5. OLD DIGHA BEACH
     KEEPING APPROPRIATE OLD DIGHA BEACH IMAGE
  ============================================================== */

  {
    id: 'attr-5',
    slug: 'old-digha-beach',
    title: 'Old Digha Beach & Concrete Seawall Promenade',
    category: 'beaches',
    distance: '2.8 km',
    travelTime: '7 min drive',
    bestTime: '5:00 PM - 8:30 PM',
    description:
      'Known for its dramatic concrete seawalls where tidal ocean waves crash gracefully. Packed with vibrant night markets, sea-shell jewelry vendors, and hot seafood snack counters.',
    highlights: [
      'Spectacular wave splashing seawall',
      'Sea-shell jewelry & handicraft market',
      'Fried fish & coconut water stalls',
    ],
    coordinates: {
      lat: 21.626,
      lng: 87.532,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Old%20digha%20beach.jpg',
    featured: false,
    googleMapsUrl:
      'https://maps.google.com/?q=Old+Digha+Sea+Beach',
  },

  /* ==============================================================
     6. DIGHA MOHANA FISH MARKET
     ACTUAL FISH MARKET PHOTO
  ============================================================== */

  {
    id: 'attr-6',
    slug: 'digha-mohana-fish-market',
    title: 'Digha Mohana Wholesale Fish Market',
    category: 'food',
    distance: '5.2 km',
    travelTime: '12 min drive',
    bestTime: '5:00 AM - 8:30 AM (Morning Auction)',
    description:
      'The bustling estuary confluence where the Champa River meets the Bay of Bengal. Witness hundreds of colorful trawlers unloading fresh catches of Hilsa, Pomfret, Prawns, and Crab.',
    highlights: [
      'Live morning fish auctions',
      'Scenic trawler harbor views',
      'Photography hotspot for river-sea confluence',
    ],
    coordinates: {
      lat: 21.632,
      lng: 87.558,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20Market%20at%20Digha%20Mohana%2C.jpg',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Mohana+Fish+Market',
  },

  /* ==============================================================
     7. TALSARI & UDAIPUR
     KEEPING APPROPRIATE IMAGE
  ============================================================== */

  {
    id: 'attr-7',
    slug: 'talsari-udaipur-beach',
    title: 'Talsari & Udaipur Pristine Red Crab Beach',
    category: 'nature',
    distance: '6.5 km',
    travelTime: '15 min drive',
    bestTime: '6:30 AM - 10:00 AM',
    description:
      'A serene, untouched virgin coastline straddling the Bengal-Odisha border. Bordered by towering Casuarina (Jhau) groves, red crabs scuttling across golden sands, and tranquil calm waters.',
    highlights: [
      'Thousands of red carpet sand crabs',
      'Shaded Jhau forest pine walks',
      'Quiet uncrowded beach solitude',
    ],
    coordinates: {
      lat: 21.605,
      lng: 87.462,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Talsari%20Sea%20Beach%20in%20Odisha%2001.jpg',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Talsari+Beach+Odisha',
  },

  /* ==============================================================
     8. CHANDANESWAR TEMPLE
     KEEPING APPROPRIATE SHIVA TEMPLE IMAGE
  ============================================================== */

  {
    id: 'attr-8',
    slug: 'chandaneswar-temple',
    title: 'Ancient Chandaneswar Shiva Temple',
    category: 'temples',
    distance: '8.0 km',
    travelTime: '18 min drive',
    bestTime: '6:00 AM - 11:30 AM & 4:00 PM - 7:30 PM',
    description:
      'A revered 16th-century historic pilgrimage shrine dedicated to Lord Shiva. Famous for its sacred rituals, ancient architecture, and vibrant annual Gajan festival.',
    highlights: [
      'Peaceful spiritual atmosphere',
      'Traditional temple architecture',
      'Sacred pond & devotional offerings',
    ],
    coordinates: {
      lat: 21.608,
      lng: 87.442,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Chandaneswar%20temple.jpg',
    featured: false,
    googleMapsUrl:
      'https://maps.google.com/?q=Chandaneswar+Shiva+Temple',
  },

  /* ==============================================================
     9. SHANKARPUR BEACH & FISHING HARBOUR
     UPDATED — YOUR UPLOADED BLUE IMAGE
  ============================================================== */

  {
    id: 'attr-9',
    slug: 'shankarpur-fishing-harbour',
    title: 'Shankarpur Beach & Fishing Harbour',
    category: 'adventure',
    distance: '14.0 km',
    travelTime: '25 min drive',
    bestTime: '6:30 AM - 11:00 AM',
    description:
      'A picturesque twin beach destination surrounded by dense casuarina forests. Known for its deep-sea fishing harbor, quiet waves, and sea-foam lined sands.',
    highlights: [
      'Deep-sea fishing trawler dock',
      'Lush Casuarina backdrop',
      'Fresh sea-side seafood shacks',
    ],
    coordinates: {
      lat: 21.638,
      lng: 87.575,
    },

    // LOCAL IMAGE FROM public/images/attractions/shankarpur-beach.jpg
    image: '/images/attractions/shankarpur-beach.jpg',

    featured: false,
    googleMapsUrl:
      'https://maps.google.com/?q=Shankarpur+Sea+Beach',
  },

  /* ==============================================================
     10. NAYA KALI MANDIR
     UPDATED — YOUR UPLOADED GODDESS IMAGE
  ============================================================== */

  {
    id: 'attr-10',
    slug: 'naya-kali-mandir',
    title: 'Naya Kali Mandir (New Digha Kali Temple)',
    category: 'temples',
    distance: '1.8 km',
    travelTime: '5 min drive',
    bestTime: '6:00 AM - 12:00 PM & 4:00 PM - 8:30 PM',
    description:
      'A sacred and revered shrine dedicated to Goddess Maa Kali in New Digha. Known for its vibrant evening Sandhya Aarti, traditional Bengali rituals, and peaceful spiritual ambience.',
    highlights: [
      'Sacred Maa Kali shrine & daily Aarti',
      'Traditional Bengali temple rituals',
      'Peaceful devotional surroundings',
    ],
    coordinates: {
      lat: 21.628,
      lng: 87.518,
    },

    // LOCAL IMAGE FROM public/images/attractions/naya-kali-mandir.jpg
    image: '/images/attractions/naya-kali-mandir.jpg',

    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=New+Digha+Kali+Mandir',
  },

  /* ==============================================================
     11. MANDARMANI & TAJPUR
     KEEPING CURRENT APPROPRIATE IMAGE
  ============================================================== */

  {
    id: 'attr-11',
    slug: 'mandarmani-tajpur-beach',
    title: 'Mandarmani & Tajpur Beach',
    category: 'beaches',
    distance: '18 km / 22 km',
    travelTime: '30 - 45 min drive',
    bestTime: '6:00 AM - 10:00 AM & 3:30 PM - 6:30 PM',
    description:
      'Famous driveable motorable beaches known for endless soft sand, red crab colonies, parasailing, jet skiing, and secluded coastal serenity surrounded by Jhau trees.',
    highlights: [
      'Longest drivable beach in Bengal',
      'Thrilling parasailing & ATV rides',
      'Secluded pine forests & red crabs',
    ],
    coordinates: {
      lat: 21.671,
      lng: 87.685,
    },
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mandarmani%20Sea%20Beach.jpg',
    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Mandarmani+Sea+Beach',
  },

  /* ==============================================================
     12. BICHITRAPUR MANGROVE SANCTUARY
     UPDATED — YOUR UPLOADED BIG BOAT IMAGE
  ============================================================== */

  {
    id: 'attr-12',
    slug: 'bichitrapur-mangrove-sanctuary',
    title: 'Bichitrapur Mangrove Sanctuary',
    category: 'nature',
    distance: '15.0 km',
    travelTime: '25 min drive',
    bestTime: '8:00 AM - 4:00 PM (Depends on Tide)',
    description:
      'A lush eco-tourism delta site where the Subarnarekha river flows into the Bay of Bengal. Take scenic motorboat safaris through dense mangrove creeks, spotting migratory birds and horseshoe crabs.',
    highlights: [
      'Scenic motorboat safari through tidal mangroves',
      'Subarnarekha river-sea confluence delta',
      'Migratory marine birdwatching',
    ],
    coordinates: {
      lat: 21.558,
      lng: 87.391,
    },

    // LOCAL IMAGE FROM public/images/attractions/bichitrapur-mangrove.jpg
    image: '/images/attractions/bichitrapur-mangrove.jpg',

    featured: true,
    googleMapsUrl:
      'https://maps.google.com/?q=Bichitrapur+Mangrove+Sanctuary',
  },
];

/* ================================================================
   ONE DAY ITINERARY
================================================================ */

export const ONE_DAY_ITINERARY: ItineraryDay = {
  dayTitle: '1-Day Express Coastal Highlights',
  subtitle:
    'The perfect 24-hour curated route covering iconic sights, beach walks, and seafood feasts.',
  steps: [
    {
      timeSlot: '06:30 AM - Sunrise',
      title: 'Sunrise Beach Walk at New Digha',
      description:
        'Start your morning with fresh ocean breezes, soft sand strolling, and fresh coconut water just steps from the resort.',
      location: 'New Digha Beach (400 m)',
    },
    {
      timeSlot: '08:30 AM - Breakfast',
      title: 'Gourmet Buffet Breakfast at Bay Breeze',
      description:
        'Return to the resort for hot Bengali Luchi Alur Dom, South Indian Dosa, live eggs, and freshly brewed Darjeeling tea.',
      location: 'Resort Dining Hall',
    },
    {
      timeSlot: '10:00 AM - Marine Exploration',
      title: 'Marine Aquarium & Amarabati Park',
      description:
        'Explore Asia’s largest sea-water aquarium followed by paddle boating and toy train rides inside Amarabati Park.',
      location: 'MARC & Amarabati Park (1 km)',
    },
    {
      timeSlot: '01:30 PM - Lunch',
      title: 'Authentic Bengali Seafood Bhoj',
      description:
        'Relish authentic Golda Chingri (Prawn Malaikari) and Fresh Pomfret Fry at our resort restaurant or local beach shacks.',
      location: 'Resort / Sea View Dining',
    },
    {
      timeSlot: '04:30 PM - Sunset & Shopping',
      title: 'Old Digha Seawall Waves & Handicraft Market',
      description:
        'Witness high tide wave splashes against concrete seawalls and shop for handcrafted seashell lamps, wooden art, and cashew nuts.',
      location: 'Old Digha Promenade (2.8 km)',
    },
    {
      timeSlot: '08:00 PM - Night Experience',
      title: 'Beachside Bonfire & BBQ Dinner',
      description:
        'Wind down your day with crackling bonfire flames, live acoustic music, and sizzling seafood charcoal grills under the stars.',
      location: 'Resort Lawn & Poolside',
    },
  ],
};

/* ================================================================
   TWO DAY ITINERARY
================================================================ */

export const TWO_DAY_ITINERARY: ItineraryDay[] = [
  {
    dayTitle: 'Day 1: Digha Beaches & Cultural Sights',
    subtitle:
      'Soak in beach views, marine science, and evening seaside night markets.',
    steps: ONE_DAY_ITINERARY.steps,
  },

  {
    dayTitle: 'Day 2: Red Crabs, Confluence & Hidden Gems',
    subtitle:
      'Venture beyond Digha to red crab beaches, fish auctions, and ancient temples.',
    steps: [
      {
        timeSlot: '05:30 AM - Dawn Market',
        title: 'Mohana River-Sea Confluence & Fish Auction',
        description:
          'Watch hundreds of colorful fishing boats return with fresh catches as the sun rises over the estuary.',
        location: 'Digha Mohana (5.2 km)',
      },
      {
        timeSlot: '08:30 AM - Border Discovery',
        title: 'Talsari Red Crab Beach & Jhau Forest',
        description:
          'Cross into Odisha border to witness millions of red sand crabs and serene, uncrowded Casuarina tree groves.',
        location: 'Talsari & Udaipur Beach (6.5 km)',
      },
      {
        timeSlot: '11:30 AM - Temple Visit',
        title: 'Chandaneswar Shiva Temple Worship',
        description:
          'Pay homage at the ancient 16th-century temple known for peaceful spiritual vibrations.',
        location: 'Chandaneswar Temple (8.0 km)',
      },
      {
        timeSlot: '02:00 PM - Coastal Lunch',
        title: 'Shankarpur Harbour Seafood Lunch',
        description:
          'Enjoy freshly caught crab curry and fried fish at seaside harbor restaurants overlooking fishing trawlers.',
        location: 'Shankarpur Beach (14 km)',
      },
      {
        timeSlot: '06:00 PM - Farewell Evening',
        title: 'Sunset High Tea & Relaxation',
        description:
          'Return to Digha Beach Resort for relaxing pool dips, spa treatments, and farewell coastal cocktails.',
        location: 'Resort Infinity Pool',
      },
    ],
  },
];

/* ================================================================
   LOCAL SERVICES
================================================================ */

export const LOCAL_SERVICES_DATA: LocalService[] = [
  {
    id: 'serv-1',
    name: 'Digha Railway Station (DGHA)',
    category: 'Transport',
    distance: '1.2 km',
    travelTime: '4 min drive',
    address: 'New Digha Main Station Road, Digha',
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Railway+Station',
  },

  {
    id: 'serv-2',
    name: 'Digha Central Bus Terminus (SBSTC)',
    category: 'Transport',
    distance: '1.0 km',
    travelTime: '3 min drive',
    address: 'Near Old Digha Road Bypass',
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Bus+Stand',
  },

  {
    id: 'serv-3',
    name: 'Digha State General Hospital & Emergency',
    category: 'Healthcare',
    distance: '1.8 km',
    travelTime: '5 min drive',
    address: 'Hospital Road, New Digha',
    contact: '+91 3220 266 222',
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+State+General+Hospital',
  },

  {
    id: 'serv-4',
    name: 'SBI & HDFC Bank ATM Hub',
    category: 'Banking',
    distance: '300 m',
    travelTime: '1 min walk',
    address: 'New Digha Sea Beach Market Road',
    googleMapsUrl:
      'https://maps.google.com/?q=SBI+ATM+New+Digha',
  },

  {
    id: 'serv-5',
    name: '24x7 MedPlus Pharmacy',
    category: 'Pharmacy',
    distance: '450 m',
    travelTime: '2 min walk',
    address: 'Resort Avenue, New Digha',
    contact: '+91 98321 00000',
    googleMapsUrl:
      'https://maps.google.com/?q=Pharmacy+New+Digha',
  },

  {
    id: 'serv-6',
    name: 'Digha Coastal Police Station',
    category: 'Safety',
    distance: '1.4 km',
    travelTime: '4 min drive',
    address: 'Old Digha Main Road',
    contact: '112 / +91 3220 266 221',
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Police+Station',
  },

  {
    id: 'serv-7',
    name: 'Tata Power Fast EV Charging Station',
    category: 'EV Charging',
    distance: '200 m',
    travelTime: 'At Resort Premises',
    address: 'Digha Beach Resort Private Parking',
    googleMapsUrl:
      'https://maps.google.com/?q=Digha+Beach+Resort',
  },

  {
    id: 'serv-8',
    name: 'Indian Oil Fuel Pump (24x7)',
    category: 'Fuel',
    distance: '2.5 km',
    travelTime: '6 min drive',
    address: 'NH-116B Bypass Road, Digha',
    googleMapsUrl:
      'https://maps.google.com/?q=Indian+Oil+Digha',
  },
];

/* ================================================================
   WEATHER DATA
================================================================ */

export const WEATHER_DATA: WeatherData = {
  location: 'Digha, Bay of Bengal',
  tempCelsius: 28,
  condition: 'Pleasant Coastal Breeze',
  highLow: '31°C / 24°C',
  humidity: '72%',
  windSpeed: '14 km/h S',
  sunrise: '05:22 AM',
  sunset: '06:28 PM',
  bestVisitingMonths:
    'October through April (Mild, sunny & breeze-filled)',
};