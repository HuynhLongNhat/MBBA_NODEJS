import LoginRegisterService from "../service/LoginRegisterService";


const registerNewUser = async (req, res) => {

    try {
        // create new user
        let data = await LoginRegisterService.registerNewUser(req.body);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: "",
            })
        }
    } catch (error) {
        console.log('check error', error)
        return res.status(404).json({
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            EC: -1,
            DT: "",
        });
    }
}
const handleLoginUser = async (req, res) => {
    try {
        if (
            !req.body.valueLogin ||
            !req.body.password

        ) {
            return res.status(200).json({
                EM: "Thiếu các trường bắt buộc!",
                EC: "1",
                DT: "",
            })
        }
        // create new user
        let data = await LoginRegisterService.handleLoginUser(req.body);

        if (data && data.DT && data.DT.access_token) {

            // thuộc tính httpsOnly : true chỉ cho phía server lấy cookie
            res.cookie('token', data.DT.access_token, { httpsOnly: true, maxAge: 60 * 60 * 1000 });

        }

        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
    } catch (error) {
        console.log('check error', error)
        return res.status(404).json({
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            EC: -1,
            DT: "",
        });
    }
}

const handleLogoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            EM: "Xóa cookie thành công!",
            EC: 0,
            DT: '',
        });
    } catch (error) {
        console.log("check error ", error);
        return res.status(500).json({
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            EC: "-1",
            DT: "",
        });
    }
}


module.exports = {
    registerNewUser,
    handleLoginUser,
    handleLogoutUser,

}