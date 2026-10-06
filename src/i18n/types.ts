// Content shape for all languages — assembles the existing config interfaces
import type {
  SiteConfig,
  HeroConfig,
  NarrativeTextConfig,
  CardStackConfig,
  BreathSectionConfig,
  ZigZagGridConfig,
  ScaniaConfig,
  ProductConfig,
  SoundPodConfig,
  ServicesConfig,
  PhdPitchConfig,
  CredentialsConfig,
  ResearchConfig,
  PublicationsConfig,
  FooterConfig,
  NavConfig,
} from '../config';

export interface Content {
  site: SiteConfig;
  nav: NavConfig;
  hero: HeroConfig;
  narrative: NarrativeTextConfig;
  cards: CardStackConfig;
  breath: BreathSectionConfig;
  zigzag: ZigZagGridConfig;
  scania: ScaniaConfig;
  product: ProductConfig;
  soundpod: SoundPodConfig;
  phd: PhdPitchConfig;
  services: ServicesConfig;
  credentials: CredentialsConfig;
  research: ResearchConfig;
  publications: PublicationsConfig;
  footer: FooterConfig;
}

export type Language = 'en' | 'bn' | 'id';

export const languageMeta: Record<Language, { label: string; short: string; htmlLang: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  bn: { label: 'বাংলা', short: 'বাং', htmlLang: 'bn' },
  id: { label: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id' },
};
