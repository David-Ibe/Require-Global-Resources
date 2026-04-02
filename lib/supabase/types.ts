export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
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
