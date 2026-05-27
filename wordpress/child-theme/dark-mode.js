(function () {
  'use strict';

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
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    var icon = document.getElementById('themeIcon');
    if (icon) icon.innerHTML = isDark ? SUN : MOON;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn  = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (icon) icon.innerHTML = isDark ? SUN : MOON;

    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) applyTheme(e.matches);
    });
  });
})();
