import gsap from 'gsap';
import { mainFlavorText } from '../../helpers/replicants';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';

export function toggleMainRow(isVisible: boolean, rowClass: string): void {
    const selector = `.${rowClass}`;
    const tl = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: 'power2.inOut'
        }
    });

    tl
        .to(selector, {
            height: isVisible ? '70px' : '0px',
            delay: isVisible ? 0 : 0.1
        }, 'row-toggle')
        .to(selector, {
            opacity: isVisible ? 1 : 0,
            delay: isVisible ? 0.1 : 0
        }, 'row-toggle');
}

mainFlavorText.on('change', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        textOpacitySwap(newValue, elementById('main-flavor-text'));
    }
});

const socialTextElem = elementById<FittedText>('main-scene-socials-text');
const socialLoopTl = gsap.timeline({ repeat: -1 });
const socialInfo: Array<{ icon: string, text: string }> = [
    {
        icon: 'fa-twitter',
        text: '@IPLSplatoon'
    },
    {
        icon: 'fa-discord',
        text: 'iplabs.ink/discord'
    }
];

const socialIconElem = elementById('main-scene-socials-icon-wrapper');

for (let i = 0; i < socialInfo.length; i++) {
    const element = socialInfo[i];
    const previousElement = socialInfo[i - 1 === -1 ? socialInfo.length - 1 : i - 1];

    socialLoopTl
        .add(textOpacitySwap(
            element.text,
            socialTextElem,
            [socialIconElem],
            {
                afterHide: () => {
                    elementById('main-scene-socials-icon').classList.replace(previousElement.icon, element.icon);
                }
            }))
        .to({}, { duration: 30 });
}
