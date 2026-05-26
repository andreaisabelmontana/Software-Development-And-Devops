// Last-resort offline seed catalog — used only when neither the configured
// backend (VITE_API_URL) nor fakestoreapi.com is reachable. Names mirror the
// Fake Store API catalog the team's FastAPI seeds itself from, so the
// fallback "looks like the same shop".

export const SEED_PRODUCTS = [
  { id: 1,  name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", category: "Men's Clothing",   price: 109.95, stock: 42, description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.' },
  { id: 2,  name: "Mens Casual Premium Slim Fit T-Shirts",                 category: "Men's Clothing",   price: 22.30,  stock: 31, description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.' },
  { id: 3,  name: "Mens Cotton Jacket",                                    category: "Men's Clothing",   price: 55.99,  stock: 24, description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.' },
  { id: 4,  name: "Mens Casual Slim Fit",                                  category: "Men's Clothing",   price: 15.99,  stock: 60, description: 'The color could be slightly different between on the screen and in practice.' },
  { id: 5,  name: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet", category: "Jewelry",  price: 695.00, stock: 4,  description: 'From our Legends Collection, the Naga was inspired by the mythical water dragon.' },
  { id: 6,  name: "Solid Gold Petite Micropave",                            category: "Jewelry",         price: 168.00, stock: 8,  description: 'Satisfaction guaranteed. Return or exchange any order within 30 days.' },
  { id: 7,  name: "White Gold Plated Princess Ring",                        category: "Jewelry",         price: 9.99,   stock: 75, description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring.' },
  { id: 8,  name: "Pierced Owl Rose Gold Plated Stainless Steel Double Flared Tunnel", category: "Jewelry", price: 10.99, stock: 95, description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings.' },
  { id: 9,  name: "WD 2TB Elements Portable External Hard Drive — USB 3.0", category: "Electronics",     price: 64.00,  stock: 22, description: 'USB 3.0 and USB 2.0 Compatibility · Fast data transfers · Improve PC Performance.' },
  { id: 10, name: "SanDisk SSD PLUS 1TB Internal SSD — SATA III 6 Gb/s",    category: "Electronics",     price: 109.00, stock: 14, description: 'Boost laptop performance with the SanDisk SSD PLUS.' },
  { id: 11, name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache",          category: "Electronics",     price: 109.00, stock: 18, description: '3D NAND flash for high transfer speeds and reliability.' },
  { id: 12, name: "WD 4TB Gaming Drive Works with Playstation 4",          category: "Electronics",     price: 114.00, stock: 11, description: 'Expand your PS4 gaming experience.' },
  { id: 13, name: "Acer 21.5 inches Full HD IPS Ultra-Thin Monitor",        category: "Electronics",     price: 599.00, stock: 5,  description: 'IPS panel with 178° viewing angle. Zero-Frame design.' },
  { id: 14, name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",      category: "Electronics",     price: 999.99, stock: 3,  description: 'Super ultrawide curved monitor with 32:9 aspect ratio.' },
  { id: 15, name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats", category: "Women's Clothing", price: 56.99, stock: 18, description: '100% Polyester. Detachable lining. Two-way zipper.' },
  { id: 16, name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket", category: "Women's Clothing", price: 29.95, stock: 23, description: '100% PU. Removable hood and faux-leather body.' },
  { id: 17, name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", category: "Women's Clothing", price: 39.99, stock: 12, description: 'Lightweight perfect for travel or casual wear.' },
  { id: 18, name: "MBJ Women's Solid Short Sleeve Boat Neck V",            category: "Women's Clothing", price: 9.85,   stock: 88, description: '95% Rayon, 5% Spandex. Lightweight fabric with great stretch.' },
  { id: 19, name: "Opna Women's Short Sleeve Moisture Wicking Athletic Shirts", category: "Women's Clothing", price: 7.95, stock: 100, description: 'Polyester / Lycra blend, machine wash.' },
  { id: 20, name: "DANVOUY Womens T Shirt Casual Cotton Short",            category: "Women's Clothing", price: 12.99, stock: 76, description: '95% Cotton, 5% Spandex. Casual short sleeves.' },
];

let nextId = 1000;
export function nextSeedId() { return ++nextId; }
