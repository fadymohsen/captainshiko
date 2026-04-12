import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import { join } from "path";

// Load env explicitly for script
import * as dotenvPkg from 'dotenv';
dotenvPkg.config();

const prisma = new PrismaClient();

async function main() {
  console.log("Starting cloud migration...");

  const transformations = await prisma.transformation.findMany();
  
  for (const trans of transformations) {
    // If it's already a blob URL, skip it
    if (trans.imagePath.includes('public.blob.vercel-storage.com')) {
      console.log(`Skipping ${trans.nameEn} (already in cloud)`);
      continue;
    }

    try {
      // Local path logic
      let localPath = trans.imagePath;
      if (localPath.startsWith('/')) {
        localPath = join(process.cwd(), 'public', localPath);
      } else {
        localPath = join(process.cwd(), 'public', 'img', 'transformations', localPath);
      }

      console.log(`Uploading ${trans.nameEn} from ${localPath}...`);
      
      const fileBuffer = await readFile(localPath);
      const fileName = localPath.split(/[\\/]/).pop() || `${trans.id}.jpg`;

      const blob = await put(fileName, fileBuffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN
      });

      await prisma.transformation.update({
        where: { id: trans.id },
        data: { imagePath: blob.url }
      });

      console.log(`Successfully migrated ${trans.nameEn} to ${blob.url}`);
    } catch (error) {
      console.error(`Failed to migrate ${trans.nameEn}:`, error);
    }
  }

  console.log("Cloud migration complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
