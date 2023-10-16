

const RolesVerify = (...args) => {
    return (req, res, next) => {
        if (!req.roles) return res.sendStatus(401)
        const rolesArray = [...args]
        const result = req.roles.map(ele => rolesArray.includes(ele)).find(val => val === true)
        if(!result) return res.sendStatus(401)
        next()
    }
}
export default RolesVerify