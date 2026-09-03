
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* v280: OS の「動きを減らす」設定は見ない。Windows ではこの設定が省電力の既定や企業の管理設定でオフ（＝reduce）になっていることが多く、
     macOS の「視差効果を減らす」と違って本人の意思表示とは限らない。そのまま従うとオープニング・カーソル演出・楕円の入れ替わり・
     作品の帯・本文の浮上がまとめて消え、別のサイトのように見えてしまう。どの環境でも同じ見え方にし、止めて見たいときは ?reduce=1 を付ける */
  reduce = /[?&]reduce=1/.test(location.search);
  if(reduce) document.documentElement.classList.add('rm');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var vh = function(){ return window.innerHeight; };
  var body = document.body, top = document.getElementById('top');
  /* 開発者ツールを開いてくださった方へ */
  try{
    console.log('%c小%c ここまでご覧いただき、ありがとうございます。\n\n   このサイトは、まず Illustrator などで素材を制作したうえで、ワイヤーフレームとしてノーコードの Web 制作ツールを使い、一度形にしました。\n   そこから AI との対話を重ねて HTML を組み立て、その内容をもとに書いてもらったコードを実装し、約 500 回のやりとりを経て、なんとかこの形になりました。\n   地道な作業ではありましたが、AI を活用した Web 制作は自分自身初めてで、発見だらけの日々となりました。\n\n   このような制作の機会をいただき、ありがとうございます。\n   どうぞ最後までお楽しみください。 — 小坂脩蔵\n\n   Thank you for looking this far.\n\n   I began by making the assets in Illustrator, then built a first version as a wireframe in a no-code web tool.\n   From there I assembled the HTML through a dialogue with AI, implemented the code that came back, and after\n   some 500 exchanges it finally became this. Patient work — and my first time building a site with AI, so it was\n   full of discoveries.\n\n   Thank you for the opportunity to make it. Enjoy the rest of it. — Shuzo Kosaka',
      'display:inline-block; background:#E84518; color:#FBF7F2; font:700 14px/1 serif; padding:6px 7px; border-radius:50%; margin-right:6px', 'color:#1C1B19; font:13px/1.7 -apple-system, system-ui, sans-serif');
  }catch(e){}

  /* EN toggle: every translatable container keeps its Japanese innerHTML from before any splitting or re-setting; the English lives in I18N (keyed by that Japanese) */
  var curLang = 'ja', PLACE_EN = {'岡崎':'Okazaki', 'ミシガン':'Michigan', '帰国':'Back to|Japan', '名古屋':'Nagoya', 'バー／|海外':'Bar /|abroad', 'バーと|海外':'Bar &|abroad', '大学院':'Grad|school', 'いま':'Now', 'バンコク':'Bangkok', 'バー':'Bar', '海外':'Abroad', 'バンコク|インターン':'Bangkok|internship', '作品':'Works', '制作':'Making', '連絡':'Contact', 'ジブンの|ゼンブを':'All of|myself'};
  var I18N = {}; (function(raw){ Object.keys(raw).forEach(function(k){ I18N[k.replace(/\s+/g, ' ').trim()] = raw[k]; }); })(window.I18N || {});
  /* v121: Safari pays far more for SVG filters than the others — a turbulence texture spread over the whole
     walk cost it 120ms frames while Chromium shrugged. The engine is marked here so the sheet can spare it. */
  /* WebKit かどうか（Safari だけではない）。iOS の Chrome・Edge・Firefox は中身が WebKit なので、
     同じ描き分けが要る。navigator.vendor が Apple になるのは WebKit だけ（Mac の Chrome は Google Inc.、
     Firefox は空）。UA の判定はそれが取れない場合の控え。 */
  if(/apple/i.test(navigator.vendor || '') || /^((?!chrome|android|crios|edg).)*safari/i.test(navigator.userAgent)) document.documentElement.classList.add('is-webkit');   /* NOT 'wk' — that class already belongs to the works band, and on <html> it dressed every link on the page as a works frame */
  var I18N_SEL = 'p, h3, figcaption, li, dd, .toc a, .sr .t, .sr .p2, .sr .a, #mseals .t, em.tag, .lab, .mlab, .tip, .msg, .lg-k, .lg-t, .legend strong, .legend span, .mp-cap b, .mp-cap span, .mp-key span, .gridbtn span, .mmsg .mx, #mlinks .txt, .menu .ml span, .wrap, .cap, .note, .br-cap, .again, .pdf, .cta, .x, footer span, footer a, footer a span, .cta span, .ft-name, .cp-ttl .w, .wk-vt .w, .cp-form label span, .cp-send b, .wk-side span, text, tspan, textPath, .ttl .split, .ttl small, #top .vt .split, #top .rb, #top .rot span, #top .tag span, .sub .w, .vid .t, .vid .s, .vid .badge, .wk em, .lines s, .page s, #ch5pin .wm span, #top .mean';
  var i18nEls = Array.prototype.slice.call(document.querySelectorAll(I18N_SEL)); i18nEls.forEach(function(el){ el.__ja = el.innerHTML; });
  /* split text into characters */
  function splitEl(el){
    var txt = el.textContent; el.textContent = '';
    var frag = document.createDocumentFragment();
    Array.from(txt).forEach(function(ch, i){ var s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i); s.textContent = (ch === ' ') ? ' ' : ch; frag.appendChild(s); });
    el.appendChild(frag);
  }
  document.querySelectorAll('.split, .scx').forEach(splitEl);
  /* the mixed setting of a heading: kanji → gothic, kana → mincho, punctuation pulled in (Japanese only) */
  function ttlClasses(ja){
    document.querySelectorAll('.ttl .split .ch').forEach(function(c){
      var t = c.textContent; c.classList.remove('pt', 'kj', 'kn');
      if(!ja) return;
      if(/[。、！？]/.test(t)) c.classList.add('pt');
      if(/[\u4E00-\u9FFF\u3400-\u4DBF々〆]/.test(t)) c.classList.add('kj');            /* 漢字 → ゴシック */
      else if(/[\u3040-\u309F\u30A0-\u30FF\u30FC]/.test(t)) c.classList.add('kn');   /* かな → 明朝 */
    });
    document.querySelectorAll('#top .vt .ch').forEach(function(c){ c.classList.remove('h', 'pt'); if(!ja) return; if(/[\u3040-\u309F]/.test(c.textContent)) c.classList.add('h'); if(/[。、]/.test(c.textContent)) c.classList.add('pt'); });
  }
  ttlClasses(true);
  /* the photos inside the two ovals keep switching (cross-fade), the two on different beats */
  (function(){
    if(reduce) return;
    document.querySelectorAll('#top .oval').forEach(function(o, k){
      var imgs = o.querySelectorAll('.phs image, .phs img'), n = imgs.length, cur = 0; if(n < 2) return;   /* v229: 写真は HTML の img に */
      /* v258: 二つの楕円が同時に切り替わらないよう、間隔は毎回ばらつかせる（2.6〜5.4 秒）。最初のずれも楕円ごとに変える */
      (function tick(first){ setTimeout(function(){
        var nowMs = performance.now();
        if(nowMs - (window.__ovLast || 0) < 900){ setTimeout(function(){ tick(false); }, 0); return; }   /* v258: もう片方が切り替わった直後なら見送り、次の間隔で */
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
  /* pair kerning: a few kana pairs that sit too far apart in the mincho (e.g. ン→ト, イ→ン) are pulled together */
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
  /* ch7's two subheads (.mixed): set like a chapter title — split per character (the <br> kept), kanji gothic / kana mincho, the data-big words larger, kerned by pair, the lines optically aligned */
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
        if(getComputedStyle(sub).writingMode === 'horizontal-tb') kernPairs(chs);   /* the pair kerning is horizontal: not on the vertical line */
        var words = (sub.getAttribute('data-big') || '').split('|').filter(Boolean), txt = chs.map(function(c){ return c.__t; }).join('');
        words.forEach(function(wd){ var k = txt.indexOf(wd); while(k >= 0){ for(var q = 0; q < wd.length; q++) if(chs[k + q]) chs[k + q].classList.add('big'); k = txt.indexOf(wd, k + wd.length); } });
      }
      /* each line's first glyph pulled left by its side bearing, like the titles */
      var cv = document.createElement('canvas'), cx = cv.getContext('2d'), rows = [], first = true;
      Array.prototype.slice.call(w.childNodes).forEach(function(nd){ if(nd.nodeName === 'BR'){ first = true; return; } if(first && nd.classList && nd.classList.contains('ch') && nd.__t.trim()){ first = false; if(cx){ var cs = getComputedStyle(nd); cx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; rows.push({el:nd, lsb:-cx.measureText(nd.__t).actualBoundingBoxLeft}); } } });
      var vertical = getComputedStyle(sub).writingMode !== 'horizontal-tb';
      if(rows.length > 1 && !vertical && getComputedStyle(sub).textAlign !== 'center'){ var mn = Math.min.apply(null, rows.map(function(r){ return r.lsb; })); rows.forEach(function(r){ r.el.style.marginLeft = (-(r.lsb - mn) * .8).toFixed(2) + 'px'; }); }
      if(rows.length > 1 && vertical && cx){
        /* a vertical line: the first glyph of each column is drawn on a canvas and its ink measured from the top, so the columns' tops sit flat by eye (kanji, kana and the larger words all start their ink at different heights) */
        rows.forEach(function(r){ var cs = getComputedStyle(r.el), px = parseFloat(cs.fontSize), S = 4; cv.width = Math.ceil(px * S * 1.6); cv.height = Math.ceil(px * S * 1.8); cx.clearRect(0, 0, cv.width, cv.height); cx.font = cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily; cx.textBaseline = 'alphabetic'; cx.fillStyle = '#000'; var base = Math.round(px * S * 1.3); cx.fillText(r.el.__t, Math.round(px * S * .2), base); var img = cx.getImageData(0, 0, cv.width, cv.height).data, top = -1; for(var yy = 0; yy < cv.height && top < 0; yy++){ for(var xx = 0; xx < cv.width; xx++){ if(img[(yy * cv.width + xx) * 4 + 3] > 40){ top = yy; break; } } } r.ink = top < 0 ? 0 : (top - (base - px * S)) / S; r.px = px; });
        var mnT = Math.min.apply(null, rows.map(function(r){ return r.ink; }));
        rows.forEach(function(r){ r.el.style.marginTop = (-(r.ink - mnT) * .9).toFixed(2) + 'px'; });
      }
      var sp = sub.closest('.solopin'); if(sp){ sp.__chs = chs; sp.__res = -1; sp.__fit = false; }
    });
  }
  mixedSubs(true);
  /* optical alignment of heading lines: the first glyph of each line is measured on a canvas (its own face, weight and size) and the difference in left side-bearing between the lines is cancelled, so the ink edges — not the boxes — stand on one vertical. Kana carry far more bearing than kanji, which is what made「デザインで人を」look inset. */
  function opticalAlign(){
    var cv = document.createElement('canvas'), cx = cv.getContext('2d'); if(!cx) return;
    document.querySelectorAll('.ttl:not(.vert)').forEach(function(h){
      var rows = [];
      h.querySelectorAll('.split').forEach(function(sp){ var c = sp.querySelector('.ch'); if(!c || !c.textContent.trim()) return; var cs = getComputedStyle(c); cx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; var m = cx.measureText(c.textContent); rows.push({el:c, lsb:-m.actualBoundingBoxLeft}); });
      if(rows.length < 2) return;
      var min = Math.min.apply(null, rows.map(function(r){ return r.lsb; }));
      rows.forEach(function(r){ r.el.style.marginLeft = (-(r.lsb - min) * .8).toFixed(2) + 'px'; });   /* .8: palt already pulls kana in a little */
    });
  }
  /* the lines on the top page are a ruler: the small left-aligned texts are pulled left by their first glyph's side bearing, so the ink itself sits on X1 */
  function hugLine(){
    var cv = document.createElement('canvas'), cx = cv.getContext('2d'); if(!cx) return;
    var probe = document.createElement('span'); probe.style.cssText = 'position:absolute; left:-9999px; top:0; white-space:pre; visibility:hidden'; document.body.appendChild(probe);
    /* the blank before a glyph's ink: drawn large on a canvas and scanned (canvas ignores palt, so its trim is estimated from the advance it takes away, half on each side) */
    function inkLeft(ch, cs){ var px = parseFloat(cs.fontSize), S = 4; cv.width = Math.ceil(px * S * 2.2); cv.height = Math.ceil(px * S * 1.8); cx.clearRect(0, 0, cv.width, cv.height); cx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily; cx.textBaseline = 'middle'; cx.fillStyle = '#000'; var x0 = Math.round(px * S * .6); cx.fillText(ch, x0, cv.height / 2); var d = cx.getImageData(0, 0, cv.width, cv.height).data; for(var x = 0; x < cv.width; x++){ for(var y = 0; y < cv.height; y++){ if(d[(y * cv.width + x) * 4 + 3] > 40) return (x - x0) / S; } } return 0; }
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
  /* the katakana tag at the right starts at the same height as JIBUN no ZENBU wo: the ink tops are measured and the tag (rules and all) moves by the difference */
  function tagAlign(){
    var tag = top.querySelector('.tag'), rj = top.querySelector('.lbl b.rj .ln'), sp = tag && tag.querySelector('span'); if(!tag || !rj || !sp) return;
    var cv = document.createElement('canvas'), cx = cv.getContext('2d'); if(!cx) return;
    var rc = getComputedStyle(rj), F = parseFloat(rc.fontSize), LH = parseFloat(rc.lineHeight) || F * 1.12;
    cx.font = rc.fontStyle + ' ' + rc.fontWeight + ' ' + F + 'px ' + rc.fontFamily; var m = cx.measureText(rj.textContent.trim().charAt(0) || 'J');
    var A = m.fontBoundingBoxAscent || F * .9, D = m.fontBoundingBoxDescent || F * .2, cap = m.actualBoundingBoxAscent || F * .7;
    function offY(el){ var y = 0; while(el && el !== top){ y += el.offsetTop; el = el.offsetParent; } return y; }   /* layout positions: the reveal's transforms are ignored */
    var rjTop = offY(rj) + (LH - (A + D)) / 2 + A - cap;   /* the cap line of J */
    var tc = getComputedStyle(sp), f = parseFloat(tc.fontSize), lh = parseFloat(tc.lineHeight) || f * 1.6, ink = 0;
    if(curLang !== 'en'){ var S = 4; cv.width = Math.ceil(f * S * 1.6); cv.height = Math.ceil(f * S * 1.6); cx.clearRect(0, 0, cv.width, cv.height); cx.font = tc.fontStyle + ' ' + tc.fontWeight + ' ' + (f * S) + 'px ' + tc.fontFamily; cx.textBaseline = 'top'; cx.fillStyle = '#000'; cx.fillText(sp.textContent.trim().charAt(0), f * S * .3, 0); var d = cx.getImageData(0, 0, cv.width, cv.height).data, found = -1; for(var y = 0; y < cv.height && found < 0; y++){ for(var x = 0; x < cv.width; x++){ if(d[(y * cv.width + x) * 4 + 3] > 40){ found = y; break; } } } if(found >= 0) ink = found / S; }
    var spTop = offY(sp) + (lh - f) / 2 + ink;   /* the top of the first glyph's ink, in the vertical line */
    top.style.setProperty('--tagtop', (tag.offsetTop + (rjTop - spTop)).toFixed(1) + 'px');
    var mean = top.querySelector('.mean'), Hh = document.documentElement;   /* the note's columns centred under the tag's */
    if(mean){ if(Hh.classList.contains('pcview') && Hh.classList.contains('phone')){ mean.style.right = ''; mean.style.left = ''; }   /* v307: スマホでは題字の下、左の段へ回すので、タグの真下には揃えない */
      else { mean.style.right = 'auto'; mean.style.left = (tag.offsetLeft + tag.offsetWidth / 2 - mean.offsetWidth / 2).toFixed(1) + 'px'; } }
  }
  /* the title's note on the top page: every character swells under the cursor, like a loupe run over the line */
  function meanWrap(){
    var m = document.querySelector('#top .mean'); if(!m || m.querySelector('.mc')) return;
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(m.childNodes).forEach(function(nd){
      if(nd.nodeType === 3){
        /* v233: 句読点までをひと固まり（.nb、折り返し不可）にして、区切りでだけ行を替える */
        nd.nodeValue.match(/[^、。]*[、。]?/g).filter(Boolean).forEach(function(ph){
          var nb = document.createElement('span'); nb.className = 'nb';
          Array.from(ph).forEach(function(ch){ var c = document.createElement('span'); c.className = 'mc'; c.textContent = ch; nb.appendChild(c); });
          frag.appendChild(nb);
          if(ph === 'デザインに注ぐ。' && document.documentElement.classList.contains('phone')) frag.appendChild(document.createElement('br'));   /* v237: スマホはここで必ず行を替える */
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
      chs.forEach(function(c){ var k = Math.round(c.offsetLeft / 8); (cols[k] = cols[k] || []).push(c); });   /* layout positions, not the transformed ones: no feedback */
      var R1 = 40, R2 = 170, M = 1.1;   /* the lens: grown within R1 of the cursor (up to 2.1×), squeezed between R1 and R2 to make the room, untouched beyond */
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
          var acc = 0; mine.forEach(function(it){ var e = (it.s - 1) * it.h; it.t = side * (acc + e / 2); acc += e; });   /* each character moves out by the growth of those between it and the cursor, back in by the squeeze: a fisheye, the ends of the line staying put */
        });
        items.forEach(function(it){ it.c.style.transform = (Math.abs(it.s - 1) > .01 || Math.abs(it.t) > .4) ? 'translateY(' + it.t.toFixed(1) + 'px) scale(' + it.s.toFixed(3) + ')' : ''; });
      });
    }
    m.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; on = true; if(!raf) raf = requestAnimationFrame(paint); });
    m.addEventListener('mouseleave', function(){ on = false; if(!raf) raf = requestAnimationFrame(paint); });
  }
  meanWrap(); meanLens();
  /* the footer: the romaji set as wide as the name above it */
  function ftFit(){
    var nm = document.querySelector('.ft-name'), rb = document.querySelector('.ft-rb'); if(!nm || !rb) return;
    rb.style.letterSpacing = '0'; rb.style.marginRight = '';
    var w1 = nm.getBoundingClientRect().width, w0 = rb.getBoundingClientRect().width, n = rb.textContent.length; if(n < 2) return;
    var ls = (w1 - w0) / (n - 1); rb.style.letterSpacing = ls.toFixed(2) + 'px'; rb.style.marginRight = (-ls).toFixed(2) + 'px';
    /* the tagline: its last letter ends on the name's right edge; a closing 。 hangs beyond */
    var tag = document.querySelector('.ft-tag'), brand = document.querySelector('.ft-brand'); if(!tag || !brand) return;
    if(!tag.querySelector('.tx')){ var t = tag.textContent, m = /^(.*?)([。.!]+)$/.exec(t); tag.innerHTML = m ? '<span class="tx">' + m[1] + '</span><span class="pt">' + m[2] + '</span>' : '<span class="tx">' + t + '</span>'; }
    var tx = tag.querySelector('.tx'), target = nm.getBoundingClientRect().right - brand.getBoundingClientRect().left; if(!tx || target < 40) return;
    tag.style.fontSize = ''; var fs = parseFloat(getComputedStyle(tag).fontSize), w = tx.getBoundingClientRect().width; if(!w) return;
    tag.style.fontSize = Math.max(11, Math.min(34, fs * target / w)).toFixed(2) + 'px';
  }
  /* contact: the portrait's centre on the middle of the profile's rules (the first above NAME, the last under LANG) */
  function ovalFit(){
    var ov = document.querySelector('#contact .oval'), dl = document.querySelector('#contact .prof'), bd = document.querySelector('#contact .body'); if(!ov || !dl || !bd) return;
    var b = bd.getBoundingClientRect(), d = dl.getBoundingClientRect(), h = ov.offsetHeight; if(!h) return;
    ov.style.marginTop = Math.max(0, d.top + d.height / 2 - h / 2 - b.top - 16).toFixed(1) + 'px';   /* and a touch higher than the exact middle, as he wanted */
  }
  /* v94: the footer's メールを送る stands on the portrait's centre line (the note under it shares that line by the block's own alignment) */
  function ftAlign(){
    var fr = document.querySelector('.ft-right'), ov = document.querySelector('#contact .oval'); if(!fr || !ov) return;
    fr.style.transform = ''; if(window.innerWidth < 821) return;
    var a = ov.getBoundingClientRect(), b = fr.getBoundingClientRect(); if(!a.width || !b.width) return;
    var dx = (a.left + a.width / 2) - (b.left + b.width / 2), ft = fr.closest('.ft-top') || fr.parentElement, lim = ft ? ft.getBoundingClientRect() : null;
    if(lim){ dx = Math.max(lim.left - b.left, Math.min(lim.right - b.right, dx)); }   /* never off the footer */
    fr.style.transform = 'translateX(' + dx.toFixed(1) + 'px)';
  }
  function alignAll(){ opticalAlign(); hugLine(); tagAlign(); ftFit(); ovalFit(); ftAlign(); }
  alignAll();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(alignAll, 30); });
  var oaT; window.addEventListener('resize', function(){ clearTimeout(oaT); oaT = setTimeout(alignAll, 150); });

  /* ---------- opening: 朱の幕。人生のチェックポイントが疾走し、止まり、幕が上がって名前が刷り上がる ---------- */
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
    /* the sheet is lifting: the hero's own details follow */
    top.classList.remove('scat');
    top.classList.add('rule');                                   /* verticals rise with the sheet's edge */
    top.classList.add('wet'); setTimeout(function(){ top.classList.remove('wet'); }, 950);   /* fresh ink: 朱 as it is revealed, then dries to black */
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
    var v = document.querySelector('#message video');   /* the handwriting is an image now — with no video to wait for, the counter is free to finish as soon as the fonts are in */
    if(!v) videoOk = true;
    if(v){ if(v.readyState >= 3) videoOk = true; else { v.addEventListener('canplaythrough', function(){ videoOk = true; }, {once:true}); v.addEventListener('error', function(){ videoOk = true; }, {once:true}); } }
    setTimeout(function(){ videoOk = true; }, 2300);
    /* the phrase is typed with a Japanese IME: romaji appear, turn into kana, get converted (underlined) and confirmed — line by line */
    var bs = Array.prototype.slice.call(ld.querySelectorAll('.name b'));
    function isKanji(t){ return /[\u4E00-\u9FFF]/.test(t); }
    function chHtml(t){ var cls = /[A-Za-z]/.test(t) ? 'e' : (isKanji(t) ? 'g' : 'm'); return '<span class="ch on ' + cls + '">' + t + '</span>'; }
    /* each step: [line1 committed, line1 composing, line2 committed, line2 composing]; composing text is underlined like an IME segment */
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
      ld.classList.add('done');                                     /* counter leaves */
      setTimeout(function(){ ld.classList.add('nm'); render(['', '', '', '', 0], 'l1'); }, 600);   /* lanes fade; a caret blinks on the empty sheet */
      var typed = false;
      setTimeout(function(){ typeIn(function(){ typed = true; }); }, 1000);                        /* ...and the phrase is typed */
      var lifted = false;
      function lift(){ if(lifted) return; lifted = true; ld.classList.add('lift'); heroIn(); setTimeout(function(){ ld.remove(); }, 1400); }
      liftNow = lift;
      (function waitTyped(){ if(typed) setTimeout(lift, 900); else setTimeout(waitTyped, 60); })();
      setTimeout(lift, 7600);   /* never later than this */
    }
    var liftNow = null;
    ld.addEventListener('click', function(){ if(phase === 'run'){ phase = 'stop'; stopT = performance.now(); } else if(liftNow){ liftNow(); } });
    window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && phase === 'run'){ phase = 'stop'; stopT = performance.now(); } });
    (function frame(now){
      var t = now - t0, dt = Math.min(50, now - last) / 1000; last = now;
      var ready = (fontsOk && videoOk) || t > CAP;
      /* the count always takes MIN; holds at 92 until the assets are in */
      var bound = 100 * (1 - Math.pow(1 - Math.min(1, t / MIN), 2.2));
      disp = Math.min(bound, disp + ((ready ? 100 : 92) - disp) * .12);
      if(ready && t >= MIN) disp = 100;
      if(phase === 'run' && disp >= 100){ phase = 'stop'; stopT = now; ld.classList.add('hund'); }
      var n = Math.floor(disp); ldn.textContent = (n < 10 ? '0' : '') + n;
      /* lanes: ease in over .5s, run, then brake to a halt over .8s */
      if(phase === 'run'){ speed = Math.min(1, t / 500); speed = speed * speed * (3 - 2 * speed); }
      else { var k = Math.min(1, (now - stopT) / 620); speed = (1 - k) * (1 - k) * (1 - k);
             var q = (now - stopT - 620) / 260; if(q > 0 && q < 1) speed = -.07 * Math.sin(Math.PI * q); }   /* brake, then a small recoil */
      lanes.forEach(function(l, i){
        l.pos = (l.pos + l.v * speed * dt) % l.w;
        var x = l.dir < 0 ? -l.pos : -l.w + l.pos;
        /* speed streak: a little skew and blur while running, gone when they brake */
        l.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + (-l.dir * speed * 6).toFixed(2) + 'deg)';
        var bl = speed * (i === 1 ? 1.2 : 2.2); l.el.style.filter = bl > .15 ? 'blur(' + bl.toFixed(2) + 'px)' : 'none';
      });
      if(phase === 'stop' && now - stopT >= 900){ ldn.textContent = '100'; finish(); return; }
      requestAnimationFrame(frame);
    })(t0);
  }
  /* v197: スマホ・タブレットには先に「横に持ち替えて」の案内を出し、それが終わってからオープニングを始める */
  (function(){
    var rv = document.getElementById('rotv');
    if(!document.documentElement.classList.contains('handheld') || !rv){ if(rv && rv.parentNode) rv.parentNode.removeChild(rv); loader(); return; }
    /* v199: 案内は取り除かず、向きに合わせて出し入れする。
       ・横になったら滑らかに退場し、そのあとで幕（オープニング）が始まる（地色が同じなのでつながる）
       ・途中で縦に戻したら、また滑らかに入ってくる
       ・触れば引っ込む。次に横→縦と回せばまた出る */
    var land = window.matchMedia('(orientation:landscape)');
    var started = false, muted = false;
    function startOpening(){ if(started) return; started = true; setTimeout(loader, 280); }   /* 案内が薄くなりはじめてから幕を動かす */
    var H = document.documentElement;
    /* 途中で縦にしたときの案内は、最初のお願いとは別の文にする（サイトの調子でひとつ笑いを） */
    var RECOPY = {
      ja: {
        rot:  {small:'おっと、縦持ちになったようです。', b:'首を横にする前に、<br>端末を横に。', big:'首|端末', note:'できれば、横持ちでお楽しみください。'},
        mail: {small:'いただいたご連絡は、ありがたく拝読いたします。', b:'この続きは、<br>横向きでどうぞ。', big:'続き|横向き', note:'細かな点までご覧いただき、ありがとうございます。'}
      },
      en: {
        rot:  {small:'Oops — it seems we are in portrait.', b:'Before you tilt your head,<br>tilt the phone.', big:'head|phone', note:'If you can, enjoy it in landscape.'},
        mail: {small:'Anything you send, I will read with care.', b:'The rest of it<br>is best in landscape.', big:'rest|landscape', note:'Thank you for looking this closely.'}
      }
    };
    var recopied = '', rvKind = 'rot';   /* v289: メールを閉じた直後だけ、お礼の文面（mail）。ふつうの回転は元の文面（rot） */
    function recopy(){
      var kind = rvKind, lang = (typeof curLang !== 'undefined' ? curLang : 'ja');
      if(recopied === kind + lang) return; recopied = kind + lang;
      var en = lang === 'en', c = (en ? RECOPY.en : RECOPY.ja)[kind] || (en ? RECOPY.en : RECOPY.ja).rot;
      var sm = rv.querySelector('small'), b = rv.querySelector('b.rtl'), w = b && b.querySelector('.w'), note = rv.querySelector('.rnote');
      if(sm) sm.textContent = c.small;
      if(note) note.textContent = c.note;
      if(w){ w.innerHTML = c.b; b.setAttribute('data-big', c.big); b.classList.add('rv2'); if(typeof mixedSubs === 'function') mixedSubs(!en); }
      rv.classList.add('rvscene');   /* 途中からは、その章の地色で */
    }
    /* 案内が出ているあいだは下の紙面を動かさない（指・ホイール・キー） */
    function rvBlock(e){ if(!rv.classList.contains('gone')) e.preventDefault(); }
    window.addEventListener('touchmove', rvBlock, {passive:false});
    window.addEventListener('wheel', rvBlock, {passive:false});
    function hide(mute){ H.classList.toggle('rvmute', !!mute);   /* v282: 触って閉じた・5 秒で閉じたときだけ CSS の覆いも外す。横向きで閉じるときは残す（次に縦にした瞬間、JS を待たずに覆えるように） */
      rv.classList.add('gone'); H.classList.remove('rotvup', 'rotvup0'); clearTimeout(hide.t); hide.t = setTimeout(function(){ if(rv.classList.contains('gone')){ rv.classList.add('off'); if(window.__retint) window.__retint(); } }, 1000); if(window.__setTheme){ var cur = (getComputedStyle(document.body).getPropertyValue('--bg') || '').trim(); if(cur) window.__setTheme(cur); } }
    function show(){
      if(muted) return;
      if(H.classList.contains('cpopen')) return;   /* v286: 「メールを送る」を開いている間は出さない */
      if(H.classList.contains('nwon')) return;   /* v321: 窓が細いときの案内が出ているなら、そちらを優先する */
      clearTimeout(hide.t); rv.classList.remove('off'); H.classList.remove('rvmute');
      recopy();
      var c = window.__landCols;   /* 横持ちで読んでいた章の色 */
      if(c && c.bg){ H.style.setProperty('--rvbg', c.bg); H.style.setProperty('--rvfg', c.fg || '#1C1B19'); }
      var sv = rv.querySelector('svg'); if(sv){ sv.style.display = 'none'; void sv.offsetWidth; sv.style.display = ''; }   /* v281: 端末の絵の動きを頭から。止まったまま出ると縦横の絵が重なって見える */
      rv.classList.remove('gone'); H.classList.add('rotvup'); if(window.__setTheme) window.__setTheme((c && c.bg) || '#E84518');
      if(window.__retint) window.__retint();   /* v296: 帯の色を採り直させる（iOS は画面の端の固定要素＝#tint から採る） */
    }
    H.classList.add('rotvup', 'rotvup0');   /* 最初の案内が出ているあいだも（切れ目＝ホームバー帯は html の色で塗られる） */
    if(!land.matches){   /* v298: 最初から縦持ちのときは、幕（オープニング）と同じように帯の色を採り直させる。
       案内が出ている間はスクロールを止めているので、放っておくと最初に描いたときの色（紙）のまま残る */
      var rt = function(){ if(window.__retint) window.__retint(); if(window.__setTheme) window.__setTheme('#E84518'); };
      requestAnimationFrame(function(){ requestAnimationFrame(rt); }); setTimeout(rt, 350); setTimeout(rt, 1000); setTimeout(rt, 2200);
    }
    /* v213: v211 の差し替えで落ちていた最初の分岐を戻す。
       すでに横向きなら案内は要らない → すぐ幕へ。縦なら 5 秒で自分から閉じる。触っても閉じる。 */
    window.__rvSuppress = function(){ hide(); };   /* v286: メールを送るを開いたとき（閉じたら戻す。閉じたことにはしない） */
    window.__rvPortrait = function(){ if(!land.matches && started){ muted = false; rvKind = 'mail'; show();
      /* v317: メールの紙面（紙色）が消えきる前に色を採ると、帯が白のまま残る。最初の案内と同じように何度か採り直す */
      var rt2 = function(){ if(window.__retint) window.__retint(); if(window.__setTheme){ var c2 = window.__landCols; window.__setTheme((c2 && c2.bg) || '#E84518'); } };
      requestAnimationFrame(function(){ requestAnimationFrame(rt2); }); setTimeout(rt2, 350); setTimeout(rt2, 700); setTimeout(rt2, 1200); setTimeout(rt2, 2200); } };   /* v286: 閉じたとき、縦持ちなら案内を出す */
    window.__rvRecheck = function(){ if(!started) return; if(land.matches) hide(); else { rvKind = 'rot'; show(); } };   /* v321 */
    window.__rvHide = function(){ if(land.matches && !H.classList.contains('rotvup') === false) hide(); };   /* v232: 横向きなら帯の色（rotvup/rotvup0）を必ず外す */
    if(land.matches){ hide(); startOpening(); }
    else setTimeout(function(){ if(started && land.matches) hide(); }, 5000);   /* v321: 最初の案内は時間では消さない。横持ちになるか、触られるまで出したままにする */
    rv.addEventListener('click', function(){ muted = true; hide(true); startOpening(); });
    /* 先生の判（参考画像に合わせて）：桜型は花びら 5 枚・先に小さな切れ込み・丸い山。中は縦書き。
       押される回数で中身と形が変わる：1 回目「たいへんよくできました」（二重線の花）、
       2 回目「がんばりましょう」（一重線の花）、3 回目から「もういちど復習しよう」（二重丸） */
    function sakuraPath(){
      /* 花びらは円弧で組む（ベジエだと付け根で交差してしまう）。
         花びらの円：中心から 52、半径 40。隣どうしは中心から 67.8 の点（付け根）で交わり、先端は 92 まで届く。
         先の切れ込みは、花びらの円の外側 ±12° の二点から中心へ向けて 82 まで小さく折る */
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
    var rotOkN = 0, mailOkN = 0;   /* v293: メールを閉じた後の判は、こちらで数える */
    function rotOk(){
      var el = document.getElementById('rotok');
      if(!el){
        el = document.createElement('div'); el.id = 'rotok'; el.setAttribute('aria-hidden', 'true');
        el.innerHTML = '<svg class="bkg" viewBox="0 0 200 200"></svg><div class="ink"><svg viewBox="0 0 200 200"></svg></div>';
        document.body.appendChild(el);
      }
      var kind = rvKind, n = (kind === 'mail') ? ++mailOkN : ++rotOkN;   /* v292: ふつうの回転は先生の判の系列。v293: メールの後も 1 回目と 2 回目以降で分ける */
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
      bkg.innerHTML = (kind === 'mail' || n <= 2) ? '<path class="bk" d="' + sp + '"/>' : '<circle class="bk" cx="100" cy="100" r="88"/>';   /* メールの判はどちらも花 */
      el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
      clearTimeout(rotOk.t); rotOk.t = setTimeout(function(){ el.classList.remove('on'); }, 2700);
    }
    /* v317: 向きを変えると、章の高さ（vh 基準）がまるごと変わる。画面の位置（px）はそのままなので、
       戻したときに別の章に居ることがあった。読んでいた場所を覚えておき、組み直しが落ち着くまで何度か戻す */
    var rvAnc = null, rvLock = 0, rvRaf = 0;
    /* 覚え方は「どの章の、どこまで進んだか」。向きが変わると章の高さそのものが変わるので、
       画素ではなく章の中の割合で持っておくのがいちばん狂わない */
    function rvMark(){
      if(rvLock || H.classList.contains('rotvup') || !land.matches) return;
      var secs = document.querySelectorAll('section[id]'), sec = null, top0 = 0, y = window.scrollY;
      for(var i = 0; i < secs.length; i++){ var o = langDocTop(secs[i]), h = secs[i].offsetHeight;   /* 節は入れ子のこともあるので、紙面の頭からの位置で測る */
        if(y >= o - 2 && y < o + h){ sec = secs[i]; top0 = o; break; } }
      if(!sec) return;
      rvAnc = {id:sec.id, p:(y - top0) / Math.max(1, sec.offsetHeight)};
    }
    function rvKeep(){ if(rvRaf) return; rvRaf = requestAnimationFrame(function(){ rvRaf = 0; rvMark(); }); }
    var rvUn = 0;
    window.addEventListener('resize', function(){ rvLock = 1; clearTimeout(rvUn); rvUn = setTimeout(function(){ rvLock = 0; }, 2800); }, {passive:true});   /* 画面の作り直しが始まったら、その間の位置は覚えない（向きの合図より先に scroll が来ることがある） */

    window.addEventListener('scroll', rvKeep, {passive:true});
    setTimeout(rvKeep, 1200);
    function rvPut(){ if(!rvAnc) return; var s0 = document.getElementById(rvAnc.id); if(!s0) return;
      var y0 = Math.round(langDocTop(s0) + rvAnc.p * s0.offsetHeight);
      if(Math.abs(y0 - window.scrollY) > 2) window.scrollTo({top:y0, behavior:'instant'});   /* html は scroll-behavior:smooth。ふつうに呼ぶと滑る途中で次の呼び出しに上書きされ、途中で止まる */ }
    function rvReflow(){
      rvLock = 1;
      requestAnimationFrame(function(){ requestAnimationFrame(rvPut); });
      setTimeout(rvPut, 140); setTimeout(rvPut, 380); setTimeout(rvPut, 760); setTimeout(rvPut, 1200); setTimeout(rvPut, 1800); setTimeout(rvPut, 2500);
      clearTimeout(rvUn); rvUn = setTimeout(function(){ rvLock = 0; }, 2800);
    }
    function onOrient(e){
      var m = e.matches;
      rvReflow();
      clearTimeout(onOrient.t);
      /* v282: 縦にしたときは待たずに出す。430ms 待ってから薄く現れていたので、そのあいだ下の紙面が見えていた。
         横にしたときだけ 430ms 待つ（回している最中の一瞬の判定で幕が消えないように） */
      if(!m){ if(started){ rvKind = 'rot'; show(); } return; }
      /* v291: 案内が出ていたかは「横になった時点」で見る。430ms 待つあいだに別の経路（章の切り替えなど）が
         案内を引っ込めることがあり、その場合に花の判が出ないままだった */
      var wasUp = started && !rv.classList.contains('gone');
      onOrient.t = setTimeout(function(){
        muted = false; hide(); startOpening(); if(wasUp) setTimeout(rotOk, 520);
      }, 430);
    }
    if(land.addEventListener) land.addEventListener('change', onOrient);
    else if(land.addListener) land.addListener(onOrient);
    /* v258: 別のタブへ行っている間に向きが変わると change が届かないことがある。戻ってきたときに向きを見直す */
    document.addEventListener('visibilitychange', function(){ if(document.hidden || !started) return;
      if(!land.matches){ if(rv.classList.contains('gone')){ rvKind = 'rot'; show(); } }
      else if(!rv.classList.contains('gone')){ muted = false; hide(); } });
  })();

  /* ---------- mouse: crosshair + dot + coordinates, hero parallax (persists through the page) ---------- */
  var cur = document.getElementById('cur');
  if(fine && !reduce){
    body.classList.add('hasmouse');
    var cv = cur.querySelector('.cv'), chh = cur.querySelector('.chh'), cd = cur.querySelector('.cd'), cc = cur.querySelector('.cc');
    var mx = window.innerWidth/2, my = vh()/2, lx = mx, ly = my, dx = mx, dy = my, lastTxt = '';
    /* v139: over the round badge at the foot of the screen the dot swells and takes the cursor with it — the
       page is about to be moved, and it says where to. */
    var ctaFx = document.querySelector('.cta-fx'), cdLab = document.createElement('b'), suckOn = false;
    /* v147: a drawn arrow and one word set in the page's own mono, inside a ring — the same furniture as the
       seals and the labels, rather than a sentence printed on a disc */
    /* v148: a heavy ring with nothing inside it, the arrow at its centre, and the errand written round the
       outside in both tongues — the same furniture as the badge it is standing on */
    cdLab.innerHTML = '<svg class="cr" viewBox="0 0 160 160" aria-hidden="true"><defs><path id="curring" d="M80,80 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0"/></defs>' +
      '<text><textPath href="#curring" startOffset="0%" textLength="414" lengthAdjust="spacing"></textPath></text></svg>' +
      '<svg class="ar" viewBox="0 0 26 30" aria-hidden="true"><path d="M13 3 V21.5 M5.5 15 L13 23 L20.5 15"/></svg>';
    cd.appendChild(cdLab);
    function suckHold(t){   /* v153: caught by the badge, and held until the pointer is well clear of it */
      var over = !!(t && t.closest && t.closest('.cta-fx')) && body.classList.contains('past');   /* v269: TOP では丸は隠れている（.past 前）。隠れている間は吸い付かない */
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
      /* v150: the trailing space is stripped in SVG text, so the dot at the seam of the loop sat against the
         first Japanese glyph — non-breaking spaces hold it in the middle, as the other dot is */
      if(tp) tp.textContent = up ? 'ページの先頭へ戻ります \u00b7 BACK TO THE TOP\u00a0\u00b7\u00a0' : '画面下部へ移動します \u00b7 TO THE FOOT OF THE PAGE\u00a0\u00b7\u00a0';
    }
    var parallaxEls = null;
    window.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY; cur.classList.add('on');
      var t = e.target, hov = t && t.closest ? t.closest('a, button, figure, .tl li, .sr li, #seqlist li, .lang') : null;
      cur.classList.toggle('hov', !!hov);
      cur.classList.toggle('onmedia', !!(t && t.closest && t.closest('.vid, .wkf, .marg figure, .hw, #ch5pin .bgph, .wk-mid')));   /* v100: ink-on-ink is invisible over a photo or a video thumbnail */
      suckHold(t);
      if(!body.classList.contains('opening')){
        /* v229: --mx/--my を #top に置くと、継承で配下すべて（楕円の SVG の文字や写真まで）が再計算・再配置される（WebKit で特に重い）。
           題字にはその要素だけに置き、楕円は transform を直接書く */
        var mxv = (mx / window.innerWidth - .5), myv = (my / vh() - .5);
        if(!parallaxEls) parallaxEls = {b:top.querySelectorAll('.name b'), ov:top.querySelector('.ovals')};
        parallaxEls.b.forEach(function(el){ el.style.setProperty('--mx', mxv.toFixed(3)); el.style.setProperty('--my', myv.toFixed(3)); });
        if(parallaxEls.ov && window.innerWidth > 1024) parallaxEls.ov.style.transform = 'translate(-50%,-50%) translate(' + (mxv * -14).toFixed(1) + 'px,' + (myv * -10).toFixed(1) + 'px)';
      }
      if(my < vh() * 1.2){ var tr = top.getBoundingClientRect(), pkEl = window.__peek || top; pkEl.style.setProperty('--px', (mx - tr.left).toFixed(0) + 'px'); pkEl.style.setProperty('--py', (my - tr.top).toFixed(0) + 'px'); }
    }, {passive:true});
    /* a second copy of the hero's grid, masked to a soft circle around the cursor: the hidden grid shows faintly where the mouse is */
    (function(){ var tl = top.querySelector('.lines'); if(!tl) return; var pk = tl.cloneNode(true); window.__peek = pk; pk.classList.add('peek'); pk.setAttribute('aria-hidden', 'true'); var mesh = document.createElement('i'); mesh.className = 'mesh'; pk.insertBefore(mesh, pk.firstChild); top.appendChild(pk); })();
    var c5 = document.getElementById('ch5pin');
    window.addEventListener('mousemove', function(e){ if(c5){ c5.style.setProperty('--sx', (e.clientX / window.innerWidth * 100).toFixed(1) + '%'); c5.style.setProperty('--sy', (e.clientY / vh() * 100).toFixed(1) + '%'); } }, {passive:true});
    window.addEventListener('scroll', function(){ var t = document.elementFromPoint(mx, my); var hov = t && t.closest ? t.closest('a, button, figure, .tl li, .sr li, #seqlist li, .lang') : null; cur.classList.toggle('hov', !!hov); suckHold(t); }, {passive:true});
    document.documentElement.addEventListener('mouseleave', function(){ cur.classList.remove('on'); });
    document.documentElement.addEventListener('mouseenter', function(){ cur.classList.add('on'); });
    (function loop(){
      lx += (mx - lx) * .18; ly += (my - ly) * .18; dx += (mx - dx) * .55; dy += (my - dy) * .55;
      if(suckOn && ctaFx){   /* v148: it really sticks — the dot is pulled onto the badge, and the crosshair follows it in */
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

  /* ---------- section enter: .in ; elements: .io (paragraphs are reversible, like the message) ---------- */
  var secs = document.querySelectorAll('.sp, .pin');
  var ioSec = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); } }); }, {threshold:0, rootMargin:'-12% 0px -12% 0px'});   /* threshold 0: a very tall section (ch6 with the 8 steps) could never reach 15% */
  secs.forEach(function(s){ if(s !== top) ioSec.observe(s); });   /* the hero's lines wait for the opening */
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
  var brBody = document.querySelector('#bridge .br-body'); if(brBody) ioEl.observe(brBody);   /* the bridge's heading waits for its own arrival, not the section's top edge */
  /* every highlight draws itself when it comes into view */
  var ioM = new IntersectionObserver(function(es){ es.forEach(function(e){ var m = e.target; if(e.isIntersecting) m.classList.add('in'); else if(e.boundingClientRect.top > (e.rootBounds ? e.rootBounds.bottom : vh())) m.classList.remove('in'); }); }, {threshold:0, rootMargin:'0px 0px -22% 0px'});
  document.querySelectorAll('mark').forEach(function(m){ if(!m.closest('[data-at]')) ioM.observe(m); });

  /* handwritten headings: play once when the heading comes into view */
  var ioHw = new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var v = e.target; ioHw.unobserve(v); v.closest('.hwv').classList.add('on'); if(reduce){ try{ v.currentTime = 9; }catch(x){} return; } try{ var pr = v.play(); if(pr && pr.catch) pr.catch(function(){}); }catch(x){} }); }, {threshold:.6});
  document.querySelectorAll('.hwv video').forEach(function(v){ ioHw.observe(v); });

  /* chapter number count-up */
  var ioCnt = new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var el = e.target, n = parseInt(el.getAttribute('data-n'),10), k = 0; ioCnt.unobserve(el);
    var t = setInterval(function(){ k++; el.textContent = ('0' + k).slice(-2); if(k >= n) clearInterval(t); }, 90); }); }, {threshold:.5});
  document.querySelectorAll('.cnt').forEach(function(el){ ioCnt.observe(el); });

  /* ---------- scenes: the section under the viewport centre sets body[data-scene] ---------- */
  var curScene = 'paper', curSec = null, curTop = null, curBot = null, secList = Array.prototype.slice.call(secs);
  function sceneUpdate(){
    var H = vh(), mid = H*.5, hit = null, tp = null, bt = null;
    for(var i=0;i<secList.length;i++){ var r = secList[i].getBoundingClientRect();
      if(r.top <= 2 && r.bottom > 2) tp = secList[i];
      if(r.top <= mid && r.bottom > mid) hit = secList[i];
      if(r.top <= H - 2 && r.bottom > H - 2){ bt = secList[i]; break; }   /* the sections are in document order, so the one under the foot of the screen is the last that can matter */
    }
    /* v123: on the phone every chapter paints its own ground, so the middle of the screen is no longer the whole
       truth — the header takes the colour of the chapter behind it, the year and the badge the one at the foot */
    var st = tp && (tp.getAttribute('data-scene') || 'paper'); if(st && st !== curTop){ curTop = st; body.setAttribute('data-scene-top', st); }
    var sb = bt && (bt.getAttribute('data-scene') || 'paper'); if(sb && sb !== curBot){ curBot = sb; body.setAttribute('data-scene-bot', sb); }
    if(!hit || hit === curSec) return; curSec = hit;
    var sc = hit.getAttribute('data-scene') || 'paper';
    if(sc !== curScene){ curScene = sc; body.setAttribute('data-scene', sc);
      var cs0 = getComputedStyle(body), bg0 = cs0.getPropertyValue('--bg') || '';
      document.documentElement.style.backgroundColor = bg0;
      if(window.__setTheme) window.__setTheme(bg0.trim());   /* v239: theme-color も同じ色に */
      if(window.__retint) window.__retint();   /* v242: 帯の色を採り直させる */
      if(window.__rvHide) window.__rvHide();   /* v232: 横向きで章が変わるときは、案内用の帯の色（!important）が残っていれば外す（ハッシュ付きで開くと残ることがあった） */
      /* v212: 横持ちで読んでいる章の色を覚えておく。縦にしたときの案内はこの色で塗る */
      if(!window.matchMedia || window.matchMedia('(orientation:landscape)').matches) window.__landCols = {bg: bg0.trim(), fg: (cs0.getPropertyValue('--fg') || '').trim()};
    }   /* v206: html の地も場面の色に（固定の地の下から紙色が覗かないように） */
    setYear(hit.getAttribute('data-year')); setPlace(hit.getAttribute('data-place') || '');
  }
  /* the small name under the year: the letters scramble and lock in, top to bottom, and the tick is drawn again */
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

  /* ---------- chapter label pinned in the header; switches when the next chapter's label passes under it ---------- */
  var hdSecs = Array.prototype.slice.call(document.querySelectorAll('[data-hd]')), chap = document.getElementById('chap'),
      chapK = chap.querySelector('.k'), chapN = chap.querySelector('.n'), chapT = chap.querySelector('.t'), curHd = null, hdTimer = null;
  function chapUpdate(){
    var line = 46, hit = null;
    for(var i=0;i<hdSecs.length;i++){ var s = hdSecs[i], r = s.getBoundingClientRect(); if(r.top <= line) hit = s; else break; }   /* v93: the section's own top (its label's top came later, so right after a flight the header still named the chapter before) */
    var key = hit ? hit.getAttribute('data-hd') : ''; curSecId = hit ? hit.id : '';
    if(key === curHd) return; curHd = key;
    clearTimeout(hdTimer);
    if(!key){ chap.classList.remove('on'); return; }
    var parts = key.split('|');
    chap.classList.add('sw');
    hdTimer = setTimeout(function(){ chapK.textContent = parts[0] || ''; chapN.textContent = parts[1] || ''; chapT.textContent = (curLang === 'en' && parts[2] && I18N[parts[2]]) ? I18N[parts[2]] : (parts[2] || ''); chap.classList.remove('sw'); chap.classList.add('on'); }, 240);
  }

  /* year odometer */
  var cols = document.querySelectorAll('#od .col'), od = document.getElementById('od');
  cols.forEach(function(c){ var s=''; for(var d=0; d<10; d++) s += '<i>'+d+'</i>'; c.innerHTML = s + '<i>0</i>'; });   /* an extra 0 under the 9: the last digit can roll on round without jumping back */
  var curY = null;
  var odT = 0;
  function wordOut(then){   /* the word (THANK YOU, →) lifts away, then the digits come up from below */
    var ar = od.querySelector('.ar'); ar.classList.add('bye');
    odT = setTimeout(function(){ od.classList.remove('arrow', 'two', 'long'); ar.classList.remove('bye'); cols.forEach(function(c){ c.style.transition = 'none'; c.style.transitionDelay = '0ms'; c.style.transform = 'translateY(1.15em)'; }); void od.offsetWidth; cols.forEach(function(c){ c.style.transition = ''; }); then(); }, 300);
  }
  function setYear(y){
    clearInterval(yrRoll); clearTimeout(yrRoll); clearTimeout(odT);
    var rg = /^(\d{4})-(\d{4})$/.exec(String(y)), ar = od.querySelector('.ar');
    if(rg){ if(y === curY) return; curY = y; var run = function(){ var a = parseInt(rg[1], 10), b = parseInt(rg[2], 10), last = cols[cols.length - 1]; yrSet(a); yrRoll = setTimeout(function(){
        var n = Math.max(1, Math.min(9, b - a)), st = '', i = 0; for(var d = 0; d <= n; d++) st += '<i>' + ((a + d) % 10) + '</i>'; st += '<i>' + (a % 10) + '</i>';   /* the wheel carries only the years of the range, the first again under the last so it turns round without a jump */
        last.innerHTML = st; last.__range = true; last.style.transition = 'none'; last.style.transitionDelay = '0ms'; last.style.transform = 'translateY(0)'; void last.offsetWidth; last.style.transition = '';
        var tick = function(){   /* one year at a time, the same eased roll as when a chapter changes the year, then a pause — a click, not a glide */
          i++; last.style.transform = 'translateY(-' + (i * 1.15) + 'em)';
          if(i > n){ yrRoll = setTimeout(function(){ last.style.transition = 'none'; last.style.transform = 'translateY(0)'; void last.offsetWidth; last.style.transition = ''; i = 0; yrRoll = setTimeout(tick, 320); }, 760); }   /* the duplicate 0 at the bottom, then the real one at the top, unseen */
          else yrRoll = setTimeout(tick, 1080);
        };
        yrRoll = setTimeout(tick, 1080);
      }, 800); };   /* the works' years: 2020 → 2026 → 2020…, the ones digit clicking on like a counter wheel */ if(od.classList.contains('arrow')) wordOut(run); else run(); return; }   /* a span: the works, 2020 → 2026 */
    if(!/^\d{4}$/.test(String(y))){   /* a word instead of a year; two words go on two lines (THANK / YOU) */
      var w = String(y), two = w.length > 4 && w.indexOf(' ') > 0, show = function(){ od.classList.remove('out'); od.classList.add('arrow'); od.classList.toggle('long', w.length > 3); od.classList.toggle('two', two); ar.textContent = two ? w.replace(' ', '\n') : w; };
      if(od.classList.contains('arrow')){ if(y !== curY){ ar.classList.add('bye'); odT = setTimeout(function(){ ar.classList.remove('bye'); show(); }, 300); } }
      else { od.classList.add('out'); odT = setTimeout(show, 360); }   /* the digits roll up and out first */
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

  /* hero rotator */
  var rot = document.getElementById('rot'), rs = rot.querySelectorAll(':scope > span'), ri = 0;
  /* the rotating line is set like the title: kanji and katakana in gothic, hiragana in mincho */
  function mixSet(el){ var t = el.textContent; el.textContent = ''; Array.from(t).forEach(function(ch){ var c = document.createElement('i'); c.className = /[\u3040-\u309F]/.test(ch) ? 'm' : (/[、。]/.test(ch) ? 'm pc' : 'g'); c.textContent = ch; el.appendChild(c); }); }
  rs.forEach(mixSet);
  /* the left label too: 小坂脩蔵 / ポートフォリオ in gothic, の in mincho */
  document.querySelectorAll('#top .lbl b:not(.rj) .ln').forEach(mixSet);
  document.querySelectorAll('.menu .mmsg .txt .mx, #message .mh .mx').forEach(mixSet);
  setInterval(function(){ var a = rs[ri]; ri = (ri+1) % rs.length; var b = rs[ri]; a.classList.remove('cur'); a.classList.add('out'); setTimeout(function(){ a.classList.remove('out'); }, 700); b.classList.add('cur'); }, 2600);

  /* fixed cta after hero */
  var ctEl = document.getElementById('contact');
  /* v217: スマホでは右下のボタンの周りの文字を、役目そのもの（下部へ／上部へ）にする */
  (function(){
    if(!document.documentElement.classList.contains('phone')) return;
    var t1 = document.querySelector('.cta-fx .t1 textPath'), t2 = document.querySelector('.cta-fx .t2 textPath');
    function put(el, ja, en){ if(!el) return; el.textContent = ja; el.__ja = el.innerHTML; el.setAttribute('data-ja', ja); el.setAttribute('data-en', en); }   /* __ja: 言語切替の台帳も差し替える */
    put(t1, 'ページ下部へ移動 \u00b7 TO THE BOTTOM \u00b7 ', 'TO THE BOTTOM \u00b7 SKIP AHEAD \u00b7 ');
    put(t2, 'ページ上部へ移動 \u00b7 TO THE TOP \u00b7 ', 'TO THE TOP \u00b7 BACK TO THE START \u00b7 ');
  })();
  function ctaUpdate(){ body.classList.toggle('past', window.scrollY > vh()*.7); body.classList.toggle('atend', !!ctEl && ctEl.getBoundingClientRect().top < vh() * .55); }   /* at the contact block the round button turns into BACK TO TOP */

  /* pinned sections: progress -> reveals, photos, handwriting video, title drift */
  var pins = document.querySelectorAll('.pin'), hw = document.getElementById('hw'), hwv = document.getElementById('hwv'), hwPlayed = false;

  /* v130: the bar screen changes photograph as you go down it — a row of dots says how many there are and
     which one you are on, the way a counter does */
  pins.forEach(function(pin){
    var n = pin.querySelectorAll('.bgph img').length, st = pin.querySelector('.stick');
    if(!n || !st) return;
    var row = document.createElement('div'); row.className = 'bgdot'; row.setAttribute('aria-hidden', 'true');
    for(var i = 0; i < n; i++) row.appendChild(document.createElement('i'));
    st.appendChild(row);
    /* v244: 丸を押すとその写真の位置へ（写真 i は p ∈ [i/n, (i+1)/n)。その真ん中へ飛ぶ） */
    row.querySelectorAll('i').forEach(function(d, i){ d.style.pointerEvents = 'auto'; d.addEventListener('click', function(){
      var r = pin.getBoundingClientRect(), total = pin.offsetHeight - vh(), y = r.top + window.scrollY + total * ((i + .5) / n);
      if(typeof flyTo === 'function') flyTo(y); else window.scrollTo({top:y, behavior:'smooth'}); }); });
  });
  function pinUpdate(){
    pins.forEach(function(pin){
      var r = pin.getBoundingClientRect(); var total = r.height - vh();
      var p = (-r.top) / total; p = Math.max(0, Math.min(1, p));
      pin.querySelectorAll('[data-at]').forEach(function(el){ var at = parseFloat(el.getAttribute('data-at')), off = el.getAttribute('data-off'); var on = p >= at && (off === null || p < parseFloat(off)); el.classList.toggle('in', on); el.classList.toggle('on', on); });
      var imgs = pin.querySelectorAll('.bgph img');
      if(imgs.length){ var idx = Math.min(imgs.length-1, Math.floor(p * imgs.length * .999)); imgs.forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.spot img').forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.bgdot i').forEach(function(d,i){ d.classList.toggle('on', i === idx); }); }
      if(r.top <= 0 && r.bottom >= vh()){ pin.querySelectorAll('.marg').forEach(function(m){ m.classList.add('in'); }); }
      var st = pin.querySelector('.stick'); if(st){ st.style.setProperty('--pp', p.toFixed(3)); if(pin.id === 'ch1pin'){ st.classList.toggle('ringdone', p * 1.9 >= 1); st.classList.toggle('drawing', p * 1.9 > .012); st.classList.toggle('walk', p * 3.4 >= 1);   /* v261: 輪が描き終わって足跡が歩き出したら、輪の線は消す */   /* v225: 輪も 1.9 倍ゆっくり描く（判や札と同じ歩み） */ dgOn = p * 3.4 >= 1 && r.top < vh() && r.bottom > 0;
        /* the footprints walk in with the scroll and are gone once the ring starts to draw */
        fpFade = Math.max(0, Math.min(1, p / .16)); } if(pin.id === 'ch5map') mapUpdate(p); }
      if(pin.id === 'ch5pin'){ pin.classList.toggle('dotson', r.top <= 0 && r.bottom >= vh()); pin.style.setProperty('--pp', p.toFixed(3)); if(!fine){ pin.style.setProperty('--sx', (30 + p * 40).toFixed(1) + '%'); pin.style.setProperty('--sy', '52%'); } }
      if(pin.id === 'message'){
        var vis = r.top < vh()*.6 && r.bottom > vh()*.4;
        if(vis && !hwPlayed){ hwPlayed = true; hw.classList.add('on'); /* v96f: the handwriting is an animated alpha WebP — assigning the src is what starts it, so it draws itself just as the screen is reached (and nothing is fetched before that) */ if(hwv && hwv.dataset && hwv.dataset.src){ hwv.src = hwv.dataset.src; hwv.removeAttribute('data-src'); } }
        /* v157: these two were fractions of the old 620vh screen. The screen is 840vh now, so in real distance
           the handwriting was still bright when the address arrived (they printed over each other) and the first
           paragraph came while the address was still standing in the middle. Both are back where they were. */
        var ms = document.getElementById('msgstick'); ms.classList.toggle('dim', p >= .10);   /* v231: 手書きは少し早く薄く（最初の文が来るまでの間を詰める） */
        ms.classList.toggle('hold', r.top <= 0 && r.bottom >= vh());
        var wasDone = ms.classList.contains('mdone'), nowDone = r.bottom < vh();
        if(nowDone !== wasDone){ ms.classList.toggle('mdone', nowDone);
          if(nowDone){ var mh = ms.querySelector('.mh3'), op = (mh && mh.offsetParent) || ms, orr = op.getBoundingClientRect();
            ms.style.setProperty('--mcx', (window.innerWidth / 2 - orr.left).toFixed(1) + 'px'); ms.style.setProperty('--mcy', (window.innerHeight / 2 - orr.top).toFixed(1) + 'px'); } }   /* v254: 縦も画面中央からの距離で */   /* v236: 外れた瞬間に、画面中央の位置を「実際の基準の箱」（offsetParent）からの距離で一度だけ測る */
        /* v192: 引き継ぎの一文は、これまで pin が外れた瞬間に（hold が外れて）ぱっと消えていた。
           最後の一割はスクロールに連れて薄くしていき、pin が外れるときにはもう見えていない状態にする。
           時間の遷移ではなくスクロールに紐づけるので、速く送っても途中で切られない。 */
        /* v193: 薄くして消すのはよくない、とのことなので、最後の一割は**紙面と同じ速さで上へ流す**。
           見え方はそのままに、ふつうの本文と同じように画面の上へ抜けていく。pin が外れる頃にはもう画面の外。 */
        var mfs = window.__mFps;
        if(mfs && mfs.length){
          /* v202: 足跡は SCROLL の縦棒の代わりなので、スクロールしなくても歩き続ける（CSS のループ）。
             ここでは「一文の画面に居るか」の出し入れと、終盤に上から一歩ずつ消していく分だけを持つ。 */
          ms.classList.toggle('mwalkon', p >= .858);
          var mOut = Math.round(Math.max(0, Math.min(1, (p - .90) / .10)) * mfs.length);   /* v254: 区間が短くなった分、消し始めを少し早く */
          for(var mi = 0; mi < mfs.length; mi++) mfs[mi].classList.toggle('off', mi < mOut);
        }
        ms.classList.toggle('mtail', p >= .90);   /* v254 */
        hwStill(p >= .10);   /* v230: 薄くなったら手書きのアニメーション WebP を静止画に（ループのデコードで CPU 40% 食っていた） */   /* v179: the last screen is fixed to the viewport — outside the pinned stretch it must not be there at all */
        if(!msgFitDone) msgSoloFit(); ms.classList.toggle('solo', p < .27);   /* v254: 止まりを詰めた分（最初の段落は .30 から） */
        var s2 = p >= .50 && p < .66;   /* v254: 二つ目の見出しは .50 で来て、.68 の段落の少し前に退く */
        if(s2 && !ms.classList.contains('solo2')) msgSoloFit();   /* v172: measured again as it takes the middle — the window may have changed width since the page loaded */
        ms.classList.toggle('solo2', s2);   /* v155: the second address holds the middle of the screen */
        ms.classList.toggle('away2', p >= .66);              /* v254 */
        pin.classList.toggle('gridon', p >= .50);   /* v254: 見出しが来る瞬間に */
        if(p >= .573){ if(!pin.__gt) pin.__gt = setTimeout(function(){ pin.classList.add('gridgone'); }, 5600); }   /* held as long as the opening screen holds it, then let go */
        else { if(pin.__gt){ clearTimeout(pin.__gt); pin.__gt = 0; } pin.classList.remove('gridgone'); }   /* the address alone, large, until the text is due (a good two thirds of a screen of scrolling) */
      }
    });
  }

  /* where the large, solo address sits: centred on the screen, a little above the middle; scaled to fit between X1 and X4 */
  var msgFitDone = false;
  function msgSoloFit(){
    var st = document.getElementById('msgstick'); if(!st) return;
    var mhs = st.querySelectorAll('.mh'); if(!mhs.length) return;
    /* v155: both addresses are measured — the second one (わたしは、グリッドシステムが、大好きです。) takes the
       middle of the screen the same way the first does, and is then drawn back into the distance */
    Array.prototype.forEach.call(mhs, function(mh){
      var x = 0, y = 0, el = mh; while(el && el !== st){ x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
      var W = st.clientWidth, H = st.clientHeight, tw = 0;
      mh.querySelectorAll(':scope > span').forEach(function(sp){ tw = Math.max(tw, sp.offsetWidth); }); if(!tw) tw = mh.offsetWidth;
      var ph = window.innerWidth <= 1024;   /* v96: on the phone and portrait tablet the solo address fills the width edge to edge, then settles */
      var s = Math.max(1, Math.min(1.5, (W * (ph ? .97 : .71) - 16) / Math.max(1, tw)));
      mh.style.setProperty('--ss', s.toFixed(3)); mh.style.setProperty('--sdx', (W / 2 - (x + mh.offsetWidth / 2)).toFixed(1) + 'px');
      if(mh.classList.contains('mh2')){
        /* v160: this one hangs from the grid's own second rule — the page is talking about grids, so it sits on one.
           It scales about its middle, so the visual top is centre − s·h/2. */
        var y2 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--y2')) || 32, h2 = mh.offsetHeight;
        mh.style.setProperty('--sdy', (H * (y2 / 100 + .06) - y + h2 * (s - 1) / 2).toFixed(1) + 'px');   /* v181: a little below the rule, not hanging from it */
      } else {
        mh.style.setProperty('--sdy', (H * .5 - s * mh.offsetHeight / 2 - y).toFixed(1) + 'px');   /* v184: the same height as the middle of the dots at the left edge */   /* centred on the screen, a little below the middle; it scales about its own centre, so it settles straight down */
      }
    });
    msgFitDone = true;
  }
  window.addEventListener('resize', function(){ msgFitDone = false; soloReset(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ msgFitDone = false; soloReset(); setTimeout(onScroll, 50); });

  /* ch7: a subhead alone in the middle of the screen (large, like the address), then it settles and its paragraphs come in with the scroll */
  var solos = Array.prototype.slice.call(document.querySelectorAll('.solopin'));
  function soloReset(){ solos.forEach(function(sp){ sp.__fit = false; }); }
  function soloFit(sp){
    var st = sp.querySelector('.stick'), sub = sp.querySelector('.sub'), sq = sp.querySelector('.sq'); if(!st || !sub) return;
    var W = window.innerWidth, H = vh(), sl = st.getBoundingClientRect().left;
    if(sq){ sq.style.marginLeft = ((W / 2 - sl) - sq.offsetWidth / 2).toFixed(1) + 'px'; }   /* the text column on the screen's centre line: the heading settles straight up into it */
    var x = 0, y = 0, el = sub; while(el && el !== st){ x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    var tw = sub.offsetWidth, h = sub.offsetHeight;
    var s = 1;   /* the subheads already carry a chapter title's size: the solo screen only moves them, on to the screen's own centre */
    sub.style.setProperty('--ss', s.toFixed(3)); sub.style.setProperty('--sdx', (W / 2 - (sl + x + tw / 2)).toFixed(1) + 'px'); sub.style.setProperty('--sdy', (H * .5 - s * h / 2 - y).toFixed(1) + 'px');
    sp.style.setProperty('--scx', (W / 2 - sl).toFixed(1) + 'px'); sp.style.setProperty('--sty', (H * .5 - s * h / 2).toFixed(1) + 'px'); sp.style.setProperty('--sby', (H * .5 + s * h / 2).toFixed(1) + 'px');   /* the seals' rows: centred, one just above the heading and one just below */
    /* each seal's two places (stick coordinates): its row on the solo screen, and its spot at the side — four down the left edge, four down the right — once the heading has settled */
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
    sp.__fit = true;
  }
  function soloUpdate(){
    solos.forEach(function(sp){
      var r = sp.getBoundingClientRect(), total = Math.max(1, r.height - vh()), p = (-r.top) / total; p = Math.max(0, Math.min(1, p)); if(reduce) p = 1;
      if(!sp.__fit) soloFit(sp);
      var soloAt = parseFloat(sp.getAttribute('data-solo')); if(isNaN(soloAt)) soloAt = .5;
      sp.classList.toggle('solo', p < soloAt);   /* v131: the section can say where its heading settles — the length of these screens is not the same any more */
      sp.querySelectorAll('[data-at]').forEach(function(el){
        /* v117: a little hysteresis — right on the threshold the smallest nudge of the wheel was switching these
           on and off again, and the seal blinked. Once shown, it takes a clear step back to put it away. */
        var at = parseFloat(el.getAttribute('data-at')), was = el.classList.contains('on');
        var on = was ? p >= at - .035 : p >= at;
        el.classList.toggle('in', on); el.classList.toggle('on', on);
      });
      var fx = sp.getAttribute('data-fx');
      if(fx === 'scramble' && sp.__chs){
        /* AIとツクる: the heading is found among glyphs that keep changing (the options AI throws up); with the scroll they are settled one by one, left to right, and the choice stands */
        var resAt = parseFloat(sp.getAttribute('data-res')); if(isNaN(resAt)) resAt = .4;
        var n = sp.__chs.length, res = (reduce || p >= resAt) ? n : Math.floor(p / resAt * n), H = vh(), st = sp.querySelector('.stick'), stTop = st ? st.getBoundingClientRect().top : r.top;
        var q = Math.max(0, Math.min(1, (H - r.top) / (H * .7))), leave = Math.max(0, Math.min(1, -stTop / (H * .45))), vis = r.top < H && r.bottom > 0 && q > 0 && leave < 1;   /* the code comes in with the scroll as the heading approaches, stays through the text, and goes as the screen is pushed off by ゼンブ持って */
        if(res !== sp.__res){ sp.__res = res; scrambleSet(sp, res); }
        sp.__cq = q * (1 - leave) * (res >= n ? .75 : 1);
        sp.classList.toggle('coding', vis);
        if(vis && !sp.__tick) sp.__tick = setInterval(function(){ if(sp.__res < n) scrambleSet(sp, sp.__res); codeDraw(sp, sp.__res, n); }, 90);
        if(!vis && sp.__tick){ clearInterval(sp.__tick); sp.__tick = 0; scrambleSet(sp, sp.__res); }
      }
      if(fx === 'seals'){
        var s0 = parseFloat(sp.getAttribute('data-seal0')); if(isNaN(s0)) s0 = .22;
        var sstep = parseFloat(sp.getAttribute('data-sealstep')); if(isNaN(sstep)) sstep = .03;
        sp.querySelectorAll('.seals i').forEach(function(it, i){ it.classList.toggle('in', reduce || p >= s0 + i * sstep); }); }   /* a quick run of eight, once the previous text has left the screen */
    });
  }
  /* code runs over the whole screen while AIとツクる is still undecided: lines of make-believe source, rewritten a few at a time on each tick of the scramble */
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
    for(var i = 0; i < rows; i++){ var y = i * lh + 8; ctx.globalAlpha = (y > sty - 34 && y < sby + 22 ? .08 : .3) * fade; for(var c = 0; c < cols; c++){ ctx.textAlign = c ? 'right' : 'left'; ctx.fillText(lines[i * cols + c], c ? W - 24 : 24, y); } }   /* two columns on a wide screen, so the right half is written over as well */
    ctx.globalAlpha = 1;
  }
  var SCR_KJ = '選択案形色線余白判図手目場人道具構成次世界理由決', SCR_KN = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンツクルジブンセカイデザイン', SCR_LA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', SCR_la = 'abcdefghijklmnopqrstuvwxyz';
  function scrGlyph(c){ var t = c.__t, pool = /[\u4E00-\u9FFF]/.test(t) ? SCR_KJ : /[\u3040-\u30FF]/.test(t) ? SCR_KN : /[A-Z]/.test(t) ? SCR_LA : /[a-z]/.test(t) ? SCR_la : ''; return pool ? pool.charAt(Math.floor(Math.random() * pool.length)) : t; }
  function scrambleSet(sp, res){ sp.__chs.forEach(function(c, i){ if(i < res){ if(c.textContent !== c.__t) c.textContent = c.__t; c.classList.remove('alt'); } else { c.textContent = scrGlyph(c); c.classList.add('alt'); } }); }
  /* ゼンブ持って: the rally's seven seals, small, under the heading */
  function soloSealsBuild(){
    document.querySelectorAll('.solopin[data-fx="seals"] .seals').forEach(function(box){
      var up = box.querySelector('.up'), dn = box.querySelector('.dn'); if(!up || !dn) return;
      while(up.firstChild) up.removeChild(up.firstChild); while(dn.firstChild) dn.removeChild(dn.firstChild);
      var ai = document.createElement('li'); ai.setAttribute('data-en', 'MAKE WITH AI'); ai.setAttribute('data-place', 'AI'); ai.setAttribute('data-year', '2026'); ai.setAttribute('data-ring', 'MAKE WITH AI \u00b7 THE CHOICE IS MINE \u00b7 2026 \u00b7 KOSAKA');   /* the eighth seal: what he takes along besides the seven */
      var items = srItems.slice(0, 7).concat([ai]);
      items.forEach(function(li, i){ var it = document.createElement('i'); it.style.setProperty('--rot', (((i % 3) - 1) * 6 - 2) + 'deg'); it.appendChild(stampSvg(li, i)); (i < 4 ? up : dn).appendChild(it); });
    });
    soloReset();   /* new seals: their places are measured again on the next scroll */
  }

  /* ch2 translation wipe */
  var wipes = Array.prototype.slice.call(document.querySelectorAll('.wipe'));
  function wipeUpdate(){
    var start = vh()*.85, end = vh()*.3;
    if(window.innerWidth <= 1024){ start = vh()*.95; end = vh()*.62; }   /* v95: on a phone the sweep starts at the fold and finishes early — the half-translated state is brief */
    wipes.forEach(function(wipe){
      var ja = wipe.querySelector('.ja'); if(!ja) return;
      var r = wipe.getBoundingClientRect(), p = (start - r.top) / (start - end); p = Math.max(0, Math.min(1, p)); if(reduce) p = 1;
      ja.style.clipPath = 'inset(0 ' + ((1-p)*100).toFixed(1) + '% 0 0)';
    });
  }

  /* ch6 step sequence (8 steps, clickable) */
  var STEPS = 8, seq = document.getElementById('seq'), items = document.querySelectorAll('#seqlist li'), dot = document.getElementById('seqdot'), hint = document.getElementById('seqhint'), lastStep = -1;
  function seqUpdate(){
    var r = seq.getBoundingClientRect(); var total = r.height - vh();
    var p = (-r.top) / total; p = Math.max(0, Math.min(1, p));
    var step = Math.min(STEPS, Math.max(1, Math.floor(p * STEPS) + 1));
    if(r.top > vh()) step = 0;
    body.classList.toggle('inseq', r.top <= vh()*.3 && r.bottom >= vh()*.7);
    if(step !== lastStep){
      seq.classList.toggle('back', step < lastStep);   /* going back up: no staggered delays */
      lastStep = step;
      for(var k=1;k<=STEPS;k++) seq.classList.toggle('s'+k, step >= k);
      var prevLi = seq.querySelector('#seqlist li.act');
      items.forEach(function(li,i){ li.classList.toggle('act', i === step-1); li.classList.toggle('done', i < step-1); });
      if(step >= 1){ seqDot(items[step-1], prevLi); setTimeout(function(){ if(lastStep === step) seqDot(items[step-1]); }, 650); hint.textContent = 'SCROLL · 0' + step + ' / 0' + STEPS; }
      if(step === 5) countUp(); else if(step < 5) seq.querySelectorAll('text.pct[data-v]').forEach(function(t){ t.textContent = '0'; }); else seq.querySelectorAll('text.pct[data-v]').forEach(function(t){ t.textContent = t.getAttribute('data-v'); });
    }
  }
  /* the 朱 dot sits on the centre of the active item's title (measured again once the size transition has settled) */
  function seqDot(li, prev){
    var st = li.querySelector('strong'); if(!st) return;
    var top = li.offsetTop, big = 26 * 1.4, small = 18 * 1.4;
    if(prev && prev !== li && (prev.compareDocumentPosition(li) & Node.DOCUMENT_POSITION_FOLLOWING)){
      /* the item above is still expanded when this runs: subtract what it is about to lose (its description and its larger title), so the dot goes straight to where the title will settle */
      var sp = prev.querySelector('span'), ps = prev.querySelector('strong');
      top -= (sp ? sp.offsetHeight + 8 : 0) + (ps ? Math.max(0, ps.offsetHeight - small) : 0);
    }
    var h = prev === undefined ? st.offsetHeight : big;   /* the settled call measures; the predicting call assumes the enlarged title */
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
  function goStep(n){
    var r = seq.getBoundingClientRect(), total = r.height - vh();
    var y = window.scrollY + r.top + total * ((n - 1) / STEPS + .5 / STEPS);
    window.scrollTo({top: Math.round(y), behavior: reduce ? 'auto' : 'smooth'});
  }
  /* v186: the grid lines are drawn by shrinking stroke-dashoffset over a stroke-dasharray of 1 against
     pathLength="1" — one dash the length of the whole line. But the stroke is vector-effect:non-scaling-stroke,
     and Blink measures that dash in the figure's own units while stroking it in screen pixels. On a wide screen
     (an iMac) the figure is scaled up past 1, so the dash is shorter than the line it has to cover: the drawn
     line stops before the frame, and the *next* dash of the repeat pokes out at the far end while the line is
     still meant to be hidden. Feeding the figure's real scale in as --sc makes the dash the line's own screen
     length again, at any size; --sc4 keeps the following dash four lengths away, well off the figure. */
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

  /* ch4 annotation overlay — v133: the labels belong to 世の中全部、デザインじゃん。 and must not be seen anywhere
     else. They are position:fixed, so without this they simply stayed on the screen for their 3.8s while the
     reader scrolled on, and were last seen floating over the closing screen. Now they follow the thing they
     point at, hide when it leaves, and are cleared the moment ch4 is no longer the screen you are on. */
  var shown = false, annoLive = [], annoRaf = 0, annoT = 0;
  function annoClear(){
    clearTimeout(annoT); annoT = 0;
    if(annoRaf){ cancelAnimationFrame(annoRaf); annoRaf = 0; }
    annoLive.forEach(function(o){ o.el.classList.remove('on'); var el = o.el; setTimeout(function(){ el.remove(); }, 600); });
    annoLive = [];
  }
  function annoHere(){
    if(body.classList.contains('opening') || document.getElementById('ld')) return false;   /* v140: a reload keeps the scroll position, so the opening was being annotated */
    var s = document.getElementById('ch4'); if(!s) return false; var r = s.getBoundingClientRect(), H = vh(); return r.top < H * .65 && r.bottom > H * .35;
  }
  /* v140: the point is pricked on the thing itself — centre for a mark, the first line for a block of text */
  function annoAt(el, mode){
    var r = el.getBoundingClientRect();
    if(mode === 'line') return {x: r.left + 4, y: r.top + Math.min(20, r.height / 2)};
    if(mode === 'corner') return {x: r.left + r.width / 2, y: r.top + 12};
    /* 'far' and 'centre' are both the middle of the mark; only the length of the leader differs */
    return {x: r.left + r.width / 2, y: r.top + r.height / 2};
  }
  /* v140: reaching this chapter, the page shows its own grid for a few seconds — the lines and their names */
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
      o.el.style.left = Math.round(p.x) + 'px'; o.el.style.top = Math.round(p.y) + 'px';   /* v219: 小数位置は縁が揺れて見える */
      if(o.m === 'centre' || o.m === 'far') o.el.classList.toggle('lft', p.x > W * .55);   /* a mark: the card is laid out to whichever side has room */
      o.el.classList.toggle('gone', r.bottom < 8 || r.top > H - 8 || p.y < 26 || p.y > H - 14);   /* what it points at has left the screen */
    });
    annoRaf = requestAnimationFrame(annoFollow);
  }
  function annotate(){
    if(window.innerWidth < 768 || !annoHere()) return false;   /* v136: tablets see them too — they were shut out at 1024, which is most of an iPad held upright */
    annoClear();
    /* v134: the five were fixed picks, and by the time the sentence came round the title and the first
       paragraph had usually gone off the top — their labels were clamped to y=8, behind the header, and only
       one or two were ever seen. Each label now takes the first of its candidates that is actually on screen. */
    var H = vh();
    function seen(el){ if(!el) return null; var r = el.getBoundingClientRect(); return (r.width && r.top > 64 && r.bottom < H - 24) ? el : null; }
    function pick(list){ for(var i = 0; i < list.length; i++){ var el = seen(typeof list[i] === 'string' ? document.querySelector(list[i]) : list[i]); if(el) return el; } return null; }
    var trigP = trig ? (trig.closest('p') || trig) : null, mid = H / 2;
    var figs = Array.prototype.slice.call(document.querySelectorAll('#ch4 .marg img, #ch4 figure img')).filter(seen)
      .sort(function(a, b){ var d = function(e){ var r = e.getBoundingClientRect(); return Math.abs(r.top + r.height / 2 - mid); }; return d(a) - d(b); });
    var targets = [
      [document.querySelector('.brand img'), 'ロゴ「小」 朱 #E84518', 'far'],   /* the leader runs past the name, so the card hides nothing */
      [pick(['#ch4 .ttl', '#ch4 .sub', '#ch4 h3']), 'Zen Old Mincho 700 · 見出し · X1', 'line'],
      [pick([trigP, '#ch4 .body p']), '本文 17px · 行間 2.05 · X2', 'line'],
      [document.getElementById('od'), 'IBM Plex Mono · 副次要素 X4', 'centre'],
      [figs[0] || null, '図版 · 副次要素の欄', 'corner']
    ];
    targets.forEach(function(t, i){
      if(!t[0]) return; var r = t[0].getBoundingClientRect(); if(r.bottom < 0 || r.top > vh()) return;
      /* v137: the label is drawn the way a note is made on a proof — a point is pricked on the thing itself,
         a leader is ruled out from it, and the card opens along that line. It closes in the reverse order. */
      var a = document.createElement('div'); a.className = 'anno';
      a.appendChild(document.createElement('i'));
      var tx = document.createElement('span'); tx.textContent = t[1]; a.appendChild(tx);
      var p = annoAt(t[0], t[2]);
      a.style.left = p.x.toFixed(1) + 'px'; a.style.top = p.y.toFixed(1) + 'px';
      if(t[2] === 'centre' || t[2] === 'far'){ if(p.x > window.innerWidth * .55) a.classList.add('lft'); if(t[2] === 'far') a.classList.add('far'); }
      else a.classList.add('up');   /* over text and figures the card stands above the point, so nothing is covered */
      body.appendChild(a); annoLive.push({el:a, t:t[0], m:t[2]}); setTimeout(function(){ a.classList.add('on'); }, 120 + i*160);
    });
    if(!annoLive.length) return false;
    gridFlash();
    annoRaf = requestAnimationFrame(annoFollow);
    annoT = setTimeout(annoClear, 7000);   /* v136: 3.8s was gone before it was noticed */
    return true;
  }
  /* the trigger: threshold 1 asked for the whole sentence to be on screen at once — with the page moving under
     inertia that often never happened, and the one chance was spent anyway (shown was set before the labels were
     drawn, so a run that drew nothing could never be retried). Now it fires when the sentence is in the middle
     band of the screen, and the flag is only spent on a run that actually put labels up. */
  var trig = document.getElementById('annot-trigger');
  if(trig) new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting && !shown) setTimeout(function(){ if(!shown && annotate()) shown = true; }, 240); });
  }, {threshold:0, rootMargin:'-25% 0px -25% 0px'}).observe(trig);
  var again = document.getElementById('annot-again'); if(again) again.addEventListener('click', annotate);   /* v126: the button itself is gone — the annotation runs when the sentence is reached */

  /* works shuffle */
  var wk = document.getElementById('wk'), tiles = wk ? Array.prototype.slice.call(wk.querySelectorAll('a:not(.wkf)')) : [];   /* the old shuffling grid; the flowing frames of v74 are left alone */
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

  /* lightbox (FLIP from the thumbnail) */
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
    if(typeof annoClear === 'function') annoClear();   /* v269: 世の中全部、デザインじゃん。の注釈の札は、写真を開いたら畳む */
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

  /* scroll loop */
  var ticking = false;
  /* ---------- 人生のチェックポイント = スタンプラリー: the route fills and 朱 stamps are pressed as you scroll ---------- */
  var sr = document.getElementById('sr'), srItems = [], srAt = [], srL = 0, srProg = null, srHead = null, srSvg = null, srn = document.getElementById('srn'), srdone = document.getElementById('srdone');
  function svgEl(n, at){ var e = document.createElementNS('http://www.w3.org/2000/svg', n); for(var k in at) e.setAttribute(k, at[k]); return e; }
  /* v190: Safari は SVG の *中* の要素に CSS の mask を掛けても描かない（HTML の要素や <svg> 自体には効く。
     実機 26.4 で確認）。図・地図・扉の判は SVG の <g> なので、同じ紙目を SVG の <mask> として組み立てて掛ける。
     紙目の粗さは HTML の判（96px）に合わせたいので、その SVG の拡大率から逆算する。 */
  var inkmN = 0;
  function inkSealTex(){
    if(!document.documentElement.classList.contains('is-webkit')) return;
    var probe = document.querySelector('.chseal, #mseals .st, .sr .st'); if(!probe) return;
    var cs = getComputedStyle(probe), mi = cs.maskImage || cs.webkitMaskImage || '';
    var mm = mi.match(/url\(["']?([^"')]+)["']?\)/); if(!mm) return;   /* 1 枚版はデータ URI、公開版は assets/img/…。解決済みの絶対 URL がここで手に入る */
    var url = mm[1];
    /* v220: 紙目の絵を一度だけ読み込む。届く前に呼ばれたら、届いてからやり直す */
    if(!inkSealTex.img || inkSealTex.img.src !== url){
      var im0 = new Image(); im0.onload = function(){ inkSealTex.ready = true; inkSealTex(); }; im0.src = url; inkSealTex.img = im0; inkSealTex.ready = im0.complete && im0.naturalWidth > 0;
    }
    if(!inkSealTex.ready) return;
    var tex = inkSealTex.img, N = tex.naturalWidth || 96, dpr = Math.min(2, window.devicePixelRatio || 1);
    /* .oval の「seal」は判ではなく、楕円の枠と、その縁に沿った文字（デザイナーとして／こさか しゅうぞう）。
       群ごと紙目を掛けると小さな文字が潰れて読めなくなるので、枠の線だけに掛ける。 */
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
      /* 判ひとつにつきフィルタひとつ。feTile は使わない（原点から遠い判が丸ごと消え、継ぎ目が白い十字に出た）。
         v220: 以前は 96px の紙目を判の枠いっぱいに一枚引き伸ばしていたので、大きな判ほど紙目が粗く（まだらに）なり、
         HTML の判（CSS マスク、96px で敷き詰め）と質感が揃わなかった。
         いまは画面上の 96px 周期で敷き詰めた絵を canvas で作り、その一枚を枠いっぱいに貼る。縮尺は CSS マスクと同じになる。 */
      var vb = svg.viewBox && svg.viewBox.baseVal, sr = svg.getBoundingClientRect();
      var sc = (vb && vb.width && sr.width) ? sr.width / vb.width : 1;          /* 1 ユーザー単位が画面で何 px か */
      var px = bb.width * .08, py = bb.height * .08;                             /* 線の太さの分だけ枠より外へ */
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
          var ctx = c.getContext('2d'), k = 96 * dpr / N;                       /* 紙目 1 枚 = 画面 96px（CSS マスクと同じ） */
          ctx.scale(k, k);
          var pat = ctx.createPattern(tex, 'repeat');
          if(pat){
            var ox = (gi * 37) % 96 / k, oy = (gi * 53) % 96 / k;               /* 判ごとに位相をずらす */
            ctx.translate(-ox, -oy); ctx.fillStyle = pat; ctx.fillRect(0, 0, W / k + ox + 1, H / k + oy + 1);
          }
          var du = c.toDataURL('image/png');
          im2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', du); im2.setAttribute('href', du); im2.setAttribute('data-key', key);
        }
        im2.setAttribute('x', rx.toFixed(1)); im2.setAttribute('y', ry.toFixed(1)); im2.setAttribute('width', rw.toFixed(1)); im2.setAttribute('height', rh.toFixed(1));
      }
      if(g.getAttribute('mask')) g.removeAttribute('mask');
      /* 元の filter は html.is-webkit の規則で none にされている（生の feTurbulence が重いため）。
         id を差し替えればその規則に当たらなくなり、こちらが効く。id を ink… で始めないこと。 */
      if(g.getAttribute('filter') !== 'url(#' + id + ')') g.setAttribute('filter', 'url(#' + id + ')');
    });
  }
  /* v222: WebKit では地図の印（到着印 6 つと、バンコクの判）を一度だけ canvas に描き、<image> で置く。
     SVG フィルタ（紙目）は、別レイヤーに分けても飛行機が動くたびに掛け直されて 36fps 止まりだった。絵にすれば 60fps。
     文字は stampG と同じ書体・寸法で描く（canvas は読み込み済みのウェブフォントを使える）。紙目は inkSealTex と同じ 96px 周期 */
  function mapSealRaster(){
    if(!document.documentElement.classList.contains('is-webkit')) return;
    var host = document.getElementById('mpseals'); if(!host) return;
    if(!inkSealTex.ready){ clearTimeout(mapSealRaster.t); mapSealRaster.t = setTimeout(mapSealRaster, 150); return; }
    if(document.fonts && document.fonts.status !== 'loaded'){ document.fonts.ready.then(function(){ mapSealRaster(); }); return; }
    var tex = inkSealTex.img, N = tex.naturalWidth || 96, dpr = Math.min(2, window.devicePixelRatio || 1);
    var vb = host.viewBox && host.viewBox.baseVal, hr = host.getBoundingClientRect();
    var sc = (vb && vb.width && hr.width) ? hr.width / vb.width : 1; if(!hr.width) return;
    var cs = getComputedStyle(document.documentElement);
    var acc = (getComputedStyle(host).getPropertyValue('--acc') || cs.getPropertyValue('--acc') || '#FF6A3D').trim();   /* v233: 場面に依らず、地図の朱 */
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
      /* 環の文字：左端から時計回り（SVG の textPath と同じ向き・始点） */
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
      /* 紙目：画面 96px 周期で敷き詰め、判の絵をその形に抜く */
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
  /* v223: 汎用 — SVG の判（rect / circle / text / textPath）を canvas に描き、紙目を抜いて <image> で置く。
     書体・色・太さは computed style から取る（ページのウェブフォントがそのまま使える） */
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
    /* 紙目：画面 96px 周期で敷き詰め、判の絵をその形に抜く（判ごとに位相をずらす） */
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
      var wasHidden = g.classList.contains('rastered'); if(wasHidden) g.classList.remove('rastered');   /* 測るために一度見せる */
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
  /* v229: 画面の外の章は .inview を外し、CSS でアニメーションを止める */
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
  /* a round 朱 seal as an SVG group, centred on 0,0 (radius r) */
  function stampG(r, ring, center, sub, seed){
    var g = svgEl('g', {class:'seal'}), id = 'sealf' + seed;
    g.__spec = {r:r, ring:ring, center:center, sub:sub};   /* v222: WebKit で canvas に描き直すための元データ */
    g.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (seed + 7) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter>' +
      '<path id="ringp' + seed + '" d="M 0 0 m ' + (-r * .8) + ' 0 a ' + (r * .8) + ' ' + (r * .8) + ' 0 1 1 ' + (r * 1.6) + ' 0 a ' + (r * .8) + ' ' + (r * .8) + ' 0 1 1 ' + (-r * 1.6) + ' 0"/></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)"><circle r="' + r + '" stroke-width="' + (r * .045) + '"/><circle r="' + (r * .64) + '" stroke-width="' + (r * .02) + '"/>' +
      '<text font-family="var(--mono)" font-size="' + (r * .13) + '" font-weight="500" letter-spacing="' + (r * .028) + '" fill="var(--acc)" stroke="none"><textPath href="#ringp' + seed + '" startOffset="1%">' + ring + '</textPath></text>' +
      '<text y="' + (sub ? r * .04 : r * .12) + '" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (r * .3) + '" fill="var(--acc)" stroke="none">' + center + '</text>' +
      (sub ? '<text y="' + (r * .34) + '" text-anchor="middle" font-family="var(--mono)" font-size="' + (r * .12) + '" letter-spacing="' + (r * .02) + '" fill="var(--acc)" stroke="none">' + sub + '</text>' : '') + '</g>';
    return g;
  }
  /* ---------- CHECKPOINT 05 · the map: the route is flown as you scroll, the plane lands in Bangkok and the seal is pressed ---------- */
  var mp = document.querySelector('#ch5map .mp'), mpProg = document.getElementById('mpprog'), mpPlane = document.getElementById('mpplane'), mpStops = document.querySelectorAll('#mpsvg .stop'), mpL = 0, mpStopAt = [], mpSeals = [];
  if(mp && mpProg){
    mpL = mpProg.getTotalLength();
    /* distance along the route at which each stop is reached: nearest point search */
    mpStopAt = Array.prototype.map.call(mpStops, function(st){ var c = st.querySelector('circle'), cx = +c.getAttribute('cx'), cy = +c.getAttribute('cy'), best = 0, bd = 1e9; for(var l = 0; l <= mpL; l += 4){ var q = mpProg.getPointAtLength(l), d = (q.x - cx) * (q.x - cx) + (q.y - cy) * (q.y - cy); if(d < bd){ bd = d; best = l; } } return best; });
    window.__mapStamp = function(){ var stampHost = document.getElementById('mpstamp'); if(!stampHost) return; while(stampHost.firstChild) stampHost.removeChild(stampHost.firstChild); stampHost.appendChild(svgEl('circle', {r:80, class:'mp-back'})); stampHost.appendChild(stampG(72, 'BANGKOK \u00b7 INTERNSHIP \u00b7 3 MONTHS \u00b7 2025 \u00b7 ', curLang === 'en' ? 'Bangkok' : 'バンコク', 'INTERN', 21));  if(window.__inkSealTex) window.__inkSealTex(); if(window.__mapSealRaster) setTimeout(window.__mapSealRaster, 0);};   /* a faint paper disc quiets the seals piling up under it */
    window.__mapStamp();
    /* arrival seals: one per country (the start has none) */
    var CTRY = [null, ['KOREA', 'KR'], ['THAILAND', 'TH'], ['VIETNAM', 'VN'], ['CAMBODIA', 'KH'], ['SINGAPORE', 'SG'], ['MALDIVES', 'MV']];
    mpStops.forEach(function(st, i){
      if(!CTRY[i]) return;
      var c = st.querySelector('circle'), cx = +c.getAttribute('cx'), cy = +c.getAttribute('cy');
      var wrap = svgEl('g', {transform:'translate(' + cx + ',' + cy + ')'}), inner = svgEl('g', {class:'mini', style:'--rot:' + ((i * 37) % 17 - 8) + 'deg'});
      inner.appendChild(stampG(22, CTRY[i][0] + ' \u00b7 ARRIVAL \u00b7 ' + CTRY[i][0] + ' \u00b7 ', CTRY[i][1], null, 40 + i));
      wrap.appendChild(inner); st.classList.add('sealed');
      /* v221: 印は別の svg（#mpseals）に置く。飛行機の描き直しに巻き込まれない */
      var host = document.querySelector('#mpseals .stops');
      if(host){ var sx = svgEl('g', {class:'stop sealed', 'data-i':i}); sx.appendChild(wrap); host.appendChild(sx); mpSeals[i] = sx; } else st.appendChild(wrap);
    });
  }
  function mapUpdate(p){
    if(!mp || !mpProg) return;
    mp.classList.toggle('on', p > 0.005);
    var f = Math.max(0, Math.min(1, (p - .08) / .68));           /* the flight takes the middle of the pin */
    mpProg.style.strokeDashoffset = (1 - f).toFixed(4);   /* inline style: the stylesheet's dashoffset would beat a presentation attribute */
    var head = f * mpL, q = mpProg.getPointAtLength(head), q2 = mpProg.getPointAtLength(Math.min(mpL, head + 1)), ang = Math.atan2(q2.y - q.y, q2.x - q.x) * 180 / Math.PI;
    mpPlane.setAttribute('transform', 'translate(' + q.x.toFixed(1) + ',' + q.y.toFixed(1) + ') rotate(' + (ang + 90).toFixed(1) + ') scale(1.1) translate(-12,-12)');
    mp.classList.toggle('fly', f > 0 && f < 1);
    mpStops.forEach(function(st, i){ var on = head >= mpStopAt[i] - 2; st.classList.toggle('on', on); if(mpSeals[i]) mpSeals[i].classList.toggle('on', on); });
    mp.classList.toggle('landed', f >= 1);
    /* v95: on a phone the map is larger than the screen and the camera follows the plane (a nod to the horizontally travelling magazine spreads) */
    var svg = document.getElementById('mpsvg'), lsvg = document.querySelector('#ch5map .mp-land'), ssvg = document.getElementById('mpseals');
    if(svg){
      if(window.innerWidth <= 1024){
        var vb = svg.viewBox.baseVal, sw = svg.clientWidth, sh = svg.clientHeight;
        if(vb && vb.width && sw){
          var px = (q.x - vb.x) * (sw / vb.width), py = (q.y - vb.y) * (sh / vb.height);
          var vw = window.innerWidth, vhp = window.innerHeight;
          var tx = Math.max(0, Math.min(sw - vw, px - vw * .5));
          var ty = Math.max(0, Math.min(Math.max(0, sh - vhp * .64), py - vhp * .42));
          /* a transform (not left/top) so the CSS transition glides the map between scroll steps, and the compositor does the work */
          svg.style.transform = 'translate3d(' + (-tx).toFixed(1) + 'px,' + (Math.round(vhp * .16) - ty).toFixed(1) + 'px,0)';
          if(lsvg) lsvg.style.transform = svg.style.transform;
          if(ssvg) ssvg.style.transform = svg.style.transform;   /* the head's band stays clear above */
        }
      } else { svg.style.transform = ''; svg.style.left = ''; svg.style.top = ''; if(lsvg) lsvg.style.transform = ''; if(ssvg) ssvg.style.transform = ''; }
    }
  }
  /* footprints walking along a path: alternating left/right soles, rotated to the direction of travel, appearing one after another */
  var SOLE = 'M0,-6.2 C2.6,-6.2 3.6,-3.4 3.4,-1 C3.2,1.2 2.2,2.2 2.2,3.6 C2.2,5.2 1.2,6.4 0,6.4 C-1.2,6.4 -2.2,5.2 -2.2,3.6 C-2.2,2.2 -3.2,1.2 -3.4,-1 C-3.6,-3.4 -2.6,-6.2 0,-6.2 Z';
  var FP_SIZE = 1.45, FP_STEP = 30;   /* sole scale (screen px) and stride */
  var PAW = 'M-3.6,2.6 a3.6,3.1 0 1 0 7.2,0 a3.6,3.1 0 1 0 -7.2,0 Z M-6.2,-2.2 a1.5,1.7 0 1 0 3,0 a1.5,1.7 0 1 0 -3,0 Z M-2.6,-4.6 a1.4,1.6 0 1 0 2.8,0 a1.4,1.6 0 1 0 -2.8,0 Z M0.6,-4.6 a1.4,1.6 0 1 0 2.8,0 a1.4,1.6 0 1 0 -2.8,0 Z M3.2,-2.2 a1.5,1.7 0 1 0 3,0 a1.5,1.7 0 1 0 -3,0 Z';   /* a cat's paw: the pad and four toes */
  function fpFilter(svg, id, seed){
    if(svg.querySelector('#' + id)) return;
    var defs = svg.querySelector('defs'); if(!defs){ defs = svgEl('defs', {}); svg.insertBefore(defs, svg.firstChild); }
    var f = svgEl('filter', {id:id, x:'-10%', y:'-2%', width:'120%', height:'104%'});
    f.innerHTML = '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="' + (seed + 3) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -.45" result="ga"/><feComposite in="d" in2="ga" operator="in"/>';
    defs.appendChild(f);
  }
  /* soles along a path: `scale` = viewBox units per screen px; startPx = distance (screen px) before the first sole; parity keeps left/right alternating across two paths. Returns the group and the leftover distance after the last sole (screen px). */
  function footprints(svg, pathEl, cls, scale, startPx, parity, limitPx, paw, stepOv){
    var stepPx = stepOv || (paw ? FP_STEP * 1.05 : FP_STEP),   /* v260: stepOv — 閉じた輪では歩幅を割り切れる値に */ shape = paw ? PAW : SOLE, sideW = paw ? 6.5 : 7.5;
    var L = pathEl.getTotalLength(), step = stepPx * scale, start = (startPx || 12) * scale, lim = Math.min(L - 6 * scale, limitPx !== undefined ? limitPx * scale : Infinity), n = Math.max(0, Math.floor((lim - start) / step) + 1), g = svgEl('g', {class:cls + 's', filter:'url(#' + cls + 'ink)'});
    fpFilter(svg, cls + 'ink', cls === 'fp' ? 21 : 33);
    for(var i = 0; i < n; i++){
      var d = start + i * step, p1 = pathEl.getPointAtLength(d), p2 = pathEl.getPointAtLength(Math.min(L, d + 1)), a = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      var side = (((i + (parity || 0)) % 2) ? 1 : -1) * sideW * scale, nx = -Math.sin(a * Math.PI / 180) * side, ny = Math.cos(a * Math.PI / 180) * side;
      var f = svgEl('path', {d:shape, class:cls, transform:'translate(' + (p1.x + nx).toFixed(1) + ',' + (p1.y + ny).toFixed(1) + ') rotate(' + (a + 90).toFixed(1) + ') scale(' + (scale * FP_SIZE).toFixed(3) + ')', style:'--k:' + i});
      g.appendChild(f);
    }
    svg.appendChild(g);
    g.fpCount = n; g.fpLast = n ? (start + (n - 1) * step) / scale : start / scale;   /* distance (screen px) along the path of the last sole */
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
    /* route: 01 → 04 straight, a half circle down at the right edge, 05 → 08 straight back (one column on narrow screens) */
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
    /* past the NEXT slot the route slips out to the left of it and runs down to the diagram (clear of the slot's caption) */
    var ex = oneCol ? last.x : last.x - 104, rr = 22;
    var ty0 = last.y + rr, tyE = tail + 60, tL = tyE - ty0;
    /* past NEXT the walk leaves the slot to the left and swings out past the edge of the screen on a wide, shallow parabola, coming back in lower down; then it wanders down to the seam — out to one side of the rail and back — and is never a straight line here. The seam is 60px before the path's end, so the stride never stops short */
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
    /* past NEXT the route goes on toward the next screen as footprints walking down it */
    var tailP = svgEl('path', {d:'M' + last.x + ',' + last.y + tailD, class:'tail'}); srSvg.appendChild(tailP);
    var lastSlot = srItems[srItems.length - 1].querySelector('.slot'), slotR = lastSlot ? lastSlot.offsetWidth / 2 : 56;
    var seamDist = tailP.getTotalLength() - 60;   /* where the section ends along the tail */
    var tg = footprints(srSvg, tailP, 'fp', 1, slotR + 26, 0, seamDist + FP_STEP - 6);
    window.__srFps = tg.querySelectorAll('.fp'); window.__srFpCount = tg.fpCount; window.__srFpRest = seamDist - tg.fpLast;   /* px from the last sole to the seam (negative when it sits just past it) */
    window.__srNextX = sr.getBoundingClientRect().left + ex;   /* page x where the route leaves: the diagram's incoming line starts there */
    srProg = svgEl('path', {d:pathTo(pts.length - 2), class:'prog'}); srSvg.appendChild(srProg);      /* the 朱 line ends at いま */
    srHead = svgEl('circle', {r:4, fill:'var(--acc)'}); srSvg.appendChild(srHead);
    srL = srProg.getTotalLength(); srProg.setAttribute('stroke-dasharray', srL); srProg.setAttribute('stroke-dashoffset', srL);
    /* distance along the route at which each stamp is pressed */
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
    /* once the last stamp is down, the route continues past NEXT toward the next screen */
    if(window.__srTail){ var t = window.__srTail, q = Math.max(0, Math.min(1, (p - .86) / .14)); t.rect.setAttribute('height', (t.top + (t.bottom - t.top) * q + 20).toFixed(1)); }
  }
  /* the footprints are one walk from NEXT down into the diagram, driven only by the scroll: a print shows once it has risen above the walking front (two thirds down the screen), and every print is gone once the diagram's ring starts to draw. Natural page positions are measured once (the diagram's prints are measured against the section, so the sticky screen doesn't matter). */
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
    var front = window.scrollY + vh() * .66, gone = Math.round(fpFade * fpMainN);   /* the oldest prints of the main trail fade first as the diagram comes up; the bridge's walk only follows the scroll */
    fpList.forEach(function(o, i){ o.el.classList.toggle('on', (i >= gone || i >= fpMainN) && o.y < front); });
  }

  /* the bridge: the walk resumes below the diagram — down the same rail, a gentle bend past the heading, and on toward CHECKPOINT 01 */
  function brBuild(){
    var sec = document.getElementById('bridge'), svg = document.getElementById('brsvg'); if(!sec || !svg) return;
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var r = sec.getBoundingClientRect(), W = Math.max(1, r.width), H = Math.max(1, r.height);
    var rail = (window.__srNextX !== undefined) ? window.__srNextX - r.left : W * .13;
    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0)); svg.setAttribute('width', W.toFixed(0)); svg.setAttribute('height', H.toFixed(0));
    /* the walk sets out a little way below the WHAT I'M MADE OF lettering (the pinned screen ends flush with this section, so the title's place is measured against the pinned screen), comes down to the heading, circles it once — over the text is fine — and leaves from its lower left down the rail toward CHECKPOINT 01 */
    var dg = document.querySelector('#ch1pin .dg'), tl = document.querySelector('#ch1pin .dg-title .big:last-of-type'), sx = W * .5, sy = -40;
    if(dg && tl){ var dr = dg.getBoundingClientRect(), tr = tl.getBoundingClientRect(); sy = -(dr.height - (tr.bottom + 96 - dr.top)); }
    sx = W / 2;   /* exactly on the page's centre line (the green one when the grid is shown) */
    var bodyEl = sec.querySelector('.br-body'), bb = bodyEl ? bodyEl.getBoundingClientRect() : null, cap = sec.querySelector('.br-cap'), cr = cap ? cap.getBoundingClientRect() : null, ttl = sec.querySelector('.br-ttl'), tt = ttl ? ttl.getBoundingClientRect() : null;
    var cx = tt ? (tt.left + tt.width / 2 - r.left) : W * .5, btop = bb ? (bb.top - r.top) : H * .5 - 100;
    /* two walks: a regular S-curve from the lettering down to just above the heading block, where it stops; then, from under the caption, a walk that swings out to the left and goes down the rail into the chapter */
    sy += 40; var ey = (tt ? tt.top - r.top : btop + 60) - 14, L = ey - sy;   /* the walk sits nearer the heading than the lettering above */   /* sets out higher and comes down to just above the heading's own top: the SEVEN CHECKPOINTS lines sit to the left of where it ends, so nothing is walked over */
    var lx = W / 2;   /* and stays on the centre line all the way down */
    var d = 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' L' + lx.toFixed(1) + ',' + ey.toFixed(1);   /* dead straight: this walk runs down the page's centre line, and any bend there reads as a mistake */
    var bx = cr ? (cr.left - r.left + 40) : cx, by = cr ? (cr.bottom - r.top + 18) : H * .62;
    var d2 = 'M' + bx.toFixed(1) + ',' + by.toFixed(1) + ' C' + (bx - 20).toFixed(1) + ',' + (by + 90).toFixed(1) + ' ' + rail.toFixed(1) + ',' + (by + 60).toFixed(1) + ' ' + rail.toFixed(1) + ',' + (by + 170).toFixed(1) + ' L' + rail.toFixed(1) + ',' + (H + 30).toFixed(1);
    var path2 = svgEl('path', {d:d2, fill:'none', stroke:'none'}); svg.appendChild(path2);
    footprints(svg, path2, 'brfp', 1, 6, 1);
    var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); svg.appendChild(path);
    footprints(svg, path, 'brfp', 1, 8, 0);
    window.__brFps = svg.querySelectorAll('.brfp');
  }
  /* the diagram's incoming line arrives at the NEXT slot's x, then bends into the ring */
  var dgSat = document.getElementById('dgsat'), dgNodes = document.querySelectorAll('#ch1pin .dg-node'), dgStick = document.querySelector('#ch1pin .dg'), dgOn = false, dgLastA = 0;
  var dgTrail = null, dgTrailF = [], dgWasOn = false, dgT0 = 0, dgNowPend = -1;   /* dgNowPend: 歩き出しの判にまだ .in がないとき、付くまで待って波紋を */   /* v257: 輪を歩く足跡と、それぞれの経路上の位置（0〜1）。v260: 見えるたびに輪の起点から歩き直す */
  var DG_ANG = [-90, 148.4, 31.6];
  var DG_A0 = ((360 - DG_ANG[1]) % 360 + 360) % 360, DG_F0 = ((DG_A0 - 180) / 360 + 1) % 1;   /* v263: 歩き出す起点は「場をつくる力」の判（角度と、輪の経路上の割合） */
  var orbitN = 0;
  (function orbit(now){
    /* v224: 指の端末では 2 フレームに 1 回（点が動くたびに図全体が描き直される。半分で十分なめらか） */
    if(!dgOn){ if(dgWasOn){ dgWasOn = false; if(dgTrail) for(var tj = 0; tj < dgTrail.length; tj++) dgTrail[tj].style.opacity = '0'; dgNodes.forEach(function(n){ n.classList.remove('now'); }); } }
    else if(dgSat && !(document.documentElement.classList.contains('handheld') && (++orbitN & 1))){
      if(!dgWasOn){ dgWasOn = true; dgT0 = now; dgLastA = DG_A0; dgNowPend = 1; }   /* v266: 歩き出す判（場をつくる力）にも最初から波紋を */
      if(dgNowPend >= 0 && dgNodes[dgNowPend] && dgNodes[dgNowPend].classList.contains('in')){ dgNow(dgNowPend); dgNowPend = -1; }   /* v260: 輪が描き終わって歩き出すたび起点から。v263: 起点は判の下（判の縁から足跡が伸びて見える） */
      var w = (now - dgT0) / 18000, a = ((w * 360 + DG_A0) % 360 + 360) % 360, rad = a * Math.PI / 180;
      /* v257: 点はやめ、足跡が輪を歩く。歩き手の位置 f（輪の経路の割合、左端 a=180° から反時計回り）に対して、
         通り過ぎたばかりの足跡ほど濃く、古いものから薄れて消える（後ろ 30% ぶんだけ残る） */
      if(dgTrail){ for(var ti = 0; ti < dgTrail.length; ti++){ var age = w - dgTrailF[ti], op = 0; if(age >= 0){ age %= 1; op = age < .02 ? age / .02 : age < .26 ? 1 : age < .44 ? 1 - (age - .26) / .18 : 0; }   /* v262: 残す足跡を増やす（一周の 44% ぶん） */ dgTrail[ti].style.opacity = (op * .85).toFixed(2); } }
      DG_ANG.forEach(function(t, i){ var tt = ((360 - t) % 360 + 360) % 360,   /* the nodes are met in the mirrored order, so each one still lights as the dot arrives */ prev = dgLastA, cur = a; var crossed = prev <= cur ? (prev < tt && tt <= cur) : (prev < tt || tt <= cur); if(crossed){ dgNow(i); dgNowPend = -1; } });   /* v265: 足跡が着いた判に、チェックポイントの現在地と同じ波紋を */
      dgLastA = a;
    }
    requestAnimationFrame(orbit);
  })(performance.now());
  /* v235: スマホでは図を横長に組み替える：輪と判は中央のまま、題は右の列、説明は左右の列へ。
     位置は内側の <g transform> で動かす（外側の .dg-cap / .dg-title は CSS の遷移で transform を使うため） */
  (function(){   /* v244: PC・タブレット — 大きくなった説明の置き場所 */
    var H = document.documentElement; if(H.classList.contains('pcview') && H.classList.contains('phone')) return;
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    function shift(el, tx, ty){ if(!el) return; var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', 'translate(' + tx + ',' + ty + ')'); while(el.firstChild) g.appendChild(el.firstChild); el.appendChild(g); }
    var caps = svg.querySelectorAll('.dg-cap');
    shift(caps[0], 13, -20);   /* 上の説明は少し上へ（v250）。左右の説明の位置は dgCaps が座標で決める（v245） */
    /* v246: 題を左上へ（x -180、y 118〜220）、viewBox を横長にして図を大きく */
    svg.setAttribute('viewBox', '-187 20 1400 780');   /* v250: 左右の説明と判の間隔が等しくなる位置（両側 17）。文字は据え置き */
    shift(svg.querySelector('.dg-title'), -667, -732);
  })();
  (function(){
    if(!document.documentElement.classList.contains('pcview') || !document.documentElement.classList.contains('phone')) return;
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    svg.setAttribute('viewBox', '-328.5 20 1760 700');   /* v250: 左右の説明と判の間隔が等しくなる位置（両側 15.5） */
    function shift(el, tx, ty){ if(!el) return; var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', 'translate(' + tx + ',' + ty + ')'); while(el.firstChild) g.appendChild(el.firstChild); el.appendChild(g); }
    shift(svg.querySelector('.dg-title'), -820.5, -720);   /* 題 → 左上（左端 x=-372、y 130〜232）。text-anchor は CSS で start に */
    svg.querySelectorAll('.dg-cap tspan[dy]').forEach(function(t){ var d = parseFloat(t.getAttribute('dy')); if(d === 24) t.setAttribute('dy', '38'); else if(d === 26) t.setAttribute('dy', '40'); });   /* 行間を広く（28px の文字） */
    var caps = svg.querySelectorAll('.dg-cap');
    shift(caps[0], 91.5, 0);      /* 上の説明（v250） */
    shift(caps[1], -388.5, -370);   /* 左下の説明 → 左の列（v250） */
    shift(caps[2], 413.5, -370);    /* 右下の説明 → 右の列（v250） */
  })();
  /* v244: 三つのことの説明文 — 見出しと同じ混植（漢字＝ゴシック、かな＝明朝）を tspan で。行間は文字の大きさに合わせ、PC は長い行を分ける */
  function dgCaps(){
    var svg = document.getElementById('dgsvg'); if(!svg) return;
    var phone = document.documentElement.classList.contains('pcview') && document.documentElement.classList.contains('phone');
    var ja = !(typeof curLang !== 'undefined' && curLang === 'en');
    var dy1 = phone ? 42 : (ja ? 40 : 34), dy2 = phone ? 44 : (ja ? 36 : 32);
    var BIG = ['些細な差', '細部', '人', '場', '専門の外', 'デザイン'];   /* 見せたい語（v245） */
    var ns = 'http://www.w3.org/2000/svg';
    svg.querySelectorAll('.dg-cap text').forEach(function(t, ci){
      if(t.__mixed && t.__mixedLang === curLang) return;
      var lines = Array.prototype.slice.call(t.querySelectorAll(':scope > tspan')).map(function(ts){ return {x: ts.getAttribute('x'), ref: ts.classList.contains('ref'), text: ts.textContent}; });
      if(!lines.length) return;
      /* PC・タブレット：左下の説明は輪の左（右揃え）、右下の説明は輪の右（左揃え）。上の説明はそのまま 2 行 */
      var x = null;
      if(!phone){
        /* v248: 左の説明は題の左端（x -180）に左揃えで GATHER の判の横、右の説明は右端（x 1200）に右揃えで CROSSOVER の判の横 */
        if(ci === 1){ x = '-167'; t.setAttribute('text-anchor', 'start'); t.setAttribute('y', '572'); }   /* v250 */
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
      t.__mixed = true; t.__mixedLang = curLang;
    });
  }
  window.__dgCaps = dgCaps;
  setTimeout(dgCaps, 0);
  /* v257: 輪の足跡（一周ぶんを置いておき、orbit が濃さで「歩き」を表す）と、題の旗 */
  function dgTrailBuild(){
    var svg = document.getElementById('dgsvg'), ring = svg && svg.querySelector('.dg-ring'); if(!svg || !ring) return;
    var old = svg.querySelector('.dgrps'); if(old) old.remove();
    var r = svg.getBoundingClientRect(); if(!r.width) return;
    var vbb = svg.viewBox && svg.viewBox.baseVal, vbw = (vbb && vbb.width) || 1000, k = vbw / r.width;
    /* v260: 一周を偶数歩で割り切る（奇数だと継ぎ目で同じ足が二度続く）。足跡ごとに地の色の縁取りを下に敷いて、輪の線を隠す */
    var L = ring.getTotalLength(), nEven = Math.max(2, 2 * Math.round(L / (FP_STEP * k) / 2)), stepPx = L / nEven / k, step = stepPx * k, start = 12 * k;
    var g = footprints(svg, ring, 'dgrp', k, 12, 0, undefined, false, stepPx);
    g.setAttribute('class', 'dgrps');
    ring.parentNode.insertBefore(g, ring.nextSibling);   /* 輪のすぐ上、判より下に */
    Array.prototype.slice.call(g.querySelectorAll('.dgrp')).forEach(function(pth){
      var w = svgEl('g', {class:'dgrp', transform:pth.getAttribute('transform')}), h = svgEl('path', {d:SOLE, class:'dgrph'});
      pth.removeAttribute('transform'); pth.removeAttribute('style'); pth.setAttribute('class', 'dgrpi');
      g.insertBefore(w, pth); w.appendChild(h); w.appendChild(pth);
    });
    dgTrail = g.querySelectorAll('.dgrp'); dgTrailF = [];
    for(var i = 0; i < dgTrail.length; i++) dgTrailF.push((((start + i * step) / L - DG_F0) % 1 + 1) % 1);   /* v263: 起点（判）からの道のり */
  }
  function dgNow(i){   /* v266: 波紋を i 番の判へ移す。同じ判でも付け直して、二回の波紋を最初から */
    dgNodes.forEach(function(n, j){ if(j !== i) n.classList.remove('now'); });
    var n = dgNodes[i]; if(!n || !n.classList.contains('in')) return;
    n.classList.remove('now'); void n.getBoundingClientRect(); n.classList.add('now');
  }
  function dgPulseBuild(){   /* v265: 各判に波紋の枠。判の外枠（208×208, rx14）と同じ位置・傾きの角丸で、中心から広がって消える */
    dgNodes.forEach(function(n){ if(n.querySelector('.dgpulse')) return; var seal = n.querySelector('g.seal:not(.sealimg)'); if(!seal) return;
      var w = svgEl('g', {class:'dgpulse-w'}), tr = seal.getAttribute('transform'); if(tr) w.setAttribute('transform', tr);
      w.appendChild(svgEl('rect', {class:'dgpulse', x:-104, y:-104, width:208, height:208, rx:14})); n.appendChild(w); });
  }
  function dgFlag(){
    var svg = document.getElementById('dgsvg'), t = svg && svg.querySelector('.dg-title'); if(!t || t.querySelector('.dgflag')) return;
    var big = t.querySelector('.big'); if(!big) return;
    var bb; try{ bb = big.getBBox(); }catch(e){ return; }
    var fl = flagSvg(), g = svgEl('g', {class:'dgflag'}), sc = 2.1, base = parseFloat(big.getAttribute('y')) || (bb.y + bb.height * .72);
    /* v260: 竿の根元（6.5,39）を「WHAT」のベースライン上、右隣に。根元を原点にした内側の g（.dgflag-a）を CSS で立ち上げる */
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
    var vbb = svg.viewBox && svg.viewBox.baseVal, vbw = (vbb && vbb.width) || 1000, vbx = (vbb && vbb.x) || 0;   /* v235: スマホでは横長の viewBox */
    var ex = vbx + (x - r.left) / r.width * vbw; ex = Math.max(-600, Math.min(170, ex));
    var k = vbw / Math.max(1, r.width);   /* viewBox units per screen px: the soles keep the rally's screen size */
    var dg = svg.closest('.dg'), dr = dg ? dg.getBoundingClientRect() : r, seamY = (dr.top - r.top) * k;   /* the pinned screen's top edge, in viewBox units */
    var iL = 190 - seamY;
    inp.setAttribute('d', 'M' + ex.toFixed(1) + ',' + seamY.toFixed(1) + ' C' + (ex + 34).toFixed(1) + ',' + (seamY + iL * .35).toFixed(1) + ' ' + (ex - 30).toFixed(1) + ',' + (seamY + iL * .7).toFixed(1) + ' ' + ex.toFixed(1) + ',190 C' + ex.toFixed(1) + ',330 200,300 200,440');   /* it keeps wandering a little on this side of the seam too — never a straight run */
    var old = svg.querySelector('.dgfps'); if(old) old.remove();
    var rest = (window.__srFpRest !== undefined) ? window.__srFpRest : 0, cnt = window.__srFpCount || 0;
    window.__dgFps = footprints(svg, inp, 'dgfp', k, FP_STEP - rest, cnt % 2).querySelectorAll('.dgfp');
  }
  /* the passport: an upright rectangular seal pressed over「ポイント」in the contents heading */
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
    var chs = h.querySelectorAll('.split .ch'), po = null; chs.forEach(function(c){ if(!po && c.textContent === 'ポ') po = c; });   /* ポ */
    if(!po){ var last = h.querySelectorAll('.split'); last = last[last.length - 1]; var lc = last ? last.querySelectorAll('.ch') : []; po = lc[Math.max(0, lc.length - 4)] || null; }
    if(!po) return;
    /* layout offsets, not client rects: the characters are still translated by their reveal when this runs */
    var w = po.offsetWidth, hh = po.offsetHeight;
    el.style.left = (po.offsetLeft + w * 1.1) + 'px'; el.style.top = (po.offsetTop - hh * 1.9) + 'px'; el.style.height = (hh * 2.9) + 'px';
  }
  /* a square seal (角印) for the pages that are not checkpoints */
  function kakuSvg(en, jp, seed){
    stampSvg.n = (stampSvg.n || 0) + 1; var uid = stampSvg.n, id = 'ink' + uid;
    var sv = svgEl('svg', {viewBox:'0 0 156 156'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="' + seed + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="' + (seed + 5) + '" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.8 -.5" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>' +
      '<g filter="url(#' + id + ')" fill="none" stroke="var(--acc)">' +
      '<rect x="9" y="9" width="138" height="138" rx="12" stroke-width="4.2"/><rect x="21" y="21" width="114" height="114" rx="6" stroke-width="1.5"/>' +
      '<text x="78" y="46" text-anchor="middle" font-family="var(--mono)" font-size="10.5" font-weight="500" letter-spacing="2.6" fill="var(--acc)" stroke="none">' + en + '</text>' +
      '<text x="78" y="' + (jp.length > 3 ? 92 : 94) + '" text-anchor="middle" font-family="var(--sans)" font-weight="700" font-size="' + (jp.length > 3 ? 20 : 26) + '" fill="var(--acc)" stroke="none">' + jp + '</text>' +
      '<text x="78" y="124" text-anchor="middle" font-family="var(--mono)" font-size="6.5" letter-spacing="1.6" fill="var(--acc)" stroke="none">KOSAKA \u00b7 PORTFOLIO</text></g>';
    return sv;
  }
  /* v100: the seal that closes the site — pressed over the heading once the last paragraphs have been read */
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
  /* the menu's seven seals */
  document.querySelectorAll('#mseals > li').forEach(function(li, i){ var st = li.querySelector('.st'); if(st && !st.firstChild) st.appendChild(stampSvg(li, i)); });
  /* each chapter carries its own round seal behind the heading — the rally's seal for most, its own wording where one checkpoint has several parts — and, below it, a few steps that appear as you scroll on (not on the pinned screens) */
  var CHSEALS = [{sec:'ch1', cp:1}, {sec:'ch2', cp:2}, {sec:'ch3', cp:3}, {sec:'ch4', cp:4},
                 {sec:'ch5pin', cp:5, en:'BAR', place:'バー', year:'2022', pin:true}, {sec:'ch5map', cp:5, en:'ABROAD', place:'海外', year:'2025', pin:true}, {sec:'ch5intern', cp:5, en:'BANGKOK INTERNSHIP', place:'バンコク|インターン', year:'2025'},
                 {sec:'ch6', cp:6}, {sec:'ch7', cp:7}, {sec:'works', cp:7, en:'MAKING', place:'制作', year:'2020–26', ring:'HOW I MAKE \u00b7 TRY, FAIL, REPEAT \u00b7 2020 \u2192 2026 \u00b7 KOSAKA SHUZO', pin:true}];   /* the works get a seal too (no trail) */
  function chsealBuild(){
    if(!srItems.length) return;
    var list = [];
    CHSEALS.forEach(function(c, k){
      var sec = document.getElementById(c.sec); if(!sec) return;
      var host = sec.querySelector(':scope > .stick') || sec, el = host.querySelector(':scope > .chseal');   /* only a pinned section's own stick, not ch7's solo subheads */
      if(!el){ el = document.createElement('span'); el.className = 'chseal'; el.setAttribute('aria-hidden', 'true'); el.style.setProperty('--rot', ((k % 3) - 1) * 6 - 4 + 'deg'); host.appendChild(el); }
      while(el.firstChild) el.removeChild(el.firstChild);
      var src = srItems[c.cp - 1]; if(!src) return;
      if(c.place){ var tmp = document.createElement('li'); tmp.setAttribute('data-en', c.en); tmp.setAttribute('data-place', c.place); tmp.setAttribute('data-year', c.year); if(c.ring) tmp.setAttribute('data-ring', c.ring); src = tmp; }
      el.appendChild(stampSvg(src, c.cp - 1));
      /* the short trail below the seal */
      var old = host.querySelector(':scope > .chtrail'); if(old) old.remove();
      if(c.pin) return;
      var hr = host.getBoundingClientRect(), tx = el.offsetLeft + el.offsetWidth / 2, ty = el.offsetTop + el.offsetHeight + 8;   /* offsets, not rects: the seal is still scaled up before it is pressed */
      var ht = sec.querySelector('.ttl:not(.vert)'); if(ht && ht.offsetParent === host){ ty = Math.max(ty, ht.offsetTop + ht.offsetHeight + 14); }   /* never across the title's lines: the walk leaves below the whole heading */
      var vt = sec.querySelector('.ttl.vert');
      if(vt){ var sps = vt.querySelectorAll('.split'), last = sps[sps.length - 1]; if(last){ tx = vt.offsetLeft + last.offsetLeft + last.offsetWidth / 2; ty = vt.offsetTop + last.offsetTop + last.offsetHeight + 4; } }   /* a vertical heading: right from where the text ends */
      if(c.sec === 'ch6') tx += 7;   /* 間を、測る。: a touch to the right of the column */
      var tsvg = svgEl('svg', {class:'chtrail', viewBox:'0 0 ' + hr.width.toFixed(0) + ' ' + hr.height.toFixed(0), width:hr.width.toFixed(0), height:hr.height.toFixed(0)});
      /* no two trails alike: they lean left or right in turn, some with a second bend, and run different lengths */
      var TR = {ch1:[1, 38, 560, 0], ch2:[-1, 52, 610, 1], ch3:[1, 22, 300, 0], ch4:[-1, 44, 580, 2], ch5intern:[1, 46, 290, 1], ch6:[-1, 26, 300, 0], ch7:[1, 36, 240, 2]}, tr = TR[c.sec] || [1, 30, 260, 0], sg = tr[0], amp = tr[1], len = tr[2], kind = tr[3];
      var d = kind === 1
        ? 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx + sg * amp * 1.4).toFixed(1) + ',' + (ty + len * .3).toFixed(1) + ' ' + (tx - sg * amp * .6).toFixed(1) + ',' + (ty + len * .6).toFixed(1) + ' ' + (tx + sg * amp * .5).toFixed(1) + ',' + (ty + len).toFixed(1)
        : kind === 2
        ? 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + tx.toFixed(1) + ',' + (ty + len * .25).toFixed(1) + ' ' + (tx + sg * amp * 1.5).toFixed(1) + ',' + (ty + len * .45).toFixed(1) + ' ' + (tx + sg * amp).toFixed(1) + ',' + (ty + len).toFixed(1)
        : 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + tx.toFixed(1) + ',' + (ty + len * .33).toFixed(1) + ' ' + (tx + sg * amp * 1.15).toFixed(1) + ',' + (ty + len * .48).toFixed(1) + ' ' + (tx + sg * amp).toFixed(1) + ',' + (ty + len).toFixed(1);
      if(c.sec === 'ch7'){   /* v100: the walk leaves the seal and bends across to where the text begins */
        var bd7 = sec.querySelector(':scope > .body');
        if(bd7){ var ex7 = bd7.offsetLeft - 12, ey7 = bd7.offsetTop + Math.min(320, bd7.offsetHeight * .5);
          if(ex7 > tx + 40 && ey7 > ty + 90){
            d = 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx - 16).toFixed(1) + ',' + (ty + (ey7 - ty) * .44).toFixed(1) + ' ' + (tx + (ex7 - tx) * .30).toFixed(1) + ',' + (ey7 - 6).toFixed(1) + ' ' + ex7.toFixed(1) + ',' + ey7.toFixed(1);
          } }
      }
      if(c.sec === 'ch5intern'){ d = 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + ' C' + (tx + 24).toFixed(1) + ',' + (ty + 190).toFixed(1) + ' ' + (tx - 70).toFixed(1) + ',' + (ty + 330).toFixed(1) + ' ' + (tx - 40).toFixed(1) + ',' + (ty + 430).toFixed(1) + ' C' + (tx - 20).toFixed(1) + ',' + (ty + 500).toFixed(1) + ' ' + (tx - 150).toFixed(1) + ',' + (ty + 540).toFixed(1) + ' -90,' + (ty + 600).toFixed(1); }   /* the cat wanders further, and off the left edge of the page */
      var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); tsvg.appendChild(path);
      footprints(tsvg, path, 'chfp', 1, vt ? 12 : 22, k % 2, undefined, c.sec === 'ch5intern');   /* the internship's trail is a cat's */
      host.appendChild(tsvg);
      var fs = tsvg.querySelectorAll('.chfp'), nf = fs.length;
      fs.forEach(function(f, i){ var q = (i + 1) / nf; f.style.setProperty('--fade', q > .55 ? Math.max(0, 1 - (q - .55) / .45 * .92).toFixed(2) : '1'); list.push(f); });   /* the last steps thin out instead of stopping */
    });
    window.__chFps = list;
  }
  /* the two lines linking the top frames run only through the gap between them (from outer rim to outer rim) */
  function ovLinkFit(){
    var box = document.getElementById('ovals'); if(!box) return; var lk = box.querySelector('.ov-link'), ovs = box.querySelectorAll('.oval'); if(!lk || ovs.length < 2) return;
    var br = box.getBoundingClientRect(), a = ovs[0].getBoundingClientRect(), b = ovs[1].getBoundingClientRect(); if(!br.width) return;
    var x1 = (a.right - br.left) / br.width * 900, x2 = (b.left - br.left) / br.width * 900;
    var ls = lk.querySelectorAll('line'); if(ls.length < 2) return;
    ls[0].setAttribute('x1', x1.toFixed(1)); ls[0].setAttribute('x2', x2.toFixed(1)); ls[1].setAttribute('x1', x1.toFixed(1)); ls[1].setAttribute('x2', x2.toFixed(1));
  }
  ovLinkFit(); window.addEventListener('resize', ovLinkFit);
  /* the last walk: from under the end of ch7's text, on the page's centre line, straight down and then round to the left, to arrive beside the WORKS heading */
  function wkBuild(){
    var sec = document.getElementById('ch7'), wk = document.getElementById('works'); if(!sec || !wk) return;
    var old = sec.querySelector(':scope > .wktrail'); if(old) old.remove(); window.__wkFps = [];
    var r = sec.getBoundingClientRect(), W = r.width; if(W < 1025) return;
    var bd = sec.querySelector(':scope > .body'), lastEl = bd && bd.lastElementChild; if(!bd || !lastEl) return;
    var br = bd.getBoundingClientRect(), lb = lastEl.getBoundingClientRect();
    var sy = (lb.bottom - r.top) + 46, sx = (br.left + br.width / 2) - r.left;   /* under the last line of ch7, on that column's centre */
    var seal = wk.querySelector(':scope > .chseal'); if(!seal) return; var wr = wk.getBoundingClientRect();
    var ex = wr.left + seal.offsetLeft + seal.offsetWidth * .95 + 6 - r.left, ey = wr.top + seal.offsetTop + seal.offsetHeight * .5 - r.top; if(ey - sy < 200) return;   /* it arrives at the works' seal (v89: right up to the rim, aimed at its middle) — offsets, not rects: the seal is still scaled up before it is pressed */
    var d = 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + ' C' + sx.toFixed(1) + ',' + (sy + (ey - sy) * .62).toFixed(1) + ' ' + (ex + (sx - ex) * .5).toFixed(1) + ',' + ey.toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1);
    var hg = ey + 60, svg = svgEl('svg', {class:'wktrail', viewBox:'0 0 ' + W.toFixed(0) + ' ' + hg.toFixed(0), width:W.toFixed(0), height:hg.toFixed(0)});
    var path = svgEl('path', {d:d, fill:'none', stroke:'none'}); svg.appendChild(path);
    footprints(svg, path, 'chfp', 1, 18, 1, path.getTotalLength() - 30);   /* only the last step left out: the walk comes right up to the seal */
    var wfs = svg.querySelectorAll('.chfp'), wn = wfs.length;
    wfs.forEach(function(f, i){ var q = (i + 1) / wn; f.style.setProperty('--fade', q > .55 ? Math.max(0, 1 - (q - .55) / .45 * .92).toFixed(2) : '1'); });   /* the last steps thin out, as they do on every other trail */
    window.__wkFps = Array.prototype.slice.call(wfs);
    sec.appendChild(svg);
  }
  /* v198: 引き継ぎの一文のあと、足跡が人生のチェックポイントの方へ伸びていく。
     まっすぐではなく少し揺らぎ、進むにつれて画面の中央に収束する。章が入れ替わると同時に消える。 */
  function msgTrail(){
    var sec = document.getElementById('message'); if(!sec) return;
    var host = sec.querySelector('.stick'); if(!host) return;
    var old = host.querySelector('.mtrail'); if(old) old.remove();
    window.__mFps = null;
    var W = host.clientWidth, H = host.clientHeight;
    if(!W || !H) return;
    var sv = svgEl('svg', {'class':'mtrail', viewBox:'0 0 ' + W + ' ' + H, width:W, height:H, 'aria-hidden':'true'});
    var cx = W / 2, sy = H * .74, ey = H * 1.16, run = ey - sy;   /* SCROLL の字のすぐ下から。縦棒の代わりに歩き出す */
    /* 右にひとつ、左にひとつ揺れてから中央へ。最後は画面の下へ抜けていく */
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
  function rallyBuild(){ srBuild(); dgBuild(); brBuild(); chsealBuild(); soloSealsBuild(); wkBuild(); fpMeasure(); fpUpdate(); passPlace(); msgTrail(); }
  if(window.ResizeObserver && document.getElementById('contents')){ var roT, roH = 0; new ResizeObserver(function(es){ var h = es[0].contentRect.height; if(Math.abs(h - roH) < 1) return; roH = h; clearTimeout(roT); roT = setTimeout(rallyBuild, 80); }).observe(document.getElementById('contents')); }
  if(sr){ rallyBuild(); if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(rallyBuild, 50); }); window.addEventListener('load', function(){ setTimeout(rallyBuild, 100); setTimeout(fpMeasure, 1500); }); var srT; window.addEventListener('resize', function(){ clearTimeout(srT); srT = setTimeout(rallyBuild, 120); }); }

  /* the stamp picture beside 人生のチェックポイント: as the page comes up it flies in from off the right edge on a parabola — level at first, then dropping faster, like a stamp brought down onto the rally — and, once it has landed, its rubber face is inked in */
  var stampPic = document.querySelector('#contents .stamp-pic'), stampSec = stampPic ? stampPic.closest('section') : null, stampP = -1;
  function stampUpdate(){
    if(!stampPic || !stampSec) return;
    var restTop = stampSec.getBoundingClientRect().top + stampPic.offsetTop, H = vh();
    var p = (H * .92 - restTop) / (H * .9); p = Math.max(0, Math.min(1, p));
    if(reduce) p = 1;
    if(Math.abs(p - stampP) < .002) return; stampP = p;
    /* the flight takes the first 72% of the way, along a quarter circle: in from the right at the top of the arc, sweeping round and coming straight down onto its place; it takes a longer stretch of scrolling than before and slows into the landing */
    var t = Math.min(1, p / .72); t = 1 - (1 - t) * (1 - t); var t0 = t, R = Math.min(window.innerWidth * .5, H * .78), a = -Math.PI / 2 - t * Math.PI / 2;   /* −90° (top) → −180° (left end) */
    stampPic.style.setProperty('--fx', (R + R * Math.cos(a)).toFixed(1) + 'px');
    stampPic.style.setProperty('--fy', (R * Math.sin(a)).toFixed(1) + 'px');
    stampPic.style.setProperty('--frot', (26 * (1 - t)).toFixed(2) + 'deg');
    stampPic.style.setProperty('--fs', (.3 + .7 * t).toFixed(3));   /* small as it sets out, full size as it lands */
    stampPic.style.setProperty('--ol', p > 0 ? '1' : '0');
    stampPic.style.setProperty('--ink', Math.max(0, Math.min(1, (p - .72) / .28)).toFixed(3));
    if(p >= .72) stampPic.classList.add('landed'); else if(p < .66) stampPic.classList.remove('landed');   /* v105: pressed on landing, and armed again if you walk back up */
  }
  function onScroll(){ if(ticking) return; ticking = true; requestAnimationFrame(function(){ ticking = false; if(flying){ chapUpdate(); ctaUpdate(); return; } sceneUpdate(); chapUpdate(); ctaUpdate(); pinUpdate(); soloUpdate(); wipeUpdate(); seqUpdate(); srUpdate(); fpUpdate(); stampUpdate(); if(window.__tailUpdate) window.__tailUpdate(); }); }
  window.addEventListener('scroll', onScroll, {passive:true}); window.addEventListener('resize', onScroll); onScroll();
  setTimeout(onScroll, 300);

  /* in-page flights (the logo back to the top, contents, menu, the 小 button): one smooth run on requestAnimationFrame with a fixed short duration, whatever the distance. The heavy scroll-driven work of the pinned screens waits until landing, so the page glides instead of stuttering through them. A wheel, touch or key cancels the flight. */
  var flying = false, flyRaf = 0, snapping = false;   /* v196: 丸から丸へ送っている最中は、続くホイールで飛行を止めない */
  /* v220: 章へ飛ぶときの「5 秒スキップ／巻き戻し」。章の距離 1 つにつき 5 秒 */
  var CHAPS = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5pin', 'ch6', 'ch7'];
  var CHAP_OF = {top:0, message:0, contents:0, ch1pin:1, bridge:1, ch1:1, ch2:2, ch3:3, ch4:4, ch5pin:5, ch5:5, ch5map:5, ch5trip:5, ch5intern:5, ch6:6, ch7:7, works:8, ch7b:8, ch7c:8, contact:9};
  function chapAt(y){   /* 文書位置 y に画面を置いたとき、画面の中央にある章 */
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
  var CHAP_YEAR = [2001, 2001, 2008, 2011, 2020, 2022, 2024, 2026, 2026, 2026];   /* v223: 章の年（0=冒頭、8=作品、9=連絡先） */
  function skipHud(d, y0, y1){
    if(!d) return;
    var n = Math.abs((CHAP_YEAR[y1] || 2026) - (CHAP_YEAR[y0] || 2001));   /* v223: 秒ではなく、飛び越す年数 */
    if(!n) return;
    var h = hudEl(), en = (typeof curLang !== 'undefined' && curLang === 'en');
    clearTimeout(hudT); clearInterval(hudTick);
    h.classList.remove('jump'); h.classList.toggle('back', d < 0);
    h.querySelector('b').textContent = n + (en ? (n === 1 ? ' YEAR' : ' YEARS') : '年');
    h.querySelector('span').textContent = d > 0 ? (en ? 'FAST-FORWARD' : '早送り') : (en ? 'REWIND' : '巻き戻し');   /* v259: スキップ → 早送り */
    h.classList.remove('on'); void h.offsetWidth; h.classList.add('on');
    clearTimeout(skipHud.safe); skipHud.safe = setTimeout(function(){ if(window.__skipHudOff) window.__skipHudOff(); }, 5200);   /* v281: 万一どの経路も通らなくても、札は 5 秒あまりで畳む */
  }
  /* 先頭へ／末尾へ：年が一つずつ巻き戻る（進む）数字。幕の間に読ませる */
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
  document.querySelectorAll('#sr a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); skipTo(a.getAttribute('href')); }); });   /* v220 */
  window.__skipHudOff = function(){ if(hud){ clearTimeout(hudT); hudT = setTimeout(function(){ hud.classList.remove('on'); setTimeout(function(){ if(!hud.classList.contains('on')) hud.style.display = 'none'; }, 320); }, 240); } };
  function skipTo(id){
    var el = id && document.querySelector(id); if(!el) return false;
    var y = el.getBoundingClientRect().top + window.scrollY;
    var c0 = chapAt(window.scrollY), c1 = chapAt(y);
    skipHud(c1 - c0, c0, c1);
    return flyToEl(id);
  }
  /* v230: 手書きのアニメーション WebP は、薄くなっている間と画面外では静止画（ポスター）に差し替える */
  var hwStillOn = null;
  function hwStill(still){
    var im = document.getElementById('hwv'); if(!im) return;
    var anim = im.getAttribute('data-src'), poster = im.getAttribute('data-poster');
    if(!anim || !poster || !im.getAttribute('src')) return;   /* まだ読み込まれていない（src が入る前）なら触らない */
    if(hwStillOn === still) return; hwStillOn = still;
    im.setAttribute('src', still ? poster : anim);
  }
  (function(){ var sec = document.getElementById('message'); if(!sec || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) hwStill(true); }); }, {threshold:0}).observe(sec); })();
  /* v234: オープニングの再生中は、指・ホイール・キーのどれでもスクロールさせない */
  (function(){
    function opening(){ return body.classList.contains('opening') || !!document.getElementById('ld'); }
    window.addEventListener('touchmove', function(e){ if(opening() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('wheel', function(e){ if(opening() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('keydown', function(e){ if(opening() && /^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End| |Spacebar)$/.test(e.key)) e.preventDefault(); });
  })();
  /* v239: theme-color（Safari が枠・帯・タブの色に使う）を場面の色に合わせる。案内の間は朱 */
  /* v242: Safari（iOS 26）に帯・ツールバーの色を採り直させる。#tint（fixed、場面の色、透明）の display を切り替える */
  var tintEl = document.createElement('div'); tintEl.id = 'tint'; tintEl.setAttribute('aria-hidden', 'true'); document.body.appendChild(tintEl);
  window.__retint = function(){ tintEl.style.display = 'none'; requestAnimationFrame(function(){ requestAnimationFrame(function(){ tintEl.style.display = ''; }); }); };
  function cpRelayout(){   /* v288/v291: メールを送るを開いたまま向きを変えると、iOS が固定の箱を前の向きの大きさのまま残し、下に紙面が見えていた。
     向きの合図はどれが来るか端末任せなので、resize・orientationchange・visualViewport のすべてで受け、少し遅れても効くよう二度組み直す */
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
    jcur.style.display = 'block'; void jcur.offsetWidth; jcur.classList.add('on');   /* v242: 隠れている間は display:none（Safari が古い色を採らないように） */
    var hold = rew ? jumpHud(window.scrollY, y) + 140 : 640;   /* v220: 先頭へ／末尾へは年の数字が送り終わるまで幕を持つ。章へのジャンプは skipTo の札（n 秒スキップ）をそのまま見せる */
    curtainJump.t1 = setTimeout(function(){
      window.scrollTo({top: y, behavior: 'instant'});
      done();
      /* v238: iOS Safari は一足のジャンプの後、安全域の帯（html の地色）を次のスクロールまで描き直さないことがある。
         JS 側は 1 フレーム後に色を更新している（計測済み）ので、幕の下で 1px だけ揺らして描き直しを起こす。幕が上がった後にも一度 */
      function nudge(){ var sy = window.scrollY; window.scrollTo({top: sy + 1, behavior: 'instant'}); requestAnimationFrame(function(){ window.scrollTo({top: sy, behavior: 'instant'}); }); }
      setTimeout(nudge, 140);
      curtainJump.t2 = setTimeout(function(){ jcur.classList.remove('on'); if(window.__skipHudOff) window.__skipHudOff(); setTimeout(nudge, 420); setTimeout(function(){ jcur.style.display = 'none'; if(window.__retint) window.__retint(); }, 340); }, Math.max(260, hold - 320));
    }, 320);
  }
  function flyTo(y, rew){
    y = Math.max(0, Math.round(y)); var start = window.scrollY, dist = y - start;
    if(Math.abs(dist) < 2){ if(window.__skipHudOff) window.__skipHudOff(); return; }
    if(reduce){ window.scrollTo({top:y, behavior:'instant'}); if(window.__skipHudOff) window.__skipHudOff(); return; }   /* v281: 一足で着く経路も札を畳む（動きを止めた設定のとき、章へ飛ぶたびに札が残っていた） */
    cancelAnimationFrame(flyRaf);
    /* v106: the button at the end winds the page back like tape — a long spool that runs fast and eases out, the page stepping backwards a frame at a time */
    var dur = rew ? Math.max(900, Math.min(2400, 620 + Math.abs(dist) / 7)) : Math.max(650, Math.min(1400, 450 + Math.abs(dist) / 10)), t0 = performance.now();
    flying = true; document.documentElement.classList.add('flying');
    if(rew){ document.documentElement.classList.add('rewind'); document.documentElement.classList.toggle('fwd', dist > 0); }   /* v107: the same tape, wound the other way when the button sends you down */
    function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function easeRew(t){ return 1 - Math.pow(1 - t, 2.3); }   /* away at once, slowing as it reaches the head of the tape */
    function land(){ flying = false; snapping = false; document.documentElement.classList.remove('flying'); document.documentElement.classList.remove('rewind'); document.documentElement.classList.remove('fwd'); ticking = false; onScroll(); if(!(jcur && jcur.classList.contains('on')) && window.__skipHudOff) window.__skipHudOff(); }
    /* v218: 指の端末では、巻き戻しボタンと長い飛行（画面 3 つ分より遠く）は幕を下ろして一足で着く。
       全章を通り抜ける飛行は iOS の描画プロセスを落とし、Safari がページを黙って読み直していた */
    if(document.documentElement.classList.contains('handheld') && (rew || Math.abs(dist) > innerHeight * 3)){ curtainJump(y, land, rew); return; }
    clearTimeout(flyTo.safe); flyTo.safe = setTimeout(function(){   /* v320: どこかで引っかかっても、必ず片づける */
      if(flying) return; var HH = document.documentElement;
      if(HH.classList.contains('rewind') || HH.classList.contains('fwd') || HH.classList.contains('flying')){
        HH.classList.remove('flying', 'rewind', 'fwd'); if(window.__skipHudOff) window.__skipHudOff(); onScroll(); }
    }, dur + 900);
    (function step(now){
      if(!flying) return;
      var k = Math.min(1, (now - t0) / dur);
      var yy = start + dist * (rew ? easeRew(k) : ease(k));
      window.scrollTo({top: yy, behavior:'instant'});
      if(k < 1) flyRaf = requestAnimationFrame(step); else land();
    })(t0);
  }
  (function(){   /* the tape's own picture: tracking bands, a sweeping head, and the mark in the corner */
    var r = document.createElement('div'); r.className = 'rew'; r.setAttribute('aria-hidden', 'true');
    r.innerHTML = '<i class="bands"></i><span class="mk"></span>';
    var mk = r.querySelector('.mk');
    new MutationObserver(function(){ mk.textContent = document.documentElement.classList.contains('fwd') ? '\u25b6\u25b6 FORWARD' : '\u25c0\u25c0 REWIND'; }).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
    document.body.appendChild(r);
  })();
  /* v110: 慣性スクロール — the wheel sets a target and the page eases toward it, so the whole thing moves like
     something with weight rather than jumping line by line. Only where there is a real pointer; touch devices
     already have their own inertia, and anything that scrolls inside itself (the menu, the contact page, the
     lightbox) is left alone. */
  (function(){
    if(reduce || !fine) return;
    var target = window.scrollY, cur = target, active = false, raf = 0;
    function limit(){ return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }
    /* v138: the seams — where a pinned screen takes hold of the page, and where it lets go again. Crossing one at
       full speed reads as running into something, because the picture stops dead while the wheel is still turning.
       Coming up to a seam the page takes smaller steps, so it arrives slowing rather than colliding. */
    var seams = [], snapLock = 0;
    function seamScan(){
      seams = [];
      /* v149: #seq — the eight steps of the research — holds the screen the same way but is neither .pin nor
         .solopin, so its two seams (the stage taking hold at 対象を選ぶ, and letting go as the sheet rises) were
         missing from this list */
      Array.prototype.forEach.call(document.querySelectorAll('.pin, .solopin, #seq'), function(el){
        var top = el.getBoundingClientRect().top + window.scrollY, h = el.offsetHeight, v = window.innerHeight;
        seams.push(top); if(h > v + 8) seams.push(top + h - v);
      });
    }
    seamScan(); window.addEventListener('resize', seamScan, {passive:true});
    function damp(y){
      var D = 380, k = 1;   /* v233: 560 → 380。継ぎ目の手前で重く感じる区間を短く */
      for(var i = 0; i < seams.length; i++){
        var d = Math.abs(seams[i] - y);
        /* v148: barely touched while the seam is still far off, then a real drag in the last stretch —
           at 100px out the page moves at a third of its speed, and at the seam itself at an eighth */
        if(d < D){ var q = d / D, s = 1 - .74 * Math.pow(1 - q, 3); if(s < k) k = s; }   /* v233: 継ぎ目で 1/8 → 約 1/4 の速さ */
      }
      return k;
    }
    function busy(){
      var h = document.documentElement;
      return flying || h.classList.contains('cpopen') || body.classList.contains('menuopen') || h.classList.contains('lbopen') || body.classList.contains('opening');
    }
    function loop(){
      cur += (target - cur) * .13 * damp(cur);   /* v128: heavier — .32 followed the wheel almost exactly. v138: and gentler still as a seam comes up */
      if(Math.abs(target - cur) < 1.2){ cur = target; active = false; raf = 0; window.scrollTo({top:Math.round(cur), behavior:'instant'}); if(window.__annoSync) window.__annoSync(); return; }
      window.scrollTo({top:Math.round(cur), behavior:'instant'}); if(window.__annoSync) window.__annoSync();   /* v219: 札は書き込んだ位置に即座に合わせる */   /* v113: html{scroll-behavior:smooth} would otherwise animate every one of these, and the two eases stacked into a long lag */
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('wheel', function(e){
      if(e.ctrlKey) return;
      var sc = e.target && e.target.closest ? e.target.closest('.menu, .cpage, #lb, .cp-sheet') : null;
      if(sc){   /* those scroll on their own — but the page must not take over when they reach their end */
        var up = sc.scrollTop > 1, dn = sc.scrollTop + sc.clientHeight < sc.scrollHeight - 1;
        if((e.deltaY < 0 && !up) || (e.deltaY > 0 && !dn)) e.preventDefault();
        return;
      }
      if(busy()){ if(!flying) e.preventDefault(); return; }   /* a sheet is open over the page: it holds still underneath. v234: オープニング中も止める */
      e.preventDefault();
      /* v196: MESSAGE の中では、ひと振りのスクロールで必ず「次の丸」の内容へ進む。
         振り幅が小さくても大きくても、飛ばしたり手前で止まったりしない。端に来たらふつうのスクロールに戻す。 */
      if(false && window.__msgStops){   /* v253: 案 B — ひと振りで止まりへ飛ぶ仕組みは外し、ふつうの慣性スクロールで読む */
        var nowT = performance.now();
        if(snapping && flying){ snapLock = nowT + 420; return; }   /* v219: 飛行中の続きは錠を延ばして捨てる */
        if(nowT < snapLock){ snapLock = nowT + 260; return; }   /* v219: 余韻の続き（260ms 以内に次が来る限り同じひと振り）も捨てる。間が空けば新しいひと振り */
        var ty = window.__msgStops(e.deltaY > 0 ? 1 : -1);
        if(ty !== null){ snapLock = nowT + 780; snapping = true; flyTo(ty); return; }
      }
      var d = e.deltaY * (e.deltaMode === 1 ? 34 : e.deltaMode === 2 ? window.innerHeight : 1);
      target = Math.max(0, Math.min(limit(), (active ? target : window.scrollY) + d));
      if(!active){ active = true; cur = window.scrollY; seamScan(); raf = requestAnimationFrame(loop); }   /* the seams move as images settle, so they are measured again at the start of each run */
    }, {passive:false});
    /* anything else that moves the page — a flight, a keypress, a hash — becomes the new truth */
    window.addEventListener('scroll', function(){ if(!active) { target = cur = window.scrollY; } }, {passive:true});
    window.addEventListener('keydown', function(){ if(active){ active = false; cancelAnimationFrame(raf); raf = 0; } }, {passive:true});
  })();
  function flyStop(){ if(!flying || snapping) return; cancelAnimationFrame(flyRaf); flying = false;
    /* v320: 巻き戻しの帯（rewind / fwd）も一緒に外す。ここで残ると、途中で止まったまま帯が出っぱなしになり、
       html.rewind * { transition:none } のせいで紙面の動きまで止まっていた */
    document.documentElement.classList.remove('flying', 'rewind', 'fwd'); ticking = false; onScroll(); if(window.__skipHudOff) window.__skipHudOff(); }   /* v281: 飛行中にホイール・指・キーで割り込むと着地しないため、年数の札が出たまま残っていた */
  ['wheel', 'touchstart', 'keydown'].forEach(function(ev){ window.addEventListener(ev, flyStop, {passive:true}); });
  function flyToEl(id, rew){ var el = id && document.querySelector(id); if(!el) return false; flyTo(el.getBoundingClientRect().top + window.scrollY, rew); return true; }
  document.querySelectorAll('.brand, .cta-fx, #top .toc a, footer a').forEach(function(a){ a.addEventListener('click', function(e){ var h = a.getAttribute('href'); if(!h || h.charAt(0) !== '#') return; e.preventDefault(); var rew = a.classList.contains('cta-fx') || a.classList.contains('brand');
    if(body.classList.contains('menuopen') && typeof setMenu === 'function') setMenu(false);   /* v287: メニューを開いたままロゴで TOP へ飛ぶと、メニューが開きっぱなしだった */   /* v108: the mark and the name wind the page back too */
    if(h === '#top' || h === '#' || (a.classList.contains('cta-fx') && body.classList.contains('atend'))){ flyTo(0, rew); } else if(a.closest('#top .toc')){ if(!skipTo(h)) flyTo(0, rew); }   /* v237: TOP の目次も年数の札つき */ else if(!flyToEl(h, rew)) flyTo(0, rew); }); });

  /* v126: the photographs are not offered for saving — the context menu and dragging are turned off over
     images, figures and video. This is a deterrent, not protection: anything the browser can display can still
     be reached through developer tools, the network panel or a screenshot. */
  var PIC = 'img, svg, video, figure, picture, .wkf, .lb, #lb';
  document.addEventListener('contextmenu', function(e){ if(e.target.closest && e.target.closest(PIC)) e.preventDefault(); });
  document.addEventListener('dragstart', function(e){ if(e.target.closest && e.target.closest(PIC)) e.preventDefault(); });

  /* v158: the header's own height, so the menu can show exactly that much of itself before it runs */
  (function(){
    var hd = document.querySelector('.hd');
    function hdh(){ if(hd) document.documentElement.style.setProperty('--hdh', hd.offsetHeight + 'px'); }
    hdh(); window.addEventListener('resize', hdh, {passive:true});
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(hdh);
  })();

  /* v167: the MESSAGE screen is long and holds still while it plays — the dots at the left edge say how many
     of its pieces are still to come, and which one has just arrived */
  (function(){
    var sec = document.getElementById('message'); if(!sec) return;
    var all = Array.prototype.slice.call(sec.querySelectorAll('.pg [data-at]')), seen = {}, items = [];
    all.sort(function(a, b){ return parseFloat(a.getAttribute('data-at')) - parseFloat(b.getAttribute('data-at')); });
    all.forEach(function(el){ var k = el.getAttribute('data-at'); if(!seen[k]){ seen[k] = 1; items.push(el); } });   /* v169: pieces that arrive together count as one */
    if(items.length < 2) return;
    /* v196: ひと振りで次の丸へ。pin の外や端では null を返し、ふつうのスクロールに任せる */
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
      /* v176: each dot is a button — pressing it takes the reader to the moment that piece arrives */
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
      var H = vh(), r = sec.getBoundingClientRect(), here = r.top < H * .5 && r.bottom > H * .5;
      var p = Math.max(0, Math.min(1, (-r.top) / Math.max(1, sec.offsetHeight - H))), cur = -1;
      items.forEach(function(el, i){ if(p >= parseFloat(el.getAttribute('data-at'))) cur = i; });
      nav.classList.toggle('on', here && cur >= 0);   /* v168: nothing to count while the handwriting still has the screen to itself */
      if(!here) return;
      dots.forEach(function(d, i){ d.classList.toggle('now', i === cur); d.classList.toggle('past', i < cur); });
    };
  })();

  /* hamburger menu */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  var menuCloseT;
  var menuShownT = null;
  /* v88: a flag planted on the menu's card for wherever the visitor is on the page right now (the header's chapter, by the same measure) */
  var curSecId = '';
  function menuFlag(){
    menu.querySelectorAll('.here').forEach(function(e){ e.classList.remove('here'); });
    /* v92: the flag's idea of 'here' is the section under the upper half of the screen (the header's chapter label switches only once a section's label has passed the top, so right after a flight to a section it still named the one before) */
    var here = '', line = vh() * .45; for(var i = 0; i < hdSecs.length; i++){ if(hdSecs[i].getBoundingClientRect().top <= line) here = hdSecs[i].id; else break; }
    var id = /^ch5/.test(here) ? 'ch5' : here, sel = {message:'.mmsg .kslot', ch1:'#mseals li:nth-child(1) .slot', ch2:'#mseals li:nth-child(2) .slot', ch3:'#mseals li:nth-child(3) .slot', ch4:'#mseals li:nth-child(4) .slot', ch5:'#mseals li:nth-child(5) .slot', ch6:'#mseals li:nth-child(6) .slot', ch7:'#mseals li:nth-child(7) .slot', works:'#mlinks a[href="#works"] .kslot', contact:'#mlinks a[href="#contact"] .kslot'}[id];
    menu.querySelectorAll('.flag').forEach(function(f){ f.remove(); });
    var el = sel && menu.querySelector(sel); if(el){ el.classList.add('here'); el.appendChild(flagSvg()); }
  }
  /* the flag, stamped: a pole in ink and a pennant in 朱 through the same grain as the seals, the pennant stirring a little */
  function flagSvg(){
    stampSvg.n = (stampSvg.n || 0) + 1; var id = 'flagf' + stampSvg.n, sv = svgEl('svg', {class:'flag', viewBox:'0 0 32 42'});
    sv.innerHTML = '<defs><filter id="' + id + '" x="-25%" y="-20%" width="150%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="11" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -.45" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>' +
      '<g filter="url(#' + id + ')"><line x1="6.5" y1="4" x2="6.5" y2="39" stroke="var(--fg)" stroke-width="2.6" stroke-linecap="round"/><circle cx="6.5" cy="39" r="2.4" fill="var(--fg)"/>' +
      '<g><polygon points="7.5,5 28,12 7.5,19.5" fill="var(--acc)"/><animateTransform attributeName="transform" type="skewY" values="0;-5;0;4;0" dur="2.6s" repeatCount="indefinite" additive="sum"/></g></g>';
    return sv;
  }
  function menuLine(){   /* v291: 判をつなぐ点線は、判の中心を測って引く（スマホだけ組みが違い、中心から 20px ずれていた） */
    var ul = document.querySelector('.menu .mseals'), sl = ul && ul.querySelector('.slot'); if(!ul || !sl) return;
    var r = ul.getBoundingClientRect(), b = sl.getBoundingClientRect(); if(!b.height) return;
    ul.style.setProperty('--mline', (b.top - r.top + b.height / 2).toFixed(1) + 'px');
  }
  window.addEventListener('resize', function(){ clearTimeout(menuLine.t); menuLine.t = setTimeout(menuLine, 200); }, {passive:true});
  function setMenu(open){
    /* v203: 開閉の最中、幕の高さを px で留める。clip-path は要素の高さへの割合なので、
       実機でツールバーが出入りして高さが動くと、幕の端が引き戻されて見える。
       ただし押した瞬間はツールバーが見えていて画面が低く、直後に隠れて伸びることがある。
       そのとき留めた高さのままだと幕の下に紙面が一帯残るので、伸びた分にはすぐ追随させる
       （高さは増える方向にだけ動かす。端は進行方向へ僅かに跳ぶだけで、巻き戻りは起きない）。 */
    menu.style.height = window.innerHeight + 'px';
    if(!setMenu.grow){ setMenu.grow = function(){ var h = parseFloat(menu.style.height) || 0; if(h && window.innerHeight > h) menu.style.height = window.innerHeight + 'px'; }; }
    window.addEventListener('resize', setMenu.grow, {passive:true});
    clearTimeout(setMenu.ht); setMenu.ht = setTimeout(function(){ menu.style.height = ''; window.removeEventListener('resize', setMenu.grow); }, open ? 1500 : 950);
    if(!open && menu.classList.contains('open')){
      /* v163: closed while the sheet is still coming down. Removing .open takes the running animation with it, and
         the closing transition is then left without a value to start from — so the sheet is pinned where it stands
         for one frame, and the sweep back up begins from there. */
      var cp = getComputedStyle(menu).clipPath;
      if(cp && cp !== 'none'){ menu.style.clipPath = cp; menu.classList.remove('open'); void menu.offsetWidth; menu.style.clipPath = ''; }
    }
    /* v308: 旗と点線は幕を出したあとの一枚めで組む。先に測ると、その分だけ幕の動き出しが遅れていた */
    if(open) requestAnimationFrame(function(){ menuFlag(); menuLine(); setTimeout(menuLine, 240); });
    menu.classList.toggle('open', open); burger.classList.toggle('open', open); body.classList.toggle('menuopen', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    /* .shown carries the seals' pressed state through the closing sweep: if it were dropped with .open, a seal still being pressed would snap back while the sheet is on screen */
    clearTimeout(menuShownT); if(open) menu.classList.add('shown'); else menuShownT = setTimeout(function(){ menu.classList.remove('shown'); }, 850);
    clearTimeout(menuCloseT); if(!open){ body.classList.add('menuclosing'); menuCloseT = setTimeout(function(){ body.classList.remove('menuclosing'); }, 900); } else body.classList.remove('menuclosing'); }
  burger.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
  /* v123: the sheet is paper — pressing anywhere on it that is not a link or a button puts it away */
  menu.addEventListener('click', function(e){ if(!e.target.closest('a, button, input, textarea, [role="group"]')) setMenu(false); });
  /* v96: the menu's grid toggle (phone) simply presses the header's hidden one */
  var mgrid = document.querySelector('.mgrid'); if(mgrid) mgrid.addEventListener('click', function(){ var g = document.getElementById('gridbtn'); if(g) g.click(); });
  /* v117: a phone or tablet can be asked to lay the page out as the desktop does — the viewport is told a fixed
     width and the browser scales the whole thing down. Remembered, so it survives the next visit. */
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
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); var id = a.getAttribute('href'); setMenu(false); if(a.classList.contains('mcontact')){ setTimeout(cpOpen, 420); return; } setTimeout(function(){ skipTo(id); }, 350); }); });   /* v220: 5 秒スキップの札つき */   /* v85: the CONTACT card opens the contact page */
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

  /* grid toggle */
  document.getElementById('gridbtn').addEventListener('click', function(){ document.documentElement.classList.toggle('grid'); togFit(); });
  var curbtn = document.getElementById('curbtn'); if(curbtn) curbtn.addEventListener('click', function(){ body.classList.toggle('nocur'); togFit(); });
  var mkbtn = document.getElementById('mkbtn'); if(mkbtn) mkbtn.addEventListener('click', function(){ var h = document.documentElement; h.classList.remove('surhint'); if(h.classList.contains('cpopen')){ if(h.classList.contains('cpsur')) surStop(); else surStart(); } else h.classList.toggle('nomark'); togFit(); });
  /* v84: each toggle is exactly as wide as the label it shows (表示 / 非表示 differ by a character), so the gaps between the three stay even whichever way they read; the width eases when a label changes */
  function togFit(){
    var h = document.documentElement, cp = h.classList.contains('cpopen');
    [['gridbtn', h.classList.contains('grid') ? '.on' : '.off'], ['curbtn', body.classList.contains('nocur') ? '.off' : '.on'], ['mkbtn', cp ? (h.classList.contains('cpsur') ? '.son' : '.soff') : (h.classList.contains('nomark') ? '.off' : '.on')]].forEach(function(q){
      var b = document.getElementById(q[0]), sp = b && b.querySelector(q[1]); if(!sp) return;
      var w = sp.getBoundingClientRect().width; if(w > 0) b.style.width = w.toFixed(2) + 'px';
    });
  }
  togFit(); window.addEventListener('load', togFit); if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(togFit, 50); }); window.addEventListener('resize', function(){ togFit(); });
  /* v83–v85: the surprise — on the contact page the highlight toggle has nothing to do, so there it is a surprise instead: one of seven, drawn at random (never the same one twice running).
     fall: every letter and field lets go and tumbles to the floor of the screen, and they pile up. float: they drift up like bubbles and gather under the header. flee: they run from the cursor and creep back. swirl: they are drawn into a whirlpool around the middle of the screen. seals: the page is stamped all over, seal after seal, faster and faster. burst: everything blows apart and the screen is left empty. 3d: the page stands up in three dimensions and turns with the cursor.
     The page's own text is only hidden: what moves are copies, one per glyph (measured with a Range, so nothing in the page is touched) and one per field or button, in a fixed layer over the sheet; hiding the surprise sends every piece back to its place.
     fall, float and burst run on a real rigid-body simulation (matter-js 0.20, MIT, carried in the page): each piece is a box with mass from its area, so one that lands on a corner tips over, pieces collide and stack, and the pile settles and sleeps. flee and swirl are choreography, not physics */
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
        rng.setStart(n, i); rng.setEnd(n, i + 1); var r = rng.getBoundingClientRect(); if(!r.width || !r.height || r.top > H - 12) continue;   /* what is below the screen stays where it is */
        out.push({kind:'ch', node:n, i:i, text:c, r:r, cs:cs, op:op, role:role});
      }
    }
    root.querySelectorAll('input, textarea, button').forEach(function(el){ if(el.closest('[hidden]') || !el.offsetParent) return; var r = el.getBoundingClientRect(); if(!r.width || !r.height || r.top > H - 12) return; out.push({kind:'ctl', el:el, r:r, role:el.tagName === 'BUTTON' ? 'btn' : 'field'}); });
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
      else { s = document.createElement('span'); s.className = 'surp cp-form'; c.value = el.value; s.appendChild(c); }
    }
    s.style.left = p.r.left + 'px'; s.style.top = p.r.top + 'px'; s.style.width = p.r.width + 'px'; s.style.height = p.r.height + 'px';
    return s;
  }
  function surTransform(p){ return 'translate(' + (p.x - p.r.left).toFixed(1) + 'px,' + (p.y - p.r.top).toFixed(1) + 'px) rotate(' + p.a.toFixed(1) + 'deg)'; }
  /* the seals of the storm: the rally's seven, and the AI, WORKS, CONTACT and ジブンのゼンブを seals */
  function surSealList(){
    var list = srItems.slice(0, 7).map(function(li, i){ return {li:li, i:i}; });
    var mk = function(en, place, year, ring){ var li = document.createElement('li'); li.setAttribute('data-en', en); li.setAttribute('data-place', place); li.setAttribute('data-year', year); li.setAttribute('data-ring', ring); return li; };
    list.push({li:mk('MAKE WITH AI', 'AI', '2026', 'MAKE WITH AI · THE CHOICE IS MINE · 2026 · KOSAKA'), i:7});
    list.push({li:mk('MAKING', '制作', '2020–26', 'HOW I MAKE · TRY, FAIL, REPEAT · 2020 → 2026 · KOSAKA SHUZO'), i:8});
    list.push({li:mk('CONTACT', '連絡', '2026', 'CONTACT · WRITE TO ME · KOSAKA SHUZO · 2026'), i:9});
    list.push({li:mk('ALL OF ME', 'ジブンの|ゼンブを', '2026', 'JIBUN NO ZENBU WO · ALL OF ME · KOSAKA SHUZO · 2026'), i:10});
    return list;
  }
  /* v145: the storm of seals is painted into a canvas, not built as one filtered SVG per seal. Each design is
     drawn once into a small bitmap with its ink grain baked in, and every press after that is a single blit —
     so the screen carries two canvas layers instead of ninety filtered, blended ones. That is what made both
     the pressing and the clearing heavy; it also means far more seals can fall. */
  var sealBmp = {}, sealNoise = null;
  function inkNoise(){
    if(sealNoise) return sealNoise;
    var c = document.createElement('canvas'), S = 128; c.width = c.height = S;
    var g = c.getContext('2d'), im = g.createImageData(S, S), d = im.data;
    for(var i = 0; i < S * S; i++){
      var v = Math.random(), a = v < .62 ? 0 : Math.min(255, (v - .62) / .38 * 300);   /* mostly clear, with worn patches */
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
    var R = 57, th = -Math.PI / 2 + .06;   /* from the left, clockwise over the top, as the text path runs */
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
    g.setTransform(1, 0, 0, 1, 0, 0);   /* the ink is eaten away in patches, the way a rubber stamp prints */
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
      n++; if(n < N){ gap = Math.max(62, gap * .93); surSealT = setTimeout(press, gap); }   /* faster and faster */
    }
    surSealT = setTimeout(press, 240);
  }
  /* 3d: the page's letters and fields stand at different depths — the heading nearest, the note furthest — each letter a solid block, and the whole stage turns after the cursor (and sways by itself when the cursor is still) */
  function sur3d(layer, pieces, W, H, top){
    var stage = document.createElement('div'); stage.className = 's3d'; var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    pieces.forEach(function(p){ x0 = Math.min(x0, p.r.left); y0 = Math.min(y0, p.r.top); x1 = Math.max(x1, p.r.right); y1 = Math.max(y1, p.r.bottom); });
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, paper = [242, 242, 238];
    layer.style.perspectiveOrigin = cx.toFixed(0) + 'px ' + cy.toFixed(0) + 'px'; stage.style.transformOrigin = cx.toFixed(0) + 'px ' + cy.toFixed(0) + 'px';
    var mixc = function(c, k){ var m = /(\d+)\D+(\d+)\D+(\d+)/.exec(c); if(!m) return c; return 'rgb(' + [1, 2, 3].map(function(i){ return Math.round(parseInt(m[i], 10) * (1 - k) + paper[i - 1] * k); }).join(',') + ')'; };
    pieces.forEach(function(p, i){
      var z = {ttl:190, btn:90, lead:70, lab:42, field:22, note:0, txt:30}[p.role] || 0; if(p.role === 'ttl') z += (i % 5) * 9;   /* the heading's letters at slightly different depths */
      p.z = z; p.s.style.transform = 'translateZ(0)'; p.s.style.transition = 'transform .9s cubic-bezier(.2,.8,.2,1) ' + (Math.random() * 500).toFixed(0) + 'ms';
      if(p.kind === 'ch'){   /* the block: the face, and layers of the same glyph behind it, in the paper-lit colour of a side */
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
    surEnd = function(){   /* back: the stage flat, the letters back to the paper */
      stage.style.transition = 'transform .8s cubic-bezier(.2,.8,.2,1)'; stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
      pieces.forEach(function(p){ p.s.style.transition = 'transform .8s cubic-bezier(.2,.8,.2,1)'; p.s.style.transform = 'translateZ(0)'; }); layer.classList.add('flat');
      return 900;
    };
  }
  /* the rigid-body kinds */
  function surPhys(kind, layer, pieces, W, H, top){
    var M = window.Matter, eng = M.Engine.create({enableSleeping:true, positionIterations:8, velocityIterations:6}), world = eng.world, TH = 400;
    eng.gravity.y = kind === 'float' ? -.32 : (kind === 'burst' ? .7 : 1.4);   /* ×1000 px/s² */
    var wall = function(x, y, w, h){ return M.Bodies.rectangle(x, y, w, h, {isStatic:true, friction:.55, restitution:0}); };
    if(kind !== 'burst'){
      M.Composite.add(world, [wall(W / 2, H - 2 + TH / 2, W * 3, TH), wall(-TH / 2, H / 2, TH, H * 6), wall(W + TH / 2, H / 2, TH, H * 6)]);
      if(kind === 'float') M.Composite.add(world, wall(W / 2, top - TH / 2, W * 3, TH));
    }
    var cx = W / 2, cy = top + (H - top) / 2, D = Math.sqrt(W * W + H * H) / 2;
    pieces.forEach(function(p){
      p.x = p.r.left; p.y = p.r.top; p.w = p.r.width; p.h = p.r.height; p.a = 0; p.rest = false; p.added = false;
      var bw = Math.max(2, p.w - 1.2), bh = Math.max(2, p.h - 1.2), oy = p.h / 2;   /* oy: the body's centre, measured from the copy's top */
      if(p.role === 'field'){ bh = 6; oy = p.h - 3; p.s.style.transformOrigin = '50% ' + oy.toFixed(1) + 'px'; }   /* a field is only its underline: a stick, not a slab */
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
          if(t < p.t0){ alive = true; if(kind === 'burst' && t > 60){ p.s.style.transform = 'translate(' + ((Math.random() - .5) * 2.2).toFixed(1) + 'px,' + ((Math.random() - .5) * 2.2).toFixed(1) + 'px)'; } return; }   /* burst: a shudder before it goes */
          p.added = true; M.Composite.add(world, p.b); M.Body.setVelocity(p.b, p.v); M.Body.setAngularVelocity(p.b, p.av);
        }
      });
      var steps = 0; while(acc >= STEP && steps < 4){ if(kind === 'float' && t < 7000) pieces.forEach(function(p){ if(p.added && !p.gone) M.Body.applyForce(p.b, p.b.position, {x:(Math.random() - .5) * p.b.mass * .0009, y:(Math.random() - .5) * p.b.mass * .0004}); });   /* a breath of air keeps them jostling for a while */
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
    if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; cpage.classList.remove('surhid'); }   /* pieces still on their way back: they are simply gone, the page's text is there */
    var kind = surPick(), W = window.innerWidth, H = window.innerHeight, hdEl = document.querySelector('.hd'), top = (hdEl ? hdEl.offsetHeight : 68) + 6;
    var layer = document.createElement('div'); layer.className = 'sur sur-' + kind; layer.setAttribute('aria-hidden', 'true'); surEnd = null;
    if(kind === 'seals'){ cpage.appendChild(layer); surLayer = layer; surPieces = []; surKind = kind; document.documentElement.classList.add('cpsur'); surSeals(layer, W, H, top); return; }
    var pieces = surCollect(); if(!pieces.length) return;
    pieces.forEach(function(p){ p.s = surMake(p); p.x = p.r.left; p.y = p.r.top; p.w = p.r.width; p.h = p.r.height; p.a = 0; if(kind !== '3d') layer.appendChild(p.s); });
    cpage.appendChild(layer); cpage.classList.add('surhid'); surLayer = layer; surPieces = pieces; surKind = kind;
    document.documentElement.classList.add('cpsur');
    if(kind === '3d'){ sur3d(layer, pieces, W, H, top); return; }
    if(window.Matter && (kind === 'fall' || kind === 'float' || kind === 'burst')){ surPhys(kind, layer, pieces, W, H, top); return; }
    /* flee and swirl (and, without the physics library, the others in a simpler way) */
    var BW = 22, nb = Math.ceil(W / BW) + 1, pile = [], k, floor = H - 4, cx = W / 2, cy = top + (H - top) / 2, Rmax = Math.min(W, H - top) * .44, D = Math.sqrt(W * W + H * H) / 2;
    for(k = 0; k < nb; k++) pile.push(0);
    var bucket = function(p){ return Math.max(0, Math.min(nb - 1, Math.floor((p.x + p.w / 2) / BW))); };
    pieces.forEach(function(p){
      p.hx = p.x; p.hy = p.y; p.rest = false; p.hit = 0; p.ph = Math.random() * 6.28;
      p.vx = (Math.random() - .5) * 90; p.vy = 0; p.va = (Math.random() - .5) * 720;
      p.t0 = 100 + Math.random() * 820 + (p.kind === 'ctl' ? 260 : 0);   /* each lets go in its own moment */
      if(kind === 'float'){ p.vy = -(20 + Math.random() * 40); p.vx = (Math.random() - .5) * 40; p.va = (Math.random() - .5) * (p.kind === 'ctl' ? 14 : 70); p.t0 = Math.random() * 1500; }
      if(kind === 'flee'){ p.vx = 0; p.vy = 0; p.va = 0; p.t0 = Math.random() * 500; }
      if(kind === 'swirl'){ var mx0 = p.x + p.w / 2 - cx, my0 = p.y + p.h / 2 - cy; p.r0 = Math.sqrt(mx0 * mx0 + my0 * my0); p.rr = p.r0; p.th = Math.atan2(my0, mx0); p.R = 34 + (Rmax - 34) * Math.sqrt(Math.random()); p.om = (1.05 + Math.random() * .4) * Math.sqrt(140 / Math.max(50, p.R)); p.t0 = Math.random() * 700; }
      if(kind === 'burst'){ var bx = p.x + p.w / 2 - cx, by = p.y + p.h / 2 - cy, bd = Math.sqrt(bx * bx + by * by) || 1, sp = 1200 + 2000 * Math.sqrt(1 - Math.min(1, bd / D)); p.t0 = 420 + bd / 2.4; p.vx = bx / bd * sp; p.vy = by / bd * sp - 200; p.va = (Math.random() - .5) * 1400; }
    });
    var t00 = performance.now(), last = t00;
    /* fall: gravity, a bounce or two, then it lies down on the pile */
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
    /* float: up like bubbles, with a little wandering, to gather under the header and bob there */
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
    /* flee: a spring holds each piece at home; the cursor pushes them away; a first jolt from the middle shows they are alive */
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
    /* swirl: drawn from where it stood into an orbit around the middle, the inner rings faster, every piece turned along its ring */
    function stepSwirl(p, dt, t){
      if(t < p.t0) return true;
      var u = Math.min(1, (t - p.t0) / 1900), e = 1 - Math.pow(1 - u, 3);
      p.rr = p.r0 + (p.R - p.r0) * e; p.th += p.om * dt * (.2 + .8 * e);
      p.x = cx + Math.cos(p.th) * p.rr - p.w / 2; p.y = cy + Math.sin(p.th) * p.rr - p.h / 2;
      p.a = p.th * 180 / Math.PI + 90;
      return true;
    }
    /* burst (without the library): straight out and away, a little gravity */
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
    if(kind === 'seals'){   /* the sheet of seals lifts off as one — ninety separate transitions is what made this heavy */
      layer.style.transition = 'opacity .5s var(--ease), transform .5s var(--ease)'; layer.style.transformOrigin = '50% 42%';
      void layer.offsetWidth; layer.style.opacity = '0'; layer.style.transform = 'scale(1.04)';
      surOld = layer; surT = setTimeout(function(){ layer.remove(); if(surOld === layer) surOld = null; }, 620); return;
    }
    if(end){ var ms = end(); surOld = layer; surT = setTimeout(function(){ layer.remove(); if(surOld === layer) surOld = null; cpage.classList.remove('surhid'); }, ms); return; }
    /* back to their places — measured again, in case the sheet was scrolled meanwhile */
    var rng = document.createRange(), maxD = 0;
    pieces.forEach(function(p){
      var nr = null; try{ if(p.kind === 'ch'){ if(p.node.isConnected){ rng.setStart(p.node, p.i); rng.setEnd(p.node, p.i + 1); nr = rng.getBoundingClientRect(); } } else if(p.el.isConnected) nr = p.el.getBoundingClientRect(); }catch(e){}
      if(!nr || !nr.width){ p.s.style.transition = 'opacity .4s'; p.s.style.opacity = '0'; return; }
      var a = ((p.a % 360) + 540) % 360 - 180;   /* the shortest way round */
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
  /* the contact page: a sheet of paper over the site; sending composes a mail to him in the visitor's own mail app */
  var cpage = document.getElementById('cpage'), cpform = document.getElementById('cpform'), cpLast = null, cpT = 0, cpPushed = false; var surHintT = 0;
  function cpOpen(){
    if(!cpage || !cpage.hidden) return; clearTimeout(cpT);
    cpLast = document.activeElement; var hdEl = document.querySelector('.hd'); if(hdEl) cpage.style.setProperty('--hdh', hdEl.offsetHeight + 'px');   /* the sheet begins under the site's header, which stays usable */
    /* one bar only: the page's CONTACT label and × move into the header (the logo's and the hamburger's places) while it is open */
    var cpx0 = document.getElementById('cpx'), cpl0 = cpage.querySelector('.cp-lab'), nav0 = hdEl && hdEl.querySelector('.nav');
    if(hdEl && cpl0) hdEl.insertBefore(cpl0, hdEl.firstChild); if(nav0 && cpx0) nav0.appendChild(cpx0);
    cpage.hidden = false; cpage.classList.remove('out'); void cpage.offsetWidth; cpage.classList.add('in');
    if(mkbtn){ if(mkbtn.__t === undefined) mkbtn.__t = mkbtn.title; mkbtn.title = 'ちょっとしたサプライズの表示／非表示'; }
    document.documentElement.classList.add('cpopen'); if(window.__rvSuppress) window.__rvSuppress();   /* v286 */
    cpZoom(true);   /* v315: 欄を押しても画面が寄らないように（この画面のあいだだけ） */
    cpRot();   /* v288: 横持ちで開いたなら「ここは縦持ちでも大丈夫」と伝える */
    if(menu && menu.classList.contains('open')) setMenu(false); togFit();
    clearTimeout(surHintT); document.documentElement.classList.add('surhint'); surHintT = setTimeout(function(){ document.documentElement.classList.remove('surhint'); }, 7000);   /* v93: the surprise toggle blinks for a while, so a visitor who came to write notices it */
    try{ history.pushState({cp:1}, '', '#write'); cpPushed = true; }catch(e){ cpPushed = false; }
    var done = document.getElementById('cpdone'); if(done) done.hidden = true; var err = document.getElementById('cperr'); if(err) err.textContent = '';
    var act0 = cpage.querySelector('.cp-act'); if(act0 && done && done.parentNode !== act0) act0.appendChild(done);   /* v314: 送れた知らせは「送る」の右隣に */
    setTimeout(function(){ var f = cpage.querySelector('input'); if(f) f.focus(); }, 500);
  }
  /* v312: 便りが届いた合図。紙面と同じ道具立てで——中央に朱の印を一つ押し、
     紙・墨・朱の紙吹雪がひとしきり降る。二秒半ほどで引き、要素は片づける。
     動きを控える設定の端末では、印だけを静かに出す */
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
    var seal = document.createElement('span'); seal.className = 'yay-seal';   /* v315: 判は包みに入れて動かす（svg そのものを動かすと、実機の Safari で行方が変わる） */
    seal.appendChild(cpYaySeal()); el.appendChild(seal);
    var ring = document.createElement('i'); ring.className = 'yay-ring'; el.appendChild(ring);   /* 押した拍子の輪 */
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
    /* v323: 組（CSS animation）は、置いたばかりの要素だと実機の Safari が取りこぼすことがある。
       動かせる環境では JavaScript の側から直に動かす（こちらは必ず頭から走る）。
       使えない環境のためだけに、これまでの CSS の組も .on として残してある */
    var WA = typeof el.animate === 'function';
    if(!WA) el.classList.add('on');
    document.body.appendChild(el);
    if(WA){
      var EI = 'cubic-bezier(.2,.9,.3,1)', T0 = 'translate(-50%,-50%) rotate(-9deg)';
      seal.animate([
        {opacity:0, transform:'translate(-50%,-50%) rotate(-16deg) scale(1.52)', offset:0},
        {opacity:.98, offset:.38},
        {opacity:.98, transform:T0 + ' scale(.955)', offset:.58},
        {opacity:.96, transform:T0 + ' scale(1.018)', offset:.76},
        {opacity:.94, transform:T0 + ' scale(1)', offset:1}
      ], {duration:640, easing:EI, fill:'both'});
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
  /* v288: メールを送るを横持ちで開いたときの小さな知らせ。案内の端末の絵をそのまま借り、動きだけ逆に回して
     「横 → 縦」に見せる（確認の印は縦の姿の側へ移す）。紙面の操作は妨げない */
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
      if(ok && pP){ var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'okpos'); g.setAttribute('transform', 'translate(-24,-26)'); g.appendChild(ok); pP.appendChild(g); }   /* 印は縦の姿の右肩へ */
      sv.setAttribute('viewBox', '38 36 160 126');   /* v310: 絵のまわりの余白を落として、箱の縦を詰める（絵そのものは大きくなる） */
      cpRotEl.appendChild(sv);
      var tx = document.createElement('div'); tx.className = 'cprot-tx';
      cpRotEl.appendChild(tx);
      document.body.appendChild(cpRotEl);
    }
    var t = cpRotEl.querySelector('.cprot-tx');
    t.innerHTML = en ? '<b>Portrait is fine here.</b><span>Sorry for the trouble so far.</span>'
                     : '<b class="mixed" data-big="縦持ち|大丈夫"><span class="w">縦持ちでも、大丈夫です。</span></b><span>ここまでご不便をおかけしました。</span>';
    if(!en && typeof mixedSubs === 'function') mixedSubs(true);   /* v289: 見出しと同じ混植（漢字ゴシック・かな明朝、要の語を大きく、句読点は朱） */
    cpRotEl.classList.remove('on'); void cpRotEl.offsetWidth; cpRotEl.classList.add('on');
    clearTimeout(cpRotT); cpRotT = setTimeout(function(){ cpRotEl.classList.remove('on'); }, 5200);
  }
  /* v315: 実機の Safari は、幅を決め打ちにした紙面で入力欄に触れると、その欄が読める大きさまで
     画面を寄せてしまう。字を 16px 以上にしても、紙面ごと縮めて映しているこの作りでは止まらない。
     そこで「メールを送る」を開いているあいだだけ、拡大の自動追従を切る。閉じたら元に戻す。
     指でのつまむ操作は iOS では残る（この指定は自動の寄せにだけ効く） */
  var cpVpWas = null;
  function cpZoom(on){
    if(!document.documentElement.classList.contains('handheld')) return;
    var m = document.querySelector('meta[name="viewport"]'); if(!m) return;
    if(on){
      if(cpVpWas === null) cpVpWas = m.getAttribute('content') || '';
      var c = cpVpWas.replace(/,?\s*(user-scalable|maximum-scale)=[^,]*/g, '');
      m.setAttribute('content', c + ',maximum-scale=1,user-scalable=no');
    } else if(cpVpWas !== null){
      m.setAttribute('content', cpVpWas); cpVpWas = null;
    }
  }
  function cpClose(fromPop){
    if(!cpage || cpage.hidden) return; clearTimeout(cpT);
    surStop(true); if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; cpage.classList.remove('surhid'); }
    cpage.classList.remove('in'); cpage.classList.add('out'); document.documentElement.classList.remove('cpopen');
    cpZoom(false);   /* v315: 拡大の自動追従を元に戻す */
    if(cpRotEl){ clearTimeout(cpRotT); cpRotEl.classList.remove('on'); }   /* v288 */
    if(window.__rvPortrait) window.__rvPortrait();   /* v286: 閉じた時点で縦持ちなら案内を出す */
    var bar = cpage.querySelector('.cp-bar'), cpx1 = document.getElementById('cpx'), cpl1 = document.querySelector('.hd .cp-lab'); if(bar){ if(cpl1) bar.appendChild(cpl1); if(cpx1) bar.appendChild(cpx1); }   /* and back into the page */
    cpT = setTimeout(function(){ cpage.hidden = true; cpage.classList.remove('out'); }, 620);
    if(mkbtn && mkbtn.__t !== undefined) mkbtn.title = mkbtn.__t; togFit();
    if(cpPushed && !fromPop){ cpPushed = false; try{ history.back(); }catch(e){} }
    cpPushed = false;
    if(cpLast && cpLast.focus) try{ cpLast.focus(); }catch(e){}
  }
  window.addEventListener('popstate', function(){ if(cpage && !cpage.hidden) cpClose(true); });
  document.querySelectorAll('#ftcta').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); cpOpen(); }); });
  ['cpx', 'cpback'].forEach(function(id){ var el = document.getElementById(id); if(el) el.addEventListener('click', function(e){ e.preventDefault(); cpClose(); }); });
  document.addEventListener('keydown', function(e){
    if(!cpage || cpage.hidden) return;
    if(e.key === 'Escape'){ e.preventDefault(); cpClose(); return; }
    if(e.key === 'Tab'){ var f = Array.prototype.filter.call(cpage.querySelectorAll('button, input, textarea, a[href]'), function(x){ return !x.disabled && x.offsetParent !== null && !x.closest('.sur'); }); if(!f.length) return; var first = f[0], last = f[f.length - 1]; if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }   /* the focus stays on the page */
  });
  /* v132: the letter is sent from the page itself. CONTACT_URL is a Google Apps Script of my own (site/src/
     contact/Code.gs) that receives the fields and mails them on; nothing of the sender's mail app is opened.
     While it is empty — or if the send fails — the old behaviour stands in, so the form is never a dead end. */
  var CONTACT_URL = 'https://script.google.com/macros/s/AKfycbwfu7rDCJiKtp7uO724XCCPoT_fqO2KuZq6UX7JXH_AMEeOrQ3-CpAmXtl4-piH1Yob/exec';
  if(cpform) cpform.addEventListener('submit', function(e){
    e.preventDefault();
    var en = curLang === 'en', g = function(n){ var el = cpform.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; }, name = g('name'), mail = g('email'), subj = g('subject'), msg = g('msg'), err = document.getElementById('cperr'), bad = [];
    cpform.querySelectorAll('label').forEach(function(l){ l.classList.remove('bad'); });
    var hidN = cpform.querySelector('[name="hideName"]'), hidM = cpform.querySelector('[name="hideMail"]');   /* v304: それぞれ伏せて送る */
    var hideName = !!(hidN && hidN.checked), hideMail = !!(hidM && hidM.checked), anon = hideName || hideMail;
    if(!hideName && !name) bad.push('name');
    if(!hideMail && (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))) bad.push('email');
    if(!msg) bad.push('msg');
    bad.forEach(function(n){ var el = cpform.querySelector('[name="' + n + '"]'); if(el && el.closest('label')) el.closest('label').classList.add('bad'); });
    if(bad.length){ if(err) err.textContent = (en ? ('Please fill in ' + [bad.indexOf('name') >= 0 ? 'your name' : '', bad.indexOf('email') >= 0 ? 'a valid email address' : '', bad.indexOf('msg') >= 0 ? 'a message' : ''].filter(Boolean).join(', ') + '.')
                                                     : ([bad.indexOf('name') >= 0 ? 'お名前' : '', bad.indexOf('email') >= 0 ? '正しいメールアドレス' : '', bad.indexOf('msg') >= 0 ? 'メッセージ' : ''].filter(Boolean).join('・') + 'をご記入ください。')); var f = cpform.querySelector('[name="' + bad[0] + '"]'); if(f) f.focus(); return; }
    if(err) err.textContent = '';
    var subject = subj || ((en ? 'From the portfolio site' : 'ポートフォリオサイトより') + ' — ' + name);
    var bodyTxt = msg + '\n\n' + (en ? 'Name: ' : 'お名前：') + name + '\n' + (en ? 'Email: ' : 'メールアドレス：') + mail;
    var href = 'mailto:' + ['shuzo.kosaka1018', 'gmail.com'].join('@') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyTxt);   /* v134: the address is not written anywhere in the page — it is put together here, only when the send has failed */
    var btn = cpform.querySelector('.cp-send'), lab = btn ? btn.querySelector('b') : null, labWas = lab ? lab.textContent : '';
    var done = document.getElementById('cpdone');

    function show(txt){ if(done){ done.textContent = txt; done.hidden = false; done.scrollIntoView({block:'nearest', behavior:'smooth'}); } }
    function release(){ if(btn) btn.disabled = false; if(lab) lab.textContent = labWas; }
    function openMail(){ var a = document.createElement('a'); a.href = href; a.style.display = 'none'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 1000); }   /* a link click rather than location.href: the page stays where it is */
    function fallback(){   /* the page could not send it — hand it to the mail app, and say so */
      if(hideMail){   /* v304: 宛先を伏せて送るときは、メールソフト（＝送り主の宛先が出る）は開かない */
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
    /* text/plain keeps this a simple request: Apps Script answers no preflight */
    fetch(CONTACT_URL, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify({
      name: hideName ? '' : name, email: hideMail ? '' : mail, subject:subj, msg:msg, company:g('company'), anon: anon, hideName: hideName, hideMail: hideMail, lang: en ? 'en' : 'ja'
    })}).then(function(r){ return r.json().catch(function(){ return {ok: r.ok}; }); })
      .then(function(res){
        if(settled) return; settled = true; clearTimeout(giveUp);
        if(res && res.ok){
          release(); cpform.reset();
          show(en ? 'Sent — thank you.' : '送信しました。ありがとうございます。');
          cpYay();   /* v312: 届いた合図に、印を一つ押して紙吹雪 */
        } else fallback();
      })
      .catch(function(){ if(settled) return; settled = true; clearTimeout(giveUp); fallback(); });
  });
  window.addEventListener('keydown', function(e){ var ae = document.activeElement, typing = ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable); if(e.key === 'g' && !e.metaKey && !e.ctrlKey && !typing && !(cpage && !cpage.hidden)){ document.documentElement.classList.toggle('grid'); togFit(); } });

  /* v88: beside the works' seal, on the empty right — 挑戦と失敗、その反復. A hand keeps drawing the works' frame freehand: each try is drawn with a live stroke, then fades to a trace while the next begins, a little steadier each time; the eighth is nearly true and in 朱; then the sheet clears and it starts over. A counter keeps the tally. Runs only while it is on screen */
  function wkTry(){
    var box = document.querySelector('#works .wk-try'), vt = document.querySelector('#works .wk-vt'); if(!box || !vt || reduce) return; var svg = box.querySelector('svg'), num = document.querySelector('#works .wk-n b') || box.querySelector('b'); if(!svg) return;
    function fit(){   /* the box round the heading, with room for the hand's wander */
      var w = vt.offsetWidth, h = vt.offsetHeight, px = Math.max(26, w * .16), py = Math.max(22, h * .09);
      box.style.left = (vt.offsetLeft - px).toFixed(0) + 'px'; box.style.top = (vt.offsetTop - py).toFixed(0) + 'px'; box.style.width = (w + 2 * px).toFixed(0) + 'px'; box.style.height = (h + 2 * py).toFixed(0) + 'px';
    }
    fit(); window.__wkTryFit = fit; window.addEventListener('resize', fit);
    var N = 150, base = [], k, R = 186, L = 2 * Math.PI * R + 240;   /* the frame's outline as N points by arc length: over the top, down the right, under the bottom, up the left; each with its outward normal */
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
  /* v86: the works' frames do nothing when clicked (they used to carry href="#", which went to the top) */
  document.querySelectorAll('.wkf').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); }); });
  /* v270: スマホ — タップで色が付くとき、白黒のフィルタを外す代わりに、色の写真（.phc）を下に敷いて白黒（.ph）を透明にする。
     フィルタを外すと WebKit が写真を描き直し、その間だけ紙の白が見えていた。色の写真は最初にタップしたときに一枚だけ足す */
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
  /* (v102: the light now lives on the frame itself — see .wkf:hover in the sheet — so it travels with the photo) */
  /* (v95: the frames' ink moved to an svg filter in the defs — see build5_v74 DEFS/wkink2 — because WebKit never paints CSS filter functions on an svg <use>.) */
  /* video facades: the real YouTube thumbnail replaces the placeholder when it can be loaded (blocked in the preview sandbox, fine on the public site) */
  document.querySelectorAll('a.vid[href*="youtu"]').forEach(function(a){
    var m = a.getAttribute('href').match(/(?:youtu\.be\/|v=)([\w-]{6,})/), th = a.querySelector('img.th');
    if(!m || !th) return;
    /* v274: 自前の絵が 1280 幅で用意されている（公開版の srcset）なら YouTube には取りに行かない。
       この動画の YouTube 側の最大は 640 で、自前の方が細かい。無い場合だけ 1280 の maxresdefault を一度だけ試す */
    var ss = th.getAttribute('srcset') || ''; if(/\b1[2-9]\d\dw\b/.test(ss)) return;
    var id = m[1], tries = ['maxresdefault'];
    (function next(){
      var name = tries.shift(); if(!name) return;
      var im = new Image();
      im.onload = function(){ if(im.naturalWidth >= 1280){ th.style.opacity = '0'; setTimeout(function(){ var pic = th.parentNode; if(pic && pic.tagName === 'PICTURE'){ Array.prototype.slice.call(pic.querySelectorAll('source')).forEach(function(so){ so.remove(); }); } th.removeAttribute('srcset'); th.removeAttribute('sizes'); th.src = im.src; th.style.opacity = '1'; }, 300);   /* v273: 公開版は <picture> の <source>（webp）が img より優先される。仮の絵の source を外してから差し替える */ } else next(); };   /* v272: 公開版は仮の絵に srcset が付く。srcset は src より優先されるので、外してから差し替える */
      im.onerror = next;
      im.src = 'https://img.youtube.com/vi/' + id + '/' + name + '.jpg';
    })();
  });
  /* v95: the first click swaps the player in, right there (the page carries no player until then); if that fails, the href still opens YouTube.
     Opened from file:// the browser sends no Referer and YouTube refuses the embed (error 153) — there the facade keeps opening a tab, and says so. */
  var vidLocal = location.protocol === 'file:';
  document.querySelectorAll('a.vid[href*="youtu"]').forEach(function(a){
    var m = a.getAttribute('href').match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
    if(!m) return;
    if(vidLocal){ var s = a.querySelector('.s'); if(s) s.textContent = 'YOUTUBE · 公開版ではこの場所で再生'; return; }
    a.addEventListener('click', function(e){
      if(a.classList.contains('play')){ e.preventDefault(); return; }   /* v97: the player owns the box — a stray click must never follow the href to YouTube */
      e.preventDefault();
      var f = document.createElement('iframe');
      f.setAttribute('src', 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&enablejsapi=1');
      /* v146: the film starts at half volume. The player is told through the iframe API, so no script of
         YouTube's is loaded; the command is repeated for a few seconds because the player answers only once it
         is ready. On a phone or tablet the volume belongs to the hardware and the command is ignored — that is
         YouTube's own rule, and there is nothing on our side that changes it. */
      f.addEventListener('load', function(){
        var w = f.contentWindow; if(!w) return; var tries = 0;
        var tick = setInterval(function(){
          try{ w.postMessage(JSON.stringify({event:'command', func:'setVolume', args:[50]}), '*'); }catch(err){}
          if(++tries > 10) clearInterval(tick);
        }, 400);
      });
      var t = a.querySelector('.t'); f.setAttribute('title', t ? t.textContent : 'YouTube');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      a.classList.add('play'); a.appendChild(f);
      a.addEventListener('mouseenter', function(){ cur.classList.add('away'); });
      a.addEventListener('mouseleave', function(){ cur.classList.remove('away'); });   /* v101: the player owns the pointer; a frozen crosshair over it just looks broken */
    });
  });

  /* language toggle: JA ⇄ EN for every text on the page. Each container swaps between its captured Japanese and the English in I18N; split headings are re-split, the Japanese mixed setting and kerning are applied only in JA, and the optical alignment runs for both. */
  /* the switch types the new text in — quickly — for whatever is on screen; the rest just swaps */
  var NZ_JA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
  var NZ_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nz(ch){   /* a stand-in glyph of the same script, for the characters still turning over */
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
            else if(acc < shown + 2){ u.ch.style.visibility = ''; u.ch.textContent = nz(u.t); }   /* two characters ahead of the front are still turning over */
            else u.ch.style.visibility = 'hidden';
            acc += 1;
          }
          else {
            var take = Math.max(0, Math.min(u.full.length, shown - acc)), want = u.full.slice(0, take);
            var span = Math.min(3, u.full.length - take), tail = '';
            for(var q = 0; q < span; q++) tail += nz(u.full.charAt(take + q));   /* the next letters flicker through their alphabet before settling */
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
  /* v302: 言語を切り替えると文の長さが変わり、読んでいた場所が上下にずれていた。
     切り替える前に「画面の上端にいちばん近い一文」を覚えておき、組み直しが落ち着くたびに同じ位置へ戻す。
     ピン留めの場面は文ではなく進み具合（節の中の割合）で覚える */
  var LANGSEL = 'p.p, .sub, h2, figure, .vid';
  function langDocTop(el){ var y = 0; while(el){ y += el.offsetTop; el = el.offsetParent; } return y; }
  function langAnchor(){
    var vhh = vh(), secs = document.querySelectorAll('section[id]'), sec = null;
    for(var i = 0; i < secs.length; i++){ var r = secs[i].getBoundingClientRect(); if(r.top <= 8 && r.bottom > 8){ sec = secs[i]; break; } }
    if(!sec) return null;
    if(sec.classList.contains('pin') || sec.querySelector('.stick, .solopin')) return {id:sec.id, pin:true, p:(window.scrollY - sec.offsetTop) / Math.max(1, sec.offsetHeight - vhh)};   /* v306: 貼り付いた（sticky）中身のある節は、文ではなく進み具合で覚える。文の位置は動かないので合わせられない */
    var list = sec.querySelectorAll(LANGSEL), best = -1, bestTop = 1e9;
    for(var j = 0; j < list.length; j++){ var t = list[j].getBoundingClientRect().top; if(t > -60 && t < vhh * .9 && t < bestTop){ bestTop = t; best = j; } }
    if(best < 0) return {id:sec.id, off:window.scrollY - sec.offsetTop};
    /* v306: 画面の中の見え方（rect）ではなく、紙面の中の位置（offsetTop の積み上げ）で覚える。
       浮き上がりの transform や貼り付き（sticky）に左右されず、一度で決まる。
       ただし、スクロールに連れて中身ごと動かしている節（第 7 章など）は、位置ではなく進み具合で覚える */
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
      /* v306: 紙面の位置で合わせたうえで、見え方のずれ（スクロールに連れて動く中身の transform）を数回で詰める */
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
    /* v120: the switch is a pass of the translator's rule — a ruled band sweeps the screen, carrying the pair of
       languages with it, and the page changes tongue as it goes by. The text swap below happens under the band. */
    (function(){
      var sw = document.getElementById('lgsw');
      if(!sw){ sw = document.createElement('div'); sw.id = 'lgsw'; sw.className = 'lgsw'; sw.setAttribute('aria-hidden', 'true');
        sw.innerHTML = '<i class="bar"></i><span class="tag"><b></b><em>\u2192</em><b class="to"></b></span>'; document.body.appendChild(sw); }
      sw.querySelector('.tag b').textContent = en ? 'JA' : 'EN';
      sw.querySelector('.tag b.to').textContent = en ? 'EN' : 'JA';
      sw.classList.remove('run'); void sw.offsetWidth; sw.classList.add('run');
    })();
    curLang = lang;
    surStop(true); if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; if(cpage) cpage.classList.remove('surhid'); }
    var changed = [];
    i18nEls.forEach(function(el){
      if(!el.isConnected || el.__ja === undefined) return;
      var tr = en ? I18N[el.__ja.replace(/\s+/g, ' ').trim()] : (el.__sw ? el.__ja : undefined);   /* only what was translated is restored */
      if(tr === undefined) return;
      el.__sw = en; el.innerHTML = tr; changed.push(el);
      if(el.classList.contains('split') || el.classList.contains('scx')) splitEl(el);
    });
    /* ch2's translation wipe runs the other way in English: Japanese underneath, English revealed */
    wipes.forEach(function(wipeEl){ var wEn = wipeEl.querySelector('.en'), wJa = wipeEl.querySelector('.ja'); if(!wEn || !wJa) return;
      if(wipeEl.classList.contains('scr')){ var sc = wEn.querySelector('.sc'); if(sc) sc.innerHTML = wJa.innerHTML; return; }   /* ch3: the scrawl underneath is always the same text as the layer above, so the lines break alike */
      if(wEn.__ja !== undefined && wJa.__ja !== undefined){ wEn.innerHTML = en ? wJa.__ja : wEn.__ja; } });
    /* the highlights inside the replaced text are new elements: watch them again, or they never draw */
    changed.forEach(function(el){ el.querySelectorAll('mark').forEach(function(m){ if(!m.closest('[data-at]')) ioM.observe(m); }); });
    soloReset();
    ttlClasses(!en); ttlWords(!en); opticalAlign(); mixedSubs(!en);
    if(!en){ document.querySelectorAll('#top .rot span, .menu .mmsg .txt .mx, #message .mh .mx').forEach(mixSet); }
    meanWrap(); hugLine(); tagAlign(); ftFit(); ovalFit(); msgFitDone = false;
    document.querySelectorAll('[data-en][data-ja]').forEach(function(el){ if(el.querySelector('.ch') || el.__ja !== undefined || el.children.length) return; el.textContent = el.getAttribute(en ? 'data-en' : 'data-ja'); });   /* only the plain two-way labels: the menu's cards carry data-en for their seals and must keep their children */
    document.querySelectorAll('.lang button').forEach(function(x){ x.setAttribute('aria-pressed', x.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    if(curSec && curSec.getAttribute('data-year')){ curY = ''; setYear(curSec.getAttribute('data-year')); }
    if(window.__renderThanks) window.__renderThanks();   /* the closing seal is drawn text, so it is redrawn in the other language */   /* the year box's word follows the language */
    document.documentElement.lang = lang; body.classList.toggle('en', en); curHd = null; chapUpdate();
    if(!quiet) typeEls(changed);
    document.querySelectorAll('.sr li .st, #mseals li .st').forEach(function(st){ while(st.firstChild) st.removeChild(st.firstChild); });
    document.querySelectorAll('#mseals > li').forEach(function(li, i){ var st = li.querySelector('.st'); if(st) st.appendChild(stampSvg(li, i)); });
    if(window.__mapStamp) window.__mapStamp();
    if(window.__dgCaps){ document.querySelectorAll('#dgsvg .dg-cap text').forEach(function(t){ t.__mixed = false; }); setTimeout(window.__dgCaps, 0); }   /* v244 */
    setTimeout(function(){ rallyBuild(); }, 60);
    setTimeout(togFit, 720);   /* the toggles' labels are typed in first */
    setTimeout(function(){ if(window.__wkTryFit) window.__wkTryFit(); }, 120);   /* the sketch round the works' heading follows its new shape */
    if(langAnc && !quiet){   /* v302/v306: 組み直しが落ち着くたびに、読んでいた場所へ戻す。
       読み手が自分で動かしたら（指・ホイール・キー）そこでやめる。位置の差で判断すると、直したいずれ自体を
       「自分で動かした」と誤って読んでしまうため、入力そのものを合図にする */
      var moved = false, onUser = function(){ moved = true; };
      ['wheel', 'touchstart', 'keydown'].forEach(function(ev){ window.addEventListener(ev, onUser, {passive:true}); });
      var keep = function(){ if(!moved) langRestore(langAnc); };
      requestAnimationFrame(function(){ requestAnimationFrame(keep); });
      var t0 = Date.now(), iv = setInterval(function(){
        keep();
        if(moved || Date.now() - t0 > 3000){ clearInterval(iv); ['wheel', 'touchstart', 'keydown'].forEach(function(ev){ window.removeEventListener(ev, onUser); }); }
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
  /* v310: PC で窓を狭めていくと、ある幅からタブレット向けの組みに切り替わる。
     そこから先は、縦持ちのときと同じ作りの案内で画面をいったん覆い、窓を広げてもらう。
     幅を戻すと消える（指の端末では出さない） */
  (function(){
    var H = document.documentElement;
    if(H.classList.contains('phone')) return;   /* スマホは横持ちの案内があるので出さない */
    var TAB = H.classList.contains('tablet');
    var mq = window.matchMedia('(max-width:1024px)'), el = null, copied = '';
    /* v319: タブレットは幅を 1280 に決め打ちしているので、窓を狭めても幅の合図は来ない。
       そのかわり画面の形（縦横の比）で見る。窓が細くなるほど、決め打ちの幅に対して縦が長くなる */
    function narrowNow(){ return TAB ? (window.innerHeight / Math.max(1, window.innerWidth) >= 1.45) : mq.matches; }
    var NWCOPY = {
      ja: {small:'おっと、タブが少し狭いようです。', b:'目を細める前に、<br>窓を大きく。', big:'目|窓', note:'できれば、ゆとりのある幅でお楽しみください。'},
      en: {small:'Oops — the window is a little narrow.', b:'Before you squint,<br>widen the window.', big:'squint|window', note:'If you can, enjoy it with a bit more room.'}
    };
    function icon(){
      /* 窓が斜めに広がる。枠・見出しの棒・中の行・左右の矢・右下の斜めの矢が、同じ拍で一緒に動く */
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
        '<g class="nw-ar"><path d="M68 96h-14M58 90l-6 6 6 6"/>' + T('0,0;0,0;-46,0;-46,0;0,0') + '</g>' +
        '<g class="nw-ar"><path d="M152 96h14M162 90l6 6-6 6"/>' + T('0,0;0,0;46,0;46,0;0,0') + '</g>' +
        '<g class="nw-ar nw-dg"><path d="M152 130l11 9M154 139h9v-9"/>' + T('0,0;0,0;46,32;46,32;0,0') + '</g>' +
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
    function tone(){   /* いま見ている場面の地と字の色を借りる */
      if(!el) return;
      var c = getComputedStyle(document.body), g = function(n, d){ var v = (c.getPropertyValue(n) || '').trim(); return v || d; };
      el.style.setProperty('--nwbg', g('--bg', '#E84518'));
      el.style.setProperty('--nwfg', g('--fg', '#FBF7F2'));
      el.style.setProperty('--nwac', g('--acc', '#E84518'));
      el.style.setProperty('--nwln', g('--line', 'rgba(255,255,255,.3)'));
    }
    var toneRaf = 0;
    window.addEventListener('scroll', function(){ if(!el || !el.classList.contains('on') || toneRaf) return; toneRaf = requestAnimationFrame(function(){ toneRaf = 0; tone(); }); }, {passive:true});
    /* v320: 案内が出ているあいだは紙面を動かさない（縦持ちの案内と同じ扱い） */
    function nwBlock(e){ if(H.classList.contains('nwon')) e.preventDefault(); }
    window.addEventListener('wheel', nwBlock, {passive:false});
    window.addEventListener('touchmove', nwBlock, {passive:false});
    function check(){
      if(narrowNow()){ words(); build(); tone(); el.classList.add('on'); H.classList.add('nwon'); }
      else if(el){ el.classList.remove('on'); H.classList.remove('nwon');
        if(window.__rvRecheck) setTimeout(window.__rvRecheck, 260); }   /* v321: 窓を広げたあと、縦持ちならそちらの案内へ */
    }
    if(mq.addEventListener) mq.addEventListener('change', check); else if(mq.addListener) mq.addListener(check);
    window.addEventListener('resize', check, {passive:true});
    window.__narrowCheck = check;
    setTimeout(check, 900);
    window.addEventListener('orientationchange', function(){ setTimeout(check, 420); });
  })();
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang')); try{ localStorage.setItem('kosaka-lang', b.getAttribute('data-lang')); }catch(e){} }); });
  /* the chosen language survives a reload (per browser); the opening itself stays Japanese */
  try{ if(localStorage.getItem('kosaka-lang') === 'en') setLang('en', true); }catch(e){}
})();

/* dist: the works frames' photos load after the page is up (their <image> hrefs wait in data-lzhref).
   WebKit does not rebuild a <use> when the element it points at changes, so every frame stayed empty on
   iPhone and iPad — after the hrefs are in, each <use> is replaced by a copy of itself to force it. */
window.addEventListener('load', function(){ setTimeout(function(){
  document.querySelectorAll('image[data-lzhref]').forEach(function(el){ el.setAttribute('href', el.getAttribute('data-lzhref')); el.removeAttribute('data-lzhref'); });
  document.querySelectorAll('use').forEach(function(u){ var h = u.getAttribute('href') || '';
    if(h.indexOf('#wkp_') === 0 && u.parentNode) u.parentNode.replaceChild(u.cloneNode(true), u); });
}, 600); });
