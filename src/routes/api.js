import express from "express";
import LoginRegisterController from "../controller/LoginRegisterController";
import ProductController from "../controller/ProductController"
const router = express.Router();

const apiRoutes = (app) => {
    router.post("/register", LoginRegisterController.registerNewUser);
    router.post('/login', LoginRegisterController.handleLoginUser);

    //type-product
    router.post("/manage-products/create-type-product", ProductController.handleCreateTypeProduct)
    router.get("/manage-products/getAll-type-product", ProductController.getAllTypeProduct)
    router.delete('/manage-products/delete-type-product', ProductController.handleDeleteTypeProduct)
    router.put('/manage-products/update-type-product', ProductController.handleUpdateTypeProduct)



    //product
    router.get("/manage-products/getListType", ProductController.getListType)
    router.post("/manage-products/create-product", ProductController.handleCreateProduct)
    router.get("/manage-products/getAll-product", ProductController.handleGetAllProduct)
    router.delete('/manage-products/delete-product', ProductController.handleDeleteProduct)
    router.put('/manage-products/update-product', ProductController.handleUpdateProduct)

    return app.use("/api/v1", router);
}
export default apiRoutes;
