function showSection(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function calcMOD() {
  const o2 = parseFloat(document.getElementById('o2').value) / 100;
  const he = parseFloat(document.getElementById('he').value) / 100;
  const depth = parseFloat(document.getElementById('depth').value);
  const ppo2 = parseFloat(document.getElementById('ppo2').value);

  const n2 = 1 - o2 - he;
  const mod = ((ppo2 / o2) - 1) * 10;

  let label = "", narc = 0;

  if (he === 0) {
    narc = ((depth + 10) * (1 - o2) / 0.79) - 10;
    label = "EAD";
    document.getElementById("infoMOD").innerText = "Nitrox erkannt – narkotische Tiefe bezogen auf Luft (EAD).";
  } else {
    narc = ((depth + 10) * n2) - 10;
    label = "END";
    document.getElementById("infoMOD").innerText = "Helium reduziert die narkotische Tiefe. Je mehr He, desto klarer der Kopf – aber auch teurer ;)";
  }

  document.getElementById("resultMOD").innerHTML = `
    <p>MOD: ${mod.toFixed(1)} m</p>
    <p>${label}: ${narc.toFixed(1)} m</p>
  `;
}

function mixGas() {
  const startP = parseFloat(document.getElementById('startP').value);
  const startO2 = parseFloat(document.getElementById('startO2').value) / 100;
  const startHe = parseFloat(document.getElementById('startHe').value) / 100;

  const targetP = parseFloat(document.getElementById('targetP').value);
  const targetO2 = parseFloat(document.getElementById('targetO2').value) / 100;
  const targetHe = parseFloat(document.getElementById('targetHe').value) / 100;

  const deltaP = targetP - startP;
  const o2Bar = (targetO2 * targetP) - (startO2 * startP);
  const heBar = (targetHe * targetP) - (startHe * startP);
  const airBar = deltaP - o2Bar - heBar;

  if (o2Bar < 0 || heBar < 0 || airBar < 0 || (targetO2 + targetHe) > 1.0) {
    document.getElementById("resultMix").innerHTML = `<p style="color:red;">Achtung: Zielmix nicht erreichbar mit vorhandenem Restgas!</p>`;
    return;
  }

  document.getElementById("resultMix").innerHTML = `
    <h3>Mischplan:</h3>
    <p>O₂: ${o2Bar.toFixed(1)} bar</p>
    <p>He: ${heBar.toFixed(1)} bar</p>
    <p>Air: ${airBar.toFixed(1)} bar (Rest toppen)</p>
  `;
}
