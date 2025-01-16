import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  id: string;
  email: string;
  created_at: string;
}

export interface Partner {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  anniversary_date: string | null;
  interests: string[];
  favorite_colors: string[];
  clothing_size: string;
  shoe_size: string;
  jewelry_preferences: string[];
  created_at: string;
}

export interface SpecialDate {
  id: string;
  user_id: string;
  partner_id: string;
  date: string;
  occasion: string;
  notes: string;
  created_at: string;
}

export interface Product {
  title: string;
  price: string;
  url: string;
  image?: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl: string;
}