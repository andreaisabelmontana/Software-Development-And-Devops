// Seed product catalog — used when the live FastAPI backend isn't reachable
// (e.g. when the site is served from GitHub Pages without an API URL set).
// Shape matches Geethika2506/Devopsfinalproject's /products schema:
//   { id, name, description, price, category, stock, image_url, created_at }

const c = {
  apparel:   'Apparel',
  bags:      'Bags & Accessories',
  home:      'Home',
  stationery:'Stationery',
  tech:      'Tech',
  books:     'Books',
  drinks:    'Drinks',
};

export const SEED_PRODUCTS = [
  { id: 1,  name: 'IE Heritage Sweatshirt',  category: c.apparel,   price: 65.00, stock: 42, description: 'Heavyweight cotton crewneck with embroidered IE crest. Made for the long library nights.' },
  { id: 2,  name: 'Madrid Campus Hoodie',    category: c.apparel,   price: 78.00, stock: 31, description: 'Brushed-back fleece hoodie. Cream body with navy hood lining and red drawcord.' },
  { id: 3,  name: 'BCSAI Class Tee',         category: c.apparel,   price: 28.00, stock: 120, description: 'Soft 200gsm tee printed with the BCSAI class graphic. Pre-shrunk and biowashed.' },
  { id: 4,  name: 'Tower Polo',              category: c.apparel,   price: 55.00, stock: 24, description: 'Tailored piqué polo with the IE Tower silhouette stitched at the chest.' },

  { id: 5,  name: 'Laptop Sleeve 14"',       category: c.bags,      price: 38.00, stock: 60, description: 'Felt-and-leather sleeve sized for the 14" Pro models. Magnetic snap closure.' },
  { id: 6,  name: 'Campus Backpack',         category: c.bags,      price: 98.00, stock: 18, description: 'Water-resistant 22L backpack with padded laptop compartment and side bottle pocket.' },
  { id: 7,  name: 'Cross-body Tote',         category: c.bags,      price: 32.00, stock: 75, description: '12oz canvas tote with reinforced bottom seam. Roomy enough for two textbooks and a laptop.' },

  { id: 8,  name: 'Tower Ceramic Mug',       category: c.home,      price: 14.00, stock: 200, description: '12oz stoneware mug, microwave safe. Glazed in IE cream with a red interior.' },
  { id: 9,  name: 'Steel Water Bottle',      category: c.home,      price: 22.00, stock: 88, description: 'Double-walled stainless steel, 600ml. Keeps cold 24h, hot 12h.' },
  { id: 10, name: 'Linen Throw',             category: c.home,      price: 64.00, stock: 14, description: 'Stonewashed linen throw, 130×170cm. Subtle herringbone weave in navy.' },

  { id: 11, name: 'Hardcover Field Notebook',category: c.stationery,price: 18.00, stock: 140, description: 'A5 dot-grid notebook, 192 pages of 100gsm Munken paper. Lays flat, smyth-sewn.' },
  { id: 12, name: 'Refillable Rollerball',   category: c.stationery,price: 24.00, stock: 95, description: 'Machined brass rollerball pen with a knurled grip and a magnetic cap.' },
  { id: 13, name: 'Sticker Pack — Volume 1', category: c.stationery,price:  6.00, stock: 320, description: 'Twelve die-cut vinyl stickers featuring the IE Tower, BCSAI mascots, and DevOps inside jokes.' },

  { id: 14, name: 'Mechanical Keyboard 65%', category: c.tech,      price: 145.00, stock: 12, description: 'Hot-swappable 65% layout with PBT keycaps in cream and navy. USB-C, gasket-mounted.' },
  { id: 15, name: 'USB-C Hub',               category: c.tech,      price: 49.00, stock: 38, description: 'Seven-port hub: 2× USB-A, 2× USB-C, HDMI 4K@60, SD, microSD.' },
  { id: 16, name: 'Wireless Mouse',          category: c.tech,      price: 39.00, stock: 50, description: 'Low-latency wireless mouse, 800-2400 DPI, dual-mode Bluetooth + 2.4 GHz dongle.' },

  { id: 17, name: 'DevOps Field Manual',     category: c.books,     price: 34.00, stock: 22, description: 'A 220-page paperback of patterns, anti-patterns, and post-mortems collected by the class.' },
  { id: 18, name: 'FastAPI in Practice',     category: c.books,     price: 42.00, stock: 16, description: 'Worked examples for building production REST APIs in FastAPI — routers, auth, deployment.' },

  { id: 19, name: 'Cold Brew Concentrate',   category: c.drinks,    price: 16.00, stock: 70, description: 'Single-origin Ethiopian cold brew, 500ml. Brewed slow, served fast — fuel for finals week.' },
  { id: 20, name: 'Matcha Tin',              category: c.drinks,    price: 28.00, stock: 44, description: 'Ceremonial-grade matcha, 30g. Stone-ground from first-harvest Uji leaves.' },
];

let nextId = 1000;
export function nextSeedId() { return ++nextId; }
