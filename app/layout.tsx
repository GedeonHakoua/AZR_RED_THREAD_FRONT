import '@/app/ui/global.css';
import { caveat, lato, lusitana } from '@/app/ui/fonts';
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  );
}
