# Hero Frequency App

A web application that guides users through discovering their unique Hero Frequency—an energetic blueprint based on Human Design gates. Built with React, Supabase, and Digital Cowboy branding.

## Features

- **5-Stage Journey**: Welcome → Input → Reveal → Mythos → Final
- **Digital Cowboy Branding**: Premium UI with cosmic storytelling
- **Supabase Integration**: Authentication, database, and real-time features
- **AI-Powered Content**: Personalized mantras and Hero's Journey narratives
- **PDF Generation**: Downloadable frequency reports
- **Social Sharing**: Shareable frequency links
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG AA compliant

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI GPT-4o-mini integration
- **PDF**: jsPDF for report generation
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- OpenAI API key (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hero-frequency-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure your Supabase project:
   - Create a new Supabase project
   - Run the SQL schema in `supabase/schema.sql`
   - Update `.env` with your Supabase URL and anon key

5. Start the development server
```bash
npm run dev
```

## Supabase Setup

1. Create a new Supabase project
2. Go to the SQL Editor
3. Run the schema from `supabase/schema.sql`
4. Enable authentication providers as needed
5. Configure storage buckets for images and PDFs

## Digital Cowboy Brand Colors

- **Energy**: #F49558 (Primary accent)
- **Action**: #D35E0E (Hover states)
- **Depth**: #101F1F (Dark backgrounds)
- **Foundation**: #244A49 (Secondary dark)
- **Expansion**: #409FA1 (Teal accent)
- **Illumination**: #F6D541 (Yellow highlight)

## Typography

- **Headlines**: Inter font family
- **Body**: Lexend font family

## Project Structure

```
src/
├── components/
│   ├── stages/          # Journey stages
│   ├── ui/              # Reusable UI components
│   ├── auth/            # Authentication components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
│   ├── supabase.js      # Supabase client & helpers
│   ├── openai.js        # OpenAI integration
│   ├── humanDesign.js   # Human Design calculations
│   ├── pdf.js           # PDF generation
│   └── utils.js         # General utilities
├── common/              # Common components
└── App.jsx              # Main application
```

## User Journey Flow

### 1. Welcome Stage
- **Orange Pill**: For users with existing charts
- **Teal Pill**: For users needing chart generation
- Returning user recognition

### 2. Input Stage
- Personality Sun & Design Sun gate inputs
- Auto-calculation of Evolution & Purpose gates
- Real-time validation (gates 1-64)

### 3. Reveal Stage
- Superhero Identity Card generation
- Dynamic aura graphics
- 4 personalized mantras via AI

### 4. Mythos Stage
- 7-stage Hero's Journey narrative:
  1. Ordinary Matrix
  2. The Glitch
  3. Taking the Pill
  4. Blueprint Revealed
  5. Integration Challenges
  6. Frequency Mastery
  7. Transmission Mode
- ChatGPT exploration option

### 5. Final Stage
- PDF download functionality
- Social sharing capabilities
- Persistent results links

## Database Schema

### Tables
- `profiles`: User profile information
- `sessions`: User session data and progress
- `hero_frequencies`: Core frequency data
- `mantras`: Generated mantras
- `stories`: Personal mythos narratives

### RLS Policies
- Users can only access their own data
- Secure data isolation
- Proper foreign key relationships

## AI Integration

### OpenAI Features
- Personalized mantra generation
- Hero's Journey narrative creation
- Structured JSON responses
- Fallback content for offline use

### Prompt Engineering
- Gate-specific content generation
- Cosmic and empowering tone
- Structured output formatting

## PDF Generation

### Features
- Complete frequency report
- Branded design elements
- Mobile-friendly formatting
- Optimized file sizes

### Content Includes
- Superhero Identity Card
- All 4 mantras
- Complete personal mythos
- Gate information

## Deployment

### Vercel Setup
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Environment Variables
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-key
```

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- 2-space indentation
- Tailwind CSS utilities
- Component-based architecture
- Custom hooks for logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [support@herofrequency.com](mailto:support@herofrequency.com).

## Acknowledgments

- Human Design System
- Digital Cowboy branding
- Supabase team
- OpenAI API
- React community