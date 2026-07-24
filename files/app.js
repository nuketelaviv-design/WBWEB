/* ==========================================================================
   WB PLASTICS — SITE LOGIC
   Reads window.SITE_DATA (data.js) and renders each page.
   You should not need to edit this file to update content — edit data.js.
   ========================================================================== */

(function(){
  const D = window.SITE_DATA;

  function el(html){
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function slugify(s){
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function findProduct(catId, productSlug){
    const cat = D.categories.find(c => c.id === catId);
    if (!cat) return null;
    const product = cat.products.find(p => slugify(p.name) === productSlug);
    if (!product) return null;
    return { cat, product };
  }

  /* ---------- Shared: local SEO structured data ---------- */
  function injectLocalBusinessSchema(){
    const c = D.company;
    const allTowns = [...c.areaServed.primary, ...c.areaServed.wider];
    const schema = {
      "@context": "https://schema.org",
      "@type": "HardwareStore",
      "name": c.name,
      "alternateName": c.fullName,
      "description": c.tagline,
      "image": `${D.siteUrl}/${c.logo}`,
      "url": D.siteUrl,
      "telephone": c.phone,
      "email": c.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": c.addressLines.slice(0, -1).join(', '),
        "addressLocality": c.addressLocality,
        "addressRegion": "Greater Manchester",
        "postalCode": c.postalCode,
        "addressCountry": "GB"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": c.geo.lat, "longitude": c.geo.lng },
      "openingHoursSpecification": c.openingHours.map(o => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": o.days,
        "opens": o.opens,
        "closes": o.closes
      })),
      "areaServed": allTowns.map(name => ({ "@type": "City", "name": name })),
      "sameAs": c.socials.map(s => s.href)
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* ---------- Shared: top bar + header ---------- */
  function renderHeader(activePage){
    const nav = [
      { label: "Home", href: "index.html", key: "home" },
      { label: "Products", href: "products.html", key: "products" },
      { label: "About Us", href: "about.html", key: "about" },
      { label: "Contact", href: "contact.html", key: "contact" }
    ];

    const topbar = el(`
      <div class="topbar">
        <div class="wrap">
          <div class="topbar-left">
            <span>${D.company.addressLines.join(', ')}</span>
          </div>
          <div class="topbar-left">
            <a href="${D.company.phoneHref}">${D.company.phone}</a>
            <a href="mailto:${D.company.email}">${D.company.email}</a>
          </div>
        </div>
      </div>
    `);

    const header = el(`
      <header class="site-header">
        <div class="wrap">
          <a href="index.html" class="logo">
            <img src="${D.company.logo}" alt="${D.company.name} — ${D.company.fullName}">
          </a>
          <nav class="main-nav" id="mainNav">
            ${nav.map(n => `<a href="${n.href}" class="${n.key===activePage?'active':''}">${n.label}</a>`).join('')}
            <a href="${D.company.phoneHref}" class="nav-cta">Call ${D.company.phone}</a>
          </nav>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">&#9776;</button>
        </div>
      </header>
    `);

    document.body.prepend(header);
    document.body.prepend(topbar);

    header.querySelector('#navToggle').addEventListener('click', () => {
      header.querySelector('#mainNav').classList.toggle('open');
    });
  }

  /* ---------- Shared: footer ---------- */
  function renderFooter(){
    const footer = el(`
      <footer class="site-footer">
        <div class="wrap footer-grid">
          <div>
            <h4>${D.company.fullName}</h4>
            <p style="color:#C7D0D3; font-size:14px; max-width:34ch;">${D.company.tagline}</p>
          </div>
          <div>
            <h4>Product ranges</h4>
            ${D.categories.slice(0,6).map(c => `<a href="products.html#${c.id}">${c.name}</a>`).join('')}
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href="${D.company.phoneHref}">${D.company.phone}</a>
            <a href="mailto:${D.company.email}">${D.company.email}</a>
            <a href="contact.html">${D.company.addressLines.join(', ')}</a>
          </div>
        </div>
        <div class="wrap footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${D.company.name}</span>
          <span>Site content and stock ranges are illustrative — confirm current stock with the trade counter.</span>
        </div>
      </footer>
    `);
    document.body.appendChild(footer);
  }

  /* ---------- Homepage ---------- */
  function renderHome(){
    const hero = document.getElementById('hero');
    if (hero){
      hero.innerHTML = `
        <div class="wrap">
          <span class="hero-eyebrow">${D.hero.eyebrow}</span>
          <h1>${D.hero.title}</h1>
          <p>${D.hero.subtitle}</p>
          <div class="hero-ctas">
            <a class="btn btn-primary" href="${D.hero.primaryCta.href}">${D.hero.primaryCta.text} &rarr;</a>
            <a class="btn btn-ghost" href="${D.hero.secondaryCta.href}">${D.hero.secondaryCta.text}</a>
          </div>
        </div>
      `;
    }

    const hi = document.getElementById('highlights');
    if (hi){
      hi.innerHTML = `<div class="wrap">${
        D.highlights.map(h => `
          <div class="highlight-item">
            <div class="value">${h.value}</div>
            <div class="label">${h.label}</div>
          </div>`).join('')
      }</div>`;
    }

    const grid = document.getElementById('aisleGrid');
    if (grid){
      grid.innerHTML = D.categories.map(c => `
        <a class="aisle-card" href="products.html#${c.id}">
          <div class="aisle-sign">
            <span>AISLE <span class="num">${c.bay}</span></span>
            <span>${c.products.length} lines</span>
          </div>
          <div class="aisle-photo">
            ${c.image ? `<img src="${c.image}" alt="${c.name}" loading="lazy">` : ''}
          </div>
          <div class="aisle-body">
            <h3>${c.name}</h3>
            <p>${c.summary}</p>
            <span class="aisle-link">Browse aisle &rarr;</span>
          </div>
        </a>
      `).join('');
    }
  }

  /* ---------- Products page ---------- */
  function renderProducts(){
    const catList = document.getElementById('catList');
    const sections = document.getElementById('catSections');
    const search = document.getElementById('productSearch');
    if (!sections) return;

    if (catList){
      catList.innerHTML = D.categories.map(c => `
        <a href="#${c.id}" data-cat="${c.id}">
          <span>${c.name}</span>
          <span class="n">${c.bay}</span>
        </a>
      `).join('');
    }

    function productCard(p, cat){
      return `
        <a class="product-card" href="product.html?cat=${encodeURIComponent(cat.id)}&p=${encodeURIComponent(slugify(p.name))}"
             data-name="${(p.name+' '+p.description+' '+cat.name).toLowerCase()}">
          <div class="product-photo">
            ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<span class="placeholder">${cat.name}</span>`}
          </div>
          <div class="product-body">
            <h3>${p.name}</h3>
            <p class="desc">${p.description}</p>
            ${p.colours && p.colours.length ? `<div class="swatches">${p.colours.map(col => `<span class="swatch">${col}</span>`).join('')}</div>` : ''}
            ${p.sizes ? `<div class="spec-tag">${p.sizes}</div>` : ''}
          </div>
        </a>
      `;
    }

    sections.innerHTML = D.categories.map(c => `
      <section class="cat-section" id="${c.id}">
        <div class="cat-section-head">
          <span class="bay-num">${c.bay}</span>
          <h2>${c.name}</h2>
          <span class="count">${c.products.length} product${c.products.length===1?'':'s'}</span>
        </div>
        <p class="section-sub" style="margin-bottom:20px;">${c.summary}</p>
        <div class="product-grid">
          ${c.products.map(p => productCard(p, c)).join('')}
        </div>
      </section>
    `).join('');

    // Search filter — filters product cards and hides empty sections
    if (search){
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        let anyVisible = false;
        document.querySelectorAll('.cat-section').forEach(sec => {
          let sectionHasMatch = false;
          sec.querySelectorAll('.product-card').forEach(card => {
            const match = !q || card.dataset.name.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) sectionHasMatch = true;
          });
          sec.style.display = sectionHasMatch ? '' : 'none';
          if (sectionHasMatch) anyVisible = true;
        });
        let noResults = document.getElementById('noResults');
        if (!anyVisible){
          if (!noResults){
            noResults = el(`<p id="noResults" class="no-results">No products match "${search.value}". Try a different word, or call the trade counter — we stock more than the website shows.</p>`);
            sections.appendChild(noResults);
          }
        } else if (noResults){
          noResults.remove();
        }
      });
    }

    // Highlight active category link on scroll
    const links = catList ? Array.from(catList.querySelectorAll('a')) : [];
    if (links.length){
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            links.forEach(l => l.classList.toggle('active', l.dataset.cat === entry.target.id));
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px' });
      document.querySelectorAll('.cat-section').forEach(s => observer.observe(s));
    }
  }

  /* ---------- Product detail page ---------- */
  function renderProductDetail(){
    const crumb = document.getElementById('productCrumb');
    const detail = document.getElementById('productDetail');
    if (!detail) return;

    const params = new URLSearchParams(window.location.search);
    const found = findProduct(params.get('cat'), params.get('p'));

    if (!found){
      detail.innerHTML = `
        <div class="section">
          <span class="section-kicker">Not found</span>
          <h2 style="font-size:clamp(24px,3vw,32px); margin-bottom:14px;">We couldn't find that product</h2>
          <p class="section-sub" style="margin-bottom:20px;">It may have been renamed or removed.</p>
          <a class="btn btn-primary" href="products.html">Back to all products &rarr;</a>
        </div>
      `;
      return;
    }

    const { cat, product } = found;
    document.title = `${product.name} — WB Plastics, Salford & Greater Manchester`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc){
      metaDesc.setAttribute('content',
        `${product.description} Stocked at WB Plastics' Salford trade counter, serving ${D.company.areaServed.primary.join(', ')} and Greater Manchester.`);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical){
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${D.siteUrl}/product.html${window.location.search}`);

    if (crumb){
      crumb.innerHTML = `
        <div class="detail-crumb">
          <a href="products.html">Products</a>
          <span>/</span>
          <a href="products.html#${cat.id}">${cat.name}</a>
          <span>/</span>
          <span>${product.name}</span>
        </div>
      `;
    }

    // A product can opt out of the default Size + Colour dropdown pair by
    // providing its own `detailOptions`: [{ label, values }, ...].
    const optionSets = product.detailOptions && product.detailOptions.length
      ? product.detailOptions
      : [
          { label: "Size", values: D.defaultSizes },
          { label: "Colour", values: D.defaultColours }
        ];

    const optionFields = optionSets.map((opt, i) => {
      const id = `detailOption${i}`;
      const choices = opt.values.map(v => `<option value="${v}">${v}</option>`).join('');
      return `
        <div class="detail-field">
          <label for="${id}">${opt.label}</label>
          <select id="${id}">${choices}</select>
        </div>
      `;
    }).join('');

    detail.innerHTML = `
      <div class="product-detail-shell">
        <div class="product-detail-photo">
          ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<span class="placeholder">${cat.name}</span>`}
        </div>
        <div class="product-detail-info">
          <span class="section-kicker">${cat.name}</span>
          <h1>${product.name}</h1>
          <p class="desc">${product.description}</p>

          ${optionFields}

          <a class="btn btn-primary" href="${D.company.phoneHref}">Call to check stock &rarr;</a>
        </div>
      </div>
    `;
  }

  /* ---------- About page ---------- */
  function renderAbout(){
    const map = document.getElementById('aboutMap');
    if (map){
      map.innerHTML = `
        <iframe src="${D.about.map.embedSrc}" loading="lazy" allowfullscreen title="WB Plastics on Google Maps"></iframe>
        <a class="map-badge" href="${D.about.map.link}" target="_blank" rel="noopener">Open in Google Maps</a>
      `;
    }

    const box = document.getElementById('aboutContent');
    if (box){
      const primary = D.company.areaServed.primary.join(', ');
      const wider = D.company.areaServed.wider.join(', ');
      box.innerHTML = `
        <span class="section-kicker">${D.about.kicker}</span>
        <h2>${D.about.title}</h2>
        ${D.about.body.map(p => `<p>${p}</p>`).join('')}
        <h3 style="font-size:19px; margin-top:24px; margin-bottom:10px;">Areas we cover</h3>
        <p>We regularly serve <strong>${primary}</strong>, with delivery available further across Greater Manchester, including ${wider}.</p>
      `;
    }
  }

  /* ---------- Contact page ---------- */
  function renderContact(){
    const box = document.getElementById('contactDetails');
    if (box){
      box.innerHTML = `
        <div class="contact-card">
          <h3>Address</h3>
          <p>${D.company.addressLines.join('<br>')}</p>
          <h3>Phone</h3>
          <p><a class="big" href="${D.company.phoneHref}">${D.company.phone}</a></p>
          <h3>Email</h3>
          <p><a class="big" href="mailto:${D.company.email}">${D.company.email}</a></p>
          <iframe class="map-frame" loading="lazy"
            src="https://maps.google.com/maps?q=${encodeURIComponent(D.company.mapQuery)}&z=14&output=embed"></iframe>
        </div>
      `;
    }
    const form = document.getElementById('contactForm');
    if (form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value, email = form.email.value, subject = form.subject.value || 'Website enquiry';
        const message = form.message.value;
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${D.company.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    injectLocalBusinessSchema();
    renderHeader(page);
    renderFooter();
    if (page === 'home') renderHome();
    if (page === 'products') renderProducts();
    if (page === 'product') renderProductDetail();
    if (page === 'about') renderAbout();
    if (page === 'contact') renderContact();
  });
})();
