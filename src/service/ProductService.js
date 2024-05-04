import { where } from "sequelize/lib/sequelize"
import db from "../models/index"


const handleCreateTypeProduct = async (data) => {
    try {
        if (!data.name || !data.description || !data.image) {
            return res.status(200).json({
                EM: "Thiếu các trường bắt buộc!",
                EC: "1",
                DT: "",
            })
        }
        let typeProduct = await db.typeProduct.create({
            name: data.name,
            description: data.description,
            image: data.image
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
        console.log(error)
        return ({
            EC: -1,
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            DT: {}
        })
    }
}

const getListType = async () => {
    try {
        let data = await db.typeProduct.findAll({
            order: [["id", "DESC"]],
            attributes: {
                exclude: ['description', 'image']
            }
        })
        return {
            EM: 'Ok',
            EC: 0,
            DT: data


        }
    } catch (error) {

    }
}

const handleCreateProduct = async (data) => {
    try {
        if (!data.selectedType || !data.name || !data.description
            || !data.quantity || !data.cost || !data.image

        ) {
            return res.status(200).json({
                EM: "Thiếu các trường bắt buộc!",
                EC: "1",
                DT: "",
            })
        }
        let typeProduct = await db.product.create({
            name: data.name,
            description: data.description,
            type_id: data.selectedType,
            quantity: data.quantity,
            cost: data.cost,
            image: data.image
        })
        if (typeProduct) {
            return {
                EM: 'Thêm sản phẩm thành công',
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

const getAllProduct = async () => {
    try {
        let data = await db.product.findAll({
            order: [["id", "DESC"]],
            include: [
                {
                    model: db.typeProduct,
                    as: 'typeProductData',
                    attributes: [
                        "name"
                    ]
                }
            ]

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

const handleDeleteProduct = async (id) => {
    try {
        let product = await db.product.findOne({
            where: {
                id: id
            }
        })
        if (!product) {
            return ({
                EC: 2,
                EM: "Tên cây  không tổn tại!",
                DT: {}
            })
        }
        await db.product.destroy({
            where: {
                id: id
            }
        })
        return ({
            EC: 0,
            EM: "Xóa cây thành công!",
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

const handleUpdateProduct = async (data) => {
    try {

        let typeProduct = await db.product.update(
            {
                name: data.name,
                description: data.description,
                type_id: data.selectedType,
                quantity: data.quantity,
                cost: data.cost,
                image: data.image
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
                EM: "Cập nhật cây thành công!",
                DT: {}
            })
        }
    } catch (error) {
        console.log(error)
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
    handleUpdateTypeProduct,
    getListType,
    handleCreateProduct,
    getAllProduct,
    handleDeleteProduct,
    handleUpdateProduct,


}