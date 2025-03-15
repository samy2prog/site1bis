(async function() {
    // Récupérer les informations du navigateur
    const fingerprint = {
        user_agent: navigator.userAgent,
        ip_address: await fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(() => '0.0.0.0'), // Fallback en cas d'échec
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language
    };

    // Envoyer les données à l'API FastAPI
    fetch('https://fraud-detection-dashboard-pvs2.onrender.com/collect_fingerprint/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fingerprint)
    })
    .then(response => response.json())
    .then(data => console.log('Fingerprint stored:', data))
    .catch(error => console.error('Error storing fingerprint:', error));
})();
