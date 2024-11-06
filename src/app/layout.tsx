// src/app/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | Next.js App',
        default: 'Next.js App',
    },
    description: 'Next.js App Router Production Setup',
    keywords: ['Next.js', 'React', 'JavaScript'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}