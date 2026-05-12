const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const cors = require('cors');

const app = express();
app.use(cors());

// Ye values hum Render ki settings (Environment Variables) mein daalenge
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

app.get('/getToken', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) return res.status(400).json({ error: 'channelName is required' });

    const uid = 0; // Default UID for simplicity
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600; // 1 hour validity
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    
    return res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Token Server running on port ${PORT}`));
