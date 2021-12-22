/// <reference types="svelte" />

interface Media {
    type: "image" | "video";
    src: string;
}

interface Link {
    display: string;
    url: string;
}

interface Project {
    name: string;
    description: string;
    link?: Link;
    repo?: Link;
    media: Media;
    tags: string[];
    dates: string[];
    status: "in progress" | "inactive" | "completed" | "abandoned";
}

export interface PageComponent {
    intro: () => Promise<void>;
    outro: () => Promise<void>;
}