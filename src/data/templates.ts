export interface Template {
    id: string;
    title: string;
    platform: 'Instagram' | 'LinkedIn' | 'Twitter';
    description: string;
    preview: string;
}

export const TEMPLATES: Template[] = [
    {
        id: '1',
        title: 'Product Launch Announcement',
        platform: 'Instagram',
        description: 'Energetic announcement for a new product release.',
        preview: '🚀 distinct gradient background with product abstract'
    },
    {
        id: '2',
        title: 'Professional Insight',
        platform: 'LinkedIn',
        description: 'Share a key industry insight or learning.',
        preview: '💼 clean minimal layout for text'
    },
    {
        id: '3',
        title: 'Weekly Roundup Thread',
        platform: 'Twitter',
        description: 'A thread summarizing key events of the week.',
        preview: '🐦 thread visualization'
    },
    {
        id: '4',
        title: 'Customer Testimonial',
        platform: 'Instagram',
        description: 'Showcase a glowing review from a happy client.',
        preview: '⭐ quote style layout'
    },
    {
        id: '5',
        title: 'Behind the Scenes',
        platform: 'Instagram',
        description: 'A sneak peek into your daily workflow.',
        preview: '🎬 photo grid layout'
    },
    {
        id: '6',
        title: 'Job Opening',
        platform: 'LinkedIn',
        description: 'Professional job posting to attract talent.',
        preview: '🤝 hiring banner style'
    }
];
