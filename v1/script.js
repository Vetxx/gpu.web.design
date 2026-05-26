(function () {
  'use strict';

  /* ── Language toggle ── */
  let lang = 'lt';
  const toggle = document.getElementById('langToggle');

  function applyLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
    toggle.textContent = lang === 'lt' ? 'EN' : 'LT';

    // Swap text content for all elements with data-lt / data-en
    document.querySelectorAll('[data-lt]').forEach(function (el) {
      el.textContent = el.dataset[lang];
    });

    // Swap placeholder text for inputs / textareas
    document.querySelectorAll('[data-placeholder-lt]').forEach(function (el) {
      el.placeholder = lang === 'lt' ? el.dataset.placeholderLt : el.dataset.placeholderEn;
    });
  }

  toggle.addEventListener('click', function () {
    applyLang(lang === 'lt' ? 'en' : 'lt');
  });

  /* ── Contact form ── */
  const form    = document.getElementById('contactForm');
  const notice  = document.getElementById('formNotice');

  const messages = {
    lt: {
      success: 'Žinutė išsiųsta. Susisieksime kuo greičiau!',
      error:   'Prašome užpildyti visus laukus.',
    },
    en: {
      success: 'Message sent. We\'ll get back to you shortly!',
      error:   'Please fill in all fields.',
    },
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Clear previous error states
    [form.name, form.email, form.message].forEach(function (el) {
      el.classList.remove('error');
    });
    notice.className = 'form-notice';
    notice.textContent = '';

    if (!name || !email || !message || !emailOk) {
      if (!name)    form.name.classList.add('error');
      if (!emailOk) form.email.classList.add('error');
      if (!message) form.message.classList.add('error');
      notice.className = 'form-notice error';
      notice.textContent = messages[lang].error;
      return;
    }

    // Build mailto link with pre-filled body
    const subject = encodeURIComponent('gpu.lt — ' + name);
    const body    = encodeURIComponent('Vardas / Name: ' + name + '\nEl. paštas / Email: ' + email + '\n\n' + message);
    window.location.href = 'mailto:info@gpu.lt?subject=' + subject + '&body=' + body;

    notice.className = 'form-notice success';
    notice.textContent = messages[lang].success;
    form.reset();
  });

})();
