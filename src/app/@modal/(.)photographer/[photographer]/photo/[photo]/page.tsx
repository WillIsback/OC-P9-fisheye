import { Modal } from "./modal";
import PhotoPage from "app/photographer/[photographer]/photo/[photo]/page";
import { fetchPictures } from "@/actions/prisma.action";
import { handleSortingFilter } from "@/lib/utils.client";
import { VALID_SORTS } from "@/lib/constants";
import { type SortCategory } from "@/types/types";


function isSortCategory(value: string | string[] | undefined): value is SortCategory {
  return typeof value === 'string' && (VALID_SORTS as readonly string[]).includes(value);
}


export default async function PhotoModal({
  params,
  searchParams,
}: {
  params: Promise<{ photographer: string, photo: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sort = (await searchParams).sort
  const { photographer, photo } = await params;
  const allPics = await fetchPictures(Number(photographer));

  if(!isSortCategory(sort)) return <div>Probleme avec le param &apos;sort&apos;</div>
  const sortedPics = handleSortingFilter(sort, allPics) 
  const sortedIds = sortedPics.map((p) => p.id);
  const currentIndex = sortedIds.indexOf(Number(photo));
  const picture = sortedPics.find((picture) => picture.id === Number(photo));
  if (currentIndex === -1) {
      console.error("Photo non trouvée dans la liste triée !");
  }
  const nextIndex = (currentIndex + 1) % sortedIds.length;
  const nextPhotoId = sortedIds[nextIndex];
  const prevIndex = (currentIndex - 1 + sortedIds.length) % sortedIds.length;
  const prevPhotoId = sortedIds[prevIndex];

  console.log(`Actuel: ${Number(photo)}, Précédent: ${prevPhotoId}, Suivant: ${nextPhotoId}`);

  if (!picture){return <div>Erreur dans la recuperation de l&apos;image</div>}
  return(
  <Modal>
    <PhotoPage 
      picture={picture} 
      nextPhotoId={nextPhotoId} 
      prevPhotoId={prevPhotoId}
      sort={sort}
    />
  </Modal>)
}