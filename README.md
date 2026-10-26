# PertussisCare — Website CBR (GitHub Pages)

Website statis tugas Sistem Pendukung Keputusan, adaptasi relasi jenis penyakit dan gejala Pertussis dari artikel Nofriansyah, Gunawan, & Elfitriani (2020). Menggunakan **Case-Based Reasoning (CBR)** dengan **Cosine Similarity tanpa bobot**. Tidak membutuhkan Python, Flask, SQLite, server, atau instalasi paket.

## Struktur proyek

```text
pertussis-cbr-pages/
├── index.html   # Beranda, form gejala, hasil, data kasus, referensi
├── style.css    # Tema navy, biru muda, putih; responsif
├── data.js      # 9 gejala, 3 kasus lama, kasus contoh K01
├── script.js    # Input, Cosine Similarity, ranking, detail hitung
└── README.md    # Panduan ini
```

## Menjalankan di laptop

Buka `index.html` dengan browser (Chrome/Edge), atau gunakan ekstensi Live Server di VS Code. Internet hanya dibutuhkan untuk font Google; tanpa internet tetap dapat digunakan dengan font cadangan.

## Cara uji sesuai pengerjaan manual

1. Klik **Isi Contoh K01** di bagian Diagnosis.
2. Terpilih G3, G4, G5, G8, atau vektor `(0,0,1,1,1,0,0,1,0)`.
3. Klik **Hitung Similarity**.
4. Hasil: P01 = **50%**, P02 = **75%**, P03 = **50%**.
5. Buka bagian **Rincian perhitungan manual** untuk melihat dot product dan panjang vektor.

Rumus: `cos(A,B) = dot(A,B) / (sqrt(sum(A_i²)) × sqrt(sum(B_i²)))`. Jika tak ada gejala dipilih, tombol hitung nonaktif; ini menghindari pembagian dengan nol. Pilihan gejala lainnya juga dihitung dinamis.

## Upload ke GitHub (tanpa terminal)

1. Masuk https://github.com/new dan buat repository **Public**, misalnya `pertussis-cbr`.
2. Klik **Add file → Upload files**. Upload `index.html`, `style.css`, `data.js`, `script.js`, `README.md` **di root repository** (jangan mengunggah ZIP saja).
3. Klik **Commit changes**.
4. Buka **Settings → Pages → Build and deployment**. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
5. Setelah GitHub Pages selesai membangun situs, buka alamat yang ditampilkan di Settings → Pages. Biasanya berbentuk `https://USERNAME.github.io/pertussis-cbr/` (ganti USERNAME dengan username GitHub sendiri).

## Upload menggunakan terminal (opsional)

Buka terminal di folder yang berisi `index.html`, lalu jalankan:

```bash
git init
git add .
git commit -m "Website CBR Pertussis tanpa bobot"
git branch -M main
git remote add origin https://github.com/USERNAME/pertussis-cbr.git
git push -u origin main
```

Buat repository kosong di GitHub terlebih dahulu dan ganti `USERNAME` dengan username GitHub. Setelah push, aktifkan Pages seperti langkah 4 di atas.

## Catatan sumber dan batasan

Artikel: Dicky Nofriansyah, Rudi Gunawan, Elfitriani. (2020). *Sistem Pakar Untuk Mendiagnosa Penyakit Pertussis (Batuk Rejan) Dengan Menggunakan Metode Teorema Bayes*. J-SISKO TECH, 3(1), 41–54. Artikel asli memakai **Teorema Bayes** dan juga memuat data riwayat pasien. Proyek latihan ini memakai **tiga pola ringkasan penyakit-gejala dari Tabel 1** sebagai kasus lama, **bukan** mengklaim memakai semua riwayat pasien atau bobot probabilitas Tabel 4. K01 adalah kasus simulasi yang dibuat untuk tugas.

**Bukan alat diagnosis medis.** Skor similarity hanya ukuran kesamaan vektor pada basis kasus sederhana ini, bukan peluang seseorang mengidap penyakit.
