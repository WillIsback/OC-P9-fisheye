"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import LbContactForm from "src/app/[locale]/photographer/[photographer]/lightbox/LbContactForm";
import ContactForm from "../Form/ContactForm";

export default function BtnContact({ name }: { readonly name: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const t = useTranslations("Contact");

	return (
		<>
			<button
				type="button"
				className={`btn--primary`}
				onClick={() => setIsOpen(true)}
			>
				{t("buttonText")}
			</button>
			<LbContactForm isOpen={isOpen} setIsOpen={setIsOpen}>
				<h2>
					{t("modalTitle")}
					<br />
					{name}
				</h2>
				<ContactForm />
			</LbContactForm>
		</>
	);
}
