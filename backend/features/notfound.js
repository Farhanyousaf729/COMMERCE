const notFound = (req, res, next) => {
    const error = new Error(`Page Not Found: ${req.originalUrl}`);
    next(error);
  };
export default notFound