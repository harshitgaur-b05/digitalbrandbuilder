import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  category?: string;
  icon?: string;
  shortDescription?: string;
  description?: string;
  ctaText?: string;
  deliverables?: string[];
  painPoints?: string[];
  benefits?: string[];
  faq?: { q: string; a: string }[];
  heroSection?: any;
  approachSection?: any;
  deliverablesSection?: any;
  inactionSection?: any;
  leadFormSection?: any;
  statsSection?: any;
  whatIsSection?: any;
  whyMattersSection?: any;
  servicesSection?: any;
  processSection?: any;
  whyUsSection?: any;
  resultsSection?: any;
  isActive: boolean;
  order: number;
  imageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  schemaData?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: String,
    icon: String,
    shortDescription: String,
    description: String,
    ctaText: String,
    deliverables: [String],
    painPoints: [String],
    benefits: [String],
    faq: [
      {
        q: String,
        a: String,
      },
    ],
    // Mixed types for rich sections
    heroSection: Schema.Types.Mixed,
    approachSection: Schema.Types.Mixed,
    deliverablesSection: Schema.Types.Mixed,
    inactionSection: Schema.Types.Mixed,
    leadFormSection: Schema.Types.Mixed,
    statsSection: Schema.Types.Mixed,
    whatIsSection: Schema.Types.Mixed,
    whyMattersSection: Schema.Types.Mixed,
    servicesSection: Schema.Types.Mixed,
    processSection: Schema.Types.Mixed,
    whyUsSection: Schema.Types.Mixed,
    resultsSection: Schema.Types.Mixed,
    
    // Admin / SEO
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    imageUrl: String,
    metaTitle: String,
    metaDescription: String,
    schemaData: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
