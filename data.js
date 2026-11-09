// Sumber utama: ucup-meletup.site (penal code, fine/sentence, panduan pasal kasus)
const SATUAN_SENTENCE = "bulan";

// cv: true = Court Verdict (tidak masuk total fine/sentence)
const PASAL = {
  "(1)10": { nama: "Gang Related Shooting", fine: 30000, sentence: 30 },
  "(1)13": { nama: "Attempted Murder of Government Employee", fine: 160000, sentence: 80 },
  "(1)24": { nama: "Hostages", fine: 3000, sentence: 20, catatan: "1–2 sandera" },
  "(1)25": { nama: "Aggravated Hostages", fine: 20000, sentence: 35, catatan: "3 sandera atau lebih" },
  "(1)26": { nama: "Hostage Taking of Government Employees Category 1", cv: true },
  "(1)27": { nama: "Hostage Taking of Government Employees Category 2", fine: 120000, sentence: 100 },
  "(1)28": { nama: "Hostage Taking of Government Employees Category 3", fine: 100000, sentence: 80 },
  "(1)29": { nama: "Aggravated Hostage Taking of Government Employees", cv: true },
  "(1)30": { nama: "Kidnapping", fine: 15000, sentence: 14 },
  "(1)31": { nama: "Kidnapping of a Government Employee", fine: 45000, sentence: 25 },
  "(1)32": { nama: "Aggravated Battery of a Government Employee", fine: 90000, sentence: 45 },
  "(3)08": { nama: "Commercial Robbery", fine: 8000, sentence: 20 },
  "(3)10": { nama: "Possession of Stolen Goods", fine: 3500, sentence: 15 },
  "(3)11": { nama: "Possession of a Stolen Identification", fine: 7000, sentence: 5 },
  "(3)12": { nama: "Grand Larceny Federal Reserve Banks", fine: 50000, sentence: 50 },
  "(3)13": { nama: "Grand Larceny Public Reserve Banks (Fleeca)", fine: 20000, sentence: 20 },
  "(3)14": { nama: "Grand Larceny Major Property Crime", fine: 20000, sentence: 30 },
  "(3)17": { nama: "Burglary", fine: 8000, sentence: 15 },
  "(3)26": { nama: "Robbery of Vangelico Property", fine: 20000, sentence: 25 },
  "(3)27": { nama: "Accessory to Robbery", fine: 5000, sentence: 10, catatan: "Khusus kasus Robbery" },
  "(3)28": { nama: "ATM Robbery", fine: 1700, sentence: 15 },
  "(3)31": { nama: "Importation or Exportation of Stolen and Uncustomed Vehicles", fine: 50000, sentence: 40 },
  "(4)08": { nama: "Money Laundering", cv: true },
  "(4)09": { nama: "First Degree Possession of Illegal Money", cv: true },
  "(4)17A": { nama: "Evidence Tampering", fine: 30000, sentence: 20, catatan: "Perlu indikasi kuat disengaja; (4)17B adalah versi Court Verdict" },
  "(4)20": { nama: "Obstruction of Public Duty", fine: 12000, sentence: 20, catatan: "Untuk kasus selain Robbery" },
  "(4)32": { nama: "Second Degree Possession of Illegal Money", fine: 60000, sentence: 70 },
  "(4)33": { nama: "Third Degree Possession of Illegal Money", fine: 35000, sentence: 50 },
  "(4)34": { nama: "Unlawful Possession of State Insignia", fine: 32000, sentence: 12 },
  "(4)35": { nama: "Minor Possession of Illegal Money", fine: 15000, sentence: 10 },
  "(4)36": { nama: "Third Degree Possession of Illegal Laundry Card", fine: 30000, sentence: 20 },
  "(4)37": { nama: "Second Degree Possession of Illegal Laundry Card", fine: 60000, sentence: 30 },
  "(4)38": { nama: "First Degree Possession of Illegal Laundry Card", cv: true },
  "(5)06": { nama: "Evading a Peace Officer", fine: 2500, sentence: 6 },
  "(5)07": { nama: "Resisting Arrest", fine: 1500, sentence: 5 },
  "(6)00": { nama: "Misdemeanor Possession of Schedule I Controlled Substances", fine: 2000, sentence: 15 },
  "(6)01": { nama: "Felony Possession of Schedule I Controlled Substances", fine: 3000, sentence: 20 },
  "(6)02": { nama: "Misdemeanor Possession of Schedule II Controlled Substances", fine: 5000, sentence: 35 },
  "(6)03": { nama: "Felony Possession of Schedule II Controlled Substances", fine: 10000, sentence: 50 },
  "(6)04": { nama: "Drug Smuggling", fine: 50000, sentence: 130 },
  "(6)05": { nama: "Drug Trafficking", cv: true },
  "(6)06": { nama: "Drug Manufacturing", cv: true },
  "(6)07A": { nama: "Possession of Drug Paraphernalia", fine: 20000, sentence: 50 },
  "(6)07B": { nama: "Possession of Drug Paraphernalia (11 item ke atas)", cv: true },
  "(6)08": { nama: "Distribution of a Controlled Substance", fine: 20000, sentence: 100 },
  "(6)09": { nama: "Drugs Selling", fine: 5000, sentence: 15 },
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
  "(7)15": { nama: "Criminal Use of a Firearm", fine: 1500, sentence: 8, catatan: "Wajib uji GSR" },
  "(7)16": { nama: "Brandishing of a Firearm", fine: 4500, sentence: 7 },
  "(7)19": { nama: "Unlawful Possession of Ammunition", fine: 345, sentence: 5 },
  "(7)20": { nama: "Illegal Distribution of Ammunition", fine: 1460, sentence: 12 },
  "(7)36": { nama: "Weapon Smuggling", cv: true, catatan: "Dasar: lebih dari 8 pucuk senjata" },
  "(7)42": { nama: "Drive-by Shooting", fine: 1250, sentence: 15 },
  "(7)43": { nama: "Misdemeanor Possession of Bulletproof Vest", fine: 3280, sentence: 25 },
  "(7)44": { nama: "Felony Possession of Bulletproof Vest", cv: true },
  "(7)45": { nama: "Misdemeanor Unlawful Possession of Weapon Component", fine: 5000, sentence: 25 },
  "(7)46": { nama: "Felony Unlawful Possession of Weapon Component", fine: 7000, sentence: 30 },
  "(7)48": { nama: "Ammunition Smuggling", cv: true },
  "(7)49": { nama: "Usage of Suppressor", fine: 5000, sentence: 20 },
  "(8)08": { nama: "Reckless Evading of a Peace Officer", fine: 1000, sentence: 14 },
  "(8)31": { nama: "Possession of Nitrous Oxide", fine: 2500, sentence: 20 },
  "(8)33": { nama: "Unlawful Possession of an Illegal Racing Device", fine: 3570, sentence: 20 },
};

// tier(satuan, [[batasAtas inklusif, idPasal|null, label], ...], [nilaiTepatYangAmbigu])
// pasal(q) mengembalikan [[idPasal, jumlahStack, [keterangan]], ...]
const tier = (satuan, tiers, ambigu = []) => ({ tiers, ambigu, pasal: q => {
  const i = tiers.findIndex(([m]) => q <= m), [m, id, lbl] = tiers[i];
  if (!id) return [];
  const ket = [`Tingkat: ${lbl}`];
  if (isFinite(m)) ket.push(`${(m + 1 - q).toLocaleString("id-ID")} ${satuan} lagi → ${tiers[i + 1][2]}`);
  if (ambigu.includes(q)) ket.push(`Tepat ${q.toLocaleString("id-ID")} ${satuan}: handbook berbeda, konfirmasi ke IC`);
  return [[id, 1, ket]];
} });
const stack = id => q => [[id, q]];
const cek = (...ids) => () => ids.map(id => [id, 1]);
const jenis = (id, nama, ...kode) => ({ id: "j-" + id, kat: "Jenis kejahatan", nama, tipe: "cek", utama: true, pasal: cek(...kode) });

const SCH1 = tier("gram", [[60, "(6)00", "Misdemeanor"], [Infinity, "(6)01", "Felony"]]);
const SCH2 = tier("gram", [[100, "(6)02", "Misdemeanor"], [Infinity, "(6)03", "Felony"]]);

const EVIDENCE = [
  jenis("ltd", "Perampokan warung / LTD", "(3)08"),
  jenis("atm", "Perampokan ATM", "(3)28"),
  jenis("rumah", "Perampokan rumah (Burglary)", "(3)17"),
  jenis("jewel", "Perampokan Vangelico (perhiasan)", "(3)26"),
  jenis("fleeca", "Perampokan Fleeca Bank", "(3)13"),
  jenis("laundromat", "Perampokan Laundromat", "(3)14"),
  jenis("bobcat", "Perampokan Bobcat", "(3)14"),
  jenis("container", "Perampokan Container", "(3)14"),
  jenis("cashex", "Perampokan Cash Exchange", "(3)14"),
  jenis("bankbesar", "Perampokan bank besar (Pacific / Maze / Paleto / Roxwood)", "(3)12"),
  jenis("boost", "Vehicle boosting (kendaraan curian impor/ekspor)", "(3)31"),
  jenis("pencucian", "Pencucian uang", "(4)08"),
  jenis("culik", "Penculikan warga", "(1)30"),
  jenis("culikgov", "Penculikan pegawai pemerintah", "(1)31"),
  jenis("sandergov3", "Menyandera pegawai pemerintah Level 3 (biasa)", "(1)28"),
  jenis("sandergov2", "Menyandera pegawai pemerintah Level 2 (petinggi)", "(1)27"),
  jenis("sandergov1", "Menyandera pegawai pemerintah Level 1 (ketua)", "(1)26"),
  jenis("sandergovx", "Menyandera pegawai pemerintah diperberat (3 orang ke atas)", "(1)29"),
  jenis("jual", "Penjualan narkotika", "(6)09"),
  jenis("produksi", "Produksi narkotika", "(6)06"),
  jenis("gang", "Gang war (gang vs gang)", "(1)10"),
  jenis("tembakofficer", "Menembak officer (10-13A)", "(1)32"),
  jenis("bunuhofficer", "Mencoba membunuh officer", "(1)13"),
  jenis("evade", "Kabur dari polisi (Evading)", "(5)06"),
  jenis("recevade", "Kabur ugal-ugalan (Reckless Evading)", "(8)08"),

  // Weed + Opium dijumlah (Schedule I); Meth + Cocaine dijumlah (Schedule II). Pasalnya dihitung di TOTAL.
  { id: "weed", kat: "Narkotika", nama: "Weed Bag", satuan: "gram", info: "Schedule I: Misdemeanor sampai 60 g, Felony mulai 61 g", pasal: () => [] },
  { id: "opium", kat: "Narkotika", nama: "Opium Bag", satuan: "gram", info: "Schedule I: dijumlah dengan weed", pasal: () => [] },
  { id: "meth", kat: "Narkotika", nama: "Meth Bag", satuan: "gram", info: "Schedule II: Misdemeanor sampai 100 g, Felony mulai 101 g", pasal: () => [] },
  { id: "cocaine", kat: "Narkotika", nama: "Cocaine", satuan: "gram", info: "Schedule II: dijumlah dengan meth", pasal: () => [] },
  { id: "para", kat: "Narkotika", nama: "Alat produksi narkotika (Meth Oven/Table, Bagging Table, Baggy, Planting Pot, Seed, Weed, Phos, Pseudo, Acid, Liquid Meth, Meth)", satuan: "item",
    ...tier("item", [[10, "(6)07A", "10 item atau kurang"], [Infinity, "(6)07B", "11 item ke atas"]], [10]) },
  { id: "poppy", kat: "Narkotika", nama: "Tanaman poppy", satuan: "kg",
    ...tier("kg", [[100, null, "Tanpa charge"], [199, "(6)10", "Unlawful"], [300, "(6)11", "Felony"], [Infinity, "(6)12", "Aggravated"]]) },

  { id: "brandish", kat: "Senjata & Amunisi", nama: "Brandishing senjata api (mengacungkan di depan umum)", tipe: "cek", pasal: cek("(7)16") },
  { id: "suppress", kat: "Senjata & Amunisi", nama: "Menggunakan suppressor", tipe: "cek", pasal: cek("(7)49") },
  { id: "fw1", kat: "Senjata & Amunisi", nama: "Firearm Class 1 (Pistol .50, Ceramic Pistol, X17, Machine Pistol, dll.)", satuan: "pucuk", pasal: stack("(7)03") },
  { id: "fw2", kat: "Senjata & Amunisi", nama: "Firearm Class 2 (SMG, Micro SMG, Pump Shotgun, Sawn Off, Navy Revolver, dll.)", satuan: "pucuk", pasal: stack("(7)04") },
  { id: "fw3", kat: "Senjata & Amunisi", nama: "Firearm Class 3 (Assault Rifle, Carbine, AK47, dll.)", satuan: "pucuk", pasal: stack("(7)05") },
  { id: "govfw", kat: "Senjata & Amunisi", nama: "Senjata api milik pemerintah/LEO", satuan: "pucuk", pasal: stack("(7)06") },
  { id: "baton", kat: "Senjata & Amunisi", nama: "Baton milik pemerintah", satuan: "buah", pasal: stack("(7)07") },
  { id: "taser", kat: "Senjata & Amunisi", nama: "Taser milik pemerintah", satuan: "buah", pasal: stack("(7)08") },
  { id: "ammo", kat: "Senjata & Amunisi", nama: "Amunisi (total semua jenis)", satuan: "butir",
    ...tier("butir", [[300, "(7)19", "Unlawful Possession"], [2000, "(7)20", "Distribution"], [Infinity, "(7)48", "Smuggling"]], [300, 2000]) },
  { id: "vest", kat: "Senjata & Amunisi", nama: "Bulletproof vest", satuan: "buah",
    ...tier("buah", [[10, "(7)43", "Misdemeanor"], [Infinity, "(7)44", "Felony"]], [10]) },
  { id: "comp", kat: "Senjata & Amunisi", nama: "Komponen senjata", satuan: "unit",
    ...tier("unit", [[20, "(7)45", "Misdemeanor"], [Infinity, "(7)46", "Felony"]], [20]) },
  { id: "destr", kat: "Senjata & Amunisi", nama: "Destructive device (bom pipa, granat, dll.)", satuan: "unit", pasal: stack("(7)10") },

  { id: "money", kat: "Uang & Barang", nama: "Uang merah (illegal money)", satuan: "$",
    ...tier("$", [[50000, "(4)35", "Minor"], [149999, "(4)33", "Third Degree"], [399999, "(4)32", "Second Degree"], [Infinity, "(4)09", "First Degree"]], [50000, 150000, 400000]) },
  { id: "laundry", kat: "Uang & Barang", nama: "Kartu laundry ilegal", satuan: "kartu",
    ...tier("kartu", [[10, "(4)36", "Third Degree"], [39, "(4)37", "Second Degree"], [Infinity, "(4)38", "First Degree"]], [40]) },
  { id: "stolen", kat: "Uang & Barang", nama: "Barang curian / hasil rampokan (uang merah TIDAK dihitung di sini)", satuan: "jenis", pasal: stack("(3)10") },
  { id: "stolenid", kat: "Uang & Barang", nama: "ID curian", satuan: "buah", pasal: stack("(3)11") },
  { id: "insignia", kat: "Uang & Barang", nama: "Lencana/seragam/ID aparat tanpa hak", satuan: "buah", pasal: stack("(4)34") },
  { id: "hack", kat: "Uang & Barang", nama: "Hacking device (Lockpick, Green Card, dll.)", satuan: "buah", pasal: stack("(7)09") },

  { id: "nos", kat: "Kendaraan", nama: "Nitrous oxide", satuan: "tabung", pasal: stack("(8)31") },
  { id: "race", kat: "Kendaraan", nama: "Perangkat balap ilegal (pembatas kecepatan dilepas, dll.)", satuan: "buah", pasal: stack("(8)33") },

  { id: "host", kat: "Sandera & Perlawanan", nama: "Sandera warga", satuan: "orang", pasal: q => [[q <= 2 ? "(1)24" : "(1)25", 1]] },
  { id: "resist", kat: "Sandera & Perlawanan", nama: "Resisting Arrest (kabur membawa mobil)", tipe: "cek", pasal: cek("(5)07") },
  { id: "accessory", kat: "Sandera & Perlawanan", nama: "Membantu pelaku perampokan (Accessory)", tipe: "cek", pasal: cek("(3)27") },
  { id: "driveby", kat: "Sandera & Perlawanan", nama: "Drive-by shooting (menembak sambil berkendara)", tipe: "cek", pasal: cek("(7)42") },
  { id: "crimuse", kat: "Sandera & Perlawanan", nama: "Menggunakan senjata api (hasil GSR positif)", tipe: "cek", pasal: cek("(7)15") },
  { id: "tamper", kat: "Sandera & Perlawanan", nama: "Menghilangkan/membuang barang bukti saat dikejar", tipe: "cek", pasal: cek("(4)17A") },
  { id: "obstruct", kat: "Sandera & Perlawanan", nama: "Menghalangi tugas polisi (non-robbery)", tipe: "cek", pasal: cek("(4)20") },
];

// Pasal dari total gabungan. Narkotika: total 800 g ke atas menggantikan pasal possession per schedule.
const TOTAL = q => {
  const s1 = (q.weed || 0) + (q.opium || 0), s2 = (q.meth || 0) + (q.cocaine || 0), narko = s1 + s2;
  const senjata = (q.fw1 || 0) + (q.fw2 || 0) + (q.fw3 || 0) + (q.govfw || 0);
  const hasil = [];
  if (narko >= 4000) hasil.push(["(6)05", 1, [`Total narkotika ${narko} gram (4000 ke atas)`]]);
  else if (narko >= 2000) hasil.push(["(6)04", 1, [`Total narkotika ${narko} gram (2000 ke atas)`]]);
  else if (narko >= 800) hasil.push(["(6)08", 1, [`Total narkotika ${narko} gram (800 ke atas)`, ...(narko === 800 ? ["Tepat 800 gram: teks pasal menulis di atas 800, panduan kasus 800 ke atas. Konfirmasi ke IC"] : [])]]);
  else {
    [[s1, SCH1], [s2, SCH2]].forEach(([n, t]) => n > 0 && t.pasal(n).forEach(x => hasil.push(x)));
  }
  if (senjata > 8) hasil.push(["(7)36", 1, [`Total ${senjata} pucuk senjata (lebih dari 8)`]]);
  return hasil;
};
