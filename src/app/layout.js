import "./globals.css";

export const metadata = {
  title: "Mi Espacio ✦",
  description: "Organizá tus materias y estudiá mejor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}