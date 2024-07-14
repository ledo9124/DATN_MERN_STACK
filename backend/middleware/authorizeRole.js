const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};
export default authorizeRole;
