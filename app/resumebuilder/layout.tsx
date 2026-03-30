import AuthGuard from '../components/auth/AuthGuard';

export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
