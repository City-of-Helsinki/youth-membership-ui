import history from '../domain/app/appHistory';
import I18nService from './I18nService';

I18nService.init(history);

export default I18nService.get();
