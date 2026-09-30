import "./globals.css";

export const metadata = { title: "thalvior", description: "跨境电商经营操作系统" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
