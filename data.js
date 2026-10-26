// Adaptasi tabel relasi penyakit-gejala dari artikel Nofriansyah dkk. (2020).
// Representasi biner untuk tugas CBR; bukan 34 rekam pasien asli jurnal.
window.CBR_DATA = Object.freeze({
  symptoms: [
    ['G1','Hidung meler'],['G2','Bersin-bersin'],['G3','Demam serta merasa pengap'],
    ['G4','Batuk keras dengan tarikan napas awal yang panjang melalui mulut'],
    ['G5','Terdengar seperti mau muntah'],['G6','Mata merah dan berair'],
    ['G7','Wajah berwarna merah atau biru'],['G8','Kelelahan ekstrem'],
    ['G9','Suara tinggi melengking saat menarik napas']
  ],
  cases: [
    {code:'P01',name:'Pertussis Ringan',vector:[1,1,1,1,0,0,0,0,0],note:'G1, G2, G3, G4'},
    {code:'P02',name:'Pertussis Akut',vector:[0,0,1,1,1,1,0,0,0],note:'G3, G4, G5, G6'},
    {code:'P03',name:'Pertussis Subakut/Kronis',vector:[0,0,0,1,0,0,1,1,1],note:'G4, G7, G8, G9'}
  ],
  example: [0,0,1,1,1,0,0,1,0]
});
