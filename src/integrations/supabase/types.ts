export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          key_hash: string
          key_prefix: string
          key_type: Database["public"]["Enums"]["api_key_type"]
          last_used_at: string | null
          merchant_id: string
          name: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash: string
          key_prefix: string
          key_type?: Database["public"]["Enums"]["api_key_type"]
          last_used_at?: string | null
          merchant_id: string
          name: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash?: string
          key_prefix?: string
          key_type?: Database["public"]["Enums"]["api_key_type"]
          last_used_at?: string | null
          merchant_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_payouts: {
        Row: {
          created_at: string
          currency: string
          failed_count: number
          id: string
          items: Json
          merchant_id: string
          processed_at: string | null
          status: string
          success_count: number
          total_amount: number
          total_count: number
        }
        Insert: {
          created_at?: string
          currency?: string
          failed_count?: number
          id?: string
          items?: Json
          merchant_id: string
          processed_at?: string | null
          status?: string
          success_count?: number
          total_amount?: number
          total_count?: number
        }
        Update: {
          created_at?: string
          currency?: string
          failed_count?: number
          id?: string
          items?: Json
          merchant_id?: string
          processed_at?: string | null
          status?: string
          success_count?: number
          total_amount?: number
          total_count?: number
        }
        Relationships: []
      }
      checkout_sessions: {
        Row: {
          amount: number
          cancel_url: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          customer_email: string | null
          customer_name: string | null
          id: string
          merchant_id: string
          metadata: Json | null
          payment_intent_id: string | null
          product_description: string | null
          product_name: string
          redirect_url: string | null
          status: Database["public"]["Enums"]["checkout_status"]
          success_url: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          cancel_url?: string | null
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          merchant_id: string
          metadata?: Json | null
          payment_intent_id?: string | null
          product_description?: string | null
          product_name: string
          redirect_url?: string | null
          status?: Database["public"]["Enums"]["checkout_status"]
          success_url?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          cancel_url?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          merchant_id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          product_description?: string | null
          product_name?: string
          redirect_url?: string | null
          status?: Database["public"]["Enums"]["checkout_status"]
          success_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkout_sessions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkout_sessions_payment_intent_id_fkey"
            columns: ["payment_intent_id"]
            isOneToOne: false
            referencedRelation: "payment_intents"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_orders: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          currency: string
          customer_email: string
          customer_ip: string | null
          customer_name: string | null
          customer_phone: string | null
          delivered_at: string | null
          delivery_attempts: number | null
          delivery_data: Json | null
          delivery_method: string | null
          delivery_status: string | null
          id: string
          metadata: Json | null
          onramp_transaction_id: string | null
          paid_at: string | null
          payment_link_id: string
          status: string
          updated_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          currency: string
          customer_email: string
          customer_ip?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivered_at?: string | null
          delivery_attempts?: number | null
          delivery_data?: Json | null
          delivery_method?: string | null
          delivery_status?: string | null
          id?: string
          metadata?: Json | null
          onramp_transaction_id?: string | null
          paid_at?: string | null
          payment_link_id: string
          status?: string
          updated_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          currency?: string
          customer_email?: string
          customer_ip?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivered_at?: string | null
          delivery_attempts?: number | null
          delivery_data?: Json | null
          delivery_method?: string | null
          delivery_status?: string | null
          id?: string
          metadata?: Json | null
          onramp_transaction_id?: string | null
          paid_at?: string | null
          payment_link_id?: string
          status?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_orders_payment_link_id_fkey"
            columns: ["payment_link_id"]
            isOneToOne: false
            referencedRelation: "payment_links"
            referencedColumns: ["id"]
          },
        ]
      }
      fx_ledger_entries: {
        Row: {
          created_at: string
          fee: number
          from_amount: number
          from_currency: Database["public"]["Enums"]["currency_code"]
          from_wallet_id: string
          id: string
          rate: number
          to_amount: number
          to_currency: Database["public"]["Enums"]["currency_code"]
          to_wallet_id: string
          transaction_id: string
        }
        Insert: {
          created_at?: string
          fee?: number
          from_amount: number
          from_currency: Database["public"]["Enums"]["currency_code"]
          from_wallet_id: string
          id?: string
          rate: number
          to_amount: number
          to_currency: Database["public"]["Enums"]["currency_code"]
          to_wallet_id: string
          transaction_id: string
        }
        Update: {
          created_at?: string
          fee?: number
          from_amount?: number
          from_currency?: Database["public"]["Enums"]["currency_code"]
          from_wallet_id?: string
          id?: string
          rate?: number
          to_amount?: number
          to_currency?: Database["public"]["Enums"]["currency_code"]
          to_wallet_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fx_ledger_entries_from_wallet_id_fkey"
            columns: ["from_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fx_ledger_entries_to_wallet_id_fkey"
            columns: ["to_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      fx_rates: {
        Row: {
          from_currency: Database["public"]["Enums"]["currency_code"]
          id: string
          rate: number
          to_currency: Database["public"]["Enums"]["currency_code"]
          updated_at: string
        }
        Insert: {
          from_currency: Database["public"]["Enums"]["currency_code"]
          id?: string
          rate: number
          to_currency: Database["public"]["Enums"]["currency_code"]
          updated_at?: string
        }
        Update: {
          from_currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          rate?: number
          to_currency?: Database["public"]["Enums"]["currency_code"]
          updated_at?: string
        }
        Relationships: []
      }
      ledger_entries: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          description: string | null
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id: string
          transaction_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          balance_after?: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          description?: string | null
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id?: string
          transaction_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          description?: string | null
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"]
          id?: string
          transaction_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_customers: {
        Row: {
          created_at: string
          email: string
          id: string
          merchant_id: string
          metadata: Json | null
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          merchant_id: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          merchant_id?: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchant_customers_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_profiles: {
        Row: {
          address: string | null
          business_email: string
          business_name: string
          business_phone: string | null
          city: string | null
          country: string
          created_at: string
          crypto_network: string | null
          crypto_wallet_address: string | null
          id: string
          preferred_stablecoin: string | null
          settlement_bank_account_name: string | null
          settlement_bank_account_number: string | null
          settlement_bank_code: string | null
          settlement_bank_name: string | null
          settlement_currency: Database["public"]["Enums"]["currency_code"]
          state: string | null
          status: Database["public"]["Enums"]["merchant_status"]
          total_revenue: number
          total_transactions: number
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          business_email: string
          business_name: string
          business_phone?: string | null
          city?: string | null
          country?: string
          created_at?: string
          crypto_network?: string | null
          crypto_wallet_address?: string | null
          id?: string
          preferred_stablecoin?: string | null
          settlement_bank_account_name?: string | null
          settlement_bank_account_number?: string | null
          settlement_bank_code?: string | null
          settlement_bank_name?: string | null
          settlement_currency?: Database["public"]["Enums"]["currency_code"]
          state?: string | null
          status?: Database["public"]["Enums"]["merchant_status"]
          total_revenue?: number
          total_transactions?: number
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          business_email?: string
          business_name?: string
          business_phone?: string | null
          city?: string | null
          country?: string
          created_at?: string
          crypto_network?: string | null
          crypto_wallet_address?: string | null
          id?: string
          preferred_stablecoin?: string | null
          settlement_bank_account_name?: string | null
          settlement_bank_account_number?: string | null
          settlement_bank_code?: string | null
          settlement_bank_name?: string | null
          settlement_currency?: Database["public"]["Enums"]["currency_code"]
          state?: string | null
          status?: Database["public"]["Enums"]["merchant_status"]
          total_revenue?: number
          total_transactions?: number
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      mock_simulation_settings: {
        Row: {
          auto_process_webhooks: boolean
          bank_failure_rate: number
          card_failure_rate: number
          created_at: string
          enable_random_failures: boolean
          enable_reversals: boolean
          id: string
          max_webhook_delay: number
          merchant_id: string
          min_webhook_delay: number
          reversal_delay_ms: number
          reversal_rate: number
          updated_at: string
          webhook_delay_ms: number
          webhook_delay_rate: number
          webhook_duplicate_rate: number
        }
        Insert: {
          auto_process_webhooks?: boolean
          bank_failure_rate?: number
          card_failure_rate?: number
          created_at?: string
          enable_random_failures?: boolean
          enable_reversals?: boolean
          id?: string
          max_webhook_delay?: number
          merchant_id: string
          min_webhook_delay?: number
          reversal_delay_ms?: number
          reversal_rate?: number
          updated_at?: string
          webhook_delay_ms?: number
          webhook_delay_rate?: number
          webhook_duplicate_rate?: number
        }
        Update: {
          auto_process_webhooks?: boolean
          bank_failure_rate?: number
          card_failure_rate?: number
          created_at?: string
          enable_random_failures?: boolean
          enable_reversals?: boolean
          id?: string
          max_webhook_delay?: number
          merchant_id?: string
          min_webhook_delay?: number
          reversal_delay_ms?: number
          reversal_rate?: number
          updated_at?: string
          webhook_delay_ms?: number
          webhook_delay_rate?: number
          webhook_duplicate_rate?: number
        }
        Relationships: []
      }
      mock_transactions: {
        Row: {
          account_name: string | null
          account_number: string | null
          amount: number
          bank_name: string | null
          card_brand: string | null
          card_last_four: string | null
          card_number: string | null
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          processed_at: string | null
          reference: string
          simulation_type: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
          webhook_attempts: number
          webhook_response_status: number | null
          webhook_sent: boolean
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          amount: number
          bank_name?: string | null
          card_brand?: string | null
          card_last_four?: string | null
          card_number?: string | null
          created_at?: string
          currency: string
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          reference?: string
          simulation_type?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
          webhook_attempts?: number
          webhook_response_status?: number | null
          webhook_sent?: boolean
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          card_brand?: string | null
          card_last_four?: string | null
          card_number?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          reference?: string
          simulation_type?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
          webhook_attempts?: number
          webhook_response_status?: number | null
          webhook_sent?: boolean
        }
        Relationships: []
      }
      mock_webhook_deliveries: {
        Row: {
          attempts: number
          created_at: string
          id: string
          payload: Json
          response_body: string | null
          response_status: number | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mock_webhook_deliveries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "mock_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      onramp_provider_config: {
        Row: {
          api_key: string | null
          api_secret: string | null
          created_at: string
          fee_percentage: number | null
          id: string
          is_active: boolean | null
          max_amount: number | null
          min_amount: number | null
          provider: string
          supported_countries: string[] | null
          supported_fiat_currencies: string[] | null
          updated_at: string
          webhook_secret: string | null
        }
        Insert: {
          api_key?: string | null
          api_secret?: string | null
          created_at?: string
          fee_percentage?: number | null
          id?: string
          is_active?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          provider: string
          supported_countries?: string[] | null
          supported_fiat_currencies?: string[] | null
          updated_at?: string
          webhook_secret?: string | null
        }
        Update: {
          api_key?: string | null
          api_secret?: string | null
          created_at?: string
          fee_percentage?: number | null
          id?: string
          is_active?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          provider?: string
          supported_countries?: string[] | null
          supported_fiat_currencies?: string[] | null
          updated_at?: string
          webhook_secret?: string | null
        }
        Relationships: []
      }
      onramp_transactions: {
        Row: {
          checkout_url: string | null
          completed_at: string | null
          created_at: string
          crypto_amount: number | null
          crypto_network: string
          crypto_token: string
          customer_country: string | null
          customer_email: string | null
          customer_phone: string | null
          fiat_amount: number
          fiat_currency: string
          id: string
          merchant_id: string
          payment_id: string
          provider: string
          provider_response: Json | null
          provider_transaction_id: string | null
          status: string
          updated_at: string
          wallet_address: string
          webhook_data: Json | null
          webhook_received_at: string | null
        }
        Insert: {
          checkout_url?: string | null
          completed_at?: string | null
          created_at?: string
          crypto_amount?: number | null
          crypto_network?: string
          crypto_token?: string
          customer_country?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          fiat_amount: number
          fiat_currency: string
          id?: string
          merchant_id: string
          payment_id: string
          provider: string
          provider_response?: Json | null
          provider_transaction_id?: string | null
          status?: string
          updated_at?: string
          wallet_address: string
          webhook_data?: Json | null
          webhook_received_at?: string | null
        }
        Update: {
          checkout_url?: string | null
          completed_at?: string | null
          created_at?: string
          crypto_amount?: number | null
          crypto_network?: string
          crypto_token?: string
          customer_country?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          fiat_amount?: number
          fiat_currency?: string
          id?: string
          merchant_id?: string
          payment_id?: string
          provider?: string
          provider_response?: Json | null
          provider_transaction_id?: string | null
          status?: string
          updated_at?: string
          wallet_address?: string
          webhook_data?: Json | null
          webhook_received_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onramp_transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_intents: {
        Row: {
          amount: number
          client_secret: string
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          customer_id: string | null
          description: string | null
          id: string
          idempotency_key: string | null
          merchant_id: string
          metadata: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: Database["public"]["Enums"]["payment_intent_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          client_secret?: string
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          customer_id?: string | null
          description?: string | null
          id?: string
          idempotency_key?: string | null
          merchant_id: string
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["payment_intent_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          client_secret?: string
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          customer_id?: string | null
          description?: string | null
          id?: string
          idempotency_key?: string | null
          merchant_id?: string
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["payment_intent_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_intents_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_links: {
        Row: {
          amount: number | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          current_purchases: number | null
          description: string | null
          digital_content: Json | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_purchases: number | null
          metadata: Json | null
          payment_count: number | null
          redirect_url: string | null
          slug: string
          success_message: string | null
          title: string
          total_collected: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          current_purchases?: number | null
          description?: string | null
          digital_content?: Json | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_purchases?: number | null
          metadata?: Json | null
          payment_count?: number | null
          redirect_url?: string | null
          slug: string
          success_message?: string | null
          title: string
          total_collected?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          current_purchases?: number | null
          description?: string | null
          digital_content?: Json | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_purchases?: number | null
          metadata?: Json | null
          payment_count?: number | null
          redirect_url?: string | null
          slug?: string
          success_message?: string | null
          title?: string
          total_collected?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payout_schedules: {
        Row: {
          created_at: string
          day_of_month: number | null
          day_of_week: number | null
          id: string
          is_active: boolean
          merchant_id: string
          minimum_amount: number
          schedule: Database["public"]["Enums"]["payout_schedule_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          merchant_id: string
          minimum_amount?: number
          schedule?: Database["public"]["Enums"]["payout_schedule_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          merchant_id?: string
          minimum_amount?: number
          schedule?: Database["public"]["Enums"]["payout_schedule_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_schedules_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: true
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount: number
          bank_account_name: string | null
          bank_account_number: string | null
          bank_code: string | null
          bank_name: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          id: string
          merchant_id: string
          metadata: Json | null
          mobile_money_number: string | null
          mobile_money_provider: string | null
          payout_method: Database["public"]["Enums"]["payout_method"]
          processed_at: string | null
          reference: string
          status: Database["public"]["Enums"]["payout_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_code?: string | null
          bank_name?: string | null
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          id?: string
          merchant_id: string
          metadata?: Json | null
          mobile_money_number?: string | null
          mobile_money_provider?: string | null
          payout_method?: Database["public"]["Enums"]["payout_method"]
          processed_at?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_code?: string | null
          bank_name?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          merchant_id?: string
          metadata?: Json | null
          mobile_money_number?: string | null
          mobile_money_provider?: string | null
          payout_method?: Database["public"]["Enums"]["payout_method"]
          processed_at?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payouts_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      processor_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          processed_at: string | null
          processor: string
          processor_fee: number | null
          reference: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          processor: string
          processor_fee?: number | null
          reference: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          processor?: string
          processor_fee?: number | null
          reference?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      reconciliation_runs: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          results: Json | null
          started_at: string | null
          status: string
          total_discrepancies: number | null
          total_matched: number | null
          total_unmatched: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          results?: Json | null
          started_at?: string | null
          status?: string
          total_discrepancies?: number | null
          total_matched?: number | null
          total_unmatched?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          results?: Json | null
          started_at?: string | null
          status?: string
          total_discrepancies?: number | null
          total_matched?: number | null
          total_unmatched?: number | null
        }
        Relationships: []
      }
      subscription_payments: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          id: string
          idempotency_key: string | null
          paid_at: string | null
          payment_intent_id: string | null
          status: string
          subscription_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          id?: string
          idempotency_key?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          status?: string
          subscription_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          idempotency_key?: string | null
          paid_at?: string | null
          payment_intent_id?: string | null
          status?: string
          subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_payments_payment_intent_id_fkey"
            columns: ["payment_intent_id"]
            isOneToOne: false
            referencedRelation: "payment_intents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["subscription_interval"]
          interval_count: number
          merchant_id: string
          metadata: Json | null
          name: string
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end: string | null
          trial_start: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["subscription_interval"]
          interval_count?: number
          merchant_id: string
          metadata?: Json | null
          name: string
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["subscription_interval"]
          interval_count?: number
          merchant_id?: string
          metadata?: Json | null
          name?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "merchant_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          description: string | null
          id: string
          idempotency_key: string | null
          metadata: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          reference: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          description?: string | null
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          description?: string | null
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          id: string
          is_default: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          is_default?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          is_default?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      webhook_endpoints: {
        Row: {
          created_at: string
          events: Database["public"]["Enums"]["webhook_event_type"][]
          id: string
          is_active: boolean
          merchant_id: string
          name: string
          secret: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          events?: Database["public"]["Enums"]["webhook_event_type"][]
          id?: string
          is_active?: boolean
          merchant_id: string
          name: string
          secret?: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          events?: Database["public"]["Enums"]["webhook_event_type"][]
          id?: string
          is_active?: boolean
          merchant_id?: string
          name?: string
          secret?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_endpoints_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          attempts: number
          created_at: string
          event_type: Database["public"]["Enums"]["webhook_event_type"]
          id: string
          max_attempts: number
          next_attempt_at: string | null
          payload: Json
          response_body: string | null
          response_status: number | null
          status: string
          webhook_endpoint_id: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          event_type: Database["public"]["Enums"]["webhook_event_type"]
          id?: string
          max_attempts?: number
          next_attempt_at?: string | null
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          status?: string
          webhook_endpoint_id: string
        }
        Update: {
          attempts?: number
          created_at?: string
          event_type?: Database["public"]["Enums"]["webhook_event_type"]
          id?: string
          max_attempts?: number
          next_attempt_at?: string | null
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          status?: string
          webhook_endpoint_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_webhook_endpoint_id_fkey"
            columns: ["webhook_endpoint_id"]
            isOneToOne: false
            referencedRelation: "webhook_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          account_name: string | null
          account_number: string | null
          amount: number
          bank_name: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_code"]
          id: string
          reference: string | null
          status: Database["public"]["Enums"]["withdrawal_status"]
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string
          currency: Database["public"]["Enums"]["currency_code"]
          id?: string
          reference?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          reference?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      onramp_analytics: {
        Row: {
          avg_transaction_size: number | null
          completed_transactions: number | null
          date: string | null
          failed_transactions: number | null
          merchant_id: string | null
          provider: string | null
          total_crypto_volume: number | null
          total_fiat_volume: number | null
          total_transactions: number | null
        }
        Relationships: [
          {
            foreignKeyName: "onramp_transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      clear_mock_data: { Args: never; Returns: undefined }
      generate_mock_reference: { Args: { p_type: string }; Returns: string }
      get_best_onramp_provider: {
        Args: { p_amount: number; p_country: string; p_currency: string }
        Returns: string
      }
      get_wallet_balance: { Args: { p_wallet_id: string }; Returns: number }
    }
    Enums: {
      api_key_type: "test" | "live"
      checkout_status: "pending" | "paid" | "failed" | "expired" | "cancelled"
      currency_code: "NGN" | "KES" | "GHS" | "ZAR" | "USD"
      ledger_entry_type: "credit" | "debit"
      merchant_status: "pending" | "active" | "suspended" | "archived"
      payment_intent_status:
        | "pending"
        | "processing"
        | "succeeded"
        | "failed"
        | "cancelled"
        | "refunded"
      payment_method: "card" | "bank_transfer" | "mobile_money" | "wallet"
      payout_method: "bank_transfer" | "mobile_money" | "wallet"
      payout_schedule_type:
        | "daily"
        | "weekly"
        | "biweekly"
        | "monthly"
        | "manual"
      payout_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "cancelled"
      subscription_interval: "day" | "week" | "month" | "year"
      subscription_status:
        | "active"
        | "cancelled"
        | "past_due"
        | "trialing"
        | "paused"
      transaction_status: "pending" | "success" | "failed" | "reversed"
      transaction_type: "deposit" | "withdrawal" | "transfer" | "payment"
      webhook_event_type:
        | "payment.succeeded"
        | "payment.failed"
        | "payment.refunded"
        | "refund.created"
        | "payout.completed"
        | "payout.failed"
        | "subscription.created"
        | "subscription.cancelled"
        | "subscription.payment_failed"
      withdrawal_status: "pending" | "processing" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      api_key_type: ["test", "live"],
      checkout_status: ["pending", "paid", "failed", "expired", "cancelled"],
      currency_code: ["NGN", "KES", "GHS", "ZAR", "USD"],
      ledger_entry_type: ["credit", "debit"],
      merchant_status: ["pending", "active", "suspended", "archived"],
      payment_intent_status: [
        "pending",
        "processing",
        "succeeded",
        "failed",
        "cancelled",
        "refunded",
      ],
      payment_method: ["card", "bank_transfer", "mobile_money", "wallet"],
      payout_method: ["bank_transfer", "mobile_money", "wallet"],
      payout_schedule_type: [
        "daily",
        "weekly",
        "biweekly",
        "monthly",
        "manual",
      ],
      payout_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "cancelled",
      ],
      subscription_interval: ["day", "week", "month", "year"],
      subscription_status: [
        "active",
        "cancelled",
        "past_due",
        "trialing",
        "paused",
      ],
      transaction_status: ["pending", "success", "failed", "reversed"],
      transaction_type: ["deposit", "withdrawal", "transfer", "payment"],
      webhook_event_type: [
        "payment.succeeded",
        "payment.failed",
        "payment.refunded",
        "refund.created",
        "payout.completed",
        "payout.failed",
        "subscription.created",
        "subscription.cancelled",
        "subscription.payment_failed",
      ],
      withdrawal_status: ["pending", "processing", "completed", "failed"],
    },
  },
} as const
