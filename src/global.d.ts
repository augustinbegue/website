/// <reference types="svelte" />

import type { Timestamp } from "firebase/firestore";

interface Media {
    type: "image" | "video";
    src: string;
}

interface Link {
    display: string;
    url: string;
}

interface Project {
    path: string;
    name: string;
    description: string;
    link?: Link;
    repo?: Link;
    media: Media;
    tags: string[];
    dates: string[];
    status: "in progress" | "inactive" | "completed" | "abandoned";
}

interface Experience {
    duration: string;
    title: string;
    description: string;
    type: string;
    tags: string[];
    date: Timestamp;
    location: string;
}

export interface PageComponent {
    animationStep1?: () => void;
    intro: () => Promise<void>;
    outro: () => Promise<void>;
}