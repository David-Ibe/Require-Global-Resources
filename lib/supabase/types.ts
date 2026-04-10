export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type PricingOption = {
  label: string;
  price: string;
  savings: string;
  qty: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string;
          badge: string | null;
          description: string;
          features: string[];
          images: string[];
          pricing_options: PricingOption[] | Json;
          youtube_url: string | null;
          stock_count: number;
          old_price: string | null;
          current_price: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: string;
          badge?: string | null;
          description: string;
          features?: string[];
          images?: string[];
          pricing_options?: PricingOption[] | Json;
          youtube_url?: string | null;
          stock_count?: number;
          old_price?: string | null;
          current_price: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category?: string;
          badge?: string | null;
          description?: string;
          features?: string[];
          images?: string[];
          pricing_options?: PricingOption[] | Json;
          youtube_url?: string | null;
          stock_count?: number;
          old_price?: string | null;
          current_price?: string;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          product_id: string | null;
          product_name: string;
          package_label: string;
          package_price: string;
          quantity: number;
          customer_name: string;
          phone: string;
          whatsapp: string;
          address: string;
          state: string;
          payment_method: string;
          status: string;
          paystack_reference: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          product_name: string;
          package_label: string;
          package_price: string;
          quantity?: number;
          customer_name: string;
          phone: string;
          whatsapp: string;
          address: string;
          state: string;
          payment_method?: string;
          status?: string;
          paystack_reference?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          product_name?: string;
          package_label?: string;
          package_price?: string;
          quantity?: number;
          customer_name?: string;
          phone?: string;
          whatsapp?: string;
          address?: string;
          state?: string;
          payment_method?: string;
          status?: string;
          paystack_reference?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string | null;
          reviewer_name: string;
          reviewer_location: string;
          rating: number;
          review_text: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          reviewer_name: string;
          reviewer_location: string;
          rating: number;
          review_text: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          reviewer_name?: string;
          reviewer_location?: string;
          rating?: number;
          review_text?: string;
          verified?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          phone: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      order_inquiries: {
        Row: {
          id: string;
          product_name: string;
          customer_whatsapp: string | null;
          source_page: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_name: string;
          customer_whatsapp?: string | null;
          source_page: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_name?: string;
          customer_whatsapp?: string | null;
          source_page?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
