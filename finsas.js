const prompt = require('prompt-sync')({ sigint: true });

const candidates = [
  { cin: "AB123456", lastName: "Boushaba", firstName: "Soufiane", politicalParty: "Independent", age: 40, voters: [] },
  { cin: "CD234567", lastName: "El Amrani", firstName: "Fatima Zahra", politicalParty: "PJD", age: 35, voters: ["AB123456", "GH456789", "KL678901"] },
  { cin: "EF345678", lastName: "Chraibi", firstName: "Younes", politicalParty: "RNI", age: 45, voters: [] },
  { cin: "GH456789", lastName: "Bennani", firstName: "Salma", politicalParty: "PAM", age: 29, voters: ["IJ567890"] },
  { cin: "IJ567890", lastName: "Ouahbi", firstName: "Karim", politicalParty: "Istiqlal", age: 52, voters: [] },
  { cin: "KL678901", lastName: "Ziani", firstName: "Nadia", politicalParty: "Independent", age: 33, voters: [] },
  { cin: "MN789012", lastName: "Tazi", firstName: "Hamza", politicalParty: "USFP", age: 60, voters: ["QR901234"] },
  { cin: "OP890123", lastName: "Idrissi", firstName: "Meryem", politicalParty: "PJD", age: 27, voters: [] },
  { cin: "QR901234", lastName: "Berrada", firstName: "Omar", politicalParty: "RNI", age: 38, voters: ["CD234567", "EF345678", "MN789012"] },
  { cin: "ST012345", lastName: "Fassi", firstName: "Khadija", politicalParty: "PAM", age: 31, voters: [] }
];

function addCandidate() {

  let cin = prompt("CIN: ");

  let exists = candidates.find(c => c.cin === cin);
  if (exists) {
    console.log("Erreur: Ce CIN existe deja!");
    return;
  }

  let lastName = prompt("Nom: ");
  let firstName = prompt("Prenom: ");
  let party = prompt("Parti (ola Independent): ");
  let age = parseInt(prompt("Age: "), 10);

  candidates.push({
    cin: cin,
    lastName: lastName,
    firstName: firstName,
    politicalParty: party.trim() === "" ? "Independent" : party,
    age: isNaN(age) ? 18 : age,
    voters: []
  });
  
  console.log("Candidat ajoute avec succes!");
}

function addMultipleCandidates() {
  let count = parseInt(prompt("\nCombien de candidats voulez-vous ajouter ? "), 10);
  if (isNaN(count) || count <= 0) {
    console.log("Nombre invalide.");
    return;
  }

  for (let i = 0; i < count; i++) {
    console.log(`\nCandidat N°${i + 1}:`);
    addCandidate();
  }
}

function displayCandidates() {
  console.log("\n--- Affichage des candidats ---");
  console.log("1. Afficher tous les candidats (Tries par nombre de votes - Descendant)");
  console.log("2. Filtrer par parti politique");

  let choice = prompt("Choix: ");

  if (choice === "1") {
    let sortedList = [...candidates].sort((a, b) => b.voters.length - a.voters.length);
    sortedList.forEach((c, index) => {
      console.log(`\n# Candidat ${index + 1}:`);
      console.log(`CIN: ${c.cin}`);
      console.log(`Name: ${c.firstName} ${c.lastName}`);
      console.log(`Parti: ${c.politicalParty}`);
      console.log(`Age: ${c.age}`);
      console.log(`Nombre de votes: ${c.voters.length}`);
      console.log("-------------");
    });

  } else if (choice === "2") {
    let party = prompt("Entrez le nom du parti: ");
    let filtered = candidates.filter(c => c.politicalParty.toLowerCase() === party.toLowerCase());

    if (filtered.length === 0) {
      console.log("Aucun candidat trouve pour ce parti.");
    } else {
      filtered.forEach((c, index) => {
        console.log(`\n# Candidat ${index + 1}:`);
        console.log(`CIN: ${c.cin} | Nom: ${c.firstName} ${c.lastName} | Votes: ${c.voters.length}`);
        console.log("-------------");
      });
    }
  }
}
function vote() {
  console.log("\n--- Vote ---");
  let voterCin = prompt("Entrez votre CIN (Votant): ");


  let alreadyVoted = candidates.some(c => c.voters.includes(voterCin));

  if (alreadyVoted) {
    console.log("\n> You have already voted and you are not allowed to change your vote or vote again.");
    return;
  }

  let candCin = prompt("Entrez le CIN du candidat de votre choix: ");
  let candidate = candidates.find(c => c.cin === candCin);

  if (candidate) {
    candidate.voters.push(voterCin);
    console.log("-> Vote enregistre avec succes!");
  } else {
    console.log("-> Candidat introuvable.");
  }
}
function editCandidate() {
  console.log("\n--- Modifier un candidat ---");
  let cin = prompt("CIN du candidat a modifier: ");
  let candidate = candidates.find(c => c.cin === cin);

  if (!candidate) {
    console.log("Candidat introuvable.");
    return;
  }

  console.log("1. Modifier le parti politique");
  console.log("2. Modifier l'age");
  let choice = prompt("Choix: ");

  if (choice === "1") {
    let newParty = prompt("Nouveau parti: ");
    candidate.politicalParty = newParty.trim() === "" ? "Independent" : newParty;
    console.log("-> Parti mis a jour!");
  } else if (choice === "2") {
    let newAge = parseInt(prompt("Nouveau age: "), 10);
    if (!isNaN(newAge)) {
      candidate.age = newAge;
      console.log("-> Age mis a jour!");
    } else {
      console.log("Age invalide.");
    }
  }
}
function deleteCandidate() {
  console.log("\n--- Supprimer un candidat ---");
  let cin = prompt("CIN du candidat a supprimer: ");

  let index = candidates.findIndex(c => c.cin === cin);

  if (index !== -1) {
    candidates.splice(index, 1);
    console.log("-> Candidat supprime avec succes.");
  } else {
    console.log("-> Candidat introuvable.");
  }
}
function searchCandidate() {
  console.log("\n--- Rechercher par Nom ---");
  let searchName = prompt("Entrez le nom de famille: ");

  let results = candidates.filter(c => c.lastName.toLowerCase().includes(searchName.toLowerCase()));

  if (results.length === 0) {
    console.log("Aucun candidat trouve.");
  } else {
    results.forEach(c => {
      console.log(`\nCIN: ${c.cin} | Nom: ${c.lastName} ${c.firstName} | Parti: ${c.politicalParty}`);
    });
  }
}
function displayStatistics() {
  console.log("\n================ STATISTIQUES ================");
  
  console.log(`1. Nombre total de candidats: ${candidates.length}`);

  let totalVotes = candidates.reduce((sum, c) => sum + c.voters.length, 0);
  console.log(`2. Nombre total de votes exprimes: ${totalVotes}`);
  console.log("\n3. Top 3 des candidats avec le plus de votes:");
  let top3 = [...candidates]
    .sort((a, b) => b.voters.length - a.voters.length)
    .slice(0, 3);

  top3.forEach((c, index) => {
    console.log(`   ${index + 1}. ${c.firstName} ${c.lastName} (${c.politicalParty}) - ${c.voters.length} votes`);
  });

  console.log("\n4. Nombre de candidats par parti politique:");
  let partyCounts = {};
  candidates.forEach(c => {
    partyCounts[c.politicalParty] = (partyCounts[c.politicalParty] || 0) + 1;
  });

  for (let party in partyCounts) {
    console.log(`   - ${party}: ${partyCounts[party]} candidat(s)`);
  }
  console.log("==============================================");
}
function main() {
  let running = true;

  while (running) {
    console.log("\n================ MAIN MENU ================");
    console.log("1. Add a new candidate");
    console.log("2. Add several candidates at once");
    console.log("3. Display the list of candidates");
    console.log("4. Vote for a candidate");
    console.log("5. Edit a candidate's information");
    console.log("6. Delete a candidate");
    console.log("7. Search for candidates");
    console.log("8. Election statistics");
    console.log("0. Exit");
    console.log("===========================================");

    let choice = prompt("Choisissez une option: ");

    switch (choice) {
      case "1": addCandidate(); break;
      case "2": addMultipleCandidates(); break;
      case "3": displayCandidates(); break;
      case "4": vote(); break;
      case "5": editCandidate(); break;
      case "6": deleteCandidate(); break;
      case "7": searchCandidate(); break;
      case "8": displayStatistics(); break;
      case "0":
        console.log("Au revoir!");
        running = false;
        break;
      default:
        console.log("Option invalide, veuillez reessayer.");
    }
  }
}
main();