import '../styles/globals.css'; // Import global Tailwind styles here
import Navbar from '../components/Navbar';
import { LeaderboardProvider } from '@/context/LeaderboardContext';

export const metadata = {
  title: 'Leaderboard',
  description: 'A player ranking leaderboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900">
        <Navbar />
        <LeaderboardProvider>
          <section>{children}</section>
        </LeaderboardProvider>
      </body>
    </html>
  );
}
