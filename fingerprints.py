(async function() {
    try {
        // Récupérer les informations du navigateur
        const fingerprint = {
            user_agent: navigator.userAgent,
            ip_address: await fetch('https://api64.ipify.org?format=json')
                .then(response => response.json())
                .then(data => data.ip)
                .catch(() => '0.0.0.0'), // Fallback si l'IP ne peut pas être récupérée
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language
        };

        console.log("🔍 Empreinte numérique collectée :", fingerprint);

        // 🔥 Envoi des données à l'API FASTAPI sur Render
        const response = await fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fingerprint)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Empreinte enregistrée avec succès:', data);

    } catch (error) {
        console.error('❌ Erreur lors de l’envoi de l’empreinte:', error);
    }
})();
