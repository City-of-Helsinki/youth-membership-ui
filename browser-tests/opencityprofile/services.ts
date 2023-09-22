import { Selector } from 'testcafe';
import { openCityProfileURL, openCityProfileClientId } from '../utils/settings';
import { login as openCityProfileLogin } from './login';

export const routeLogin = () => `${openCityProfileURL()}/admin/login/`;
export const routeServices = () => `${openCityProfileURL()}/admin/services/service/`;

export const youthService = {
    youthServiceLink: Selector('a').withText('Nuorisopalveluiden jäsenkortti'),
    addClientIdLink: Selector('a').withText('Lisää toinen Client id'),
    newClientIdInput: Selector('.last-related').find('input'),
    saveButton:  Selector('input[type="submit"][name="_save"]'),
};

// try to find client_id from input fields. Some reason Selector cannot find it directly

const clientIdExists = async (t: TestController, clientid: string) => {
    let found = false;

    let clientIdsCount= await (Selector('.field-client_id').count);

    // id numbers start from 0, count includes one hidden element, it should decrease from count
    for (let i = 0; i < clientIdsCount-1; i++) {
        let id=`#id_client_ids-${i}-client_id`; 
        let input_client_id = await Selector(id).value;

        if (input_client_id == clientid) {
            console.log("Client id found!");
            found = true;
        }
    }

    return found;
};

export const openCityProfileServiceClientId = async (t: TestController) => {
    // api url has to be configured
    if (!openCityProfileURL()) {
      return;
    }

    await t.navigateTo(routeLogin());

    await openCityProfileLogin(t);
  
    await t.navigateTo(routeServices());

    await t.click(youthService.youthServiceLink);

    if (! await clientIdExists(t, openCityProfileClientId())) {
        console.info(`Add new clientid '${openCityProfileClientId()}'`)

        await t
            .click(youthService.addClientIdLink)
            .typeText(youthService.newClientIdInput, openCityProfileClientId())
            .click(youthService.saveButton);
    }
};