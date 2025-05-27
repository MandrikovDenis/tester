import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a standard professional font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Use --font-sans for consistency with shadcn/ui default
});

export const metadata: Metadata = {
  title: 'WebTest',
  description: 'Automated Web Testing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
