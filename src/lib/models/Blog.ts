import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

// Interfaces for TypeScript
export interface ISection {
  heading?: string;
  subheading?: string;
  text?: string;
  listItems?: string[];
  metaLinking?: string;
  image?: {
    url: string;
    alt: string;
  };
  subsections?: Omit<ISection, 'subsections'>[];
}

export interface IFAQ {
  question: string;
  answer: string;
  tag?: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  intro?: string;
  excerpt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  priority?: number;
  heroImage?: {
    url: string;
    alt: string;
    filename: string;
  };
  content?: string;
  sections?: ISection[];
  faqs?: IFAQ[];
  date: string; // virtual
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schemas for nested fields
const SubsectionSchema = new Schema({
  subheading: String,
  text: String,
  listItems: [String],
  metaLinking: String,
  image: {
    url: String,
    alt: String,
  },
});

const SectionSchema = new Schema({
  heading: String,
  subheading: String,
  text: String,
  listItems: [String],
  metaLinking: String,
  image: {
    url: String,
    alt: String,
  },
  subsections: [SubsectionSchema],
});

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tag: String,
});

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    intro: String,
    excerpt: String,
    author: String,
    category: String,
    tags: [String],
    seoTitle: String,
    seoDescription: String,
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 },
    heroImage: {
      url: String,
      alt: String,
      filename: String,
    },
    sections: [SectionSchema],
    faqs: [FAQSchema],
    content: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
BlogSchema.virtual('date').get(function (this: IBlog) {
  if (this.createdAt) {
    return this.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return '';
});

// Hooks
BlogSchema.pre<IBlog>('validate', function (next: any) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
