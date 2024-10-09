import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import gsap from 'gsap';
import { getPrevious } from '../../helpers/object';
import { isBlank } from '../../helpers/string';

const castersWrapper = elementById('info-bar-casters');
const twittersWrapper = elementById('info-bar-twitters');
const castersLayout = elementById('casters-layout');

casters.on('change', newValue => {
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

    const casterWidth = getCasterWidth(values.length);
    castersLayout.innerHTML = values.reduce((result, elem) => {
        result += `
            <div
               class="caster-wrapper"
               style="--caster-width: ${casterWidth}px"
           >
        `;

        if (!isBlank(elem.videoUrl)) {
            result += `
               <div class="video-loader-wrapper">
                   <iframe
                       allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;"
                       src="${elem.videoUrl}"
                       width="1280"
                       height="720"
                   ></iframe>
               </div>
            `;
        } else if (!isBlank(elem.imageUrl)) {
            result += `
                <img 
                    class="caster-image"
                    src="${elem.imageUrl}"
                >                    
            `;
        } else {
            result += `
                <img 
                    class="caster-image-placeholder"
                    src="assets/sac-logo-white.png"
                >                    
            `;
        }

        result += `
                <div class="caster-nametag">
                    <fitted-text max-width="${casterWidth - 50}" text="${elem.name}" class="caster-name" align="right"></fitted-text>
                    <fitted-text max-width="${casterWidth - 50}" text="${elem.twitter}" class="caster-twitter" align="right"></fitted-text>
                </div>
            </div>
        `

        return result;
    }, '');
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
