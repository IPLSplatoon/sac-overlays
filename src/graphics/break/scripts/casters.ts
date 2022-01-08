import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import gsap from 'gsap';
import { getPrevious } from '../../helpers/object';

const castersWrapper = elementById('info-bar-casters');
const twittersWrapper = elementById('info-bar-twitters');

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
