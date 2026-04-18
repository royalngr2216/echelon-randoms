import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   🧩 ROUNDS DATA
   ========================= */

const rounds = [
  {
  name: "Round 1",
  matches: [
    {
      id: 1,
      teamA: "Team 1",
      teamB: "Team 16",
      lineupA: ["Zyphren", "Suzu1", "Jack2sparrow"],
      lineupB: ["Needluck", "Zexterr", "RoyalNGR"],
      scores: ["0-0","0-0","0-2"],
      winner: "-",
    },
    {
      id: 2,
      teamA: "Team 2",
      teamB: "Team 15",
      lineupA: ["Sachinrathore1", "Inbaa", "Topscammer"],
      lineupB: ["Venuus", "Krubsiu", "Atharvi"],
      scores: ["0-0","0-0","0-0"],
      winner: "-",
    },
    {
      id: 3,
      teamA: "Team 3",
      teamB: "Team 14",
      lineupA: ["Silverkaidog", "N0tluffy", "Pappadolqq"],
      lineupB: ["Aaakkktttoooppp", "Goingrank1", "Visionkawai17"],
      scores: ["0-0","2-1","0-2"],
      winner: "-",
    },
    {
      id: 4,
      teamA: "Team 4",
      teamB: "Team 13",
      lineupA: ["Shravu", "Varun9696", "Urgod"],
      lineupB: ["Immalaugh", "Nathanielsupaul", "Jyonim"],
      scores: ["2-0","0-0","1-2"],
      winner: "-",
    },
    {
      id: 5,
      teamA: "Team 5",
      teamB: "Team 12",
      lineupA: ["Asrahan", "Motagorilla", "Obixon"],
      lineupB: ["Legendeye10", "Repure", "Narual"],
      scores: ["2-1","2-0","2-0"],
      winner: "Team 5",
    },
    {
      id: 6,
      teamA: "Team 6",
      teamB: "Team 11",
      lineupA: ["Madhavxdark", "Zkk100", "Clousee"],
      lineupB: ["Grimincent", "Nottanyaa", "Iknowyou"],
      scores: ["0-0","0-0","0-0"],
      winner: "-",
    },
    {
      id: 7,
      teamA: "Team 7",
      teamB: "Team 10",
      lineupA: ["Azure138", "The_99", "Tgbnamish"],
      lineupB: ["Tenshicat", "Lokigodofchaos", "REDBRO"],
      scores: ["0-0","0-2","0-0"],
      winner: "-",
    },
    {
      id: 8,
      teamA: "Team 8",
      teamB: "Team 9",
      lineupA: ["Nolongerfrnd", "Jivitesh", "Ianjaipersaud"],
      lineupB: ["Koyo7", "Ruokzyy", "Yash005"],
      scores: ["0-2","0-0","0-2"],
      winner: "Team 9",
    },
  ],
},

  {
    name: "Quarter Finals",
    matches: [
      { id: 1, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
      { id: 2, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
      { id: 3, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
      { id: 4, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
    ],
  },

  {
    name: "Semi Finals",
    matches: [
      { id: 1, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
      { id: 2, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
    ],
  },

  {
    name: "Final",
    matches: [
      { id: 1, teamA: "Team X", teamB: "Team Y", lineupA:["-","-","-"], lineupB:["-","-","-"], scores:["0-0","0-0","0-0"], winner:"-" },
    ],
  },
];

/* =========================
   🧠 AUTO PLAYER STATS
   ========================= */

function generatePlayerStats(rounds) {
  const stats = {};

  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      match.lineupA.forEach((playerA, i) => {
        const playerB = match.lineupB[i];
        const score = match.scores[i];

        if (!score || score === "0-0" || playerA === "-" || playerB === "-") return;

        const [a, b] = score.split("-").map(Number);

        if (!stats[playerA]) stats[playerA] = { wins: 0, matches: 0 };
        if (!stats[playerB]) stats[playerB] = { wins: 0, matches: 0 };

        stats[playerA].matches++;
        stats[playerB].matches++;

        if (a > b) stats[playerA].wins++;
        else stats[playerB].wins++;
      });
    });
  });

  return Object.entries(stats).map(([name, data]) => ({
    name,
    wins: data.wins,
    matches: data.matches,
    winRate: data.matches === 0 ? 0 : ((data.wins / data.matches) * 100).toFixed(1),
  }));
}

/* =========================
   🚀 COMPONENT
   ========================= */

export default function TournamentApp() {
  const [selectedRound, setSelectedRound] = useState(rounds[0]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const stats = generatePlayerStats(rounds)
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 10);

  const topPlayer = stats[0];

  return (
    <div style={page}>
      <h1 style={title}>🏆 Echelon Tournament</h1>

      <div style={winner}>🥇 Champion: TBD</div>

      <div style={card}>
        <h2>🏆 Man of the Tournament</h2>
        {topPlayer ? (
          <p>{topPlayer.name} — {topPlayer.wins} wins ({topPlayer.winRate}%)</p>
        ) : (
          <p>No matches played yet</p>
        )}
      </div>

      <div style={card}>
        <h2>🔥 Top Players</h2>
        {stats.map((p, i) => (
          <div key={i} style={row}>
            <span>#{i + 1} {p.name}</span>
            <span>{p.wins}W / {p.matches}M ({p.winRate}%)</span>
          </div>
        ))}
      </div>

      <div style={nav}>
        {rounds.map((r, i) => (
          <button key={i} style={btn} onClick={() => setSelectedRound(r)}>
            {r.name}
          </button>
        ))}
      </div>

      <h2 style={{ textAlign: "center" }}>{selectedRound.name}</h2>

      <div style={grid}>
        {selectedRound.matches.map((m) => (
          <motion.div key={m.id} style={cardMatch} whileHover={{ scale: 1.05 }} onClick={() => setSelectedMatch(m)}>
            {m.teamA} ⚔️ {m.teamB}
            <div style={{ color: "#22c55e" }}>{m.winner}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMatch && (
          <motion.div style={overlay} onClick={() => setSelectedMatch(null)}>
            <motion.div style={modal} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedMatch.teamA} vs {selectedMatch.teamB}</h2>

              {selectedMatch.lineupA.map((a, i) => (
                <div key={i} style={playerCard}>
                  {a} vs {selectedMatch.lineupB[i]} ({selectedMatch.scores[i]})
                </div>
              ))}

              <button style={btn} onClick={() => setSelectedMatch(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   🎨 STYLES
   ========================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f0c29,#302b63,#ff0080)",
  color: "white",
  padding: "20px",
};

const title = { textAlign: "center" };

const winner = {
  background: "linear-gradient(90deg,#ff8c00,#ff2e63)",
  padding: "12px",
  borderRadius: "12px",
  textAlign: "center",
  margin: "15px auto",
  maxWidth: "900px",
};

const card = {
  background: "rgba(255,255,255,0.06)",
  padding: "20px",
  borderRadius: "14px",
  margin: "15px auto",
  maxWidth: "900px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "6px",
};

const nav = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  margin: "20px 0",
};

const btn = {
  padding: "10px 18px",
  background: "#ff2e63",
  border: "none",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
  maxWidth: "1100px",
  margin: "auto",
};

const cardMatch = {
  background: "#1a1a2e",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "center",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#111",
  padding: "40px",
  borderRadius: "16px",
  width: "90%",
  maxWidth: "700px",
  textAlign: "center",
  boxShadow: "0 0 30px rgba(255,0,100,0.3)",
};

const playerCard = {
  background: "#222",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "10px",
  fontSize: "16px",
};
