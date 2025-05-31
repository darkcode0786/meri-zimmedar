import Link from "next/link"
import { Shield, Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer  className="bg-white ">
      <div className="w-full h-full bg-blue-500 rounded-t-2xl p-10">
        <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
          <Image
          src={"/img/white-logo.png"}
          width={600} 
          height={300}
          alt="app logo"
          />
        </Link>
            </div>
            <p className="text-white">Protecting your legacy with advanced security and peace of mind.</p>
            {/* <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-black transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div> */}
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/"  className="text-white hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#what-we-do"  className="text-white hover:text-black transition-colors">
                  What We Do?
                </Link>
              </li>
              <li>
                <Link href="#section-how"  className="text-white hover:text-black transition-colors">
                  How We Do?
                </Link>
              </li>
              <li>
                <Link href="#faq"  className="text-white hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Legal & Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#"  className="text-white hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#"  className="text-white hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#"   className="text-white hover:text-black transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#"  className="text-white hover:text-black transition-colors">
                  Cookie Policy
                </Link>
              </li> 
            </ul>
          </div>

          {/* <div>
            <h3 className="font-bold text-lg mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#"   className="text-white hover:text-black transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#"   className="text-white hover:text-black transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="#"   className="text-white hover:text-black transition-colors">
                  Live Chat
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 text-white">Office</h3>
            <p className=" text-sm mb-4 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, modi.</p>
           
            <div className="space-x-2  text-white flex ">
              <Phone className="text-white" />
              <span>+919987600000</span>
            </div>
            <div className="space-x-2  text-white flex">
              <Mail />
              <span>info@merizimmedari.com</span>
            </div>
           
          </div>
        </div>

        <div className="border-t mx-auto pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Meri Zimmedari. All rights reserved. <Link className=" hover:text-blue-800" href={"https://www.cssfounder.com/"}>Designed By Css Founder</Link>
            </p>
            {/* <div className="flex space-x-4 text-sm text-white">
              <Link href="#" className="hover:text-black transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Cookies
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
