import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TooltipProvider } from './components/ui/tooltip';
import { queryClient } from './libs/query-client';
import { HomePage, AppPage } from './pages';
import { GuildsPage } from './pages/app/guilds';
import { GuildIdPage } from './pages/app/guilds/guildId';
import { ChatContainer } from './components/layouts/guild/chat/chat-container';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/app',
    element: <AppPage />,
    children: [
      {
        path: 'guilds',
        element: <GuildsPage />,
        children: [
          {
            path: ':guildId',
            element: <GuildIdPage />,
            children: [
              {
                path: 'channels/:channelId',
                element: <ChatContainer />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-16 right-[22vw] -z-10 h-80 w-20 -rotate-45 bg-purple-700/40 blur-3xl" />

          <div className="absolute -top-8 left-[26vw] -z-10 h-[400px] w-14 -rotate-12 bg-cyan-700/50 blur-3xl" />

          <div className="absolute bottom-8 left-1/2 -z-10 h-32 w-[300px] -rotate-12 bg-teal-700/30 blur-3xl" />

          <div className="absolute -bottom-[80px] -left-[50px] -z-10 size-[200px] -rotate-12 bg-blue-300/20 blur-3xl" />
        </div>

        <RouterProvider router={router} />

        <Toaster richColors />
        <ReactQueryDevtools />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
