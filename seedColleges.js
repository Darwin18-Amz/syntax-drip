// seedColleges.js
const fs   = require('fs');
const fetch = require('node-fetch');
const pdf   = require('pdf-parse');
const admin = require('firebase-admin');

// 1) initialize the Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // or your service account key
});
const db = admin.firestore();

async function main() {
  // 2) fetch the PDF bytes
  console.log('Downloading PDF...');
  const res = await fetch('https://www.aicte-india.org/sites/default/files/Engineering.pdf');
  const buffer = await res.arrayBuffer();

  // 3) parse all text
  console.log('Parsing PDF...');
  const data = await pdf(Buffer.from(buffer));
  const text = data.text; // entire text in one string

  // 4) improved regex: catch words ending in Institute/College/University
  const rx = /\b[A-Z][A-Za-z0-9 &'’\-,\.]{5,}?(?:Institute|College|University)\b/g;
  const names = Array.from(new Set(text.match(rx) || []))
                     .map(n => n.trim())
                     .filter(n => n.length > 5);

  console.log(`Found ${names.length} unique names.`);

  // 5) write to Firestore lookup
  const ref = db.collection('lookups').doc('colleges');
  await ref.set({ names }, { merge: true });

  console.log('Seeded lookups/colleges in Firestore.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});