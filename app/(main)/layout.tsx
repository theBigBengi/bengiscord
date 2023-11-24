import type { Metadata } from "next";

import { NavigationSidebar } from "./_components/navigation-sidebar";

// export const metadata: Metadata = {
//   title: "Bengicord",
//   description: "",
// };

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='h-full'>
      <aside className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
        <NavigationSidebar />
      </aside>
      <section className='md:pl-[72px] h-full'>{children}</section>
    </main>
  );
}
