"use client"

 
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, X, MapPin, Menu, Mail, Phone } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet" 
 
 
export function Header() {
  
  return (
    <header 
     
     className="fixed  w-full top-0 h-25 z-40 border-b bg-white/80 backdrop-blur-md px-6">
      <div className="container flex h-full items-center justify-between py-4 mx-auto">
        {/* Left side: Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 w-40 overflow-hidden">
            <Link  href="/" className="w-full h-full">
              <Image src="/img/logo2.png" alt="app logo" width={150} height={50} priority className="object-cover " />
            </Link>
          </div>

          {/* Mobile Menu Trigger -   aligned right in mobile */}
          <Sheet>
            <SheetTrigger className="md:hidden ml-auto p-2 rounded-lg border border-gray-200 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-white">
              <div className="flex items-center gap-2 w-40 overflow-hidden">
                <Image src="/img/logo.png" alt="Modern apartment building" width={200} height={120} priority
                  className="object-cover pl-3 pt-3" />
              </div>

              


              <div className="flex flex-col space-y-6 p-10">
                <Link  href="#what-we-do" className="text-sm font-medium hover:text-primary">
                  What We Do?
                </Link>
                <Link  href="#section-how" className="text-sm font-medium hover:text-primary">
                  How We Do?
                </Link>
                {/* <Link  href="#why-us" className="text-sm font-medium hover:text-primary">
                  Why Choose Us
                </Link> */}
                <Link  href="#faq" className="text-sm font-medium hover:text-primary">
                  FAQ
                </Link>
                <Link  href="#contact" className="text-sm font-medium hover:text-primary">
                  Contact
                </Link>

              </div>
              <div className="p-6">
                <h3 className="font-bold mb-4">Contact Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="min-h-4 min-w-4 mr-2 mt-1 text-primary" />
                    <span className="text-sm text-muted-foreground text-justify">
                      Adress of merizindagi
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <div className="flex items-center flex-col">
                      <span className="text-sm text-muted-foreground">+91 1234567890</span>
                      <span className="text-sm text-muted-foreground">+91 1234567890</span>
                    </div>
                  </li>
                  <li className="flex items-center ">
                    <Mail className="min-h-4 min-w-4 mr-2 text-primary" />
                    <span className="text-sm text-muted-foreground">xyz@gmail.com</span>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 hover-group">
          <Link  href="#what-we-do" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            What We Do?
          </Link>
          <Link  href="#section-how" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            How We Do?
          </Link>
          {/* <Link  href="#why-us" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            Why Choose Us
          </Link> */}
          <Link  href="#faq" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            FAQ
          </Link>
          <Link  href="#contact" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Desktop Contact Button */}

        <div className="hidden md:flex items-center gap-4">

          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button> 
 
        </div>
      </div>
    </header>
  )
}
