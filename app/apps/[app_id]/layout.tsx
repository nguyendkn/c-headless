import { AppProvider } from '@/contexts/app-context';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppProvider>{children}</AppProvider>;
}
