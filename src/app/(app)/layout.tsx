import Header from "@/components/layout/Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-3.5rem)]">{children}</main>
    </>
  );
};

export default AppLayout;
