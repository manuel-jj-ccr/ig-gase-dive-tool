let isPro = false;

document.getElementById('modeToggle').addEventListener('click', () => {
  isPro = !isPro;
  alert(`Du bist jetzt im ${isPro ? 'Pro' : 'Basic'} Modus`);
});

function showCalculator(type) {
  if (type === 'mod') {
    document.getElementById('calculatorArea').innerHTML = `
      <h3>MOD / END / EAD Rechner</h3>
      <p>Sauerstoffanteil (%)</p>
      <input type="number" id="o2" value="32">
      <p>Tiefe (m)</p>
      <input type="number" id="depth" value="30">
      <br><br>
      <button onclick="calcMOD()">Berechnen</button>
      <div id="result"></div>
      <div class="tooltip">MOD = Maximale Tiefe | END = Equivalent Narcotic Depth | EAD = Equivalent Air Depth</div>
    `;
  }
}

function calcMOD() {
  let o2 = parseFloat(document.getElementById('o2').value) / 100;
  let depth = parseFloat(document.getElementById('depth').value);
  let ppO2Max = 1.4;
  let mod = ((ppO2Max / o2) - 1) * 10;
  let end = (depth + 10) * (1 - o2) / 0.79 - 10;
  let ead = end; 

  document.getElementById('result').innerHTML = `
    <p>MOD: ${mod.toFixed(1)} m</p>
    <p>END: ${end.toFixed(1)} m</p>
    <p>EAD: ${ead.toFixed(1)} m</p>
  `;
}
