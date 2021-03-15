class Config {
  static get adminUrl() {
    return process.env.REACT_APP_ADMIN_URL;
  }

  static get additionalLocales(): string[] {
    const useAdditionalLocalesFlag =
      process.env.REACT_APP_FEATURE_FLAG_USE_ADDITIONAL_LOCALES;
    const additionalLocalesString = process.env.REACT_APP_ADDITIONAL_LOCALES;

    if (additionalLocalesString && additionalLocalesString !== 'undefined') {
      // Remove whitespace and split into an array
      return additionalLocalesString.replace(/\s/g, '').split(',');
    }

    if (useAdditionalLocalesFlag) {
      return ['fr', 'ru', 'et', 'so', 'ar'];
    }

    return [];
  }

  static get isTestRun() {
    return process.env.NODE_ENV === 'test';
  }
}

export default Config;
