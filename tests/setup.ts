import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';

// Очистка после каждого теста
afterEach(() => {
  cleanup();
});

