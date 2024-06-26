import db from "../models/index"
import {
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword,
} from "../service/LoginRegisterService";
const getAllUser = async () => {
    try {
        let users = await db.user.findAll({
            order: [["id", "DESC"]],
            attributes: { exclude: ['password'] },
            include: { model: db.groups, attributes: ["name", "description"] },
        });

        if (users) {
            return {
                EM: "Tải danh sách người dùng thành công!",
                EC: 0,
                DT: users,
            };
        } else {
            return {
                EM: "Danh sách người dùng trống!",
                EC: -1,
                DT: [],
            };
        }
    } catch (error) {
        console.log("check error", error);
        return {
            EM: "Đã có lỗi ở trong hệ thống!",
            EC: 1,
            DT: [],
        };
    }
};

const createNewUser = async (data) => {
    try {
        //validate
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "Email này đã tồn tại trong hệ thống!",
                EC: -1,
                DT: "email",
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "Số điện thoaị này đã tồn tại trong hệ thống!",
                EC: -1,
                DT: "phone",
            };
        }

        // hash password
        let hashPassword = hashUserPassword(data.password);

        let user = await db.user.create({
            name: data.name,

            password: hashPassword,
            phone: data.phone,
            email: data.email,
            address: data.address,
            gender: data.gender,
            groupId: data.groupId,
        });
        if (user) {
            return {
                EM: "Tạo mới người dùng thành công!",
                EC: 0,
                DT: [],
            };
        }
    } catch (error) {
        console.log("check error :", error);
        return {
            EM: "Error from server",
            EC: -1,
            DT: "",
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offSet = (page - 1) * limit;
        const { count, rows } = await db.user.findAndCountAll({
            offSet: offSet,
            limit: limit,
            attributes: ["id", "email", "phone", "gender", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [["id", "DESC"]],
        });
        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPage,
            users: rows,
        };

        return {
            EM: " fetch Ok",
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log("check error", error);
        return {
            EM: "Error from server",
            EC: -1,
            DT: "",
        };
    }
};

const updateUser = async (data) => {
    try {

        let user = await db.user.findOne({
            where: {
                id: data.id,
            },
        });
        if (user) {
            //update
            await user.update({
                username: data.username,
                address: data.address,
                gender: data.gender,
                groupId: data.groupId
            });
            return {
                EM: 'Cập nhật người dùng thành công',
                EC: 0,
                DT: ""
            }
        } else {
            //not found
            return {
                EM: 'Không tìm thấy người dùng này! ',
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
};

const deleteUser = async (id) => {

    try {
        let data = await db.user.findOne({
            where: {
                id: id
            }
        })
        if (!data) {
            return ({
                EC: 2,
                EM: "Người dùng không tổn tại!",
                DT: {}
            })
        }
        await db.user.destroy({
            where: {
                id: id
            }
        })
        return ({
            EC: 0,
            EM: "Xóa người dùng thành công!",
            DT: {}
        })
    } catch (error) {
        console.log('error', error)
        return ({
            EC: -1,
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            DT: {}
        })
    }
};


module.exports = {
    getUserWithPagination,
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
