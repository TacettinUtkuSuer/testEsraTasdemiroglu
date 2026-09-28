# esratasdemiroglu.com — statik site (GitHub Pages)

Canlıya geçiş için hazırlanmıştır: `CNAME` → `www.esratasdemiroglu.com`, sayfalar `index, follow` olarak işaretli.

## Dosyalar
- `index.html`, `hakkimda.html`, `teknikler.html`, `iletisim.html`, `blog.html` — sayfalar
  (GitHub Pages bunları `/`, `/hakkimda`, `/teknikler`, `/iletisim`, `/blog` adresleriyle açar)
- `blog/*.html` — blog yazıları (`/blog/<yazı-slug>` adresleriyle açılır)
- `style.css`, `script.js` — tasarım ve etkileşimler
- `404.html` — bulunamayan sayfalar
- `sitemap.xml`, `robots.txt` — Google Search Console için (canlı alan adına göre hazır)
- `CNAME` — GitHub Pages özel alan adı
- `.nojekyll` — GitHub'ın dosyaları olduğu gibi yayınlaması için

## Bilgisayarda önizleme
`index.html`'e çift tıklamanız yeterli; bağlantılar dosya modunda otomatik `.html`'e çevrilir.
Sunucu gibi denemek isterseniz klasörde: `npx serve .`

## Canlıya alırken kalan manuel adımlar
1. Cloudflare'de `www` kaydını GitHub Pages'e yönlendirin (Google Sites kaydının yerine).
2. Google Search Console'da mülkü doğrulayın ve `https://www.esratasdemiroglu.com/sitemap.xml` gönderin.
3. Google İşletme Profili (Google Business Profile) oluşturup/doğrulayıp adres, telefon ve çalışma saatlerini bu sitedekiyle birebir aynı tutun — yerel aramalarda üst sıralarda çıkmak için en etkili adım budur.
4. İsterseniz Google Analytics / Search Console doğrulama etiketini `<head>` içine ekleyin (bu depoda bir izleme kodu bulunmuyor).

Sayfa eklerseniz `sitemap.xml` içine yeni bir `<url>` bloğu ekleyin.
