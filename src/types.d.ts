export interface PageComponent {
    intro: () => Promise<void>;
    outro: () => Promise<void>;
}