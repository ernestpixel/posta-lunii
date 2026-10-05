import { CONSENT_COOKIE, CONSENT_VERSION } from './legal'

/**
 * Rulează în <head>, înaintea oricărui tag Google: Consent Mode v2 cu totul
 * refuzat implicit, apoi restabilește acordul salvat (dacă există).
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c.v===${CONSENT_VERSION}&&c.analytics===true){gtag('consent','update',{analytics_storage:'granted'})}}}catch(e){}`
