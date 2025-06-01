## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Package Manager**: npm

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm (comes with Node.js)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── courses/            # Courses listing page
│   │   ├── calendar/           # Calendar view page
│   │   ├── sign-in/            # Authentication pages
│   │   ├── sign-up/
│   │   ├── onboarding/         # Multi-step onboarding
│   │   └── profile/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── navbar.tsx          # Navigation component
│   │   ├── course-card.tsx     # Course display card
│   │   ├── nudge-card.tsx      # Smart nudge component
│   │   └── calendar-*.tsx      # Calendar components
│   └── lib/                    # Utility functions
├── public/                     # Static assets
└── package.json
```

## 🎯 Key Features

### ✅ Authentication & Onboarding

- **Sign-in/Sign-up pages** 
- **Social authentication**
- **Multi-step onboarding** 
- **Animated dashboard previews** 

### ✅ Dashboard

- **Recent Activity** 
- **Smart Nudges** 
- **Clean, Airbnb-inspired design** 

### ✅ Course Management

- **Course listing page** 
- **Course cards**
- **Responsive grid layout** 

### ✅ Calendar Integration

- **Multi-view calendar** 
- **Course-color-coded events**
- **Sidebar filters** 
- **Event management** 


## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎨 Design Philosophy

The InCourse frontend follows these design principles:

- **Clean & Modern**: Airbnb-inspired design with clean lines and whitespace
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Performance Focused**: Optimized loading and smooth animations

## 🔧 Development Guidelines

### Component Structure

- Use functional components with TypeScript
- Implement proper prop interfaces
- Follow shadcn/ui component patterns
- Use Tailwind CSS for styling

### State Management

- Use React hooks for local state
- Keep components simple and focused
- Implement proper error boundaries

### Animation Guidelines

- Use Framer Motion for page transitions
- Implement staggered animations for lists
- Keep animations smooth and purposeful (60fps)

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy automatically on push to main

### Environment Variables

Create a `.env.local` file for local development:

```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feat/your-feature`
4. Create a Pull Request

## 📋 Current Pages

- **/** - Landing page
- **/sign-in** - Authentication with dashboard preview
- **/sign-up** - Registration with onboarding flow
- **/onboarding** - Multi-step setup process
- **/dashboard** - Main learning dashboard
- **/courses** - Course listing and management
- **/calendar** - Learning calendar with events
- **/profile** - User profile settings

## 🐛 Troubleshooting

**Port already in use:**

```bash
lsof -ti:3000 | xargs kill
npm run dev
```

**Build errors:**

```bash
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript errors:**

```bash
npm run type-check
```

## 📄 License

This project is part of the InCourse learning platform. All rights reserved.

---

Built with ❤️ using Next.js and TypeScript
