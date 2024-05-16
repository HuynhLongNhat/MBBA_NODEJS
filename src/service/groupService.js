import { raw } from "body-parser";
import db from "../models/index";

const getGroup = async () => {
    try {
        let data = await db.groups.findAll({
            order: [["name", "DESC"]],
            raw: true
        });

        if (data) {
            return {
                EM: " Get groups success",
                EC: 0,
                DT: data,
            };
        }
    } catch (error) {
        console.log("check error", error);
        return {
            EM: "Error from service",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    getGroup,
};
