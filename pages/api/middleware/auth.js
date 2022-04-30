import jwt from 'jsonwebtoken';
const JWT_SECRET = 'HILALAHMADKHANISAPROGRAMMERWHOCANDEVELOPEDANYWEBSITEINMERNANDMEVNANDMENN'

// create function
const auth = (req, res, next) => {
    // get cookies
    const { cookies } = req;
    // extract token from the cookies
    const token = cookies.access_token;
    // check is token available or not
    if (!token) {
        res.send({
            message: 'Unauthorized ? Please use the valid token'
        })
    } else {
        try {
            const { user_id } = jwt.verify(token, JWT_SECRET);
            req.user = user_id;
        } catch (error) {
            res.send({
                message: 'Unauthorized ? Please use the valid token'
            })
        }
    }
    next();
}

export default auth;