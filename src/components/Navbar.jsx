import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bird,
  Cat,
  ChevronRight,
  Dog,
  Fish,
  Gamepad2,
  Headphones,
  HeartPulse,
  LogOut,
  Menu,
  MoreHorizontal,
  PackageOpen,
  PawPrint,
  Pill,
  Rabbit,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Tags,
  UserRound,
  Utensils,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import { site } from '../config/site.js';

const productName = (product, language) => language === 'bn' ? product.banglaName || product.name : product.name;

const catalogueItems = [
  ['food', Utensils, 'খাবার', 'Food'],
  ['medicine', Pill, 'মেডিসিন', 'Medicine'],
  ['toys', Gamepad2, 'খেলনা', 'Toys'],
  ['supplements', HeartPulse, 'সাপ্লিমেন্ট', 'Supplements'],
  ['accessories', PackageOpen, 'এক্সেসরিজ', 'Accessories']
];

export default function Navbar({ products, onOpenCart }) {
  const { count } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { language, t } = useLanguage();
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';

  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const catalogueRef = useRef(null);

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products.slice(0, 4);
    return products.filter((product) =>
      `${product.name} ${product.banglaName} ${product.brand} ${product.category}`.toLowerCase().includes(query)
    ).slice(0, 6);
  }, [products, search]);

  useEffect(() => {
    const handler = (event) => {
      if (!searchRef.current?.contains(event.target)) setFocused(false);
      if (!catalogueRef.current?.contains(event.target)) setCatalogueOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    navigate(search.trim() ? `/shop?search=${encodeURIComponent(search.trim())}` : '/shop');
    setFocused(false);
    setMenuOpen(false);
  }

  const chooseProduct = (product) => {
    navigate(`/product/${product._id}`);
    setSearch('');
    setFocused(false);
  };

  const links = [['/', t('home')], ['/shop', t('shop')], ['/#about', t('about')]];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm flex flex-col">
      {/* Tier 1 - Top Bar */}
      <div className="top-bar bg-violet-700 bg-gradient-to-r from-violet-800 to-violet-600 text-white text-xs hidden md:block">
        <div className="page-container flex h-9 items-center justify-between">
          <span className="marquee-text font-medium truncate">
            {language === 'bn' ? '🐾 নিয়মিত অনলাইন পেট টিপস — আপনার পোষা প্রাণীর সেবা যত্ন নিন' : '🐾 Regular online pet tips — take care of your beloved pets'}
          </span>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.hotlineHref}`} className="flex items-center gap-2 hover:text-violet-200 transition-colors">
              <Headphones size={14} className="text-yellow-300" />
              <span className="font-bold">{site.hotline}</span>
            </a>
            <Link to="/contact" className="hover:text-violet-200 transition-colors font-semibold">
              {language === 'bn' ? 'সাপোর্ট' : 'Support'}
            </Link>
            <LanguageToggle compact />
          </div>
        </div>
      </div>

      {/* Tier 2 - Main Header */}
      <div className="site-header border-b border-violet-100">
        <div className="page-container flex min-h-[70px] items-center gap-4 py-3">
          <button className="icon-button md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="NexGen Veterinary home">
            <span className="brand-mark bg-violet-100 text-violet-700 p-1.5 rounded-full">
              <PawPrint size={26} strokeWidth={2.5} />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-lg font-black tracking-tight text-zinc-900">NexGen Veterinary</span>
              <span className="mt-1 block text-[10px] font-bold tracking-[.15em] text-violet-500 uppercase">Happy Pets, Healthy Lives</span>
            </span>
          </Link>

          <form ref={searchRef} onSubmit={submitSearch} className="nav-search-wrap relative hidden flex-1 max-w-3xl md:flex items-center mx-auto border-2 border-violet-600 rounded-full bg-white">
            <div className="relative h-full flex items-center" ref={catalogueRef}>
              <button 
                type="button"
                onClick={() => setCatalogueOpen((open) => !open)} 
                className="nav-search-category h-full px-4 text-sm font-semibold text-zinc-700 hover:text-violet-700 flex items-center gap-1 border-r border-gray-200"
                aria-expanded={catalogueOpen}
              >
                {language === 'bn' ? 'সব বিভাগ' : 'All categories'}
              </button>
              
              {catalogueOpen && (
                <div className="catalogue-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-violet-100 z-50">
                  <div className="flex items-center justify-between border-b border-violet-100 px-4 py-3">
                    <span className="text-sm font-black text-zinc-900">{language === 'bn' ? 'যা প্রয়োজন, দ্রুত বেছে নিন' : 'Choose what you need'}</span>
                    <Sparkles size={17} className="text-pink-500" />
                  </div>
                  <div className="grid gap-1 p-2">
                    {catalogueItems.map(([key, Icon, bn, en]) => (
                      <Link 
                        key={key} 
                        to={`/shop?subCategory=${key}`} 
                        onClick={() => setCatalogueOpen(false)} 
                        className="catalogue-menu-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-violet-50"
                      >
                        <span className="catalogue-menu-icon"><Icon size={18} className="text-violet-600" /></span>
                        <span className="flex-1">{language === 'bn' ? bn : en}</span>
                        <ChevronRight size={15} className="text-violet-400" />
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to="/shop" 
                    onClick={() => setCatalogueOpen(false)} 
                    className="mx-2 mb-2 flex items-center justify-center gap-1 rounded-lg bg-violet-50 py-2 text-xs font-bold text-violet-700 hover:bg-violet-100"
                  >
                    {language === 'bn' ? 'সব পণ্য দেখুন' : 'See all products'} <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            <input 
              value={search} 
              onChange={(event) => setSearch(event.target.value)} 
              onFocus={() => setFocused(true)} 
              className="nav-search-input flex-1 h-11 px-4 text-sm outline-none bg-transparent" 
              placeholder={t('search')} 
              aria-label={t('search')} 
            />
            
            <button type="submit" className="nav-search-btn h-full px-6 bg-violet-700 text-white rounded-r-full hover:bg-violet-800 transition-colors flex items-center justify-center">
              <Search size={20} />
            </button>

            {focused && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-violet-100 bg-white p-2 shadow-[0_20px_50px_rgba(80,55,160,.16)]">
                <div className="flex items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-violet-400">
                  <span>{t('searchResults')}</span>
                  <span>{suggestions.length}</span>
                </div>
                {suggestions.length ? suggestions.map((product) => (
                  <button type="button" key={product._id} className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-violet-50" onMouseDown={() => chooseProduct(product)}>
                    <img className="h-11 w-11 rounded-lg object-cover ring-1 ring-violet-100" src={product.images?.[0]} alt="" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-zinc-800">{productName(product, language)}</span>
                      <span className="block text-xs text-zinc-500">{product.brand} · ৳ {Number(product.price).toLocaleString('en-US')}</span>
                    </span>
                    <ChevronRight className="text-violet-500 opacity-0 transition group-hover:opacity-100" size={17} />
                  </button>
                )) : (
                  <p className="p-5 text-center text-sm text-zinc-500">{language === 'bn' ? 'কোনো মিল পাওয়া যায়নি।' : 'No matching products found.'}</p>
                )}
                <button type="submit" className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl bg-violet-50 py-2 text-sm font-bold text-violet-700 hover:bg-violet-100">
                  {t('allResults')} <ChevronRight size={15} />
                </button>
              </div>
            )}
          </form>

          <div className="ml-auto flex items-center gap-2 md:gap-4 shrink-0">
            <button className="nav-icon-btn hidden lg:flex flex-col items-center gap-1 text-zinc-600 hover:text-violet-700">
              <SlidersHorizontal size={22} />
              <span className="nav-icon-btn-label text-[10px] font-bold">{language === 'bn' ? 'ফিল্টার' : 'Filter'}</span>
            </button>

            {user ? (
              <div className="relative group hidden lg:flex flex-col items-center gap-1 text-zinc-600 cursor-pointer">
                <Link to={isAdmin ? adminUrl : "/orders"} className="flex flex-col items-center hover:text-violet-700">
                  <UserRound size={22} />
                  <span className="nav-icon-btn-label text-[10px] font-bold">{language === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}</span>
                </Link>
                <div className="absolute top-full right-0 mt-2 hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-xl w-40 z-50 overflow-hidden">
                  <Link to={isAdmin ? adminUrl : "/orders"} className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-violet-50">
                    {isAdmin ? (language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin panel') : (language === 'bn' ? 'আমার অর্ডার' : 'My orders')}
                  </Link>
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} />
                    {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-icon-btn hidden lg:flex flex-col items-center gap-1 text-zinc-600 hover:text-violet-700">
                <UserRound size={22} />
                <span className="nav-icon-btn-label text-[10px] font-bold">{language === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}</span>
              </Link>
            )}

            <button onClick={onOpenCart} className="nav-icon-btn flex flex-col items-center gap-1 text-zinc-600 hover:text-violet-700 relative" aria-label={t('cart')}>
              <div className="relative">
                <ShoppingCart size={22} />
                {count > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white border-2 border-white">{count}</span>}
              </div>
              <span className="nav-icon-btn-label text-[10px] font-bold hidden lg:block">{language === 'bn' ? 'কার্ট' : 'Cart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3 - Category Bar */}
      <div className="category-bar hidden md:block bg-white">
        <div className="page-container flex items-center justify-between gap-4 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6">
            <Link to="/shop?category=Cat" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Cat size={18} className="text-violet-500" />
              {language === 'bn' ? 'বিড়াল' : 'Cat'}
            </Link>
            <Link to="/shop?category=Dog" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Dog size={18} className="text-violet-500" />
              {language === 'bn' ? 'কুকুর' : 'Dog'}
            </Link>
            <Link to="/shop?category=Bird" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Bird size={18} className="text-violet-500" />
              {language === 'bn' ? 'পাখি' : 'Bird'}
            </Link>
            <Link to="/shop?category=Fish" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Fish size={18} className="text-violet-500" />
              {language === 'bn' ? 'মাছ' : 'Fish'}
            </Link>
            <Link to="/shop?category=Exotic" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Rabbit size={18} className="text-violet-500" />
              {language === 'bn' ? 'পোষা পশু' : 'Exotic'}
            </Link>
            <Link to="/shop?category=Goat" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <span className="text-lg leading-none">🐐</span>
              {language === 'bn' ? 'ছাগল' : 'Goat'}
            </Link>
            <Link to="/shop?category=Medicine" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <Pill size={18} className="text-violet-500" />
              {language === 'bn' ? 'ওষুধ' : 'Medicine'}
            </Link>
            <Link to="/brands" className="category-bar-link flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-violet-700 whitespace-nowrap transition-colors">
              <PackageOpen size={18} className="text-violet-500" />
              {language === 'bn' ? 'ব্র্যান্ড' : 'Brands'}
            </Link>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 pl-4 border-l border-violet-100">
             <Link to="/shop" className="category-bar-more flex items-center gap-1 text-sm font-bold text-violet-700 hover:text-violet-800 bg-violet-50 px-3 py-1.5 rounded-full transition-colors">
              <MoreHorizontal size={16} />
              {language === 'bn' ? 'আরও' : 'More'}
            </Link>
            <Link to="/consultation" className="free-care-nav-link flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700 bg-pink-50 px-3 py-1.5 rounded-full transition-colors">
              <Stethoscope size={16} />
              {language === 'bn' ? 'ফ্রি চিকিৎসা' : 'Free Care'}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-violet-100 bg-white px-4 py-4 shadow-lg md:hidden overflow-y-auto max-h-[calc(100vh-70px)]">
          <form onSubmit={submitSearch} className="mb-4 flex overflow-hidden rounded-xl border-2 border-violet-500 bg-white">
            <input 
              value={search} 
              onChange={(event) => setSearch(event.target.value)} 
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-zinc-800 outline-none" 
              placeholder={t('search')} 
            />
            <button className="px-4 bg-violet-600 text-white flex items-center justify-center" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          <div className="grid gap-1 mb-4">
            <div className="px-2 py-1 text-xs font-bold text-zinc-400 uppercase tracking-wider">{language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</div>
            {catalogueItems.map(([key, Icon, bn, en]) => (
              <Link onClick={() => setMenuOpen(false)} key={key} to={`/shop?subCategory=${key}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-violet-50">
                <Icon size={18} className="text-violet-600" />
                {language === 'bn' ? bn : en}
              </Link>
            ))}
          </div>

          <div className="grid gap-1 mb-4">
            <div className="px-2 py-1 text-xs font-bold text-zinc-400 uppercase tracking-wider">{language === 'bn' ? 'পেট প্রকার' : 'Pet Types'}</div>
            <Link onClick={() => setMenuOpen(false)} to="/shop?category=Cat" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-violet-50"><Cat size={18} className="text-violet-500"/> {language === 'bn' ? 'বিড়াল' : 'Cat'}</Link>
            <Link onClick={() => setMenuOpen(false)} to="/shop?category=Dog" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-violet-50"><Dog size={18} className="text-violet-500"/> {language === 'bn' ? 'কুকুর' : 'Dog'}</Link>
            <Link onClick={() => setMenuOpen(false)} to="/shop?category=Bird" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-violet-50"><Bird size={18} className="text-violet-500"/> {language === 'bn' ? 'পাখি' : 'Bird'}</Link>
            <Link onClick={() => setMenuOpen(false)} to="/shop?category=Fish" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-violet-50"><Fish size={18} className="text-violet-500"/> {language === 'bn' ? 'মাছ' : 'Fish'}</Link>
          </div>
          
          <div className="grid gap-1">
            <div className="my-2 border-t border-violet-100" />
            {links.map(([to, label]) => (
              <NavLink onClick={() => setMenuOpen(false)} key={to} to={to} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-violet-50">
                {label}
              </NavLink>
            ))}
            <NavLink onClick={() => setMenuOpen(false)} to="/consultation" className="mt-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white flex items-center justify-center gap-2">
              <Stethoscope size={18} />
              {language === 'bn' ? 'বিনামূল্যে ডাক্তার সেবা' : 'Free doctor service'}
            </NavLink>
            
            <div className="my-2 border-t border-violet-100" />
            
            {user ? (
              <>
                <NavLink onClick={() => setMenuOpen(false)} to={isAdmin ? adminUrl : "/orders"} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-violet-50 flex items-center gap-2">
                  <UserRound size={18} className="text-violet-500" />
                  {isAdmin ? (language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin panel') : (language === 'bn' ? 'আমার অর্ডার' : 'My orders')}
                </NavLink>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 text-left w-full">
                  <LogOut size={18} />
                  {t('logout')}
                </button>
              </>
            ) : (
              <NavLink onClick={() => setMenuOpen(false)} to="/login" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 flex items-center gap-2">
                <UserRound size={18} />
                {t('login')}
              </NavLink>
            )}
            
            <div className="mt-4 flex items-center justify-between px-3">
              <span className="text-sm font-semibold text-zinc-700">{language === 'bn' ? 'ভাষা পরিবর্তন:' : 'Change Language:'}</span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
