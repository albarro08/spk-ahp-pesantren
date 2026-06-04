exports.calculateAHP = (kriteria, perbandingan) => {

  const n = kriteria.length;

  if (n === 0) {
    return {
      matrix: [],
      normalisasi: [],
      bobot: [],
      lambdaMax: 0,
      ci: 0,
      cr: 0,
      ranking: [],
      status: 'Belum Ada Data'
    };
  }

  // Matriks awal
  const matrix = Array.from(
    { length: n },
    () => Array(n).fill(1)
  );

  // Isi matriks dari data perbandingan
  perbandingan.forEach(p => {

    const i = kriteria.findIndex(
      k => Number(k.id) === Number(p.kriteria1)
    );

    const j = kriteria.findIndex(
      k => Number(k.id) === Number(p.kriteria2)
    );

    // Lewati jika kriteria tidak ditemukan
    if (i === -1 || j === -1) {
      console.log(
        'Data perbandingan tidak valid:',
        p
      );
      return;
    }

    const nilai = Number(p.nilai);

    if (nilai > 0) {

      matrix[i][j] = nilai;
      matrix[j][i] = 1 / nilai;

    }

  });

  // Total kolom
  const totalKolom = [];

  for (let j = 0; j < n; j++) {

    let total = 0;

    for (let i = 0; i < n; i++) {

      total += matrix[i][j];

    }

    totalKolom.push(total);

  }

  // Normalisasi
  const normalisasi = [];

  for (let i = 0; i < n; i++) {

    normalisasi[i] = [];

    for (let j = 0; j < n; j++) {

      normalisasi[i][j] =
        matrix[i][j] / totalKolom[j];

    }

  }

  // Bobot prioritas
  const bobot = [];

  for (let i = 0; i < n; i++) {

    const total =
      normalisasi[i].reduce(
        (a, b) => a + b,
        0
      );

    bobot.push(total / n);

  }

  // Lambda Max
  let lambdaMax = 0;

  for (let i = 0; i < n; i++) {

    lambdaMax +=
      totalKolom[i] * bobot[i];

  }

  // CI
  const ci =
    n > 1
      ? (lambdaMax - n) / (n - 1)
      : 0;

  // RI
  const riTable = {
    1: 0,
    2: 0,
    3: 0.58,
    4: 0.90,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49
  };

  const ri =
    riTable[n] || 1.49;

  const cr =
    ri === 0
      ? 0
      : ci / ri;

  // Ranking
  const ranking = kriteria.map(
    (k, i) => ({
      id: k.id,
      nama: k.nama || k.nama_kriteria,
      bobot: bobot[i]
    })
  );

  ranking.sort(
    (a, b) => b.bobot - a.bobot
  );

  return {

    matrix,
    normalisasi,
    bobot,
    lambdaMax,
    ci,
    cr,
    ranking,

    status:
      cr < 0.1
        ? 'Konsisten'
        : 'Tidak Konsisten'

  };

};