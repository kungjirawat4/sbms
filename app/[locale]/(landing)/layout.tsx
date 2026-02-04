import Center_Layout from "@/components/layouts/center_layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Center_Layout>{children}</Center_Layout>;
}
