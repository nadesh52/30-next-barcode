import { BarcodeProvider } from "@/contexts/BarcodeContext";
import { PageSetupProvider } from "@/contexts/SetupContext";
import "@/styles/globals.css";

export const metadata = {
  title: "Barcode",
  description: "Generated by Next.js",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="dim">
      <body>
        <PageSetupProvider>
          <BarcodeProvider>{children}</BarcodeProvider>
        </PageSetupProvider>
      </body>
    </html>
  );
}
