import Main_Layout from '@/components/layouts/main_layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Main_Layout>{children}</Main_Layout>
}
