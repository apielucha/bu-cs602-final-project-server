class Validator {
  static _missing(key) { return `Key '${key}' is missing.`; }
  static _wrongType(key, type) { return `Key '${key}' must be of type '${type}'.`; }

  static check(obj, rules) {
    const errors = [];

    Object.keys(rules).forEach((key) => {
      if (!obj[key]) { errors.push(Validator._missing(key)); }
      /* eslint-disable-next-line valid-typeof */
      if (typeof obj[key] !== rules[key]) { errors.push(Validator._wrongType(key, rules[key])); }
    });

    return errors;
  }
}

export default Validator;
