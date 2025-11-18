"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { sendMail } from "@/actions/contact.action";
import styles from "./form.module.css";

const initialState = {
	message: "",
	success: false,
};

export default function ContactForm() {
	const [state, formAction, pending] = useActionState(sendMail, initialState);
	const t = useTranslations("Contact");

	return (
		<form action={formAction} className={styles.contactform}>
			<label htmlFor="prenom">{t("formFirstName")}</label>
			<input
				type="text"
				name="prenom"
				id="prenom"
				aria-label={t("formFirstNameAriaLabel")}
				required
			/>
			<label htmlFor="nom">{t("formLastName")}</label>
			<input type="text" name="nom" id="nom" required />
			<label htmlFor="mail">{t("formEmail")}</label>
			<input type="email" name="mail" id="mail" required />
			<label htmlFor="message">{t("formMessage")}</label>
			<textarea name="message" id="message" required />
			{!state.success && <p>{state.message}</p>}
			<button
				type="submit"
				className="btn--primary"
				disabled={pending}
				id="submit-btn"
				name="submit-btn"
			>
				{t("submitButton")}
			</button>
		</form>
	);
}
