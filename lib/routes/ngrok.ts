import { Handler } from "../_types";

export const handleNgrokTestConnection: Handler = (req, res) => {
  res.send('ngrok tunnel is up and running! :rocket:');
}