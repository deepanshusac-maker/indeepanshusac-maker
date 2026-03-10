import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/BookingModal";
import "./globals.css";

export const metadata = {
  title: "Dr. Gazaelle's Aesthetic Clinic — Moradabad",
  description: "Premium aesthetic and skin treatments in Moradabad. Skin brightening, laser therapy, chemical peels, anti-aging, hair restoration. Book your consultation with Dr. Gazaelle today.",
  keywords: ["aesthetic clinic moradabad", "skin treatment moradabad", "dermatologist moradabad", "laser therapy", "chemical peel", "hair restoration", "PRP therapy", "Dr Gazaelle"],
  openGraph: {
    title: "Dr. Gazaelle's Aesthetic Clinic — Moradabad",
    description: "Premium skin & beauty treatments. Acne care, laser therapy, anti-aging solutions, hair restoration. Book your consultation today.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Gazaelle's Aesthetic Clinic — Moradabad",
    description: "Premium skin & beauty treatments in Moradabad.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#fcfbf7" />
      </head>
      <body className="font-[var(--font-jost)]">
        <BookingProvider>
          {children}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
