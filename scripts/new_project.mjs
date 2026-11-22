#!/usr/bin/env node
/**
 * 新增作品脚手架：校验字段 → 创建素材目录与案例页模板 → 追加 content/projects.json → 重新生成数据脚本。
 * 用法示例：
 *   node _tools/new_project.mjs --slug my-project --title "我的项目" --category "UI/UX · 产品设计" \
 *     --summary "一句话简介" --filter uiux --cover assets/projects/my-project/cover.jpg --layout small
 * 选项：--home true|false --works true|false --feature --tags "UI/UX,产品设计" --dry-run
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE, loadProjects, saveProjects, build, pad2 } from './projects-lib.mjs';

const argv = process.argv.slice(2);
function arg(name, def) { const i = argv.indexOf('--' + name); if (i >= 0 && argv[i + 1] && argv[i + 1].indexOf('--') !== 0) return argv[i + 1]; return def; }
function flag(name) { return argv.indexOf('--' + name) >= 0; }

const slug = arg('slug');
const title = arg('title');
const category = arg('category');
const summary = arg('summary');
const filter = arg('filter', 'uiux');
const cover = arg('cover');
const layout = arg('layout', 'small');
const coverClass = arg('cover-class', '');
const home = arg('home', 'true') !== 'false';
const works = arg('works', 'true') !== 'false';
const feature = flag('feature');
const tags = (arg('tags', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const dry = flag('dry-run');

const errors = [];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push('--slug 必须为小写字母/数字/连字符');
if (!title) errors.push('缺少 --title');
if (!category) errors.push('缺少 --category（作品分类，如 UI/UX · 产品设计）');
if (!summary) errors.push('缺少 --summary（一句话简介）');
if (['uiux', 'product'].indexOf(filter) < 0) errors.push('--filter 必须是 uiux 或 product');
if (['big', 'small', 'wide'].indexOf(layout) < 0) errors.push('--layout 必须是 big / small / wide');
if (!cover) errors.push('缺少 --cover（封面图路径，需放在 assets/ 下）');
if (cover && (cover.indexOf('assets/') !== 0 || cover.indexOf('..') >= 0)) errors.push('--cover 必须是 assets/ 下的相对路径');
if (cover && errors.length === 0 && !fs.existsSync(path.join(SITE, cover))) errors.push('封面文件不存在: ' + cover + '（请先放入 assets/ 再运行）');

let list = [];
try { list = loadProjects(); } catch (e) { errors.push('无法读取 content/projects.json: ' + e.message); }
if (slug && list.some(p => p.slug === slug)) errors.push('slug 已存在: ' + slug);
if (errors.length) { console.error('✗ 参数校验失败：'); errors.forEach(e => console.error('  - ' + e)); process.exit(1); }

const order = list.reduce((m, p) => Math.max(m, p.order || 0), 0) + 1;
const worksMeta = pad2(order) + ' — ' + category;
const entry = {
  slug: slug, order: order, title: title, filter: filter,
  worksLayout: layout, coverClass: coverClass, worksMeta: worksMeta,
  homeLayout: feature ? 'feature' : 'item', homeMeta: worksMeta, homeCat: category, homeTags: tags,
  summary: summary, homeSummary: summary,
  cover: { kind: 'single', images: [{ src: cover, alt: arg('cover-alt', title + ' 封面') }] },
  page: slug + '.html', showOnHome: home, showInWorks: works
};

if (dry) {
  console.log('— DRY RUN：不写入任何文件 —');
  console.log(JSON.stringify(entry, null, 2));
  console.log('\n将创建：' + 'assets/projects/' + slug + '/ 、' + slug + '.html（来自模板），并追加到 content/projects.json');
  process.exit(0);
}

try {
  const assetDir = path.join(SITE, 'assets', 'projects', slug);
  fs.mkdirSync(assetDir, { recursive: true });
  const readme = path.join(assetDir, 'README.txt');
  if (!fs.existsSync(readme)) fs.writeFileSync(readme, '放置《' + title + '》的封面与过程图于此目录。\n封面路径示例：assets/projects/' + slug + '/cover.jpg\n', 'utf8');

  const pagePath = path.join(SITE, slug + '.html');
  if (fs.existsSync(pagePath)) throw new Error('案例页已存在，未覆盖: ' + slug + '.html');
  const tplPath = path.join(SITE, 'templates', 'case-page-template.html');
  let tpl = fs.readFileSync(tplPath, 'utf8');
  tpl = tpl.replace(/\{\{TITLE\}\}/g, title).replace(/\{\{CATEGORY\}\}/g, category)
           .replace(/\{\{SUMMARY\}\}/g, summary).replace(/\{\{COVER\}\}/g, cover).replace(/\{\{SLUG\}\}/g, slug);
  fs.writeFileSync(pagePath, tpl, 'utf8');

  list.push(entry);
  saveProjects(list);
  build();
  console.log('\n✓ 已新增作品：' + title + ' (' + slug + ')');
  console.log('  - 素材目录：assets/projects/' + slug + '/');
  console.log('  - 案例页模板：' + slug + '.html（可自由定制正文，不受 JSON 限制）');
  console.log('  - 已追加 content/projects.json 并重新生成 content/projects-data.js');
  console.log('\n下一步：1) 把封面/图片放进素材目录；2) 编辑 ' + slug + '.html 正文；3) 本地预览 node _tools/server.mjs "' + SITE + '" 8123');
} catch (e) {
  console.error('✗ 新增失败：' + e.message);
  if (e.errors) e.errors.forEach(x => console.error('  - ' + x));
  process.exit(1);
}
