export type Role = "CLIENT" | "CREATOR" | "ADMIN";

export type ProjectStatus =
  | "DRAFT"
  | "OPEN"
  | "IN_REVIEW"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "CLOSED";

export type ApplicationStatus = "PENDING" | "SHORTLISTED" | "ACCEPTED" | "DECLINED";

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  behanceUrl?: string;
}

export interface Client {
  user: User;
  profile: Profile;
  company?: string;
  website?: string;
}

export interface Creator {
  user: User;
  profile: Profile;
  headline?: string;
  hourlyRate?: number;
  availability?: string;
  experienceYears?: number;
  styleTags: string[];
  category?: string;
  featured?: boolean;
  skills: Skill[];
  portfolio: PortfolioItem[];
}

export interface Admin {
  user: User;
  profile: Profile;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
}

export interface Project {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  slug: string;
  summary: string;
  brief: string;
  category: string;
  budgetMin?: number;
  budgetMax?: number;
  status: ProjectStatus;
  coverUrl?: string;
  skills: Skill[];
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  source?: "MESH" | "BEHANCE";
  sourceProjectId?: string;
  sourceUrl?: string;
  tags?: string[];
  classifications?: PortfolioClassification[];
  syncedAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  featuredOrder?: number;
  isVisible?: boolean;
  classificationFingerprint?: string;
  classifiedAt?: string;
}

export interface PortfolioClassification {
  category: string;
  confidence: number;
  subcategory?: string;
}

export interface Application {
  id: string;
  projectId: string;
  creatorId: string;
  creatorName: string;
  projectTitle: string;
  coverNote: string;
  bidAmount?: number;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  projectId?: string;
  projectTitle?: string;
  clientId: string;
  creatorId: string;
  clientName: string;
  creatorName: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  href?: string;
  readAt?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  subjectId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MatchScore {
  creatorId: string;
  creatorName: string;
  username: string;
  category: string;
  score: number;
  reasons: string[];
  factors: {
    skills: number;
    category: number;
    style: number;
    budget: number;
    availability: number;
    experience: number;
    portfolio: number;
  };
}
