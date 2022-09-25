import { describe, beforeEach, expect, test } from '@jest/globals';
import {
  // ged2dot,
  // ged2dot_,
  // bfs,
  // bfs_,
  // graph_find,
  // graph_find_,
  // Family,
  // Individual,
  // GedcomImport,
  // DotExport,
  Config
} from '../src/main';

describe('ged2dot', () => {

  let config;

  beforeEach(() => {
    config = new Config();
  });

  describe('Config', () => {
    test('constructor', () => {
      expect(config.input).toEqual('');
      expect(config.rootfamily).toEqual('F1');
      expect(config.familydepth).toEqual(4);
      expect(config.nameorder).toEqual('little');
    });
  });
});
