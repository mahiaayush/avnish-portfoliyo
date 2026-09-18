// Main JavaScript logic for Pt. Avnish Mishra Website

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initQualifications();
  initServices('all');
  initGallery('all');
  initSamagriChecklist('griha-pravesh');
  initTestimonials();
  initFaqs();
  initModals();
  initBookingForm();
  populateBookingSelect();
});

// Navigation & Mobile Drawer
function initNavigation() {
  const navToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('main-header');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
      header.classList.remove('bg-white');
    } else {
      header.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
      header.classList.add('bg-white');
    }
  });
}

// Populate Booking Service Select Options
function populateBookingSelect() {
  const select = document.getElementById('booking-service-select');
  if (!select) return;

  select.innerHTML = '<option value="">-- कृपया पूजा / परामर्श का चयन करें --</option>' +
    SITE_DATA.services.map(s => `<option value="${s.title}">${s.title} (${s.duration})</option>`).join('');
}

// Educational Qualifications & Degree Graph Line Showcase
let currentEduOrder = 'asc';

function initQualifications() {
  renderEducationGraph(currentEduOrder);
}

function setEduOrder(order) {
  currentEduOrder = order;
  const btnAsc = document.getElementById('edu-order-asc');
  const btnDesc = document.getElementById('edu-order-desc');

  if (btnAsc && btnDesc) {
    if (order === 'asc') {
      btnAsc.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-amber-300 bg-saffron-600 text-white shadow-md flex items-center gap-1.5';
      btnDesc.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-stone-200 bg-white text-stone-700 hover:bg-amber-50 flex items-center gap-1.5';
    } else {
      btnDesc.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-amber-300 bg-saffron-600 text-white shadow-md flex items-center gap-1.5';
      btnAsc.className = 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-stone-200 bg-white text-stone-700 hover:bg-amber-50 flex items-center gap-1.5';
    }
  }

  renderEducationGraph(order);
}

function renderEducationGraph(order = 'asc') {
  const container = document.getElementById('qualifications-graph-container');
  if (!container || !SITE_DATA.qualifications) return;

  const list = [...SITE_DATA.qualifications];
  if (order === 'desc') {
    list.reverse();
  }

  container.innerHTML = `
    <!-- Continuous Vertical Graph Line -->
    <div class="edu-graph-line"></div>

    ${list.map((q, index) => {
      const isLeft = index % 2 === 0;
      const stepDisplay = order === 'asc' ? q.step : (list.length - index);

      return `
        <div class="edu-graph-item ${isLeft ? 'item-left' : 'item-right'} group">
          
          <!-- Node Milestone on Graph Line -->
          <div class="edu-graph-node">
            ${stepDisplay}
          </div>

          <!-- Card Content -->
          <div class="edu-graph-card">
            
            <!-- Top Header: Year Badge & Result Pill -->
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-saffron-600 text-white font-bold text-xs sm:text-sm shadow-sm">
                <i class="fa-regular fa-calendar-check"></i>
                <span>वर्ष ${q.year}</span>
              </span>

              <span class="vedic-badge text-xs">
                <i class="fa-solid fa-award text-amber-600"></i> ${q.division}
              </span>
            </div>

            <!-- Class Level & Course Title -->
            <div class="mb-2">
              <span class="text-xs font-bold text-amber-700 tracking-wider uppercase block">
                ${q.classLevel}
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-stone-900 font-devanagari group-hover:text-amber-700 transition-colors">
                ${q.title}
              </h3>
            </div>

            <!-- Institution Name -->
            <p class="text-sm font-semibold text-amber-950 mb-1 flex items-start gap-1.5">
              <i class="fa-solid fa-building-columns text-amber-600 text-xs mt-1 flex-shrink-0"></i>
              <span>${q.institution}</span>
            </p>
            ${q.college ? `<p class="text-xs text-stone-500 mb-3 pl-4">${q.college}</p>` : '<div class="mb-3"></div>'}

            <!-- MAIN SUBJECT HIGHLIGHT BOX -->
            <div class="main-subject-box mb-3.5 shadow-sm">
              <div class="flex items-center gap-1.5 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
                <i class="fa-solid fa-book-bookmark text-amber-600"></i>
                <span>मुख्य अध्ययन विषय (Main Subjects):</span>
              </div>
              <p class="text-sm font-bold text-stone-900 leading-snug">
                ${q.mainSubjects}
              </p>
            </div>

            <!-- Highlights Note -->
            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
              ${q.highlights}
            </p>

            <!-- Marks & Roll Info -->
            <div class="flex flex-wrap items-center justify-between text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 mb-4 gap-2">
              <div><strong class="text-stone-700">प्राप्तांक / परिणाम:</strong> ${q.marks}</div>
              <div><strong class="text-stone-700">अनुक्रमांक / Roll No:</strong> ${q.rollNo}</div>
            </div>

            <!-- Action Buttons: View Certificate / Marksheet / PDF -->
            <div class="pt-3 border-t border-stone-100 flex flex-wrap sm:flex-nowrap items-center gap-2">
              <button onclick="viewDocument('${q.image}', '${q.title} - ${q.institution} (वर्ष ${q.year})')" 
                      class="btn-outline-vedic flex-1 text-xs py-2 px-3 justify-center">
                <i class="fa-regular fa-id-card text-sm"></i>
                <span>उपाधि पत्र देखें</span>
              </button>
              ${q.marksheetImage && q.marksheetImage !== q.image ? `
                <button onclick="viewDocument('${q.marksheetImage}', '${q.title} - अंकसूची / मार्कशीट (${q.institution})')" 
                        class="btn-outline-vedic flex-1 text-xs py-2 px-3 justify-center text-amber-800 border-amber-300">
                  <i class="fa-regular fa-file-lines text-sm"></i>
                  <span>अंकसूची देखें</span>
                </button>
              ` : ''}
              ${q.pdf ? `
                <a href="${q.pdf}" target="_blank" rel="noopener noreferrer" 
                   class="px-3 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                   title="${q.title} का आधिकारिक PDF दस्तावेज़ देखें">
                  <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i>
                  <span>PDF</span>
                </a>
              ` : ''}
            </div>

          </div>

        </div>
      `;
    }).join('')}
  `;
}

function viewDocument(url, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  if (!modal || !img) return;

  img.src = url;
  if (captionEl) captionEl.textContent = caption;
  if (counter) counter.textContent = 'प्रमाणित शैक्षिक दस्तावेज • पं. अवनीश मिश्र';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Services Filter & Render
function initServices(filter) {
  const tabs = document.querySelectorAll('.service-tab-btn');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-category');
      renderServices(cat);
    });
  });

  renderServices(filter);
}

function renderServices(category) {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const services = (category === 'all') 
    ? SITE_DATA.services 
    : SITE_DATA.services.filter(s => s.category === category);

  container.innerHTML = services.map(srv => {
    const includesList = srv.includes.map(inc => `
      <li class="flex items-start gap-2">
        <i class="fa-solid fa-circle-check text-green-600 mt-1 text-xs flex-shrink-0"></i>
        <span>${inc}</span>
      </li>
    `).join('');

    return `
      <div class="gold-card p-6 flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute -right-6 -bottom-6 text-amber-100 opacity-20 text-8xl pointer-events-none group-hover:opacity-30 group-hover:scale-110 transition-all">
          <i class="fa-solid ${srv.icon}"></i>
        </div>
        
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="vedic-badge text-xs">
              <i class="fa-solid fa-om"></i> ${srv.category.toUpperCase()}
            </span>
            <span class="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
              <i class="fa-regular fa-clock mr-1"></i> ${srv.duration}
            </span>
          </div>

          <h3 class="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
            ${srv.title}
          </h3>
          
          <p class="text-sm text-stone-600 mb-4 leading-relaxed">
            ${srv.shortDesc}
          </p>

          <div class="bg-stone-50/90 rounded-xl p-3.5 mb-4 border border-stone-200/60">
            <p class="text-xs font-semibold text-amber-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-sparkles text-amber-600"></i> मुख्य अनुष्ठान विधान:
            </p>
            <ul class="text-xs text-stone-600 space-y-1.5">
              ${includesList}
            </ul>
          </div>

          <div class="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded-lg border-l-2 border-amber-500 mb-5">
            <strong class="text-amber-900 font-semibold">फल एवं लाभ:</strong> ${srv.benefits}
          </div>
        </div>

        <div class="pt-4 border-t border-stone-100 flex items-center gap-2.5">
          <button onclick="openBookingModal('${srv.title}')" class="btn-primary-vedic w-full text-sm py-2.5">
            <i class="fa-regular fa-calendar-check"></i>
            <span>पूजा बुक करें</span>
          </button>
          <a href="https://wa.me/${SITE_DATA.panditInfo.whatsapp}?text=${encodeURIComponent('नमस्ते पं. अवनीश जी, मुझे ' + srv.title + ' के संबंध में जानकारी एवं शुभ मुहूर्त चाहिए।')}" 
             target="_blank" 
             class="p-2.5 rounded-xl border border-green-300 text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center flex-shrink-0"
             title="WhatsApp पर पूछें">
            <i class="fa-brands fa-whatsapp text-xl"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Gallery Lightbox & Filter
let currentGallery = [];
let currentImageIndex = 0;

function initGallery(filter) {
  const tabs = document.querySelectorAll('.gallery-tab-btn');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-category');
      renderGallery(cat);
    });
  });

  renderGallery(filter);
}

function renderGallery(category) {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  currentGallery = (category === 'all')
    ? SITE_DATA.gallery
    : SITE_DATA.gallery.filter(g => g.category === category);

  container.innerHTML = currentGallery.map((item, index) => `
    <div onclick="openLightbox(${index})" class="gold-card overflow-hidden cursor-pointer group relative aspect-[4/3] bg-stone-100">
      <img src="${item.url}" 
           alt="${item.caption}" 
           loading="lazy"
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
           onerror="this.onerror=null; this.src='assets/images/pandit-avnish-portrait-puja.jpeg';" />
      
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 text-white">
        <span class="text-[11px] font-semibold tracking-wider text-amber-300 uppercase mb-1">
          ${item.year} • ${item.category.toUpperCase()}
        </span>
        <p class="text-xs md:text-sm font-medium line-clamp-2 leading-snug">
          ${item.caption}
        </p>
      </div>

      <div class="absolute top-3 right-3 bg-stone-900/60 backdrop-blur-sm text-amber-300 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <i class="fa-solid fa-magnifying-glass-plus text-xs"></i>
      </div>
    </div>
  `).join('');
}

function openLightbox(index) {
  currentImageIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  const item = currentGallery[currentImageIndex];
  if (!item) return;

  img.src = item.url;
  caption.textContent = item.caption;
  counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function nextLightboxImage() {
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
  openLightbox(currentImageIndex);
}

function prevLightboxImage() {
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  openLightbox(currentImageIndex);
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Interactive Samagri Checklist
function initSamagriChecklist(defaultKey) {
  const tabsContainer = document.getElementById('samagri-tabs');
  const listContainer = document.getElementById('samagri-items');
  if (!tabsContainer || !listContainer) return;

  const keys = Object.keys(SITE_DATA.samagriChecklists);

  tabsContainer.innerHTML = keys.map(key => `
    <button onclick="selectSamagriTab('${key}')" 
            class="samagri-tab-btn ${key === defaultKey ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-amber-50'} px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-stone-200"
            id="samagri-tab-${key}">
      ${SITE_DATA.samagriChecklists[key].title.replace(' सामग्री सूची', '')}
    </button>
  `).join('');

  renderSamagriList(defaultKey);
}

function selectSamagriTab(key) {
  document.querySelectorAll('.samagri-tab-btn').forEach(btn => {
    btn.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'text-stone-700');
  });

  const activeBtn = document.getElementById(`samagri-tab-${key}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-stone-700');
    activeBtn.classList.add('bg-amber-600', 'text-white', 'shadow-md');
  }

  renderSamagriList(key);
}

function renderSamagriList(key) {
  const listContainer = document.getElementById('samagri-items');
  const titleEl = document.getElementById('samagri-title');
  const copyBtn = document.getElementById('copy-samagri-btn');
  const data = SITE_DATA.samagriChecklists[key];
  if (!data || !listContainer) return;

  if (titleEl) titleEl.textContent = data.title;

  listContainer.innerHTML = data.items.map(item => `
    <label class="flex items-start gap-3 p-3 rounded-lg border border-stone-200 bg-white hover:border-amber-400 cursor-pointer transition-all">
      <input type="checkbox" class="mt-1 w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500" />
      <div>
        <span class="text-sm font-medium text-stone-800 block">${item.name}</span>
        <span class="text-xs text-amber-700 font-normal">${item.note}</span>
      </div>
    </label>
  `).join('');

  if (copyBtn) {
    copyBtn.onclick = () => {
      const textList = data.items.map((it, idx) => `${idx + 1}. ${it.name} (${it.note})`).join('\n');
      navigator.clipboard.writeText(`${data.title}:\n\n${textList}\n\n— पं. अवनीश मिश्र (+91 62608 76504)`).then(() => {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-400 mr-1.5"></i> सूची कॉपी हो गई!';
        setTimeout(() => copyBtn.innerHTML = original, 2500);
      });
    };
  }
}

// Testimonials
function initTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = SITE_DATA.testimonials.map(t => `
    <div class="gold-card p-6 relative flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-1 text-amber-400 mb-3">
          ${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
        <p class="text-sm text-stone-700 leading-relaxed italic mb-4">
          "${t.comment}"
        </p>
      </div>

      <div class="flex items-center gap-3 pt-3 border-t border-stone-100">
        <div class="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-base">
          ${t.name.charAt(0)}
        </div>
        <div>
          <h4 class="text-sm font-bold text-stone-900">${t.name}</h4>
          <p class="text-xs text-stone-500">${t.role} • ${t.location}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// FAQs Accordion
function initFaqs() {
  const container = document.getElementById('faqs-container');
  if (!container) return;

  container.innerHTML = SITE_DATA.faqs.map((faq, idx) => `
    <div class="faq-item py-4 cursor-pointer" onclick="toggleFaq(this)">
      <div class="flex items-center justify-between gap-4">
        <h4 class="text-base font-semibold text-stone-800 flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
            ${idx + 1}
          </span>
          ${faq.question}
        </h4>
        <i class="fa-solid fa-chevron-down faq-icon text-amber-600 text-sm transition-transform duration-300"></i>
      </div>
      <div class="faq-answer text-sm text-stone-600 pl-9 mt-2 leading-relaxed">
        ${faq.answer}
      </div>
    </div>
  `).join('');
}

function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) {
    item.classList.add('open');
  }
}

// Modals
function initModals() {
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-btn');
  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', closeBookingModal);
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  const lightboxModal = document.getElementById('lightbox-modal');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const nextBtn = document.getElementById('lightbox-next');
  const prevBtn = document.getElementById('lightbox-prev');

  const shareModal = document.getElementById('share-modal');
  const closeShareBtn = document.getElementById('close-share-btn');
  if (closeShareBtn && shareModal) {
    closeShareBtn.addEventListener('click', closeShareModal);
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxImage(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxImage(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeShareModal();
      closeLightbox();
    } else if (e.key === 'ArrowRight' && lightboxModal && lightboxModal.classList.contains('active')) {
      nextLightboxImage();
    } else if (e.key === 'ArrowLeft' && lightboxModal && lightboxModal.classList.contains('active')) {
      prevLightboxImage();
    }
  });
}

function openBookingModal(serviceName = '') {
  const modal = document.getElementById('booking-modal');
  const select = document.getElementById('booking-service-select');
  const modalServiceInput = document.getElementById('modal-service');
  
  const chosenService = serviceName || 'वैदिक पूजा एवं ज्योतिष परामर्श';
  if (modalServiceInput) {
    modalServiceInput.value = chosenService;
  }

  if (select && serviceName) {
    for (let opt of select.options) {
      if (opt.value === serviceName || opt.text.includes(serviceName)) {
        opt.selected = true;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Interactive Booking Form Submit -> WhatsApp Message
function initBookingForm() {
  const form = document.getElementById('puja-booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const service = document.getElementById('booking-service-select').value;
      const date = document.getElementById('booking-date').value;
      const location = document.getElementById('booking-location').value.trim();
      const notes = document.getElementById('booking-notes').value.trim();

      sendWhatsAppBooking({ name, phone, service, date, location, notes });
      form.reset();
    });
  }

  const modalForm = document.getElementById('modal-booking-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-name').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();
      const service = document.getElementById('modal-service').value;
      const location = document.getElementById('modal-location').value.trim();

      sendWhatsAppBooking({ name, phone, service, date: 'मुहूर्त अनुसार', location, notes: 'कृपया शीघ्र संपर्क कर मुहूर्त बताएं।' });
      modalForm.reset();
      closeBookingModal();
    });
  }
}

function sendWhatsAppBooking({ name, phone, service, date, location, notes }) {
  const message = 
`*नमस्ते पं. अवनीश मिश्र जी,*
मुझे आपके सानिध्य में पूजा/अनुष्ठान बुक करना है। विवरण निम्नानुसार है:

👤 *यजमान नाम:* ${name}
📞 *फ़ोन नंबर:* ${phone}
🕉️ *पूजा/अनुष्ठान:* ${service || 'वैदिक पूजा'}
📅 *इच्छित तिथि:* ${date || 'मुहूर्त अनुसार'}
📍 *स्थान:* ${location || 'नोएडा / गाजियाबाद / दिल्ली NCR'}
📝 *विशेष विवरण:* ${notes || 'कृपया शुभ मुहूर्त एवं विधि बताएं'}`;

  const whatsappUrl = `https://wa.me/${SITE_DATA.panditInfo.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// ==========================================
// Profile Social Share Functionality
// ==========================================
const PROFILE_SHARE_DATA = {
  title: "वेदाचार्य एवं ज्योतिषाचार्य पं. अवनीश मिश्र (स्वर्ण पदक विजेता)",
  text: "🕉️ वेदाचार्य एवं ज्योतिषाचार्य पं. अवनीश मिश्र जी की आधिकारिक प्रोफ़ाइल। गृह प्रवेश, विवाह संस्कार, महामृत्युंजय हवन, रुद्राभिषेक एवं सटीक ज्योतिष मार्गदर्शन (15+ वर्ष वैदिक अनुभव, स्वर्ण पदक विजेता)।",
  url: "https://pandit-ji-near.vercel.app/"
};

function openShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function shareOn(platform) {
  const url = encodeURIComponent(PROFILE_SHARE_DATA.url);
  const text = encodeURIComponent(PROFILE_SHARE_DATA.text);
  const title = encodeURIComponent(PROFILE_SHARE_DATA.title);

  let targetUrl = '';
  switch (platform) {
    case 'whatsapp':
      targetUrl = `https://api.whatsapp.com/send?text=${text}%0A%0A${url}`;
      break;
    case 'facebook':
      targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
    case 'x':
      targetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'telegram':
      targetUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case 'linkedin':
      targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'native':
      if (navigator.share) {
        navigator.share({
          title: PROFILE_SHARE_DATA.title,
          text: PROFILE_SHARE_DATA.text,
          url: PROFILE_SHARE_DATA.url
        }).catch(() => {});
        return;
      } else {
        copyProfileLink();
        return;
      }
    default:
      copyProfileLink();
      return;
  }

  if (targetUrl) {
    window.open(targetUrl, '_blank', 'noopener,noreferrer,width=650,height=550');
  }
}

function copyProfileLink() {
  const shareUrl = PROFILE_SHARE_DATA.url;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showShareToast('✓ लिंक क्लिपबोर्ड पर कॉपी हो गया!');
    }).catch(() => {
      fallbackCopyText(shareUrl);
    });
  } else {
    fallbackCopyText(shareUrl);
  }

  const copyBtnText = document.getElementById('copy-btn-text');
  if (copyBtnText) {
    const orig = copyBtnText.textContent;
    copyBtnText.textContent = 'कॉपी हुआ! ✓';
    setTimeout(() => {
      copyBtnText.textContent = orig;
    }, 2500);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showShareToast('✓ लिंक क्लिपबोर्ड पर कॉपी हो गया!');
  } catch (err) {
    showShareToast('लिंक: ' + text);
  }
  document.body.removeChild(textArea);
}

function showShareToast(message) {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.className = 'share-toast bg-stone-900 text-amber-300 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-2xl border border-amber-500/40 flex items-center gap-2';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-green-400"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


