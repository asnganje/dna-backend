const login = (req, res) => {
    try {
        res.status(201).json({msg:'login success'})
    } catch (error) {
        throw new Error(error)
    }
}

const signup = (req, res) => {
    try {
        res.status(201).json({msg:'signup success'})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    login, signup
}