from flask import Flask, render_template, request, redirect, url_for, jsonify
import json

app = Flask(__name__)

@app.route('/location')
def index():
    return render_template('location.html')

@app.route('/render')
def render():
    return render_template('render.html')

@app.errorhandler(404)
def page_not_found(e):
    return "Page Not Found!"

if __name__ == "__main__":
    app.run(debug=True)