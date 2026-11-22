#!/usr/bin/env node
/** Validate content/projects.json and regenerate content/projects-data.js */
import { build, SITE } from './projects-lib.mjs';
try {
  console.log('站点目录: ' + SITE);
  build();
} catch (e) {
  process.exit(1);
}
