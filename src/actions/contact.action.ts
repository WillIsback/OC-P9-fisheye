"use server";

import DOMPurify from "isomorphic-dompurify";
import * as z from "zod";

const initialState = {
	message: "",
	success: false,
};

type Init = typeof initialState;

const schema = z.object({
	prenom: z.string(),
	nom: z.string(),
	mail: z.email("Email invalide"),
	message: z.string(),
});

const formSanitize = (data : {
    prenom: string;
    nom: string;
    mail: string;
    message: string;
}) => {
  return  {
    prenom: DOMPurify.sanitize(data.prenom),
    nom: DOMPurify.sanitize(data.nom),
    mail: DOMPurify.sanitize(data.mail),
    message: DOMPurify.sanitize(data.message),
  }
}

export async function sendMail(initialState: Init, formData: FormData) {
	const validateFields = schema.safeParse({
		prenom: formData.get("prenom"),
		nom: formData.get("nom"),
		mail: formData.get("mail"),
		message: formData.get("message"),
	});
	if (validateFields.success) {
    const cleanData = formSanitize(validateFields.data)
		console.log("Formulaire saisi : ", cleanData);
		return {
			...initialState,
			message: `${JSON.stringify(cleanData)}`,
			success: true,
		};
	} else {
		return {
			...initialState,
			message: `${JSON.stringify(validateFields.error)}`,
			success: false,
		};
	}
}
