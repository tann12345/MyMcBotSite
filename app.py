from flask import Flask, request, render_template
import requests

app = Flask(__name__)

# Route for the homepage
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        command = request.form.get('command')
        # Send to the bot's API
        requests.post("http://localhost:3000/command", json={"command": command})
    return render_template('index.html')
