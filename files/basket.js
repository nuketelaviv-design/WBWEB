/* ==========================================================================
   WB PLASTICS — BASKET
   Basket state (localStorage), header icon/badge, drawer, and the
   basket.html page. Reads window.SITE_DATA (data.js) and window.WBSite
   (exposed by app.js) for product lookups.
   ========================================================================== */

(function(){
  const D = window.SITE_DATA;
  const STORAGE_KEY = 'wbp_basket_v1';
  const RETURN_KEY = 'wbp_basket_return';
  const BREAKPOINT_QUERY = '(max-width: 900px)';

  function isStorageAvailable(){
    try {
      const k = '__wbp_test__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }
  const storageOk = isStorageAvailable();

  function defaultState(){
    return {
      version: 1,
      items: [],
      fulfilment: {
        method: 'collect',
        delivery: { name: '', line1: '', line2: '', city: '', postcode: '', phone: '' }
      }
    };
  }

  function loadState(){
    if (!storageOk) return defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) return defaultState();
      const base = defaultState();
      parsed.fulfilment = parsed.fulfilment || base.fulfilment;
      parsed.fulfilment.delivery = Object.assign({}, base.fulfilment.delivery, parsed.fulfilment.delivery || {});
      return parsed;
    } catch (e) {
      return defaultState();
    }
  }

  function saveState(){
    if (!storageOk) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* quota exceeded, etc. */ }
  }

  let state = loadState();

  function slugifyLocal(s){
    return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function makeLineKey(catId, productName, options){
    const optPart = Object.keys(options).sort()
      .map(k => `${slugifyLocal(k)}=${slugifyLocal(options[k])}`)
      .join('|');
    return `${catId}::${slugifyLocal(productName)}::${optPart}`;
  }

  function getDefaultOptions(product){
    const sets = (product.detailOptions && product.detailOptions.length)
      ? product.detailOptions
      : [{ label: 'Size', values: D.defaultSizes }, { label: 'Colour', values: D.defaultColours }];
    const opts = {};
    sets.forEach(s => { opts[s.label] = s.values[0]; });
    return opts;
  }

  function addItem(catId, productSlug, options, qty){
    qty = qty || 1;
    const site = window.WBSite;
    const found = site && site.findProduct(catId, productSlug);
    if (!found) return false;
    const { cat, product } = found;
    const key = makeLineKey(catId, product.name, options);
    const existing = state.items.find(i => i.key === key);
    if (existing){
      existing.qty += qty;
    } else {
      state.items.push({
        key, catId, catName: cat.name, productSlug,
        name: product.name,
        image: product.image || '',
        price: typeof product.price === 'number' ? product.price : 0,
        options, qty, addedAt: Date.now()
      });
    }
    saveState();
    renderBadge();
    return true;
  }

  function quickAdd(catId, productSlug, qty){
    const site = window.WBSite;
    const found = site && site.findProduct(catId, productSlug);
    if (!found) return false;
    return addItem(catId, productSlug, getDefaultOptions(found.product), qty || 1);
  }

  function updateQty(key, qty){
    const item = state.items.find(i => i.key === key);
    if (!item) return;
    if (qty <= 0) { removeItem(key); return; }
    item.qty = qty;
    saveState();
    renderBadge();
  }

  function removeItem(key){
    state.items = state.items.filter(i => i.key !== key);
    saveState();
    renderBadge();
  }

  function clearBasket(){
    state.items = [];
    saveState();
    renderBadge();
  }

  function getItems(){ return state.items; }
  function getCount(){ return state.items.reduce((n, i) => n + i.qty, 0); }
  function getSubtotal(){ return state.items.reduce((n, i) => n + i.qty * i.price, 0); }
  function getFulfilment(){ return state.fulfilment; }

  function setFulfilmentMethod(method){
    state.fulfilment.method = method;
    saveState();
  }

  function setDeliveryAddress(fields){
    state.fulfilment.delivery = Object.assign({}, state.fulfilment.delivery, fields);
    saveState();
  }

  function getDeliveryFee(){
    if (state.fulfilment.method !== 'delivery') return 0;
    const f = D.fulfilment.delivery;
    if (f.freeOverThreshold && getSubtotal() >= f.freeOverThreshold) return 0;
    return f.fee;
  }

  function getTotal(){ return getSubtotal() + getDeliveryFee(); }

  /* ---------- Header badge ---------- */
  function renderBadge(){
    const badge = document.getElementById('basketBadge');
    if (!badge) return;
    const count = getCount();
    badge.textContent = String(count);
    badge.hidden = count === 0;
  }

  /* ---------- Shared line-item controls (drawer + basket page) ---------- */
  function onLineControlClick(e, rerender){
    const qtyBtn = e.target.closest('.qty-btn');
    const removeBtn = e.target.closest('.basket-remove');
    if (qtyBtn){
      const line = qtyBtn.closest('[data-key]');
      const item = state.items.find(i => i.key === line.dataset.key);
      if (item) updateQty(item.key, item.qty + Number(qtyBtn.dataset.dir));
      rerender();
    } else if (removeBtn){
      removeItem(removeBtn.dataset.key);
      rerender();
    }
  }

  function lineItemHtml(item){
    return `
      <div class="basket-line" data-key="${item.key}">
        <div class="basket-line-photo">${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<span class="placeholder">${item.catName}</span>`}</div>
        <div class="basket-line-body">
          <h3>${item.name}</h3>
          <div class="basket-line-options">${Object.entries(item.options).map(([k, v]) => `<span class="spec-tag">${k}: ${v}</span>`).join('')}</div>
          <div class="qty-stepper" data-qty="${item.qty}">
            <button type="button" class="qty-btn" data-dir="-1" aria-label="Decrease quantity">&ndash;</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="qty-btn" data-dir="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="basket-line-meta">
          <span class="basket-line-price">£${(item.price * item.qty).toFixed(2)}</span>
          <button type="button" class="basket-remove" data-key="${item.key}" aria-label="Remove ${item.name}">Remove</button>
        </div>
      </div>
    `;
  }

  /* ---------- Drawer (desktop) ---------- */
  function ensureDrawer(){
    if (document.getElementById('basketDrawer')) return;
    const overlay = document.createElement('div');
    overlay.className = 'basket-overlay';
    overlay.id = 'basketOverlay';
    const drawer = document.createElement('div');
    drawer.className = 'basket-drawer';
    drawer.id = 'basketDrawer';
    drawer.innerHTML = `
      <div class="basket-drawer-head">
        <h3>Your Basket</h3>
        <button type="button" class="basket-drawer-close" id="basketDrawerClose" aria-label="Close basket">&times;</button>
      </div>
      <div class="basket-drawer-body" id="basketDrawerBody"></div>
      <div class="basket-drawer-foot" id="basketDrawerFoot"></div>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    overlay.addEventListener('click', closeDrawer);
    drawer.querySelector('#basketDrawerClose').addEventListener('click', closeDrawer);
    drawer.querySelector('#basketDrawerBody').addEventListener('click', (e) => onLineControlClick(e, renderDrawerContents));
  }

  function renderDrawerContents(){
    const body = document.getElementById('basketDrawerBody');
    const foot = document.getElementById('basketDrawerFoot');
    if (!body || !foot) return;
    const items = state.items;
    if (!items.length){
      body.innerHTML = `<p class="basket-empty">Your basket is empty.</p>`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = items.map(lineItemHtml).join('');
    foot.innerHTML = `
      <div class="summary-row summary-total"><span>Subtotal</span><span>£${getSubtotal().toFixed(2)}</span></div>
      <a class="btn btn-primary basket-drawer-checkout" href="basket.html" id="drawerViewBasket">View basket &amp; checkout &rarr;</a>
    `;
    const viewBtn = foot.querySelector('#drawerViewBasket');
    if (viewBtn) viewBtn.addEventListener('click', setReturnUrl);
  }

  function onEscKey(e){ if (e.key === 'Escape') closeDrawer(); }

  function openDrawer(){
    ensureDrawer();
    renderDrawerContents();
    document.getElementById('basketOverlay').classList.add('open');
    document.getElementById('basketDrawer').classList.add('open');
    document.addEventListener('keydown', onEscKey);
  }

  function closeDrawer(){
    const overlay = document.getElementById('basketOverlay');
    const drawer = document.getElementById('basketDrawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.removeEventListener('keydown', onEscKey);
  }

  /* ---------- Icon click: drawer (desktop) vs navigate (mobile) ---------- */
  function setReturnUrl(){
    try { sessionStorage.setItem(RETURN_KEY, window.location.href); } catch (e) { /* private mode, etc. */ }
  }

  function getReturnUrl(){
    try {
      return sessionStorage.getItem(RETURN_KEY) || 'index.html';
    } catch (e) {
      return 'index.html';
    }
  }

  function handleBasketIconClick(e){
    e.preventDefault();
    if (window.matchMedia(BREAKPOINT_QUERY).matches){
      setReturnUrl();
      window.location.href = 'basket.html';
    } else {
      openDrawer();
    }
  }

  /* ---------- Basket page ---------- */
  function escapeAttr(s){
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function updateFulfilmentPanels(){
    const method = state.fulfilment.method;
    document.querySelectorAll('.fulfilment-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    document.querySelectorAll('.fulfilment-detail').forEach(panel => {
      panel.hidden = panel.dataset.panel !== method;
    });
  }

  function renderItemsAndSummary(){
    const itemsContainer = document.getElementById('basketItemsContainer');
    const summary = document.getElementById('orderSummary');
    if (!itemsContainer || !summary) return;

    const items = state.items;
    itemsContainer.innerHTML = items.length
      ? items.map(lineItemHtml).join('')
      : `<p class="basket-empty">Your basket is empty. <a href="products.html">Browse products &rarr;</a></p>`;

    const subtotal = getSubtotal();
    const fee = getDeliveryFee();
    const total = getTotal();
    const method = state.fulfilment.method;

    summary.innerHTML = `
      <h4>Order summary</h4>
      <div class="summary-row"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>${method === 'delivery' ? 'Delivery' : 'Collection'}</span><span>${fee > 0 ? `£${fee.toFixed(2)}` : 'Free'}</span></div>
      <div class="summary-row summary-total"><span>Total</span><span>£${total.toFixed(2)}</span></div>
      <div class="payment-stub">
        <h4>Payment</h4>
        <button type="button" class="btn btn-primary" disabled aria-disabled="true">Pay by card</button>
        <p class="payment-note">${D.fulfilment.payment.comingSoonNote}</p>
      </div>
    `;

    renderBadge();
  }

  function renderBasketPage(){
    const root = document.getElementById('basketPage');
    if (!root) return;

    const delivery = state.fulfilment.delivery;
    const F = D.fulfilment;

    root.innerHTML = `
      ${!storageOk ? `<p class="basket-storage-warning">Your browser is blocking saved data, so this basket won't be kept if you leave the page.</p>` : ''}
      <div class="basket-shell">
        <div class="basket-main">
          <div class="basket-items" id="basketItemsContainer"></div>

          <div class="fulfilment-panel">
            <h4>Fulfilment</h4>
            <div class="fulfilment-toggle" id="fulfilmentToggle">
              <button type="button" class="fulfilment-option" data-method="collect">${F.collect.label}</button>
              <button type="button" class="fulfilment-option" data-method="delivery">${F.delivery.label}</button>
            </div>

            <div class="fulfilment-detail" data-panel="collect">
              <p>${F.collect.note}</p>
              <p>${D.company.addressLines.join('<br>')}</p>
              <p>${D.company.openingHours.map(o => `${o.days.join('/')}: ${o.opens}&ndash;${o.closes}`).join('<br>')}</p>
            </div>

            <div class="fulfilment-detail" data-panel="delivery">
              <p>${F.delivery.note}${F.delivery.fee > 0 ? ` (£${F.delivery.fee.toFixed(2)})` : ''}</p>
              <form class="form-grid" id="deliveryForm">
                <div><label for="dName">Full name</label><input id="dName" value="${escapeAttr(delivery.name)}"></div>
                <div><label for="dLine1">Address line 1</label><input id="dLine1" value="${escapeAttr(delivery.line1)}"></div>
                <div><label for="dLine2">Address line 2</label><input id="dLine2" value="${escapeAttr(delivery.line2)}"></div>
                <div><label for="dCity">Town / City</label><input id="dCity" value="${escapeAttr(delivery.city)}"></div>
                <div><label for="dPostcode">Postcode</label><input id="dPostcode" value="${escapeAttr(delivery.postcode)}"></div>
                <div><label for="dPhone">Phone</label><input id="dPhone" type="tel" value="${escapeAttr(delivery.phone)}"></div>
              </form>
            </div>
          </div>
        </div>

        <div class="order-summary" id="orderSummary"></div>
      </div>
    `;

    renderItemsAndSummary();
    updateFulfilmentPanels();

    document.getElementById('fulfilmentToggle').addEventListener('click', (e) => {
      const btn = e.target.closest('.fulfilment-option');
      if (!btn) return;
      setFulfilmentMethod(btn.dataset.method);
      updateFulfilmentPanels();
      renderItemsAndSummary();
    });

    document.getElementById('basketItemsContainer').addEventListener('click', (e) => onLineControlClick(e, renderItemsAndSummary));

    const form = document.getElementById('deliveryForm');
    form.addEventListener('input', () => {
      setDeliveryAddress({
        name: form.dName.value, line1: form.dLine1.value, line2: form.dLine2.value,
        city: form.dCity.value, postcode: form.dPostcode.value, phone: form.dPhone.value
      });
    });

    const backBtn = document.getElementById('basketBack');
    if (backBtn) backBtn.addEventListener('click', () => { window.location.href = getReturnUrl(); });
  }

  /* ---------- Init (called by app.js right after renderHeader) ---------- */
  function init(){
    renderBadge();
    const icon = document.getElementById('basketIcon');
    if (icon) icon.addEventListener('click', handleBasketIconClick);
    ensureDrawer();

    window.addEventListener('storage', (e) => {
      if (e.key !== STORAGE_KEY) return;
      state = loadState();
      renderBadge();
      if (document.getElementById('basketDrawer') && document.getElementById('basketDrawer').classList.contains('open')) renderDrawerContents();
      if (document.getElementById('basketPage')) renderBasketPage();
    });
  }

  window.WBBasket = {
    init, addItem, quickAdd, updateQty, removeItem, clearBasket,
    getItems, getCount, getSubtotal, getDeliveryFee, getTotal, getFulfilment,
    setFulfilmentMethod, setDeliveryAddress,
    openDrawer, closeDrawer, renderBasketPage, getReturnUrl
  };
})();
