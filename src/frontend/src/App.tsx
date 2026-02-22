import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Layout>
        <div className="space-y-8">
          <BookingForm />
          <BookingList />
        </div>
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
