import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from '@/context/auth';
import { Toaster } from "react-hot-toast";
import BasicExample from '@/components/Headerone';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Answers to Anything',
  description: 'Answers to Anything',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* <Header /> */}
       
       <AuthProvider>
       <Toaster/>
       <BasicExample/>
    
        {children}
       
        <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
