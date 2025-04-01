/*
Significance of this file:
	Contains info about the name, icons, and how it should be displayed
	as an icon on the user's device
	


*/

export default function manifest() {
	return {
	  name: 'Next.js PWA',
	  short_name: 'NextPWA',
	  description: 'A Progressive Web App built with Next.js',
	  start_url: '/',
	  display: 'standalone',
	  background_color: '#ffffff',
	  theme_color: '#000000',
	  icons: [
		{
		  src: '/icon-192x192.png',
		  sizes: '192x192',
		  type: 'image/png',
		},
		{
		  src: '/icon-512x512.png',
		  sizes: '512x512',
		  type: 'image/png',
		},
	  ],
	}
  }