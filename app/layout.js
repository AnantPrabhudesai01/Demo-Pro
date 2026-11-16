import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'WorkSpace – Project Management & Interactive Learning Platform',
  description: 'Production-style SaaS project management platform and interactive full-stack learning curriculum.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
