(function () {
  'use strict';

  /* ── Theme toggle ── */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');

  var MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  var SUN  = '<circle cx="12" cy="12" r="5"/>'
           + '<line x1="12" y1="1" x2="12" y2="3"/>'
           + '<line x1="12" y1="21" x2="12" y2="23"/>'
           + '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>'
           + '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>'
           + '<line x1="1" y1="12" x2="3" y2="12"/>'
           + '<line x1="21" y1="12" x2="23" y2="12"/>'
           + '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>'
           + '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

  function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.innerHTML = isDark ? SUN : MOON;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeIcon.innerHTML = isDark ? SUN : MOON;

  themeToggle.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  /* ── Language select ── */
  var lang       = 'lt';
  var langSelect = document.getElementById('langSelect');

  var copyLabels = { lt: 'Nukopijuota!', en: 'Copied!', ru: 'Скопировано!' };

  function applyLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
    langSelect.value = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-lt]').forEach(function (el) {
      el.textContent = el.dataset[lang] || el.dataset.lt;
    });

    document.querySelectorAll('[data-placeholder-lt]').forEach(function (el) {
      el.placeholder = el.dataset['placeholder' + lang.charAt(0).toUpperCase() + lang.slice(1)]
                    || el.dataset.placeholderLt;
    });
  }

  langSelect.addEventListener('change', function () {
    applyLang(langSelect.value);
  });

  // Restore saved language preference
  var savedLang = localStorage.getItem('lang');
  if (savedLang && ['lt', 'en', 'ru'].indexOf(savedLang) !== -1) {
    applyLang(savedLang);
  }

  /* ── Contact form ── */
  var form   = document.getElementById('contactForm');
  var notice = document.getElementById('formNotice');

  var messages = {
    lt: {
      success: 'Žinutė išsiųsta. Susisieksime kuo greičiau!',
      error:   'Prašome užpildyti visus laukus.',
    },
    en: {
      success: "Message sent. We'll get back to you shortly!",
      error:   'Please fill in all fields.',
    },
    ru: {
      success: 'Сообщение отправлено. Свяжемся с вами в ближайшее время!',
      error:   'Пожалуйста, заполните все поля.',
    },
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = form.name.value.trim();
    var email   = form.email.value.trim();
    var message = form.message.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    fetch('https://formspree.io/f/xgoqpljz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: name, email: email, message: message }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.ok) {
          notice.className = 'form-notice success';
          notice.textContent = messages[lang].success;
          form.reset();
        } else {
          notice.className = 'form-notice error';
          notice.textContent = messages[lang].error;
        }
      })
      .catch(function () {
        notice.className = 'form-notice error';
        notice.textContent = messages[lang].error;
      })
      .finally(function () {
        btn.disabled = false;
      });
  });

  /* ── Copy email to clipboard ── */
  var copyBtn  = document.getElementById('copyEmail');
  var copyText = document.getElementById('copyEmailText');

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
      var prev = copyText.textContent;
      copyText.textContent = copyLabels[lang] || copyLabels.lt;
      setTimeout(function () { copyText.textContent = prev; }, 1800);
    });
  });

})();
