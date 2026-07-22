const image = 'https://placehold.co/600x520/f0f0f0/333?text=PetCare+BD';
const list = [
  ['Royal Canin Adult Cat Food 2kg', 'রয়্যাল ক্যানিন অ্যাডাল্ট ক্যাট ফুড', 1850, 2100, 'cat', 'food', 'Royal Canin'], ['Whiskas Tuna Wet Food 85g', 'হুইস্কাস টুনা ওয়েট ফুড', 65, 0, 'cat', 'food', 'Whiskas'], ['Me-O Persian Cat Food 1.1kg', 'মি-ও পার্সিয়ান ক্যাট ফুড', 750, 0, 'cat', 'food', 'Me-O'], ['Reflex Plus Adult Cat Food 1.5kg', 'রিফ্লেক্স প্লাস ক্যাট ফুড', 1240, 1380, 'cat', 'food', 'Reflex'],
  ['Cozy Cat Carrier Bag', 'কোজি ক্যাট ক্যারিয়ার ব্যাগ', 1450, 1650, 'cat', 'accessories', 'Paws'], ['Adjustable Cat Collar with Bell', 'অ্যাডজাস্টেবল ক্যাট কলার', 180, 0, 'cat', 'accessories', 'Paws'], ['Stainless Steel Cat Bowl', 'স্টেইনলেস স্টিল ক্যাট বোল', 290, 350, 'cat', 'accessories', 'Paws'], ['Comfort Soft Cat Harness', 'সফট ক্যাট হারনেস', 420, 0, 'cat', 'accessories', 'Paws'],
  ['Interactive Feather Wand Toy', 'ইন্টারঅ্যাকটিভ ফেদার টয়', 250, 0, 'cat', 'toys', 'Paws'], ['Catnip Plush Mouse Set', 'ক্যাটনিপ মাউস টয় সেট', 330, 390, 'cat', 'toys', 'Paws'], ['Rolling Treat Ball for Cats', 'রোলিং ট্রিট বল', 420, 0, 'cat', 'toys', 'Paws'], ['Scratch & Play Cardboard Pad', 'স্ক্র্যাচ অ্যান্ড প্লে প্যাড', 510, 0, 'cat', 'toys', 'Paws'],
  ['Cat Multivitamin Gel 100g', 'ক্যাট মাল্টিভিটামিন জেল', 540, 620, 'cat', 'medicine', 'Bioline'], ['Cat Deworming Tablet', 'ক্যাট ডিওয়ার্মিং ট্যাবলেট', 190, 0, 'cat', 'medicine', 'PetCare'],
  ['Pedigree Adult Dog Food 3kg', 'পেডিগ্রি অ্যাডাল্ট ডগ ফুড', 1200, 0, 'dog', 'food', 'Pedigree'], ['SmartHeart Puppy Food 1.5kg', 'স্মার্টহার্ট পাপি ফুড', 680, 760, 'dog', 'food', 'SmartHeart'], ['Royal Canin Mini Adult 2kg', 'রয়্যাল ক্যানিন মিনি অ্যাডাল্ট', 2050, 2300, 'dog', 'food', 'Royal Canin'], ['Drools Chicken & Egg 3kg', 'ড্রুলস চিকেন অ্যান্ড এগ', 890, 0, 'dog', 'food', 'Drools'],
  ['Durable Dog Leash & Collar Set', 'ডগ লিশ এবং কলার সেট', 560, 640, 'dog', 'accessories', 'Paws'], ['Foldable Travel Water Bowl', 'ফোল্ডেবল ট্রাভেল বোল', 230, 0, 'dog', 'accessories', 'Paws'], ['Paw Print Dog Bed Medium', 'প-প্রিন্ট ডগ বেড', 1750, 1990, 'dog', 'accessories', 'Paws'], ['Dog Grooming Brush', 'ডগ গ্রুমিং ব্রাশ', 320, 0, 'dog', 'accessories', 'Paws'],
  ['Dog Joint Care Supplement', 'ডগ জয়েন্ট কেয়ার সাপ্লিমেন্ট', 790, 0, 'dog', 'medicine', 'Himalaya'], ['Dog Tick & Flea Solution', 'ডগ টিক অ্যান্ড ফ্লি সল্যুশন', 450, 520, 'dog', 'medicine', 'Bioline'],
  ['Premium Parrot Seed Mix 1kg', 'প্রিমিয়াম প্যারট সিড মিক্স', 390, 0, 'bird', 'food', 'Vitapol'], ['Bird Cage Water Feeder', 'বার্ড কেজ ওয়াটার ফিডার', 160, 190, 'bird', 'accessories', 'Vitapol'], ['Canary Nesting Material', 'ক্যানারি নেস্টিং ম্যাটেরিয়াল', 210, 0, 'bird', 'accessories', 'Vitapol'], ['Vitamin Drops for Birds 30ml', 'বার্ড ভিটামিন ড্রপস', 280, 0, 'bird', 'accessories', 'Vitapol'],
  ['Goldfish Flakes Food 100g', 'গোল্ডফিশ ফ্লেকস ফুড', 290, 0, 'fish', 'food', 'Tetra'], ['Aqua Filter Pump 15W', 'অ্যাকুয়া ফিল্টার পাম্প', 980, 1120, 'fish', 'accessories', 'Tetra'], ['Aquarium Water Conditioner 100ml', 'অ্যাকুয়ারিয়াম কন্ডিশনার', 350, 0, 'fish', 'accessories', 'Tetra'], ['Colorful Aquarium Gravel 1kg', 'কালারফুল অ্যাকুয়ারিয়াম গ্র্যাভেল', 220, 0, 'fish', 'accessories', 'Tetra']
];

export const fallbackProducts = list.map(([name, banglaName, price, originalPrice, category, subCategory, brand], index) => ({
  _id: `demo-${index + 1}`, name, banglaName, price, originalPrice: originalPrice || null,
  discount: originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0,
  category, subCategory, brand, images: [image], stock: 30, rating: { average: 4.6, count: 12 + index },
  description: `${banglaName} আপনার পোষা প্রাণীর জন্য একটি মানসম্পন্ন পণ্য।`, isFeatured: index < 8
}));

export const sectionDefinitions = [
  ['Cat Food', 'বিড়ালের খাবার', 'cat', 'food'], ['Cat Accessories', 'বিড়ালের এক্সেসরিজ', 'cat', 'accessories'], ['Cat Toys', 'বিড়ালের খেলনা', 'cat', 'toys'],
  ['Dog Food', 'কুকুরের খাবার', 'dog', 'food'], ['Dog Accessories', 'কুকুরের এক্সেসরিজ', 'dog', 'accessories'], ['Bird Food & Accessories', 'পাখির খাবার ও এক্সেসরিজ', 'bird', null], ['Fish & Aqua', 'মাছ ও অ্যাকুয়া পণ্য', 'fish', null]
];
