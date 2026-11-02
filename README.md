<p align="center">
  <img src="assets/logo.png" alt="Logo Toko Buku Online" width="130">
</p>

<h1 align="center">Toko Buku Online</h1>

<p align="center">
  Aplikasi web sederhana untuk pemesanan buku, dibuat dengan HTML, CSS, dan JavaScript murni.<br>
  Tugas UTS Pemrograman Web 1
</p>

---

## Informasi Project

| | |
|---|---|
| Nama | Febryvia Deya Nuur  |
| NIM | 312510194 |
| Kelas | I251B |
| Program Studi | Teknik Informatika |
| Kampus | Universitas Pelita Bangsa |
| Mata Kuliah | Pemrograman Web 1 |
| Tema | Toko buku online (pemesanan buku ajar) |

## Link

| | |
|---|---|
| Repository GitHub | [isi link repository] |
| Video penjelasan (YouTube) | [isi link YouTube] |

## Tentang Project

Project ini adalah sisi front-end dari sebuah toko buku online. Semua data (akun pengguna, katalog buku, dan data pengiriman) tidak diambil dari server atau database, tetapi disimpan sebagai array dan object JavaScript di file `js/data.js`. Jadi aplikasinya bisa langsung dibuka di browser tanpa instalasi apa pun.

Yang dipelajari dan dipakai di tugas ini:

- **HTML**: struktur semantik (`header`, `nav`, `main`, `section`, `footer`), form, tabel, dan atribut aksesibilitas seperti `label`, `alt`, dan `aria-live`.
- **CSS**: external stylesheet, variabel warna (`:root`), flexbox dan grid, serta tampilan responsif untuk layar HP.
- **JavaScript**: manipulasi DOM, validasi form, event listener, `localStorage`, modal box, dan alert box.

## Fitur per Halaman

### 1. Login (`index.html`)

Halaman pertama saat aplikasi dibuka. Pengguna memasukkan email dan password.

- Kolom kosong akan menampilkan pesan error di bawah form.
- Email atau password yang tidak cocok dengan `dataPengguna` memunculkan **alert** "Email/password yang anda masukkan salah".
- Tombol **Lupa Password** dan **Daftar** membuka **modal box**. Di modal lupa password, email dicek formatnya lalu dicocokkan dengan data pengguna. Di modal daftar, nama minimal 3 karakter, email harus valid dan belum terdaftar, dan password minimal 6 karakter.
- Kalau login berhasil, nama pengguna disimpan di `localStorage` lalu diarahkan ke dashboard. Halaman lain akan mengembalikan pengguna ke login jika belum masuk.

| Tampilan login | Alert saat salah (form terisi) |
|---|---|
| ![Login](screenshots/01-login.png) | ![Login salah](screenshots/02-login-salah.png) |

| Modal Lupa Password | Modal Daftar (validasi) |
|---|---|
| ![Modal lupa password](screenshots/03-modal-lupa-password.png) | ![Modal daftar](screenshots/04-modal-daftar.png) |


### 2. Dashboard (`dashboard.html`)

Menu utama setelah login.

- **Greeting** otomatis sesuai jam lokal: pagi (sebelum 11.00), siang (sebelum 15.00), sore (sebelum 18.00), dan malam. Tanggal hari ini juga ditampilkan.
- Ringkasan angka (jumlah judul, total stok, pesanan dikirim, stok menipis) dihitung dari `data.js`, bukan ditulis manual.
- Empat tombol menu: Informasi Stok/Katalog, Tracking Pengiriman, Laporan Pemesanan, dan History Transaksi.
- History Transaksi tidak pindah halaman. Tabelnya muncul/sembunyi di halaman yang sama, isinya diambil dari `dataTracking`.
- Bagian **Buku di Katalog** menampilkan cover, harga, dan label stok (merah kalau di bawah 200), lengkap dengan tombol Pesan.
- **Pengiriman Terbaru** berisi daftar pesanan dengan status dan tautan "Lacak" yang langsung membuka halaman tracking dengan nomor DO terisi.
- **Cara Memesan** berisi empat langkah singkat, dan footer berisi menu serta info kontak toko.

| Dashboard | History Transaksi dibuka |
|---|---|
| ![Dashboard](screenshots/05-dashboard.png) | ![History transaksi](screenshots/06-dashboard-history.png) |

### 3. Informasi Stok / Katalog (`stok.html`)

- Tabel dibuat secara dinamis dari `dataKatalogBuku` lewat JavaScript, lengkap dengan cover buku.
- Buku dengan stok di bawah 200 ditandai warna merah.
- Kolom **Cari buku** menyaring tabel langsung saat mengetik (berdasarkan judul atau kode). Di sebelahnya ada ringkasan jumlah judul dan total stok yang ikut berubah saat baris ditambah atau dihapus.
- Form **Tambah Stok Baru** menambah baris ke tabel memakai DOM (`createElement` dan `appendChild`). Validasinya: kode barang tidak boleh kembar, harga harus lebih dari 0, dan stok harus bilangan bulat 0 atau lebih.
- Setiap baris punya tombol **Hapus**.

| Katalog awal | Hasil pencarian "keuangan" |
|---|---|
| ![Katalog](screenshots/07-stok.png) | ![Cari buku](screenshots/07b-stok-cari.png) |

| Setelah menambah baris | Validasi form |
|---|---|
| ![Tambah baris](screenshots/08-stok-tambah-baris.png) | ![Validasi stok](screenshots/09-stok-validasi.png) |

### 4. Pemesanan (`checkout.html`)

- Pilih buku dari dropdown, tentukan jumlah, lalu masuk ke keranjang. Kalau buku yang sama ditambahkan lagi, jumlahnya digabung.
- Jumlah di keranjang bisa diubah langsung dan tidak boleh melebihi stok. Subtotal dan total pembayaran dihitung ulang setiap ada perubahan.
- Form data pemesan dan pembayaran divalidasi: keranjang tidak boleh kosong, nama minimal 3 karakter, email valid, nomor telepon diawali `08` dengan 10-13 digit, alamat minimal 10 karakter, dan metode pembayaran wajib dipilih.
- Jika semua benar, muncul ringkasan pesanan beserta nomor Delivery Order.

| Keranjang dan validasi | Pesanan berhasil |
|---|---|
| ![Checkout validasi](screenshots/10-checkout-keranjang-validasi.png) | ![Checkout berhasil](screenshots/11-checkout-berhasil.png) |

### 5. Tracking Pengiriman (`tracking.html`)

Masukkan nomor Delivery Order lalu tekan **Cari**. Nomor yang tersedia di data dummy: `20230012` dan `20230013`, dan keduanya juga disediakan sebagai tombol contoh di bawah kolom input.

- Menampilkan nama pemesan, status pengiriman, ekspedisi, tanggal kirim, jenis paket, dan total pembayaran.
- Status ditampilkan dengan **progress bar** dan **timeline** riwayat perjalanan paket.
- Nomor yang kosong atau tidak ditemukan menampilkan pesan error.

| Halaman awal | Nomor tidak ditemukan |
|---|---|
| ![Tracking awal](screenshots/12a-tracking-awal.png) | ![Tracking tidak ditemukan](screenshots/12-tracking-tidak-ditemukan.png) |

![Tracking hasil](screenshots/13-tracking-hasil.png)

### Tampilan di HP

Layout menyesuaikan lebar layar. Di layar kecil, menu dan kolom di dashboard menjadi satu kolom, panel login tersusun atas-bawah, dan footer menumpuk ke bawah.

<p align="center">
  <img src="screenshots/14-dashboard-mobile.png" alt="Dashboard di HP" width="260">
</p>

## Cara Menjalankan

1. Download atau clone repository ini.
2. Buka file `index.html` di browser (Chrome, Edge, atau Firefox).
3. Login memakai salah satu akun di bawah.

| Email | Password | Role |
|---|---|---|
| rina@gmail.com | rina123 | User |
| agus@gmail.com | agus123 | User |
| siti@gmail.com | siti123 | Admin |

Akun baru juga bisa dibuat lewat tombol **Daftar**, tetapi hanya berlaku sampai halaman di-refresh karena datanya hanya ada di memori browser.

## Struktur Folder

```
tugas-uts-web1/
|-- index.html          (halaman login)
|-- dashboard.html
|-- stok.html
|-- tracking.html
|-- checkout.html
|-- css/
|   |-- style.css
|-- js/
|   |-- script.js       (logika semua halaman)
|   |-- data.js         (dataPengguna, dataKatalogBuku, dataTracking)
|-- assets/
|   |-- logo.svg
|   |-- logo.png
|-- img/                (cover buku)
|-- screenshots/        (gambar untuk README ini)
```

`script.js` dipakai bersama oleh kelima halaman. Setiap bagian kodenya hanya berjalan jika elemen halamannya ada, jadi tidak perlu satu file JS per halaman.

## Desain

Susunan halamannya mengikuti pola toko buku online pada umumnya: header dengan menu, banner ringkasan, rak buku dengan cover dan harga, lalu footer berisi menu dan kontak. Halaman login memakai tumpukan cover buku dari folder `img/` sebagai pengganti ilustrasi.

Warnanya dibuat seperti suasana toko buku: biru tua untuk header dan tabel, hijau tosca sebagai warna utama tombol, kuning emas untuk aksen dan menu aktif, oranye bata untuk tombol hapus dan peringatan, dengan latar krem seperti kertas. Judul memakai font serif (Lora) supaya terasa seperti buku, sedangkan isi teks memakai Source Sans 3. Kedua font ditanam langsung di `style.css`, jadi tidak ada file font terpisah. Logo dibuat sendiri berupa buku terbuka dengan pembatas buku dan ranting daun di dalam lingkaran.

## Catatan dan Keterbatasan

- Karena tidak memakai server, data yang ditambah (baris stok, akun baru, pesanan) hilang saat halaman di-refresh. Hanya status login yang disimpan di `localStorage`.
- Nomor Delivery Order dari halaman pemesanan dibuat acak dan belum tersambung ke halaman tracking, jadi tracking hanya bisa mencari nomor yang ada di `data.js`.
- Cover buku di folder `img/` berasal dari file aset tugas.

## Kriteria Penilaian yang Dipenuhi

| Kriteria | Wujudnya di project |
|---|---|
| Struktur HTML semantik | `header`, `nav`, `main`, `section`, `footer`, `label` untuk setiap input |
| Desain CSS | External stylesheet, variabel warna, responsif |
| JavaScript DOM | Tabel dinamis, keranjang, progress bar, modal, tampil/sembunyi history |
| Validasi form dan alert | Pesan error di tiap form, alert untuk login gagal dan jumlah tidak valid |
| Modularitas file | HTML, CSS, JS, data, dan aset dipisah sesuai struktur folder |
| Kreativitas tambahan | Logo sendiri, tema warna, greeting dan tanggal, ringkasan angka, rak buku, pencarian katalog, timeline tracking |

## Kode UTS WEB 1

### Kode checkout
 
`checkout.html` adalah halaman pemesanan. File ini hanya kerangka, sedangkan isi tabel dan perhitungannya diisi oleh `script.js`. Isinya terdiri dari tiga bagian:
 
- **Keranjang Pemesanan.** Ada form dengan dropdown `pilihBuku` dan input `jumlahBaru`. Di bawahnya ada tabel keranjang dengan `tbody` ber-id `isiKeranjang` (diisi lewat JavaScript) dan `tfoot` untuk total pembayaran.
- **Data Pemesan dan Pembayaran.** Berisi input nama, email, telepon, dropdown metode pembayaran, dan textarea alamat. Setiap input punya `label` dan `id` yang saling cocok.
- **Ringkasan** (`id="ringkasan"`). Bagian ini disembunyikan dengan atribut `hidden` dan baru muncul setelah pesanan berhasil.
Elemen `<p class="pesan">` di tiap form adalah tempat pesan error validasi.

![alt text](screenshots/checkout.png)

### Kode dashboard

`dashboard.html` adalah menu utama setelah login.
 
- Header berisi logo dan navigasi, termasuk tombol **Keluar**.
- Bagian atas (`hero`) berisi greeting (`id="greeting"`) dan empat angka ringkasan. Semuanya diisi JavaScript.
- **Menu Utama** punya empat tombol sesuai soal: Katalog, Tracking, Laporan Pemesanan, dan History Transaksi. Tiga pertama berupa link `<a>`, sedangkan History berupa `<button>` karena hanya menampilkan tabel di halaman yang sama.
- Section `riwayat` berisi tabel History Transaksi dan disembunyikan dulu dengan class `tersembunyi`.
- Bagian **Buku di Katalog** (`rakBuku`) dan **Pengiriman Terbaru** (`daftarKirim`) kosong di HTML, lalu diisi oleh JavaScript dari `data.js`.
- **Cara Memesan** berisi langkah-langkah singkat, dan footer berisi menu serta kontak.

![alt text](screenshots/dashboard.png)

### Kode index
 
`index.html` adalah halaman login, sesuai struktur folder di soal.
 
- Sisi kiri (`aside`) berisi logo, slogan, dan cover buku sebagai hiasan.
- Sisi kanan (`main`) berisi form dengan input email dan password serta tombol **Login**.
- Tombol **Lupa Password** dan **Daftar** memakai atribut `data-buka="modalLupa"` dan `data-buka="modalDaftar"`. Atribut itu dibaca JavaScript untuk membuka modal yang sesuai.
- Kedua modal sudah ada di HTML tetapi disembunyikan (`class="modal tersembunyi"`). Isinya form masing-masing, lengkap dengan tombol Tutup.
- Bagian `details` berisi akun yang bisa dipakai untuk mencoba login.

![alt text](screenshots/index.png)

### Kode stok
 
`stok.html` adalah halaman informasi stok dan katalog.
 
- Ada kolom **Cari buku** dan ringkasan jumlah judul serta total stok.
- Tabel punya `thead` yang tetap, sedangkan `tbody` ber-id `isiStok` dikosongkan karena barisnya dibuat JavaScript dari `dataKatalogBuku`.
- Form **Tambah Stok Baru** punya enam input: kode, nama, jenis, edisi, harga, dan stok. Dari form inilah baris baru ditambahkan ke tabel.
- Elemen `<p id="pesanStok">` menampilkan pesan error validasi.

![alt text](screenshots/stok.png)

### Kode tracking
 
`tracking.html` adalah halaman informasi pengiriman.
 
- Form punya satu input `nomorDO` dan tombol **Cari**. Dua tombol kecil di bawahnya mengisi nomor contoh (`20230012` dan `20230013`).
- Section `hasilTracking` disembunyikan (`hidden`) sampai pencarian berhasil. Di dalamnya ada tempat untuk nama pemesan, status, progress bar (`barProgress`), ekspedisi, tanggal kirim, jenis paket, total pembayaran, dan daftar riwayat perjalanan (`<ol id="daftarPerjalanan">`).
- Semua elemen itu punya `id` supaya bisa diisi oleh JavaScript.

![alt text](screenshots/tracking.png)

### Kode data.js
 
File ini berisi data dummy dalam bentuk variabel JavaScript, karena soal meminta data tidak diambil dari server atau database.
 
- `dataPengguna` adalah array berisi 3 akun (nama, email, password, role) untuk login.
- `dataKatalogBuku` adalah array berisi 5 buku (kode, nama, jenis, edisi, stok, harga, cover). Nama variabel ini sesuai permintaan soal.
- `dataTracking` berupa object dengan nomor DO sebagai kunci, sehingga pencarian bisa langsung `dataTracking[nomor]`. Di dalamnya ada data pemesan, status, ekspedisi, dan array `perjalanan` untuk riwayat paket.

![alt text](screenshots/data.png)

### Kode script.js
 
Satu file JavaScript untuk kelima halaman. Tiap bagian dibungkus `if (elemen)`, jadi hanya berjalan jika elemennya ada di halaman tersebut.
 
- **Fungsi bantu:** `formatRupiah`, `hargaKeAngka` (mengubah "Rp 180.000" jadi angka agar bisa dihitung), `buatBaris`, `cariBuku`, dan regex `polaEmail`.
- **Login:** mencocokkan email dan password dengan `dataPengguna`. Jika salah, muncul `alert`. Jika benar, nama disimpan di `localStorage` lalu pindah ke dashboard. Modal lupa password dan daftar punya validasi sendiri.
- **Dashboard:** greeting sesuai jam (`getHours()`), ringkasan angka, kartu buku, daftar pengiriman, dan tombol history yang menampilkan atau menyembunyikan tabel.
- **Stok:** tabel dibuat dengan `createElement` dan `appendChild`, form tambah baris divalidasi, ada tombol hapus, dan pencarian menyembunyikan baris yang tidak cocok.
- **Checkout:** keranjang berupa array yang digambar ulang setiap ada perubahan, lengkap dengan validasi stok dan form pemesan, lalu dibuat nomor DO acak.
- **Tracking:** mencari nomor DO, mengisi detailnya, mengatur lebar progress bar, dan membuat daftar riwayat perjalanan.

![alt text](screenshots/script.png)

### Kode css

`style.css` mengatur tampilan semua halaman.
 
- Warna disimpan sebagai variabel di `:root` (`--navy`, `--tosca`, `--emas`, `--bata`), sehingga tema mudah diganti.
- Layout memakai **flexbox** (header, navigasi, login) dan **grid** (menu, rak buku, footer).
- Class `.tersembunyi` berisi `display: none`, dan JavaScript menambah atau mencabutnya untuk menampilkan modal serta tabel.
- Tabel, tombol, form, kartu buku, progress bar, dan timeline tracking punya gaya masing-masing.
- **Media query** menyesuaikan tampilan untuk layar HP.
- Di bagian bawah ada `@font-face` untuk font Lora dan Source Sans 3 yang ditanam langsung.

![alt text](<screenshots/style css.png>)