import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Catalyst Education | Studio",
  description: "Content Management",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

