
const express = require("express");
const app = express();

const copas = [
  { ano: 1930, sede: "Uruguai", fase: "1ª fase", tier: "eliminado",
    resumo: "Estreia mundial. Perdeu para a Iugoslávia (2-1) e venceu a Bolívia (4-0), mas não passou da primeira fase.",
    artilheiro: "Preguinho (1 gol)" },
  { ano: 1934, sede: "Itália", fase: "1ª fase", tier: "eliminado",
    resumo: "Torneio em mata-mata direto. O Brasil caiu já no primeiro jogo, derrotado pela Espanha por 3 a 1.",
    artilheiro: "Leônidas da Silva (1 gol)" },
  { ano: 1938, sede: "França", fase: "3º lugar", tier: "terceiro",
    resumo: "Perdeu a semifinal para a Itália (2-1) e bateu a Suécia (4-2) na disputa de terceiro lugar.",
    artilheiro: "Leônidas da Silva (7 gols — artilheiro da Copa)" },
  { ano: 1950, sede: "Brasil", fase: "Vice-campeão", tier: "vice",
    resumo: "O \"Maracanazo\": precisando só de um empate na decisão, o Brasil perdeu para o Uruguai por 2 a 1 diante de mais de 170 mil pessoas.",
    artilheiro: "Ademir (9 gols — artilheiro da Copa)" },
  { ano: 1954, sede: "Suíça", fase: "Quartas de final", tier: "eliminado",
    resumo: "Eliminado pela Hungria (4-2) na \"Batalha de Berna\", um dos jogos mais violentos da história das Copas.",
    artilheiro: "Didi (3 gols)" },
  { ano: 1958, sede: "Suécia", fase: "Campeão", tier: "campeao",
    resumo: "Primeiro título mundial. Pelé, com 17 anos, e Garrincha encantaram o mundo na vitória de 5 a 2 sobre os donos da casa, na final.",
    artilheiro: "Pelé (6 gols)" },
  { ano: 1962, sede: "Chile", fase: "Campeão", tier: "campeao",
    resumo: "Bicampeão. Com Pelé lesionado já na fase de grupos, Garrincha foi o grande nome na vitória de 3 a 1 sobre a Tchecoslováquia na final.",
    artilheiro: "Garrincha, Vavá (4 gols cada)" },
  { ano: 1966, sede: "Inglaterra", fase: "1ª fase", tier: "eliminado",
    resumo: "Pelé voltou a ser duramente marcado e se lesionou. O Brasil perdeu para Hungria e Portugal e caiu ainda na primeira fase.",
    artilheiro: "Tostão, Pelé, Rinaldo (1 gol cada)" },
  { ano: 1970, sede: "México", fase: "Campeão", tier: "campeao",
    resumo: "O time mais lembrado da história do futebol. Pelé, Tostão, Jairzinho, Rivelino e Carlos Alberto goleiam a Itália por 4 a 1 na final.",
    artilheiro: "Jairzinho (7 gols, em todos os jogos)" },
  { ano: 1974, sede: "Alemanha Ocidental", fase: "4º lugar", tier: "quarto",
    resumo: "Time em transição pós-1970 perdeu a disputa de terceiro lugar para a Polônia e terminou em quarto.",
    artilheiro: "Valdomiro, Jairzinho, Rivelino (2 gols cada)" },
  { ano: 1978, sede: "Argentina", fase: "3º lugar", tier: "terceiro",
    resumo: "Ficou invicto no torneio, mas critérios de gols deixaram o time fora da final. Venceu a Itália na disputa de terceiro lugar.",
    artilheiro: "Dirceu, Reinaldo (3 gols cada)" },
  { ano: 1982, sede: "Espanha", fase: "2ª fase", tier: "eliminado",
    resumo: "Considerado um dos melhores times sem título. Zico, Sócrates e Falcão caíram para a Itália por 3 a 2 num dos jogos mais lembrados da história das Copas.",
    artilheiro: "Zico (4 gols)" },
  { ano: 1986, sede: "México", fase: "Quartas de final", tier: "eliminado",
    resumo: "Zico desperdiçou um pênalti na prorrogação contra a França; o Brasil acabou eliminado nos pênaltis nas quartas de final.",
    artilheiro: "Careca (5 gols)" },
  { ano: 1990, sede: "Itália", fase: "Oitavas de final", tier: "eliminado",
    resumo: "Equipe defensiva sob o comando de Sebastião Lazaroni foi eliminada pela Argentina de Maradona por 1 a 0.",
    artilheiro: "Careca, Müller (1 gol cada)" },
  { ano: 1994, sede: "Estados Unidos", fase: "Campeão", tier: "campeao",
    resumo: "Quebra de jejum de 24 anos. Romário e Bebeto brilharam e o título veio nos pênaltis contra a Itália, após 0 a 0, com Baggio perdendo a cobrança decisiva.",
    artilheiro: "Romário (5 gols)" },
  { ano: 1998, sede: "França", fase: "Vice-campeão", tier: "vice",
    resumo: "Favorito ao bicampeonato seguido, perdeu a final por 3 a 0 para a França, em jogo marcado pelo mal-estar de Ronaldo horas antes da partida.",
    artilheiro: "Ronaldo (4 gols)" },
  { ano: 2002, sede: "Coreia do Sul / Japão", fase: "Campeão", tier: "campeao",
    resumo: "Pentacampeão. Os \"3 Rs\" — Ronaldo, Rivaldo e Ronaldinho — levaram o time ao título, com Ronaldo Fenômeno marcando os dois gols da final contra a Alemanha.",
    artilheiro: "Ronaldo (8 gols — artilheiro da Copa)" },
  { ano: 2006, sede: "Alemanha", fase: "Quartas de final", tier: "eliminado",
    resumo: "Time recheado de estrelas caiu diante da França, com atuação de gala de Zinedine Zidane, derrota por 1 a 0.",
    artilheiro: "Ronaldo (3 gols)" },
  { ano: 2010, sede: "África do Sul", fase: "Quartas de final", tier: "eliminado",
    resumo: "Estava na frente do placar, mas viu a Holanda virar o jogo e vencer por 2 a 1 nas quartas de final.",
    artilheiro: "Fabiano (3 gols)" },
  { ano: 2014, sede: "Brasil", fase: "4º lugar", tier: "quarto",
    resumo: "O \"Mineirazo\": goleada histórica de 7 a 1 sofrida diante da Alemanha na semifinal, em casa. Perdeu também a disputa de terceiro lugar para a Holanda.",
    artilheiro: "Fred, Neymar (4 gols cada)" },
  { ano: 2018, sede: "Rússia", fase: "Quartas de final", tier: "eliminado",
    resumo: "Eliminado pela Bélgica por 2 a 1 em jogo equilibrado nas quartas de final, mesmo com domínio na posse de bola.",
    artilheiro: "Neymar, Coutinho (2 gols cada)" },
  { ano: 2022, sede: "Catar", fase: "Quartas de final", tier: "eliminado",
    resumo: "Após um golaço de Neymar na prorrogação, foi eliminado pela Croácia nos pênaltis, repetindo o resultado das quartas de final.",
    artilheiro: "Richarlison (3 gols)" },
  { ano: 2026, sede: "Estados Unidos, Canadá e México", fase: "Em andamento", tier: "atual",
    resumo: "Sob o comando de Carlo Ancelotti, o Brasil está no Grupo C com Marrocos, Haiti e Escócia. Estreou empatando 1 a 1 com o Marrocos, com gol de Vini Jr.",
    artilheiro: "Vini Jr. (1 gol, até o momento)" }
];

app.get("/api/copas", (req, res) => {
  res.json(copas);
});

app.get("/api/copa-2026", (req, res) => {
  res.json(copa2026);
});

app.get("/api/resumo", (req, res) => {
  const titulos = copas.filter(c => c.tier === "campeao").length;
  const vices = copas.filter(c => c.tier === "vice").length;
  const terceiros = copas.filter(c => c.tier === "terceiro").length;
  const quartos = copas.filter(c => c.tier === "quarto").length;
  res.json({
    participacoes: copas.length,
    titulos,
    vices,
    terceiros,
    quartos,
    anosTitulo: copas.filter(c => c.tier === "campeao").map(c => c.ano)
  });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`Brasil nas Copas rodando em http://localhost:3000`);
});
