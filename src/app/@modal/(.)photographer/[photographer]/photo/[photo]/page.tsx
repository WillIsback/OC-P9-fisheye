import { Modal } from "./modal";
import PhotoPage from "app/photographer/[photographer]/photo/[photo]/page";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ photographer: string, photo: string }>
}) {
  return(
  <Modal>
    <PhotoPage params={params}/>
  </Modal>)
}