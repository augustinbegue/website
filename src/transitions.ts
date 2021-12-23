import { sineIn } from "svelte/easing";

export function popup(node: HTMLElement, { duration = 300, delay = 0, color = "#61afef" }) {
    return {
        delay,
        duration,
        css: (t, u) => {
            const eased = sineIn(t);
            const easedu = sineIn(u);

            return `
                    opacity: ${eased};
                    transform: translateY(${easedu * 50}px);
                    transform-origin: 50% 50%;
                    text-shadow: 0 ${1 * eased}px 0 ${color}, 0 ${2 * eased}px 0 ${color}, 0 ${3 * eased}px 0 ${color},
                        0 ${4 * eased}px 0 ${color}, 0 ${5 * eased}px 0 ${color}, 0 ${6 * eased}px 0 ${color}, 0 ${7 * eased}px 0 ${color},
                        0 ${8 * eased}px 0 ${color}, 0 ${9 * eased}px 0 ${color}, 0 ${10 * eased}px 0 ${color}, 0 ${11 * eased}px 0 ${color},
                        0 ${12 * eased}px 0 ${color}, 0 ${13 * eased}px 0 ${color}, 0 ${14 * eased}px 0 ${color},
                        0 50px 30px rgba(0, 0, 0, 0.3);
                    `;
        },
        tick: (eased) => {
            if (eased == 1) {
                node.style.textShadow = `0 ${1 * eased}px 0 ${color}, 0 ${2 * eased}px 0 ${color}, 0 ${3 * eased}px 0 ${color},
                        0 ${4 * eased}px 0 ${color}, 0 ${5 * eased}px 0 ${color}, 0 ${6 * eased}px 0 ${color}, 0 ${7 * eased}px 0 ${color},
                        0 ${8 * eased}px 0 ${color}, 0 ${9 * eased}px 0 ${color}, 0 ${10 * eased}px 0 ${color}, 0 ${11 * eased}px 0 ${color},
                        0 ${12 * eased}px 0 ${color}, 0 ${13 * eased}px 0 ${color}, 0 ${14 * eased}px 0 ${color},
                        0 50px 30px rgba(0, 0, 0, 0.3)`;
            }
        }
    };
}