/* =============================================
   VALENTINE'S LETTER – JAVASCRIPT
   ============================================= */

// ---- STARS ----
(function () {
    var canvas = document.getElementById('stars');
    var ctx = canvas.getContext('2d');
    var stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }

    function init() {
        stars = [];
        var count = Math.floor((canvas.width * canvas.height) / 3000);
        for (var i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.6 + 0.3,
                a: Math.random() * 0.8 + 0.2,
                da: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.a += s.da;
            if (s.a > 1) { s.a = 1; s.da *= -1; }
            if (s.a < 0.15) { s.a = 0.15; s.da *= -1; }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + s.a + ')';
            ctx.fill();
            if (s.r > 1.2) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,' + (s.a * 0.06) + ')';
                ctx.fill();
            }
        }
        requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
})();

// ---- SHOOTING STARS ----
(function () {
    var styleEl = document.createElement('style');
    styleEl.textContent =
        '@keyframes shoot{0%{transform:translate(0,0) scale(1);opacity:1}' +
        '100%{transform:translate(220px,130px) scale(0.2);opacity:0}}';
    document.head.appendChild(styleEl);

    function fire() {
        var el = document.createElement('div');
        el.style.cssText =
            'position:fixed;top:' + (Math.random() * 35) + '%;left:' + (Math.random() * 50 + 10) + '%;' +
            'width:3px;height:3px;background:#fff;border-radius:50%;z-index:1;pointer-events:none;' +
            'box-shadow:0 0 6px 2px rgba(255,255,255,0.6);animation:shoot 1s linear forwards';
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, 1100);
    }

    setInterval(fire, 5000 + Math.random() * 6000);
})();

// ---- FLOATING HEARTS ----
(function () {
    var container = document.getElementById('hearts');
    var emojis = ['💕', '💗', '💖', '💓', '💘', '🌸', '✨'];

    function spawn() {
        var el = document.createElement('span');
        el.className = 'heart-p';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 14 + 12) + 'px';
        el.style.animationDuration = (Math.random() * 5 + 6) + 's';
        container.appendChild(el);
        setTimeout(function () { el.remove(); }, 12000);
    }

    window._spawnHeart = spawn; // expose for burst
    setInterval(spawn, 3000);
    for (var i = 0; i < 4; i++) setTimeout(spawn, i * 700);
})();

// ---- ENVELOPE INTERACTION ----
(function () {
    var envelopeContainer = document.getElementById('envelopeContainer');
    var envFlap = document.getElementById('envFlap');
    var envLetter = document.getElementById('envLetter');
    var overlay = document.getElementById('letterOverlay');
    var closeBtn = document.getElementById('closeBtn');
    var prompt = document.getElementById('prompt');
    var isOpen = false;

    function openEnvelope() {
        if (isOpen) return;
        isOpen = true;

        // Hide prompt
        prompt.classList.add('hide');

        // Open flap
        envFlap.classList.add('open');
        envelopeContainer.classList.add('opened');

        // Slide letter up from envelope
        setTimeout(function () {
            envLetter.classList.add('slide-up');
        }, 500);

        // Show full-screen letter
        setTimeout(function () {
            overlay.classList.add('show');
        }, 900);

        // Heart burst
        for (var i = 0; i < 10; i++) {
            setTimeout(window._spawnHeart, i * 120);
        }
    }

    function closeEnvelope() {
        if (!isOpen) return;
        isOpen = false;

        overlay.classList.remove('show');

        setTimeout(function () {
            envLetter.classList.remove('slide-up');
            envFlap.classList.remove('open');
            envelopeContainer.classList.remove('opened');
            prompt.classList.remove('hide');
        }, 600);
    }

    envelopeContainer.addEventListener('click', openEnvelope);
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeEnvelope();
    });
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeEnvelope();
    });
})();
