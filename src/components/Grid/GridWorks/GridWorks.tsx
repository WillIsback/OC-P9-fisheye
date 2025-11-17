import { Spinner } from "@/components/components/ui/spinner";
import MiniaWork from "@/components/Minia/Work/MiniaWork";
import type { Pictures } from "@/types/types";
import styles from "./GridWorks.module.css";

export default function GridWorks({
	pictures,
}: {
	readonly pictures: Pictures;
}) {
	if (!pictures) return <Spinner />;
	return (
		<section className={styles.gridworks__section}>
			{pictures.map((picture) => (
				<MiniaWork key={picture.id} picture={picture} />
			))}
		</section>
	);
}
