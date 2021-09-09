const Scheme = require("./scheme-model");
const db = require("../../data/db-config");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.scheme_id);
    if (scheme) {
      req.scheme = scheme;
      next();
    } else {
      next({
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
        status: 404,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  req.body.scheme_name && typeof req.body.scheme_name === "string"
    ? next()
    : next({
        message: `invalid scheme_name`,
        status: 400,
      });
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  req.body.instructions &&
  typeof req.body.instructions === "string" &&
  req.body.step_number >= 1 &&
  typeof req.body.step_number === "number"
    ? next()
    : next({
        message: `invalid step`,
        status: 400,
      });
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
