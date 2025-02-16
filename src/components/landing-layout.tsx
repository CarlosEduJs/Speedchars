type LandingLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  id: string;
};

export default function LandingLayoutSection({
  title,
  description,
  children,
  id,
}: LandingLayoutProps) {
  return (
    <section
      id={id}
      className="flex flex-col gap-6 max-w-7xl mx-auto my-12 items-center max-md:px-6"
    >
      <h1 className="text-4xl font-bold max-w-2xl text-center">{title}</h1>
      <p className="text-xl text-muted-foreground sm:max-w-lg lg:max-w-2xl text-center">
        {description}
      </p>
      {children}
    </section>
  );
}

