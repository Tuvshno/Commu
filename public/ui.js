function updateBadgeTones() {
    document.querySelectorAll('.status').forEach(function (badge) {
        const text = badge.textContent.trim().toLowerCase();
        const tone = text.includes('high') ? 'high'
            : text.includes('medium') ? 'medium'
            : text.includes('low') ? 'low'
            : text === 'in progress' ? 'progress'
            : text === 'open' ? 'open' : '';
        if (badge.dataset.tone !== tone) badge.dataset.tone = tone;
    });
}

updateBadgeTones();
new MutationObserver(updateBadgeTones).observe(document.body, { childList: true, subtree: true, characterData: true });

if (window.parent !== window) document.documentElement.classList.add('embedded');

document.querySelectorAll('.issue-section-frame').forEach(function (frame) {
    let observer;
    frame.addEventListener('load', function () {
        if (observer) observer.disconnect();
        const body = frame.contentDocument && frame.contentDocument.body;
        if (!body) return;
        function resize() {
            const height = Math.ceil(body.getBoundingClientRect().height);
            if (height > 0 && frame.height !== String(height + 2)) frame.height = String(height + 2);
        }
        observer = new ResizeObserver(resize);
        observer.observe(body);
        resize();
    });
});
