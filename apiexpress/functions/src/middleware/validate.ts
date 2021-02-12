
const {body, validationResult} = require("express-validator");
const userValidationRules = () => {
  return [
    body("title").notEmpty({ignore_whitespace: true}),
    body("description").notEmpty({ignore_whitespace: true}),
    body("spreadSheetURL").notEmpty({ignore_whitespace: true}),
  ];
};

// eslint-disable-next-line max-len
const validate = (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: { [x: number]: any; }[]; }): any; new(): any; }; }; }, next: () => any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [x: number]: any; }[] = [];
  // eslint-disable-next-line max-len
  errors.array().map((err: { param: any; msg: any; }) => extractedErrors.push({[err.param]: err.msg}));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
