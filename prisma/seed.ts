import { PrismaClient } from '../src/generated/prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';

const prisma = new PrismaClient();

async function main() {
  // Lire les fichiers JSON
  const photographersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/photographer.json'), 'utf-8'),
  );

  const mediaData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/media.json'), 'utf-8'),
  );

  console.log(`📸 Insertion de ${photographersData.length} photographes...`);

  // Insérer les photographes
  for (const photographer of photographersData) {
    await prisma.photographer.create({
      data: {
        id: photographer.id,
        name: photographer.name,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        price: photographer.price,
        portrait: photographer.portrait,
      },
    });
  }

  console.log(`✅ ${photographersData.length} photographes insérés`);
  console.log(`📷 Insertion de ${mediaData.length} médias...`);

  // Insérer les médias
  for (const media of mediaData) {
    await prisma.media.create({
      data: {
        photographerId: media.photographerId,
        title: media.title,
        image: media.image || null,
        video: media.video || null,
        likes: media.likes,
        date: media.date,
        price: media.price,
      },
    });
  }

  console.log(`✅ ${mediaData.length} médias insérés`);
  console.log(`🎉 Base de données peuplée avec succès !`);
}

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    return prisma.$disconnect().then(() => {
      process.exit(1);
    });
  });
