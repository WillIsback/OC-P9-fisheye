import { fetchPictures, fetchPhotographer } from "@/actions/prisma.action"
import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";
import DropDownFilter from "@/components/DropDown/DropDownFilter";
import GridWorks from "@/components/Grid/GridWorks/GridWorks";
import styles from './page.module.css'
import { handleSortingFilter, isSortCategory, isMediaId, getMediaNavIndex } from "@/lib/utils.server";
import  Modal  from "./lightbox/Modal";

export default async function PhotographerPage({
  params,
  searchParams,
}: {
  params: Promise<{ photographer: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { sort, mediaId} = (await searchParams)
  const { photographer } = await params;
  const allPics = await fetchPictures(Number(photographer));

  if(!isSortCategory(sort)) return <div>Probleme avec le param &apos;sort&apos;</div>
  const sortedPics = handleSortingFilter(sort, allPics) 
  const [nextMediaId, prevMediaId] = getMediaNavIndex(sortedPics, mediaId)

  console.log(`Actuel: ${Number(mediaId)}, Précédent: ${prevMediaId}, Suivant: ${nextMediaId}`);
  console.log("photographer :", photographer);

  const photographerData = await fetchPhotographer(Number(photographer));
  const picture = sortedPics.find((picture) => picture.id === Number(mediaId)) ?? null;

  return (
    <div className={styles.photographerpage}>
       <BannerPhotographer photographer={photographerData} />
        <DropDownFilter />
        <GridWorks pictures={sortedPics}/>
        {isMediaId(mediaId) &&
          <Modal
              picture={picture} 
              nextMediaId={nextMediaId} 
              prevMediaId={prevMediaId}
              sort={sort}
          />
        }
    </div>
  )
}