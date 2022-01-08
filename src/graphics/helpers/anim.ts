import { gsap } from 'gsap';

export const OPACITY_ANIMATION_DURATION = 0.35;

export function textOpacitySwap(
    newText: string,
    elem: HTMLElement,
    extraElems: HTMLElement[] = [],
    callbacks?: { afterHide?: gsap.Callback, afterReveal?: gsap.Callback }
): gsap.core.Tween[] {
    return [
        gsap.to([elem, ...extraElems], {
            opacity: 0, duration: OPACITY_ANIMATION_DURATION, onComplete: () => {
                if (elem.tagName === 'FITTED-TEXT') {
                    (elem as FittedText).text = newText;
                } else {
                    elem.innerText = newText;
                }

                if (callbacks?.afterHide) {
                    callbacks.afterHide();
                }
            }
        }),
        gsap.to([elem, ...extraElems], {
            opacity: 1,
            duration:
            OPACITY_ANIMATION_DURATION,
            delay: OPACITY_ANIMATION_DURATION,
            onComplete: callbacks?.afterReveal
        })
    ];
}

export function textSlideSwap(newText: string, elem: FittedText): gsap.core.Tween[] {
    return [
        gsap.to(elem, {
            duration: 0.35,
            opacity: 0,
            x: 15,
            ease: 'power2.in',
            onComplete: () => { elem.text = newText; gsap.set(elem, { x: -15 }); }
        }),
        gsap.to(elem, { duration: 0.35, x: 0, opacity: 1, delay: 0.35, ease: 'power2.out' })
    ];
}
