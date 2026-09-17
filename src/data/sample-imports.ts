import { TransactionRecord } from '../types/data-import';

export const SAMPLE_CSV_TEMPLATE = `Guest Name,Contact,Category,Description,Amount,Status,Payment Method,Guests,Room Number,Notes
Amitava Banerjee,+91 98301 22334,room_booking,Executive Sea View Suite (2 Nights),16500,paid,UPI,2,Suite 402,VIP Ocean Facing welcome kit requested
Debasmita Roy,+91 98312 44556,room_booking,Deluxe Balcony Room,7500,paid,Credit Card,2,Room 214,Early check-in 11:30 AM
Siddhartha Sen,+91 98300 77889,dining,Bayfront Seafood Candlelight Dinner,4200,paid,Card,4,Table B-04,Seafood platter with Jumbo Prawns
Rohan Chakraborty,+91 94331 88990,spa_wellness,Coastal Aromatherapy & Hydrotherapy Spa,3500,paid,UPI,1,Spa Suite 2,Couples rejuvenating treatment
Priyanka Mukherjee,+91 97482 11223,room_booking,Presidential Royal Beach Villa,28000,paid,Net Banking,4,Villa Royal 1,Champagne on arrival & private pool setup
Subrata Ghosh,+91 98305 99001,dining,Ocean Breeze Breakfast & High Tea Buffet,1850,pending,Cash,2,Table T-12,Window sea view table
Ananya Chatterjee,+91 98311 33221,concierge,Digha Marine Aquarium & Beach Safari Tour,2400,paid,UPI,3,Desk,Private AC taxi tour arranged`;

export const SAMPLE_JSON_RECORDS = [
  {
    guestName: "Vikramaditya Roy",
    contactNumber: "+91 98300 11223",
    category: "room_booking",
    description: "Royal Ocean Penthouse Suite - 3 Nights",
    amount: 32000,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    guestCount: 2,
    roomNumber: "Penthouse 501",
    notes: "Anniversary flower arrangement & sunset view balcony"
  },
  {
    guestName: "Dr. Sourav Ganguly & Family",
    contactNumber: "+91 98310 99887",
    category: "dining",
    description: "Private Beachside Chef Seafood Degustation",
    amount: 8800,
    paymentStatus: "paid",
    paymentMethod: "UPI",
    guestCount: 6,
    roomNumber: "Cabana C-1",
    notes: "Special Hilsa & Tiger Prawn preparation"
  },
  {
    guestName: "Meenakshi Sundaram",
    contactNumber: "+91 94440 33221",
    category: "spa_wellness",
    description: "Ayurvedic Coastal Abhyanga Treatment",
    amount: 4500,
    paymentStatus: "paid",
    paymentMethod: "Card",
    guestCount: 1,
    roomNumber: "Spa Pavilion",
    notes: "Deep relaxation herb therapy"
  },
  {
    guestName: "Tanmoy Dutta",
    contactNumber: "+91 98321 66554",
    category: "room_booking",
    description: "Superior Twin Ocean Room",
    amount: 6200,
    paymentStatus: "pending",
    paymentMethod: "Cash",
    guestCount: 2,
    roomNumber: "Room 108",
    notes: "Late arrival 8:00 PM"
  }
];

export const INITIAL_SEED_RECORDS: TransactionRecord[] = [
  {
    id: "rec-seed-1",
    reference: "RES-20260501-101",
    assignedDate: "2026-05-01",
    formattedDate: "1 May 2026",
    guestName: "Rajeshwar Sharma",
    contactNumber: "+91 98301 12345",
    category: "room_booking",
    description: "Royal Sea Facing Suite - 2 Nights",
    amount: 17000,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    guestCount: 2,
    roomNumber: "Suite 301",
    notes: "Welcome drink served upon arrival",
    importedAt: "2026-05-01T08:00:00.000Z",
    batchId: "batch-seed-01"
  },
  {
    id: "rec-seed-2",
    reference: "RES-20260502-102",
    assignedDate: "2026-05-02",
    formattedDate: "2 May 2026",
    guestName: "Sunita Kapoor",
    contactNumber: "+91 98312 98765",
    category: "dining",
    description: "Bayfront Ocean Dinner with Wine",
    amount: 5400,
    paymentStatus: "paid",
    paymentMethod: "UPI",
    guestCount: 3,
    roomNumber: "Table 14",
    notes: "Gluten free bread requested",
    importedAt: "2026-05-02T19:30:00.000Z",
    batchId: "batch-seed-01"
  }
];
