import db from "../models/index"
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { createJWT } from "../middleware/JWTAction"
import { getGroupWithRoles } from "./jwtService"
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};
const checkEmailExist = async (email) => {
    let user = await db.user.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        return true;
    }
    return false
}

const checkPhoneExist = async (phone) => {
    let user = await db.user.findOne({
        where: {
            phone: phone
        }
    })
    if (user) {
        return true;
    }
    return false
}

const registerNewUser = async (data) => {
    try {
        // validate
        let isEmailExist = await checkEmailExist(data.email);
        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isEmailExist === true) {
            return {
                EM: 'Email này đã được sử dụng!',
                EC: -1
            }
        }
        if (isPhoneExist === true) {
            return {
                EM: 'Số điện thoại này đã được sử dụng!',
                EC: -1
            }
        }
        //hash password
        let hashPassword = hashUserPassword(data.password)
        // create new user 
        await db.user.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            username: data.userName,
            password: hashPassword,
            groupId: 3
        })
        return {
            EM: 'Tài khoản đăng kí thành công!',
            EC: 0,
            DT: []

        }
    } catch (error) {
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: -2,
            DT: []

        }
    }
}

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
const handleLoginUser = async (data) => {
    try {
        let user = await db.user.findOne({
            where: {
                [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
            },
            attributes: {
                exclude: ['updatedAt']
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(data.password, user.password)
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,

                }
                let token = createJWT(payload)
                return {
                    EM: 'Đăng nhập thành công!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
            return {
                EM: 'Email/số điện thoại hoặc mật khẩu của bạn không chính xác!',
                EC: -1,
                DT: []
            }
        }
    } catch (error) {
        console.log("Check error : ", error)
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: -2,
            DT: []
        }
    }
}

module.exports = {
    registerNewUser,
    handleLoginUser,
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword
}