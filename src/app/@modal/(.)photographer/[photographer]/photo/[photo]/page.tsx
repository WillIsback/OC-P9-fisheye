import { Modal } from "./modal";

import { fetchPictures } from "@/actions/prisma.action";
import MediaDisplay from "@/components/Minia/Work/MediaDisplay";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ photographer: string, photo: string }>
}) {
  const { photographer, photo } = await params;
  console.log("photo param :", photo, photographer)
  const allPics = await fetchPictures(Number(photographer));
  const picture = allPics.find((picture) => picture.id === Number(photo));

  if(!picture)return<div>loading ...</div>

  return(
  <Modal>
    <div className="card">
      <MediaDisplay
        image={picture?.image}
        video={picture?.video}
        title={picture?.title}
        focus={picture?.Focus}
        width={1242}
        height={900}
        objectfit="contain"
      />
    </div>
  </Modal>)
}