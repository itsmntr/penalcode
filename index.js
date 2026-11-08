// Sumber: Penal Code ucup-meletup.site (fine/sentence) + Penal Code Quick Reference pamanahrasa.github.io/lspdnote (ambang jumlah)
const SATUAN_SENTENCE = "bulan";

// cv: true = Court Verdict (tidak masuk total fine/sentence)
// fine/sentence null = nominal belum diisi (isi dari Penal Code MDT; sementara tidak masuk total)
// kode "" = belum ada nomor pasal (tidak ditampilkan)
const kosong = (nama, catatan) => ({ kode: "", nama, fine: null, sentence: null, ...(catatan && { catatan }) });

const PASAL = {
  "(3)10": { nama: "Possession of Stolen Goods", fine: 3500, sentence: 15 },
  "(3)11": { nama: "Possession of a Stolen Identification", fine: 7000, sentence: 5 },
  "(4)09": { nama: "First Degree Possession of Illegal Money", cv: true },
  "(4)32": { nama: "Second Degree Possession of Illegal Money", fine: 60000, sentence: 70 },
  "(4)33": { nama: "Third Degree Possession of Illegal Money", fine: 35000, sentence: 50 },
  "(4)34": { nama: "Unlawful Possession of State Insignia", fine: 32000, sentence: 12 },
  "(4)35": { nama: "Minor Possession of Illegal Money", fine: 15000, sentence: 10 },
  "(4)36": { nama: "Third Degree Possession of Illegal Laundry Card", fine: 30000, sentence: 20 },
  "(4)37": { nama: "Second Degree Possession of Illegal Laundry Card", fine: 60000, sentence: 30 },
  "(4)38": { nama: "First Degree Possession of Illegal Laundry Card", cv: true },
  "(6)00": { nama: "Misdemeanor Possession of Schedule I Controlled Substances", fine: 2000, sentence: 15 },
  "(6)01": { nama: "Felony Possession of Schedule I Controlled Substances", fine: 3000, sentence: 20 },
  "(6)02": { nama: "Misdemeanor Possession of Schedule II Controlled Substances", fine: 5000, sentence: 35 },
  "(6)03": { nama: "Felony Possession of Schedule II Controlled Substances", fine: 10000, sentence: 50 },
  "(6)04": { nama: "Drug Smuggling", fine: 50000, sentence: 130 },
  "(6)05": { nama: "Drug Trafficking", cv: true },
  "(6)07A": { nama: "Possession of Drug Paraphernalia", fine: 20000, sentence: 50 },
  "(6)07B": { nama: "Possession of Drug Paraphernalia (berat, 10 item atau lebih)", cv: true },
  "(6)08": { nama: "Distribution of a Controlled Substance", fine: 20000, sentence: 100, catatan: "Dasar: total narkotika di atas 800 gram" },
  "(6)10": { nama: "Unlawful Possession of Poppy", fine: 5000, sentence: 15 },
  "(6)11": { nama: "Felony Possession of Poppy", fine: 15000, sentence: 80 },
  "(6)12": { nama: "Aggravated Possession of Poppy", cv: true },
  "(7)03": { nama: "Criminal Possession of a Firearm [Class 1]", fine: 1200, sentence: 12 },
  "(7)04": { nama: "Criminal Possession of a Firearm [Class 2]", fine: 30600, sentence: 45 },
  "(7)05": { nama: "Criminal Possession of a Firearm [Class 3]", fine: 85000, sentence: 60 },
  "(7)06": { nama: "Criminal Possession of a Government-Issue Firearm", fine: 30000, sentence: 100 },
  "(7)07": { nama: "Criminal Possession of a Government Issued Baton", fine: 200, sentence: 5 },
  "(7)08": { nama: "Criminal Possession of a Government Issued Taser", fine: 1000, sentence: 15 },
  "(7)09": { nama: "Possession of Unauthorized Device (Hacking Device)", fine: 1000, sentence: 10 },
  "(7)10": { nama: "Possession of Destructive Devices", fine: 800, sentence: 10 },
  "(7)19": { nama: "Unlawful Possession of Ammunition", fine: 345, sentence: 5 },
  "(7)20": { nama: "Illegal Distribution of Ammunition", fine: 1460, sentence: 12 },
  "(7)36": { nama: "Weapon Smuggling", cv: true, catatan: "Dasar: lebih dari 8 pucuk senjata" },
  "(7)43": { nama: "Misdemeanor Possession of Bulletproof Vest", fine: 3280, sentence: 25 },
  "(7)44": { nama: "Felony Possession of Bulletproof Vest", cv: true },
  "(7)45": { nama: "Misdemeanor Unlawful Possession of Weapon Component", fine: 5000, sentence: 25 },
  "(7)46": { nama: "Felony Unlawful Possession of Weapon Component", fine: 7000, sentence: 30 },
  "(7)48": { nama: "Ammunition Smuggling", cv: true },
  "(8)31": { nama: "Possession of Nitrous Oxide", fine: 2500, sentence: 20 },
  "(8)33": { nama: "Unlawful Possession of an Illegal Racing Device", fine: 3570, sentence: 20 },

  // --- Perampokan (Penal Code Quick Reference, pamanahrasa) ---
  "ROB-LTD": { kode: "(3)08", nama: "Commercial Robbery", fine: 8000, sentence: 20 },
  "ROB-FLEECA": { kode: "(3)13", nama: "Grand Larceny Public Reserve Banks (Fleeca)", fine: 20000, sentence: 20 },
  "ROB-MAJOR": { kode: "(3)14", nama: "Grand Larceny Major Property Crime", fine: 20000, sentence: 30 },
  "ROB-FEDERAL": { kode: "(3)12", nama: "Grand Larceny Federal Reserve Banks (Pacific/Blaine/Maze)", fine: 50000, sentence: 50 },
  "ROB-RUMAH": { kode: "(3)17", nama: "Burglary", fine: 8000, sentence: 15 },
  "ROB-JEWEL": { kode: "(3)26", nama: "Robbery of Vangelico Property", fine: 20000, sentence: 25 },
  "HOST": { kode: "(1)24", nama: "Hostages", fine: 3000, sentence: 20, catatan: "1–2 sandera" },
  "AHOST": { kode: "(1)25", nama: "Aggravated Hostages", fine: 20000, sentence: 35, catatan: "3 sandera atau lebih" },
  "RESIST": { kode: "(5)07", nama: "Resisting Arrest", fine: 1500, sentence: 5 },

  "DRUGMFG": { kode: "(6)06", nama: "Drug Manufacturing", cv: true },

  "(6)09": { nama: "Drugs Selling", fine: 5000, sentence: 15 },
  "(7)16": { nama: "Brandishing of a Firearm", fine: 4500, sentence: 7 },
  "(7)49": { nama: "Usage of Suppressor", fine: 5000, sentence: 20 },
  "(5)06": { nama: "Evading a Peace Officer", fine: 2500, sentence: 6 },
  "(8)08": { nama: "Reckless Evading of a Peace Officer", fine: 1000, sentence: 14 },
  "(3)28": { nama: "ATM Robbery", fine: 1700, sentence: 15 },

  // --- Gang ---
  "GANG": { kode: "(1)10", nama: "Gang Related Shooting", fine: 30000, sentence: 30 },
  "DRIVEBY": { kode: "(7)42", nama: "Drive-by Shooting", fine: 1250, sentence: 15 },
  "CRIMUSE": { kode: "(7)15", nama: "Criminal Use of a Firearm", fine: 1500, sentence: 8, catatan: "Wajib uji GSR" },
  "AGGBATT": { kode: "(1)32", nama: "Aggravated Battery of a Government Employee", fine: 90000, sentence: 45 },

  // --- Obstruction & accomplice ---
  "TAMPER": { kode: "(4)17A", nama: "Evidence Tampering", fine: 30000, sentence: 20, catatan: "Perlu indikasi kuat disengaja; (4)17B adalah versi Court Verdict" },
  "ACCESSORY": { kode: "(3)27", nama: "Accessory to Robbery", fine: 5000, sentence: 10, catatan: "Khusus kasus Robbery" },
  "OBSTRUCT": { kode: "(4)20", nama: "Obstruction of Public Duty", fine: 12000, sentence: 20, catatan: "Untuk kasus selain Robbery" },
};

// pasal(q) mengembalikan [[idPasal, jumlahStack], ...] untuk jumlah q yang ditemukan
// tier(satuan, [[batasAtas, idPasal|null, label], ...], [nilaiTepatYangAmbigu])
// batasAtas inklusif. Nilai tepat di batas yang tidak disebut handbook ditandai ambigu agar dikonfirmasi ke IC.
const tier = (satuan, tiers, ambigu = []) => ({ tiers, ambigu, pasal: q => {
  const i = tiers.findIndex(([m]) => q <= m), [m, id, lbl] = tiers[i];
  if (!id) return [];
  const ket = [`Tingkat: ${lbl}`];
  if (isFinite(m)) ket.push(`${(m + 1 - q).toLocaleString("id-ID")} ${satuan} lagi → ${tiers[i + 1][2]}`);
  if (ambigu.includes(q)) ket.push(`Tepat ${q.toLocaleString("id-ID")} ${satuan}: handbook tidak menyebut batas ini, konfirmasi ke IC`);
  return [[id, 1, ket]];
} });
const stack = id => q => [[id, q]];

const EVIDENCE = [
  { id: "sch1", kat: "Narkotika", nama: "Schedule I (Weed Bag, Opium Bag)", satuan: "gram",
    ...tier("gram", [[60, "(6)00", "Misdemeanor"], [Infinity, "(6)01", "Felony"]]) },
  { id: "sch2", kat: "Narkotika", nama: "Schedule II (Meth Bag, Cocaine)", satuan: "gram",
    ...tier("gram", [[100, "(6)02", "Misdemeanor"], [Infinity, "(6)03", "Felony"]]) },
  { id: "para", kat: "Narkotika", nama: "Alat produksi narkotika (Meth Oven/Table, Bagging Table, Baggy, Planting Pot, Seed, Weed, Phos, Pseudo, Acid, Liquid Meth, Meth)", satuan: "item",
    ...tier("item", [[9, "(6)07A", "Kategori A"], [Infinity, "(6)07B", "Kategori B"]]) },
  { id: "poppy", kat: "Narkotika", nama: "Tanaman poppy", satuan: "kg",
    ...tier("kg", [[100, null, "Tanpa charge"], [199, "(6)10", "Unlawful"], [300, "(6)11", "Felony"], [Infinity, "(6)12", "Aggravated"]]) },

  { id: "drugmfg", kat: "Narkotika", nama: "Memproduksi narkotika (Drug Manufacturing)", tipe: "cek", pasal: () => [["DRUGMFG", 1]] },

  { id: "drugsell", kat: "Narkotika", nama: "Menjual/menawarkan narkoba (Drugs Selling)", tipe: "cek", pasal: () => [["(6)09", 1]] },
  { id: "brandish", kat: "Senjata & Amunisi", nama: "Brandishing senjata api (mengacungkan di depan umum)", tipe: "cek", pasal: () => [["(7)16", 1]] },
  { id: "suppress", kat: "Senjata & Amunisi", nama: "Menggunakan suppressor", tipe: "cek", pasal: () => [["(7)49", 1]] },
  { id: "evade", kat: "Kendaraan", nama: "Kabur dari polisi (Evading a Peace Officer)", tipe: "cek", pasal: () => [["(5)06", 1]] },
  { id: "recevade", kat: "Kendaraan", nama: "Kabur ugal-ugalan (Reckless Evading)", tipe: "cek", pasal: () => [["(8)08", 1]] },
  { id: "atm", kat: "Perampokan", nama: "ATM Robbery", tipe: "cek", pasal: () => [["(3)28", 1]] },

  { id: "fw1", kat: "Senjata & Amunisi", nama: "Firearm Class 1 (Pistol .50, Ceramic Pistol, X17, Machine Pistol, dll.)", satuan: "pucuk", pasal: stack("(7)03") },
  { id: "fw2", kat: "Senjata & Amunisi", nama: "Firearm Class 2 (SMG, Micro SMG, Pump Shotgun, Sawn Off, Navy Revolver, dll.)", satuan: "pucuk", pasal: stack("(7)04") },
  { id: "fw3", kat: "Senjata & Amunisi", nama: "Firearm Class 3 (Assault Rifle, Carbine, AK47, dll.)", satuan: "pucuk", pasal: stack("(7)05") },
  { id: "govfw", kat: "Senjata & Amunisi", nama: "Senjata api milik pemerintah/LEO", satuan: "pucuk", pasal: stack("(7)06") },
  { id: "baton", kat: "Senjata & Amunisi", nama: "Baton milik pemerintah", satuan: "buah", pasal: stack("(7)07") },
  { id: "taser", kat: "Senjata & Amunisi", nama: "Taser milik pemerintah", satuan: "buah", pasal: stack("(7)08") },
  { id: "ammo", kat: "Senjata & Amunisi", nama: "Amunisi (total semua jenis)", satuan: "butir",
    ...tier("butir", [[300, "(7)19", "Unlawful Possession"], [2000, "(7)20", "Distribution"], [Infinity, "(7)48", "Smuggling"]], [300, 2000]) },
  { id: "vest", kat: "Senjata & Amunisi", nama: "Bulletproof vest", satuan: "buah",
    ...tier("buah", [[9, "(7)43", "Misdemeanor"], [Infinity, "(7)44", "Felony"]], [10]) },
  { id: "comp", kat: "Senjata & Amunisi", nama: "Komponen senjata", satuan: "unit",
    ...tier("unit", [[19, "(7)45", "Misdemeanor"], [Infinity, "(7)46", "Felony"]], [20]) },
  { id: "destr", kat: "Senjata & Amunisi", nama: "Destructive device (bom pipa, granat, dll.)", satuan: "unit", pasal: stack("(7)10") },

  { id: "money", kat: "Uang & Barang", nama: "Uang merah (illegal money)", satuan: "$",
    ...tier("$", [[49999, "(4)35", "Minor"], [149999, "(4)33", "Third Degree"], [399999, "(4)32", "Second Degree"], [Infinity, "(4)09", "First Degree"]], [150000, 400000]) },
  { id: "laundry", kat: "Uang & Barang", nama: "Kartu laundry ilegal", satuan: "kartu",
    ...tier("kartu", [[10, "(4)36", "Third Degree"], [39, "(4)37", "Second Degree"], [Infinity, "(4)38", "First Degree"]], [40]) },
  { id: "stolen", kat: "Uang & Barang", nama: "Barang curian / hasil rampokan (uang merah TIDAK dihitung di sini)", satuan: "jenis", pasal: stack("(3)10") },
  { id: "stolenid", kat: "Uang & Barang", nama: "ID curian", satuan: "buah", pasal: stack("(3)11") },
  { id: "insignia", kat: "Uang & Barang", nama: "Lencana/seragam/ID aparat tanpa hak", satuan: "buah", pasal: stack("(4)34") },
  { id: "hack", kat: "Uang & Barang", nama: "Hacking device (Lockpick, Green Card, dll.)", satuan: "buah", pasal: stack("(7)09") },

  { id: "nos", kat: "Kendaraan", nama: "Nitrous oxide", satuan: "tabung", pasal: stack("(8)31") },
  { id: "race", kat: "Kendaraan", nama: "Perangkat balap ilegal (pembatas kecepatan dilepas, dll.)", satuan: "buah", pasal: stack("(8)33") },

  { id: "rob", kat: "Perampokan", nama: "Jenis perampokan", tipe: "pilih",
    opsi: [["LTD", "ROB-LTD"], ["Fleeca", "ROB-FLEECA"],
           ["Bobcat / Museum / Grupee / Cash Exchange / Laundromat", "ROB-MAJOR"],
           ["Pacific / Blaine / Maze Bank", "ROB-FEDERAL"], ["Rumah", "ROB-RUMAH"], ["Jewel", "ROB-JEWEL"]],
    pasal: v => v ? [[v, 1]] : [] },
  { id: "host", kat: "Perampokan", nama: "Sandera", satuan: "orang",
    pasal: q => [[q <= 2 ? "HOST" : "AHOST", 1]] },
  { id: "resist", kat: "Perampokan", nama: "Resisting Arrest (kabur membawa mobil)", tipe: "cek", pasal: () => [["RESIST", 1]] },
  { id: "accessory", kat: "Perampokan", nama: "Membantu pelaku perampokan (Accessory)", tipe: "cek", pasal: () => [["ACCESSORY", 1]] },

  { id: "gang", kat: "Gang", nama: "Gang related shooting", tipe: "cek", pasal: () => [["GANG", 1]] },
  { id: "driveby", kat: "Gang", nama: "Drive-by shooting (menembak sambil berkendara)", tipe: "cek", pasal: () => [["DRIVEBY", 1]] },
  { id: "crimuse", kat: "Gang", nama: "Menggunakan senjata api (hasil GSR positif)", tipe: "cek", pasal: () => [["CRIMUSE", 1]] },
  { id: "aggbatt", kat: "Gang", nama: "Sengaja menembak polisi", tipe: "cek", pasal: () => [["AGGBATT", 1]] },

  { id: "tamper", kat: "Obstruction", nama: "Menghilangkan/membuang barang bukti saat dikejar", tipe: "cek", pasal: () => [["TAMPER", 1]] },
  { id: "obstruct", kat: "Obstruction", nama: "Menghalangi tugas polisi (non-robbery)", tipe: "cek", pasal: () => [["OBSTRUCT", 1]] },
];

// Pasal tambahan dari total gabungan beberapa evidence (Penal Code: distribution lebih dari 800; smuggling/trafficking sama atau lebih dari 2000/4000)
const TOTAL = q => {
  const narko = (q.sch1 || 0) + (q.sch2 || 0);
  const senjata = (q.fw1 || 0) + (q.fw2 || 0) + (q.fw3 || 0) + (q.govfw || 0);
  const hasil = [];
  if (narko >= 4000) hasil.push(["(6)05", 1, [`Total narkotika ${narko} gram (≥4000)`]]);
  else if (narko >= 2000) hasil.push(["(6)04", 1, [`Total narkotika ${narko} gram (≥2000)`]]);
  else if (narko > 800) hasil.push(["(6)08", 1, [`Total narkotika ${narko} gram (>800)`]]);
  if (senjata > 8) hasil.push(["(7)36", 1, [`Total ${senjata} pucuk senjata (>8)`]]);
  return hasil;
};

// Jenis incident: saran = evidence yang dicentang otomatis; cek = checklist dari handbook Pamanahrasa
const INCIDENT = {
  gang: { nama: "Gang War / Shootout (10-71)", saran: ["gang", "crimuse"], cek: [
    "Lapor 10-71, Code 3 untuk seluruh unit",
    "Unit pertama dilarang menerobos area baku tembak; tunggu di perimeter luar",
    "Bentuk barikade agar sipil tidak masuk kill zone",
    "Setelah mereda: sterilisasi dan search TKP",
    "Suspect tergeletak: evakuasi medis lalu bawa ke Sector A (Alta/MRPD)",
    "Uji GSR dan amankan bukti senjata (Take Evidence) lebih dulu",
    "Foto barang bawaan dan hasil GSR sebelum suspect dibangunkan",
    "Borgol, bacakan Miranda Rights",
    "Input bukti dan charge di MDT sesuai ID incident"] },
  ois: { nama: "Officer Involved Shooting", saran: ["aggbatt", "crimuse"],
    catatan: "Handbook tidak punya SOP khusus OIS; checklist disusun dari item terkait.", cek: [
    "Officer down: 10-13A (tertembak/darurat) atau 10-13B (kecelakaan/pingsan); 10-80 bila tidak bisa merespons",
    "10-52 panggil EMS segera, minta 10-78 backup dan Code 3",
    "Amankan TKP, kumpulkan dan foto barang bukti",
    "GSR test pada suspect dan dokumentasi sebelum suspect dibangunkan",
    "Sengaja menembak polisi: Aggravated Battery to Government Employee + Criminal Usage of Firearm",
    "IC mengawasi keaslian bukti sampai diserahkan ke Alta/MRPD"] },
  robbery: { nama: "Robbery", saran: ["resist"], cek: [
    "10-23 tiba di lokasi, laporkan kondisi dan perkiraan jumlah suspect, bangun containment",
    "Ada sandera: negosiasi dan tunggu IC. Tanpa sandera: breach-in diizinkan",
    "IC ambil alih: panggilan dispatch dan tetapkan saluran TAC sesuai jumlah kendaraan suspect",
    "Suspect kabur berkendara: Prosedur Pursuit, tunjuk Primary dan Secondary",
    "Batas pengejar: 1 kendaraan 4-5 unit, 2 kendaraan 8-10 unit",
    "Cocokkan Robbery Matrix (min polisi, max criminal, weapon class, helikopter)"] },
  pursuit: { nama: "Pursuit (10-57)", saran: ["resist"], cek: [
    "Lapor 10-57 + 10-78; format arah: Action → Arah → Nama Jalan → Info Tambahan",
    "Primary fokus mengemudi tanpa call-out; Secondary jadi navigator radio",
    "PIT hanya atas izin IC/Sersan: lebih dari 10 menit, tanpa sandera hidup, jalan aman",
    "Hot Pursuit bila lebih dari 10 menit atau lompatan tidak logis berulang",
    "Ganti kendaraan, masuk air, atau di lokasi kasus: Impound Sita atas persetujuan IC"] },
  narkoba: { nama: "Narkotika / Suspicious Activity (10-34)", saran: [], cek: [
    "Pantau transaksi, interogasi lisan di tempat, frisk subjek",
    "Suspect kabur: ubah ke 10-57 dan minta 10-78",
    "Sita narkotika dan uang merah, foto bukti, input MDT",
    "Kendaraan terkait narkotika: baca NOTES sebelum release vehicle",
    "Total gram menentukan Possession, Distribution, Smuggling, atau Trafficking"] },
};
