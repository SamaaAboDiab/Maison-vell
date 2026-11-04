# Images for looks 07–26

Each look needs its own folder in `src/assets/looks/<NN>/` (the folders already exist).
Put the files there with **exactly** these names (`.png` or `.webp`), then refresh the site:
the look appears on the Runway, Lookbook, Shop and search automatically.

- Every look already has its `model`. These prompts are now for the **product shots**: when a piece's file exists it replaces the crop of the model.
- Looks are numbered in show order (opening, dresses, formal, casual); the folder number is the look number.
- Transparent background is required. Gemini paints a fake checkerboard into JPGs instead; those need their background removed first (every model so far was done this way).
- Empty margins are fine; the site trims them automatically.
- Recommended size: model about 1000 × 2000 px, pieces about 1000 × 1000 px, WebP or PNG under 600 KB.

## Style to keep (add to every prompt)

**Model:** `full-body fashion editorial photo of one female model standing facing the camera, whole body visible from head to shoes, natural relaxed pose, soft even studio light, high-end luxury fashion lookbook, photorealistic, isolated on a transparent background, no shadow, no text`

**Piece:** `luxury fashion product photo of a single garment, ghost mannequin / laid flat, front view, soft even studio light, photorealistic, isolated on a transparent background, no model, no shadow, no text`

Tip: generate the model first, then generate each piece using the model image as a reference so the colours and details match.

---

## Look 07 — Lilac Pleat

Folder: `src/assets/looks/07/`  ·  Palette: Lilac, rose  ·  Fabric: Sunray-pleated chiffon

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: lilac one shoulder pleated gown. A one-shoulder gown draped across the bodice, then released into hundreds of fine pleats that ripple from lilac to rose as she walks. |
| `lilac-one-shoulder-pleated-gown.png` | Lilac One Shoulder Pleated Gown in lilac, rose, sunray-pleated chiffon |

---

## Look 08 — Mint Slip

Folder: `src/assets/looks/08/`  ·  Palette: Mint, pistachio  ·  Fabric: Bias-cut silk, fine merino

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: mint silk slip dress, pistachio cropped cardigan. The slip dress, cut on the bias so it follows the body without clinging. A cropped cardigan in pistachio merino is draped over the shoulders for the walk home. |
| `mint-silk-slip-dress.png` | Mint Silk Slip Dress in mint, pistachio, bias-cut silk, fine merino |
| `pistachio-cropped-cardigan.png` | Pistachio Cropped Cardigan in mint, pistachio, bias-cut silk, fine merino |

---

## Look 09 — Rose Column

Folder: `src/assets/looks/09/`  ·  Palette: Dusty rose  ·  Fabric: Heavy silk satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: rose satin column gown, satin opera gloves. One seam, one colour, one long line. A strapless column gown in heavy satin, finished with opera gloves in the same dusty rose. |
| `rose-satin-column-gown.png` | Rose Satin Column Gown in dusty rose, heavy silk satin |
| `satin-opera-gloves.png` | Satin Opera Gloves in dusty rose, heavy silk satin |

---

## Look 10 — Peach Drape

Folder: `src/assets/looks/10/`  ·  Palette: Peach, apricot  ·  Fabric: Silk jersey, satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: draped jersey top, peach satin maxi skirt, strappy sandals. A one-shoulder jersey top draped by hand on the stand, above a satin maxi skirt and barely-there strappy sandals. |
| `draped-jersey-top.png` | Draped Jersey Top in peach, apricot, silk jersey, satin |
| `peach-satin-maxi-skirt.png` | Peach Satin Maxi Skirt in peach, apricot, silk jersey, satin |
| `strappy-sandals.png` | Strappy Sandals in peach, apricot, silk jersey, satin |

---

## Look 11 — Blush Tulle

Folder: `src/assets/looks/11/`  ·  Palette: Blush, ballet pink  ·  Fabric: Silk tulle, satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: tulle tiered dress, satin ballet flats. Seven tiers of silk tulle float from a fitted bodice. Satin ballet flats keep it light enough to dance in. |
| `tulle-tiered-dress.png` | Tulle Tiered Dress in blush, ballet pink, silk tulle, satin |
| `satin-ballet-flats.png` | Satin Ballet Flats in blush, ballet pink, silk tulle, satin |

---

## Look 12 — Cloud Cape

Folder: `src/assets/looks/12/`  ·  Palette: Cloud white, cream  ·  Fabric: Double-face wool, cashmere knit

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: cloud wool cape coat, cream knit maxi dress. A cape coat in cloud-white double-face wool falls over a long cashmere knit dress — softness and strength in one silhouette. |
| `cloud-wool-cape-coat.png` | Cloud Wool Cape Coat in cloud white, cream, double-face wool, cashmere knit |
| `cream-knit-maxi-dress.png` | Cream Knit Maxi Dress in cloud white, cream, double-face wool, cashmere knit |

---

## Look 13 — Peach Cascade

Folder: `src/assets/looks/13/`  ·  Palette: Peach, apricot, champagne  ·  Fabric: Pleated silk satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: peach tiered pleated gown. A halter neckline crosses at the throat and falls into three tiers of pleated satin, each one a shade lighter than the last. |
| `peach-tiered-pleated-gown.png` | Peach Tiered Pleated Gown in peach, apricot, champagne, pleated silk satin |

---

## Look 14 — Midnight Velvet

Folder: `src/assets/looks/14/`  ·  Palette: Midnight navy  ·  Fabric: Silk velvet, duchess satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: midnight velvet satin gown. An evening gown that joins two fabrics: a draped velvet bodice with cut-out shoulders and a hand-beaded waist, opening into a sweep of liquid satin. |
| `midnight-velvet-satin-gown.png` | Midnight Velvet Satin Gown in midnight navy, silk velvet, duchess satin |

---

## Look 15 — Sage Drape

Folder: `src/assets/looks/15/`  ·  Palette: Sage, eucalyptus  ·  Fabric: Silk satin, chiffon

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: sage off shoulder gown. An off-shoulder satin bodice wraps into cascading chiffon layers that open at the front to show the step. |
| `sage-off-shoulder-gown.png` | Sage Off Shoulder Gown in sage, eucalyptus, silk satin, chiffon |

---

## Look 16 — Emerald Suit

Folder: `src/assets/looks/16/`  ·  Palette: Emerald, ivory  ·  Fabric: Wool twill, silk charmeuse

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: emerald tailored blazer, ivory silk mock neck top, emerald straight trousers. Tailoring in deep emerald: a single-breasted blazer with a peak lapel and straight trousers, softened by an ivory silk mock-neck top. |
| `emerald-tailored-blazer.png` | Emerald Tailored Blazer in emerald, ivory, wool twill, silk charmeuse |
| `ivory-silk-mock-neck-top.png` | Ivory Silk Mock Neck Top in emerald, ivory, wool twill, silk charmeuse |
| `emerald-straight-trousers.png` | Emerald Straight Trousers in emerald, ivory, wool twill, silk charmeuse |

---

## Look 17 — Stone Trench

Folder: `src/assets/looks/17/`  ·  Palette: Stone, oatmeal  ·  Fabric: Cotton gabardine, fine merino

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: classic stone trench, fine knit turtleneck, stone straight trousers. The house trench in its classic form, worn over a fine-gauge turtleneck and straight trousers in tonal stone. |
| `classic-stone-trench.png` | Classic Stone Trench in stone, oatmeal, cotton gabardine, fine merino |
| `fine-knit-turtleneck.png` | Fine Knit Turtleneck in stone, oatmeal, cotton gabardine, fine merino |
| `stone-straight-trousers.png` | Stone Straight Trousers in stone, oatmeal, cotton gabardine, fine merino |

---

## Look 18 — Ivory Suit

Folder: `src/assets/looks/18/`  ·  Palette: Ivory, bone  ·  Fabric: Wool and silk blend

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: ivory single breasted blazer, ivory flared trousers. A single-breasted ivory suit with a long, lean jacket and trousers that flare gently over the shoe. |
| `ivory-single-breasted-blazer.png` | Ivory Single Breasted Blazer in ivory, bone, wool and silk blend |
| `ivory-flared-trousers.png` | Ivory Flared Trousers in ivory, bone, wool and silk blend |

---

## Look 19 — Champagne Evening

Folder: `src/assets/looks/19/`  ·  Palette: Champagne, pearl  ·  Fabric: Hand-sewn sequins, satin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: sequin halter top, champagne satin palazzo, pearl clutch. A halter top embroidered with champagne sequins over liquid satin palazzo trousers, finished with a pearl-beaded clutch. |
| `sequin-halter-top.png` | Sequin Halter Top in champagne, pearl, hand-sewn sequins, satin |
| `champagne-satin-palazzo.png` | Champagne Satin Palazzo in champagne, pearl, hand-sewn sequins, satin |
| `pearl-clutch.png` | Pearl Clutch in champagne, pearl, hand-sewn sequins, satin |

---

## Look 20 — Navy Pinstripe

Folder: `src/assets/looks/20/`  ·  Palette: Navy, cream  ·  Fabric: Pinstripe wool, silk crepe

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: pinstripe double breasted blazer, cream silk shirt, pinstripe wide trousers, navy top handle bag. A double-breasted pinstripe suit with wide trousers and a cream silk shirt, carried with a structured top-handle bag. |
| `pinstripe-double-breasted-blazer.png` | Pinstripe Double Breasted Blazer in navy, cream, pinstripe wool, silk crepe |
| `cream-silk-shirt.png` | Cream Silk Shirt in navy, cream, pinstripe wool, silk crepe |
| `pinstripe-wide-trousers.png` | Pinstripe Wide Trousers in navy, cream, pinstripe wool, silk crepe |
| `navy-top-handle-bag.png` | Navy Top Handle Bag in navy, cream, pinstripe wool, silk crepe |

---

## Look 21 — Charcoal Three Piece

Folder: `src/assets/looks/21/`  ·  Palette: Charcoal, white  ·  Fabric: Wool flannel, cotton poplin

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: charcoal double breasted blazer, charcoal tailored waistcoat, charcoal pleated trousers. Menswear, re-cut for her: a double-breasted jacket, a fitted waistcoat and pleated trousers in charcoal flannel, over a crisp white poplin shirt. |
| `charcoal-double-breasted-blazer.png` | Charcoal Double Breasted Blazer in charcoal, white, wool flannel, cotton poplin |
| `charcoal-tailored-waistcoat.png` | Charcoal Tailored Waistcoat in charcoal, white, wool flannel, cotton poplin |
| `charcoal-pleated-trousers.png` | Charcoal Pleated Trousers in charcoal, white, wool flannel, cotton poplin |

---

## Look 22 — Field Utility

Folder: `src/assets/looks/22/`  ·  Palette: Olive, ecru, cognac  ·  Fabric: Washed cotton twill, Breton jersey

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: olive field jacket, breton stripe top, ecru cargo trousers, cognac crossbody bag. Weekend in the city: a washed olive field jacket over a Breton stripe top, ecru cargo trousers and a cognac leather crossbody bag. |
| `olive-field-jacket.png` | Olive Field Jacket in olive, ecru, cognac, washed cotton twill, breton jersey |
| `breton-stripe-top.png` | Breton Stripe Top in olive, ecru, cognac, washed cotton twill, breton jersey |
| `ecru-cargo-trousers.png` | Ecru Cargo Trousers in olive, ecru, cognac, washed cotton twill, breton jersey |
| `cognac-crossbody-bag.png` | Cognac Crossbody Bag in olive, ecru, cognac, washed cotton twill, breton jersey |

---

## Look 23 — Sky Shirting

Folder: `src/assets/looks/23/`  ·  Palette: Sky blue, white  ·  Fabric: Cotton poplin, linen

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: oversized poplin shirt, sky pleated culottes. An oversized poplin shirt with dropped shoulders, half-tucked into wide linen culottes. Easy, crisp and made for long summer days. |
| `oversized-poplin-shirt.png` | Oversized Poplin Shirt in sky blue, white, cotton poplin, linen |
| `sky-pleated-culottes.png` | Sky Pleated Culottes in sky blue, white, cotton poplin, linen |

---

## Look 24 — Camel Coat

Folder: `src/assets/looks/24/`  ·  Palette: Camel, ecru, charcoal  ·  Fabric: Double-face wool, chunky wool knit

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: camel wool coat, ecru chunky turtleneck, charcoal flannel trousers, espresso shoulder bag. An oversized camel coat thrown over a chunky ecru turtleneck and charcoal flannel trousers — the house uniform for the colder days of the season. |
| `camel-wool-coat.png` | Camel Wool Coat in camel, ecru, charcoal, double-face wool, chunky wool knit |
| `ecru-chunky-turtleneck.png` | Ecru Chunky Turtleneck in camel, ecru, charcoal, double-face wool, chunky wool knit |
| `charcoal-flannel-trousers.png` | Charcoal Flannel Trousers in camel, ecru, charcoal, double-face wool, chunky wool knit |
| `espresso-shoulder-bag.png` | Espresso Shoulder Bag in camel, ecru, charcoal, double-face wool, chunky wool knit |

---

## Look 25 — Sage Knit Set

Folder: `src/assets/looks/25/`  ·  Palette: Sage, eucalyptus  ·  Fabric: Ribbed cotton and silk knit

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: sage ribbed knit top, sage knit wide trousers. A ribbed knit top and wide knitted trousers in sage — the softest set in the collection, made to travel in. |
| `sage-ribbed-knit-top.png` | Sage Ribbed Knit Top in sage, eucalyptus, ribbed cotton and silk knit |
| `sage-knit-wide-trousers.png` | Sage Knit Wide Trousers in sage, eucalyptus, ribbed cotton and silk knit |

---

## Look 26 — Weekend Knit

Folder: `src/assets/looks/26/`  ·  Palette: Oat, white, washed denim  ·  Fabric: Chunky wool knit, cotton denim

| File | Prompt (add the style text above) |
|---|---|
| `model.png` | Model wearing: oat chunky cardigan, white cotton tee, vintage straight jeans, tan leather tote. The off-duty look: an oversized oat cardigan over a white cotton tee, vintage-wash straight jeans and a soft leather tote big enough for everything. |
| `oat-chunky-cardigan.png` | Oat Chunky Cardigan in oat, white, washed denim, chunky wool knit, cotton denim |
| `white-cotton-tee.png` | White Cotton Tee in oat, white, washed denim, chunky wool knit, cotton denim |
| `vintage-straight-jeans.png` | Vintage Straight Jeans in oat, white, washed denim, chunky wool knit, cotton denim |
| `tan-leather-tote.png` | Tan Leather Tote in oat, white, washed denim, chunky wool knit, cotton denim |

