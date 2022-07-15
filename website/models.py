from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
import uuid


class User(db.Model, UserMixin):
    id = db.Column(db.String, primary_key=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    background_color = db.Column(db.String(7), default = "#ffffff")
    text_color = db.Column(db.String(7), default = "#000000")
    navbar_text_color = db.Column(db.String(7), default = "#9a9da0")
    navbar_highlight_color = db.Column(db.String(7), default = "#ffffff")
    navbar_background_color = db.Column(db.String(7), default = "#343a40")
    button_text_color = db.Column(db.String(7), default = "#ffffff")
    confirm_button_color = db.Column(db.String(7), default = "#007bff")
    delete_button_color = db.Column(db.String(7), default = "#ff0000")
    cancel_button_color = db.Column(db.String(7), default = "#6c757d")
    font_family = db.Column(db.String(1000), default= "-apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'")
    font_style = db.Column(db.String(100), default='none')
    font_weight = db.Column(db.String(10), default='500')
    notes = db.relationship('Note')
    categories = db.relationship('Category')
    tasks = db.relationship('Task')
    boards = db.relationship('Board')
    subtasks = db.relationship('Subtask')
    

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    created = db.Column(db.DateTime(timezone=True), default=func.now())
    last_modified = db.Column(db.DateTime(timezone=True), default=func.now())
    completed = db.Column(db.Boolean, default = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Board(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    category_num = db.Column(db.Integer)
    categories = db.relationship('Category')
    tasks = db.relationship('Task')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Category(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    board_id = db.Column(db.Integer,db.ForeignKey('board.id'))
    tasks = db.relationship('Task')


class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    created = db.Column(db.DateTime(timezone = True), default = func.now())
    last_modified = db.Column(db.DateTime(timezone = True), default = func.now())
    due_date = db.Column(db.DateTime(timezone = True))
    name = db.Column(db.String(100))
    description = db.Column(db.String(10000))
    completed = db.Column(db.Boolean, default = False)
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    board = db.Column(db.Integer, db.ForeignKey('board.id'))
    subtasks = db.relationship('Subtask')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    

class Subtask(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    created=db.Column(db.DateTime(timezone = True), default = func.now())
    last_modified=db.Column(db.DateTime(timezone = True), default = func.now())
    due_date = db.Column(db.DateTime(timezone = True))
    name = db.Column(db.String(100))
    description = db.Column(db.String(10000))
    completed = db.Column(db.Boolean, default = False)
    parent_task = db.Column(db.Integer, db.ForeignKey('task.id'))
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    board = db.Column(db.Integer, db.ForeignKey('board.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

