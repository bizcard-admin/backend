
const { default: axios } = require('axios');
const responser = require("../core/responser");
const depManager = require('../core/depManager');

async function connectHubspotCrm(req, res){
    try{
        const { userId } = req;
        const { code } = req.body;
        const tokenUrl = 'https://api.hubapi.com/oauth/v1/token';
        const tokenParams = {
            grant_type: 'authorization_code',
            client_id: process.env.HUBSPOT_CLIENT_ID,
            client_secret: process.env.HUBSPOT_CLIENT_SECRET,
            redirect_uri: process.env.HUBSPOT_CALL_BACK,
            code: code,
        };
        const response = await axios.post(tokenUrl, tokenParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const data = response.data;

        const integration = {
            userId,
            integrationId: "hubspot_crm",
            accessToken: data.access_token,
            refreshToken: data.refresh_token
        }

        const [created, user] = await Promise.all([
            depManager.INTEGRATIONS.getIntegrationsModel().create(integration),
            depManager.USER.getUserModel().findById(userId)
        ]);

        user.integrations.push("zoho_crm");

        await user.save();

        return responser.success(res, created, "INTEGRATION_S002");
    }catch(error){
        console.log(error);
        return responser.error(res, null, "GLOBAL_E001");
    }
}

async function connectZohoCrm(req, res){
    try{
        const { userId } = req;
        const { code, server } = req.body;

        const serverUrl = decodeURIComponent(server);

        const tokenEndpoint = `${serverUrl}/oauth/v2/token`;

        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("client_id", process.env.ZOHO_CLIENT_ID);
        params.append("client_secret", process.env.ZOHO_CLIENT_SECRET);
        params.append("redirect_uri", process.env.ZOHO_CALL_BACK);
    
        const response = await axios.post(tokenEndpoint, params);
        const data = response.data;

        const integration = {
            userId,
            integrationId: "zoho_crm",
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            scope: data.scope,
            server: serverUrl
        }

        const [created, user] = await Promise.all([
            depManager.INTEGRATIONS.getIntegrationsModel().create(integration),
            depManager.USER.getUserModel().findById(userId)
        ]);

        user.integrations.push("zoho_crm");

        await user.save();

        return responser.success(res, created, "INTEGRATION_S001");
    }catch(error){
        console.log(error);
        return responser.error(res, null, "GLOBAL_E001");
    }
}

module.exports = {
    connectZohoCrm,
    connectHubspotCrm
}
