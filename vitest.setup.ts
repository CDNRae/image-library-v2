import { expect as vitestExpect } from 'vitest';

(global as any).expect = vitestExpect;

(async () => {
  await import('@testing-library/jest-dom');
})();
