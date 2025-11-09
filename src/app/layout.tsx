import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster
              position="top-center"
              richColors={true}
              closeButton={true}
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
