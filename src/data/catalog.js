// The whole Spring Summer 2027 collection, looks 01–26, in runway order:
// the opening six, then dresses, then formal, then casual. The number is the
// look's place in the show and also its image folder.
//
// Looks 01–06 are cut from the two shared sheets in public/images (boxes are
// x0, x1, y0, y1 on a 960 x 540 models sheet and a 960 x 720 pieces sheet).
//
// Looks 07+ use one image per file in src/assets/looks/<NN>/:
//   model.png (or .webp)        the full-body model, transparent background
//   <piece-id>.png (or .webp)   one product shot per piece, transparent background
// A look appears on the site as soon as its model image exists. A piece is shown
// in the shop only once its own product image exists; until then it stays hidden.
// See docs/LOOK_IMAGES.md for the image prompts.

// shop filters are shown in this order (only the ones that have pieces)
export const CATEGORY_ORDER = [
  'Outerwear', 'Blazers', 'Dresses', 'Tops', 'Shirts', 'Knitwear', 'Trousers', 'Jumpsuits', 'Shoes', 'Accessories',
]

// lookbook sections, in show order
export const GROUPS = [
  { id: 'opening', title: 'The Opening', text: 'Six looks that open the show in blush, sage and champagne.' },
  { id: 'dresses', title: 'Dresses & Gowns', text: 'Pleats, satin, tulle and velvet, from day slips to evening gowns.' },
  { id: 'formal', title: 'Formal', text: 'Tailoring and evening wear, cut with the precision of menswear.' },
  { id: 'casual', title: 'Casual', text: 'Knits, denim and utility pieces for the days in between.' },
]

export const CATALOG = [
  // ---- opening ----
  {
    number: 1,
    group: 'opening',
    name: 'Feather & Satin',
    palette: 'Blush, rose quartz',
    fabric: 'Ostrich feather, silk satin',
    story:
      'The collection opens on its lightest note. A cropped jacket worked entirely in blush feathers moves with every step, grounded by liquid satin trousers cut long enough to brush the floor.',
    model: [12, 176, 48, 496],
    pieces: [
      { id: 'feather-jacket', name: 'Feather Jacket', price: 2900, category: 'Outerwear', box: [26, 224, 28, 214] },
      { id: 'satin-wide-leg-trousers', name: 'Satin Wide Leg Trousers', price: 1450, category: 'Trousers', box: [304, 412, 22, 236] },
    ],
  },
  {
    number: 2,
    group: 'opening',
    name: 'Sage Pleat',
    palette: 'Sage, antique gold',
    fabric: 'Sunray-pleated georgette',
    story:
      'Hundreds of hand-set pleats fall from a soft halter neck. A slim gold belt marks the waist so the gown reads as one long, quiet line from shoulder to hem.',
    model: [178, 330, 48, 496],
    pieces: [
      { id: 'pleated-dress', name: 'Pleated Dress', price: 2200, category: 'Dresses', box: [530, 666, 12, 242] },
      { id: 'gold-waist-belt', name: 'Gold Waist Belt', price: 420, category: 'Accessories', box: [752, 922, 100, 146] },
    ],
  },
  {
    number: 3,
    group: 'opening',
    name: 'Champagne Trench',
    palette: 'Champagne, warm sand',
    fabric: 'Duchess satin, calf leather',
    story:
      'The classic trench, re-cut as a dress. Duchess satin catches the light along a deep storm flap, and a structured top-handle bag finishes a look made for the city after dark.',
    model: [331, 470, 48, 496],
    pieces: [
      { id: 'satin-trench-dress', name: 'Satin Trench Dress', price: 2350, category: 'Dresses', box: [70, 176, 246, 466] },
      { id: 'top-handle-bag', name: 'Top Handle Bag', price: 980, category: 'Accessories', box: [294, 422, 294, 432] },
    ],
  },
  {
    number: 4,
    group: 'opening',
    name: 'Billow',
    palette: 'Petal pink, chalk',
    fabric: 'Silk organza, crepe',
    story:
      'Volume without weight. Organza sleeves gather into billowing clouds at the wrist, balanced by fluid crepe trousers that tie softly at the waist.',
    model: [476, 633, 48, 496],
    pieces: [
      { id: 'billow-sleeve-blouse', name: 'Billow Sleeve Blouse', price: 860, category: 'Tops', box: [508, 688, 240, 452] },
      { id: 'tie-waist-trousers', name: 'Tie Waist Trousers', price: 740, category: 'Trousers', box: [780, 890, 252, 466] },
    ],
  },
  {
    number: 5,
    group: 'opening',
    name: 'Powder Coat',
    palette: 'Powder blue, ivory',
    fabric: 'Double-face cashmere, wool twill',
    story:
      'A long coat in double-face cashmere, finished by hand with no lining at all so it falls like a cape. Underneath, pressed ivory trousers keep the silhouette clean.',
    model: [634, 767, 48, 496],
    pieces: [
      { id: 'powder-long-coat', name: 'Powder Long Coat', price: 1980, category: 'Outerwear', box: [64, 178, 484, 698] },
      { id: 'ivory-straight-trousers', name: 'Ivory Straight Trousers', price: 690, category: 'Trousers', box: [316, 396, 482, 698] },
    ],
  },
  {
    number: 6,
    group: 'opening',
    name: 'Ivory Ruffle',
    palette: 'Ivory, pearl',
    fabric: 'Silk faille, chiffon',
    story:
      'A sculpted ruffle top frames the shoulders in silk faille, set above a pleated maxi skirt that opens like a fan as the model walks.',
    model: [767, 956, 48, 496],
    pieces: [
      { id: 'sculpted-ruffle-top', name: 'Sculpted Ruffle Top', price: 1120, category: 'Tops', box: [530, 672, 508, 682] },
      { id: 'pleated-maxi-skirt', name: 'Pleated Maxi Skirt', price: 1340, category: 'Dresses', box: [754, 916, 484, 700] },
    ],
  },

  // ---- dresses ----
  {
    number: 7,
    group: 'dresses',
    name: 'Lilac Pleat',
    palette: 'Lilac, rose',
    fabric: 'Sunray-pleated chiffon',
    story:
      'A one-shoulder gown draped across the bodice, then released into hundreds of fine pleats that ripple from lilac to rose as she walks.',
    pieces: [
      { id: 'lilac-one-shoulder-pleated-gown', name: 'Lilac One Shoulder Pleated Gown', price: 2450, category: 'Dresses' },
      { id: 'lilac-suede-clutch', name: 'Lilac Suede Clutch', price: 520, category: 'Accessories' },
      { id: 'plum-leather-pumps', name: 'Plum Leather Pumps', price: 620, category: 'Shoes' },
      { id: 'lilac-suede-belt', name: 'Lilac Suede Belt', price: 220, category: 'Accessories' },
      { id: 'amethyst-pendant-necklace', name: 'Amethyst Pendant Necklace', price: 320, category: 'Accessories' },
    ],
  },
  {
    number: 8,
    group: 'dresses',
    name: 'Mint Slip',
    palette: 'Mint, pistachio',
    fabric: 'Bias-cut silk, fine merino',
    story:
      'The slip dress, cut on the bias so it follows the body without clinging. A cropped cardigan in pistachio merino is draped over the shoulders for the walk home.',
    pieces: [
      { id: 'mint-silk-slip-dress', name: 'Mint Silk Slip Dress', price: 1280, category: 'Dresses' },
      { id: 'pistachio-cropped-cardigan', name: 'Pistachio Cropped Cardigan', price: 620, category: 'Knitwear' },
      { id: 'sage-canvas-belt', name: 'Sage Canvas Belt', price: 180, category: 'Accessories' },
    ],
  },
  {
    number: 9,
    group: 'dresses',
    name: 'Rose Column',
    palette: 'Dusty rose',
    fabric: 'Heavy silk satin',
    story:
      'One seam, one colour, one long line. A strapless column gown in heavy satin, finished with opera gloves in the same dusty rose.',
    pieces: [
      { id: 'rose-satin-column-gown', name: 'Rose Satin Column Gown', price: 2600, category: 'Dresses' },
      { id: 'satin-opera-gloves', name: 'Satin Opera Gloves', price: 290, category: 'Accessories' },
      { id: 'rose-satin-clutch', name: 'Rose Satin Clutch', price: 540, category: 'Accessories' },
      { id: 'rose-quartz-pendant', name: 'Rose Quartz Pendant', price: 280, category: 'Accessories' },
      { id: 'rose-quartz-earrings', name: 'Rose Quartz Earrings', price: 260, category: 'Accessories' },
      { id: 'silver-cuff-bracelet', name: 'Silver Cuff Bracelet', price: 240, category: 'Accessories' },
      { id: 'rose-satin-pumps', name: 'Rose Satin Pumps', price: 640, category: 'Shoes' },
    ],
  },
  {
    number: 10,
    group: 'dresses',
    name: 'Peach Drape',
    palette: 'Peach, apricot',
    fabric: 'Silk jersey, satin',
    story:
      'A one-shoulder bodice draped by hand on the stand, falling into a bias-cut satin skirt that moves like water.',
    pieces: [
      { id: 'peach-draped-satin-dress', name: 'Peach Draped Satin Dress', price: 1650, category: 'Dresses' },
      { id: 'peach-tulle-stole', name: 'Peach Tulle Stole', price: 380, category: 'Accessories' },
      { id: 'blush-strappy-sandals', name: 'Blush Strappy Sandals', price: 690, category: 'Shoes' },
    ],
  },
  {
    number: 11,
    group: 'dresses',
    name: 'Blush Tulle',
    palette: 'Blush, ballet pink',
    fabric: 'Silk tulle, satin',
    story:
      'Seven tiers of silk tulle float from a fitted bodice. Satin ballet flats keep it light enough to dance in.',
    pieces: [
      { id: 'tulle-tiered-dress', name: 'Tulle Tiered Dress', price: 2300, category: 'Dresses' },
      { id: 'satin-ballet-flats', name: 'Satin Ballet Flats', price: 520, category: 'Shoes' },
    ],
  },
  {
    number: 12,
    group: 'dresses',
    name: 'Cloud Cape',
    palette: 'Cloud white, cream',
    fabric: 'Double-face wool, cashmere knit',
    story:
      'A cape coat in cloud-white double-face wool falls over a long cashmere knit dress — softness and strength in one silhouette.',
    pieces: [
      { id: 'cream-knit-maxi-dress', name: 'Cloud Knit Cape', price: 3490, category: 'Outerwear' },
      { id: 'cream-cashmere-turtleneck', name: 'Cream Cashmere Turtleneck', price: 590, category: 'Knitwear' },
      { id: 'cream-wool-trousers', name: 'Cream Wool Trousers', price: 720, category: 'Trousers' },
      { id: 'cream-knit-sash-belt', name: 'Cream Knit Sash Belt', price: 260, category: 'Accessories' },
      { id: 'cream-leather-mules', name: 'Cream Leather Mules', price: 560, category: 'Shoes' },
      { id: 'gold-pearl-drop-collar', name: 'Gold Pearl Drop Collar', price: 380, category: 'Accessories' },
    ],
  },
  {
    number: 13,
    group: 'dresses',
    name: 'Peach Cascade',
    palette: 'Peach, apricot, champagne',
    fabric: 'Pleated silk satin',
    story:
      'A halter neckline crosses at the throat and falls into three tiers of pleated satin, each one a shade lighter than the last.',
    pieces: [
      { id: 'peach-tiered-pleated-gown', name: 'Peach Tiered Pleated Gown', price: 2800, category: 'Dresses' },
      { id: 'olive-leather-belt', name: 'Olive Leather Belt', price: 240, category: 'Accessories' },
      { id: 'chocolate-block-sandals', name: 'Chocolate Block Sandals', price: 590, category: 'Shoes' },
    ],
  },
  {
    number: 14,
    group: 'dresses',
    name: 'Midnight Velvet',
    palette: 'Midnight navy',
    fabric: 'Silk velvet, duchess satin',
    story:
      'An evening gown that joins two fabrics: a draped velvet bodice with cut-out shoulders and a hand-beaded waist, opening into a sweep of liquid satin.',
    pieces: [
      { id: 'midnight-velvet-satin-gown', name: 'Midnight Velvet Satin Gown', price: 3100, category: 'Dresses' },
      { id: 'midnight-velvet-clutch', name: 'Midnight Velvet Clutch', price: 520, category: 'Accessories' },
      { id: 'midnight-velvet-pumps', name: 'Midnight Velvet Pumps', price: 620, category: 'Shoes' },
      { id: 'velvet-skinny-belt', name: 'Velvet Skinny Belt', price: 220, category: 'Accessories' },
      { id: 'sapphire-pendant-necklace', name: 'Sapphire Pendant Necklace', price: 340, category: 'Accessories' },
    ],
  },
  {
    number: 15,
    group: 'dresses',
    name: 'Sage Drape',
    palette: 'Sage, eucalyptus',
    fabric: 'Silk satin, chiffon',
    story:
      'An off-shoulder satin bodice wraps into cascading chiffon layers that open at the front to show the step.',
    pieces: [
      { id: 'sage-off-shoulder-gown', name: 'Sage Off Shoulder Gown', price: 2650, category: 'Dresses' },
      { id: 'sage-satin-clutch', name: 'Sage Satin Clutch', price: 540, category: 'Accessories' },
      { id: 'sage-satin-pumps', name: 'Sage Satin Pumps', price: 640, category: 'Shoes' },
      { id: 'pearl-pendant-necklace', name: 'Pearl Pendant Necklace', price: 290, category: 'Accessories' },
      { id: 'pearl-drop-earrings', name: 'Pearl Drop Earrings', price: 220, category: 'Accessories' },
    ],
  },

  // ---- formal ----
  {
    number: 16,
    group: 'formal',
    name: 'Emerald Suit',
    palette: 'Emerald, ivory',
    fabric: 'Wool twill, silk charmeuse',
    story:
      'Tailoring in deep emerald: a single-breasted blazer with a peak lapel and straight trousers, softened by an ivory silk mock-neck top.',
    pieces: [
      { id: 'emerald-tailored-blazer', name: 'Emerald Tailored Blazer', price: 1690, category: 'Blazers' },
      { id: 'emerald-straight-trousers', name: 'Emerald Straight Trousers', price: 780, category: 'Trousers' },
      { id: 'ivory-silk-turtleneck', name: 'Ivory Silk Turtleneck', price: 560, category: 'Tops' },
      { id: 'espresso-ankle-boots', name: 'Espresso Ankle Boots', price: 790, category: 'Shoes' },
      { id: 'chocolate-leather-belt', name: 'Chocolate Leather Belt', price: 280, category: 'Accessories' },
    ],
  },
  {
    number: 17,
    group: 'formal',
    name: 'Stone Trench',
    palette: 'Stone, oatmeal',
    fabric: 'Cotton gabardine, fine merino',
    story:
      'The house trench in its classic form, worn over a fine-gauge turtleneck and straight trousers in tonal stone.',
    pieces: [
      { id: 'classic-stone-trench', name: 'Classic Stone Trench', price: 2100, category: 'Outerwear' },
      { id: 'oatmeal-cashmere-turtleneck', name: 'Oatmeal Cashmere Turtleneck', price: 590, category: 'Knitwear' },
      { id: 'stone-leather-belt', name: 'Stone Leather Belt', price: 240, category: 'Accessories' },
      { id: 'chestnut-buckle-bag', name: 'Chestnut Buckle Bag', price: 940, category: 'Accessories' },
      { id: 'taupe-leather-boots', name: 'Taupe Leather Boots', price: 980, category: 'Shoes' },
      { id: 'pearl-drop-necklace', name: 'Pearl Drop Necklace', price: 290, category: 'Accessories' },
    ],
  },
  {
    number: 18,
    group: 'formal',
    name: 'Ivory Suit',
    palette: 'Ivory, bone',
    fabric: 'Wool and silk blend',
    story:
      'A single-breasted ivory suit with a long, lean jacket and trousers that flare gently over the shoe.',
    pieces: [
      { id: 'ivory-single-breasted-blazer', name: 'Ivory Single Breasted Blazer', price: 1780, category: 'Blazers' },
      { id: 'ivory-silk-tank', name: 'Ivory Silk Tank', price: 380, category: 'Tops' },
      { id: 'ivory-tailored-trousers', name: 'Ivory Tailored Trousers', price: 720, category: 'Trousers' },
      { id: 'ivory-silk-scarf', name: 'Ivory Silk Scarf', price: 320, category: 'Accessories' },
    ],
  },
  {
    number: 19,
    group: 'formal',
    name: 'Champagne Evening',
    palette: 'Champagne, pearl',
    fabric: 'Hand-sewn sequins, satin',
    story:
      'A halter top embroidered with champagne sequins over liquid satin palazzo trousers, finished with a pearl-beaded clutch.',
    pieces: [
      { id: 'sequin-halter-top', name: 'Sequin Halter Top', price: 980, category: 'Tops' },
      { id: 'champagne-satin-palazzo', name: 'Champagne Satin Palazzo', price: 1150, category: 'Trousers' },
      { id: 'pearl-clutch', name: 'Pearl Clutch', price: 760, category: 'Accessories' },
      { id: 'gold-tulle-gloves', name: 'Gold Tulle Gloves', price: 340, category: 'Accessories' },
      { id: 'gold-strappy-sandals', name: 'Gold Strappy Sandals', price: 690, category: 'Shoes' },
      { id: 'pearl-cluster-earrings', name: 'Pearl Cluster Earrings', price: 260, category: 'Accessories' },
      { id: 'gold-torque-collar', name: 'Gold Torque Collar', price: 420, category: 'Accessories' },
    ],
  },
  {
    number: 20,
    group: 'formal',
    name: 'Navy Pinstripe',
    palette: 'Navy, cream',
    fabric: 'Pinstripe wool, silk crepe',
    story:
      'A double-breasted pinstripe suit with wide trousers and a cream silk shirt, carried with a structured top-handle bag.',
    pieces: [
      { id: 'pinstripe-double-breasted-blazer', name: 'Pinstripe Double Breasted Blazer', price: 1850, category: 'Blazers' },
      { id: 'pinstripe-wide-trousers', name: 'Pinstripe Wide Trousers', price: 860, category: 'Trousers' },
      { id: 'navy-top-handle-bag', name: 'Navy Top Handle Bag', price: 1150, category: 'Accessories' },
      { id: 'cream-silk-shirt', name: 'Cream Silk Shirt', price: 620, category: 'Shirts' },
      { id: 'gold-link-watch', name: 'Gold Link Watch', price: 1450, category: 'Accessories' },
      { id: 'black-leather-pumps', name: 'Black Leather Pumps', price: 690, category: 'Shoes' },
    ],
  },
  {
    number: 21,
    group: 'formal',
    name: 'Charcoal Three Piece',
    palette: 'Charcoal, white',
    fabric: 'Wool flannel, cotton poplin',
    story:
      'Menswear, re-cut for her: a double-breasted jacket, a fitted waistcoat and pleated trousers in charcoal flannel, over a crisp white poplin shirt.',
    pieces: [
      { id: 'charcoal-double-breasted-blazer', name: 'Charcoal Double Breasted Blazer', price: 1790, category: 'Blazers' },
      { id: 'charcoal-pleated-trousers', name: 'Charcoal Pleated Trousers', price: 820, category: 'Trousers' },
      { id: 'crisp-white-shirt', name: 'Crisp White Shirt', price: 420, category: 'Shirts' },
      { id: 'charcoal-wool-waistcoat', name: 'Charcoal Wool Waistcoat', price: 580, category: 'Tops' },
      { id: 'chocolate-leather-pumps', name: 'Chocolate Leather Pumps', price: 650, category: 'Shoes' },
      { id: 'brown-leather-belt', name: 'Brown Leather Belt', price: 260, category: 'Accessories' },
      { id: 'steel-link-watch', name: 'Steel Link Watch', price: 1290, category: 'Accessories' },
    ],
  },

  // ---- casual ----
  {
    number: 22,
    group: 'casual',
    name: 'Field Utility',
    palette: 'Olive, ecru, cognac',
    fabric: 'Washed cotton twill, Breton jersey',
    story:
      'Weekend in the city: a washed olive field jacket over a Breton stripe top, ecru cargo trousers and a cognac leather crossbody bag.',
    pieces: [
      { id: 'olive-field-jacket', name: 'Olive Field Jacket', price: 1180, category: 'Outerwear' },
      { id: 'ecru-cargo-trousers', name: 'Ecru Cargo Trousers', price: 620, category: 'Trousers' },
      { id: 'cognac-crossbody-bag', name: 'Cognac Crossbody Bag', price: 640, category: 'Accessories' },
      { id: 'breton-stripe-tee', name: 'Breton Stripe Tee', price: 190, category: 'Tops' },
      { id: 'khaki-canvas-belt', name: 'Khaki Canvas Belt', price: 180, category: 'Accessories' },
      { id: 'green-stripe-trainers', name: 'Green Stripe Trainers', price: 420, category: 'Shoes' },
    ],
  },
  {
    number: 23,
    group: 'casual',
    name: 'Sky Shirting',
    palette: 'Sky blue, white',
    fabric: 'Cotton poplin, linen',
    story:
      'An oversized poplin shirt with dropped shoulders, half-tucked into wide linen culottes. Easy, crisp and made for long summer days.',
    pieces: [
      { id: 'oversized-poplin-shirt', name: 'Oversized Poplin Shirt', price: 540, category: 'Shirts' },
      { id: 'sky-pleated-culottes', name: 'Sky Pleated Culottes', price: 690, category: 'Trousers' },
      { id: 'sky-silk-scarf', name: 'Sky Silk Scarf', price: 240, category: 'Accessories' },
      { id: 'peach-cotton-tank', name: 'Peach Cotton Tank', price: 180, category: 'Tops' },
      { id: 'sky-canvas-belt', name: 'Sky Canvas Belt', price: 180, category: 'Accessories' },
      { id: 'cognac-leather-sandals', name: 'Cognac Leather Sandals', price: 420, category: 'Shoes' },
    ],
  },
  {
    number: 24,
    group: 'casual',
    name: 'Camel Coat',
    palette: 'Camel, ecru, charcoal',
    fabric: 'Double-face wool, chunky wool knit',
    story:
      'An oversized camel coat thrown over a chunky ecru turtleneck and charcoal flannel trousers — the house uniform for the colder days of the season.',
    pieces: [
      { id: 'camel-wool-coat', name: 'Camel Wool Coat', price: 2200, category: 'Outerwear' },
      { id: 'charcoal-flannel-trousers', name: 'Charcoal Flannel Trousers', price: 690, category: 'Trousers' },
      { id: 'espresso-shoulder-bag', name: 'Espresso Shoulder Bag', price: 820, category: 'Accessories' },
      { id: 'ecru-chunky-turtleneck', name: 'Ecru Chunky Turtleneck', price: 640, category: 'Knitwear' },
      { id: 'camel-wool-scarf', name: 'Camel Wool Scarf', price: 290, category: 'Accessories' },
      { id: 'cream-leather-sneakers', name: 'Cream Leather Sneakers', price: 420, category: 'Shoes' },
    ],
  },
  {
    number: 25,
    group: 'casual',
    name: 'Sage Knit Set',
    palette: 'Sage, eucalyptus',
    fabric: 'Ribbed cotton and silk knit',
    story:
      'A ribbed knit top and wide knitted trousers in sage — the softest set in the collection, made to travel in.',
    pieces: [
      { id: 'sage-ribbed-knit-top', name: 'Sage Ribbed Knit Top', price: 460, category: 'Knitwear' },
      { id: 'sage-knit-wide-trousers', name: 'Sage Knit Wide Trousers', price: 640, category: 'Trousers' },
      { id: 'sage-ribbed-tank', name: 'Sage Ribbed Tank', price: 220, category: 'Knitwear' },
      { id: 'sage-knit-slides', name: 'Sage Knit Slides', price: 340, category: 'Shoes' },
      { id: 'sage-ballet-flats', name: 'Sage Ballet Flats', price: 480, category: 'Shoes' },
    ],
  },
  {
    number: 26,
    group: 'casual',
    name: 'Weekend Knit',
    palette: 'Oat, white, washed denim',
    fabric: 'Chunky wool knit, cotton denim',
    story:
      'The off-duty look: an oversized oat cardigan over a white cotton tee, vintage-wash straight jeans and a soft leather tote big enough for everything.',
    pieces: [
      { id: 'oat-chunky-cardigan', name: 'Oat Chunky Cardigan', price: 640, category: 'Knitwear' },
      { id: 'vintage-straight-jeans', name: 'Vintage Straight Jeans', price: 380, category: 'Trousers' },
      { id: 'tan-leather-tote', name: 'Tan Leather Tote', price: 890, category: 'Accessories' },
      { id: 'white-cotton-tee', name: 'White Cotton Tee', price: 160, category: 'Tops' },
      { id: 'sand-suede-trainers', name: 'Sand Suede Trainers', price: 390, category: 'Shoes' },
    ],
  },
]
