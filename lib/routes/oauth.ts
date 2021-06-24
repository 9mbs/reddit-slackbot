import { Handler } from "../_types";
import { installer } from "../utils";

export const handleOAuth: Handler = async(req, res) => await installer.handleCallback(req, res);
