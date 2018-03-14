'use strict';

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    }
    else {
	    const err = new Error('Not authorized')
		err.status = 403
		next(err)
	}
}

// const isLoggedIn = (req, res, next) => {
// 	if (req.user) {
// 		next()
// 	}
// 	else {
// 		const err = new Error('Not authorized')
// 		err.status = 403
// 		next(err)
// 	}
// }

module.exports = {
	isAdmin
//	isLoggedIn
}
