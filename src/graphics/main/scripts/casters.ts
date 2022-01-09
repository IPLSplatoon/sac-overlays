import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { DASHBOARD_BUNDLE_NAME } from '../../helpers/constants';
import gsap from 'gsap';

const castersElem = elementById('casters');

casters.on('change', newValue => {
    castersElem.innerHTML = Object.values(newValue).reduce((existing, caster) => {
        existing += `
            <div class="caster">
                <fitted-text class="name" text="${caster.name} <span class=&quot;pronoun&quot;>${caster.pronouns}</span>" use-inner-html max-width="300"></fitted-text>
                <fitted-text class="extra" text="${caster.twitter}" max-width="300"></fitted-text>
            </div>
        `;

        return existing;
    }, '');
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    const tl = gsap.timeline({
        defaults: {
            force3D: false
        }
    });

    tl
        .to('.casters-content', { y: 0, duration: 0.5, ease: 'power2.out' })
        .to({}, { duration: 3 })
        .to('.casters-content', { y: 356, duration: 0.5, ease: 'power2.in' });
});
