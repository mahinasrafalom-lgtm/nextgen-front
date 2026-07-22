import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, PackageOpen } from 'lucide-react';
import api from '../api/client.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const price = (value) => `৳ ${Number(value || 0).toLocaleString('en-US')}`;
const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  shipped: 'bg-violet-100 text-violet-800',
  delivered: 'bg-green-100 text-green-800'
};

export default function Orders() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const label = (bn, en) => (language === 'bn' ? bn : en);

  useEffect(() => {
    api.get('/orders/mine').then(({ data }) => setOrders(data)).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  const statusLabel = (status) => ({
    pending: label('অপেক্ষমাণ', 'Pending'),
    confirmed: label('নিশ্চিত', 'Confirmed'),
    shipped: label('পাঠানো হয়েছে', 'Shipped'),
    delivered: label('ডেলিভারড', 'Delivered')
  }[status] || status);

  const date = (value) => (value ? new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : '');

  if (loading) return <main className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin text-primary" size={30} /></main>;

  return (
    <main className="page-container section-space">
      <h1 className="section-heading">{label('আমার অর্ডার', 'My orders')}</h1>
      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-12 text-center shadow-card">
          <PackageOpen className="mx-auto text-zinc-300" size={48} />
          <p className="mt-3 font-semibold text-zinc-600">{label('এখনো কোনো অর্ডার নেই।', 'No orders yet.')}</p>
          <Link to="/shop" className="btn-primary mt-5 inline-block">{label('শপে যান', 'Go to shop')}</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div>
                  <p className="font-bold text-zinc-900">#{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-zinc-500">{date(order.createdAt)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status] || 'bg-zinc-100'}`}>{statusLabel(order.status)}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-zinc-600">
                    <span className="line-clamp-1">{item.product?.name || label('পণ্য', 'Item')} × {item.qty}</span>
                    <span className="font-semibold">{price(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-zinc-100 pt-3 font-bold">
                <span>{label('মোট', 'Total')}</span>
                <span className="text-green-800">{price(order.totalAmount)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
