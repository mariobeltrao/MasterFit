import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { units } from '../src/data/units.ts';
import { aeroclubePricing, planWhatsAppUrl } from '../src/data/pricing.ts';
import { monthlyPricingByUnit, monthlyPlanWhatsAppUrl } from '../src/data/monthlyPricing.ts';
const [master,equilibrium]=aeroclubePricing.categories;
assert.deepEqual(master.plans.map(p=>p.amount),['179,90','159,90','139,90','119,90','139,90']);
assert.deepEqual(equilibrium.plans.map(p=>p.amount),['159,90','139,90','119,90','99,90','119,90']);
for(const c of [master,equilibrium]) {
 assert.deepEqual(c.plans.map(p=>p.installments),[undefined,3,6,12,undefined]);
 assert.equal(c.plans.filter(p=>p.benefit?.includes('Amigo VIP')).length,1);
 for(const p of c.plans) assert.equal(new URL(planWhatsAppUrl(units[0].whatsapp,p.name,c.name)).pathname,'/5583998325451');
}
assert.equal(master.access,'Acesso conforme as condições do plano Master e o funcionamento da unidade.');
assert.match(equilibrium.access,/10h às 14h/);
assert.match(equilibrium.access,/sábados, domingos e feriados/);
assert.deepEqual(monthlyPricingByUnit['sao-jose-de-piranhas'].plans.map(p=>p.amount),['75,00','65,00']);
assert.equal(monthlyPricingByUnit['sao-jose-de-piranhas'].plans[1].access,'ACESSO RESTRITO: DAS 11H ÀS 15H');
assert.deepEqual(monthlyPricingByUnit.carrapateira.plans.map(p=>p.amount),['70,00']);
for(const slug of ['sao-jose-de-piranhas','carrapateira']) {
 const u=units.find(u=>u.slug===slug); assert.equal(u.whatsapp,'https://wa.me/5583996191918'); assert.equal(u.instagram,'https://www.instagram.com/ct.masterfit/');
 for(const p of monthlyPricingByUnit[slug].plans) { const url=new URL(monthlyPlanWhatsAppUrl(u.whatsapp,p.message)); assert.equal(url.searchParams.get('text'),p.message); assert.equal(url.pathname,'/5583996191918'); }
}
const files=[];
function collect(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())collect(p);else files.push(p);}}collect('src');
const paths=new Set();
function walk(o){if(typeof o==='string'&&/^\/(assets|videos)\//.test(o)){for(const src of o.split(', '))paths.add(src.split(' ')[0]);}else if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object')Object.values(o).forEach(walk);}walk(units);
for(const p of files)for(const m of fs.readFileSync(p,'utf8').matchAll(/["'](\/(?:assets|videos)\/[^"'`]+)["']/g))paths.add(m[1]);
for(const src of paths)assert.ok(fs.existsSync('public'+src),src);
const rules=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/AKIA[0-9A-Z]{16}/,/gh[pousr]_[A-Za-z0-9]{30,}/,/sk_live_[A-Za-z0-9]{16,}/,/(?:password|api[_-]?key|secret|token)\s*[:=]\s*["'][^"']{12,}["']/i];
const suspects=[];for(const p of [...files,'index.html','package.json']){const s=fs.readFileSync(p,'utf8');rules.forEach((r,i)=>{if(r.test(s))suspects.push({file:p,rule:i});});}
const result={date:'2026-11-05',commercial:'13 opções/parcelamentos/URLs e condições conferidas por assertions',assets:[...paths],missingAssets:[],secretScan:{files:files.length+2,suspects,scope:'heurístico, fontes/configuração; sem histórico Git, pois não há .git'},publicFiles:[]};
function sizes(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())sizes(p);else result.publicFiles.push({path:p,bytes:fs.statSync(p).size});}}sizes('public');
fs.writeFileSync('audit/static-checks.json',JSON.stringify(result,null,2));console.log(JSON.stringify({assets:paths.size,commercial:'OK',secretSuspects:suspects.length}));
