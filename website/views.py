from flask import Blueprint, render_template, request, flash, jsonify, sessions, redirect, abort
from flask_login import login_required, current_user
from sqlalchemy import desc
from .models import Note, Board, Category, Subtask, Task, Subtask, User
from . import db
import json
from datetime import datetime
views = Blueprint('views', __name__)

'''
This page is meant to guide through the website
'''
@views.route('/', methods=['GET'])
def home():
    return render_template("home.html", user = current_user)

'''
This is a summary Page meant to summarize upcoming tasks and their due dates
'''
@views.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    return render_template("dashboard.html", user=current_user)

'''
Settings and their modifications
'''

@views.route('/settings', methods=['GET'])
@login_required
def settings():
    return render_template("settings.html", user = current_user)

@views.route('/update-name', methods=['POST'])
@login_required
def update_name():
    nameData = json.loads(request.data)
    current_user.first_name = nameData['name']
    db.session.commit()
    return jsonify({})

@views.route('/update-email', methods=['POST'])
@login_required
def update_email():
    emailData = json.loads(request.data)
    current_user.email = emailData['newEmail']
    db.session.commit()
    return jsonify({})

@views.route('/update-colors', methods=['POST'])
@login_required
def update_colors():
    colorData = json.loads(request.data)
    for key in colorData:
        db_key = key.replace('-','_')
        setattr(current_user, db_key, colorData[key])
    db.session.commit()
    return jsonify({})

@views.route('/update-font', methods=['POST'])
@login_required
def update_font():
    fontData =json.loads(request.data)
    for key in fontData:
        db_key = 'font_'+key
        setattr(current_user, db_key, fontData[key])
    db.session.commit()
    return jsonify({})

'''
View modify and Delete Notes
'''

@views.route('/notes', methods=['GET', 'POST'])
@login_required
def notes():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is empty', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added', category='success')

    return render_template("notes.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
@login_required
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
    return jsonify({})

@views.route('/update-note', methods = ['POST'])
@login_required
def update_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    new_note_text = note['noteData']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            note.data = new_note_text
            note.last_modified = datetime.now()
            db.session.commit()
    return jsonify({})

@views.route('/toggle-note', methods = ['POST'])
@login_required
def toggle_note():
    note_data = json.loads(request.data)
    noteId = note_data['noteId']
    noteNewState = bool(note_data['complete'])
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            note.completed = noteNewState
            note.last_modified = datetime.now()
            db.session.commit()
    return jsonify({})

'''
List all of the Boards
'''

@views.route('/boards',methods = ['GET', 'POST'])
@login_required
def boards():
    if request.method == 'POST':
        board_name = request.form.get('board_name')
        
        if len(board_name) < 1:
            flash('Board Name Empty', category='error')    
        else:
            new_board = Board(name = board_name, category_num = 0,  user_id = current_user.id)
            db.session.add(new_board)
            db.session.commit()
            flash('Board Created', category = 'success')
    return render_template("boards.html", user = current_user)




'''
Below we view and edit the board information
'''

@views.route('/boards/<board>', methods = ['GET'])
@login_required
def view_board(board):
    return render_template("boardview.html", user = current_user, board = board)

@views.route('/boards/delete-board', methods=['POST'])
@login_required
def delete_board():
    boardobj = json.loads(request.data)
    boardId = boardobj['boardId']
    board = Board.query.get(boardId)
    if board:
        if board.user_id == current_user.id:
            for category in board.categories:
                for task in category.tasks:
                    db.session.delete(task)
                db.session.delete(category)
            db.session.delete(board)
            db.session.commit()
            flash('Board Deleted', category='success')
    return jsonify({})



@views.route('/boards/update-title', methods = ['POST'])
@login_required
def update_title():
    if request.method == 'POST':
        boardobj = json.loads(request.data)
        boardId = boardobj['boardId']
        boardname = boardobj['boardName']

        board = Board.query.get(boardId)
        if board:
            if board.user_id == current_user.id:
                if board.name != boardname:
                    board.name = boardname
                    db.session.commit()
                    flash('Name Changed', category='success')
    return redirect('/boards/'+str(board.name))


@views.route('/update-category-title', methods = ['POST'])
@login_required
def update_category_title():
    if request.method == 'POST':
        data = json.loads(request.data)
        categoryId = data['categoryId']
        boardId = data['boardId']
        title = data['newTitle']
        category = Category.query.get(categoryId)
        board = Board.query.get(boardId)
        if board:
            if category:
                if board.user_id == current_user.id:
                    category.name = title
                    db.session.commit()
    return redirect('/boards/<board>')

@views.route('/boards/add-category', methods =['POST'])
@login_required
def add_category():
    if request.method == 'POST':
        categoryobj = json.loads(request.data)
        boardId = categoryobj['boardId']
        categoryName = categoryobj['categoryName']
        board = Board.query.get(boardId)
        if board:
            if board.user_id == current_user.id:
                newCategory = Category(
                    name = categoryName, 
                    board_id = boardId,
                    user_id = current_user.id
                )
                db.session.add(newCategory)
                board.category_num += 1
                db.session.commit()
                flash('Category Created', category='success')
    return render_template("boardview.html", user = current_user, board = board)

@views.route('/delete-category', methods=['POST'])
@login_required
def delete_category():
    if request.method == "POST":
        data = json.loads(request.data)
        catId = data['catId']
        category = Category.query.get(catId)
        if category:
            if category.user_id == current_user.id:
                for task in category.tasks:
                    db.session.delete(task)
                db.session.delete(category)
                db.session.commit()
                flash('Category Deleted', category='success')
    return render_template("boardview.html", user= current_user)

@views.route('/boards/add-task', methods=['POST'])
@login_required
def add_task():
    if request.method == 'POST':
        taskobj = json.loads(request.data)
        boardId = taskobj['boardId']
        categoryId = taskobj['categoryId']
        taskName = taskobj['taskName']
        taskDescription = taskobj['taskDescription']
        taskDueDate = taskobj['taskDueDate']
        taskDueDate = datetime.strptime(taskDueDate, r'%Y-%m-%dT%H:%M')

        board = Board.query.get(boardId)
        category = Category.query.get(categoryId)
        if board and category:
            if board.user_id == current_user.id and category.user_id == current_user.id:
                newTask = Task(
                    name = taskName, 
                    description= taskDescription, 
                    due_date = taskDueDate, 
                    category = categoryId, 
                    board = boardId, 
                    user_id = current_user.id)
                db.session.add(newTask)
                db.session.commit()
                flash('Task Created', category='success')
    return redirect('/boards/'+str(board.name))

@views.route('/boards/<board>/<category>/<task>', methods= ['GET', 'POST'])
@login_required
def display_task(board, category, task):
    if request.method == 'POST':
        name = request.form.get("subtask-name")
        description = request.form.get("subtask-description")
        due = request.form.get("subtask-due")
        if due != '':
            due = datetime.strptime(request.form.get("subtask-due"), r"%Y-%m-%dT%H:%M")

            new_subtask = Subtask(
            due_date = due,
            name = name,
            description = description,
            parent_task = task,
            category = category,
            board = board,
            user_id = current_user.id
        )
        else:
            due = None

            new_subtask = Subtask(
            name = name,
            description = description,
            due_date = None,
            parent_task = task,
            category = category,
            board = board,
            user_id = current_user.id
        )
        
        db.session.add(new_subtask)
        db.session.commit()
        
    return render_template("taskview.html", user = current_user, board = board, category = category, task = task)
        
@views.route('/toggle-task-completion', methods=['POST'])
@login_required
def toggle_task():
    if request.method == 'POST':
        taskobj = json.loads(request.data)
        taskId = taskobj['taskId']
        taskCompleted =taskobj['complete']
        boardId = taskobj['boardId']
        board = Board.query.get(boardId)
        task = Task.query.get(taskId)
        if task:
            if task.user_id == current_user.id:
                task.completed = taskCompleted
                task.last_modified = datetime.now()
                db.session.commit()
    return jsonify({})

@views.route('/update-task', methods = ['POST'])
@login_required
def update_task_information():
    if request.method == 'POST':
        taskobj = json.loads(request.data)
        taskId = taskobj['taskId']
        new_data_type = taskobj['key']
        newData = taskobj['newData']
        task = Task.query.get(taskId)

        if task:
            if task.user_id == current_user.id:
                if new_data_type == 'title':
                    task.name = newData
                    task.last_modified = datetime.now()
                    db.session.commit()
                elif new_data_type == 'due-Date':
                    taskDueDate = datetime.strptime(newData, r'%Y-%m-%dT%H:%M')
                    task.due_date = taskDueDate
                    task.last_modified = datetime.now()
                    db.session.commit()
                elif new_data_type == 'description':
                    task.description = newData
                    task.last_modified = datetime.now()
                    db.session.commit()
    return render_template("taskview.html", user = current_user, task=task)

@views.route('/delete-task', methods = ['POST'])
@login_required
def delete_task():
    if request.method == 'POST':
        taskobj = json.loads(request.data)
        taskId = taskobj['taskId']
        task = Task.query.get(taskId)
        if task:
            if task.user_id == current_user.id:
                for subtask in task.subtasks:
                    db.session.delete(subtask)
                db.session.delete(task)
                db.session.commit()
                flash('Task Deleted', category='success')
    return render_template("boardview.html", user = current_user)



@views.route('/delete-subtask', methods = ['POST'])
@login_required
def delete_subtask():
    if request.method == 'POST':
        subtaskobj = json.loads(request.data)
        subtaskId = subtaskobj['subtaskId']
        subtask = Subtask.query.get(subtaskId)
        if subtask:
            if subtask.user_id == current_user.id:
                task = Task.query.get(subtask.parent_task)
                db.session.delete(subtask)
                db.session.commit()
                flash('Subtask Deleted', category='success')
    return render_template("taskview.html", user = current_user, task = task)

@views.route('/toggle-subtask-completion', methods=['POST'])
@login_required
def toggle_subtask():
    if request.method == 'POST':
        subtaskobj = json.loads(request.data)
        subtaskId = subtaskobj['subtaskId']
        subtaskCompleted =subtaskobj['complete']
        subtask = Subtask.query.get(subtaskId)
        if subtask:
            if subtask.user_id == current_user.id:
                task = Task.query.get(subtask.parent_task)
                subtask.completed = subtaskCompleted
                subtask.last_modified = datetime.now()
                db.session.commit()
    return jsonify({})

@views.route('/update-subtask', methods=['POST'])
@login_required
def update_subtask():
    if request.method == 'POST':
        subtaskobj = json.loads(request.data)
        subtaskId = subtaskobj['subtaskId']
        new_data_type = subtaskobj['key']
        newData = subtaskobj['newData']
        subtask = Subtask.query.get(subtaskId)
        url = subtaskobj['url']

        if subtask:
            if subtask.user_id == current_user.id:
                task = Task.query.get(subtask.parent_task)
                if new_data_type == 'title':
                    subtask.name = newData
                    subtask.last_modified = datetime.now()
                    db.session.commit()
                elif new_data_type == 'due-Date':
                    subtaskDueDate = datetime.strptime(newData, r'%Y-%m-%dT%H:%M')
                    subtask.due_date = subtaskDueDate
                    subtask.last_modified = datetime.now()
                    db.session.commit()
                elif new_data_type == 'description':
                    subtask.description = newData
                    subtask.last_modified = datetime.now()
                    db.session.commit()
    return render_template("taskview.html", user=current_user, task = task)