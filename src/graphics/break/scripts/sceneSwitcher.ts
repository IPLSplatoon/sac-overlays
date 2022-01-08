import { activeBreakScene } from '../../helpers/replicants';
import gsap from 'gsap';

const sceneSwitchTl = gsap.timeline({
    defaults: {
        force3D: false,
        immediateRender: false
    }
});

activeBreakScene.on('change', (newValue, oldValue) => {
    sceneSwitchTl.addLabel('sceneHide');

    switch (oldValue) {
        case 'main':
            sceneSwitchTl.add(hideMainScene(), 'sceneHide');
            break;
        case 'teams':
            sceneSwitchTl.add(hideTeams(), 'sceneHide');
    }

    if (newValue === 'main') {
        sceneSwitchTl.add(hideInfoBar(), 'sceneHide');
        sceneSwitchTl.addLabel('sceneShow');
    } else {
        sceneSwitchTl.addLabel('sceneShow');
        sceneSwitchTl.add(showInfoBar(), 'sceneShow');
    }

    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene(), 'sceneShow');
            break;
        case 'teams':
            sceneSwitchTl.add(showTeams(), 'sceneShow');
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

function showInfoBar(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.info-bar', { display: 'flex' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.info-bar', {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });

    return tl;
}

function hideInfoBar(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.info-bar', { display: 'none' });
        },
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.info-bar', {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: 'power2.in'
        });

    return tl;
}

function showTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.teams-wrapper', { display: 'flex' });
        },
        delay: 0.1
    });

    tl
        .fromTo('.teams-wrapper .team', {
            y: -50
        }, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            stagger: 0.1
        });

    return tl;
}

function hideTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.teams-wrapper', { display: 'none' });
        },
        delay: 0.1
    });

    tl
        .to('.teams-wrapper .team', {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: 'power2.in',
            stagger: 0.1
        });

    return tl;
}
