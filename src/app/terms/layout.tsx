import AsideTerms from "@/components/aside-terms";
import Footer from "@/components/footer";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col md:flex-row gap-5 w-screen p-8">
        <AsideTerms />
        {children}
      </div>
      <Footer />
    </main>
  );
}
