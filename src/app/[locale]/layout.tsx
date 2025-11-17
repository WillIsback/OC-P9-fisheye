import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { routing } from "i18n/routing";
import { pick } from 'lodash';
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type React from "react";
import IndexHeader from "@/components/Header/Index/IndexHeader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'HomePage' });

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
	};
}

export default async function RootLayout({
	children,
	modal,
	params,
}: {
	readonly children: React.ReactNode;
	readonly modal: React.ReactNode;
	readonly params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable}`}
			>
				<NextIntlClientProvider messages={messages}>
					<IndexHeader />
					{children}
					<div id="modal-root">{modal}</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
