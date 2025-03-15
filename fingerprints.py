import hashlib
import json

# Fonction pour générer un fingerprint unique basé sur IP, User-Agent et Session ID
def generate_fingerprint(ip: str, user_agent: str, session_id: str) -> str:
    data = f"{ip}-{user_agent}-{session_id}"
    fingerprint = hashlib.sha256(data.encode()).hexdigest()
    return fingerprint

# Fonction pour sauvegarder les fingerprints générés dans un fichier JSON
def save_fingerprints(fingerprints: dict, filename="fingerprints.json"):
    with open(filename, "w") as file:
        json.dump(fingerprints, file, indent=4)

# Fonction pour charger les fingerprints depuis le fichier JSON
def load_fingerprints(filename="fingerprints.json"):
    try:
        with open(filename, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

# Exemple d'utilisation
if __name__ == "__main__":
    # Simulation de données utilisateur de Site1
    users_data = [
        {"username": "user1", "ip": "192.168.1.10", "user_agent": "Mozilla/5.0 (Windows)", "session_id": "ABC123"},
        {"username": "user2", "ip": "192.168.1.15", "user_agent": "Mozilla/5.0 (MacOS)", "session_id": "XYZ789"},
    ]

    # Générer les fingerprints pour chaque utilisateur
    fingerprints = {}
    for user in users_data:
        fp = generate_fingerprint(user["ip"], user["user_agent"], user["session_id"])
        fingerprints[user["username"]] = fp

    # Sauvegarde des fingerprints dans un fichier JSON
    save_fingerprints(fingerprints)

    # Affichage des résultats
    print("Fingerprints générés et sauvegardés :")
    print(json.dumps(fingerprints, indent=4))
