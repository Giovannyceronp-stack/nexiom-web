(function () {
  const MIXPANEL_TOKEN = 'eb674711666f7aaa67982060e3da3eda';

  function loadMixpanel(callback) {
    if (window.mixpanel && typeof window.mixpanel.init === 'function') {
      callback();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function track(eventName, properties = {}) {
    if (!window.mixpanel || typeof window.mixpanel.track !== 'function') return;
    window.mixpanel.track(eventName, {
      app: 'Nexiom Web',
      page_title: document.title,
      page_path: window.location.pathname,
      page_hash: window.location.hash || null,
      ...properties
    });
  }

  function getMessageLengthBucket(length) {
    if (length === 0) return 'empty';
    if (length < 80) return 'short';
    if (length < 250) return 'medium';
    return 'long';
  }

  function bindTracking() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        track('Navigation Link Clicked', {
          label: link.textContent.trim(),
          target: link.getAttribute('href')
        });
      });
    });

    document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
      link.addEventListener('click', () => {
        track('WhatsApp CTA Clicked', {
          label: link.textContent.trim()
        });
      });
    });

    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        const message = document.getElementById('message')?.value || '';
        track('Contact Form Submitted', {
          has_name: Boolean(document.getElementById('name')?.value),
          has_email: Boolean(document.getElementById('email')?.value),
          message_length_bucket: getMessageLengthBucket(message.length)
        });
      });
    }

    const assistantButton = document.querySelector('.ai button');
    const chatPanel = document.getElementById('chat');
    if (assistantButton && chatPanel) {
      assistantButton.addEventListener('click', () => {
        window.setTimeout(() => {
          track(chatPanel.classList.contains('open') ? 'Assistant Opened' : 'Assistant Closed');
        }, 0);
      });
    }
  }

  loadMixpanel(() => {
    window.mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      track_pageview: true,
      persistence: 'localStorage',
      debug: false
    });

    window.mixpanel.register({
      site_name: 'Nexiom Intelligence Group',
      repository: 'Giovannyceronp-stack/nexiom-web',
      environment: window.location.hostname.includes('github.io') ? 'production' : 'development'
    });

    bindTracking();
  });
})();
