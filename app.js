// موبایل: پیش‌نمایش تصویر
(function mountMobilePreview(){
  const mq = window.matchMedia('(max-width: 991px)');
  const formCol = document.querySelector('.form-col');
  const template = document.getElementById('mobile-card-template');

  function apply(){
    if (mq.matches && !document.querySelector('.mobile-preview')) {
      const clone = template.content.cloneNode(true);
      formCol.insertBefore(clone, formCol.firstChild);
    }
    if (!mq.matches) {
      const mp = document.querySelector('.mobile-preview');
      if (mp) mp.remove();
    }
  }
  apply();
  mq.addEventListener('change', apply);
})();

// اعتبارسنجی شماره تلفن و ارسال فرم
(function handleForm(){
  const form = document.getElementById('loginForm');
  const phoneInput = document.getElementById('phone');
  const phoneErr = phoneInput.parentElement.querySelector('.error');
  const submitBtn = document.getElementById('submitBtn');

  function normalizeNumber(val){
    // حذف فاصله و خط و پرانتز
    let t = val.replace(/[\s\-\(\)]/g,'');
    // اگر با 0 شروع میشه و صد و نود و هشت نیست، نگه دار
    // تبدیل +98 به 0 و بالعکس برای بررسی
    if (t.startsWith('+98')) t = '0' + t.slice(3);
    return t;
  }

  function isValidIranianMobile(val){
    const t = normalizeNumber(val);
    // استاندارد ساده: باید 11 رقم و با 09 شروع کنه
    return /^09\d{9}$/.test(t);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const val = phoneInput.value.trim();
    let ok = true;

    if (!val){
      phoneErr.textContent = 'شماره تلفن را وارد کنید.';
      ok = false;
    } else if (!isValidIranianMobile(val)){
      phoneErr.textContent = 'شماره معتبر نیست. فرمت مانند 0912xxxxxxxx یا +98912xxxxxxxx وارد کنید.';
      ok = false;
    } else {
      phoneErr.textContent = '';
    }

    if (ok){
      // شبیه‌سازی ارسال کد؛ اینجا باید به سرور یا سرویس پیامک وصل کنی.
      submitBtn.disabled = true;
      submitBtn.textContent = 'در حال ثبت...';
      setTimeout(()=> {
        alert('شماره تلفن ' + normalizeNumber(val) + ' ثبت شد.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'ثبت شماره';
        form.reset();
      }, 900);
    }
  });
})();

// ===== نمایش ویدیو در همان صفحه =====
window.addEventListener("load", () => {
  const panel = document.getElementById('videoPanel');
  const showBtn = document.getElementById('showVideoBtn');
  const closeBtn = document.getElementById('closeVideo');
  const video = document.getElementById('customerVideo');

  if (!panel || !showBtn || !closeBtn || !video) return;

  // نمایش پنل و پخش ویدیو
  showBtn.addEventListener('click', () => {
    panel.classList.remove('hidden');
    video.muted = false;
    setTimeout(() => {
      video.play().catch(()=>{});
    }, 250);
  });

  // بستن پنل (هم برای ضربدر، هم کلیک بیرون)
  function closePanel() {
    if (!panel.classList.contains('hidden')) {
      panel.classList.add('hidden');
      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
      }, 400);
    }
  }

  // کلیک روی ضربدر
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // نذاره حبابی بشه
    closePanel();
  });

  // کلیک بیرون از ویدیو
  panel.addEventListener('click', (e) => {
    // اگه روی زمینه (نه داخل ویدیو یا خودش) کلیک شد
    if (e.target === panel) {
      closePanel();
    }
  });

  // پخش مداوم ویدیو
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(()=>{});
  });
});


// ===== اسلایدر لوکس و نرم علائم کبد چرب =====
window.addEventListener("load", () => {
  const texts = [
    "خستگی و بی‌حالی همیشگی",
    "ریزش شدید موها، جوش‌ها و لک‌های پوستی",
    "ترش کردن و ریفلاکس گوارشی",
    "بزرگ شدن شکم و زردی روی زبان",
    "تعریق شدید سر و گردن",
    "طعم تلخ دهان هنگام صبح"
  ];

  const symptomText = document.getElementById("symptomText");
  let i = 0;

  function showNextText() {
    symptomText.classList.remove("show");
    setTimeout(() => {
      i = (i + 1) % texts.length;
      symptomText.textContent = texts[i];
      symptomText.classList.add("show");
    }, 1000); // مدت fade-out
  }

  // شروع
  symptomText.classList.add("show");
  setInterval(showNextText, 3000); // هر ۳ ثانیه جمله بعدی با افکت نرم
});
