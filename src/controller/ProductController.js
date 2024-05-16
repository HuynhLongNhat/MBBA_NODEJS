import ProductService from "../service/ProductService"

const handleCreateTypeProduct = async (req, res) => {

    let data = await ProductService.handleCreateTypeProduct(req.body);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })
    }
}

const getAllTypeProduct = async (req, res) => {
    let data = await ProductService.getAllTypeProduct();
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
}
const handleDeleteTypeProduct = async (req, res) => {

    if (!req.body.id) {
        return res.status(200).json({
            EC: 1,
            EM: "Missing required parameters",
        });
    }
    let data = await ProductService.handleDeleteTypeProduct(req.body.id);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
}

const handleUpdateTypeProduct = async (req, res) => {

    try {
        let data = await ProductService.handleUpdateTypeProduct(req.body);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }

}


const getListType = async (req, res) => {
    let data = await ProductService.getListType(req.body);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
}


const handleCreateProduct = async (req, res) => {

    let data = await ProductService.handleCreateProduct(req.body);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })
    }
}

const handleGetAllProduct = async (req, res) => {
    let data = await ProductService.getAllProduct();
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
}

const handleDeleteProduct = async (req, res) => {

    if (!req.body.id) {
        return res.status(200).json({
            EC: 1,
            EM: "Missing required parameters",
        });
    }
    let data = await ProductService.handleDeleteProduct(req.body.id);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
}

const handleUpdateProduct = async (req, res) => {

    try {
        let data = await ProductService.handleUpdateProduct(req.body);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }

}
module.exports = {
    handleCreateTypeProduct,
    getAllTypeProduct,
    handleDeleteTypeProduct,
    handleUpdateTypeProduct,
    handleCreateProduct,
    getListType,
    handleGetAllProduct,
    handleDeleteProduct,
    handleUpdateProduct

}