export default function forceHttpsMiddleware(req, res, next) {
  if (req.secure) {
    return next()
  }
  if (process.env.NODE_ENV !== 'production') {
    return next()
  }
  res.redirect('https://' + req.hostname + req.url)
}
