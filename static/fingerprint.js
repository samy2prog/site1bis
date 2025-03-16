(async function() {
    console.log("Chargement du script fingerprint.js...");

    async function getIpAddress() {
        try {
            let response = await fetch('https://api64.ipify.org?format=json');
            let data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'IP:", error);
            return '0.0.0.0';
        }
    }

    const fingerprint = {
        user_agent: navigator.userAgent,
        ip_address: await getIpAddress(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        account_age: Math.floor(Math.random() * 365),
        average_refund_time: Math.random() * 10,
        payment_attempts: Math.floor(Math.random() * 5),
        country_ip: "FR",
        country_shipping: "FR"
    };

    console.log("Données envoyées à l'API:", JSON.stringify(fingerprint));

    fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fingerprint)
    })
    .then(response => response.json())
    .then(data => console.log('Fingerprint stored:', data))
    .catch(error => console.error('Erreur lors de l\'enregistrement du fingerprint:', error));
})();

