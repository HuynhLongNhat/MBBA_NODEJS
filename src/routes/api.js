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
    return app.use("/api/v1", router);
}
export default apiRoutes;
