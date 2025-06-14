import { Mail, Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  
  return (
    <footer className="bg-[#f0f0f0] text-black">
      
      <div className="bg-black text-white px-6 py-12 md:px-20 lg:px-32 xl:px-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <div className="relative w-full md:w-96">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full px-5 py-3 pl-10 text-black bg-white outline-none"
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              type="submit"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

    
      <div className="px-6 py-12 md:px-20 lg:px-32 xl:px-40">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
        
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-2xl font-extrabold">SHOP.CO</h3>
            <p className="text-sm text-gray-600">
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
            <div className="flex gap-4 mt-4">
              <Facebook size={20} className="cursor-pointer hover:text-gray-400 transition-colors" />
              <Twitter size={20} className="cursor-pointer hover:text-gray-400 transition-colors" />
              <Instagram size={20} className="cursor-pointer hover:text-gray-400 transition-colors" />
            </div>
          </div>

 
          <div>
            <h4 className="font-bold mb-4 text-lg">COMPANY</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition-colors">About</li>
              <li className="hover:text-black cursor-pointer transition-colors">Features</li>
              <li className="hover:text-black cursor-pointer transition-colors">Works</li>
              <li className="hover:text-black cursor-pointer transition-colors">Career</li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-bold mb-4 text-lg">HELP</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition-colors">Customer Support</li>
              <li className="hover:text-black cursor-pointer transition-colors">Delivery Details</li>
              <li className="hover:text-black cursor-pointer transition-colors">Terms &amp; Conditions</li>
              <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">FAQ</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition-colors">Account</li>
              <li className="hover:text-black cursor-pointer transition-colors">Manage Deliveries</li>
              <li className="hover:text-black cursor-pointer transition-colors">Orders</li>
              <li className="hover:text-black cursor-pointer transition-colors">Payments</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">RESOURCES</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition-colors">Free eBooks</li>
              <li className="hover:text-black cursor-pointer transition-colors">Development Tutorial</li>
              <li className="hover:text-black cursor-pointer transition-colors">How to - Blog</li>
              <li className="hover:text-black cursor-pointer transition-colors">Youtube Playlist</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 px-6 py-6 md:px-20 lg:px-32 xl:px-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-600">
            Shop.co © 2000-2023, All Rights Reserved
          </span>
          <div className="flex gap-2 flex-wrap justify-center">
            <Image src="/icons/visa.svg" alt="Visa" width={40} height={24} className="h-6 w-auto" />
            <Image src="/icons/mc.svg" alt="MasterCard" width={40} height={24} className="h-6 w-auto" />
            <Image src="/icons/paypal.svg" alt="PayPal" width={40} height={24} className="h-6 w-auto" />
            <Image src="/icons/apple.svg" alt="Apple Pay" width={40} height={24} className="h-6 w-auto" />
            <Image src="/icons/gpay.svg" alt="Google Pay" width={40} height={24} className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}