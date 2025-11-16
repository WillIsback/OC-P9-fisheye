import { fetchPictures, fetchPhotographer } from "@/actions/prisma.action"
import { handleSortingFilter, isSortCategory, isMediaId, getMediaNavIndex } from "@/lib/utils.server";
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";
import DropDownFilter from "@/components/DropDown/DropDownFilter";
import GridWorks from "@/components/Grid/GridWorks/GridWorks";
import styles from './page.module.css'
import  Modal  from "./lightbox/Modal";

type Props = {
  params: Promise<{ photographer: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { photographer } = await params
  const { mediaId } = await searchParams
 
  // fetch data

  const photographerData = await fetchPhotographer(Number(photographer));
  
  if(!photographer || !photographerData){notFound()}
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  if(mediaId){
    const mediaData = await fetchPictures(Number(photographer));
    if(!mediaData){notFound()}
    const media = mediaData.find((media) => (media.id === Number(mediaId)));
    if(!media){notFound()}
    return {
      title: media.image ? `Affichage de l'image ${media.title}` : `Affichage de la video ${media.title}`,
      description: `Media du photograph ${photographerData.name}, datant du ${media.date}, liké ${media.likes}. Tarif: ${media.price}`,
      openGraph: {
        title: `${media.title} - Affichage du Media`,
        description: `Media du photograph ${photographerData.name}, datant du ${media.date}, liké ${media.likes}. Tarif: ${media.price}`,
        images: [
          {
            url: media.image ? `${media.image}` : `${media.video}`,
            alt: `${media.title}`,
            width: 1050,
            height: 900,
          },
          ...previousImages
        ],
      },
    }
  }
  return {
    title: `${photographerData.name} - Photographe à ${photographerData.city}, ${photographerData.country}`,
    description: `${photographerData.tagline} - Découvrez le portfolio de ${photographerData.name}, photographe basé à ${photographerData.city}. Tarif: ${photographerData.price}€/jour`,
    openGraph: {
      title: `${photographerData.name} - Portfolio Photographe`,
      description: photographerData.tagline,
      images: [
        {
          url: photographerData.portrait,
          alt: `Portrait de ${photographerData.name}`,
          width: 400,
          height: 400,
        },
        ...previousImages
      ],
    },
  }
}

export default async function PhotographerPage(
  {params, searchParams}: Props
){
  const { sort, mediaId} = (await searchParams)
  const { photographer } = await params;
  const allPics = await fetchPictures(Number(photographer));
  if(!allPics){notFound()};


  if(!isSortCategory(sort)) return <div>Probleme avec le param &apos;sort&apos;</div>
  const sortedPics = handleSortingFilter(sort, allPics) 
  const [nextMediaId, prevMediaId] = getMediaNavIndex(sortedPics, mediaId)

  console.log(`Actuel: ${Number(mediaId)}, Précédent: ${prevMediaId}, Suivant: ${nextMediaId}`);
  console.log("photographer :", photographer);

  const photographerData = await fetchPhotographer(Number(photographer));
  if(!photographerData){notFound()};
  const picture = sortedPics.find((picture) => picture.id === Number(mediaId)) ?? null;
  if(mediaId && !picture){notFound()};

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