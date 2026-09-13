
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  reduce = /[?&]reduce=1/.test(location.search);
  if(reduce) document.documentElement.classList.add('rm');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var vh = function(){ return window.innerHeight; };
  var body = document.body, top = document.getElementById('top');

  try{
    console.log('%c小%c ここまでご覧いただき、ありがとうございます。\n\n   地道な作業ではありましたが、AI を活用した Web 制作は自分自身初めてで、発見だらけの日々となりました。\n\n   このような制作の機会をいただき、ありがとうございます。\n   どうぞ最後までお楽しみください。 — 小坂脩蔵\n\n   Thank you for looking this far.\n\n   Patient work — and my first time building a site with AI, so it was full of discoveries.\n\n   Thank you for the opportunity to make it. Enjoy the rest of it. — Shuzo Kosaka',
      'display:inline-block; background:#E84518; color:#FBF7F2; font:700 14px/1 serif; padding:6px 7px; border-radius:50%; margin-right:6px', 'color:#1C1B19; font:13px/1.7 -apple-system, system-ui, sans-serif');
  }catch(e){}

  var curLang = 'ja', PLACE_EN = {'岡崎':'Okazaki', 'ミシガン':'Michigan', '帰国':'Back to|Japan', '名古屋':'Nagoya', 'バー／|海外':'Bar /|abroad', 'バーと|海外':'Bar &|abroad', '大学院':'Grad|school', 'いま':'Now', 'バンコク':'Bangkok', 'バー':'Bar', '海外':'Abroad', 'バンコク|インターン':'Bangkok|internship', '作品':'Works', '制作':'Making', '連絡':'Contact', 'ジブンの|ゼンブを':'All of|myself'};
  var I18N = {}; (function(raw){ Object.keys(raw).forEach(function(k){ I18N[k.replace(/\s+/g, ' ').trim()] = raw[k]; }); })(window.I18N || {});

  if(/apple/i.test(navigator.vendor || '') || /^((?!chrome|android|crios|edg).)*safari/i.test(navigator.userAgent)) document.documentElement.classList.add('is-webkit');

  function cx2d(cv){ return document.documentElement.classList.contains('is-webkit') ? cv.getContext('2d') : cv.getContext('2d', {willReadFrequently: true}); }
  var I18N_SEL = 'p, h3, figcaption, li, dd, .toc a, .sr .t, .sr .p2, .sr .a, #mseals .t, em.tag, .lab, .mlab, .tip, .msg, .lg-k, .lg-t, .legend strong, .legend span, .mp-cap b, .mp-cap span, .mp-key span, .gridbtn span, .mmsg .mx, #mlinks .txt, .menu .ml span, .wrap, .cap, .note, .br-cap, .again, .pdf, .cta, .x, footer span, footer a, footer a span, .cta span, .ft-name, .cp-ttl .w, .wk-vt .w, .cp-form label span, .cp-send b, .wk-side span, text, tspan, textPath, .ttl .split, .ttl small, #top .vt .split, #top .rb, #top .rot span, #top .tag span, .sub .w, .vid .t, .vid .s, .vid .badge, .wk em, .lines s, .page s, #ch5pin .wm span, #top .mean';
  var i18nEls = Array.prototype.slice.call(document.querySelectorAll(I18N_SEL)); i18nEls.forEach(function(el){ el.__ja = el.innerHTML; });

  function splitEl(el){
    var txt = el.textContent; el.textContent = '';
    var frag = document.createDocumentFragment();
    Array.from(txt).forEach(function(ch, i){ var s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i); s.textContent = (ch === ' ') ? ' ' : ch; frag.appendChild(s); });
    el.appendChild(frag);
  }
  document.querySelectorAll('.split, .scx').forEach(splitEl);

  function ttlClasses(ja){
    document.querySelectorAll('.ttl .split .ch').forEach(function(c){
      var t = c.textContent; c.classList.remove('pt', 'kj', 'kn');
      if(!ja) return;
      if(/[。、！？]/.test(t)) c.classList.add('pt');
      if(/[\u4E00-\u9FFF\u3400-\u4DBF々〆]/.test(t)) c.classList.add('kj');
      else if(/[\u3040-\u309F\u30A0-\u30FF\u30FC]/.test(t)) c.classList.add('kn');
    });
    document.querySelectorAll('#top .vt .ch').forEach(function(c){ c.classList.remove('h', 'pt'); if(!ja) return; if(/[\u3040-\u309F]/.test(c.textContent)) c.classList.add('h'); if(/[。、]/.test(c.textContent)) c.classList.add('pt'); });
  }
  ttlClasses(true);

  (function(){
    if(reduce) return;
    document.querySelectorAll('#top .oval').forEach(function(o, k){
      var imgs = o.querySelectorAll('.phs image, .phs img'), n = imgs.length, cur = 0; if(n < 2) return;

      (function tick(first){ setTimeout(function(){
        var nowMs = performance.now();
        if(nowMs - (window.__ovLast || 0) < 900){ setTimeout(function(){ tick(false); }, 0); return; }
        if(!(body.classList.contains('opening') || document.hidden || !top.classList.contains('inview'))){ imgs[cur].classList.remove('on'); cur = (cur + 1) % n; imgs[cur].classList.add('on'); window.__ovLast = nowMs; }
        tick(false); }, first ? (2200 + k * 1500 + Math.random() * 900) : (2600 + Math.random() * 2800)); })(true);
    });
  })();
  (function(){
    var box = document.getElementById('pbox'); if(!box || reduce) return;
    var imgs = box.querySelectorAll('img'), n = imgs.length, cur = 0, num = document.getElementById('pbn'), cap = document.getElementById('pbcap');
    setInterval(function(){
      if(body.classList.contains('opening') || document.hidden) return;
      var nx = (cur + 1) % n, prev = cur;
      imgs[nx].style.zIndex = 2; imgs[prev].style.zIndex = 1; imgs[nx].classList.remove('hold'); imgs[nx].classList.add('on');
      setTimeout(function(){ imgs[prev].classList.remove('on', 'hold'); imgs[prev].style.zIndex = 0; imgs[nx].classList.add('hold'); }, 1000);
      cur = nx; if(num) num.textContent = ('0' + (cur + 1)).slice(-2); if(cap) cap.textContent = imgs[cur].getAttribute('data-cap') || '';
    }, 3200);
  })();

  var KERN = {'中全':.05, 'ント':-.09, 'ンド':-.08, 'イン':-.05, 'ポイ':-.04, 'ック':-.04, 'ェッ':-.03, 'ンブ':-.04, 'ザイ':-.03, 'ター':-.03, 'ンタ':-.05, 'ウン':-.04, 'カウ':-.02, 'トが':-.03, 'ィン':-.04, 'ッポ':-.03, 'ェク':-.03, 'ッシ':-.03, 'ンで':-.03, 'ンと':-.03, 'ンに':-.03, 'ート':-.05, 'ーシ':-.03, 'トフ':-.03, 'フォ':-.03, 'ォリ':-.03, 'リオ':-.02};
  function kernPairs(chs){ for(var i = 1; i < chs.length; i++){ var k = KERN[chs[i-1].textContent + chs[i].textContent]; if(k) chs[i].style.marginLeft = k + 'em'; } }
  function ttlWords(ja){
    document.querySelectorAll('.ttl .split .ch').forEach(function(c){ c.style.marginLeft = ''; c.classList.remove('big'); });
    if(!ja) return;
    document.querySelectorAll('.ttl .split').forEach(function(sp){ kernPairs(sp.querySelectorAll('.ch')); });
    document.querySelectorAll('.ttl[data-big]').forEach(function(h){
      var words = h.getAttribute('data-big').split('|');
      h.querySelectorAll('.split').forEach(function(sp){
        var chs = sp.querySelectorAll('.ch'), txt = Array.prototype.map.call(chs, function(c){ return c.textContent; }).join('');
        words.forEach(function(w){ var i = txt.indexOf(w); while(i >= 0){ for(var k = 0; k < w.length; k++) if(chs[i + k]) chs[i + k].classList.add('big'); i = txt.indexOf(w, i + w.length); } });
      });
    });
  }
  ttlWords(true);

  function mixedSubs(ja){
    document.querySelectorAll('.ch7x .solopin .sub.mixed, .cp-ttl.mixed, .wk-vt.mixed, .rotv .rtl.mixed, #cprot .cprot-tx b.mixed, #narrow .nw-ttl.mixed').forEach(function(sub){
      var w = sub.querySelector('.w'); if(!w) return;
      if(!w.querySelector('.ch')){
        var frag = document.createDocumentFragment(), i = 0;
        Array.prototype.slice.call(w.childNodes).forEach(function(nd){
          if(nd.nodeType === 3){ Array.from(nd.nodeValue).forEach(function(ch){ var c = document.createElement('span'); c.className = 'ch'; c.style.setProperty('--i', i++); c.textContent = ch === ' ' ? '\u00a0' : ch; c.__t = c.textContent; frag.appendChild(c); }); }
          else if(nd.nodeName === 'BR'){ frag.appendChild(document.createElement('br')); }
          else { Array.from(nd.textContent).forEach(function(ch){ var c = document.createElement('span'); c.className = 'ch'; c.style.setProperty('--i', i++); c.textContent = ch; c.__t = ch; frag.appendChild(c); }); }
        });
        w.textContent = ''; w.appendChild(frag);
      }
      var chs = Array.prototype.slice.call(w.querySelectorAll('.ch'));
      chs.forEach(function(c){ var t = c.__t; c.classList.remove('pt', 'kj', 'kn', 'big'); c.style.marginLeft = ''; if(!ja) return;
        if(/[。、！？]/.test(t)) c.classList.add('pt'); if(/[\u4E00-\u9FFF\u3400-\u4DBF々〆]/.test(t)) c.classList.add('kj'); else if(/[\u3040-\u309F\u30A0-\u30FF\u30FC]/.test(t)) c.classList.add('kn'); });
      if(ja){
        if(getComputedStyle(sub).writingMode === 'horizontal-tb') kernPairs(chs);
        var words = (sub.getAttribute('data-big') || '').split('|').filter(Boolean), txt = chs.map(function(c){ return c.__t; }).join('');
        words.forEach(function(wd){ var k = txt.indexOf(wd); while(k >= 0){ for(var q = 0; q < wd.length; q++) if(chs[k + q]) chs[k + q].classList.add('big'); k = txt.indexOf(wd, k + wd.length); } });
      }

      var cv = document.createElement('canvas'), cx = cx2d(cv), rows = [], first = true;
      Array.prototype.slice.call(w.childNodes).forEach(function(nd){ if(nd.nodeName === 'BR'){ first = true; return; } if(first && nd.classList && nd.classList.contains('ch') && nd.__t.trim()){ first = false; if(cx){ var cs = getComputedStyle(nd); cx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; rows.push({el:nd, lsb:-cx.measureText(nd.__t).actualBoundingBoxLeft}); } } });
      var vertical = getComputedStyle(sub).writingMode !== 'horizontal-tb';
      if(rows.length > 1 && !vertical && getComputedStyle(sub).textAlign !== 'center'){ var mn = Math.min.apply(null, rows.map(function(r){ return r.lsb; })); rows.forEach(function(r){ r.el.style.marginLeft = (-(r.lsb - mn) * .8).toFixed(2) + 'px'; }); }
      if(rows.length > 1 && vertical && cx){

        rows.forEach(function(r){ var cs = getComputedStyle(r.el), px = parseFloat(cs.fontSize), S = 4; if(!(px > 0)){ r.ink = 0; return; } cv.width = Math.max(1, Math.ceil(px * S * 1.6)); cv.height = Math.max(1, Math.ceil(px * S * 1.8)); cx.clearRect(0, 0, cv.width, cv.height); cx.font = cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily; cx.textBaseline = 'alphabetic'; cx.fillStyle = '#000'; var base = Math.round(px * S * 1.3); cx.fillText(r.el.__t, Math.round(px * S * .2), base); var img = cx.getImageData(0, 0, cv.width, cv.height).data, top = -1; for(var yy = 0; yy < cv.height && top < 0; yy++){ for(var xx = 0; xx < cv.width; xx++){ if(img[(yy * cv.width + xx) * 4 + 3] > 40){ top = yy; break; } } } r.ink = top < 0 ? 0 : (top - (base - px * S)) / S; r.px = px; });
        var mnT = Math.min.apply(null, rows.map(function(r){ return r.ink; }));
        rows.forEach(function(r){ r.el.style.marginTop = (-(r.ink - mnT) * .9).toFixed(2) + 'px'; });
      }
      var sp = sub.closest('.solopin'); if(sp){ sp.__chs = chs; sp.__res = -1; sp.__fit = false; }
    });
  }
  mixedSubs(true);

  function opticalAlign(){
    var cv = document.createElement('canvas'), cx = cx2d(cv); if(!cx) return;
    document.querySelectorAll('.ttl:not(.vert)').forEach(function(h){
      var rows = [];
      h.querySelectorAll('.split').forEach(function(sp){ var c = sp.querySelector('.ch'); if(!c || !c.textContent.trim()) return; var cs = getComputedStyle(c); cx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; var m = cx.measureText(c.textContent); rows.push({el:c, lsb:-m.actualBoundingBoxLeft}); });
      if(rows.length < 2) return;
      var min = Math.min.apply(null, rows.map(function(r){ return r.lsb; }));
      rows.forEach(function(r){ r.el.style.marginLeft = (-(r.lsb - min) * .8).toFixed(2) + 'px'; });
    });
  }

  function hugLine(){
    var cv = document.createElement('canvas'), cx = cx2d(cv); if(!cx) return;
    var probe = document.createElement('span'); probe.style.cssText = 'position:absolute; left:-9999px; top:0; white-space:pre; visibility:hidden'; document.body.appendChild(probe);

    function inkLeft(ch, cs){ var px = parseFloat(cs.fontSize), S = 4; if(!(px > 0)) return 0; cv.width = Math.max(1, Math.ceil(px * S * 2.2)); cv.height = Math.max(1, Math.ceil(px * S * 1.8)); cx.clearRect(0, 0, cv.width, cv.height); cx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily; cx.textBaseline = 'middle'; cx.fillStyle = '#000'; var x0 = Math.round(px * S * .6); cx.fillText(ch, x0, cv.height / 2); var d = cx.getImageData(0, 0, cv.width, cv.height).data; for(var x = 0; x < cv.width; x++){ for(var y = 0; y < cv.height; y++){ if(d[(y * cv.width + x) * 4 + 3] > 40) return (x - x0) / S; } } return 0; }
    function advance(ch, cs, feat){ probe.style.font = cs.font; probe.style.fontFeatureSettings = feat; probe.style.letterSpacing = '0'; probe.textContent = ch; return probe.getBoundingClientRect().width; }
    document.querySelectorAll('#top .toc a, #top .sub, #top .rot > span, #top .scroll').forEach(function(el){
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), t, ch = '', host = el;
      while((t = w.nextNode())){ var str = t.textContent.replace(/^[\s\u3000]+/, ''); if(str){ ch = str.charAt(0); host = t.parentElement; break; } }
      if(!ch) return;
      var cs = getComputedStyle(host), lsb = inkLeft(ch, cs), feat = cs.fontFeatureSettings;
      if(feat && feat !== 'normal') lsb -= (advance(ch, cs, 'normal') - advance(ch, cs, feat)) / 2;
      var shift = Math.max(0, Math.min(5, lsb - .6));
      el.style.marginLeft = shift > .2 ? (-shift).toFixed(2) + 'px' : '';
    });
    probe.remove();
  }

  function tagAlign(){
    var tag = top.querySelector('.tag'), rj = top.querySelector('.lbl b.rj .ln'), sp = tag && tag.querySelector('span'); if(!tag || !rj || !sp) return;
    var cv = document.createElement('canvas'), cx = cx2d(cv); if(!cx) return;
    var rc = getComputedStyle(rj), F = parseFloat(rc.fontSize), LH = parseFloat(rc.lineHeight) || F * 1.12;
    cx.font = rc.fontStyle + ' ' + rc.fontWeight + ' ' + F + 'px ' + rc.fontFamily; var m = cx.measureText(rj.textContent.trim().charAt(0) || 'J');
    var A = m.fontBoundingBoxAscent || F * .9, D = m.fontBoundingBoxDescent || F * .2, cap = m.actualBoundingBoxAscent || F * .7;
    function offY(el){ var y = 0; while(el && el !== top){ y += el.offsetTop; el = el.offsetParent; } return y; }
    var rjTop = offY(rj) + (LH - (A + D)) / 2 + A - cap;
    var tc = getComputedStyle(sp), f = parseFloat(tc.fontSize), lh = parseFloat(tc.lineHeight) || f * 1.6, ink = 0;
    if(curLang !== 'en' && f > 0){ var S = 4; cv.width = Math.max(1, Math.ceil(f * S * 1.6)); cv.height = Math.max(1, Math.ceil(f * S * 1.6)); cx.clearRect(0, 0, cv.width, cv.height); cx.font = tc.fontStyle + ' ' + tc.fontWeight + ' ' + (f * S) + 'px ' + tc.fontFamily; cx.textBaseline = 'top'; cx.fillStyle = '#000'; cx.fillText(sp.textContent.trim().charAt(0), f * S * .3, 0); var d = cx.getImageData(0, 0, cv.width, cv.height).data, found = -1; for(var y = 0; y < cv.height && found < 0; y++){ for(var x = 0; x < cv.width; x++){ if(d[(y * cv.width + x) * 4 + 3] > 40){ found = y; break; } } } if(found >= 0) ink = found / S; }
    var spTop = offY(sp) + (lh - f) / 2 + ink;
    top.style.setProperty('--tagtop', (tag.offsetTop + (rjTop - spTop)).toFixed(1) + 'px');

    var sd = top.querySelector('.scdot'), nmEl = top.querySelector('.name'), rotEl = top.querySelector('.rot');
    if(sd && nmEl && rotEl){
      var size = Math.max(24, Math.round(tag.offsetWidth)), END = .46, gap = Math.round(size * .33);
      var nr = nmEl.getBoundingClientRect(), rr = rotEl.getBoundingClientRect(), tr = tag.getBoundingClientRect();

      var travel = Math.max(Math.round(size * 1.9), Math.round(rr.bottom - tr.bottom - size + size * (1 - END) / 2 - gap));
      sd.style.width = size + 'px'; sd.style.height = (travel + size) + 'px';
      sd.style.left = Math.round(tag.offsetLeft + tag.offsetWidth / 2 - size / 2) + 'px';
      sd.style.top = Math.round(rr.bottom - nr.top - travel - size) + 'px';
      sd.style.setProperty('--sctv', travel + 'px');
    }
    var mean = top.querySelector('.mean'), Hh = document.documentElement;
    if(mean){ if(Hh.classList.contains('pcview') && Hh.classList.contains('phone')){ mean.style.right = ''; mean.style.left = ''; }
      else { mean.style.right = 'auto'; mean.style.left = (tag.offsetLeft + tag.offsetWidth / 2 - mean.offsetWidth / 2).toFixed(1) + 'px'; } }
  }

  function meanWrap(){
    var m = document.querySelector('#top .mean'); if(!m || m.querySelector('.mc')) return;
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(m.childNodes).forEach(function(nd){
      if(nd.nodeType === 3){

        nd.nodeValue.match(/[^、。]*[、。]?/g).filter(Boolean).forEach(function(ph){
          var nb = document.createElement('span'); nb.className = 'nb';
          Array.from(ph).forEach(function(ch){ var c = document.createElement('span'); c.className = 'mc'; c.textContent = ch; nb.appendChild(c); });
          frag.appendChild(nb);
          if(ph === 'デザインに注ぐ。' && document.documentElement.classList.contains('phone')) frag.appendChild(document.createElement('br'));
        });
      }
      else frag.appendChild(nd.cloneNode(true));
    });
    m.textContent = ''; m.appendChild(frag);
  }
  function meanLens(){
    var m = document.querySelector('#top .mean'); if(!m || !fine) return;
    var raf = 0, mx = 0, my = 0, on = false;
    function paint(){
      raf = 0;
      var mr = m.getBoundingClientRect(), chs = Array.prototype.slice.call(m.querySelectorAll('.mc')), cols = {};
      chs.forEach(function(c){ var k = Math.round(c.offsetLeft / 8); (cols[k] = cols[k] || []).push(c); });
      var R1 = 40, R2 = 170, M = 1.1;
      Object.keys(cols).forEach(function(k){
        var arr = cols[k], cx = mr.left + arr[0].offsetLeft + arr[0].offsetWidth / 2, hit = on && Math.abs(cx - mx) < 14;
        if(!hit){ arr.forEach(function(c){ if(c.style.transform) c.style.transform = ''; }); return; }
        var items = arr.map(function(c){ var cy = mr.top + c.offsetTop + c.offsetHeight / 2; return {c:c, d:cy - my, h:c.offsetHeight, s:1, w:0, t:0}; });
        items.forEach(function(it){ var a = Math.abs(it.d); if(a < R1){ var u = Math.cos(Math.PI / 2 * a / R1); it.s = 1 + M * u * u; } else if(a < R2){ var v = Math.cos(Math.PI / 2 * (a - R1) / (R2 - R1)); it.w = v * v; } });
        [-1, 1].forEach(function(side){
          var mine = items.filter(function(it){ return side < 0 ? it.d < 0 : it.d >= 0; }), E = 0, Wsum = 0;
          mine.forEach(function(it){ E += (it.s - 1) * it.h; Wsum += it.w * it.h; });
          var kk = Wsum > 0 ? E / Wsum : 0;
          mine.forEach(function(it){ if(it.w > 0) it.s = Math.max(.6, 1 - kk * it.w); });
          mine.sort(function(a, b){ return Math.abs(a.d) - Math.abs(b.d); });
          var acc = 0; mine.forEach(function(it){ var e = (it.s - 1) * it.h; it.t = side * (acc + e / 2); acc += e; });
        });
        items.forEach(function(it){ it.c.style.transform = (Math.abs(it.s - 1) > .01 || Math.abs(it.t) > .4) ? 'translateY(' + it.t.toFixed(1) + 'px) scale(' + it.s.toFixed(3) + ')' : ''; });
      });
    }
    m.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; on = true; if(!raf) raf = requestAnimationFrame(paint); });
    m.addEventListener('mouseleave', function(){ on = false; if(!raf) raf = requestAnimationFrame(paint); });
  }
  meanWrap(); meanLens();

  function ftFit(){
    var nm = document.querySelector('.ft-name'), rb = document.querySelector('.ft-rb'); if(!nm || !rb) return;
    rb.style.letterSpacing = '0'; rb.style.marginRight = '';
    var w1 = nm.getBoundingClientRect().width, w0 = rb.getBoundingClientRect().width, n = rb.textContent.length; if(n < 2) return;
    var ls = (w1 - w0) / (n - 1); rb.style.letterSpacing = ls.toFixed(2) + 'px'; rb.style.marginRight = (-ls).toFixed(2) + 'px';

    var tag = document.querySelector('.ft-tag'), brand = document.querySelector('.ft-brand'); if(!tag || !brand) return;
    if(!tag.querySelector('.tx')){ var t = tag.textContent, m = /^(.*?)([。.!]+)$/.exec(t); tag.innerHTML = m ? '<span class="tx">' + m[1] + '</span><span class="pt">' + m[2] + '</span>' : '<span class="tx">' + t + '</span>'; }
    var tx = tag.querySelector('.tx'), target = nm.getBoundingClientRect().right - brand.getBoundingClientRect().left; if(!tx || target < 40) return;
    tag.style.fontSize = ''; var fs = parseFloat(getComputedStyle(tag).fontSize), w = tx.getBoundingClientRect().width; if(!w) return;
    tag.style.fontSize = Math.max(11, Math.min(34, fs * target / w)).toFixed(2) + 'px';
  }

  function ovalFit(){
    var ov = document.querySelector('#contact .oval'), dl = document.querySelector('#contact .prof'), bd = document.querySelector('#contact .body'); if(!ov || !dl || !bd) return;
    var b = bd.getBoundingClientRect(), d = dl.getBoundingClientRect(), h = ov.offsetHeight; if(!h) return;
    ov.style.marginTop = Math.max(0, d.top + d.height / 2 - h / 2 - b.top - 16).toFixed(1) + 'px';
  }

  function ftAlign(){
    var fr = document.querySelector('.ft-right'), ov = document.querySelector('#contact .oval'); if(!fr || !ov) return;
    fr.style.transform = ''; if(window.innerWidth < 821) return;
    var a = ov.getBoundingClientRect(), b = fr.getBoundingClientRect(); if(!a.width || !b.width) return;
    var dx = (a.left + a.width / 2) - (b.left + b.width / 2), ft = fr.closest('.ft-top') || fr.parentElement, lim = ft ? ft.getBoundingClientRect() : null;
    if(lim){ dx = Math.max(lim.left - b.left, Math.min(lim.right - b.right, dx)); }

    var dy = 0, cta = document.getElementById('ftcta'), sb = document.getElementById('ftshare');
    if(cta && sb){ var rc = cta.getBoundingClientRect(), rs = sb.getBoundingClientRect();

      if(rc.width && rs.width && rc.left > rs.right && Math.abs(rs.top - rc.top) <= 40) dy = rs.top - rc.top; }
    fr.style.transform = 'translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px)';
  }

  (function(){
    ['message', 'ch5pin'].forEach(function(id){
      var pin = document.getElementById(id); if(!pin) return;
      pin.addEventListener('click', function(e){
        var t = e.target;
        if(t && t.closest && t.closest('a, button, input, label, figure, .lb, .vid, .hw')) return;
        if(window.getSelection && String(window.getSelection())) return;
        var r = pin.getBoundingClientRect(), total = r.height - vh(); if(!(total > 0)) return;
        var p = Math.max(0, Math.min(1, (-r.top) / total));
        var ats = [];
        pin.querySelectorAll('[data-at]').forEach(function(el){ var v = parseFloat(el.getAttribute('data-at')); if(isFinite(v)) ats.push(v); });
        ats.push(1); ats.sort(function(a, b){ return a - b; });
        var nx = null, i;
        for(i = 0; i < ats.length; i++){ if(ats[i] > p + .012){ nx = ats[i]; break; } }
        if(nx === null) return;
        flyTo(window.scrollY + r.top + total * Math.min(1, nx + .015));
      });
    });
  })();
  function alignAll(){ opticalAlign(); hugLine(); tagAlign(); ftFit(); ovalFit(); ftAlign(); }
  alignAll();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(alignAll, 30); });
  var oaT; window.addEventListener('resize', function(){ clearTimeout(oaT); oaT = setTimeout(alignAll, 150); });

  var ld = document.getElementById('ld'), ldn = document.getElementById('ldn'), scxEls = top.querySelectorAll('.scx');
  var GL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', GH = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん', GS = '·─│┼×+/';
  function pick(set){ return set.charAt(Math.floor(Math.random()*set.length)); }
  function decode(el, dur){
    var chs = el.querySelectorAll('.ch'), n = chs.length, t0 = performance.now();
    var finals = Array.prototype.map.call(chs, function(c){ return c.textContent; });
    var lockAt = finals.map(function(_, i){ return (i / n) * dur * .8 + Math.random() * dur * .2; });
    el.classList.add('dec');
    (function tick(){
      var t = performance.now() - t0, done = true;
      chs.forEach(function(c, i){
        var f = finals[i];
        if(f === ' ' || f === ' ') return;
        if(t >= lockAt[i]){ if(c.textContent !== f){ c.textContent = f; c.classList.remove('rnd'); } }
        else { done = false; c.classList.add('rnd'); c.textContent = /[぀-ゟ]/.test(f) ? pick(GH) : (/[A-Za-z0-9]/.test(f) ? pick(GL) : pick(GS)); }
      });
      if(!done) setTimeout(tick, 42);
    })();
  }
  var opened = false;
  function heroIn(){

    top.classList.remove('scat');
    top.classList.add('rule');
    top.classList.add('wet'); setTimeout(function(){ top.classList.remove('wet'); }, 950);
    requestAnimationFrame(function(){ top.classList.add('in'); });
    setTimeout(function(){ decode(scxEls[0], 900); }, 700);
    setTimeout(function(){ decode(scxEls[1], 800); }, 950);
    setTimeout(function(){ decode(scxEls[2], 700); }, 1150);
    setTimeout(function(){ body.classList.remove('opening'); }, 1200);
    setTimeout(function(){ top.classList.add('gone'); }, 4800);
  }
  function loader(){
    if(!ld) return;
    if(reduce){ ld.remove(); top.classList.remove('scat'); scxEls.forEach(function(e){ e.classList.add('dec'); }); top.classList.add('in'); body.classList.remove('opening'); return; }
    var lanes = Array.prototype.map.call(ld.querySelectorAll('.lane'), function(el, i){
      var w = el.firstElementChild.getBoundingClientRect().width || 1000;
      return {el: el, w: w, pos: Math.random() * w, dir: (i % 2 ? 1 : -1), v: [880, 520, 1040][i % 3]};
    });
    var t0 = performance.now(), last = t0, MIN = 1400, CAP = 3000, fontsOk = false, videoOk = false, disp = 0, phase = 'run', stopT = 0, speed = 0, finished = false;
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ fontsOk = true; lanes.forEach(function(l){ var w = l.el.firstElementChild.getBoundingClientRect().width; if(w > 10){ l.pos = l.pos * w / l.w; l.w = w; } }); }); } else { fontsOk = true; }
    var v = document.querySelector('#message video');
    if(!v) videoOk = true;
    if(v){ if(v.readyState >= 3) videoOk = true; else { v.addEventListener('canplaythrough', function(){ videoOk = true; }, {once:true}); v.addEventListener('error', function(){ videoOk = true; }, {once:true}); } }
    setTimeout(function(){ videoOk = true; }, 2300);

    var bs = Array.prototype.slice.call(ld.querySelectorAll('.name b'));
    function isKanji(t){ return /[\u4E00-\u9FFF]/.test(t); }
    function chHtml(t){ var cls = /[A-Za-z]/.test(t) ? 'e' : (isKanji(t) ? 'g' : 'm'); return '<span class="ch on ' + cls + '">' + t + '</span>'; }

    var SEQ = [];
    function T(a, b, c, d, hold){ SEQ.push([a, b || '', c || '', d || '', hold || 0]); }
    T('', 'z'); T('', 'ぜ'); T('', 'ぜn'); T('', 'ぜん'); T('', 'ぜんb'); T('', 'ぜんぶ', '', '', 120); T('', 'ゼンブ', '', '', 260); T('ゼンブ', '');
    T('ゼンブ', 'f'); T('ゼンブ', 'ふ'); T('ゼンブ', 'ふk'); T('ゼンブ', 'ふく'); T('ゼンブ', 'ふくm'); T('ゼンブ', 'ふくめ'); T('ゼンブ', 'ふくめt'); T('ゼンブ', 'ふくめて', '', '', 120); T('ゼンブ', '含めて', '', '', 260); T('ゼンブ含めて', '');
    T('ゼンブ含めて、', '', '', '', 220);
    T('ゼンブ含めて、', '', '', 'i'); T('ゼンブ含めて、', '', '', 'い'); T('ゼンブ含めて、', '', '', 'いm'); T('ゼンブ含めて、', '', '', 'いま', 120); T('ゼンブ含めて、', '', '', '今', 240); T('ゼンブ含めて、', '', '今', '');
    T('ゼンブ含めて、', '', '今', 'n'); T('ゼンブ含めて、', '', '今', 'の', 100); T('ゼンブ含めて、', '', '今の', '');
    T('ゼンブ含めて、', '', '今の', 'j'); T('ゼンブ含めて、', '', '今の', 'じ'); T('ゼンブ含めて、', '', '今の', 'じb'); T('ゼンブ含めて、', '', '今の', 'じぶ'); T('ゼンブ含めて、', '', '今の', 'じぶn'); T('ゼンブ含めて、', '', '今の', 'じぶん', 120); T('ゼンブ含めて、', '', '今の', 'ジブン', 260); T('ゼンブ含めて、', '', '今のジブン', '');
    T('ゼンブ含めて、', '', '今のジブン。', '', 400);
    function render(st, caret){
      var l1 = Array.from(st[0]).map(chHtml).join('') + (st[1] ? '<u>' + Array.from(st[1]).map(chHtml).join('') + '</u>' : '');
      var l2 = Array.from(st[2]).map(chHtml).join('') + (st[3] ? '<u>' + Array.from(st[3]).map(chHtml).join('') + '</u>' : '');
      var onL2 = st[2] || st[3] || /、$/.test(st[0]) && !st[1] && st[0].length >= 7 && caret === 'l2';
      var html = '<span class="split">' + l1 + (onL2 ? '' : '<i class="caret"></i>') + '</span>' + ((st[2] || st[3] || onL2) ? '<span class="split">' + l2 + '<i class="caret"></i></span>' : '');
      bs.forEach(function(b){ b.innerHTML = html; });
    }
    function typeIn(done){
      var i = 0;
      (function step(){
        if(i >= SEQ.length){ ld.classList.add('set'); done && done(); return; }
        var st = SEQ[i]; render(st, (i > 18) ? 'l2' : 'l1'); i++;
        setTimeout(step, 42 + (st[4] || 0) * .55);
      })();
    }
    function finish(){
      if(finished) return; finished = true;
      ld.classList.add('done');
      setTimeout(function(){ ld.classList.add('nm'); render(['', '', '', '', 0], 'l1'); }, 600);
      var typed = false;
      setTimeout(function(){ typeIn(function(){ typed = true; }); }, 1000);
      var lifted = false;
      function lift(){ if(lifted) return; lifted = true; ld.classList.add('lift'); heroIn(); setTimeout(function(){ ld.remove(); }, 1400); }
      liftNow = lift; if(wantLift){ lift(); return; }
      (function waitTyped(){ if(typed) setTimeout(lift, 900); else setTimeout(waitTyped, 60); })();
      setTimeout(lift, 7600);
    }
    var liftNow = null, wantLift = false;
    if(window.__ldTap){ wantLift = true; phase = 'stop'; stopT = performance.now() - 900; }
    ld.addEventListener('click', function(){ if(liftNow){ liftNow(); return; } wantLift = true; phase = 'stop'; stopT = performance.now() - 900; });
    window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && phase === 'run'){ phase = 'stop'; stopT = performance.now(); } });
    (function frame(now){
      var t = now - t0, dt = Math.min(50, now - last) / 1000; last = now;
      var ready = (fontsOk && videoOk) || t > CAP;

      var bound = 100 * (1 - Math.pow(1 - Math.min(1, t / MIN), 2.2));
      disp = Math.min(bound, disp + ((ready ? 100 : 92) - disp) * .12);
      if(ready && t >= MIN) disp = 100;
      if(phase === 'run' && disp >= 100){ phase = 'stop'; stopT = now; ld.classList.add('hund'); }
      var n = Math.max(0, Math.floor(disp)); ldn.textContent = (n < 10 ? '0' : '') + n;

      if(phase === 'run'){ speed = Math.min(1, t / 500); speed = speed * speed * (3 - 2 * speed); }
      else { var k = Math.min(1, (now - stopT) / 620); speed = (1 - k) * (1 - k) * (1 - k);
             var q = (now - stopT - 620) / 260; if(q > 0 && q < 1) speed = -.07 * Math.sin(Math.PI * q); }
      lanes.forEach(function(l, i){
        l.pos = (l.pos + l.v * speed * dt) % l.w;
        var x = l.dir < 0 ? -l.pos : -l.w + l.pos;

        l.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + (-l.dir * speed * 6).toFixed(2) + 'deg)';
        var bl = speed * (i === 1 ? 1.2 : 2.2); l.el.style.filter = bl > .15 ? 'blur(' + bl.toFixed(2) + 'px)' : 'none';
      });
      if(phase === 'stop' && now - stopT >= 900){ ldn.textContent = '100'; finish(); return; }
      requestAnimationFrame(frame);
    })(t0);
  }

  (function(){
    if(document.documentElement.classList.contains('handheld')) return;
    var SEL = '.chtrail,.wktrail,.mtrail,.illo,.route,.br-svg,.dg-svg,.mp-svg', CAP = 2500000, t = 0;
    function pass(){
      document.querySelectorAll(SEL).forEach(function(e){
        var r = e.getBoundingClientRect();
        e.style.willChange = (r.width * r.height > CAP) ? 'auto' : '';
      });
    }
    window.addEventListener('load', function(){ setTimeout(pass, 900); });
    setTimeout(pass, 2500);
    window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(pass, 400); }, {passive:true});
  })();

  (function(){
    var rv = document.getElementById('rotv');
    if(!document.documentElement.classList.contains('handheld') || !rv){ if(rv && rv.parentNode) rv.parentNode.removeChild(rv); loader(); return; }

    var land = window.matchMedia('(orientation:landscape)');
    var started = false, muted = false;
    function startOpening(){ if(started) return; started = true; setTimeout(loader, 280); }
    var H = document.documentElement;

    var RECOPY = {
      ja: {

        first:{small:'スマートフォン・タブレットでご覧の方へ', b:'横に持ち替えて、<br>お楽しみください。', big:'横|楽', note:'このサイトは、横長の画面に合わせて制作しています。'},
        rot:  {small:'おっと、縦持ちになったようです。', b:'首を横にする前に、<br>端末を横に。', big:'首|端末', note:'できれば、横持ちでお楽しみください。'},
        mail: {small:'いただいたご連絡は、ありがたく拝読いたします。', b:'この続きは、<br>横向きでどうぞ。', big:'続き|横向き', note:'細かな点までご覧いただき、ありがとうございます。'}
      },
      en: {
        first:{small:'A note for readers on a phone or tablet', b:'Turn your device sideways<br>and enjoy the site.', big:'sideways|enjoy', note:'This site is made for a landscape screen.'},
        rot:  {small:'Oops — it seems we are in portrait.', b:'Before you tilt your head,<br>tilt the phone.', big:'head|phone', note:'If you can, enjoy it in landscape.'},
        mail: {small:'Anything you send, I will read with care.', b:'The rest of it<br>is best in landscape.', big:'rest|landscape', note:'Thank you for looking this closely.'}
      }
    };
    var recopied = '', rvKind = 'first';
    function recopy(){
      var kind = rvKind, lang = (typeof curLang !== 'undefined' ? curLang : 'ja');
      if(recopied === kind + lang) return; recopied = kind + lang;
      var en = lang === 'en', c = (en ? RECOPY.en : RECOPY.ja)[kind] || (en ? RECOPY.en : RECOPY.ja).rot;
      var sm = rv.querySelector('small'), b = rv.querySelector('b.rtl'), w = b && b.querySelector('.w'), note = rv.querySelector('.rnote');
      if(sm) sm.textContent = c.small;
      if(note) note.textContent = c.note;
      if(w){ w.innerHTML = c.b; b.setAttribute('data-big', c.big); if(kind !== 'first') b.classList.add('rv2'); if(typeof mixedSubs === 'function') mixedSubs(!en); }
      if(kind !== 'first') rv.classList.add('rvscene');
    }

    recopy();
    window.__rvRelang = function(){ recopied = ''; recopy(); };

    function rvBlock(e){ if(!rv.classList.contains('gone')) e.preventDefault(); }
    window.addEventListener('touchmove', rvBlock, {passive:false});
    window.addEventListener('wheel', rvBlock, {passive:false});
    function hide(mute){ H.classList.toggle('rvmute', !!mute);
      rv.classList.add('gone'); H.classList.remove('rotvup', 'rotvup0'); clearTimeout(hide.t); hide.t = setTimeout(function(){ if(rv.classList.contains('gone')){ rv.classList.add('off'); if(window.__retint) window.__retint(); } }, 1000); if(window.__setTheme){ var cur = (getComputedStyle(document.body).getPropertyValue('--bg') || '').trim(); if(cur) window.__setTheme(cur); } }
    function show(){
      if(muted) return;
      if(H.classList.contains('cpopen')) return;
      if(H.classList.contains('nwon')) return;
      clearTimeout(hide.t); rv.classList.remove('off'); H.classList.remove('rvmute');
      recopy();
      var c = window.__landCols;
      if(c && c.bg){ H.style.setProperty('--rvbg', c.bg); H.style.setProperty('--rvfg', c.fg || '#1C1B19'); }
      var sv = rv.querySelector('svg'); if(sv){ sv.style.display = 'none'; void sv.offsetWidth; sv.style.display = ''; }
      rv.classList.remove('gone'); H.classList.add('rotvup'); angUp = devAng();    if(window.__setTheme) window.__setTheme((c && c.bg) || '#E84518');
      if(window.__retint) window.__retint();
    }
    H.classList.add('rotvup', 'rotvup0');
    if(!land.matches){

      var rt = function(){ if(window.__retint) window.__retint(); if(window.__setTheme) window.__setTheme('#E84518'); };
      requestAnimationFrame(function(){ requestAnimationFrame(rt); }); setTimeout(rt, 350); setTimeout(rt, 1000); setTimeout(rt, 2200);
    }

    window.__rvSuppress = function(){ hide(); };
    window.__rvPortrait = function(){ if(!land.matches && started){ muted = false; rvKind = 'mail'; show();

      var rt2 = function(){ if(window.__retint) window.__retint(); if(window.__setTheme){ var c2 = window.__landCols; window.__setTheme((c2 && c2.bg) || '#E84518'); } };
      requestAnimationFrame(function(){ requestAnimationFrame(rt2); }); setTimeout(rt2, 350); setTimeout(rt2, 700); setTimeout(rt2, 1200); setTimeout(rt2, 2200); } };
    window.__rvRecheck = function(){ if(!started) return; if(land.matches) hide(); else { rvKind = 'rot'; show(); } };
    window.__rvHide = function(){ if(land.matches && !H.classList.contains('rotvup') === false) hide(); };
    if(land.matches){ hide(); startOpening(); }
    else setTimeout(function(){ if(started && land.matches) hide(); }, 5000);
    rv.addEventListener('click', function(){ muted = true; hide(true); startOpening(); });

    function sakuraPath(){

      var d = '', cx = 100, cy = 100, dist = 52, R = 40, cusp = 67.8, nt = 12 * Math.PI / 180;
      function pt(a, r){ return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; }
      function f(p){ return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
      for(var k = 0; k < 5; k++){
        var th = k * 2 * Math.PI / 5;
        var A = pt(th - Math.PI / 5, cusp), B = pt(th + Math.PI / 5, cusp), C = pt(th, dist);
        var N1 = [C[0] + R * Math.sin(th - nt), C[1] - R * Math.cos(th - nt)];
        var N2 = [C[0] + R * Math.sin(th + nt), C[1] - R * Math.cos(th + nt)];
        var V = pt(th, 82);
        if(k === 0) d += 'M' + f(A);
        d += ' A' + R + ',' + R + ' 0 0 1 ' + f(N1) + ' L' + f(V) + ' L' + f(N2) + ' A' + R + ',' + R + ' 0 0 1 ' + f(B);
      }
      return d + ' Z';
    }
    function vcols(cols, xs, size, y0, pitch){
      var h = '';
      cols.forEach(function(c, i){ Array.from(c).forEach(function(ch, j){
        h += '<text x="' + xs[i] + '" y="' + (y0 + j * pitch) + '" text-anchor="middle" font-size="' + size + '">' + ch + '</text>'; }); });
      return h;
    }
    var rotOkN = 0, mailOkN = 0;
    function rotOk(){
      var el = document.getElementById('rotok');
      if(!el){
        el = document.createElement('div'); el.id = 'rotok'; el.setAttribute('aria-hidden', 'true');
        el.innerHTML = '<svg class="bkg" viewBox="0 0 200 200"></svg><div class="ink"><svg viewBox="0 0 200 200"></svg></div>';
        document.body.appendChild(el);
      }
      var kind = rvKind, n = (kind === 'mail') ? ++mailOkN : ++rotOkN;
      var en = (typeof curLang !== 'undefined' && curLang === 'en'), svg = el.querySelector('.ink svg'), bkg = el.querySelector('svg.bkg'), sp = sakuraPath(), h = '';
      if(kind === 'mail' && n === 1){
        h = '<path class="pt" d="' + sp + '"/><path class="rg" d="' + sp + '" transform="translate(100 100) scale(.84) translate(-100 -100)"/>';
        h += en ? '<text x="100" y="97" text-anchor="middle" font-size="13">ENJOY</text><text x="100" y="118" text-anchor="middle" font-size="17">THE REST</text>'
                : vcols(['引き続き', 'お楽しみ', 'ください'], [120, 100, 80], 15.5, 84, 16.5);
      } else if(kind === 'mail'){
        h = '<path class="pt" d="' + sp + '"/>';
        h += en ? '<text x="100" y="97" text-anchor="middle" font-size="13">THANKS</text><text x="100" y="118" text-anchor="middle" font-size="19">AGAIN</text>'
                : vcols(['なんども', 'ありがとう'], [111, 89], 15.5, 82, 16.5);
      } else if(n === 1){
        h = '<path class="pt" d="' + sp + '"/><path class="rg" d="' + sp + '" transform="translate(100 100) scale(.84) translate(-100 -100)"/>';
        h += en ? '<text x="100" y="97" text-anchor="middle" font-size="13">VERY WELL</text><text x="100" y="118" text-anchor="middle" font-size="19">DONE</text>'
                : vcols(['たいへん', 'よくでき', 'ました'], [120, 100, 80], 15.5, 84, 16.5);
      } else if(n === 2){
        h = '<path class="pt" d="' + sp + '"/>';
        h += en ? '<text x="100" y="97" text-anchor="middle" font-size="13">KEEP IT</text><text x="100" y="118" text-anchor="middle" font-size="19">UP</text>'
                : vcols(['がんばり', 'ましょう'], [110, 89], 16.5, 86, 17);
      } else {
        h = '<circle class="pt" cx="100" cy="100" r="88"/><circle class="rg" cx="100" cy="100" r="79"/>';
        h += en ? '<text x="100" y="94" text-anchor="middle" font-size="12">ONE MORE</text><text x="100" y="116" text-anchor="middle" font-size="17">TIME</text>'
                : vcols(['もういちど', '復習しよう'], [111, 89], 15.5, 78, 16.5);
      }
      svg.innerHTML = h;
      bkg.innerHTML = (kind === 'mail' || n <= 2) ? '<path class="bk" d="' + sp + '"/>' : '<circle class="bk" cx="100" cy="100" r="88"/>';
      el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
      clearTimeout(rotOk.t); rotOk.t = setTimeout(function(){ el.classList.remove('on'); }, 2700);
    }

    var rvAnc = null, rvLock = 0, rvRaf = 0;

    var rvTab = null;
    function rvBuild(){
      var secs = document.querySelectorAll('section[id]'), t = [];
      for(var i = 0; i < secs.length; i++){ var e = secs[i]; t.push({el:e, id:e.id, o:langDocTop(e), h:e.offsetHeight}); }
      rvTab = t; rvTab.at = Date.now();
      return t;
    }
    function rvMark(){
      if(rvLock || H.classList.contains('rotvup') || !land.matches) return;
      var t = rvTab || rvBuild(), y = window.scrollY, sec = null, top0 = 0, hh = 1;
      for(var i = 0; i < t.length; i++){ if(y >= t[i].o - 2 && y < t[i].o + t[i].h){ sec = t[i]; top0 = t[i].o; hh = t[i].h; break; } }
      if(!sec && t.length && y >= t[t.length - 1].o + t[t.length - 1].h){ t = rvBuild();
        for(var j = 0; j < t.length; j++){ if(y >= t[j].o - 2 && y < t[j].o + t[j].h){ sec = t[j]; top0 = t[j].o; hh = t[j].h; break; } } }
      if(!sec) return;
      rvAnc = {id:sec.id, p:(y - top0) / Math.max(1, hh)};
    }

    function rvKeep(){ if(rvRaf) return; rvRaf = requestAnimationFrame(function(){ rvRaf = 0; rvMark(); }); }
    var rvUn = 0;
    window.addEventListener('resize', function(){ rvLock = 1; rvTab = null; clearTimeout(rvUn); rvUn = setTimeout(function(){ rvLock = 0; rvTab = null; }, 2800); }, {passive:true});

    window.addEventListener('scroll', rvKeep, {passive:true});
    setTimeout(function(){ rvTab = null; rvKeep(); }, 1200);
    setTimeout(function(){ rvTab = null; }, 3000); setTimeout(function(){ rvTab = null; }, 6000);
    window.addEventListener('load', function(){ rvTab = null; });
    setInterval(function(){ rvTab = null; }, 2000);
    function rvPut(){ if(!rvAnc) return; var s0 = document.getElementById(rvAnc.id); if(!s0) return;
      var y0 = Math.round(langDocTop(s0) + rvAnc.p * s0.offsetHeight);
      if(Math.abs(y0 - window.scrollY) > 2) window.scrollTo({top:y0, behavior:'instant'});    }
    function rvReflow(){
      rvLock = 1; rvTab = null;
      requestAnimationFrame(function(){ requestAnimationFrame(rvPut); });
      setTimeout(rvPut, 140); setTimeout(rvPut, 380); setTimeout(rvPut, 760); setTimeout(rvPut, 1200); setTimeout(rvPut, 1800); setTimeout(rvPut, 2500);
      clearTimeout(rvUn); rvUn = setTimeout(function(){ rvLock = 0; }, 2800);
    }
    var visAt = 0, angUp = null;
    function devAng(){
      try{ if(window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') return window.screen.orientation.angle; }catch(e){}
      return (typeof window.orientation === 'number') ? window.orientation : null;
    }
    document.addEventListener('visibilitychange', function(){ if(!document.hidden) visAt = performance.now(); }, true);
    function onOrient(e){
      var m = e.matches;
      rvReflow();
      clearTimeout(onOrient.t);

      if(!m){ if(started){ rvKind = 'rot'; show(); } return; }

      var wasUp = started && !rv.classList.contains('gone');
      var ang = devAng();
      var notTurned = (ang !== null && angUp !== null && ang === angUp);
      var backFromTab = document.hidden || notTurned || (visAt && performance.now() - visAt < 2600);
      onOrient.t = setTimeout(function(){
        muted = false; hide(); startOpening(); if(wasUp && !backFromTab) setTimeout(rotOk, 520);
      }, 430);
    }
    if(land.addEventListener) land.addEventListener('change', onOrient);
    else if(land.addListener) land.addListener(onOrient);

    document.addEventListener('visibilitychange', function(){ if(document.hidden || !started) return;
      if(!land.matches){ if(rv.classList.contains('gone')){ rvKind = 'rot'; show(); } }
      else if(!rv.classList.contains('gone')){ muted = false; hide(); } });
  })();

  var cur = document.getElementById('cur');
  if(fine && !reduce){
    body.classList.add('hasmouse');
    var cv = cur.querySelector('.cv'), chh = cur.querySelector('.chh'), cd = cur.querySelector('.cd'), cc = cur.querySelector('.cc');
    var mx = window.innerWidth/2, my = vh()/2, lx = mx, ly = my, dx = mx, dy = my, lastTxt = '';

    var ctaFx = document.querySelector('.cta-fx'), cdLab = document.createElement('b'), suckOn = false;

    cdLab.innerHTML = '<svg class="cr" viewBox="0 0 160 160" aria-hidden="true"><defs><path id="curring" d="M80,80 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0"/></defs>' +
      '<text><textPath href="#curring" startOffset="0%" textLength="414" lengthAdjust="spacing"></textPath></text></svg>' +
      '<svg class="ar" viewBox="0 0 26 30" aria-hidden="true"><path d="M13 3 V21.5 M5.5 15 L13 23 L20.5 15"/></svg>';
    cd.appendChild(cdLab);
    function suckHold(t){
      var over = !!(t && t.closest && t.closest('.cta-fx')) && body.classList.contains('past');
      if(!ctaFx || !body.classList.contains('past')) return suckSet(false);
      var br = ctaFx.getBoundingClientRect(), cx = br.left + br.width / 2, cy = br.top + br.height / 2;
      var d = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy)), R = Math.max(br.width, br.height) / 2;
      suckSet(over || (suckOn && d < R * 2.8));
    }
    function suckSet(on){
      if(on === suckOn) return;
      suckOn = on; cur.classList.toggle('suck', on);
      if(!on) return;
      var up = body.classList.contains('atend');
      cur.classList.toggle('upward', up);
      var tp = cdLab.querySelector('textPath');

      if(tp) tp.textContent = up ? 'ページの先頭へ戻ります \u00b7 BACK TO THE TOP\u00a0\u00b7\u00a0' : '画面下部へ移動します \u00b7 TO THE FOOT OF THE PAGE\u00a0\u00b7\u00a0';
    }
    var parallaxEls = null;
    window.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY; cur.classList.add('on');
      var t = e.target, hov = t && t.closest ? t.closest('a, button, figure, .tl li, .sr li, #seqlist li, .lang, .gm-ttl, .gm-idots > *') : null;
      cur.classList.toggle('hov', !!hov);
      cur.classList.toggle('onmedia', !!(t && t.closest && t.closest('.vid, .wkf, .marg figure, .hw, #ch5pin .bgph, .wk-mid')));
      suckHold(t);
      if(!body.classList.contains('opening')){

        var mxv = (mx / window.innerWidth - .5), myv = (my / vh() - .5);
        if(!parallaxEls) parallaxEls = {b:top.querySelectorAll('.name b'), ov:top.querySelector('.ovals')};
        parallaxEls.b.forEach(function(el){ el.style.setProperty('--mx', mxv.toFixed(3)); el.style.setProperty('--my', myv.toFixed(3)); });
        if(parallaxEls.ov && window.innerWidth > 1024) parallaxEls.ov.style.transform = 'translate(-50%,-50%) translate(' + (mxv * -14).toFixed(1) + 'px,' + (myv * -10).toFixed(1) + 'px)';
      }
      if(my < vh() * 1.2){ var tr = top.getBoundingClientRect(), pkEl = window.__peek || top; pkEl.style.setProperty('--px', (mx - tr.left).toFixed(0) + 'px'); pkEl.style.setProperty('--py', (my - tr.top).toFixed(0) + 'px'); }
    }, {passive:true});

    (function(){ var tl = top.querySelector('.lines'); if(!tl) return; var pk = tl.cloneNode(true); window.__peek = pk; pk.classList.add('peek'); pk.setAttribute('aria-hidden', 'true'); var mesh = document.createElement('i'); mesh.className = 'mesh'; pk.insertBefore(mesh, pk.firstChild); top.appendChild(pk); })();

    window.addEventListener('pointermove', function(e){
      if(e.pointerType === 'touch') return;
      mx = e.clientX; my = e.clientY; cur.classList.add('on');
    }, {passive:true});
    var c5 = document.getElementById('ch5pin');
    window.addEventListener('mousemove', function(e){ if(c5){ c5.style.setProperty('--sx', (e.clientX / window.innerWidth * 100).toFixed(1) + '%'); c5.style.setProperty('--sy', (e.clientY / vh() * 100).toFixed(1) + '%'); } }, {passive:true});
    window.addEventListener('scroll', function(){ var t = document.elementFromPoint(mx, my); var hov = t && t.closest ? t.closest('a, button, figure, .tl li, .sr li, #seqlist li, .lang, .gm-ttl, .gm-idots > *') : null; cur.classList.toggle('hov', !!hov); suckHold(t); }, {passive:true});
    document.documentElement.addEventListener('mouseleave', function(){ cur.classList.remove('on'); });
    document.documentElement.addEventListener('mouseenter', function(){ cur.classList.add('on'); });
    (function loop(){
      lx += (mx - lx) * .18; ly += (my - ly) * .18; dx += (mx - dx) * .55; dy += (my - dy) * .55;
      if(suckOn && ctaFx){
        var br = ctaFx.getBoundingClientRect(), bx = br.left + br.width / 2, by = br.top + br.height / 2;
        dx += (bx - dx) * .34; dy += (by - dy) * .34; lx += (bx - lx) * .18; ly += (by - ly) * .18;
      }
      cv.style.transform = 'translateX(' + lx.toFixed(1) + 'px)';
      chh.style.transform = 'translateY(' + ly.toFixed(1) + 'px)';
      cd.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      cc.style.transform = 'translate(' + (lx + 14).toFixed(1) + 'px,' + (ly + 10).toFixed(1) + 'px)';
      var txt = 'x ' + (lx / window.innerWidth * 100).toFixed(1) + ' y ' + (ly / vh() * 100).toFixed(1);
      if(txt !== lastTxt){ lastTxt = txt; cc.textContent = txt; }
      requestAnimationFrame(loop);
    })();
  }

  var secs = document.querySelectorAll('.sp, .pin');
  var ioSec = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); } }); }, {threshold:0, rootMargin:'-12% 0px -12% 0px'});
  secs.forEach(function(s){ if(s !== top) ioSec.observe(s); });
  var ioEl = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); ioEl.unobserve(e.target); } }); }, {threshold:.2, rootMargin:'0px 0px -8% 0px'});
  var ioP = new IntersectionObserver(function(es){
    var k = 0;
    es.forEach(function(e){
      var el = e.target;
      if(e.isIntersecting){ el.style.transitionDelay = (k * 110) + 'ms'; k++; el.classList.add('in'); }
      else if(e.boundingClientRect.top > (e.rootBounds ? e.rootBounds.bottom : vh() * .8)){ el.style.transitionDelay = '0ms'; el.classList.remove('in'); }
    });
  }, {threshold:0, rootMargin:'0px 0px -20% 0px'});
  document.querySelectorAll('.io').forEach(function(el){ (el.classList.contains('p') || el.classList.contains('sub')) ? ioP.observe(el) : ioEl.observe(el); });
  var brBody = document.querySelector('#bridge .br-body'); if(brBody) ioEl.observe(brBody);

  window.__kuMark = function(root){ (root || document).querySelectorAll('mark').forEach(function(m){
    m.classList.toggle('ku', /。$/.test((m.textContent || '').replace(/\s+$/, ''))); }); };
  var ioM = new IntersectionObserver(function(es){ es.forEach(function(e){ var m = e.target; if(e.isIntersecting){ m.classList.toggle('ku', /。$/.test((m.textContent || '').replace(/\s+$/, ''))); m.classList.add('in'); } else if(e.boundingClientRect.top > (e.rootBounds ? e.rootBounds.bottom : vh())) m.classList.remove('in'); }); }, {threshold:0, rootMargin:'0px 0px -22% 0px'});
  document.querySelectorAll('mark').forEach(function(m){ if(!m.closest('[data-at]')) ioM.observe(m); });
  window.__kuMark();

  var ioHw = new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var v = e.target; ioHw.unobserve(v); v.closest('.hwv').classList.add('on'); if(reduce){ try{ v.currentTime = 9; }catch(x){} return; } try{ var pr = v.play(); if(pr && pr.catch) pr.catch(function(){}); }catch(x){} }); }, {threshold:.6});
  document.querySelectorAll('.hwv video').forEach(function(v){ ioHw.observe(v); });

  var ioCnt = new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var el = e.target, n = parseInt(el.getAttribute('data-n'),10), k = 0; ioCnt.unobserve(el);
    var t = setInterval(function(){ k++; el.textContent = ('0' + k).slice(-2); if(k >= n) clearInterval(t); }, 90); }); }, {threshold:.5});
  document.querySelectorAll('.cnt').forEach(function(el){ ioCnt.observe(el); });

  var curScene = 'paper', curSec = null, curTop = null, curBot = null, secList = Array.prototype.slice.call(secs);
  function sceneUpdate(){

    var H = vh(), midS = H*(window.__SCENEMID || .72), midL = H*.5, hitS = null, hit = null, tp = null, bt = null;
    for(var i=0;i<secList.length;i++){ var r = secList[i].getBoundingClientRect();
      if(r.top <= 2 && r.bottom > 2) tp = secList[i];
      if(r.top <= midS && r.bottom > midS) hitS = secList[i];
      if(r.top <= midL && r.bottom > midL) hit = secList[i];
      if(r.top <= H - 2 && r.bottom > H - 2){ bt = secList[i]; break; }
    }

    var st = tp && (tp.getAttribute('data-scene') || 'paper'); if(st && st !== curTop){ curTop = st; body.setAttribute('data-scene-top', st); }
    var sb = bt && (bt.getAttribute('data-scene') || 'paper'); if(sb && sb !== curBot){ curBot = sb; body.setAttribute('data-scene-bot', sb); }
    if(hitS && hitS !== curSecS){ curSecS = hitS; sceneCol(hitS); }
    if(!hit || hit === curSec) return; curSec = hit;
    setYear(hit.getAttribute('data-year')); setPlace(hit.getAttribute('data-place') || '');
  }
  var curSecS = null;
  function sceneCol(hitS){
    var sc = hitS.getAttribute('data-scene') || 'paper';
    if(sc !== curScene){ curScene = sc; body.setAttribute('data-scene', sc);
      var cs0 = getComputedStyle(body), bg0 = cs0.getPropertyValue('--bg') || '';
      document.documentElement.style.backgroundColor = bg0;
      if(window.__setTheme) window.__setTheme(bg0.trim());
      if(window.__retint) window.__retint();
      if(window.__rvHide) window.__rvHide();

      if(!window.matchMedia || window.matchMedia('(orientation:landscape)').matches) window.__landCols = {bg: bg0.trim(), fg: (cs0.getPropertyValue('--fg') || '').trim()};
    }
  }

  var yrl = document.getElementById('yrl'), yrBox = document.querySelector('.yr'), plT = null, plCur = yrl ? yrl.textContent : '';
  function setPlace(txt){
    if(!yrl || txt === plCur) return; plCur = txt;
    if(plT) cancelAnimationFrame(plT);
    if(yrBox){ yrBox.classList.remove('sw'); void yrBox.offsetWidth; yrBox.classList.add('sw'); }
    if(reduce){ yrl.textContent = txt; return; }
    var n = txt.length, t0 = performance.now(), dur = 380 + n * 22, POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    (function tick(now){
      var t = now - t0, out = '', done = true;
      for(var i = 0; i < n; i++){ var c = txt.charAt(i), lock = (i / Math.max(1, n)) * dur * .7 + 120; if(c === ' ' || t >= lock) out += c; else { done = false; out += POOL.charAt(Math.floor(Math.random() * POOL.length)); } }
      yrl.textContent = out;
      if(!done) plT = requestAnimationFrame(tick); else plT = null;
    })(t0);
  }

  var hdSecs = Array.prototype.slice.call(document.querySelectorAll('[data-hd]')), chap = document.getElementById('chap'),
      chapK = chap.querySelector('.k'), chapN = chap.querySelector('.n'), chapT = chap.querySelector('.t'), curHd = null, hdTimer = null;
  function chapUpdate(){
    var line = 46, hit = null;
    for(var i=0;i<hdSecs.length;i++){ var s = hdSecs[i], r = s.getBoundingClientRect(); if(r.top <= line) hit = s; else break; }
    var key = hit ? hit.getAttribute('data-hd') : ''; curSecId = hit ? hit.id : '';
    if(key === curHd) return; curHd = key;
    clearTimeout(hdTimer);
    if(!key){ chap.classList.remove('on'); return; }
    var parts = key.split('|');
    chap.classList.add('sw');
    hdTimer = setTimeout(function(){ chapK.textContent = parts[0] || ''; chapN.textContent = parts[1] || ''; chapT.textContent = (curLang === 'en' && parts[2] && I18N[parts[2]]) ? I18N[parts[2]] : (parts[2] || ''); chap.classList.remove('sw'); chap.classList.add('on'); }, 240);
  }

  var cols = document.querySelectorAll('#od .col'), od = document.getElementById('od');
  cols.forEach(function(c){ var s=''; for(var d=0; d<10; d++) s += '<i>'+d+'</i>'; c.innerHTML = s + '<i>0</i>'; });
  var curY = null;
  var odT = 0;
  function wordOut(then){
    var ar = od.querySelector('.ar'); ar.classList.add('bye');
    odT = setTimeout(function(){ od.classList.remove('arrow', 'two', 'long'); ar.classList.remove('bye'); cols.forEach(function(c){ c.style.transition = 'none'; c.style.transitionDelay = '0ms'; c.style.transform = 'translateY(1.15em)'; }); void od.offsetWidth; cols.forEach(function(c){ c.style.transition = ''; }); then(); }, 300);
  }
  function setYear(y){
    clearInterval(yrRoll); clearTimeout(yrRoll); clearTimeout(odT);
    var rg = /^(\d{4})-(\d{4})$/.exec(String(y)), ar = od.querySelector('.ar');
    if(rg){ if(y === curY) return; curY = y; var run = function(){ var a = parseInt(rg[1], 10), b = parseInt(rg[2], 10), last = cols[cols.length - 1]; yrSet(a); yrRoll = setTimeout(function(){
        var n = Math.max(1, Math.min(9, b - a)), st = '', i = 0; for(var d = 0; d <= n; d++) st += '<i>' + ((a + d) % 10) + '</i>'; st += '<i>' + (a % 10) + '</i>';
        last.innerHTML = st; last.__range = true; last.style.transition = 'none'; last.style.transitionDelay = '0ms'; last.style.transform = 'translateY(0)'; void last.offsetWidth; last.style.transition = '';
        var tick = function(){
          i++; last.style.transform = 'translateY(-' + (i * 1.15) + 'em)';
          if(i > n){ yrRoll = setTimeout(function(){ last.style.transition = 'none'; last.style.transform = 'translateY(0)'; void last.offsetWidth; last.style.transition = ''; i = 0; yrRoll = setTimeout(tick, 320); }, 760); }
          else yrRoll = setTimeout(tick, 1080);
        };
        yrRoll = setTimeout(tick, 1080);
      }, 800); };    if(od.classList.contains('arrow')) wordOut(run); else run(); return; }
    if(!/^\d{4}$/.test(String(y))){
      var w = String(y), two = w.length > 4 && w.indexOf(' ') > 0, show = function(){ od.classList.remove('out'); od.classList.add('arrow'); od.classList.toggle('long', w.length > 3); od.classList.toggle('two', two); ar.textContent = two ? w.replace(' ', '\n') : w; };
      if(od.classList.contains('arrow')){ if(y !== curY){ ar.classList.add('bye'); odT = setTimeout(function(){ ar.classList.remove('bye'); show(); }, 300); } }
      else { od.classList.add('out'); odT = setTimeout(show, 360); }
      curY = y; return;
    }
    if(od.classList.contains('arrow')){ curY = y; wordOut(function(){ yrSet(y); }); return; }
    od.classList.remove('out');
    if(y === curY) return; curY = y;
    yrSet(y);
  }
  var yrRoll = null;
  function yrSet(y){
    cols.forEach(function(c){ if(c.__range){ var st = ''; for(var d = 0; d < 10; d++) st += '<i>' + d + '</i>'; c.innerHTML = st + '<i>0</i>'; c.__range = false; c.style.transition = ''; } });
    var ds = String(y).padStart(4,'0').split('');
    cols.forEach(function(c,i){ c.style.transform = 'translateY(-' + (parseInt(ds[i],10)*1.15) + 'em)'; c.style.transitionDelay = (i*60)+'ms'; });
  }
  setYear('2001');

  var rot = document.getElementById('rot'), rs = rot.querySelectorAll(':scope > span'), ri = 0;

  function mixSet(el){ var t = el.textContent; el.textContent = ''; var a = Array.from(t); a.forEach(function(ch, i){ var c = document.createElement('i'); c.className = /[\u3040-\u309F]/.test(ch) ? 'm' : (/[、。]/.test(ch) ? 'm pc' : 'g'); if(/[0-9]/.test(ch) && /[\u3040-\u30FF]/.test(a[i + 1] || '')) c.className += ' nqi'; c.textContent = ch; el.appendChild(c); }); }
  rs.forEach(mixSet);

  document.querySelectorAll('#top .lbl b:not(.rj) .ln').forEach(mixSet);
  document.querySelectorAll('.menu .mmsg .txt .mx, #message .mh .mx').forEach(mixSet);
  setInterval(function(){ var a = rs[ri]; ri = (ri+1) % rs.length; var b = rs[ri]; a.classList.remove('cur'); a.classList.add('out'); setTimeout(function(){ a.classList.remove('out'); }, 700); b.classList.add('cur'); }, 2600);

  var ctEl = document.getElementById('contact');

  (function(){
    if(!document.documentElement.classList.contains('phone')) return;
    var t1 = document.querySelector('.cta-fx .t1 textPath'), t2 = document.querySelector('.cta-fx .t2 textPath');
    function put(el, ja, en){ if(!el) return; el.textContent = ja; el.__ja = el.innerHTML; el.setAttribute('data-ja', ja); el.setAttribute('data-en', en); }
    put(t1, 'ページ下部へ移動 \u00b7 TO THE BOTTOM \u00b7 ', 'TO THE BOTTOM \u00b7 SKIP AHEAD \u00b7 ');
    put(t2, 'ページ上部へ移動 \u00b7 TO THE TOP \u00b7 ', 'TO THE TOP \u00b7 BACK TO THE START \u00b7 ');
  })();
  function ctaUpdate(){ body.classList.toggle('past', window.scrollY > vh()*.7); body.classList.toggle('atend', !!ctEl && ctEl.getBoundingClientRect().top < vh() * .55); }

  var pins = document.querySelectorAll('.pin'), hw = document.getElementById('hw'), hwv = document.getElementById('hwv'), hwPlayed = false;
  var hwDone = false, hwDoneT = 0, hwStartAt = 0, hwArrAt = 0, hwDur = 0, hwLastScroll = 0, hwLockOff = false;
  window.addEventListener('scroll', function(){ hwLastScroll = now(); }, {passive:true});

  pins.forEach(function(pin){
    var n = pin.querySelectorAll('.bgph img').length, st = pin.querySelector('.stick');
    if(!n || !st) return;
    var row = document.createElement('div'); row.className = 'bgdot'; row.setAttribute('aria-hidden', 'true');
    for(var i = 0; i < n; i++) row.appendChild(document.createElement('i'));
    st.appendChild(row);

    row.querySelectorAll('i').forEach(function(d, i){ d.style.pointerEvents = 'auto'; d.addEventListener('click', function(){
      var r = pin.getBoundingClientRect(), total = pin.offsetHeight - vh(), y = r.top + window.scrollY + total * ((i + .5) / n);
      if(typeof flyTo === 'function') flyTo(y); else window.scrollTo({top:y, behavior:'smooth'}); }); });
  });

  function hwCountdown(){
    if(!hwv || hwStartAt) return;
    var dur = parseInt(hwv.getAttribute('data-dur'), 10);
    hwDur = dur > 0 ? dur : 3800;
    var go = function(){ if(!hwStartAt) hwStartAt = now(); };
    hwv.addEventListener('load', go, {once:true});
    if(hwv.complete) go();
    setTimeout(go, 900);
  }

  function hwCheck(){
    if(hwDone || !hwStartAt) return false;
    var sec = document.getElementById('message'); if(!sec) return false;
    var r = sec.getBoundingClientRect();
    if(!(r.top <= vh() * .55 && r.bottom >= vh())){ hwArrAt = 0; return false; }
    var t = now(); if(!hwArrAt) hwArrAt = t;
    if(t < hwStartAt + hwDur + 260) return false;
    if(t < hwArrAt + 900) return false;
    if(t - hwLastScroll < 700) return false;
    hwDone = true; return true;
  }

  function hwAdvance(){
    var sec = document.getElementById('message'); if(!sec) return;
    var run = sec.offsetHeight - vh(); if(run <= 0) return;
    var r = sec.getBoundingClientRect(), p = Math.max(0, Math.min(1, (-r.top) / run));
    if(p > .06) return;
    var h = sec.querySelector('[data-athw]'), at = h ? (parseFloat(h.getAttribute('data-at')) || .12) : .12;
    var y = r.top + window.scrollY + run * at + 6;
    if(typeof flyTo === 'function') flyTo(y); else window.scrollTo({top:y, behavior:'smooth'});
  }

  window.__hwLock = function(){
    if(hwDone || hwLockOff || !hwStartAt || reduce) return false;
    var sec = document.getElementById('message'); if(!sec) return false;
    var r = sec.getBoundingClientRect();
    if(!(r.top <= vh() * .75 && r.bottom >= vh() * .5)) return false;
    if(now() - hwStartAt > hwDur + 2600){ hwLockOff = true; return false; }
    return true;
  };
  function hwWatch(){
    if(hwDoneT || hwDone) return;
    var cap = 0;
    hwDoneT = setInterval(function(){
      if(hwDone || hwCheck()){ clearInterval(hwDoneT); hwDoneT = 0; hwLockOff = true; window.__hwDone = true; pinUpdate(); if(window.__tailUpdate) window.__tailUpdate(); return; }
      if(++cap > 900){ clearInterval(hwDoneT); hwDoneT = 0; }
    }, 200);
  }
  function now(){ return window.performance && performance.now ? performance.now() : Date.now(); }
  function pinUpdate(){

    var hwHold = false;
    if(!hwDone) hwCheck();
    if(hwPlayed && !hwDone){ var msec = document.getElementById('message');
      if(msec){ var mr = msec.getBoundingClientRect(), mt = mr.height - vh();
        hwHold = mt > 0 ? ((-mr.top) / mt) < .12 : true; } }
    var _vh = vh();
    pins.forEach(function(pin){
      var r = pin.getBoundingClientRect(); var total = r.height - _vh;
      var p = (-r.top) / total; p = Math.max(0, Math.min(1, p));

      var _vis = r.bottom > -1 && r.top < _vh + 1;

      if(!_vis && pin.__lastVis === false && pin.__lastP === p) return;
      pin.__lastP = p; pin.__lastVis = _vis;
      pin.querySelectorAll('[data-at]').forEach(function(el){ var at = parseFloat(el.getAttribute('data-at')), off = el.getAttribute('data-off');

        var on = (p >= at) && (off === null || p < parseFloat(off));
        if(hwHold && el.getAttribute('data-athw') !== null) on = false;
        el.classList.toggle('in', on); el.classList.toggle('on', on); });
      var imgs = pin.querySelectorAll('.bgph img');
      if(imgs.length){ var idx = Math.min(imgs.length-1, Math.floor(p * imgs.length * .999)); imgs.forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.spot img').forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.bgdot i').forEach(function(d,i){ d.classList.toggle('on', i === idx); }); }
      if(r.top <= 0 && r.bottom >= vh()){ pin.querySelectorAll('.marg').forEach(function(m){ m.classList.add('in'); }); }
      var st = pin.querySelector('.stick'); if(st){ st.style.setProperty('--pp', p.toFixed(3)); if(pin.id === 'ch1pin'){ st.classList.toggle('ringdone', p * 1.9 >= 1); st.classList.toggle('drawing', p * 1.9 > .012); st.classList.toggle('walk', p * 3.4 >= 1);       dgOn = p * 3.4 >= 1 && r.top < vh() && r.bottom > 0; dgP = total > 0 ? (-r.top) / total : 0; dgLeave = p >= (window.__DGT || .86);

        fpFade = Math.max(0, Math.min(1, p / .16)); } if(pin.id === 'ch5map') mapUpdate(p); }
      if(pin.id === 'ch5pin'){ pin.classList.toggle('dotson', r.top <= 0 && r.bottom >= vh()); pin.style.setProperty('--pp', p.toFixed(3)); if(!fine){ pin.style.setProperty('--sx', (30 + p * 40).toFixed(1) + '%'); pin.style.setProperty('--sy', '52%'); } }
      if(pin.id === 'message'){
        var vis = r.top < vh()*.6 && r.bottom > vh()*.4;
        if(vis && !hwPlayed){ hwPlayed = true; hw.classList.add('on');  if(hwv && hwv.dataset && hwv.dataset.src){ hwv.src = hwv.dataset.src; hwv.removeAttribute('data-src'); }

          hwCountdown(); hwWatch(); }

        var ms = document.getElementById('msgstick'); ms.classList.toggle('dim', p >= .10 && !hwHold);
        ms.classList.toggle('hold', r.top <= 0 && r.bottom >= vh());
        var wasDone = ms.classList.contains('mdone'), nowDone = r.bottom < vh();
        if(nowDone !== wasDone){ ms.classList.toggle('mdone', nowDone);
          if(nowDone){ var mh = ms.querySelector('.mh3'), op = (mh && mh.offsetParent) || ms, orr = op.getBoundingClientRect();
            ms.style.setProperty('--mcx', (window.innerWidth / 2 - orr.left).toFixed(1) + 'px'); ms.style.setProperty('--mcy', (window.innerHeight / 2 - orr.top).toFixed(1) + 'px'); } }

        var mfs = window.__mFps;
        if(mfs && mfs.length){

          ms.classList.toggle('mwalkon', p >= .858);

          var mt = Math.max(0, Math.min(1, (p - .93) / .07)), mn = Math.max(1, mfs.length - 1);
          for(var mi = 0; mi < mfs.length; mi++){
            var mf = 1 - Math.max(0, Math.min(1, (mt * 1.5 - mi / mn) / .5));
            mfs[mi].style.setProperty('--fade', mf.toFixed(3));
            if(mfs[mi].classList.contains('off')) mfs[mi].classList.remove('off');
          }
        }
        ms.classList.toggle('mtail', p >= .90);
        hwStill(p >= .10 && !hwHold);
        if(!msgFitDone) msgSoloFit(); ms.classList.toggle('solo', p < .27);
        var s2 = p >= .50 && p < .66;
        if(s2 && !ms.classList.contains('solo2')) msgSoloFit();
        ms.classList.toggle('solo2', s2);
        ms.classList.toggle('away2', p >= .66);
        pin.classList.toggle('gridon', p >= .50);
        if(p >= .573){ if(!pin.__gt) pin.__gt = setTimeout(function(){ pin.classList.add('gridgone'); }, 5600); }
        else { if(pin.__gt){ clearTimeout(pin.__gt); pin.__gt = 0; } pin.classList.remove('gridgone'); }
      }
    });
  }

  var msgFitDone = false;
  function msgSoloFit(){
    var st = document.getElementById('msgstick'); if(!st) return;
    var mhs = st.querySelectorAll('.mh'); if(!mhs.length) return;

    Array.prototype.forEach.call(mhs, function(mh){
      var x = 0, y = 0, el = mh; while(el && el !== st){ x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
      var W = st.clientWidth, H = st.clientHeight, tw = 0;
      mh.querySelectorAll(':scope > span').forEach(function(sp){ tw = Math.max(tw, sp.offsetWidth); }); if(!tw) tw = mh.offsetWidth;
      var ph = window.innerWidth <= 1024;
      var s = Math.max(1, Math.min(1.5, (W * (ph ? .97 : .71) - 16) / Math.max(1, tw)));
      mh.style.setProperty('--ss', s.toFixed(3)); mh.style.setProperty('--sdx', (W / 2 - (x + mh.offsetWidth / 2)).toFixed(1) + 'px');
      if(mh.classList.contains('mh2')){

        var y2 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--y2')) || 32, h2 = mh.offsetHeight;
        mh.style.setProperty('--sdy', (H * (y2 / 100 + .06) - y + h2 * (s - 1) / 2).toFixed(1) + 'px');
      } else {
        mh.style.setProperty('--sdy', (H * .5 - s * mh.offsetHeight / 2 - y).toFixed(1) + 'px');
      }
    });
    msgFitDone = true;
  }
  window.addEventListener('resize', function(){ msgFitDone = false; soloReset(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ msgFitDone = false; soloReset(); setTimeout(onScroll, 50); });

  var solos = Array.prototype.slice.call(document.querySelectorAll('.solopin'));
  function soloReset(){ solos.forEach(function(sp){ sp.__fit = false; }); }
  function soloFit(sp){
    var st = sp.querySelector('.stick'), sub = sp.querySelector('.sub'), sq = sp.querySelector('.sq'); if(!st || !sub) return;
    var W = window.innerWidth, H = vh(), sl = st.getBoundingClientRect().left;
    if(sq){ sq.style.marginLeft = ((W / 2 - sl) - sq.offsetWidth / 2).toFixed(1) + 'px'; }
    var x = 0, y = 0, el = sub; while(el && el !== st){ x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    var tw = sub.offsetWidth, h = sub.offsetHeight;
    var s = 1;
    sub.style.setProperty('--ss', s.toFixed(3)); sub.style.setProperty('--sdx', (W / 2 - (sl + x + tw / 2)).toFixed(1) + 'px'); sub.style.setProperty('--sdy', (H * .5 - s * h / 2 - y).toFixed(1) + 'px');
    sp.style.setProperty('--scx', (W / 2 - sl).toFixed(1) + 'px'); sp.style.setProperty('--sty', (H * .5 - s * h / 2).toFixed(1) + 'px'); sp.style.setProperty('--sby', (H * .5 + s * h / 2).toFixed(1) + 'px');

    var seals = sp.querySelectorAll('.seals i');
    if(seals.length){
      var sw = seals[0].offsetWidth || Math.min(W * .21, H * .27), g = Math.min(W * .03, 40), scx = W / 2 - sl, sty = H * .5 - s * h / 2, sby = H * .5 + s * h / 2;
      var mgn = W * .04, step = sw * .5 + 14, y0 = Math.max(H * .1, (H - 4 * step) / 2);
      seals.forEach(function(it, i){
        var j = i % 4, rx = scx - (4 * sw + 3 * g) / 2 + j * (sw + g), ry = i < 4 ? sty - 24 - sw : sby + 24;
        var cx = (i < 4 ? mgn + sw / 4 : W - mgn - sw / 4) - sl, cy = y0 + (j + .5) * step;
        it.style.setProperty('--rx', rx.toFixed(1) + 'px'); it.style.setProperty('--ry', ry.toFixed(1) + 'px');
        it.style.setProperty('--sx', (cx - sw / 2).toFixed(1) + 'px'); it.style.setProperty('--sy', (cy - sw / 2).toFixed(1) + 'px');
      });
    }

    if(!(W > 200 && H > 200) || (seals.length && !seals[0].offsetWidth)) return;
    sp.__fit = true; sp.__fitW = W; sp.__fitH = H; sp.__fitN = seals.length;
  }
  function soloUpdate(){
    solos.forEach(function(sp){
      var r = sp.getBoundingClientRect(), total = Math.max(1, r.height - vh()), p = (-r.top) / total; p = Math.max(0, Math.min(1, p)); if(reduce) p = 1;
      if(!sp.__fit || sp.__fitW !== window.innerWidth || sp.__fitH !== vh() || sp.__fitN !== sp.querySelectorAll('.seals i').length) soloFit(sp);
      var soloAt = parseFloat(sp.getAttribute('data-solo')); if(isNaN(soloAt)) soloAt = .5;
      sp.classList.toggle('solo', p < soloAt);
      sp.querySelectorAll('[data-at]').forEach(function(el){

        var at = parseFloat(el.getAttribute('data-at')), was = el.classList.contains('on');
        var on = was ? p >= at - .035 : p >= at;
        el.classList.toggle('in', on); el.classList.toggle('on', on);
      });
      var fx = sp.getAttribute('data-fx');
      if(fx === 'scramble' && sp.__chs){

        var resAt = parseFloat(sp.getAttribute('data-res')); if(isNaN(resAt)) resAt = .4;
        var n = sp.__chs.length, res = (reduce || p >= resAt) ? n : Math.floor(p / resAt * n), H = vh(), st = sp.querySelector('.stick'), stTop = st ? st.getBoundingClientRect().top : r.top;
        var q = Math.max(0, Math.min(1, (H - r.top) / (H * .7))), leave = Math.max(0, Math.min(1, -stTop / (H * .45))), vis = r.top < H && r.bottom > 0 && q > 0 && leave < 1;
        if(res !== sp.__res){ sp.__res = res; scrambleSet(sp, res); }
        sp.__cq = q * (1 - leave) * (res >= n ? .75 : 1);
        sp.classList.toggle('coding', vis);
        if(vis && !sp.__tick) sp.__tick = setInterval(function(){ if(sp.__res < n) scrambleSet(sp, sp.__res); codeDraw(sp, sp.__res, n); }, 90);
        if(!vis && sp.__tick){ clearInterval(sp.__tick); sp.__tick = 0; scrambleSet(sp, sp.__res); }
      }
      if(fx === 'seals'){
        var s0 = parseFloat(sp.getAttribute('data-seal0')); if(isNaN(s0)) s0 = .22;
        var sstep = parseFloat(sp.getAttribute('data-sealstep')); if(isNaN(sstep)) sstep = .03;
        sp.querySelectorAll('.seals i').forEach(function(it, i){ it.classList.toggle('in', reduce || p >= s0 + i * sstep); }); }
    });
  }

  var CODE_KW = ['const', 'let', 'function', 'return', 'if', 'else', 'for', 'of', '=>', 'await', 'import', 'export', 'new', 'class', 'this', 'null', 'true', 'false', 'while', 'try', 'catch'];
  var CODE_ID = ['grid', 'line', 'margin', 'x1', 'x2', 'x3', 'x4', 'y1', 'y2', 'y3', 'stamp', 'seal', 'footprint', 'choice', 'options', 'design', 'delight', 'counter', 'reason', 'ratio', 'mass', 'void', 'density', 'shift', 'textbook', 'copy', 'draw', 'measure', 'mean', 'ink', 'paper', 'shu', 'ai', 'me', 'decide', 'pick', 'why', 'shape', 'kern', 'palt', 'baseline', 'scroll', 'reveal', 'layer', 'node', 'model', 'prompt', 'sample', 'score', 'weight', 'token'];
  var CODE_SYM = ['(', ')', '{', '}', '[', ']', ';', ',', '.', ':', '=', '+', '-', '*', '/', '<', '>', '&&', '||', '!', '?', '===', '!=', '+=', '...'];
  function codeLine(){
    var n = 3 + Math.floor(Math.random() * 9), out = [], ind = Math.random() < .55 ? '        '.slice(0, 2 * Math.floor(Math.random() * 4)) : '';
    for(var i = 0; i < n; i++){ var r = Math.random(); out.push(r < .22 ? CODE_KW[Math.floor(Math.random() * CODE_KW.length)] : r < .62 ? CODE_ID[Math.floor(Math.random() * CODE_ID.length)] : r < .8 ? CODE_SYM[Math.floor(Math.random() * CODE_SYM.length)] : r < .9 ? (Math.random() * 100).toFixed(Math.random() < .5 ? 0 : 1) : '"' + CODE_ID[Math.floor(Math.random() * CODE_ID.length)] + '"'); }
    return ind + out.join(Math.random() < .3 ? '' : ' ');
  }
  function codeDraw(sp, res, n){
    var cv = sp.__code; if(!cv){ cv = document.createElement('canvas'); cv.className = 'codebg'; cv.setAttribute('aria-hidden', 'true'); var st = sp.querySelector('.stick'); if(!st) return; st.appendChild(cv); sp.__code = cv; sp.__lines = []; }
    var W = window.innerWidth, H = vh(), dpr = Math.min(2, window.devicePixelRatio || 1);
    if(cv.__w !== W || cv.__h !== H){ cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px'; cv.__w = W; cv.__h = H; sp.__lines = []; }
    var ctx = cv.getContext('2d'); if(!ctx) return;
    var lh = 20, rows = Math.ceil(H / lh) + 1, cols = W > 980 ? 2 : 1, colW = W / cols, total = rows * cols, lines = sp.__lines;
    while(lines.length < total) lines.push(codeLine());
    for(var k = 0; k < Math.max(2, Math.round(total * .1)); k++) lines[Math.floor(Math.random() * total)] = codeLine();
    var sty = parseFloat(sp.style.getPropertyValue('--sty')) || H * .4, sby = parseFloat(sp.style.getPropertyValue('--sby')) || H * .6;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.font = '12px ' + (getComputedStyle(document.body).getPropertyValue('--mono') || 'monospace'); ctx.fillStyle = getComputedStyle(document.body).color; ctx.textBaseline = 'top';
    var fade = sp.__cq === undefined ? 1 : sp.__cq;
    for(var i = 0; i < rows; i++){ var y = i * lh + 8; ctx.globalAlpha = (y > sty - 34 && y < sby + 22 ? .08 : .3) * fade; for(var c = 0; c < cols; c++){ ctx.textAlign = c ? 'right' : 'left'; ctx.fillText(lines[i * cols + c], c ? W - 24 : 24, y); } }
    ctx.globalAlpha = 1;
  }
  var SCR_KJ = '選択案形色線余白判図手目場人道具構成次世界理由決', SCR_KN = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンツクルジブンセカイデザイン', SCR_LA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', SCR_la = 'abcdefghijklmnopqrstuvwxyz';
  function scrGlyph(c){ var t = c.__t, pool = /[\u4E00-\u9FFF]/.test(t) ? SCR_KJ : /[\u3040-\u30FF]/.test(t) ? SCR_KN : /[A-Z]/.test(t) ? SCR_LA : /[a-z]/.test(t) ? SCR_la : ''; return pool ? pool.charAt(Math.floor(Math.random() * pool.length)) : t; }
  function scrambleSet(sp, res){ sp.__chs.forEach(function(c, i){ if(i < res){ if(c.textContent !== c.__t) c.textContent = c.__t; c.classList.remove('alt'); } else { c.textContent = scrGlyph(c); c.classList.add('alt'); } }); }

  function soloSealsBuild(){
    document.querySelectorAll('.solopin[data-fx="seals"] .seals').forEach(function(box){
      var up = box.querySelector('.up'), dn = box.querySelector('.dn'); if(!up || !dn) return;
      while(up.firstChild) up.removeChild(up.firstChild); while(dn.firstChild) dn.removeChild(dn.firstChild);
      var ai = document.createElement('li'); ai.setAttribute('data-en', 'MAKE WITH AI'); ai.setAttribute('data-place', 'AI'); ai.setAttribute('data-year', '2026'); ai.setAttribute('data-ring', 'MAKE WITH AI \u00b7 THE CHOICE IS MINE \u00b7 2026 \u00b7 KOSAKA');
      var items = srItems.slice(0, 7).concat([ai]);
      items.forEach(function(li, i){ var it = document.createElement('i'); it.style.setProperty('--rot', (((i % 3) - 1) * 6 - 2) + 'deg'); it.appendChild(stampSvg(li, i)); (i < 4 ? up : dn).appendChild(it); });
    });
    soloReset();
  }

  var wipes = Array.prototype.slice.call(document.querySelectorAll('.wipe'));
  function wipeUpdate(){
    var start = vh()*.85, end = vh()*.3;
    if(window.innerWidth <= 1024){ start = vh()*.95; end = vh()*.62; }
    wipes.forEach(function(wipe){
      var ja = wipe.querySelector('.ja'); if(!ja) return;
      var r = wipe.getBoundingClientRect(), p = (start - r.top) / (start - end); p = Math.max(0, Math.min(1, p)); if(reduce) p = 1;
      ja.style.clipPath = 'inset(0 ' + ((1-p)*100).toFixed(1) + '% 0 0)';
    });
  }

  var STEPS = 8, seq = document.getElementById('seq'), items = document.querySelectorAll('#seqlist li'), dot = document.getElementById('seqdot'), hint = document.getElementById('seqhint'), lastStep = -1;
  function seqUpdate(){
    var r = seq.getBoundingClientRect(); var total = r.height - vh();
    var p = (-r.top) / total; p = Math.max(0, Math.min(1, p));
    var step = Math.min(STEPS, Math.max(1, Math.floor(p * STEPS) + 1));
    if(r.top > vh()) step = 0;
    body.classList.toggle('inseq', r.top <= vh()*.3 && r.bottom >= vh()*.7);
    if(step !== lastStep){
      seq.classList.toggle('back', step < lastStep);
      lastStep = step;
      for(var k=1;k<=STEPS;k++) seq.classList.toggle('s'+k, step >= k);
      var prevLi = seq.querySelector('#seqlist li.act');
      items.forEach(function(li,i){ li.classList.toggle('act', i === step-1); li.classList.toggle('done', i < step-1); });
      if(step >= 1){ seqDot(items[step-1], prevLi); setTimeout(function(){ if(lastStep === step) seqDot(items[step-1]); }, 650); hint.textContent = 'SCROLL · 0' + step + ' / 0' + STEPS; }
      if(step === 5) countUp(); else if(step < 5) seq.querySelectorAll('text.pct[data-v]').forEach(function(t){ t.textContent = '0'; }); else seq.querySelectorAll('text.pct[data-v]').forEach(function(t){ t.textContent = t.getAttribute('data-v'); });
    }
  }

  function seqDot(li, prev){
    var st = li.querySelector('strong'); if(!st) return;
    var top = li.offsetTop, big = 26 * 1.4, small = 18 * 1.4;
    if(prev && prev !== li && (prev.compareDocumentPosition(li) & Node.DOCUMENT_POSITION_FOLLOWING)){

      var sp = prev.querySelector('span'), ps = prev.querySelector('strong');
      top -= (sp ? sp.offsetHeight + 8 : 0) + (ps ? Math.max(0, ps.offsetHeight - small) : 0);
    }
    var h = prev === undefined ? st.offsetHeight : big;
    dot.style.top = (top + st.offsetTop + h / 2 - dot.offsetHeight / 2) + 'px';
  }
  var counting = null;
  function countUp(){
    var ts = Array.prototype.slice.call(seq.querySelectorAll('text.pct[data-v]')), t0 = performance.now();
    if(counting) cancelAnimationFrame(counting);
    (function tick(){
      var t = performance.now() - t0, done = true;
      ts.forEach(function(el, i){ var v = parseInt(el.getAttribute('data-v'), 10), k = Math.min(1, Math.max(0, (t - i * 60) / 700)); k = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(v * k); if(k < 1) done = false; });
      if(!done) counting = requestAnimationFrame(tick);
    })();
  }
  function goStep(n, jump){
    var r = seq.getBoundingClientRect(), total = r.height - vh();
    var y = window.scrollY + r.top + total * ((n - 1) / STEPS + .5 / STEPS);

    window.scrollTo({top: Math.round(y), behavior: (jump || reduce) ? 'auto' : 'smooth'});
  }
  window.__goStep = goStep;

  function seqScale(){
    var svg = seq.querySelector('.fig svg'); if(!svg) return;
    var m = svg.getScreenCTM && svg.getScreenCTM(), s = 0;
    if(m && m.a) s = Math.abs(m.a);
    if(!s){ var r = svg.getBoundingClientRect(); s = Math.min(r.width / 1000, r.height / 620); }
    if(!(s > 0) || !isFinite(s)) return;
    seq.style.setProperty('--sc', s.toFixed(3)); seq.style.setProperty('--sc4', (s * 4).toFixed(3));
  }
  seqScale(); window.addEventListener('resize', seqScale, {passive:true}); window.addEventListener('load', seqScale);

  items.forEach(function(li, i){ li.setAttribute('tabindex','0'); li.setAttribute('role','button'); li.addEventListener('click', function(){ goStep(i+1); }); li.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); goStep(i+1); } }); });

  var shown = false, annoLive = [], annoRaf = 0, annoT = 0;
  function annoClear(){
    clearTimeout(annoT); annoT = 0;
    if(annoRaf){ cancelAnimationFrame(annoRaf); annoRaf = 0; }
    annoLive.forEach(function(o){ o.el.classList.remove('on'); var el = o.el; setTimeout(function(){ el.remove(); }, 600); });
    annoLive = [];
  }
  function annoHere(){
    if(body.classList.contains('opening') || document.getElementById('ld')) return false;
    var s = document.getElementById('ch4'); if(!s) return false; var r = s.getBoundingClientRect(), H = vh(); return r.top < H * .65 && r.bottom > H * .35;
  }

  function annoAt(el, mode){
    var r = el.getBoundingClientRect();
    if(mode === 'line') return {x: r.left + 4, y: r.top + Math.min(20, r.height / 2)};
    if(mode === 'corner') return {x: r.left + r.width / 2, y: r.top + 12};

    return {x: r.left + r.width / 2, y: r.top + r.height / 2};
  }

  var gridTemp = 0;
  function gridFlash(){
    var h = document.documentElement;
    if(h.classList.contains('grid') || gridTemp) return;
    h.classList.add('grid'); if(typeof togFit === 'function') togFit();
    gridTemp = setTimeout(function(){ gridTemp = 0; h.classList.remove('grid'); if(typeof togFit === 'function') togFit(); }, 5200);
  }
  window.__annoSync = function(){ if(annoLive.length && !annoFollow.pending){ annoFollow.pending = true; cancelAnimationFrame(annoRaf); annoFollow(); } };
  function annoFollow(){
    annoFollow.pending = false;
    if(!annoHere()){ annoClear(); return; }
    var H = vh(), W = window.innerWidth;
    annoLive.forEach(function(o){
      var r = o.t.getBoundingClientRect(), p = annoAt(o.t, o.m);
      o.el.style.left = Math.round(p.x) + 'px'; o.el.style.top = Math.round(p.y) + 'px';
      if(o.m === 'centre' || o.m === 'far') o.el.classList.toggle('lft', p.x > W * .55);
      o.el.classList.toggle('gone', r.bottom < 8 || r.top > H - 8 || p.y < 26 || p.y > H - 14);
    });
    annoRaf = requestAnimationFrame(annoFollow);
  }
  function annotate(){
    if(window.innerWidth < 768 || !annoHere()) return false;
    annoClear();

    var H = vh();
    function seen(el){ if(!el) return null; var r = el.getBoundingClientRect(); return (r.width && r.top > 64 && r.bottom < H - 24) ? el : null; }
    function pick(list){ for(var i = 0; i < list.length; i++){ var el = seen(typeof list[i] === 'string' ? document.querySelector(list[i]) : list[i]); if(el) return el; } return null; }
    var trigNow = document.getElementById('annot-trigger'), trigP = trigNow ? (trigNow.closest('p') || trigNow) : null, mid = H / 2;
    var figs = Array.prototype.slice.call(document.querySelectorAll('#ch4 .marg img, #ch4 figure img')).filter(seen)
      .sort(function(a, b){ var d = function(e){ var r = e.getBoundingClientRect(); return Math.abs(r.top + r.height / 2 - mid); }; return d(a) - d(b); });
    var targets = [
      [document.querySelector('.brand img'), 'ロゴ「小」 朱 #E84518', 'far'],
      [pick(['#ch4 .ttl', '#ch4 .sub', '#ch4 h3']), 'Zen Old Mincho 700 · 見出し · X1', 'line'],
      [pick([trigP, '#ch4 .body p']), '本文 17px · 行間 2.05 · X2', 'line'],
      [document.getElementById('od'), 'IBM Plex Mono · 副次要素 X4', 'centre'],
      [figs[0] || null, '図版 · 副次要素の欄', 'corner']
    ];
    targets.forEach(function(t, i){
      if(!t[0]) return; var r = t[0].getBoundingClientRect(); if(r.bottom < 0 || r.top > vh()) return;

      var a = document.createElement('div'); a.className = 'anno';
      a.appendChild(document.createElement('i'));
      var tx = document.createElement('span'); tx.textContent = t[1]; a.appendChild(tx);
      var p = annoAt(t[0], t[2]);
      a.style.left = p.x.toFixed(1) + 'px'; a.style.top = p.y.toFixed(1) + 'px';
      if(t[2] === 'centre' || t[2] === 'far'){ if(p.x > window.innerWidth * .55) a.classList.add('lft'); if(t[2] === 'far') a.classList.add('far'); }
      else a.classList.add('up');
      body.appendChild(a); annoLive.push({el:a, t:t[0], m:t[2]}); setTimeout(function(){ a.classList.add('on'); }, 120 + i*160);
    });
    if(!annoLive.length) return false;
    gridFlash();
    annoRaf = requestAnimationFrame(annoFollow);
    annoT = setTimeout(annoClear, 7000);
    return true;
  }

  var annoIO = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting && !shown) setTimeout(function(){ if(!shown && annotate()) shown = true; }, 240); });
  }, {threshold:0, rootMargin:'-25% 0px -25% 0px'});

  window.__armAnnot = function(){ if(shown) return; var t = document.getElementById('annot-trigger'); if(t && t !== annoIO.__t){ annoIO.disconnect(); annoIO.observe(t); annoIO.__t = t; } };
  window.__armAnnot();
  var again = document.getElementById('annot-again'); if(again) again.addEventListener('click', annotate);

  var wk = document.getElementById('wk'), tiles = wk ? Array.prototype.slice.call(wk.querySelectorAll('a:not(.wkf)')) : [];
  function swapTiles(){
    if(reduce || tiles.length < 2) return; var r = wk.getBoundingClientRect(); if(r.bottom < 0 || r.top > vh()) return;
    var a = tiles[Math.floor(Math.random()*tiles.length)], b = tiles[Math.floor(Math.random()*tiles.length)]; if(a === b) return;
    a.classList.add('pop'); b.classList.add('pop');
    setTimeout(function(){
      var ka = ['data-t','data-y','data-x','data-h'].map(function(k){ return a.getAttribute(k); });
      ['data-t','data-y','data-x','data-h'].forEach(function(k,i){ a.setAttribute(k, b.getAttribute(k)); b.setAttribute(k, ka[i]); });
      [a,b].forEach(function(t){ t.querySelector('em').textContent = t.getAttribute('data-t'); t.querySelector('span').textContent = t.getAttribute('data-y'); t.querySelector('i.v').style.left = t.getAttribute('data-x')+'%'; t.querySelector('i.h').style.top = t.getAttribute('data-h')+'%'; });
      a.classList.remove('pop'); b.classList.remove('pop');
    }, 380);
  }
  setInterval(swapTiles, 2100);

  var lb = document.getElementById('lb'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.cap'), lbX = lb.querySelector('.x'), lbOpen = false, lbFrom = null;
  function openLb(fig){
    var img = fig.querySelector('img'); var r = img.getBoundingClientRect(); lbFrom = r;
    lbImg.src = fig.getAttribute('data-full') || img.src; lbCap.textContent = (fig.querySelector('figcaption')||{}).textContent || '';
    var nw = img.naturalWidth || r.width, nh = img.naturalHeight || r.height, ratio = nw/nh;
    var W = window.innerWidth, H = vh(); var tw = Math.min(W*.82, (H*.82)*ratio), th = tw/ratio;
    var tx = (W - tw)/2, ty = (H - th)/2;
    lbImg.style.width = tw + 'px'; lbImg.style.height = th + 'px';
    lbImg.style.transition = 'none';
    lbImg.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px) scale(' + (r.width/tw) + ',' + (r.height/th) + ')';
    lb.classList.add('open'); lbOpen = true;
    if(typeof annoClear === 'function') annoClear();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      lbImg.style.transition = 'transform .65s cubic-bezier(.2,.7,.2,1)';
      lbImg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(1,1)';
      lb.classList.add('show');
    }); });
  }
  function closeLb(){
    if(!lbOpen) return; lbOpen = false;
    var r = lbFrom; var tw = parseFloat(lbImg.style.width), th = parseFloat(lbImg.style.height);
    lb.classList.remove('show');
    lbImg.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px) scale(' + (r.width/tw) + ',' + (r.height/th) + ')';
    setTimeout(function(){ lb.classList.remove('open'); }, 500);
  }
  document.querySelectorAll('.marg figure').forEach(function(f){ f.addEventListener('click', function(){ openLb(f); }); f.setAttribute('tabindex','0'); f.addEventListener('keydown', function(e){ if(e.key === 'Enter') openLb(f); }); });
  lb.addEventListener('click', closeLb); lbX.addEventListener('click', closeLb);
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });

  var ticking = false;

  var sr = document.getElementById('sr'), srItems = [], srAt = [], srL = 0, srProg = null, srHead = null, srSvg = null, srn = document.getElementById('srn'), srdone = document.getElementById('srdone');
  function svgEl(n, at){ var e = document.createElementNS('http://www.w3.org/2000/svg', n); for(var k in at) e.setAttribute(k, at[k]); return e; }

  var inkmN = 0;
  function inkSealTex(){
    if(!document.documentElement.classList.contains('is-webkit')) return;
    var probe = document.querySelector('.chseal, #mseals .st, .sr .st'); if(!probe) return;
    var cs = getComputedStyle(probe), mi = cs.maskImage || cs.webkitMaskImage || '';
    var mm = mi.match(/url\(["']?([^"')]+)["']?\)/); if(!mm) return;
    var url = mm[1];

    if(!inkSealTex.img || inkSealTex.img.src !== url){
      var im0 = new Image(); im0.onload = function(){ inkSealTex.ready = true; inkSealTex(); }; im0.src = url; inkSealTex.img = im0; inkSealTex.ready = im0.complete && im0.naturalWidth > 0;
    }
    if(!inkSealTex.ready) return;
    var tex = inkSealTex.img, N = tex.naturalWidth || 96, dpr = Math.min(2, window.devicePixelRatio || 1);

    var targets = [];
    document.querySelectorAll('#mpsvg .seal').forEach(function(g){ targets.push(g); });
    document.querySelectorAll('.oval .seal').forEach(function(g){
      g.querySelectorAll('path').forEach(function(q){ targets.push(q); });
      g.querySelectorAll('text').forEach(function(q){ q.setAttribute('data-sealsoft', '1'); targets.push(q); });
      if(g.getAttribute('data-sealtex')){ g.removeAttribute('data-sealtex'); g.removeAttribute('filter'); }
    });
    targets.forEach(function(g, gi){
      var svg = g.ownerSVGElement; if(!svg) return;
      var bb; try{ bb = g.getBBox(); }catch(e){ return; }
      if(!bb || !bb.width || !bb.height) return;

      var vb = svg.viewBox && svg.viewBox.baseVal, sr = svg.getBoundingClientRect();
      var sc = (vb && vb.width && sr.width) ? sr.width / vb.width : 1;
      var px = bb.width * .08, py = bb.height * .08;
      var rx = bb.x - px, ry = bb.y - py, rw = bb.width + px * 2, rh = bb.height + py * 2;
      var W = Math.min(2048, Math.ceil(rw * sc * dpr)), H = Math.min(2048, Math.ceil(rh * sc * dpr));
      if(W < 2 || H < 2) return;
      var key = W + 'x' + H + ':' + N;
      var id = g.getAttribute('data-sealtex');
      var defs = svg.querySelector('defs');
      if(!defs){ defs = svgEl('defs', {}); svg.insertBefore(defs, svg.firstChild); }
      if(!id){
        id = 'sealtex' + (++inkmN); g.setAttribute('data-sealtex', id);
        var f = svgEl('filter', {id:id, x:'-12%', y:'-12%', width:'124%', height:'124%'});
        var im = svgEl('feImage', {preserveAspectRatio:'none', result:'i'});
        f.appendChild(im);
        if(g.getAttribute('data-sealsoft')){
          var ct = svgEl('feComponentTransfer', {'in':'i', result:'s'});
          ct.appendChild(svgEl('feFuncA', {type:'linear', slope:'.42', intercept:'.58'}));
          f.appendChild(ct);
          f.appendChild(svgEl('feComposite', {'in':'SourceGraphic', in2:'s', operator:'in'}));
        } else {
          f.appendChild(svgEl('feComposite', {'in':'SourceGraphic', in2:'i', operator:'in'}));
        }
        defs.appendChild(f);
      }
      var im2 = svg.querySelector('filter[id="' + id + '"] feImage');
      if(im2){
        if(im2.getAttribute('data-key') !== key){
          var c = document.createElement('canvas'); c.width = W; c.height = H;
          var ctx = c.getContext('2d'), k = 96 * dpr / N;
          ctx.scale(k, k);
          var pat = ctx.createPattern(tex, 'repeat');
          if(pat){
            var ox = (gi * 37) % 96 / k, oy = (gi * 53) % 96 / k;
            ctx.translate(-ox, -oy); ctx.fillStyle = pat; ctx.fillRect(0, 0, W / k + ox + 1, H / k + oy + 1);
          }
          var du = c.toDataURL('image/png');
          im2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', du); im2.setAttribute('href', du); im2.setAttribute('data-key', key);
        }
        im2.setAttribute('x', rx.toFixed(1)); im2.setAttribute('y', ry.toFixed(1)); im2.setAttribute('width', rw.toFixed(1)); im2.setAttribute('height', rh.toFixed(1));
      }
      if(g.getAttribute('mask')) g.removeAttribute('mask');

      if(g.getAttribute('filter') !== 'url(#' + id + ')') g.setAttribute('filter', 'url(#' + id + ')');
    });
  }

  function mapSealRaster(){
    if(!document.documentElement.classList.contains('is-webkit')) return;
    var host = document.getElementById('mpseals'); if(!host) return;
    if(!inkSealTex.ready){ clearTimeout(mapSealRaster.t); mapSealRaster.t = setTimeout(mapSealRaster, 150); return; }
    if(document.fonts && document.fonts.status !== 'loaded'){ document.fonts.ready.then(function(){ mapSealRaster(); }); return; }
    var tex = inkSealTex.img, N = tex.naturalWidth || 96, dpr = Math.min(2, window.devicePixelRatio || 1);
    var vb = host.viewBox && host.viewBox.baseVal, hr = host.getBoundingClientRect();
    var sc = (vb && vb.width && hr.width) ? hr.width / vb.width : 1; if(!hr.width) return;
    var cs = getComputedStyle(document.documentElement);
    var acc = (getComputedStyle(host).getPropertyValue('--acc') || cs.getPropertyValue('--acc') || '#FF6A3D').trim();
    var mono = (cs.getPropertyValue('--mono') || 'monospace').trim(), sans = (cs.getPropertyValue('--sans') || 'sans-serif').trim();
    host.querySelectorAll('g.seal').forEach(function(g){
      var sp = g.__spec; if(!sp) return;
      var r = sp.r, R = r * 1.14, S = Math.min(1024, Math.ceil(2 * R * sc * dpr)), key = S + ':' + acc + ':' + sp.center;
      var img = g.parentNode.querySelector('image.sealimg');
      if(img && img.getAttribute('data-key') === key) return;
      var c = document.createElement('canvas'); c.width = c.height = S;
      var x = c.getContext('2d'), k = S / (2 * R);
      x.scale(k, k); x.translate(R, R);
      x.strokeStyle = acc; x.fillStyle = acc; x.lineJoin = 'round';
      x.lineWidth = r * .045; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke();
      x.lineWidth = r * .02; x.beginPath(); x.arc(0, 0, r * .64, 0, Math.PI * 2); x.stroke();

      var fs = r * .13, ls = r * .028, rr = r * .8; x.font = '500 ' + fs + 'px ' + mono; x.textBaseline = 'alphabetic'; x.textAlign = 'left';
      var sdist = 2 * Math.PI * rr * .01, str = sp.ring || '';
      for(var i = 0; i < str.length; i++){
        var ch = str.charAt(i), w = x.measureText(ch).width, th = Math.PI + (sdist + w / 2) / rr;
        if(sdist + w > 2 * Math.PI * rr) break;
        x.save(); x.translate(rr * Math.cos(th), rr * Math.sin(th)); x.rotate(th + Math.PI / 2); x.fillText(ch, -w / 2, 0); x.restore();
        sdist += w + ls;
      }
      x.textAlign = 'center';
      x.font = '700 ' + (r * .3) + 'px ' + sans; x.fillText(sp.center || '', 0, sp.sub ? r * .04 : r * .12);
      if(sp.sub){ x.font = '400 ' + (r * .12) + 'px ' + mono; var sub = sp.sub, sw = 0, ls2 = r * .02, i2; for(i2 = 0; i2 < sub.length; i2++) sw += x.measureText(sub.charAt(i2)).width + ls2; sw -= ls2; var sx = -sw / 2; x.textAlign = 'left'; for(i2 = 0; i2 < sub.length; i2++){ x.fillText(sub.charAt(i2), sx, r * .34); sx += x.measureText(sub.charAt(i2)).width + ls2; } }

      x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'destination-in';
      var kk = 96 * dpr / N; x.scale(kk, kk); var pat = x.createPattern(tex, 'repeat');
      if(pat){ x.fillStyle = pat; x.fillRect(0, 0, S / kk + 1, S / kk + 1); }
      var du = c.toDataURL('image/png');
      if(!img){ img = svgEl('image', {class:'sealimg', preserveAspectRatio:'none'}); g.parentNode.insertBefore(img, g.nextSibling); }
      img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', du); img.setAttribute('href', du);
      img.setAttribute('x', (-R).toFixed(2)); img.setAttribute('y', (-R).toFixed(2)); img.setAttribute('width', (2 * R).toFixed(2)); img.setAttribute('height', (2 * R).toFixed(2)); img.setAttribute('data-key', key);
      g.classList.add('rastered'); g.removeAttribute('filter');
    });
  }

  function rasterSealGroup(g, svg, sc, dpr, tex, N, gi){
    var bb; try{ bb = g.getBBox(); }catch(e){ return null; }
    if(!bb || !bb.width || !bb.height) return null;
    var pad = Math.max(bb.width, bb.height) * .07, rx = bb.x - pad, ry = bb.y - pad, rw = bb.width + pad * 2, rh = bb.height + pad * 2;
    var W = Math.min(2048, Math.ceil(rw * sc * dpr)), H = Math.min(2048, Math.ceil(rh * sc * dpr)); if(W < 2 || H < 2) return null;
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var x = c.getContext('2d'), k = W / rw; x.scale(k, k); x.translate(-rx, -ry); x.lineJoin = 'round';
    function num(v, d){ v = parseFloat(v); return isNaN(v) ? d : v; }
    function paint(cs){ var f = cs.fill, st = cs.stroke; return {fill:(f && f !== 'none') ? f : null, stroke:(st && st !== 'none') ? st : null, lw:num(cs.strokeWidth, 1)}; }
    Array.prototype.forEach.call(g.querySelectorAll('rect, circle, text'), function(el){
      var cs = getComputedStyle(el), pt = paint(cs), tag = el.tagName.toLowerCase();
      if(cs.display === 'none' || num(cs.opacity, 1) === 0) return;
      x.globalAlpha = num(cs.opacity, 1);
      if(tag === 'rect'){
        var ex = num(el.getAttribute('x'), 0), ey = num(el.getAttribute('y'), 0), ew = num(el.getAttribute('width'), 0), eh = num(el.getAttribute('height'), 0), er = num(el.getAttribute('rx'), 0);
        x.beginPath(); if(x.roundRect) x.roundRect(ex, ey, ew, eh, er); else x.rect(ex, ey, ew, eh);
        if(pt.fill){ x.fillStyle = pt.fill; x.fill(); } if(pt.stroke){ x.strokeStyle = pt.stroke; x.lineWidth = pt.lw; x.stroke(); }
      } else if(tag === 'circle'){
        x.beginPath(); x.arc(num(el.getAttribute('cx'), 0), num(el.getAttribute('cy'), 0), num(el.getAttribute('r'), 0), 0, Math.PI * 2);
        if(pt.fill){ x.fillStyle = pt.fill; x.fill(); } if(pt.stroke){ x.strokeStyle = pt.stroke; x.lineWidth = pt.lw; x.stroke(); }
      } else {
        var fw = cs.fontWeight || '400', fs = num(cs.fontSize, 12), ff = cs.fontFamily || 'sans-serif', ls = cs.letterSpacing === 'normal' ? 0 : num(cs.letterSpacing, 0);
        x.font = fw + ' ' + fs + 'px ' + ff; x.fillStyle = pt.fill || '#000'; x.textBaseline = 'alphabetic';
        var tp = el.querySelector('textPath');
        if(tp){
          var href = tp.getAttribute('href') || tp.getAttributeNS('http://www.w3.org/1999/xlink', 'href'), path = href ? svg.querySelector(href) : null; if(!path || !path.getTotalLength) return;
          var L = path.getTotalLength(), so = tp.getAttribute('startOffset') || '0', d = /%$/.test(so) ? L * parseFloat(so) / 100 : num(so, 0), str = tp.textContent || '';
          x.textAlign = 'left';
          for(var i = 0; i < str.length; i++){
            var ch = str.charAt(i), w = x.measureText(ch).width; if(d + w > L) break;
            var p0 = path.getPointAtLength(d + w / 2), p1 = path.getPointAtLength(Math.min(L, d + w / 2 + .5)), p2 = path.getPointAtLength(Math.max(0, d + w / 2 - .5));
            var th = Math.atan2(p1.y - p2.y, p1.x - p2.x);
            x.save(); x.translate(p0.x, p0.y); x.rotate(th); x.fillText(ch, -w / 2, 0); x.restore();
            d += w + ls;
          }
        } else {
          var tx = num(el.getAttribute('x'), 0), ty = num(el.getAttribute('y'), 0), str2 = (el.textContent || '').replace(/\s+/g, ' ').trim(), an = cs.textAnchor || 'start';
          var wsum = 0, i2; for(i2 = 0; i2 < str2.length; i2++) wsum += x.measureText(str2.charAt(i2)).width + (i2 < str2.length - 1 ? ls : 0);
          var sx = an === 'middle' ? tx - wsum / 2 : an === 'end' ? tx - wsum : tx; x.textAlign = 'left';
          for(i2 = 0; i2 < str2.length; i2++){ x.fillText(str2.charAt(i2), sx, ty); sx += x.measureText(str2.charAt(i2)).width + ls; }
        }
      }
    });
    x.globalAlpha = 1;

    x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'destination-in';
    var kk = 96 * dpr / N; x.scale(kk, kk); var pat = x.createPattern(tex, 'repeat');
    if(pat){ var ox = ((gi || 0) * 37) % 96 / kk, oy = ((gi || 0) * 53) % 96 / kk; x.translate(-ox, -oy); x.fillStyle = pat; x.fillRect(0, 0, W / kk + ox + 1, H / kk + oy + 1); }
    return {url:c.toDataURL('image/png'), x:rx, y:ry, w:rw, h:rh};
  }
  function dgSealRaster(){
    if(!document.documentElement.classList.contains('is-webkit')) return;
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    if(!inkSealTex.ready){ clearTimeout(dgSealRaster.t); dgSealRaster.t = setTimeout(dgSealRaster, 150); return; }
    if(document.fonts && document.fonts.status !== 'loaded'){ document.fonts.ready.then(function(){ dgSealRaster(); }); return; }
    var tex = inkSealTex.img, N = tex.naturalWidth || 96, dpr = Math.min(2, window.devicePixelRatio || 1);
    var vb = svg.viewBox && svg.viewBox.baseVal, sr = svg.getBoundingClientRect(); if(!sr.width) return;
    var sc = (vb && vb.width) ? sr.width / vb.width : 1, key = Math.round(sc * dpr * 100);
    Array.prototype.forEach.call(svg.querySelectorAll('g.seal:not(.sealimg)'), function(g, gi){
      var wrap = g.nextElementSibling && g.nextElementSibling.classList.contains('sealimg') ? g.nextElementSibling : null;
      if(wrap && +wrap.getAttribute('data-key') === key) return;
      var wasHidden = g.classList.contains('rastered'); if(wasHidden) g.classList.remove('rastered');
      var had = g.getAttribute('filter'); if(had) g.removeAttribute('filter');
      var out = rasterSealGroup(g, svg, sc, dpr, tex, N, gi);
      if(!out){ if(wasHidden) g.classList.add('rastered'); return; }
      if(!wrap){ wrap = svgEl('g', {class:(g.getAttribute('class') || 'seal') + ' sealimg'}); var tr = g.getAttribute('transform'); if(tr) wrap.setAttribute('transform', tr); wrap.appendChild(svgEl('image', {preserveAspectRatio:'none'})); g.parentNode.insertBefore(wrap, g.nextSibling); }
      var im = wrap.querySelector('image');
      im.setAttributeNS('http://www.w3.org/1999/xlink', 'href', out.url); im.setAttribute('href', out.url);
      im.setAttribute('x', out.x.toFixed(2)); im.setAttribute('y', out.y.toFixed(2)); im.setAttribute('width', out.w.toFixed(2)); im.setAttribute('height', out.h.toFixed(2));
      wrap.setAttribute('data-key', key); g.classList.add('rastered');
    });
  }
  window.__dgSealRaster = dgSealRaster;
  window.addEventListener('load', function(){ setTimeout(dgSealRaster, 80); });
  window.addEventListener('resize', function(){ clearTimeout(dgSealRaster.rt); dgSealRaster.rt = setTimeout(dgSealRaster, 280); }, {passive:true});

  (function(){
    if(!('IntersectionObserver' in window)) { document.querySelectorAll('section[id]').forEach(function(sec){ sec.classList.add('inview'); }); return; }
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ e.target.classList.toggle('inview', e.isIntersecting); }); }, {rootMargin:'15% 0px 15% 0px', threshold:0});
    document.querySelectorAll('section[id]').forEach(function(sec){ io.observe(sec); });
  })();
  window.__mapSealRaster = mapSealRaster;
  window.addEventListener('load', function(){ setTimeout(mapSealRaster, 60); });
  window.addEventListener('resize', function(){ clearTimeout(mapSealRaster.rt); mapSealRaster.rt = setTimeout(mapSealRaster, 260); }, {passive:true});
  window.__inkSealTex = inkSealTex;
  window.addEventListener('load', inkSealTex);
  var inkmT; window.addEventListener('resize', function(){ clearTimeout(inkmT); inkmT = setTimeout(inkSealTex, 200); }, {passive:true});
  setTimeout(inkSealTex, 0);
  function stampSvg(li, idx){
    var en = li.getAttribute('data-en') || '', placeJa = li.getAttribute('data-place') || '', place = ((curLang === 'en' && PLACE_EN[placeJa]) ? PLACE_EN[placeJa] : placeJa).split('|'), num = ('0' + (idx + 1)).slice(-2), year = li.getAttribute('data-year') || ((li.querySelector('.y') || {}).textContent || '');
    year = year.replace('?', '');
    stampSvg.n = (stampSvg.n || 0) + 1; var uid = stampSvg.n, id = 'ink' + uid;
    var sv = svgEl('svg', {viewBox:'0 0 156 156'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%">' +
      '<feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + (idx * 7 + 3) + '" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (idx * 11 + 5) + '" result="g"/>' +
      '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/>' +
      '<feComposite in="d" in2="ga" operator="in"/></filter>' +
      '<path id="ring' + uid + '" d="M 78 78 m -57 0 a 57 57 0 1 1 114 0 a 57 57 0 1 1 -114 0"/></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)">' +
      '<circle cx="78" cy="78" r="70" stroke-width="3.4"/><circle cx="78" cy="78" r="46" stroke-width="1.4"/>' +
      '<text class="ring" font-family="var(--mono)" font-size="9.6" font-weight="500" letter-spacing="2" fill="var(--acc)" stroke="none"><textPath href="#ring' + uid + '" startOffset="1%">' + (li.getAttribute('data-ring') || ('CHECKPOINT ' + num + ' \u00b7 ' + en + ' \u00b7 ' + year + ' \u00b7 KOSAKA')) + '</textPath></text>' +
      (place.length > 1 ?
        '<text class="place" x="78" y="72" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (curLang === 'en' ? 14 : 17) + '" fill="var(--acc)" stroke="none">' + place[0] + '</text><text class="place" x="78" y="92" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (curLang === 'en' ? 14 : 17) + '" fill="var(--acc)" stroke="none">' + place[1] + '</text>' :
        '<text class="place" x="78" y="87" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (curLang === 'en' ? (place[0].length > 6 ? 15 : 19) : (place[0].length > 3 ? 20 : 26)) + '" fill="var(--acc)" stroke="none">' + place[0] + '</text>') +
      '</g>';
    return sv;
  }

  function stampG(r, ring, center, sub, seed){
    var g = svgEl('g', {class:'seal'}), id = 'sealf' + seed;
    g.__spec = {r:r, ring:ring, center:center, sub:sub};
    g.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (seed + 7) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter>' +
      '<path id="ringp' + seed + '" d="M 0 0 m ' + (-r * .8) + ' 0 a ' + (r * .8) + ' ' + (r * .8) + ' 0 1 1 ' + (r * 1.6) + ' 0 a ' + (r * .8) + ' ' + (r * .8) + ' 0 1 1 ' + (-r * 1.6) + ' 0"/></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)"><circle r="' + r + '" stroke-width="' + (r * .045) + '"/><circle r="' + (r * .64) + '" stroke-width="' + (r * .02) + '"/>' +
      '<text font-family="var(--mono)" font-size="' + (r * .13) + '" font-weight="500" letter-spacing="' + (r * .028) + '" fill="var(--acc)" stroke="none"><textPath href="#ringp' + seed + '" startOffset="1%">' + ring + '</textPath></text>' +
      '<text y="' + (sub ? r * .04 : r * .12) + '" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (r * .3) + '" fill="var(--acc)" stroke="none">' + center + '</text>' +
      (sub ? '<text y="' + (r * .34) + '" text-anchor="middle" font-family="var(--mono)" font-size="' + (r * .12) + '" letter-spacing="' + (r * .02) + '" fill="var(--acc)" stroke="none">' + sub + '</text>' : '') + '</g>';
    return g;
  }

  var mp = document.querySelector('#ch5map .mp'), mpProg = document.getElementById('mpprog'), mpPlane = document.getElementById('mpplane'), mpStops = document.querySelectorAll('#mpsvg .stop'), mpL = 0, mpStopAt = [], mpSeals = [];
  if(mp && mpProg){
    mpL = mpProg.getTotalLength();

    mpStopAt = Array.prototype.map.call(mpStops, function(st){ var c = st.querySelector('circle'), cx = +c.getAttribute('cx'), cy = +c.getAttribute('cy'), best = 0, bd = 1e9; for(var l = 0; l <= mpL; l += 4){ var q = mpProg.getPointAtLength(l), d = (q.x - cx) * (q.x - cx) + (q.y - cy) * (q.y - cy); if(d < bd){ bd = d; best = l; } } return best; });
    window.__mapStamp = function(){ var stampHost = document.getElementById('mpstamp'); if(!stampHost) return; while(stampHost.firstChild) stampHost.removeChild(stampHost.firstChild); stampHost.appendChild(svgEl('circle', {r:80, class:'mp-back'})); stampHost.appendChild(stampG(72, 'BANGKOK \u00b7 INTERNSHIP \u00b7 3 MONTHS \u00b7 2025 \u00b7 ', curLang === 'en' ? 'Bangkok' : 'バンコク', 'INTERN', 21));  if(window.__inkSealTex) window.__inkSealTex(); if(window.__mapSealRaster) setTimeout(window.__mapSealRaster, 0);};
    window.__mapStamp();

    var CTRY = [null, ['KOREA', 'KR'], ['THAILAND', 'TH'], ['VIETNAM', 'VN'], ['CAMBODIA', 'KH'], ['SINGAPORE', 'SG'], ['MALDIVES', 'MV']];
    mpStops.forEach(function(st, i){
      if(!CTRY[i]) return;
      var c = st.querySelector('circle'), cx = +c.getAttribute('cx'), cy = +c.getAttribute('cy');
      var wrap = svgEl('g', {transform:'translate(' + cx + ',' + cy + ')'}), inner = svgEl('g', {class:'mini', style:'--rot:' + ((i * 37) % 17 - 8) + 'deg'});
      inner.appendChild(stampG(22, CTRY[i][0] + ' \u00b7 ARRIVAL \u00b7 ' + CTRY[i][0] + ' \u00b7 ', CTRY[i][1], null, 40 + i));
      wrap.appendChild(inner); st.classList.add('sealed');

      var host = document.querySelector('#mpseals .stops');
      if(host){ var sx = svgEl('g', {class:'stop sealed', 'data-i':i}); sx.appendChild(wrap); host.appendChild(sx); mpSeals[i] = sx; } else st.appendChild(wrap);
    });
  }
  function mapUpdate(p){
    if(!mp || !mpProg) return;
    mp.classList.toggle('on', p > 0.005);
    var f = Math.max(0, Math.min(1, (p - .08) / .68));
    mpProg.style.strokeDashoffset = (1 - f).toFixed(4);
    var head = f * mpL, q = mpProg.getPointAtLength(head), q2 = mpProg.getPointAtLength(Math.min(mpL, head + 1)), ang = Math.atan2(q2.y - q.y, q2.x - q.x) * 180 / Math.PI;
    mpPlane.setAttribute('transform', 'translate(' + q.x.toFixed(1) + ',' + q.y.toFixed(1) + ') rotate(' + (ang + 90).toFixed(1) + ') scale(1.1) translate(-12,-12)');
    mp.classList.toggle('fly', f > 0 && f < 1);
    mpStops.forEach(function(st, i){ var on = head >= mpStopAt[i] - 2; st.classList.toggle('on', on); if(mpSeals[i]) mpSeals[i].classList.toggle('on', on); });
    mp.classList.toggle('landed', f >= 1);

    var svg = document.getElementById('mpsvg'), lsvg = document.querySelector('#ch5map .mp-land'), ssvg = document.getElementById('mpseals');
    if(svg){
      if(window.innerWidth <= 1024){
        var vb = svg.viewBox.baseVal, sw = svg.clientWidth, sh = svg.clientHeight;
        if(vb && vb.width && sw){
          var px = (q.x - vb.x) * (sw / vb.width), py = (q.y - vb.y) * (sh / vb.height);
          var vw = window.innerWidth, vhp = window.innerHeight;
          var tx = Math.max(0, Math.min(sw - vw, px - vw * .5));
          var ty = Math.max(0, Math.min(Math.max(0, sh - vhp * .64), py - vhp * .42));

          svg.style.transform = 'translate3d(' + (-tx).toFixed(1) + 'px,' + (Math.round(vhp * .16) - ty).toFixed(1) + 'px,0)';
          if(lsvg) lsvg.style.transform = svg.style.transform;
          if(ssvg) ssvg.style.transform = svg.style.transform;
        }
      } else { svg.style.transform = ''; svg.style.left = ''; svg.style.top = ''; if(lsvg) lsvg.style.transform = ''; if(ssvg) ssvg.style.transform = ''; }
    }
  }

  var SOLE = 'M0,-6.2 C2.6,-6.2 3.6,-3.4 3.4,-1 C3.2,1.2 2.2,2.2 2.2,3.6 C2.2,5.2 1.2,6.4 0,6.4 C-1.2,6.4 -2.2,5.2 -2.2,3.6 C-2.2,2.2 -3.2,1.2 -3.4,-1 C-3.6,-3.4 -2.6,-6.2 0,-6.2 Z';
  var FP_SIZE = 1.45, FP_STEP = 30;
  var PAW = 'M-3.6,2.6 a3.6,3.1 0 1 0 7.2,0 a3.6,3.1 0 1 0 -7.2,0 Z M-6.2,-2.2 a1.5,1.7 0 1 0 3,0 a1.5,1.7 0 1 0 -3,0 Z M-2.6,-4.6 a1.4,1.6 0 1 0 2.8,0 a1.4,1.6 0 1 0 -2.8,0 Z M0.6,-4.6 a1.4,1.6 0 1 0 2.8,0 a1.4,1.6 0 1 0 -2.8,0 Z M3.2,-2.2 a1.5,1.7 0 1 0 3,0 a1.5,1.7 0 1 0 -3,0 Z';
  function fpFilter(svg, id, seed){
    if(svg.querySelector('#' + id)) return;
    var defs = svg.querySelector('defs'); if(!defs){ defs = svgEl('defs', {}); svg.insertBefore(defs, svg.firstChild); }
    var f = svgEl('filter', {id:id, x:'-10%', y:'-2%', width:'120%', height:'104%'});
    f.innerHTML = '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="' + (seed + 3) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -.45" result="ga"/><feComposite in="d" in2="ga" operator="in"/>';
    defs.appendChild(f);
  }

  function footprints(svg, pathEl, cls, scale, startPx, parity, limitPx, paw, stepOv){
    var stepPx = stepOv || (paw ? FP_STEP * 1.05 : FP_STEP),    shape = paw ? PAW : SOLE, sideW = paw ? 6.5 : 7.5;
    var L = pathEl.getTotalLength(), step = stepPx * scale, start = (startPx || 12) * scale, lim = Math.min(L - 6 * scale, limitPx !== undefined ? limitPx * scale : Infinity), n = Math.max(0, Math.floor((lim - start) / step) + 1), g = svgEl('g', {class:cls + 's', filter:'url(#' + cls + 'ink)'});
    fpFilter(svg, cls + 'ink', cls === 'fp' ? 21 : 33);
    for(var i = 0; i < n; i++){
      var d = start + i * step, p1 = pathEl.getPointAtLength(d), p2 = pathEl.getPointAtLength(Math.min(L, d + 1)), a = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      var side = (((i + (parity || 0)) % 2) ? 1 : -1) * sideW * scale, nx = -Math.sin(a * Math.PI / 180) * side, ny = Math.cos(a * Math.PI / 180) * side;
      var f = svgEl('path', {d:shape, class:cls, transform:'translate(' + (p1.x + nx).toFixed(1) + ',' + (p1.y + ny).toFixed(1) + ') rotate(' + (a + 90).toFixed(1) + ') scale(' + (scale * FP_SIZE).toFixed(3) + ')', style:'--k:' + i});
      g.appendChild(f);
    }
    svg.appendChild(g);
    g.fpCount = n; g.fpLast = n ? (start + (n - 1) * step) / scale : start / scale;
    return g;
  }
  function srBuild(){
    if(!sr) return;
    if(srSvg) srSvg.remove();
    srItems = Array.prototype.slice.call(sr.children);
    srItems.forEach(function(li, i){ var st = li.querySelector('.st'); if(st && !st.firstChild) st.appendChild(stampSvg(li, i)); });
    var W = sr.clientWidth, H = sr.clientHeight;
    var pts = srItems.map(function(li){ var sl = li.querySelector('.slot'); return {x: li.offsetLeft + sl.offsetLeft + sl.offsetWidth / 2, y: li.offsetTop + sl.offsetTop + sl.offsetHeight / 2}; });
    srSvg = svgEl('svg', {class:'route', viewBox:'0 0 ' + W + ' ' + H, width:W, height:H});

    var oneCol = Math.abs(pts[1].x - pts[0].x) < 4;
    function pathTo(n){
      var d = 'M' + pts[0].x + ',' + pts[0].y;
      if(oneCol){ d += ' L' + pts[n].x + ',' + pts[n].y; return d; }
      if(n <= 3){ d += ' L' + pts[n].x + ',' + pts[n].y; return d; }
      var r = (pts[4].y - pts[3].y) / 2;
      d += ' L' + pts[3].x + ',' + pts[3].y + ' A' + r + ',' + r + ' 0 0 1 ' + pts[4].x + ',' + pts[4].y + ' L' + pts[n].x + ',' + pts[n].y;
      return d;
    }
    var sec = document.getElementById('contents'), tail = sec ? (sec.getBoundingClientRect().bottom - sr.getBoundingClientRect().top) : H;
    var last = pts[pts.length - 1];

    var ex = oneCol ? last.x : last.x - 104, rr = 22;
    var ty0 = last.y + rr, tyE = tail + 60, tL = tyE - ty0;

    var xL = -sr.getBoundingClientRect().left, room = tyE - last.y, ySeam = tyE - 60;
    var capB = 0; srItems.forEach(function(li){ var t = li.querySelector('.t'); if(t) capB = Math.max(capB, li.offsetTop + t.offsetTop + t.offsetHeight); });
    var yIn = Math.max(capB + 22, Math.min(last.y + room * .5, ySeam - 200)), yA = yIn + (ySeam - yIn) * .56, xIn = xL + 30, xO = ex + 58;
    var tailD = oneCol ? (' L' + last.x + ',' + tyE.toFixed(1)) : (' L' + (last.x - 30).toFixed(1) + ',' + last.y
      + ' C' + (last.x - (last.x - xL) * .55).toFixed(1) + ',' + (last.y - 6).toFixed(1) + ' ' + (xL - 260).toFixed(1) + ',' + (last.y + room * .08).toFixed(1) + ' ' + (xL - 250).toFixed(1) + ',' + (last.y + room * .3).toFixed(1)
      + ' C' + (xL - 240).toFixed(1) + ',' + (last.y + room * .5).toFixed(1) + ' ' + (xL - 80).toFixed(1) + ',' + yIn.toFixed(1) + ' ' + xIn.toFixed(1) + ',' + yIn.toFixed(1)
      + ' C' + (xIn + (xO - xIn) * .55).toFixed(1) + ',' + yIn.toFixed(1) + ' ' + xO.toFixed(1) + ',' + (yA - (yA - yIn) * .5).toFixed(1) + ' ' + xO.toFixed(1) + ',' + yA.toFixed(1)
      + ' C' + xO.toFixed(1) + ',' + (yA + (ySeam - yA) * .5).toFixed(1) + ' ' + ex.toFixed(1) + ',' + (ySeam - (ySeam - yA) * .5).toFixed(1) + ' ' + ex.toFixed(1) + ',' + ySeam.toFixed(1)
      + ' L' + ex.toFixed(1) + ',' + tyE.toFixed(1));
    var base = svgEl('path', {d:pathTo(pts.length - 1), class:'base'}); srSvg.appendChild(base);
    var clipId = 'srclip', cp = svgEl('clipPath', {id:clipId}), clipRect = svgEl('rect', {x:-200, y:0, width:W + 400, height:0}); cp.appendChild(clipRect);
    var defs = svgEl('defs', {}); defs.appendChild(cp); srSvg.appendChild(defs);

    var tailP = svgEl('path', {d:'M' + last.x + ',' + last.y + tailD, class:'tail'}); srSvg.appendChild(tailP);
    var lastSlot = srItems[srItems.length - 1].querySelector('.slot'), slotR = lastSlot ? lastSlot.offsetWidth / 2 : 56;
    var seamDist = tailP.getTotalLength() - 60;
    var tg = footprints(srSvg, tailP, 'fp', 1, slotR + 26, 0, seamDist + FP_STEP - 6);
    window.__srFps = tg.querySelectorAll('.fp'); window.__srFpCount = tg.fpCount; window.__srFpRest = seamDist - tg.fpLast;
    window.__srNextX = sr.getBoundingClientRect().left + ex;
    srProg = svgEl('path', {d:pathTo(pts.length - 2), class:'prog'}); srSvg.appendChild(srProg);
    srHead = svgEl('circle', {r:4, fill:'var(--acc)'}); srSvg.appendChild(srHead);
    srL = srProg.getTotalLength(); srProg.setAttribute('stroke-dasharray', srL); srProg.setAttribute('stroke-dashoffset', srL);

    srAt = pts.map(function(p, i){ if(i === pts.length - 1) return Infinity; var tmp = svgEl('path', {d:pathTo(i)}); srSvg.appendChild(tmp); var l = tmp.getTotalLength(); tmp.remove(); return l; });
    sr.appendChild(srSvg);
    srUpdate();
  }
  function srUpdate(){
    if(!sr || !srProg) return;
    var r = sr.getBoundingClientRect();
    var p = reduce ? 1 : Math.max(0, Math.min(1, (vh() * .88 - r.top + 40) / Math.max(1, r.height - 120)));
    var head = p * srL, n = 0;
    srProg.setAttribute('stroke-dashoffset', (srL - head).toFixed(1));
    var hp = srProg.getPointAtLength(head); srHead.setAttribute('cx', hp.x.toFixed(1)); srHead.setAttribute('cy', hp.y.toFixed(1)); srHead.style.opacity = p > 0 ? 1 : 0;
    srItems.forEach(function(li, i){
      var on = p > 0 && head >= srAt[i] - 150 || (i === srItems.length - 1 && p >= .999);
      li.classList.toggle('on', on);
      var st = p > 0 && head >= srAt[i] - 4; li.classList.toggle('stp', st); if(st) n++;
    });
    if(srn) srn.textContent = n; if(srdone) srdone.classList.toggle('on', n >= 7);

    if(window.__srTail){ var t = window.__srTail, q = Math.max(0, Math.min(1, (p - .86) / .14)); t.rect.setAttribute('height', (t.top + (t.bottom - t.top) * q + 20).toFixed(1)); }
  }

  var fpList = [], fpFade = 0, fpMainN = 0;
  function fpMeasure(){
    fpList = [];
    var sy = window.scrollY;
    if(window.__srFps){ window.__srFps.forEach(function(f){ var r = f.getBoundingClientRect(); fpList.push({el:f, y:r.top + r.height / 2 + sy}); }); }
    var pin = document.getElementById('ch1pin'), dg = pin && pin.querySelector('.dg');
    if(window.__dgFps && dg){ var pr = pin.getBoundingClientRect(), dr = dg.getBoundingClientRect(); window.__dgFps.forEach(function(f){ var r = f.getBoundingClientRect(); fpList.push({el:f, y:pr.top + sy + (r.top + r.height / 2 - dr.top)}); }); }
    fpMainN = fpList.length;
    if(window.__brFps){ window.__brFps.forEach(function(f){ var r = f.getBoundingClientRect(); fpList.push({el:f, y:r.top + r.height / 2 + sy}); }); }
    if(window.__chFps){ window.__chFps.forEach(function(f){ var r = f.getBoundingClientRect(); fpList.push({el:f, y:r.top + r.height / 2 + sy}); }); }
    if(window.__wkFps){ window.__wkFps.forEach(function(f){ var r = f.getBoundingClientRect(); fpList.push({el:f, y:r.top + r.height / 2 + sy}); }); }
  }

  function fpUpdate(){
    if(!fpList.length) return;
    var front = window.scrollY + vh() * .66, gone = Math.round(fpFade * fpMainN);
    if(front === fpUpdate.f && gone === fpUpdate.g) return;
    fpUpdate.f = front; fpUpdate.g = gone;
    for(var i = 0; i < fpList.length; i++){
      var o = fpList[i], on = (i >= gone || i >= fpMainN) && o.y < front;
      if(o.on !== on){ o.on = on; o.el.classList.toggle('on', on); }
    }
  }

  function brBuild(){
    var sec = document.getElementById('bridge'), svg = document.getElementById('brsvg'); if(!sec || !svg) return;
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var r = sec.getBoundingClientRect(), W = Math.max(1, r.width), H = Math.max(1, r.height);
    var rail = (window.__srNextX !== undefined) ? window.__srNextX - r.left : W * .13;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0)); svg.setAttribute('width', W.toFixed(0)); svg.setAttribute('height', H.toFixed(0));

    var dg = document.querySelector('#ch1pin .dg'), tl = document.querySelector('#ch1pin .dg-title .big:last-of-type'), sx = W * .5, sy = -40;
    if(dg && tl){ var dr = dg.getBoundingClientRect(), tr = tl.getBoundingClientRect(); sy = -(dr.height - (tr.bottom + 96 - dr.top)); }
    sx = W / 2;
    var bodyEl = sec.querySelector('.br-body'), bb = bodyEl ? bodyEl.getBoundingClientRect() : null, cap = sec.querySelector('.br-cap'), cr = cap ? cap.getBoundingClientRect() : null, ttl = sec.querySelector('.br-ttl'), tt = ttl ? ttl.getBoundingClientRect() : null;
    var cx = tt ? (tt.left + tt.width / 2 - r.left) : W * .5, btop = bb ? (bb.top - r.top) : H * .5 - 100;

    sy += 40; var ey = (tt ? tt.top - r.top : btop + 60) - 14, L = ey - sy;
    var lx = W / 2;
    var d = 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' L' + lx.toFixed(1) + ',' + ey.toFixed(1);
    var bx = cr ? (cr.left - r.left + 40) : cx, by = cr ? (cr.bottom - r.top + 18) : H * .62;
    var d2 = 'M' + bx.toFixed(1) + ',' + by.toFixed(1) + ' C' + (bx - 20).toFixed(1) + ',' + (by + 90).toFixed(1) + ' ' + rail.toFixed(1) + ',' + (by + 60).toFixed(1) + ' ' + rail.toFixed(1) + ',' + (by + 170).toFixed(1) + ' L' + rail.toFixed(1) + ',' + (H + 30).toFixed(1);
    var path2 = svgEl('path', {d:d2, fill:'none', stroke:'none'}); svg.appendChild(path2);
    footprints(svg, path2, 'brfp', 1, 6, 1);
    var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); svg.appendChild(path);
    footprints(svg, path, 'brfp', 1, 8, 0);
    window.__brFps = svg.querySelectorAll('.brfp');
  }

  var dgSat = document.getElementById('dgsat'), dgNodes = document.querySelectorAll('#ch1pin .dg-node'), dgStick = document.querySelector('#ch1pin .dg'), dgOn = false, dgLastA = 0;
  var dgTrail = null, dgTrailF = [], dgWasOn = false, dgT0 = 0, dgNowPend = -1, dgLeave = false, dgFinT0 = 0, dgFinW0 = 0, dgFinP0 = 0, dgFinSnap = null, dgP = 0, dgGone = false;
  var DG_ANG = [-90, 148.4, 31.6];
  var DG_A0 = ((360 - DG_ANG[1]) % 360 + 360) % 360, DG_F0 = ((DG_A0 - 180) / 360 + 1) % 1;
  var orbitN = 0;
  (function orbit(now){

    if(!dgOn){ if(dgWasOn){ dgWasOn = false; if(dgTrail) for(var tj = 0; tj < dgTrail.length; tj++) dgTrail[tj].style.opacity = '0'; dgNodes.forEach(function(n){ n.classList.remove('now'); }); } }
    else if(dgSat && !(document.documentElement.classList.contains('handheld') && (++orbitN & 1))){
      if(!dgWasOn){ dgWasOn = true; dgT0 = now; dgLastA = DG_A0; dgNowPend = 1; dgFinT0 = 0; dgGone = false; }
      if(dgNowPend >= 0 && dgNodes[dgNowPend] && dgNodes[dgNowPend].classList.contains('in')){ dgNow(dgNowPend); dgNowPend = -1; }

      if(!dgLeave && (dgFinT0 || dgGone)){ dgFinT0 = 0; dgGone = false; dgT0 = now - dgFinW0 * 18000; }
      if(dgLeave && !dgFinT0 && !dgGone){ dgFinT0 = now; dgFinW0 = (now - dgT0) / 18000; dgFinP0 = dgP;
        dgFinSnap = []; if(dgTrail) for(var ts = 0; ts < dgTrail.length; ts++) dgFinSnap[ts] = parseFloat(dgTrail[ts].style.opacity) || 0; }
      if(dgGone){ if(dgTrail) for(var tg = 0; tg < dgTrail.length; tg++) dgTrail[tg].style.opacity = '0'; }
      else if(dgFinT0){

        var u = dgP - dgFinP0, q = Math.max(0, Math.min(1, u / .15));
        var fade = .18 + .82 * (1 - Math.max(0, Math.min(1, (u - .15) / .05)));
        var f0 = ((dgFinW0 % 1) + 1) % 1;
        if(dgTrail) for(var tf = 0; tf < dgTrail.length; tf++){
          var d = ((dgTrailF[tf] - f0) % 1 + 1) % 1, o2 = 0;
          if(d <= q) o2 = ((q - d) < .03 ? (q - d) / .03 : 1) * .85;
          var sn = (dgFinSnap && dgFinSnap[tf]) || 0;
          dgTrail[tf].style.opacity = (Math.max(sn, o2) * fade).toFixed(2);
        }
        if(fade <= .19 && u > .3) dgGone = false;
      }
      else {
      var w = (now - dgT0) / 18000, a = ((w * 360 + DG_A0) % 360 + 360) % 360;

      if(dgTrail){ for(var ti = 0; ti < dgTrail.length; ti++){ var age = w - dgTrailF[ti], op = 0; if(age >= 0){ age %= 1; op = age < .02 ? age / .02 : age < .26 ? 1 : age < .44 ? 1 - (age - .26) / .18 : 0; }    dgTrail[ti].style.opacity = (op * .85).toFixed(2); } }
      DG_ANG.forEach(function(t, i){ var tt = ((360 - t) % 360 + 360) % 360,    prev = dgLastA, cur = a; var crossed = prev <= cur ? (prev < tt && tt <= cur) : (prev < tt || tt <= cur); if(crossed){ dgNow(i); dgNowPend = -1; } });
      dgLastA = a;
      }
    }
    requestAnimationFrame(orbit);
  })(performance.now());

  (function(){
    var H = document.documentElement; if(H.classList.contains('pcview') && H.classList.contains('phone')) return;
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    function shift(el, tx, ty){ if(!el) return; var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', 'translate(' + tx + ',' + ty + ')'); while(el.firstChild) g.appendChild(el.firstChild); el.appendChild(g); }
    var caps = svg.querySelectorAll('.dg-cap');
    shift(caps[0], 13, -20);

    svg.setAttribute('viewBox', '-187 20 1400 780');
    shift(svg.querySelector('.dg-title'), -667, -732);
  })();
  (function(){
    if(!document.documentElement.classList.contains('pcview') || !document.documentElement.classList.contains('phone')) return;
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    svg.setAttribute('viewBox', '-328.5 20 1760 700');
    function shift(el, tx, ty){ if(!el) return; var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', 'translate(' + tx + ',' + ty + ')'); while(el.firstChild) g.appendChild(el.firstChild); el.appendChild(g); }
    shift(svg.querySelector('.dg-title'), -820.5, -720);
    svg.querySelectorAll('.dg-cap tspan[dy]').forEach(function(t){ var d = parseFloat(t.getAttribute('dy')); if(d === 24) t.setAttribute('dy', '38'); else if(d === 26) t.setAttribute('dy', '40'); });
    var caps = svg.querySelectorAll('.dg-cap');
    shift(caps[0], 91.5, 0);
    shift(caps[1], -388.5, -370);
    shift(caps[2], 413.5, -370);
  })();

  var capCv = document.createElement('canvas'), capCx = cx2d(capCv);
  function capTrail(el, ch){
    if(!capCx || !ch) return 0;
    var cs = getComputedStyle(el), px = parseFloat(cs.fontSize), S = 4;
    if(!(px > 0)) return 0;
    var fnt = cs.fontStyle + ' ' + cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily;
    capCx.font = fnt;
    var adv = capCx.measureText(ch).width; if(!(adv > 0)) return 0;
    var x0 = Math.round(px * S * .4);
    capCv.width = Math.ceil(x0 + adv + px * S * .8); capCv.height = Math.ceil(px * S * 1.8);
    capCx.font = fnt;
    capCx.textBaseline = 'middle'; capCx.fillStyle = '#000';
    capCx.fillText(ch, x0, capCv.height / 2);
    var d = capCx.getImageData(0, 0, capCv.width, capCv.height).data, right = x0 + adv, x, y;
    for(x = capCv.width - 1; x >= 0; x--){
      for(y = 0; y < capCv.height; y++){ if(d[(y * capCv.width + x) * 4 + 3] > 40){ right = x + 1; x = -1; break; } }
    }
    var ls = parseFloat(cs.letterSpacing); if(!isFinite(ls)) ls = 0;
    return Math.max(0, (x0 + adv - right) / S) + ls;
  }
  function dgCaps(){
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    var phone = document.documentElement.classList.contains('pcview') && document.documentElement.classList.contains('phone');
    var ja = !(typeof curLang !== 'undefined' && curLang === 'en');
    var dy1 = phone ? 42 : (ja ? 40 : 34), dy2 = phone ? 44 : (ja ? 36 : 32);
    var BIG = ['些細な点', '細部', '人', '場', '専門の外', 'デザイン'];
    var ns = 'http://www.w3.org/2000/svg';
    svg.querySelectorAll('.dg-cap text').forEach(function(t, ci){
      if(t.__mixed && t.__mixedLang === curLang) return;
      var lines = Array.prototype.slice.call(t.querySelectorAll(':scope > tspan')).map(function(ts){ return {x: ts.getAttribute('x'), ref: ts.classList.contains('ref'), text: ts.textContent}; });
      if(!lines.length) return;

      if(t.__x0 && t.__x0.length === lines.length) lines.forEach(function(l, i){ l.x = t.__x0[i]; });
      else t.__x0 = lines.map(function(l){ return l.x; });

      var x = null;
      if(!phone){

        if(ci === 1){ x = '-167'; t.setAttribute('text-anchor', 'start'); t.setAttribute('y', '572'); }
        if(ci === 2){ x = '1213'; t.setAttribute('text-anchor', 'end'); t.setAttribute('y', '572'); }
      }
      while(t.firstChild) t.removeChild(t.firstChild);
      lines.forEach(function(l, i){
        var ts = document.createElementNS(ns, 'tspan'); ts.setAttribute('x', x || l.x); ts.setAttribute('dy', i === 0 ? '0' : (l.ref ? dy2 : dy1)); if(l.ref) ts.setAttribute('class', 'ref');
        if(ja && !l.ref){
          var big = []; BIG.forEach(function(w){ var k = l.text.indexOf(w); while(k >= 0){ for(var q = k; q < k + w.length; q++) big[q] = true; k = l.text.indexOf(w, k + 1); } });
          Array.from(l.text).forEach(function(ch, k){ var c = document.createElementNS(ns, 'tspan'), cls = [];
            if(/[。、！？]/.test(ch)) cls.push('pt'); else if(/[一-鿿㐀-䶿々〆]/.test(ch)) cls.push('kj'); else if(/[぀-ゟ゠-ヿー]/.test(ch)) cls.push('kn');
            if(big[k]) cls.push('big');
            if(cls.length) c.setAttribute('class', cls.join(' ')); c.textContent = ch; ts.appendChild(c); });
        } else ts.textContent = l.text;
        t.appendChild(ts);
      });

      if(t.getAttribute('text-anchor') === 'end'){
        var rf = null, bd = null;
        t.querySelectorAll(':scope > tspan').forEach(function(ts){ if(ts.classList.contains('ref')) rf = ts; else bd = ts; });
        if(rf && bd){
          var bTx = bd.textContent, rTx = rf.textContent;
          var d = capTrail(bd.lastElementChild || bd, bTx.charAt(bTx.length - 1)) - capTrail(rf, rTx.charAt(rTx.length - 1));

          if(d > .5) rf.setAttribute('x', (parseFloat(rf.getAttribute('x')) - d).toFixed(2));
        }
      }
      t.__mixed = true; t.__mixedLang = curLang;
    });
  }
  window.__dgCaps = dgCaps;
  setTimeout(dgCaps, 0);

  function dgTrailBuild(){
    var svg = document.getElementById('dgsvg'), ring = svg && svg.querySelector('.dg-ring'); if(!svg || !ring) return;
    var old = svg.querySelector('.dgrps'); if(old) old.remove();
    var r = svg.getBoundingClientRect(); if(!r.width) return;
    var vbb = svg.viewBox && svg.viewBox.baseVal, vbw = (vbb && vbb.width) || 1000, k = vbw / r.width;

    var L = ring.getTotalLength(), nEven = Math.max(2, 2 * Math.round(L / (FP_STEP * k) / 2)), stepPx = L / nEven / k, step = stepPx * k, start = 12 * k;
    var g = footprints(svg, ring, 'dgrp', k, 12, 0, undefined, false, stepPx);
    g.setAttribute('class', 'dgrps');
    ring.parentNode.insertBefore(g, ring.nextSibling);
    Array.prototype.slice.call(g.querySelectorAll('.dgrp')).forEach(function(pth){
      var w = svgEl('g', {class:'dgrp', transform:pth.getAttribute('transform')}), h = svgEl('path', {d:SOLE, class:'dgrph'});
      pth.removeAttribute('transform'); pth.removeAttribute('style'); pth.setAttribute('class', 'dgrpi');
      g.insertBefore(w, pth); w.appendChild(h); w.appendChild(pth);
    });
    dgTrail = g.querySelectorAll('.dgrp'); dgTrailF = [];
    for(var i = 0; i < dgTrail.length; i++) dgTrailF.push((((start + i * step) / L - DG_F0) % 1 + 1) % 1);
  }
  function dgNow(i){
    dgNodes.forEach(function(n, j){ if(j !== i) n.classList.remove('now'); });
    var n = dgNodes[i]; if(!n || !n.classList.contains('in')) return;
    n.classList.remove('now'); void n.getBoundingClientRect(); n.classList.add('now');
  }
  function dgPulseBuild(){
    dgNodes.forEach(function(n){ if(n.querySelector('.dgpulse')) return; var seal = n.querySelector('g.seal:not(.sealimg)'); if(!seal) return;
      var w = svgEl('g', {class:'dgpulse-w'}), tr = seal.getAttribute('transform'); if(tr) w.setAttribute('transform', tr);
      w.appendChild(svgEl('rect', {class:'dgpulse', x:-104, y:-104, width:208, height:208, rx:14})); n.appendChild(w); });
  }
  function dgFlag(){
    var svg = document.getElementById('dgsvg'), t = svg && svg.querySelector('.dg-title'); if(!t || t.querySelector('.dgflag')) return;
    var big = t.querySelector('.big'); if(!big) return;
    var bb; try{ bb = big.getBBox(); }catch(e){ return; }
    var fl = flagSvg(), g = svgEl('g', {class:'dgflag'}), sc = 2.1, base = parseFloat(big.getAttribute('y')) || (bb.y + bb.height * .72);

    g.setAttribute('transform', 'translate(' + (bb.x + bb.width + 10).toFixed(1) + ',' + base.toFixed(1) + ') scale(' + sc + ')');
    var ga = svgEl('g', {class:'dgflag-a'}), gi = svgEl('g', {transform:'translate(-6.5,-39)'});
    while(fl.firstChild) gi.appendChild(fl.firstChild);
    ga.appendChild(gi); g.appendChild(ga); (big.parentNode).appendChild(g);
  }
  window.addEventListener('load', function(){ setTimeout(function(){ dgTrailBuild(); dgFlag(); dgPulseBuild(); }, 120); });
  window.addEventListener('resize', function(){ clearTimeout(dgTrailBuild.t); dgTrailBuild.t = setTimeout(dgTrailBuild, 300); }, {passive:true});
  function dgBuild(){
    var svg = document.getElementById('dgsvg'), inp = document.getElementById('dgin'); if(!svg || !inp) return;
    var r = svg.getBoundingClientRect(), x = (window.__srNextX !== undefined) ? window.__srNextX : r.left + r.width * .12;
    var vbb = svg.viewBox && svg.viewBox.baseVal, vbw = (vbb && vbb.width) || 1000, vbx = (vbb && vbb.x) || 0;
    var ex = vbx + (x - r.left) / r.width * vbw; ex = Math.max(-600, Math.min(170, ex));
    var k = vbw / Math.max(1, r.width);
    var dg = svg.closest('.dg'), dr = dg ? dg.getBoundingClientRect() : r, seamY = (dr.top - r.top) * k;
    var iL = 190 - seamY;
    inp.setAttribute('d', 'M' + ex.toFixed(1) + ',' + seamY.toFixed(1) + ' C' + (ex + 34).toFixed(1) + ',' + (seamY + iL * .35).toFixed(1) + ' ' + (ex - 30).toFixed(1) + ',' + (seamY + iL * .7).toFixed(1) + ' ' + ex.toFixed(1) + ',190 C' + ex.toFixed(1) + ',330 200,300 200,440');
    var old = svg.querySelector('.dgfps'); if(old) old.remove();
    var rest = (window.__srFpRest !== undefined) ? window.__srFpRest : 0, cnt = window.__srFpCount || 0;
    var fpg = footprints(svg, inp, 'dgfp', k, FP_STEP - rest, cnt % 2);

    var ttl = svg.querySelector('.dg-title'); if(ttl && ttl.parentNode === svg) svg.insertBefore(fpg, ttl);
    window.__dgFps = fpg.querySelectorAll('.dgfp');
  }

  function passSvg(seed){
    stampSvg.n = (stampSvg.n || 0) + 1; var uid = stampSvg.n, id = 'ink' + uid;
    var sv = svgEl('svg', {viewBox:'0 0 132 176', class:'pass-svg'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (seed + 5) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)">' +
      '<rect x="8" y="8" width="116" height="160" rx="10" stroke-width="2.6"/><rect x="19" y="19" width="94" height="138" rx="5" stroke-width="1.1"/>' +
      '<text x="66" y="44" text-anchor="middle" font-family="var(--mono)" font-size="11" font-weight="500" letter-spacing="3" fill="var(--acc)" stroke="none">PASSPORT</text>' +
      '<line x1="34" y1="52" x2="98" y2="52" stroke-width="1.2"/>' +
      '<circle cx="66" cy="88" r="24" stroke-width="2.2"/><circle cx="66" cy="88" r="17" stroke-width="1"/>' +
      '<text x="66" y="98" text-anchor="middle" font-family="var(--mincho)" font-weight="900" font-size="26" fill="var(--acc)" stroke="none">小</text>' +
      '<line x1="34" y1="124" x2="98" y2="124" stroke-width="1.2"/>' +
      '<text x="66" y="138" text-anchor="middle" font-family="var(--mono)" font-size="7.2" letter-spacing="2" fill="var(--acc)" stroke="none">SHUZO KOSAKA</text>' +
      '<text x="66" y="150" text-anchor="middle" font-family="var(--mono)" font-size="6.2" letter-spacing="1.4" fill="var(--acc)" stroke="none">SEVEN CHECKPOINTS</text></g>';
    return sv;
  }
  function passPlace(){
    var h = document.querySelector('#contents .ttl'); if(!h) return;
    var el = h.querySelector('.pass'); if(!el){ el = document.createElement('span'); el.className = 'pass'; el.appendChild(passSvg(41)); h.appendChild(el); }
    var chs = h.querySelectorAll('.split .ch'), po = null; chs.forEach(function(c){ if(!po && c.textContent === 'ポ') po = c; });
    if(!po){ var last = h.querySelectorAll('.split'); last = last[last.length - 1]; var lc = last ? last.querySelectorAll('.ch') : []; po = lc[Math.max(0, lc.length - 4)] || null; }
    if(!po) return;

    var w = po.offsetWidth, hh = po.offsetHeight;
    el.style.left = (po.offsetLeft + w * 1.1) + 'px'; el.style.top = (po.offsetTop - hh * 1.9) + 'px'; el.style.height = (hh * 2.9) + 'px';
  }

  function kakuSvg(en, jp, seed){
    stampSvg.n = (stampSvg.n || 0) + 1; var uid = stampSvg.n, id = 'ink' + uid;
    var sv = svgEl('svg', {viewBox:'0 0 156 156'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (seed + 5) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)">' +
      '<rect x="9" y="9" width="138" height="138" rx="12" stroke-width="4.2"/><rect x="21" y="21" width="114" height="114" rx="6" stroke-width="1.5"/>' +
      '<text x="78" y="46" text-anchor="middle" font-family="var(--mono)" font-size="10.5" font-weight="500" letter-spacing="2.6" fill="var(--acc)" stroke="none">' + en + '</text>' +
      (jp.indexOf('\n') > 0 ? (function(){ var ln = jp.split('\n'), fs = Math.min(20, Math.round(112 / Math.max(ln[0].length, ln[1].length))); return '<text x="78" y="82" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + fs + '" fill="var(--acc)" stroke="none">' + '<tspan x="78">' + ln[0] + '</tspan><tspan x="78" dy="' + (fs + 5) + '">' + ln[1] + '</tspan></text>'; })() : '<text x="78" y="' + (jp.length > 3 ? 92 : 94) + '" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (jp.length > 3 ? 20 : 26) + '" fill="var(--acc)" stroke="none">' + jp + '</text>') +
      '<text x="78" y="124" text-anchor="middle" font-family="var(--mono)" font-size="6.5" letter-spacing="1.6" fill="var(--acc)" stroke="none">KOSAKA \u00b7 PORTFOLIO</text></g>';
    return sv;
  }

  var THX = {
    ja: {ring:'サイバーエージェントの皆様 · ここまでご覧いただき', a:'ありがとう', b:'ございました', rf:'var(--sans)', rs:'12.5', rl:'.8', cf:'var(--mincho)', cs:'40'},
    en: {ring:'TO EVERYONE AT CYBERAGENT · FOR READING THIS FAR', a:'THANK', b:'YOU', rf:'var(--mono)', rs:'10', rl:'.4', cf:'var(--optima)', cs:'50'}
  };
  function thanksSeal(){
    var T = THX[curLang === 'en' ? 'en' : 'ja'];
    stampSvg.n = (stampSvg.n || 0) + 1; var tid = 'ink' + stampSvg.n;
    var sv = svgEl('svg', {viewBox:'0 0 300 300'});
    sv.innerHTML = '<defs><filter id="' + tid + '" x="-10%" y="-10%" width="120%" height="120%">' +
      '<feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="37" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" seed="41" result="g"/>' +
      '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3.6 -.2" result="ga"/>' +
      '<feComposite in="d" in2="ga" operator="in"/></filter>' +
      '<path id="thxA" d="M 38,150 a 112,112 0 0 1 224,0"/><path id="thxB" d="M 28,150 a 122,122 0 0 0 244,0"/></defs>' +
      '<g filter="url(#' + tid + ')" fill="none" stroke="var(--acc)">' +
      '<circle cx="150" cy="150" r="141" stroke-width="5.6"/><circle cx="150" cy="150" r="126" stroke-width="1.7"/>' +
      '<text font-family="' + T.rf + '" font-weight="700" font-size="' + T.rs + '" letter-spacing="' + T.rl + '" fill="var(--acc)" stroke="none"><textPath href="#thxA" startOffset="50%" text-anchor="middle">' + T.ring + '</textPath></text>' +
      '<text font-family="' + T.cf + '" font-weight="900" font-size="' + T.cs + '" fill="var(--acc)" stroke="none" text-anchor="middle"><tspan x="150" y="142">' + T.a + '</tspan><tspan x="150" y="190">' + T.b + '</tspan></text>' +
      '<text font-family="var(--mono)" font-size="10" letter-spacing="1.6" fill="var(--acc)" stroke="none"><textPath href="#thxB" startOffset="50%" text-anchor="middle">KOSAKA SHUZO · PORTFOLIO 2026</textPath></text></g>';
    return sv;
  }
  var caSeal = document.querySelector('#ch7c .ca-seal');

  function renderThanks(){ if(!caSeal) return; while(caSeal.firstChild) caSeal.removeChild(caSeal.firstChild); caSeal.appendChild(thanksSeal()); }
  window.__renderThanks = renderThanks;
  renderThanks();
  document.querySelectorAll('#mlinks > a, .menu .mmsg').forEach(function(a, i){ var st = a.querySelector('.st'); if(st && !st.firstChild) st.appendChild(kakuSvg(a.getAttribute('data-en') || '', a.getAttribute('data-jp') || '', 60 + i * 9)); });

  document.querySelectorAll('#mseals > li').forEach(function(li, i){ var st = li.querySelector('.st'); if(st && !st.firstChild) st.appendChild(stampSvg(li, i)); });

  var CHSEALS = [{sec:'ch1', cp:1}, {sec:'ch2', cp:2}, {sec:'ch3', cp:3}, {sec:'ch4', cp:4},
                 {sec:'ch5pin', cp:5, en:'BAR', place:'バー', year:'2022', pin:true}, {sec:'ch5map', cp:5, en:'ABROAD', place:'海外', year:'2025', pin:true}, {sec:'ch5intern', cp:5, en:'BANGKOK INTERNSHIP', place:'バンコク|インターン', year:'2025'},
                 {sec:'ch6', cp:6}, {sec:'ch7', cp:7}, {sec:'works', cp:7, en:'MAKING', place:'制作', year:'2020–26', ring:'HOW I MAKE \u00b7 TRY, FAIL, REPEAT \u00b7 2020 \u2192 2026 \u00b7 KOSAKA SHUZO', pin:true}];
  function chsealBuild(){
    if(!srItems.length) return;
    var list = [];
    CHSEALS.forEach(function(c, k){
      var sec = document.getElementById(c.sec); if(!sec) return;
      var host = sec.querySelector(':scope > .stick') || sec, el = host.querySelector(':scope > .chseal');
      if(!el){ el = document.createElement('span'); el.className = 'chseal'; el.setAttribute('aria-hidden', 'true'); el.style.setProperty('--rot', ((k % 3) - 1) * 6 - 4 + 'deg'); host.appendChild(el); }
      while(el.firstChild) el.removeChild(el.firstChild);
      var src = srItems[c.cp - 1]; if(!src) return;
      if(c.place){ var tmp = document.createElement('li'); tmp.setAttribute('data-en', c.en); tmp.setAttribute('data-place', c.place); tmp.setAttribute('data-year', c.year); if(c.ring) tmp.setAttribute('data-ring', c.ring); src = tmp; }
      el.appendChild(stampSvg(src, c.cp - 1));

      var old = host.querySelector(':scope > .chtrail'); if(old) old.remove();
      if(c.pin) return;
      var hr = host.getBoundingClientRect(), tx = el.offsetLeft + el.offsetWidth / 2, ty = el.offsetTop + el.offsetHeight + 8;
      var ht = sec.querySelector('.ttl:not(.vert)'); if(ht && ht.offsetParent === host){ ty = Math.max(ty, ht.offsetTop + ht.offsetHeight + 14); }
      var vt = sec.querySelector('.ttl.vert');
      if(vt){ var sps = vt.querySelectorAll('.split'), last = sps[sps.length - 1]; if(last){ tx = vt.offsetLeft + last.offsetLeft + last.offsetWidth / 2; ty = vt.offsetTop + last.offsetTop + last.offsetHeight + 4; } }
      if(c.sec === 'ch6') tx += 7;
      var tsvg = svgEl('svg', {class:'chtrail', viewBox:'0 0 ' + hr.width.toFixed(0) + ' ' + hr.height.toFixed(0), width:hr.width.toFixed(0), height:hr.height.toFixed(0)});

      var TR = {ch1:[1, 38, 560, 0], ch2:[-1, 52, 610, 1], ch3:[1, 22, 300, 0], ch4:[-1, 44, 580, 2], ch5intern:[1, 46, 290, 1], ch6:[-1, 26, 300, 0], ch7:[1, 36, 240, 2]}, tr = TR[c.sec] || [1, 30, 260, 0], sg = tr[0], amp = tr[1], len = tr[2], kind = tr[3];
      var d = kind === 1
        ? 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx + sg * amp * 1.4).toFixed(1) + ',' + (ty + len * .3).toFixed(1) + ' ' + (tx - sg * amp * .6).toFixed(1) + ',' + (ty + len * .6).toFixed(1) + ' ' + (tx + sg * amp * .5).toFixed(1) + ',' + (ty + len).toFixed(1)
        : kind === 2
        ? 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + tx.toFixed(1) + ',' + (ty + len * .25).toFixed(1) + ' ' + (tx + sg * amp * 1.5).toFixed(1) + ',' + (ty + len * .45).toFixed(1) + ' ' + (tx + sg * amp).toFixed(1) + ',' + (ty + len).toFixed(1)
        : 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + tx.toFixed(1) + ',' + (ty + len * .33).toFixed(1) + ' ' + (tx + sg * amp * 1.15).toFixed(1) + ',' + (ty + len * .48).toFixed(1) + ' ' + (tx + sg * amp).toFixed(1) + ',' + (ty + len).toFixed(1);
      if(c.sec === 'ch7'){
        var bd7 = sec.querySelector(':scope > .body');
        if(bd7){ var ex7 = bd7.offsetLeft - 12, ey7 = bd7.offsetTop + Math.min(320, bd7.offsetHeight * .5);
          if(ex7 > tx + 40 && ey7 > ty + 90){
            d = 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx - 16).toFixed(1) + ',' + (ty + (ey7 - ty) * .44).toFixed(1) + ' ' + (tx + (ex7 - tx) * .30).toFixed(1) + ',' + (ey7 - 6).toFixed(1) + ' ' + ex7.toFixed(1) + ',' + ey7.toFixed(1);
          } }
      }
      if(c.sec === 'ch5intern'){ d = 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx + 24).toFixed(1) + ',' + (ty + 190).toFixed(1) + ' ' + (tx - 70).toFixed(1) + ',' + (ty + 330).toFixed(1) + ' ' + (tx - 40).toFixed(1) + ',' + (ty + 430).toFixed(1) + ' C' + (tx - 20).toFixed(1) + ',' + (ty + 500).toFixed(1) + ' ' + (tx - 150).toFixed(1) + ',' + (ty + 540).toFixed(1) + ' -90,' + (ty + 600).toFixed(1); }
      var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); tsvg.appendChild(path);
      footprints(tsvg, path, 'chfp', 1, vt ? 12 : 22, k % 2, undefined, c.sec === 'ch5intern');
      host.appendChild(tsvg);
      var fs = tsvg.querySelectorAll('.chfp'), nf = fs.length;
      fs.forEach(function(f, i){ var q = (i + 1) / nf; f.style.setProperty('--fade', q > .55 ? Math.max(0, 1 - (q - .55) / .45 * .92).toFixed(2) : '1'); list.push(f); });
    });
    window.__chFps = list;
  }

  function ovLinkFit(){
    var box = document.getElementById('ovals'); if(!box) return; var lk = box.querySelector('.ov-link'), ovs = box.querySelectorAll('.oval'); if(!lk || ovs.length < 2) return;
    var br = box.getBoundingClientRect(), a = ovs[0].getBoundingClientRect(), b = ovs[1].getBoundingClientRect(); if(!br.width) return;
    var x1 = (a.right - br.left) / br.width * 900, x2 = (b.left - br.left) / br.width * 900;
    var ls = lk.querySelectorAll('line'); if(ls.length < 2) return;
    ls[0].setAttribute('x1', x1.toFixed(1)); ls[0].setAttribute('x2', x2.toFixed(1)); ls[1].setAttribute('x1', x1.toFixed(1)); ls[1].setAttribute('x2', x2.toFixed(1));
  }
  ovLinkFit(); window.addEventListener('resize', ovLinkFit);

  function wkBuild(){
    var sec = document.getElementById('ch7'), wk = document.getElementById('works'); if(!sec || !wk) return;
    var old = sec.querySelector(':scope > .wktrail'); if(old) old.remove(); window.__wkFps = [];
    var r = sec.getBoundingClientRect(), W = r.width; if(W < 1025) return;
    var bd = sec.querySelector(':scope > .body'), lastEl = bd && bd.lastElementChild; if(!bd || !lastEl) return;
    var br = bd.getBoundingClientRect(), lb = lastEl.getBoundingClientRect();
    var sy = (lb.bottom - r.top) + 46, sx = (br.left + br.width / 2) - r.left;
    var seal = wk.querySelector(':scope > .chseal'); if(!seal) return; var wr = wk.getBoundingClientRect();
    var ex = wr.left + seal.offsetLeft + seal.offsetWidth * .95 + 6 - r.left, ey = wr.top + seal.offsetTop + seal.offsetHeight * .5 - r.top; if(ey - sy < 200) return;
    var d = 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' C' + sx.toFixed(1) + ',' + (sy + (ey - sy) * .62).toFixed(1) + ' ' + (ex + (sx - ex) * .5).toFixed(1) + ',' + ey.toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1);
    var hg = ey + 60, svg = svgEl('svg', {class:'wktrail', viewBox:'0 0 ' + W.toFixed(0) + ' ' + hg.toFixed(0), width:W.toFixed(0), height:hg.toFixed(0)});
    var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); svg.appendChild(path);
    footprints(svg, path, 'chfp', 1, 18, 1, path.getTotalLength() - 30);
    var wfs = svg.querySelectorAll('.chfp'), wn = wfs.length;
    wfs.forEach(function(f, i){ var q = (i + 1) / wn; f.style.setProperty('--fade', q > .55 ? Math.max(0, 1 - (q - .55) / .45 * .92).toFixed(2) : '1'); });
    window.__wkFps = Array.prototype.slice.call(wfs);
    sec.appendChild(svg);
  }

  function msgTrail(){
    var sec = document.getElementById('message'); if(!sec) return;
    var host = sec.querySelector('.stick'); if(!host) return;
    var old = host.querySelector('.mtrail'); if(old) old.remove();
    window.__mFps = null;
    var W = host.clientWidth, H = host.clientHeight;
    if(!W || !H) return;
    var sv = svgEl('svg', {'class':'mtrail', viewBox:'0 0 ' + W + ' ' + H, width:W, height:H, 'aria-hidden':'true'});
    var cx = W / 2, sy = H * .74, ey = H * 1.16, run = ey - sy;

    var d = 'M' + (cx + 32).toFixed(1) + ',' + sy.toFixed(1)
          + ' C' + (cx + 66).toFixed(1) + ',' + (sy + run * .18).toFixed(1)
          + ' ' + (cx - 58).toFixed(1) + ',' + (sy + run * .38).toFixed(1)
          + ' ' + (cx - 14).toFixed(1) + ',' + (sy + run * .60).toFixed(1)
          + ' S' + (cx + 24).toFixed(1) + ',' + (ey - run * .10).toFixed(1)
          + ' ' + cx.toFixed(1) + ',' + ey.toFixed(1);
    var path = svgEl('path', {d:d, fill:'none', stroke:'none'});
    sv.appendChild(path);
    footprints(sv, path, 'mfp', 1, 12, 0);
    host.appendChild(sv);
    var fs = sv.querySelectorAll('.mfp');
    fs.forEach(function(f, i){ var q = (i + 1) / fs.length; f.style.setProperty('--fade', q > .6 ? Math.max(.1, 1 - (q - .6) / .4 * .8).toFixed(2) : '1'); });
    window.__mFps = fs;
  }
  window.addEventListener('resize', function(){ clearTimeout(msgTrail.t); msgTrail.t = setTimeout(msgTrail, 220); }, {passive:true});
  function rallyBuild(){ srBuild(); dgBuild(); brBuild(); chsealBuild(); soloSealsBuild(); wkBuild(); fpMeasure(); fpUpdate(); passPlace(); msgTrail(); setTimeout(onScroll, 0);    }
  if(window.ResizeObserver && document.getElementById('contents')){ var roT, roH = 0; new ResizeObserver(function(es){ var h = es[0].contentRect.height; if(Math.abs(h - roH) < 1) return; roH = h; clearTimeout(roT); roT = setTimeout(rallyBuild, 80); }).observe(document.getElementById('contents')); }
  if(sr){ rallyBuild(); if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(rallyBuild, 50); }); window.addEventListener('load', function(){ setTimeout(rallyBuild, 100); setTimeout(fpMeasure, 1500); }); var srT; window.addEventListener('resize', function(){ clearTimeout(srT); srT = setTimeout(rallyBuild, 120); }); }

  var stampPic = document.querySelector('#contents .stamp-pic'), stampSec = stampPic ? stampPic.closest('section') : null, stampP = -1;
  function stampUpdate(){
    if(!stampPic || !stampSec) return;
    var restTop = stampSec.getBoundingClientRect().top + stampPic.offsetTop, H = vh();
    var p = (H * .92 - restTop) / (H * .9); p = Math.max(0, Math.min(1, p));
    if(reduce) p = 1;
    if(Math.abs(p - stampP) < .002) return; stampP = p;

    var t = Math.min(1, p / .72); t = 1 - (1 - t) * (1 - t); var t0 = t, R = Math.min(window.innerWidth * .5, H * .78), a = -Math.PI / 2 - t * Math.PI / 2;
    stampPic.style.setProperty('--fx', (R + R * Math.cos(a)).toFixed(1) + 'px');
    stampPic.style.setProperty('--fy', (R * Math.sin(a)).toFixed(1) + 'px');
    stampPic.style.setProperty('--frot', (26 * (1 - t)).toFixed(2) + 'deg');
    stampPic.style.setProperty('--fs', (.3 + .7 * t).toFixed(3));
    stampPic.style.setProperty('--ol', p > 0 ? '1' : '0');
    stampPic.style.setProperty('--ink', Math.max(0, Math.min(1, (p - .72) / .28)).toFixed(3));
    if(p >= .72) stampPic.classList.add('landed'); else if(p < .66) stampPic.classList.remove('landed');
  }
  function onScroll(){ if(ticking) return; ticking = true; requestAnimationFrame(function(){ ticking = false; if(flying){ chapUpdate(); ctaUpdate(); return; } sceneUpdate(); chapUpdate(); ctaUpdate(); pinUpdate(); soloUpdate(); wipeUpdate(); seqUpdate(); srUpdate(); fpUpdate(); stampUpdate(); if(window.__tailUpdate) window.__tailUpdate(); }); }
  window.addEventListener('scroll', onScroll, {passive:true}); window.addEventListener('resize', onScroll); onScroll();
  setTimeout(onScroll, 300);

  var flying = false, flyRaf = 0, snapping = false;

  var CHAPS = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5pin', 'ch6', 'ch7'];
  var CHAP_OF = {top:0, message:0, contents:0, ch1pin:1, bridge:1, ch1:1, ch2:2, ch3:3, ch4:4, ch5pin:5, ch5:5, ch5map:5, ch5trip:5, ch5intern:5, ch6:6, ch7:7, works:8, ch7b:8, ch7c:8, contact:9};
  function chapAt(y){
    var secs = document.querySelectorAll('section[id]'), mid = y + window.innerHeight / 2, best = 0;
    for(var i = 0; i < secs.length; i++){ var top = secs[i].getBoundingClientRect().top + window.scrollY; if(top <= mid && CHAP_OF[secs[i].id] !== undefined) best = CHAP_OF[secs[i].id]; }
    return best;
  }
  var hud = null, hudT = 0, hudTick = 0;
  function hudEl(){
    if(hud) hud.style.display = '';
    if(!hud){ hud = document.createElement('div'); hud.id = 'skiphud'; hud.setAttribute('aria-hidden', 'true');
      hud.innerHTML = '<div class="tri"><i></i><i></i></div><div class="tx"><b></b><span></span></div>'; document.body.appendChild(hud); }
    return hud;
  }
  var CHAP_YEAR = [2001, 2001, 2008, 2011, 2020, 2022, 2024, 2026, 2026, 2026];
  function skipHud(d, y0, y1){
    if(!d) return;
    var n = Math.abs((CHAP_YEAR[y1] || 2026) - (CHAP_YEAR[y0] || 2001));
    if(!n) return;
    var h = hudEl(), en = (typeof curLang !== 'undefined' && curLang === 'en');
    clearTimeout(hudT); clearInterval(hudTick);
    h.classList.remove('jump'); h.classList.toggle('back', d < 0);
    h.querySelector('b').textContent = n + (en ? (n === 1 ? ' YEAR' : ' YEARS') : '年');
    h.querySelector('span').textContent = d > 0 ? (en ? 'FAST-FORWARD' : '早送り') : (en ? 'REWIND' : '巻き戻し');
    h.classList.remove('on'); void h.offsetWidth; h.classList.add('on');
    clearTimeout(skipHud.safe); skipHud.safe = setTimeout(function(){ if(window.__skipHudOff) window.__skipHudOff(); }, 5200);
  }

  function jumpHud(fromY, toY, onDone){
    var h = hudEl(), en = (typeof curLang !== 'undefined' && curLang === 'en'), back = toY < fromY;
    var fi = Math.max(0, Math.min(6, chapAt(fromY) - 1)), ti = Math.max(0, Math.min(6, chapAt(toY) - 1));
    var years = [], i = fi;
    while(true){ var sec = document.getElementById(CHAPS[i]); years.push(sec ? (sec.getAttribute('data-year') || '') : ''); if(i === ti) break; i += back ? -1 : 1; }
    clearTimeout(hudT); clearInterval(hudTick);
    h.classList.add('jump'); h.classList.toggle('back', back);
    var b = h.querySelector('b'); b.textContent = years[0];
    h.querySelector('span').textContent = back ? (en ? 'REWIND TO THE TOP' : '先頭へ巻き戻し') : (en ? 'FORWARD TO THE END' : '末尾へ早送り');
    h.classList.remove('on'); void h.offsetWidth; h.classList.add('on');
    var k = 0, step = 110;
    hudTick = setInterval(function(){ k++; if(k < years.length){ b.textContent = years[k]; } else { clearInterval(hudTick); if(onDone) onDone(); } }, step);
    return years.length * step;
  }
  document.querySelectorAll('#sr a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); skipTo(a.getAttribute('href')); }); });
  window.__skipHudOff = function(){ if(hud){ clearTimeout(hudT); hudT = setTimeout(function(){ hud.classList.remove('on'); setTimeout(function(){ if(!hud.classList.contains('on')) hud.style.display = 'none'; }, 320); }, 240); } };
  function skipTo(id){
    var el = id && document.querySelector(id); if(!el) return false;
    var y = el.getBoundingClientRect().top + window.scrollY;
    var c0 = chapAt(window.scrollY), c1 = chapAt(y);
    skipHud(c1 - c0, c0, c1);
    return flyToEl(id);
  }

  var hwStillOn = null;
  function hwStill(still){
    var im = document.getElementById('hwv'); if(!im) return;
    var anim = im.getAttribute('data-src'), poster = im.getAttribute('data-poster');
    if(!anim || !poster || !im.getAttribute('src')) return;
    if(hwStillOn === still) return; hwStillOn = still;
    im.setAttribute('src', still ? poster : anim);
  }
  (function(){ var sec = document.getElementById('message'); if(!sec || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) hwStill(true); }); }, {threshold:0}).observe(sec); })();

  (function(){
    function opening(){ return body.classList.contains('opening') || !!document.getElementById('ld'); }
    function held(){ return opening() || !!(window.__hwLock && window.__hwLock()); }
    window.addEventListener('touchmove', function(e){ if(held() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('wheel', function(e){ if(held() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('keydown', function(e){ if(held() && /^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End| |Spacebar)$/.test(e.key)) e.preventDefault(); });
  })();

  var tintEl = document.createElement('div'); tintEl.id = 'tint'; tintEl.setAttribute('aria-hidden', 'true'); document.body.appendChild(tintEl);
  window.__retint = function(){ tintEl.style.display = 'none'; requestAnimationFrame(function(){ requestAnimationFrame(function(){ tintEl.style.display = ''; }); }); };
  function cpRelayout(){

    if(!document.documentElement.classList.contains('cpopen')) return;
    var c = document.getElementById('cpage'); if(!c) return;
    c.style.display = 'none'; void c.offsetWidth; c.style.display = '';
  }
  function cpRelayoutSoon(){ cpRelayout(); clearTimeout(cpRelayoutSoon.t1); clearTimeout(cpRelayoutSoon.t2); cpRelayoutSoon.t1 = setTimeout(cpRelayout, 180); cpRelayoutSoon.t2 = setTimeout(cpRelayout, 520); }
  window.addEventListener('resize', cpRelayoutSoon, {passive:true});
  window.addEventListener('orientationchange', cpRelayoutSoon, {passive:true});
  if(window.visualViewport && window.visualViewport.addEventListener) window.visualViewport.addEventListener('resize', cpRelayoutSoon, {passive:true});
  window.__setTheme = function(c){ var m = document.getElementById('themec'); if(!m){ m = document.createElement('meta'); m.name = 'theme-color'; m.id = 'themec'; document.head.appendChild(m); } if(c && m.getAttribute('content') !== c) m.setAttribute('content', c); };
  var jcur = null;
  function curtainJump(y, done, rew){
    if(!jcur){ jcur = document.createElement('div'); jcur.className = 'jcur'; jcur.setAttribute('aria-hidden', 'true'); jcur.style.display = 'none'; document.body.appendChild(jcur); }
    clearTimeout(curtainJump.t1); clearTimeout(curtainJump.t2);
    jcur.style.display = 'block'; void jcur.offsetWidth; jcur.classList.add('on');
    var hold = rew ? jumpHud(window.scrollY, y) + 140 : 640;
    curtainJump.t1 = setTimeout(function(){
      window.scrollTo({top: y, behavior: 'instant'});
      done();

      function nudge(){ var sy = window.scrollY; window.scrollTo({top: sy + 1, behavior: 'instant'}); requestAnimationFrame(function(){ window.scrollTo({top: sy, behavior: 'instant'}); }); }
      setTimeout(nudge, 140);
      curtainJump.t2 = setTimeout(function(){ jcur.classList.remove('on'); if(window.__skipHudOff) window.__skipHudOff(); setTimeout(nudge, 420); setTimeout(function(){ jcur.style.display = 'none'; if(window.__retint) window.__retint(); }, 340); }, Math.max(260, hold - 320));
    }, 320);
  }
  function flyTo(y, rew){
    y = Math.max(0, Math.round(y)); var start = window.scrollY, dist = y - start;
    if(Math.abs(dist) < 2){ if(window.__skipHudOff) window.__skipHudOff(); return; }
    if(reduce){ window.scrollTo({top:y, behavior:'instant'}); if(window.__skipHudOff) window.__skipHudOff(); return; }
    cancelAnimationFrame(flyRaf);

    var dur = rew ? Math.max(900, Math.min(2400, 620 + Math.abs(dist) / 7)) : Math.max(650, Math.min(1400, 450 + Math.abs(dist) / 10)), t0 = performance.now();
    flying = true; flyT0 = performance.now(); document.documentElement.classList.add('flying');
    if(rew){ document.documentElement.classList.add('rewind'); document.documentElement.classList.toggle('fwd', dist > 0); }
    function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function easeRew(t){ return 1 - Math.pow(1 - t, 2.3); }
    function land(){ flying = false; snapping = false; document.documentElement.classList.remove('flying'); document.documentElement.classList.remove('rewind'); document.documentElement.classList.remove('fwd'); ticking = false; onScroll(); if(!(jcur && jcur.classList.contains('on')) && window.__skipHudOff) window.__skipHudOff(); }

    if(document.documentElement.classList.contains('handheld') && (rew || Math.abs(dist) > innerHeight * 3)){ curtainJump(y, land, rew); return; }
    clearTimeout(flyTo.safe); flyTo.safe = setTimeout(function(){
      if(flying) return; var HH = document.documentElement;
      if(HH.classList.contains('rewind') || HH.classList.contains('fwd') || HH.classList.contains('flying')){
        HH.classList.remove('flying', 'rewind', 'fwd'); if(window.__skipHudOff) window.__skipHudOff(); onScroll(); }
    }, dur + 900);
    (function step(now){
      if(!flying) return;
      var k = Math.min(1, (now - t0) / dur);
      var lim = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      var yy = Math.min(lim, start + dist * (rew ? easeRew(k) : ease(k)));
      window.scrollTo({top: yy, behavior:'instant'});
      if(k < 1) flyRaf = requestAnimationFrame(step); else land();
    })(t0);
  }
  (function(){
    var r = document.createElement('div'); r.className = 'rew'; r.setAttribute('aria-hidden', 'true');
    r.innerHTML = '<i class="bands"></i><span class="mk"></span>';
    var mk = r.querySelector('.mk');
    new MutationObserver(function(){ mk.textContent = document.documentElement.classList.contains('fwd') ? '\u25b6\u25b6 FORWARD' : '\u25c0\u25c0 REWIND'; }).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
    document.body.appendChild(r);
  })();

  (function(){
    if(reduce || !fine) return;
    var target = window.scrollY, cur = target, active = false, raf = 0;
    function limit(){ return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }

    var seams = [], snapLock = 0;
    function seamScan(){
      seams = [];

      Array.prototype.forEach.call(document.querySelectorAll('.pin, .solopin, #seq'), function(el){
        var top = el.getBoundingClientRect().top + window.scrollY, h = el.offsetHeight, v = window.innerHeight;
        seams.push(top); if(h > v + 8) seams.push(top + h - v);
      });
    }
    seamScan(); window.addEventListener('resize', seamScan, {passive:true});
    function damp(y){
      var D = 380, k = 1;
      for(var i = 0; i < seams.length; i++){
        var d = Math.abs(seams[i] - y);

        if(d < D){ var q = d / D, s = 1 - .74 * Math.pow(1 - q, 3); if(s < k) k = s; }
      }
      return k;
    }
    function busy(){
      var h = document.documentElement;
      return flying || h.classList.contains('cpopen') || body.classList.contains('menuopen') || h.classList.contains('lbopen') || body.classList.contains('opening');
    }
    function loop(){
      cur += (target - cur) * .13 * damp(cur);
      if(Math.abs(target - cur) < 1.2){ cur = target; active = false; raf = 0; window.scrollTo({top:Math.round(cur), behavior:'instant'}); if(window.__annoSync) window.__annoSync(); return; }
      window.scrollTo({top:Math.round(cur), behavior:'instant'}); if(window.__annoSync) window.__annoSync();
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('wheel', function(e){
      if(e.ctrlKey) return;
      if(e.target && e.target.closest && e.target.closest('#gm')) return;
      var sc = e.target && e.target.closest ? e.target.closest('.menu, .cpage, #lb, .cp-sheet') : null;
      if(sc){
        var up = sc.scrollTop > 1, dn = sc.scrollTop + sc.clientHeight < sc.scrollHeight - 1;
        if((e.deltaY < 0 && !up) || (e.deltaY > 0 && !dn)) e.preventDefault();
        return;
      }
      if(busy()){ if(!flying) e.preventDefault(); return; }
      e.preventDefault();

      if(false && window.__msgStops){
        var nowT = performance.now();
        if(snapping && flying){ snapLock = nowT + 420; return; }
        if(nowT < snapLock){ snapLock = nowT + 260; return; }
        var ty = window.__msgStops(e.deltaY > 0 ? 1 : -1);
        if(ty !== null){ snapLock = nowT + 780; snapping = true; flyTo(ty); return; }
      }
      var d = e.deltaY * (e.deltaMode === 1 ? 34 : e.deltaMode === 2 ? window.innerHeight : 1);
      target = Math.max(0, Math.min(limit(), (active ? target : window.scrollY) + d));
      if(!active){ active = true; cur = window.scrollY; seamScan(); raf = requestAnimationFrame(loop); }
    }, {passive:false});

    window.addEventListener('scroll', function(){ if(!active) { target = cur = window.scrollY; } }, {passive:true});
    window.addEventListener('keydown', function(){ if(active){ active = false; cancelAnimationFrame(raf); raf = 0; } }, {passive:true});
  })();
  var flyT0 = 0;
  function flyStop(e){ if(!flying || snapping) return;

    if(e && e.type === 'wheel'){
      if(performance.now() - flyT0 < 420) return;
      if(Math.abs(e.deltaY || 0) < 8 && Math.abs(e.deltaX || 0) < 8) return;
    }
    cancelAnimationFrame(flyRaf); flying = false;

    document.documentElement.classList.remove('flying', 'rewind', 'fwd'); ticking = false; onScroll(); if(window.__skipHudOff) window.__skipHudOff(); }
  ['wheel', 'touchstart', 'keydown'].forEach(function(ev){ window.addEventListener(ev, flyStop, {passive:true}); });

  function flyToEl(id, rew){ var el = id && document.querySelector(id); if(!el) return false; flyTo(el.getBoundingClientRect().top + window.scrollY, rew); return true; }
  document.querySelectorAll('.brand, .cta-fx, #top .toc a, footer a:not(#ftcta)').forEach(function(a){ a.addEventListener('click', function(e){ var h = a.getAttribute('href'); if(!h || h.charAt(0) !== '#') return; e.preventDefault(); var rew = a.classList.contains('cta-fx') || a.classList.contains('brand');
    if(body.classList.contains('menuopen') && typeof setMenu === 'function') setMenu(false);
    if(h === '#top' || h === '#' || (a.classList.contains('cta-fx') && body.classList.contains('atend'))){ flyTo(0, rew); } else if(a.closest('#top .toc')){ if(!skipTo(h)) flyTo(0, rew); }    else if(!flyToEl(h, rew)) flyTo(0, rew); }); });

  var PIC = 'img, svg, video, figure, picture, .wkf, .lb, #lb';
  document.addEventListener('contextmenu', function(e){ if(e.target.closest && e.target.closest(PIC)) e.preventDefault(); });
  document.addEventListener('dragstart', function(e){ if(e.target.closest && e.target.closest(PIC)) e.preventDefault(); });

  (function(){
    var vv = window.visualViewport; if(!vv) return;
    var H = document.documentElement, t, was = 1;
    function sc(){ return vv.scale || 1; }
    function pass(){
      var z = sc() > 1.01;
      H.classList.toggle('vzoom', z);
      if(z){ was = sc(); return; }
      if(was <= 1.01) return;
      was = 1;
      window.dispatchEvent(new Event('resize'));
      setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 280);
    }
    function soon(){ clearTimeout(t); t = setTimeout(pass, 170); }
    vv.addEventListener('resize', soon, {passive:true});
    vv.addEventListener('scroll', soon, {passive:true});
  })();

  (function(){
    var hd = document.querySelector('.hd');
    function hdh(){ if(hd) document.documentElement.style.setProperty('--hdh', hd.offsetHeight + 'px'); }
    hdh(); window.addEventListener('resize', hdh, {passive:true});
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(hdh);
  })();

  (function(){
    var sec = document.getElementById('message'); if(!sec) return;
    var all = Array.prototype.slice.call(sec.querySelectorAll('.pg [data-at]')), seen = {}, items = [];
    all.sort(function(a, b){ return parseFloat(a.getAttribute('data-at')) - parseFloat(b.getAttribute('data-at')); });
    all.forEach(function(el){ var k = el.getAttribute('data-at'); if(!seen[k]){ seen[k] = 1; items.push(el); } });
    if(items.length < 2) return;

    window.__msgStops = function(dir){
      var r = sec.getBoundingClientRect(), run = sec.offsetHeight - vh();
      if(run <= 0 || !(r.top <= 0 && r.bottom >= vh())) return null;
      var p = Math.max(0, Math.min(1, (-r.top) / run)), i;
      var ats = items.map(function(el){ return parseFloat(el.getAttribute('data-at')) || 0; });
      if(dir > 0){ for(i = 0; i < ats.length; i++){ if(ats[i] > p + .006) break; } if(i >= ats.length) return null; }
      else { for(i = ats.length - 1; i >= 0; i--){ if(ats[i] < p - .006) break; } if(i < 0) return null; }
      return r.top + window.scrollY + run * ats[i] + 6;
    };
    var nav = document.createElement('nav'); nav.className = 'remain'; nav.setAttribute('aria-label', 'このページの目次');
    items.forEach(function(el, i){

      var d = document.createElement('button'); d.type = 'button'; d.className = 'i';
      var t = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 24);
      d.setAttribute('aria-label', (i + 1) + '. ' + t);
      d.addEventListener('click', function(){
        var at = parseFloat(el.getAttribute('data-at')) || 0;
        var y = sec.getBoundingClientRect().top + window.scrollY + (sec.offsetHeight - vh()) * at + 6;
        if(typeof flyTo === 'function') flyTo(y); else window.scrollTo({top:y, behavior:'smooth'});
      });
      nav.appendChild(d);
    });
    body.appendChild(nav);
    var dots = nav.querySelectorAll('.i');
    window.__tailUpdate = function(){
      var H = vh(), r = sec.getBoundingClientRect(), here = r.top <= 0 && r.bottom >= H;
      var p = Math.max(0, Math.min(1, (-r.top) / Math.max(1, sec.offsetHeight - H))), cur = -1;
      items.forEach(function(el, i){ if(p >= parseFloat(el.getAttribute('data-at'))) cur = i; });
      nav.classList.toggle('on', here && cur >= 0 && (!!window.__hwDone || cur >= 1));
      if(!here) return;
      dots.forEach(function(d, i){ d.classList.toggle('now', i === cur); d.classList.toggle('past', i < cur); });
    };
  })();

  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  var menuCloseT;
  var menuShownT = null;

  var curSecId = '';
  function menuFlag(){
    menu.querySelectorAll('.here').forEach(function(e){ e.classList.remove('here'); });

    var here = '', line = vh() * .45; for(var i = 0; i < hdSecs.length; i++){ if(hdSecs[i].getBoundingClientRect().top <= line) here = hdSecs[i].id; else break; }
    var id = /^ch5/.test(here) ? 'ch5' : here, sel = {message:'.mmsg .kslot', ch1:'#mseals li:nth-child(1) .slot', ch2:'#mseals li:nth-child(2) .slot', ch3:'#mseals li:nth-child(3) .slot', ch4:'#mseals li:nth-child(4) .slot', ch5:'#mseals li:nth-child(5) .slot', ch6:'#mseals li:nth-child(6) .slot', ch7:'#mseals li:nth-child(7) .slot', works:'#mlinks a[href="#works"] .kslot', contact:'#mlinks a[href="#contact"] .kslot'}[id];
    menu.querySelectorAll('.flag').forEach(function(f){ f.remove(); });
    var el = sel && menu.querySelector(sel); if(el){ el.classList.add('here'); el.appendChild(flagSvg()); }
  }

  function flagSvg(){
    stampSvg.n = (stampSvg.n || 0) + 1; var id = 'flagf' + stampSvg.n, sv = svgEl('svg', {class:'flag', viewBox:'0 0 32 42'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-25%" y="-20%" width="150%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="11" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -.45" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>' +
      '<g filter="url(#' + id + ')"><line x1="6.5" y1="4" x2="6.5" y2="39" stroke="var(--fg)" stroke-width="2.6" stroke-linecap="round"/><circle cx="6.5" cy="39" r="2.4" fill="var(--fg)"/>' +
      '<g><polygon points="7.5,5 28,12 7.5,19.5" fill="var(--acc)"/><animateTransform attributeName="transform" type="skewY" values="0;-5;0;4;0" dur="2.6s" repeatCount="indefinite" additive="sum"/></g></g>';
    return sv;
  }
  function menuLine(){
    var ul = document.querySelector('.menu .mseals'), sl = ul && ul.querySelector('.slot'); if(!ul || !sl) return;
    var r = ul.getBoundingClientRect(), b = sl.getBoundingClientRect(); if(!b.height) return;
    ul.style.setProperty('--mline', (b.top - r.top + b.height / 2).toFixed(1) + 'px');
  }
  window.addEventListener('resize', function(){ clearTimeout(menuLine.t); menuLine.t = setTimeout(menuLine, 200); }, {passive:true});
  function setMenu(open){

    menu.style.height = window.innerHeight + 'px';
    if(!setMenu.grow){ setMenu.grow = function(){ var h = parseFloat(menu.style.height) || 0; if(h && window.innerHeight > h) menu.style.height = window.innerHeight + 'px'; }; }
    window.addEventListener('resize', setMenu.grow, {passive:true});
    clearTimeout(setMenu.ht); setMenu.ht = setTimeout(function(){ menu.style.height = ''; window.removeEventListener('resize', setMenu.grow); }, open ? 1500 : 950);
    if(!open && menu.classList.contains('open')){

      var cp = getComputedStyle(menu).clipPath;
      if(cp && cp !== 'none'){ menu.style.clipPath = cp; menu.classList.remove('open'); void menu.offsetWidth; menu.style.clipPath = ''; }
    }

    if(open) requestAnimationFrame(function(){ menuFlag(); menuLine(); setTimeout(menuLine, 240); });
    menu.classList.toggle('open', open); burger.classList.toggle('open', open); body.classList.toggle('menuopen', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.setAttribute('aria-hidden', open ? 'false' : 'true');

    clearTimeout(menuShownT); if(open) menu.classList.add('shown'); else menuShownT = setTimeout(function(){ menu.classList.remove('shown'); }, 850);
    clearTimeout(menuCloseT); if(!open){ body.classList.add('menuclosing'); menuCloseT = setTimeout(function(){ body.classList.remove('menuclosing'); }, 900); } else body.classList.remove('menuclosing'); }
  burger.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });

  menu.addEventListener('click', function(e){ if(!e.target.closest('a, button, input, textarea, [role="group"]')) setMenu(false); });

  var mgrid = document.querySelector('.mgrid'); if(mgrid) mgrid.addEventListener('click', function(){ var g = document.getElementById('gridbtn'); if(g) g.click(); });

  (function(){
    var vp = document.querySelector('meta[name="viewport"]'), btn = document.getElementById('mdesk');
    if(!vp || !btn) return;
    var RESP = 'width=device-width,initial-scale=1', DESK = 'width=1440';
    function apply(on){
      document.documentElement.classList.toggle('deskview', on);
      vp.setAttribute('content', on ? DESK : RESP);
      try{ localStorage.setItem('kosaka-deskview', on ? '1' : '0'); }catch(e){}
      setTimeout(function(){ if(window.__wkTryFit) window.__wkTryFit(); soloReset(); msgFitDone = false; onScroll(); }, 260);
    }
    try{ if(localStorage.getItem('kosaka-deskview') === '1') apply(true); }catch(e){}
    btn.addEventListener('click', function(){ apply(!document.documentElement.classList.contains('deskview')); });
  })();
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); var id = a.getAttribute('href'); setMenu(false); if(a.classList.contains('mcontact')){

        if(document.documentElement.classList.contains('gmopen') && window.__gmClose){ window.__gmClose(); setTimeout(cpOpen, 820); }
        else setTimeout(cpOpen, 420);
        return; } if(a.classList.contains('mgame')){ setTimeout(function(){ if(window.__gmOpen) window.__gmOpen(); }, 420); return; }    setTimeout(function(){ skipTo(id); }, 350); }); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

  document.getElementById('gridbtn').addEventListener('click', function(){ document.documentElement.classList.toggle('grid'); togFit(); });
  var curbtn = document.getElementById('curbtn'); if(curbtn) curbtn.addEventListener('click', function(){ body.classList.toggle('nocur'); togFit(); });
  var mkbtn = document.getElementById('mkbtn'); if(mkbtn) mkbtn.addEventListener('click', function(){ var h = document.documentElement; h.classList.remove('surhint'); if(h.classList.contains('cpopen')){ if(h.classList.contains('cpsur')) surStop(); else surStart(); } else h.classList.toggle('nomark'); togFit(); });

  function togFit(){
    var h = document.documentElement, cp = h.classList.contains('cpopen');
    [['gridbtn', h.classList.contains('grid') ? '.on' : '.off'], ['curbtn', body.classList.contains('nocur') ? '.off' : '.on'], ['mkbtn', cp ? (h.classList.contains('cpsur') ? '.son' : '.soff') : (h.classList.contains('nomark') ? '.off' : '.on')]].forEach(function(q){
      var b = document.getElementById(q[0]), sp = b && b.querySelector(q[1]); if(!sp) return;
      var w = sp.getBoundingClientRect().width; if(w > 0) b.style.width = w.toFixed(2) + 'px';
    });
  }
  togFit(); window.addEventListener('load', togFit); if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(togFit, 50); }); window.addEventListener('resize', function(){ togFit(); });

  var surLayer = null, surPieces = [], surRaf = 0, surT = 0, surOld = null, surKind = '', surLast = '', surMX = -1e4, surMY = -1e4, surMT = 0, surSealT = 0, surEnd = null;
  var SUR_KINDS = ['fall', 'float', 'flee', 'swirl', 'seals', 'burst', '3d'];
  window.addEventListener('mousemove', function(e){ surMX = e.clientX; surMY = e.clientY; surMT = performance.now(); }, {passive:true});
  function surPick(){ var opts = SUR_KINDS.filter(function(k){ return k !== surLast; }); var k = opts[Math.floor(Math.random() * opts.length)]; surLast = k; return k; }
  function surOpacity(el){ var o = 1, root = document.getElementById('cpage'); while(el && el !== root){ var v = parseFloat(getComputedStyle(el).opacity); if(!isNaN(v)) o *= v; el = el.parentElement; } return o; }
  function surCollect(){
    var root = document.querySelector('#cpage .cp-in'), out = [], H = window.innerHeight; if(!root) return out;
    var rng = document.createRange(), tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode:function(n){
      if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT; var p = n.parentElement; if(!p || p.closest('input, textarea, button, [hidden], script, style, svg')) return NodeFilter.FILTER_REJECT;
      var cs = getComputedStyle(p); if(cs.display === 'none' || cs.visibility === 'hidden') return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_ACCEPT; }}), n;
    while((n = tw.nextNode())){
      var p = n.parentElement, cs = getComputedStyle(p), txt = n.nodeValue, op = surOpacity(p), role = p.closest('.cp-ttl') ? 'ttl' : (p.closest('.cp-lead') ? 'lead' : (p.closest('label') ? 'lab' : (p.closest('.cp-note') ? 'note' : 'txt')));
      for(var i = 0; i < txt.length; i++){
        var c = txt.charAt(i); if(!c.trim()) continue;
        rng.setStart(n, i); rng.setEnd(n, i + 1); var r = rng.getBoundingClientRect(); if(!r.width || !r.height || r.top > H - 12) continue;
        out.push({kind:'ch', node:n, i:i, text:c, r:r, cs:cs, op:op, role:role});
      }
    }
    root.querySelectorAll('input, textarea, button').forEach(function(el){ if(el.closest('[hidden]') || !el.offsetParent || el.classList.contains('cp-hp')) return; var r = el.getBoundingClientRect(); if(!r.width || !r.height || r.top > H - 12 || r.right < 0 || r.left > window.innerWidth) return;    out.push({kind:'ctl', el:el, r:r, role:el.tagName === 'BUTTON' ? 'btn' : 'field'}); });
    return out;
  }
  function surMake(p){
    var s;
    if(p.kind === 'ch'){
      s = document.createElement('span'); s.className = 'surp'; s.textContent = p.text; var cs = p.cs;
      s.style.cssText = 'font-family:' + cs.fontFamily + ';font-size:' + cs.fontSize + ';font-weight:' + cs.fontWeight + ';font-style:' + cs.fontStyle + ';letter-spacing:' + cs.letterSpacing + ';color:' + cs.color + ';text-transform:' + cs.textTransform + ';font-feature-settings:' + cs.fontFeatureSettings + ';text-decoration:' + cs.textDecorationLine + ';opacity:' + p.op + ';line-height:' + p.r.height + 'px';
    } else {
      var el = p.el, c = el.cloneNode(true); c.removeAttribute('id'); c.tabIndex = -1; c.setAttribute('aria-hidden', 'true');
      if(el.tagName === 'BUTTON'){ s = c; s.classList.add('surp'); }
      else if(el.type === 'checkbox'){ s = document.createElement('span'); s.className = 'surp cp-hide'; c.checked = el.checked; s.appendChild(c); }
      else { s = document.createElement('span'); s.className = 'surp cp-form'; c.value = el.value; s.appendChild(c); }
    }
    s.style.left = p.r.left + 'px'; s.style.top = p.r.top + 'px'; s.style.width = p.r.width + 'px'; s.style.height = p.r.height + 'px';
    return s;
  }
  function surTransform(p){ return 'translate(' + (p.x - p.r.left).toFixed(1) + 'px,' + (p.y - p.r.top).toFixed(1) + 'px) rotate(' + p.a.toFixed(1) + 'deg)'; }

  function surSealList(){
    var list = srItems.slice(0, 7).map(function(li, i){ return {li:li, i:i}; });
    var mk = function(en, place, year, ring){ var li = document.createElement('li'); li.setAttribute('data-en', en); li.setAttribute('data-place', place); li.setAttribute('data-year', year); li.setAttribute('data-ring', ring); return li; };
    list.push({li:mk('MAKE WITH AI', 'AI', '2026', 'MAKE WITH AI · THE CHOICE IS MINE · 2026 · KOSAKA'), i:7});
    list.push({li:mk('MAKING', '制作', '2020–26', 'HOW I MAKE · TRY, FAIL, REPEAT · 2020 → 2026 · KOSAKA SHUZO'), i:8});
    list.push({li:mk('CONTACT', '連絡', '2026', 'CONTACT · WRITE TO ME · KOSAKA SHUZO · 2026'), i:9});
    list.push({li:mk('ALL OF ME', 'ジブンの|ゼンブを', '2026', 'JIBUN NO ZENBU WO · ALL OF ME · KOSAKA SHUZO · 2026'), i:10});
    return list;
  }

  var sealBmp = {}, sealNoise = null;
  function inkNoise(){
    if(sealNoise) return sealNoise;
    var c = document.createElement('canvas'), S = 128; c.width = c.height = S;
    var g = c.getContext('2d'), im = g.createImageData(S, S), d = im.data;
    for(var i = 0; i < S * S; i++){
      var v = Math.random(), a = v < .62 ? 0 : Math.min(255, (v - .62) / .38 * 300);
      d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = 0; d[i * 4 + 3] = a;
    }
    g.putImageData(im, 0, 0); sealNoise = c; return c;
  }
  function sealBitmap(spec, px){
    var key = spec.i + ':' + px + ':' + curLang;
    if(sealBmp[key]) return sealBmp[key];
    var cs = getComputedStyle(document.documentElement);
    var acc = (cs.getPropertyValue('--acc') || '#E84518').trim(), mono = (cs.getPropertyValue('--mono') || 'monospace').trim(), sans = (cs.getPropertyValue('--sans') || 'sans-serif').trim();
    var c = document.createElement('canvas'); c.width = c.height = px;
    var g = c.getContext('2d'), k = px / 156;
    g.scale(k, k); g.translate(78, 78);
    g.strokeStyle = acc; g.fillStyle = acc; g.lineJoin = 'round';
    g.lineWidth = 3.4; g.beginPath(); g.arc(0, 0, 70, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 1.4; g.beginPath(); g.arc(0, 0, 46, 0, Math.PI * 2); g.stroke();
    var li = spec.li, en = li.getAttribute('data-en') || '', num = ('0' + (spec.i + 1)).slice(-2);
    var year = (li.getAttribute('data-year') || ((li.querySelector('.y') || {}).textContent || '')).replace('?', '');
    var ring = li.getAttribute('data-ring') || ('CHECKPOINT ' + num + ' \u00b7 ' + en + ' \u00b7 ' + year + ' \u00b7 KOSAKA');
    g.font = '500 9.6px ' + mono; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    var R = 57, th = -Math.PI / 2 + .06;
    for(var i = 0; i < ring.length; i++){
      var ch = ring.charAt(i), w = g.measureText(ch).width + 2;
      th += (w / 2) / R;
      g.save(); g.rotate(th); g.translate(0, -R); g.fillText(ch, 0, 0); g.restore();
      th += (w / 2) / R;
    }
    var placeJa = li.getAttribute('data-place') || '', place = ((curLang === 'en' && PLACE_EN[placeJa]) ? PLACE_EN[placeJa] : placeJa).split('|');
    if(place.length > 1){
      g.font = '700 ' + (curLang === 'en' ? 14 : 17) + 'px ' + sans;
      g.fillText(place[0], 0, -6); g.fillText(place[1], 0, 14);
    } else {
      g.font = '700 ' + (curLang === 'en' ? (place[0].length > 6 ? 15 : 19) : (place[0].length > 3 ? 20 : 26)) + 'px ' + sans;
      g.fillText(place[0], 0, 9);
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = 'destination-out';
    var nz = inkNoise(), off = (spec.i * 37) % 128;
    for(var yy = -off; yy < px; yy += 128) for(var xx = -off; xx < px; xx += 128) g.drawImage(nz, xx, yy, 128, 128);
    g.globalCompositeOperation = 'source-over';
    sealBmp[key] = c; return c;
  }
  function surSeals(layer, W, H, top){
    var dpr = Math.min(2, window.devicePixelRatio || 1), cvs = [];
    for(var q = 0; q < 2; q++){
      var c = document.createElement('canvas'); c.className = 'stmc';
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      c.style.width = W + 'px'; c.style.height = H + 'px';
      layer.appendChild(c); cvs.push(c.getContext('2d')); cvs[q].scale(dpr, dpr);
    }
    var bg = cvs[0], lg = cvs[1]; bg.globalCompositeOperation = 'multiply';
    var list = surSealList(), n = 0, N = 96, gap = 380;
    function put(g, spec, x, y, size, rot, alpha, scale){
      var bmp = sealBitmap(spec, 240);
      g.save(); g.globalAlpha = alpha; g.translate(x + size / 2, y + size / 2); g.rotate(rot); g.scale(scale, scale);
      g.drawImage(bmp, -size / 2, -size / 2, size, size); g.restore();
    }
    function press(){
      if(surLayer !== layer) return;
      var spec = list[Math.floor(Math.random() * list.length)], size = 76 + Math.random() * 104;
      var x = 10 + Math.random() * Math.max(10, W - size - 20), y = top + 6 + Math.random() * Math.max(10, H - top - size - 12);
      var rot = (Math.random() - .5) * .78, t0 = performance.now(), DUR = 170;
      (function land(now){
        if(surLayer !== layer) return;
        var p = Math.min(1, ((now || performance.now()) - t0) / DUR), e = 1 - Math.pow(1 - p, 3);
        lg.clearRect(0, 0, W, H);
        if(p < 1){ put(lg, spec, x, y, size, rot, .5 + .38 * e, 1.45 - .45 * e); requestAnimationFrame(land); }
        else put(bg, spec, x, y, size, rot, .88, 1);
      })(t0);
      n++; if(n < N){ gap = Math.max(62, gap * .93); surSealT = setTimeout(press, gap); }
    }
    surSealT = setTimeout(press, 240);
  }

  function sur3d(layer, pieces, W, H, top){
    var stage = document.createElement('div'); stage.className = 's3d'; var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    pieces.forEach(function(p){ x0 = Math.min(x0, p.r.left); y0 = Math.min(y0, p.r.top); x1 = Math.max(x1, p.r.right); y1 = Math.max(y1, p.r.bottom); });
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, paper = [242, 242, 238];
    layer.style.perspectiveOrigin = cx.toFixed(0) + 'px ' + cy.toFixed(0) + 'px'; stage.style.transformOrigin = cx.toFixed(0) + 'px ' + cy.toFixed(0) + 'px';
    var mixc = function(c, k){ var m = /(\d+)\D+(\d+)\D+(\d+)/.exec(c); if(!m) return c; return 'rgb(' + [1, 2, 3].map(function(i){ return Math.round(parseInt(m[i], 10) * (1 - k) + paper[i - 1] * k); }).join(',') + ')'; };
    pieces.forEach(function(p, i){
      var z = {ttl:190, btn:90, lead:70, lab:42, field:22, note:0, txt:30}[p.role] || 0; if(p.role === 'ttl') z += (i % 5) * 9;
      p.z = z; p.s.style.transform = 'translateZ(0)'; p.s.style.transition = 'transform .9s cubic-bezier(.2,.8,.2,1) ' + (Math.random() * 500).toFixed(0) + 'ms';
      if(p.kind === 'ch'){
        var px = parseFloat(p.cs.fontSize), E = p.role === 'ttl' ? Math.min(30, px * .62) : Math.min(6, px * .3), K = Math.ceil(E / 2), side = mixc(p.cs.color, p.role === 'ttl' ? .3 : .45), face = p.s.textContent;
        p.s.textContent = ''; var f = document.createElement('b'); f.className = 'face'; f.textContent = face; p.s.appendChild(f);
        for(var k = 1; k <= K; k++){ var b = document.createElement('b'); b.className = 'ext'; b.textContent = face; b.style.transform = 'translateZ(' + (-k * 2) + 'px)'; b.style.color = side; p.s.appendChild(b); }
      }
      stage.appendChild(p.s);
    });
    layer.appendChild(stage); stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
    var rx = 0, ry = 0, t00 = performance.now();
    requestAnimationFrame(function(){ pieces.forEach(function(p){ p.s.style.transform = 'translateZ(' + p.z + 'px)'; }); });
    function frame(now){
      if(surLayer !== layer) return;
      var t = now - t00, live = now - surMT < 2500 && surMX > -1e3, tx, ty;
      if(live){ tx = -(surMY - cy) / H * 40; ty = (surMX - cx) / W * 50; } else { tx = 12 * Math.sin(t / 1900) + 4; ty = 18 * Math.sin(t / 2300); }
      rx += (tx - rx) * .07; ry += (ty - ry) * .07;
      stage.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      surRaf = requestAnimationFrame(frame);
    }
    surRaf = requestAnimationFrame(frame);
    surEnd = function(){
      stage.style.transition = 'transform .8s cubic-bezier(.2,.8,.2,1)'; stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
      pieces.forEach(function(p){ p.s.style.transition = 'transform .8s cubic-bezier(.2,.8,.2,1)'; p.s.style.transform = 'translateZ(0)'; }); layer.classList.add('flat');
      return 900;
    };
  }

  function surPhys(kind, layer, pieces, W, H, top){
    var M = window.Matter, eng = M.Engine.create({enableSleeping:true, positionIterations:8, velocityIterations:6}), world = eng.world, TH = 400;
    eng.gravity.y = kind === 'float' ? -.32 : (kind === 'burst' ? .7 : 1.4);
    var wall = function(x, y, w, h){ return M.Bodies.rectangle(x, y, w, h, {isStatic:true, friction:.55, restitution:0}); };
    if(kind !== 'burst'){
      M.Composite.add(world, [wall(W / 2, H - 2 + TH / 2, W * 3, TH), wall(-TH / 2, H / 2, TH, H * 6), wall(W + TH / 2, H / 2, TH, H * 6)]);
      if(kind === 'float') M.Composite.add(world, wall(W / 2, top - TH / 2, W * 3, TH));
    }
    var cx = W / 2, cy = top + (H - top) / 2, D = Math.sqrt(W * W + H * H) / 2;
    pieces.forEach(function(p){
      p.x = p.r.left; p.y = p.r.top; p.w = p.r.width; p.h = p.r.height; p.a = 0; p.rest = false; p.added = false;
      var bw = Math.max(2, p.w - 1.2), bh = Math.max(2, p.h - 1.2), oy = p.h / 2;
      if(p.role === 'field'){ bh = 6; oy = p.h - 3; p.s.style.transformOrigin = '50% ' + oy.toFixed(1) + 'px'; }
      p.oy = oy;
      p.b = M.Bodies.rectangle(p.r.left + p.w / 2, p.r.top + oy, bw, bh, {restitution:kind === 'float' ? .12 : .18, friction:.5, frictionStatic:.7, frictionAir:kind === 'float' ? .03 : .012, density:.0016, sleepThreshold:70});
      if(kind === 'fall'){ p.t0 = 100 + Math.random() * 820 + (p.kind === 'ctl' ? 260 : 0); p.v = {x:(Math.random() - .5) * 1.6, y:0}; p.av = (Math.random() - .5) * .08; }
      if(kind === 'float'){ p.t0 = Math.random() * 1500; p.v = {x:(Math.random() - .5) * .8, y:-(.3 + Math.random() * .8)}; p.av = (Math.random() - .5) * (p.kind === 'ctl' ? .01 : .04); }
      if(kind === 'burst'){ var dx = p.r.left + p.w / 2 - cx, dy = p.r.top + p.h / 2 - cy, d = Math.sqrt(dx * dx + dy * dy) || 1, sp = 14 + 26 * Math.sqrt(1 - Math.min(1, d / D)); p.t0 = 480 + d / 1.8; p.v = {x:dx / d * sp + (Math.random() - .5) * 8, y:dy / d * sp + (Math.random() - .5) * 8 - 4}; p.av = (Math.random() - .5) * .5; p.gone = false; }
    });
    if(kind === 'burst'){ var ring = document.createElement('i'); ring.className = 'sur-ring'; ring.style.left = cx + 'px'; ring.style.top = cy + 'px'; layer.appendChild(ring); setTimeout(function(){ ring.classList.add('go'); }, 460); }
    var t00 = performance.now(), last = t00, acc = 0, STEP = 1000 / 60;
    function frame(now){
      if(surLayer !== layer) return;
      var t = now - t00, dt = Math.min(50, now - last); last = now; acc += dt;
      var alive = false, n = 0;
      pieces.forEach(function(p){
        if(!p.added){
          if(t < p.t0){ alive = true; if(kind === 'burst' && t > 60){ p.s.style.transform = 'translate(' + ((Math.random() - .5) * 2.2).toFixed(1) + 'px,' + ((Math.random() - .5) * 2.2).toFixed(1) + 'px)'; } return; }
          p.added = true; M.Composite.add(world, p.b); M.Body.setVelocity(p.b, p.v); M.Body.setAngularVelocity(p.b, p.av);
        }
      });
      var steps = 0; while(acc >= STEP && steps < 4){ if(kind === 'float' && t < 7000) pieces.forEach(function(p){ if(p.added && !p.gone) M.Body.applyForce(p.b, p.b.position, {x:(Math.random() - .5) * p.b.mass * .0009, y:(Math.random() - .5) * p.b.mass * .0004}); });
        M.Engine.update(eng, STEP); acc -= STEP; steps++; }
      if(steps === 4) acc = 0;
      pieces.forEach(function(p){
        if(!p.added || p.gone) return; n++;
        var b = p.b; p.x = b.position.x - p.w / 2; p.y = b.position.y - p.oy; p.a = b.angle * 180 / Math.PI;
        p.s.style.transform = 'translate(' + (p.x - p.r.left).toFixed(1) + 'px,' + (p.y - p.r.top).toFixed(1) + 'px) rotate(' + b.angle.toFixed(3) + 'rad)';
        if(kind === 'burst' && (p.x < -W - 200 || p.x > 2 * W + 200 || p.y > H + 400 || p.y < -H - 400)){ p.gone = true; M.Composite.remove(world, b); return; }
        if(!b.isSleeping) alive = true;
      });
      if(alive && t < 22000) surRaf = requestAnimationFrame(frame); else surRaf = 0;
    }
    surRaf = requestAnimationFrame(frame);
  }
  function surStart(){
    if(surLayer || !cpage || cpage.hidden) return;
    if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; cpage.classList.remove('surhid'); }
    var kind = surPick(), W = window.innerWidth, H = window.innerHeight, hdEl = document.querySelector('.hd'), top = (hdEl ? hdEl.offsetHeight : 68) + 6;
    var layer = document.createElement('div'); layer.className = 'sur sur-' + kind; layer.setAttribute('aria-hidden', 'true'); surEnd = null;
    if(kind === 'seals'){ cpage.appendChild(layer); surLayer = layer; surPieces = []; surKind = kind; document.documentElement.classList.add('cpsur'); surSeals(layer, W, H, top); return; }
    var pieces = surCollect(); if(!pieces.length) return;
    pieces.forEach(function(p){ p.s = surMake(p); p.x = p.r.left; p.y = p.r.top; p.w = p.r.width; p.h = p.r.height; p.a = 0; if(kind !== '3d') layer.appendChild(p.s); });
    cpage.appendChild(layer); cpage.classList.add('surhid'); surLayer = layer; surPieces = pieces; surKind = kind;
    document.documentElement.classList.add('cpsur');
    if(kind === '3d'){ sur3d(layer, pieces, W, H, top); return; }
    if(window.Matter && (kind === 'fall' || kind === 'float' || kind === 'burst')){ surPhys(kind, layer, pieces, W, H, top); return; }

    var BW = 22, nb = Math.ceil(W / BW) + 1, pile = [], k, floor = H - 4, cx = W / 2, cy = top + (H - top) / 2, Rmax = Math.min(W, H - top) * .44, D = Math.sqrt(W * W + H * H) / 2;
    for(k = 0; k < nb; k++) pile.push(0);
    var bucket = function(p){ return Math.max(0, Math.min(nb - 1, Math.floor((p.x + p.w / 2) / BW))); };
    pieces.forEach(function(p){
      p.hx = p.x; p.hy = p.y; p.rest = false; p.hit = 0; p.ph = Math.random() * 6.28;
      p.vx = (Math.random() - .5) * 90; p.vy = 0; p.va = (Math.random() - .5) * 720;
      p.t0 = 100 + Math.random() * 820 + (p.kind === 'ctl' ? 260 : 0);
      if(kind === 'float'){ p.vy = -(20 + Math.random() * 40); p.vx = (Math.random() - .5) * 40; p.va = (Math.random() - .5) * (p.kind === 'ctl' ? 14 : 70); p.t0 = Math.random() * 1500; }
      if(kind === 'flee'){ p.vx = 0; p.vy = 0; p.va = 0; p.t0 = Math.random() * 500; }
      if(kind === 'swirl'){ var mx0 = p.x + p.w / 2 - cx, my0 = p.y + p.h / 2 - cy; p.r0 = Math.sqrt(mx0 * mx0 + my0 * my0); p.rr = p.r0; p.th = Math.atan2(my0, mx0); p.R = 34 + (Rmax - 34) * Math.sqrt(Math.random()); p.om = (1.05 + Math.random() * .4) * Math.sqrt(140 / Math.max(50, p.R)); p.t0 = Math.random() * 700; }
      if(kind === 'burst'){ var bx = p.x + p.w / 2 - cx, by = p.y + p.h / 2 - cy, bd = Math.sqrt(bx * bx + by * by) || 1, sp = 1200 + 2000 * Math.sqrt(1 - Math.min(1, bd / D)); p.t0 = 420 + bd / 2.4; p.vx = bx / bd * sp; p.vy = by / bd * sp - 200; p.va = (Math.random() - .5) * 1400; }
    });
    var t00 = performance.now(), last = t00;

    function stepFall(p, dt, t){
      if(p.rest) return false; if(t < p.t0) return true;
      p.vy += 2600 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
      if(p.x < 2){ p.x = 2; p.vx = Math.abs(p.vx); } if(p.x + p.w > W - 2){ p.x = W - 2 - p.w; p.vx = -Math.abs(p.vx); }
      var b = bucket(p), fl = floor - pile[b];
      if(p.y + p.h > fl){
        p.y = fl - p.h; p.hit++;
        if(Math.abs(p.vy) < 150 || p.hit > 3){ p.rest = true; p.vy = 0; pile[b] = Math.min(H * .5, pile[b] + p.h * (p.kind === 'ctl' ? .5 : .62)); var q = p.kind === 'ctl' ? 180 : 90; p.a = Math.round(p.a / q) * q + (Math.random() - .5) * (p.kind === 'ctl' ? 8 : 22); p.s.style.transition = 'transform .35s ease-out'; }
        else { p.vy = -p.vy * .32; p.vx = p.vx * .55 + (Math.random() - .5) * 70; p.va = p.va * .45 + (Math.random() - .5) * 260; }
      }
      return true;
    }

    function stepFloat(p, dt, t){
      if(t < p.t0) return true;
      if(p.rest){ p.y = p.ry + Math.sin(t / 650 + p.ph) * 2.2; p.a = p.ra + Math.sin(t / 900 + p.ph) * 3; return true; }
      p.vy -= 170 * dt; p.vx += (Math.random() - .5) * 160 * dt; p.vx *= (1 - .9 * dt); p.vy *= (1 - .8 * dt);
      p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
      if(p.x < 2){ p.x = 2; p.vx = Math.abs(p.vx); } if(p.x + p.w > W - 2){ p.x = W - 2 - p.w; p.vx = -Math.abs(p.vx); }
      var b = bucket(p), ce = top + pile[b];
      if(p.y < ce){ p.y = ce; p.hit++; if(Math.abs(p.vy) < 45 || p.hit > 2){ p.rest = true; p.ry = p.y; if(p.kind === 'ctl'){ p.a = Math.round(p.a / 180) * 180 + (Math.random() - .5) * 6; p.s.style.transition = 'transform .4s ease-out'; } p.ra = p.a; pile[b] = Math.min((H - top) * .5, pile[b] + p.h * .62); } else { p.vy = -p.vy * .3; p.va *= .5; } }
      return true;
    }

    function stepFlee(p, dt, t){
      if(t < p.t0) return true;
      if(!p.kicked){ p.kicked = true; var kx = p.x + p.w / 2 - cx, ky = p.y + p.h / 2 - cy, kd = Math.sqrt(kx * kx + ky * ky) || 1, kv = 500 + Math.random() * 500; p.vx = kx / kd * kv; p.vy = ky / kd * kv; }
      var px = p.x + p.w / 2, py = p.y + p.h / 2, dx = px - surMX, dy = py - surMY, d2 = dx * dx + dy * dy, R = 240;
      var ax = -(p.x - p.hx) * 18 - p.vx * 4.2, ay = -(p.y - p.hy) * 18 - p.vy * 4.2;
      if(d2 < R * R){ var d = Math.sqrt(d2) || 1, f = 1 - d / R; f = f * f * 14000; ax += dx / d * f; ay += dy / d * f; }
      p.vx += ax * dt; p.vy += ay * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      p.a = Math.max(-38, Math.min(38, p.vx * .045));
      return true;
    }

    function stepSwirl(p, dt, t){
      if(t < p.t0) return true;
      var u = Math.min(1, (t - p.t0) / 1900), e = 1 - Math.pow(1 - u, 3);
      p.rr = p.r0 + (p.R - p.r0) * e; p.th += p.om * dt * (.2 + .8 * e);
      p.x = cx + Math.cos(p.th) * p.rr - p.w / 2; p.y = cy + Math.sin(p.th) * p.rr - p.h / 2;
      p.a = p.th * 180 / Math.PI + 90;
      return true;
    }

    function stepBurst(p, dt, t){
      if(p.rest) return false; if(t < p.t0) return true;
      p.vy += 700 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
      if(p.x < -W || p.x > 2 * W || p.y > H + 400 || p.y < -H) p.rest = true;
      return true;
    }
    var step = {fall:stepFall, float:stepFloat, flee:stepFlee, swirl:stepSwirl, burst:stepBurst}[kind];
    function frame(now){
      var dt = Math.min(.05, (now - last) / 1000), t = now - t00, alive = false; last = now;
      pieces.forEach(function(p){
        if(step(p, dt, t)) alive = true;
        if(t >= p.t0) p.s.style.transform = surTransform(p);
      });
      if(alive && (kind === 'flee' || kind === 'swirl' || kind === 'float' || t < 9000)) surRaf = requestAnimationFrame(frame); else surRaf = 0;
    }
    surRaf = requestAnimationFrame(frame);
  }
  function surStop(instant){
    document.documentElement.classList.remove('cpsur');
    if(!surLayer) return; cancelAnimationFrame(surRaf); surRaf = 0; clearTimeout(surT); clearTimeout(surSealT);
    var layer = surLayer, pieces = surPieces, kind = surKind, end = surEnd; surLayer = null; surPieces = []; surKind = ''; surEnd = null;
    if(instant || !cpage || cpage.hidden){ layer.remove(); cpage && cpage.classList.remove('surhid'); return; }
    if(kind === 'seals'){
      layer.style.transition = 'opacity .5s var(--ease), transform .5s var(--ease)'; layer.style.transformOrigin = '50% 42%';
      void layer.offsetWidth; layer.style.opacity = '0'; layer.style.transform = 'scale(1.04)';
      surOld = layer; surT = setTimeout(function(){ layer.remove(); if(surOld === layer) surOld = null; }, 620); return;
    }
    if(end){ var ms = end(); surOld = layer; surT = setTimeout(function(){ layer.remove(); if(surOld === layer) surOld = null; cpage.classList.remove('surhid'); }, ms); return; }

    var rng = document.createRange(), maxD = 0;
    pieces.forEach(function(p){
      var nr = null; try{ if(p.kind === 'ch'){ if(p.node.isConnected){ rng.setStart(p.node, p.i); rng.setEnd(p.node, p.i + 1); nr = rng.getBoundingClientRect(); } } else if(p.el.isConnected) nr = p.el.getBoundingClientRect(); }catch(e){}
      if(!nr || !nr.width){ p.s.style.transition = 'opacity .4s'; p.s.style.opacity = '0'; return; }
      var a = ((p.a % 360) + 540) % 360 - 180;
      p.s.style.transition = 'none'; p.s.style.left = nr.left + 'px'; p.s.style.top = nr.top + 'px';
      p.s.style.transform = 'translate(' + (p.x - nr.left).toFixed(1) + 'px,' + (p.y - nr.top).toFixed(1) + 'px) rotate(' + a.toFixed(1) + 'deg)';
      p.d = Math.random() * 380; if(p.d > maxD) maxD = p.d;
    });
    void layer.offsetWidth;
    var dur = kind === 'burst' ? 1.5 : 1.15;
    pieces.forEach(function(p){ if(p.d === undefined) return; p.s.style.transition = 'transform ' + dur + 's cubic-bezier(.2,.8,.2,1) ' + p.d.toFixed(0) + 'ms'; p.s.style.transform = 'none'; });
    surOld = layer;
    surT = setTimeout(function(){ layer.remove(); if(surOld === layer) surOld = null; cpage.classList.remove('surhid'); }, maxD + dur * 1000 + 100);
  }
  window.addEventListener('resize', function(){ if(surLayer) surStop(true); });

  var cpage = document.getElementById('cpage'), cpform = document.getElementById('cpform'), cpLast = null, cpT = 0, cpPushed = false; var surHintT = 0;
  var cpY = 0;
  function cpOpen(){
    if(!cpage) return;
    if(!cpage.hidden){

      if(!cpage.classList.contains('out')) return;
      clearTimeout(cpT); cpage.hidden = true; cpage.classList.remove('out');
    }
    clearTimeout(cpT);
    cpY = window.scrollY;
    cpLast = document.activeElement; var hdEl = document.querySelector('.hd'); if(hdEl) cpage.style.setProperty('--hdh', hdEl.offsetHeight + 'px');

    var cpx0 = document.getElementById('cpx'), cpl0 = cpage.querySelector('.cp-lab'), nav0 = hdEl && hdEl.querySelector('.nav');
    if(hdEl && cpl0) hdEl.insertBefore(cpl0, hdEl.firstChild); if(nav0 && cpx0) nav0.appendChild(cpx0);
    cpage.hidden = false; cpage.classList.remove('out'); void cpage.offsetWidth; cpage.classList.add('in');
    if(mkbtn){ if(mkbtn.__t === undefined) mkbtn.__t = mkbtn.title; mkbtn.title = 'ちょっとしたサプライズの表示／非表示'; }
    document.documentElement.classList.add('cpopen'); if(window.__rvSuppress) window.__rvSuppress();
    clearTimeout(cpHidT); cpHidT = setTimeout(function(){ if(cpage && !cpage.hidden) document.documentElement.classList.add('cphid'); }, 480);
    cpRot();
    if(menu && menu.classList.contains('open')) setMenu(false); togFit();
    clearTimeout(surHintT); document.documentElement.classList.add('surhint'); surHintT = setTimeout(function(){ document.documentElement.classList.remove('surhint'); }, 7000);
    try{ history.pushState({cp:1}, '', '#write'); cpPushed = true; }catch(e){ cpPushed = false; }
    var done = document.getElementById('cpdone'); if(done) done.hidden = true; var err = document.getElementById('cperr'); if(err) err.textContent = '';
    var act0 = cpage.querySelector('.cp-act'); if(act0 && done && done.parentNode !== act0) act0.appendChild(done);
    setTimeout(function(){ var f = cpage.querySelector('input'); if(f) f.focus(); }, 500);
  }

  var cpYayT = 0;
  function cpYaySeal(){
    var sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sv.setAttribute('viewBox', '0 0 200 200'); sv.setAttribute('aria-hidden', 'true');
    var id = 'yayink' + (Math.random() * 1e6 | 0);
    var ring = 'THANK YOU FOR WRITING · 2026 · KOSAKA SHUZO · ';
    sv.innerHTML = '<defs>' +
      '<filter id="' + id + '" x="-14%" y="-14%" width="128%" height="128%">' +
        '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>' +
      '<path id="' + id + 'p" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="#E84518">' +
        '<circle cx="100" cy="100" r="86" stroke-width="4.4"/>' +
        '<circle cx="100" cy="100" r="60" stroke-width="2.2"/>' +
        '<text font-family="var(--mono)" font-size="10.5" letter-spacing="2.6" fill="#E84518" stroke="none">' +
          '<textPath href="#' + id + 'p" startOffset="0">' + ring + '</textPath></text>' +
        '<text x="100" y="88" text-anchor="middle" font-family="var(--mincho)" font-weight="900" font-size="46" fill="#E84518" stroke="none">感</text>' +
        '<text x="100" y="136" text-anchor="middle" font-family="var(--mincho)" font-weight="900" font-size="46" fill="#E84518" stroke="none">謝</text>' +
      '</g>';
    return sv;
  }
  function cpYay(){
    var old = document.getElementById('cpyay'); if(old) old.remove(); clearTimeout(cpYayT);
    var el = document.createElement('div'); el.id = 'cpyay'; el.setAttribute('aria-hidden', 'true');
    var seal = document.createElement('span'); seal.className = 'yay-seal';
    seal.appendChild(cpYaySeal()); el.appendChild(seal);
    var ring = document.createElement('i'); ring.className = 'yay-ring'; el.appendChild(ring);
    var ring2 = document.createElement('i'); ring2.className = 'yay-ring yay-ring2'; el.appendChild(ring2);
    if(!reduce){
      var bits = document.createElement('div'); bits.className = 'yay-bits';
      var col = ['#E84518', '#FF7A50', '#F2F2EE', '#1C1B19', '#E84518', '#FAFAF8'];
      for(var i = 0; i < 38; i++){
        var b = document.createElement('i');
        b.style.left = (Math.random() * 100).toFixed(1) + '%';
        b.style.background = col[i % col.length];
        b.style.width = (5 + Math.random() * 6).toFixed(1) + 'px';
        b.style.height = (8 + Math.random() * 10).toFixed(1) + 'px';
        b.__del = Math.round(Math.random() * 500); b.__dur = Math.round(1500 + Math.random() * 1100);
        b.__sx = Math.round((Math.random() * 2 - 1) * 90); b.__sp = Math.round((Math.random() < .5 ? -1 : 1) * (360 + Math.random() * 540));
        b.style.animationDelay = (b.__del / 1000).toFixed(2) + 's';
        b.style.animationDuration = (b.__dur / 1000).toFixed(2) + 's';
        b.style.setProperty('--sx', b.__sx + 'px');
        b.style.setProperty('--sp', b.__sp + 'deg');
        bits.appendChild(b);
      }
      el.appendChild(bits);
    }

    var WA = typeof el.animate === 'function';
    if(!WA) el.classList.add('on');
    document.body.appendChild(el);
    if(WA){
      var T0 = 'translate(-50%,-50%) rotate(-9deg)';

      seal.animate([
        {opacity:0, transform:'translate(-50%,-50%) rotate(-17deg) scale(1.58)', offset:0, easing:'cubic-bezier(.35,0,.25,1)'},
        {opacity:.55, transform:'translate(-50%,-50%) rotate(-13deg) scale(1.3)', offset:.34, easing:'cubic-bezier(.4,0,.2,1)'},
        {opacity:.9, transform:'translate(-50%,-50%) rotate(-10deg) scale(1.08)', offset:.62, easing:'cubic-bezier(.3,0,.2,1)'},
        {opacity:.98, transform:T0 + ' scale(.952)', offset:.8, easing:'cubic-bezier(.3,0,.3,1)'},
        {opacity:.96, transform:T0 + ' scale(1.022)', offset:.9},
        {opacity:.94, transform:T0 + ' scale(1)', offset:1}
      ], {duration:760, easing:'linear', fill:'both'});
      [ring, ring2].forEach(function(r, k){
        r.animate([{opacity:0, transform:'translate(-50%,-50%) scale(.72)', offset:0},
                   {opacity:.5, offset:.14},
                   {opacity:0, transform:'translate(-50%,-50%) scale(1.5)', offset:1}],
                  {duration:1150, delay:340 + k * 220, easing:'cubic-bezier(.2,.75,.3,1)', fill:'both'});
      });
      if(!reduce) Array.prototype.forEach.call(el.querySelectorAll('.yay-bits i'), function(b){
        var sx = b.__sx, sp = b.__sp;
        b.animate([{opacity:0, transform:'translate3d(0,-8vh,0) rotate(0deg)', offset:0},
                   {opacity:1, offset:.08}, {opacity:1, offset:.82},
                   {opacity:0, transform:'translate3d(' + sx + 'px,112vh,0) rotate(' + sp + 'deg)', offset:1}],
                  {duration:b.__dur, delay:b.__del, easing:'cubic-bezier(.3,.5,.5,1)', fill:'both'});
      });
    }
    cpYayT = setTimeout(function(){
      if(WA){
        seal.animate([{opacity:.94, transform:'translate(-50%,-50%) rotate(-9deg) scale(1)'},
                      {opacity:0, transform:'translate(-50%,-50%) rotate(-9deg) scale(1.1)'}],
                     {duration:640, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'});
        el.animate([{opacity:1}, {opacity:0}], {duration:640, delay:60, easing:'ease-out', fill:'forwards'});
      } else el.classList.add('gone');
      setTimeout(function(){ if(el.parentNode) el.remove(); }, 820);
    }, reduce ? 2400 : 3000);
  }

  var cpRotEl = null, cpRotT = 0;
  function cpRot(){
    var H = document.documentElement;
    if(!H.classList.contains('handheld')) return;
    if(!window.matchMedia('(orientation:landscape)').matches) return;
    var src = document.getElementById('rotv'), svg0 = src && src.querySelector('svg'); if(!svg0) return;
    var en = (typeof curLang !== 'undefined' && curLang === 'en');
    if(!cpRotEl){
      cpRotEl = document.createElement('div'); cpRotEl.id = 'cprot'; cpRotEl.setAttribute('aria-hidden', 'true');
      var sv = svg0.cloneNode(true);
      Array.prototype.forEach.call(sv.querySelectorAll('clipPath'), function(cp){ cp.id = cp.id + 'c'; });
      Array.prototype.forEach.call(sv.querySelectorAll('[clip-path]'), function(el){ el.setAttribute('clip-path', el.getAttribute('clip-path').replace(')', 'c)')); });
      var ok = sv.querySelector('.ok'), pP = sv.querySelector('.pP');
      if(ok && pP){ var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'okpos'); g.setAttribute('transform', 'translate(-24,-26)'); g.appendChild(ok); pP.appendChild(g); }
      sv.setAttribute('viewBox', '38 36 160 126');
      cpRotEl.appendChild(sv);
      var tx = document.createElement('div'); tx.className = 'cprot-tx';
      cpRotEl.appendChild(tx);
      document.body.appendChild(cpRotEl);
    }
    var t = cpRotEl.querySelector('.cprot-tx');
    t.innerHTML = en ? '<b>Portrait is fine here.</b><span>Sorry for the trouble so far.</span>'
                     : '<b class="mixed" data-big="縦持ち|大丈夫"><span class="w">縦持ちでも、大丈夫です。</span></b><span>ここまでご不便をおかけしました。</span>';
    if(!en && typeof mixedSubs === 'function') mixedSubs(true);
    cpRotEl.classList.remove('on'); void cpRotEl.offsetWidth; cpRotEl.classList.add('on');
    clearTimeout(cpRotT); cpRotT = setTimeout(function(){ cpRotEl.classList.remove('on'); }, 5200);
  }
  var cpHidT = 0;
  function cpClose(fromPop){
    if(!cpage || cpage.hidden) return; clearTimeout(cpT);
    surStop(true); if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; cpage.classList.remove('surhid'); }
    cpage.classList.remove('in'); cpage.classList.add('out'); document.documentElement.classList.remove('cpopen');
    clearTimeout(cpHidT); document.documentElement.classList.remove('cphid');
    if(cpRotEl){ clearTimeout(cpRotT); cpRotEl.classList.remove('on'); }
    if(window.__rvPortrait) window.__rvPortrait();
    var bar = cpage.querySelector('.cp-bar'), cpx1 = document.getElementById('cpx'), cpl1 = document.querySelector('.hd .cp-lab'); if(bar){ if(cpl1) bar.appendChild(cpl1); if(cpx1) bar.appendChild(cpx1); }
    clearTimeout(surHintT); document.documentElement.classList.remove('surhint');
    cpT = setTimeout(function(){ cpage.hidden = true; cpage.classList.remove('out'); }, 620);
    if(mkbtn && mkbtn.__t !== undefined) mkbtn.title = mkbtn.__t; togFit();
    if(cpPushed && !fromPop){ cpPushed = false; try{ history.back(); }catch(e){} }
    cpPushed = false;
    if(cpLast && cpLast.focus) try{ cpLast.focus({preventScroll:true}); }catch(e){ try{ cpLast.focus(); }catch(e2){} }
    (function(){

      if(!(cpY > 0)) return;
      var put = function(){ if(Math.abs(window.scrollY - cpY) > 2) window.scrollTo({top: cpY, behavior: 'instant'}); };
      requestAnimationFrame(function(){ requestAnimationFrame(put); });
      setTimeout(put, 60); setTimeout(put, 160); setTimeout(put, 320); setTimeout(put, 620);
    })();
  }
  window.addEventListener('popstate', function(){ if(cpage && !cpage.hidden) cpClose(true); });
  document.querySelectorAll('#ftcta').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); cpOpen(); }); });

  (function(){
    var sb = document.getElementById('ftshare'); if(!sb) return;
    var msg = document.querySelector('.ft-sharemsg'), msgT = 0;
    function say(t){ if(!msg) return; msg.textContent = t; msg.classList.add('on'); clearTimeout(msgT); msgT = setTimeout(function(){ msg.classList.remove('on'); }, 2600); }
    sb.addEventListener('click', function(){
      var url = location.href.split('#')[0];
      var en = document.documentElement.lang === 'en';
      var d = {title: en ? 'Shuzo Kosaka — Everything of mine.' : '小坂脩蔵 — ジブンのゼンブを。', url: url};
      if(navigator.share){ navigator.share(d).catch(function(){}); return; }
      var done = function(){ say(en ? 'LINK COPIED' : 'リンクを写しました'); };
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done, function(){ say(url); }); return; }
      try{ var ta = document.createElement('textarea'); ta.value = url; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); }catch(e){ say(url); }
    });
  })();
  ['cpx', 'cpback'].forEach(function(id){ var el = document.getElementById(id); if(el) el.addEventListener('click', function(e){ e.preventDefault(); cpClose(); }); });
  (function(){
    var sh = document.getElementById('cpsheet'); if(!sh) return;
    sh.addEventListener('click', function(e){ if(e.target === sh){ e.preventDefault(); cpClose(); } });
  })();
  document.addEventListener('keydown', function(e){
    if(!cpage || cpage.hidden) return;
    if(e.key === 'Escape'){ e.preventDefault(); cpClose(); return; }
    if(e.key === 'Tab'){ var f = Array.prototype.filter.call(cpage.querySelectorAll('button, input, textarea, a[href]'), function(x){ return !x.disabled && x.offsetParent !== null && !x.closest('.sur'); }); if(!f.length) return; var first = f[0], last = f[f.length - 1]; if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }
  });

  var CONTACT_URL = 'https://script.google.com/macros/s/AKfycbwfu7rDCJiKtp7uO724XCCPoT_fqO2KuZq6UX7JXH_AMEeOrQ3-CpAmXtl4-piH1Yob/exec';
  if(cpform) cpform.addEventListener('submit', function(e){
    e.preventDefault();
    var en = curLang === 'en', g = function(n){ var el = cpform.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; }, name = g('name'), mail = g('email'), subj = g('subject'), msg = g('msg'), err = document.getElementById('cperr'), bad = [];
    cpform.querySelectorAll('label').forEach(function(l){ l.classList.remove('bad'); });
    var hidN = cpform.querySelector('[name="hideName"]'), hidM = cpform.querySelector('[name="hideMail"]');
    var hideName = !!(hidN && hidN.checked), hideMail = !!(hidM && hidM.checked), anon = hideName || hideMail;
    if(!hideName && !name) bad.push('name');
    if(!hideMail && (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))) bad.push('email');
    if(!msg) bad.push('msg');
    bad.forEach(function(n){ var el = cpform.querySelector('[name="' + n + '"]'); if(el && el.closest('label')){ var lb = el.closest('label'); void lb.offsetWidth; lb.classList.add('bad'); }    });
    if(bad.length){ if(err){ err.textContent = ''; void err.offsetWidth; } if(err) err.textContent = (en ? ('Please fill in ' + [bad.indexOf('name') >= 0 ? 'your name' : '', bad.indexOf('email') >= 0 ? 'a valid email address' : '', bad.indexOf('msg') >= 0 ? 'a message' : ''].filter(Boolean).join(', ') + '.')
                                                     : ([bad.indexOf('name') >= 0 ? 'お名前' : '', bad.indexOf('email') >= 0 ? '正しいメールアドレス' : '', bad.indexOf('msg') >= 0 ? 'メッセージ' : ''].filter(Boolean).join('・') + 'をご記入ください。')); var f = cpform.querySelector('[name="' + bad[0] + '"]'); if(f) f.focus(); return; }
    if(err) err.textContent = '';
    var subject = subj || ((en ? 'From the portfolio site' : 'ポートフォリオサイトより') + ' — ' + name);
    var bodyTxt = msg + '\n\n' + (en ? 'Name: ' : 'お名前：') + name + '\n' + (en ? 'Email: ' : 'メールアドレス：') + mail;
    var href = 'mailto:' + ['shuzo.kosaka1018', 'gmail.com'].join('@') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyTxt);
    var btn = cpform.querySelector('.cp-send'), lab = btn ? btn.querySelector('b') : null, labWas = lab ? lab.textContent : '';
    var done = document.getElementById('cpdone');

    function show(txt){ if(done){ done.textContent = txt; done.hidden = false; done.scrollIntoView({block:'nearest', behavior:'smooth'}); } }
    function release(){ if(btn) btn.disabled = false; if(lab) lab.textContent = labWas; }
    function openMail(){ var a = document.createElement('a'); a.href = href; a.style.display = 'none'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 1000); }
    function fallback(){
      if(hideMail){
        release();
        show(en ? 'Could not send just now. Please try again in a little while.' : 'いま送ることができませんでした。少し時間をおいて、もう一度お試しください。');
        return;
      }
      release(); openMail();
      show(en ? 'Could not send from the page, so your mail app has been opened instead. If nothing happened, please try again in a little while.'
             : 'ページからは送れなかったため、お使いのメールソフトを開きました。何も起きないときは、少し時間をおいてもう一度お試しください。');
    }

    if(!CONTACT_URL){ openMail(); show(en ? 'Your mail app has been opened. If nothing happened, please try again in a little while.' : 'メールソフトを開きました。何も起きないときは、少し時間をおいてもう一度お試しください。'); return; }

    if(btn) btn.disabled = true; if(lab) lab.textContent = en ? 'Sending…' : '送信中…';
    var settled = false, giveUp = setTimeout(function(){ if(!settled){ settled = true; fallback(); } }, 12000);

    fetch(CONTACT_URL, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify({
      name: hideName ? '' : name, email: hideMail ? '' : mail, subject:subj, msg:msg, company:g('company'), anon: anon, hideName: hideName, hideMail: hideMail, lang: en ? 'en' : 'ja'
    })}).then(function(r){ return r.json().catch(function(){ return {ok: r.ok}; }); })
      .then(function(res){
        if(settled) return; settled = true; clearTimeout(giveUp);
        if(res && res.ok){
          release(); cpform.reset();
          show(en ? 'Sent — thank you.' : '送信しました。ありがとうございます。');
          cpYay();
        } else fallback();
      })
      .catch(function(){ if(settled) return; settled = true; clearTimeout(giveUp); fallback(); });
  });
  window.addEventListener('keydown', function(e){ var ae = document.activeElement, typing = ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable); if(e.key === 'g' && !e.metaKey && !e.ctrlKey && !typing && !(cpage && !cpage.hidden)){ document.documentElement.classList.toggle('grid'); togFit(); } });

  function wkTry(){
    var box = document.querySelector('#works .wk-try'), vt = document.querySelector('#works .wk-vt'); if(!box || !vt || reduce) return; var svg = box.querySelector('svg'), num = document.querySelector('#works .wk-n b') || box.querySelector('b'); if(!svg) return;
    function fit(){
      var w = vt.offsetWidth, h = vt.offsetHeight, px = Math.max(26, w * .16), py = Math.max(22, h * .09);
      box.style.left = (vt.offsetLeft - px).toFixed(0) + 'px'; box.style.top = (vt.offsetTop - py).toFixed(0) + 'px'; box.style.width = (w + 2 * px).toFixed(0) + 'px'; box.style.height = (h + 2 * py).toFixed(0) + 'px';
    }
    fit(); window.__wkTryFit = fit; window.addEventListener('resize', fit);
    var N = 150, base = [], k, R = 186, L = 2 * Math.PI * R + 240;
    for(k = 0; k < N; k++){
      var d0 = k / N * L, p;
      if(d0 < Math.PI * R){ var a = Math.PI + d0 / R; p = [200 + R * Math.cos(a), 200 + R * Math.sin(a), Math.cos(a), Math.sin(a)]; }
      else if(d0 < Math.PI * R + 120){ p = [386, 200 + (d0 - Math.PI * R), 1, 0]; }
      else if(d0 < 2 * Math.PI * R + 120){ var a2 = (d0 - Math.PI * R - 120) / R; p = [200 + R * Math.cos(a2), 320 + R * Math.sin(a2), Math.cos(a2), Math.sin(a2)]; }
      else { p = [14, 320 - (d0 - 2 * Math.PI * R - 120), -1, 0]; }
      base.push(p);
    }
    var tries = 0, cyc = 0, timer = 0, live = false;
    function attempt(){
      if(!live) return; fit();
      var j = cyc % 8, A = 2.2 + 15 * (1 - j / 7), good = j === 7, f1 = 2 + Math.random() * 2, f2 = 5 + Math.random() * 4, p1 = Math.random() * 6.283, p2 = Math.random() * 6.283, rot = (Math.random() - .5) * A * .3 * Math.PI / 180, sc = 1 + (Math.random() - .5) * A / 260, s0 = Math.floor(Math.random() * N), dir = Math.random() < .5 ? 1 : -1, over = Math.round(N * (1 + (Math.random() - .35) * .1)), pts = [], i;
      for(i = 0; i <= over; i++){
        var idx = ((s0 + dir * i) % N + N) % N, b = base[idx], u = i / N;
        var w = A * (.62 * Math.sin(u * 6.283 * f1 + p1) + .38 * Math.sin(u * 6.283 * f2 + p2)) + (Math.random() - .5) * A * .22;
        var x = b[0] + b[2] * w - 200, y = b[1] + b[3] * w - 260;
        pts.push([200 + (x * Math.cos(rot) - y * Math.sin(rot)) * sc, 260 + (x * Math.sin(rot) + y * Math.cos(rot)) * sc]);
      }
      var d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1); for(i = 1; i < pts.length; i++) d += 'L' + pts[i][0].toFixed(1) + ',' + pts[i][1].toFixed(1);
      var path = svgEl('path', {d:d, fill:'none', 'stroke-linecap':'round', 'stroke-linejoin':'round', class:'try' + (good ? ' good' : '')}); svg.appendChild(path);
      var len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      var dur = good ? 2100 : 1250 + Math.random() * 600;
      path.animate([{strokeDashoffset:len}, {strokeDashoffset:0}], {duration:dur, easing:'cubic-bezier(.35,.05,.3,1)', fill:'forwards'});
      tries++; cyc++; if(num) num.textContent = ('0' + tries).slice(-2);
      timer = setTimeout(function(){
        if(!good){ path.classList.add('trace'); timer = setTimeout(attempt, 380); }
        else timer = setTimeout(function(){ svg.classList.add('clear'); timer = setTimeout(function(){ while(svg.firstChild) svg.removeChild(svg.firstChild); svg.classList.remove('clear'); timer = setTimeout(attempt, 450); }, 1200); }, 1700);
      }, dur + 250);
    }
    new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting && !live){ live = true; timer = setTimeout(attempt, 400); }
      else if(!e.isIntersecting && live){ live = false; clearTimeout(timer); svg.querySelectorAll('.try:not(.trace)').forEach(function(t){ t.classList.add('trace'); }); }
    }); }, {threshold:.2}).observe(box);
  }
  wkTry();

  document.querySelectorAll('.wkf').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); }); });

  if(document.documentElement.classList.contains('phone')){
    function wkLit(a){
      document.querySelectorAll('.wkf.lit').forEach(function(o){ if(o !== a) o.classList.remove('lit'); });
      if(!a) return;
      var ph = a.querySelector('.ph'); if(ph && !a.querySelector('.phc')){ var c = ph.cloneNode(false); c.setAttribute('class', 'phc'); ph.parentNode.insertBefore(c, ph); }
      a.classList.add('lit');
    }
    document.querySelectorAll('.wkf').forEach(function(a){ a.addEventListener('click', function(){ wkLit(a); }); });
    document.addEventListener('touchstart', function(e){ if(!(e.target && e.target.closest && e.target.closest('.wkf'))) wkLit(null); }, {passive:true});
  }

  document.querySelectorAll('a.vid[href*="youtu"]').forEach(function(a){
    var m = a.getAttribute('href').match(/(?:youtu\.be\/|v=)([\w-]{6,})/), th = a.querySelector('img.th');
    if(!m || !th) return;

    var ss = th.getAttribute('srcset') || ''; if(/\b1[2-9]\d\dw\b/.test(ss)) return;

    if(/^(YqVtNthG36s)$/.test(m[1])) return;
    var id = m[1], tries = ['maxresdefault'];
    (function next(){
      var name = tries.shift(); if(!name) return;
      var im = new Image();
      im.onload = function(){ if(im.naturalWidth >= 1280){ th.style.opacity = '0'; setTimeout(function(){ var pic = th.parentNode; if(pic && pic.tagName === 'PICTURE'){ Array.prototype.slice.call(pic.querySelectorAll('source')).forEach(function(so){ so.remove(); }); } th.removeAttribute('srcset'); th.removeAttribute('sizes'); th.src = im.src; th.style.opacity = '1'; }, 300);    } else next(); };
      im.onerror = next;
      im.src = 'https://img.youtube.com/vi/' + id + '/' + name + '.jpg';
    })();
  });

  var vidLocal = location.protocol === 'file:';
  document.querySelectorAll('a.vid[href*="youtu"]').forEach(function(a){
    var m = a.getAttribute('href').match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
    if(!m) return;
    if(vidLocal){ var s = a.querySelector('.s'); if(s) s.textContent = 'YOUTUBE · 公開版ではこの場所で再生'; return; }
    a.addEventListener('click', function(e){
      if(a.classList.contains('play')){ e.preventDefault(); return; }
      e.preventDefault();
      var f = document.createElement('iframe');

      f.setAttribute('src', 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&enablejsapi=1&origin=' + encodeURIComponent(location.origin) + '&widget_referrer=' + encodeURIComponent(location.origin + location.pathname));

      f.addEventListener('load', function(){
        var w = f.contentWindow; if(!w) return; var tries = 0;
        var tick = setInterval(function(){
          try{ w.postMessage(JSON.stringify({event:'command', func:'setVolume', args:[50]}), '*'); }catch(err){}
          if(++tries > 10) clearInterval(tick);
        }, 400);
      });
      var t = a.querySelector('.t'); f.setAttribute('title', t ? t.textContent : 'YouTube');

      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      a.classList.add('play'); a.appendChild(f);
      a.addEventListener('mouseenter', function(){ cur.classList.add('away'); });
      a.addEventListener('mouseleave', function(){ cur.classList.remove('away'); });
    });
  });

  var NZ_JA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
  var NZ_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nz(ch){
    if(/[\s、。「」『』・…\-—:;,.!?（）()]/.test(ch)) return ch;
    return /[ -~]/.test(ch) ? NZ_EN.charAt(Math.random() * 26 | 0) : NZ_JA.charAt(Math.random() * NZ_JA.length | 0);
  }
  function typeEls(els){
    var vhh = vh(), jobs = [];
    els.forEach(function(el){
      if(!el.isConnected || el.namespaceURI !== 'http://www.w3.org/1999/xhtml') return;
      var r = el.getBoundingClientRect(); if(!r.width || r.bottom < -40 || r.top > vhh + 40) return;
      var units = [];
      if(el.querySelector('.ch')){ el.querySelectorAll('.ch').forEach(function(c){ units.push({ch:c, t:c.textContent}); }); }
      else { var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n; while((n = w.nextNode())){ if(n.nodeValue.trim()) units.push({node:n, full:n.nodeValue}); } }
      if(!units.length) return;
      var total = 0; units.forEach(function(u){ total += u.ch ? 1 : u.full.length; });
      jobs.push({units:units, total:total, dur:Math.min(640, 140 + total * 2.4), el:el, h:el.offsetHeight});
    });
    if(!jobs.length) return;
    jobs.forEach(function(j){ j.el.style.minHeight = j.h + 'px'; j.el.classList.add('typing'); j.units.forEach(function(u){ if(u.ch) u.ch.style.visibility = 'hidden'; else u.node.nodeValue = ''; }); });
    var t0 = performance.now();
    (function frame(now){
      var t = now - t0, alive = false;
      jobs.forEach(function(j){
        if(j.done) return;
        var k = Math.min(1, t / j.dur), shown = Math.ceil(k * j.total), acc = 0;
        j.units.forEach(function(u){
          if(u.ch){
            if(acc < shown){ if(u.ch.textContent !== u.t) u.ch.textContent = u.t; u.ch.style.visibility = ''; }
            else if(acc < shown + 2){ u.ch.style.visibility = ''; u.ch.textContent = nz(u.t); }
            else u.ch.style.visibility = 'hidden';
            acc += 1;
          }
          else {
            var take = Math.max(0, Math.min(u.full.length, shown - acc)), want = u.full.slice(0, take);
            var span = Math.min(3, u.full.length - take), tail = '';
            for(var q = 0; q < span; q++) tail += nz(u.full.charAt(take + q));
            if(u.node.nodeValue !== want + tail) u.node.nodeValue = want + tail;
            acc += u.full.length;
          }
        });
        if(k >= 1){
          j.units.forEach(function(u){ if(u.ch){ u.ch.textContent = u.t; u.ch.style.visibility = ''; } else if(u.node.nodeValue !== u.full) u.node.nodeValue = u.full; });
          j.done = true; j.el.classList.remove('typing'); j.el.style.minHeight = '';
        } else alive = true;
      });
      if(alive) requestAnimationFrame(frame);
    })(t0);
  }

  var LANGSEL = 'p.p, .sub, h2, figure, .vid';
  function langDocTop(el){ var y = 0; while(el){ y += el.offsetTop; el = el.offsetParent; } return y; }
  function langAnchor(){
    var vhh = vh(), secs = document.querySelectorAll('section[id]'), sec = null;
    for(var i = 0; i < secs.length; i++){ var r = secs[i].getBoundingClientRect(); if(r.top <= 8 && r.bottom > 8){ sec = secs[i]; break; } }
    if(!sec) return null;
    if(sec.classList.contains('pin') || sec.querySelector('.stick, .solopin')) return {id:sec.id, pin:true, p:(window.scrollY - sec.offsetTop) / Math.max(1, sec.offsetHeight - vhh)};
    var list = sec.querySelectorAll(LANGSEL), best = -1, bestTop = 1e9;
    for(var j = 0; j < list.length; j++){ var t = list[j].getBoundingClientRect().top; if(t > -60 && t < vhh * .9 && t < bestTop){ bestTop = t; best = j; } }
    if(best < 0) return {id:sec.id, off:window.scrollY - sec.offsetTop};

    return {id:sec.id, idx:best, d:window.scrollY - langDocTop(list[best]), top:bestTop};
  }
  function langRestore(a){
    if(!a) return;
    var sec = document.getElementById(a.id); if(!sec) return;
    var y;
    if(a.pin) y = sec.offsetTop + a.p * Math.max(1, sec.offsetHeight - vh());
    else if(a.idx !== undefined){
      var el = sec.querySelectorAll(LANGSEL)[a.idx]; if(!el) return;
      y = langDocTop(el) + a.d;

      if(a.top !== undefined && Math.abs(y - window.scrollY) < 2){
        var dy = el.getBoundingClientRect().top - a.top;
        if(Math.abs(dy) > 3) y = window.scrollY + dy;
      }
    }
    else y = sec.offsetTop + a.off;
    y = Math.max(0, Math.round(y));
    if(Math.abs(y - window.scrollY) < 2) return;
    window.scrollTo(0, y); langRestore.y = y;
  }
  function setLang(lang, quiet){
    var en = lang === 'en'; if(lang === curLang) return;
    var langAnc = langAnchor();
    (function(){
      var M = {'お名前':'Name', 'メールアドレス':'Email', '件名':'Subject', 'メッセージ':'Message', '本文':'Message'};
      document.querySelectorAll('.cp-form label > span').forEach(function(sp){ var tn = sp.firstChild; if(!tn || tn.nodeType !== 3) return; var ja = tn.__ja || tn.nodeValue.trim(); if(!M[ja]) return; tn.__ja = ja; tn.nodeValue = en ? M[ja] : ja; });
      var sq = document.getElementById('seqplay'); if(sq) sq.setAttribute('aria-label', en ? 'Open the game: Measure the composition.' : 'ゲームを開く：絵を、測る。');
    })();

    (function(){
      var sw = document.getElementById('lgsw');
      if(!sw){ sw = document.createElement('div'); sw.id = 'lgsw'; sw.className = 'lgsw'; sw.setAttribute('aria-hidden', 'true');
        sw.innerHTML = '<i class="bar"></i><span class="tag"><b></b><em>\u2192</em><b class="to"></b></span>'; document.body.appendChild(sw); }
      sw.querySelector('.tag b').textContent = en ? 'JA' : 'EN';
      sw.querySelector('.tag b.to').textContent = en ? 'EN' : 'JA';
      sw.classList.remove('run'); void sw.offsetWidth; sw.classList.add('run');
      clearTimeout(sw.__lgt); sw.__lgt = setTimeout(function(){ sw.classList.remove('run'); }, 1000);
    })();
    curLang = lang;
    surStop(true); if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; if(cpage) cpage.classList.remove('surhid'); }
    var changed = [];
    i18nEls.forEach(function(el){
      if(!el.isConnected || el.__ja === undefined) return;
      var tr = en ? I18N[el.__ja.replace(/\s+/g, ' ').trim()] : (el.__sw ? el.__ja : undefined);
      if(tr === undefined) return;
      el.__sw = en; el.innerHTML = tr; changed.push(el);
      if(el.classList.contains('split') || el.classList.contains('scx')) splitEl(el);
    });

    var reMark = function(el){ if(el) el.querySelectorAll('mark').forEach(function(m){ if(!m.closest('[data-at]')) ioM.observe(m); }); };
    wipes.forEach(function(wipeEl){ var wEn = wipeEl.querySelector('.en'), wJa = wipeEl.querySelector('.ja'); if(!wEn || !wJa) return;
      if(wipeEl.classList.contains('scr')){ var sc = wEn.querySelector('.sc'); if(sc){ sc.innerHTML = wJa.innerHTML; reMark(sc); } return; }
      if(wEn.__ja !== undefined && wJa.__ja !== undefined){ wEn.innerHTML = en ? wJa.__ja : wEn.__ja; reMark(wEn); } });

    changed.forEach(function(el){ el.querySelectorAll('mark').forEach(function(m){ if(!m.closest('[data-at]')) ioM.observe(m); }); });
    if(window.__kuMark) window.__kuMark();
    if(window.__armAnnot) window.__armAnnot();
    soloReset();
    ttlClasses(!en); ttlWords(!en); opticalAlign(); mixedSubs(!en);
    if(!en){ document.querySelectorAll('#top .rot span, .menu .mmsg .txt .mx, #message .mh .mx').forEach(mixSet); }
    meanWrap(); hugLine(); tagAlign(); ftFit(); ovalFit(); msgFitDone = false;
    document.querySelectorAll('[data-en][data-ja]').forEach(function(el){ if(el.querySelector('.ch') || el.__ja !== undefined || el.children.length) return; el.textContent = el.getAttribute(en ? 'data-en' : 'data-ja'); });
    document.querySelectorAll('.lang button').forEach(function(x){ x.setAttribute('aria-pressed', x.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    if(curSec && curSec.getAttribute('data-year')){ curY = ''; setYear(curSec.getAttribute('data-year')); }
    if(window.__renderThanks) window.__renderThanks();
    if(window.__rvRelang) window.__rvRelang();
    document.documentElement.lang = lang; body.classList.toggle('en', en); curHd = null; chapUpdate();
    if(!quiet) typeEls(changed);
    document.querySelectorAll('.sr li .st, #mseals li .st').forEach(function(st){ while(st.firstChild) st.removeChild(st.firstChild); });
    document.querySelectorAll('#mseals > li').forEach(function(li, i){ var st = li.querySelector('.st'); if(st) st.appendChild(stampSvg(li, i)); });
    if(window.__mapStamp) window.__mapStamp();
    if(window.__dgCaps){ document.querySelectorAll('#dgsvg .dg-cap text').forEach(function(t){ t.__mixed = false; }); setTimeout(window.__dgCaps, 0); }
    setTimeout(function(){ rallyBuild(); }, 60);
    setTimeout(togFit, 720);
    setTimeout(function(){ if(window.__wkTryFit) window.__wkTryFit(); }, 120);
    if(langAnc && !quiet){

      var moved = false, onUser = function(){ moved = true; };

      ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function(ev){ window.addEventListener(ev, onUser, {passive:true}); });
      var keep = function(){ if(!moved) langRestore(langAnc); };
      requestAnimationFrame(function(){ requestAnimationFrame(keep); });
      var t0 = Date.now(), iv = setInterval(function(){
        keep();
        if(moved || Date.now() - t0 > 3000){ clearInterval(iv); ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function(ev){ window.removeEventListener(ev, onUser); }); }
      }, 110);
    }
  }
  (function(){ var f = document.getElementById('cpform'); if(!f) return;
    [['hideName','name'], ['hideMail','email']].forEach(function(pair){
      var cb = f.querySelector('[name="' + pair[0] + '"]'), inp = f.querySelector('[name="' + pair[1] + '"]');
      if(!cb || !inp) return;
      var lab = inp.closest('label');
      var sync = function(){ if(lab) lab.classList.toggle('hid', cb.checked); if(cb.checked) inp.value = ''; };
      cb.addEventListener('change', sync); sync();
    });
  })();

  (function(){
    var H = document.documentElement;
    if(H.classList.contains('phone')) return;
    var TAB = H.classList.contains('tablet');
    var mq = window.matchMedia('(max-width:1024px)'), el = null, copied = '';

    function narrowNow(){ return TAB ? (window.innerHeight / Math.max(1, window.innerWidth) >= 1.45) : mq.matches; }
    var NWCOPY = {
      ja: {small:'おっと、タブが少し狭いようです。', b:'目を細める前に、<br>窓を大きく。', big:'目|窓', note:'できれば、ゆとりのある幅でお楽しみください。'},
      en: {small:'Oops — the window is a little narrow.', b:'Before you squint,<br>widen the window.', big:'squint|window', note:'If you can, enjoy it with a bit more room.'}
    };
    function icon(){

      var K = ' keyTimes="0;.14;.44;.84;1" dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1;.4 0 .2 1;.4 0 .2 1"';
      function A(n, v){ return '<animate attributeName="' + n + '" values="' + v + '"' + K + '/>'; }
      function T(v){ return '<animateTransform attributeName="transform" type="translate" values="' + v + '"' + K + '/>'; }
      return '<svg viewBox="0 0 220 200" aria-hidden="true">' +
        '<rect class="nw-fr" x="76" y="70" width="68" height="52" rx="6">' +
          A('x', '76;76;30;30;76') + A('y', '70;70;46;46;70') +
          A('width', '68;68;160;160;68') + A('height', '52;52;108;108;52') + '</rect>' +
        '<path class="nw-bar" d="M76 86h68">' +
          A('d', 'M76 86h68;M76 86h68;M30 64h160;M30 64h160;M76 86h68') + '</path>' +
        '<path class="nw-ln" d="M88 100h44">' +
          A('d', 'M88 100h44;M88 100h44;M44 84h132;M44 84h132;M88 100h44') + '</path>' +
        '<path class="nw-ln" d="M88 111h26">' +
          A('d', 'M88 111h26;M88 111h26;M44 100h84;M44 100h84;M88 111h26') + '</path>' +
        '<path class="nw-ln" d="M88 122h34" opacity="0">' +
          A('d', 'M88 122h34;M88 122h34;M44 116h108;M44 116h108;M88 122h34') + A('opacity', '0;0;.42;.42;0') + '</path>' +
        '<g class="nw-ar"><path d="M68 62l-11-9M66 53h-9v9"/>' + T('0,0;0,0;-46,-24;-46,-24;0,0') + '</g>' +
        '<g class="nw-ar"><path d="M152 130l11 9M154 139h9v-9"/>' + T('0,0;0,0;46,32;46,32;0,0') + '</g>' +
        '</svg>';
    }
    function build(){
      if(el) return el;
      el = document.createElement('div'); el.id = 'narrow'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
      el.innerHTML = icon() + '<small></small><b class="nw-ttl"></b><span class="nw-note"></span>';
      document.body.appendChild(el);
      return el;
    }
    function words(){
      var lang = (typeof curLang !== 'undefined' ? curLang : 'ja');
      var e = build(), c = NWCOPY[lang === 'en' ? 'en' : 'ja'];
      if(copied === lang) return; copied = lang;
      e.querySelector('small').textContent = c.small;
      var b = e.querySelector('.nw-ttl');
      b.innerHTML = '<span class="w">' + c.b + '</span>';
      if(lang !== 'en'){ b.className = 'nw-ttl rtl mixed'; b.setAttribute('data-big', c.big); if(typeof mixedSubs === 'function') mixedSubs(true); }
      else { b.className = 'nw-ttl'; b.removeAttribute('data-big'); }
      e.querySelector('.nw-note').textContent = c.note;
    }
    function tone(){
      if(!el) return;
      var c = getComputedStyle(document.body), g = function(n, d){ var v = (c.getPropertyValue(n) || '').trim(); return v || d; };
      el.style.setProperty('--nwbg', g('--bg', '#E84518'));
      el.style.setProperty('--nwfg', g('--fg', '#FBF7F2'));
      el.style.setProperty('--nwac', g('--acc', '#E84518'));
      el.style.setProperty('--nwln', g('--line', 'rgba(255,255,255,.3)'));
    }

    var nwY = 0;
    window.addEventListener('scroll', function(){
      if(!el || !el.classList.contains('on')) return;
      if(Math.abs(window.scrollY - nwY) > 1) window.scrollTo({top:nwY, behavior:'instant'});
    }, {passive:true});

    function nwBlock(e){ if(H.classList.contains('nwon')) e.preventDefault(); }
    window.addEventListener('wheel', nwBlock, {passive:false});
    window.addEventListener('touchmove', nwBlock, {passive:false});
    function check(){
      if(narrowNow()){ var was = el && el.classList.contains('on'); words(); build();
        if(!was){ tone(); nwY = window.scrollY; }
        el.classList.add('on'); H.classList.add('nwon'); }
      else if(el){ el.classList.remove('on'); H.classList.remove('nwon');
        if(window.__rvRecheck) setTimeout(window.__rvRecheck, 260); }
    }
    if(mq.addEventListener) mq.addEventListener('change', check); else if(mq.addListener) mq.addListener(check);
    window.addEventListener('resize', check, {passive:true});
    window.__narrowCheck = check;
    setTimeout(check, 900);
    window.addEventListener('orientationchange', function(){ setTimeout(check, 420); });
  })();

  (function(){
    var vv = window.visualViewport, H = document.documentElement, t = 0;
    function put(){
      var h = vv ? vv.height : window.innerHeight;
      if(h > 0) H.style.setProperty('--vvh', Math.round(h) + 'px');
    }
    put();
    if(vv){ vv.addEventListener('resize', put); vv.addEventListener('scroll', put); }
    window.addEventListener('resize', function(){ put(); clearTimeout(t); t = setTimeout(put, 260); }, {passive:true});
    window.addEventListener('orientationchange', function(){ setTimeout(put, 60); setTimeout(put, 420); });
  })();
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang')); try{ localStorage.setItem('kosaka-lang', b.getAttribute('data-lang')); }catch(e){} }); });

  try{ if(localStorage.getItem('kosaka-lang') === 'en') setLang('en', true); }catch(e){}

  (function(){
    function L(ja, en){ return document.documentElement.lang === 'en' ? en : ja; }

    var LINES = [
      {k:'y1', ax:'h', n:'主塊開始線', ne:'Main mass start',    dir:'よこ', dire:'horizontal', q:'%sが始まるのは、どの高さだろう', qe:'At what height does the %s begin?', h:'大きなまとまり（主塊）が始まる、上の端。', he:'The upper edge where the main mass begins.'},
      {k:'x1', ax:'v', n:'主塊開始線', ne:'Main mass start',    dir:'たて', dire:'vertical',   q:'%sが始まるのは、左右のどこからだろう', qe:'From where, left to right, does the %s begin?', h:'同じまとまりが始まる、左の端。', he:'The left edge where the same mass begins.'},
      {k:'y2', ax:'h', n:'主塊重心線', ne:'Main mass centre', dir:'よこ', dire:'horizontal', q:'%sの重さの中心は、どの高さだろう', qe:'At what height is the centre of weight of the %s?', h:'まとまりの重さが、上下で釣り合う高さ。', he:'The height where its weight balances.'},
      {k:'x3', ax:'v', n:'主塊重心線', ne:'Main mass centre', dir:'たて', dire:'vertical',   q:'%sの重さの中心は、左右のどこだろう', qe:'Where, left to right, is the centre of weight of the %s?', h:'まとまりの重さが、左右で釣り合う位置。', he:'The point where its weight balances, left to right.'}
    ];
    var GRID = {v:[12, 28, 58, 83], h:[14, 32, 71]};
    var FIXED = {v:[28, 83], h:[71]};
    var BOARDS = [
  {
    "id": "massaki",
    "img": "assets/img/BOARD_01.webp",
    "jp": true,
    "ar": 0.667,
    "t": "広重『隅田川水神の森真崎』",
    "te": "Hiroshige, Suijin Grove at Massaki",
    "src": "構図：歌川広重『名所江戸百景 隅田川水神の森真崎』（1856）",
    "srce": "After Utagawa Hiroshige, One Hundred Famous Views of Edo: Suijin Shrine and Massaki on the Sumida River (1856)",
    "cat": "前景フレームと奥行き",
    "cate": "Foreground frame and depth",
    "a": {
      "y1": 2,
      "x1": 1,
      "y2": 28,
      "x3": 58
    },
    "why": [
      "花の枝はここから。上の縁に接する。",
      "枝と幹の左端。画面の縁のすぐ内側。",
      "花の枝と幹は上が重く見える。重心は上寄り。",
      "右の幹が重い。重心は中央より右。"
    ],
    "whye": [
      "The blossom branch begins here, touching the top of the frame",
      "The left edge of branch and trunk, just inside the frame",
      "Blossoms and trunk look heavy above: the weight sits high",
      "The trunk on the right is heavy: the weight sits right of centre"
    ],
    "obj": "花の枝と幹",
    "obje": "blossom branch and trunk",
    "note": "歌川広重『名所江戸百景』の一図、1856 年。料亭の窓越しに手前へ張り出した梅の枝と、隅田川と筑波山の遠景を重ねています。広重が晩年に多用した「近景を極端に大きく、遠景を小さく」の構図で、枝と川面の間の空きが画面の主役になっています。",
    "notee": "From Hiroshige’s One Hundred Famous Views of Edo, 1856. Seen through a restaurant window, a plum branch thrusts into the foreground over the Sumida River and distant Mount Tsukuba. Hiroshige’s late device of an oversized near object against a tiny far view makes the gap between branch and water the real subject.",
    "q": [
      "花の枝が始まるのは、どの高さだろう",
      "花の枝と幹の左端はどこだろう",
      "花の枝と幹の重さの中心は、どの高さだろう",
      "花の枝と幹の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "At what height does the blossom branch begin?",
      "Where is the left edge of the branch and trunk?",
      "At what height is the centre of weight of the blossom branch and trunk?",
      "Where, left to right, is the centre of weight of the blossom branch and trunk?"
    ]
  },
  {
    "id": "fuji",
    "img": "assets/img/BOARD_02.webp",
    "jp": true,
    "ar": 1.5,
    "t": "北斎『凱風快晴』",
    "te": "Hokusai, Fine Wind, Clear Morning",
    "src": "構図：葛飾北斎『冨嶽三十六景 凱風快晴』（1831 頃）",
    "srce": "After Katsushika Hokusai, Thirty-six Views of Mount Fuji: Fine Wind, Clear Morning (c. 1831)",
    "cat": "主塊と余白面",
    "cate": "Mass and void",
    "a": {
      "y1": 16,
      "x1": 30,
      "y2": 55,
      "x3": 68
    },
    "why": [
      "白い筋が集まる山頂。",
      "山裾が林に消える左端。",
      "裾の広い山。重心は下寄り。",
      "裾は左へ長く伸びる。それでも重心は中央より右。"
    ],
    "whye": [
      "The summit, where the white streaks meet",
      "The left end, where the slope sinks into the forest",
      "A mountain with a broad skirt: the weight sits low",
      "The skirt runs far to the left, yet the weight sits right of centre"
    ],
    "obj": "山",
    "obje": "mountain",
    "note": "葛飾北斎『冨嶽三十六景』の一図で、1831 年ごろの錦絵です。夏の終わりから初秋の早朝、南風が晴れを呼ぶ朝の富士が赤く染まる一瞬を描きました。山だけで画面の大半を占め、空はベロ藍のぼかし、雲は横に流れる筋雲だけ。形を思い切って省いた構図の代表です。",
    "notee": "From Hokusai’s Thirty-six Views of Mount Fuji, printed around 1831. It catches the moment on a clear late-summer dawn when a south wind turns the mountain red. The mountain alone fills most of the sheet; the sky is a gradation of Prussian blue, the clouds mere streaks. A landmark of radical simplification.",
    "q": [
      "山のいちばん高いところはどこだろう",
      "林に消える山裾の左端はどこだろう",
      "山の重さの中心は、どの高さだろう",
      "山の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the mountain?",
      "Where is the left end of the slope, where it sinks into the trees?",
      "At what height is the centre of weight of the mountain?",
      "Where, left to right, is the centre of weight of the mountain?"
    ]
  },
  {
    "id": "milkmaid",
    "img": "assets/img/BOARD_05.webp",
    "jp": false,
    "ar": 0.875,
    "t": "フェルメール『牛乳を注ぐ女』",
    "te": "Vermeer, The Milkmaid",
    "src": "構図：ヨハネス・フェルメール『牛乳を注ぐ女』（1658 頃）",
    "srce": "After Johannes Vermeer, The Milkmaid (c. 1658)",
    "cat": "主塊と余白面",
    "cate": "Mass and void",
    "a": {
      "y1": 14,
      "x1": 29,
      "y2": 55,
      "x3": 60
    },
    "why": [
      "頭巾のいちばん上。",
      "肘の左端。人物はここから。",
      "前掛けと裾が重い。重心は下寄り。",
      "人物は画面の右寄りに立つ。重心はやや右。"
    ],
    "whye": [
      "The top of the cap",
      "The left of the elbow, where the figure begins",
      "Apron and skirt are heavy: the weight sits low",
      "The figure stands right of centre: the weight sits a little right"
    ],
    "obj": "人物",
    "obje": "figure",
    "note": "ヨハネス・フェルメール『牛乳を注ぐ女』、1658 年ごろ、油彩。45×41cm の小さな画面に、左の窓からの光、テーブルの静物、注がれる牛乳の一筋。光を点で置く技法でパンや壁の質感を描いています。生活の一瞬を静かに止めた作です。",
    "notee": "Johannes Vermeer’s The Milkmaid, around 1658, oil on canvas. Within a small 45 by 41 cm panel: light from the left window, a still life on the table, a thin stream of milk. Dots of light render the bread and the wall. A quiet moment of ordinary life held still.",
    "q": [
      "頭巾のいちばん高いところはどこだろう",
      "人物の左端はどこだろう",
      "人物の重さの中心は、どの高さだろう",
      "人物の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the cap?",
      "Where is the left edge of the figure?",
      "At what height is the centre of weight of the figure?",
      "Where, left to right, is the centre of weight of the figure?"
    ]
  },
  {
    "id": "wanderer",
    "img": "assets/img/BOARD_06.webp",
    "jp": false,
    "ar": 0.75,
    "t": "フリードリヒ『雲海の上の旅人』",
    "te": "Friedrich, Wanderer above the Sea of Fog",
    "src": "構図：カスパー・ダーヴィト・フリードリヒ『雲海の上の旅人』（1818 頃）",
    "srce": "After Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818)",
    "cat": "前景フレームと奥行き",
    "cate": "Foreground frame and depth",
    "a": {
      "y1": 29,
      "x1": 4,
      "y2": 70,
      "x3": 50
    },
    "why": [
      "頭のいちばん上。",
      "人と足元の岩がひとつの塊に見える。左端は岩の縁。",
      "岩の重みで重心は下寄り。",
      "岩を合わせても重心はほぼ中央。"
    ],
    "whye": [
      "The top of the head",
      "Figure and rock read as one mass: the left edge is the rock's",
      "The rock's weight keeps the centre low",
      "Even counting the rock, the weight stays near the middle"
    ],
    "obj": "人と岩",
    "obje": "figure and rock",
    "note": "カスパー・ダーヴィト・フリードリヒ『雲海の上の旅人』、1818 年ごろ、油彩。後ろ姿の人物を画面の中心に立たせ、その向こうに霧の海と山を広げます。見る人が人物と同じ視線になるこの「後ろ姿」は、ドイツ・ロマン主義を代表する構図です。",
    "notee": "Caspar David Friedrich’s Wanderer above the Sea of Fog, around 1818, oil. A figure seen from behind stands at the centre, with a sea of fog and mountains beyond. This back view, which puts the viewer in the wanderer’s place, is the signature composition of German Romanticism.",
    "q": [
      "頭のいちばん高いところはどこだろう",
      "岩の左端はどこだろう",
      "人と岩の重さの中心は、どの高さだろう",
      "人と岩の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the head?",
      "Where is the left edge of the rock?",
      "At what height is the centre of weight of the figure and rock?",
      "Where, left to right, is the centre of weight of the figure and rock?"
    ]
  },
  {
    "id": "gleaners",
    "img": "assets/img/BOARD_07.webp",
    "jp": false,
    "ar": 1.333,
    "t": "ミレー『落穂拾い』",
    "te": "Millet, The Gleaners",
    "src": "構図：ジャン＝フランソワ・ミレー『落穂拾い』（1857）",
    "srce": "After Jean-François Millet, The Gleaners (1857)",
    "cat": "反復と変奏",
    "cate": "Repetition and variation",
    "a": {
      "y1": 28,
      "x1": 14,
      "y2": 60,
      "x3": 50
    },
    "why": [
      "右の人の頭。三人でいちばん高い。",
      "左の人が伸ばした手の先。ここが三人の左端。",
      "かがんだ姿は下が重い。重心は中ほどより下。",
      "三人のちょうど真ん中。"
    ],
    "whye": [
      "The head on the right, the highest of the three",
      "The reaching hand of the left figure: the left edge of the three",
      "Stooping figures are heavy below: the weight sits under the middle",
      "Right in the middle of the three"
    ],
    "obj": "三人",
    "obje": "three figures",
    "note": "ジャン＝フランソワ・ミレー『落穂拾い』、1857 年、油彩。刈り入れ後の畑で落穂を拾う三人の女性を、地平線を高く取って手前に大きく描きます。遠くの豊かな収穫と手前の労働の対比が、発表当時は農民を描く政治的な絵として論争になりました。",
    "notee": "Jean-François Millet’s The Gleaners, 1857, oil. Three women gather leftover grain after the harvest, drawn large against a high horizon. The abundant harvest in the distance against the labor in front caused controversy at the time as a political picture of the peasantry.",
    "q": [
      "いちばん高い頭はどこだろう",
      "三人のまとまりの左端はどこだろう",
      "三人の重さの中心は、どの高さだろう",
      "三人の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest head?",
      "Where is the left edge of the three figures together?",
      "At what height is the centre of weight of the three figures?",
      "Where, left to right, is the centre of weight of the three figures?"
    ]
  },
  {
    "id": "barrel",
    "img": "assets/img/BOARD_08.webp",
    "jp": true,
    "ar": 1.5,
    "t": "北斎『尾州不二見原』",
    "te": "Hokusai, Fujimigahara in Owari",
    "src": "構図：葛飾北斎『冨嶽三十六景 尾州不二見原』（1831 頃）",
    "srce": "After Katsushika Hokusai, Thirty-six Views of Mount Fuji: Fujimigahara in Owari Province (c. 1831)",
    "cat": "前景フレームと奥行き",
    "cate": "Foreground frame and depth",
    "a": {
      "y1": 21,
      "x1": 28,
      "y2": 57,
      "x3": 52
    },
    "why": [
      "桶のいちばん上。輪の頂点。",
      "桶の左の端。輪がいちばん外へ張り出すところ。",
      "桶は画面の下寄りに大きく座る。重心はやや下。",
      "輪は左右に偏らない。重心はほぼ中央。"
    ],
    "whye": [
      "The top of the barrel, the crown of the ring",
      "The left of the barrel, where the ring bulges furthest out",
      "The barrel sits low and large in the frame: the weight sits a little low",
      "The ring leans neither way: the weight sits near the middle"
    ],
    "obj": "桶",
    "obje": "barrel",
    "note": "葛飾北斎『冨嶽三十六景』の「尾州不二見原」、1831 年ごろ。桶職人が大きな桶の胴を削る手前の場面と、桶の輪の中に小さく収まる富士。丸い枠で遠くの山を切り取る「見立て」の構図で、近くの人の営みと遠くの山を一枚に重ねています。",
    "notee": "Hokusai’s Fujimigahara in Owari Province, Thirty-six Views, around 1831. A cooper shaves the inside of a huge barrel, and Fuji appears small through the barrel’s hoop. The round frame that crops the distant mountain layers everyday work in the foreground onto the far view.",
    "q": [
      "桶のいちばん高いところはどこだろう",
      "桶の左端はどこだろう",
      "桶の重さの中心は、どの高さだろう",
      "桶の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the barrel?",
      "Where is the left edge of the barrel?",
      "At what height is the centre of weight of the barrel?",
      "Where, left to right, is the centre of weight of the barrel?"
    ]
  },
  {
    "id": "kiss",
    "img": "assets/img/BOARD_11.webp",
    "jp": false,
    "ar": 1.0,
    "t": "クリムト『接吻』",
    "te": "Klimt, The Kiss",
    "src": "構図：グスタフ・クリムト『接吻』（1908）",
    "srce": "After Gustav Klimt, The Kiss (1908)",
    "cat": "主塊と余白面",
    "cate": "Mass and void",
    "a": {
      "y1": 2,
      "x1": 27,
      "y2": 45,
      "x3": 50
    },
    "why": [
      "頭のいちばん上。",
      "抱き合う二人がひとつの塊に見える。その左端。",
      "金色の衣は上から下まで細長い。重心は中ほど。",
      "衣の幅は左右に等しい。重心は中央。"
    ],
    "whye": [
      "The top of the heads",
      "The pair reads as one mass: this is its left edge",
      "The gold robe is tall and narrow top to bottom: the weight sits mid-height",
      "The robe spreads evenly either way: the weight sits at the centre"
    ],
    "obj": "二人",
    "obje": "two figures",
    "note": "グスタフ・クリムト『接吻』、1907〜08 年、油彩に金箔。ほぼ正方形の画面の中で、抱き合う二人が一つの金の塊になり、足元だけに花の草地が見えます。ウィーン分離派の装飾性と、人物をひとつの面に溶かす構図が特徴です。",
    "notee": "Gustav Klimt’s The Kiss, 1907–08, oil and gold leaf. On an almost square canvas the embracing couple fuse into a single golden mass, with a flowered meadow only at their feet. It shows the ornament of the Vienna Secession and a composition that melts figures into one plane.",
    "q": [
      "頭のいちばん高いところはどこだろう",
      "抱き合う二人の左端はどこだろう",
      "二人の重さの中心は、どの高さだろう",
      "二人の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the head?",
      "Where is the left edge of the embracing pair?",
      "At what height is the centre of weight of the two figures?",
      "Where, left to right, is the centre of weight of the two figures?"
    ]
  },
  {
    "id": "wave",
    "img": "assets/img/BOARD_13.webp",
    "jp": true,
    "ar": 1.5,
    "t": "北斎『神奈川沖浪裏』",
    "te": "Hokusai, Under the Wave off Kanagawa",
    "src": "構図：葛飾北斎『冨嶽三十六景 神奈川沖浪裏』（1831 頃）",
    "srce": "After Katsushika Hokusai, Thirty-six Views of Mount Fuji: Under the Wave off Kanagawa (c. 1831)",
    "cat": "対置と中間領域",
    "cate": "Opposition and the space between",
    "a": {
      "y1": 7,
      "x1": 1,
      "y2": 45,
      "x3": 30
    },
    "why": [
      "大波のいちばん上。白い波頭の先。",
      "大波はここから。左の縁に接する。",
      "反り返った波頭と胴を合わせて重心は中ほど。",
      "大波は左へ寄る。重心も左寄り。"
    ],
    "whye": [
      "The top of the great wave, the tip of the white crest",
      "The great wave begins here, at the left edge",
      "Curling crest and body together: the weight sits mid-height",
      "The great wave gathers to the left: the weight sits left too"
    ],
    "obj": "大波",
    "obje": "great wave",
    "note": "葛飾北斎『冨嶽三十六景』の一図、1831 年ごろ。手前で砕ける大波が画面を覆い、遠くに小さな富士が見えます。当時輸入されたばかりのベロ藍を使い、波の曲線が富士を包み込むように配されています。西洋の遠近法を学んだ北斎が、近景と遠景の大きさの逆転で奥行きをつくった図です。",
    "notee": "From Hokusai’s Thirty-six Views of Mount Fuji, around 1831. A breaking wave dominates the sheet while Fuji sits small in the distance. Printed with newly imported Prussian blue, its curve seems to cradle the mountain. Hokusai, who had studied Western perspective, builds depth by reversing the scale of near and far.",
    "q": [
      "大波のいちばん高いところはどこだろう",
      "大波が始まるのは、左右のどこからだろう",
      "大波の重さの中心は、どの高さだろう",
      "大波の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the great wave?",
      "From where, left to right, does the great wave begin?",
      "At what height is the centre of weight of the great wave?",
      "Where, left to right, is the centre of weight of the great wave?"
    ]
  },
  {
    "id": "ohashi",
    "img": "assets/img/BOARD_14.webp",
    "jp": true,
    "ar": 0.667,
    "t": "広重『大はしあたけの夕立』",
    "te": "Hiroshige, Sudden Shower over Shin-Ōhashi Bridge",
    "src": "構図：歌川広重『名所江戸百景 大はしあたけの夕立』（1857）",
    "srce": "After Utagawa Hiroshige, One Hundred Famous Views of Edo: Sudden Shower over Shin-Ōhashi Bridge and Atake (1857)",
    "cat": "水平分節と上下構成",
    "cate": "Horizontal division, upper and lower",
    "a": {
      "y1": 53,
      "x1": 1,
      "y2": 70,
      "x3": 52
    },
    "why": [
      "橋の板のいちばん高いところ。右の端で上がりきる。",
      "橋はここから。左の縁に接する。",
      "橋桁と杭で重心は下寄り。",
      "渡された橋のちょうど中ほど。"
    ],
    "whye": [
      "The highest point of the bridge deck, where it tops out at the right end",
      "The bridge begins here, at the left edge",
      "Girders and piles put the weight low",
      "Right at the middle of the span"
    ],
    "obj": "橋",
    "obje": "bridge",
    "note": "歌川広重『名所江戸百景』の「大はしあたけの夕立」、1857 年。夕立に打たれて橋を渡る人々を、細い雨の線と暗い空で描きます。橋を斜めに置き、対岸の安宅を薄く沈めた大胆な構図で、のちにゴッホが油彩で模写したことでも知られます。",
    "notee": "Hiroshige’s Sudden Shower over Shin-Ōhashi Bridge and Atake, One Hundred Famous Views of Edo, 1857. People cross the bridge under thin lines of rain and a dark sky. The bridge cuts diagonally while the far bank sinks into mist, a bold layout that van Gogh later copied in oil.",
    "q": [
      "橋のいちばん高いところはどこだろう",
      "橋が始まるのは、左右のどこからだろう",
      "橋の重さの中心は、どの高さだろう",
      "橋の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the bridge?",
      "From where, left to right, does the bridge begin?",
      "At what height is the centre of weight of the bridge?",
      "Where, left to right, is the centre of weight of the bridge?"
    ]
  },
  {
    "id": "kameido",
    "img": "assets/img/BOARD_15.webp",
    "jp": true,
    "ar": 0.667,
    "t": "広重『亀戸梅屋舗』",
    "te": "Hiroshige, Plum Garden at Kameido",
    "src": "構図：歌川広重『名所江戸百景 亀戸梅屋舗』（1857）",
    "srce": "After Utagawa Hiroshige, One Hundred Famous Views of Edo: Plum Garden at Kameido (1857)",
    "cat": "前景フレームと奥行き",
    "cate": "Foreground frame and depth",
    "a": {
      "y1": 1,
      "x1": 1,
      "y2": 60,
      "x3": 45
    },
    "why": [
      "幹はここから。上の縁に接する。",
      "幹はここから。左の縁に接する。",
      "幹は下が太い。重心は下寄り。",
      "斜めに走る幹の中ほど。やや左。"
    ],
    "whye": [
      "The trunk begins here, touching the top of the frame",
      "The trunk begins here, at the left edge",
      "The trunk is thicker below: the weight sits low",
      "The middle of the diagonal trunk, a little left"
    ],
    "obj": "幹",
    "obje": "trunk",
    "note": "歌川広重『名所江戸百景』の「亀戸梅屋舗」、1857 年。臥龍梅と呼ばれた名木の幹を画面いっぱいに置き、枝の隙間から梅園と人々をのぞかせます。地平の赤い空と幹の黒の対比が強く、これもゴッホが模写した図です。",
    "notee": "Hiroshige’s Plum Garden at Kameido, One Hundred Famous Views of Edo, 1857. The trunk of the famous “reclining dragon” plum fills the sheet, and the garden and visitors peek through the branches. The red horizon sky against the black trunk is another image van Gogh copied.",
    "q": [
      "幹が始まるのは、どの高さだろう",
      "幹が始まるのは、左右のどこからだろう",
      "幹の重さの中心は、どの高さだろう",
      "幹の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "At what height does the trunk begin?",
      "From where, left to right, does the trunk begin?",
      "At what height is the centre of weight of the trunk?",
      "Where, left to right, is the centre of weight of the trunk?"
    ]
  },
  {
    "id": "pines",
    "img": "assets/img/BOARD_17.webp",
    "jp": true,
    "ar": 2.344,
    "t": "等伯『松林図屏風』",
    "te": "Tōhaku, Pine Trees",
    "src": "構図：長谷川等伯『松林図屏風』左隻（16世紀末）",
    "srce": "After Hasegawa Tōhaku, Pine Trees, left-hand screen (late 16th century)",
    "cat": "密度差と空間の抜け",
    "cate": "Density contrast and open space",
    "a": {
      "y1": 21,
      "x1": 12,
      "y2": 58,
      "x3": 29
    },
    "why": [
      "いちばん濃い松のてっぺん。手前に立つ一本。",
      "濃いほうの松林の左端。いちばん左に垂れる枝の先。",
      "枝は上、幹は下。合わせて重心はやや下。",
      "濃いほうの松林の中ほど。画面では左寄り。"
    ],
    "whye": [
      "The top of the darkest pine, the one standing nearest",
      "The left edge of the darker grove, the tip of the lowest branch",
      "Branches above, trunks below: together the weight sits a little low",
      "Mid-way through the darker grove, left of centre on the screen"
    ],
    "obj": "濃いほうの松林",
    "obje": "darker grove",
    "note": "長谷川等伯『松林図屏風』、16 世紀末の水墨、国宝。六曲一双の屏風に霧の中の松林だけを描いています。濃い松と薄い松の距離、何も描かれていない紙の余白そのものが奥行きになっていて、日本の「間」を語るときに必ず挙げられる作です。",
    "notee": "Hasegawa Tōhaku’s Pine Trees, late sixteenth century, ink on paper, a National Treasure. Across a pair of six-panel screens there is nothing but pines in mist. The distance between dark and pale trees, and the untouched paper itself, become depth. It is the work most often cited for the Japanese sense of ma, the space between.",
    "q": [
      "いちばん濃い松のてっぺんはどこだろう",
      "松林の左端はどこだろう",
      "松林の重さの中心は、どの高さだろう",
      "松林の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the top of the darkest pine?",
      "Where is the left edge of the grove?",
      "At what height is the centre of weight of the grove?",
      "Where, left to right, is the centre of weight of the grove?"
    ]
  },
  {
    "id": "sesshu",
    "img": "assets/img/BOARD_18.webp",
    "jp": true,
    "ar": 0.5,
    "t": "雪舟『秋冬山水図（冬）』",
    "te": "Sesshū, Winter Landscape",
    "src": "構図：雪舟等楊『秋冬山水図』冬景（15世紀後半）",
    "srce": "After Sesshū Tōyō, Autumn and Winter Landscapes: Winter (late 15th century)",
    "cat": "垂直反復と高低差",
    "cate": "Vertical repetition and height",
    "a": {
      "y1": 12,
      "x1": 37,
      "y2": 55,
      "x3": 55
    },
    "why": [
      "崖のいちばん上。一本の線から始まっているように見える。",
      "崖の左端。先ほどの一本の線がそのまま境目。",
      "崖は下が厚く見える。重心はやや下。",
      "崖が右へ張り出す分、重心は中ほどよりわずかに右。"
    ],
    "whye": [
      "The top of the cliff: it looks as though a single line starts here",
      "The left edge of the cliff: the line we just saw is the boundary",
      "The cliff looks thicker below: the weight sits a little low",
      "The cliff juts to the right: the weight sits just right of the middle"
    ],
    "obj": "崖",
    "obje": "cliff",
    "note": "雪舟『秋冬山水図』の冬景、15 世紀後半、国宝。画面の中央を貫いて立ち上がる崖の輪郭線が有名で、上へ行くほど太く濃くなります。中国で学んだ水墨の骨法を、思い切った線で日本の画面に置き換えた一幅です。",
    "notee": "Sesshū’s Winter Landscape from Autumn and Winter Landscapes, late fifteenth century, a National Treasure. A cliff’s outline shoots up through the centre of the sheet, growing thicker and darker as it rises. Sesshū turned the ink techniques he studied in China into a single decisive line.",
    "q": [
      "崖のいちばん高いところはどこだろう",
      "崖の左端はどこだろう",
      "崖の重さの中心は、どの高さだろう",
      "崖の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the cliff?",
      "Where is the left edge of the cliff?",
      "At what height is the centre of weight of the cliff?",
      "Where, left to right, is the centre of weight of the cliff?"
    ]
  },
  {
    "id": "kambara",
    "img": "assets/img/BOARD_03.webp",
    "jp": true,
    "ar": 1.5,
    "t": "広重『蒲原 夜之雪』",
    "te": "Hiroshige, Kambara, Night Snow",
    "src": "構図：歌川広重『東海道五十三次 蒲原 夜之雪』（1833 頃）",
    "srce": "After Utagawa Hiroshige, Fifty-three Stations of the Tōkaidō: Kambara, Night Snow (c. 1833)",
    "cat": "水平分節と上下構成",
    "cate": "Horizontal division, upper and lower",
    "a": {
      "y1": 43,
      "x1": 14,
      "y2": 58,
      "x3": 55
    },
    "why": [
      "いちばん高い屋根の上端。通りの奥にある大きな一軒。",
      "左の家の左端。",
      "雪の積もる屋根。重心はやや下。",
      "家並みの中ほど。やや右。"
    ],
    "whye": [
      "The top of the highest roof, the large house down the street",
      "The left edge of the leftmost house",
      "Roofs piled with snow: the weight sits a little low",
      "The middle of the row, a little right"
    ],
    "obj": "家並み",
    "obje": "row of houses",
    "note": "歌川広重『東海道五十三次』の「蒲原 夜之雪」、1833〜34 年ごろ。雪の夜道を行く旅人をほぼ墨一色の階調で描きます。実際の蒲原は雪の少ない土地で、この静けさは広重の創作と言われます。人物の小ささと、山と空の広い余白が印象を決めています。",
    "notee": "Hiroshige’s Kambara, Night Snow from the Fifty-three Stations of the Tōkaidō, around 1833–34. Travelers walk a snowy road in near monochrome. Kambara rarely sees snow; the stillness is Hiroshige’s invention. The tiny figures and the broad emptiness of hills and sky set the mood.",
    "q": [
      "いちばん高い屋根はどこだろう",
      "家並みの左端はどこだろう",
      "家並みの重さの中心は、どの高さだろう",
      "家並みの重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest roof?",
      "Where is the left edge of the row of houses?",
      "At what height is the centre of weight of the row of houses?",
      "Where, left to right, is the centre of weight of the row of houses?"
    ]
  },
  {
    "id": "poppin",
    "img": "assets/img/BOARD_04.webp",
    "jp": true,
    "ar": 0.667,
    "t": "歌麿『ビードロを吹く娘』",
    "te": "Utamaro, Young Woman Blowing a Poppin",
    "src": "構図：喜多川歌麿『婦女人相十品 ポッピンを吹く娘』（1792 頃）",
    "srce": "After Kitagawa Utamaro, Ten Physiognomies of Women: Young Woman Blowing a Glass Pipe (c. 1792)",
    "cat": "主塊と余白面",
    "cate": "Mass and void",
    "a": {
      "y1": 14,
      "x1": 19,
      "y2": 58,
      "x3": 60
    },
    "why": [
      "結い上げた髪のいちばん上。",
      "左の袖がいちばん外へ出るところ。",
      "着物は下に広がる。重心は中ほどより下。",
      "顔は左向き。身体は右へ広がる。重心はやや右。"
    ],
    "whye": [
      "The top of the piled-up hair",
      "Where the left sleeve reaches furthest out",
      "The kimono spreads below: the weight sits below the middle",
      "The face turns left, the body spreads right: the weight sits slightly right"
    ],
    "obj": "人物",
    "obje": "figure",
    "note": "喜多川歌麿が 1792 年ごろに出した大首絵の連作「婦女人相十品」の一図。市松模様の振袖を着た娘がガラスの玩具ポッピンを吹く一瞬を捉えました。雲母摺の背景に人物を画面の中央やや右に大きく置き、袖の模様と髪の黒が主塊を作ります。",
    "notee": "From Kitagawa Utamaro's series of large-head portraits, Ten Physiognomies of Women, c. 1792. A young woman in a checked kimono blows a glass toy called a poppin. Against a mica ground the figure sits large, slightly right of centre; the sleeve pattern and the black hair make the mass.",
    "q": [
      "髪のいちばん高いところはどこだろう",
      "左の袖がいちばん張り出すのはどこだろう",
      "人物の重さの中心は、どの高さだろう",
      "人物の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the hair?",
      "Where does the left sleeve reach out furthest?",
      "At what height is the centre of weight of the figure?",
      "Where, left to right, is the centre of weight of the figure?"
    ]
  },
  {
    "id": "whistler",
    "img": "assets/img/BOARD_09.webp",
    "jp": false,
    "ar": 1.126,
    "t": "ホイッスラー『母の肖像』",
    "te": "Whistler, Arrangement in Grey and Black No. 1",
    "src": "構図：ジェームズ・マクニール・ホイッスラー『灰色と黒のアレンジメント 第1番（母の肖像）』（1871）",
    "srce": "After James McNeill Whistler, Arrangement in Grey and Black No. 1 (1871)",
    "cat": "対置と中間領域",
    "cate": "Opposition and the space between",
    "a": {
      "y1": 12,
      "x1": 25,
      "y2": 62,
      "x3": 62
    },
    "why": [
      "白い頭巾の上端。",
      "裾の左端。足台の上まで流れる。",
      "黒い服は下に広がる。重心は下寄り。",
      "上体は右、裾は左。重心は右寄り。"
    ],
    "whye": [
      "Top of the white cap",
      "The left end of the hem, sweeping over the footstool",
      "The black dress spreads below: the weight sits low",
      "The upper body sits right, the hem runs left: the weight sits right"
    ],
    "obj": "人物",
    "obje": "figure",
    "note": "ジェームズ・マクニール・ホイッスラーが 1871 年にロンドンで描いた油彩（オルセー美術館）。黒い服の母を横向きに座らせ、灰色の壁、黒いカーテン、額の矩形で画面を組みました。題名が示すとおり肖像というより色面の配置の絵で、人物は画面の右寄りに置かれています。",
    "notee": "Oil by James McNeill Whistler, painted in London in 1871 (Musee d'Orsay). His mother sits in profile in black against a grey wall, a black curtain and the rectangles of framed pictures. As the title says, it is an arrangement of tones more than a portrait, and the figure sits to the right.",
    "q": [
      "白い頭巾のいちばん高いところはどこだろう",
      "裾の左端はどこだろう",
      "人物の重さの中心は、どの高さだろう",
      "人物の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the white cap?",
      "Where is the left edge of the hem?",
      "At what height is the centre of weight of the figure?",
      "Where, left to right, is the centre of weight of the figure?"
    ]
  },
  {
    "id": "scream",
    "img": "assets/img/BOARD_10.webp",
    "jp": false,
    "ar": 0.8,
    "t": "ムンク『叫び』",
    "te": "Munch, The Scream",
    "src": "構図：エドヴァルド・ムンク『叫び』（1893）",
    "srce": "After Edvard Munch, The Scream (1893)",
    "cat": "前景フレームと奥行き",
    "cate": "Foreground frame and depth",
    "a": {
      "y1": 46,
      "x1": 30,
      "y2": 80,
      "x3": 46
    },
    "why": [
      "両手で挟んだ頭の上端。",
      "外套がいちばん左へ出るところ。",
      "頭は小さく、身体は下へ広がる。重心は下。",
      "重心は中央よりわずかに左。"
    ],
    "whye": [
      "The top of the head, held between both hands",
      "Where the cloak reaches furthest to the left",
      "Small head, body widening downward: the weight sits low",
      "The weight sits slightly left of centre"
    ],
    "obj": "人物",
    "obje": "figure",
    "note": "エドヴァルド・ムンクが 1893 年に描いた最初の『叫び』（オスロ国立美術館）。オスロ近郊の丘の道で夕焼けが血の色に変わったときの不安を、うねる線で描きました。左から右下へ走る手すりの対角線が奥行きを作り、前景の人物を画面の右下寄りに置きます。",
    "notee": "The first version of The Scream, painted by Edvard Munch in 1893 (National Museum, Oslo). On a hill path near Oslo the sunset turned blood red and he felt a scream through nature, drawn in waving lines. The railing runs from the left down to the lower right and makes the depth; the figure stands lower right.",
    "q": [
      "頭のいちばん高いところはどこだろう",
      "人物の左端はどこだろう",
      "人物の重さの中心は、どの高さだろう",
      "人物の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the head?",
      "Where is the left edge of the figure?",
      "At what height is the centre of weight of the figure?",
      "Where, left to right, is the centre of weight of the figure?"
    ]
  },
  {
    "id": "fujinraijin",
    "img": "assets/img/BOARD_12.webp",
    "jp": true,
    "ar": 2.381,
    "t": "宗達『風神雷神図屏風』",
    "te": "Sōtatsu, Wind God and Thunder God",
    "src": "構図：俵屋宗達『風神雷神図屏風』（17世紀前半）",
    "srce": "After Tawaraya Sōtatsu, Wind God and Thunder God (early 17th century)",
    "cat": "対置と中間領域",
    "cate": "Opposition and the space between",
    "a": {
      "y1": 3,
      "x1": 62,
      "y2": 45,
      "x3": 80
    },
    "why": [
      "風神がかつぐ白い布のいちばん上。",
      "風神が乗る黒い雲の左端。",
      "頭と胴が上寄り、雲が下に垂れる。重心はやや上。",
      "風神は右の端へ寄る。重心も右寄り。"
    ],
    "whye": [
      "The top of the white cloth the wind god carries",
      "The left edge of the dark cloud the wind god rides",
      "Head and torso sit high, the clouds hang below: the weight is slightly high",
      "The wind god keeps to the right edge: the weight sits right too"
    ],
    "obj": "右の風神",
    "obje": "wind god on the right",
    "note": "俵屋宗達が 17 世紀前半に描いた二曲一双の屏風で、建仁寺に伝わりました。金地の画面の左右の端に雷神と風神を寄せ、中央を大きく空けた構図です。二神は画面からはみ出すほど外側に置かれ、その間の何もない金地が緊張を生みます。のちに光琳、抱一が写した、琳派を象徴する一作です。",
    "notee": "A pair of two-panel screens by Tawaraya Sotatsu, painted in the early 17th century and handed down at Kennin-ji. The thunder god and the wind god are pushed to the far left and right of the gold ground, leaving the centre empty; the empty gold between them carries the tension. Korin and Hoitsu later copied it, and it stands for the Rinpa school.",
    "q": [
      "白い布の弧のいちばん高いところはどこだろう",
      "黒い雲の左端はどこだろう",
      "風神の重さの中心は、どの高さだろう",
      "風神の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the highest point of the arc of white cloth?",
      "Where is the left edge of the dark cloud?",
      "At what height is the centre of weight of the wind god?",
      "Where, left to right, is the centre of weight of the wind god?"
    ]
  },
  {
    "id": "irises",
    "img": "assets/img/BOARD_16.webp",
    "jp": true,
    "ar": 2.532,
    "t": "光琳『燕子花図屏風』",
    "te": "Kōrin, Irises",
    "src": "構図：尾形光琳『燕子花図屏風』（18世紀初頭）",
    "srce": "After Ogata Kōrin, Irises (early 18th century)",
    "cat": "反復と変奏",
    "cate": "Repetition and variation",
    "a": {
      "y1": 3,
      "x1": 1,
      "y2": 48,
      "x3": 10
    },
    "why": [
      "いちばん高く伸びた花の先。",
      "左の花群の左端。画面の縁に接する。",
      "花は上半分、葉は下へ。重心は中ほど。",
      "左の花群の中ほど。"
    ],
    "whye": [
      "The tip of the tallest iris",
      "The left edge of the left cluster, touching the frame",
      "Flowers in the upper half, leaves running down: the weight sits mid-height",
      "Mid-way through the left cluster"
    ],
    "note": "尾形光琳が 1701 年ごろに描いた六曲一双の屏風（根津美術館）。伊勢物語の八橋の段を、橋も水も描かず、金地に群青と緑青の燕子花だけで表しました。花群を左から右へ、高さを変えながら並べる反復が主題で、同じ形の型を繰り返し使ったとも言われます。",
    "notee": "A pair of six-panel screens by Ogata Korin, c. 1701 (Nezu Museum). The Yatsuhashi episode of the Tales of Ise is shown with no bridge and no water: only irises in ultramarine and malachite green on gold. The subject is repetition, clusters set left to right at changing heights, possibly with reused stencils.",
    "obj": "左の花群",
    "obje": "left cluster",
    "q": [
      "いちばん高い花はどこだろう",
      "左の花群の左端はどこだろう",
      "左の花群の重さの中心は、どの高さだろう",
      "左の花群の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "Where is the tallest flower?",
      "Where is the left edge of the left cluster?",
      "At what height is the centre of weight of the left cluster?",
      "Where, left to right, is the centre of weight of the left cluster?"
    ]
  },
  {
    "id": "mondrian",
    "img": "assets/img/BOARD_19.webp",
    "jp": false,
    "ar": 1.0,
    "t": "モンドリアン『赤・青・黄のコンポジション』",
    "te": "Mondrian, Composition II in Red, Blue, and Yellow",
    "src": "構図：ピート・モンドリアン『赤・青・黄のコンポジション II』（1930）",
    "srce": "After Piet Mondrian, Composition II in Red, Blue, and Yellow (1930)",
    "cat": "主塊と余白面",
    "cate": "Mass and void",
    "a": {
      "y1": 1,
      "x1": 25,
      "y2": 33,
      "x3": 63
    },
    "why": [
      "赤い面は上辺から始まる。",
      "太い黒線と赤い面の境目。",
      "赤は上三分の二を占める。重心はその中ほど。",
      "赤い面の幅の中ほど。画面では右寄り。"
    ],
    "whye": [
      "The red plane starts at the top edge",
      "The boundary between the thick black line and the red plane",
      "Red fills the upper two thirds: the weight sits in its middle",
      "Mid-way across the red plane, right of centre on the screen"
    ],
    "note": "ピート・モンドリアンが 1930 年に描いた油彩（チューリヒ美術館）。黒い直線で画面を割り、赤・青・黄の三原色と白だけで組む「新造形主義」の代表作です。大きな赤い面を右上に置き、小さな青と黄で釣り合いを取ります。",
    "notee": "Oil on canvas by Piet Mondrian, 1930 (Kunsthaus Zurich). Black straight lines divide the plane, and only the three primaries and white fill it: the emblem of Neoplasticism. A large red plane sits top right, balanced by a small blue and a small yellow.",
    "obj": "赤い面",
    "obje": "red plane",
    "q": [
      "赤い面が始まるのは、どの高さだろう",
      "赤い面の左端はどこだろう",
      "赤い面の重さの中心は、どの高さだろう",
      "赤い面の重さの中心は、左右のどこだろう"
    ],
    "qe": [
      "At what height does the red plane begin?",
      "Where is the left edge of the red plane?",
      "At what height is the centre of weight of the red plane?",
      "Where, left to right, is the centre of weight of the red plane?"
    ]
  }
];
    var listEl = null, modeEl = null, lastAvg = null;
    var ORD = ['1枚目', '2枚目', '3枚目'], ORDE = ['first', 'second', 'third'], PC = '<small class="gm-pc">%</small>';
    var gm = null, stage, picEl, linesEl, liveEl, readEl, tipEl, stepEl, resEl, goEl, cardEl, sheetEl, dimEl, drv, drh, introEl, iscroll, introSeen = false, introOn = false;
    var pend = null, startedAt = 0, doneFn = null, picks = [], bi = 0, ti = 0, res = [], live = -1, state = 'idle', down = false, fresh = false, moved = 0, downX = 0, downY = 0, fixedAt = 0, offT = 0, lastFocus = null, first = true;
    var ptype = window.matchMedia('(hover:none),(pointer:coarse)').matches ? 'touch' : 'mouse';
    var rm = document.documentElement.classList.contains('rm');
    function el(t, c, html){ var e = document.createElement(t); if(c) e.className = c; if(html != null) e.innerHTML = html; return e; }
    function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function sg(n){ return (n > 0 ? '+' : n < 0 ? '−' : '±') + Math.abs(n); }

    function phrases(s){
      var out = [], cur = '';
      for(var i = 0; i < s.length; i++){
        var ch = s[i], nx = s[i + 1] || ''; cur += ch;
        if(!nx) break;
        var close = /[、。」』）%％]/.test(nx), kata = /[一-龥々〆ヵヶァ-ヴー]/.test(nx);
        var brk = (/[、。 ]/.test(ch) && !close) || (/[をはがにでとへ]/.test(ch) && kata && cur.length >= 2) || (/(より|から)$/.test(cur) && kata);
        if(brk){ out.push(cur); cur = ''; }
      }
      if(cur) out.push(cur); return out;
    }
    function mix(ja, en, big){
      var out = el('span', 'mx');
      if(document.documentElement.lang === 'en' || typeof mixSet !== 'function'){ out.textContent = document.documentElement.lang === 'en' ? en : ja; return out.outerHTML; }
      ja = ja.replace(/\u3000/g, ' ');
      phrases(ja).forEach(function(ph){
        var w = el('span', 'ph'), i = big ? ph.indexOf(big) : -1, parts = i >= 0 ? [ph.slice(0, i), big, ph.slice(i + big.length)] : [ph];
        parts.forEach(function(pt, k){ if(!pt) return; var sp = el('span', i >= 0 && k === 1 ? 'big' : ''); sp.textContent = pt; mixSet(sp); w.appendChild(sp); });
        out.appendChild(w);
      });
      return out.outerHTML;
    }

    function body(t){
      var plain = document.documentElement.lang === 'en' || !/[\u3040-\u30ff\u3400-\u9fff]/.test(t);
      return String(t).split(/《|》/).map(function(seg, i){
        if(!seg) return '';
        var h = plain ? esc(seg) : phrases(seg).map(function(ph){ return '<span class="ph">' + esc(ph) + '</span>'; }).join('');
        return (i % 2) ? '<mark>' + h + '</mark>' : h;
      }).join('');
    }

    function lite(root){
      if(!root || rm || !root.querySelectorAll) return;
      var ms = root.querySelectorAll('mark:not(.in)'); if(!ms.length) return;
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        [].forEach.call(ms, function(m){ m.classList.add('in'); });
      }); });
    }

    function ttl(b){
      var t = L(b.t, b.te);
      if(document.documentElement.lang === 'en'){ var ci = t.indexOf(', ');
        return ci > 0 ? '<span class="ph gm-aut">' + esc(t.slice(0, ci + 1)) + '</span><span class="ph gm-ttlm">' + esc(t.slice(ci + 1)) + '</span>' : esc(t); }
      var i = t.indexOf('『'); return i > 0 ? '<span class="ph gm-aut">' + esc(t.slice(0, i)) + '</span><span class="ph gm-ttlm">' + esc(t.slice(i)) + '</span>' : esc(t);
    }
    function picOf(b){
      var im = document.createElement('img'); im.className = 'gm-img'; im.alt = ''; im.draggable = false; im.decoding = 'async';
      im.addEventListener('load', function(){ if(im.naturalWidth && im.naturalHeight && picEl.contains(im)) stage.style.setProperty('--ar', (im.naturalWidth / im.naturalHeight).toFixed(3)); });
      im.src = b.img;
      if(im.decode) im.decode().catch(function(){});
      return im;
    }
    function preload(list){ list.forEach(function(b){ var im = new Image(); im.src = b.img; if(im.decode) im.decode().catch(function(){}); }); }

    function mkLine(host, ax, p, cls, label){
      var d = el('i', 'gm-ln ' + ax + (cls ? ' ' + cls : '') + (+p > 86 ? ' edge' : ''));
      d.style[ax === 'v' ? 'left' : 'top'] = (+p).toFixed(2) + '%';
      if(label != null){ var b = el('b'); b.textContent = label; d.appendChild(b); }
      host.appendChild(d); return d;
    }

    function bands(vals){
      var a = vals.slice().sort(function(x, y){ return x - y; }), out = [], prev = 0, i;
      for(i = 0; i < a.length; i++){ out.push({mid:(prev + a[i]) / 2, w:a[i] - prev}); prev = a[i]; }
      out.push({mid:(prev + 100) / 2, w:100 - prev});
      return out;
    }

    var confT = 0;
    function confetti(){
      if(rm || !gm) return;
      try{
        var host = gm.querySelector('.gm-in') || gm;
        var old = host.querySelector('.gm-conf'); if(old && old.parentNode) old.parentNode.removeChild(old);
        var W = host.clientWidth || gm.clientWidth, H = host.clientHeight || gm.clientHeight;
        if(!(W > 0 && H > 0)) return;
        var dpr = Math.min(2, window.devicePixelRatio || 1);
        var cv = el('canvas', 'gm-conf'); cv.setAttribute('aria-hidden', 'true');
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        cv.style.width = W + 'px'; cv.style.height = H + 'px';
        host.appendChild(cv);
        var g = cv.getContext('2d'); if(!g){ cv.parentNode.removeChild(cv); return; }
        g.scale(dpr, dpr);
        var COL = ['#E84518', '#E84518', '#1C1B19', '#F2F1EC', '#E8E6DF', '#C9C6BC'];

        var N = Math.max(110, Math.min(240, Math.round(W / 6))), ps = [];
        for(var i = 0; i < N; i++){
          var lf = (i % 2 === 0), sp = 19 + Math.random() * 20;
          var an = (lf ? -0.62 : Math.PI + 0.62) + (Math.random() - .5) * .62;
          ps.push({x: lf ? -14 : W + 14, y: H * (.54 + Math.random() * .34),
                   vx: Math.cos(an) * sp, vy: Math.sin(an) * sp,
                   w: 6 + Math.random() * 9, h: 4 + Math.random() * 5,
                   a: Math.random() * 6.28, av: (Math.random() - .5) * .5,
                   c: COL[(Math.random() * COL.length) | 0]});
        }
        var t0 = performance.now();
        cancelAnimationFrame(confT);
        (function step(){
          var t = performance.now() - t0;
          g.clearRect(0, 0, W, H);
          var live = 0;
          for(var k = 0; k < ps.length; k++){
            var p = ps[k];
            p.vy += .62; p.vx *= .992; p.vy *= .994; p.x += p.vx; p.y += p.vy; p.a += p.av;
            if(p.y > H + 40 || p.x < -60 || p.x > W + 60) continue;
            live++;
            var al = t > 1400 ? Math.max(0, 1 - (t - 1400) / 700) : 1;
            g.save(); g.globalAlpha = al * .92; g.translate(p.x, p.y); g.rotate(p.a);
            g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.max(.25, Math.cos(p.a * .8)));
            g.restore();
          }
          if(live && t < 2400) confT = requestAnimationFrame(step);
          else { g.clearRect(0, 0, W, H); if(cv.parentNode) cv.parentNode.removeChild(cv); }
        })();
      }catch(e){}
    }
    function mkBands(host, ax, vals, cls, d0){
      return bands(vals).map(function(b, i){

        var d = el('i', 'gm-bd ' + ax + (cls ? ' ' + cls : '') + (b.w < 6 ? ' tiny' + (i % 2 ? ' alt' : '') : ''));
        d.style[ax === 'v' ? 'left' : 'top'] = b.mid.toFixed(2) + '%';
        var t = el('b'); t.textContent = Math.round(b.w) + '%';

        if(d0 != null && !rm) t.style.animationDelay = (d0 + i * .09).toFixed(2) + 's';
        d.appendChild(t);
        host.appendChild(d); return d;
      });
    }
    function ruler(host, n){ for(var i = 0; i <= 10; i++){ var t = el('i', i % 5 ? '' : 'big'); t.style[n === 'v' ? 'left' : 'top'] = (i * 10) + '%'; host.appendChild(t); } }

    function vvFit(){
      var v = window.visualViewport; if(!v || !gm) return;
      var de = document.documentElement;
      var t = Math.max(0, Math.round(v.offsetTop)), l = Math.max(0, Math.round(v.offsetLeft));
      var bm = Math.max(0, Math.round(de.clientHeight - v.height - v.offsetTop));
      var r = Math.max(0, Math.round(de.clientWidth - v.width - v.offsetLeft));
      if(bm > 160) bm = 160; if(t > 160) t = 160; if(l > 160) l = 160; if(r > 160) r = 160;
      gm.style.setProperty('--vvt', t + 'px'); gm.style.setProperty('--vvb', bm + 'px');
      gm.style.setProperty('--vvl', l + 'px'); gm.style.setProperty('--vvr', r + 'px');
      de.style.setProperty('--vvt', t + 'px'); de.style.setProperty('--vvb', bm + 'px');
    }
    function tipFit(){
      if(!tipEl || document.documentElement.classList.contains('phone')) return;
      tipEl.style.top = '';
      var st = stage.getBoundingClientRect().top, hd = document.querySelector('.hd');
      var floor = (hd ? hd.getBoundingClientRect().bottom : 60) + 10;
      var now = parseFloat(getComputedStyle(tipEl).top) || 0;
      if(st + now < floor) tipEl.style.top = Math.round(floor - st) + 'px';
    }
    function fit(){
      if(!gm || gm.hidden) return; var sw = gm.querySelector('.gm-sw'), r = sw.getBoundingClientRect(), rs = gm.querySelector('.gm-side').getBoundingClientRect();
      hdFit(); tbFit();
      setTimeout(tipFit, 60); vvFit();
      if(r.height > 0 && rs.left >= r.left + r.width - 2) stage.style.setProperty('--sh', Math.max(120, Math.round(r.height - 22 - (rot ? 26 : 0))) + 'px');
      else stage.style.removeProperty('--sh');
    }

    function pict(k, cls){
      var s = '<svg class="gm-pi' + (cls ? ' ' + cls : '') + '" viewBox="0 0 34 26" aria-hidden="true"><rect x="1" y="1" width="32" height="24"/><path class="m" d="M11 8 C14 5 22 5 25 8 C28 11 28 17 25 20 C22 23 14 23 11 20 C8 17 8 11 11 8Z"/>';
      if(k === 'y1') s += '<line class="a" x1="1" y1="6" x2="33" y2="6"/>';
      else if(k === 'x1') s += '<line class="a" x1="9" y1="1" x2="9" y2="25"/>';
      else if(k === 'y2') s += '<line class="a" x1="1" y1="14" x2="33" y2="14"/><circle class="a" cx="18" cy="14" r="2.2"/>';
      else s += '<line class="a" x1="18" y1="1" x2="18" y2="25"/><circle class="a" cx="18" cy="14" r="2.2"/>';
      return s + '</svg>';
    }

    var bandEl = null, helpT = 0, trayEl = null;
    function trayReset(){
      trayEl.innerHTML = 'ABC'.split('').map(function(c, i){ var b = picks[i]; return '<i class="gm-slot"><b>' + c + '</b>' + (b ? '<div class="gm-mini pre" style="--ar:' + b.ar + '"><img src="' + b.img + '" alt="" draggable="false"></div>' : '') + '</i>'; }).join('');
    }

    function listBuild(){ if(!listEl) return; listEl.innerHTML = LINES.map(function(t, i){ return '<li data-k="' + t.k + '"><span class="n">' + (i + 1) + '</span>' + pict(t.k) + '<b>' + esc(L(t.n, t.ne)) + '<small>' + esc(L(t.dir, t.dire)) + '</small><button class="gm-q" type="button" aria-label="' + L('この線の役割', 'What this line means') + '">?</button></b><em>\u00b7</em></li>'; }).join(''); listEl.hidden = false;
      listEl.querySelectorAll('.gm-q').forEach(function(q, i){ q.addEventListener('click', function(){ help(LINES[i], true); }); }); }
    function listState(){ if(!listEl) return; var r = res[bi] || {}; LINES.forEach(function(t, i){ var li = listEl.children[i]; if(!li) return; li.className = (i === ti && state !== 'done' ? 'on' : '') + (r[t.k] != null ? ' done' : ''); li.querySelector('em').innerHTML = r[t.k] != null ? r[t.k] + PC : '\u00b7'; }); }
    function listLive(p){ if(!listEl) return; var li = listEl.children[ti]; if(li) li.querySelector('em').innerHTML = Math.round(p) + PC; }
    function mode(t){ if(modeEl) modeEl.textContent = t; }
    function cnt(n){ return (n < 10 ? '0' : '') + n + ' / 12'; }
    function trayFill(i){
      var b = picks[i], r = res[i], slot = trayEl.children[i]; if(!slot || !r || slot.classList.contains('on')) return;
      var pre = slot.querySelector('.gm-mini.pre'); if(pre) pre.parentNode.removeChild(pre);
      var m = el('div', 'gm-mini'); m.style.setProperty('--ar', b.ar); var im = document.createElement('img'); im.src = b.img; im.alt = ''; im.draggable = false; m.appendChild(im);
      LINES.forEach(function(t){ if(r[t.k] != null) mkLine(m, t.ax, r[t.k], 'you'); });
      slot.appendChild(m); slot.classList.add('on');
    }

    function help(t, hold){
      if(tutOn){ tutPend = [t, hold]; return; }
      clearTimeout(helpT);
      bandEl.innerHTML = pict(t.k) + '<b>' + esc(L(t.n, t.ne)) + '<small>' + esc(L(t.dir, t.dire)) + '</small></b><span>' + esc(L(t.h, t.he)) + '</span>';
      var hd = gm.querySelector('.gm-hd').getBoundingClientRect(), g = gm.getBoundingClientRect(); bandEl.style.minHeight = Math.round(hd.bottom - g.top) + 'px';
      bandEl.classList.add('on'); retint(80);
      helpT = setTimeout(helpOff, hold ? 5200 : 4400);
    }
    function helpOff(){ clearTimeout(helpT); if(bandEl && bandEl.classList.contains('on')){ bandEl.classList.remove('on'); retint(480); setTimeout(function(){ if(!bandEl.classList.contains('on') && window.__retint) window.__retint(); }, 1000); } }

    var retintT = 0;
    function retint(ms){ if(!window.__retint) return; clearTimeout(retintT); retintT = setTimeout(function(){ window.__retint(); }, ms || 0); }

    var sealT = 0, ringT = 0, lastX = -1, lastY = -1, ringHold = null, ringCur = null;
    function ringText(txt){ if(ringHold){ var tp = ringHold.querySelector('textPath'); if(tp) tp.textContent = txt; } }

    function cringHold(txt){
      if(ptype === 'touch' || rm) return; cringOff(true);
      var r = cring(txt); if(!r) return; clearTimeout(ringT); r.classList.add('hold'); ringHold = r;
    }
    function cringOff(now){ var r = ringHold; ringHold = null; if(ringCur === r) ringCur = null; if(!r) return; if(now){ if(r.parentNode) r.parentNode.removeChild(r); return; } r.classList.add('bye'); setTimeout(function(){ if(r.parentNode) r.parentNode.removeChild(r); }, 450); }
    function cring(txt){
      if(ptype === 'touch' || rm || lastX < 0) return;
      var old = gm.querySelector('.gm-cring'); if(old && old.parentNode) old.parentNode.removeChild(old); clearTimeout(ringT);
      var r = el('i', 'gm-cring'), id = 'gmcr' + (Date.now() % 100000); ringCur = r;
      var t0 = txt; while(txt.length < 40) txt += t0;
      r.innerHTML = '<svg viewBox="0 0 140 140" aria-hidden="true" style="overflow:visible"><defs><path id="' + id + '" d="M70,70 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0"/></defs>' +
        '<circle cx="70" cy="70" r="50" fill="none" stroke="var(--acc)" stroke-width="2.6"/><circle cx="70" cy="70" r="36" fill="none" stroke="var(--acc)" stroke-width="1" opacity=".5"/>' +
        '<text font-family="var(--mono)" font-size="9.5" letter-spacing="2.2" fill="var(--acc)"><textPath href="#' + id + '" startOffset="0">' + esc(txt) + '</textPath></text></svg>';
      r.style.left = lastX + 'px'; r.style.top = lastY + 'px';
      (introOn ? introEl : gm).appendChild(r); void r.offsetWidth; r.classList.add('on');
      ringT = setTimeout(function(){ r.classList.add('bye'); setTimeout(function(){ if(r.parentNode) r.parentNode.removeChild(r); if(ringCur === r) ringCur = null; }, 450); }, 1500);
      return r;
    }
    var SEALT = {sheet:[380, 550, 280], center:[1100, 1000, 460], corner:[900, 1000, 380], tr:[1000, 2200, 420]};
    function seal(en, jp, host, pos){
      sealOff(true);
      var sp = el('span', 'gm-seal ' + (pos || 'corner')), tm = SEALT[pos] || SEALT.corner; sp.setAttribute('aria-hidden', 'true');
      sp.style.setProperty('--sp', tm[0] + 'ms'); sp.style.setProperty('--sb', tm[2] + 'ms');
      var sv = null;
      try{ if(typeof kakuSvg === 'function') sv = kakuSvg(en, jp, 40 + (Date.now() % 50)); }catch(x){ sv = null; }
      if(!sv){ sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); sv.setAttribute('viewBox', '0 0 156 156'); sv.innerHTML = '<rect x="9" y="9" width="138" height="138" rx="12" fill="none" stroke="var(--acc)" stroke-width="4.2"/><text x="78" y="94" text-anchor="middle" font-family="var(--sans)" font-size="26" font-weight="700" fill="var(--acc)">' + esc(jp) + '</text>'; }
      sp.appendChild(sv); sp.appendChild(el('i', 'gm-sring'));
      host.appendChild(sp); void sp.offsetWidth; sp.classList.add('on');
      sealT = setTimeout(function(){ if(pos === 'center' && !rm) sealPark(sp); else sealOff(false); }, tm[0] + tm[1]);
      return sp;
    }

    function centerSeal(host){
      requestAnimationFrame(function(){ try{
        var sv = host.querySelector('svg'); if(!sv) return;
        var best = null, area = 0;
        [].slice.call(sv.querySelectorAll('text')).forEach(function(t){ var bb = t.getBBox(); var a = bb.width * bb.height; if(a > area){ area = a; best = t; } });
        if(!best || !area) return;
        var bb = best.getBBox(), dx = 78 - (bb.x + bb.width / 2), dy = 78 - (bb.y + bb.height / 2);
        best.setAttribute('transform', 'translate(' + dx.toFixed(1) + ',' + dy.toFixed(1) + ')');
      }catch(e){} });
    }

    var sealRO = null, sealParked = null, sealSW = 0, sealSH = 0;
    function sealPark(sp, snap){
      if(!sp || !sp.parentNode || !stage) return;
      var r = stage.getBoundingClientRect(), w = sp.offsetWidth, h = sp.offsetHeight, k = .5;
      if(!(r.width > 4) || !(w > 4)) return;
      var dx = r.width / 2 - w * k / 2 - Math.max(8, r.width * .02), dy = r.height / 2 - h * k / 2 - Math.max(8, r.height * .03);
      sp.classList.add('park'); sp.classList.toggle('snap', !!snap);
      sp.style.transform = 'translate(calc(-50% + ' + dx.toFixed(1) + 'px), calc(-50% + ' + dy.toFixed(1) + 'px)) scale(' + k + ')';
      sealParked = sp; sealSW = r.width; sealSH = r.height;
      if(!sealRO && window.ResizeObserver){

        sealRO = new ResizeObserver(function(){
          if(!sealParked || !sealParked.parentNode) return;
          var b = stage.getBoundingClientRect();
          if(Math.abs(b.width - sealSW) < .5 && Math.abs(b.height - sealSH) < .5) return;
          sealPark(sealParked, true);
        });
        try{ sealRO.observe(stage); }catch(x){}
      }
    }
    function sealOff(now){
      clearTimeout(sealT); sealParked = null; if(!gm) return;
      gm.querySelectorAll('.gm-seal').forEach(function(x){
        if(now || rm || x.classList.contains('bye')){ if(now || rm){ if(x.parentNode) x.parentNode.removeChild(x); } return; }
        x.classList.add('bye'); setTimeout(function(){ if(x.parentNode) x.parentNode.removeChild(x); }, 420);
      });
    }
    function inside(e){ var r = stage.getBoundingClientRect(); return e.clientX >= r.left - 1 && e.clientX <= r.right + 1 && e.clientY >= r.top - 1 && e.clientY <= r.bottom + 1; }
    function build(){
      if(gm) return;
      gm = el('div', 'gm'); gm.id = 'gm'; gm.setAttribute('role', 'dialog'); gm.setAttribute('aria-modal', 'true'); gm.setAttribute('aria-label', '絵を、測る。'); gm.hidden = true;
      gm.innerHTML =
        '<div class="gm-in">' +
          '<div class="gm-band" role="status" aria-live="polite"></div>' +
          '<div class="gm-hd"><b class="gm-ttl"></b><span class="gm-sub"></span><button class="gm-i" type="button" aria-label="この絵と線について">i</button><button class="gm-x" type="button" aria-label="閉じる">×</button></div>' +
          '<div class="gm-body">' +
            '<div class="gm-sw"><div class="gm-stage" tabindex="0" role="application" aria-label="盤面">' +
              '<div class="gm-turn">' +
              '<div class="gm-pic"></div><i class="gm-axis v"></i><i class="gm-axis h"></i>' +
              '<div class="gm-rt"><span>0</span><span>50</span><span>100</span></div><div class="gm-rl"><span>0</span><span>50</span><span>100</span></div><i class="gm-axl h"></i><i class="gm-axl v"></i>' +
              '<i class="gm-dimr v"></i><i class="gm-dimr h"></i>' +
              '<div class="gm-lines"></div><i class="gm-dim"></i><i class="gm-live"></i><span class="gm-read"></span>' +
              '</div><span class="gm-tip"></span><span class="gm-mode" aria-hidden="true"></span><button class="gm-turnb" type="button" aria-pressed="false" hidden></button>' + '<button class="gm-lensb" type="button" aria-pressed="true" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12.9 12.9 17 17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>' +
            '</div></div>' +
            '<div class="gm-side"><div class="gm-lead2" hidden></div><p class="gm-step"></p><div class="gm-tray" aria-hidden="true"></div><div class="gm-card" hidden></div><ul class="gm-list" hidden></ul><div class="gm-res"></div><div class="gm-qa"></div><div class="gm-btns"></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="gm-intro" hidden><div class="gm-iscroll" tabindex="0"><div class="gm-ipin"><div class="gm-isecs"></div><div class="gm-idots"></div><button class="gm-iskip" type="button"></button><button class="gm-igo" type="button"></button><i class="gm-idot"><i><b></b></i></i></div><div class="gm-ispace"></div></div><div class="gm-ihd"><button class="gm-ihow" type="button"></button><button class="gm-ix" type="button" aria-label="閉じる">×</button></div></div>' +
        '<div class="gm-sheet" aria-hidden="true"><div class="gm-sgrid"></div><div class="gm-mock"><div class="gm-mk1"></div><div class="gm-mk3"></div><div class="gm-mk2"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' +
          '<div class="gm-shd"><div class="gm-swk" role="group"><button type="button" data-g="you" aria-pressed="true"></button><button type="button" data-g="mine" aria-pressed="false"></button></div><button class="gm-sx" type="button"></button></div>' +

          '<div class="gm-stool" role="group"><button class="gm-sfold" type="button" data-act="fold" aria-expanded="true"></button><b></b><button type="button" data-add="mk1"></button><button type="button" data-add="mk3"></button><button type="button" data-add="mk2"></button><button type="button" data-act="dup" disabled></button><button type="button" data-act="del" disabled></button><button type="button" data-act="undo" disabled></button><button type="button" data-act="redo" disabled></button><button type="button" data-act="rst"></button><span class="gm-sar gm-sdisp"><em></em><button type="button" data-act="grid" aria-pressed="true"></button><button type="button" data-act="num" aria-pressed="true"></button></span>' +

            '<span class="gm-sar"><em></em><button type="button" data-sar="screen" aria-pressed="true"></button><button type="button" data-sar="0.707">A4</button><button type="button" data-sar="1"></button></span></div>' +
          '<p class="gm-scap"><b></b><span></span><small></small></p></div>';
      document.body.appendChild(gm);
      stage = gm.querySelector('.gm-stage'); picEl = gm.querySelector('.gm-pic'); linesEl = gm.querySelector('.gm-lines');
      liveEl = gm.querySelector('.gm-live'); readEl = gm.querySelector('.gm-read'); bandEl = gm.querySelector('.gm-band'); tipEl = gm.querySelector('.gm-tip'); dimEl = gm.querySelector('.gm-dim');
      drv = gm.querySelector('.gm-dimr.v'); drh = gm.querySelector('.gm-dimr.h');
      stepEl = gm.querySelector('.gm-step'); resEl = gm.querySelector('.gm-res'); goEl = gm.querySelector('.gm-btns'); listEl = gm.querySelector('.gm-list'); modeEl = gm.querySelector('.gm-mode');
      cardEl = gm.querySelector('.gm-card'); setTimeout(qaBuild, 0); try{ gm.querySelector('.gm-sheet').inert = true; }catch(x){} trayEl = gm.querySelector('.gm-tray'); sheetEl = gm.querySelector('.gm-sheet'); introEl = gm.querySelector('.gm-intro'); iscroll = gm.querySelector('.gm-iscroll');
      iscroll.addEventListener('scroll', introScroll, {passive:true});
      gm.querySelector('.gm-ihow').addEventListener('click', function(){ infoWantHow = true; info(); });
      gm.querySelector('.gm-iskip').addEventListener('click', function(){ if(introAt() >= ISECS.length - 1) return; introTo(ISECS.length - 1); });

      introEl.addEventListener('click', function(e){
        var t = e.target;
        if(t && t.closest && t.closest('button, a, input, label, .gm-ichoice, .gm-idots')) return;
        var cur = introAt(); if(cur >= ISECS.length - 1) return; introTo(cur + 1);
        introEl.classList.add('tapped');
      });
      gm.querySelector('.gm-igo').addEventListener('click', function(){ var cur = introAt(); if(cur >= ISECS.length - 1) return; introTo(cur + 1);
        setTimeout(function(){ var g = gm.querySelector('.gm-igo'); if(g && g.matches(':hover') && introAt() < ISECS.length - 1) cringHold(L('次の一文へ \u00b7 NEXT \u00b7 ', 'NEXT \u00b7 次の一文へ \u00b7 ')); }, 420); });
      gm.querySelector('.gm-ix').addEventListener('click', close);
      (function(){ var tl = gm.querySelector('.gm-ttl'); if(!tl) return;
        tl.setAttribute('role', 'button'); tl.setAttribute('tabindex', '0'); tl.setAttribute('title', L('本編の先頭へ戻る', 'Back to the top of the page'));
        function top(){ close(); setTimeout(function(){ jumpTo(0); }, 60); }
        tl.addEventListener('click', top);
        tl.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); top(); } });
      })();
      gm.querySelector('.gm-idots').addEventListener('click', function(e){ var t = e.target.closest('button, i'); if(!t) return; var i = Array.prototype.indexOf.call(e.currentTarget.children, t); if(i >= 0) introTo(i); });
      iscroll.addEventListener('keydown', introKey);
      ruler(gm.querySelector('.gm-rt'), 'v'); ruler(gm.querySelector('.gm-rl'), 'h');
      gm.querySelector('.gm-x').addEventListener('click', close);
      gm.querySelector('.gm-i').addEventListener('click', function(){ if(infoEl && infoEl.classList.contains('on')) infoOff(); else info(); });

      gm.addEventListener('pointerdown', function(e){ var b = e.target && e.target.closest ? e.target.closest('button, .gm-igo, .gm-idots > *') : null; if(!b || rm) return; b.classList.remove('gm-pressed'); void b.offsetWidth; b.classList.add('gm-pressed'); setTimeout(function(){ b.classList.remove('gm-pressed'); }, 220); }, true);
      turnEl = gm.querySelector('.gm-turn'); tbEl = gm.querySelector('.gm-turnb'); lbEl = gm.querySelector('.gm-lensb');
      if(lbEl && !lbEl.__b){ lbEl.__b = true;
        var lbDown = false, lbX = 0, lbY = 0;
        var lbTog = function(){ lensPref = !lensPref; try{ localStorage.setItem('gm-lens', lensPref ? '1' : '0'); }catch(e){} if(!lensPref) lensOff(); lbLabel(); };
        lbEl.addEventListener('pointerdown', function(e){ lbDown = true; lbX = e.clientX; lbY = e.clientY; });
        lbEl.addEventListener('pointerup', function(e){ if(!lbDown) return; lbDown = false;
          var mdx = e.clientX - lbX, mdy = e.clientY - lbY; if(mdx * mdx + mdy * mdy > 64) return;
          var r = lbEl.getBoundingClientRect(), m = 32;
          if(e.clientX < r.left - m || e.clientX > r.right + m || e.clientY < r.top - m || e.clientY > r.bottom + m) return;
          lbTog(); });
        lbEl.addEventListener('pointercancel', function(){ lbDown = false; });
        lbEl.addEventListener('click', function(e){ e.stopPropagation(); if(e.detail !== 0) return; lbTog(); });
        lbLabel(); }
      tbEl.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path class="r2" d="M10 14H23V21H10"/><path class="r1" d="M10 14V8H3V21H10"/><path class="rm" d="M10 14V21"/><path class="a" d="M7 4.6A12 12 0 0 1 19 10.9M15.6 9.9 19 10.9 20 7.5"/><path class="a2" d="M19 10.9A12 12 0 0 0 7 4.6M9.6 2.2 7 4.6 9.4 7.2"/></svg><span></span>';

      (function(){
        var tbDown = false, tbX = 0, tbY = 0;
        tbEl.addEventListener('pointerdown', function(e){ tbDown = true; tbX = e.clientX; tbY = e.clientY; });
        tbEl.addEventListener('pointerup', function(e){ if(!tbDown) return; tbDown = false;
          var mdx = e.clientX - tbX, mdy = e.clientY - tbY; if(mdx * mdx + mdy * mdy > 64) return;
          var r = tbEl.getBoundingClientRect(), m = 32;
          if(e.clientX < r.left - m || e.clientX > r.right + m || e.clientY < r.top - m || e.clientY > r.bottom + m) return;
          turnPic(!rot); });
        tbEl.addEventListener('pointercancel', function(){ tbDown = false; });
        tbEl.addEventListener('click', function(e){ e.stopPropagation(); if(e.detail !== 0) return; turnPic(!rot); });
      })();
      tbEl.addEventListener('pointerenter', function(e){ if(e.pointerType === 'touch') return; lastX = e.clientX; lastY = e.clientY; cringHold(rot ? L('縦に戻す \u00b7 TURN BACK \u00b7 ', 'TURN BACK \u00b7 ') : L('絵を横にして、大きく \u00b7 TURN \u00b7 ', 'TURN THE PICTURE \u00b7 ')); });
      tbEl.addEventListener('pointerleave', function(){ cringOff(false); });
      tbLabel();
      gm.querySelector('.gm-sx').addEventListener('click', sheetOff);
      sheetEl.querySelectorAll('.gm-swk button').forEach(function(b){ b.addEventListener('click', function(){ sheetGrid(b.getAttribute('data-g')); }); });

      gm.addEventListener('pointermove', function(e){ if(e.pointerType !== 'touch'){ lastX = e.clientX; lastY = e.clientY; if(ringHold){ ringHold.style.left = lastX + 'px'; ringHold.style.top = lastY + 'px'; } if(ringCur && ringCur.parentNode){ ringCur.style.left = lastX + 'px'; ringCur.style.top = lastY + 'px'; } } }, {passive:true});
      var igo = gm.querySelector('.gm-igo');
      igo.addEventListener('pointerenter', function(e){ if(e.pointerType === 'touch') return; lastX = e.clientX; lastY = e.clientY; var last = introAt() === ISECS.length - 1; cringHold(last ? L('はじめる \u00b7 START \u00b7 ', 'START \u00b7 はじめる \u00b7 ') : L('次の一文へ \u00b7 NEXT \u00b7 ', 'NEXT \u00b7 次の一文へ \u00b7 ')); });
      igo.addEventListener('pointerleave', function(){ cringOff(false); });
      stage.addEventListener('pointerdown', function(e){
        if(demoEl){ demoDone = true; demoOff(); }
        if(e.button != null && e.button !== 0) return;
        if(e.pointerType === 'touch' && e.isPrimary === false){ if(down){ down = false; hideLive(); } lensOff(); return; }
        if(e.target && e.target.closest && e.target.closest('.gm-turnb, .gm-lensb')){ if(state === 'trace') pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        if(performance.now() - openedAt < 600) return;
        if(stage.classList.contains('swapping')){ pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        if(performance.now() - boardAt < 700){ pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        ptype = e.pointerType || 'mouse';
        if(state === 'compare'){ if(performance.now() - fixedAt < 350) return; nextTurn(); fresh = true; startedAt = performance.now() + 100; pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        else if(state === 'done'){ if(performance.now() - fixedAt < 350) return; if(doneFn) doneFn(); fresh = true; startedAt = performance.now() + 100; pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        else fresh = false;
        if(state !== 'trace') return;
        if(performance.now() - startedAt < 400){ pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }
        down = true; moved = 0; downX = e.clientX; downY = e.clientY;
        try{ stage.setPointerCapture(e.pointerId); }catch(x){}
        liveEl.classList.add('press'); move(e); lensOn(); lensMove(e);
        if(bi === 0 && ti === 0 && !lcapDone && !rot){ var lc0 = el('i', 'gm-lcap'); lc0.textContent = L('離すと、ここに線が引かれます', 'Release to place the line'); liveEl.appendChild(lc0); liveEl.appendChild(el('i', 'gm-ldot')); }
      });
      stage.addEventListener('pointermove', function(e){
        if(e.pointerType) ptype = e.pointerType;
        if(state !== 'trace') return;
        if(pend && !down && e.pointerId === pend.id){ var pdx = e.clientX - pend.x, pdy = e.clientY - pend.y; if(pdx * pdx + pdy * pdy > 64){ pend = null; startedAt = 0; fresh = false; if(e.pointerType !== 'touch'){ try{ stage.setPointerCapture(e.pointerId); }catch(x){} } down = true; moved = 0; downX = e.clientX; downY = e.clientY; liveEl.classList.add('press'); lensOn(); lensMove(e); } }
        if(down){ moved = Math.max(moved, Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY)); if(moved > 6) helpOff(); }
        if(ptype === 'touch' && !down) return;
        move(e);
      });
      var lcapDone = false;
      function outNote(t){
        var old = stage.querySelector('.gm-outnote'); if(old) old.parentNode.removeChild(old);
        var p = el('p', 'gm-outnote', esc(t)); stage.appendChild(p);
        requestAnimationFrame(function(){ p.classList.add('on'); });
        setTimeout(function(){ p.classList.remove('on'); setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 320); }, 1800);
      }
      function up(e, ok){
        pend = null;
        var lc = liveEl.querySelector('.gm-lcap'); if(lc){ lc.parentNode.removeChild(lc); lcapDone = true; } var ld = liveEl.querySelector('.gm-ldot'); if(ld) ld.parentNode.removeChild(ld);
        lensOff();
        if(!down) return; down = false; liveEl.classList.remove('press');
        if(!ok || state !== 'trace') return;
        if(moved < 6 && (fresh || performance.now() - startedAt < 500)){ fresh = false; hideLive(); if(state === 'trace') tipEl.classList.remove('off'); return; }
        var sr = stage.getBoundingClientRect(), ox = Math.max(sr.left - e.clientX, e.clientX - sr.right, 0), oy = Math.max(sr.top - e.clientY, e.clientY - sr.bottom, 0);
        if(Math.max(ox, oy) > 40){
          fresh = false; hideLive(); tipEl.classList.remove('off');
          outNote(L('絵の中で離すと、線が引かれます。', 'Release inside the picture to draw the line.'));
          return;
        }
        fresh = false; move(e); confirm();
      }
      stage.addEventListener('pointerup', function(e){ up(e, true); });
      ['pointerup', 'pointercancel', 'blur'].forEach(function(t){ window.addEventListener(t, function(){ if(!down) lensOff(); }, true); });
      var tmY = null; document.addEventListener('touchstart', function(e){ tmY = e.touches[0] ? e.touches[0].clientY : null; }, {passive:true, capture:true});
      document.addEventListener('touchmove', function(e){ if(!phoneFree || !document.documentElement.classList.contains('gmopen')) return;    var sc = e.target && e.target.closest ? e.target.closest('.gm-side, .gm-iscroll, .gm-info-in, .gm-take-in, .gm-sheet, .menu') : null;
        if(sc){ var y = e.touches[0] ? e.touches[0].clientY : tmY, dy = (tmY === null || y === null) ? 0 : y - tmY; tmY = y;
          { var atTop = sc.scrollTop <= 0, atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1;
            if((atTop && dy > 0) || (atEnd && dy < 0) || sc.scrollHeight <= sc.clientHeight + 1) e.preventDefault(); }
          return; }
        e.preventDefault(); }, {passive:false, capture:true});
      stage.addEventListener('pointercancel', function(e){ up(e, false); if(state === 'trace') tipEl.classList.remove('off'); });
      stage.addEventListener('lostpointercapture', function(e){ if(e.target !== stage){ lensOff(); return; }
        if(down){ down = false; liveEl.classList.remove('press'); if(state === 'trace') hideLive(); } lensOff(); });
      stage.addEventListener('pointercancel', function(){ down = false; liveEl.classList.remove('press'); lensOff(); if(state === 'trace') hideLive(); });
      stage.addEventListener('keydown', function(e){
        if(e.target && e.target.closest && e.target.closest('button')) return;
        var k = e.key;
        if(k === ' ' || k === 'Enter'){ if(state === 'compare') nextTurn(); else if(state === 'done' && doneFn) doneFn(); else if(state === 'trace' && live >= 0) confirm(); e.preventDefault(); return; }
        if(state !== 'trace') return;
        var st = e.shiftKey ? 5 : 1, t = LINES[ti];
        if(k === 'ArrowLeft' || k === 'ArrowUp'){ setLive(Math.max(0, (live < 0 ? 50 : live) - st)); e.preventDefault(); }
        else if(k === 'ArrowRight' || k === 'ArrowDown'){ setLive(Math.min(100, (live < 0 ? 50 : live) + st)); e.preventDefault(); }
        else if(t && ((t.ax === 'v' && (k === 'ArrowUp' || k === 'ArrowDown')) || (t.ax === 'h' && (k === 'ArrowLeft' || k === 'ArrowRight')))) e.preventDefault();
      });
      window.addEventListener('resize', function(){ setTimeout(function(){ if(stage) stage.classList.toggle('narrow', stage.getBoundingClientRect().width < 330); }, 0); });
      var lastW = window.innerWidth, lastVW = window.visualViewport ? Math.round(window.visualViewport.width) : lastW;
      function fitW(){
        var w = window.innerWidth, vw = window.visualViewport ? Math.round(window.visualViewport.width) : w;
        if(document.documentElement.classList.contains('phone') && w === lastW && vw === lastVW) return;
        lastW = w; lastVW = vw; fit();
      }
      window.addEventListener('resize', fitW); window.addEventListener('resize', function(){ setTimeout(blurFit, 80); }); window.addEventListener('resize', function(){ setTimeout(moreMark, 80); }); (function(){ var sc = gm.querySelector('.gm-side'); if(sc){ sc.addEventListener('scroll', moreMark, {passive:true}); if(window.MutationObserver) new MutationObserver(function(){ setTimeout(moreMark, 60); setTimeout(moreMark, 700); }).observe(sc, {childList:true, subtree:true}); } })();    window.addEventListener('resize', function(){ if(introOn){ ibgBuild(); ibgFit(); introBg(); setTimeout(ibgFit, 300); } else if(state === 'compare' || state === 'done'){ setTimeout(reveal, 60); } });    window.addEventListener('orientationchange', function(){ setTimeout(fit, 80); setTimeout(fit, 400); });
      if(window.visualViewport){ window.visualViewport.addEventListener('resize', fitW); window.visualViewport.addEventListener('resize', vvFit); window.visualViewport.addEventListener('scroll', vvFit); }
      window.addEventListener('resize', vvFit); vvFit();
      document.addEventListener('click', function(e){
        if(!gm || gm.hidden) return; var a = e.target && e.target.closest ? e.target.closest('.menu a[href]') : null;
        if(a && a.classList.contains('mgame')){ close(); setTimeout(function(){ jumpTo(0); }, 60); return; }
        if(a) close();
      }, true);
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && gm && !gm.hidden){ if(infoEl && infoEl.classList.contains('on')) infoOff(); else if(takeEl && takeEl.classList.contains('on')) takeOff(); else if(gm.classList.contains('sheeton')) sheetOff(); else if(!introOn && state !== 'idle'){  } else close(); } });
    }

    var ISECS_ALL = [
      {at:0,   big:'4本',   ja:['3枚の絵に、4本ずつ。',   '1枚に4本ずつ、3枚で12本の線を引きます。2分ほどで、あなたの平均グリッドができます。'],
                          en:['Four lines on each of three pictures.', 'You draw four lines on each picture, twelve in all. In about two minutes, your average grid is ready.']},
      {at:.22, big:'主塊',   ja:['主塊を、見つける。',       '私は、絵の中でいちばん大きなまとまりを主塊と呼びます。その始まりと重心に、縦横の線を1本ずつ引きます。'],
                          en:['Find the main mass.',        'I call the largest mass in a picture the main mass. You draw one line across and one down where it begins, and again at its centre of weight.']},
      {at:.44, big:'位置',   ja:['絵の端から、位置を測る。', '線を引くと、私が同じ絵に引いた線が破線で現れます。絵の幅と高さを 100 として、あなたと私の位置と差を百分率で比べます。'],
                          en:['Measure from the edge.',     'When you set a line, mine appears dashed on the same picture. With the width and height as 100, your position, mine, and the difference are read in percent.']},
      {at:.66, big:'4本',   ja:['12本を、4本にまとめる。', '3枚を測り終えると、同じ役割の3本が1本にまとまります。できた4本を、このサイトのグリッドと重ねます。'],
                          en:['Twelve lines become four.',  'After the third picture, the three lines of each role merge into one. Your four lines are then laid over the grid from my research.']},
      {at:.88, big:'絵',     ja:['測る絵を、選ぶ。',         '日本の絵と西洋の絵では、主塊の位置や間の取り方に違いがありました。測る絵を選ぶと三枚が無作為に出て、最後に二つのグリッドを比べられます。'],
                          en:['Choose the pictures.',       'In my research, Japanese and Western pictures placed the main mass and the empty space differently. Choose which to measure; three pictures are drawn at random, and the two grids are compared at the end.'], choice:true}
    ];
    var ISECS = [];
    function isecsFor(){
      var title = {k:4, at:0, title:true, big:'測る', ja:['絵を、測る。', ''], en:['Measure the picture.', '']};
      var IK = ['<svg viewBox="0 0 24 24"><rect x="2" y="6" width="6" height="12"/><rect x="9" y="6" width="6" height="12"/><rect x="16" y="6" width="6" height="12"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M3 12h18"/><circle class="d" cx="12" cy="12" r="2.6"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M3 10h18"/><path class="m" d="M3 15h18"/><path class="a" d="M17.5 10.4v4.2M16.2 11.4l1.3-1.3 1.3 1.3M16.2 13.6l1.3 1.3 1.3-1.3"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M9 4v16M15 4v16M3 9h18M3 15h18"/></svg>'];
      function il(t, i){ return '<li><i class="ik">' + IK[i] + '</i><span>' + t.split('<br>').map(body).join('<br>') + '</span></li>'; }
      var LJ = '<ul class="gm-ilist">' + il('3枚の絵に4本ずつ線を引きます。《終わるまで2分ほど》です。', 0) + il('絵を押して、そのまま動かします。<br>《離したところに線が引かれます》。', 1) + il('1本引くたびに、私が同じ絵に引いた線が現れ、<br>《解釈の違いが％で出ます》。', 2) + '</ul>' +
        '<p class="gm-ick gm-iqa">分からないことは、右上の「測り方とQ&A」からご確認ください。</p>';
      var LE = '<ul class="gm-ilist">' + il('Draw four lines on each of three pictures. 《Two minutes or so until you are done》.', 0) + il('Press on the picture and move.<br>《A line appears where you release》.', 1) + il('After each line, the one I drew on the same picture appears,<br>and 《the difference is shown in percent》.', 2) + '</ul>' +
        '<p class="gm-ick gm-iqa">If anything is unclear, see “How to measure &amp; Q&amp;A”, top right.</p>';
      var info = {k:4, at:.36, html:true, info:true, big:'ゲーム', ja:['3枚の絵に線を引くゲーム。', LJ], en:['A game: draw lines on three pictures.', LE]};

      var PJ = '<p class="gm-ipur">' + body('線を引き終えたら、あなたの平均グリッドで《見出しや図版、本文の配置》を試せます。') + '</p>' +
        '<p class="gm-ipur">' + body('絵は日本と西洋を合わせて' + BOARDS.length + '枚。選んだ方から《3枚が無作為に選ばれ、それを計測します》。操作はどちらも同じです。') + '</p>' +
        '<p class="gm-ick">測る絵を選んでください</p>';
      var PE = '<p class="gm-ipur">' + body('Once the lines are drawn, you can use your average grid to 《try placing headings, images and body text》.') + '</p>' +
        '<p class="gm-ipur">' + body('There are ' + BOARDS.length + ' pictures in all, Japanese and Western. 《Three from the group you choose are drawn at random》 and measured. The controls are the same for both.') + '</p>' +
        '<p class="gm-ick">Choose the pictures</p>';
      var RJ = '<p class="gm-ipur">' + body('3枚に引いた12本の位置を、《同じ名前・同じ向きごとに平均》します。いちばん大きなまとまりの始まりと重心を示す4本が、あなたの平均グリッドになります。') + '</p>' +
        '';
      var RE = '<p class="gm-ipur">' + body('I average the positions of your twelve lines, 《grouped by name and orientation》. The four lines that come out mark where the largest form begins and where its weight sits: your average grid.') + '</p>' +
        '';
      var brief = {k:4, at:.68, html:true, big:'平均', ja:['線を引いて、平均を出す。', RJ], en:['Draw the lines, then take the average.', RE]};
      var choice = {k:4, at:1, html:true, choice:true, big:'グリッド', ja:['平均グリッドを、使ってみよう。', PJ], en:['Put your average grid to work.', PE]};
      return [title, info, brief, choice];
    }
    var cat = 'both';

    var CATS = [
      ['主塊と余白面', 'Mass and void', '1つの大きなまとまりとその周りの余白の面で画面が決まる構図。', 'One large mass and the empty area around it decide the picture.'],
      ['前景フレームと奥行き', 'Foreground frame and depth', '手前の大きなもの（枝・窓・人物）が枠になり、その向こうに遠景を見せる構図。', 'A large near object, a branch, a window, a figure, frames the far view behind it.'],
      ['対置と中間領域', 'Opposition and the middle ground', '2つのまとまりが向かい合い、そのあいだの空きが主役になる構図。', 'Two masses face each other and the gap between them becomes the subject.'],
      ['反復と変奏', 'Repetition and variation', '同じ形が繰り返され、少しずつ変わることでリズムが生まれる構図。', 'A shape repeats with small changes, and the changes make the rhythm.'],
      ['水平分節と上下構成', 'Horizontal division, upper and lower', '画面が横の帯に分かれ、上と下の重さの違いで成り立つ構図。', 'The picture splits into horizontal bands, balanced by the different weights of top and bottom.'],
      ['密度差と空間の抜け', 'Density contrast and open space', '濃い所と薄い所の差と、何も描かない抜けで奥行きをつくる構図。', 'Depth comes from the contrast of dense and sparse, and from the untouched open space.'],
      ['垂直反復と高低差', 'Vertical repetition and height', '縦の要素の繰り返しと高さの差で画面を立たせる構図。', 'Vertical elements repeat at different heights and hold the picture upright.']
    ];

    var RLINES = [
      ['主塊開始線', 'Main-mass start', 1],
      ['主塊重心線', 'Main-mass centre', 1],
      ['余白開始線', 'Void start', 0],
      ['前景境界線', 'Foreground boundary', 0],
      ['遠景開口線', 'Distant-view opening', 0],
      ['副次要素境界線', 'Secondary-element boundary', 0],
      ['密度転換線', 'Density shift', 0]
    ];
    function catDef(name){ for(var i = 0; i < CATS.length; i++){ if(CATS[i][0] === name) return CATS[i]; } return null; }
    function isecHTML(sx){
      var hj = sx.ja[0].split('|'), he = sx.en[0].split('|');
      return '<b>' + hj.map(function(t, k){ return '<u>' + mix(t, he[k] || (k === 0 ? sx.en[0] : ''), sx.big) + '</u>'; }).join('') + '</b><span>' + (sx.html ? L(sx.ja[1], sx.en[1]) : body(L(sx.ja[1], sx.en[1]))) + '</span>' +
        (sx.choice ? '<div class="gm-ichoice"><button type="button" data-c="jp">' + L('日本の絵', 'Japanese') + '</button><button type="button" data-c="we">' + L('西洋の絵', 'Western') + '</button></div>' : '');
    }
    function bindChoice(d){ d.querySelectorAll('.gm-ichoice button').forEach(function(bt){ bt.addEventListener('click', function(){ cat = bt.getAttribute('data-c'); var fs = introEl.querySelectorAll('.gm-ibg.b4 .jf'); fs.forEach(function(f){ if(cat === 'both' || (cat === 'jp' && f.classList.contains('l')) || (cat === 'we' && f.classList.contains('r'))) f.classList.add('pick'); }); if(rm) introEnd(false); else setTimeout(function(){ introEnd(false); }, 110); }); }); }
    function jwMeans(){ var g = {jp:{}, we:{}}; ['jp', 'we'].forEach(function(k){ var bs = BOARDS.filter(function(b){ return k === 'jp' ? !!b.jp : !b.jp; }); LINES.forEach(function(t){ var sum = 0; bs.forEach(function(b){ sum += b.a[t.k]; }); g[k][t.k] = bs.length ? Math.round(sum / bs.length) : 0; }); }); return g; }
    function jwTable(){ var g = jwMeans(); return '<table class="gm-tb gm-jwt"><thead><tr><th>' + L('線', 'line') + '</th><th>' + L('日本', 'Japan') + '</th><th>' + L('西洋', 'West') + '</th><th>' + L('差', 'diff') + '</th></tr></thead><tbody>' + LINES.map(function(t){ return '<tr><td>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire)) + '</td><td>' + g.jp[t.k] + PC + '</td><td>' + g.we[t.k] + PC + '</td><td>' + sg(g.we[t.k] - g.jp[t.k]) + PC + '</td></tr>'; }).join('') + '</tbody></table>'; }
    function jwLabel(on){
      var lg = resEl && resEl.querySelector('.gm-legend'), b = resEl && resEl.querySelector('.gm-jwb');
      if(b) b.textContent = on ? L(cat === 'jp' ? '西洋の絵の平均を外す' : '日本の絵の平均を外す', cat === 'jp' ? 'Hide the Western average' : 'Hide the Japanese average')
                               : L(cat === 'jp' ? '西洋の絵の平均と重ねる' : '日本の絵の平均と重ねる', cat === 'jp' ? 'Overlay the Western average' : 'Overlay the Japanese average');
      if(!lg) return;
      var old = lg.querySelector('.gm-lgjw'); if(old) old.parentNode.removeChild(old);

    }
    function jwOverlay(){
      var b = resEl.querySelector('.gm-jwb'); if(!b) return; var on = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', on ? 'false' : 'true');
      linesEl.querySelectorAll('.jw').forEach(function(x){ x.parentNode.removeChild(x); }); linesEl.classList.toggle('jwon', !on); jwLabel(!on); if(on) return;
      var g = jwMeans(), opp = (cat === 'jp') ? 'we' : 'jp';
      LINES.forEach(function(t){ mkLine(linesEl, t.ax, g[opp][t.k], 'jw ' + opp, (opp === 'jp' ? L('日本 ', 'JP ') : L('西洋 ', 'West ')) + g[opp][t.k] + '%'); });
    }

    function ibgSvg(k){
      function ln(cls, pos, lab, extra){ return '<i class="' + cls + '" style="' + pos + (extra || '') + '">' + (lab ? '<s>' + lab + '</s>' : '') + '</i>'; }
      var cls = k; k = [5, 0, 1, 3, 4][k];
      var o = '<div class="gm-ibg b' + cls + '" aria-hidden="true"><i class="frame"></i>';
      if(k === 5){
        var vals = [[14, 30, 55, 68], [2, 1, 28, 58], [12, 36, 55, 55]], t0 = .3;
        vals.forEach(function(v, fi){
          var lines = '<i class="h" style="top:' + v[0] + '%; transition-delay:' + (t0 + fi * 1.2) + 's"></i><i class="v" style="left:' + v[1] + '%; transition-delay:' + (t0 + .3 + fi * 1.2) + 's"></i><i class="h" style="top:' + v[2] + '%; transition-delay:' + (t0 + .6 + fi * 1.2) + 's"></i><i class="v" style="left:' + v[3] + '%; transition-delay:' + (t0 + .9 + fi * 1.2) + 's"></i>';
          o += '<b class="jf f' + fi + '" style="left:' + (6 + fi * 31) + '%; top:24%; width:26%; height:54%; transition-delay:' + (fi * .12) + 's"><s>' + 'ABC'[fi] + '</s>' + lines + (fi === 0 ? '<u class="fp" style="left:' + v[1] + '%"></u>' : '') + '</b>';
        });
        return o + '</div>';
      }
      if(k === 4){
        var g = jwMeans(), fr = [['jf l', 'left:7%; top:20%; width:37%; height:58%', L('日本の絵', 'Japanese'), g.jp], ['jf r', 'left:56%; top:20%; width:37%; height:58%', L('西洋の絵', 'Western'), g.we]];
        fr.forEach(function(f, fi){
          var lines = ['<i class="h" style="top:' + f[3].y1 + '%; transition-delay:' + (.3 + fi * .15) + 's"></i>', '<i class="v" style="left:' + f[3].x1 + '%; transition-delay:' + (.6 + fi * .15) + 's"></i>', '<i class="h" style="top:' + f[3].y2 + '%; transition-delay:' + (.9 + fi * .15) + 's"></i>', '<i class="v" style="left:' + f[3].x3 + '%; transition-delay:' + (1.2 + fi * .15) + 's"></i>'].join('');
          o += '<b class="' + f[0] + '" style="' + f[1] + '"><s>' + f[2] + '</s>' + lines + '</b>';
        });
        return o + '</div>';
      }
      if(k === 0){
        o += '<i class="c"></i><b class="blob"></b>' +
          ln('h a1', 'top:27%', 'Y1 · ' + L('主塊開始', 'mass start') + ' 27%') + ln('v a2', 'left:26%', 'X1 · ' + L('主塊開始', 'mass start') + ' 26%') +
          '<i class="dot a3" style="left:58%; top:58%"></i>' + ln('h a4', 'top:58%', 'Y2 · ' + L('主塊重心', 'mass centroid') + ' 58%') + ln('v a5', 'left:58%', 'X3 · ' + L('主塊重心', 'mass centroid') + ' 58%');
      } else if(k === 1){
        for(var i = 0; i <= 10; i++){ var big = i % 5 === 0; o += '<i class="tk tkt t' + i + (big ? ' big' : '') + '" style="left:calc(10px + (100% - 20px) * ' + (i / 10) + ')"></i><i class="tk tkl s' + i + (big ? ' big' : '') + '" style="top:calc(10px + (100% - 20px) * ' + (i / 10) + ')"></i>'; }
        o += '<i class="bd bdh"></i><i class="bd bdv"></i><b class="nm n0" style="left:16px; top:34px">0</b><b class="nm n5" style="left:50%; top:34px; transform:translateX(-50%)">50</b><b class="nm n10" style="right:16px; top:34px">100</b><b class="nm m10" style="left:22px; bottom:16px">100</b>';
      } else if(k === 2){
        o += ln('v dv d1', 'left:46%; --to:38%') + ln('v dv d2', 'left:71%; --to:80%') + ln('h p1', 'top:32%') +
          '<b class="nm q1" style="left:16px; top:calc(32% - 22px)">32%</b><b class="nm q2" style="left:calc(46% + 12px); top:calc(32% - 22px)">32%</b><b class="nm q3" style="left:calc(71% + 12px); top:calc(32% - 22px)">32%</b>' +
          '<b class="cp c1" style="left:23%">' + L('絵', 'picture') + '</b><b class="cp c2" style="left:58.5%">' + L('紙', 'paper') + '</b><b class="cp c3" style="left:85.5%">' + L('画面', 'screen') + '</b>';
      } else {
        var sets = [[3, -2.5, 2, -3], [-2, 2, -2.5, 2.5], [-1, -1, 1.5, 1]];
        sets.forEach(function(d, i){ o += ln('h st r1', 'top:14%; --oy:' + d[0] + 'vh') + ln('v st r2', 'left:12%; --ox:' + d[1] + 'vw') + ln('h st r3', 'top:32%; --oy:' + d[2] + 'vh') + ln('v st r4', 'left:58%; --ox:' + d[3] + 'vw'); });
        o += ln('h g1', 'top:14%', 'Y1 14%') + ln('v g2', 'left:12%', 'X1 12%') + ln('h g3', 'top:32%', 'Y2 32%') + ln('v g4', 'left:58%', 'X3 58%') +
          '<i class="fx v" style="left:28%"><s>X2 28%</s></i><i class="fx v" style="left:83%"><s>X4 83%</s></i><i class="fx h" style="top:71%"><s>Y3 71%</s></i>' +
          '<b class="mk k1" style="left:calc(12% + 12px); top:calc(14% + 12px); width:20%; height:16px"></b><b class="mk k2" style="left:calc(12% + 12px); top:calc(32% + 12px); width:calc(46% - 24px); height:calc(39% - 24px)"></b>' +
          '<b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 12px); width:22%; height:5px"></b><b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 26px); width:18%; height:5px"></b><b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 40px); width:21%; height:5px"></b>';
      }
      return o + '</div>';
    }
    var ibgW = 0;
    function ibgRows(h){ return Math.max(2, Math.min(8, Math.round(h / 330))); }
    function ibgKey(){
      var pin = introEl.querySelector('.gm-ipin'); if(!pin) return '';
      var r = pin.getBoundingClientRect();
      return Math.round(r.width) + ':' + ibgRows(r.height);
    }

    function ibgFit(){
      var pin = introEl && introEl.querySelector('.gm-ipin'); if(!pin) return;
      var mos = pin.querySelector('.gm-imos'); if(!mos) return;
      var PH = pin.getBoundingClientRect().height; if(!(PH > 0)) return;
      var rows = mos.querySelectorAll(':scope > .row'), n = rows.length; if(!n) return;
      for(var i = 0; i < n; i++){
        var y0 = Math.round(i * PH / n), y1 = Math.round((i + 1) * PH / n);
        rows[i].style.top = y0 + 'px';

        rows[i].style.height = ((i < n - 1 ? y1 - y0 + 1 : Math.ceil(PH) - y0 + 1)) + 'px';
      }
    }
    function ibgBuild(){
      var pin = introEl.querySelector('.gm-ipin'); if(!pin) return;

      if(window.ResizeObserver && !pin.__ibgRO){
        pin.__ibgRO = new ResizeObserver(function(){
          if(pin.__ibgRaf) cancelAnimationFrame(pin.__ibgRaf);
          pin.__ibgRaf = requestAnimationFrame(function(){ pin.__ibgRaf = 0; ibgFit(); });
        });
        try{ pin.__ibgRO.observe(pin); }catch(x){}
      }
      ibgRuns = ISECS.map(function(){ return 0; });
      var key = ibgKey(); if(ibgW === key){ ibgFit(); return; } ibgW = key;
      var pr = pin.getBoundingClientRect(), PW = pr.width, PH = pr.height; if(!PW || !PH) return;
      pin.querySelectorAll('.gm-ibg').forEach(function(x){ x.parentNode.removeChild(x); });

      if(BOARDS.length && !rm){
        var mos = el('div', 'gm-ibg gm-imos'); mos.setAttribute('aria-hidden', 'true');
        var rows = ibgRows(PH), rowH = PH / rows;
        for(var mr = 0; mr < rows; mr++){
          var row = el('div', 'row' + (mr % 2 ? ' rev' : '')), strip = el('div', 'strip');

          var ry0 = Math.round(mr * PH / rows), ry1 = Math.round((mr + 1) * PH / rows);
          row.style.top = ry0 + 'px'; row.style.height = (ry1 - ry0 + 1) + 'px';

          var s = 0, best = Infinity, need = 1, sum = 0, TARGET = PW * 1.5;
          for(var t = 1; t <= 24; t++){
            s += (BOARDS[(t - 1 + mr * 5) % BOARDS.length].ar || 1);
            var dd = Math.abs(s * rowH - TARGET);
            if(dd < best){ best = dd; need = t; sum = s; }
          }
          var GW = Math.round(sum * rowH);
          strip.style.width = (2 * GW) + 'px';
          strip.style.animationDuration = ((mr % 2 ? 80 : 63) * GW / PW).toFixed(1) + 's';
          for(var cp = 0; cp < 2; cp++){
            var grp = el('div', 'grp'); grp.style.width = GW + 'px';
            for(var mi = 0; mi < need; mi++){
              var mb = BOARDS[(mi + mr * 5) % BOARDS.length];
              var mim = document.createElement('img'); mim.alt = ''; mim.decoding = 'async'; mim.draggable = false;
              mim.style.setProperty('--ar', mb.ar || 1);
              mim.width = Math.round((mb.ar || 1) * 1000); mim.height = 1000;
              mim.src = mb.img; grp.appendChild(mim);
            }
            strip.appendChild(grp);
          }
          row.appendChild(strip); mos.appendChild(row);
        }
        pin.appendChild(mos);
        ibgFit(); requestAnimationFrame(ibgFit); setTimeout(ibgFit, 400);
      }

    }
    var ibgT = 0, ibgRuns = [0, 0, 0, 0, 0];
    function introBg(){
      if(!introOn) return; var cur = introAt();
      if(ibgRuns[cur] >= 2 && introEl.classList.contains('s' + cur)) return;
      var onk = ISECS[cur].k; for(var i = 0; i < 5; i++){ introEl.classList.toggle('s' + i, i === onk); document.documentElement.classList.toggle('gms' + i, i === onk); }
      var bg = introEl.querySelector('.gm-ibg.b' + ISECS[cur].k); if(bg){ bg.classList.remove('run'); void bg.offsetWidth; bg.classList.add('run'); ibgRuns[cur]++; }
      lite(introEl.querySelectorAll('.gm-isec')[cur]);
      clearTimeout(ibgT); ibgT = setTimeout(introBg, rm ? 60000 : 7600);
    }
    function intro(){
      introOn = true; introEl.hidden = false; try{ gm.querySelector('.gm-in').inert = true; }catch(x){}    introEl.classList.remove('ready', 'end', 'moved'); introEl.__end = false; clearTimeout(introEl.__endT);    requestAnimationFrame(function(){ requestAnimationFrame(function(){ introEl.classList.add('ready'); }); });
      ISECS = isecsFor();
      ibgBuild();

      docMode = false; phoneFree = document.documentElement.classList.contains('phone');
      setTimeout(blurFit, 60); setTimeout(blurFit, 700);
      var isp = introEl.querySelector('.gm-ispace'); if(isp) isp.style.height = ISECS.length < 3 ? (docMode ? '170%' : '130%') : '';
      if(phoneFree){
        scroll0 = window.scrollY; document.documentElement.classList.add('gmdoc');
        var R = introRange(), maxB = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - R - 24);
        docBase = Math.max(0, Math.min(scroll0, maxB)); window.scrollTo(0, docBase);
        window.addEventListener('scroll', introScroll, {passive:true});
      }
      var secs = introEl.querySelector('.gm-isecs'), dots = introEl.querySelector('.gm-idots'); secs.innerHTML = ''; dots.innerHTML = '';
      if(!introEl.__swipe){ introEl.__swipe = true; var sy = null;
        introEl.addEventListener('touchstart', function(e){ sy = e.touches[0] ? e.touches[0].clientY : null; }, {passive:true});
        introEl.addEventListener('touchend', function(e){ if(sy === null || !docMode || !introOn) return; var ey = e.changedTouches[0] ? e.changedTouches[0].clientY : sy, dy = ey - sy; sy = null; if(e.target.closest && e.target.closest('button, a')) return; if(dy < -50) introTo(introAt() + 1); else if(dy > 50) introTo(introAt() - 1); }, {passive:true});
      }
      if(!introEl.__tap){ introEl.__tap = true; var tp = null;
        introEl.addEventListener('pointerdown', function(e){ tp = e.target.closest('button, a, .gm-idots') ? null : [e.clientX, e.clientY]; }, {passive:true});
        introEl.addEventListener('pointerup', function(e){ if(!tp) return; var dx = e.clientX - tp[0], dy = e.clientY - tp[1]; tp = null; if(dx * dx + dy * dy > 64 || !introOn) return; var cur = introAt(); ibgRuns[cur] = 0; introBg(); }, {passive:true});
      }
      ISECS.forEach(function(s, i){
        var d = el('div', 'gm-isec' + (s.title ? ' gm-ititle' : (s.choice ? ' gm-ipick' : (s.info ? ' gm-iinfo' : '')))); d.innerHTML = isecHTML(s); secs.appendChild(d); bindChoice(d);
        var dbt = el('button', i === 0 ? 'on' : ''); dbt.type = 'button'; dbt.setAttribute('aria-label', L((i + 1) + ' 枚目の案内へ', 'Go to slide ' + (i + 1))); dots.appendChild(dbt);
      });
      introEl.querySelector('.gm-iskip').textContent = L('スキップ', 'Skip'); introEl.querySelector('.gm-ihow').textContent = L('測り方とQ&A', 'How to measure & Q&A');

      (function(){ var h = introEl.querySelector('.gm-itap');
        if(!h){ h = document.createElement('p'); h.className = 'gm-itap'; introEl.querySelector('.gm-ipin').appendChild(h); }
        h.textContent = ptype === 'touch' ? L('押して、次へ', 'Tap to continue') : L('押す、またはスクロールで次へ', 'Click or scroll to continue'); })();
      introEl.querySelector('.gm-igo').innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var one = ISECS.length < 2; [dots, introEl.querySelector('.gm-igo'), introEl.querySelector('.gm-iskip')].forEach(function(x){ if(x) x.style.display = one ? 'none' : ''; });
      ibgRuns = ISECS.map(function(){ return 0; }); introEl.classList.remove('end', 'moved', 's0', 's1', 's2', 's3', 's4'); iscroll.scrollTop = 0; introTgt = -1; introScroll(); introBg();
      setTimeout(function(){ if(introOn) iscroll.focus({preventScroll:true}); }, 60);
    }
    function introP(){ var m = introRange(); if(m <= 0) return 1; return docMode ? Math.max(0, Math.min(1, (window.scrollY - docBase) / m)) : iscroll.scrollTop / m; }
    function introCur(){ var p = introP(), cur = 0; ISECS.forEach(function(s, i){ if(i > 0 && p >= (s.at + ISECS[i - 1].at) / 2) cur = i; }); return cur; }
    function blurFit(){
      if(!introEl) return;
      introEl.querySelectorAll('.gm-isec').forEach(function(sc){
        var sr = sc.getBoundingClientRect(); if(!sr.width) return;
        var b = sc.querySelector(':scope > b'), sp = sc.querySelector(':scope > span');
        var cs = [], r;
        if(b){ r = b.getBoundingClientRect(); if(r.width) cs.push(r.left + r.width / 2); }
        if(sp){ r = sp.getBoundingClientRect(); if(r.width) cs.push(r.left + r.width / 2); }
        if(!cs.length) return;
        var mid = cs.reduce(function(a, c){ return a + c; }, 0) / cs.length;
        sc.style.setProperty('--blurdx', Math.round(mid - (sr.left + sr.width / 2)) + 'px');
        var cy = [], r2;
        if(b){ r2 = b.getBoundingClientRect(); if(r2.height) cy.push(r2.top + r2.height / 2); }
        if(sp){ r2 = sp.getBoundingClientRect(); if(r2.height) cy.push(r2.top + r2.height / 2); }
        if(cy.length){ var midY = cy.reduce(function(a, c){ return a + c; }, 0) / cy.length;
          sc.style.setProperty('--blurdy', Math.round(midY - (sr.top + sr.height / 2)) + 'px'); }
      });
    }
    function introScroll(){
      if(!introOn) return;
      var p = introP(), secs = introEl.querySelectorAll('.gm-isec'), dots = introEl.querySelectorAll('.gm-idots > *'), cur = 0;
      if(p > .04) introEl.classList.add('tapped');
      if(introTgt >= 0 && introCur() === introTgt && performance.now() - introTgtAt > 250) introTgt = -1;
      cur = introCur();
      secs.forEach(function(d, i){ d.classList.toggle('on', i === cur); d.classList.toggle('past', i < cur);
        try{ d.inert = (i !== cur); }catch(x){} });
      if(!introEl.classList.contains('s' + cur)) introBg();
      dots.forEach(function(d, i){ d.classList.toggle('on', i === cur); d.classList.toggle('done', i < cur); });

      var go = introEl.querySelector('.gm-igo'), isLast = cur === ISECS.length - 1, key = (isLast ? 'L' : 'N') + document.documentElement.lang;
      if(go.__k !== key){
        go.__k = key;
        go.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        go.setAttribute('aria-label', isLast ? L('はじめる', 'Start') : L('次へ', 'Next')); go.classList.toggle('last', isLast);
      }
      if(ringHold) ringText(cur === ISECS.length - 1 ? L('はじめる \u00b7 START \u00b7 ', 'START \u00b7 はじめる \u00b7 ') : L('次の一文へ \u00b7 NEXT \u00b7 ', 'NEXT \u00b7 次の一文へ \u00b7 '));
      introEl.classList.toggle('moved', p > .04);

      (function(){ var moving = introTgt >= 0 && (performance.now() - introTgtAt) < 1200;

        var isEnd = moving ? (introTgt === ISECS.length - 1) : ((introAt() === ISECS.length - 1) || cur === ISECS.length - 1);
        if(introEl.__end !== isEnd){ clearTimeout(introEl.__endT); introEl.__endT = setTimeout(function(){ introEl.__end = isEnd; introEl.classList.toggle('end', isEnd); }, isEnd ? 0 : 40); } })(); if(cur === ISECS.length - 1 && ringHold) cringOff(false);
    }
    var introTgt = -1, introTgtAt = 0, docMode = false, docBase = 0, scroll0 = 0, phoneFree = false;
    function introRange(){ return iscroll.scrollHeight - iscroll.clientHeight; }
    function introTo(i){ i = Math.max(0, Math.min(ISECS.length - 1, i)); introTgt = i; introTgtAt = performance.now();

      if(i < ISECS.length - 1 && introEl.__end){ clearTimeout(introEl.__endT); introEl.__end = false; introEl.classList.remove('end'); }
 var m = introRange(), top = Math.round(m * Math.min(1, ISECS[i].at + (i >= ISECS.length - 1 ? .2 : .02))); if(docMode) window.scrollTo({top: docBase + top, behavior: rm ? 'auto' : 'smooth'}); else iscroll.scrollTo({top: top, behavior: rm ? 'auto' : 'smooth'}); }
    function introAt(){ return (introTgt >= 0 && performance.now() - introTgtAt < 2500) ? introTgt : introCur(); }
    function introKey(e){
      if(!introOn) return; var k = e.key, cur = introAt(), p = introP();
      if(e.target && e.target.tagName === 'BUTTON' && (k === ' ' || k === 'Enter')) return;
      if(k === 'Enter'){ if(cur === ISECS.length - 1){ var cb = introEl.querySelector('.gm-isec.on .gm-ichoice button'); if(cb && document.activeElement !== cb) cb.focus(); else return; } else introTo(cur + 1); e.preventDefault(); }
      else if(k === ' ' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'PageDown'){ introTo(cur + 1); e.preventDefault(); }
      else if(k === 'ArrowUp' || k === 'ArrowLeft' || k === 'PageUp'){ introTo(cur - 1); e.preventDefault(); }
    }

    function docOff(){ window.removeEventListener('scroll', introScroll); }

    var lockY = 0, locked = false, openY = 0;
    function lockDoc(){ if(locked) return; locked = true; lockY = window.scrollY; document.body.style.top = -lockY + 'px'; document.documentElement.classList.add('gmlock'); }
    function unlockDoc(){ if(!locked) return; locked = false; document.documentElement.classList.remove('gmlock'); document.body.style.top = ''; jumpTo(lockY); }
    function jumpTo(y){ try{ window.scrollTo({top:y, behavior:'instant'}); }catch(e){ window.scrollTo(0, y); } }
    function introEnd(skipped){
      if(!introOn) return; introOn = false; introSeen = true; try{ gm.querySelector('.gm-in').inert = false; }catch(x){} docOff(); clearTimeout(ibgT); cringOff(true); document.documentElement.classList.remove('gms0', 'gms1', 'gms2', 'gms3', 'gms4');

      var msrc = introEl.querySelector('.gm-isec.on .gm-ichoice') || introEl.querySelector('.gm-isec.on');
      var mr0 = msrc ? msrc.getBoundingClientRect() : null;
      introEl.classList.add('bye'); setTimeout(function(){ introEl.hidden = true; introEl.classList.remove('bye'); }, rm ? 0 : 720);
      tutOn = !tutSeen();
      start(); startedAt = performance.now();
      if(tutOn) setTimeout(tutStart, rm ? 200 : 1100);
      morphIn(msrc, mr0);
      var gin = gm.querySelector('.gm-in'); if(gin && !rm){ gin.classList.add('enter'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ gin.classList.add('on'); setTimeout(function(){ gin.classList.remove('enter', 'on'); }, 1600); }); }); }
    }

    function morphIn(src0, rect0){
      if(rm) return;
      var src = src0 || introEl.querySelector('.gm-isec.on .gm-ichoice') || introEl.querySelector('.gm-isec.on'); if(!src) return;
      var r0 = rect0 && rect0.width ? rect0 : src.getBoundingClientRect(); if(!r0.width) return;
      var g = el('div', 'gm-morph'); g.style.cssText = 'left:' + r0.left + 'px;top:' + r0.top + 'px;width:' + r0.width + 'px;height:' + r0.height + 'px';
      src.querySelectorAll('i.h, i.v').forEach(function(l){ var c = el('i', l.classList.contains('v') ? 'v' : 'h'); var st = l.getAttribute('style') || ''; var m = /(left|top):\s*([\d.]+%)/.exec(st); if(m) c.style[m[1]] = m[2]; g.appendChild(c); });
      document.body.appendChild(g);

      var last = null, still = 0, t0 = performance.now();
      (function wait(){
        var r1 = stage.getBoundingClientRect();
        var im = picEl && picEl.querySelector('img'), ready = !im || (im.complete && im.naturalWidth > 0);
        if(r1.width && ready && last && Math.abs(r1.width - last.w) < 1 && Math.abs(r1.height - last.h) < 1) still++; else still = 0;
        last = {w:r1.width, h:r1.height};
        if(still < 4 && performance.now() - t0 < 1500){ requestAnimationFrame(wait); return; }
        if(!r1.width){ g.remove(); return; }
        g.classList.add('go'); g.style.left = r1.left + 'px'; g.style.top = r1.top + 'px'; g.style.width = r1.width + 'px'; g.style.height = r1.height + 'px';

        var fit2 = function(){ var r2 = stage.getBoundingClientRect(); if(!r2.width) return;
          if(Math.abs(r2.left - parseFloat(g.style.left)) > 1 || Math.abs(r2.top - parseFloat(g.style.top)) > 1 || Math.abs(r2.width - parseFloat(g.style.width)) > 1 || Math.abs(r2.height - parseFloat(g.style.height)) > 1){
            g.style.left = r2.left + 'px'; g.style.top = r2.top + 'px'; g.style.width = r2.width + 'px'; g.style.height = r2.height + 'px'; } };
        setTimeout(fit2, 540); setTimeout(fit2, 780);
        setTimeout(function(){ g.classList.add('bye'); }, 820); setTimeout(function(){ if(g.parentNode) g.remove(); }, 1400);
      })();
    }
    function btn(label, fn, cls){ var b = el('button', 'gm-b' + (cls ? ' ' + cls : '')); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); goEl.appendChild(b); return b; }
    function focusBtn(){ if(ptype === 'touch') return; setTimeout(function(){ var b = goEl.querySelector('button:not(:disabled)'); if(b) b.focus({preventScroll:true}); }, 220); }
    function forced(){

      var m = /play=([^&#]+)/.exec(location.hash || ''), ids = m ? decodeURIComponent(m[1]).split(',') : (window.__gmForce || []);
      var f = ids.map(function(id){ return BOARDS.filter(function(b){ return b.id === id; })[0]; }).filter(Boolean);
      return f.length === 3 ? f : null;
    }
    function pick3(){
      function sh(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
      var f = forced(); if(f) return f;
      var jp = sh(BOARDS.filter(function(b){ return b.jp; })), we = sh(BOARDS.filter(function(b){ return !b.jp; }));
      if(cat === 'jp' && jp.length >= 3) return jp.slice(0, 3);
      if(cat === 'we' && we.length >= 3) return we.slice(0, 3);
      return sh(Math.random() < .5 ? [jp[0], jp[1], we[0]] : [jp[0], we[0], we[1]]);
    }
    function hdFit(){
      var hd = document.querySelector('.hd'), bg = hd && hd.querySelector('.burger'), xb = gm.querySelector('.gm-x');
      gm.style.setProperty('--hdh', (hd ? Math.max(48, hd.offsetHeight) : 60) + 'px');

      (function(){ var ib = gm.querySelector('.gm-i'), bd = gm.querySelector('.gm-band');
        if(!ib || !bd || !ib.offsetWidth) return;
        var br = bd.getBoundingClientRect(), ir = ib.getBoundingClientRect();
        var pr = Math.max(96, Math.round(br.right - ir.left + 16));
        if(pr < br.width - 200) gm.style.setProperty('--bandpr', pr + 'px');
      })();

      if(bg && bg.offsetWidth){
        var br0 = bg.getBoundingClientRect(), gr0 = gm.getBoundingClientRect();
        var cy0 = Math.round(br0.top + br0.height / 2 - gr0.top);
        if(cy0 > 10 && cy0 < 120){ gm.style.setProperty('--hdc', cy0 + 'px'); gm.style.setProperty('--hdh', (cy0 * 2) + 'px'); }
      }

      gm.style.setProperty('--sidepad', '0px');
      if(bg && bg.offsetWidth){ var bodyEl = gm.querySelector('.gm-body'), bir = (bg.firstElementChild || bg).getBoundingClientRect().right, bodyR = bodyEl ? bodyEl.getBoundingClientRect().right : 0; if(bodyR > bir) gm.style.setProperty('--sidepad', Math.round(bodyR - bir) + 'px'); }

      gm.style.setProperty('--navw', '0px');
      if(xb && hd){
        var xr = xb.getBoundingClientRect(), left = Infinity, g = gm.getBoundingClientRect();
        [hd.querySelector('.lang'), bg].forEach(function(el){ if(!el || !el.offsetWidth) return; left = Math.min(left, el.getBoundingClientRect().left); });

        var lg = hd.querySelector('.lang'), V = 28;
        if(lg && lg.offsetWidth && bg && bg.offsetWidth){ var lr = lg.getBoundingClientRect(), bi = (bg.firstElementChild || bg).getBoundingClientRect(); if(bi.left > lr.right) V = Math.round(bi.left - lr.right); }
        var cg = parseFloat(getComputedStyle(gm.querySelector('.gm-hd')).columnGap) || 12;
        gm.style.setProperty('--hgap', Math.max(0, V - 4 - cg) + 'px');
        if(isFinite(left)) gm.style.setProperty('--navw', Math.max(0, Math.round(xr.right - (left - V + 4))) + 'px');
        if(isFinite(left)) gm.style.setProperty('--gmnavl', Math.max(0, Math.round(g.right - left)) + 'px');
        gm.style.setProperty('--vgap', V + 'px'); if(isFinite(left)) gm.style.setProperty('--ihdr', Math.round(g.right - left + V) + 'px');
        if(bg && bg.offsetWidth){ var br = bg.getBoundingClientRect(); gm.style.setProperty('--hdc', Math.round(br.top + br.height / 2 - g.top) + 'px'); }
      }
    }
    var openedAt = 0;
    function open(){
      build();
      if(!gm.hidden){ if(typeof setMenu === 'function') setMenu(false); return; }
      lastFocus = document.activeElement; clearTimeout(offT); openedAt = performance.now(); openY = window.scrollY;
      gm.querySelector('.gm-ttl').innerHTML = mix('絵を、測る。', 'Measure the picture.', '測る');
      gm.querySelector('.gm-sub').textContent = '';
      axlText();
      gm.querySelector('.gm-sx').textContent = L('戻る', 'Back'); var gi0 = gm.querySelector('.gm-i'); if(gi0) gi0.textContent = L('測り方とQ&A', 'How to measure & Q&A');
      ['.gm-ix', '.gm-x'].forEach(function(sel){ var e = gm.querySelector(sel); if(e) e.setAttribute('aria-label', L('閉じる', 'Close')); });

      (function(){ var i = gm.querySelector('.gm-hd .gm-i'); if(i) i.setAttribute('aria-label', L('この絵と線について', 'About this picture and the lines'));
        var st = gm.querySelector('.gm-stage'); if(st) st.setAttribute('aria-label', L('盤面', 'The board'));
        var tt = gm.querySelector('.gm-ttl'); if(tt) tt.setAttribute('aria-label', L('絵を、測る。', 'Measure the picture.')); })();
      if(typeof qaBuild === 'function') qaBuild();
      var sw = sheetEl.querySelectorAll('.gm-swk button'); sw[0].textContent = L('あなたのグリッド', 'your grid'); sw[1].textContent = L('このサイトのグリッド', 'this site’s grid');
      siteInert(true);
      if(!histPushed){ try{ history.pushState({gm:1}, ''); histPushed = true; }catch(e){} }
      gm.hidden = false; document.documentElement.classList.add('gmopen'); void gm.offsetWidth; hdFit(); fit(); gm.classList.add('on');
      if(!forced()) intro(); else start();
      if(!phoneFree) lockDoc();
      if(window.__retint) window.__retint();
    }
    var histPushed = false;
    window.addEventListener('popstate', function(){
      if(document.documentElement.classList.contains('gmopen')){ histPushed = false; close(); }
    });
    function siteInert(on){
      var keep = ['hd', 'menu', 'cur', 'lgsw', 'jcur', 'rotv'];
      Array.prototype.forEach.call(document.body.children, function(el){
        if(el === gm || el.id === 'ld') return;
        for(var i = 0; i < keep.length; i++){ if(el.classList && el.classList.contains(keep[i])) return; }
        try{ el.inert = on; }catch(e){}
      });
    }
    var closing = false;
    function close(){
      if(!gm || gm.hidden || closing) return; closing = true; tutEnd();    state = 'idle'; down = false; introOn = false; introEl.hidden = true; sealOff(true); takeOff(); infoOff();
      if(phoneFree){ docOff(); document.documentElement.classList.remove('gmdoc'); phoneFree = false; } docMode = false; unlockDoc(); jumpTo(openY);
      siteInert(false);
      if(histPushed){ histPushed = false; setTimeout(function(){

        if(document.documentElement.classList.contains('cpopen')) return;
        try{ history.back(); }catch(e){} }, 640); }
      gm.classList.add('out');
      gm.classList.remove('on', 'sheeton'); document.documentElement.classList.remove('gminfo', 'gms0', 'gms1', 'gms2', 'gms3', 'gms4');
      sheetEl.setAttribute('aria-hidden', 'true'); try{ sheetEl.inert = true; }catch(x){} document.documentElement.classList.remove('gmopen', 'gms0', 'gms1', 'gms2', 'gms3'); clearTimeout(ibgT);
      offT = setTimeout(function(){ gm.hidden = true; gm.classList.remove('out'); closing = false; if(window.__retint) window.__retint(); }, 620);
      if(lastFocus && lastFocus.focus){ try{ lastFocus.focus({preventScroll:true}); }catch(e){} }
    }

    var rot = false, turnEl = null, tbEl = null, turnT = 0;
    function unturn(){ if(!rot) return; rot = false; axlText(); stage.classList.remove('rot'); if(tbEl) tbEl.setAttribute('aria-pressed', 'false'); tbLabel(); }

    function axlText(){ var axh = gm.querySelector('.gm-axl.h'), axv = gm.querySelector('.gm-axl.v'); if(axh) axh.textContent = rot ? L('左から ↑', 'from left ↑') : L('左から →', 'from left →'); if(axv) axv.textContent = rot ? L('上から →', 'from top →') : L('上から ↓', 'from top ↓'); }
    function tbLabel(){ if(!tbEl) return; var t = rot ? L('絵を縦に戻す', 'Turn the picture back') : L('絵を横にして、大きく', 'Turn the picture sideways'); tbEl.setAttribute('aria-label', t); tbEl.title = t; var sp = tbEl.querySelector('span'); if(sp) sp.textContent = rot ? L('縦に戻す', 'Back') : L('横にする', 'Turn'); }
    function turnAllowed(){
      var b = picks[bi]; if(!b || !turnEl || state === 'avg' || state === 'idle' || gm.hidden) return false;
      var sw = gm.querySelector('.gm-sw'), W = Math.max(60, sw.clientWidth - 30), H = Math.max(stage.offsetHeight, sw.clientHeight - 40);
      if(rot) return true;
      var ar = b.ar, w0 = Math.min(W, H * ar), a0 = w0 * w0 / ar, w1 = Math.min(W, H / ar), a1 = w1 * w1 * ar;
      return a1 > a0 * 1.2;
    }
    function tbFit(){ if(tbEl) tbEl.hidden = !turnAllowed(); lbFit(); }

    function lbFit(){ if(!lbEl) return; lbEl.hidden = !(!rot && (state === 'trace' || state === 'compare')); }
    function lbLabel(){
      if(!lbEl) return;
      lbEl.setAttribute('aria-pressed', lensPref ? 'true' : 'false');
      var t = lensPref ? L('虫眼鏡をしまう', 'Turn the lens off') : L('虫眼鏡を出す', 'Turn the lens on');
      lbEl.setAttribute('aria-label', t); lbEl.title = t;
    }
    function turnPic(on){
      var b = picks[bi]; if(!b || on === rot || !turnEl) return;
      if(demoEl){ demoDone = true; demoOff(); }
      var s0 = stage.getBoundingClientRect(), t0w = turnEl.offsetWidth, t0h = turnEl.offsetHeight;
      hideLive(); if(state === 'trace' && live < 0) tipEl.classList.remove('off');
      rot = on; axlText(); stage.classList.toggle('rot', on); tbEl.setAttribute('aria-pressed', on ? 'true' : 'false'); tbLabel();
      clearTimeout(turnT); stage.style.transition = 'none'; turnEl.style.transition = 'none';
      stage.style.width = ''; stage.style.height = ''; turnEl.style.width = ''; turnEl.style.height = ''; turnEl.style.transform = '';
      stage.style.setProperty('--par', b.ar); stage.style.setProperty('--ar', on ? (1 / b.ar).toFixed(4) : b.ar); fit();
      var s1 = stage.getBoundingClientRect(), t1w = turnEl.offsetWidth, t1h = turnEl.offsetHeight;
      if(rm){ stage.style.transition = ''; turnEl.style.transition = ''; return; }
      stage.style.width = s0.width + 'px'; stage.style.height = s0.height + 'px'; turnEl.style.width = t0w + 'px'; turnEl.style.height = t0h + 'px';
      turnEl.style.transform = 'translate(-50%,-50%) rotate(' + (on ? 0 : -90) + 'deg)';
      void stage.offsetWidth;
      stage.style.transition = 'width .55s var(--ease), height .55s var(--ease)'; turnEl.style.transition = 'width .55s var(--ease), height .55s var(--ease), transform .55s var(--ease)';
      stage.style.width = s1.width + 'px'; stage.style.height = s1.height + 'px'; turnEl.style.width = t1w + 'px'; turnEl.style.height = t1h + 'px'; turnEl.style.transform = '';
      turnT = setTimeout(function(){ stage.style.transition = ''; stage.style.width = ''; stage.style.height = ''; turnEl.style.transition = ''; turnEl.style.width = ''; turnEl.style.height = ''; }, 600);
    }
    var swapT = 0;
    function showBoard(b){
      sealOff(true); stage.classList.remove('twelve'); clearDim(); linesEl.innerHTML = '';
      var had = picEl.firstChild;
      function put(){ unturn(); stage.style.setProperty('--ar', b.ar); stage.style.setProperty('--par', b.ar); stage.classList.remove('blank'); picEl.innerHTML = ''; picEl.appendChild(picOf(b)); picEl.classList.remove('swap'); tbFit(); setTimeout(fit, 60); setTimeout(fit, 420);    }

      if(had && !rm){
        clearTimeout(swapT); stage.classList.add('swapping'); picEl.classList.add('swap'); var oc = gm.querySelector('.gm-cring'); if(oc) oc.classList.add('bye');
        swapT = setTimeout(function(){

          var r0 = stage.getBoundingClientRect();
          stage.style.transition = 'none';
          unturn(); stage.style.setProperty('--ar', b.ar); stage.style.setProperty('--par', b.ar); stage.classList.remove('blank'); picEl.innerHTML = '';
          var r1 = stage.getBoundingClientRect();
          if(Math.abs(r0.width - r1.width) > 1 || Math.abs(r0.height - r1.height) > 1){
            stage.style.width = r0.width + 'px'; stage.style.height = r0.height + 'px'; void stage.offsetWidth;
            stage.style.transition = 'width .32s var(--ease), height .32s var(--ease)'; stage.style.width = r1.width + 'px'; stage.style.height = r1.height + 'px';
          } else stage.style.transition = '';
          swapT = setTimeout(function(){ stage.style.transition = ''; stage.style.width = ''; stage.style.height = ''; picEl.appendChild(picOf(b)); picEl.classList.remove('swap'); tbFit(); swapT = setTimeout(function(){ stage.classList.remove('swapping'); }, 300); }, 340); }, 220);
      } else put();
    }
    function swapRes(fn){ if(rm){ fn(); return; } resEl.classList.add('sw'); setTimeout(function(){ fn(); resEl.classList.remove('sw'); }, 150); }
    function hideLive(){ var lc = liveEl.querySelector('.gm-lcap'); if(lc) lc.parentNode.removeChild(lc); var ld = liveEl.querySelector('.gm-ldot'); if(ld) ld.parentNode.removeChild(ld); liveEl.className = 'gm-live'; readEl.className = 'gm-read'; tipEl.classList.add('off'); drv.style.width = '0'; drh.style.height = '0'; drv.className = 'gm-dimr v'; drh.className = 'gm-dimr h';
      if(state === 'trace'){ listState(); mode(L('なぞる', 'trace')); tipEl.classList.remove('off'); }
    }
    function clearDim(){ dimEl.className = 'gm-dim'; dimEl.innerHTML = ''; }

    function start(){
      res = []; bi = 0; ti = 0; live = -1; first = true;
      picks = pick3(); preload(picks); cardEl.hidden = true; trayReset();
      boardStart(0);
    }
    var boardAt = 0;
    function boardStart(i){
      bi = i; ti = 0; res[i] = {}; boardAt = performance.now(); var b = picks[i]; goEl.classList.remove('hold', 'on'); try{ goEl.inert = false; }catch(x){}
      showBoard(b);
      cardRender(i);
      cardEl.hidden = false; listBuild();
      (function(){ var sc = gm.querySelector('.gm-side'); if(sc) sc.scrollTop = 0; })();
      turn();
    }
    function cardRender(i){ var b = picks[i];
      cardEl.innerHTML = '<b>' + 'ABC'[i] + '</b><strong>' + ttl(b) + '</strong><em>' + L('分析カテゴリ · ', 'Category · ') + esc(L(b.cat, b.cate)) + '<button type="button" class="gm-q gm-catq2" aria-label="' + L('分析カテゴリとは', 'What is a category') + '" title="' + L('分析カテゴリとは：研究で測定対象の全体の構成を7つの観点で整理したもの。押すと説明が開きます。', 'The category: one of seven viewpoints from my research. Press to open the explanation.') + '">?</button></em><small>' + esc(L(b.src, b.srce)) + '</small>';
      cardEl.querySelector('.gm-catq2').addEventListener('click', function(){ infoWantCat = true; info(); });
    }
    function obj(b){ return L(b.obj || '塊', b.obje || 'mass'); }

    var demoEl = null, demoDone = false;
    function demoOn(){ if(demoDone || rm || state === 'avg' || state === 'done') return;    demoOff(); demoEl = el('div', 'gm-demo'); demoEl.innerHTML = '<i class="gm-demo-ln"></i><i class="gm-demo-dot"></i>';   ; stage.appendChild(demoEl);

      requestAnimationFrame(function(){ if(!demoEl || !tipEl) return; var tr = tipEl.getBoundingClientRect(), sr = stage.getBoundingClientRect(), b = demoEl.querySelector('b'); if(b && tr.height && tr.top >= sr.top - 1){    b.style.left = (tr.left - sr.left) + 'px'; b.style.top = (tr.bottom - sr.top + 8) + 'px'; b.style.bottom = 'auto'; b.style.width = tr.width + 'px'; b.style.transform = 'none'; } }); }
    function demoFit(){
      if(!demoEl || !tipEl) return; var bEl = demoEl.querySelector('b'); if(!bEl) return;
      var tb = tipEl.getBoundingClientRect(); if(!tb.width) return;
      bEl.style.marginLeft = '0px';
      var bb = bEl.getBoundingClientRect(); if(!bb.width) return;
      bEl.style.marginLeft = Math.round((tb.left + tb.width / 2) - (bb.left + bb.width / 2)) + 'px';
    }
    function demoOff(){ if(demoEl && demoEl.parentNode) demoEl.parentNode.removeChild(demoEl); demoEl = null; }

    var tutEl = null, tutOn = false, tutAt = 0, tutPend = null, tutT = 0, tutAtT = 0;
    var tutSayH = 0;

    function tutSay(t){
      var html = body(t);
      if(document.documentElement.lang === 'en' || typeof mixSet !== 'function') return html;
      var box = el('span'); box.innerHTML = html;
      var w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null), ns = [], n;
      while((n = w.nextNode())) ns.push(n);
      ns.forEach(function(x){
        var s = el('span', 'mx'); s.textContent = x.nodeValue; mixSet(s);
        x.parentNode.replaceChild(s, x);
      });
      return box.innerHTML;
    }

    function tutNum(b, i, n){
      b.innerHTML = '';
      var a = el('em'), s = el('s'), z = el('u');
      a.textContent = ('0' + (i + 1)).slice(-2); s.textContent = '/'; z.textContent = ('0' + n).slice(-2);
      b.appendChild(a); b.appendChild(s); b.appendChild(z);
    }

    var STUTS = [
      {k:['smock'],  ja:'あなたの《4本の線》に合わせて、見出し・図版・本文が置いてあります。',
                     en:'A heading, an image and body text are set against your 《four lines》.'},
      {k:['stool'],  ja:'ここから《見出し・図版・本文》を足して、つまんで動かせます。',
                     en:'Add a 《heading, image or body text》 from here, then drag them where you like.'},
      {k:['swk'],    ja:'あなたのグリッドと｜このサイトのグリッドを、｜切り替えて見比べられます。',
                     en:'Switch between your grid｜and this site’s grid｜to compare the two.'}
    ];
    var tutList = null, tutKind = '';
    var TUTS = [

      {k:['stage','rl','rt'], ja:'この絵に、《4本の線》を引きます。',
                                en:'You will draw 《four lines》 on this picture.'},
      {k:['step'],              ja:'%sの帯に、《いま何本目か》が出ます。',
                                en:'The band %s shows 《which line you are on》.'},
      {k:['tip'],               ja:'探すところは、《ここ》に書いてあります。',
                                en:'《This line》 says what to look for.'}
    ];

    function tutWay(){
      var r = tutBox('step');
      if(!r) return [L('右', 'right'), 'on the right'];
      var s = tutEl && tutEl.querySelector('.gmt-say'), sb = s && s.getBoundingClientRect(), x0, x1;
      if(sb && sb.width > 4){ x0 = sb.left; x1 = sb.right; }
      else { var f = tutFree(); if(!f) return [L('右', 'right'), 'on the right']; x0 = f[0]; x1 = f[0] + f[2]; }
      if(r[0] >= x1 - 8) return [L('右', 'right'), 'on the right'];
      if(r[0] + r[2] <= x0 + 8) return [L('左', 'left'), 'on the left'];
      return [L('下', 'below'), 'below'];
    }
    function tutSeen(){ return false; }
    function tutBox(k){
      if(k === 'smock'){

        var u = null, ds = sheetEl ? sheetEl.querySelectorAll('.gm-mock .gm-drag') : [];
        Array.prototype.forEach.call(ds, function(x){ var b = x.getBoundingClientRect();
          if(b.width > 2 && b.height > 2) u = tutUni(u, [b.left, b.top, b.width, b.height]); });
        return u;
      }
      var e = k === 'stage' ? stage : k === 'step' ? stepEl : k === 'tip' ? tipEl
            : gm.querySelector('.gm-' + k);
      if(!e) return null;
      var r = e.getBoundingClientRect();
      return (r.width > 2 && r.height > 2) ? [r.left, r.top, r.width, r.height] : null;
    }
    function tutUni(a, b){
      if(!a) return b; if(!b) return a;
      var l = Math.min(a[0], b[0]), t = Math.min(a[1], b[1]);
      return [l, t, Math.max(a[0] + a[2], b[0] + b[2]) - l, Math.max(a[1] + a[3], b[1] + b[3]) - t];
    }
    function tutSet(e, r){
      e.style.left = Math.round(r[0]) + 'px'; e.style.top = Math.round(r[1]) + 'px';
      e.style.width = Math.max(0, Math.round(r[2])) + 'px'; e.style.height = Math.max(0, Math.round(r[3])) + 'px';
    }

    function tutFree(){
      var hd = gm.querySelector('.gm-hd'), a = gm.querySelector('.gm-ttl');
      if(!hd || !a) return null;
      var h = hd.getBoundingClientRect(), ar = a.getBoundingClientRect();

      var right = null;
      ['.gm-shd', '.gm-i', '.gm-x'].forEach(function(sel){
        var e = gm.querySelector(sel); if(!e) return;
        var r = e.getBoundingClientRect();
        if(!(r.width > 0 && r.height > 0)) return;
        if(r.left <= ar.right) return;
        if(right === null || r.left < right) right = r.left;
      });
      if(right === null) return null;
      var x = ar.right + 40, w = right - 24 - x;
      return (w >= 330 && h.height > 30) ? [x, h.top, w, h.height] : null;
    }
    function tutStart(){
      if(!tutOn) return;
      if(!tutList) tutList = TUTS;
      if(!gm || !stage || !stepEl || !tipEl){ tutOn = false; tutFlush(); return; }
      tutAt = 0;
      tutEl = el('div', 'gmt');
      tutEl.setAttribute('aria-hidden', 'true');
      tutEl.innerHTML =
        '<i class="gmt-veil">' +
        '<i class="gmt-p t"></i><i class="gmt-p b"></i><i class="gmt-p l"></i><i class="gmt-p r"></i>' +
        '<i class="gmt-p wt"></i><i class="gmt-p wl"></i><i class="gmt-p wr"></i>' +
        '<i class="gmt-c tl"></i><i class="gmt-c tr"></i><i class="gmt-c bl"></i><i class="gmt-c br"></i>' +
        '<i class="gmt-c w tl"></i><i class="gmt-c w tr"></i><i class="gmt-c w bl"></i><i class="gmt-c w br"></i>' +
        '</i>' +
        '<p class="gmt-say"><b></b><span class="gmt-t"></span><i class="gmt-nx"></i></p>' +
        '<button class="gmt-skip" type="button"></button>';
      tutEl.querySelector('.gmt-skip').textContent = L('手引きをとばす', 'Skip this');
      document.body.appendChild(tutEl);
      tutEl.addEventListener('pointerdown', function(e){
        e.preventDefault();
        if(performance.now() - tutAtT < 420) return;
        if(e.target && e.target.closest && e.target.closest('.gmt-skip')){ tutEnd(); return; }
        if(tutAt < tutList.length - 1) tutStep(tutAt + 1); else tutEnd();
      }, {passive:false});
      window.addEventListener('resize', tutFit);
      document.addEventListener('keydown', tutKey, true);
      tutStep(0);
      requestAnimationFrame(function(){ if(tutEl) tutEl.classList.add('on'); });
    }
    function tutKey(e){
      if(!tutOn) return;
      if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); tutEnd(); return; }
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); e.stopPropagation(); if(tutAt < tutList.length - 1) tutStep(tutAt + 1); else tutEnd(); }
    }
    function tutStep(i){
      if(!tutEl) return;
      tutAt = i; tutAtT = performance.now();
      var s = tutList[i], say = tutEl.querySelector('.gmt-say');
      tutNum(say.querySelector('b'), i, tutList.length);
      var w = tutWay();

      var _tt = say.querySelector('.gmt-t');
      _tt.innerHTML = tutSay(L(s.ja.replace('%s', w[0]), s.en.replace('%s', w[1]))).replace(/｜/g, '<br>');

      _tt.querySelectorAll('i').forEach(function(x){
        if(x.children.length === 1 && x.firstElementChild.tagName === 'BR' && !x.textContent.trim())
          x.parentNode.replaceChild(x.firstElementChild, x);
      });

      _tt.querySelectorAll('br').forEach(function(b){
        for(var n = 0; n < 4 && b.parentNode !== _tt; n++){
          var _p = b.parentNode;
          if(_p.lastChild === b) _p.parentNode.insertBefore(b, _p.nextSibling);
          else if(_p.firstChild === b) _p.parentNode.insertBefore(b, _p);
          else break;
        }
      });
      say.classList.remove('in'); void say.offsetWidth; say.classList.add('in');
      lite(say);
      var nx = say.querySelector('.gmt-nx');
      nx.textContent = (i === tutList.length - 1) ? (tutKind === 'sheet' ? L('押すと、閉じます', 'Press to close') : L('押すと、始まります', 'Press to begin'))
                                               : L('押して、次へ', 'Press for the next');
      nx.classList.remove('on'); clearTimeout(tutT);
      tutT = setTimeout(function(){ if(tutEl) nx.classList.add('on'); }, rm ? 0 : 1300);
      tutFit();
      setTimeout(tutFit, 60);
    }
    var tutWT = 0;
    function tutFit(){
      if(!tutEl) return;
      var open = null;
      tutList[tutAt].k.forEach(function(k){ open = tutUni(open, tutBox(k)); });
      if(!open){ tutEnd(); return; }
      open = [open[0] - 10, open[1] - 10, open[2] + 20, open[3] + 20];
      var W = window.innerWidth, H = window.innerHeight;
      var x = open[0], y = open[1], r = open[0] + open[2], b = open[1] + open[3];

      var OV = 400;

      var say = tutEl.querySelector('.gmt-say'), f = tutFree(), put = null, win = null;
      var wt = tutEl.querySelector('.gmt-p.wt'), wl = tutEl.querySelector('.gmt-p.wl'),
          wr = tutEl.querySelector('.gmt-p.wr');
      say.classList.remove('ts2', 'dim');
      if(f){
        say.style.width = 'max-content';
        if(say.offsetWidth > f[2]){
          if(f[3] >= 96){ say.classList.add('ts2'); say.style.width = 'max-content'; }
          if(say.offsetWidth > f[2]) say.style.width = f[2] + 'px';
        }
        var nb = say.querySelector('b');
        if(nb) say.style.setProperty('--tsnum', nb.offsetWidth + 'px');
        var pv = Math.min(14, Math.max(8, Math.round(f[3] * .12)));
        tutSayH = Math.max(tutSayH, Math.min(say.offsetHeight + pv * 2, f[3] - 4));
        var wh = tutSayH, wy = f[1] + Math.max(2, Math.round((f[3] - wh) / 2));
        var wx = f[0] - 22, ww = Math.min(say.offsetWidth + 48, Math.max(80, f[0] + f[2] + 14 - wx));
        if(wy + wh <= y - 4){
          put = [f[0], wy + Math.round((wh - say.offsetHeight) / 2)];
          win = [wx, wy, ww, wh];
        }
      }

      var _tEl = tutEl.querySelector('.gmt-p.t');
      if(!win && wl && wl.offsetWidth > 0){
        var _cb = _tEl.getBoundingClientRect();
        if(_cb.height > 0 && _cb.top > -OV + 1){
          _tEl.style.transition = 'none';
          tutSet(_tEl, [-OV, -OV, W + OV * 2, _cb.top + _cb.height + OV]);
          void _tEl.offsetWidth;
          _tEl.style.transition = '';
        }
      }

      tutSet(_tEl, win ? [-OV, win[1] + win[3], W + OV * 2, y - win[1] - win[3]]
                       : [-OV, -OV, W + OV * 2, y + OV]);
      tutSet(tutEl.querySelector('.gmt-p.b'), [-OV, b, W + OV * 2, H - b + OV]);
      tutSet(tutEl.querySelector('.gmt-p.l'), [-OV, y - 1, x + OV, open[3] + 2]);
      tutSet(tutEl.querySelector('.gmt-p.r'), [r, y - 1, W - r + OV, open[3] + 2]);
      var cr = Math.max(4, Math.min(9, Math.round(Math.min(open[2], open[3]) * .02)));
      tutEl.style.setProperty('--gmt-r', cr + 'px');
      tutSet(tutEl.querySelector('.gmt-c.tl'), [x - 1, y - 1, cr + 1, cr + 1]);
      tutSet(tutEl.querySelector('.gmt-c.tr'), [r - cr, y - 1, cr + 1, cr + 1]);
      tutSet(tutEl.querySelector('.gmt-c.bl'), [x - 1, b - cr, cr + 1, cr + 1]);
      tutSet(tutEl.querySelector('.gmt-c.br'), [r - cr, b - cr, cr + 1, cr + 1]);
      if(win){
        clearTimeout(tutWT);
        var qx = win[0], qy = win[1], qw = win[2], qh = win[3];
        tutSet(wt, [-OV, -OV, W + OV * 2, qy + OV]);
        tutSet(wl, [-OV, qy - 1, qx + OV, qh + 2]);
        tutSet(wr, [qx + qw, qy - 1, W - qx - qw + OV, qh + 2]);
        var wr2 = Math.max(3, Math.min(7, Math.round(Math.min(qw, qh) * .05)));
        tutEl.style.setProperty('--gmt-wr', wr2 + 'px');
        tutSet(tutEl.querySelector('.gmt-c.w.tl'), [qx - 1, qy - 1, wr2 + 1, wr2 + 1]);
        tutSet(tutEl.querySelector('.gmt-c.w.tr'), [qx + qw - wr2, qy - 1, wr2 + 1, wr2 + 1]);
        tutSet(tutEl.querySelector('.gmt-c.w.bl'), [qx - 1, qy + qh - wr2, wr2 + 1, wr2 + 1]);
        tutSet(tutEl.querySelector('.gmt-c.w.br'), [qx + qw - wr2, qy + qh - wr2, wr2 + 1, wr2 + 1]);
      }
      if(!put){
        clearTimeout(tutWT);
        tutSet(wt, [0, 0, 0, 0]); tutSet(wl, [0, 0, 0, 0]); tutSet(wr, [0, 0, 0, 0]);
        tutEl.querySelectorAll('.gmt-c.w').forEach(function(cw){ tutSet(cw, [0, 0, 0, 0]); });
        say.classList.add('dim'); say.classList.add('ts2');
        var bw = Math.max(300, Math.min(560, open[2]));
        say.style.width = bw + 'px';
        var sh = say.offsetHeight;
        put = (H - b >= sh + 28) ? [Math.max(24, Math.min(x, W - bw - 24)), b + 18]
                                 : [Math.max(16, Math.min(x, W - bw - 16)), Math.max(20, Math.round(H / 2 - sh / 2))];
      }
      say.style.left = Math.round(put[0]) + 'px'; say.style.top = Math.round(put[1]) + 'px';
    }

    function tutFlush(){
      if(tutKind === 'sheet') return;
      if(tutPend){ var p = tutPend; tutPend = null; help(p[0], p[1]); }
      if(bi === 0 && ti === 0 && !demoDone){
        setTimeout(function(){ demoOn(); demoFit(); setTimeout(demoFit, 400); }, rm ? 0 : 420);
      }
    }
    function tutEnd(){
      if(!tutOn) return;
      tutOn = false; clearTimeout(tutT); clearTimeout(tutWT); tutSayH = 0;
      try{ localStorage.setItem('gm-tut', '1'); }catch(e){}
      window.removeEventListener('resize', tutFit);
      document.removeEventListener('keydown', tutKey, true);
      var e = tutEl; tutEl = null;
      if(e){
        e.style.pointerEvents = 'none';
        e.classList.remove('on');
        setTimeout(function(){ if(e.parentNode) e.parentNode.removeChild(e); }, rm ? 0 : 540);
      }
      tutFlush();
      tutList = TUTS; tutKind = '';
    }

    window.__gmTutorAgain = function(){ try{ localStorage.removeItem('gm-tut'); }catch(e){} };
    function turn(){
      setTimeout(function(){ if(stage && state === 'trace') stage.classList.toggle('narrow', stage.getBoundingClientRect().width < 330); }, 520);
      var lead2 = gm.querySelector('.gm-lead2');

      if(lead2 && !lead2.hidden){ lead2.className = 'gm-lead2 gm-res bye'; setTimeout(function(){ lead2.hidden = true; lead2.classList.remove('bye'); }, 420); }
      if(bi === 0 && ti === 0 && !demoDone){ setTimeout(function(){ if(tutOn) return;    demoOn(); demoFit(); setTimeout(demoFit, 400); }, 1150); } else demoOff();
      var t = LINES[ti], b = picks[bi];
      state = 'trace'; live = -1; down = false; lensOff();
      stepEl.innerHTML = '<span>' + esc(L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + ti + 1) + '</span>'; listState(); mode(L('なぞる', 'trace'));

      resPre(true);
      resEl.innerHTML =
        '' +
        '';
      hTween(goEl, true);
      goEl.innerHTML = '';
      if(bi === 0) help(t, false); else helpOff();
      hideLive(); liveEl.className = 'gm-live ' + t.ax; liveEl.style.left = ''; liveEl.style.top = '';
      tipText(); tipEl.classList.remove('off', 'hid');
      if(ptype !== 'touch') setTimeout(function(){ if(state === 'trace') stage.focus({preventScroll:true}); }, 30);
      setTimeout(tipFit, 40); setTimeout(tipFit, 520);
      tbFit();
    }

    var lensEl = null, lbEl = null, lensPref = true;
    try{ lensPref = localStorage.getItem('gm-lens') !== '0'; }catch(e){}
    function lensOn(){
      if(rm || rot || !lensPref || !picEl) return;
      var im = picEl.querySelector('img'); if(!im) return;
      var src = im.currentSrc || im.src; if(!src) return;
      if(!lensEl){ lensEl = el('div', 'gm-lens'); lensEl.appendChild(el('i', 'gm-lensx')); stage.appendChild(lensEl); }
      if(lensEl.parentNode !== stage) stage.appendChild(lensEl);
      lensEl.style.backgroundImage = 'url("' + src + '")';
      lensEl.classList.add('on');
    }
    function lensMove(e){
      if(!lensEl || !lensEl.classList.contains('on')) return;
      var r = stage.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, Z = 2.2, R = 58;
      var oy = ptype === 'touch' ? -96 : 0;
      lensEl.style.left = x + 'px'; lensEl.style.top = (y + oy) + 'px';
      lensEl.style.backgroundSize = (r.width * Z) + 'px ' + (r.height * Z) + 'px';
      lensEl.style.backgroundPosition = (R - x * Z) + 'px ' + (R - y * Z) + 'px';
      lensEl.classList.toggle('v', LINES[ti] && LINES[ti].ax === 'v');
    }
    function lensOff(){ if(lensEl) lensEl.classList.remove('on'); }
    function move(e){
      if(state !== 'trace') return;
      var t = LINES[ti], r = stage.getBoundingClientRect(), px, py;
      if(rot){ px = 100 - (e.clientY - r.top) / r.height * 100; py = (e.clientX - r.left) / r.width * 100; }
      else { px = (e.clientX - r.left) / r.width * 100; py = (e.clientY - r.top) / r.height * 100; }
      var p = t.ax === 'v' ? px : py;
      setLive(Math.max(0, Math.min(100, p)));
      if(down){ if(!lensEl || !lensEl.classList.contains('on')) lensOn();
        lensMove(e); }
    }

    function setLive(p){
      var t = LINES[ti]; live = p; var s = p.toFixed(2) + '%'; listLive(p); mode(down ? L('引いている', 'drawing') : L('なぞる', 'trace'));
      liveEl.className = 'gm-live ' + t.ax + ' on' + (down ? ' press' : '') + (p > 88 ? ' low' : '') + (p < 12 ? ' high' : '');
      if(down && p < 14) tipEl.classList.add('off'); readEl.className = 'gm-read ' + t.ax + ' on';
      if(t.ax === 'v'){ liveEl.style.left = s; liveEl.style.top = ''; readEl.style.left = rot ? 'clamp(46px, ' + s + ', calc(100% - 46px))' : 'min(' + s + ', calc(100% - 46px))'; readEl.style.top = ''; drv.style.width = s; drv.className = 'gm-dimr v on'; }
      else { liveEl.style.top = s; liveEl.style.left = ''; readEl.style.top = rot ? 'clamp(46px, ' + s + ', calc(100% - 46px))' : 'max(31px, ' + s + ')'; readEl.style.left = ''; drh.style.height = s; drh.className = 'gm-dimr h on'; }
      readEl.textContent = Math.round(p) + '%';
      if(down && moved > 5) tipEl.classList.add('off');
    }

    function confirm(){
      if(state !== 'trace' || live < 0) return;
      var t = LINES[ti], b = picks[bi], p = Math.round(live), a = b.a[t.k], d = p - a;
      state = 'compare'; fixedAt = performance.now(); res[bi][t.k] = p; hideLive(); helpOff(); listState(); mode(L('比べる', 'compare'));
      if(bi === 2 && ti === LINES.length - 1 && !rm){ stage.classList.remove('twelve'); void stage.offsetWidth; stage.classList.add('twelve'); }
      var ln = mkLine(linesEl, t.ax, p, 'you now', p + '%');
      if(!rm) setTimeout(function(){ ln.classList.remove('now'); }, 420);
      mkLine(linesEl, t.ax, a, 'mine', a + '%');
      dim(t.ax, p, a, d);

      cmpRender(t, b, p, a, d);
      if(first && !window.__gmSaidOnce){ window.__gmSaidOnce = true;
        var once = el('p', 'gm-once'); once.innerHTML = '<i class="gm-oncek">' + L('この差について', 'ABOUT THIS GAP') + '</i>' + body(L('この差が示すのは正解・不正解ではなく、《私との解釈の違い》です。その違いを楽しむゲームです！', 'This difference is not about right or wrong. It shows 《how your reading differs from mine》. Enjoying that difference is the game!'));
        lite(once);

        once.classList.add('gm-onceb');
        var host = gm.querySelector('.gm-sw') || stage.parentNode;
        var tie = el('i', 'gm-oncetie');
        host.appendChild(tie); host.appendChild(once);
        (function place(){
          var sr = stage.getBoundingClientRect(), hr = host.getBoundingClientRect();
          var you = linesEl.querySelector('.gm-ln.you.now') || linesEl.querySelector('.gm-ln.you');
          var mine = linesEl.querySelector('.gm-ln.mine');
          if(!you || !mine){ once.style.left = '50%'; once.style.top = '62%'; return; }
          var yr = you.getBoundingClientRect(), mr = mine.getBoundingClientRect();
          var horiz = you.classList.contains('h');

          var PAD = 16;
          if(horiz){
            var y1 = yr.top - hr.top, y2 = mr.top - hr.top, x = sr.left - hr.left + sr.width * .62;
            tie.className = 'gm-oncetie v';
            tie.style.left = x + 'px'; tie.style.top = Math.min(y1, y2) + 'px'; tie.style.height = Math.max(6, Math.abs(y2 - y1)) + 'px';
            var oh = once.offsetHeight || 96, lowY = Math.max(y1, y2), upY = Math.min(y1, y2);
            var below = (lowY + PAD + oh) <= (sr.bottom - hr.top - 6);
            once.className = 'gm-once gm-onceb ' + (below ? 'gm-once-dn' : 'gm-once-up');
            once.style.left = x + 'px'; once.style.top = (below ? lowY + PAD : upY - PAD) + 'px';
          } else {
            var x1 = yr.left - hr.left, x2 = mr.left - hr.left, y = sr.top - hr.top + sr.height * .62;
            tie.className = 'gm-oncetie h';
            tie.style.left = Math.min(x1, x2) + 'px'; tie.style.top = y + 'px'; tie.style.width = Math.max(6, Math.abs(x2 - x1)) + 'px';
            var ow = once.offsetWidth || 300, rgX = Math.max(x1, x2), lfX = Math.min(x1, x2);
            var right = (rgX + PAD + ow) <= (sr.right - hr.left - 6);
            once.className = 'gm-once gm-onceb ' + (right ? 'gm-once-rt' : 'gm-once-lf');
            once.style.left = (right ? rgX + PAD : lfX - PAD) + 'px'; once.style.top = y + 'px';
          }
        })();
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ once.classList.add('on'); tie.classList.add('on'); }); });

        setTimeout(function(){ once.classList.add('bye'); tie.classList.add('bye'); }, 5200);
        setTimeout(function(){ if(once.parentNode) once.parentNode.removeChild(once); if(tie.parentNode) tie.parentNode.removeChild(tie); }, 6400); }
      first = false; setTimeout(reveal, 80);
    }

    function cmpFit(){
      var d = resEl && resEl.querySelector('.gm-cmp');
      if(!d) return;

      if(document.documentElement.classList.contains('phone')) d.style.removeProperty('--cmpfs');
      else {
        var cols = Array.prototype.slice.call(d.children), best = Infinity;
        cols.forEach(function(c){
          var dd = c.querySelector('dd'); if(!dd) return;
          var w0 = dd.style.width; dd.style.width = 'max-content';
          var nat = dd.getBoundingClientRect().width; dd.style.width = w0;
          var avail = c.getBoundingClientRect().width - 2, fs = parseFloat(getComputedStyle(dd).fontSize);
          if(nat > 0 && avail > 0) best = Math.min(best, fs * avail / nat);
        });
        if(isFinite(best)) d.style.setProperty('--cmpfs', Math.max(26, Math.min(38, best)).toFixed(1) + 'px');
      }

      Array.prototype.forEach.call(d.children, function(c){ numOn(c.querySelector('dt'), c.querySelector('dd')); });
    }

    function numOn(head, cell){
      if(!head || !cell) return;
      head.style.transform = '';
      var tn = null;
      (function walk(n){ if(tn) return;
        if(n.nodeType === 3 && /\d/.test(n.textContent)){ tn = n; return; }
        for(var i = 0; i < n.childNodes.length; i++) walk(n.childNodes[i]); })(cell);
      if(!tn) return;

      var m = /[-+\u2212\u00b1]?\d[\d.]*/.exec(tn.textContent); if(!m) return;
      var r = document.createRange(); r.setStart(tn, m.index); r.setEnd(tn, m.index + m[0].length);

      var hr = document.createRange(); hr.selectNodeContents(head);
      var nb = r.getBoundingClientRect(), hb = hr.getBoundingClientRect();
      if(!(hb.width > 0)) hb = head.getBoundingClientRect();
      if(!(nb.width > 0) || !(hb.width > 0)) return;
      var dx = (nb.left + nb.width / 2) - (hb.left + hb.width / 2);
      if(Math.abs(dx) > .5) head.style.transform = 'translateX(' + dx.toFixed(1) + 'px)';
    }
    function numHead(){
      if(!resEl) return;
      var av = resEl.querySelector('.gm-avg'), h = av && av.querySelector('.gm-avgh'), r1 = av && av.querySelector('li:not(.gm-avgh)');

      if(h && r1){ numOn(h.querySelector(':scope > em'), r1.querySelector(':scope > em')); numOn(h.querySelector(':scope > small'), r1.querySelector(':scope > small')); }

      resEl.querySelectorAll('table').forEach(function(jt){
        var tr = jt.querySelector('tbody tr'); if(!tr) return;
        var th = jt.querySelectorAll('thead th'), td = tr.querySelectorAll('td');
        for(var i = 1; i < th.length && i < td.length; i++) numOn(th[i], td[i]);
      });
    }
    function cmpRender(t, b, p, a, d){
      resPre(); resEl.innerHTML = '<p class="gm-ask"><b>' + mix(t.n, t.ne, t.k === 'y1' || t.k === 'x1' ? '開始' : '重心') + '<small>' + L(t.dir, t.dire) + '</small></b></p>' +
        '<dl class="gm-cmp"><div><dt>' + L('あなた', 'you') + '</dt><dd>' + p + PC + '</dd></div><div><dt>' + L('私', 'me') + '</dt><dd>' + a + PC + '</dd></div><div><dt>' + L('解釈の違い', 'difference') + '</dt><dd>' + sg(d) + PC + '</dd></div></dl>' +
        '<p class="gm-why">' + body(L(b.why[ti], b.whye[ti])) + '</p>' +
        (first ? '<p class="gm-note">' + L('絵の幅と高さをそれぞれ 100 として、線の位置を％で示します。', 'Line positions are shown as percentages, with the picture\'s width and height each set to 100.') + '<br>' + (ptype === 'touch' ? L('絵を押すと、次の線。', 'Tap the picture for the next line.') : L('絵をもう一度押すと、次の線。', 'Click the picture again for the next line.')) + '</p>' : '');
      cmpFit(); requestAnimationFrame(cmpFit); setTimeout(cmpFit, 260);
      if(!cmpFit.__rz){ cmpFit.__rz = 1; window.addEventListener('resize', function(){ clearTimeout(cmpFit.__t); cmpFit.__t = setTimeout(function(){ cmpFit(); numHead(); }, 180); }, {passive:true}); }
      goEl.innerHTML = ''; btn(ti < LINES.length - 1 ? L('次の線', 'Next line') : L('測り終える', 'Finish this picture'), nextTurn, 'go'); btn(L('引き直す', 'Redo this line'), redo);
    }

    function hTween(elm, ghost){
      if(rm || !elm) return;
      var h0 = elm.getBoundingClientRect().height, gh = null;
      if(ghost && h0 > 0 && elm.innerHTML.trim()){ gh = document.createElement('div'); gh.className = 'gm-resghost'; gh.innerHTML = elm.innerHTML; }
      if(h0 > 0){ elm.style.height = h0 + 'px'; elm.style.overflow = 'hidden'; }
      if(elm.__raf) cancelAnimationFrame(elm.__raf);
      elm.__raf = requestAnimationFrame(function(){
        elm.__raf = 0;
        if(gh){ elm.appendChild(gh); requestAnimationFrame(function(){ gh.classList.add('out'); });
          setTimeout(function(){ if(gh.parentNode) gh.parentNode.removeChild(gh); }, 300); }
        elm.style.height = ''; elm.style.transition = '';
        var h1 = elm.getBoundingClientRect().height;
        if(!(h0 > 0) || Math.abs(h1 - h0) < 4) return;
        elm.style.height = h0 + 'px'; elm.style.overflow = 'hidden'; void elm.offsetHeight;
        elm.style.transition = 'height .34s cubic-bezier(.22,.61,.36,1)'; elm.style.height = h1 + 'px';
        clearTimeout(elm.__anim);
        elm.__anim = setTimeout(function(){ elm.style.height = ''; elm.style.overflow = ''; elm.style.transition = ''; }, 380);
      });
    }
    function resPre(ghost){ hTween(resEl, ghost); }
    function moreMark(){ var sc = gm && gm.querySelector('.gm-side'); if(!sc) return; sc.classList.toggle('more', sc.scrollHeight - sc.clientHeight - sc.scrollTop > 6); }
    function revealRes(){
      var sc = gm.querySelector('.gm-side'); if(!sc || !resEl || sc.scrollHeight <= sc.clientHeight + 2) return;
      var st = gm.querySelector('.gm-side .gm-step'), sh = st ? st.getBoundingClientRect().height : 0;
      var top = sc.scrollTop + (resEl.getBoundingClientRect().top - sc.getBoundingClientRect().top) - sh - 10;
      try{ sc.scrollTo({top: Math.max(0, top), behavior: rm ? 'auto' : 'smooth'}); }catch(e){ sc.scrollTop = Math.max(0, top); }
    }
    function reveal(){
      if(!goEl.firstChild) return;
      var sc = goEl.parentNode;
      while(sc && sc !== gm){ var o = getComputedStyle(sc).overflowY; if((o === 'auto' || o === 'scroll') && sc.scrollHeight > sc.clientHeight + 2) break; sc = sc.parentNode; }
      if(!sc || sc === gm) return;
      var sr = sc.getBoundingClientRect(), d = goEl.getBoundingClientRect().bottom - sr.bottom + 10;
      if(d <= 0) return;

      var tgt = listEl && listEl.offsetParent ? Math.max(0, sc.scrollTop + (listEl.getBoundingClientRect().top - sr.top) - 8) : sc.scrollTop + d;
      if(tgt < sc.scrollTop) tgt = sc.scrollTop;
      try{ sc.scrollTo({top:tgt, behavior: rm ? 'auto' : 'smooth'}); }catch(e){ sc.scrollTop = tgt; }
      setTimeout(function(){ if(!goEl.firstChild) return; var d2 = goEl.getBoundingClientRect().bottom - sc.getBoundingClientRect().bottom + 10; if(d2 > 0){ try{ sc.scrollTo({top: sc.scrollTop + d2, behavior: rm ? 'auto' : 'smooth'}); }catch(e){ sc.scrollTop += d2; } } }, rm ? 0 : 560);
    }
    function dim(ax, p, a, d){
      var lo = Math.min(p, a), hi = Math.max(p, a);
      dimEl.className = 'gm-dim ' + ax + ' on' + (d === 0 ? ' same' : '');
      if(ax === 'h'){ dimEl.style.top = lo + '%'; dimEl.style.height = (hi - lo) + '%'; dimEl.style.left = ''; dimEl.style.width = ''; }
      else { dimEl.style.left = lo + '%'; dimEl.style.width = (hi - lo) + '%'; dimEl.style.top = ''; dimEl.style.height = ''; }
      dimEl.innerHTML = '<b>' + (d === 0 ? '=' : sg(d)) + '</b>';
    }
    function redo(){
      if(state !== 'compare') return;
      linesEl.querySelectorAll('.mine').forEach(function(x){ x.parentNode.removeChild(x); });
      var ys = linesEl.querySelectorAll('.you:not(.past)'); if(ys.length) ys[ys.length - 1].parentNode.removeChild(ys[ys.length - 1]);
      clearDim(); delete res[bi][LINES[ti].k]; turn();
    }
    function nextTurn(){
      if(state !== 'compare') return;
      linesEl.querySelectorAll('.mine').forEach(function(x){ x.parentNode.removeChild(x); });
      linesEl.querySelectorAll('.you').forEach(function(x){ x.classList.add('past'); });
      clearDim();
      ti++; if(ti < LINES.length) turn(); else boardDone();
    }
    function tally(i){
      var r = res[i] || {}, out = '';
      LINES.forEach(function(t){ if(r[t.k] != null) out += '<div><dt>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire[0].toUpperCase())) + '</dt><dd>' + r[t.k] + PC + '</dd></div>'; });
      return out ? '<dl class="gm-num">' + out + '</dl>' : '';
    }
    function table(i){
      var b = picks[i], r = res[i];
      return '<table class="gm-tb"><thead><tr><th>' + L('線', 'line') + '</th><th>' + L('あなた', 'you') + '</th><th>' + L('私', 'me') + '</th><th>' + L('違い', 'diff.') + '</th></tr></thead><tbody>' +
        LINES.map(function(t){ return '<tr><td>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire)) + '</td><td>' + r[t.k] + PC + '</td><td>' + b.a[t.k] + PC + '</td><td>' + sg(r[t.k] - b.a[t.k]) + PC + '</td></tr>'; }).join('') +
        '</tbody></table>';
    }
    function boardDone(){
      state = 'done'; fixedAt = performance.now(); if(tipEl) tipEl.classList.add('hid');
      trayFill(bi);
      var slot = trayEl.children[bi]; if(slot && !slot.querySelector('.gm-mseal')){ var ms = el('i', 'gm-mseal'); try{ if(typeof kakuSvg === 'function') ms.appendChild(kakuSvg('', ['壱', '弐', '参'][bi], 60 + bi)); }catch(x){} slot.appendChild(ms); centerSeal(ms); }
      doneFn = bi < 2 ? function(){ doneFn = null; boardStart(bi + 1); } : function(){ doneFn = null; average(); };
      stepEl.innerHTML = '<span>' + esc(L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + 4) + '</span>'; listState(); mode(L('測り終える', 'measured'));

      doneRender();
      focusBtn(); setTimeout(reveal, 80); setTimeout(reveal, 460);
      seal('MEASURED', '採寸', stage, 'tr');
      cring(L(ORD[bi] + '、測り終える \u00b7 MEASURED \u00b7 ', 'THE ' + ORDE[bi].toUpperCase() + ', MEASURED \u00b7 '));
    }
    function doneRender(){
      resPre(); resEl.innerHTML = '<p class="gm-ask"><b>' + mix(ORD[bi] + '、測り終わり。', 'The ' + ORDE[bi] + ', measured.', ORD[bi]) + '</b></p>' + table(bi) +
        '<p class="gm-note">' + (bi === 2 ? L('同じ役割の線を、3枚で平均します。', 'Lines of the same role are averaged across the three.') + '<br>' : '') + '</p>';
      numHead(); requestAnimationFrame(numHead); setTimeout(numHead, 300);
      goEl.innerHTML = '';
      if(bi < 2) btn(L(ORD[bi + 1] + 'へ', 'To the ' + ORDE[bi + 1]), doneFn, 'go');
      else btn(L('3枚の平均をとる', 'Average the three'), doneFn, 'go');
    }

    function observe(diff, per){

      var k = null, M = 0; LINES.forEach(function(t){ if(Math.abs(diff[t.k]) > M + 1e-9){ M = Math.abs(diff[t.k]); k = t.k; } });
      var w = null; per.forEach(function(x){ if(!w || Math.abs(x.d) > Math.abs(w.d) + 1e-9) w = x; });
      var E = w ? Math.abs(w.d) : 0, out = '';
      function nm(t){ return L(t.n + '（' + t.dir + '）', t.ne + ' (' + t.dire + ')'); }

      function dir(t, d){ return t.ax === 'h' ? (d > 0 ? L('下方向', 'below') : L('上方向', 'above')) : (d > 0 ? L('右方向', 'to the right of') : L('左方向', 'to the left of')); }
      function dsz(t, d, bare){ var a = Math.abs(Math.round(d)), w = t.ax === 'h' ? (d > 0 ? L('下方向に', 'below') : L('上方向に', 'above')) : (d > 0 ? L('右方向に', 'right') : L('左方向に', 'left')); if(d === 0) return L('同じ', 'same'); return bare ? a + PC : L(w + ' ' + a + PC, a + PC + ' ' + w); }
      if(E < 4) out = '<p class="gm-obs">' + mix('3枚とも、私と近い位置に4本の線を引きました。', 'On all three pictures, your four lines were close to mine.', '近い') + '</p>';
      else if(M >= 4){
        var t = LINES.filter(function(x){ return x.k === k; })[0], d = diff[k];
        out = '<p class="gm-obs">' + mix('平均すると、主塊の' + (t.k === 'y1' || t.k === 'x1' ? '始まり' : '重心') + 'を私より' + dir(t, d) + 'に見ています。', 'On average, you placed the mass’s ' + (t.k === 'y1' || t.k === 'x1' ? 'start' : 'centre of weight') + ' ' + dir(t, d) + ' mine.', dir(t, d)) + '<small>' + dsz(t, d, true) + '</small></p>';
        out += '<p class="gm-obs2">' + (L('いちばん解釈が分かれたのは、' + ORD[w.i] + 'の' + w.t.n + '（' + w.t.dir + '・', 'Where our readings split most: ' + nm(w.t) + ' on the ' + ORDE[w.i] + ' picture (') + '<span>' + dsz(w.t, w.d) + '</span>' + L('）。', ').') ) + '</p>';
      } else {
        out = '<p class="gm-obs">' + mix('平均は近く、いちばん解釈が分かれたのは' + ORD[w.i] + 'の' + w.t.n + '（' + w.t.dir + '）でした。', 'The averages are close; our readings split most on ' + nm(w.t) + ' of the ' + ORDE[w.i] + ' picture.', '近く') + '<small>' + dsz(w.t, w.d) + '</small></p>';
      }
      return out;
    }

    function average(){
      var avg = {}, kav = {}, diff = {}, per = [];
      LINES.forEach(function(t){ var s = 0, m = 0; res.forEach(function(r, k){ s += r[t.k]; m += picks[k].a[t.k]; per.push({i:k, t:t, d:r[t.k] - picks[k].a[t.k]}); }); avg[t.k] = Math.round(s / 3); kav[t.k] = Math.round(m / 3); diff[t.k] = (s - m) / 3; });
      state = 'avg'; cardEl.hidden = true; if(tipEl) tipEl.classList.add('hid');    hideLive(); clearDim(); helpOff(); demoOff(); sealOff(true); unturn();    tbFit(); if(listEl) listEl.hidden = true; mode(L('集める', 'gather'));
      picEl.classList.add('swap'); linesEl.innerHTML = ''; stage.classList.remove('narrow');

      setTimeout(function(){ stage.style.setProperty('--ar', (window.innerWidth / Math.max(1, window.innerHeight)).toFixed(3)); stage.classList.add('blank'); picEl.innerHTML = ''; picEl.classList.remove('swap'); }, rm ? 0 : 220);

      var ticks = [];
      LINES.forEach(function(t, n){
        res.forEach(function(r, k){ ticks.push({el: mkLine(linesEl, t.ax, r[t.k], 'tick', 'ABC'[k]), to: avg[t.k]}); });
        var av = mkLine(linesEl, t.ax, avg[t.k], 'you avg'); av.style.transitionDelay = (n * .95 + 1.15) + 's';
      });
      void linesEl.offsetWidth;

      LINES.forEach(function(t, n){ setTimeout(function(){ if(state === 'avg') mode(L(t.n + '（' + t.dir + '）を一本に', t.ne + ' (' + t.dire + ') into one')); }, rm ? 0 : 300 + n * 950); });
      setTimeout(function(){ if(state === 'avg') mode(L('平均', 'average')); }, rm ? 0 : 4300);
      var step = rm ? 0 : 1;
      setTimeout(function(){ ticks.forEach(function(x, i){ x.el.style.transitionDelay = (.35 + Math.floor(i / 3) * .95) + 's'; x.el.style[x.el.classList.contains('v') ? 'left' : 'top'] = x.to + '%'; }); linesEl.classList.add('gathered'); }, 120 * step);

      setTimeout(function(){ linesEl.classList.add('fixed');

        mkBands(linesEl, 'v', [avg.x1, avg.x3], 'you', 0); mkBands(linesEl, 'h', [avg.y1, avg.y2], 'you', .28); }, rm ? 60 : 4300);
      setTimeout(function(){ if(state === 'avg') confetti(); }, rm ? 0 : 4960);
      setTimeout(function(){ var n = resEl.querySelector('.gm-seven'); if(n) n.classList.add('on'); if(state === 'avg'){ seal('YOUR GRID', '平均', stage, 'center'); cring(L('あなたの平均グリッド \u00b7 YOUR GRID \u00b7 ', 'YOUR AVERAGE GRID \u00b7 YOUR GRID \u00b7 ')); var th = resEl.querySelector('.gm-thanks'); if(th) th.classList.add('on'); trayEl.classList.add('pulse'); setTimeout(function(){ trayEl.classList.remove('pulse'); }, 500); } }, rm ? 100 : 4900);
      setTimeout(function(){ goEl.classList.add('on'); try{ goEl.inert = false; }catch(x){} focusBtn(); revealRes(); }, rm ? 150 : 3900);
      lastAvg = {avg:avg, kav:kav, diff:diff, per:per}; avgRender(avg, kav, diff, per);
    }
    function avgRender(avg, kav, diff, per){
      stepEl.textContent = L('3枚の平均をとる', 'Averaging the three');
      resPre(); resEl.innerHTML = '<p class="gm-ask"><b>' + mix('あなたの平均グリッド', 'Your average grid', '平均') + '</b></p>' +
        '<p class="gm-thanks">' + body(L('12本からあなたの比率ができました。', 'From your twelve lines, your ratios are ready.')) + '</p>' +

        '<p class="gm-note">' + body(L('盤面の数字はあなたの4本で分けた《段の幅》です。縦横それぞれ足すと 100 になります。線そのものの位置は下の「4本の平均」に出しています。',
          'The numbers on the board are 《the width of each band》 your four lines divide the frame into; they add up to 100 across and down. The positions of the lines themselves are in “The four averages” below.')) + '</p>' +
        observe(diff, per) +
        '<p class="gm-legend gm-seven"><b><i class="you"></i>' + L('朱色の線：あなた', 'solid red: you') + '</b><b class="gm-lg7" hidden><i class="mine"></i>' + L('薄い破線：サイトのグリッド', 'faint dashed: the site’s grid') + '</b></p>' +
        sec(L('4本の平均', 'The four averages'), true) + '<div class="gm-catx gm-secx"><ul class="gm-avg"><li class="gm-avgh"><b></b><span></span><em>' + L('あなた', 'you') + '</em><small>' + L('私', 'me') + '</small></li>' + LINES.map(function(t){ return '<li><b>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire)) + '</b><span>' + res.map(function(r, k){ return 'ABC'[k] + ' ' + r[t.k]; }).join(' · ') + '</span><em>' + avg[t.k] + PC + '</em><small>' + kav[t.k] + '%</small></li>'; }).join('') + '</ul>' + '</div>' +
        '<div class="gm-jw">' + sec(L('日本と西洋の平均', 'Japan and the West')) +

          '<p class="gm-cmph">' + L('日本の絵と西洋の絵、それぞれの平均をあなたの4本と見比べられます。',
          'The Japanese and the Western averages can each be compared with your four lines.') + '</p>' + '<div class="gm-catx gm-secx" hidden>' +
          '<p class="gm-note">' + (function(){ var nj = BOARDS.filter(function(x){ return !!x.jp; }).length, nw = BOARDS.length - nj;
            return body(L('日本の絵 ' + nj + ' 点と西洋の絵 ' + nw + ' 点について、あなたが引いたのと同じ4本の位置を1本ずつ平均しており、あなたが計測した3枚もこの中に含まれます。',
              'For ' + nj + ' Japanese and ' + nw + ' Western pictures, the same four lines you drew are averaged one by one, and the three you measured are among them.')); })() + '</p>' +
          '<p class="gm-note">' + body(L('同じ手順で取り出した比率が、《日本の絵と西洋の絵でどう違うのか》。同じやり方で並べて見比べられるようにしました。',
            'How do proportions read by the same procedure 《differ between Japanese and Western pictures》? The two are set side by side, by the same method.')) + '</p>' +
          jwTable() +

          '<p class="gm-note">' + body(L('表の「差」は西洋の平均から日本の平均を引いた値で、《あなたと私の解釈の違いとは別のもの》です。' + (cat === 'jp' ? '西洋の絵の平均を、青い破線で盤面に重ねられます。日本の絵の平均は、表で見比べてください。' : '日本の絵の平均を、緑の破線で盤面に重ねられます。西洋の絵の平均は、表で見比べてください。'),
            'The “diff” column is the Japanese average subtracted from the Western one, and 《is not the difference between your reading and mine》. ' + (cat === 'jp' ? 'You can overlay the Western average on the board as blue dashed lines; for the Japanese average, read the table.' : 'You can overlay the Japanese average on the board as green dashed lines; for the Western average, read the table.'))) + '</p>' +
          '<button type="button" class="gm-b gm-jwb" aria-pressed="false">' + L(cat === 'jp' ? '西洋の絵の平均と重ねる' : '日本の絵の平均と重ねる', cat === 'jp' ? 'Overlay the Western average' : 'Overlay the Japanese average') + '</button>' +

          '<p class="gm-note gm-jwend">' + body(L('日本と西洋で枚数が揃っていないので、統計としては不十分です。《あなたの平均がどちらに近いかは、正解を示すものではありません》。測る3枚や線の引き方によって、結果は変わります。',
            'The counts on each side are not matched, so this falls short of a proper statistical comparison. 《Whether your average lands nearer one or the other does not make it right》. The result changes with which three pictures you measure and where you draw the lines.')) + '</p>' +
          '</div>' + '</div>' +
        '<div class="gm-sev">' + sec(L('研究で引く7本と、7つの見方', 'The seven lines and the seven views')) + '<div class="gm-catx gm-secx" hidden>' +
          '<p class="gm-note">' + body(L('私の研究ではどの測定対象にも同じ7種類の線を引き、同じ7つの見方で構図を捉えます。このゲームで引いていただいたのは、《そのうち2種類》 ── 縦横で1本ずつ、合わせて4本です。',
            'In my research I draw the same seven kinds of line on every subject I measure, and read every composition through the same seven views. This game asked for 《two of those kinds》 — one horizontal and one vertical each, four lines in all.')) + '</p>' +
          '<p class="gm-info-s">' + L('基準線の名称（7つ）', 'The seven reference lines') + '</p>' +
          '<ul class="gm-nlist">' + RLINES.map(function(r){ return '<li' + (r[2] ? ' class="on"' : '') + '><b>' + esc(L(r[0], r[1])) + '</b>' + (r[2] ? '<em>' + L('このゲームで引いた線', 'drawn in this game') + '</em>' : '') + '</li>'; }).join('') + '</ul>' +
          '<p class="gm-info-s">' + L('分析カテゴリ（7つ）', 'The seven categories') + '</p>' +
          '<ul class="gm-nlist gm-nlist2">' + CATS.map(function(c){ return '<li><b>' + esc(L(c[0], c[1])) + '</b><span>' + esc(L(c[2], c[3])) + '</span></li>'; }).join('') + '</ul>' +
          '</div></div>' +
        '<div class="gm-media" role="group" aria-label="' + L('枠を替える', 'Change the frame') + '"><span>' + L('同じ％を、別の枠に。同じパーセントを別の枠に表示できます。', 'The same % in another frame — see how the ratios sit in a different shape.') + '</span>' +
          '<button type="button" data-ar="screen" aria-pressed="true">' + L('この画面', 'this screen') + '</button><button type="button" data-ar="0.707" aria-pressed="false">A4</button><button type="button" data-ar="1" aria-pressed="false">' + L('正方形', 'square') + '</button></div>';
      bindSecs(resEl);
      numHead(); requestAnimationFrame(numHead); setTimeout(numHead, 300);
      var jwb = resEl.querySelector('.gm-jwb'); if(jwb){ jwb.__jw = true; jwb.addEventListener('click', jwOverlay); }
      resEl.querySelectorAll('.gm-media button').forEach(function(b){ b.addEventListener('click', function(){
        resEl.querySelectorAll('.gm-media button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var v = b.getAttribute('data-ar'); stage.style.setProperty('--ar', v === 'screen' ? (window.innerWidth / Math.max(1, window.innerHeight)).toFixed(3) : v);
      }); });
      goEl.innerHTML = ''; goEl.classList.add('hold'); try{ goEl.inert = true; }catch(x){}
      btn(L('レイアウトしてみる', 'Try a layout'), function(){ sheet(avg); }, 'go');
      var ovb = btn(L('サイトのグリッドと重ねる', 'Compare with the site’s grid'), overlay); if(ovb){ ovb.__ov = true; ovText(ovb, false); }
      btn(L('ものさしを保存', 'Save the ruler'), function(){ takeaway(avg); });

      btn(cat === 'jp' ? L('西洋の絵を3枚測る', 'Measure three Western paintings') : cat === 'we' ? L('日本の絵を3枚測る', 'Measure three Japanese paintings') : L('別の3枚を測る', 'Measure three more'),
          function(){ if(cat === 'jp') cat = 'we'; else if(cat === 'we') cat = 'jp'; start(); });
      btn(L('研究の手順へ', 'To the research steps'), function(){ close(); var go = function(){ if(window.__goStep) window.__goStep(1, true); else if(typeof skipTo === 'function') skipTo('#ch6'); }; setTimeout(go, 780); setTimeout(go, 1060); })      ;
    }

    function ovText(b, on){

      var t = on ? L('サイトのグリッドを外す', 'Hide the site\u2019s grid') : L('サイトのグリッドと重ねる', 'Compare with the site\u2019s grid');
      var cut = on ? 'サイトのグリッドを' : 'サイトのグリッドと', a = null, c = null;
      if(t.indexOf(cut) === 0){ a = cut; c = t.slice(cut.length); }
      else { var sp = t.lastIndexOf(' '); if(sp > 0){ a = t.slice(0, sp); c = t.slice(sp + 1); } }
      b.textContent = t;
      if(!a) return;
      var h0 = b.offsetHeight;
      b.innerHTML = esc(a) + '<br>' + esc(c);
      if(b.offsetHeight > h0) b.textContent = t;
    }

    function ovLabel(on){
      var l7 = resEl && resEl.querySelector('.gm-lg7');
      if(l7) l7.hidden = !on;
      if(goEl) goEl.querySelectorAll('button').forEach(function(b){ if(b.__ov) ovText(b, on); });
      if(linesEl) linesEl.classList.toggle('ovl', !!on);
    }
    function overlay(){
      var on = linesEl.querySelector('.mine:not(.out)');
      if(on){

        var outs = Array.prototype.slice.call(linesEl.querySelectorAll('.mine'));
        outs.forEach(function(x){ x.classList.add('out'); x.style.animationDelay = ''; });
        ovLabel(false);
        setTimeout(function(){ outs.forEach(function(x){ if(x.parentNode) x.parentNode.removeChild(x); }); }, rm ? 0 : 460);
        return;
      }

      var seq = [];
      GRID.v.slice().sort(function(a, q){ return a - q; }).forEach(function(v){ seq.push(['v', v]); });
      GRID.h.slice().sort(function(a, q){ return a - q; }).forEach(function(v){ seq.push(['h', v]); });
      seq.forEach(function(q){ mkLine(linesEl, q[0], q[1], 'mine ov'); });
      ovLabel(true);

    }

    var infoEl = null, infoWantCat = false, infoWantHow = false;

    var QA = [
      ['「あなた」「私」「解釈の違い」の％は何の数字ですか？', 'What do “you”, “me” and “difference” mean?',
       '「あなた」と「私」は線の位置です。絵の幅と高さをそれぞれ 100 として、左端・上端から計測します。「解釈の違い」は《あなたの値から私の値を引いた差》で、＋は右か下、−は左か上へのずれです。',
       '“You” and “me” give line positions from the left or top edge, with the picture’s width and height each set to 100. “Difference” is 《your value minus mine》. A + means your line sits farther right or lower; a − means farther left or higher.'],
      ['私と線の位置が違ったら間違いですか？', 'If my line and yours differ, is one of them wrong?',
       'いいえ、《正解はありません》。同じ絵でいちばん大きなまとまりの始まりと重さの中心を、あなたと私がどこに見たかを比べています。違いは間違いではなく、解釈の違いです。',
       'No. 《There is no right answer》. We are comparing where you and I see the largest mass begin, and where its weight sits, in the same picture. A gap is a difference in reading, not a mistake.'],
      ['なぜ1枚に4本だけ引くのですか？', 'Why only four lines per picture?',
       '2分ほどで試せるように、7種類ある線のうち2種類に絞りました。絵の中でいちばん大きなまとまり（主塊）の《始まりと重心》で、横と縦で1本ずつ引くので、1枚に4本になります。',
       'To let you try it in about two minutes, I kept two of the seven kinds of line: on the largest mass in the picture, 《where it begins and where its weight sits》 — one horizontal and one vertical for each, which makes four per picture.'],
      ['12本がどうして4本になるのですか？', 'How do twelve lines become four?',
       '同じ名前で同じ向きの線同士を、3枚分まとめて平均します。たとえば主塊開始線の横なら、3枚の％を足して3で割る。《これを4組繰り返す》ので、平均の線は4本です。',
       'Lines with the same name and the same direction are averaged across the three pictures — for the horizontal main-form start, I add the three percentages and divide by three. 《Four groups, four average lines》.'],
      ['平均の画面の％は何を表していますか？', 'What do the percentages on the final board mean?',
       '《朱色の4本で区切った幅や高さ》を表しています。薄い破線は区切りに数えず、縦横それぞれ合計 100 になります。線そのものの位置は「4本の平均」に出しています。',
       'They show 《the widths and heights marked out by your four red lines》. The faint dashed lines do not count as divisions, and the values add up to 100 across and down. The positions of the lines themselves are listed under “The four averages”.'],
      ['薄い破線は何の線ですか？', 'What are the faint dashed lines?',
       '測っている間は私が同じ絵に引いた線です。平均の画面では「サイトのグリッドと重ねる」を押したときだけ出ます。そのときの破線は《このサイトのグリッド7本》で、あなたの4本と見比べられます。',
       'While you measure, they are the lines I drew on the same picture. On the average screen they appear only when you press “Compare with the site’s grid”: they are then 《the seven lines of this site’s grid》, there to be set against your four.'],
      ['絵の選び方で結果は変わりますか？', 'Would different pictures give different results?',
       'はい、選ぶ絵によって平均は変わります。絵は《日本の絵12点と西洋の絵7点》から選ばれ、どちらも主な形と余白を同じ手順で計測できることを条件にしています。',
       'Yes, the averages change with the pictures chosen. 《For this game I measured twelve Japanese and seven Western pictures》, and for both the rule was that the main form and the empty space could be measured by the same method.'],
      ['なぜ絵を描き起こしているのですか？', 'Why are the pictures redrawn?',
       '写真の複製は撮り方で色も切り取り方も変わります。それでは計測の条件が揃わないと考えました。そこで《どの絵も同じ手順で描き起こし》、細部を省いて形と余白の置かれ方が見えるようにしました。今回はそのようにして描き起こした絵を計測しており、原画そのものではありません。',
       'Photographs of paintings differ in colour and in cropping; I decided that would not give the same conditions for measuring. I 《redraw every picture by the same method》 and leave out the detail, so that the placing of form and empty space can be seen. What is measured here is the picture redrawn that way, not the original work.'],
      ['この比率はどこで使うことができますか？', 'Where can I use these ratios?',
       '「レイアウトしてみる」ではあなたの平均グリッドの上に、見出しや図版、本文を置いて試せます。グリッドは画像として保存できるので、《ここから持ち出して、好きな場所でレイアウトを試す》こともできます。写るのはあなたの平均4本（朱色の実線）と、サイトの7本（薄い破線）だけで、絵や数字は入りません。',
       'In “Try a layout” you can place a title, a figure and body text on your own average grid. The grid can be saved as an image, so you can 《take it away and try layouts wherever you like》. It holds only your four average lines (solid red) and the seven lines of this site (faint dashed); the pictures and the numbers are left out.'],
      ['線の位置は感覚で決めているのですか？', 'Do you choose the line positions by eye?',
       'どこをまとまりや境目と見るかには、私の判断が入ります。ただ、19点すべてを同じ手順で計測し、《同じ名前の線同士》を比べていて、なぜそこに引いたかも絵ごとに書いています。引き方にはその人の解釈がそのまま残り、どこに比重や美しさを感じているかが比率として現れます。同じ手順を踏んでも、最後に出てくるグリッドには個性が出ると考えています。',
       'My judgement shapes what I see as a main form or a boundary. But I measure all nineteen pictures by the same method and compare 《lines of the same name》, and for each picture I say why the line goes there. How the lines are drawn keeps the reader’s own reading: where weight and beauty are felt comes out as proportion. Even by the same method, the grid that comes out at the end has a character of its own.']
    ];
    function qaBuild(){
      var host = gm.querySelector('.gm-qa'); if(!host) return;
      host.hidden = true; host.innerHTML = ''; return;
      host.innerHTML = sec(L('Q&A', 'Q&A')) + '<div class="gm-catx gm-secx gm-qal" hidden>' +
        QA.map(function(q){ return '<button type="button" class="gm-qq" aria-expanded="false"><span>' + esc(L(q[0], q[1])) + '</span><i></i></button><p class="gm-qaa" hidden>' + body(L(q[2], q[3])) + '</p>'; }).join('') + '</div>';
      bindSecs(host);
      host.querySelectorAll('.gm-qq').forEach(function(q){
        var a = q.nextElementSibling;
        q.addEventListener('click', function(){
          var on = a.hidden;
          host.querySelectorAll('.gm-qaa').forEach(function(x){ x.hidden = true; });
          host.querySelectorAll('.gm-qq').forEach(function(x){ x.setAttribute('aria-expanded', 'false'); });
          a.hidden = !on; q.setAttribute('aria-expanded', on ? 'true' : 'false');
        });
      });
    }

    function secShut(x, q){
      if(!x || x.hidden) return;
      if(q) q.setAttribute('aria-expanded', 'false');
      if(rm || document.documentElement.classList.contains('phone')){ x.hidden = true; x.style.height = ''; x.classList.remove('anim', 'shut'); return; }
      x.classList.add('anim'); x.style.height = x.scrollHeight + 'px'; void x.offsetHeight; x.classList.add('shut'); x.style.height = '0px';
      setTimeout(function(){ x.hidden = true; x.style.height = ''; x.classList.remove('anim', 'shut'); }, 270);
    }
    function secOnly(root, q){
      if(!root) return;
      root.querySelectorAll('.gm-secq[aria-expanded="true"], .gm-catq[aria-expanded="true"]').forEach(function(o){
        if(o === q) return;
        var y = o.nextElementSibling;
        while(y && !y.classList.contains('gm-catx')) y = y.nextElementSibling;
        secShut(y, o);
      });
    }
    function bindSecs(root){
      if(!root) return;
      root.querySelectorAll('.gm-secq').forEach(function(q){
        if(q.__bound) return; q.__bound = true;
        var x = q.nextElementSibling;
        while(x && !x.classList.contains('gm-catx')) x = x.nextElementSibling;
        if(!x) return;
        q.addEventListener('click', function(){ var on = x.hidden; q.setAttribute('aria-expanded', on ? 'true' : 'false');
          if(on){ secOnly(root, q); setTimeout(function(){ var sc = gm.querySelector('.gm-side'); if(!sc) return; var top = sc.scrollTop + (q.getBoundingClientRect().top - sc.getBoundingClientRect().top) - 8; if(top > sc.scrollTop) try{ sc.scrollTo({top: top, behavior: rm ? 'auto' : 'smooth'}); }catch(e){ sc.scrollTop = top; } }, 300); }
          if(rm || document.documentElement.classList.contains('phone')){ x.hidden = !on; if(on){ lite(x); requestAnimationFrame(numHead); } return; }
          if(on){
            x.hidden = false; x.classList.remove('shut'); x.classList.add('anim'); x.style.height = '0px'; void x.offsetHeight;
            x.style.height = x.scrollHeight + 'px';
            setTimeout(function(){ if(x.classList.contains('anim')){ x.style.height = ''; x.classList.remove('anim'); } }, 260);
            lite(x);
            setTimeout(numHead, 280); requestAnimationFrame(numHead);
          } else {
            x.classList.add('anim'); x.style.height = x.scrollHeight + 'px'; void x.offsetHeight;
            x.style.height = '0px';
            setTimeout(function(){ x.hidden = true; x.style.height = ''; x.classList.remove('anim', 'shut'); }, 270);
          } });
      });
    }
    function sec(t, open){ return '<button type="button" class="gm-catq gm-secq" aria-expanded="' + (open ? 'true' : 'false') + '"><span>' + t + '</span><i></i></button>'; }
    function body_(t){ return body(t); }
    function info(){
      if(!infoEl){
        infoEl = el('div', 'gm-info'); infoEl.setAttribute('role', 'dialog'); infoEl.setAttribute('aria-label', L('この絵と線について', 'About this picture and the lines'));
        infoEl.innerHTML = '<div class="gm-info-in"><div class="gm-info-b"></div><div class="gm-take-b"><button type="button" class="gm-b go"></button></div></div>';
        infoEl.querySelector('.gm-take-b button').addEventListener('click', infoOff); infoEl.addEventListener('click', function(e){ if(e.target === infoEl) infoOff(); });
        gm.appendChild(infoEl);
      }
      var b = picks[bi], body = '', CATSEC = '';

      if(!introOn) body += '<p class="gm-info-k gm-how">' + L('操作', 'HOW TO') + '</p><p class="gm-info-t gm-howline">' + body_(L('絵の上を押したまま動かし、離すと線が引かれます。', 'Press on the image, drag, and release to place a line.')) + '</p>';

      var PURSEC = sec(L('このゲームの目的', 'What this game is for')) + '<div class="gm-catx gm-secx" hidden>' + '<p class="gm-info-t gm-info-pur">' + body_(L('私の測り方を《3枚の絵で試していただくためのゲーム》です。研究では日本の絵や建築、庭園から比率を取り出し、組版のグリッドに変換する手順を考えています。このゲームでは日本の絵と西洋の絵を同じものさしで並べ、見比べられるようにしました。', 'This game lets you 《try my way of measuring on three pictures》. In the research I am working out how to read proportions out of Japanese pictures, architecture and gardens and turn them into a typographic grid. For this game the Japanese and the Western pictures are set side by side on the same ruler, so that the two can be compared.')) + '</p>' + '</div>';
      if(introOn){
        body += '<p class="gm-info-k">' + L('このゲームについて', 'About this game') + '</p><h3>' + L('主塊とは', 'The main mass') + '</h3><p class="gm-info-t">' + body_(L('絵の中でいちばん大きなまとまりのことです。研究では《その始まりと重心の位置を絵の端からの％で計測します》。', 'The largest mass in a picture. My research reads 《where it begins and where its weight sits》, as percentages from the edges of the picture.')) + '</p>' +
          sec(L('4本の線の役割', 'What the four lines mean')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-info-l">' + LINES.map(function(t){ return '<li>' + pict(t.k) + '<b>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' (' + t.dire + ')')) + '</b><span>' + esc(L(t.h, t.he)) + '</span></li>'; }).join('') + '</ul></div>' +
          sec(L('線を引くコツ', 'Tips for drawing')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-info-l gm-three"><li><b>1</b><span>' + L('まずいちばん大きなまとまりを1つ決めます。', 'First decide on the single largest mass.') + '</span></li><li><b>2</b><span>' + L('始まりはまとまりの外側の縁。迷ったら少し外に。', 'The start is the outer edge of the mass; when in doubt, a little outside.') + '</span></li><li><b>3</b><span>' + L('重心は重さが釣り合うところ。中心より、濃い方へ寄せます。', 'The centre of weight is where the mass balances: lean toward the denser side, not the middle.') + '</span></li></ul></div>';
      } else if(b && state !== 'avg' && state !== 'idle'){
        body += '<p class="gm-info-k">' + L('いま測っている絵', 'The picture you are measuring') + '</p><h3>' + ttl(b) + '</h3>' +
          '<p class="gm-info-s">' + esc(L('構図の出典：', 'Composition diagram source: ')) + esc(L(b.src, b.srce).replace(/^構図：\s*/, '').replace(/^Composition:\s*/i, '')) + '</p>' + (b.note ? '<p class="gm-info-t gm-info-n">' + esc(L(b.note, b.notee)) + '</p>' : '') +
          '<p class="gm-info-s">' + L('分析カテゴリ：', 'Category: ') + esc(L(b.cat, b.cate)) + '　／　' + L('主塊：', 'Main mass: ') + esc(obj(b)) + '</p>' +
            '';
            CATSEC = sec(L('7つの分析カテゴリ', 'The seven categories')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-cats">' +
            CATS.map(function(c){ return '<li' + (c[0] === b.cat ? ' class="on"' : '') + '><b>' + esc(L(c[0], c[1])) + '</b><span>' + esc(L(c[2], c[3])) + '</span></li>'; }).join('') + '</ul></div>';
      }

      var qsec = function(a, b2){ return QA.slice(a, b2).map(function(q){ return sec(L(q[0], q[1])) + '<div class="gm-catx gm-secx" hidden><p class="gm-info-t">' + body_(L(q[2], q[3])) + '</p></div>'; }).join(''); };

      body += '<p class="gm-info-g">' + L('ゲームのこと', 'About the game') + '</p>' + PURSEC + qsec(0, 9) +
        '<p class="gm-info-g">' + L('研究のこと', 'About the study') + '</p>' + CATSEC + qsec(9, QA.length);
      infoEl.querySelector('.gm-info-b').innerHTML = body; infoEl.querySelector('.gm-take-b button').textContent = L('閉じる', 'Close');
      var iin = infoEl.querySelector('.gm-info-in');
      infoEl.querySelectorAll('.gm-catq').forEach(function(q){ var x = q.nextElementSibling; if(!x || !x.classList.contains('gm-catx')) return;
        q.addEventListener('click', function(){ var on = x.hidden; q.setAttribute('aria-expanded', on ? 'true' : 'false');
          if(on) secOnly(iin || infoEl, q);
          if(rm || document.documentElement.classList.contains('phone')){ x.hidden = !on; if(on) lite(x); }
          else if(on){ x.hidden = false; x.classList.remove('shut'); x.classList.add('anim'); x.style.height = '0px'; void x.offsetHeight; x.style.height = x.scrollHeight + 'px';
            setTimeout(function(){ if(x.classList.contains('anim')){ x.style.height = ''; x.classList.remove('anim'); } }, 260); lite(x); }
          else { x.classList.add('anim'); x.style.height = x.scrollHeight + 'px'; void x.offsetHeight; x.classList.add('shut'); x.style.height = '0px';
            setTimeout(function(){ x.hidden = true; x.style.height = ''; x.classList.remove('anim', 'shut'); }, 270);    }
          if(on && !rm) setTimeout(function(){ var top = q.offsetTop - 12; if(top > iin.scrollTop) iin.scrollTo({top: top, behavior: 'smooth'}); }, 280); });
      });

      var _cul = infoEl.querySelector('.gm-cats'), cx = _cul ? _cul.closest('.gm-catx') : null, cq = cx ? cx.previousElementSibling : null;
      while(cq && !cq.classList.contains('gm-catq')) cq = cq.previousElementSibling;
      if(infoWantCat && cq && cx){ cx.hidden = false; cq.setAttribute('aria-expanded', 'true'); setTimeout(function(){ iin.scrollTo({top: Math.max(0, cq.offsetTop - 12), behavior: rm ? 'auto' : 'smooth'}); }, 260); }
      document.documentElement.classList.add('gminfo');
      void infoEl.offsetWidth; infoEl.classList.add('on'); lite(infoEl.querySelector('.gm-info-t'));    gm.querySelector('.gm-i').setAttribute('aria-expanded', 'true');    var wc = infoWantCat; infoWantCat = false; setTimeout(function(){ if(!wc) infoEl.querySelector('.gm-take-b button').focus({preventScroll:true}); }, 240);
    }
    function infoOff(){ if(infoEl) infoEl.classList.remove('on'); var ib = gm && gm.querySelector('.gm-i'); if(ib){ ib.setAttribute('aria-expanded', 'false'); if(document.activeElement && document.activeElement !== ib && infoEl && infoEl.contains(document.activeElement)) ib.focus({preventScroll:true}); if(ptype === 'touch') ib.blur(); } document.documentElement.classList.remove('gminfo'); }
    var takeEl = null, takeUrl = null;
    var takeFile = null;

    var takeAR = 'screen', takeFmt = 'png';
    var FRAMES = [
      {k:'screen', ja:'画面と同じ',   en:'Same as screen'},
      {k:'phone',  ja:'スマホ（縦）', en:'Phone portrait', ar:9 / 19.5},
      {k:'a4',     ja:'A4（縦）',     en:'A4 portrait',    ar:1 / 1.4142},
      {k:'a4l',    ja:'A4（横）',     en:'A4 landscape',   ar:1.4142},
      {k:'sq',     ja:'正方形',       en:'Square', ar:1},
      {k:'wide',   ja:'16 : 9',       en:'16 : 9', ar:16 / 9}
    ];
    var FMTS = [
      {k:'png',   ja:'PNG',          en:'PNG',   mime:'image/png',  ext:'png'},
      {k:'jpg',   ja:'JPEG',         en:'JPEG',  mime:'image/jpeg', ext:'jpg'},
      {k:'alpha', ja:'PNG（背景なし）', en:'PNG (no background)', mime:'image/png', ext:'png'}
    ];
    function frameAR(){
      if(takeAR === 'screen') return window.innerWidth / Math.max(1, window.innerHeight);
      for(var i = 0; i < FRAMES.length; i++) if(FRAMES[i].k === takeAR) return FRAMES[i].ar;
      return 1;
    }
    function drawTake(avg){
      var ar = frameAR(), LONG = 2400, W, H;
      if(ar >= 1){ W = LONG; H = Math.round(LONG / ar); } else { H = LONG; W = Math.round(LONG * ar); }
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var c = cv.getContext('2d'), u = Math.max(W, H) / 1000;
      if(takeFmt !== 'alpha'){ c.fillStyle = '#F2F1EC'; c.fillRect(0, 0, W, H); }

      c.setLineDash([7 * u, 7 * u]); c.lineWidth = Math.max(1, 1.3 * u);
      c.strokeStyle = takeFmt === 'alpha' ? 'rgba(30,28,26,.55)' : 'rgba(46,44,41,.5)';
      GRID.v.forEach(function(v){ c.beginPath(); c.moveTo(W * v / 100, 0); c.lineTo(W * v / 100, H); c.stroke(); });
      GRID.h.forEach(function(v){ c.beginPath(); c.moveTo(0, H * v / 100); c.lineTo(W, H * v / 100); c.stroke(); });

      c.setLineDash([]); c.strokeStyle = '#E84518'; c.lineWidth = Math.max(1.5, 2.6 * u);
      LINES.forEach(function(t){ var v = avg[t.k]; if(v == null) return; c.beginPath();
        if(t.ax === 'v'){ c.moveTo(W * v / 100, 0); c.lineTo(W * v / 100, H); } else { c.moveTo(0, H * v / 100); c.lineTo(W, H * v / 100); } c.stroke(); });
      return cv;
    }
    function takeaway(avg){
      var d = new Date(), ymd = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      if(!takeEl){
        takeEl = el('div', 'gm-take'); takeEl.setAttribute('role', 'dialog'); takeEl.setAttribute('aria-label', L('あなたのものさし', 'Your ruler'));
        takeEl.innerHTML = '<div class="gm-take-in"><div class="gm-take-h"><b></b><em></em></div><span class="gm-takefig"><img alt=""><i class="gm-takeseal" aria-hidden="true"></i></span><p></p>' +
          '<div class="gm-take-opt"><em class="gm-optl"></em><div class="gm-take-fr"></div><em class="gm-optl2"></em><div class="gm-take-fm"></div></div>' +
          '<div class="gm-take-b"><a class="gm-b go" download="monosashi.png"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 12.5h11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></a>' +
          '<button type="button" class="gm-b gm-share" hidden><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 10V2M5 4.5 8 1.5l3 3M3.5 7.5v6h9v-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
          '<button type="button" class="gm-b gm-take-x"></button></div></div>';
        takeEl.querySelector('.gm-take-x').addEventListener('click', takeOff);
        takeEl.querySelector('.gm-share').addEventListener('click', function(){ if(!takeFile || !navigator.share) return; navigator.share({files:[takeFile], title:L('あなたの、ものさし', 'Your ruler')}).catch(function(){}); });
        takeEl.addEventListener('click', function(e){ if(e.target === takeEl) takeOff(); });
        gm.appendChild(takeEl);
      }
      var im = takeEl.querySelector('img'), a = takeEl.querySelector('a'), sealBox = takeEl.querySelector('.gm-takeseal');

      var sealD = takeEl.classList.contains('on') ? .18 : .96;
      setTimeout(function(){ sealD = .18; }, 1500);

      function takeMorph(b0){
        if(rm || !b0 || !(b0.width > 4) || !im.animate) return;
        var b1 = im.getBoundingClientRect(); if(!(b1.width > 4) || !(b1.height > 4)) return;
        var sx = b0.width / b1.width, sy = b0.height / b1.height;
        if(Math.abs(sx - 1) < .012 && Math.abs(sy - 1) < .012) return;
        sx = Math.max(.2, Math.min(5, sx)); sy = Math.max(.2, Math.min(5, sy));
        try{ im.animate([{transform:'scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')'},
                         {transform:'none'}],
                        {duration:460, easing:'cubic-bezier(.2,.8,.2,1)'}); }catch(x){}
      }
      function takeSeal(){
        if(!sealBox) return;
        if(!sealBox.firstChild){
          var sv = null;
          try{ if(typeof kakuSvg === 'function') sv = kakuSvg('YOUR GRID', '平均', 40 + (Date.now() % 50)); }catch(x){ sv = null; }
          if(!sv){ sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); sv.setAttribute('viewBox', '0 0 156 156');
            sv.innerHTML = '<g fill="none" stroke="var(--acc)"><rect x="9" y="9" width="138" height="138" rx="12" stroke-width="4.2"/><rect x="21" y="21" width="114" height="114" rx="6" stroke-width="1.5"/>' +
              '<text x="78" y="46" text-anchor="middle" font-family="var(--mono)" font-size="10.5" font-weight="500" letter-spacing="2.6" fill="var(--acc)" stroke="none">YOUR GRID</text>' +
              '<text x="78" y="94" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="26" fill="var(--acc)" stroke="none">平均</text>' +
              '<text x="78" y="124" text-anchor="middle" font-family="var(--mono)" font-size="6.5" letter-spacing="1.6" fill="var(--acc)" stroke="none">KOSAKA · PORTFOLIO</text></g>'; }
          sealBox.appendChild(sv);
        }
        var w = im.clientWidth, h = im.clientHeight; if(!w || !h) return;
        var sz = Math.max(76, Math.round(Math.min(w, h) * 0.34));
        sealBox.style.width = sz + 'px'; sealBox.style.height = sz + 'px';
        if(!rm){ sealBox.style.animation = 'none'; void sealBox.offsetWidth; sealBox.style.animation = ''; sealBox.style.animationDelay = sealD + 's'; }
      }
      takeEl.querySelector('.gm-take-h b').textContent = '';
      takeEl.querySelector('.gm-take-h em').textContent = 'YOUR RULER  ·  ' + ymd.replace(/-/g, '.');
      takeEl.querySelector('p').textContent = '';
      takeEl.querySelector('.gm-optl').textContent = L('画像の形', 'Image shape');
      takeEl.querySelector('.gm-optl2').textContent = L('ファイルの種類', 'File type');
      takeEl.querySelector('.gm-take-x').textContent = L('閉じる', 'Close');
      a.querySelector('span').textContent = L('画像を保存', 'Save image');
      var sb0 = takeEl.querySelector('.gm-share'); sb0.setAttribute('aria-label', L('共有', 'Share')); sb0.title = L('共有（AirDrop・LINE など）', 'Share (AirDrop, LINE and more)');
      function opts(host, list, cur, set){
        host.innerHTML = '';
        list.forEach(function(o){
          var lab = L(o.ja, o.en);
          var b = el('button', 'gm-opt'); b.type = 'button'; b.textContent = lab;

          var lb = /[（〔「『]/.test(lab.charAt(0)), rb = /[）〕」』]/.test(lab.charAt(lab.length - 1));
          if(rb && !lb) b.style.textIndent = '.25em'; else if(lb && !rb) b.style.textIndent = '-.25em';
          b.setAttribute('aria-pressed', o.k === cur() ? 'true' : 'false');
          b.addEventListener('click', function(){ set(o.k); render(); });
          host.appendChild(b);
        });
      }
      function render(){
        opts(takeEl.querySelector('.gm-take-fr'), FRAMES, function(){ return takeAR; }, function(k){ takeAR = k; });
        opts(takeEl.querySelector('.gm-take-fm'), FMTS, function(){ return takeFmt; }, function(k){ takeFmt = k; });
        var _b0 = im.getBoundingClientRect();
        var fmt = FMTS[0]; FMTS.forEach(function(f){ if(f.k === takeFmt) fmt = f; });
        var cv = drawTake(avg), name = 'monosashi-' + ymd + '-' + takeAR + (takeFmt === 'alpha' ? '-alpha' : '') + '.' + fmt.ext;
        a.download = name;
        im.style.aspectRatio = cv.width + ' / ' + cv.height;
        im.classList.toggle('alpha', takeFmt === 'alpha');

        function put(url){ if(takeUrl && takeUrl.indexOf('blob:') === 0) URL.revokeObjectURL(takeUrl); takeUrl = url;
          im.onload = function(){ im.onload = null; takeMorph(_b0); takeSeal(); }; im.classList.add('swap');
          im.src = url; a.href = url; takeEl.classList.add('on'); if(im.complete) takeSeal();
          requestAnimationFrame(function(){ requestAnimationFrame(function(){ im.classList.remove('swap'); }); }); }
        function share(bl){ takeFile = null;
          try{ if(bl && window.File && navigator.canShare){ var f = new File([bl], name, {type:fmt.mime}); if(navigator.canShare({files:[f]})) takeFile = f; } }catch(e){}
          sb0.hidden = !takeFile; }
        if(cv.toBlob) cv.toBlob(function(bl){ share(bl); put(bl ? URL.createObjectURL(bl) : cv.toDataURL(fmt.mime)); }, fmt.mime, fmt.k === 'jpg' ? .92 : undefined);
        else { share(null); put(cv.toDataURL(fmt.mime)); }
      }
      render();
      setTimeout(function(){ if(a) a.focus({preventScroll:true}); }, 260);
    }

    function takeOff(){ if(takeEl) takeEl.classList.remove('on'); }
    var sheetAvg = null;

    var MOCKK = {mk1:['見出し', 'title'], mk3:['図版', 'figure'], mk2:['本文', 'text']};

    var mockHist = [], mockFut = [];
    function mockHost(){ return sheetEl && sheetEl.querySelector('.gm-mock'); }
    function mockPush(){ var m = mockHost(); if(!m) return; mockHist.push(m.innerHTML); if(mockHist.length > 60) mockHist.shift(); mockFut.length = 0; mockTools(); }
    function mockRestore(html){ var m = mockHost(); if(!m) return; m.innerHTML = html;
      m.querySelectorAll('.gm-drag').forEach(function(e){ e.__armed = false; e.__pid = null; mockArm(e); });
      mockSel(m.querySelector('.gm-drag.sel')); mockTools(); }
    function mockUndo(){ var m = mockHost(); if(!m || !mockHist.length) return; mockFut.push(m.innerHTML); mockRestore(mockHist.pop()); }
    function mockRedo(){ var m = mockHost(); if(!m || !mockFut.length) return; mockHist.push(m.innerHTML); mockRestore(mockFut.pop()); }
    function mockTools(){ var t = sheetEl && sheetEl.querySelector('.gm-stool'); if(!t) return;
      var u = t.querySelector('[data-act="undo"]'), r = t.querySelector('[data-act="redo"]');
      if(u) u.disabled = !mockHist.length; if(r) r.disabled = !mockFut.length; }
    function mockEls(){ var m = sheetEl && sheetEl.querySelector('.gm-mock'); return m ? Array.prototype.slice.call(m.querySelectorAll('.gm-drag')) : []; }
    function mockSel(el){
      mockEls().forEach(function(x){ x.classList.toggle('sel', x === el); });
      var t = sheetEl && sheetEl.querySelector('.gm-stool'); if(!t) return;
      t.querySelectorAll('[data-act="dup"],[data-act="del"]').forEach(function(b){ b.disabled = !el; });
    }

    var SNAP_FINE = 8, SNAP_COARSE = 14;
    function snapPx(){
      try{ return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ? SNAP_COARSE : SNAP_FINE; }catch(e){ return SNAP_FINE; }
    }
    function snapLines(ax, r){

      var a = (ax === 'v' ? GRID.v : GRID.h).slice(); a.push(50);
      if(sheetAvg) a.push(ax === 'v' ? sheetAvg.x1 : sheetAvg.y1, ax === 'v' ? sheetAvg.x3 : sheetAvg.y2);
      a.sort(function(x, y){ return x - y; });
      var out = [];
      for(var i = 0; i < a.length; i++){ if(!out.length || a[i] - out[out.length - 1] > .05) out.push(a[i]); }
      return out;
    }
    function snapMark(ax, v){
      if(!sheetEl) return;
      sheetEl.querySelectorAll('.gm-sgrid .gm-ln.' + ax + '.snap').forEach(function(x){ x.classList.remove('snap'); });
      if(v === null) return;
      sheetEl.querySelectorAll('.gm-sgrid .gm-ln.' + ax).forEach(function(x){
        var p = parseFloat(ax === 'v' ? x.style.left : x.style.top);
        if(Math.abs(p - v) < .35) x.classList.add('snap');
      });
    }
    function snapTo(v, w, ax, r){
      var span = ax === 'v' ? r.width : r.height; if(!(span > 0)) return null;
      var tol = snapPx() / span * 100, best = null, cand = snapLines(ax, r);

      var tolAt = cand.map(function(L0, i){
        var g = Infinity;
        if(i > 0) g = Math.min(g, L0 - cand[i - 1]);
        if(i < cand.length - 1) g = Math.min(g, cand[i + 1] - L0);
        return (g === Infinity) ? tol : Math.min(tol, g * .4);
      });
      [0, w / 2, w].forEach(function(o){
        cand.forEach(function(L0, i){ var d = L0 - o - v; if(Math.abs(d) < tolAt[i] && (!best || Math.abs(d) < Math.abs(best.d))) best = {d:d, at:L0}; });
      });
      return best;
    }

    var MK2LH = 16;
    function mk2Lines(el, h){
      if(!el || !el.classList.contains('gm-mk2')) return;
      if(h == null){ var _cs = getComputedStyle(el); h = el.getBoundingClientRect().height - parseFloat(_cs.paddingTop) - parseFloat(_cs.paddingBottom); }
      var n = Math.max(1, Math.round(h / MK2LH));
      var have = el.querySelectorAll('i:not(.gm-rz)');
      for(var i = have.length; i < n; i++) el.appendChild(document.createElement('i'));
      for(var j = have.length - 1; j >= n; j--) el.removeChild(have[j]);
      var all = el.querySelectorAll('i:not(.gm-rz)');
      all.forEach(function(x, k){ x.className = (k === all.length - 1 && all.length > 1) ? 'short' : ''; });
      var rz = el.querySelector('.gm-rz'); if(rz) el.appendChild(rz);
    }

    var INK_T = .122, INK_B = .182;
    function inkPad(el, r){
      if(!el.classList.contains('gm-mk1') || !r || !(r.height > 0)) return null;
      var fs = parseFloat(getComputedStyle(el).fontSize); if(!(fs > 0)) return null;
      return {t: INK_T * fs / r.height * 100, b: INK_B * fs / r.height * 100};
    }
    function mockPct(el, mock){
      var r = mock.getBoundingClientRect(), b = el.getBoundingClientRect();
      return {l:(b.left - r.left) / r.width * 100, t:(b.top - r.top) / r.height * 100,
              w:b.width / r.width * 100, h:b.height / r.height * 100, r:r, b:b};
    }

    function mockTf(el){
      var t = getComputedStyle(el).transform;
      if(!t || t === 'none') return {x:0, y:0};
      try{ var m = new DOMMatrix(t); return {x:m.e, y:m.f}; }catch(x){}
      var mm = /matrix\(([^)]+)\)/.exec(t);
      if(mm){ var a = mm[1].split(','); return {x:parseFloat(a[4]) || 0, y:parseFloat(a[5]) || 0}; }
      return {x:0, y:0};
    }
    function mockPut(el, xp, yp, r){
      var tf = mockTf(el);
      if(xp != null) el.style.left = (xp - tf.x / r.width * 100).toFixed(2) + '%';
      if(yp != null) el.style.top = (yp - tf.y / r.height * 100).toFixed(2) + '%';
    }
    function mockArm(el){
      if(el.__armed) return; el.__armed = true;

      if(el.classList.contains('gm-mk2') && !el.hasAttribute('data-n0'))
        el.setAttribute('data-n0', el.querySelectorAll('i:not(.gm-rz)').length);
      el.classList.add('gm-drag'); el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'group');
      el.setAttribute('aria-roledescription', L('置いたもの', 'block'));
      (function(){ var _k = MOCKK[el.classList.contains('gm-mk1') ? 'mk1' : el.classList.contains('gm-mk3') ? 'mk3' : 'mk2'];
        el.setAttribute('aria-label', L(_k[0] + '。矢印キーで動かす、＋と−で大きさ、⌘Dで複製、Deleteで削除', _k[1] + '. Arrow keys to move, + and - to resize, Cmd+D to duplicate, Delete to remove')); })();
      if(!el.querySelector('.gm-rz')){

        ['nw', 'ne', 'sw', 'se'].forEach(function(k){
          var rz = document.createElement('i'); rz.className = 'gm-rz ' + k; el.appendChild(rz); });
      }
      el.addEventListener('pointerdown', function(e){
        if(e.button) return;
        if(el.__pid != null) return;
        el.__pid = e.pointerId;
        var mock = el.parentNode, _t = e.target, rz = !!(_t && _t.classList && _t.classList.contains('gm-rz'));

        var _k = rz ? (_t.className || '').replace('gm-rz', '').trim() : '';
        var mE = _k.indexOf('e') >= 0, mW = _k.indexOf('w') >= 0;
        var mS = _k.indexOf('s') >= 0, mN = _k.indexOf('n') >= 0;
        var p = mockPct(el, mock), r = p.r, b = p.b;
        var ox = e.clientX - b.left, oy = e.clientY - b.top, downX = e.clientX, downY = e.clientY;
        e.preventDefault(); e.stopPropagation(); mockSel(el);
        mockPush();
        if(!rz && e.altKey){

          var _c = el.cloneNode(true); _c.classList.add('gm-clone'); _c.classList.remove('sel', 'grab'); _c.__armed = false; _c.__pid = null;
          var _rzs = _c.querySelectorAll(':scope > .gm-rz'); Array.prototype.forEach.call(_rzs, function(x){ x.parentNode.removeChild(x); });
          el.parentNode.insertBefore(_c, el); mockArm(_c);
        }

        el.style.transition = 'none';

        var _pre = el.getBoundingClientRect();
        el.style.margin = '0'; el.classList.add('moved'); var _post = el.getBoundingClientRect();
        if(!el.classList.contains('gm-mk1') && (Math.abs(_post.width - _pre.width) > .5 || Math.abs(_post.height - _pre.height) > .5)){

          el.style.width = (_pre.width / r.width * 100).toFixed(2) + '%';
          el.style.height = (_pre.height / r.height * 100).toFixed(2) + '%';
          if(el.classList.contains('gm-mk2')) mk2Lines(el, _pre.height);
        }
        if(Math.abs(_post.top - _pre.top) > .5 || Math.abs(_post.left - _pre.left) > .5){

          el.style.left = ((el.offsetLeft + (_pre.left - _post.left)) / r.width * 100).toFixed(2) + '%';
          el.style.top = ((el.offsetTop + (_pre.top - _post.top)) / r.height * 100).toFixed(2) + '%';
        }
        b = el.getBoundingClientRect();

        var mk1Pad = {w:0, h:0, k:0};
        if(el.classList.contains('gm-mk1')){
          var _cs1 = getComputedStyle(el);
          mk1Pad.w = parseFloat(_cs1.paddingLeft) + parseFloat(_cs1.paddingRight);
          mk1Pad.h = parseFloat(_cs1.paddingTop) + parseFloat(_cs1.paddingBottom);
          var _cw = b.width - mk1Pad.w;
          mk1Pad.k = _cw > 0 ? (b.height - mk1Pad.h) / _cw : 0;
        }
        if(mock.lastElementChild !== el) mock.appendChild(el);
        el.classList.add('grab'); mock.classList.add('dragging');
        try{ el.setPointerCapture(e.pointerId); }catch(x){}
        var move = function(ev){
          el.style.transition = 'none'; el.style.margin = '0';
          if(rz){
            var dx = ev.clientX - downX, dy = ev.clientY - downY;
            var bl = b.left - r.left, bt = b.top - r.top;
            var w = b.width, h = b.height, nl = bl, nt = bt;
            if(mE) w = Math.max(12, Math.min(r.width - bl, b.width + dx));
            if(mW){ w = Math.max(12, Math.min(bl + b.width, b.width - dx)); nl = bl + b.width - w; }
            if(mS) h = Math.max(10, Math.min(r.height - bt, b.height + dy));
            if(mN){ h = Math.max(10, Math.min(bt + b.height, b.height - dy)); nt = bt + b.height - h; }
            var l0 = nl / r.width * 100, t0 = nt / r.height * 100;
            var wp = w / r.width * 100, hp = h / r.height * 100;

            var sx = null, sy = null;
            if(el.classList.contains('gm-mk1')){

              var _pw = mk1Pad.w, _ph = mk1Pad.h, _k = mk1Pad.k;
              var axp = mW ? (bl + b.width) : bl;
              var ayp = mN ? (bt + b.height) : bt;

              var _kx = (mE ? 1 : -1) * dx / b.width, _ky = (mS ? 1 : -1) * dy / b.height;
              var _t = Math.abs(_kx) >= Math.abs(_ky) ? _kx : _ky;
              var wpx = Math.max(12, b.width * (1 + _t)), cand = [];
              if(mE) wpx = Math.min(wpx, r.width - bl); else wpx = Math.min(wpx, bl + b.width);
              if(_k > 0){
                var _cap = (mS ? (r.height - bt) : (bt + b.height));
                wpx = Math.min(wpx, (_cap - _ph) / _k + _pw);
              }
              wpx = Math.max(12, wpx);
              var _ex = mE ? (axp + wpx) : (axp - wpx);
              var _s1 = snapTo(_ex / r.width * 100, 0, 'v', r);
              if(_s1) cand.push({d:(mE ? 1 : -1) * _s1.d / 100 * r.width, v:_s1, h:null});
              if(_k > 0){
                var _hh = _ph + _k * Math.max(0, wpx - _pw);
                var _ey = mS ? (ayp + _hh) : (ayp - _hh);
                var _s2 = snapTo(_ey / r.height * 100, 0, 'h', r);
                if(_s2) cand.push({d:(mS ? 1 : -1) * _s2.d / 100 * r.height / _k, v:null, h:_s2});
              }
              if(cand.length){
                cand.sort(function(q, z){ return Math.abs(q.d) - Math.abs(z.d); });
                wpx = Math.max(12, wpx + cand[0].d); sx = cand[0].v; sy = cand[0].h;
              }
              var _h2 = _ph + _k * Math.max(0, wpx - _pw);
              wp = wpx / r.width * 100; hp = _h2 / r.height * 100;
              l0 = (mW ? (axp - wpx) : axp) / r.width * 100;
              t0 = (mN ? (ayp - _h2) : ayp) / r.height * 100;
            } else {
            if(mE){ sx = snapTo(l0 + wp, 0, 'v', r); if(sx) wp += sx.d; }
            if(mW){ sx = snapTo(l0, 0, 'v', r); if(sx){ l0 += sx.d; wp -= sx.d; } }
            if(mS){ sy = snapTo(t0 + hp, 0, 'h', r); if(sy) hp += sy.d; }
            if(mN){ sy = snapTo(t0, 0, 'h', r); if(sy){ t0 += sy.d; hp -= sy.d; } }
            }
            wp = Math.max(.6, wp); hp = Math.max(.6, hp);
            snapMark('v', sx ? sx.at : null); snapMark('h', sy ? sy.at : null);
            el.style.width = wp.toFixed(2) + '%';
            if(el.classList.contains('gm-mk1')){
              mk1Fit(el);
              var _nb = el.getBoundingClientRect();

              if(_nb.width > mk1Pad.w + 1) mk1Pad.k = (_nb.height - mk1Pad.h) / (_nb.width - mk1Pad.w);
              if(mN){

                t0 = (bt + b.height - _nb.height) / r.height * 100;
              }
            }
            else { el.style.height = hp.toFixed(2) + '%'; mk2Lines(el); }
            mockPut(el, l0, t0, r);
          } else {
            var x = Math.max(0, Math.min(r.width - b.width, (b.left - r.left) + (ev.clientX - downX)));
            var y = Math.max(0, Math.min(r.height - b.height, (b.top - r.top) + (ev.clientY - downY)));
            var xp = x / r.width * 100, yp = y / r.height * 100, wp2 = b.width / r.width * 100, hp2 = b.height / r.height * 100;
            var s1 = snapTo(xp, wp2, 'v', r); if(s1) xp = Math.max(0, Math.min(100 - wp2, xp + s1.d));

            var s2 = snapTo(yp, hp2, 'h', r);
            if(s2) yp = Math.max(0, Math.min(100 - hp2, yp + s2.d));
            snapMark('v', s1 ? s1.at : null); snapMark('h', s2 ? s2.at : null);
            el.classList.toggle('snapon', !!(s1 || s2));
            mockPut(el, xp, yp, r);
          }
        };
        var up = function(ev){
          if(ev && ev.pointerId != null && el.__pid != null && ev.pointerId !== el.__pid) return;
          el.__end = null;
          el.__pid = null;
          document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); window.removeEventListener('blur', up);
          el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
          el.classList.remove('grab', 'snapon'); mock.classList.remove('dragging'); el.style.transition = '';
          snapMark('v', null); snapMark('h', null);
          try{ if(ev && ev.pointerId != null) el.releasePointerCapture(ev.pointerId); }catch(x){}
        };
        el.__end = up;
        el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
        document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up); window.addEventListener('blur', up);
      });
      el.addEventListener('focus', function(){ mockSel(el); });

      el.addEventListener('keydown', function(e){
        if(!el.classList.contains('sel')) mockSel(el);
        if(e.key === 'Backspace' || e.key === 'Delete'){ e.preventDefault(); mockDel(); return; }
        if(e.key === 'd' && (e.metaKey || e.ctrlKey)){ e.preventDefault(); mockDup(); return; }
        var mock = el.parentNode, p = mockPct(el, mock), k = e.shiftKey ? 5 : 1;
        if(e.key === '+' || e.key === '=' || e.key === '-'){
          e.preventDefault(); var sgn = (e.key === '-' ? -k : k); el.style.margin = '0';
          el.style.width = Math.max(4, Math.min(100 - p.l, p.w + sgn)).toFixed(2) + '%';
          if(mockKind(el) !== 'mk1'){ el.style.height = Math.max(3, Math.min(100 - p.t, p.h + sgn)).toFixed(2) + '%'; mk2Lines(el); }
          return;
        }
        var d = {ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1]}[e.key]; if(!d) return;
        e.preventDefault();
        el.style.margin = '0';
        var _x = Math.max(0, Math.min(100 - p.w, p.l + d[0] * k)), _y = Math.max(0, Math.min(100 - p.h, p.t + d[1] * k));
        var _s1 = snapTo(_x, p.w, 'v', p.r); if(_s1) _x = Math.max(0, Math.min(100 - p.w, _x + _s1.d));
        var _s2 = snapTo(_y, p.h, 'h', p.r); if(_s2) _y = Math.max(0, Math.min(100 - p.h, _y + _s2.d));
        snapMark('v', _s1 ? _s1.at : null); snapMark('h', _s2 ? _s2.at : null);
        clearTimeout(el.__snapT); el.__snapT = setTimeout(function(){ snapMark('v', null); snapMark('h', null); }, 800);
        mockPut(el, _x, _y, p.r);
      });
    }
    function mk1Fit(el){
      var cs = getComputedStyle(el);
      var w = el.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if(!(w > 0)) return;
      el.style.fontSize = '';

      var _w0 = el.style.width; el.style.width = 'max-content';
      var nat = el.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.width = _w0;
      var fs = parseFloat(getComputedStyle(el).fontSize);
      if(nat > 0) el.style.fontSize = Math.max(10, Math.min(400, fs * w / nat)).toFixed(2) + 'px';
    }
    function mockKind(el){ return el.classList.contains('gm-mk1') ? 'mk1' : el.classList.contains('gm-mk3') ? 'mk3' : 'mk2'; }
    function mockPlace(el, from){
      var mock = sheetEl.querySelector('.gm-mock'), p = mockPct(from || el, mock);
      el.style.margin = '0'; el.classList.add('moved');
      mockPut(el, Math.max(0, Math.min(100 - p.w, p.l + (from ? 4 : 0))),
                  Math.max(0, Math.min(100 - p.h, p.t + (from ? 4 : 0))), p.r);
      el.style.width = p.w.toFixed(2) + '%';
      if(mockKind(el) !== 'mk1') el.style.height = p.h.toFixed(2) + '%';
    }
    function mockAdd(kind){
      var mock = sheetEl.querySelector('.gm-mock'); if(!mock) return;
      var base = mock.querySelector('.gm-' + kind); if(!base) return;
      mockPush();
      var hid = base.classList.contains('gone'), d0 = base.style.display;
      if(hid) base.style.display = '';
      var same = mock.querySelectorAll('.gm-' + kind + '.gm-drag'), from = same.length ? same[same.length - 1] : base;
      if(from.classList.contains('gone')) from = base;
      var el = base.cloneNode(true); el.classList.add('gm-clone'); el.classList.remove('sel', 'grab', 'gone'); el.style.display = ''; el.__armed = false;
      el.querySelectorAll(':scope > .gm-rz').forEach(function(x){ x.parentNode.removeChild(x); });
      mock.appendChild(el); mockArm(el); mockPlace(el, from); mk2Lines(el); mockSel(el);
      if(hid) base.style.display = d0;
      try{ el.focus({preventScroll:true}); }catch(x){}
      return el;
    }
    function mockDup(){
      var el = sheetEl.querySelector('.gm-mock .gm-drag.sel'); if(!el) return;
      mockPush();
      var mock = el.parentNode, c = el.cloneNode(true); c.classList.add('gm-clone'); c.classList.remove('sel', 'grab'); c.__armed = false;
      c.querySelectorAll(':scope > .gm-rz').forEach(function(x){ x.parentNode.removeChild(x); });
      mock.appendChild(c); mockArm(c); mockPlace(c, el); mk2Lines(c); mockSel(c);
      try{ c.focus({preventScroll:true}); }catch(x){}
    }
    function mockDel(){
      var el = sheetEl.querySelector('.gm-mock .gm-drag.sel'); if(!el) return;
      mockPush();
      if(!el.classList.contains('gm-clone')){ el.classList.add('gone'); el.style.display = 'none'; mockSel(null); return; }
      el.parentNode.removeChild(el); mockSel(null);
    }
    function mockReset(){
      var mock = sheetEl && sheetEl.querySelector('.gm-mock'); if(!mock) return;
      mockPush();
      mock.querySelectorAll('.gm-clone').forEach(function(el){ el.parentNode.removeChild(el); });
      mock.querySelectorAll('.gm-drag').forEach(function(el){ el.classList.remove('gone', 'sel', 'grab', 'snapon', 'moved'); el.removeAttribute('style');
        var _n0 = parseFloat(el.getAttribute('data-n0'));
        mk2Lines(el, _n0 > 0 ? _n0 * MK2LH : undefined); });
      mockSel(null);
    }
    function mockDrag(){
      var mock = sheetEl && sheetEl.querySelector('.gm-mock'); if(!mock) return;
      ['.gm-mk1', '.gm-mk3', '.gm-mk2'].forEach(function(sel){ var el = mock.querySelector(sel); if(el) mockArm(el); });
      if(mock.__drag) return; mock.__drag = true;

      sheetEl.addEventListener('pointerdown', function(e){
        var t = e.target;
        if(t && t.closest && (t.closest('.gm-drag') || t.closest('.gm-stool') || t.closest('.gm-shd'))) return;
        mockSel(null);
      });

      document.addEventListener('keydown', function(e){
        if(!gm.classList.contains('sheeton')) return;
        var ae = document.activeElement, typing = ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable);
        if(typing) return;
        var meta = e.metaKey || e.ctrlKey;
        if(meta && (e.key === 'z' || e.key === 'Z')){ e.preventDefault(); if(e.shiftKey) mockRedo(); else mockUndo(); return; }
        if(meta && (e.key === 'y' || e.key === 'Y')){ e.preventDefault(); mockRedo(); return; }
        if((e.key === 'Delete' || e.key === 'Backspace') && sheetEl.querySelector('.gm-mock .gm-drag.sel')){ e.preventDefault(); mockDel(); return; }
      });
      var tool = sheetEl.querySelector('.gm-stool'); if(!tool) return;

      tool.querySelectorAll('[data-add]').forEach(function(b){
        b.addEventListener('pointerdown', function(e){
          if(e.button) return;
          var el = mockAdd(b.getAttribute('data-add')); if(!el) return;
          b.__spawned = Date.now();
          e.preventDefault();
          var r = mock.getBoundingClientRect(), bb = el.getBoundingClientRect();
          el.classList.add('spawn', 'grab'); mock.classList.add('dragging'); el.__pid = e.pointerId;
          var ox = bb.width / 2, oy = bb.height / 2;
          var mv = function(ev){
            el.style.transition = 'none'; el.style.margin = '0';
            var x = Math.max(0, Math.min(r.width - bb.width, ev.clientX - ox - r.left));
            var y = Math.max(0, Math.min(r.height - bb.height, ev.clientY - oy - r.top));
            el.style.left = (x / r.width * 100).toFixed(2) + '%';
            el.style.top = (y / r.height * 100).toFixed(2) + '%';
          };
          var up = function(){
            document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
            el.__pid = null; el.style.transition = ''; el.classList.remove('grab');
            void el.offsetWidth; el.classList.remove('spawn');
            mock.classList.remove('dragging');
          };
          mv(e);
          document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
        });
      });

      (function(){
        var grip = tool.querySelector('b'); if(!grip) return;
        var onDown = function(e){
          if(e.button) return;

          if(!tool.classList.contains('mini') && !(e.target.closest && e.target.closest('b'))) return;
          e.preventDefault();
          tool.__moved = false;
          var t = tool.getBoundingClientRect(), sh = sheetEl.getBoundingClientRect();
          var ox = e.clientX - t.left, oy = e.clientY - t.top;
          tool.classList.add('grab');
          var dx0 = e.clientX, dy0 = e.clientY;
          var mv = function(ev){

            if(!tool.__moved && Math.abs(ev.clientX - dx0) < 4 && Math.abs(ev.clientY - dy0) < 4) return;
            tool.__movedAt = Date.now();
            var x = Math.max(0, Math.min(sh.width - t.width, ev.clientX - ox - sh.left));
            var y = Math.max(0, Math.min(sh.height - t.height, ev.clientY - oy - sh.top));
            tool.__moved = true;
            tool.style.left = x + 'px'; tool.style.top = y + 'px'; tool.style.bottom = 'auto'; tool.style.right = 'auto';
          };
          var up = function(ev){ tool.classList.remove('grab');
            document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);

            if(ev && ev.type === 'pointerup' && !tool.__moved && document.documentElement.classList.contains('handheld')){ tool.__foldAt = Date.now(); mockFold(); } };
          document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
        };
        grip.addEventListener('pointerdown', onDown);
        tool.addEventListener('pointerdown', function(e){ if(tool.classList.contains('mini')) onDown(e); });
      })();
      tool.addEventListener('click', function(e){

        if(Date.now() - (tool.__movedAt || 0) < 400) return;
        var b = e.target.closest && e.target.closest('button'); if(!b) return;
        var sr = b.getAttribute('data-sar');
        if(sr){
          tool.querySelectorAll('[data-sar]').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          sheetEl.classList.toggle('arfix', sr !== 'screen');
          if(sr !== 'screen') sheetEl.style.setProperty('--sar', sr);
          mockReset();

          setTimeout(function(){ var h = sheetEl.querySelector('.gm-mock .gm-mk1'); if(h) mk1Fit(h); }, 460);
          return;
        }
        var a = b.getAttribute('data-add');
        if(a){ if(Date.now() - (b.__spawned || 0) > 400) mockAdd(a);
          return; }
        var k = b.getAttribute('data-act');
        if(k === 'fold'){ if(Date.now() - (tool.__foldAt || 0) > 500) mockFold(); return; }
        if(k === 'grid'){
          var goff = sheetEl.classList.toggle('nogrid');
          b.setAttribute('aria-pressed', goff ? 'false' : 'true');
          return; }
        if(k === 'num'){
          var on = sheetEl.classList.toggle('nonum');
          b.setAttribute('aria-pressed', on ? 'false' : 'true');
          return; }
        if(k === 'undo'){ mockUndo(); return; }
        if(k === 'redo'){ mockRedo(); return; }
        if(k === 'dup') mockDup(); else if(k === 'del') mockDel(); else if(k === 'rst') mockReset();
      });
    }

    var MOCKI = {
      mk1:'<path d="M5 6h14M12 6v13M9.5 19h5"/>',
      mk3:'<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="8.4" cy="10" r="1.5"/><path d="M3.4 16.6l4.6-3.8 3.6 2.8 3.2-2.2 6.2 5"/>',
      mk2:'<path d="M4 6.5h16M4 10.5h16M4 14.5h16M4 18.5h9"/>',
      dup:'<rect x="3.5" y="3.5" width="12" height="12" rx="1"/><rect x="8.5" y="8.5" width="12" height="12" rx="1"/>',
      del:'<path d="M4 6.5h16M9.5 6.5V3.5h5v3M6.5 6.5l1 14h9l1-14M10 10v7M14 10v7"/>',
      rst:'<path d="M4.5 9.5h11a5 5 0 010 10H9"/><path d="M8.5 5.5l-4 4 4 4"/>',
      grid:'<rect x="3.5" y="3.5" width="17" height="17" rx=".5"/><path d="M9.2 3.5v17M15 3.5v17M3.5 9.2h17M3.5 15h17"/>',

      fold:'<path d="M15.5 5.5l-7 6.5 7 6.5"/>',
      undo:'<path d="M9 6.5L4.5 11 9 15.5"/><path d="M4.5 11h9a5.5 5.5 0 010 11H9"/>',
      redo:'<path d="M15 6.5L19.5 11 15 15.5"/><path d="M19.5 11h-9a5.5 5.5 0 000 11H15"/>',
      num:'<path d="M8.5 4.5L6 19.5M15.5 4.5L13 19.5M4 9h15M3.5 15h15"/>',
      open:'<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M12 8.5v7M8.5 12h7"/>'
    };
    function mockIcon(k){ return '<svg viewBox="0 0 24 24" aria-hidden="true">' + MOCKI[k] + '</svg>'; }

    function mockFold(){
      var t = sheetEl && sheetEl.querySelector('.gm-stool'); if(!t) return;
      var mini = t.classList.contains('mini'), w0 = t.getBoundingClientRect().width;
      if(mini){

        t.classList.remove('mini'); t.classList.add('unfolding'); mockText();
        t.style.width = w0 + 'px'; void t.offsetWidth;
        t.style.width = t.scrollWidth + 'px';
        setTimeout(function(){ t.classList.remove('unfolding'); }, 130);
        setTimeout(function(){ if(!t.classList.contains('mini')) t.style.width = ''; }, 340);

        setTimeout(function(){
          if(t.classList.contains('mini') || !(t.style.left || t.style.top)) return;
          var r = t.getBoundingClientRect(), sh = sheetEl.getBoundingClientRect(), pad = 8;
          var dx = Math.min(0, sh.right - pad - r.right) + Math.max(0, sh.left + pad - r.left);
          var dy = Math.min(0, sh.bottom - pad - r.bottom) + Math.max(0, sh.top + pad - r.top);
          if(dx) t.style.left = ((parseFloat(t.style.left) || (r.left - sh.left)) + dx).toFixed(0) + 'px';
          if(dy) t.style.top = ((parseFloat(t.style.top) || (r.top - sh.top)) + dy).toFixed(0) + 'px';
        }, 380);
      } else {

        t.classList.add('folding');
        t.style.width = w0 + 'px'; void t.offsetWidth;
        setTimeout(function(){
          if(!t.classList.contains('folding')) return;
          t.classList.remove('folding'); t.classList.add('mini'); mockText(); t.style.width = '';
        }, 150);
      }
    }
    function mockText(){
      var t = sheetEl && sheetEl.querySelector('.gm-stool'); if(!t) return;
      t.querySelector('b').textContent = L('置いて試す', 'try a layout');
      t.querySelectorAll('[data-add]').forEach(function(b){ var g = b.getAttribute('data-add'), k = MOCKK[g];
        b.innerHTML = mockIcon(g) + '<span>＋' + L(k[0], k[1]) + '</span>'; });
      var m = {dup:['複製', 'duplicate'], del:['削除', 'delete'], fold:['畳む', 'fold'],
               undo:['取り消す', 'undo'], redo:['やり直す', 'redo'], rst:['リセット', 'reset'], grid:['グリッド', 'grid'], num:['数値', 'numbers']};
      t.querySelectorAll('[data-act]').forEach(function(b){ var g = b.getAttribute('data-act'), k = m[g];
        b.innerHTML = mockIcon(g) + '<span>' + L(k[0], k[1]) + '</span>'; });
      var fd = t.querySelector('.gm-sfold');
      if(fd){ var mini = t.classList.contains('mini');
        fd.innerHTML = mockIcon(mini ? 'open' : 'fold');
        fd.setAttribute('aria-label', mini ? L('置いて試す道具を開く', 'Open the layout tools') : L('道具を畳む', 'Fold the tools'));
        fd.setAttribute('aria-expanded', mini ? 'false' : 'true'); }
      var dsp = t.querySelector('.gm-sdisp'); if(dsp) dsp.querySelector('em').textContent = L('表示', 'display');
      var sar = t.querySelector('.gm-sar:not(.gm-sdisp)'); if(sar){
        sar.querySelector('em').textContent = L('枠', 'frame');
        sar.querySelector('[data-sar="screen"]').textContent = L('この画面', 'screen');
        sar.querySelector('[data-sar="1"]').textContent = L('正方形', 'square'); }
      sheetEl.querySelectorAll('.gm-mock .gm-drag').forEach(function(e){ var kk = MOCKK[mockKind(e)];
        e.setAttribute('aria-roledescription', L('置いたもの', 'block'));
        e.setAttribute('aria-label', L(kk[0] + '。矢印キーで動かす、＋と−で大きさ、⌘Dで複製、Deleteで削除', kk[1] + '. Arrow keys to move, + and - to resize, Cmd+D to duplicate, Delete to remove')); });
    }
    function sheet(avg){
      sheetAvg = avg;
      var sgd = sheetEl.querySelector('.gm-sgrid'); sgd.innerHTML = '';

      GRID.v.forEach(function(v){ mkLine(sgd, 'v', v, 'mine'); }); GRID.h.forEach(function(v){ mkLine(sgd, 'h', v, 'mine'); });
      LINES.forEach(function(t){ mkLine(sgd, t.ax, avg[t.k], 'you big'); });

      mkLine(sgd, 'v', 50, 'mid', L('中心', 'centre')); mkLine(sgd, 'h', 50, 'mid', L('中心', 'centre'));

      sheetEl.style.setProperty('--sx1', avg.x1 + '%');
      sheetText();
      sheetGrid('you');
      sheetEl.classList.remove('nogrid');
      var mock = sheetEl.querySelector('.gm-mock'); mock.classList.remove('land'); void mock.offsetWidth;
      mockDrag(); mockReset();
      gm.classList.add('sheeton'); sheetEl.setAttribute('aria-hidden', 'false'); try{ sheetEl.inert = false; }catch(x){}
      setTimeout(function(){ mock.classList.add('land'); }, rm ? 0 : 360);
      setTimeout(function(){ if(gm.classList.contains('sheeton')){ seal('APPLIED', '適用', sheetEl, 'corner'); cring(L('レイアウトしてみる \u00b7 APPLIED \u00b7 ', 'TRY A LAYOUT \u00b7 APPLIED \u00b7 ')); } }, rm ? 100 : 560);
      setTimeout(function(){ sheetEl.querySelector('.gm-sx').focus({preventScroll:true}); }, 240);
      setTimeout(sheetTut, rm ? 0 : 1000);
    }
    var stutDone = false;
    function sheetTut(){
      if(stutDone || rm || tutOn || !gm.classList.contains('sheeton')) return;
      if(!sheetEl || !sheetEl.querySelector('.gm-stool')) return;
      stutDone = true; tutList = STUTS; tutKind = 'sheet'; tutOn = true; tutStart();
    }
    function sheetText(){
      var avg = sheetAvg; if(!sheetEl || !avg) return;
      sheetEl.querySelectorAll('.gm-mock .gm-mk1').forEach(function(_e){

        var _rz = Array.prototype.slice.call(_e.querySelectorAll(':scope > .gm-rz'));
        _e.innerHTML = mix('絵を、測る。', 'Measure the picture.', '測る');
        _rz.forEach(function(x){ _e.appendChild(x); }); });
      (function(){ var _b = sheetEl.querySelector('.gm-scap b');
        _b.innerHTML = mix('あなたの、ものさし', 'Your ruler', 'ものさし');
        if(!_b.textContent.trim()) _b.textContent = L('あなたの、ものさし', 'Your ruler'); })();

      sheetEl.querySelector('.gm-scap span').innerHTML = '';

      sheetEl.querySelector('.gm-scap small').textContent = '';
      mockText();
    }

    function sheetBands(which){
      var sgd = sheetEl && sheetEl.querySelector('.gm-sgrid'); if(!sgd || !sheetAvg) return;
      sgd.querySelectorAll('.gm-bd').forEach(function(x){ x.parentNode.removeChild(x); });
      var mine = which === 'mine';
      mkBands(sgd, 'v', mine ? GRID.v : [sheetAvg.x1, sheetAvg.x3], mine ? 'mine' : 'you');
      mkBands(sgd, 'h', mine ? GRID.h : [sheetAvg.y1, sheetAvg.y2], mine ? 'mine' : 'you');
    }

    function sheetGrid(which){
      var g = which === 'mine' ? {y1:14, x1:12, y2:32, x3:58} : sheetAvg; if(!g) return;
      var m = sheetEl.querySelector('.gm-mock');
      mockReset();
      m.style.setProperty('--gx1', g.x1 + '%'); m.style.setProperty('--gy1', g.y1 + '%'); m.style.setProperty('--gx3', g.x3 + '%'); m.style.setProperty('--gy2', g.y2 + '%');
      m.classList.toggle('tight', g.x3 - g.x1 < 8 || 71 - g.y2 < 6); m.classList.toggle('ttight', 83 - g.x3 < 8);
      sheetEl.querySelectorAll('.gm-swk button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-g') === which ? 'true' : 'false'); });
      sheetEl.classList.toggle('mineg', which === 'mine');
      mockUntangle(g);
      sheetBands(which);
    }
    function mockUntangle(g){
      var m = sheetEl && sheetEl.querySelector('.gm-mock'); if(!m || !g) return;
      var a = m.querySelector('.gm-mk1'); if(!a) return;
      var r = m.getBoundingClientRect(); if(!(r.height > 0)) return;
      var h1 = a.getBoundingClientRect().height / r.height * 100;
      m.classList.toggle('vtight', (g.y2 - g.y1) < h1 && (g.y1 - h1) >= 0);
    }
    function sheetOff(){ (function(){ var _m = sheetEl && sheetEl.querySelector('.gm-mock'); if(!_m) return;
      _m.querySelectorAll('.gm-drag').forEach(function(e){ if(e.__end) e.__end(); });
      _m.classList.remove('dragging'); snapMark('v', null); snapMark('h', null); })();
      sealOff(true); gm.classList.remove('sheeton'); takeOff(); sheetEl.setAttribute('aria-hidden', 'true'); try{ sheetEl.inert = true; }catch(x){} }

    function tipText(){
      if(!tipEl) return; var t = LINES[ti], b = picks[bi]; if(!t || !b) return;

      var _q = (b.q && b.q[ti]) ? L(b.q[ti], (b.qe && b.qe[ti]) || b.q[ti]) : L(t.q, t.qe).replace('%s', obj(b));
      tipEl.innerHTML = '<b>' + (ti + 1) + ' / ' + LINES.length + '</b><span>' + esc(_q) + '</span>';
    }
    function relang(){
      if(window.__seqSeal) window.__seqSeal();
      if(!gm || gm.hidden) return;
      gm.querySelector('.gm-ttl').innerHTML = mix('絵を、測る。', 'Measure the picture.', '測る');
      gm.querySelector('.gm-sub').textContent = '';
      gm.querySelector('.gm-sx').textContent = L('戻る', 'Back'); var gi0 = gm.querySelector('.gm-i'); if(gi0) gi0.textContent = L('測り方とQ&A', 'How to measure & Q&A');
      ['.gm-ix', '.gm-x'].forEach(function(sel){ var e = gm.querySelector(sel); if(e) e.setAttribute('aria-label', L('閉じる', 'Close')); });

      (function(){ var i = gm.querySelector('.gm-hd .gm-i'); if(i) i.setAttribute('aria-label', L('この絵と線について', 'About this picture and the lines'));
        var st = gm.querySelector('.gm-stage'); if(st) st.setAttribute('aria-label', L('盤面', 'The board'));
        var tt = gm.querySelector('.gm-ttl'); if(tt) tt.setAttribute('aria-label', L('絵を、測る。', 'Measure the picture.')); })();
      if(typeof qaBuild === 'function') qaBuild();
      axlText(); tbLabel(); lbLabel();
      if(state === 'trace' || state === 'compare' || state === 'done') tipText();
      if(tutOn && tutEl){ tutStep(tutAt); var sk = tutEl.querySelector('.gmt-skip'); if(sk) sk.textContent = L('手引きをとばす', 'Skip this'); }
      var sw = sheetEl.querySelectorAll('.gm-swk button'); sw[0].textContent = L('あなたのグリッド', 'your grid'); sw[1].textContent = L('このサイトのグリッド', 'this site’s grid');
      if(gm.classList.contains('sheeton')) sheetText();
      if(introOn){
        introEl.querySelectorAll('.gm-isec').forEach(function(d, i){ d.innerHTML = isecHTML(ISECS[i]); bindChoice(d); });
        introEl.querySelector('.gm-iskip').textContent = L('スキップ', 'Skip'); introEl.querySelector('.gm-ihow').textContent = L('測り方とQ&A', 'How to measure & Q&A'); introScroll(); ibgBuild(); introBg();
      } else if(state === 'trace'){ turn(); }
      if(!introOn && state !== 'avg' && state !== 'idle' && !cardEl.hidden){ cardRender(bi); listBuild(); listState(); }
      if(state === 'trace' || state === 'compare') stepEl.innerHTML = '<span>' + esc(L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + ti + 1) + '</span>';
      if(state === 'compare'){ var t2 = LINES[ti], b2 = picks[bi], p2 = res[bi][t2.k], a2 = b2.a[t2.k]; cmpRender(t2, b2, p2, a2, p2 - a2); mode(L('比べる', 'compare')); }
      else if(state === 'done'){ stepEl.innerHTML = '<span>' + esc(L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + 4) + '</span>'; doneRender(); mode(L('測り終える', 'measured')); }
      else if(state === 'avg' && lastAvg){
        var sv0 = resEl.querySelector('.gm-seven'), th0 = resEl.querySelector('.gm-thanks');
        var wasSeven = !!(sv0 && sv0.classList.contains('on')), wasTh = !!(th0 && th0.classList.contains('on'));

        var wasOn = !!(goEl && goEl.classList.contains('on'));
        avgRender(lastAvg.avg, lastAvg.kav, lastAvg.diff, lastAvg.per);
        if(wasOn && goEl){ goEl.classList.add('on'); try{ goEl.inert = false; }catch(x){} }
        var sv = resEl.querySelector('.gm-seven'); if(sv && wasSeven) sv.classList.add('on');
        var th = resEl.querySelector('.gm-thanks'); if(th && wasTh) th.classList.add('on');
        mode(L('平均', 'average')); }
    }
    if(window.MutationObserver) new MutationObserver(relang).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

    document.addEventListener('keydown', function(e){
      if(!(e.metaKey || e.ctrlKey) || !e.shiftKey) return;
      if(String(e.key || '').toLowerCase() !== 's') return;
      if(!gm || gm.hidden) return;
      e.preventDefault();
      var wasIntro = introOn;
      if(wasIntro){ try{ introEnd(true); }catch(x){} }

      try{ tutPend = null; tutEnd(); tutOn = false; demoDone = true; demoOff(); }catch(x){}
      if(!picks || !picks.length){ try{ start(); }catch(x){} }
      setTimeout(function(){
        if(!picks || picks.length < 3) return;
        for(var i = 0; i < 3; i++){
          if(!res[i]) res[i] = {};
          LINES.forEach(function(t, n){
            if(res[i][t.k] == null){
              var a = picks[i].a[t.k]; if(a == null) a = 50;
              res[i][t.k] = Math.max(2, Math.min(98, Math.round(a + [8, -6, 12, -10][(i + n) % 4])));
            }
          });
          try{ trayFill(i); }catch(x){}
        }
        bi = 2; ti = LINES.length; state = 'done';
        try{ tutPend = null; tutEnd(); tutOn = false; demoDone = true; demoOff(); }catch(x){}
        try{ average(); }catch(x){}
      }, wasIntro ? 120 : 0);
    });
    window.__gmOpen = open;
    window.__gmClose = close;

    (function(){
      var sp = document.getElementById('seqplay'); if(!sp || typeof kakuSvg !== 'function') return;
      var st = sp.querySelector('.st');
      window.__seqSeal = function(){
        if(!st || typeof kakuSvg !== 'function') return;
        while(st.firstChild) st.removeChild(st.firstChild);
        st.appendChild(kakuSvg(L('PLAY', 'TRY'), L('測って\n遊んでみる', 'MEASURE\nAND PLAY'), 77));
      };
      window.__seqSeal();
      sp.addEventListener('click', function(){ open(); });
    })();

    if(/play=|^#game$/.test(location.hash || '')) setTimeout(function(){
      var n = 0, t = setInterval(function(){ if(document.body.classList.contains('opening') && ++n < 200) return; clearInterval(t); if(n < 200) open(); }, 250);
    }, 1200);
  })();
})();

  (function(){
    function move(){
    var sp = document.getElementById('seqplay'); if(!sp) return;
    var cap = sp.querySelector('.cap'); if(!cap) return;
    var host = sp.parentElement, tip = host && host.querySelector('.tip'); if(!tip) return;
    cap.classList.remove('cap'); cap.classList.add('seqcap');
    tip.parentNode.insertBefore(cap, tip.nextSibling);
    cap.setAttribute('role', 'button'); cap.setAttribute('tabindex', '0');
    cap.addEventListener('click', function(){ sp.click(); });
    cap.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); sp.click(); } });
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', move); else move();
  })();

window.addEventListener('load', function(){ setTimeout(function(){
  document.querySelectorAll('image[data-lzhref]').forEach(function(el){ el.setAttribute('href', el.getAttribute('data-lzhref')); el.removeAttribute('data-lzhref'); });
  document.querySelectorAll('use').forEach(function(u){ var h = u.getAttribute('href') || '';
    if(h.indexOf('#wkp_') === 0 && u.parentNode) u.parentNode.replaceChild(u.cloneNode(true), u); });
}, 600); });
