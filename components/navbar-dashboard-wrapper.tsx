'use client';

import { useSession } from 'next-auth/react';
import NavBarDashboard from './navbar-dashboard';

export default function NavBarDashboardWrapper() {
  const { data: session } = useSession();

  return <NavBarDashboard session={session} />;
}
