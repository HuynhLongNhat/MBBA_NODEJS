import roleService from "../service/roleService";

const readFunc = async (req, res) => {
    try {
        {
            let data = await roleService.getAllRole();
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
};
const createFunc = async (req, res) => {
    try {
        let data = await roleService.createNewRole(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const updateFunc = async (req, res) => {

    try {
        let data = await roleService.updateRole(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const deleteFunc = async (req, res) => {
    try {
        let data = await roleService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;

        let data = await roleService.getRoleByIdGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
}

const assignRoleToGroup = async (req, res) => {
    try {


        let data = await roleService.assignRoleToGroup(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
}

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRoleByGroup,
    assignRoleToGroup

};
