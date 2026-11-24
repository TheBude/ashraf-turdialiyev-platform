import { z } from 'zod';

// ============================================================
// Shared validation schemas for all API endpoints
// ============================================================

// --- Globe Location ---
export const globeLocationCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  titleUz: z.string().max(300).nullish(),
  titleRu: z.string().max(300).nullish(),
  titleTr: z.string().max(300).nullish(),
  country: z.string().min(1, 'Country is required').max(100),
  countryCode: z.string().min(2).max(3).default('XX'),
  city: z.string().max(100).nullish(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.string().nullish(),
  description: z.string().min(1, 'Description is required').max(5000),
  descriptionUz: z.string().max(5000).nullish(),
  descriptionRu: z.string().max(5000).nullish(),
  descriptionTr: z.string().max(5000).nullish(),
  story: z.string().max(20000).nullish(),
  storyUz: z.string().max(20000).nullish(),
  storyRu: z.string().max(20000).nullish(),
  storyTr: z.string().max(20000).nullish(),
  category: z.enum(['EXPEDITION', 'ALPINE', 'CULTURAL', 'SCHOLARLY', 'DIPLOMATIC']).default('EXPEDITION'),
  coverImage: z.string().max(500).nullish(),
  photos: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export const globeLocationUpdateSchema = globeLocationCreateSchema.partial();

// --- Destination ---
export const destinationCreateSchema = z.object({
  title: z.string().min(1).max(300),
  titleUz: z.string().max(300).nullish(),
  titleRu: z.string().max(300).nullish(),
  titleTr: z.string().max(300).nullish(),
  country: z.string().min(1).max(100),
  countryCode: z.string().min(2).max(3),
  city: z.string().max(100).nullish(),
  coordinates: z.string().max(100).nullish(),
  description: z.string().min(1).max(5000),
  descriptionUz: z.string().max(5000).nullish(),
  descriptionRu: z.string().max(5000).nullish(),
  descriptionTr: z.string().max(5000).nullish(),
  story: z.string().max(20000).nullish(),
  storyUz: z.string().max(20000).nullish(),
  storyRu: z.string().max(20000).nullish(),
  storyTr: z.string().max(20000).nullish(),
  photos: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
  featured: z.boolean().default(false),
  visitedAt: z.string().nullish(),
  slug: z.string().max(200).optional(),
});

export const destinationUpdateSchema = destinationCreateSchema.partial();

// --- Timeline Event ---
export const timelineEventCreateSchema = z.object({
  year: z.coerce.number().int().min(1900).max(2100),
  date: z.string().min(1).max(50),
  title: z.string().min(1).max(300),
  titleUz: z.string().max(300).nullish(),
  titleRu: z.string().max(300).nullish(),
  titleTr: z.string().max(300).nullish(),
  category: z.enum(['EDUCATION', 'CAREER', 'TRAVEL', 'ACHIEVEMENT', 'SCIENTIFIC']).default('ACHIEVEMENT'),
  description: z.string().min(1).max(5000),
  descriptionUz: z.string().max(5000).nullish(),
  descriptionRu: z.string().max(5000).nullish(),
  descriptionTr: z.string().max(5000).nullish(),
  location: z.string().max(200).nullish(),
  mediaUrl: z.string().max(500).nullish(),
  order: z.coerce.number().int().default(0),
});

export const timelineEventUpdateSchema = timelineEventCreateSchema.partial();

// --- Certificate ---
export const certificateCreateSchema = z.object({
  title: z.string().min(1).max(300),
  titleUz: z.string().max(300).nullish(),
  titleRu: z.string().max(300).nullish(),
  titleTr: z.string().max(300).nullish(),
  issuer: z.string().min(1).max(200),
  issueDate: z.string().nullish(),
  credentialUrl: z.string().max(500).nullish(),
  credentialId: z.string().max(200).nullish(),
  imageUrl: z.string().min(1).max(500),
  category: z.enum(['ACADEMIC', 'DIPLOMACY', 'LEADERSHIP', 'EXPEDITION']).default('ACADEMIC'),
  featured: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export const certificateUpdateSchema = certificateCreateSchema.partial();

// --- Publication ---
export const publicationCreateSchema = z.object({
  title: z.string().min(1).max(500),
  titleUz: z.string().max(500).nullish(),
  titleRu: z.string().max(500).nullish(),
  titleTr: z.string().max(500).nullish(),
  authors: z.string().min(1).max(500),
  journal: z.string().min(1).max(300),
  year: z.coerce.number().int().min(1900).max(2100),
  doi: z.string().max(200).nullish(),
  link: z.string().max(500).nullish(),
  pdfUrl: z.string().max(500).nullish(),
  abstract: z.string().min(1).max(10000),
  abstractUz: z.string().max(10000).nullish(),
  abstractRu: z.string().max(10000).nullish(),
  abstractTr: z.string().max(10000).nullish(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  citations: z.coerce.number().int().default(0),
  featured: z.boolean().default(false),
});

export const publicationUpdateSchema = publicationCreateSchema.partial();

// --- Contact Message ---
export const contactMessageSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email('Invalid email format').max(200).trim(),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(5000).trim(),
});

// --- Audience Stat ---
export const audienceStatSchema = z.object({
  key: z.string().min(1).max(100),
  label: z.string().max(200).optional(),
  labelUz: z.string().max(200).nullish(),
  labelRu: z.string().max(200).nullish(),
  labelTr: z.string().max(200).nullish(),
  value: z.coerce.number().int().optional(),
  prefix: z.string().max(20).optional(),
  suffix: z.string().max(20).optional(),
  isSimulated: z.boolean().optional(),
  incrementRate: z.coerce.number().optional(),
  order: z.coerce.number().int().optional(),
});

// --- Country ---
export const countryCreateSchema = z.object({
  isoCode: z.string().min(2).max(3),
  countryName: z.string().min(1).max(100),
  countryNameUz: z.string().max(100).nullish(),
  countryNameRu: z.string().max(100).nullish(),
  countryNameTr: z.string().max(100).nullish(),
  visitedYear: z.coerce.number().int().min(1900).max(2100),
  notes: z.string().max(1000).nullish(),
  flag: z.string().max(10).nullish(),
  coordinates: z.string().max(100).nullish(),
  highlightColor: z.string().max(20).default('#d4af37'),
});

export const countryUpdateSchema = countryCreateSchema.partial();

// --- Experience ---
export const experienceCreateSchema = z.object({
  period: z.string().min(1).max(100),
  role: z.string().min(1).max(300),
  roleUz: z.string().max(300).nullish(),
  roleRu: z.string().max(300).nullish(),
  roleTr: z.string().max(300).nullish(),
  organization: z.string().min(1).max(300),
  location: z.string().max(200).nullish(),
  description: z.string().min(1).max(5000),
  descriptionUz: z.string().max(5000).nullish(),
  descriptionRu: z.string().max(5000).nullish(),
  descriptionTr: z.string().max(5000).nullish(),
  type: z.enum(['ACADEMIC', 'POLICY', 'EXPEDITION', 'ADVISORY']).default('ACADEMIC'),
  order: z.coerce.number().int().default(0),
});

export const experienceUpdateSchema = experienceCreateSchema.partial();

// --- Upload ---
export const uploadCategorySchema = z.enum([
  'DESTINATION', 'GLOBE', 'CERTIFICATE', 'PUBLICATION', 'AVATAR', 'GENERAL',
]).default('GENERAL');
