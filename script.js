let isPro = false;

document.getElementById('modeToggle').addEventListener('click', () => {
  isPro = !isPro;
  alert(`Du bist jetzt im ${isPro ? 'Pro' : 'Basic'} Modus`);
});

function showCalculator() {
  document.getElementById('calculatorArea').innerHTML = `
    <h3>MOD / END / EAD Rechner</h3>
    <label>Sauerstoffanteil (O₂) %<br>
      <input type="number" id="o2" value="21" min="1" max="100">
    </label><br>
    <label>Heliumanteil (He) %<br>
      <input type="number" id="he" value="0" min="0" max="100">
    </label><br>
    <label>Tiefe (m)<br>
      <input type="number" id="depth" value="30" min="0">
    </label><br>
    <label>Wunsch-ppO₂<br>
      <input type="number" id="ppo2" value="1.4" step="0.1" min="0.5" max="1.6">
    </label><br><br>
    <button onclick="calcMOD()">Berechnen</button>
    <div id="result"></div>
    <div class="tooltip" id="infoText"></div>
  `;
}

function calcMOD() {
  const o2 = parseFloat(document.getElementById('o2').value) / 100;
  const he = parseFloat(document.getElementById('he').value) / 100;
  const depth = parseFloat(document.getElementById('depth').value);
  const ppo2 = parseFloat(document.getElementById('ppo2').value);

  const n2 = 1 - o2 - he;

  // MOD-Berechnung
  const mod = ((ppo2 / o2) - 1) * 10;

  // END- oder EAD-Berechnung
  let narcoticDepth = 0;
  let label = "";

  if (he === 0) {
    // Nitrox → EAD
    narcoticDepth = ((depth + 10) * (1 - o2) / 0.79) - 10;
    label = "EAD";
    document.getElementById("infoText").innerText = "Nitrox erkannt – narkotische Tiefe bezogen auf Luft (EAD).";
  } else {
    // Trimix → END
    narcoticDepth = ((depth + 10) * n2) - 10;
    label = "END";
    document.getElementById("infoText").innerText = "Helium reduziert die narkotische Tiefe. Je mehr He, desto klarer der Kopf – aber auch teurer ;)";
  }

  document.getElementById("result").innerHTML = `
    <p>MOD: ${mod.toFixed(1)} m</p>
    <p>${label}: ${narcoticDepth.toFixed(1)} m</p>
  `;
}
