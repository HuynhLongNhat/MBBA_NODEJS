import express from "express";
import LoginRegisterController from "../controller/LoginRegisterController";
import ProductController from "../controller/ProductController";
import RoleController from "../controller/RoleController";
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction"
const router = express.Router();

const apiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)
    router.post('/login', LoginRegisterController.handleLoginUser);
    router.post("/register", LoginRegisterController.registerNewUser);
    router.post("/logout", LoginRegisterController.handleLogoutUser);

    // user 
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

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


    // group 
    router.get("/group/read", groupController.readFunc);

    // role 
    router.get("/role/read", RoleController.readFunc);
    router.post("/role/create", RoleController.createFunc);
    router.put("/role/update", RoleController.updateFunc);
    router.delete("/role/delete", RoleController.deleteFunc);
    router.get("/role/by-group/:groupId", RoleController.getRoleByGroup);
    router.post('/role/assign-to-group', RoleController.assignRoleToGroup)
    return app.use("/api/v1", router);
}
export default apiRoutes;
