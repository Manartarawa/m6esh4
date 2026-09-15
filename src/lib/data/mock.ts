import type {
  Application,
  Conversation,
  Creator,
  Message,
  Notification,
  Profile,
  Project,
  Review,
  User,
} from "@/types/domain";

export const demoPassword = "meshdemo1";

export const users: User[] = [
  { id: "u-client", email: "client@mesh.app", role: "CLIENT", createdAt: "2026-01-08" },
  { id: "u-creator", email: "creator@mesh.app", role: "CREATOR", createdAt: "2026-01-04" },
  { id: "u-admin", email: "admin@mesh.app", role: "ADMIN", createdAt: "2026-01-01" },
];

export const profiles: Profile[] = [
  {
    id: "p-amina",
    userId: "u-client",
    displayName: "Amina Rahman",
    username: "amina",
    bio: "Building calm wellness brands with independent studios.",
    location: "Dubai",
  },
  {
    id: "p-lina",
    userId: "u-creator",
    displayName: "Lina Hart",
    username: "linahart",
    bio: "Brand systems and packaging for emerging consumer labels.",
    location: "Lisbon",
    behanceUrl: "https://www.behance.net/maartarawa",
  },
  {
    id: "p-admin",
    userId: "u-admin",
    displayName: "MESH Admin",
    username: "meshadmin",
    bio: "Platform operations.",
    location: "Remote",
  },
];

export const creators: Creator[] = [
  {
    user: users[1]!,
    profile: {
      id: "p-lina",
      userId: "u-creator",
      displayName: "Lina Hart",
      username: "linahart",
      bio: "Brand systems and packaging for emerging consumer labels.",
      location: "Lisbon",
      avatarUrl: "",
      behanceUrl: "https://www.behance.net/maartarawa",
    },
    headline: "Brand identity for product-led companies",
    hourlyRate: 95,
    availability: "Available this week",
    experienceYears: 8,
    styleTags: ["editorial", "warm", "minimal"],
    category: "Brand Identity",
    featured: true,
    skills: [
      { id: "s-brand", name: "Brand Identity", slug: "brand-identity" },
      { id: "s-pack", name: "Packaging", slug: "packaging" },
    ],
    portfolio: [
      {
        id: "pf-1",
        creatorId: "u-creator",
        title: "AUREA Skincare",
        description: "Identity, packaging, and launch kit.",
        imageUrl: "",
        category: "Packaging",
      },
      {
        id: "pf-2",
        creatorId: "u-creator",
        title: "Northline Coffee",
        description: "Warm editorial identity system.",
        imageUrl: "",
        category: "Brand Identity",
      },
    ],
  },
  {
    user: { id: "u-noah", email: "noah@mesh.app", role: "CREATOR", createdAt: "2026-02-02" },
    profile: {
      id: "p-noah",
      userId: "u-noah",
      displayName: "Noah Okoye",
      username: "noahokoye",
      bio: "Product interfaces with a cinematic motion layer.",
      location: "London",
    },
    headline: "UI/UX and product motion",
    hourlyRate: 120,
    availability: "Booking in 2 weeks",
    experienceYears: 10,
    styleTags: ["cinematic", "product", "dark"],
    category: "UI/UX",
    featured: true,
    skills: [
      { id: "s-ui", name: "UI/UX", slug: "ui-ux" },
      { id: "s-motion", name: "Motion Design", slug: "motion-design" },
    ],
    portfolio: [
      {
        id: "pf-3",
        creatorId: "u-noah",
        title: "Orbit Wallet",
        description: "Fintech app redesign.",
        imageUrl: "",
        category: "UI/UX",
      },
    ],
  },
  {
    user: { id: "u-mira", email: "mira@mesh.app", role: "CREATOR", createdAt: "2026-03-11" },
    profile: {
      id: "p-mira",
      userId: "u-mira",
      displayName: "Mira Chen",
      username: "mirachen",
      bio: "Illustration and social campaigns with a tactile analog feel.",
      location: "Taipei",
    },
    headline: "Campaign illustration & social systems",
    hourlyRate: 80,
    availability: "Available",
    experienceYears: 6,
    styleTags: ["tactile", "playful", "analog"],
    category: "Illustration",
    featured: false,
    skills: [
      { id: "s-illu", name: "Illustration", slug: "illustration" },
      { id: "s-social", name: "Social Media Design", slug: "social-media-design" },
    ],
    portfolio: [
      {
        id: "pf-4",
        creatorId: "u-mira",
        title: "Festival Posters",
        description: "Limited print series.",
        imageUrl: "",
        category: "Illustration",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "pr-aurora",
    ownerId: "u-client",
    ownerName: "Amina Rahman",
    title: "Aurora wellness rebrand",
    slug: "aurora-wellness-rebrand",
    summary: "A calmer identity system for a membership-based wellness studio.",
    brief:
      "We need a full identity refresh: logo, type, packaging for retail oils, and a digital system that still feels analog and warm.",
    category: "Brand Identity",
    budgetMin: 4000,
    budgetMax: 7800,
    status: "OPEN",
    skills: [
      { id: "s-brand", name: "Brand Identity", slug: "brand-identity" },
      { id: "s-pack", name: "Packaging", slug: "packaging" },
    ],
    createdAt: "2026-08-21",
  },
  {
    id: "pr-folio",
    ownerId: "u-client",
    ownerName: "Amina Rahman",
    title: "Folio marketplace UI",
    slug: "folio-marketplace-ui",
    summary: "Design a creator marketplace with matching and messaging at the core.",
    brief: "Build a high-clarity UI kit and key screens for a two-sided creative marketplace.",
    category: "UI/UX",
    budgetMin: 6000,
    budgetMax: 11000,
    status: "OPEN",
    skills: [{ id: "s-ui", name: "UI/UX", slug: "ui-ux" }],
    createdAt: "2026-09-01",
  },
  {
    id: "pr-motion",
    ownerId: "u-client",
    ownerName: "Amina Rahman",
    title: "Launch motion suite",
    slug: "launch-motion-suite",
    summary: "Short-form motion for a product launch across social and web.",
    brief: "Need 8 motion pieces, looping hero, and a brand-safe animation system.",
    category: "Motion Design",
    budgetMin: 2500,
    budgetMax: 4500,
    status: "IN_REVIEW",
    skills: [{ id: "s-motion", name: "Motion Design", slug: "motion-design" }],
    createdAt: "2026-07-12",
  },
];

export const applications: Application[] = [
  {
    id: "ap-1",
    projectId: "pr-aurora",
    creatorId: "u-creator",
    creatorName: "Lina Hart",
    projectTitle: "Aurora wellness rebrand",
    coverNote: "I would start with material studies and a restrained wordmark before expanding into packaging.",
    bidAmount: 6200,
    status: "SHORTLISTED",
    createdAt: "2026-08-22",
  },
];

export const conversations: Conversation[] = [
  {
    id: "cv-1",
    projectId: "pr-aurora",
    projectTitle: "Aurora wellness rebrand",
    clientId: "u-client",
    creatorId: "u-creator",
    clientName: "Amina Rahman",
    creatorName: "Lina Hart",
    lastMessage: "I can share three direction boards by Thursday.",
    updatedAt: "2026-09-10",
  },
];

export const messages: Message[] = [
  {
    id: "m-1",
    conversationId: "cv-1",
    senderId: "u-client",
    senderName: "Amina",
    body: "Loved the packaging references. Can we keep the palette quieter?",
    createdAt: "2026-09-10T09:00:00.000Z",
  },
  {
    id: "m-2",
    conversationId: "cv-1",
    senderId: "u-creator",
    senderName: "Lina",
    body: "I can share three direction boards by Thursday.",
    createdAt: "2026-09-10T09:14:00.000Z",
  },
];

export const notifications: Notification[] = [
  {
    id: "n-1",
    userId: "u-client",
    title: "New application",
    body: "Lina Hart applied to Aurora wellness rebrand.",
    href: "/dashboard/projects",
    createdAt: "2026-08-22",
  },
  {
    id: "n-2",
    userId: "u-creator",
    title: "Shortlisted",
    body: "You were shortlisted for Aurora wellness rebrand.",
    href: "/creator/applications",
    createdAt: "2026-08-23",
  },
];

export const reviews: Review[] = [
  {
    id: "r-1",
    projectId: "pr-motion",
    authorId: "u-client",
    authorName: "Amina Rahman",
    subjectId: "u-noah",
    rating: 5,
    comment: "Cinematic, on-brief, and unusually fast with revisions.",
    createdAt: "2026-07-30",
  },
];
