import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BNG - AI Baby Name Generator',
  description: 'Discover the perfect baby name with AI-powered suggestions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWRQXTQR');
          `}
        </Script>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWRQXTQR"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        <ThemeProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
              <Navbar />
              <main className="flex-grow w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}