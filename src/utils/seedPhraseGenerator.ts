
// Mock seed phrase generation utility
const WORD_LIST = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
  'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
  'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
  'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
  'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
  'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album'
];

export const generateSeedPhrase = (): string[] => {
  return Array.from({ length: 12 }, () => 
    WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
  );
};

export const selectVerificationWords = (seedPhrase: string[]) => {
  const randomPositions = Array.from({ length: 3 }, () => 
    Math.floor(Math.random() * 12)
  ).sort((a, b) => a - b);
  
  return randomPositions.map(pos => ({
    position: pos,
    word: seedPhrase[pos]
  }));
};
