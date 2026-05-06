# 🚀 Deploy ke GitHub + Cloudflare Pages

Tutorial lengkap dari nol sampai project-mu online dengan URL `https://elib-usg.pages.dev` (atau custom domain kalau punya).

---

## 📋 Persiapan

Pastikan kamu punya:

- [ ] Akun **GitHub** ([github.com](https://github.com)) — gratis
- [ ] Akun **Cloudflare** ([dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)) — gratis
- [ ] **Git** terinstall di komputer ([git-scm.com/downloads](https://git-scm.com/downloads))

Cek apakah Git udah terinstall:

```bash
git --version
```

Kalau muncul versi (misal `git version 2.43.0`), berarti udah ada. Kalau belum, install dulu.

---

## STEP 1 — Setup Git Lokal (Sekali Saja)

Kalau ini pertama kali pakai Git, set identitas dulu. Buka terminal/CMD di folder `elib-usg`:

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

---

## STEP 2 — Init Repository di Folder Project

Buka terminal di folder `elib-usg` (di VS Code: Terminal → New Terminal):

```bash
git init
git branch -M main
```

Bikin file `.gitignore` biar file yang nggak perlu nggak ke-upload:

```bash
# Windows: ketik di terminal
echo .DS_Store > .gitignore
echo Thumbs.db >> .gitignore
echo node_modules/ >> .gitignore
```

Atau bikin file `.gitignore` manual lewat VS Code dengan isi:

```
.DS_Store
Thumbs.db
node_modules/
*.log
```

Lalu commit semua file:

```bash
git add .
git commit -m "Initial commit: Portal USG Library"
```

---

## STEP 3 — Bikin Repository di GitHub

1. Buka [github.com/new](https://github.com/new)
2. Isi:
   - **Repository name**: `elib-usg` (atau nama lain bebas)
   - **Description**: `Portal Layanan Perpustakaan USG`
   - **Public** ✅ (biar Cloudflare bisa akses, atau Private juga bisa nanti)
   - ❌ **JANGAN centang** "Add a README file" (kita udah punya)
   - ❌ **JANGAN centang** "Add .gitignore" (kita udah bikin)
3. Klik **Create repository**

---

## STEP 4 — Push ke GitHub

GitHub bakal kasih instruksi setelah create repo. Copy-paste 3 baris ini di terminal (ganti URL sesuai punyamu):

```bash
git remote add origin https://github.com/USERNAME/elib-usg.git
git branch -M main
git push -u origin main
```

GitHub bakal minta login. Pakai **Personal Access Token**, bukan password biasa:

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token (classic)**
3. Note: `git-cli`, Expiration: `90 days`, scope: centang `repo`
4. **Generate token** → copy token-nya (cuma muncul sekali!)
5. Pas terminal minta password, paste token ini

Kalau berhasil, refresh halaman GitHub — file-file kamu udah muncul. 🎉

---

## STEP 5 — Connect ke Cloudflare Pages

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sidebar kiri → **Compute (Workers)** → **Workers & Pages**
3. Klik **Create application** → tab **Pages** → **Connect to Git**
4. Klik **Connect GitHub** → authorize Cloudflare
5. Pilih repository **elib-usg** → **Begin setup**

### Konfigurasi Build

Karena project kita HTML statis tanpa build process, isinya:

- **Project name**: `elib-usg` _(ini nanti jadi URL: elib-usg.pages.dev)_
- **Production branch**: `main`
- **Framework preset**: `None`
- **Build command**: _(kosongkan)_
- **Build output directory**: `/`

Klik **Save and Deploy**.

Tunggu 30-60 detik. Cloudflare bakal build & deploy. Kalau berhasil, kamu dapat URL:

```
https://elib-usg.pages.dev
```

**Share URL ini ke client!** 🎊

---

## STEP 6 — Update Project Setelah Deploy

Setiap kali kamu edit kode dan mau update yang online:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

Cloudflare otomatis re-deploy dalam ~30 detik. Refresh URL, perubahan udah live.

---

## 🌐 Custom Domain (Opsional)

Kalau punya domain sendiri (misal `elib.zandev.com`):

1. Di Cloudflare Pages dashboard → tab **Custom domains**
2. **Set up a custom domain** → masukkan domain
3. Ikuti instruksi DNS-nya (kalau domain udah di Cloudflare, otomatis)

---

## 🐛 Troubleshooting

### "git push" minta password terus-terusan

Pakai **Personal Access Token** (lihat Step 4), bukan password GitHub biasa.

### Cloudflare deploy gagal "build failed"

Pastiin **Build command** kosong dan **Build output directory** = `/` (slash). Project ini statis, nggak butuh build.

### Halaman tampil kosong di Cloudflare

Buka DevTools (F12) → Console. Kalau ada error 404 untuk `style.css` atau `script.js`, kemungkinan path-nya case-sensitive. Pastiin nama file di kode (`style.css`) sama persis dengan nama file di folder (jangan `Style.css`).

### Logo / favicon nggak muncul di production

Cek path: harus `assets/zandev-logo-footer.png`, BUKAN `/assets/...` atau `./assets/...`. Cloudflare strict soal ini.

---

## ✅ Checklist Final Sebelum Kirim ke Client

- [ ] URL Cloudflare bisa diakses
- [ ] Layout normal di desktop (browser pelebar 1280px+)
- [ ] Layout normal di mobile (browser pelebar < 640px)
- [ ] Live clock jam-nya update
- [ ] Counter total koleksi animate dari 0 ke 25.348
- [ ] Status "Buka/Tutup" sesuai jam saat ini
- [ ] Search bar ngarah ke OPAC saat di-submit
- [ ] Logo ZanDev di footer clickable → buka WhatsApp
- [ ] Hover ke service cards keliatan ada animasi lift up
- [ ] Mini bar chart "Pengunjung" muncul

---

## 📞 Need Help?

Design × Code by [ZanDev](https://wa.me/628123536936)
