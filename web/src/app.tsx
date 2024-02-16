import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TooltipProvider } from './components/ui/tooltip';
import { queryClient } from './libs/query-client';
import { HomePage, AppPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/app',
    element: <AppPage />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />

        <ReactQueryDevtools />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
