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

    console.log("Données fingerprint envoyées:", fingerprint);

    // Envoyer fingerprint
    const fingerprintResponse = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fingerprint)
    });

    const fingerprintData = await fingerprintResponse.json();
    console.log("Fingerprint stored:", fingerprintData);

    if (!fingerprintResponse.ok) {
        console.error("Erreur lors de l'envoi du fingerprint:", fingerprintData);
        return;
    }

    // Simulation transaction
    const transaction = {
        user_agent: fingerprint.user_agent,
        ip_address: fingerprint.ip_address,
        timezone: fingerprint.timezone,
        screen_resolution: fingerprint.screen_resolution,
        language: fingerprint.language,
        transaction_type: Math.random() > 0.5 ? "purchase" : "refund",
        amount: (Math.random() * 200).toFixed(2),
        fingerprint_id: fingerprintData.user_id // 👈 C'est ça la clé !
    };

    console.log("Transaction envoyée:", transaction);

    const transactionResponse = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/transaction/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const transactionData = await transactionResponse.json();
    console.log("Transaction enregistrée:", transactionData);

    if (!transactionResponse.ok) {
        console.error("Erreur d'enregistrement de la transaction:", transactionData);
    }

})();
