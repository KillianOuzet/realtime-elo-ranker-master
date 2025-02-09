import axios from 'axios';

const MATCH_URL = 'http://localhost:3000/api/match';
const PLAYER_URL = 'http://localhost:3000/api/player';

interface Player {
  id: string;
  rank: number;
}

interface MatchResult {
  winner: string;
  loser: string;
  draw?: boolean;
}

const genericPlayers: Player[] = [
  { id: 'Killian', rank: 50 },
  { id: 'Atow', rank: 100 },
  { id: 'Vatira', rank: 150 },
  { id: 'Caliste', rank: 200 },
];

async function getPlayers(): Promise<Player[]> {
  try {
    const response = await axios.get(PLAYER_URL);
    if (response.data.length === 0) {
      await createGenericPlayers();
      return genericPlayers;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error.message);
    await createGenericPlayers();
    return genericPlayers;
  }
}

async function createGenericPlayers() {
  try {
    for (const player of genericPlayers) {
      await axios.post(PLAYER_URL, player);
    }
    console.log('Generic players created');
  } catch (error) {
    console.error('Error creating generic players:', error.message);
  }
}

function getRandomPlayer(players: Player[]): Player {
  const index = Math.floor(Math.random() * players.length);
  return players[index];
}

function simulateMatch(players: Player[]): MatchResult {
  const player1 = getRandomPlayer(players);
  let player2 = getRandomPlayer(players);

  // Vérifier juste si le deuxième n'est pas le même joueur que le premier (pour évité de faire tout pt)
  while (player1.id === player2.id) {
    player2 = getRandomPlayer(players);
  }

  const winner = Math.random() > 0.5 ? player1 : player2;
  const loser = winner === player1 ? player2 : player1;

  return {
    winner: winner.id,
    loser: loser.id,
    draw: false,
  };
}

async function sendMatchResult(result: MatchResult) {
  try {
    const response = await axios.post(MATCH_URL, result);
    console.log('Match result sent:', response.data);
  } catch (error) {
    console.error('Error sending match result:', error.message);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateMatches() {
  const players = await getPlayers();
  while (true) {
    const result = simulateMatch(players);
    await sendMatchResult(result);
    await delay(500); // pour attendre 0.5s entre chaque match
  }
}

simulateMatches();
