import { where } from "sequelize/lib/sequelize"
import db from "../models/index"


const handleCreateTypeProduct = async (data) => {
    try {
        if (!data.name || !data.description || !data.imageBase64) {
            return res.status(200).json({
                EM: "Thiếu các trường bắt buộc!",
                EC: "1",
                DT: "",
            })
        }
        let typeProduct = await db.typeProduct.create({
            name: data.name,
            description: data.description,
            image: data.imageBase64
        })
        if (typeProduct) {
            return {
                EM: 'Thêm loại sản phẩm thành công',
                EC: 0,
                DT: []

            }
        }
    } catch (error) {
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: -2,
            DT: []

        }
    }
}

const getAllTypeProduct = async () => {
    try {
        let data = await db.typeProduct.findAll({
            order: [["id", "DESC"]]
        })

        if (data && data.length > 0) {
            data.map((item) => {
                item.image = new Buffer(item.image, "base64").toString("binary");
                return item;
            })
            return {
                EM: 'Ok',
                EC: 0,
                DT: data

            }
        }
    } catch (error) {

    }
}
const handleDeleteTypeProduct = async (id) => {
    try {
        let typeProduct = await db.typeProduct.findOne({
            where: {
                id: id
            }
        })
        if (!typeProduct) {
            return ({
                EC: 2,
                EM: "Loại sản phẩm không tổn tại!",
                DT: {}
            })
        }
        await db.typeProduct.destroy({
            where: {
                id: id
            }
        })
        return ({
            EC: 0,
            EM: "Xóa loại sản phẩm thành công!",
            DT: {}
        })
    } catch (error) {
        return ({
            EC: -1,
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            DT: {}
        })
    }
}
const handleUpdateTypeProduct = async (data) => {
    try {
        let typeProduct = await db.typeProduct.update(
            {
                name: data.name,
                description: data.description,
                image: data.image,
            },
            {
                where: {
                    id: data.id
                },
            }
        )
        if (typeProduct) {
            return ({
                EC: 0,
                EM: "Cập nhật loại sản phẩm thành công!",
                DT: {}
            })
        }
    } catch (error) {
        return ({
            EC: -1,
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            DT: {}
        })
    }
}

module.exports = {
    handleCreateTypeProduct,
    getAllTypeProduct,
    handleDeleteTypeProduct,
    handleUpdateTypeProduct


}