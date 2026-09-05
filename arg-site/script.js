const input = document.querySelector('#code');
const button = document.querySelector('#submit');
const result = document.querySelector('#result');
const answers = {
  'V13-042': 'PORTÃO 01 LIBERADO: O primeiro nome do apresentador era Elias Vale. Próxima pista: カゲ, “kage”, sombra. Código: KAGE-13.',
  'KAGE-13': 'PORTÃO 02 LIBERADO: Elias treinava o sorriso diante de uma câmera desligada. No fundo do documento há uma palavra para luz: نور. Código: NUR-7.',
  'نور-7': 'PORTÃO 03 LIBERADO: A Hora de Ficar editava memórias de convidados. نور também pode ser digitado como NUR. Próxima pista: ミズ, “mizu”, água. Código: MIZU-404.',
  'NUR-7': 'PORTÃO 03 LIBERADO: A Hora de Ficar editava memórias de convidados. Próxima pista: ミズ, “mizu”, água. Código: MIZU-404.',
  'ミズ-404': 'PORTÃO 04 LIBERADO: A última gravação de Elias termina antes do aplauso. Código final: VALE-0.',
  'MIZU-404': 'PORTÃO 04 LIBERADO: A última gravação de Elias termina antes do aplauso. Código final: VALE-0.',
  'VALE-0': 'PORTÃO 05 — ESCUTA: O relatório descreve a Síndrome do Apresentador Infinito, um termo ficcional. A última linha não foi escrita pelo neuropsicólogo: “O Intervalo está acordado.”'
};
const gateCodes = [['V13-042'],['KAGE-13'],['NUR-7','نور-7'],['MIZU-404','ミズ-404'],['VALE-0']];
const seen = JSON.parse(localStorage.getItem('vale-gates') || '[]');
function updateMap() { document.querySelector('#progress').textContent = `${seen.length} / 5 portões`; document.querySelectorAll('[data-gate]').forEach(el => el.classList.toggle('unlocked', seen.includes(Number(el.dataset.gate)))); }
function unlock() {
  const raw = input.value.trim();
  const value = raw.toUpperCase();
  result.textContent = answers[value] || 'CÓDIGO RECUSADO. A transmissão repete apenas o que você já viu.';
  const gate = gateCodes.findIndex(codes => codes.some(code => code.toUpperCase() === value)) + 1;
  if (gate && !seen.includes(gate)) { seen.push(gate); localStorage.setItem('vale-gates', JSON.stringify(seen)); updateMap(); }
}
button.addEventListener('click', unlock);
input.addEventListener('keydown', (event) => { if (event.key === 'Enter') unlock(); });
updateMap();

