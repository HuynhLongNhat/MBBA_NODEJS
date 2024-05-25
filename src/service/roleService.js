import db from "../models/index"
const createNewRole = async (role) => {
    try {

        let currentRoles = await db.roles.findAll({
            attribute: ['url', 'description'],
            raw: true
        })


        const persists = role.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: 'Không có role mới để tạo... ',
                EC: 0,
                DT: []
            }
        }
        await db.roles.bulkCreate(persists)
        return {
            EM: `Tạo mới  ${persists.length} thành công!`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: 1,
            DT: []
        }
    }
}

const getAllRole = async () => {
    try {

        let data = await db.roles.findAll({
            order: [["id", "DESC"]],
        })

        return {
            EM: `Lấy tất cả role thành công`,
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Đã có lỗi ở hệ thống!',
            EC: 1,
            DT: []
        }
    }
}
const deleteRole = async (id) => {
    try {
        let role = await db.roles.findOne({
            where: { id: id }
        })
        if (role) {

            await role.destroy()
        }
        return {
            EM: `Xóa role thành công`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Đã có lỗi ở hệ thống',
            EC: 1,
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try {

        let role = await db.roles.findOne({
            where: {
                id: data.id,
            },
        });
        if (role) {
            //update
            await role.update({
                url: data.url,
                description: data.description,

            });
            return {
                EM: 'Cập nhật role thành công!',
                EC: 0,
                DT: ""
            }
        } else {
            //not found
            return {
                EM: 'Không tìm thấy role này! ',
                EC: 2,
                DT: ""
            }
        }
    } catch (error) {
        console.log("check error :", error);
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống! ',
            EC: 1,
            DT: []
        }
    }

}
const getRoleByIdGroup = async (id) => {
    try {

        if (!id) {
            return {
                EM: `Không tìm thấy role nào!`,
                EC: 1,
                DT: []
            }
        }
        let roles = await db.groups.findOne({
            where: { id: id },
            attributes: ['id', 'name', "description"],
            include: [{
                model: db.roles, attributes: ['id', 'url', "description"],
                through: { attributes: [] }
            }],
        })
        return {
            EM: `Lấy role theo nhóm thành công!`,
            EC: 0,
            DT: roles
        }
    } catch (error) {
        console.log('abc', error)
        return {
            EM: 'Đã có lỗi ở hệ thống!',
            EC: 1,
            DT: []
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {
        // {groupId , groupRoles}
        let res = await db.group_roles.destroy({
            where: { groupId: +data.groupId }
        })
        await db.group_roles.bulkCreate(data.groupRoles);
        return {
            EM: `Thêm vai trò cho nhóm thành công! `,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with services ',
            EC: 1,
            DT: []
        }
    }
}


module.exports = {
    createNewRole,
    getAllRole,
    deleteRole,
    updateRole,
    getRoleByIdGroup,
    assignRoleToGroup

}