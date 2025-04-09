import { MetadataRoute } from 'next';

const BASE_URL = `https://pgnear.me`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		}
	];
}