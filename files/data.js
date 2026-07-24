/*
  ============================================================
  WB PLASTICS — SITE DATA
  ============================================================
  This is the ONLY file you need to edit to update the website.

  - To change company details (phone, email, address) edit COMPANY below.
  - To edit the homepage headline, edit HERO below.
  - To add, remove or edit a PRODUCT CATEGORY (e.g. "Roofline"),
    edit the CATEGORIES array. Each category is one aisle in the
    "warehouse directory" on the homepage and one section on the
    Products page.
  - To add, remove or edit a PRODUCT within a category, edit that
    category's `products` array.
  - Nothing else on the site needs to change — pages read this
    file and build themselves automatically.

  Field guide for a product:
    name        - product name, shown as a heading
    description - a sentence or two about the product
    image       - a photo URL (or leave "" for a placeholder swatch)
    colours     - array of colour names, shown as small tags
    sizes       - short text describing sizes/lengths/thicknesses
    sku         - optional reference code, shown in the mono spec tag
  ============================================================
*/

window.SITE_DATA = {

  // Live domain — used to build the structured data (LocalBusiness/SEO)
  // injected on every page. Update if the site ever moves domain.
  siteUrl: "https://wbplastics.co.uk",

  company: {
    name: "WB Plastics",
    fullName: "Wholesale Building Plastics",
    tagline: "Building plastics, stocked and ready.",
    // Path to the logo image used in the header. Replace assets/logo.jpg
    // with a new file (same name) to swap the logo without editing code.
    logo: "assets/logo.jpg",
    phone: "01204 792 000",
    phoneHref: "tel:01204792000",
    email: "info@wbplastics.co.uk",
    addressLines: ["Unit 8, Grecian Mill", "Worsley Road North", "Manchester, M28 3QW"],
    mapQuery: "Unit 8, Grecian Mill, Worsley Road North, Manchester, M28 3QW",
    // Used in the LocalBusiness structured data — keep in sync with mapQuery.
    geo: { lat: 53.5377658, lng: -2.3990776 },
    addressLocality: "Salford",
    postalCode: "M28 3QW",
    socials: [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100014280215027" }
    ],
    // Trade counter opening hours — shown in structured data (can surface
    // directly in Google search results), keep accurate.
    openingHours: [
      { days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      { days: ["Saturday"], opens: "08:00", closes: "12:00" }
    ],
    // Local SEO targeting — primary towns are closest to the Salford/M61
    // trade counter, wider towns are the rest of Greater Manchester.
    areaServed: {
      primary: ["Salford", "Bolton", "Bury", "Wigan"],
      wider: ["Manchester", "Stockport", "Oldham", "Rochdale", "Tameside", "Trafford"]
    }
  },

  hero: {
    eyebrow: "Trade counter & wholesale · Manchester · Open to the public",
    title: "Everything on the wagon, nothing on backorder.",
    subtitle: "Roofline, cladding, guttering, drainage, sealants, fixings, trims and lead — stocked in depth and ready to collect or deliver.",
    primaryCta: { text: "Browse the warehouse", href: "products.html" },
    secondaryCta: { text: "Call the trade counter", href: "tel:01204792000" }
  },

  // Small trust strip under the hero — edit freely, add/remove items.
  highlights: [
    { label: "Trade counter", value: "Open 6 days a week" },
    { label: "Stock", value: "9 product ranges, in depth" },
    { label: "*Enquire for more locations", value: "Delivery to the Greater Manchester Area*" },
    { label: "Advice", value: "Real merchants, real answers" }
  ],

  // Content for the About Us page — edit freely.
  about: {
    kicker: "About us",
    title: "Your local trade counter for building plastics.",
    body: [
      "WB Plastics is a family-run business established in 2014 — 12 years in business, backed by over 30 years of combined construction experience. We're located in Salford, just off the M61, and open to both the trade and the public.",
      "We stock a wide range of PVC-U building materials, including Deeplas profiles, and carry top cutting-edge brands in the market such as Easy Trim and Deeplas soffits, fascias and cladding. Every product we sell is weather resistant, low maintenance and built to a high quality standard — the installer's choice.",
      "Alongside our roofline range, we also sell composite doors and door panels, sealants, cleaners, ancillaries, fixings, and decorative internal and external cladding."
    ],
    map: {
      embedSrc: "https://www.google.com/maps?q=53.5377658,-2.3990776&z=16&output=embed",
      link: "https://www.google.com/maps/place/WBPlastics+Upvc+Trade+Counter/@53.537769,-2.4016525,17z/data=!3m1!4b1!4m6!3m5!1s0x487ba8a0431c3931:0x37533ecefdac57c7!8m2!3d53.5377658!4d-2.3990776!16s%2Fg%2F11b7c2sytc?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D"
    }
  },

  // Placeholder size/colour options shown on every individual product page,
  // until each product has its own confirmed size and colour range.
  defaultSizes: ["150mm", "175mm", "200mm", "225mm", "250mm", "300mm", "405mm"],
  defaultColours: ["White", "Black Ash", "Anthracite Grey RAL 7016", "Rosewood"],

  categories: [
    {
      id: "roofline",
      bay: "01",
      name: "Roofline",
      summary: "Fascias, soffits, dry verge and eaves protection in every stock colour.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-6.png",
      products: [
        {
          name: "Replacement Fascia",
          description: "Fixes to the rafters running parallel to the house, concealing them and carrying the gutter brackets.",
          image: "assets/products/replacement_fascia.png",
          colours: ["White", "Anthracite Grey", "Black Ash", "Rosewood"],
          sizes: "150mm – 600mm · corners, joiners & finials to match"
        },
        {
          name: "Capping Board",
          description: "Caps over existing timber fascia boards without stripping them back.",
          image: "assets/products/fascia.png",
          colours: ["White", "Anthracite Grey", "Black Ash", "Rosewood"],
          sizes: "150mm – 600mm · corners, joiners, end caps & finials"
        },
        {
          name: "Soffit Board",
          description: "9mm general purpose board; larger widths are double-ended as standard.",
          image: "assets/products/soffit-board.png",
          colours: ["White", "Anthracite Grey", "Black Ash", "Rosewood"],
          sizes: "150mm – 600mm (white also in 100mm)"
        },
        {
          name: "Dry Verge",
          description: "Universal Easy-Trim Verge U — left or right side, compatible with most tile types, fast to fit.",
          image: "assets/products/imagesaccessories/dryverge_generic.jpg",
          colours: ["Grey", "Black", "Brown"],
          sizes: "Starter kits, 10mm over-fascia ventilation, Ridge F Plus & Lead R accessories in stock"
        },
        {
          name: "Eaves Tray",
          description: "Prevents felt sagging and ponding at eaves level — ideal for new build or re-roofs without stripping large felt sections.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2025/10/cropped-eaves-rtaY.jpg",
          colours: ["Grey/Black"],
          sizes: "1500mm lengths"
        },
        {
          name: "Ridge Kits",
          description: "Easy-Trim Ridge F Plus 3 metre dry fix ridge kit — universal union clips, ridge union strap, fixings and hip accessory pack available.",
          image: "assets/products/imagesaccessories/easy-trim-Premium-Dry-Fix-Ridge-Kits-3m-Black.jpg",
          colours: ["Black", "Terracotta"],
          sizes: "3 metre kits",
          // This product only needs a single Colour dropdown on its page,
          // instead of the default Size + Colour pair.
          detailOptions: [
            { label: "Colour", values: ["Black", "Terracotta"] }
          ]
        }
      ]
    },
    {
      id: "guttering",
      bay: "02",
      name: "Guttering",
      summary: "Rainwater systems available in: half round, square, deepflow, 150mm Kommercial & aquaflow Ogee, all downpipes and every gutter part to finish the job.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-10.png",
      products: [
        {
          name: "Rainwater Guttering",
          description: "Half Round, Square Line, Deep Flow High Capacity and Ogee styles, in a wide range of colours.",
          image: "assets/products/rainwater-guttering.png",
          colours: ["White", "Black", "Grey", "Brown"],
          sizes: "2m – 5m lengths, including 150mm commercial"
        },
        {
          name: "Downpipes",
          description: "Round or square rainwater pipe, carrying water from gutter to ground.",
          image: "assets/products/rainwater-guttering.png",
          colours: ["White", "Black", "Grey", "Brown"],
          sizes: "2.5m & 5.5m lengths, 2 sizes available"
        },
        {
          name: "Guttering Ancillaries",
          description: "Joints, clips, bends and brackets for all rainwater goods, in every stock colour.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-39.png",
          colours: ["To match stock guttering"],
          sizes: "All fittings held in stock"
        }
      ]
    },
    {
      id: "drainage",
      bay: "03",
      name: "Drainage",
      summary: "Underground and above-ground drainage, gullies, manholes and channel drain.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-12.png",
      products: [
        {
          name: "Underground Drainage",
          description: "110mm underground drainage pipe in terracotta, plus 160mm underground pipe.",
          image: "assets/products/imagesunderground/length_pipe.jpg",
          colours: ["Terracotta"],
          sizes: "110mm: 3m & 6m · 160mm: 6m"
        },
        {
          name: "Above Ground Drainage",
          description: "110mm above-ground drainage pipe, readily stocked.",
          image: "assets/products/length_pipe_bk.webp",
          colours: ["Black", "White"],
          sizes: "3m lengths"
        },
        {
          name: "Roddable Gully",
          description: "Back inlet roddable and plain-ended roddable, in square or round tops.",
          image: "assets/products/roddable-gully.png",
          colours: ["Standard"],
          sizes: "Square & round top variants"
        },
        {
          name: "Flexi Couplers",
          description: "Rubber flexible adaptors for connecting pipes with different outside dimensions.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-16.png",
          colours: ["—"],
          sizes: "4\" clay–plastic, 4\" cast–plastic, 6\" clay–clay, 6\" clay–plastic, 6\" cast–plastic, 4\" clay–clay"
        },
        {
          name: "Manholes & Channel Drain",
          description: "Chamber bases and raisers, covers and frames, riser rings, long radius bends and PVC channel drain.",
          image: "assets/products/manholes-channel-drain.png",
          colours: ["Square & round"],
          sizes: "Chambers: 320mm & 470mm · channel drain in 1m lengths"
        }
      ]
    },
    {
      id: "trims",
      bay: "04",
      name: "Trims",
      summary: "Architrave, D-mould, quadrant and angle beads to finish window and door reveals.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-image-1.png",
      products: [
        {
          name: "Architrave",
          description: "A professional finish around window and door edges, in three widths.",
          image: "assets/products/architrave.png",
          colours: ["White", "Grey", "Cream", "Oak", "Black", "Rosewood", "Chartwell Green"],
          sizes: "45mm, 65mm, 95mm"
        },
        {
          name: "D Mould",
          description: "A neat, chamfered finish around window frames, between frame and cill.",
          image: "",
          colours: ["White", "Grey", "Cream", "Oak", "Black", "Rosewood", "Chartwell Green"],
          sizes: "19mm & 24mm"
        },
        {
          name: "Quadrant",
          description: "Covers gaps between windows and cills; adjustable variants suit bay poles and corner posts.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-34.png",
          colours: ["White", "Grey", "Cream", "Oak", "Black", "Rosewood", "Chartwell Green"],
          sizes: "13.5mm & 18.5mm"
        },
        {
          name: "Angle Beads",
          description: "Softens and hides rough or unfinished edges, nails and screws.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-image-2.png",
          colours: ["White", "Grey", "Cream", "Oak", "Black", "Rosewood", "Chartwell Green"],
          sizes: "25x25, 40x45, 100x80"
        }
      ]
    },
    {
      id: "cladding",
      bay: "05",
      name: "Cladding",
      summary: "Hollow, shiplap and decorative panel cladding for exteriors, bathrooms and wet rooms.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/image.png",
      products: [
        {
          name: "Hollow Cladding",
          description: "A sturdier hollow soffit board with protective tape and a double-skinned fixing location for a solid install.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2025/10/cropped-hollow-soffit.jpg",
          colours: ["White", "Anthracite Grey", "Black Grain", "Rosewood"],
          sizes: "5000mm x 300mm · starter trims, joints & angle trims to suit"
        },
        {
          name: "Shiplap Cladding",
          description: "The look of timber cladding with none of the maintenance — no sanding, painting or staining, won't warp, split or rot.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/image.png",
          colours: ["White", "Anthracite Grey", "Black Grain", "Rosewood"],
          sizes: "5000mm x 150mm · starter trims, joints & angle trims to suit"
        },
        {
          name: "Decorative Wall Panels",
          description: "Flush, waterproof shower panels for bathrooms and wet rooms — fits over existing tiles, no grouting.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-Untitled.png",
          colours: ["Full range on request"],
          sizes: "Packs of 4 · 250mm x 2700mm"
        }
      ]
    },
    {
      id: "fixings",
      bay: "06",
      name: "Fixings",
      summary: "Polypins, screws, drill bits and the general tools to put everything else up.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-25.png",
      products: [
        {
          name: "Polypins",
          description: "Plastic-headed pins & nails in marine-grade stainless steel, made for neat fascia and soffit fixing.",
          image: "assets/products/polypins.png",
          colours: ["White", "Black", "Grey", "Brown"],
          sizes: "30mm, 40mm, 50mm, 65mm"
        },
        {
          name: "Wood Screws",
          description: "No pre-drilling, superior holding power, faster penetration and less drive-in torque required.",
          image: "",
          colours: ["Yellow passivated"],
          sizes: "4.0 & 5.0 head · 20–100mm long · wall plugs also stocked"
        },
        {
          name: "Concrete Screws",
          description: "Self-tapping, no plug required, high strength for masonry and concrete.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-27.png",
          colours: ["Zinc"],
          sizes: "82, 102, 122 & 152mm long"
        },
        {
          name: "Bay Poles",
          description: "Wafer-head screws designed for joining bay window uPVC sections.",
          image: "",
          colours: ["Standard"],
          sizes: "4.8 x 60 & 4.8 x 80"
        },
        {
          name: "Cover Caps",
          description: "Two-part snap caps — a washer base and locking dome cap — for an air and watertight seal over fixings.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-29.png",
          colours: ["To match fixings"],
          sizes: "Standard"
        },
        {
          name: "Drill Bits",
          description: "SDS+ bits for brick and concrete, HSS bits for metal.",
          image: "",
          colours: ["Standard"],
          sizes: "SDS 5.5mm x 160mm up to 14mm x 210mm"
        },
        {
          name: "General Tools",
          description: "Glazing hammers, Stanley blades and everything from HSS through to SDS bits.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-31.png",
          colours: ["—"],
          sizes: "Full range in stock"
        }
      ]
    },
    {
      id: "sealants-adhesives",
      bay: "07",
      name: "Sealants & Adhesives",
      summary: "Silicones, foams, adhesives, caulk and the cleaning products to go with them.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-20-1.png",
      products: [
        {
          name: "Silicones",
          description: "Professional grade sealants for interior and exterior work, including dedicated lead, roof & gutter and bathroom & kitchen ranges.",
          image: "assets/products/silicones.png",
          colours: ["White", "Black", "Grey", "Brown", "Toffee", "Translucent"],
          sizes: "Standard cartridges"
        },
        {
          name: "Expanding Foams",
          description: "Hand and gun-grade polyurethane foams from Soudal, including a fast-setting Easyfix and a fire-rated foam for Building Control compliance.",
          image: "",
          colours: ["Standard"],
          sizes: "Hand-held & gun grade"
        },
        {
          name: "Cleaning Products",
          description: "Technical sprays for construction and industrial use — glue, silicone and PU foam removers, solvent & cream cleaners for uPVC, wipes, sanitisers and a foil-safe cleaner.",
          image: "assets/products/cleaning-products.png",
          colours: ["—"],
          sizes: "Full range in stock"
        },
        {
          name: "Adhesives",
          description: "Fix All hybrid polymer sealant-adhesives, Grip All grab adhesives, plus wood and parquet adhesives.",
          image: "",
          colours: ["White", "Grey", "Black", "Translucent"],
          sizes: "Standard cartridges"
        },
        {
          name: "Caulk",
          description: "Fillers for interior and exterior construction, plus a specialist automotive range.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-24.png",
          colours: ["White"],
          sizes: "Standard cartridges"
        }
      ]
    },
    {
      id: "interior-cladding",
      bay: "08",
      name: "Interior Wall & Ceiling Cladding",
      summary: "Sparkle, stone and hexagon-effect panels plus a full trim set for bathrooms, wet rooms and kitchens.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/Platinum-Grey-Sparkle.jpg",
      products: [
        {
          name: "Wall Panel Styles",
          description: "Fourteen finishes in stock including Platinum Grey Sparkle, Midnight Stone Blue, Pergamon, Black Sparkle, Hexagon Dream Aqua, Concrete Grey, White Sparkle, Travertine and more.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/Midnight-Stone-Blue.jpg",
          colours: ["Sparkle", "Stone", "Hexagon", "Mosaic", "Gloss", "Pastel"],
          sizes: "Ask in store for current sheet sizes"
        },
        {
          name: "Internal / External Corner",
          description: "Matching corner trims for a clean finish where panels meet.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/internal-corner.jpg",
          colours: ["White", "Black", "Silver"],
          sizes: "5mm / 8mm / 10mm x 2.6m"
        },
        {
          name: "Edge / End Trim & H-Section Joiner",
          description: "Finishing and joining trims for panel runs.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/H-Section-Joiner.jpg",
          colours: ["White", "Black", "Silver"],
          sizes: "5mm / 8mm / 10mm x 2.6m"
        },
        {
          name: "Coving & Quadrant Trim",
          description: "Coving for a rounded ceiling junction; quadrant trim for internal corners.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/coving.jpg",
          colours: ["White", "Silver"],
          sizes: "Coving 5mm/8mm x 2.6m · Quadrant 19mm x 2.6m"
        },
        {
          name: "Rigid Angle",
          description: "A crisp right-angle trim for panel edges and returns.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2024/06/rigid-angle.jpg",
          colours: ["White", "Silver", "Aluminium Chrome"],
          sizes: "25mm / 25mm x 2.6m"
        }
      ]
    },
    {
      id: "lead",
      bay: "09",
      name: "Lead Flashing",
      summary: "Rolled lead flashing, pliable and reliable, stocked in depth.",
      image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-36.png",
      products: [
        {
          name: "Rolled Lead",
          description: "An excellent roofing material — pliable, easy to use, and works well alongside other roofing products.",
          image: "https://wbplastics.co.uk/wp-content/uploads/2021/02/cropped-bigback-36.png",
          colours: ["Code 3 (1.32mm)", "Code 4 (1.80mm)"],
          sizes: "3m or 6m lengths · 150mm – 600mm widths"
        }
      ]
    }
  ]
};
