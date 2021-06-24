import { Handler } from "../_types";
import { installer } from "../utils"

export const handleSlackInstall: Handler = async (req, res, next) => {
  try {
    // feel free to modify the scopes
    const url = await installer.generateInstallUrl({
      scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
      metadata: 'some_metadata',
    })

    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  } catch(error) {
    console.log(error)
  }
}