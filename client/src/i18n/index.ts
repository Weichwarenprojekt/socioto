import { createI18n } from "vue-i18n";
import adminGalleryEN from "@/modules/admin-gallery/i18n/en.json";
import adminGalleryDE from "@/modules/admin-gallery/i18n/de.json";
import adminLoginEN from "@/modules/admin-login/i18n/en.json";
import adminLoginDE from "@/modules/admin-login/i18n/de.json";
import adminOverviewEN from "@/modules/admin-overview/i18n/en.json";
import adminOverviewDE from "@/modules/admin-overview/i18n/de.json";
import clientGalleryEN from "@/modules/client-gallery/i18n/en.json";
import clientGalleryDE from "@/modules/client-gallery/i18n/de.json";
import clientLoginEN from "@/modules/client-login/i18n/en.json";
import clientLoginDE from "@/modules/client-login/i18n/de.json";

export enum Locales {
    EN = "en",
    DE = "de",
}

export const LOCALES = [
    { value: Locales.EN, caption: "English" },
    { value: Locales.DE, caption: "Deutsch" },
];

export const messages = {
    [Locales.EN]: {
        adminGallery: adminGalleryEN,
        adminLogin: adminLoginEN,
        adminOverview: adminOverviewEN,
        clientGallery: clientGalleryEN,
        clientLogin: clientLoginEN,
    },
    [Locales.DE]: {
        start: adminGalleryDE,
        adminLogin: adminLoginDE,
        adminOverview: adminOverviewDE,
        clientGallery: clientGalleryDE,
        clientLogin: clientLoginDE,
    },
};

export const defaultLocale = Locales.EN;

export default createI18n({
    legacy: false,
    locale: navigator.language.split("-")[0],
    fallbackLocale: Locales.EN,
    messages: messages,
    globalInjection: true,
});
