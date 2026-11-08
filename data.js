// Sumber: Penal Code ucup-meletup.site (fine/sentence) + Penal Code Quick Reference pamanahrasa.github.io/lspdnote (ambang jumlah)
const SATUAN_SENTENCE = "bulan";

// cv: true = Court Verdict (tidak masuk total fine/sentence)
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
};

// pasal(q) mengembalikan [[idPasal, jumlahStack], ...] untuk jumlah q yang ditemukan
const pilih = (q, tingkat) => [[tingkat.find(([maks]) => q <= maks)[1], 1]];
const stack = id => q => [[id, q]];

const EVIDENCE = [
  { id: "sch1", kat: "Narkotika", nama: "Schedule I (Weed Bag, Opium Bag)", satuan: "gram",
    pasal: q => pilih(q, [[60, "(6)00"], [Infinity, "(6)01"]]) },
  { id: "sch2", kat: "Narkotika", nama: "Schedule II (Meth Bag, Cocaine)", satuan: "gram",
    pasal: q => pilih(q, [[100, "(6)02"], [Infinity, "(6)03"]]) },
  { id: "para", kat: "Narkotika", nama: "Alat produksi narkotika (Meth Oven/Table, Bagging Table, Baggy, Planting Pot, Seed, Weed, Phos, Pseudo, Acid, Liquid Meth, Meth)", satuan: "item",
    pasal: q => pilih(q, [[9, "(6)07A"], [Infinity, "(6)07B"]]) },
  { id: "poppy", kat: "Narkotika", nama: "Tanaman poppy", satuan: "kg",
    pasal: q => q <= 100 ? [] : pilih(q, [[199, "(6)10"], [300, "(6)11"], [Infinity, "(6)12"]]) },

  { id: "fw1", kat: "Senjata & Amunisi", nama: "Firearm Class 1 (Pistol .50, Ceramic Pistol, X17, Machine Pistol, dll.)", satuan: "pucuk", pasal: stack("(7)03") },
  { id: "fw2", kat: "Senjata & Amunisi", nama: "Firearm Class 2 (SMG, Micro SMG, Pump Shotgun, Sawn Off, Navy Revolver, dll.)", satuan: "pucuk", pasal: stack("(7)04") },
  { id: "fw3", kat: "Senjata & Amunisi", nama: "Firearm Class 3 (Assault Rifle, Carbine, AK47, dll.)", satuan: "pucuk", pasal: stack("(7)05") },
  { id: "govfw", kat: "Senjata & Amunisi", nama: "Senjata api milik pemerintah/LEO", satuan: "pucuk", pasal: stack("(7)06") },
  { id: "baton", kat: "Senjata & Amunisi", nama: "Baton milik pemerintah", satuan: "buah", pasal: stack("(7)07") },
  { id: "taser", kat: "Senjata & Amunisi", nama: "Taser milik pemerintah", satuan: "buah", pasal: stack("(7)08") },
  { id: "ammo", kat: "Senjata & Amunisi", nama: "Amunisi (total semua jenis)", satuan: "butir",
    pasal: q => pilih(q, [[300, "(7)19"], [2000, "(7)20"], [Infinity, "(7)48"]]) },
  { id: "vest", kat: "Senjata & Amunisi", nama: "Bulletproof vest", satuan: "buah",
    pasal: q => pilih(q, [[9, "(7)43"], [Infinity, "(7)44"]]) },
  { id: "comp", kat: "Senjata & Amunisi", nama: "Komponen senjata", satuan: "unit",
    pasal: q => pilih(q, [[19, "(7)45"], [Infinity, "(7)46"]]) },
  { id: "destr", kat: "Senjata & Amunisi", nama: "Destructive device (bom pipa, granat, dll.)", satuan: "unit", pasal: stack("(7)10") },

  { id: "money", kat: "Uang & Barang", nama: "Uang merah (illegal money)", satuan: "$",
    pasal: q => pilih(q, [[49999, "(4)35"], [149999, "(4)33"], [399999, "(4)32"], [Infinity, "(4)09"]]) },
  { id: "laundry", kat: "Uang & Barang", nama: "Kartu laundry ilegal", satuan: "kartu",
    pasal: q => pilih(q, [[10, "(4)36"], [39, "(4)37"], [Infinity, "(4)38"]]) },
  { id: "stolen", kat: "Uang & Barang", nama: "Barang curian / hasil rampokan (bukan uang merah)", satuan: "jenis", pasal: stack("(3)10") },
  { id: "stolenid", kat: "Uang & Barang", nama: "ID curian", satuan: "buah", pasal: stack("(3)11") },
  { id: "insignia", kat: "Uang & Barang", nama: "Lencana/seragam/ID aparat tanpa hak", satuan: "buah", pasal: stack("(4)34") },
  { id: "hack", kat: "Uang & Barang", nama: "Hacking device (Lockpick, Green Card, dll.)", satuan: "buah", pasal: stack("(7)09") },

  { id: "nos", kat: "Kendaraan", nama: "Nitrous oxide", satuan: "tabung", pasal: stack("(8)31") },
  { id: "race", kat: "Kendaraan", nama: "Perangkat balap ilegal (pembatas kecepatan dilepas, dll.)", satuan: "buah", pasal: stack("(8)33") },
];

// Pasal tambahan dari total gabungan beberapa evidence
const TOTAL = q => {
  const narko = (q.sch1 || 0) + (q.sch2 || 0);
  const senjata = (q.fw1 || 0) + (q.fw2 || 0) + (q.fw3 || 0) + (q.govfw || 0);
  const hasil = [];
  if (narko >= 4000) hasil.push(["(6)05", 1]);
  else if (narko >= 2000) hasil.push(["(6)04", 1]);
  else if (narko > 800) hasil.push(["(6)08", 1]);
  if (senjata > 8) hasil.push(["(7)36", 1]);
  return hasil;
};
