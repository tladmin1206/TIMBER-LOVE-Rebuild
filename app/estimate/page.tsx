import { redirect } from 'next/navigation';

export const metadata = { robots: { index: false, follow: false } };

// Keep existing bookmarks useful while the planner is retired from public use.
export default function Page() {
  redirect('/design-and-build-questionnaire/');
}
