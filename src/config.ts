class Config {
  static get adminUrl() {
    return process.env.REACT_APP_ADMIN_URL;
  }

  static get additionalLocales(): string[] {
    const additionalLocalesString = process.env.REACT_APP_ADDITIONAL_LOCALES;

    if (!additionalLocalesString || additionalLocalesString === 'undefined') {
      return [];
    }

    // Remove whitespace and split into an array
    return additionalLocalesString.replace(/\s/g, '').split(',');
  }

  static get isTestRun() {
    return process.env.NODE_ENV === 'test';
  }
}

export default Config;
