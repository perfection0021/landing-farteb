// ساده و آمادهٔ توسعه
function handleContact(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    const res = document.getElementById('formResult');
  
    // اینجا میتونی به API خودت POST بزنی
    // برای نمونه فقط یک پیام موفق نشان میدیم:
    res.style.color = '#9be7ff';
    res.textContent = `ممنون ${name} — پیام شما دریافت شد. (ایمیل: ${email})`;
  
    // پاک کردن فرم بعد از 2 ثانیه
    setTimeout(()=> {
      document.getElementById('contactForm').reset();
    }, 2000);
  }
  
  function resetForm(){
    document.getElementById('contactForm').reset();
  }

// تریگر دکمه شروع: پخش ویدیو + نمایش فرم
const startBtn = document.getElementById('startBtn');
const videoEl  = document.getElementById('bgVideo');
const overlay  = document.getElementById('overlayForm');
const closeBtn = document.querySelector('.overlay-close');
const phoneInp = document.getElementById('phoneInput');
const phoneMsg = document.getElementById('phoneMsg');
const submitPhone = document.getElementById('submitPhone');

// ✅ عناصر اصلی صفحه که باید ناپدید بشن
const nav    = document.querySelector('.nav');
const hero   = document.querySelector('.hero');
const footer = document.querySelector('.footer');

if (startBtn) {
  startBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // پنهان کردن همه‌چیز
    [nav, hero, footer].forEach(el => el.style.display = 'none');

    // نمایش و پخش ویدیو
    try {
      videoEl.style.display = 'block';
      document.body.classList.add('video-active');
      await videoEl.play();  // چون کلیک شده، با صدا پخش میشه
    } catch (err) {
      console.warn('ویدیو پخش نشد:', err);
    }

    // نمایش فرم
    overlay.style.display = 'flex';
    document.body.classList.add('no-scroll');
    phoneInp.focus();
  });
}


// بستن فرم
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.classList.remove('video-active');
    document.body.classList.remove('no-scroll');

    // بازگرداندن محتوا
    [nav, hero, footer].forEach(el => el.style.display = '');
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.style.display = 'none';
  });
}

// کلیک روی زمینه تیره برای بستن
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
    document.body.classList.remove('video-active');
    document.body.classList.remove('no-scroll');

    // بازگرداندن محتوا
    [nav, hero, footer].forEach(el => el.style.display = '');
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.style.display = 'none';
  }
});

// اعتبارسنجی ساده شماره
submitPhone?.addEventListener('click', () => {
  const val = (phoneInp.value || '').trim();
  const ok = /^09\d{9}$/.test(val);
  if (!ok) {
    phoneMsg.textContent = 'فرمت شماره صحیح نیست. مثال: 09123456789';
    phoneMsg.style.color = '#ef4444';
    phoneInp.focus();
    return;
  }
  phoneMsg.textContent = 'شماره ثبت شد ✔️';
  phoneMsg.style.color = '#22c55e';
});

// وقتی کاربر Enter بزنه روی input شماره
const phoneInput = document.getElementById("phoneInput");
const submitPhone1 = document.getElementById("submitPhone");

phoneInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // جلوگیری از رفرش یا رفتار پیش‌فرض
    submitPhone.click();    // دکمه "ادامه" رو شبیه‌سازی کن
  }
});

