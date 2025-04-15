function mixGas() {
  const volume = parseFloat(document.getElementById('volume').value);
  const startP = parseFloat(document.getElementById('startPressure').value);
  const startO2 = parseFloat(document.getElementById('startO2').value) / 100;
  const startHe = parseFloat(document.getElementById('startHe').value) / 100;
  const targetP = parseFloat(document.getElementById('targetPressure').value);
  const targetO2 = parseFloat(document.getElementById('targetO2').value) / 100;
  const targetHe = parseFloat(document.getElementById('targetHe').value) / 100;

  const startN2 = 1 - startO2 - startHe;
  const targetN2 = 1 - targetO2 - targetHe;

  const addP = targetP - startP;
  const o2Bar = (targetO2 * targetP) - (startO2 * startP);
  const heBar = (targetHe * targetP) - (startHe * startP);
  const airBar = addP - o2Bar - heBar;

  if (o2Bar < 0 || heBar < 0 || airBar < 0) {
    document.getElementById('result').innerHTML = `<p style="color:red;">Achtung: Ziel-Mix mit vorhandenem Restgas nicht erreichbar!</p>`;
    return;
  }

  document.getElementById('result').innerHTML = `
    <h3>Mischplan:</h3>
    <p>Sauerstoff: ${o2Bar.toFixed(1)} bar</p>
    <p>Helium: ${heBar.toFixed(1)} bar</p>
    <p>Luft: ${airBar.toFixed(1)} bar (Rest mit Air toppen)</p>
  `;
}
