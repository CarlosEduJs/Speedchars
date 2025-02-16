interface BlockForAsidesForPagesLayoutProps {
  children: React.ReactNode;
  page: string;
}

export default function BlockForAsidesForPagesLayout({
  children,
  page,
}: BlockForAsidesForPagesLayoutProps) {
  return (
    <div className="w-full flex flex-col gap-12 py-3 max-w-screen-md">
      <h1 className="text-2xl font-bold">{page}</h1>
      <div className="flex flex-col gap-32">{children}</div>
    </div>
  );
}
