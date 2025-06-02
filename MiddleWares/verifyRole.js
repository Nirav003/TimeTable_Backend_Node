const verifyRole = (...allowedrole) => {
    return (req, res, next) => {
        // console.log('----------');
        // console.log('Allowed Role : ', allowedrole, ' User role : ', req.user.role);
        // console.log('Allowing : ', allowedrole.includes(req.user.role));
        // console.log('----------');
        

        if (!allowedrole.includes(req.user.role)) {
            return res.status(403).json({ success: true, message: "Access Denied!" });
        }

        next();
    }
}

module.exports = { verifyRole };