import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "waki cards",
    description: "the worlds best flashcard",
    icons: {
        icon: [{ url: "/icon-192x192.png", sizes: "192x192", type: "image/png" }],
        apple: [{ url: "/icon-192x192.png" }],
    },
    appleTouchIcon: "/icon-192x192.png",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
    viewportFit: "cover",
};

export default async function RootLayout({ children }) {
  // Fetch data directly in the component (this runs on server)
  let wallpaper = null;
  try {
    const res = await fetch('https://peapix.com/bing/feed?country=us');
    const data = await res.json();
    
    if (data && data.length > 0) {
      wallpaper = data[0];
    }
  } catch (error) {
    console.error('Failed to fetch wallpaper:', error);
  }

  return (
    <html lang="en">
        <head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* Background div with blur */}
            {/* We have to do "conditional rendering"
              * If wallpaper exists/true, it will be rendered
              * Easier than this:
              * 
              * {wallpaper ? (
              *       <div>
              *          code...
              *       </div>
              * ): null
              * }
              * 
              */}

            {wallpaper && (
              <div 
                className=""
                style={{
                  position: 'fixed',                                // Fix to viewport, not affected by scrolling
                  width: '100%',                                    // We want the image area to be the max area available
                  height: '100%',                                   // We want the image area to be the max area available
                  backgroundImage: `url(${wallpaper.fullUrl})`,     // Grab the background image!
                  backgroundSize: 'cover',                          // Center don't rlly work if we don't cover this image
                  backgroundPosition: 'center',                     // So we get the center of the wallpaper
                  filter: 'blur(8px)',                              // Reg Blur
                  WebkitFilter: 'blur(8px)',                        // Apple Blur
                  zIndex: -1,                                        // So the image is behind everything 
                  transform: 'scale(1.1)'                           // Scale up by 10% to get rid of wacky edges
                }}
              />
            )}
            
            {/* Status bar blur overlay */}
            <div className="statusBarBlur" />
            
            {children}
        </body>
    </html>
  );
}
