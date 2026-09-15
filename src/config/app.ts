export const appConfig = {
  name: "MESH",
  tagline: "Where briefs meet the right creative minds.",
  description:
    "MESH is a creative marketplace that matches clients with independent designers, developers, and studios.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  categories: [
    "Graphic Design",
    "Brand Identity",
    "UI/UX",
    "Web Development",
    "Motion Design",
    "3D Design",
    "Illustration",
    "Packaging",
    "Social Media Design",
  ] as const,
  portfolioCategories: [
    "Branding",
    "Graphic Design",
    "Web Design",
    "UI/UX",
    "3D",
    "Motion Graphics",
    "Illustration",
    "Photography",
    "Advertising",
    "Packaging",
  ] as const,
  roles: ["CLIENT", "CREATOR", "ADMIN"] as const,
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 48,
  },
  uploads: {
    maxImageMb: 8,
    maxAttachmentMb: 25,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
    allowedAttachmentTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/zip",
    ],
  },
  features: {
    payments: process.env.MESH_ENABLE_PAYMENTS === "true",
    liveAi: process.env.MESH_ENABLE_LIVE_AI === "true",
  },
} as const;

export type Category = (typeof appConfig.categories)[number];
export type RoleName = (typeof appConfig.roles)[number];
