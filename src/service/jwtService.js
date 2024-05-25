import db from "../models/index"

const getGroupWithRoles = async (user) => {
    // scope
    let roles = await db.groups.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', "description"],
        include: [{
            model: db.roles, attributes: ['id', 'url', "description"],
            through: { attributes: [] }
        }],

    })
    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}