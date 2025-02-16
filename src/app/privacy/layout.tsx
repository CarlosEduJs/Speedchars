import AsidePrivacy from "@/components/aside-privacy";
import Footer from "@/components/footer";

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col md:flex-row gap-5 w-screen p-8">
        <AsidePrivacy />
        {children}
      </div>
      <Footer />
    </main>
  );
}
