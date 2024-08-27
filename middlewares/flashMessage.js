// middlewares/flashMessage.js
export const flashMessage = (req, res, next) => {
  res.locals.messages = req.flash();
  next();
};
