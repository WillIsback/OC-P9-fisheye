import { fetchPictures } from "@/actions/prisma.action";
import styles from './page.module.css'
import { BigMediaDisplay } from "@/components/Minia/Work/MediaDisplay";
export default async function PhotoPage({
  params,
}: {
  params: Promise<{ photographer: string, photo: string }>
}) {
  const { photographer, photo } = await params;
  console.log("photo param :", photo, photographer)
  const allPics = await fetchPictures(Number(photographer));
  const picture = allPics.find((picture) => picture.id === Number(photo));

  if(!picture)return<div>loading ...</div>

  return (
      <BigMediaDisplay
          image={picture.image}
          video={picture.video}
          title={picture.title}
          width={1050}
          height={900}
      />
  )
}