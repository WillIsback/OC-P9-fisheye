"use client";
import MiniaPhotographer from "@/components/Minia/Photographer/MiniaPhotographer";
import type { EnhancedPhotographers } from "@/types/types";
import styles from "./GridPhotographer.module.css";

export default function GridPhotographer({
	enhancedPhotographers,
}: {
	readonly enhancedPhotographers: EnhancedPhotographers;
}) {
	return (
		<section className={styles.gridphotographer__section}>
			{enhancedPhotographers.map((photographer) => (
				<MiniaPhotographer key={photographer.id} photographer={photographer} />
			))}
		</section>
	);
}
