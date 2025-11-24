import type { Metadata, ResolvingMetadata } from "next";
import { notFound, RedirectType, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchPhotographer, fetchPictures } from "@/actions/prisma.action";
import DropDownFilter from "@/components/DropDown/DropDownFilter";
import GridWorks from "@/components/Grid/GridWorks/GridWorks";
import BannerPhotographer from "@/components/Header/BannerPhotographer/BannerPhotographer";
import {
	getMediaNavIndex,
	handleSortingFilter,
	isMediaId,
	isSortCategory,
} from "@/lib/utils.server";
import Modal from "./lightbox/Modal";
import styles from "./page.module.css";

type Props = {
	params: Promise<{ photographer: string; locale: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { photographer, locale } = await params;
	const { mediaId } = await searchParams;

	// fetch data
	const tMedia = await getTranslations({ locale, namespace: "Media" });
	const tPhotographer = await getTranslations({
		locale,
		namespace: "Photographer",
	});

	const photographerData = await fetchPhotographer(Number(photographer));

	if (!photographer || !photographerData) {
		notFound();
	}

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];
	if (mediaId) {
		const mediaData = await fetchPictures(Number(photographer));
		if (!mediaData) {
			notFound();
		}
		const media = mediaData.find((media) => media.id === Number(mediaId));
		if (!media) {
			notFound();
		}
		return {
			title: media.image
				? tMedia("imageMetaTitle", { title: media.title })
				: tMedia("videoMetaTitle", { title: media.title }),
			description: tMedia("mediaMetaDescription", {
				name: photographerData.name,
				date: media.date,
				likes: media.likes,
				price: media.price,
			}),
			openGraph: {
				title: tMedia("mediaOgTitle", { title: media.title }),
				description: tMedia("mediaMetaDescription", {
					name: photographerData.name,
					date: media.date,
					likes: media.likes,
					price: media.price,
				}),
				images: [
					{
						url: media.image ? `${media.image}` : `${media.video}`,
						alt: `${media.title}`,
						width: 1050,
						height: 900,
					},
					...previousImages,
				],
			},
		};
	}
	return {
		title: tPhotographer("metaTitle", {
			name: photographerData.name,
			city: photographerData.city,
			country: photographerData.country,
		}),
		description: tPhotographer("metaDescription", {
			tagline: photographerData.tagline,
			name: photographerData.name,
			city: photographerData.city,
			price: photographerData.price,
		}),
		openGraph: {
			title: tPhotographer("ogTitle", { name: photographerData.name }),
			description: photographerData.tagline,
			images: [
				{
					url: photographerData.portrait,
					alt: tPhotographer("ogPortraitAlt", { name: photographerData.name }),
					width: 400,
					height: 400,
				},
				...previousImages,
			],
		},
	};
}

export default async function PhotographerPage({
	params,
	searchParams,
}: Props) {
	const { sort, mediaId } = await searchParams;
	const { photographer, locale } = await params;
	const allPics = await fetchPictures(Number(photographer));
	if (!allPics) {
		notFound();
	}

	const tErrors = await getTranslations({ locale, namespace: "Errors" });

	if (!isSortCategory(sort) || !sort) {
		redirect(`/${locale}/photographer/{photographer}?sort=popularite`, RedirectType.push)
	}
	const sortedPics = handleSortingFilter(sort, allPics) ?? allPics;
	const [nextMediaId, prevMediaId] = getMediaNavIndex(sortedPics, mediaId) ?? [-1,-1];

	const photographerData = await fetchPhotographer(Number(photographer));
	if (!photographerData) {
		notFound();
	}
	const picture = sortedPics.find((picture) => picture.id === Number(mediaId)) ?? null;

	if (mediaId && !picture) {
		notFound();
	}

	return (
		<div className={styles.photographerpage}>
			<BannerPhotographer photographer={photographerData} />
			<DropDownFilter />
			<GridWorks pictures={sortedPics} />
			{isMediaId(mediaId) && (
				<Modal
					picture={picture}
					nextMediaId={nextMediaId}
					prevMediaId={prevMediaId}
					sort={sort}
				/>
			)}
		</div>
	);
}
