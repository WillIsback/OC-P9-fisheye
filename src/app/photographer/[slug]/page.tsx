import { fetchPhotographer } from "@/actions/prisma.action"
import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";

export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const photographer = await fetchPhotographer(Number(slug));

  console.log("photographer :", photographer);
  return (
    <div>
       <BannerPhotographer photographer={photographer} />
       {/** TODO Photographer gaellery filter */}
       {/** TODO Photographer gallery */}

    </div>
  )
}