
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
        rows.forEach(function(r){ var cs = getComputedStyle(r.el), px = parseFloat(cs.fontSize), S = 4; if(!(px > 0)){ r.ink = 0; return; } cv.width = Math.max(1, Math.ceil(px * S * 1.6)); cv.height = Math.max(1, Math.ceil(px * S * 1.8)); cx.clearRect(0, 0, cv.width, cv.height); cx.font = cs.fontWeight + ' ' + (px * S) + 'px ' + cs.fontFamily; cx.textBaseline = 'alphabetic'; cx.fillStyle = '#000'; var base = Math.round(px * S * 1.3); cx.fillText(r.el.__t, Math.round(px * S * .2), base); var img = cx.getImageData(0, 0, cv.width, cv.height).data, top = -1; for(var yy = 0; yy < cv.height && top < 0; yy++){ for(var xx = 0; xx < cv.width; xx++){ if(img[(yy * cv.width + xx) * 4 + 3] > 40){ top = yy; break; } } } r.ink = top < 0 ? 0 : (top - (base - px * S)) / S; r.px = px; });
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
    if(curLang !== 'en' && f > 0){ var S = 4; cv.width = Math.max(1, Math.ceil(f * S * 1.6)); cv.height = Math.max(1, Math.ceil(f * S * 1.6)); cx.clearRect(0, 0, cv.width, cv.height); cx.font = tc.fontStyle + ' ' + tc.fontWeight + ' ' + (f * S) + 'px ' + tc.fontFamily; cx.textBaseline = 'top'; cx.fillStyle = '#000'; cx.fillText(sp.textContent.trim().charAt(0), f * S * .3, 0); var d = cx.getImageData(0, 0, cv.width, cv.height).data, found = -1; for(var y = 0; y < cv.height && found < 0; y++){ for(var x = 0; x < cv.width; x++){ if(d[(y * cv.width + x) * 4 + 3] > 40){ found = y; break; } } } if(found >= 0) ink = found / S; }
    var spTop = offY(sp) + (lh - f) / 2 + ink;   /* the top of the first glyph's ink, in the vertical line */
    top.style.setProperty('--tagtop', (tag.offsetTop + (rjTop - spTop)).toFixed(1) + 'px');
    /* v331: スクロールを促す丸。大きさはカタカナの段の幅に合わせ、下の流れる文字の高さから上へ昇る */
    var sd = top.querySelector('.scdot'), nmEl = top.querySelector('.name'), rotEl = top.querySelector('.rot');
    if(sd && nmEl && rotEl){
      var size = Math.max(24, Math.round(tag.offsetWidth)), END = .46, gap = Math.round(size * .33);
      var nr = nmEl.getBoundingClientRect(), rr = rotEl.getBoundingClientRect(), tr = tag.getBoundingClientRect();
      /* v343: 昇りきる高さは、カタカナの段の下端の手前まで。消えぎわに段へ差し掛からないよう、
         終わりの縮み（END）で見た目が小さくなるぶんと余白（gap）を引いて測る */
      var travel = Math.max(Math.round(size * 1.9), Math.round(rr.bottom - tr.bottom - size + size * (1 - END) / 2 - gap));
      sd.style.width = size + 'px'; sd.style.height = (travel + size) + 'px';
      sd.style.left = Math.round(tag.offsetLeft + tag.offsetWidth / 2 - size / 2) + 'px';
      sd.style.top = Math.round(rr.bottom - nr.top - travel - size) + 'px';   /* 起点は流れる文字の下端 */
      sd.style.setProperty('--sctv', travel + 'px');
    }
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
    /* v354: 場面の色を切り替える合図を早める（画面のまん中 → 下から 28%）。
       まん中で切り替えていたため、前の章の中身が抜けたのに地は前の色のまま、という明るい一枚ができていた。
       年と地名の切り替えはこれまでどおり「まん中」で（早めると落ち着かないため） */
    var H = vh(), midS = H*(window.__SCENEMID || .72), midL = H*.5, hitS = null, hit = null, tp = null, bt = null;
    for(var i=0;i<secList.length;i++){ var r = secList[i].getBoundingClientRect();
      if(r.top <= 2 && r.bottom > 2) tp = secList[i];
      if(r.top <= midS && r.bottom > midS) hitS = secList[i];
      if(r.top <= midL && r.bottom > midL) hit = secList[i];
      if(r.top <= H - 2 && r.bottom > H - 2){ bt = secList[i]; break; }   /* the sections are in document order, so the one under the foot of the screen is the last that can matter */
    }
    /* v123: on the phone every chapter paints its own ground, so the middle of the screen is no longer the whole
       truth — the header takes the colour of the chapter behind it, the year and the badge the one at the foot */
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
      if(window.__setTheme) window.__setTheme(bg0.trim());   /* v239: theme-color も同じ色に */
      if(window.__retint) window.__retint();   /* v242: 帯の色を採り直させる */
      if(window.__rvHide) window.__rvHide();   /* v232: 横向きで章が変わるときは、案内用の帯の色（!important）が残っていれば外す（ハッシュ付きで開くと残ることがあった） */
      /* v212: 横持ちで読んでいる章の色を覚えておく。縦にしたときの案内はこの色で塗る */
      if(!window.matchMedia || window.matchMedia('(orientation:landscape)').matches) window.__landCols = {bg: bg0.trim(), fg: (cs0.getPropertyValue('--fg') || '').trim()};
    }   /* v206: html の地も場面の色に（固定の地の下から紙色が覗かないように） */
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
  var hwDone = false, hwDoneT = 0, hwStartAt = 0, hwArrAt = 0, hwDur = 0, hwLastScroll = 0, hwLockOff = false;
  window.addEventListener('scroll', function(){ hwLastScroll = now(); }, {passive:true});   /* v345: 送っている最中に次へ進めないための目印 */   /* v345: 一度出したら、待たせる側へは戻さない */   /* v344: 手書きが描き終わったか（終わったら、スクロールを待たずに次の一文を出す） */

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
  /* v344: 手書きが描き終わるのを待って、次の一文を出す。動く WebP には「終わった」の報せがないので、
     コマの長さを積んだ実測値（data-dur）を使う。読み込みの遅れも拾えるよう、load を待ちつつ保険も置く */
  function hwCountdown(){
    if(!hwv || hwStartAt) return;
    var dur = parseInt(hwv.getAttribute('data-dur'), 10);
    hwDur = dur > 0 ? dur : 3800;
    var go = function(){ if(!hwStartAt) hwStartAt = now(); };
    hwv.addEventListener('load', go, {once:true});
    if(hwv.complete) go();
    setTimeout(go, 900);   /* load が来ないときの保険 */
  }
  /* v345: 次の一文を出す時刻は「手書きが描き終わったとき」と「その画面に着いて一拍おいたとき」の遅いほう。
     手が止まっていても気づけるよう、決まるまでは短い間隔で見張る */
  /* v345: 次の一文へ進む合図は、次の三つがすべて揃ったとき。
     ・手書きが描き終わっている
     ・手書きの画面が画面の六割以上を占めている（まだ滑り込んでいる途中では進めない）
     ・指が止まっている（送っている最中に横入りしない）
     どこで止まっても進めるよう、位置ではなく「止まったこと」を合図にしている */
  function hwCheck(){
    if(hwDone || !hwStartAt) return false;
    var sec = document.getElementById('message'); if(!sec) return false;
    var r = sec.getBoundingClientRect();
    if(!(r.top <= vh() * .55 && r.bottom >= vh())){ hwArrAt = 0; return false; }   /* v346: 送り切れていなくても、次の一枚へ自分で送るので構わない */
    var t = now(); if(!hwArrAt) hwArrAt = t;
    if(t < hwStartAt + hwDur + 260) return false;   /* 描き終わり */
    if(t < hwArrAt + 900) return false;             /* 画面に収まってから一拍 */
    if(t - hwLastScroll < 700) return false;        /* 指が止まってから */
    hwDone = true; return true;
  }
  /* v346: 描き終わったら、次の一枚（サイバーエージェントの皆さまへ）まで自分で送る。
     読み込んで最初の一度だけ。すでに読み手が先へ進んでいるときは何もしない。
     手書きは左の丸の一つめとして残るので、戻ればまた描かれる */
  function hwAdvance(){
    var sec = document.getElementById('message'); if(!sec) return;
    var run = sec.offsetHeight - vh(); if(run <= 0) return;
    var r = sec.getBoundingClientRect(), p = Math.max(0, Math.min(1, (-r.top) / run));
    if(p > .06) return;
    var h = sec.querySelector('[data-athw]'), at = h ? (parseFloat(h.getAttribute('data-at')) || .12) : .12;
    var y = r.top + window.scrollY + run * at + 6;
    if(typeof flyTo === 'function') flyTo(y); else window.scrollTo({top:y, behavior:'smooth'});
  }
  /* v348: 初回の手書きが描いている間だけ、スクロールを止める。
     途中で送られると、見出しと本文が一度に出てしまい、順番が崩れていた。
     止めるのは一度きり。描き終われば（自分で次へ送るので）すぐ外れる。長くても描き終わり＋2.6 秒で外す */
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
      if(hwDone || hwCheck()){ clearInterval(hwDoneT); hwDoneT = 0; hwLockOff = true; window.__hwDone = true; pinUpdate(); if(window.__tailUpdate) window.__tailUpdate(); return; }   /* v350: 自動で次へ送るのはやめ、左の丸が出るのを「まだ先がある」の合図にする */
      if(++cap > 900){ clearInterval(hwDoneT); hwDoneT = 0; }   /* 見張りは三分で切る */
    }, 200);
  }
  function now(){ return window.performance && performance.now ? performance.now() : Date.now(); }
  function pinUpdate(){
    /* v345: 手書きが描いている間は、次の一文も、手書きを奥へ引くのも待たせる。
       スクロールで先に進んでしまうと、描き終わる前に順番が入れ替わって見えるため。
       ただし三分の一より先まで送った人（読まずに飛ばしている）は、これまでどおりの動きにする */
    var hwHold = false;
    if(!hwDone) hwCheck();
    if(hwPlayed && !hwDone){ var msec = document.getElementById('message');
      if(msec){ var mr = msec.getBoundingClientRect(), mt = mr.height - vh();
        hwHold = mt > 0 ? ((-mr.top) / mt) < .12 : true; } }   /* v348: 見出しの来るところまで。ここを越えたら、ふつうの順に任せる（以前は .34 まで抑えていて、見出しと本文が一度に出ていた） */
    pins.forEach(function(pin){
      var r = pin.getBoundingClientRect(); var total = r.height - vh();
      var p = (-r.top) / total; p = Math.max(0, Math.min(1, p));
      pin.querySelectorAll('[data-at]').forEach(function(el){ var at = parseFloat(el.getAttribute('data-at')), off = el.getAttribute('data-off');
        /* v344: data-athw のものは、手書きが描き終わった時点でも出す（スクロールしなくても次へ進む） */
        var on = (p >= at) && (off === null || p < parseFloat(off));
        if(hwHold && el.getAttribute('data-athw') !== null) on = false;   /* v345: 手書きが描き終わるまでは出さない */
        el.classList.toggle('in', on); el.classList.toggle('on', on); });
      var imgs = pin.querySelectorAll('.bgph img');
      if(imgs.length){ var idx = Math.min(imgs.length-1, Math.floor(p * imgs.length * .999)); imgs.forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.spot img').forEach(function(im,i){ im.classList.toggle('on', i === idx && r.top < vh() && r.bottom > 0); });
        pin.querySelectorAll('.bgdot i').forEach(function(d,i){ d.classList.toggle('on', i === idx); }); }
      if(r.top <= 0 && r.bottom >= vh()){ pin.querySelectorAll('.marg').forEach(function(m){ m.classList.add('in'); }); }
      var st = pin.querySelector('.stick'); if(st){ st.style.setProperty('--pp', p.toFixed(3)); if(pin.id === 'ch1pin'){ st.classList.toggle('ringdone', p * 1.9 >= 1); st.classList.toggle('drawing', p * 1.9 > .012); st.classList.toggle('walk', p * 3.4 >= 1);   /* v261: 輪が描き終わって足跡が歩き出したら、輪の線は消す */   /* v225: 輪も 1.9 倍ゆっくり描く（判や札と同じ歩み） */ dgOn = p * 3.4 >= 1 && r.top < vh() && r.bottom > 0; dgP = total > 0 ? (-r.top) / total : 0; dgLeave = p >= (window.__DGT || .86);   /* v352: 中央（.76）から 15vh 空けて描きはじめ、一周に 22.5vh 使う */   /* v351: 薄れは節を出たあとも続けられるよう、頭打ちしない進みで測る */   /* v351: 中央（.76）を読む間を 18vh 取り、そこから輪を描きはじめる */
        /* the footprints walk in with the scroll and are gone once the ring starts to draw */
        fpFade = Math.max(0, Math.min(1, p / .16)); } if(pin.id === 'ch5map') mapUpdate(p); }
      if(pin.id === 'ch5pin'){ pin.classList.toggle('dotson', r.top <= 0 && r.bottom >= vh()); pin.style.setProperty('--pp', p.toFixed(3)); if(!fine){ pin.style.setProperty('--sx', (30 + p * 40).toFixed(1) + '%'); pin.style.setProperty('--sy', '52%'); } }
      if(pin.id === 'message'){
        var vis = r.top < vh()*.6 && r.bottom > vh()*.4;
        if(vis && !hwPlayed){ hwPlayed = true; hw.classList.add('on'); /* v96f: the handwriting is an animated alpha WebP — assigning the src is what starts it, so it draws itself just as the screen is reached (and nothing is fetched before that) */ if(hwv && hwv.dataset && hwv.dataset.src){ hwv.src = hwv.dataset.src; hwv.removeAttribute('data-src'); }
          /* v344: 動く WebP は終わりを知らせてくれないので、コマの長さの合計（data-dur、書き出しのときに実測）を待つ。
             描き終わりに一拍おいてから、次の一文を出す */
          hwCountdown(); hwWatch(); }

        /* v157: these two were fractions of the old 620vh screen. The screen is 840vh now, so in real distance
           the handwriting was still bright when the address arrived (they printed over each other) and the first
           paragraph came while the address was still standing in the middle. Both are back where they were. */
        var ms = document.getElementById('msgstick'); ms.classList.toggle('dim', p >= .10 && !hwHold);   /* v344: 描き終わったら、スクロールを待たずに手書きを奥へ引く／v345: 描いている間は引かない */   /* v231: 手書きは少し早く薄く（最初の文が来るまでの間を詰める） */
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
            /* v348: 一つずつ切って消していたので断片的に見えていた。上から順に、濃さを連なりで落としていく */
          var mt = Math.max(0, Math.min(1, (p - .93) / .07)), mn = Math.max(1, mfs.length - 1);
          for(var mi = 0; mi < mfs.length; mi++){
            var mf = 1 - Math.max(0, Math.min(1, (mt * 1.5 - mi / mn) / .5));
            mfs[mi].style.setProperty('--fade', mf.toFixed(3));
            if(mfs[mi].classList.contains('off')) mfs[mi].classList.remove('off');
          }
        }
        ms.classList.toggle('mtail', p >= .90);   /* v254 */
        hwStill(p >= .10 && !hwHold);   /* v345: 描いている途中で静止画に差し替えない（描き終わりが飛んで見えていた） */   /* v230: 薄くなったら手書きのアニメーション WebP を静止画に（ループのデコードで CPU 40% 食っていた） */   /* v179: the last screen is fixed to the viewport — outside the pinned stretch it must not be there at all */
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
    /* v352: 判の幅が取れない（まだ組み上がっていない）うちは、測り直しの余地を残す */
    if(!(W > 200 && H > 200) || (seals.length && !seals[0].offsetWidth)) return;
    sp.__fit = true; sp.__fitW = W; sp.__fitH = H; sp.__fitN = seals.length;
  }
  function soloUpdate(){
    solos.forEach(function(sp){
      var r = sp.getBoundingClientRect(), total = Math.max(1, r.height - vh()), p = (-r.top) / total; p = Math.max(0, Math.min(1, p)); if(reduce) p = 1;
      if(!sp.__fit || sp.__fitW !== window.innerWidth || sp.__fitH !== vh() || sp.__fitN !== sp.querySelectorAll('.seals i').length) soloFit(sp);   /* v352: 画面の寸法か判の数が変わっていたら測り直す（判を組み直したあと測り直されず、八つとも中央に積まれていた） */
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
  window.__goStep = goStep;   /* v398: 遊びの「研究の手順 08 へ」から呼ぶ */
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
  var dgTrail = null, dgTrailF = [], dgWasOn = false, dgT0 = 0, dgNowPend = -1, dgLeave = false, dgFinT0 = 0, dgFinW0 = 0, dgFinP0 = 0, dgFinSnap = null, dgP = 0, dgGone = false;   /* v347: 最後の一周 */   /* dgNowPend: 歩き出しの判にまだ .in がないとき、付くまで待って波紋を */   /* v257: 輪を歩く足跡と、それぞれの経路上の位置（0〜1）。v260: 見えるたびに輪の起点から歩き直す */
  var DG_ANG = [-90, 148.4, 31.6];
  var DG_A0 = ((360 - DG_ANG[1]) % 360 + 360) % 360, DG_F0 = ((DG_A0 - 180) / 360 + 1) % 1;   /* v263: 歩き出す起点は「場をつくる力」の判（角度と、輪の経路上の割合） */
  var orbitN = 0;
  (function orbit(now){
    /* v224: 指の端末では 2 フレームに 1 回（点が動くたびに図全体が描き直される。半分で十分なめらか） */
    if(!dgOn){ if(dgWasOn){ dgWasOn = false; if(dgTrail) for(var tj = 0; tj < dgTrail.length; tj++) dgTrail[tj].style.opacity = '0'; dgNodes.forEach(function(n){ n.classList.remove('now'); }); } }
    else if(dgSat && !(document.documentElement.classList.contains('handheld') && (++orbitN & 1))){
      if(!dgWasOn){ dgWasOn = true; dgT0 = now; dgLastA = DG_A0; dgNowPend = 1; dgFinT0 = 0; dgGone = false; }   /* v266: 歩き出す判（場をつくる力）にも最初から波紋を */
      if(dgNowPend >= 0 && dgNodes[dgNowPend] && dgNodes[dgNowPend].classList.contains('in')){ dgNow(dgNowPend); dgNowPend = -1; }   /* v260: 輪が描き終わって歩き出すたび起点から。v263: 起点は判の下（判の縁から足跡が伸びて見える） */
      /* v347: 読み手が先へ送ったら、そのときの足跡の位置から一周ぶんを一息に描いて、輪ごと消える。
         戻ってくれば、また歩き出す（歩き続ける演出そのものは変えない） */
      if(!dgLeave && (dgFinT0 || dgGone)){ dgFinT0 = 0; dgGone = false; dgT0 = now - dgFinW0 * 18000; }
      if(dgLeave && !dgFinT0 && !dgGone){ dgFinT0 = now; dgFinW0 = (now - dgT0) / 18000; dgFinP0 = dgP;
        dgFinSnap = []; if(dgTrail) for(var ts = 0; ts < dgTrail.length; ts++) dgFinSnap[ts] = parseFloat(dgTrail[ts].style.opacity) || 0; }   /* v350: 送りはじめの足跡をそのまま引き継いで、そこから輪を継ぎ足す（切り替わりで飛ばない） */
      if(dgGone){ if(dgTrail) for(var tg = 0; tg < dgTrail.length; tg++) dgTrail[tg].style.opacity = '0'; }
      else if(dgFinT0){
        /* v350: 描くのも薄れるのもスクロールに連れて。送れば輪が継ぎ足され、戻せばそのぶん戻る。
           送りはじめの足跡（snap）は残したまま、そこへ輪を重ねるので、切り替わりで飛ばない */
        var u = dgP - dgFinP0, q = Math.max(0, Math.min(1, u / .15));   /* v352: 一周を描き切るまでを 12.8vh → 22.5vh に */
        var fade = .18 + .82 * (1 - Math.max(0, Math.min(1, (u - .15) / .05)));   /* v355: 消えきらず、うっすら残す */
        var f0 = ((dgFinW0 % 1) + 1) % 1;
        if(dgTrail) for(var tf = 0; tf < dgTrail.length; tf++){
          var d = ((dgTrailF[tf] - f0) % 1 + 1) % 1, o2 = 0;
          if(d <= q) o2 = ((q - d) < .03 ? (q - d) / .03 : 1) * .85;   /* 通り過ぎたところから灯っていく */
          var sn = (dgFinSnap && dgFinSnap[tf]) || 0;
          dgTrail[tf].style.opacity = (Math.max(sn, o2) * fade).toFixed(2);
        }
        if(fade <= .19 && u > .3) dgGone = false;   /* v355: 薄く残したままにする（消し切らない） */
      }
      else {
      var w = (now - dgT0) / 18000, a = ((w * 360 + DG_A0) % 360 + 360) % 360;
      /* v257: 点はやめ、足跡が輪を歩く。歩き手の位置 f（輪の経路の割合、左端 a=180° から反時計回り）に対して、
         通り過ぎたばかりの足跡ほど濃く、古いものから薄れて消える（後ろ 30% ぶんだけ残る） */
      if(dgTrail){ for(var ti = 0; ti < dgTrail.length; ti++){ var age = w - dgTrailF[ti], op = 0; if(age >= 0){ age %= 1; op = age < .02 ? age / .02 : age < .26 ? 1 : age < .44 ? 1 - (age - .26) / .18 : 0; }   /* v262: 残す足跡を増やす（一周の 44% ぶん） */ dgTrail[ti].style.opacity = (op * .85).toFixed(2); } }
      DG_ANG.forEach(function(t, i){ var tt = ((360 - t) % 360 + 360) % 360,   /* the nodes are met in the mirrored order, so each one still lights as the dot arrives */ prev = dgLastA, cur = a; var crossed = prev <= cur ? (prev < tt && tt <= cur) : (prev < tt || tt <= cur); if(crossed){ dgNow(i); dgNowPend = -1; } });   /* v265: 足跡が着いた判に、チェックポイントの現在地と同じ波紋を */
      dgLastA = a;
      }
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
    var fpg = footprints(svg, inp, 'dgfp', k, FP_STEP - rest, cnt % 2);
    /* v351: 入ってくる足跡が「WHAT I'M MADE OF」の字を踏んでいた。伏せるのではなく、題字より先に置いて
       （SVG は書いた順に重なる）字の下をくぐらせる */
    var ttl = svg.querySelector('.dg-title'); if(ttl && ttl.parentNode === svg) svg.insertBefore(fpg, ttl);
    window.__dgFps = fpg.querySelectorAll('.dgfp');
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
  function rallyBuild(){ srBuild(); dgBuild(); brBuild(); chsealBuild(); soloSealsBuild(); wkBuild(); fpMeasure(); fpUpdate(); passPlace(); msgTrail(); setTimeout(onScroll, 0);   /* v352: 組み直したら位置も測り直す（スクロールが来ないと測られないままだった） */ }
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
    function held(){ return opening() || !!(window.__hwLock && window.__hwLock()); }   /* v348: 手書きが描いている間も */
    window.addEventListener('touchmove', function(e){ if(held() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('wheel', function(e){ if(held() && e.cancelable) e.preventDefault(); }, {passive:false});
    window.addEventListener('keydown', function(e){ if(held() && /^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End| |Spacebar)$/.test(e.key)) e.preventDefault(); });
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
      if(e.target && e.target.closest && e.target.closest('#gm')) return;   /* v409: 遊びの中はブラウザに任せる（右の列・案内・遊び方） */
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
      var H = vh(), r = sec.getBoundingClientRect(), here = r.top <= 0 && r.bottom >= H;   /* v347: 「目の前のヒトが〜」の丸と同じ出入り（章が画面をつかんでいる間だけ、ふわりと） */
      var p = Math.max(0, Math.min(1, (-r.top) / Math.max(1, sec.offsetHeight - H))), cur = -1;
      items.forEach(function(el, i){ if(p >= parseFloat(el.getAttribute('data-at'))) cur = i; });
      nav.classList.toggle('on', here && cur >= 0 && (!!window.__hwDone || cur >= 1));   /* v346: 手書きが描き終わってから出す。v347: 描き終わる前に先へ送られたときも、二つめ以降に入ったら出す */   /* v168: nothing to count while the handwriting still has the screen to itself */
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
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); var id = a.getAttribute('href'); setMenu(false); if(a.classList.contains('mcontact')){ setTimeout(cpOpen, 420); return; } if(a.classList.contains('mgame')){ setTimeout(function(){ if(window.__gmOpen) window.__gmOpen(); }, 420); return; }   /* v356: 遊び */ setTimeout(function(){ skipTo(id); }, 350); }); });   /* v220: 5 秒スキップの札つき */   /* v85: the CONTACT card opens the contact page */
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
    root.querySelectorAll('input, textarea, button').forEach(function(el){ if(el.closest('[hidden]') || !el.offsetParent || el.classList.contains('cp-hp')) return; var r = el.getBoundingClientRect(); if(!r.width || !r.height || r.top > H - 12 || r.right < 0 || r.left > window.innerWidth) return;   /* v386: 画面の外の欄（迷惑対策の隠し欄）は写さない */ out.push({kind:'ctl', el:el, r:r, role:el.tagName === 'BUTTON' ? 'btn' : 'field'}); });
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
      else if(el.type === 'checkbox'){ s = document.createElement('span'); s.className = 'surp cp-hide'; c.checked = el.checked; s.appendChild(c); }   /* v386: 升目の写しは元と同じ 14px の升目に（.cp-form の欄の余白と下線を受け継いで、一段下がって見えていた） */
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
    clearTimeout(cpHidT); cpHidT = setTimeout(function(){ if(cpage && !cpage.hidden) document.documentElement.classList.add('cphid'); }, 480);   /* v330: 紙面を伏せるのは、紙が上がりきってから（先に伏せると一瞬白くなる） */
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
      var T0 = 'translate(-50%,-50%) rotate(-9deg)';
      /* v334: 全体に掛けていた ease が前へ寄りすぎて、降りてくるところが一瞬で終わっていた。
         区切りごとに動きを付け、降りる間をはっきり見せる */
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
  var cpHidT = 0;   /* 紙が上がりきってから紙面を伏せるまでの待ち */
  function cpClose(fromPop){
    if(!cpage || cpage.hidden) return; clearTimeout(cpT);
    surStop(true); if(surOld){ clearTimeout(surT); surOld.remove(); surOld = null; cpage.classList.remove('surhid'); }
    cpage.classList.remove('in'); cpage.classList.add('out'); document.documentElement.classList.remove('cpopen');
    clearTimeout(cpHidT); document.documentElement.classList.remove('cphid');
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
    bad.forEach(function(n){ var el = cpform.querySelector('[name="' + n + '"]'); if(el && el.closest('label')){ var lb = el.closest('label'); void lb.offsetWidth; lb.classList.add('bad'); }   /* v386: 揺れをやり直せるように一度描く */ });
    if(bad.length){ if(err){ err.textContent = ''; void err.offsetWidth; } if(err) err.textContent = (en ? ('Please fill in ' + [bad.indexOf('name') >= 0 ? 'your name' : '', bad.indexOf('email') >= 0 ? 'a valid email address' : '', bad.indexOf('msg') >= 0 ? 'a message' : ''].filter(Boolean).join(', ') + '.')
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
    (function(){   /* v409: 連絡欄の見出しの先頭の文字と、08 のボタンの読み上げ名も切り替える（本編係） */
      var M = {'お名前':'Name', 'メールアドレス':'Email', '件名':'Subject', 'メッセージ':'Message', '本文':'Message'};
      document.querySelectorAll('.cp-form label > span').forEach(function(sp){ var tn = sp.firstChild; if(!tn || tn.nodeType !== 3) return; var ja = tn.__ja || tn.nodeValue.trim(); if(!M[ja]) return; tn.__ja = ja; tn.nodeValue = en ? M[ja] : ja; });
      var sq = document.getElementById('seqplay'); if(sq) sq.setAttribute('aria-label', en ? 'Open the game: Measure the composition.' : '遊びを開く：絵を、測る。');
    })();
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
    function tone(){   /* いま見ている場面の地と字の色を借りる */
      if(!el) return;
      var c = getComputedStyle(document.body), g = function(n, d){ var v = (c.getPropertyValue(n) || '').trim(); return v || d; };
      el.style.setProperty('--nwbg', g('--bg', '#E84518'));
      el.style.setProperty('--nwfg', g('--fg', '#FBF7F2'));
      el.style.setProperty('--nwac', g('--acc', '#E84518'));
      el.style.setProperty('--nwln', g('--line', 'rgba(255,255,255,.3)'));
    }
    /* v327: 案内が出ているあいだは、色も位置もその場に留める。
       窓の大きさを変えると紙面がひとりでに動き、その動きにつれて地の色が変わり続けていた */
    var nwY = 0;
    window.addEventListener('scroll', function(){
      if(!el || !el.classList.contains('on')) return;
      if(Math.abs(window.scrollY - nwY) > 1) window.scrollTo({top:nwY, behavior:'instant'});
    }, {passive:true});
    /* v320: 案内が出ているあいだは紙面を動かさない（縦持ちの案内と同じ扱い） */
    function nwBlock(e){ if(H.classList.contains('nwon')) e.preventDefault(); }
    window.addEventListener('wheel', nwBlock, {passive:false});
    window.addEventListener('touchmove', nwBlock, {passive:false});
    function check(){
      if(narrowNow()){ var was = el && el.classList.contains('on'); words(); build();
        if(!was){ tone(); nwY = window.scrollY; }   /* 色と居場所は、出たときの一度だけ */
        el.classList.add('on'); H.classList.add('nwon'); }
      else if(el){ el.classList.remove('on'); H.classList.remove('nwon');
        if(window.__rvRecheck) setTimeout(window.__rvRecheck, 260); }   /* v321: 窓を広げたあと、縦持ちならそちらの案内へ */
    }
    if(mq.addEventListener) mq.addEventListener('change', check); else if(mq.addListener) mq.addListener(check);
    window.addEventListener('resize', check, {passive:true});
    window.__narrowCheck = check;
    setTimeout(check, 900);
    window.addEventListener('orientationchange', function(){ setTimeout(check, 420); });
  })();
  /* v329: 画面いっぱいの案内は「いま実際に見えている高さ」に合わせる。
     100vh は道具の帯が隠れている前提の値、100dvh も窓を掴んで動かしている最中は追いつかないことがある。
     visualViewport は動かしている最中も毎回知らせてくれるので、その値を --vvh として配る */
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
  /* the chosen language survives a reload (per browser); the opening itself stays Japanese */
  try{ if(localStorage.getItem('kosaka-lang') === 'en') setLang('en', true); }catch(e){}

                                                                                                                                                                                                                                                                                                                                                                                                      /* ===== v361: 遊び「絵を、測る。」を、応答を軸に組み直した（2026-09-05、ChatGPT Work との議論を踏まえて）。
     五つの状態——なぞる／押す／離して確定／比べる／次へ——を分け、演出の待ち時間を置かない。
     ・導入は一手目に統合（最初から盤面が触れる）。手番の一行に、その盤面で読む対象（山・橋・幹…）を入れる
     ・確定はポインタを離した位置。確定した線は残し、わたしの線を破線で重ね、二本のあいだに寸法（％差）を出す。比較は次の押下まで残す
     ・点数はやめ、一行の観察（「重心を、私より右に読みました」）に。判定は三枚の平均だけでなく作品ごとの差も使う
     ・三枚の平均は、同じ役割の三つの目盛りが一本に集まる過程を見せ、研究の三本を薄く補う——「あなたの4本＋研究の3本」
     ・読みの比較（同じ三枚での あなた vs わたし）と、骨格としての比較（あなたの骨格 vs 研究の固定グリッド）を分ける
     ・紙面（画面いっぱい）には見出し・本文・図版の枠を載せ、「あなたの骨格／研究の骨格」で切り替える
     ・#play=id,id,id で三枚を指名して始められる（面接用）。結果から研究の手順 08 へ戻れる
     研究の呼び名では Y1＝主塊開始線・X4＝前景／副次要素境界線。遊びの四手は「主塊開始線」「主塊重心線」を縦横で引く——研究の手順を四本で体験する */
  (function(){
    function L(ja, en){ return document.documentElement.lang === 'en' ? en : ja; }
    /* 四本の機能線。k は盤面の答えの鍵、ax は線の向き（v＝たての線＝X の値）。q の %s には盤面ごとの対象（obj）が入る */
    var LINES = [
      {k:'y1', ax:'h', n:'主塊開始線', ne:'Main mass start',    dir:'よこ', dire:'horizontal', q:'%sの、てっぺんはどこだろう', qe:'Where is the top of the %s?', h:'大きなまとまり（主塊）が始まる、上の端。', he:'The upper edge where the main mass begins.'},
      {k:'x1', ax:'v', n:'主塊開始線', ne:'Main mass start',    dir:'たて', dire:'vertical',   q:'%sの、左の端はどこだろう', qe:'Where is the left edge of the %s?', h:'同じまとまりが始まる、左の端。', he:'The left edge where the same mass begins.'},
      {k:'y2', ax:'h', n:'主塊重心線', ne:'Main mass center', dir:'よこ', dire:'horizontal', q:'%sの重さは、どの高さだろう', qe:'Where does the weight of the %s sit, top to bottom?', h:'まとまりの重さが、上下で釣り合う高さ。', he:'The height where its weight balances.'},
      {k:'x3', ax:'v', n:'主塊重心線', ne:'Main mass center', dir:'たて', dire:'vertical',   q:'%sの重さは、左右のどこだろう', qe:'Where, left to right, does its weight sit?', h:'まとまりの重さが、左右で釣り合う位置。', he:'The point where its weight balances, left to right.'}
    ];
    var GRID = {v:[12, 28, 58, 83], h:[14, 32, 71]};    /* 研究の平均グリッド＝このサイトの骨格（--x1〜--x4・--y1〜--y3） */
    var FIXED = {v:[28, 83], h:[71]};                    /* そのうち遊びでは測らない三本（密度転換線・境界線・余白開始線） */
    var BOARDS = /*BOARDS*/[
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
                      "花の枝は上の縁から入る。",
                      "左の縁のすぐ内側。花はここから。",
                      "花と幹の塊は上に厚い。重心は上寄り。",
                      "右の幹が重い。重心は中央より右。"
                ],
                "whye": [
                      "The blossom branch enters from the top edge",
                      "Just inside the left edge, where the blossoms start",
                      "Blossoms and trunk are thick above: the weight sits high",
                      "The trunk on the right is heavy: the weight sits right of centre"
                ],
                "obj": "花の枝と幹",
                "obje": "blossom branch and trunk",
                "note": "歌川広重『名所江戸百景』の一図、1856 年。料亭の窓越しに、手前へ張り出した梅の枝と、隅田川と筑波山の遠景を重ねています。広重が晩年に多用した「近景を極端に大きく、遠景を小さく」の構図で、枝と川面の間の空きが画面の主役になっています。",
                "notee": "From Hiroshige’s One Hundred Famous Views of Edo, 1856. Seen through a restaurant window, a plum branch thrusts into the foreground over the Sumida River and distant Mount Tsukuba. Hiroshige’s late device of an oversized near object against a tiny far view makes the gap between branch and water the real subject."
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
                      "y1": 14,
                      "x1": 30,
                      "y2": 55,
                      "x3": 68
                },
                "why": [
                      "山頂。主塊はここから始まる。",
                      "山裾が林に消える左端。",
                      "下へ広がる三角。重心は下寄り。",
                      "裾は左へ長く、右で切れる。重心は中央より右。"
                ],
                "whye": [
                      "The summit: the mass begins here",
                      "The left end, where the slope sinks into the forest",
                      "A triangle widening downward: the weight sits low",
                      "The skirt runs long to the left and is cut on the right: the weight sits right of centre"
                ],
                "obj": "山",
                "obje": "mountain",
                "note": "葛飾北斎『冨嶽三十六景』の一図で、1831 年ごろの錦絵です。夏の終わりから初秋の早朝、南風が晴れを呼ぶ朝の富士が赤く染まる一瞬を描きました。山だけで画面の大半を占め、空はベロ藍のぼかし、雲は横に流れる筋雲だけ。形を思い切って省いた構図の代表です。",
                "notee": "From Hokusai’s Thirty-six Views of Mount Fuji, printed around 1831. It catches the moment on a clear late-summer dawn when a south wind turns the mountain red. The mountain alone fills most of the sheet; the sky is a gradation of Prussian blue, the clouds mere streaks. A landmark of radical simplification."
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
                      "裳が重い。重心は下寄り。",
                      "窓と壁のあいだ。重心はやや右。"
                ],
                "whye": [
                      "The top of the cap",
                      "The left of the elbow, where the figure begins",
                      "The skirt is heavy: the weight sits low",
                      "Between window and wall: the weight sits a little right"
                ],
                "obj": "人物",
                "obje": "figure",
                "note": "ヨハネス・フェルメール『牛乳を注ぐ女』、1658 年ごろ、油彩。45×41cm の小さな画面に、左の窓からの光、テーブルの静物、注がれる牛乳の一筋。光を点で置く技法で、パンや壁の質感を描いています。生活の一瞬を静かに止めた作です。",
                "notee": "Johannes Vermeer’s The Milkmaid, around 1658, oil on canvas. Within a small 45 by 41 cm panel: light from the left window, a still life on the table, a thin stream of milk. Dots of light render the bread and the wall. A quiet moment of ordinary life held still."
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
                      "y1": 12,
                      "x1": 4,
                      "y2": 70,
                      "x3": 50
                },
                "why": [
                      "頭のいちばん上。",
                      "人物と足元の岩をひとつの塊と解釈する。岩は左の縁近くから。",
                      "岩の重さで、重心は下へ。",
                      "ほぼ中央。人物の軸そのもの。"
                ],
                "whye": [
                      "The top of the head",
                      "Figure and rock read as one mass: the rock starts near the left edge",
                      "The rock pulls the weight down",
                      "Almost centred: the figure's own axis"
                ],
                "obj": "人と岩",
                "obje": "figure and rock",
                "note": "カスパー・ダーヴィト・フリードリヒ『雲海の上の旅人』、1818 年ごろ、油彩。後ろ姿の人物を画面の中心に立たせ、その向こうに霧の海と山を広げます。見る人が人物と同じ視線になるこの「後ろ姿」は、ドイツ・ロマン主義を代表する構図です。",
                "notee": "Caspar David Friedrich’s Wanderer above the Sea of Fog, around 1818, oil. A figure seen from behind stands at the center, with a sea of fog and mountains beyond. This back view, which puts the viewer in the wanderer’s place, is the signature composition of German Romanticism."
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
                      "いちばん高い頭。",
                      "左の人物の帽子。三人の塊はここから。",
                      "かがんだ姿は下に重い。",
                      "三人の真ん中。"
                ],
                "whye": [
                      "The highest head",
                      "The left figure's hat, where the three begin",
                      "Bent figures are heavy below",
                      "The middle of the three"
                ],
                "obj": "三人",
                "obje": "three figures",
                "note": "ジャン＝フランソワ・ミレー『落穂拾い』、1857 年、油彩。刈り入れ後の畑で落穂を拾う三人の女性を、地平線を高く取って手前に大きく描きます。遠くの豊かな収穫と手前の労働の対比が、発表当時は農民を描く政治的な絵として論争になりました。",
                "notee": "Jean-François Millet’s The Gleaners, 1857, oil. Three women gather leftover grain after the harvest, drawn large against a high horizon. The abundant harvest in the distance against the labor in front caused controversy at the time as a political picture of the peasantry."
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
                      "y1": 20,
                      "x1": 28,
                      "y2": 57,
                      "x3": 52
                },
                "why": [
                      "桶の環の上端。環そのものが主塊。",
                      "環の左端。",
                      "職人が入る分、重心はやや下。",
                      "環はほぼ中央。富士は環の中の右寄りに。"
                ],
                "whye": [
                      "The top of the barrel's ring: the ring itself is the mass",
                      "The left of the ring",
                      "With the cooper inside, the weight sits a little low",
                      "The ring is near the centre; Fuji sits inside it, to the right"
                ],
                "obj": "桶の環",
                "obje": "barrel ring",
                "note": "葛飾北斎『冨嶽三十六景』の「尾州不二見原」、1831 年ごろ。桶職人が大きな桶の胴を削る手前の場面と、桶の輪の中に小さく収まる富士。丸い枠で遠くの山を切り取る「見立て」の構図で、近くの人の営みと遠くの山を一枚に重ねています。",
                "notee": "Hokusai’s Fujimigahara in Owari Province, Thirty-six Views, around 1831. A cooper shaves the inside of a huge barrel, and Fuji appears small through the barrel’s hoop. The round frame that crops the distant mountain layers everyday work in the foreground onto the far view."
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
                      "抱き合う二人をひとつの塊と解釈する。その左端。",
                      "上から下まで、ほぼ一様な柱。重心は中央。",
                      "中央の柱。重心も中央。"
                ],
                "whye": [
                      "The top of the heads",
                      "The two figures read as one mass: its left edge",
                      "A near-uniform column from top to bottom: the weight is central",
                      "A central column: the weight, too, is central"
                ],
                "obj": "二人",
                "obje": "two figures",
                "note": "グスタフ・クリムト『接吻』、1907〜08 年、油彩に金箔。ほぼ正方形の画面の中で、抱き合う二人が一つの金の塊になり、足元だけに花の草地が見えます。ウィーン分離派の装飾性と、人物をひとつの面に溶かす構図が特徴です。",
                "notee": "Gustav Klimt’s The Kiss, 1907–08, oil and gold leaf. On an almost square canvas the embracing couple fuse into a single golden mass, with a flowered meadow only at their feet. It shows the ornament of the Vienna Secession and a composition that melts figures into one plane."
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
                      "y1": 6,
                      "x1": 1,
                      "y2": 45,
                      "x3": 30
                },
                "why": [
                      "波頭のいちばん上。",
                      "波は左の縁から入る。",
                      "爪のような波頭と胴を合わせて、重心は中ほど。",
                      "大波は左に寄る。富士は右の余白に。"
                ],
                "whye": [
                      "The top of the crest",
                      "The wave enters from the left edge",
                      "Crest and body together: the weight sits mid-height",
                      "The great wave leans left; Fuji sits in the void on the right"
                ],
                "obj": "大波",
                "obje": "great wave",
                "note": "葛飾北斎『冨嶽三十六景』の一図、1831 年ごろ。手前で砕ける大波が画面を覆い、遠くに小さな富士が見えます。当時輸入されたばかりのベロ藍を使い、波の曲線が富士を包み込むように配されています。西洋の遠近法を学んだ北斎が、近景と遠景の大きさの逆転で奥行きをつくった図です。",
                "notee": "From Hokusai’s Thirty-six Views of Mount Fuji, around 1831. A breaking wave dominates the sheet while Fuji sits small in the distance. Printed with newly imported Prussian blue, its curve seems to cradle the mountain. Hokusai, who had studied Western perspective, builds depth by reversing the scale of near and far."
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
                      "y1": 50,
                      "x1": 1,
                      "y2": 70,
                      "x3": 52
                },
                "why": [
                      "橋の右端の高さ。主塊＝橋はここから。",
                      "橋は左の縁から入る。",
                      "橋桁と杭を含めると、重さは下にある。",
                      "橋の中ほど。人の群れもここに集まる。"
                ],
                "whye": [
                      "The height of the bridge's right end: the mass, the bridge, begins here",
                      "The bridge enters from the left edge",
                      "With the deck and piles, the weight sits low",
                      "The middle of the bridge, where the figures gather"
                ],
                "obj": "橋",
                "obje": "bridge",
                "note": "歌川広重『名所江戸百景』の「大はしあたけの夕立」、1857 年。夕立に打たれて橋を渡る人々を、細い雨の線と暗い空で描きます。橋を斜めに置き、対岸の安宅を薄く沈めた大胆な構図で、のちにゴッホが油彩で模写したことでも知られます。",
                "notee": "Hiroshige’s Sudden Shower over Shin-Ōhashi Bridge and Atake, One Hundred Famous Views of Edo, 1857. People cross the bridge under thin lines of rain and a dark sky. The bridge cuts diagonally while the far bank sinks into mist, a bold layout that van Gogh later copied in oil."
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
                      "幹は上の縁から入る。",
                      "左下の縁から。幹はここから。",
                      "幹は下で太い。重心は下寄り。",
                      "斜めに走る幹の中ほど。やや左。"
                ],
                "whye": [
                      "The trunk enters from the top edge",
                      "From the lower-left edge, where the trunk begins",
                      "The trunk is thick below: the weight sits low",
                      "The middle of the diagonal trunk, a little left"
                ],
                "obj": "幹",
                "obje": "trunk",
                "note": "歌川広重『名所江戸百景』の「亀戸梅屋舗」、1857 年。臥龍梅と呼ばれた名木の幹を画面いっぱいに置き、枝の隙間から梅園と人々をのぞかせます。地平の赤い空と幹の黒の対比が強く、これもゴッホが模写した図です。",
                "notee": "Hiroshige’s Plum Garden at Kameido, One Hundred Famous Views of Edo, 1857. The trunk of the famous “reclining dragon” plum fills the sheet, and the garden and visitors peek through the branches. The red horizon sky against the black trunk is another image van Gogh copied."
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
                      "y1": 20,
                      "x1": 14,
                      "y2": 58,
                      "x3": 29
                },
                "why": [
                      "いちばん濃い松のてっぺん。",
                      "左の松林の左端。主塊はここから。",
                      "幹は下へ伸びる。重心はやや下。",
                      "左の群れの中心。右の群れは薄く、余白をはさむ。"
                ],
                "whye": [
                      "The top of the darkest pine",
                      "The left edge of the left grove: the mass begins here",
                      "Trunks run down: the weight sits a little low",
                      "The centre of the left grove; the right one is faint, across the void"
                ],
                "obj": "左の松林",
                "obje": "left grove",
                "note": "長谷川等伯『松林図屏風』、16 世紀末の水墨、国宝。六曲一双の屏風に、霧の中の松林だけを描いています。濃い松と薄い松の距離、何も描かれていない紙の余白そのものが奥行きになっていて、日本の「間」を語るときに必ず挙げられる作です。",
                "notee": "Hasegawa Tōhaku’s Pine Trees, late sixteenth century, ink on paper, a National Treasure. Across a pair of six-panel screens there is nothing but pines in mist. The distance between dark and pale trees, and the untouched paper itself, become depth. It is the work most often cited for the Japanese sense of ma, the space between."
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
                      "x1": 36,
                      "y2": 55,
                      "x3": 55
                },
                "why": [
                      "崖の頂。一本の線がここから落ちる。",
                      "崖の塊の左端。",
                      "岩は下へ積み上がる。重心はやや下。",
                      "縦の線のすぐ右。重心もそこに。"
                ],
                "whye": [
                      "The top of the cliff, where the single line drops from",
                      "The left edge of the cliff mass",
                      "Rocks pile up downward: the weight sits a little low",
                      "Just right of the vertical line, and so is the weight"
                ],
                "obj": "崖",
                "obje": "cliff",
                "note": "雪舟『秋冬山水図』の冬景、15 世紀後半、国宝。画面の中央を貫いて立ち上がる崖の輪郭線が有名で、上へ行くほど太く濃くなります。中国で学んだ水墨の骨法を、思い切った線で日本の画面に置き換えた一幅です。",
                "notee": "Sesshū’s Winter Landscape from Autumn and Winter Landscapes, late fifteenth century, a National Treasure. A cliff’s outline shoots up through the center of the sheet, growing thicker and darker as it rises. Sesshū turned the ink techniques he studied in China into a single decisive line."
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
                      "y1": 38,
                      "x1": 20,
                      "y2": 58,
                      "x3": 55
                },
                "why": [
                      "いちばん高い屋根の上端。家並みはここから。",
                      "左の家の左端。",
                      "雪の屋根が重い。重心はやや下。",
                      "家並みの中ほど。やや右。"
                ],
                "whye": [
                      "The top of the highest roof: the row of houses begins here",
                      "The left edge of the leftmost house",
                      "Snowy roofs are heavy: the weight sits a little low",
                      "The middle of the row, a little right"
                ],
                "obj": "家並み",
                "obje": "row of houses",
                "note": "歌川広重『東海道五十三次』の「蒲原 夜之雪」、1833〜34 年ごろ。雪の夜道を行く旅人を、ほぼ墨一色の階調で描きます。実際の蒲原は雪の少ない土地で、この静けさは広重の創作と言われます。人物の小ささと、山と空の広い余白が印象を決めています。",
                "notee": "Hiroshige’s Kambara, Night Snow from the Fifty-three Stations of the Tōkaidō, around 1833–34. Travelers walk a snowy road in near monochrome. Kambara rarely sees snow; the stillness is Hiroshige’s invention. The tiny figures and the broad emptiness of hills and sky set the mood."
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
                      "y1": 10,
                      "x1": 20,
                      "y2": 58,
                      "x3": 60
                },
                "why": [
                      "髷の上端。人物の塊はここから。",
                      "左の袖の張り出し。",
                      "頭は上、着物の量は下。重心は中ほどより下。",
                      "顔は左を向くが、身体の量は右へ。重心はやや右。"
                ],
                "whye": [
                      "Top of the hair: the figure's mass starts here",
                      "The left sleeve's furthest reach",
                      "Head above, the bulk of the kimono below: the weight sits below the middle",
                      "The face turns left but the body's bulk goes right: the weight sits slightly right"
                ],
                "obj": "人物",
                "obje": "figure",
                "note": "喜多川歌麿が 1792 年ごろに出した大首絵の連作「婦女人相十品」の一図。市松模様の振袖を着た娘が、ガラスの玩具ポッピンを吹く一瞬を捉えました。雲母摺の背景に人物を画面の中央やや右に大きく置き、袖の模様と髪の黒が主塊を作ります。",
                "notee": "From Kitagawa Utamaro's series of large-head portraits, Ten Physiognomies of Women, c. 1792. A young woman in a checked kimono blows a glass toy called a poppin. Against a mica ground the figure sits large, slightly right of centre; the sleeve pattern and the black hair make the mass."
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
                      "y1": 16,
                      "x1": 34,
                      "y2": 62,
                      "x3": 62
                },
                "why": [
                      "白い頭巾の上端。",
                      "裾の左端。足台より右。",
                      "黒い衣の量は下半分に。重心は下寄り。",
                      "人物は右寄り、椅子の背で止まる。"
                ],
                "whye": [
                      "Top of the white cap",
                      "Left end of the skirt, right of the footstool",
                      "The black dress bulks in the lower half: the weight sits low",
                      "The figure sits right of centre, stopped by the chair back"
                ],
                "obj": "人物",
                "obje": "figure",
                "note": "ジェームズ・マクニール・ホイッスラーが 1871 年にロンドンで描いた油彩（オルセー美術館）。黒い服の母を横向きに座らせ、灰色の壁、黒いカーテン、額の矩形で画面を組みました。題名が示すとおり肖像というより色面の配置の絵で、人物は画面の右寄りに置かれています。",
                "notee": "Oil by James McNeill Whistler, painted in London in 1871 (Musee d'Orsay). His mother sits in profile in black against a grey wall, a black curtain and the rectangles of framed pictures. As the title says, it is an arrangement of tones more than a portrait, and the figure sits to the right."
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
                      "y1": 56,
                      "x1": 32,
                      "y2": 80,
                      "x3": 46
                },
                "why": [
                      "頭の上端。人物はここから下に。",
                      "身体の左端（手すりの手前）。",
                      "頭は小さく、身体は下へ広がる。重心は下。",
                      "人物は中央よりわずかに左。"
                ],
                "whye": [
                      "Top of the head: the figure runs down from here",
                      "Left edge of the body, in front of the railing",
                      "Small head, body widening downward: the weight sits low",
                      "The figure stands slightly left of centre"
                ],
                "obj": "人物",
                "obje": "figure",
                "note": "エドヴァルド・ムンクが 1893 年に描いた最初の『叫び』（オスロ国立美術館）。オスロ近郊の丘の道で夕焼けが血の色に変わったときの不安を、うねる線で描きました。左から右下へ走る手すりの対角線が奥行きを作り、前景の人物を画面の右下寄りに置きます。",
                "notee": "The first version of The Scream, painted by Edvard Munch in 1893 (National Museum, Oslo). On a hill path near Oslo the sunset turned blood red and he felt a scream through nature, drawn in waving lines. The railing runs from the left down to the lower right and makes the depth; the figure stands lower right."
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
                      "y1": 8,
                      "x1": 63,
                      "y2": 45,
                      "x3": 80
                },
                "why": [
                      "白い布の弧の上端。風神の塊はここから。",
                      "黒い雲の左端。金地はここまで。",
                      "頭と胴が上寄り、雲が下に垂れる。重心はやや上。",
                      "風神は右端に寄る。重心は 80 付近。"
                ],
                "whye": [
                      "Top of the white cloth arc: the wind god's mass starts here",
                      "Left edge of the black cloud; the gold ends here",
                      "Head and torso sit high, the clouds hang below: the weight is slightly high",
                      "The wind god is pushed to the right edge: the weight sits near 80"
                ],
                "obj": "右の風神",
                "obje": "wind god on the right",
                "note": "俵屋宗達が 17 世紀前半に描いた二曲一双の屏風で、建仁寺に伝わりました。金地の画面の左右の端に雷神と風神を寄せ、中央を大きく空けた構図です。二神は画面からはみ出すほど外側に置かれ、その間の何もない金地が緊張を生みます。のちに光琳、抱一が写した、琳派を象徴する一作です。",
                "notee": "A pair of two-panel screens by Tawaraya Sotatsu, painted in the early 17th century and handed down at Kennin-ji. The thunder god and the wind god are pushed to the far left and right of the gold ground, leaving the centre empty; the empty gold between them carries the tension. Korin and Hoitsu later copied it, and it stands for the Rinpa school."
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
                      "y1": 8,
                      "x1": 1,
                      "y2": 48,
                      "x3": 10
                },
                "why": [
                      "左の花群のいちばん高い花。",
                      "花群は左端に接する。",
                      "花は上半分、葉は下へ。重心は中ほど。",
                      "左端の群れの中心。"
                ],
                "whye": [
                      "The highest flower of the left cluster",
                      "The cluster touches the left edge",
                      "Flowers in the upper half, leaves running down: the weight sits mid-height",
                      "The centre of the leftmost cluster"
                ],
                "note": "尾形光琳が 1701 年ごろに描いた六曲一双の屏風（根津美術館）。伊勢物語の八橋の段を、橋も水も描かず、金地に群青と緑青の燕子花だけで表しました。花群を左から右へ、高さを変えながら並べる反復が主題で、同じ形の型を繰り返し使ったとも言われます。",
                "notee": "A pair of six-panel screens by Ogata Korin, c. 1701 (Nezu Museum). The Yatsuhashi episode of the Tales of Ise is shown with no bridge and no water: only irises in ultramarine and malachite green on gold. The subject is repetition, clusters set left to right at changing heights, possibly with reused stencils.",
                "obj": "左の花群",
                "obje": "left cluster"
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
                      "太い黒の縦線の右。赤はここから。",
                      "赤は上三分の二を占める。重心はその中ほど。",
                      "赤の左右の中心。右辺に接するぶん右寄り。"
                ],
                "whye": [
                      "The red plane starts at the top edge",
                      "Right of the thick black vertical: red begins here",
                      "Red fills the upper two thirds: the weight sits in its middle",
                      "The centre of the red, right of centre because it touches the right edge"
                ],
                "note": "ピート・モンドリアンが 1930 年に描いた油彩（チューリヒ美術館）。黒い直線で画面を割り、赤・青・黄の三原色と白だけで組む「新造形主義」の代表作です。大きな赤い面を右上に置き、小さな青と黄で釣り合いを取ります。",
                "notee": "Oil on canvas by Piet Mondrian, 1930 (Kunsthaus Zurich). Black straight lines divide the plane, and only the three primaries and white fill it: the emblem of Neoplasticism. A large red plane sits top right, balanced by a small blue and a small yellow.",
                "obj": "赤い面",
                "obje": "red plane"
          }
    ]/*/BOARDS*/;
    var listEl = null, modeEl = null, lastAvg = null;
    var ORD = ['一枚目', '二枚目', '三枚目'], ORDE = ['first', 'second', 'third'], PC = '<small class="gm-pc">%</small>';   /* 数字はすべて外郭を 100 とした％ */
    var gm = null, stage, picEl, linesEl, liveEl, readEl, tipEl, stepEl, resEl, goEl, cardEl, sheetEl, dimEl, drv, drh, introEl, iscroll, introSeen = false, introOn = false;
    var pend = null, startedAt = 0, doneFn = null, picks = [], bi = 0, ti = 0, res = [], live = -1, state = 'idle', down = false, fresh = false, moved = 0, downX = 0, downY = 0, fixedAt = 0, offT = 0, lastFocus = null, first = true;
    var ptype = window.matchMedia('(hover:none),(pointer:coarse)').matches ? 'touch' : 'mouse';   /* 最初の触れ方が分かるまでの仮の見立て */
    var rm = document.documentElement.classList.contains('rm');
    function el(t, c, html){ var e = document.createElement(t); if(c) e.className = c; if(html != null) e.innerHTML = html; return e; }
    function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function sg(n){ return (n > 0 ? '+' : n < 0 ? '−' : '±') + Math.abs(n); }
    /* 目立たせる見出しは本編と同じ組み——漢字・カタカナはゴシック、かなは明朝（mixSet）、句読点は朱、強調語は一回り大きく。EN は混植を解く */
    /* 見出しの折り返しは文節の切れ目だけ：読点・空白の後ろと、助詞（を・は・が・に・で・と・へ・より・から）の後ろで区切り、各文節を inline-block に。
       一文字だけが次の行に落ちる、といった半端な折り返しをなくす（小坂さんの指示）。助詞の後ろは、次が漢字・カタカナのときだけ切る */
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
    /* 本文：日本語は文節ごとに折る（語の途中で改行しない）。英語はそのまま */
    function body(t){ if(document.documentElement.lang === 'en') return esc(t); return phrases(t).map(function(ph){ return '<span class="ph">' + esc(ph) + '</span>'; }).join(''); }
    /* 作品名：作者と『題』のあいだでだけ折る */
    function ttl(b){
      var t = L(b.t, b.te);
      if(document.documentElement.lang === 'en'){ var ci = t.indexOf(', ');   /* v445: 英語も作者と題を書き分ける（確認係） */
        return ci > 0 ? '<span class="ph gm-aut">' + esc(t.slice(0, ci + 1)) + '</span><span class="ph gm-ttlm">' + esc(t.slice(ci + 1)) + '</span>' : esc(t); }
      var i = t.indexOf('『'); return i > 0 ? '<span class="ph gm-aut">' + esc(t.slice(0, i)) + '</span><span class="ph gm-ttlm">' + esc(t.slice(i)) + '</span>' : esc(t);   /* v434: 作者は小さく、題は大きく（本人） */
    }
    function picOf(b){
      var im = document.createElement('img'); im.className = 'gm-img'; im.alt = ''; im.draggable = false; im.decoding = 'async';
      im.addEventListener('load', function(){ if(im.naturalWidth && im.naturalHeight && picEl.contains(im)) stage.style.setProperty('--ar', (im.naturalWidth / im.naturalHeight).toFixed(3)); });
      im.src = b.img;
      if(im.decode) im.decode().catch(function(){});   /* v446: 先に絵を用意してから見せる（育つ枠の最中にガタついていた：本人） */
      return im;
    }
    function preload(list){ list.forEach(function(b){ var im = new Image(); im.src = b.img; if(im.decode) im.decode().catch(function(){}); }); }   /* 始める前に読み込み・デコードしておく */
    /* 線は HTML の要素で引く（SVG を縦横比なしに伸ばすと文字まで伸びる） */
    function mkLine(host, ax, p, cls, label){
      var d = el('i', 'gm-ln ' + ax + (cls ? ' ' + cls : '') + (+p > 86 ? ' edge' : ''));   /* v400: 端に近い線の札は内側へ（見切れない） */
      d.style[ax === 'v' ? 'left' : 'top'] = (+p).toFixed(2) + '%';
      if(label != null){ var b = el('b'); b.textContent = label; d.appendChild(b); }
      host.appendChild(d); return d;
    }
    function ruler(host, n){ for(var i = 0; i <= 10; i++){ var t = el('i', i % 5 ? '' : 'big'); t.style[n === 'v' ? 'left' : 'top'] = (i * 10) + '%'; host.appendChild(t); } }
    /* 盤面の高さの上限は、欄（.gm-sw）の実寸から。vh／svh は iOS の帯ぶん小さく評価され、盤面が画面の四割ほどにしかならなかった */
    function vvFit(){   /* v428: ブラウザの帯が出ている間も、見出し行とボタンが指の届く所に残るよう、見えている枠の内側へ寄せる（本人） */
      var v = window.visualViewport; if(!v || !gm) return;
      var de = document.documentElement;
      var t = Math.max(0, Math.round(v.offsetTop)), l = Math.max(0, Math.round(v.offsetLeft));
      var bm = Math.max(0, Math.round(de.clientHeight - v.height - v.offsetTop));
      var r = Math.max(0, Math.round(de.clientWidth - v.width - v.offsetLeft));
      if(bm > 160) bm = 160; if(t > 160) t = 160; if(l > 160) l = 160; if(r > 160) r = 160;   /* 想定外の値で崩さない */
      gm.style.setProperty('--vvt', t + 'px'); gm.style.setProperty('--vvb', bm + 'px');
      gm.style.setProperty('--vvl', l + 'px'); gm.style.setProperty('--vvr', r + 'px');
    }
    function tipFit(){   /* v426: 盤面が高いと札が見出し行に潜るので、帯の下に留める（本人） */
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
      if(r.height > 0 && rs.left >= r.left + r.width - 2) stage.style.setProperty('--sh', Math.max(120, Math.round(r.height - 22 - (rot ? 26 : 0))) + 'px');   /* 回した絵では下に目盛りが来るぶん低く */   /* 右欄が横に並ぶ二列のときだけ。一列（タブレット縦）では欄の高さが盤面から決まるので CSS の上限に任せる */
      else stage.style.removeProperty('--sh');
    }
    /* 線の役割の小さな図：枠＝外郭、丸い塊＝主塊、朱＝その線（開始線は塊の縁、重心線は塊の中心を通る） */
    function pict(k, cls){
      var s = '<svg class="gm-pi' + (cls ? ' ' + cls : '') + '" viewBox="0 0 34 26" aria-hidden="true"><rect x="1" y="1" width="32" height="24"/><path class="m" d="M11 8 C14 5 22 5 25 8 C28 11 28 17 25 20 C22 23 14 23 11 20 C8 17 8 11 11 8Z"/>';
      if(k === 'y1') s += '<line class="a" x1="1" y1="6" x2="33" y2="6"/>';
      else if(k === 'x1') s += '<line class="a" x1="9" y1="1" x2="9" y2="25"/>';
      else if(k === 'y2') s += '<line class="a" x1="1" y1="14" x2="33" y2="14"/><circle class="a" cx="18" cy="14" r="2.2"/>';
      else s += '<line class="a" x1="18" y1="1" x2="18" y2="25"/><circle class="a" cx="18" cy="14" r="2.2"/>';
      return s + '</svg>';
    }
    /* 注釈：手番の始まりに、盤面の左上へ「この線の役割」を一時的に出す（用語をいきなり見せない）。押せば消え、見出しの ? で呼び戻せる */
    var bandEl = null, helpT = 0, trayEl = null;
    function trayReset(){
      trayEl.innerHTML = 'ABC'.split('').map(function(c, i){ var b = picks[i]; return '<i class="gm-slot"><b>' + c + '</b>' + (b ? '<div class="gm-mini pre" style="--ar:' + b.ar + '"><img src="' + b.img + '" alt="" draggable="false"></div>' : '') + '</i>'; }).join('');   /* 三枚を最初から薄く見せる（手本から）：三枚で一巡だと分かる */
    }
    /* 右の列の四本の一覧：番号・図・名前・向き・値。いまの線は朱、押している最中は値が動く（手本から） */
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
    /* 帯（標識）：画面の上端に朱の帯で「この線の役割」を出す。絵やグリッドの上には出さない。一枚目の各手番で自動、? で呼び戻し。押下で消える */
    function help(t, hold){
      clearTimeout(helpT);
      bandEl.innerHTML = pict(t.k) + '<b>' + esc(L(t.n, t.ne)) + '<small>' + esc(L(t.dir, t.dire)) + '</small></b><span>' + esc(L(t.h, t.he)) + '</span>';
      var hd = gm.querySelector('.gm-hd').getBoundingClientRect(), g = gm.getBoundingClientRect(); bandEl.style.minHeight = Math.round(hd.bottom - g.top) + 'px';   /* ヘッダーの帯をちょうど覆う高さ（題字が半分だけ覗かない） */
      bandEl.classList.add('on'); retint(80);
      helpT = setTimeout(helpOff, hold ? 5200 : 4400);
    }
    function helpOff(){ clearTimeout(helpT); if(bandEl && bandEl.classList.contains('on')){ bandEl.classList.remove('on'); retint(480); setTimeout(function(){ if(!bandEl.classList.contains('on') && window.__retint) window.__retint(); }, 1000); } }   /* 二度採り直す（一度目が帯の去り際に当たると薄い朱が残る） */
    /* iOS 26 の Safari は画面の端の固定要素の色をツールバーに写す。帯が出入りしたら、本編と同じ仕掛けで色を採り直させる（帯が引っ込んでも朱が残らないように） */
    var retintT = 0;
    function retint(ms){ if(!window.__retint) return; clearTimeout(retintT); retintT = setTimeout(function(){ window.__retint(); }, ms || 0); }
    /* 判が押される（小坂さんの指示）：一枚測り終えたら盤面の右下（落款の位置）に「壱／弐／参」、平均が出たら中央に「平均」、紙面には「骨格」。
       本編の感謝の印と同じ押し方——少し大きく傾いて降り、紙に当たって僅かに沈み、輪がひとつ広がる。一拍おいて、紙から離れるように退場 */
    var sealT = 0, ringT = 0, lastX = -1, lastY = -1, ringHold = null, ringCur = null;
    function ringText(txt){ if(ringHold){ var tp = ringHold.querySelector('textPath'); if(tp) tp.textContent = txt; } }
    /* 触れているあいだ、カーソルに付いて回る輪（案内の矢印ボタン）。本編の「画面下部へ移動します」の吸い付きと同じ言葉づかい */
    function cringHold(txt){
      if(ptype === 'touch' || rm) return; cringOff(true);
      var r = cring(txt); if(!r) return; clearTimeout(ringT); r.classList.add('hold'); ringHold = r;
    }
    function cringOff(now){ var r = ringHold; ringHold = null; if(ringCur === r) ringCur = null; if(!r) return; if(now){ if(r.parentNode) r.parentNode.removeChild(r); return; } r.classList.add('bye'); setTimeout(function(){ if(r.parentNode) r.parentNode.removeChild(r); }, 450); }
    function cring(txt){
      if(ptype === 'touch' || rm || lastX < 0) return;
      var old = gm.querySelector('.gm-cring'); if(old && old.parentNode) old.parentNode.removeChild(old); clearTimeout(ringT);
      var r = el('i', 'gm-cring'), id = 'gmcr' + (Date.now() % 100000); ringCur = r;
      var t0 = txt; while(txt.length < 40) txt += t0;   /* 輪を一周ぶん埋める（短い文は繰り返す） */
      r.innerHTML = '<svg viewBox="0 0 140 140" aria-hidden="true"><defs><path id="' + id + '" d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0"/></defs>' +
        '<circle cx="70" cy="70" r="66" fill="none" stroke="var(--acc)" stroke-width="2.6"/><circle cx="70" cy="70" r="40" fill="none" stroke="var(--acc)" stroke-width="1" opacity=".5"/>' +
        '<text font-family="var(--mono)" font-size="9.5" letter-spacing="2.2" fill="var(--acc)"><textPath href="#' + id + '" startOffset="0">' + esc(txt) + '</textPath></text></svg>';
      r.style.left = lastX + 'px'; r.style.top = lastY + 'px';
      (introOn ? introEl : gm).appendChild(r); void r.offsetWidth; r.classList.add('on');   /* 案内の上では案内の色（地に合わせた --acc）で */
      ringT = setTimeout(function(){ r.classList.add('bye'); setTimeout(function(){ if(r.parentNode) r.parentNode.removeChild(r); if(ringCur === r) ringCur = null; }, 450); }, 1500);
      return r;
    }
    var SEALT = {sheet:[380, 550, 280], center:[560, 1000, 360], corner:[420, 650, 300], tr:[420, 2400, 300]};   /* 押印・滞在・退場（ms） */
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
    /* v389: 平均の判は消さず、盤面の右下へ小さく寄せて残す（小坂さん：判が見えない・消えている） */
    function centerSeal(host){   /* v426: 壱弐参の字が判の中心からずれていた（本人）。描いたあとに実寸で寄せる */
      requestAnimationFrame(function(){ try{
        var sv = host.querySelector('svg'); if(!sv) return;
        var best = null, area = 0;
        [].slice.call(sv.querySelectorAll('text')).forEach(function(t){ var bb = t.getBBox(); var a = bb.width * bb.height; if(a > area){ area = a; best = t; } });
        if(!best || !area) return;
        var bb = best.getBBox(), dx = 78 - (bb.x + bb.width / 2), dy = 78 - (bb.y + bb.height / 2);
        best.setAttribute('transform', 'translate(' + dx.toFixed(1) + ',' + dy.toFixed(1) + ')');
      }catch(e){} });
    }
    function sealPark(sp){
      if(!sp || !sp.parentNode || !stage) return;
      var r = stage.getBoundingClientRect(), w = sp.offsetWidth, h = sp.offsetHeight, k = .5;
      var dx = r.width / 2 - w * k / 2 - Math.max(8, r.width * .02), dy = r.height / 2 - h * k / 2 - Math.max(8, r.height * .03);
      sp.classList.add('park'); sp.style.transform = 'translate(calc(-50% + ' + dx.toFixed(1) + 'px), calc(-50% + ' + dy.toFixed(1) + 'px)) scale(' + k + ')';
    }
    function sealOff(now){
      clearTimeout(sealT); if(!gm) return;
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
              '</div><span class="gm-tip"></span><span class="gm-mode" aria-hidden="true"></span><button class="gm-turnb" type="button" aria-pressed="false" hidden></button>' +
            '</div></div>' +
            '<div class="gm-side"><p class="gm-step"></p><div class="gm-tray" aria-hidden="true"></div><div class="gm-card" hidden></div><ul class="gm-list" hidden></ul><div class="gm-res"></div><div class="gm-qa"></div><div class="gm-btns"></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="gm-intro" hidden><div class="gm-iscroll" tabindex="0"><div class="gm-ipin"><div class="gm-isecs"></div><div class="gm-idots"></div><button class="gm-iskip" type="button"></button><button class="gm-igo" type="button"></button><i class="gm-idot"><i><b></b></i></i></div><div class="gm-ispace"></div></div><div class="gm-ihd"><button class="gm-ihow" type="button"></button><button class="gm-ix" type="button" aria-label="閉じる">×</button></div></div>' +
        '<div class="gm-sheet" aria-hidden="true"><div class="gm-sgrid"></div><div class="gm-mock"><div class="gm-mk1"></div><div class="gm-mk3"></div><div class="gm-mk2"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' +
          '<div class="gm-shd"><div class="gm-swk" role="group"><button type="button" data-g="you" aria-pressed="true"></button><button type="button" data-g="mine" aria-pressed="false"></button></div><button class="gm-sx" type="button"></button></div>' +
          '<p class="gm-scap"><b></b><span></span><small></small></p></div>';   /* v394: 切替の二つと戻るを一列に（小坂さん：戻るの下に並ぶのは不自然） */
      document.body.appendChild(gm);
      stage = gm.querySelector('.gm-stage'); picEl = gm.querySelector('.gm-pic'); linesEl = gm.querySelector('.gm-lines');
      liveEl = gm.querySelector('.gm-live'); readEl = gm.querySelector('.gm-read'); bandEl = gm.querySelector('.gm-band'); tipEl = gm.querySelector('.gm-tip'); dimEl = gm.querySelector('.gm-dim');
      drv = gm.querySelector('.gm-dimr.v'); drh = gm.querySelector('.gm-dimr.h');
      stepEl = gm.querySelector('.gm-step'); resEl = gm.querySelector('.gm-res'); goEl = gm.querySelector('.gm-btns'); listEl = gm.querySelector('.gm-list'); modeEl = gm.querySelector('.gm-mode');
      cardEl = gm.querySelector('.gm-card'); setTimeout(qaBuild, 0); try{ gm.querySelector('.gm-sheet').inert = true; }catch(x){} trayEl = gm.querySelector('.gm-tray'); sheetEl = gm.querySelector('.gm-sheet'); introEl = gm.querySelector('.gm-intro'); iscroll = gm.querySelector('.gm-iscroll');
      iscroll.addEventListener('scroll', introScroll, {passive:true});
      gm.querySelector('.gm-ihow').addEventListener('click', function(){ infoWantHow = true; info(); });
      gm.querySelector('.gm-iskip').addEventListener('click', function(){ if(introAt() >= ISECS.length - 1) return; introTo(ISECS.length - 1); });   /* v431: スキップを戻す（本人）。遊び方はその隣 */   /* v425: スキップをやめ、案内の右上は「遊び方」に（本人） */   /* スキップは「絵を選ぶ」の画面へ */
      gm.querySelector('.gm-igo').addEventListener('click', function(){ var cur = introAt(); if(cur >= ISECS.length - 1) return; introTo(cur + 1); });
      gm.querySelector('.gm-ix').addEventListener('click', close);
      (function(){ var tl = gm.querySelector('.gm-ttl'); if(!tl) return;   /* v441: 左上の題を押したら、遊びを閉じて本編の先頭へ（本人） */
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
      /* 押したときの応答：どのボタンも一瞬わずかに沈んで戻る（0.18 秒）。動きを控える設定では出さない */
      gm.addEventListener('pointerdown', function(e){ var b = e.target && e.target.closest ? e.target.closest('button, .gm-igo, .gm-idots > *') : null; if(!b || rm) return; b.classList.remove('gm-pressed'); void b.offsetWidth; b.classList.add('gm-pressed'); setTimeout(function(){ b.classList.remove('gm-pressed'); }, 220); }, true);
      turnEl = gm.querySelector('.gm-turn'); tbEl = gm.querySelector('.gm-turnb');
      tbEl.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path class="r2" d="M10 14H23V21H10"/><path class="r1" d="M10 14V8H3V21H10"/><path class="rm" d="M10 14V21"/><path class="a" d="M7 4.6A12 12 0 0 1 19 10.9M15.6 9.9 19 10.9 20 7.5"/><path class="a2" d="M19 10.9A12 12 0 0 0 7 4.6M9.6 2.2 7 4.6 9.4 7.2"/></svg><span></span>';   /* v390: Astra の C 案「角をそろえる」（縦 7×13 と横 13×7 が角を共有、Material の rotate_90_degrees_cw の弧）。押した後は横が濃くなり、矢印が戻る向きに */   /* v388: 縦の絵（濃）が横（淡）になる、時計回りの矢印。写真アプリの「回転」と SF の rectangle.portrait.rotate の折衷。文字も添える */
      tbEl.addEventListener('click', function(){ turnPic(!rot); }); tbEl.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
      tbEl.addEventListener('pointerenter', function(e){ if(e.pointerType === 'touch') return; lastX = e.clientX; lastY = e.clientY; cringHold(rot ? L('縦に戻す \u00b7 TURN BACK \u00b7 ', 'TURN BACK \u00b7 ') : L('絵を横にして、大きく \u00b7 TURN \u00b7 ', 'TURN THE PICTURE \u00b7 ')); });
      tbEl.addEventListener('pointerleave', function(){ cringOff(false); });
      tbLabel();
      gm.querySelector('.gm-sx').addEventListener('click', sheetOff);
      sheetEl.querySelectorAll('.gm-swk button').forEach(function(b){ b.addEventListener('click', function(){ sheetGrid(b.getAttribute('data-g')); }); });
      /* 応答の五状態。なぞる：線が遅れなく追従／押す：端点が応える／離す：その位置で確定／比べる：わたしの線と寸法が残る／次へ：次の押下で次の手番 */
      gm.addEventListener('pointermove', function(e){ if(e.pointerType !== 'touch'){ lastX = e.clientX; lastY = e.clientY; if(ringHold){ ringHold.style.left = lastX + 'px'; ringHold.style.top = lastY + 'px'; } if(ringCur && ringCur.parentNode){ ringCur.style.left = lastX + 'px'; ringCur.style.top = lastY + 'px'; } } }, {passive:true});   /* v425: 輪は指した所に付いて回る（本人） */
      var igo = gm.querySelector('.gm-igo');
      igo.addEventListener('pointerenter', function(e){ if(e.pointerType === 'touch') return; lastX = e.clientX; lastY = e.clientY; var last = introAt() === ISECS.length - 1; cringHold(last ? L('はじめる \u00b7 START \u00b7 ', 'START \u00b7 はじめる \u00b7 ') : L('次の一文へ \u00b7 NEXT \u00b7 ', 'NEXT \u00b7 次の一文へ \u00b7 ')); });
      igo.addEventListener('pointerleave', function(){ cringOff(false); });
      stage.addEventListener('pointerdown', function(e){
        if(demoEl){ demoDone = true; demoOff(); }
        if(e.button != null && e.button !== 0) return;
        if(e.pointerType === 'touch' && e.isPrimary === false){ if(down){ down = false; hideLive(); } return; }   /* v416: 二本目の指は線にしない（ピンチ） */
        if(e.target && e.target.closest && e.target.closest('.gm-turnb')) return;   /* 回すボタンの押下は線にしない */
        if(performance.now() - openedAt < 600) return;   /* 開いた直後の押下は読まない（メニューの押下が盤面に届いて線になるのを防ぐ） */
        if(stage.classList.contains('swapping') || performance.now() - boardAt < 700) return;   /* 作品の切替中の押下も線にしない */
        ptype = e.pointerType || 'mouse';
        if(state === 'compare'){ if(performance.now() - fixedAt < 350) return; nextTurn(); fresh = true; startedAt = performance.now() + 100; pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }   /* v417: そのまま動いたら次の線にする（pend） */   /* v416: 進めた直後 500ms の押下は線にしない（ダブルタップ） */   /* v403: 進めるための押下はここで終わり。同じ押下で仮の線を出さない（離すまで「押している」が残っていた） */
        else if(state === 'done'){ if(performance.now() - fixedAt < 350) return; if(doneFn) doneFn(); fresh = true; startedAt = performance.now() + 100; return; }
        else fresh = false;
        if(state !== 'trace') return;
        if(performance.now() - startedAt < 400){ pend = {id:e.pointerId, x:e.clientX, y:e.clientY}; return; }   /* v421: 守りの窓でも、動いたら線にする（叩くだけは無視） */
        down = true; moved = 0; downX = e.clientX; downY = e.clientY;
        try{ stage.setPointerCapture(e.pointerId); }catch(x){}
        liveEl.classList.add('press'); move(e);
        if(bi === 0 && ti === 0 && !lcapDone && !rot){ var lc0 = el('i', 'gm-lcap'); lc0.textContent = L('離すと、ここに線が引かれます', 'Release to place the line'); liveEl.appendChild(lc0); liveEl.appendChild(el('i', 'gm-ldot')); }   /* v408: 手本の円を、押している間の線の中心にも */   /* v405: 一本目は、押している間だけ線に付いて回る一言（小坂さんの案） */
      });
      stage.addEventListener('pointermove', function(e){
        if(e.pointerType) ptype = e.pointerType;
        if(state !== 'trace') return;
        if(pend && !down && e.pointerId === pend.id){ var pdx = e.clientX - pend.x, pdy = e.clientY - pend.y; if(pdx * pdx + pdy * pdy > 64){ pend = null; startedAt = 0; fresh = false; if(e.pointerType !== 'touch'){ try{ stage.setPointerCapture(e.pointerId); }catch(x){} } down = true; moved = 0; downX = e.clientX; downY = e.clientY; liveEl.classList.add('press'); } }   /* v423: 指はすでに絵が暗黙に捕まえている。ここで捕まえ直すと lostpointercapture が出て、なぞりが殺されていた（実機の記録で判明） */   /* v417: 進めるための押下がそのまま動いたら、その指で次の線を引き始める（実機で一回目のドラッグが消えていた） */
        if(down){ moved = Math.max(moved, Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY)); if(moved > 6) helpOff(); }   /* なぞり始めたら帯は引っ込める */
        if(ptype === 'touch' && !down) return;
        move(e);
      });
      var lcapDone = false;
      function up(e, ok){
        pend = null;
        var lc = liveEl.querySelector('.gm-lcap'); if(lc){ lc.parentNode.removeChild(lc); lcapDone = true; } var ld = liveEl.querySelector('.gm-ldot'); if(ld) ld.parentNode.removeChild(ld);
        if(!down) return; down = false; liveEl.classList.remove('press');
        if(!ok || state !== 'trace') return;
        if(fresh && moved < 6){ fresh = false; return; }   /* 「次へ」のための一押しは、そのまま離しても確定しない */
        fresh = false; move(e); confirm();   /* 画像の外で離しても、端に丸めた位置で一度だけ確定（pointercancel では確定しない） */
      }
      stage.addEventListener('pointerup', function(e){ up(e, true); });
      var tmY = null; gm.addEventListener('touchstart', function(e){ tmY = e.touches[0] ? e.touches[0].clientY : null; }, {passive:true});
      gm.addEventListener('touchmove', function(e){ if(!phoneFree) return;   /* v431: 案内中も遊び中も、後ろの本編は動かさない（本人） */ var sc = e.target && e.target.closest ? e.target.closest('.gm-side, .gm-iscroll, .gm-info-in, .gm-take-in, .gm-sheet') : null;
        if(sc){ var y = e.touches[0] ? e.touches[0].clientY : tmY, dy = (tmY === null || y === null) ? 0 : y - tmY; tmY = y;   /* v398: 列の端で引いても紙面へ伝えない（帯が戻り、本編が見える） */
          if(sc.classList.contains('gm-side') || sc.classList.contains('gm-info-in')){ var atTop = sc.scrollTop <= 0, atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1; if((atTop && dy > 0) || (atEnd && dy < 0) || sc.scrollHeight <= sc.clientHeight + 1) e.preventDefault(); }
          return; }
        e.preventDefault(); }, {passive:false});   /* v391: 盤面の間、指で紙面が動かないように */
      stage.addEventListener('pointercancel', function(e){ up(e, false); if(state === 'trace') tipEl.classList.remove('off'); });
      stage.addEventListener('lostpointercapture', function(){ if(down){ down = false; liveEl.classList.remove('press'); if(state === 'trace') hideLive(); } });
      stage.addEventListener('pointercancel', function(){ down = false; liveEl.classList.remove('press'); if(state === 'trace') hideLive(); });   /* ブラウザに指を取られたら、なぞりを白紙に戻す */
      stage.addEventListener('keydown', function(e){
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
      function fitW(){   /* v427: 帯（ブラウザの上下の棒）が出入りしただけでは組み直さない。幅が変わったときだけ（本人） */
        var w = window.innerWidth, vw = window.visualViewport ? Math.round(window.visualViewport.width) : w;
        if(document.documentElement.classList.contains('phone') && w === lastW && vw === lastVW) return;
        lastW = w; lastVW = vw; fit();
      }
      window.addEventListener('resize', fitW); window.addEventListener('resize', function(){ setTimeout(blurFit, 80); }); window.addEventListener('resize', function(){ setTimeout(moreMark, 80); }); (function(){ var sc = gm.querySelector('.gm-side'); if(sc){ sc.addEventListener('scroll', moreMark, {passive:true}); if(window.MutationObserver) new MutationObserver(function(){ setTimeout(moreMark, 60); setTimeout(moreMark, 700); }).observe(sc, {childList:true, subtree:true}); } })();   /* v420: 列の下端に続きの印 */ window.addEventListener('resize', function(){ if(introOn){ ibgBuild(); introBg(); } else if(state === 'compare' || state === 'done'){ setTimeout(reveal, 60); } });   /* v409: 帯の出入りで高さが変わってもボタンを見せる（想定外係 #3） */ window.addEventListener('orientationchange', function(){ setTimeout(fit, 80); setTimeout(fit, 400); });
      if(window.visualViewport){ window.visualViewport.addEventListener('resize', fitW); window.visualViewport.addEventListener('resize', vvFit); window.visualViewport.addEventListener('scroll', vvFit); }
      window.addEventListener('resize', vvFit); vvFit();
      document.addEventListener('click', function(e){   /* 遊びの最中にメニューの判（章・制作・プロフィール・連絡）を押したら、遊びを閉じてそこへ */
        if(!gm || gm.hidden) return; var a = e.target && e.target.closest ? e.target.closest('.menu a[href]') : null;
        if(a && a.classList.contains('mgame')){ close(); setTimeout(function(){ jumpTo(0); }, 60); return; }   /* v434: 開いている間にもう一度押したら、本編の先頭へ戻る（本人） */
        if(a) close();
      }, true);
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && gm && !gm.hidden){ if(infoEl && infoEl.classList.contains('on')) infoOff(); else if(takeEl && takeEl.classList.contains('on')) takeOff(); else if(gm.classList.contains('sheeton')) sheetOff(); else if(!introOn && state !== 'idle'){ /* v416: 途中の結果を Escape で捨てない（× で閉じる） */ } else close(); } });
    }
    /* ===== 案内：本編の MESSAGE 章と同じ「スクロールで一文ずつ現れる」形。四つの画面、右上にスキップ、最後に「はじめる」。
       下の丸は TOP と同じスクロールの促し。左の点は進み具合。↓／Space で次の一文、Enter で開始、Esc で閉じる ===== */
    var ISECS_ALL = [   /* 案内四面＋選択一面（Sol 第 11 ラウンドの構成）。v393 からは選ぶ一面だけを出す（小坂さんの指示）。iPhone は帯を畳むための起こし一面を前に置く */
      {at:0,   big:'四本',   ja:['三枚の絵に、四本ずつ。',   '一枚に四本ずつ、三枚で十二本の線を引きます。二分ほどで、あなたの平均グリッドができます。'],
                          en:['Four lines on each of three pictures.', 'You draw four lines on each picture, twelve in all. In about two minutes, your average grid is ready.']},
      {at:.22, big:'主塊',   ja:['主塊を、見つける。',       '私は、絵の中でいちばん大きなまとまりを主塊と呼びます。その始まりと重心に、よこ・たての線を一本ずつ引きます。'],
                          en:['Find the main mass.',        'I call the largest mass in a picture the main mass. You draw one line across and one down where it begins, and again at its centre of weight.']},
      {at:.44, big:'位置',   ja:['絵の端から、位置を測る。', '線を引くと、私が同じ絵に引いた線が破線で現れます。絵の幅と高さを 100 として、あなたと私の位置と差を百分率で比べます。'],
                          en:['Measure from the edge.',     'When you set a line, mine appears dashed on the same picture. With the width and height as 100, your position, mine, and the difference are read in percent.']},
      {at:.66, big:'四本',   ja:['十二本を、四本にまとめる。', '三枚を測り終えると、同じ役割の三本が一本にまとまります。できた四本を、研究で得た骨格と重ねます。'],
                          en:['Twelve lines become four.',  'After the third picture, the three lines of each role merge into one. Your four lines are then laid over the grid from my research.']},
      {at:.88, big:'絵',     ja:['測る絵を、選ぶ。',         '研究で測った日本と西洋の絵には、主塊の位置や間の取り方に違いがありました。測る絵を選ぶと三枚が無作為に出て、最後に二つの骨格を比べられます。'],
                          en:['Choose the pictures.',       'In my research, Japanese and Western pictures placed the main mass and the empty space differently. Choose which to measure; three pictures are drawn at random, and the two grids are compared at the end.'], choice:true}
    ];
    var ISECS = [];
    function isecsFor(){
      var title = {k:4, at:0, title:true, big:'測る', ja:['絵を、測る。', ''], en:['Measure the picture.', '']};
      var IK = ['<svg viewBox="0 0 24 24"><rect x="2" y="6" width="6" height="12"/><rect x="9" y="6" width="6" height="12"/><rect x="16" y="6" width="6" height="12"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M3 12h18"/><circle class="d" cx="12" cy="12" r="2.6"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M3 10h18"/><path class="m" d="M3 15h18"/><path class="a" d="M17.5 10.4v4.2M16.2 11.4l1.3-1.3 1.3 1.3M16.2 13.6l1.3 1.3 1.3-1.3"/></svg>', '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16"/><path class="a" d="M8 4v16M15 4v16M3 9h18M3 15h18"/></svg>'];
      function il(t, i){ return '<li><i class="ik">' + IK[i] + '</i><span>' + t.split('<br>').map(body).join('<br>') + '</span></li>'; }   /* v415: 文節で折る（表係：語中で折れていた） */
      var LJ = '<ul class="gm-ilist">' + il('三枚の絵を測ります。一枚につき四本、二分ほどです。', 0) + il('操作は一つ。絵を押して、そのまま動かします。<br>離したところに線が引かれます。', 1) + il('一本引くたびに、私の線が現れ、解釈の違いが％で出ます。', 2) + il('十二本を引き終えると、あなたの平均グリッドができます。<br>研究の骨格と重ねて見比べられます。', 3) + '</ul>';
      var LE = '<ul class="gm-ilist">' + il('You measure three pictures: four lines each, about two minutes.', 0) + il('One gesture. Drag on the picture,<br>then release to place a line.', 1) + il('Each time you draw a line, mine appears and the difference is shown in percent.', 2) + il('After twelve lines your average grid is ready.<br>Lay it over the research grid and compare.', 3) + '</ul>';
      var info = {k:4, at:.36, html:true, info:true, big:'四本', ja:['三枚の絵に、四本ずつ。', LJ], en:['Four lines on each of three pictures.', LE]};
      /* v425: 三面目。何のために測るのかを先に言ってから、絵を選んでもらう（本人の指示） */
      var PJ = '<p class="gm-ipur">' + body('日本の絵と西洋の絵を同じやり方で測り、私が引いた線との差を％で見比べます。') + '</p>' +
        '<p class="gm-ipur">' + body('十二本を引き終えると、あなたの平均グリッドができ、研究の骨格と重ねられます。') + '</p>' +
        '<p class="gm-ick">測る絵を選んでください　　くわしくは右上の「遊び方」から</p>';
      var PE = '<p class="gm-ipur">Japanese and Western pictures are measured the same way, and your lines are compared with mine in percent.</p>' +
        '<p class="gm-ipur">After twelve lines your average grid is ready, to lay over the research grid.</p>' +
        '<p class="gm-ick">Choose the pictures　　details under How to play, top right</p>';
      var RJ = '<p class="gm-ipur">' + body('私の研究では、形や余白の置かれ方を測り、日本画と西洋画の傾向を比べています。') + '</p>' +
        '<p class="gm-ipur">' + body('ここで行うのは、主な形が始まる位置と見た目の中心だけを、三枚の絵で測る簡易版です。') + '</p>';
      var RE = '<p class="gm-ipur">In my research, I measure how forms and empty spaces are placed, then compare the tendencies of Japanese and Western pictures.</p>' +
        '<p class="gm-ipur">What you do here is a simplified version: three pictures, and only where the main form begins and where its visual centre falls.</p>';
      var brief = {k:4, at:.68, html:true, big:'線で試す', ja:['研究の方法を、線で試す。', RJ], en:['Try the research method, line by line.', RE]};
      var choice = {k:4, at:1, html:true, choice:true, big:'見比べる', ja:['線の置きどころを、見比べる。', PJ], en:['Compare where the lines fall.', PE]};
      return [title, info, brief, choice];
    }
    var cat = 'both';   /* 日本／西洋／両方（小坂さんの指示）。最後に二つの骨格の違いも見せる */
    /* 分析カテゴリ：研究で「作品全体をどんな構図として捉えるか」を七つに分けたもの。遊びでは各絵に一つ */
    var CATS = [
      ['主塊と余白面', 'Mass and void', '一つの大きなまとまりと、その周りの余白の面で画面が決まる構図。', 'One large mass and the empty area around it decide the picture.'],
      ['前景フレームと奥行き', 'Foreground frame and depth', '手前の大きなもの（枝・窓・人物）が枠になり、その向こうに遠景を見せる構図。', 'A large near object, a branch, a window, a figure, frames the far view behind it.'],
      ['対置と中間領域', 'Opposition and the middle ground', '二つのまとまりが向かい合い、そのあいだの空きが主役になる構図。', 'Two masses face each other and the gap between them becomes the subject.'],
      ['反復と変奏', 'Repetition and variation', '同じ形が繰り返され、少しずつ変わることでリズムが生まれる構図。', 'A shape repeats with small changes, and the changes make the rhythm.'],
      ['水平分節と上下構成', 'Horizontal division, upper and lower', '画面が横の帯に分かれ、上と下の重さの違いで成り立つ構図。', 'The picture splits into horizontal bands, balanced by the different weights of top and bottom.'],
      ['密度差と空間の抜け', 'Density contrast and open space', '濃い所と薄い所の差と、何も描かない抜けで奥行きをつくる構図。', 'Depth comes from the contrast of dense and sparse, and from the untouched open space.'],
      ['垂直反復と高低差', 'Vertical repetition and height', '縦の要素の繰り返しと高さの差で画面を立たせる構図。', 'Vertical elements repeat at different heights and hold the picture upright.']
    ];
    function catDef(name){ for(var i = 0; i < CATS.length; i++){ if(CATS[i][0] === name) return CATS[i]; } return null; }
    function isecHTML(sx){
      var hj = sx.ja[0].split('|'), he = sx.en[0].split('|');
      return '<b>' + hj.map(function(t, k){ return '<u>' + mix(t, he[k] || (k === 0 ? sx.en[0] : ''), sx.big) + '</u>'; }).join('') + '</b><span>' + (sx.html ? L(sx.ja[1], sx.en[1]) : body(L(sx.ja[1], sx.en[1]))) + '</span>' +
        (sx.choice ? '<div class="gm-ichoice"><button type="button" data-c="jp">' + L('日本の絵', 'Japanese') + '</button><button type="button" data-c="we">' + L('西洋の絵', 'Western') + '</button><button type="button" data-c="both">' + L('両方', 'Both') + '</button></div>' : '');
    }
    function bindChoice(d){ d.querySelectorAll('.gm-ichoice button').forEach(function(bt){ bt.addEventListener('click', function(){ cat = bt.getAttribute('data-c'); var fs = introEl.querySelectorAll('.gm-ibg.b4 .jf'); fs.forEach(function(f){ if(cat === 'both' || (cat === 'jp' && f.classList.contains('l')) || (cat === 'we' && f.classList.contains('r'))) f.classList.add('pick'); }); if(rm) introEnd(false); else setTimeout(function(){ introEnd(false); }, 110); }); }); }   /* 選んだ側の枠が一瞬濃くなってから去る（応答） */
    function jwMeans(){ var g = {jp:{}, we:{}}; ['jp', 'we'].forEach(function(k){ var bs = BOARDS.filter(function(b){ return k === 'jp' ? !!b.jp : !b.jp; }); LINES.forEach(function(t){ var sum = 0; bs.forEach(function(b){ sum += b.a[t.k]; }); g[k][t.k] = bs.length ? Math.round(sum / bs.length) : 0; }); }); return g; }
    function jwTable(){ var g = jwMeans(); return '<table class="gm-tb gm-jwt"><thead><tr><th>' + L('線', 'line') + '</th><th>' + L('日本', 'Japan') + '</th><th>' + L('西洋', 'West') + '</th><th>' + L('差', 'diff') + '</th></tr></thead><tbody>' + LINES.map(function(t){ return '<tr><td>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire)) + '</td><td>' + g.jp[t.k] + PC + '</td><td>' + g.we[t.k] + PC + '</td><td>' + sg(g.we[t.k] - g.jp[t.k]) + PC + '</td></tr>'; }).join('') + '</tbody></table>'; }
    function jwOverlay(){
      var b = resEl.querySelector('.gm-jwb'); if(!b) return; var on = b.getAttribute('aria-pressed') === 'true'; b.setAttribute('aria-pressed', on ? 'false' : 'true');
      linesEl.querySelectorAll('.jw').forEach(function(x){ x.parentNode.removeChild(x); }); linesEl.classList.toggle('jwon', !on); if(on) return;
      var g = jwMeans(); LINES.forEach(function(t){ mkLine(linesEl, t.ax, g.jp[t.k], 'jw jp', L('日本 ', 'JP ') + g.jp[t.k] + '%'); mkLine(linesEl, t.ax, g.we[t.k], 'jw we', L('西洋 ', 'West ') + g.we[t.k] + '%'); });
    }
    /* 案内の背景の図：①主塊に四本 ②外郭に目盛り ③同じ％を絵・紙・画面に ④三枚→平均グリッド→紙面。薄い線で、文の後ろで一巡ずつ動く */
    /* 案内の背景：本編の「グリッド表示」（.lines）と同じ言葉——画面いっぱいの 1px の線、外周 10px の黄枠、中心軸、線を抜く小さな札。枠の中に閉じない（小坂さんの指摘） */
    function ibgSvg(k){
      function ln(cls, pos, lab, extra){ return '<i class="' + cls + '" style="' + pos + (extra || '') + '">' + (lab ? '<s>' + lab + '</s>' : '') + '</i>'; }
      var cls = k; k = [5, 0, 1, 3, 4][k];   /* 画面 → 図：⓪三枠に四本ずつ ①主塊 ②外郭に目盛り ③平均 ④日本と西洋 */
      var o = '<div class="gm-ibg b' + cls + '" aria-hidden="true"><i class="frame"></i>';
      if(k === 5){   /* ⓪：三枚の枠に、A→B→C の順に四本ずつ線が入る（Astra の案内の手本から） */
        var vals = [[14, 30, 55, 68], [2, 1, 28, 58], [12, 36, 55, 55]], t0 = .3;
        vals.forEach(function(v, fi){
          var lines = '<i class="h" style="top:' + v[0] + '%; transition-delay:' + (t0 + fi * 1.2) + 's"></i><i class="v" style="left:' + v[1] + '%; transition-delay:' + (t0 + .3 + fi * 1.2) + 's"></i><i class="h" style="top:' + v[2] + '%; transition-delay:' + (t0 + .6 + fi * 1.2) + 's"></i><i class="v" style="left:' + v[3] + '%; transition-delay:' + (t0 + .9 + fi * 1.2) + 's"></i>';
          o += '<b class="jf f' + fi + '" style="left:' + (6 + fi * 31) + '%; top:24%; width:26%; height:54%; transition-delay:' + (fi * .12) + 's"><s>' + 'ABC'[fi] + '</s>' + lines + (fi === 0 ? '<u class="fp" style="left:' + v[1] + '%"></u>' : '') + '</b>';   /* v392: A の枠に指の点（一本目を導く） */
        });
        return o + '</div>';
      }
      if(k === 4){   /* 五画面目（絵を選ぶ）：日本と西洋の骨格を二つの枠に並べる（私の読みの平均。違いが見える。Astra の手本から） */
        var g = jwMeans(), fr = [['jf l', 'left:7%; top:20%; width:37%; height:58%', L('日本の絵', 'Japanese'), g.jp], ['jf r', 'left:56%; top:20%; width:37%; height:58%', L('西洋の絵', 'Western'), g.we]];
        fr.forEach(function(f, fi){
          var lines = ['<i class="h" style="top:' + f[3].y1 + '%; transition-delay:' + (.3 + fi * .15) + 's"></i>', '<i class="v" style="left:' + f[3].x1 + '%; transition-delay:' + (.6 + fi * .15) + 's"></i>', '<i class="h" style="top:' + f[3].y2 + '%; transition-delay:' + (.9 + fi * .15) + 's"></i>', '<i class="v" style="left:' + f[3].x3 + '%; transition-delay:' + (1.2 + fi * .15) + 's"></i>'].join('');
          o += '<b class="' + f[0] + '" style="' + f[1] + '"><s>' + f[2] + '</s>' + lines + '</b>';
        });
        return o + '</div>';
      }
      if(k === 0){   /* 主塊：大きな塊。始まり（上・左）と重心に、端から端までの線が順に */
        o += '<i class="c"></i><b class="blob"></b>' +
          ln('h a1', 'top:27%', 'Y1 · ' + L('主塊開始', 'mass start') + ' 27%') + ln('v a2', 'left:26%', 'X1 · ' + L('主塊開始', 'mass start') + ' 26%') +
          '<i class="dot a3" style="left:58%; top:58%"></i>' + ln('h a4', 'top:58%', 'Y2 · ' + L('主塊重心', 'mass centroid') + ' 58%') + ln('v a5', 'left:58%', 'X3 · ' + L('主塊重心', 'mass centroid') + ' 58%');
      } else if(k === 1){   /* 外郭：外周の内側に 0〜100 の目盛りと巻き尺 */
        for(var i = 0; i <= 10; i++){ var big = i % 5 === 0; o += '<i class="tk tkt t' + i + (big ? ' big' : '') + '" style="left:calc(10px + (100% - 20px) * ' + (i / 10) + ')"></i><i class="tk tkl s' + i + (big ? ' big' : '') + '" style="top:calc(10px + (100% - 20px) * ' + (i / 10) + ')"></i>'; }
        o += '<i class="bd bdh"></i><i class="bd bdv"></i><b class="nm n0" style="left:16px; top:34px">0</b><b class="nm n5" style="left:50%; top:34px; transform:translateX(-50%)">50</b><b class="nm n10" style="right:16px; top:34px">100</b><b class="nm m10" style="left:22px; bottom:16px">100</b>';
      } else if(k === 2){   /* 百分率：一本の 32% の線が、絵・紙・画面の三つの区画を横断する */
        o += ln('v dv d1', 'left:46%; --to:38%') + ln('v dv d2', 'left:71%; --to:80%') + ln('h p1', 'top:32%') +
          '<b class="nm q1" style="left:16px; top:calc(32% - 22px)">32%</b><b class="nm q2" style="left:calc(46% + 12px); top:calc(32% - 22px)">32%</b><b class="nm q3" style="left:calc(71% + 12px); top:calc(32% - 22px)">32%</b>' +
          '<b class="cp c1" style="left:23%">' + L('絵', 'picture') + '</b><b class="cp c2" style="left:58.5%">' + L('紙', 'paper') + '</b><b class="cp c3" style="left:85.5%">' + L('画面', 'screen') + '</b>';
      } else {   /* 平均：三枚ぶんの線が平均の位置（＝このサイトの骨格）へ寄り、研究の三本が破線で加わり、見出し・図版・本文が乗る */
        var sets = [[3, -2.5, 2, -3], [-2, 2, -2.5, 2.5], [-1, -1, 1.5, 1]];   /* 三枚のずれ（vh／vw） */
        sets.forEach(function(d, i){ o += ln('h st r1', 'top:14%; --oy:' + d[0] + 'vh') + ln('v st r2', 'left:12%; --ox:' + d[1] + 'vw') + ln('h st r3', 'top:32%; --oy:' + d[2] + 'vh') + ln('v st r4', 'left:58%; --ox:' + d[3] + 'vw'); });
        o += ln('h g1', 'top:14%', 'Y1 14%') + ln('v g2', 'left:12%', 'X1 12%') + ln('h g3', 'top:32%', 'Y2 32%') + ln('v g4', 'left:58%', 'X3 58%') +
          '<i class="fx v" style="left:28%"><s>X2 28%</s></i><i class="fx v" style="left:83%"><s>X4 83%</s></i><i class="fx h" style="top:71%"><s>Y3 71%</s></i>' +
          '<b class="mk k1" style="left:calc(12% + 12px); top:calc(14% + 12px); width:20%; height:16px"></b><b class="mk k2" style="left:calc(12% + 12px); top:calc(32% + 12px); width:calc(46% - 24px); height:calc(39% - 24px)"></b>' +
          '<b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 12px); width:22%; height:5px"></b><b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 26px); width:18%; height:5px"></b><b class="mk k3" style="left:calc(58% + 12px); top:calc(32% + 40px); width:21%; height:5px"></b>';
      }
      return o + '</div>';
    }
    var ibgW = 0;
    function ibgBuild(){
      var pin = introEl.querySelector('.gm-ipin'), key = document.documentElement.lang; if(ibgW === key) return; ibgW = key;   /* 位置は CSS の％なので組み直しは言語が変わったときだけ */
      pin.querySelectorAll('.gm-ibg').forEach(function(x){ x.parentNode.removeChild(x); });
      /* v428: 背景は、遊びで使う絵を角と角で継いで並べ、横へ流す（本人）。文字は紙の縁取りで浮かせる */
      if(BOARDS.length && !rm){
        var mos = el('div', 'gm-ibg gm-imos'); mos.setAttribute('aria-hidden', 'true');
        var rows = (window.innerHeight <= 640 || /iPhone|Android/.test(navigator.userAgent)) ? 2 : 3;   /* v447: 手の端末は段を減らす（上下が止まる・途切れる：本人） */
        for(var mr = 0; mr < rows; mr++){
          var row = el('div', 'row' + (mr % 2 ? ' rev' : '')), strip = el('div', 'strip');
          var need = Math.max(6, Math.ceil(window.innerWidth / (rows > 2 ? 220 : 260)) + 2);   /* v446: 一巡が画面幅を超えるまで並べる（切れ目が出ていた：本人） */
          for(var cp = 0; cp < 2; cp++){
            for(var mi = 0; mi < need; mi++){
              var mb = BOARDS[(mi + mr * 5) % BOARDS.length];
              var mim = document.createElement('img'); mim.alt = ''; mim.decoding = 'async'; mim.draggable = false; mim.src = mb.img; strip.appendChild(mim);
            }
          }
          row.appendChild(strip); mos.appendChild(row);
        }
        pin.appendChild(mos);
      }
      /* v396: 案内の背景の図はやめる（小坂さん：安っぽく見える）。図の要素を作らず、地色だけ */
      ibgRuns = ISECS.map(function(){ return 0; });   /* 組み直した図は新しい要素なので、巡回の数も最初から（言語切替で二度呼ばれると図が動かないままになっていた） */
    }
    var ibgT = 0, ibgRuns = [0, 0, 0, 0, 0];
    function introBg(){
      if(!introOn) return; var cur = introAt();
      if(ibgRuns[cur] >= 2 && introEl.classList.contains('s' + cur)) return;   /* 二巡したら完成状態のまま */
      var onk = ISECS[cur].k; for(var i = 0; i < 5; i++){ introEl.classList.toggle('s' + i, i === onk); document.documentElement.classList.toggle('gms' + i, i === onk); }
      var bg = introEl.querySelector('.gm-ibg.b' + ISECS[cur].k); if(bg){ bg.classList.remove('run'); void bg.offsetWidth; bg.classList.add('run'); ibgRuns[cur]++; }
      clearTimeout(ibgT); ibgT = setTimeout(introBg, rm ? 60000 : 7600);   /* 一巡 7.6 秒でもう一度 */
    }
    function intro(){
      introOn = true; introEl.hidden = false; introEl.classList.remove('ready', 'end', 'moved'); introEl.__end = false; clearTimeout(introEl.__endT);   /* v443: 二度目に開いたとき前の状態が残り、スキップが消えていた（実機係） */ requestAnimationFrame(function(){ requestAnimationFrame(function(){ introEl.classList.add('ready'); }); });   /* v431: 開いたあと静かに現れる（本人） */
      ISECS = isecsFor(); ibgW = '';   /* v393: 面の組を決めてから図を組む */
      ibgBuild();
      /* スマホ（iPhone の Safari）：案内は文書のスクロールで進める。指で文書を送ると Safari の帯（タブ・アドレス）が畳まれ、
         そのあと遊びの間は overflow を止めるので畳まれたまま——盤面に画面の高さがそのまま渡る（幕の後ろの紙面は見えない） */
      docMode = false; phoneFree = document.documentElement.classList.contains('phone');   /* v429: 案内も枠の中で送る（文書を動かすと Safari の帯が戻り、後ろの本編も動く：本人）。iPhone では文書を動かせるままにして帯を畳んだまま保つ */
      setTimeout(blurFit, 60); setTimeout(blurFit, 700);
      var isp = introEl.querySelector('.gm-ispace'); if(isp) isp.style.height = ISECS.length < 3 ? (docMode ? '170%' : '130%') : '';   /* v393: 二面なら一度の送りで着く送り幅に */
      if(phoneFree){
        scroll0 = window.scrollY; document.documentElement.classList.add('gmdoc');
        var R = introRange(), maxB = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - R - 24);
        docBase = Math.max(0, Math.min(scroll0, maxB)); window.scrollTo(0, docBase);
        window.addEventListener('scroll', introScroll, {passive:true});
      }
      var secs = introEl.querySelector('.gm-isecs'), dots = introEl.querySelector('.gm-idots'); secs.innerHTML = ''; dots.innerHTML = '';
      if(!introEl.__swipe){ introEl.__swipe = true; var sy = null;   /* v396: iPhone は指で送ったら次の面へ寄せる */
        introEl.addEventListener('touchstart', function(e){ sy = e.touches[0] ? e.touches[0].clientY : null; }, {passive:true});
        introEl.addEventListener('touchend', function(e){ if(sy === null || !docMode || !introOn) return; var ey = e.changedTouches[0] ? e.changedTouches[0].clientY : sy, dy = ey - sy; sy = null; if(e.target.closest && e.target.closest('button, a')) return; if(dy < -50) introTo(introAt() + 1); else if(dy > 50) introTo(introAt() - 1); }, {passive:true});
      }
      if(!introEl.__tap){ introEl.__tap = true; var tp = null;   /* v392（Sol 第 16・Q2）：面を触ると図がもう一度動く。ボタンと送りの操作は邪魔しない */
        introEl.addEventListener('pointerdown', function(e){ tp = e.target.closest('button, a, .gm-idots') ? null : [e.clientX, e.clientY]; }, {passive:true});
        introEl.addEventListener('pointerup', function(e){ if(!tp) return; var dx = e.clientX - tp[0], dy = e.clientY - tp[1]; tp = null; if(dx * dx + dy * dy > 64 || !introOn) return; var cur = introAt(); ibgRuns[cur] = 0; introBg(); }, {passive:true});
      }
      ISECS.forEach(function(s, i){
        var d = el('div', 'gm-isec' + (s.title ? ' gm-ititle' : (s.choice ? ' gm-ipick' : (s.info ? ' gm-iinfo' : '')))); d.innerHTML = isecHTML(s); secs.appendChild(d); bindChoice(d);
        var dbt = el('button', i === 0 ? 'on' : ''); dbt.type = 'button'; dbt.setAttribute('aria-label', L((i + 1) + ' 枚目の案内へ', 'Go to slide ' + (i + 1))); dots.appendChild(dbt);   /* v439: ボタンにして、本編と同じくカーソルの輪が反応するように（本人） */
      });
      introEl.querySelector('.gm-iskip').textContent = L('スキップ', 'Skip'); introEl.querySelector('.gm-ihow').textContent = L('遊び方', 'How to play');
      introEl.querySelector('.gm-igo').textContent = L('次へ', 'Next');
      var one = ISECS.length < 2; [dots, introEl.querySelector('.gm-igo'), introEl.querySelector('.gm-iskip')].forEach(function(x){ if(x) x.style.display = one ? 'none' : ''; });
      ibgRuns = ISECS.map(function(){ return 0; }); introEl.classList.remove('end', 'moved', 's0', 's1', 's2', 's3', 's4'); iscroll.scrollTop = 0; introTgt = -1; introScroll(); introBg();
      setTimeout(function(){ if(introOn) iscroll.focus({preventScroll:true}); }, 60);
    }
    function introP(){ var m = introRange(); if(m <= 0) return 1; return docMode ? Math.max(0, Math.min(1, (window.scrollY - docBase) / m)) : iscroll.scrollTop / m; }
    function introCur(){ var p = introP(), cur = 0; ISECS.forEach(function(s, i){ if(i > 0 && p >= (s.at + ISECS[i - 1].at) / 2) cur = i; }); return cur; }
    function blurFit(){   /* v435: 文字の後ろの白いぼかしを、見出しと本文の中心に合わせる（面の中心とずれていた：本人） */
      if(!introEl) return;
      introEl.querySelectorAll('.gm-isec').forEach(function(sc){
        var sr = sc.getBoundingClientRect(); if(!sr.width) return;
        var b = sc.querySelector(':scope > b'), sp = sc.querySelector(':scope > span');   /* v438: 見出しの中の span を拾っていた（確認係） */
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
          sc.style.setProperty('--blurdy', Math.round(midY - (sr.top + sr.height / 2)) + 'px'); }   /* v444: 選ぶ面はボタンのぶん中心が下がっていた（確認係） */
      });
    }
    function introScroll(){
      if(!introOn) return;
      var p = introP(), secs = introEl.querySelectorAll('.gm-isec'), dots = introEl.querySelectorAll('.gm-idots > *'), cur = 0;
      if(introTgt >= 0 && introCur() === introTgt && performance.now() - introTgtAt > 250) introTgt = -1;   /* 行き先に着いたら解く */
      cur = introCur();   /* v396: 隣の面との中点で切り替える（二面の案内で、一度の送りで着くように） */
      secs.forEach(function(d, i){ d.classList.toggle('on', i === cur); d.classList.toggle('past', i < cur); });
      if(!introEl.classList.contains('s' + cur)) introBg();   /* 画面が変わったら背景の図を最初から */
      dots.forEach(function(d, i){ d.classList.toggle('on', i === cur); d.classList.toggle('done', i < cur); });
      /* v436: 送るたびにボタンの中身を書き換えていて、iPhone でカクつき、赤い丸が出たり消えたりしていた（本人）。変わったときだけ書き換える */
      var go = introEl.querySelector('.gm-igo'), isLast = cur === ISECS.length - 1, key = (isLast ? 'L' : 'N') + document.documentElement.lang;
      if(go.__k !== key){
        go.__k = key;
        go.innerHTML = isLast ? '<b>' + L('はじめる', 'Start') + '</b>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        go.setAttribute('aria-label', isLast ? L('はじめる', 'Start') : L('次へ', 'Next')); go.classList.toggle('last', isLast);
      }
      if(ringHold) ringText(cur === ISECS.length - 1 ? L('はじめる \u00b7 START \u00b7 ', 'START \u00b7 はじめる \u00b7 ') : L('次の一文へ \u00b7 NEXT \u00b7 ', 'NEXT \u00b7 次の一文へ \u00b7 '));
      introEl.classList.toggle('moved', p > .04);
      /* v441: 面の境目で判定が揺れて次へのボタンが点滅していた（本人）。最後の面かどうかは少し余裕を持って決める */
      (function(){ var isEnd = (introAt() === ISECS.length - 1) || cur === ISECS.length - 1;   /* v446: 行き先が最後の面なら、着く前から最後の見せ方に（切り替わる瞬間だけ出ていた：本人） */
        if(introEl.__end !== isEnd){ clearTimeout(introEl.__endT); introEl.__endT = setTimeout(function(){ introEl.__end = isEnd; introEl.classList.toggle('end', isEnd); }, isEnd ? 0 : 220); } })(); if(cur === ISECS.length - 1 && ringHold) cringOff(false);   /* 最後の画面では矢印が消えるので、輪も消す */   /* 最後の画面に来たら「はじめる」を出す（端まで送らなくても） */
    }
    var introTgt = -1, introTgtAt = 0, docMode = false, docBase = 0, scroll0 = 0, phoneFree = false;
    function introRange(){ return iscroll.scrollHeight - iscroll.clientHeight; }
    function introTo(i){ i = Math.max(0, Math.min(ISECS.length - 1, i)); introTgt = i; introTgtAt = performance.now(); var m = introRange(), top = Math.round(m * Math.min(1, ISECS[i].at + (i >= ISECS.length - 1 ? .2 : .02))); if(docMode) window.scrollTo({top: docBase + top, behavior: rm ? 'auto' : 'smooth'}); else iscroll.scrollTo({top: top, behavior: rm ? 'auto' : 'smooth'}); }
    function introAt(){ return (introTgt >= 0 && performance.now() - introTgtAt < 2500) ? introTgt : introCur(); }   /* なめらかに送っている最中（文書スクロールでは 1 秒を超える）は行き先の画面を基準に。着いたら scroll 側で解く */   /* ボタン連打：なめらかに送っている最中は行き先の画面を基準に */
    function introKey(e){
      if(!introOn) return; var k = e.key, cur = introAt(), p = introP();
      if(e.target && e.target.tagName === 'BUTTON' && (k === ' ' || k === 'Enter')) return;   /* v410: 選択ボタンの上では Space/Enter をボタンに（想定外係 #4） */
      if(k === 'Enter'){ if(cur === ISECS.length - 1){ var cb = introEl.querySelector('.gm-isec.on .gm-ichoice button'); if(cb && document.activeElement !== cb) cb.focus(); else return; } else introTo(cur + 1); e.preventDefault(); }
      else if(k === ' ' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'PageDown'){ introTo(cur + 1); e.preventDefault(); }
      else if(k === 'ArrowUp' || k === 'ArrowLeft' || k === 'PageUp'){ introTo(cur - 1); e.preventDefault(); }
    }
    /* v391: iPhone では案内のあとも文書を「動かせる」ままにしておく（gmdoc を残す）。文書が動かせなくなると Safari の帯が戻ってくる（実機で確認）。
       指のスクロールは gm の touchmove で止め、右の列など中で動く箇所だけ通す */
    function docOff(){ window.removeEventListener('scroll', introScroll); }
    /* v389: 遊びの間は紙面（文書）を固定する。iOS の Safari は overflow:hidden だけでは指のスクロールを止めきれないので body を fixed に */
    var lockY = 0, locked = false, openY = 0;
    function lockDoc(){ if(locked) return; locked = true; lockY = window.scrollY; document.body.style.top = -lockY + 'px'; document.documentElement.classList.add('gmlock'); }
    function unlockDoc(){ if(!locked) return; locked = false; document.documentElement.classList.remove('gmlock'); document.body.style.top = ''; jumpTo(lockY); }
    function jumpTo(y){ try{ window.scrollTo({top:y, behavior:'instant'}); }catch(e){ window.scrollTo(0, y); } }   /* v420: 戻す送りは即時（html{scroll-behavior:smooth} のせいで章を飛び回り、iPad では 08 への送りが捨てられていた＝本編係） */
    function introEnd(skipped){
      if(!introOn) return; introOn = false; introSeen = true; docOff(); clearTimeout(ibgT); cringOff(true); document.documentElement.classList.remove('gms0', 'gms1', 'gms2', 'gms3', 'gms4');
      introEl.classList.add('bye'); setTimeout(function(){ introEl.hidden = true; introEl.classList.remove('bye'); }, rm ? 0 : 720);   /* 文字と選択肢が先に消え（140ms）、線を残した地がゆっくり薄れる */
      start(); startedAt = performance.now();   /* 案内の操作を一手目へ持ち越さない：直後 400ms の押下は無視 */
      morphIn();
      var gin = gm.querySelector('.gm-in'); if(gin && !rm){ gin.classList.add('enter'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ gin.classList.add('on'); }); }); setTimeout(function(){ gin.classList.remove('enter', 'on'); }, 1100); }   /* 案内が薄れる間に、盤面と右の列が下からゆっくり現れる */
    }
    /* v392（Sol 第 16・Q4）：五面目で選んだ骨格の枠が、そのまま盤面の位置と大きさへ 700ms で育ち、四本を残したまま中に絵が現れる。拭きと拡縮は重ねない */
    function morphIn(){
      if(rm) return;
      var src = introEl.querySelector('.gm-isec.on .gm-ichoice') || introEl.querySelector('.gm-isec.on'); if(!src) return;   /* v406: 図をやめたので、選択の行から盤面へ育てる（総点検係の指摘） */
      var r0 = src.getBoundingClientRect(); if(!r0.width) return;
      var g = el('div', 'gm-morph'); g.style.cssText = 'left:' + r0.left + 'px;top:' + r0.top + 'px;width:' + r0.width + 'px;height:' + r0.height + 'px';
      src.querySelectorAll('i.h, i.v').forEach(function(l){ var c = el('i', l.classList.contains('v') ? 'v' : 'h'); var st = l.getAttribute('style') || ''; var m = /(left|top):\s*([\d.]+%)/.exec(st); if(m) c.style[m[1]] = m[2]; g.appendChild(c); });
      document.body.appendChild(g);
      /* v433: 盤面の寸法が落ち着くのを待ってから、一度で育てる（途中で合わせ直すと、一度大きくなってから戻って見えた：本人） */
      var last = null, still = 0, t0 = performance.now();
      (function wait(){
        var r1 = stage.getBoundingClientRect();
        var im = picEl && picEl.querySelector('img'), ready = !im || (im.complete && im.naturalWidth > 0);   /* v438: 絵が読み込まれてからでないと盤面の形が決まらない（確認係） */
        if(r1.width && ready && last && Math.abs(r1.width - last.w) < 1 && Math.abs(r1.height - last.h) < 1) still++; else still = 0;
        last = {w:r1.width, h:r1.height};
        if(still < 4 && performance.now() - t0 < 1500){ requestAnimationFrame(wait); return; }
        if(!r1.width){ g.remove(); return; }
        g.classList.add('go'); g.style.left = r1.left + 'px'; g.style.top = r1.top + 'px'; g.style.width = r1.width + 'px'; g.style.height = r1.height + 'px';
        /* v439: 育ち切ってから薄れる。待ちが入ったぶん、消し始めを育ちの終わりに合わせる（本人） */
        setTimeout(function(){ g.classList.add('bye'); }, 820); setTimeout(function(){ if(g.parentNode) g.remove(); }, 1400);
      })();
    }
    function btn(label, fn, cls){ var b = el('button', 'gm-b' + (cls ? ' ' + cls : '')); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); goEl.appendChild(b); return b; }
    function focusBtn(){ if(ptype === 'touch') return; setTimeout(function(){ var b = goEl.querySelector('button:not(:disabled)'); if(b) b.focus({preventScroll:true}); }, 220); }
    function forced(){
      /* 面接用：#play=id,id,id で三枚を指名。検証用の window.__gmForce も */
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
      /* v445: 帯の文が「遊び方」の下に潜らないよう、右の余白を実測で決める（確認係） */
      (function(){ var ib = gm.querySelector('.gm-i'), bd = gm.querySelector('.gm-band');
        if(!ib || !bd || !ib.offsetWidth) return;
        var br = bd.getBoundingClientRect(), ir = ib.getBoundingClientRect();
        var pr = Math.max(96, Math.round(br.right - ir.left + 16));
        if(pr < br.width - 200) gm.style.setProperty('--bandpr', pr + 'px');
      })();
      /* v432: 見出し行の帯は本編と同じ。ハンバーガーの中心をそのまま遊びの行の中心にする（本人：本編の法則に合わせる） */
      if(bg && bg.offsetWidth){
        var br0 = bg.getBoundingClientRect(), gr0 = gm.getBoundingClientRect();
        var cy0 = Math.round(br0.top + br0.height / 2 - gr0.top);
        if(cy0 > 10 && cy0 < 120){ gm.style.setProperty('--hdc', cy0 + 'px'); gm.style.setProperty('--hdh', (cy0 * 2) + 'px'); }
      }
      /* 遊びの中身の右端は、本編のハンバーガーの線の右端にそろえる（小坂さんの指定：情報の終点をひとつに） */
      gm.style.setProperty('--sidepad', '0px');
      if(bg && bg.offsetWidth){ var bodyEl = gm.querySelector('.gm-body'), bir = (bg.firstElementChild || bg).getBoundingClientRect().right, bodyR = bodyEl ? bodyEl.getBoundingClientRect().right : 0; if(bodyR > bir) gm.style.setProperty('--sidepad', Math.round(bodyR - bir) + 'px'); }
      /* 本編のハンバーガーが遊びの × に重なるとき（スマホ）だけ、× と右上の札をその左へ寄せる。PC は × のほうが右にあるので重ならない */
      gm.style.setProperty('--navw', '0px');
      if(xb && hd){   /* × はナビ（JA/EN・ハンバーガー）のすぐ左に並べ、ハンバーガーの中心の高さにそろえる */
        var xr = xb.getBoundingClientRect(), left = Infinity, g = gm.getBoundingClientRect();
        [hd.querySelector('.lang'), bg].forEach(function(el){ if(!el || !el.offsetWidth) return; left = Math.min(left, el.getBoundingClientRect().left); });
        /* i・×・JA/EN・ハンバーガーを等間隔に：本編の JA/EN とハンバーガーの間隔 G を測り、× と i もその間隔で並べる（× は 4px、ハンバーガーは 8px の内側余白ぶんを補正） */
        var lg = hd.querySelector('.lang'), V = 28;   /* V＝JA/EN の箱の右端からハンバーガーの線の左端まで（見た目の間隔） */
        if(lg && lg.offsetWidth && bg && bg.offsetWidth){ var lr = lg.getBoundingClientRect(), bi = (bg.firstElementChild || bg).getBoundingClientRect(); if(bi.left > lr.right) V = Math.round(bi.left - lr.right); }
        var cg = parseFloat(getComputedStyle(gm.querySelector('.gm-hd')).columnGap) || 12;
        gm.style.setProperty('--hgap', Math.max(0, V - 4 - cg) + 'px');   /* i の余白：見た目の間隔 V から、× の内側余白 4 と grid の gap を引く */
        if(isFinite(left)) gm.style.setProperty('--navw', Math.max(0, Math.round(xr.right - (left - V + 4))) + 'px');
        if(isFinite(left)) gm.style.setProperty('--gmnavl', Math.max(0, Math.round(g.right - left)) + 'px');   /* v409: 骨格画面の一列を本編ナビの左に収める（細部係 #1） */
        gm.style.setProperty('--vgap', V + 'px'); if(isFinite(left)) gm.style.setProperty('--ihdr', Math.round(g.right - left + V) + 'px');   /* 案内のスキップと × も同じ列・同じ間隔で JA/EN の左に */   /* × の字の右端（箱の右端 − 4）が JA/EN の左端から V 離れる */
        if(bg && bg.offsetWidth){ var br = bg.getBoundingClientRect(); gm.style.setProperty('--hdc', Math.round(br.top + br.height / 2 - g.top) + 'px'); }
      }
    }
    var openedAt = 0;
    function open(){
      build();
      if(!gm.hidden){ if(typeof setMenu === 'function') setMenu(false); return; }   /* 開いている最中にメニューの札を押したら、メニューを閉じるだけ */
      lastFocus = document.activeElement; clearTimeout(offT); openedAt = performance.now(); openY = window.scrollY;
      gm.querySelector('.gm-ttl').innerHTML = mix('絵を、測る。', 'Measure the composition.', '測る');
      gm.querySelector('.gm-sub').textContent = '';
      axlText();
      gm.querySelector('.gm-sx').textContent = L('戻る', 'Back'); var gi0 = gm.querySelector('.gm-i'); if(gi0) gi0.textContent = L('遊び方', 'How to play');
      ['.gm-ix', '.gm-x'].forEach(function(sel){ var e = gm.querySelector(sel); if(e) e.setAttribute('aria-label', L('閉じる', 'Close')); });
      if(typeof qaBuild === 'function') qaBuild();   /* v444: × の読み上げ名と Q&A も言語に合わせる（確認係） */   /* v400: 右の列の ? と見分けがつくよう文字で */
      var sw = sheetEl.querySelectorAll('.gm-swk button'); sw[0].textContent = L('あなたの骨格', 'your grid'); sw[1].textContent = L('研究の骨格', 'research grid');
      gm.hidden = false; document.documentElement.classList.add('gmopen'); void gm.offsetWidth; hdFit(); fit(); gm.classList.add('on');
      if(!forced()) intro(); else start();   /* 案内は開くたびに（スキップがある）。#play のときだけ省く */
      if(!phoneFree) lockDoc();
      if(window.__retint) window.__retint();   /* iOS の帯の色を、幕の紙色で採り直させる */
    }
    function close(){
      if(!gm || gm.hidden) return; state = 'idle'; down = false; introOn = false; introEl.hidden = true; sealOff(true); takeOff(); infoOff();
      if(phoneFree){ docOff(); document.documentElement.classList.remove('gmdoc'); phoneFree = false; } docMode = false; unlockDoc(); jumpTo(openY);   /* 紙面を、開く前の位置に戻す */
      gm.classList.remove('on', 'sheeton'); document.documentElement.classList.remove('gminfo', 'gms0', 'gms1', 'gms2', 'gms3', 'gms4');   /* v444: 閉じたあとに印が残っていた（確認係） */
      sheetEl.setAttribute('aria-hidden', 'true'); try{ sheetEl.inert = true; }catch(x){} document.documentElement.classList.remove('gmopen', 'gms0', 'gms1', 'gms2', 'gms3'); clearTimeout(ibgT);
      offT = setTimeout(function(){ gm.hidden = true; if(window.__retint) window.__retint(); }, 520);
      if(lastFocus && lastFocus.focus){ try{ lastFocus.focus({preventScroll:true}); }catch(e){} }
    }
    /* 細長い絵（掛軸・横長の巻物）は画面に収めると小さくなる。紙を回して置き直すように −90° に回し、外郭の枠も横長に組み替える（小坂さんの指示）。
       線の役割と％は絵の座標のまま（上から・左から）。回した絵では、絵の上端が画面の左、絵の左端が画面の下に来る。目盛りと札の数字は正立させる */
    var rot = false, turnEl = null, tbEl = null, turnT = 0;
    function unturn(){ if(!rot) return; rot = false; axlText(); stage.classList.remove('rot'); if(tbEl) tbEl.setAttribute('aria-pressed', 'false'); tbLabel(); }
    /* v388: 目盛りの向きの語。回した絵では「左から」が左の目盛りに沿って上へ、「上から」が下の目盛りに沿って右へ */
    function axlText(){ var axh = gm.querySelector('.gm-axl.h'), axv = gm.querySelector('.gm-axl.v'); if(axh) axh.textContent = rot ? L('左から ↑', 'from left ↑') : L('左から →', 'from left →'); if(axv) axv.textContent = rot ? L('上から →', 'from top →') : L('上から ↓', 'from top ↓'); }
    function tbLabel(){ if(!tbEl) return; var t = rot ? L('絵を縦に戻す', 'Turn the picture back') : L('絵を横にして、大きく', 'Turn the picture sideways'); tbEl.setAttribute('aria-label', t); tbEl.title = t; var sp = tbEl.querySelector('span'); if(sp) sp.textContent = rot ? L('縦に戻す', 'Back') : L('横にする', 'Turn'); }
    function turnAllowed(){
      var b = picks[bi]; if(!b || !turnEl || state === 'avg' || state === 'idle' || gm.hidden) return false;
      var sw = gm.querySelector('.gm-sw'), W = Math.max(60, sw.clientWidth - 30), H = Math.max(stage.offsetHeight, sw.clientHeight - 40);
      if(rot) return true;
      var ar = b.ar, w0 = Math.min(W, H * ar), a0 = w0 * w0 / ar, w1 = Math.min(W, H / ar), a1 = w1 * w1 * ar;
      return a1 > a0 * 1.2;   /* 回すと二割以上大きく見えるときだけ */
    }
    function tbFit(){ if(tbEl) tbEl.hidden = !turnAllowed(); }
    function turnPic(on){
      var b = picks[bi]; if(!b || on === rot || !turnEl) return;
      if(demoEl){ demoDone = true; demoOff(); }   /* v405: 回したら手本は消す（位置が合わなくなる） */
      var s0 = stage.getBoundingClientRect(), t0w = turnEl.offsetWidth, t0h = turnEl.offsetHeight;
      hideLive(); if(state === 'trace' && live < 0) tipEl.classList.remove('off');   /* 手番の札は消さない */
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
      function put(){ unturn(); stage.style.setProperty('--ar', b.ar); stage.style.setProperty('--par', b.ar); stage.classList.remove('blank'); picEl.innerHTML = ''; picEl.appendChild(picOf(b)); picEl.classList.remove('swap'); tbFit(); setTimeout(fit, 60); setTimeout(fit, 420);   /* v446: 一枚目が小さいまま出ることがあった（本人）。形が決まってから組み直す */ }
      /* 作品の切替は三段：前の絵が薄れる → 外郭（枠）が次の絵の縦横に整う → 次の絵が現れる。枠を先に整えるので「別の作品に移った」ことが目で分かる（Astra の手本から採用） */
      if(had && !rm){
        clearTimeout(swapT); stage.classList.add('swapping'); picEl.classList.add('swap'); var oc = gm.querySelector('.gm-cring'); if(oc) oc.classList.add('bye');   /* 前の場面の輪が残っていれば消す */
        swapT = setTimeout(function(){
          /* 枠の変形は前後の実寸を測って width/height を同時に送る（縦横比だけ替えると、途中で枠が画面からはみ出す） */
          var r0 = stage.getBoundingClientRect();
          stage.style.transition = 'none';   /* CSS の width の遷移を止めてから測る（遷移中だと新しい寸法が読めない） */
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
      if(state === 'trace'){ listState(); mode(L('なぞる', 'trace')); tipEl.classList.remove('off'); }   /* 決めずに離した（絵を押して次へ進んだ直後など）：一覧の仮の値と「押している」を戻し、札も戻す */
    }
    function clearDim(){ dimEl.className = 'gm-dim'; dimEl.innerHTML = ''; }
    /* 導入は一手目に統合：開いた瞬間から一枚目が触れる */
    function start(){
      res = []; bi = 0; ti = 0; live = -1; first = true;
      picks = pick3(); preload(picks); cardEl.hidden = true; trayReset();
      boardStart(0);
    }
    var boardAt = 0;
    function boardStart(i){
      bi = i; ti = 0; res[i] = {}; boardAt = performance.now(); var b = picks[i]; goEl.classList.remove('hold', 'on');
      showBoard(b);
      cardRender(i);
      cardEl.hidden = false; listBuild();
      (function(){ var sc = gm.querySelector('.gm-side'); if(sc) sc.scrollTop = 0; })();   /* v443: 絵が替わったら列を頭へ（実機係） */
      turn();
    }
    function cardRender(i){ var b = picks[i];
      cardEl.innerHTML = '<b>' + 'ABC'[i] + '</b><strong>' + ttl(b) + '</strong><em>' + L('分析カテゴリ · ', 'Category · ') + esc(L(b.cat, b.cate)) + '<button type="button" class="gm-q gm-catq2" aria-label="' + L('分析カテゴリとは', 'What is a category') + '" title="' + L('分析カテゴリとは：研究で作品全体の構成を七つの観点で整理したもの。押すと説明が開きます。', 'The category: one of seven viewpoints from my research. Press to open the explanation.') + '">?</button></em><small>' + esc(L(b.src, b.srce)) + '</small>';
      cardEl.querySelector('.gm-catq2').addEventListener('click', function(){ infoWantCat = true; info(); });   /* 「分析カテゴリって何？」に、その場で答える */
    }
    function obj(b){ return L(b.obj || '塊', b.obje || 'mass'); }
    /* v390: 一枚目の一本目だけ、絵の上で「押したまま下へ、離す」を指の影で見せる。触れたら消える */
    var demoEl = null, demoDone = false;
    function demoOn(){ if(demoDone || rm) return; demoOff(); demoEl = el('div', 'gm-demo'); demoEl.innerHTML = '<i class="gm-demo-ln"></i><i class="gm-demo-dot"></i><b>' + L('絵を押して、そのまま下へ動かしてください。<br>離したところに線が引かれます。', 'Drag downward on the picture,<br>then release to place a line.') + '</b>'; stage.appendChild(demoEl);
      /* v399: 問いの札が絵の中にあるとき（iPhone）は、その下に 8px 空けて同じ幅で置く */
      requestAnimationFrame(function(){ if(!demoEl || !tipEl) return; var tr = tipEl.getBoundingClientRect(), sr = stage.getBoundingClientRect(), b = demoEl.querySelector('b'); if(tr.height && tr.top >= sr.top - 1){ b.style.left = (tr.left - sr.left) + 'px'; b.style.top = (tr.bottom - sr.top + 8) + 'px'; b.style.bottom = 'auto'; b.style.width = tr.width + 'px'; b.style.transform = 'none'; } }); }
    function demoFit(){   /* v429: 手本の文は、問いの札と同じ中心に（iPhone で 35px ずれていた：本人） */
      if(!demoEl || !tipEl) return; var bEl = demoEl.querySelector('b'); if(!bEl) return;
      var tb = tipEl.getBoundingClientRect(); if(!tb.width) return;
      bEl.style.marginLeft = '0px';
      var bb = bEl.getBoundingClientRect(); if(!bb.width) return;
      bEl.style.marginLeft = Math.round((tb.left + tb.width / 2) - (bb.left + bb.width / 2)) + 'px';
    }
    function demoOff(){ if(demoEl && demoEl.parentNode) demoEl.parentNode.removeChild(demoEl); demoEl = null; }
    function turn(){
      setTimeout(function(){ if(stage && state === 'trace') stage.classList.toggle('narrow', stage.getBoundingClientRect().width < 330); }, 520);   /* v411: 狭い盤面（縦長の絵）では問いを一行に */
      if(bi === 0 && ti === 0 && !demoDone){ demoOn(); setTimeout(demoFit, 40); setTimeout(demoFit, 560); } else demoOff();
      var t = LINES[ti], b = picks[bi];
      state = 'trace'; live = -1; down = false;
      stepEl.innerHTML = '<span>' + esc('ABC'[bi] + ' · ' + L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + ti + 1) + '</span>'; listState(); mode(L('なぞる', 'trace'));
      resEl.classList.add('sw'); setTimeout(function(){ resEl.classList.remove('sw'); }, 30);
      resEl.innerHTML =
        (first ? '<p class="gm-ask gm-lead"><b>' + mix('絵から、ものさしを取り出す。', 'Turn a picture into a ruler.', 'ものさし') + '</b>' + L('一枚に四本ずつ線を引き、三枚の平均を出します。', 'Draw four lines on each picture; the three are then averaged.') + '</p>' : '') +
        (first ? '<p class="gm-note">' + L('絵を押して、そのまま動かします。<br>離したところに線が引かれます。', 'Drag on the picture,<br>then release to place a line.') + '</p>' : '');   /* 線の名前は右の一覧が示す（帯・一覧・見出しの三重を避ける） */
      goEl.innerHTML = '';
      if(bi === 0) help(t, false); else helpOff();
      hideLive(); liveEl.className = 'gm-live ' + t.ax; liveEl.style.left = ''; liveEl.style.top = '';
      tipEl.innerHTML = '<b>' + (ti + 1) + ' / ' + LINES.length + '</b><span>' + esc(L(t.q, t.qe).replace('%s', obj(b))) + '</span>'; tipEl.classList.remove('off');
      if(ptype !== 'touch') setTimeout(function(){ if(state === 'trace') stage.focus({preventScroll:true}); }, 30);
      setTimeout(tipFit, 40); setTimeout(tipFit, 520);
      tbFit();
    }
    function move(e){
      if(state !== 'trace') return;
      var t = LINES[ti], r = stage.getBoundingClientRect(), px, py;
      if(rot){ px = 100 - (e.clientY - r.top) / r.height * 100; py = (e.clientX - r.left) / r.width * 100; }   /* 絵を −90° に回して置いたとき：絵の上端は画面の左、絵の左端は画面の下 */
      else { px = (e.clientX - r.left) / r.width * 100; py = (e.clientY - r.top) / r.height * 100; }
      var p = t.ax === 'v' ? px : py;
      setLive(Math.max(0, Math.min(100, p)));
    }
    /* なぞる：線は補間なしで追従。数値は指に隠れない位置——たての線は上端、よこの線は右端——に。目盛りには 0 からここまでの寸法 */
    function setLive(p){
      var t = LINES[ti]; live = p; var s = p.toFixed(2) + '%'; listLive(p); mode(down ? L('押している', 'holding') : L('なぞる', 'trace'));
      liveEl.className = 'gm-live ' + t.ax + ' on' + (down ? ' press' : '') + (p > 88 ? ' low' : '') + (p < 12 ? ' high' : '');   /* v418: 端では一言と札の置き場を変える（細部係） */
      if(down && p < 14) tipEl.classList.add('off'); readEl.className = 'gm-read ' + t.ax + ' on';
      if(t.ax === 'v'){ liveEl.style.left = s; liveEl.style.top = ''; readEl.style.left = rot ? 'clamp(46px, ' + s + ', calc(100% - 46px))' : 'min(' + s + ', calc(100% - 46px))'; readEl.style.top = ''; drv.style.width = s; drv.className = 'gm-dimr v on'; }
      else { liveEl.style.top = s; liveEl.style.left = ''; readEl.style.top = rot ? 'clamp(46px, ' + s + ', calc(100% - 46px))' : 'max(31px, ' + s + ')'; readEl.style.left = ''; drh.style.height = s; drh.className = 'gm-dimr h on'; }
      readEl.textContent = Math.round(p) + '%';
      if(down && moved > 5) tipEl.classList.add('off');   /* 押したまま 5px 動いたらキャプションを引く（なぞるだけ・押しただけでは残す） */
    }
    /* 離して確定：その位置で保存。端点を短く強める。すぐにわたしの線を破線で重ね、二本のあいだに寸法。次の押下まで残す */
    function confirm(){
      if(state !== 'trace' || live < 0) return;
      var t = LINES[ti], b = picks[bi], p = Math.round(live), a = b.a[t.k], d = p - a;
      state = 'compare'; fixedAt = performance.now(); res[bi][t.k] = p; hideLive(); helpOff(); listState(); mode(L('比べる', 'compare'));
      if(bi === 2 && ti === LINES.length - 1 && !rm){ stage.classList.remove('twelve'); void stage.offsetWidth; stage.classList.add('twelve'); }   /* 十二本目：外郭が一拍応える */
      var ln = mkLine(linesEl, t.ax, p, 'you now', p + '%');
      if(!rm) setTimeout(function(){ ln.classList.remove('now'); }, 420);
      mkLine(linesEl, t.ax, a, 'mine', a + '%');
      dim(t.ax, p, a, d);
      resEl.classList.add('sw'); setTimeout(function(){ resEl.classList.remove('sw'); }, 30);
      cmpRender(t, b, p, a, d);
      first = false; setTimeout(reveal, 80);
    }
    function cmpRender(t, b, p, a, d){
      resEl.innerHTML = '<p class="gm-ask"><b>' + mix(t.n, t.ne, t.k === 'y1' || t.k === 'x1' ? '開始' : '重心') + '<small>' + L(t.dir + 'の線', t.dire) + '</small></b></p>' +
        '<dl class="gm-cmp"><div><dt>' + L('あなた', 'you') + '</dt><dd>' + p + PC + '</dd></div><div><dt>' + L('私', 'me') + '</dt><dd>' + a + PC + '</dd></div><div><dt>' + L('解釈の違い', 'difference') + '</dt><dd>' + sg(d) + PC + '</dd></div></dl>' +
        '<p class="gm-why">' + body(L(b.why[ti], b.whye[ti])) + '</p>' +
        (first ? '<p class="gm-note">' + L('絵の幅と高さを 100 として測ります。', 'Read the picture\'s width and height as 100.') + '<br>' + (ptype === 'touch' ? L('絵を押すと、次の線。', 'Tap the picture for the next line.') : L('もう一度押すと、次の線。', 'Click again for the next line.')) + '</p>' : '');
      goEl.innerHTML = ''; btn(ti < LINES.length - 1 ? L('次の線', 'Next line') : L('測り終える', 'Finish this picture'), nextTurn, 'go'); btn(L('引き直す', 'Redo this line'), redo);   /* 四本目のあとは線ではなく記録へ進むので、名前を変える */
    }
    /* 狭い画面では結果の下のボタンが欄の外に隠れる。決まった直後に、欄だけを静かに送って見せる（文書は動かさない） */
    function moreMark(){ var sc = gm && gm.querySelector('.gm-side'); if(!sc) return; sc.classList.toggle('more', sc.scrollHeight - sc.clientHeight - sc.scrollTop > 6); }
    function revealRes(){   /* v414: 平均の見出しを列の頭に合わせる（ボタンは iPhone では sticky、pc はホイール／iPad は指で） */
      var sc = gm.querySelector('.gm-side'); if(!sc || !resEl || sc.scrollHeight <= sc.clientHeight + 2) return;
      var top = sc.scrollTop + (resEl.getBoundingClientRect().top - sc.getBoundingClientRect().top) - 6;
      try{ sc.scrollTo({top: Math.max(0, top), behavior: rm ? 'auto' : 'smooth'}); }catch(e){ sc.scrollTop = Math.max(0, top); }
    }
    function reveal(){
      if(!goEl.firstChild) return;
      var sc = goEl.parentNode;
      while(sc && sc !== gm){ var o = getComputedStyle(sc).overflowY; if((o === 'auto' || o === 'scroll') && sc.scrollHeight > sc.clientHeight + 2) break; sc = sc.parentNode; }
      if(!sc || sc === gm) return;
      var sr = sc.getBoundingClientRect(), d = goEl.getBoundingClientRect().bottom - sr.bottom + 10;
      if(d <= 0) return;
      /* v413: 目標は一覧の頭（列の座標で。offsetTop は列の外の親が基準になり 72px 送りすぎていた＝細部係）。それでもボタンが隠れるなら、落ち着いてからボタンまで */
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
      state = 'done'; fixedAt = performance.now(); trayFill(bi);
      var slot = trayEl.children[bi]; if(slot && !slot.querySelector('.gm-mseal')){ var ms = el('i', 'gm-mseal'); try{ if(typeof kakuSvg === 'function') ms.appendChild(kakuSvg('', ['壱', '弐', '参'][bi], 60 + bi)); }catch(x){} slot.appendChild(ms); centerSeal(ms); }
      doneFn = bi < 2 ? function(){ doneFn = null; boardStart(bi + 1); } : function(){ doneFn = null; average(); };
      stepEl.innerHTML = '<span>' + esc('ABC'[bi] + ' · ' + L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + 4) + '</span>'; listState(); mode(L('測り終わり', 'measured'));
      resEl.classList.add('sw'); setTimeout(function(){ resEl.classList.remove('sw'); }, 30);
      doneRender();
      focusBtn(); setTimeout(reveal, 80); setTimeout(reveal, 460);   /* v419: iPad の一枚目は列の伸びが遅れて 5px 欠けたので、もう一度（細部係） */   /* v414: 表が出て列が伸びたあとにボタンまで（細部係） */
      seal('MEASURED', '採寸', stage, 'tr');   /* v426: 記録用紙の横ではなく絵の右上に（本人） */   /* v397: iPhone は絵の右上に押す（右の列の下は目に入らない） */
      cring(L(ORD[bi] + '、測り終わり \u00b7 MEASURED \u00b7 ', 'THE ' + ORDE[bi].toUpperCase() + ', MEASURED \u00b7 '));
    }
    function doneRender(){
      resEl.innerHTML = '<p class="gm-ask"><b>' + mix(ORD[bi] + '、測り終わり。', 'The ' + ORDE[bi] + ', measured.', ORD[bi]) + '</b></p>' + table(bi) +
        '<p class="gm-note">' + (bi === 2 ? L('同じ役割の線を、三枚で平均します。', 'Lines of the same role are averaged across the three.') + '<br>' : '') + '</p>';
      goEl.innerHTML = '';
      if(bi < 2) btn(L(ORD[bi + 1] + 'へ', 'To the ' + ORDE[bi + 1]), doneFn, 'go');
      else btn(L('三枚の平均をとる', 'Average the three'), doneFn, 'go');
    }
    /* 一行の観察：四本の差（三枚の平均）でいちばん大きい一本を選び、向きで言う。作品ごとの差も一つ添える。点数は出さない */
    function observe(diff, per){
      /* Δ＝線別の三枚平均差（あなた−わたし。右・下が＋）、M＝max|Δ|、E＝12 値の max|d|。同率は手番順→作品順。判定は丸め前、表示は整数 */
      var k = null, M = 0; LINES.forEach(function(t){ if(Math.abs(diff[t.k]) > M + 1e-9){ M = Math.abs(diff[t.k]); k = t.k; } });
      var w = null; per.forEach(function(x){ if(!w || Math.abs(x.d) > Math.abs(w.d) + 1e-9) w = x; });
      var E = w ? Math.abs(w.d) : 0, out = '';
      function nm(t){ return L(t.n + '（' + t.dir + '）', t.ne + ' (' + t.dire + ')'); }
      function dir(t, d){ return t.ax === 'h' ? (d > 0 ? L('下', 'below') : L('上', 'above')) : (d > 0 ? L('右', 'to the right of') : L('左', 'to the left of')); }
      function dsz(t, d){ var a = Math.abs(Math.round(d)), w = t.ax === 'h' ? (d > 0 ? L('下に', 'below') : L('上に', 'above')) : (d > 0 ? L('右に', 'right') : L('左に', 'left')); return d === 0 ? L('同じ', 'same') : L(w + ' ' + a + PC, a + PC + ' ' + w); }   /* 「+14%」でなく「下に 14%」 */
      if(E < 4) out = '<p class="gm-obs">' + L('三枚とも、私と近い位置に四本の線を引きました。', 'On all three pictures, your four lines were close to mine.', '近い') + '</p>';
      else if(M >= 4){
        var t = LINES.filter(function(x){ return x.k === k; })[0], d = diff[k];
        out = '<p class="gm-obs">' + L('平均すると、主塊の' + (t.k === 'y1' || t.k === 'x1' ? '始まり' : '重心') + 'を私より' + dir(t, d) + 'に見ています。', 'On average, you placed the mass’s ' + (t.k === 'y1' || t.k === 'x1' ? 'start' : 'centre of weight') + ' ' + dir(t, d) + ' mine.', dir(t, d)) + '<small>' + dsz(t, d) + '</small></p>';
        out += '<p class="gm-obs2">' + L('いちばん解釈が分かれたのは、' + 'ABC'[w.i] + ' の' + w.t.n + '（' + w.t.dir + '・', 'Where our readings split most: ' + nm(w.t) + ' on ' + 'ABC'[w.i] + ' (') + '<span>' + dsz(w.t, w.d) + '</span>' + L('）。', ').') + '</p>';
      } else {
        out = '<p class="gm-obs">' + L('平均は近く、いちばん解釈が分かれたのは ' + 'ABC'[w.i] + ' の' + w.t.n + '（' + w.t.dir + '）でした。', 'The averages are close; our readings split most on ' + nm(w.t) + ' of ' + 'ABC'[w.i] + '.', '近く') + '<small>' + dsz(w.t, w.d) + '</small></p>';
      }
      return out;
    }
    /* 三枚の平均：同じ役割の三つの目盛りが一本の平均線へ集まり、そのあと研究の三本を薄く補う（あなたの4本＋研究の3本） */
    function average(){
      var avg = {}, kav = {}, diff = {}, per = [];
      LINES.forEach(function(t){ var s = 0, m = 0; res.forEach(function(r, k){ s += r[t.k]; m += picks[k].a[t.k]; per.push({i:k, t:t, d:r[t.k] - picks[k].a[t.k]}); }); avg[t.k] = Math.round(s / 3); kav[t.k] = Math.round(m / 3); diff[t.k] = (s - m) / 3; });
      state = 'avg'; cardEl.hidden = true; hideLive(); clearDim(); helpOff(); sealOff(true); unturn(); tbFit(); if(listEl) listEl.hidden = true; mode(L('集める', 'gather'));
      picEl.classList.add('swap'); linesEl.innerHTML = ''; stage.classList.remove('narrow');
      setTimeout(function(){ stage.style.transition = 'none'; stage.style.setProperty('--ar', (window.innerWidth / Math.max(1, window.innerHeight)).toFixed(3)); stage.classList.add('blank'); picEl.innerHTML = ''; picEl.classList.remove('swap'); void stage.offsetWidth; requestAnimationFrame(function(){ stage.style.transition = ''; }); }, rm ? 0 : 220);   /* v408: 幅だけ遷移して小箱が出る一瞬を無くす（細部係） */   /* 絵が薄れてから、白い盤面に目盛りが並ぶ */
      /* 目盛り→平均線。動きは left/top の transition（線は細く、集まったら平均線だけ濃く） */
      var ticks = [];
      LINES.forEach(function(t, n){
        res.forEach(function(r, k){ ticks.push({el: mkLine(linesEl, t.ax, r[t.k], 'tick', 'ABC'[k]), to: avg[t.k]}); });
        var av = mkLine(linesEl, t.ax, avg[t.k], 'you avg', avg[t.k] + '%'); av.style.transitionDelay = (n * .95 + 1.15) + 's';
      });
      void linesEl.offsetWidth;
      /* v389: 役割ごとに三本→一本を順に見せる（Astra の手本：保持 300ms、集約 780ms）。いま何を集めているかを一語で */
      LINES.forEach(function(t, n){ setTimeout(function(){ if(state === 'avg') mode(L(t.n + '（' + t.dir + '）を一本に', t.ne + ' (' + t.dire + ') into one')); }, rm ? 0 : 300 + n * 950); });
      setTimeout(function(){ if(state === 'avg') mode(L('平均', 'average')); }, rm ? 0 : 4300);
      var step = rm ? 0 : 1;
      setTimeout(function(){ ticks.forEach(function(x, i){ x.el.style.transitionDelay = (.35 + Math.floor(i / 3) * .95) + 's'; x.el.style[x.el.classList.contains('v') ? 'left' : 'top'] = x.to + '%'; }); linesEl.classList.add('gathered'); }, 120 * step);
      setTimeout(function(){ FIXED.v.forEach(function(v){ mkLine(linesEl, 'v', v, 'fixed', v + '%'); }); FIXED.h.forEach(function(v){ mkLine(linesEl, 'h', v, 'fixed', v + '%'); }); linesEl.classList.add('fixed'); }, rm ? 60 : 4300);
      setTimeout(function(){ var n = resEl.querySelector('.gm-seven'); if(n) n.classList.add('on'); if(state === 'avg'){ seal('YOUR GRID', '平均', stage, 'center'); cring(L('あなたの平均グリッド \u00b7 YOUR GRID \u00b7 ', 'YOUR AVERAGE GRID \u00b7 YOUR GRID \u00b7 ')); var th = resEl.querySelector('.gm-thanks'); if(th) th.classList.add('on'); trayEl.classList.add('pulse'); setTimeout(function(){ trayEl.classList.remove('pulse'); }, 500); } }, rm ? 100 : 4900);
      setTimeout(function(){ goEl.classList.add('on'); focusBtn(); revealRes(); }, rm ? 150 : 5400);
      lastAvg = {avg:avg, kav:kav, diff:diff, per:per}; avgRender(avg, kav, diff, per);
    }
    function avgRender(avg, kav, diff, per){
      stepEl.textContent = L('三枚の平均をとる', 'Averaging the three');
      resEl.innerHTML = '<p class="gm-ask"><b>' + mix('あなたの平均グリッド', 'Your average grid', '平均') + '</b></p>' +
        '<p class="gm-thanks">' + body(L('十二本から、あなたの比率ができました。', 'From your twelve lines, your ratios are ready.')) + '</p>' +
        sec(L('四本の平均', 'The four averages')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-avg"><li class="gm-avgh"><b></b><span></span><em>' + L('あなた', 'you') + '</em><small>' + L('私', 'me') + '</small></li>' + LINES.map(function(t){ return '<li><b>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' · ' + t.dire)) + '</b><span>' + res.map(function(r, k){ return 'ABC'[k] + ' ' + r[t.k]; }).join(' · ') + '</span><em>' + avg[t.k] + PC + '</em><small>' + kav[t.k] + '%</small></li>'; }).join('') + '</ul>' + '</div>' +
        observe(diff, per) +
        '<p class="gm-legend gm-seven"><i class="you"></i>' + L('朱の四本：あなた', 'red four: you') + '<i class="mine"></i>' + L('薄い破線の三本：研究', 'faint dashed three: research') + '</p>' +
        '<div class="gm-jw"><p class="gm-cmph">' + L('選んだ十九点では、骨格の置きどころにこれだけ違いが出ました。', 'Across the nineteen chosen works, the skeletons sit this differently.') + '</p>' + sec(L('日本と西洋の平均', 'Japan and the West')) + '<div class="gm-catx gm-secx" hidden><p class="gm-note">' + L('私の解釈を、絵の出どころごとに平均した値です。', 'My readings, averaged by where the pictures come from.') + (function(){ var nj = picks.filter(function(b){ return b.jp; }).length; return cat === 'both' ? L('あなたの三枚は、日本 ' + nj + ' 枚、西洋 ' + (3 - nj) + ' 枚でした。', ' Your three: ' + nj + ' Japanese, ' + (3 - nj) + ' Western.') : ''; })() + '</p>' + jwTable() + '<button type="button" class="gm-b gm-jwb" aria-pressed="false">' + L('日本と西洋を重ねる', 'Overlay Japan and the West') + '</button></div>' + '</div>' +
        '<div class="gm-media" role="group" aria-label="' + L('枠を替える', 'Change the frame') + '"><span>' + L('同じ％を、別の枠に', 'the same % in another frame') + '</span>' +
          '<button type="button" data-ar="screen" aria-pressed="true">' + L('この画面', 'this screen') + '</button><button type="button" data-ar="0.707" aria-pressed="false">A4</button><button type="button" data-ar="1" aria-pressed="false">' + L('正方形', 'square') + '</button></div>';
      bindSecs(resEl);
      var jwb = resEl.querySelector('.gm-jwb'); if(jwb) jwb.addEventListener('click', jwOverlay);
      resEl.querySelectorAll('.gm-media button').forEach(function(b){ b.addEventListener('click', function(){
        resEl.querySelectorAll('.gm-media button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var v = b.getAttribute('data-ar'); stage.style.setProperty('--ar', v === 'screen' ? (window.innerWidth / Math.max(1, window.innerHeight)).toFixed(3) : v);
      }); });
      goEl.innerHTML = ''; goEl.classList.add('hold');
      btn(L('画面いっぱいに表示', 'Show full screen'), function(){ sheet(avg); }, 'go');
      btn(L('研究と重ねる', 'Compare with the research grid'), overlay);
      btn(L('ものさしを保存', 'Save the ruler'), function(){ takeaway(avg); });
      btn(L('別の三枚を測る', 'Measure three more'), start);
      btn(L('研究の手順へ', 'To the research steps'), function(){ close(); setTimeout(function(){ if(window.__goStep) window.__goStep(1); else if(typeof skipTo === 'function') skipTo('#ch6'); }, 420); })   /* v434: 手順の頭（01）へ（本人） */;   /* v398: 手順 08 の位置へ直接（__goStep）。二段の移動をやめる */
    }
    /* 骨格としての比較：あなたの骨格（4＋3）と、研究の固定グリッド（7本）を重ねる。読みの比較とは別のもの */
    function overlay(){
      var on = linesEl.querySelector('.mine');
      if(on){ linesEl.querySelectorAll('.mine').forEach(function(x){ x.parentNode.removeChild(x); }); var n0 = resEl.querySelector('.gm-avnote'); if(n0) n0.parentNode.removeChild(n0); return; }
      GRID.v.forEach(function(v){ mkLine(linesEl, 'v', v, 'mine', v + '%'); }); GRID.h.forEach(function(v){ mkLine(linesEl, 'h', v, 'mine', v + '%'); });
      resEl.insertAdjacentHTML('beforeend', '<p class="gm-note gm-avnote">' + L('破線は、研究から作ったこのサイトのグリッドです。', 'Dashed lines show the research grid used by this site.') + '</p>');
    }
    /* C：持ち帰れる「あなたのものさし」——三枚の札と四本、X・Y の百分率、日付、判を一枚の PNG に */
    /* インフォメーション：いま測っている絵の情報、四本の線の役割、遊び方。どの場面からでも開ける（小坂さんの指示） */
    var infoEl = null, infoWantCat = false, infoWantHow = false;
    var QA = [
      ['二本の線が違うと、どちらかが間違いですか。', 'If the two lines differ, is one of them wrong?',
       'これは正解を当てるものではありません。あなたと私が、主な形の始まりや重心をどこに見たかを比べ、同じ絵から生まれる解釈の違いを数で見ています。',
       'There is no correct line to guess. The numbers compare where you and I see the main form begin and where its visual centre falls: two readings of one picture.'],
      ['七本のうち、なぜ四本だけを使うのですか。', 'Why does this use only four of the seven lines?',
       '研究では、各作品を七つの観点と七本の線で見ています。ここでは二分ほどで骨格に触れられるよう、主塊の始まりと重心を示すよこ・たての四本に絞りました。',
       'The study looks at each work through seven viewpoints and seven lines. This two-minute version keeps four: the horizontal and vertical lines for the main mass start and its visual centre.'],
      ['基準線も、結局は主観ではありませんか。', 'Are the reference lines subjective after all?',
       '線を引く判断は私がしています。主観を消すのではなく、七つの観点と線の置き方を全作品で同じ手順にそろえ、同じものさしで取った座標どうしを比べています。',
       'I place the lines myself. The aim is not to erase judgement but to keep the viewpoints and the method the same across every work, and to compare coordinates taken with one measure.'],
      ['作品の選び方に、偏りはありませんか。', 'Is there a bias in how the works were chosen?',
       '私が選ぶ以上、選び方そのものが研究の条件になります。そこで、主な形と余白を同じ手順で記録できることを共通の条件にし、十九点すべてと選んだ理由を示しています。',
       'Since I choose them, the selection is itself a condition of the study. The shared rule is that the main form and the empty space can be recorded by the same method; all nineteen works and the reasons are shown.'],
      ['この比率は、どこで使われていますか。', 'Where are these ratios actually used?',
       'このサイトで使っています。画面を均等に割るのではなく、絵から取り出した線に合わせて、文字と絵と余白の位置や間隔を決めています。',
       'On this site. Instead of dividing the screen evenly, the text, pictures and empty space follow the lines drawn from the paintings.']
    ];
    function qaBuild(){
      var host = gm.querySelector('.gm-qa'); if(!host) return;
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
    function bindSecs(root){   /* v433: 右の列でも節を畳めるように（本人：平均の画面の情報量が多い） */
      if(!root) return;
      root.querySelectorAll('.gm-secq').forEach(function(q){
        if(q.__bound) return; q.__bound = true;
        var x = q.nextElementSibling; if(!x) return;
        q.addEventListener('click', function(){ var on = x.hidden; x.hidden = !on; q.setAttribute('aria-expanded', on ? 'true' : 'false'); });
      });
    }
    function sec(t){ return '<button type="button" class="gm-catq gm-secq" aria-expanded="false"><span>' + t + '</span><i></i></button>'; }   /* v394: i の札の節は畳んで、押すと開く（分析カテゴリと同じ作法） */
    function info(){
      if(!infoEl){
        infoEl = el('div', 'gm-info'); infoEl.setAttribute('role', 'dialog'); infoEl.setAttribute('aria-label', L('この絵と線について', 'About this picture and the lines'));
        infoEl.innerHTML = '<div class="gm-info-in"><div class="gm-info-b"></div><div class="gm-take-b"><button type="button" class="gm-b go"></button></div></div>';
        infoEl.querySelector('.gm-take-b button').addEventListener('click', infoOff); infoEl.addEventListener('click', function(e){ if(e.target === infoEl) infoOff(); });
        gm.appendChild(infoEl);
      }
      var b = picks[bi], body = '';
      if(introOn){
        body += '<p class="gm-info-k">' + L('この遊びについて', 'About this game') + '</p><h3>' + L('主塊とは', 'The main mass') + '</h3><p class="gm-info-t">' + L('絵の中でいちばん大きなまとまりのことです。研究では、その始まりと重心の位置を、絵の端からの百分率で測ります。', 'The largest mass in a picture. My research reads where it begins and where its weight sits, as percentages from the edges of the picture.') + '</p>' +
          sec(L('四本の線の役割', 'What the four lines mean')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-info-l">' + LINES.map(function(t){ return '<li>' + pict(t.k) + '<b>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' (' + t.dire + ')')) + '</b><span>' + esc(L(t.h, t.he)) + '</span></li>'; }).join('') + '</ul></div>' +
          sec(L('線を引くコツ', 'Tips for drawing')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-info-l gm-three"><li><b>1</b><span>' + L('まず、いちばん大きなまとまりを一つ決めます。', 'First decide on the single largest mass.') + '</span></li><li><b>2</b><span>' + L('始まりは、まとまりの外側の縁。迷ったら少し外に。', 'The start is the outer edge of the mass; when in doubt, a little outside.') + '</span></li><li><b>3</b><span>' + L('重心は、重さが釣り合う所。中心より、濃い方へ寄せます。', 'The centre of weight is where the mass balances: lean toward the denser side, not the middle.') + '</span></li></ul></div>' +
          sec(L('研究の目的', 'Why this research')) + '<div class="gm-catx gm-secx" hidden><p class="gm-info-t">' + L('日本と西洋の絵を同じものさし（七本の機能線）で測り、主塊と余白の置き方の違いを百分率で比べる研究です。この遊びは、その手順を三枚でなぞります。', 'The research measures Japanese and Western pictures with the same ruler, seven functional lines, and compares in percent how the main mass and the empty space are placed. This game traces that procedure on three pictures.') + '</p></div>';
      } else if(b && state !== 'avg' && state !== 'idle'){
        body += '<p class="gm-info-k">' + L('いま測っている絵', 'The picture you are measuring') + '</p><h3>' + ttl(b) + '</h3>' +
          '<p class="gm-info-s">' + esc(L(b.src, b.srce)) + '</p>' + (b.note ? '<p class="gm-info-t gm-info-n">' + esc(L(b.note, b.notee)) + '</p>' : '') +
          '<p class="gm-info-s">' + L('分析カテゴリ：', 'Category: ') + esc(L(b.cat, b.cate)) + '　／　' + L('主塊：', 'Main mass: ') + esc(obj(b)) + '</p>' +
          '<button type="button" class="gm-catq gm-secq" aria-expanded="false"><span>' + L('分析カテゴリとは', 'What the category means') + '</span><i></i></button>' +
          '<div class="gm-catx" hidden><p class="gm-info-t">' + L('研究では、作品全体の構成を七つの観点で整理しています。ひとつの絵に複数が当てはまることもあります。この絵は、主に「', 'My research sorts the composition of a whole picture into seven viewpoints; more than one can apply. I read this picture mainly as “') + esc(L(b.cat, b.cate)) + L('」に当てはまります。', '”. ') + (catDef(b.cat) ? esc(L(catDef(b.cat)[2], catDef(b.cat)[3])) : '') + '</p><ul class="gm-cats">' +
            CATS.map(function(c){ return '<li' + (c[0] === b.cat ? ' class="on"' : '') + '><b>' + esc(L(c[0], c[1])) + '</b><span>' + esc(L(c[2], c[3])) + '</span></li>'; }).join('') + '</ul></div>';   /* 絵の時代背景と特徴、分析カテゴリの説明（押すと開く） */
      }
      if(!introOn) body += sec(L('四本の線の役割', 'What the four lines mean')) + '<div class="gm-catx gm-secx" hidden><ul class="gm-info-l">' +
        LINES.map(function(t){ return '<li>' + pict(t.k) + '<b>' + esc(L(t.n + '（' + t.dir + '）', t.ne + ' (' + t.dire + ')')) + '</b><span>' + esc(L(t.h, t.he)) + '</span></li>'; }).join('') + '</ul></div>' +
        sec(L('測らない三本', 'The three lines you do not draw')) + '<div class="gm-catx gm-secx" hidden><p class="gm-info-t">' + L('研究の骨格は七本です。この遊びでは上の四本を測り、残る三本は研究の平均値で補います。三本は主塊ではなく、描き込みの密度が変わる所や脇の要素の境で決まり、絵ごとの差が小さいからです。平均の画面では薄い破線で重なります。', 'The research grid has seven lines. In this game you draw the four above; the other three are supplied from the research averages. They depend on where the drawing thins out or where side elements end, not on the main mass, and they vary little between pictures. On the average screen they appear as faint dashed lines.') + '</p>' +
        '<ul class="gm-info-l gm-three"><li><b>X2</b><span>' + L('密度転換線　左から 28％', 'density shift · 28% from the left') + '</span></li><li><b>Y3</b><span>' + L('密度転換線　上から 71％', 'density shift · 71% from the top') + '</span></li><li><b>X4</b><span>' + L('副次要素境界線　左から 83％', 'secondary boundary · 83% from the left') + '</span></li></ul>' +
        '</div>' + sec(L('遊び方', 'How to play')) + '<div class="gm-catx gm-secx" hidden><p class="gm-info-t">' + L('絵を押して、そのまま動かします。離したところに線が引かれます。一本ごとに、私が同じ絵に引いた線を破線で重ね、二本の差を％で示します。三枚を測ると、四本の線を平均したあなたのグリッドができます。', 'Drag on the picture, then release to place a line. After each line, mine appears dashed with the difference in %. After three pictures, your four lines are averaged into your grid.') + '</p></div>';
      infoEl.querySelector('.gm-info-b').innerHTML = body; infoEl.querySelector('.gm-take-b button').textContent = L('閉じる', 'Close');
      var iin = infoEl.querySelector('.gm-info-in');
      infoEl.querySelectorAll('.gm-catq').forEach(function(q){ var x = q.nextElementSibling; if(!x || !x.classList.contains('gm-catx')) return;
        q.addEventListener('click', function(){ var on = x.hidden; x.hidden = !on; q.setAttribute('aria-expanded', on ? 'true' : 'false'); if(on && !rm) setTimeout(function(){ var top = q.offsetTop - 12; if(top > iin.scrollTop) iin.scrollTo({top: Math.min(top, q.offsetTop + x.offsetHeight - iin.clientHeight + 24 > top ? top : top), behavior:'smooth'}); }, 40); }); });
      var cq = infoEl.querySelector('.gm-catq:not(.gm-secq)'), cx = cq && cq.nextElementSibling;
      if(infoWantCat && cq && cx){ cx.hidden = false; cq.setAttribute('aria-expanded', 'true'); setTimeout(function(){ iin.scrollTo({top: Math.max(0, cq.offsetTop - 12), behavior: rm ? 'auto' : 'smooth'}); }, 260); }
      document.documentElement.classList.add('gminfo');   /* v438: 札を開いている間は幕を見出し行の上まで（本編の帯だけ明るいままだった：本人） */
      void infoEl.offsetWidth; infoEl.classList.add('on'); gm.querySelector('.gm-i').setAttribute('aria-expanded', 'true');   /* 作った直後でも出現の動き（薄→濃、下から 8px）が付くように一度描かせる */ var wc = infoWantCat; infoWantCat = false; setTimeout(function(){ if(!wc) infoEl.querySelector('.gm-take-b button').focus({preventScroll:true}); }, 240);
    }
    function infoOff(){ if(infoEl) infoEl.classList.remove('on'); var ib = gm && gm.querySelector('.gm-i'); if(ib){ ib.setAttribute('aria-expanded', 'false'); if(document.activeElement && document.activeElement !== ib && infoEl && infoEl.contains(document.activeElement)) ib.focus({preventScroll:true}); if(ptype === 'touch') ib.blur(); } } document.documentElement.classList.remove('gminfo');
    var takeEl = null, takeUrl = null;
    var takeFile = null;
    function takeaway(avg){
      var cs = getComputedStyle(document.documentElement), FM = (cs.getPropertyValue('--mincho') || 'serif').trim(), FS = (cs.getPropertyValue('--sans') || 'sans-serif').trim(), FO = (cs.getPropertyValue('--mono') || 'monospace').trim();
      var W = 1200, H = 675, cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H * 2; var c = cv.getContext('2d'); c.scale(2, 2);
      function rr(x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
      c.fillStyle = '#F2F1EC'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#1C1B19'; c.font = '900 40px ' + FM; c.textBaseline = 'alphabetic'; c.fillText(L('あなたの、ものさし', 'Your ruler'), 60, 92);
      c.fillStyle = '#E84518'; c.font = '500 12px ' + FO; c.fillText(L('絵を、測る。  ·  CHECKPOINT 06  ·  KOSAKA · PORTFOLIO', 'MEASURE THE PICTURE  ·  CHECKPOINT 06  ·  KOSAKA · PORTFOLIO'), 60, 120);
      /* 左：三枚の札とあなたの四本 */
      var x = 60, y = 170, hh = 150;
      picks.forEach(function(b, i){
        var im = trayEl.children[i] && trayEl.children[i].querySelector('img'), ar = +b.ar || 1, w = Math.min(hh * ar, 260), h = w / ar; if(h > hh){ h = hh; w = h * ar; }
        c.save(); rr(x, y, w, h, 4); c.clip();
        if(im && im.complete && im.naturalWidth){ try{ c.drawImage(im, x, y, w, h); }catch(e){} } else { c.fillStyle = '#ECE8DF'; c.fillRect(x, y, w, h); }
        var r = res[i] || {}; c.strokeStyle = '#E84518'; c.lineWidth = 1.5;
        LINES.forEach(function(t){ var v = r[t.k]; if(v == null) return; c.beginPath(); if(t.ax === 'v'){ c.moveTo(x + w * v / 100, y); c.lineTo(x + w * v / 100, y + h); } else { c.moveTo(x, y + h * v / 100); c.lineTo(x + w, y + h * v / 100); } c.stroke(); });
        c.restore(); c.strokeStyle = 'rgba(30,28,26,.35)'; c.lineWidth = 1; rr(x + .5, y + .5, w - 1, h - 1, 4); c.stroke();
        c.fillStyle = '#E84518'; c.font = '500 11px ' + FO; c.fillText('ABC'[i], x, y - 8);
        c.fillStyle = '#5A5955'; c.font = '11px ' + FS; var lb = L(b.t, b.te); while(lb.length > 2 && c.measureText(lb).width > w - 14) lb = lb.slice(0, -1); c.fillText(lb === L(b.t, b.te) ? lb : lb.replace(/.$/, '…'), x + 16, y - 8);   /* 題は札の幅に収める */
        x += w + 26; if(x > 560){ x = 60; y += hh + 40; }
      });
      /* v386: 左の空きに、三枚の読みと一言。値だけでなく言葉が残る一枚に */
      var ty = y + hh + 52, obsEl = gm.querySelector('.gm-obs'), obs = obsEl ? obsEl.textContent.trim() : '', enT = L('a', 'b') === 'b'; if(!enT) obs = obs.replace(/私/g, '研究');   /* 保存画像は単体で読まれるので「私」は「研究」に（Sol 第 15） */
      c.fillStyle = '#5A5955'; c.font = '11px ' + FS;
      c.fillText(picks.map(function(b, i){ return 'ABC'[i] + '  ' + (enT ? (b.cate || b.cat || '') : (b.cat || '')); }).join(enT ? '   /   ' : '   ／   '), 60, ty);
      (function(){ var tl = picks.map(function(b, i){ return 'ABC'[i] + '  ' + L(b.t, b.te); }), sep2 = enT ? '   /   ' : '   ／   ', one = tl.join(sep2); c.fillStyle = '#8E8B84'; c.font = '10.5px ' + FS; if(c.measureText(one).width <= 560) c.fillText(one, 60, ty + 16); else { tl.forEach(function(t2, i2){ c.fillText(t2, 60, ty + 16 + i2 * 14); }); ty += (tl.length - 1) * 14; } })();   /* v418: 題は切らずに一行で（細部係：B・C が「…」で切れていた） */
      if(obs){
        c.fillStyle = '#1C1B19'; c.font = '700 15px ' + FM; var toks = enT ? obs.split(' ') : obs.split(''), line = '', ly = ty + 52, n = 0, maxL = ty > 420 ? 2 : 4, sep = enT ? ' ' : '';
        for(var ci = 0; ci < toks.length && n < maxL; ci++){ var tk = toks[ci], cand = line ? line + sep + tk : tk; if(c.measureText(cand).width > 520 && line){ c.fillText(line, 60, ly); line = tk; ly += 26; n++; } else line = cand; }
        if(line && n < maxL) c.fillText(line, 60, ly);
      }
      /* 右：平均グリッド（あなたの 4 本＋研究の 3 本） */
      var gx = 640, gy = 170, gw = 480, gh = 300;
      c.fillStyle = '#FBFAF6'; rr(gx, gy, gw, gh, 6); c.fill(); c.strokeStyle = '#E1BD2B'; c.lineWidth = 1.5; rr(gx, gy, gw, gh, 6); c.stroke();
      c.save(); rr(gx, gy, gw, gh, 6); c.clip();
      c.setLineDash([4, 4]); c.strokeStyle = 'rgba(46,44,41,.5)'; c.lineWidth = 1;
      FIXED.v.forEach(function(v){ c.beginPath(); c.moveTo(gx + gw * v / 100, gy); c.lineTo(gx + gw * v / 100, gy + gh); c.stroke(); });
      FIXED.h.forEach(function(v){ c.beginPath(); c.moveTo(gx, gy + gh * v / 100); c.lineTo(gx + gw, gy + gh * v / 100); c.stroke(); });
      c.setLineDash([]); c.strokeStyle = '#E84518'; c.lineWidth = 2; c.fillStyle = '#E84518'; c.font = '500 11px ' + FO;
      LINES.forEach(function(t){ var v = avg[t.k]; c.beginPath(); if(t.ax === 'v'){ c.moveTo(gx + gw * v / 100, gy); c.lineTo(gx + gw * v / 100, gy + gh); c.stroke(); c.fillText(v + '%', gx + gw * v / 100 + 4, gy + 14); } else { c.moveTo(gx, gy + gh * v / 100); c.lineTo(gx + gw, gy + gh * v / 100); c.stroke(); c.fillText(v + '%', gx + 4, gy + gh * v / 100 - 5); } });
      c.restore();
      c.fillStyle = '#1C1B19'; c.font = '700 15px ' + FS; c.fillText(L('あなた', 'you') + '　X ' + avg.x1 + ' · 28 · ' + avg.x3 + ' · 83%　／　Y ' + avg.y1 + ' · ' + avg.y2 + ' · 71%', gx, gy + gh + 34);
      c.fillStyle = '#5A5955'; c.font = '13px ' + FS; c.fillText(L('研究', 'research') + '　X 12 · 28 · 58 · 83%　／　Y 14 · 32 · 71%　（' + L('破線', 'dashed') + '）', gx, gy + gh + 58);
      c.fillStyle = '#8E8B84'; c.font = '11px ' + FO; var d = new Date(); c.fillText(d.getFullYear() + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2) + '  ·  ' + L('絵の幅と高さを 100 とした％', 'percent of the outline as 100'), gx, gy + gh + 82);
      /* 判（静止） */
      var sx = 1040, sy = 560, ss = 72; c.save(); c.translate(sx + ss / 2, sy + ss / 2); c.rotate(-9 * Math.PI / 180); c.translate(-ss / 2, -ss / 2);
      c.strokeStyle = '#E84518'; c.lineWidth = 2.2; c.strokeRect(0, 0, ss, ss); c.lineWidth = .8; c.strokeRect(6, 6, ss - 12, ss - 12);
      c.fillStyle = '#E84518'; c.font = '500 6px ' + FO; c.textAlign = 'center'; c.fillText('YOUR GRID', ss / 2, 20); c.font = '700 20px ' + FS; c.fillText('平均', ss / 2, 46); c.font = '4px ' + FO; c.fillText('KOSAKA · PORTFOLIO', ss / 2, 60); c.restore(); c.textAlign = 'start';
      if(!takeEl){
        takeEl = el('div', 'gm-take'); takeEl.setAttribute('role', 'dialog'); takeEl.setAttribute('aria-label', L('あなたのものさし', 'Your ruler'));
        takeEl.innerHTML = '<div class="gm-take-in"><div class="gm-take-h"><b></b><em></em></div><img alt=""><p></p><div class="gm-take-b"><a class="gm-b go" download="monosashi.png"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 12.5h11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></a><button type="button" class="gm-b gm-share" hidden><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 10V2M5 4.5 8 1.5l3 3M3.5 7.5v6h9v-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button type="button" class="gm-b gm-take-x"></button></div></div>';
        takeEl.querySelector('.gm-take-x').addEventListener('click', takeOff); takeEl.querySelector('.gm-share').addEventListener('click', function(){ if(!takeFile || !navigator.share) return; navigator.share({files:[takeFile], title:L('あなたの、ものさし', 'Your ruler')}).catch(function(){}); });   /* v386: 共有（AirDrop・LINE など。共有できる環境でだけ出る） */ takeEl.addEventListener('click', function(e){ if(e.target === takeEl) takeOff(); });
        gm.appendChild(takeEl);
      }
      var im = takeEl.querySelector('img'), a = takeEl.querySelector('a');
      takeEl.querySelector('p').textContent = L('三枚の解釈と平均のグリッド、それに一言を、一枚の画像にしました。保存して、手元のものさしに。', 'Your three readings, the average grid and a note, on one image. Save it and keep the ruler with you.');
      var ymd = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      a.querySelector('span').textContent = L('画像を保存', 'Save image'); a.download = 'monosashi-' + ymd + '.png';
      var sb0 = takeEl.querySelector('.gm-share'); sb0.setAttribute('aria-label', L('共有', 'Share')); sb0.title = L('共有（AirDrop・LINE など）', 'Share (AirDrop, LINE and more)'); takeEl.querySelector('.gm-take-x').textContent = L('閉じる', 'Close');
      takeEl.querySelector('.gm-take-h b').textContent = L('あなたの、ものさし。', 'Your ruler.'); takeEl.querySelector('.gm-take-h em').textContent = 'YOUR RULER  ·  ' + ymd.replace(/-/g, '.');
      function put(url){ if(takeUrl && takeUrl.indexOf('blob:') === 0) URL.revokeObjectURL(takeUrl); takeUrl = url; im.onload = function(){ im.onload = null; takeFly(); }; im.src = url; a.href = url; takeEl.classList.add('on'); }
      function share(bl){ var sb = takeEl.querySelector('.gm-share'); takeFile = null; try{ if(bl && window.File && navigator.canShare){ var f = new File([bl], 'monosashi-' + ymd + '.png', {type:'image/png'}); if(navigator.canShare({files:[f]})) takeFile = f; } }catch(e){} sb.hidden = !takeFile;
        if(takeFile) takeEl.querySelector('p').textContent += L(' 丸いボタンから、AirDrop などでも送れます。', ' The round button shares it, by AirDrop and more.'); }
      /* v387: 平均のグリッドが保存画像の中へ縮んで収まってから、プリントが下から出る（Sol 第 15：平均→保存がいちばん唐突になり得る） */
      function takeFly(){
        if(rm || !stage || !window.Animation) return;
        var sr = stage.getBoundingClientRect(), tr = takeEl.getBoundingClientRect(); if(!sr.width || !im.offsetWidth) return;
        var ir = {left: tr.left + im.offsetLeft, top: tr.top + im.offsetTop, width: im.offsetWidth, height: im.offsetHeight};   /* 札はまだ動いている最中なので、変形の影響を受けない offset で最終位置を出す */
        var tx = ir.left + ir.width * .533, ty = ir.top + ir.height * .252, tw = ir.width * .4, th = ir.height * .444;
        var g = el('div', 'gm-fly'); g.style.cssText = 'left:' + sr.left + 'px;top:' + sr.top + 'px;width:' + sr.width + 'px;height:' + sr.height + 'px';
        LINES.forEach(function(t){ var v = avg[t.k]; if(v == null) return; var i = el('i', t.ax); i.style[t.ax === 'v' ? 'left' : 'top'] = v + '%'; g.appendChild(i); });
        document.body.appendChild(g);
        try{ var an = g.animate([{transform:'none', opacity:1}, {transform:'translate(' + (tx - sr.left).toFixed(1) + 'px,' + (ty - sr.top).toFixed(1) + 'px) scale(' + (tw / sr.width).toFixed(4) + ',' + (th / sr.height).toFixed(4) + ')', opacity:.2}], {duration:560, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'}); an.onfinish = function(){ if(g.parentNode) g.remove(); }; }catch(e){ g.remove(); }
        setTimeout(function(){ if(g.parentNode) g.remove(); }, 1000);
      }
      if(cv.toBlob) cv.toBlob(function(bl){ share(bl); put(bl ? URL.createObjectURL(bl) : cv.toDataURL('image/png')); }, 'image/png'); else { share(null); put(cv.toDataURL('image/png')); }
      setTimeout(function(){ var b = takeEl.querySelector('a'); if(b) b.focus({preventScroll:true}); }, 260);
    }
    function takeOff(){ if(takeEl) takeEl.classList.remove('on'); }
    var sheetAvg = null;
    function sheet(avg){
      sheetAvg = avg;
      var sgd = sheetEl.querySelector('.gm-sgrid'); sgd.innerHTML = '';
      GRID.v.forEach(function(v){ mkLine(sgd, 'v', v, 'mine', v + '%'); }); GRID.h.forEach(function(v){ mkLine(sgd, 'h', v, 'mine', v + '%'); });
      LINES.forEach(function(t){ mkLine(sgd, t.ax, avg[t.k], 'you big', avg[t.k] + '%'); });
      FIXED.v.forEach(function(v){ mkLine(sgd, 'v', v, 'fixed', v + '%'); }); FIXED.h.forEach(function(v){ mkLine(sgd, 'h', v, 'fixed', v + '%'); });
      sheetEl.querySelector('.gm-mk1').innerHTML = mix('絵を、測る。', 'Measure the composition.', '測る');
      sheetEl.querySelector('.gm-scap b').innerHTML = mix('あなたの、ものさし', 'Your ruler', 'ものさし');
      var wx = [avg.x1, 28 - avg.x1, avg.x3 - 28, 83 - avg.x3, 17], wy = [avg.y1, avg.y2 - avg.y1, 71 - avg.y2, 29];
      sheetEl.style.setProperty('--sx1', avg.x1 + '%');   /* v394: 注記は X1（あなたの主塊開始線）から、Y3（71％）の下の帯に置く */
      sheetEl.querySelector('.gm-scap span').innerHTML = '<em>' + L('あなた', 'you') + '</em> X ' + avg.x1 + ' · 28 · ' + avg.x3 + ' · 83　Y ' + avg.y1 + ' · ' + avg.y2 + ' · 71<br><em>' + L('研究', 'research') + '</em> X 12 · 28 · 58 · 83　Y 14 · 32 · 71';
      sheetEl.querySelector('.gm-scap small').textContent = L('朱があなたの四本、薄い破線が研究の三本。見出しは開始線の交点に置きます。本文は重心線から始め、図版は二本のあいだに収めます。切り替えると、同じ内容が別の骨格に乗ります。', 'The title sits at the crossing of the start lines. The text starts from the centroid lines, and the figure fits between. Switch, and the same content sits on another grid.');
      sheetGrid('you');
      var mock = sheetEl.querySelector('.gm-mock'); mock.classList.remove('land'); void mock.offsetWidth;
      gm.classList.add('sheeton'); sheetEl.setAttribute('aria-hidden', 'false'); try{ sheetEl.inert = false; }catch(x){}
      setTimeout(function(){ mock.classList.add('land'); }, rm ? 0 : 360);   /* 見出し→図版→本文が線へ着地する（合計 500ms） */
      setTimeout(function(){ if(gm.classList.contains('sheeton')){ seal('APPLIED', '適用', sheetEl, 'corner'); cring(L('画面いっぱいに表示 \u00b7 APPLIED \u00b7 ', 'VIEW GRID FULL SCREEN \u00b7 APPLIED \u00b7 ')); } }, rm ? 100 : 560);
      setTimeout(function(){ sheetEl.querySelector('.gm-sx').focus({preventScroll:true}); }, 240);
    }
    /* 紙面の内容（見出し・図版・本文）を、あなたの骨格か研究の骨格に載せる。位置は CSS 変数で渡し、切り替えは transition */
    function sheetGrid(which){
      var g = which === 'mine' ? {y1:14, x1:12, y2:32, x3:58} : sheetAvg; if(!g) return;
      var m = sheetEl.querySelector('.gm-mock');
      m.style.setProperty('--gx1', g.x1 + '%'); m.style.setProperty('--gy1', g.y1 + '%'); m.style.setProperty('--gx3', g.x3 + '%'); m.style.setProperty('--gy2', g.y2 + '%');
      m.classList.toggle('nofig', g.x3 - g.x1 < 8 || 71 - g.y2 < 6); m.classList.toggle('notxt', 83 - g.x3 < 8);
      sheetEl.querySelectorAll('.gm-swk button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-g') === which ? 'true' : 'false'); });
      sheetEl.classList.toggle('mineg', which === 'mine');
    }
    function sheetOff(){ sealOff(true); gm.classList.remove('sheeton'); takeOff(); sheetEl.setAttribute('aria-hidden', 'true'); try{ sheetEl.inert = true; }catch(x){} }
    /* JA/EN が切り替わったら、見えている文を組み直す（案内・題・手番の欄） */
    function relang(){
      if(!gm || gm.hidden) return;
      gm.querySelector('.gm-ttl').innerHTML = mix('絵を、測る。', 'Measure the composition.', '測る');
      gm.querySelector('.gm-sub').textContent = '';
      gm.querySelector('.gm-sx').textContent = L('戻る', 'Back'); var gi0 = gm.querySelector('.gm-i'); if(gi0) gi0.textContent = L('遊び方', 'How to play');
      ['.gm-ix', '.gm-x'].forEach(function(sel){ var e = gm.querySelector(sel); if(e) e.setAttribute('aria-label', L('閉じる', 'Close')); });
      if(typeof qaBuild === 'function') qaBuild();   /* v444: × の読み上げ名と Q&A も言語に合わせる（確認係） */   /* v400: 右の列の ? と見分けがつくよう文字で */
      axlText(); tbLabel();   /* 目盛りの向きの語と回すボタンの名も言語に合わせる */
      var sw = sheetEl.querySelectorAll('.gm-swk button'); sw[0].textContent = L('あなたの骨格', 'your grid'); sw[1].textContent = L('研究の骨格', 'research grid');
      if(introOn){
        introEl.querySelectorAll('.gm-isec').forEach(function(d, i){ d.innerHTML = isecHTML(ISECS[i]); bindChoice(d); });
        introEl.querySelector('.gm-iskip').textContent = L('スキップ', 'Skip'); introEl.querySelector('.gm-ihow').textContent = L('遊び方', 'How to play'); introScroll(); ibgW = ''; ibgBuild(); introBg();
      } else if(state === 'trace'){ turn(); }
      if(!introOn && state !== 'avg' && state !== 'idle' && !cardEl.hidden){ cardRender(bi); listBuild(); listState(); }   /* v409: 札と一覧も言語に合わせる（想定外係 #2） */
      if(state === 'trace' || state === 'compare') stepEl.innerHTML = '<span>' + esc('ABC'[bi] + ' · ' + L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + ti + 1) + '</span>';
      if(state === 'compare'){ var t2 = LINES[ti], b2 = picks[bi], p2 = res[bi][t2.k], a2 = b2.a[t2.k]; cmpRender(t2, b2, p2, a2, p2 - a2); mode(L('比べる', 'compare')); }
      else if(state === 'done'){ stepEl.innerHTML = '<span>' + esc('ABC'[bi] + ' · ' + L(ORD[bi], ORDE[bi])) + '</span><span class="gm-cnt">' + cnt(bi * 4 + 4) + '</span>'; doneRender(); mode(L('測り終わり', 'measured')); }
      else if(state === 'avg' && lastAvg && goEl.classList.contains('on')){ avgRender(lastAvg.avg, lastAvg.kav, lastAvg.diff, lastAvg.per); var sv = resEl.querySelector('.gm-seven'); if(sv) sv.classList.add('on'); mode(L('平均', 'average')); }
    }
    if(window.MutationObserver) new MutationObserver(relang).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    window.__gmOpen = open;
    /* 研究の手順 08「紙面へ、画面へ」に来たら、左下に「遊ぶ」の判が押される（遊びへの二つめの入り口） */
    (function(){
      var sp = document.getElementById('seqplay'); if(!sp || typeof kakuSvg !== 'function') return;
      var st = sp.querySelector('.st'); if(st && !st.firstChild) st.appendChild(kakuSvg('PLAY', '遊ぶ', 77));
      sp.addEventListener('click', function(){ open(); });
    })();
    /* #play=… で開いたときは、そのまま遊びを開く（面接用の入口） */
    if(/play=|^#game$/.test(location.hash || '')) setTimeout(function(){   /* オープニングが終わるのを待ってから開く（実機では開幕の演出が走っている） */
      var n = 0, t = setInterval(function(){ if(document.body.classList.contains('opening') && ++n < 200) return; clearInterval(t); if(n < 200) open(); }, 250);
    }, 1200);
  })();
})();
  /* v437: 08 の「ゲームで、理解を深める」は、右の段階の並びの下（CLICK の注記の下）へ移す（本人）。押すと判と同じく遊びが開く */
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

/* dist: the works frames' photos load after the page is up (their <image> hrefs wait in data-lzhref).
   WebKit does not rebuild a <use> when the element it points at changes, so every frame stayed empty on
   iPhone and iPad — after the hrefs are in, each <use> is replaced by a copy of itself to force it. */
window.addEventListener('load', function(){ setTimeout(function(){
  document.querySelectorAll('image[data-lzhref]').forEach(function(el){ el.setAttribute('href', el.getAttribute('data-lzhref')); el.removeAttribute('data-lzhref'); });
  document.querySelectorAll('use').forEach(function(u){ var h = u.getAttribute('href') || '';
    if(h.indexOf('#wkp_') === 0 && u.parentNode) u.parentNode.replaceChild(u.cloneNode(true), u); });
}, 600); });
