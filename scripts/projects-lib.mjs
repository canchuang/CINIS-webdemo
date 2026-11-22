import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const SITE = process.env.SITE_DIR || path.resolve(HERE, '..', 'experiments', 'art-direction', 'direction-b-modern-editorial');
export const DATA_FILE = path.join(SITE, 'content', 'projects.json');
export const GEN_FILE = path.join(SITE, 'content', 'projects-data.js');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PAGE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;
const FILTERS = ['uiux', 'product'];
const LAYOUTS = ['big', 'small', 'wide'];
const HOME_LAYOUTS = ['feature', 'item'];
const COVER_KINDS = ['single', 'triptych'];

export function pad2(n) { return (n < 10 ? '0' : '') + n; }
export function loadProjects() { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
export function saveProjects(list) { fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2) + '\n', 'utf8'); }
export function writeGenerated(list) {
  const banner = '/* AUTO-GENERATED from content/projects.json — do not edit by hand.\n   Rebuild: node _tools/build_projects.mjs */\n';
  fs.writeFileSync(GEN_FILE, banner + 'window.PROJECTS = ' + JSON.stringify(list, null, 2) + ';\n', 'utf8');
}
function isStr(v) { return typeof v === 'string' && v.trim() !== ''; }

export function validateProjects(list) {
  const errors = [];
  if (!Array.isArray(list) || list.length === 0) { errors.push('projects.json 必须是非空数组'); return errors; }
  const slugs = new Map(), orders = new Map();
  list.forEach((p, idx) => {
    const at = `#${idx + 1} (${p && p.slug ? p.slug : 'no-slug'})`;
    if (!p || typeof p !== 'object') { errors.push(at + ' 不是对象'); return; }
    if (!isStr(p.slug) || !SLUG_RE.test(p.slug)) errors.push(at + ' slug 必须为小写字母/数字/连字符');
    else if (slugs.has(p.slug)) errors.push(at + ' slug 重复: ' + p.slug); else slugs.set(p.slug, 1);
    if (!Number.isInteger(p.order) || p.order < 1) errors.push(at + ' order 必须为 >=1 的整数');
    else if (orders.has(p.order)) errors.push(at + ' order 重复: ' + p.order); else orders.set(p.order, 1);
    ['title', 'summary', 'worksMeta', 'page'].forEach(k => { if (!isStr(p[k])) errors.push(at + ' 缺少必填字段 ' + k); });
    if (isStr(p.filter) && FILTERS.indexOf(p.filter) < 0) errors.push(at + ' filter 必须是 ' + FILTERS.join(' / '));
    if (isStr(p.page) && !PAGE_RE.test(p.page)) errors.push(at + ' page 必须是 <slug>.html 形式');
    else if (isStr(p.page) && !fs.existsSync(path.join(SITE, p.page))) errors.push(at + ' 案例页不存在: ' + p.page);
    if (p.worksLayout && LAYOUTS.indexOf(p.worksLayout) < 0) errors.push(at + ' worksLayout 必须是 ' + LAYOUTS.join(' / '));
    if (p.homeLayout && HOME_LAYOUTS.indexOf(p.homeLayout) < 0) errors.push(at + ' homeLayout 必须是 ' + HOME_LAYOUTS.join(' / '));
    if (typeof p.showOnHome !== 'boolean') errors.push(at + ' showOnHome 必须为 true/false');
    if (typeof p.showInWorks !== 'boolean') errors.push(at + ' showInWorks 必须为 true/false');
    const cov = p.cover;
    if (!cov || COVER_KINDS.indexOf(cov.kind) < 0) errors.push(at + ' cover.kind 必须是 single / triptych');
    if (!cov || !Array.isArray(cov.images) || cov.images.length === 0) errors.push(at + ' cover.images 不能为空');
    else cov.images.forEach((im, i) => {
      const at2 = at + ' cover.images[' + i + ']';
      if (!im || !isStr(im.src)) { errors.push(at2 + ' 缺 src'); return; }
      if (im.src.indexOf('assets/') !== 0 || im.src.indexOf('..') >= 0) errors.push(at2 + ' src 必须是 assets/ 下的相对路径');
      else if (!fs.existsSync(path.join(SITE, im.src))) errors.push(at2 + ' 图片不存在: ' + im.src);
      if (!isStr(im.alt)) errors.push(at2 + ' 缺 alt 文本');
    });
  });
  return errors;
}

export function build({ quiet = false } = {}) {
  const list = loadProjects();
  const errors = validateProjects(list);
  if (errors.length) {
    if (!quiet) { console.error('✗ 校验失败（' + errors.length + ' 项）：'); errors.forEach(e => console.error('  - ' + e)); }
    const err = new Error('validation failed'); err.errors = errors; throw err;
  }
  writeGenerated(list);
  if (!quiet) console.log('✓ 校验通过：' + list.length + ' 个项目；已生成 content/projects-data.js');
  return list;
}
