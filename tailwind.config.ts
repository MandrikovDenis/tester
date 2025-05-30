import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"; // Import defaultTheme

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans], // Use the variable from layout.tsx
      },
  		colors: {
        // Neutral Gray Primary (Using Shadcn's default neutral)
        background: 'hsl(var(--background))', // White
        foreground: 'hsl(var(--foreground))', // Almost Black
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))', // Dark Gray / Black
          foreground: 'hsl(var(--primary-foreground))' // Almost White
        },
        // Light Blue Secondary
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // Light Blue
          foreground: 'hsl(var(--secondary-foreground))' // Dark Blue
        },
        // Muted (Adjusted slightly for harmony)
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        // Teal Accent
        accent: {
          DEFAULT: 'hsl(var(--accent))', // Light Teal
          foreground: 'hsl(var(--accent-foreground))' // Dark Teal
        },
        // Destructive (Standard Red)
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        // Border and Input (Adjusted for harmony)
        border: 'hsl(var(--border))', // Lighter Gray-Blue Border
        input: 'hsl(var(--input))', // Slightly darker than border for input
        ring: 'hsl(var(--ring))', // Teal Ring for focus
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Sidebar (Using adjusted theme colors)
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))', // Very Light Blue
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))', // Teal
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))', // Light Teal Accent
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
