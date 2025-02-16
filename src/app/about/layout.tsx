import AsideAbout from "@/components/aside-about";
import Footer from "@/components/footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col md:flex-row gap-5 w-screen p-8">
        <AsideAbout />
        {children}
      </div>
      <Footer />
    </main>
  );
}
