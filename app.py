from flask import Flask, render_template, request, redirect, url_for, session
import random
import uuid

app = Flask(__name__)
app.secret_key = "super_secret_key"
app.config["SESSION_TYPE"] = "filesystem"

# Simuler une base de données pour les commandes
orders_db = {}

@app.route("/")
def home():
    products = [
        {"id": 1, "name": "Smartphone X", "price": 699.99, "image": "https://via.placeholder.com/150"},
        {"id": 2, "name": "Laptop Pro", "price": 1299.99, "image": "https://via.placeholder.com/150"},
        {"id": 3, "name": "Casque Bluetooth", "price": 199.99, "image": "https://via.placeholder.com/150"}
    ]
    return render_template("index.html", products=products)

@app.route("/checkout", methods=["POST"])
def checkout():
    product_id = request.form.get("product_id")
    product_name = request.form.get("product_name")
    product_price = request.form.get("product_price")

    order_id = str(uuid.uuid4())[:8]  # Générer un ID unique
    session["order_id"] = order_id
    orders_db[order_id] = {
        "order_id": order_id,
        "product_name": product_name,
        "price": product_price,
        "status": "Paid"
    }
    return redirect(url_for("confirmation"))

@app.route("/confirmation")
def confirmation():
    order_id = session.get("order_id")
    order = orders_db.get(order_id, {})
    return render_template("confirmation.html", order=order)

@app.route("/refund", methods=["POST", "GET"])
def refund():
    if request.method == "POST":
        order_id = request.form.get("order_id")
        if order_id in orders_db:
            orders_db[order_id]["status"] = "Refund Requested"
            return render_template("refund.html", message="Votre remboursement est en cours de traitement.")
        else:
            return render_template("refund.html", message="Commande non trouvée.")
    return render_template("refund.html", message="")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
