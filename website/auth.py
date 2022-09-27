from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
import json
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Email and/or Password Incorrect', category='error')
        else:
            flash('Email and/or Password Incorrect', category='error')

    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    flash('Logout Successful', category='success')
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", user=current_user)

@auth.route("/update-password", methods=['POST'])
@login_required
def update_password():
    data = json.loads(request.data)
    if not check_password_hash(current_user.password, data['old']):
        flash('Incorrect Password', category='error')
    else:
        current_user.password = generate_password_hash(data['new'], method='sha256')
        db.session.commit()
        flash('Password Changed', category='success')
    return jsonify({})


@auth.route("/delete-account", methods=['GET','POST'])
@login_required
def delete_account():
    if request.method == 'POST':
        data = json.loads(request.data)
        if not check_password_hash(current_user.password, data['password']):
            flash('Incorrect Password', category='error')
            print("password incorrect")
            response = {
                "success": False
            }
            return jsonify(response)
        else:
            user = User.query.get(data['userId'])
            for subtask in user.subtasks:
                db.session.delete(subtask)
            for task in user.tasks:
                db.session.delete(task)
            for category in user.categories:
                db.session.delete(category)
            for board in user.boards:
                db.session.delete(board)
            for note in user.notes:
                db.session.delete(note)
            db.session.delete(user)
            db.session.commit()
            print("password correct")
            response = {
                "success": True
            }
            return jsonify(response)
    flash('Account Deleted', 'success')
    logout_user()
    return redirect(url_for('auth.sign_up'))
