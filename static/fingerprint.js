(async function() {
    console.log("📡 Chargement du script fingerprint.js...");

    // Récupérer les informations du navigateur
    const fingerprint = {
        user_agent: navigator.userAgent,
        ip_address: await fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(() => '0.0.0.0'), // Fallback en cas d'échec
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        account_age: Math.floor(Math.random() * 365), // Simulation d'un âge de compte
        average_refund_time: Math.random() * 10, // Simulation d'un délai de remboursement
        payment_attempts: Math.floor(Math.random() * 5), // Nombre aléatoire de tentatives de paiement
        country_ip: "FR", // Modifier si besoin
        country_shipping: "FR" // Modifier si besoin
    };

    console.log("📡 Données envoyées à l'API:", fingerprint);

    // Envoyer les données de l'empreinte numérique à l'API
    const responseFingerprint = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fingerprint)
    });

    const dataFingerprint = await responseFingerprint.json();
    console.log("✅ Fingerprint stored:", dataFingerprint);

    if (!responseFingerprint.ok) {
        console.error("❌ Erreur lors de l'envoi de l'empreinte:", dataFingerprint);
        return;
    }

    // Simulation d'une transaction (achat ou remboursement)
    const transaction = {
        user_agent: fingerprint.user_agent,
        ip_address: fingerprint.ip_address,
        timezone: fingerprint.timezone,
        screen_resolution: fingerprint.screen_resolution,
        language: fingerprint.language,
        transaction_type: Math.random() > 0.5 ? "purchase" : "refund", // Aléatoire achat/remboursement
        amount: (Math.random() * 200).toFixed(2) // Montant aléatoire
    };

    console.log("📡 Données transaction envoyées à l'API:", transaction);

    // Envoyer les transactions
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
