import Footer from "@/components/footer";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-w-full min-h-screen flex flex-col">
      <div className="w-full h-full pt-16 md:px-0 px-6">{children}</div>
      <Footer />
    </main>
  );
}
