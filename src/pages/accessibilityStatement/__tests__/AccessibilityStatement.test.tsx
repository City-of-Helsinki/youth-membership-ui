import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AccessibilityStatement from '../AccessibilityStatement';
import i18n from '../../../common/test/testi18nInit';

test('matches snapshot', () => {
  const wrapper = shallow(<AccessibilityStatement />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe('renders correct component based on language', () => {
  test('language is finnish', () => {
    const wrapper = shallow(<AccessibilityStatement />);
    const statement = wrapper.find('div[className="innerWrapper"]');
    expect(statement.text()).toEqual('<AccessibilityStatementFi />');
  });

  test('language is english', () => {
    i18n.changeLanguage('en');
    const wrapper = shallow(<AccessibilityStatement />);
    const statement = wrapper.find('div[className="innerWrapper"]');
    expect(statement.text()).toEqual('<AccessibilityStatementEn />');
  });

  test('language is swedish', () => {
    i18n.changeLanguage('sv');
    const wrapper = shallow(<AccessibilityStatement />);
    const statement = wrapper.find('div[className="innerWrapper"]');
    expect(statement.text()).toEqual('<AccessibilityStatementSv />');
  });

  test('language is something random', () => {
    i18n.changeLanguage('asd');
    const wrapper = shallow(<AccessibilityStatement />);
    const statement = wrapper.find('div[className="innerWrapper"]');
    expect(statement.text()).toEqual('Invalid language.');
  });
});
