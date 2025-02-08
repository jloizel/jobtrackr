import type { Metadata } from "next";
import "./globals.css";
import "./calendar.css"
import { ThemeProvider } from '../utils/theme'
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/navbar/navbar";
import { ConditionalNavbar, ConditionalFooter } from "./conditionalRender";
import Footer from "@/components/footer/footer";
import CreditBar from "@/components/creditBar/creditBar";
import { GA } from "@/components/GA/GA";

export const metadata: Metadata = {
  title: "JobTrackr",
  description: "Organise your job applications with an easy to use tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <title>JobTrackr</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="icon" href="https://jobtrackr.co.uk/favicon.ico" type="image/x-icon"/>
      <link rel="shortcut icon" href="https://jobtrackr.co.uk/favicon.ico" type="image/x-icon"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <meta name="keywords" content="job, tracker, organise, applications, jobtrackr, job tracker"/>
      <meta name="description" content="Organise your job applications with an easy to use tracker"/>
      <meta name="author" content="Jack Loizel"/>

      {/* <!-- Open Graph tags --> */}
      <meta property="og:title" content="JobTrackr"/>
      <meta property="og:description" content="Organise your job applications with an easy to use tracker"/>
      <meta property="og:url" content="https://jobtrackr.co.uk/?"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://jobtrackr.co.uk/share.png"/>
      <meta property="og:image:secure_url" content="https://jobtrackr.co.uk/share.png"/>
      <meta property="og:image:alt" content="JobTraclr"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>

      {/* <!-- Twitter Card tags --> */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="JobTrackr"/>
      <meta name="twitter:description" content="Organise your job applications with an easy to use tracker"/>
      <meta name="twitter:site" content="https://jobtrackr.co.uk/?"/>
      <meta name="twitter:image" content="https://jobtrackr.co.uk/share.png"/>
      <meta name="twitter:image:alt" content="JobTrackr"/>      

      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className="container">
                <ConditionalNavbar />
                <div className="wrapper">
                  {children}   
                   <ConditionalFooter/>
                </div>
            </div>
            <CreditBar/>
            <GA/>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
