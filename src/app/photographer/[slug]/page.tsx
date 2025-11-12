import { fetchPhotographer, fetchPictures } from "@/actions/prisma.action"
import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";
import DropDownFilter from "@/components/DropDown/DropDownFilter";
import FilterProvider from "@/context/FilterProvider";
import GridPicture from "@/components/Grid/GridPicture/GridPicture";

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
    <div>
       <BannerPhotographer photographer={photographer} />
       <FilterProvider>
        <DropDownFilter />
        <GridPicture pictures={pictures}/>
       </FilterProvider>
    </div>
  )
}