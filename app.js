/* ========= CONFIG ========= */

// SHA-256 Hash eines EINMAL-KEYS
// Klartext-Key (nur zum Erzeugen): REALM-ACCES
const validHashes = [
  "d9a1c4c1e7c57d1c47df1cb8e7d64df9d6c6f9d0c7b6a1d4e0b9d9e5d7f1c5a1"
];

// Bereits genutzte Keys
let usedHashes = JSON.parse(localStorage.getItem("usedHashes") || "[]");

/* ========= LOGIN ========= */

async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login() {
  const input = document.getElementById("keyInput").value.trim();
  const msg = document.getElementById("loginMsg");

  if (!input) {
    msg.textContent = "Key fehlt";
    return;
  }

  const hash = await sha256(input);

  if (!validHashes.includes(hash)) {
    msg.textContent = "Ungültiger Key";
    return;
  }

  if (usedHashes.includes(hash)) {
    msg.textContent = "Key bereits benutzt";
    return;
  }

  // Key verbrauchen
  usedHashes.push(hash);
  localStorage.setItem("usedHashes", JSON.stringify(usedHashes));

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

/* ========= APP FUNKTIONEN ========= */

const players = [
  { name: "Steve", xp: 1200 },
  { name: "Alex", xp: 2700 }
];

const list = document.getElementById("playerList");

players.forEach(p => {
  const btn = document.createElement("button");
  btn.textContent = p.name;
  btn.onclick = () => showPlayer(p);
  list.appendChild(btn);
});

function showPlayer(p) {
  document.getElementById("details").classList.remove("hidden");
  document.getElementById("pname").textContent = p.name;
  document.getElementById("pxp").textContent = `XP: ${p.xp}`;
  document.getElementById("bar").value = p.xp;
}
