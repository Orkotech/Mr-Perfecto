/*
  # Initial Schema Setup for Mr. Perfecto

  1. New Tables
    - partners: Stores information about the user's partner
    - special_dates: Stores important dates and occasions
    - reminders: Stores generated reminders for special occasions
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  birth_date date NOT NULL,
  anniversary_date date,
  interests text[] DEFAULT '{}',
  favorite_colors text[] DEFAULT '{}',
  clothing_size text,
  shoe_size text,
  jewelry_preferences text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Special dates table
CREATE TABLE IF NOT EXISTS special_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  partner_id uuid REFERENCES partners(id) NOT NULL,
  date date NOT NULL,
  occasion text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_dates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their partner data"
  ON partners
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their special dates"
  ON special_dates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);