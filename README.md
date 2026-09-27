# esratasdemiroglu.com — statik site (GitHub Pages)

Şu an **test.esratasdemiroglu.com** üzerinde yayında olacak şekilde ayarlıdır.

## Dosyalar
- `index.html`, `hakkimda.html`, `teknikler.html`, `iletisim.html` — sayfalar
  (GitHub Pages bunları `/`, `/hakkimda`, `/teknikler`, `/iletisim` adresleriyle açar; eski Google Sites adresleriyle birebir aynı)
- `style.css`, `script.js` — tasarım ve etkileşimler
- `404.html` — bulunamayan sayfalar
- `sitemap.xml`, `robots.txt` — Google Search Console için (canlı alan adına göre hazır)
- `CNAME` — GitHub Pages özel alan adı
- `.nojekyll` — GitHub'ın dosyaları olduğu gibi yayınlaması için

## Bilgisayarda önizleme
`index.html`'e çift tıklamanız yeterli; bağlantılar dosya modunda otomatik `.html`'e çevrilir.
Sunucu gibi denemek isterseniz klasörde: `npx serve .`

## Test ortamı → canlıya geçiş (www.esratasdemiroglu.com)
Test sitesi, ana siteyle "kopya içerik" sayılmasın diye arama motorlarına kapalıdır.
Canlıya geçerken:
1. Tüm `.html` dosyalarındaki (404 hariç)
   `<meta name="robots" content="noindex, nofollow">` satırını
   `<meta name="robots" content="index, follow, max-image-preview:large">` yapın
   ve üstündeki `<!-- TEST ORTAMI ... -->` yorum satırını silin.
2. `CNAME` dosyasının içeriğini `www.esratasdemiroglu.com` yapın.
3. Cloudflare'de `www` kaydını GitHub Pages'e yönlendirin (Google Sites kaydının yerine).
4. Search Console'da `https://www.esratasdemiroglu.com/sitemap.xml` gönderin.

Sayfa eklerseniz `sitemap.xml` içine yeni bir `<url>` bloğu ekleyin.
