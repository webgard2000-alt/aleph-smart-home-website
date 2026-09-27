# ALEPH SMART HOME Website

وب‌سایت رسمی الف اسمارت هوم | ALEPH SMART HOME

## نحوه راه‌اندازی

1. فایل‌های ویدیوی Hero را در پوشه `assets/videos/` قرار دهید:
   - hero-villa-1.mp4
   - hero-villa-2.mp4
   - hero-villa-3.mp4
   - hero-villa-4.mp4
   - hero-villa-5.mp4

2. توصیه می‌شود ویدیوها:
   - رزولوشن 1920x1080 یا کمتر برای وب
   - حجم هر کدام کمتر از ۵ مگابایت
   - فرمت MP4 (H.264)
   - مدت ۱۰ تا ۳۰ ثانیه
   - موضوع: ویلای لوکس مدرن، معماری معاصر، smart home

منابع رایگان پیشنهادی:
- Pexels.com (جستجو: modern luxury villa aerial)
- Pixabay.com
- Coverr.co

3. برای Poster تصویر:
   - assets/images/hero-poster.jpg (تصویر ثابت لوکس از معماری)

4. باز کردن index.html در مرورگر یا استفاده از سرور محلی:
   ```
   npx serve .
   ```
   یا
   ```
   python -m http.server 8000
   ```

## ساختار

- index.html : صفحه اصلی
- projects.html : لیست پروژه‌ها
- services.html : خدمات
- about.html : درباره الف
- contact.html : تماس
- assets/ : CSS, JS, تصاویر, ویدیوها

## نکات فنی

- کاملاً RTL و فارسی
- Responsive
- Hero Video با سیستم Loading واقعی بر اساس eventهای video
- انتخاب تصادفی ویدیو با جلوگیری از تکرار فوری (localStorage)
- Fallback به تصویر در صورت خطای ویدیو
- SEO کامل
- Accessibility پایه

طراحی شده بر اساس محتوای PDF رسمی شرکت الف اسمارت هوم.

## ویدیوهای Hero (نصب شده)

فایل‌های زیر در حال حاضر در پوشه `assets/videos/` قرار دارند:

- hero-villa-1.mp4 (~2.4MB)
- hero-villa-2.mp4 (~6.1MB)
- hero-villa-3.mp4 (~2.5MB)
- hero-villa-4.mp4 (~7.0MB)
- hero-villa-5.mp4 (~2.4MB)

این فایل‌ها از منابع رایگان Mixkit دانلود شده‌اند و برای دمو مناسب هستند.
برای تولید، ویدیوهای اختصاصی ویلای لوکس خود را جایگزین کنید.
