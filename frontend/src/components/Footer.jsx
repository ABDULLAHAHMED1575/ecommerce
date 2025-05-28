import { MapPin, Phone, Mail, Heart, Sparkles, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 text-white py-16 mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300">
                ShopVerse
              </h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              Your trusted online shopping destination for quality products at great prices.
            </p>
            <div className="flex items-center gap-2 text-violet-300">
              <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
              <span className="text-sm font-semibold">Crafted with passion</span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Products', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 text-lg font-medium"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              Contact Info
            </h3>
            <div className="space-y-5">
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Location</p>
                  <p className="text-slate-300 font-medium">Taxila, Pakistan</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Phone</p>
                  <p className="text-slate-300 font-medium">+92 326 9879070</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Email</p>
                  <p className="text-slate-300 font-medium">abdullahmed1575@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-16 pt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300">
                ShopVerse
              </span>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-slate-400 text-lg font-medium">
              &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
            </p>
            <p className="text-violet-400 text-sm mt-2 font-medium">
              Designed with ❤️ for the future of shopping
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;