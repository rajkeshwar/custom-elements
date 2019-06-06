/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2019-02-23 22:24:32 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2019-03-31 16:38:42
 */

require('./app/styles.scss');
require('./app/slider/slider.scss');
require('./app/ce-checkbox/checkbox.scss');
require('./app/chips/chips.scss');
require('./app/switch/switch.scss');
require('./app/message/message.scss');
require('./assets/es-slider');

require('./app/ce-element');

import CeCheckbox from './app/checkbox/ce-checkbox';
import { 
  CeAccordion, CeAccordionHeading, CeAccordionPanel 
} from './app/accordion/ce-accordion';

import { CeTab, CeTabs, CeTabPanel } from './app/tabs/ce-tab';
import { CeToggleButton } from './app/toggle/ce-toggle';
import { CeTooltip } from './app/tooltip/ce-tooltip';
import { CeRadioButton, CeRadioGroup } from './app/radiogroup/ce-radiogroup';

window.customElements.define('ceb-checkbox', CeCheckbox); 

window.customElements.define('ce-accordion', CeAccordion);
window.customElements.define('ce-accordion-heading', CeAccordionHeading);
window.customElements.define('ce-accordion-panel', CeAccordionPanel);

window.customElements.define('ce-tab', CeTab);
window.customElements.define('ce-tabs', CeTabs);
window.customElements.define('ce-tab-panel', CeTabPanel); 

window.customElements.define('ce-toggle-button', CeToggleButton);

window.customElements.define('ce-tooltip', CeTooltip);

window.customElements.define('ce-radio-button', CeRadioButton);
window.customElements.define('ce-radio-group', CeRadioGroup);


require('./app/ui-router');
require('./app/links');
require('./app/event/event');

require('./app/button/button');
require('./app/tree/tree');
require('./app/slider/slider');
require('./app/slider/ce-slider');
require('./app/ce-checkbox/checkbox');
require('./app/chips/chips');
require('./app/switch/switch');
require('./app/message/message');



