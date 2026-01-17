const data = {
  name: "PlayerOne",
  xp: 1240
};

document.getElementById("name").innerText = data.name;
document.getElementById("xp").innerText = "XP: " + data.xp;
document.getElementById("bar").value = data.xp;
