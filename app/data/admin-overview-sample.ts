// Sample data for the admin overview while /api/attendees and historical reporting don't exist yet.
// Figures are hand-built so every total and delta reconciles — replace with real queries once the
// attendees API lands (see the ticket types already sold: Full Weekend Pass 142, Day Pass 54,
// Scholarship Pass 18 — these come from real ticket-type rows, the counts sold are the only sample part).

export type TicketTypeSummary = {
  name: string;
  priceInPence: number;
  sold: number;
  max: number;
};

export const ticketTypeSummaries: TicketTypeSummary[] = [
  { name: "Full Weekend Pass", priceInPence: 18500, sold: 142, max: 220 },
  { name: "Day Pass", priceInPence: 6500, sold: 54, max: 80 },
  { name: "Scholarship Pass", priceInPence: 4500, sold: 18, max: 25 },
];

export const totalSold = ticketTypeSummaries.reduce((sum, t) => sum + t.sold, 0); // 214
export const totalCapacity = ticketTypeSummaries.reduce((sum, t) => sum + t.max, 0); // 325
export const ticketRevenueInPence = ticketTypeSummaries.reduce((sum, t) => sum + t.sold * t.priceInPence, 0); // £30,590

export const payItForward = {
  targetInPence: 350000, // subsidises the 25 Scholarship Passes at £140 each
  raisedInPence: 218000,
};

export const totalRevenueInPence = ticketRevenueInPence + payItForward.raisedInPence; // £32,770

// What this year's event actually costs to put on, so the overview can show whether ticket + pay-it-forward
// income covers it yet (see totalRevenueInPence above).
export const eventCosts = [
  { category: "Venue", amountInPence: 1200000 },
  { category: "Teachers", amountInPence: 850000 },
  { category: "Band", amountInPence: 720000 },
  { category: "DJ", amountInPence: 180000 },
  { category: "Insurance & services", amountInPence: 240000 },
  { category: "Misc", amountInPence: 120000 },
];

export const totalCostsInPence = eventCosts.reduce((sum, c) => sum + c.amountInPence, 0); // £33,100

// Cumulative, week by week since tickets went on sale. Week 8 is today.
export const salesSeries = {
  labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"],
  registrations: [12, 34, 61, 92, 128, 162, 191, 214],
  revenueInPence: [176000, 492000, 908000, 1373000, 1948000, 2448000, 2808000, 3059000],
  payItForwardInPence: [12000, 34000, 62000, 98000, 138000, 178000, 198000, 218000],
};

// Last year's equivalent week, for the comparison row under the chart.
export const lastYear = {
  label: "DTJJ 2026, week 8",
  registrations: 178,
  revenueInPence: 2741000,
};

export const payments = {
  paid: 198,
  pending: 11,
  failed: 5,
};

export const failedPayments = [
  { name: "Priya Shah", amount: 18500, reason: "Card declined" },
  { name: "Owen Pratt", amount: 6500, reason: "Card expired" },
  { name: "Nadia Hussain", amount: 18500, reason: "Card declined" },
];

export const tShirtOrders = [
  { size: "XS", count: 6 },
  { size: "S", count: 24 },
  { size: "M", count: 41 },
  { size: "L", count: 38 },
  { size: "XL", count: 29 },
  { size: "XXL", count: 12 },
];

export type AttendeeRow = {
  preferredName: string;
  pronouns: string;
  email: string;
  ticketType: string;
  hosting: "Offering to host" | "Needs housing" | "Sorted";
  tShirt: string | null;
  paymentStatus: "Paid" | "Pending" | "Failed";
  registeredOn: string;
};

export const attendeeRows: AttendeeRow[] = [
  { preferredName: "Chloe Bennett", pronouns: "she/her", email: "chloe.b@gmail.com", ticketType: "Full Weekend Pass", hosting: "Offering to host", tShirt: "M", paymentStatus: "Paid", registeredOn: "2026-10-18" },
  { preferredName: "Marcus Lee", pronouns: "he/him", email: "marcus.lee@outlook.com", ticketType: "Full Weekend Pass", hosting: "Sorted", tShirt: "L", paymentStatus: "Paid", registeredOn: "2026-10-18" },
  { preferredName: "Priya Shah", pronouns: "she/her", email: "p.shah@yahoo.com", ticketType: "Scholarship Pass", hosting: "Needs housing", tShirt: "S", paymentStatus: "Failed", registeredOn: "2026-10-17" },
  { preferredName: "Tom Walsh", pronouns: "they/them", email: "tom.w@proton.me", ticketType: "Day Pass", hosting: "Sorted", tShirt: null, paymentStatus: "Paid", registeredOn: "2026-10-17" },
  { preferredName: "Freya Oduya", pronouns: "she/her", email: "freya.oduya@gmail.com", ticketType: "Full Weekend Pass", hosting: "Needs housing", tShirt: "XL", paymentStatus: "Pending", registeredOn: "2026-10-16" },
  { preferredName: "Jamie Carter", pronouns: "he/him", email: "jamie.carter@gmail.com", ticketType: "Full Weekend Pass", hosting: "Offering to host", tShirt: "L", paymentStatus: "Paid", registeredOn: "2026-10-16" },
  { preferredName: "Nadia Hussain", pronouns: "she/her", email: "n.hussain@icloud.com", ticketType: "Day Pass", hosting: "Sorted", tShirt: "M", paymentStatus: "Failed", registeredOn: "2026-10-15" },
  { preferredName: "Owen Pratt", pronouns: "he/him", email: "owen.pratt@gmail.com", ticketType: "Scholarship Pass", hosting: "Needs housing", tShirt: "XXL", paymentStatus: "Failed", registeredOn: "2026-10-15" },
  { preferredName: "Sam Okafor", pronouns: "they/them", email: "sam.okafor@gmail.com", ticketType: "Full Weekend Pass", hosting: "Offering to host", tShirt: "S", paymentStatus: "Pending", registeredOn: "2026-10-14" },
  { preferredName: "Lena Brandt", pronouns: "she/her", email: "lena.brandt@gmail.com", ticketType: "Day Pass", hosting: "Sorted", tShirt: null, paymentStatus: "Paid", registeredOn: "2026-10-14" },
];
