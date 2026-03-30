import AuthGuard from '../components/auth/AuthGuard';

export default function ApplicationsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
