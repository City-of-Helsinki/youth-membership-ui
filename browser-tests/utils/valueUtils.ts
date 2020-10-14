import { Message } from 'mailosaur/lib/models';
import { get, nth } from 'lodash';
import { testURL } from './settings';

export const hasLength = (element: Element) => {
  if (!element.textContent) {
    return false;
  }

  const text = element.textContent.trim();
  return text.length > 0;
};

export const getApproverUrl = async (message: Message): Promise<string> => {
  const url = get(message, 'html.links[0].href');

  if (url) {
    const urlParts = url?.split('approve');
    return `${testURL()}/approve${nth(urlParts, 1)}`;
  }
  return `${testURL()}/approve/`;
};
