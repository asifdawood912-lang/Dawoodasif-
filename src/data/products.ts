import { Product } from '../types';

export const HERO_ASSET = '/src/assets/images/hero_fashion_model_1789040868390.jpg';
export const NEW_SEASON_ASSET = '/src/assets/images/new_season_editorial_1789040887419.jpg';
export const EDITORIAL_BANNER_ASSET = '/src/assets/images/editorial_lookbook_1789040908087.jpg';

export const PRODUCTS: Product[] = [
  // ================= MEN (8 items) =================
  {
    id: 'men-1',
    name: 'Essential Relaxed Tee',
    category: 'MEN',
    subcategory: 'T-Shirts',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Charcoal', hex: '#262626' },
      { name: 'Pure White', hex: '#F9FAFB' },
      { name: 'Heather Gray', hex: '#9CA3AF' },
      { name: 'Oatmeal Beige', hex: '#D6CEBE' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Designed for everyday comfort with a relaxed silhouette and premium soft-touch heavyweight 240 GSM organic combed cotton.',
    details: [
      'Relaxed, slightly dropped shoulder profile',
      'Thick 1-inch ribbed collar that preserves shape',
      'Pre-shrunk organic combed cotton',
      'Reinforced twin needle stitching'
    ],
    fabricCare: [
      '100% Organic Combed Cotton',
      'Machine wash cold with like colors inside out',
      'Do not bleach or tumble dry',
      'Warm iron on reverse'
    ],
    rating: 4.8,
    reviewCount: 124,
    isBestSeller: true,
    stock: 45,
    tags: ['Tee', 'Everyday', 'Essential', 'Relaxed'],
    fit: 'Relaxed Fit'
  },
  {
    id: 'men-2',
    name: 'Oversized Graphic Tee',
    category: 'MEN',
    subcategory: 'T-Shirts',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Washed Black', hex: '#1C1917' },
      { name: 'Off-White', hex: '#F5F5F4' },
      { name: 'Slate Gray', hex: '#4B5563' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A contemporary boxy drape crafted from vintage-washed luxury cotton with subtle minimalist typography print along the back yoke.',
    details: [
      'Oversized architectural silhouette',
      'Water-based breathable screen-printed accent',
      'Drop-tail straight hemline',
      'High-density 260 GSM single jersey'
    ],
    fabricCare: ['100% Supima Cotton', 'Gentle cold wash', 'Iron inside out'],
    rating: 4.9,
    reviewCount: 88,
    isNew: true,
    stock: 28,
    tags: ['Graphic', 'Oversized', 'Streetwear'],
    fit: 'Oversized'
  },
  {
    id: 'men-3',
    name: 'Classic Black Shirt',
    category: 'MEN',
    subcategory: 'Shirts',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0F0F0F' },
      { name: 'Deep Navy', hex: '#1E293B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Tailored with sharp precision and a modern clean camp collar, cut from breathable cotton-poplin with a silky matte touch.',
    details: [
      'Minimalist hidden button placket',
      'Curved hem for untucked or tucked styling',
      'French seam construction for lasting durability'
    ],
    fabricCare: ['100% Long-Staple Cotton Poplin', 'Hand wash or dry clean recommended'],
    rating: 4.7,
    reviewCount: 95,
    isBestSeller: true,
    stock: 30,
    tags: ['Shirt', 'Smart', 'Classic', 'Black'],
    fit: 'Regular Tailored'
  },
  {
    id: 'men-4',
    name: 'Essential White Tee',
    category: 'MEN',
    subcategory: 'T-Shirts',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Chalk White', hex: '#F3F4F6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'The foundation of the GAZU uniform. A pure white staple made with breathable combed yarn that never turns sheer.',
    details: [
      'Zero side seams for seamless drape',
      'Reinforced collar ribbing',
      'Double enzyme washed for silky softness'
    ],
    fabricCare: ['100% Pure Cotton', 'Wash warm with whites'],
    rating: 4.9,
    reviewCount: 210,
    isBestSeller: true,
    stock: 60,
    tags: ['White', 'Tee', 'Basics', 'Uniform'],
    fit: 'Classic Relaxed'
  },
  {
    id: 'men-5',
    name: 'Relaxed Gray Tee',
    category: 'MEN',
    subcategory: 'T-Shirts',
    price: 999,
    originalPrice: 1399,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Muted Heather Gray', hex: '#9CA3AF' },
      { name: 'Charcoal Mist', hex: '#4B5563' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Melange gray texture woven with micro-slub cotton fibers for a subtle textured appearance and luxurious tactile handfeel.',
    details: ['Slub jersey structure', 'Raglan sleeve detail', 'Soft enzyme wash'],
    fabricCare: ['85% Cotton, 15% Viscose', 'Machine wash cold'],
    rating: 4.6,
    reviewCount: 42,
    stock: 22,
    tags: ['Gray', 'Tee', 'Melange'],
    fit: 'Relaxed'
  },
  {
    id: 'men-6',
    name: 'Utility Overshirt',
    category: 'MEN',
    subcategory: 'Jackets & Overshirts',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Olive Charcoal', hex: '#374151' },
      { name: 'Beige Twill', hex: '#D1D5DB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Heavy cotton twill jacket shirt featuring structured chest patch pockets, tonal horn buttons, and a clean boxy drape.',
    details: ['Heavyweight 320 GSM twill', 'Dual chest cargo pockets', 'Internal ticket pocket'],
    fabricCare: ['100% Cotton Twill', 'Dry clean or cold cycle'],
    rating: 4.8,
    reviewCount: 76,
    isNew: true,
    stock: 18,
    tags: ['Overshirt', 'Layering', 'Utility'],
    fit: 'Boxy'
  },
  {
    id: 'men-7',
    name: 'Relaxed Cargo Pants',
    category: 'MEN',
    subcategory: 'Pants',
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Washed Black', hex: '#18181B' },
      { name: 'Sand Stone', hex: '#D6D3D1' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Modern utilitarian trouser cut in a wide relaxed leg with flat inset cargo pockets for a sleek, unbulky profile.',
    details: ['Adjustable drawstring hem cords', 'Concealed snap flap pockets', 'Elasticated back waistband'],
    fabricCare: ['98% Cotton, 2% Elastane', 'Machine wash inside out'],
    rating: 4.8,
    reviewCount: 64,
    stock: 25,
    tags: ['Cargo', 'Streetwear', 'Pants'],
    fit: 'Wide Leg'
  },
  {
    id: 'men-8',
    name: 'Straight Fit Jeans',
    category: 'MEN',
    subcategory: 'Pants',
    price: 2699,
    originalPrice: 3699,
    discount: 27,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Raw Black Indigo', hex: '#111827' },
      { name: 'Vintage Stone Wash', hex: '#6B7280' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Crafted from 13.5 oz authentic selvedge-inspired rigid denim with a straight silhouette that pairs seamlessly with minimalist boots or sneakers.',
    details: ['Classic 5-pocket design', 'Matte black hardware', 'Genuine leather brand patch'],
    fabricCare: ['100% Rigid Denim Cotton', 'Wash infrequently, inside out in cold water'],
    rating: 4.7,
    reviewCount: 58,
    stock: 20,
    tags: ['Denim', 'Straight', 'Jeans'],
    fit: 'Straight'
  },

  // ================= WOMEN (8 items) =================
  {
    id: 'women-1',
    name: 'Relaxed Knit Top',
    category: 'WOMEN',
    subcategory: 'Knitwear',
    price: 1499,
    originalPrice: 2199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Oatmeal Milk', hex: '#EDE8DF' },
      { name: 'Pure Noir', hex: '#111827' },
      { name: 'Soft Taupe', hex: '#A8A29E' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An ethereal fine-gauge rib knit sweater designed with an open bateau neckline and elongated knuckle cuffs for subtle drama.',
    details: ['Silky modal-cashmere blend yarn', 'Seamless tubular hem', 'Extended sleeve silhouette'],
    fabricCare: ['70% Modal, 20% Cotton, 10% Cashmere', 'Hand wash cold, dry flat'],
    rating: 4.9,
    reviewCount: 142,
    isBestSeller: true,
    stock: 35,
    tags: ['Knit', 'Soft', 'Minimalist', 'Top'],
    fit: 'Relaxed Fluid'
  },
  {
    id: 'women-2',
    name: 'Oversized Shirt',
    category: 'WOMEN',
    subcategory: 'Shirts',
    price: 1899,
    originalPrice: 2599,
    discount: 26,
    images: [
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Blue Stripe', hex: '#93C5FD' },
      { name: 'Washed Charcoal', hex: '#374151' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'The definitive boyfriend button-down elevated with mother-of-pearl buttons and exaggerated architected cuffs.',
    details: ['Crisp 120s count cotton poplin', 'Deep side splits with gusset detail', 'Dropped shoulder profile'],
    fabricCare: ['100% Organic Poplin Cotton', 'Machine wash cold, warm iron'],
    rating: 4.8,
    reviewCount: 110,
    isNew: true,
    stock: 40,
    tags: ['Shirt', 'Oversized', 'Tailoring'],
    fit: 'Oversized Boy-Cut'
  },
  {
    id: 'women-3',
    name: 'Everyday Dress',
    category: 'WOMEN',
    subcategory: 'Dresses',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Raw Sand', hex: '#D6CEBE' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A flowing midi silhouette with gentle gathers, discreet side pockets, and a removable tie sash for customizable draping.',
    details: ['Concealed in-seam side pockets', 'Clean keyhole neckline closure', 'Breathable linen-rayon blend'],
    fabricCare: ['55% French Linen, 45% Rayon', 'Machine wash delicate or dry clean'],
    rating: 4.8,
    reviewCount: 64,
    isBestSeller: true,
    stock: 24,
    tags: ['Dress', 'Midi', 'Effortless', 'Linen'],
    fit: 'Fluid A-Line'
  },
  {
    id: 'women-4',
    name: 'Wide Leg Trousers',
    category: 'WOMEN',
    subcategory: 'Pants',
    price: 2299,
    originalPrice: 3199,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Warm Putty', hex: '#D1C7BD' },
      { name: 'Midnight Charcoal', hex: '#18181B' },
      { name: 'Mocha Brown', hex: '#4B382A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'High-waisted tailored pants with deep front pleats that cascade down into an elongated wide-leg silhouette.',
    details: ['Double pleat front styling', 'Blind stitched hem', 'Semi-elasticated concealed back band'],
    fabricCare: ['Polyester-Viscose with spandex stretch', 'Cool machine wash'],
    rating: 4.9,
    reviewCount: 168,
    isBestSeller: true,
    stock: 32,
    tags: ['Trousers', 'Wide Leg', 'Pants', 'Tailored'],
    fit: 'High-Rise Wide Leg'
  },
  {
    id: 'women-5',
    name: 'Minimal Blazer',
    category: 'WOMEN',
    subcategory: 'Jackets & Blazers',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Desert Sand', hex: '#C2B8A3' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A single-breasted power silhouette built with clean padded shoulders and fluid tropical wool drape for all-season layering.',
    details: ['Single horn button closure', 'Flap welt pockets', 'Satin cupro full lining'],
    fabricCare: ['Dry clean only'],
    rating: 4.9,
    reviewCount: 52,
    isNew: true,
    stock: 15,
    tags: ['Blazer', 'Outerwear', 'Minimal'],
    fit: 'Structured Oversized'
  },
  {
    id: 'women-6',
    name: 'Relaxed Denim',
    category: 'WOMEN',
    subcategory: 'Pants',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Vintage Stone Blue', hex: '#60A5FA' },
      { name: 'Washed Ash', hex: '#4B5563' }
    ],
    sizes: ['26', '28', '30', '32'],
    description: 'Mid-rise relaxed boyfriend jeans cut from premium 100% sustainable organic denim with subtle vintage whiskering.',
    details: ['Button fly fastening', 'Non-stretch authentic denim', 'Clean raw cut ankle hem'],
    fabricCare: ['100% Organic Cotton Denim', 'Machine wash inside out'],
    rating: 4.7,
    reviewCount: 78,
    stock: 28,
    tags: ['Denim', 'Jeans', 'Casual'],
    fit: 'Mid-Rise Relaxed'
  },
  {
    id: 'women-7',
    name: 'Basic Tank',
    category: 'WOMEN',
    subcategory: 'Tops',
    price: 699,
    originalPrice: 999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Charcoal Black', hex: '#1F2937' },
      { name: 'Warm Cream', hex: '#F5F5DC' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A 2x2 ribbed racerback essential that hugs the body smoothly without pinching or slipping.',
    details: ['Racer neckline', 'Ultra-soft pima cotton blend', 'Tag-free label for irritation-free wear'],
    fabricCare: ['95% Pima Cotton, 5% Elastane', 'Machine wash warm'],
    rating: 4.8,
    reviewCount: 92,
    stock: 50,
    tags: ['Tank', 'Essential', 'Ribbed'],
    fit: 'Fitted'
  },
  {
    id: 'women-8',
    name: 'Soft Knit Sweater',
    category: 'WOMEN',
    subcategory: 'Knitwear',
    price: 2799,
    originalPrice: 3899,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Cloud Cream', hex: '#F3EFE0' },
      { name: 'Smoked Gray', hex: '#6B7280' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Chunky yet weightless alpaca-blend sweater knitted with a fisherman rib pattern and cozy folded crew collar.',
    details: ['Folded rib neck trim', 'Plush cloud-like handfeel', 'Responsibly sourced wool fibers'],
    fabricCare: ['Dry clean or delicate wool hand wash'],
    rating: 4.9,
    reviewCount: 61,
    isNew: true,
    stock: 19,
    tags: ['Sweater', 'Winter', 'Cozy', 'Knit'],
    fit: 'Slouchy Boxy'
  },

  // ================= KIDS (8 items) =================
  {
    id: 'kids-1',
    name: 'Kids Everyday Tee',
    category: 'KIDS',
    subcategory: 'T-Shirts',
    price: 599,
    originalPrice: 899,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Heather Gray', hex: '#9CA3AF' },
      { name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Ultra-soft organic cotton tee that withstands every playground tumble, jungle gym adventure, and countless wash cycles.',
    details: ['Reinforced neck tape', 'Chemical-free non-toxic dyes', 'Tagless soft print'],
    fabricCare: ['100% GOTS Certified Organic Cotton', 'Machine wash warm'],
    rating: 4.9,
    reviewCount: 88,
    isBestSeller: true,
    stock: 60,
    tags: ['Kids', 'Tee', 'Everyday', 'Organic'],
    fit: 'Regular Kids'
  },
  {
    id: 'kids-2',
    name: 'Kids Graphic Tee',
    category: 'KIDS',
    subcategory: 'T-Shirts',
    price: 699,
    originalPrice: 999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Dusty Mint', hex: '#A7F3D0' },
      { name: 'Charcoal', hex: '#374151' }
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Playful minimalist line illustration on breathable combed cotton jersey. Fun, tasteful, and comfortable.',
    details: ['Soft water-based ink print', 'Double needle hem stitch', 'Pre-shrunk fabric'],
    fabricCare: ['100% Combed Cotton', 'Machine wash warm inside out'],
    rating: 4.8,
    reviewCount: 45,
    isNew: true,
    stock: 35,
    tags: ['Kids', 'Graphic', 'Fun'],
    fit: 'Relaxed Kids'
  },
  {
    id: 'kids-3',
    name: 'Kids Hoodie',
    category: 'KIDS',
    subcategory: 'Sweatshirts & Hoodies',
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Warm Heather Gray', hex: '#6B7280' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Brushed fleece pullover hoodie with a spacious kangaroo pocket and comfy double-layer hood without choke cords.',
    details: ['Safety cord-free hood', 'Cozy brushed interior fleece', 'Ribbed cuffs and waistband'],
    fabricCare: ['80% Cotton, 20% Polyester', 'Machine wash cold'],
    rating: 4.9,
    reviewCount: 76,
    isBestSeller: true,
    stock: 40,
    tags: ['Kids', 'Hoodie', 'Fleece'],
    fit: 'Cozy Relaxed'
  },
  {
    id: 'kids-4',
    name: 'Kids Relaxed Pants',
    category: 'KIDS',
    subcategory: 'Pants',
    price: 999,
    originalPrice: 1399,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Olive Army', hex: '#4B5563' },
      { name: 'Khaki Beige', hex: '#D6D3D1' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Stretchy cotton twill trousers with easy pull-on elastic waist and functional drawcord for active youngsters.',
    details: ['Drawstring waist with mock fly', 'Reinforced articulated knee panels', 'Dual front slip pockets'],
    fabricCare: ['97% Cotton, 3% Elastane', 'Machine wash cold'],
    rating: 4.7,
    reviewCount: 50,
    stock: 28,
    tags: ['Pants', 'Kids', 'Stretchy'],
    fit: 'Tapered Easy Fit'
  },
  {
    id: 'kids-5',
    name: 'Kids Denim',
    category: 'KIDS',
    subcategory: 'Pants',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Medium Indigo Wash', hex: '#3B82F6' },
      { name: 'Washed Charcoal', hex: '#374151' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Super-flexible soft touch stretch denim designed for maximum movement without stiffness.',
    details: ['Internal buttonhole elastic waist adjuster', 'Smooth snap front button', 'Real pockets'],
    fabricCare: ['80% Cotton, 18% Poly, 2% Spandex', 'Machine wash inside out'],
    rating: 4.8,
    reviewCount: 39,
    stock: 30,
    tags: ['Denim', 'Jeans', 'Kids'],
    fit: 'Straight Relaxed'
  },
  {
    id: 'kids-6',
    name: 'Kids Sweatshirt',
    category: 'KIDS',
    subcategory: 'Sweatshirts & Hoodies',
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Cream Vanilla', hex: '#FDF6E2' },
      { name: 'Washed Navy', hex: '#1E293B' }
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Clean crewneck sweatshirt featuring classic raglan sleeves and a cloud-like fleece interior.',
    details: ['Raglan sleeves for arm freedom', 'Sturdy rib neckband', 'Breathable cotton blend'],
    fabricCare: ['100% Combed Cotton Terry', 'Wash delicate'],
    rating: 4.8,
    reviewCount: 33,
    isNew: true,
    stock: 25,
    tags: ['Sweatshirt', 'Kids', 'Terry'],
    fit: 'Relaxed'
  },
  {
    id: 'kids-7',
    name: 'Kids Casual Shirt',
    category: 'KIDS',
    subcategory: 'Shirts',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Windowpane Check', hex: '#94A3B8' },
      { name: 'Solid White', hex: '#FFFFFF' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Smart button-down in breathable oxford weave, ideal for family gatherings and weekend outings.',
    details: ['Button-down collar', 'Single chest pocket', 'Curved shirttail hem'],
    fabricCare: ['100% Soft Cotton Oxford', 'Machine wash cold'],
    rating: 4.7,
    reviewCount: 28,
    stock: 22,
    tags: ['Shirt', 'Kids', 'Oxford'],
    fit: 'Smart Regular'
  },
  {
    id: 'kids-8',
    name: 'Kids Joggers',
    category: 'KIDS',
    subcategory: 'Pants',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [
      { name: 'Heather Gray', hex: '#64748B' },
      { name: 'Deep Black', hex: '#0F172A' }
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: 'Comfortable French terry joggers featuring tapered elastic ankles and deep pockets for little treasures.',
    details: ['Encased elastic waistband', 'Tapered ribbed ankle cuffs', 'Drop-in slash pockets'],
    fabricCare: ['100% Cotton French Terry', 'Machine wash warm'],
    rating: 4.9,
    reviewCount: 65,
    isBestSeller: true,
    stock: 45,
    tags: ['Joggers', 'Kids', 'Comfort'],
    fit: 'Tapered Jogger'
  },

  // ================= BEAUTY (6 items) =================
  {
    id: 'beauty-1',
    name: 'Daily Face Wash',
    category: 'BEAUTY',
    subcategory: 'Skincare',
    price: 649,
    originalPrice: 899,
    discount: 27,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608248597359-bb4792ecf63b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Neutral Glass', hex: '#F3F4F6' }],
    sizes: ['150 ml'],
    description: 'A gentle foaming cleanser infused with amino acids, green tea extract, and niacinamide that purifies without stripping the moisture barrier.',
    details: [
      'pH balanced (5.5) gentle surfactant complex',
      'Free from sulfates, synthetic fragrances, and parabens',
      'Suitable for sensitive, combination, and acne-prone skin'
    ],
    fabricCare: ['Store at room temperature away from direct sunlight', 'Dermatologist tested'],
    rating: 4.9,
    reviewCount: 204,
    isBestSeller: true,
    stock: 50,
    tags: ['Cleanser', 'Skincare', 'Daily', 'Clean'],
    fit: '150ml Bottle'
  },
  {
    id: 'beauty-2',
    name: 'Hydrating Moisturizer',
    category: 'BEAUTY',
    subcategory: 'Skincare',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Minimalist Jar', hex: '#FAFAF9' }],
    sizes: ['50 ml'],
    description: 'Weightless water-gel cream with multi-molecular hyaluronic acid, squalane, and ceramides delivering 72 hours of dewy hydration.',
    details: [
      'Multi-molecular weight hyaluronic acid',
      'Plant-derived squalane for non-greasy barrier support',
      'Fragrance-free clean formulation'
    ],
    fabricCare: ['Apply morning and evening to face and neck after serum'],
    rating: 4.8,
    reviewCount: 156,
    isBestSeller: true,
    stock: 42,
    tags: ['Moisturizer', 'Hydration', 'Skincare', 'Hyaluronic'],
    fit: '50ml Jar'
  },
  {
    id: 'beauty-3',
    name: 'Lip Balm',
    category: 'BEAUTY',
    subcategory: 'Lip Care',
    price: 349,
    originalPrice: 499,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Clear Sheen', hex: '#FFFFFF' }],
    sizes: ['15 g'],
    description: 'Restorative botanical lip treatment formulated with shea butter, jojoba oil, and peptide complex to heal dry, cracked lips.',
    details: ['Non-sticky satin finish', 'Subtle natural vanilla extract', 'Deep nourishing barrier protectant'],
    fabricCare: ['Cruelty-free & 100% Vegan'],
    rating: 4.9,
    reviewCount: 180,
    stock: 80,
    tags: ['Lip Balm', 'Essential', 'Nourishing'],
    fit: '15g Tube'
  },
  {
    id: 'beauty-4',
    name: 'Body Lotion',
    category: 'BEAUTY',
    subcategory: 'Body Care',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608248597359-bb4792ecf63b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Matte White Pump', hex: '#F4F4F5' }],
    sizes: ['250 ml'],
    description: 'Velvety body moisturizer loaded with nourishing oat extract and cold-pressed marula oil that sinks in instantly with zero residue.',
    details: ['Fast absorbing non-comedogenic formula', 'Soothes dryness and rough patches', 'Clean pump dispenser'],
    fabricCare: ['Massage daily over clean, dry skin'],
    rating: 4.7,
    reviewCount: 88,
    isNew: true,
    stock: 35,
    tags: ['Body', 'Lotion', 'Hydration'],
    fit: '250ml Pump'
  },
  {
    id: 'beauty-5',
    name: 'Face Serum',
    category: 'BEAUTY',
    subcategory: 'Skincare',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608248597359-bb4792ecf63b?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Amber Dropper', hex: '#D97706' }],
    sizes: ['30 ml'],
    description: 'Potent 10% Vitamin C + Ferulic Acid antioxidant elixir formulated to visibly brighten tone and fade post-blemish spots.',
    details: ['Stabilized Ethyl Ascorbic Acid', 'Enhances skin radiance in 14 days', 'Dark amber glass protects potency'],
    fabricCare: ['Apply 3-4 drops in the morning followed by SPF'],
    rating: 4.8,
    reviewCount: 115,
    isBestSeller: true,
    stock: 29,
    tags: ['Serum', 'Vitamin C', 'Brightening'],
    fit: '30ml Dropper'
  },
  {
    id: 'beauty-6',
    name: 'Hair Care Essential',
    category: 'BEAUTY',
    subcategory: 'Hair Care',
    price: 949,
    originalPrice: 1399,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Minimalist Dropper', hex: '#374151' }],
    sizes: ['100 ml'],
    description: 'Multi-functional lightweight hair oil enriched with Moroccan argan and rosemary oil that tames flyaways and seals split ends.',
    details: ['Heat protection up to 230°C', 'Controls humidity and frizz', 'Zero greasy buildup'],
    fabricCare: ['Work 1-2 drops through damp or dry ends'],
    rating: 4.8,
    reviewCount: 94,
    isNew: true,
    stock: 38,
    tags: ['Hair', 'Argan', 'Treatment'],
    fit: '100ml Bottle'
  }
];

export const POPULAR_SEARCHES = [
  'T-Shirts',
  'Oversized Shirts',
  'Dresses',
  'Kids Wear',
  'New Arrivals',
  'Cargo Pants',
  'Minimal Blazer',
  'Face Wash'
];
