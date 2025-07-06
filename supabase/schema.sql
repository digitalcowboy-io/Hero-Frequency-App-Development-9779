-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  avatar_url TEXT,
  bio TEXT,
  brand_color TEXT DEFAULT '#F49558',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  active_step TEXT NOT NULL DEFAULT 'welcome',
  hero_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero_frequencies table
CREATE TABLE IF NOT EXISTS hero_frequencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personality_sun INTEGER NOT NULL CHECK (personality_sun >= 1 AND personality_sun <= 64),
  design_sun INTEGER NOT NULL CHECK (design_sun >= 1 AND design_sun <= 64),
  evolution_gate INTEGER NOT NULL CHECK (evolution_gate >= 1 AND evolution_gate <= 64),
  purpose_gate INTEGER NOT NULL CHECK (purpose_gate >= 1 AND purpose_gate <= 64),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mantras table
CREATE TABLE IF NOT EXISTS mantras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  frequency_id UUID REFERENCES hero_frequencies(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  frequency_id UUID REFERENCES hero_frequencies(id) ON DELETE CASCADE,
  story_arc JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_frequencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE mantras ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Sessions policies
CREATE POLICY "Users can view their own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" ON sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Hero frequencies policies
CREATE POLICY "Users can view their own hero frequencies" ON hero_frequencies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own hero frequencies" ON hero_frequencies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hero frequencies" ON hero_frequencies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hero frequencies" ON hero_frequencies
  FOR DELETE USING (auth.uid() = user_id);

-- Mantras policies
CREATE POLICY "Users can view mantras for their frequencies" ON mantras
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = mantras.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert mantras for their frequencies" ON mantras
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = mantras.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update mantras for their frequencies" ON mantras
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = mantras.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete mantras for their frequencies" ON mantras
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = mantras.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

-- Stories policies
CREATE POLICY "Users can view stories for their frequencies" ON stories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = stories.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert stories for their frequencies" ON stories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = stories.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update stories for their frequencies" ON stories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = stories.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete stories for their frequencies" ON stories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM hero_frequencies 
      WHERE hero_frequencies.id = stories.frequency_id 
      AND hero_frequencies.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_hero_frequencies_user_id ON hero_frequencies(user_id);
CREATE INDEX IF NOT EXISTS idx_mantras_frequency_id ON mantras(frequency_id);
CREATE INDEX IF NOT EXISTS idx_stories_frequency_id ON stories(frequency_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at 
  BEFORE UPDATE ON sessions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_frequencies_updated_at 
  BEFORE UPDATE ON hero_frequencies 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at 
  BEFORE UPDATE ON stories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, avatar_url, bio, brand_color)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'avatar_url',
    NULL,
    '#F49558'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();