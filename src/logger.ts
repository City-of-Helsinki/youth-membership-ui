class Logger {
  log(...args: Parameters<typeof console['log']>) {
    // eslint-disable-next-line no-console
    return console.log(...args);
  }

  error(...args: Parameters<typeof console['error']>) {
    // eslint-disable-next-line no-console
    return console.error(...args);
  }

  info(...args: Parameters<typeof console['info']>) {
    // eslint-disable-next-line no-console
    return console.info(...args);
  }
}

export default new Logger();
