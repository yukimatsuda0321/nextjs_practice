import PrivateHeader from "@/components/layouts/PrivateHeader";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PrivateHeader />

    </div>
  )
}