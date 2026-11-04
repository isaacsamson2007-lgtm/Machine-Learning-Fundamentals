import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART CITY TRAFFIC INTELLIGENCE | AI Command Center",
  description: "Next-Generation Urban Traffic Prediction and Congestion Intelligence powered by 4 Machine Learning Models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

