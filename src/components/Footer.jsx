import { Facebook, Mail, MapPin, MessageSquareHeart, PawPrint, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../config/site.js';

export default function Footer() {
  return (
    <footer id="about" className="mt-10 bg-green-950 text-green-100">
      {/* Free consultation highlight strip */}
      <div className="bg-green-900">
        <div className="page-container flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-700 text-white"><MessageSquareHeart size={22} /></span>
            <div>
              <p className="font-bold text-white">বিনামূল্যে অনলাইন ভেট চ্যাট</p>
              <p className="text-sm text-green-200">আবেদন করুন, আমাদের ডাক্তার চ্যাটে যুক্ত দেবেন — সম্পূর্ণ ফ্রি।</p>
            </div>
          </div>
          <Link to="/consultation" className="rounded-xl bg-primary px-5 py-2.5 font-bold text-zinc-900 transition hover:bg-secondary">ফ্রি পরামর্শ শুরু করুন</Link>
        </div>
      </div>

      <div className="page-container grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white"><PawPrint size={30} /> {site.name}</Link>
          <p className="mt-4 text-sm text-green-200">পোষা প্রাণীর সুস্থতার জন্য বিনামূল্যে ডাক্তার পরামর্শ ও বিশ্বস্ত পণ্য—সব এক জায়গায়।</p>
        </div>
        <FooterList title="ফ্রি সেবা" links={[['/consultation', 'ফ্রি ভেট চ্যাট'], ['/consultation/apply', 'নতুন আবেদন'], ['/shop', 'পেট শপ']]} />
        <FooterList title="কুইক লিংক" links={[['/', 'হোম'], ['/shop', 'শপ'], ['/orders', 'আমার অর্ডার'], ['/login', 'আমার অ্যাকাউন্ট']]} />
        <div>
          <h3 className="font-bold text-white">যোগাযোগ</h3>
          <div className="mt-3 space-y-2 text-sm text-green-200">
            <p className="flex gap-2"><Phone size={16} />{site.hotline}</p>
            <p className="flex gap-2"><Mail size={16} />{site.email}</p>
            <p className="flex gap-2"><MapPin size={16} />{site.address}</p>
          </div>
          <div className="mt-4 flex gap-3"><a href="#about" aria-label="Facebook"><Facebook /></a><a href="#about" aria-label="YouTube"><Youtube /></a></div>
        </div>
      </div>
      <div className="border-t border-green-800 py-4 text-center text-xs text-green-300">© {new Date().getFullYear()} {site.name}. All Rights Reserved.</div>
    </footer>
  );
}

function FooterList({ title, links }) {
  return (
    <div>
      <h3 className="font-bold text-white">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-green-200">
        {links.map(([to, name]) => <Link className="block hover:text-secondary" to={to} key={name}>{name}</Link>)}
      </div>
    </div>
  );
}
