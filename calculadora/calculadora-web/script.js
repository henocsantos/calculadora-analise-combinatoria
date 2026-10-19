// Gerenciamento de Tecla ENTER em todos os campos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const card = input.closest(".card");
        const btn = card.querySelector("button.calc-btn");
        if (btn) btn.click();
      }
    });
  });
});

// Alternar abas
function trocarAba(event, abaId) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  event.currentTarget.classList.add("active");
  document.getElementById(abaId).classList.add("active");
}

// Toggle de exibição do passo a passo
function alternarExibicaoPassos() {
  const ativo = document.getElementById("togglePassos").checked;
  document.querySelectorAll(".passo-box").forEach((box) => {
    if (ativo && box.innerHTML.trim() !== "") {
      box.classList.add("mostrar");
    } else {
      box.classList.remove("mostrar");
    }
  });
}

function exibirPasso(elementoId, htmlConteudo) {
  const box = document.getElementById(elementoId);
  box.innerHTML = htmlConteudo;
  if (document.getElementById("togglePassos").checked) {
    box.classList.add("mostrar");
  } else {
    box.classList.remove("mostrar");
  }
}

// Funções Matemáticas com BigInt
function fat(n) {
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

function comb(n, p) {
  if (p < 0 || p > n) return 0n;
  return fat(n) / (fat(p) * fat(n - p));
}

function textoFat(n) {
  if (n <= 0) return "1";
  if (n > 6) return `${n} · ${n - 1} · ... · 1`;
  let s = [];
  for (let i = n; i >= 1; i--) s.push(i);
  return s.join(" · ");
}

// 1. Permutações
function calcPermSimples() {
  const n = parseInt(document.getElementById("p_simples_n").value);
  if (isNaN(n) || n < 0) return alert("Digite um n inteiro >= 0");
  const res = fat(n);
  document.getElementById("res_p_simples").innerText =
    `Resultado: P(${n}) = ${res}`;
  exibirPasso(
    "passo_p_simples",
    `
            <strong>Passo a passo:</strong><br>
            1. Fórmula: P(${n}) = ${n}!<br>
            2. Expansão: ${n}! = ${textoFat(n)}<br>
            3. Multiplicação concluída: <strong>${res}</strong>
        `,
  );
}

function calcPermRep() {
  const n = parseInt(document.getElementById("p_rep_n").value);
  const repStr = document.getElementById("p_rep_list").value;
  if (isNaN(n) || n < 0) return alert("Digite um n válido");

  const reps = repStr
    .split(/[\s,]+/)
    .filter((x) => x)
    .map(Number);
  let den = 1n;
  let soma = 0;
  let listaRepTxt = [];

  for (let r of reps) {
    if (r > 1) {
      den *= fat(r);
      soma += r;
      listaRepTxt.push(`${r}!`);
    }
  }
  if (soma > n) return alert("A soma das repetições não pode ultrapassar n!");

  const num = fat(n);
  const res = num / den;
  document.getElementById("res_p_rep").innerText = `Resultado: ${res}`;
  exibirPasso(
    "passo_p_rep",
    `
            <strong>Passo a passo:</strong><br>
            1. Numerador: ${n}! = ${num}<br>
            2. Denominador: ${listaRepTxt.length > 0 ? listaRepTxt.join(" · ") : "1!"} = ${den}<br>
            3. Divisão: ${num} / ${den} = <strong>${res}</strong>
        `,
  );
}

function calcPermCirc() {
  const n = parseInt(document.getElementById("p_circ_n").value);
  if (isNaN(n) || n < 1) return alert("Digite n >= 1");
  const res = fat(n - 1);
  document.getElementById("res_p_circ").innerText =
    `Resultado: PC(${n}) = ${res}`;
  exibirPasso(
    "passo_p_circ",
    `
            <strong>Passo a passo:</strong><br>
            1. Fixa-se 1 elemento para eliminar as rotações equivalentes.<br>
            2. PC(${n}) = (${n} - 1)! = ${n - 1}!<br>
            3. Cálculo: ${textoFat(n - 1)} = <strong>${res}</strong>
        `,
  );
}

function calcPermCaotica() {
  const n = parseInt(document.getElementById("p_caot_n").value);
  if (isNaN(n) || n < 0) return alert("Digite n >= 0");
  let total = 0n;
  let linhas = [];
  for (let k = 0; k <= n; k++) {
    const sinal = k % 2 === 0 ? 1n : -1n;
    const termo = sinal * (fat(n) / fat(k));
    total += termo;
    linhas.push(
      `k=${k}: (${sinal > 0 ? "+" : ""}${sinal}) · (${n}! / ${k}!) = ${termo}`,
    );
  }
  document.getElementById("res_p_caot").innerText =
    `Resultado: D(${n}) = !${n} = ${total}`;
  exibirPasso(
    "passo_p_caot",
    `
            <strong>Passo a passo:</strong><br>
            Fórmula: D(${n}) = ${n}! · ∑ [(-1)^k / k!]<br>
            ${linhas.join("<br>")}<br>
            Soma dos termos: <strong>${total}</strong>
        `,
  );
}

// 2. Arranjos
function calcArranjoSimp() {
  const n = parseInt(document.getElementById("a_simp_n").value);
  const p = parseInt(document.getElementById("a_simp_p").value);
  if (isNaN(n) || isNaN(p) || p > n || n < 0)
    return alert("Inválido. Certifique-se de que n >= p >= 0");
  const num = fat(n);
  const den = fat(n - p);
  const res = num / den;
  document.getElementById("res_a_simp").innerText =
    `Resultado: A(${n}, ${p}) = ${res}`;
  exibirPasso(
    "passo_a_simp",
    `
            <strong>Passo a passo:</strong><br>
            1. Fórmula: A(${n}, ${p}) = ${n}! / (${n} - ${p})! = ${n}! / ${n - p}!<br>
            2. Fatoriais: ${n}! = ${num} e ${n - p}! = ${den}<br>
            3. Divisão: ${num} / ${den} = <strong>${res}</strong>
        `,
  );
}

function calcArranjoRep() {
  const n = BigInt(document.getElementById("a_rep_n").value);
  const p = BigInt(document.getElementById("a_rep_p").value);
  const res = n ** p;
  document.getElementById("res_a_rep").innerText =
    `Resultado: AR(${n}, ${p}) = ${res}`;
  exibirPasso(
    "passo_a_rep",
    `
            <strong>Passo a passo:</strong><br>
            1. Cada uma das ${p} posições pode ser ocupada por qualquer um dos ${n} elementos.<br>
            2. Cálculo: ${n}^${p} = <strong>${res}</strong>
        `,
  );
}

// 3. Combinações
function calcCombSimp() {
  const n = parseInt(document.getElementById("c_simp_n").value);
  const p = parseInt(document.getElementById("c_simp_p").value);
  if (isNaN(n) || isNaN(p) || p > n || n < 0)
    return alert("Inválido. Certifique-se de que n >= p >= 0");
  const fn = fat(n);
  const fp = fat(p);
  const fnp = fat(n - p);
  const res = fn / (fp * fnp);
  document.getElementById("res_c_simp").innerText =
    `Resultado: C(${n}, ${p}) = ${res}`;
  exibirPasso(
    "passo_c_simp",
    `
            <strong>Passo a passo:</strong><br>
            1. Fórmula: C(${n}, ${p}) = ${n}! / [${p}! · (${n} - ${p})!]<br>
            2. Valores: ${n}! = ${fn}, ${p}! = ${fp}, ${n - p}! = ${fnp}<br>
            3. Denominador: ${fp} · ${fnp} = ${fp * fnp}<br>
            4. Resultado: ${fn} / ${fp * fnp} = <strong>${res}</strong>
        `,
  );
}

function calcCombRep() {
  const n = parseInt(document.getElementById("c_rep_n").value);
  const p = parseInt(document.getElementById("c_rep_p").value);
  if (isNaN(n) || isNaN(p) || n <= 0 || p < 0)
    return alert("Inválido. Certifique-se de que n > 0 e p >= 0");
  const eqN = n + p - 1;
  const res = comb(eqN, p);
  document.getElementById("res_c_rep").innerText =
    `Resultado: CR(${n}, ${p}) = ${res}`;
  exibirPasso(
    "passo_c_rep",
    `
            <strong>Passo a passo (Método dos Traços e Bolinhas):</strong><br>
            1. Fórmula: CR(${n}, ${p}) = C(${n} + ${p} - 1, ${p})<br>
            2. Equivalência: C(${eqN}, ${p})<br>
            3. Cálculo da Combinação: ${eqN}! / [${p}! · (${eqN} - ${p})!] = <strong>${res}</strong>
        `,
  );
}

// 4. Binômio de Newton e Teoremas
function calcBinomio() {
  const n = parseInt(document.getElementById("bn_n").value);
  if (isNaN(n) || n < 0) return alert("Digite n >= 0");
  let termos = [];
  let passos = [];
  for (let k = 0; k <= n; k++) {
    let c = comb(n, k);
    let potX = n - k;
    let potY = k;
    let termo = c !== 1n || (potX === 0 && potY === 0) ? c.toString() : "";
    if (potX > 0) termo += potX === 1 ? "x" : `x^${potX}`;
    if (potY > 0) termo += potY === 1 ? "y" : `y^${potY}`;
    termos.push(termo || "1");
    passos.push(
      `k=${k}: C(${n}, ${k}) · x^(${n}-${k}) · y^${k} = ${c} · x^${potX} · y^${potY}`,
    );
  }
  document.getElementById("res_bn").innerText =
    `(x + y)^${n} = ${termos.join(" + ")}`;
  exibirPasso(
    "passo_bn",
    `
            <strong>Passo a passo termo a termo:</strong><br>
            ${passos.join("<br>")}
        `,
  );
}

function calcTermoGeral() {
  const n = parseInt(document.getElementById("tg_n").value);
  const pos = parseInt(document.getElementById("tg_pos").value);
  const k = pos - 1;
  if (isNaN(n) || isNaN(pos) || pos < 1 || pos > n + 1)
    return alert(`Posição deve ser entre 1 e ${n + 1}`);
  const c = comb(n, k);
  const potX = n - k;
  const potY = k;
  document.getElementById("res_tg").innerText =
    `T_${pos} = ${c} · x^${potX} · y^${potY}`;
  exibirPasso(
    "passo_tg",
    `
            <strong>Passo a passo:</strong><br>
            1. Posição solicitada: ${pos}º termo, logo k + 1 = ${pos} ⇒ <strong>k = ${k}</strong><br>
            2. Fórmula: T_(${k}+1) = C(${n}, ${k}) · x^(${n}-${k}) · y^${k}<br>
            3. Coeficiente: C(${n}, ${k}) = ${c}<br>
            4. Potências: x^${potX} e y^${potY}<br>
            5. Termo Geral: <strong>${c}x^${potX}y^${potY}</strong>
        `,
  );
}

function calcStifel() {
  const n = parseInt(document.getElementById("stifel_n").value);
  const p = parseInt(document.getElementById("stifel_p").value);
  if (isNaN(n) || isNaN(p) || p > n || n < 1 || p < 1)
    return alert("Necessário n >= p >= 1");
  const t1 = comb(n - 1, p - 1);
  const t2 = comb(n - 1, p);
  const soma = t1 + t2;
  const direita = comb(n, p);
  document.getElementById("res_stifel").innerText =
    `Validação: ${t1} + ${t2} = ${direita} (${soma === direita ? "Identidade Confirmada" : "Erro"})`;
  exibirPasso(
    "passo_stifel",
    `
            <strong>Passo a passo da demonstração:</strong><br>
            Relação: C(n-1, p-1) + C(n-1, p) = C(n, p)<br>
            1. Primeiro termo: C(${n - 1}, ${p - 1}) = <strong>${t1}</strong><br>
            2. Segundo termo: C(${n - 1}, ${p}) = <strong>${t2}</strong><br>
            3. Soma (Lado Esquerdo): ${t1} + ${t2} = <strong>${soma}</strong><br>
            4. Lado Direito: C(${n}, ${p}) = <strong>${direita}</strong><br>
            5. Conclusão: ${soma} = ${direita} (Propriedade válida no Triângulo de Pascal).
        `,
  );
}
