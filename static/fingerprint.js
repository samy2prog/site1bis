(async function() {
    console.log("📡 Chargement du script fingerprint.js...");

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

    // Collecte des infos du navigateur
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

    console.log("📡 Données fingerprint envoyées à l'API:", fingerprint);

    // 1️⃣ Envoi fingerprint et attends réponse contenant user_id
    const responseFingerprint = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fingerprint)
    });

    const dataFingerprint = await responseFingerprint.json();
    console.log("✅ Fingerprint stored:", dataFingerprint);

    if (!responseFingerprint.ok) {
        console.error("❌ Erreur lors de l'envoi de l'empreinte:", dataFingerprint);
        return;
    }

    // 2️⃣ Récupère le user_id = fingerprint_id
    const fingerprint_id = dataFingerprint.user_id;
    console.log("📌 fingerprint_id:", fingerprint_id);

    // 3️⃣ Prépare la transaction AVEC le fingerprint_id
    const transaction = {
        user_agent: fingerprint.user_agent,
        ip_address: fingerprint.ip_address,
        timezone: fingerprint.timezone,
        screen_resolution: fingerprint.screen_resolution,
        language: fingerprint.language,
        transaction_type: Math.random() > 0.5 ? "purchase" : "refund",
        amount: parseFloat((Math.random() * 200).toFixed(2)),
        fingerprint_id: fingerprint_id
    };

    console.log("📡 Données transaction envoyées à l'API:", transaction);

    const responseTransaction = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/transaction/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const dataTransaction = await responseTransaction.json();
    console.log("✅ Transaction enregistrée :", dataTransaction);

    if (!responseTransaction.ok) {
        console.error("❌ Erreur d'enregistrement de la transaction :", dataTransaction);
    }
})();

