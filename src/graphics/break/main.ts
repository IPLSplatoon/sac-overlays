import './styles/break.scss';

import './scripts/music';
import './scripts/mainScene';
import './scripts/nextStageTimer';
import './scripts/sceneSwitcher';
import './scripts/casters';
import './scripts/infoBar';
import './scripts/teams';

import 'fitted-text/dist/fitted-text';

import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';

library.add(faMusic, faTwitter, faClock, faDiscord, faMicrophone, faGamepad);
dom.watch();
