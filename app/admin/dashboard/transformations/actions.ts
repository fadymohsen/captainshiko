'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

export async function getTransformations() {
  return await prisma.transformation.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function updateTransformationOrder(ids: string[]) {
  try {
    const updates = ids.map((id, index) => 
      prisma.transformation.update({
        where: { id },
        data: { order: index }
      })
    );
    await prisma.$transaction(updates);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Failed to update order:", error);
    return { success: false, error: "Failed to update order" };
  }
}

export async function deleteTransformation(id: string) {
  console.log("Attempting to delete transformation:", id);
  try {
    const transformation = await prisma.transformation.findUnique({
      where: { id }
    });

    if (!transformation) {
      console.error("Transformation not found for deletion:", id);
      return { success: false, error: "Transformation not found" };
    }

    if (transformation.imagePath.includes('public.blob.vercel-storage.com')) {
        console.log("Deleting blob image:", transformation.imagePath);
        try {
            await del(transformation.imagePath);
        } catch (e) {
            console.warn("Could not delete from cloud (non-fatal):", e);
        }
    }

    await prisma.transformation.delete({
      where: { id }
    });

    console.log("Transformation deleted from database:", id);
    revalidatePath('/admin/dashboard/transformations');
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error("Delete error details:", error);
    return { success: false, error: "Failed to delete from database" };
  }
}

export async function saveTransformation(formData: FormData) {
  const id = formData.get('id') as string;
  const nameEn = formData.get('nameEn') as string;
  const nameAr = formData.get('nameAr') as string;
  const age = parseInt(formData.get('age') as string) || null;
  const resultEn = formData.get('resultEn') as string;
  const resultAr = formData.get('resultAr') as string;
  const durationEn = formData.get('durationEn') as string;
  const durationAr = formData.get('durationAr') as string;
  const imageFile = formData.get('image') as File | null;

  try {
    let imagePath = formData.get('currentImagePath') as string;

    if (imageFile && imageFile.size > 0) {
      // Upload to Vercel Blob
      const blob = await put(imageFile.name, imageFile, {
        access: 'public',
      });
      imagePath = blob.url;
      
      // If updating and old image was a blob, we might want to delete it
      const oldPath = formData.get('currentImagePath') as string;
      if (oldPath && oldPath.includes('public.blob.vercel-storage.com')) {
          try {
              await del(oldPath);
          } catch (e) {
              console.warn("Could not delete old blob:", e);
          }
      }
    }

    if (id) {
       await prisma.transformation.update({
         where: { id },
         data: { nameEn, nameAr, age, resultEn, resultAr, durationEn, durationAr, imagePath }
       });
    } else {
       const lastItem = await prisma.transformation.findFirst({
         orderBy: { order: 'desc' }
       });
       const nextOrder = lastItem ? lastItem.order + 1 : 0;

       await prisma.transformation.create({
         data: { nameEn, nameAr, age, resultEn, resultAr, durationEn, durationAr, imagePath, order: nextOrder }
       });
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Save error:", error);
    return { success: false, error: "Failed to save transformation" };
  }
}
