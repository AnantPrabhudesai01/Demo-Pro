import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

export const metadata = {
  title: 'WorkSpace – Project Management & Interactive Learning Platform',
  description: 'Production-style SaaS project management platform and interactive full-stack learning curriculum.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
