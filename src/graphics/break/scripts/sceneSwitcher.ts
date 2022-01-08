import { activeBreakScene } from '../../helpers/replicants';
import gsap from 'gsap';

const sceneSwitchTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    sceneSwitchTl.addLabel('sceneHide');

    switch (oldValue) {
        case 'main':
            sceneSwitchTl.add(hideMainScene());
    }

    sceneSwitchTl.addLabel('sceneShow');

    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene());
    }
});

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.main-scene-wrapper', { display: 'none' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.main-scene-wrapper .accent-line', {
            duration: 0.75,
            ease: 'power2.in',
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        }, 'sceneHide+=0.2')
        .to('.main-scene-wrapper .text-wrapper > .logo, .main-scene-wrapper .text-wrapper .text > *', {
            y: 25,
            ease: 'power2.in',
            duration: 0.5,
            stagger: -0.1,
            opacity: 0
        }, 'sceneHide');

    return tl;
}

function showMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.main-scene-wrapper', { display: 'block' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .fromTo('.main-scene-wrapper .text-wrapper > .logo, .main-scene-wrapper .text-wrapper .text > *', {
            y: -25,
            immediateRender: false
        }, {
            y: 0,
            ease: 'power2.out',
            duration: 0.5,
            stagger: 0.1,
            opacity: 1
        }, 'sceneShow')
        .fromTo('.main-scene-wrapper .accent-line', {
            immediateRender: false,
            clipPath: 'clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);'
        }, {
            duration: 0.75,
            ease: 'power2.out',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }, 'sceneShow');

    return tl;
}
