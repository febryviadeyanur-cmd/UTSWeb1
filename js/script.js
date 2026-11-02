/* Fungsi bantu */
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Angka hasil menjadi "Rp 180.000"
function hargaKeAngka(teks) {
  return Number(teks.replace(/\D/g, ""));
}

function buatBaris(daftarIsi) {
  const baris = document.createElement("tr");
  daftarIsi.forEach(function (isi) {
    const sel = document.createElement("td");
    sel.textContent = isi;
    baris.appendChild(sel);
  });
  return baris;
}

function cariBuku(kode) {
  for (let i = 0; i < dataKatalogBuku.length; i++) {
    if (dataKatalogBuku[i].kodeBarang === kode) {
      return dataKatalogBuku[i];
    }
  }
  return null;
}

/* Cek login & tombol keluar */
const namaUser = localStorage.getItem("namaUser");
const formLogin = document.getElementById("formLogin");

if (!formLogin && namaUser === null) {
  window.location.href = "index.html";   // belum login -> kembali ke halaman login
}

const tombolKeluar = document.getElementById("tombolKeluar");
if (tombolKeluar) {
  tombolKeluar.addEventListener("click", function () {
    localStorage.removeItem("namaUser");
    window.location.href = "index.html";
  });
}

/* Modal membuka atau menutup dengan class yang tersembunyi */
document.querySelectorAll("[data-buka]").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    document.getElementById(tombol.getAttribute("data-buka")).classList.remove("tersembunyi");
  });
});
document.querySelectorAll("[data-tutup]").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    document.getElementById(tombol.getAttribute("data-tutup")).classList.add("tersembunyi");
  });
});

/* 1. HALAMAN LOGIN (index.html) */
if (formLogin) {
  const pesanLogin = document.getElementById("pesanLogin");

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
      pesanLogin.textContent = "Email dan password wajib diisi.";
      return;
    }

    let userDitemukan = null;
    for (let i = 0; i < dataPengguna.length; i++) {
      if (dataPengguna[i].email === email && dataPengguna[i].password === password) {
        userDitemukan = dataPengguna[i];
      }
    }

    if (userDitemukan === null) {
      alert("Email/password yang anda masukkan salah");
      return;
    }

    localStorage.setItem("namaUser", userDitemukan.nama);
    window.location.href = "dashboard.html";
  });

  // Lupa Password
  const formLupa = document.getElementById("formLupa");
  const pesanLupa = document.getElementById("pesanLupa");
  formLupa.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("emailLupa").value.trim();

    if (!polaEmail.test(email)) {
      pesanLupa.textContent = "Masukkan email yang valid.";
      return;
    }
    let ada = false;
    for (let i = 0; i < dataPengguna.length; i++) {
      if (dataPengguna[i].email === email) {
        ada = true;
      }
    }
    if (ada) {
      alert("Tautan reset password telah dikirim ke " + email);
      pesanLupa.textContent = "";
      formLupa.reset();
    } else {
      pesanLupa.textContent = "Email tidak terdaftar.";
    }
  });

  // Modal Daftar
  const formDaftar = document.getElementById("formDaftar");
  const pesanDaftar = document.getElementById("pesanDaftar");
  formDaftar.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("namaDaftar").value.trim();
    const email = document.getElementById("emailDaftar").value.trim();
    const password = document.getElementById("passwordDaftar").value;

    if (nama.length < 3) {
      pesanDaftar.textContent = "Nama minimal 3 karakter.";
      return;
    }
    if (!polaEmail.test(email)) {
      pesanDaftar.textContent = "Masukkan email yang valid.";
      return;
    }
    if (password.length < 6) {
      pesanDaftar.textContent = "Password minimal 6 karakter.";
      return;
    }
    for (let i = 0; i < dataPengguna.length; i++) {
      if (dataPengguna[i].email === email) {
        pesanDaftar.textContent = "Email sudah terdaftar.";
        return;
      }
    }

    // tambah ke array
    dataPengguna.push({
      id: dataPengguna.length + 1,
      nama: nama,
      email: email,
      password: password,
      role: "User"
    });
    pesanDaftar.textContent = "";
    alert("Pendaftaran berhasil. Silakan login.");
    formDaftar.reset();
    document.getElementById("modalDaftar").classList.add("tersembunyi");
  });
}

/* 2. DASHBOARD (dashboard.html) */
const greeting = document.getElementById("greeting");
if (greeting) {
  const jam = new Date().getHours();
  let waktu;
  if (jam < 11) {
    waktu = "pagi";
  } else if (jam < 15) {
    waktu = "siang";
  } else if (jam < 18) {
    waktu = "sore";
  } else {
    waktu = "malam";
  }
  greeting.textContent = "Selamat " + waktu + ", " + namaUser + "!";

  // tanggal hari ini di atas greeting
  document.getElementById("tanggal").textContent = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  // isi tabel history dari dataTracking
  const isiRiwayat = document.getElementById("isiRiwayat");
  for (const nomor in dataTracking) {
    const d = dataTracking[nomor];
    isiRiwayat.appendChild(buatBaris([d.nomorDO, d.nama, d.tanggalKirim, d.ekspedisi, d.total]));
  }

  // tombol menampil atau sembunyi history
  document.getElementById("tombolRiwayat").addEventListener("click", function () {
    document.getElementById("riwayat").classList.toggle("tersembunyi");
  });

  // ringkasan angka dari data
  let totalStok = 0;
  let jumlahMenipis = 0;
  dataKatalogBuku.forEach(function (b) {
    totalStok += b.stok;
    if (b.stok < 200) {
      jumlahMenipis++;
    }
  });
  document.getElementById("angkaJudul").textContent = dataKatalogBuku.length;
  document.getElementById("angkaStok").textContent = totalStok.toLocaleString("id-ID");
  document.getElementById("angkaPesanan").textContent = Object.keys(dataTracking).length;
  document.getElementById("angkaMenipis").textContent = jumlahMenipis;

  // rak buku kartu dibuat dari dataKatalogBuku
  const rakBuku = document.getElementById("rakBuku");
  dataKatalogBuku.forEach(function (b) {
    const kartu = document.createElement("article");
    kartu.className = "buku";

    const gambar = document.createElement("img");
    gambar.src = b.cover;
    gambar.alt = "Cover " + b.namaBarang;

    const judul = document.createElement("h3");
    judul.textContent = b.namaBarang;

    const kode = document.createElement("p");
    kode.className = "kode";
    kode.textContent = b.kodeBarang + " - Edisi " + b.edisi;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = b.harga;

    const label = document.createElement("span");
    label.className = b.stok < 200 ? "label menipis" : "label";
    label.textContent = b.stok < 200 ? "Stok menipis (" + b.stok + ")" : "Stok " + b.stok;

    const tombol = document.createElement("a");
    tombol.className = "tombol";
    tombol.href = "checkout.html";
    tombol.textContent = "Pesan";

    kartu.append(gambar, judul, kode, harga, label, tombol);
    rakBuku.appendChild(kartu);
  });

  // daftar pengiriman terbaru
  const daftarKirim = document.getElementById("daftarKirim");
  for (const nomor in dataTracking) {
    const d = dataTracking[nomor];
    const li = document.createElement("li");

    const kiri = document.createElement("div");
    const nama = document.createElement("strong");
    nama.textContent = d.nama;
    const info = document.createElement("small");
    info.textContent = "DO " + d.nomorDO + " - " + d.ekspedisi + " - " + d.total;
    kiri.append(nama, info);

    const kanan = document.createElement("div");
    kanan.className = "kanan";
    const chip = document.createElement("span");
    chip.className = "chip-status";
    chip.textContent = d.status;
    const lacak = document.createElement("a");
    lacak.href = "tracking.html?do=" + d.nomorDO;
    lacak.textContent = "Lacak";
    kanan.append(chip, lacak);

    li.append(kiri, kanan);
    daftarKirim.appendChild(li);
  }
}

/* 3. INFORMASI STOK (stok.html) */
const isiStok = document.getElementById("isiStok");
if (isiStok) {
  const daftarBuku = dataKatalogBuku.slice();   // salinan array agar data asli tidak berubah

  function tambahBarisStok(buku) {
    const baris = document.createElement("tr");

    // kolom cover
    const selCover = document.createElement("td");
    if (buku.cover) {
      const gambar = document.createElement("img");
      gambar.src = buku.cover;
      gambar.setAttribute("alt", "Cover " + buku.namaBarang);
      gambar.className = "cover";
      selCover.appendChild(gambar);
    } else {
      selCover.textContent = "-";
    }
    baris.appendChild(selCover);

    // kolom teks
    const kolom = [buku.kodeBarang, buku.namaBarang, buku.jenisBarang, buku.edisi, buku.harga, buku.stok];
    kolom.forEach(function (isi, index) {
      const sel = document.createElement("td");
      sel.textContent = isi;
      if (index === 5 && buku.stok < 200) {
        sel.className = "stok-sedikit";
      }
      baris.appendChild(sel);
    });

    // kolom aksi
    const selAksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "tombol-merah";
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", function () {
      baris.remove();
      perbaruiRingkasan();
      saringTabel();
    });
    selAksi.appendChild(tombolHapus);
    baris.appendChild(selAksi);

    isiStok.appendChild(baris);
  }

  // ringkasan jumlah judul & total stok
  const ringkasStok = document.getElementById("ringkasStok");
  function perbaruiRingkasan() {
    let judul = 0;
    let total = 0;
    isiStok.querySelectorAll("tr").forEach(function (baris) {
      judul++;
      total += Number(baris.cells[6].textContent);
    });
    ringkasStok.textContent = judul + " judul - total stok " + total.toLocaleString("id-ID") + " eksemplar";
  }

  // pencarian: baris yang tidak cocok disembunyikan
  const kolomCari = document.getElementById("cariBuku");
  const kosongStok = document.getElementById("kosongStok");
  function saringTabel() {
    const kata = kolomCari.value.trim().toLowerCase();
    let tampil = 0;
    isiStok.querySelectorAll("tr").forEach(function (baris) {
      const kode = baris.cells[1].textContent.toLowerCase();
      const nama = baris.cells[2].textContent.toLowerCase();
      const cocok = kode.includes(kata) || nama.includes(kata);
      baris.hidden = !cocok;
      if (cocok) {
        tampil++;
      }
    });
    kosongStok.classList.toggle("tersembunyi", tampil > 0);
  }
  kolomCari.addEventListener("input", saringTabel);

  for (let i = 0; i < daftarBuku.length; i++) {
    tambahBarisStok(daftarBuku[i]);
  }
  perbaruiRingkasan();

  const formStok = document.getElementById("formStok");
  const pesanStok = document.getElementById("pesanStok");
  formStok.addEventListener("submit", function (event) {
    event.preventDefault();
    const kode = document.getElementById("kodeBarang").value.trim().toUpperCase();
    const nama = document.getElementById("namaBarang").value.trim();
    const jenis = document.getElementById("jenisBarang").value.trim();
    const edisi = document.getElementById("edisi").value.trim();
    const harga = Number(document.getElementById("harga").value);
    const stokInput = document.getElementById("stok").value;
    const stok = Number(stokInput);

    if (kode === "" || nama === "" || jenis === "" || edisi === "") {
      pesanStok.textContent = "Kode, nama, jenis, dan edisi wajib diisi.";
      return;
    }
    for (let i = 0; i < daftarBuku.length; i++) {
      if (daftarBuku[i].kodeBarang === kode) {
        pesanStok.textContent = "Kode barang sudah dipakai.";
        return;
      }
    }
    if (!(harga > 0)) {
      pesanStok.textContent = "Harga harus lebih dari 0.";
      return;
    }
    if (stokInput === "" || !Number.isInteger(stok) || stok < 0) {
      pesanStok.textContent = "Stok harus bilangan bulat 0 atau lebih.";
      return;
    }

    const bukuBaru = {
      kodeBarang: kode,
      namaBarang: nama,
      jenisBarang: jenis,
      edisi: edisi,
      stok: stok,
      harga: formatRupiah(harga),
      cover: ""
    };
    daftarBuku.push(bukuBaru);
    tambahBarisStok(bukuBaru);
    perbaruiRingkasan();
    saringTabel();
    pesanStok.textContent = "";
    formStok.reset();
    document.getElementById("jenisBarang").value = "Buku Ajar";
  });
}

/* 4. PEMESANAN (checkout.html) */
const isiKeranjang = document.getElementById("isiKeranjang");
if (isiKeranjang) {
  let keranjang = [];                                   // isi: { kode, jumlah }
  const pilihBuku = document.getElementById("pilihBuku");
  const pesanItem = document.getElementById("pesanItem");
  const totalBayar = document.getElementById("totalBayar");

  // isi pilihan buku dari dataKatalogBuku
  for (let i = 0; i < dataKatalogBuku.length; i++) {
    const b = dataKatalogBuku[i];
    const opsi = document.createElement("option");
    opsi.value = b.kodeBarang;
    opsi.textContent = b.namaBarang + " - " + b.harga;
    pilihBuku.appendChild(opsi);
  }

  function tampilkanKeranjang() {
    isiKeranjang.textContent = "";
    let total = 0;

    if (keranjang.length === 0) {
      const baris = document.createElement("tr");
      const sel = document.createElement("td");
      sel.colSpan = 5;
      sel.textContent = "Keranjang masih kosong.";
      baris.appendChild(sel);
      isiKeranjang.appendChild(baris);
    }

    for (let i = 0; i < keranjang.length; i++) {
      const item = keranjang[i];
      const buku = cariBuku(item.kode);
      const subtotal = hargaKeAngka(buku.harga) * item.jumlah;
      total += subtotal;

      const baris = buatBaris([buku.namaBarang, buku.harga]);

      // kolom jumlah (bisa diubah)
      const selJumlah = document.createElement("td");
      const inputJumlah = document.createElement("input");
      inputJumlah.type = "number";
      inputJumlah.min = 1;
      inputJumlah.max = buku.stok;
      inputJumlah.value = item.jumlah;
      inputJumlah.className = "jumlah";
      inputJumlah.addEventListener("change", function () {
        const jumlahBaru = Number(inputJumlah.value);
        if (!Number.isInteger(jumlahBaru) || jumlahBaru < 1 || jumlahBaru > buku.stok) {
          alert("Jumlah harus 1 sampai " + buku.stok);
        } else {
          item.jumlah = jumlahBaru;
        }
        tampilkanKeranjang();
      });
      selJumlah.appendChild(inputJumlah);
      baris.appendChild(selJumlah);

      const selSubtotal = document.createElement("td");
      selSubtotal.textContent = formatRupiah(subtotal);
      baris.appendChild(selSubtotal);

      // kolom hapus
      const selAksi = document.createElement("td");
      const tombolHapus = document.createElement("button");
      tombolHapus.type = "button";
      tombolHapus.className = "tombol-merah";
      tombolHapus.textContent = "Hapus";
      tombolHapus.addEventListener("click", function () {
        keranjang.splice(i, 1);
        tampilkanKeranjang();
      });
      selAksi.appendChild(tombolHapus);
      baris.appendChild(selAksi);

      isiKeranjang.appendChild(baris);
    }
    totalBayar.textContent = formatRupiah(total);
    return total;
  }

  document.getElementById("formTambahItem").addEventListener("submit", function (event) {
    event.preventDefault();
    const kode = pilihBuku.value;
    const jumlah = Number(document.getElementById("jumlahBaru").value);
    const buku = cariBuku(kode);

    if (buku === null) {
      pesanItem.textContent = "Pilih buku terlebih dahulu.";
      return;
    }
    if (!Number.isInteger(jumlah) || jumlah < 1) {
      pesanItem.textContent = "Jumlah minimal 1.";
      return;
    }

    // kalau buku sudah ada di keranjang, jumlahnya ditambah
    let itemLama = null;
    for (let i = 0; i < keranjang.length; i++) {
      if (keranjang[i].kode === kode) {
        itemLama = keranjang[i];
      }
    }
    const jumlahAkhir = (itemLama ? itemLama.jumlah : 0) + jumlah;
    if (jumlahAkhir > buku.stok) {
      pesanItem.textContent = "Stok " + buku.namaBarang + " hanya " + buku.stok + ".";
      return;
    }
    if (itemLama) {
      itemLama.jumlah = jumlahAkhir;
    } else {
      keranjang.push({ kode: kode, jumlah: jumlah });
    }
    pesanItem.textContent = "";
    tampilkanKeranjang();
  });

  // Form pemesan & pembayaran
  const formPesan = document.getElementById("formPesan");
  const pesanPesan = document.getElementById("pesanPesan");
  formPesan.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("namaPemesan").value.trim();
    const email = document.getElementById("emailPemesan").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const metode = document.getElementById("metode").value;

    if (keranjang.length === 0) {
      pesanPesan.textContent = "Keranjang masih kosong. Tambahkan buku dulu.";
      return;
    }
    if (nama.length < 3) {
      pesanPesan.textContent = "Nama pemesan minimal 3 karakter.";
      return;
    }
    if (!polaEmail.test(email)) {
      pesanPesan.textContent = "Masukkan email yang valid.";
      return;
    }
    if (!/^08\d{8,11}$/.test(telepon)) {
      pesanPesan.textContent = "No. telepon harus diawali 08 dan terdiri dari 10-13 digit.";
      return;
    }
    if (alamat.length < 10) {
      pesanPesan.textContent = "Alamat pengiriman terlalu singkat (minimal 10 karakter).";
      return;
    }
    if (metode === "") {
      pesanPesan.textContent = "Pilih metode pembayaran.";
      return;
    }

    // semua valid dan di tampilkan dalam ringkasan
    const total = tampilkanKeranjang();
    const nomorDO = "2026" + (Math.floor(Math.random() * 9000) + 1000);
    document.getElementById("ringNomor").textContent = nomorDO;
    document.getElementById("ringNama").textContent = nama;
    document.getElementById("ringMetode").textContent = metode;
    document.getElementById("ringTotal").textContent = formatRupiah(total);

    const ringDaftar = document.getElementById("ringDaftar");
    ringDaftar.textContent = "";
    keranjang.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = cariBuku(item.kode).namaBarang + " x " + item.jumlah;
      ringDaftar.appendChild(li);
    });

    document.getElementById("ringkasan").hidden = false;
    pesanPesan.textContent = "";
    keranjang = [];
    tampilkanKeranjang();
    formPesan.reset();
  });

  tampilkanKeranjang();
}

/* 5. TRACKING (tracking.html) */
const formCari = document.getElementById("formCari");
if (formCari) {
  const pesanCari = document.getElementById("pesanCari");
  const hasilTracking = document.getElementById("hasilTracking");

  // progress bar: dihitung dari status & keterangan terakhir perjalanan
  function hitungProgress(data) {
    const terakhir = data.perjalanan[data.perjalanan.length - 1];
    if (terakhir.keterangan.indexOf("Selesai") === 0) {
      return 100;
    }
    switch (data.status) {
      case "Dalam Perjalanan":
        return 60;
      case "Dikirim":
        return 40;
      default:
        return 20;
    }
  }

  formCari.addEventListener("submit", function (event) {
    event.preventDefault();
    const nomor = document.getElementById("nomorDO").value.trim();

    if (nomor === "") {
      pesanCari.textContent = "Nomor Delivery Order wajib diisi.";
      hasilTracking.hidden = true;
      return;
    }
    const data = dataTracking[nomor];
    if (!data) {
      pesanCari.textContent = "Nomor DO " + nomor + " tidak ditemukan. Coba 20230012 atau 20230013.";
      hasilTracking.hidden = true;
      return;
    }
    pesanCari.textContent = "";

    document.getElementById("hasilNama").textContent = data.nama;
    document.getElementById("hasilStatus").textContent = data.status;
    document.getElementById("hasilEkspedisi").textContent = data.ekspedisi;
    document.getElementById("hasilTanggal").textContent = data.tanggalKirim;
    document.getElementById("hasilPaket").textContent = data.paket;
    document.getElementById("hasilTotal").textContent = data.total;

    const persen = hitungProgress(data);
    const barProgress = document.getElementById("barProgress");
    barProgress.style.width = persen + "%";
    barProgress.textContent = persen + "%";

    const daftarPerjalanan = document.getElementById("daftarPerjalanan");
    daftarPerjalanan.textContent = "";
    for (let i = 0; i < data.perjalanan.length; i++) {
      const li = document.createElement("li");
      li.textContent = data.perjalanan[i].waktu + " - " + data.perjalanan[i].keterangan;
      daftarPerjalanan.appendChild(li);
    }
    hasilTracking.hidden = false;
  });

  // tombol contoh nomor DO
  document.querySelectorAll("[data-do]").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      document.getElementById("nomorDO").value = tombol.getAttribute("data-do");
      formCari.requestSubmit();
    });
  });

  // dibuka dari dashboard: tracking.html?do=20230012
  const doDariUrl = new URLSearchParams(window.location.search).get("do");
  if (doDariUrl) {
    document.getElementById("nomorDO").value = doDariUrl;
    formCari.requestSubmit();
  }
}
