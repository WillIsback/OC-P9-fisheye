import { fetchPhotographer, fetchPictures } from "@/actions/prisma.action"
import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";
import DropDownFilter from "@/components/DropDown/DropDownFilter";
import FilterProvider from "@/context/FilterProvider";
import GridWorks from "@/components/Grid/GridWorks/GridWorks";
import styles from './page.module.css'
export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const photographer = await fetchPhotographer(Number(slug));
  const pictures = await fetchPictures(Number(slug));

  console.log("photographer :", photographer);
  return (
    <div className={styles.photographerpage}>
       <BannerPhotographer photographer={photographer} />
       <FilterProvider>
          <DropDownFilter />
          <GridWorks pictures={pictures}/>
       </FilterProvider>
    </div>
  )
}