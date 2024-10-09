import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import gsap from 'gsap';
import { getPrevious } from '../../helpers/object';
import { isBlank } from '../../helpers/string';
import { Caster } from 'schemas';

const castersWrapper = elementById('info-bar-casters');
const twittersWrapper = elementById('info-bar-twitters');
const castersLayout = elementById('casters-layout');

casters.on('change', (newValue, oldValue) => {
    const values = Object.values(newValue);

    castersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<fitted-text class="caster" text="${elem.name} <span class=&quot;pronoun&quot;>${elem.pronouns}</span>" use-inner-html max-width="590"></fitted-text>`;

        return existing;
    }, '');
    twittersWrapper.innerHTML = values.reduce((existing, elem) => {
        existing += `<fitted-text class="caster" text="${elem.twitter} <span class=&quot;pronoun&quot;>${elem.pronouns}</span>" use-inner-html max-width="590"></fitted-text>`;

        return existing;
    }, '');

    gsap.set([ castersWrapper, twittersWrapper ], { scale: values.length > 2 ? 0.7 : 1 });

    const newCasterIds = Object.keys(newValue);
    const oldCasterIds = oldValue == null ? null : Object.keys(oldValue);
    const shouldRecreateCasterElements =
        oldCasterIds == null
        || newCasterIds.length !== oldCasterIds.length
        || newCasterIds.some((elem, i) => oldCasterIds[i] !== elem);

    if (shouldRecreateCasterElements) {
        const casterWidth = getCasterWidth(values.length);
        castersLayout.innerHTML = values.reduce((result, elem, i) => {
            result += `
                <div
                   class="caster-wrapper"
                   style="--caster-width: ${casterWidth}px"
                   data-caster-id="${newCasterIds[i]}"
               >
                   <div class="caster-visual-wrapper">
                       ${getCasterVisual(elem)}
                   </div>
                   <div class="caster-nametag">
                       <fitted-text max-width="${casterWidth - 50}" text="${elem.name}" class="caster-name" align="right"></fitted-text>
                       <fitted-text max-width="${casterWidth - 50}" text="${elem.twitter}" class="caster-twitter" align="right"></fitted-text>
                   </div>
               </div>
            `;

            return result;
        }, '');
    } else {
        newCasterIds.forEach((casterId) => {
            const casterElem = document.querySelector(`[data-caster-id="${casterId}"]`);
            const caster = newValue[casterId];
            const oldCaster = oldValue[casterId];
            (casterElem.querySelector('.caster-name') as FittedText).text = caster.name;
            (casterElem.querySelector('.caster-twitter') as FittedText).text = caster.twitter;

            if (caster.videoUrl !== oldCaster.videoUrl || (isBlank(caster.videoUrl) && caster.imageUrl !== oldCaster.imageUrl)) {
                casterElem.querySelector('.caster-visual-wrapper').innerHTML = getCasterVisual(caster);
            }
        });
    }
});

const casterInfoLoopTl = gsap.timeline({ repeat: -1 });
const casterInfoElems = ['info-bar-twitters-wrapper', 'info-bar-casters-wrapper'];
for (let i = 0; i < casterInfoElems.length; i++) {
    const previousElem = getPrevious(casterInfoElems, i);
    const elem = casterInfoElems[i];

    casterInfoLoopTl
        .to(`#${elem}`, { duration: 0.35, opacity: 0 })
        .to(`#${previousElem}`, { duration: 0.35, opacity: 1 })
        .to({}, { duration: 30 });
}

function getCasterWidth(casterCount: number): number {
    switch (casterCount) {
        case 1:
            return 1200;
        case 2:
            return 750;
        default:
            return 625;
    }
}

function getCasterVisual(caster: Caster): string {
    if (!isBlank(caster.videoUrl)) {
        return `
           <div class="video-loader-wrapper">
               <iframe
                   allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;"
                   src="${caster.videoUrl}"
                   width="1280"
                   height="720"
               ></iframe>
           </div>
        `;
    } else if (!isBlank(caster.imageUrl)) {
        return `
            <img 
                class="caster-image"
                src="${caster.imageUrl}"
            >                    
        `;
    } else {
        return `
            <img 
                class="caster-image-placeholder"
                src="assets/sac-logo-white.png"
            >                    
        `;
    }

}
