from flask import Blueprint, render_template, request, flash, jsonify, sessions, redirect, abort
from flask_login import login_required, current_user
from .models import Note, Board, Category, Task
from . import db
import json

views = Blueprint('views', __name__)


'''
View modify and Delete Notes
'''

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is empty you silly goose!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added', category='success')

    return render_template("home.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
            flash('Note Deleted', category='success')

    return jsonify({})


@views.route('/ani',methods=['GET'])
def animation():
    return render_template("ani.html", user = current_user)

'''
List all of the Boards
'''

@views.route('/boards',methods = ['GET', 'POST'])
@login_required
def boards():
    if request.method == 'POST':
        board_name = request.form.get('board_name')
        num_categories = request.form.get('num_cats')

        if num_categories == '':
            num_categories = 0
        else: 
            num_categories = int(num_categories)
        
        if len(board_name) < 1:
            flash('Board Name Empty', category='error')    
        else:
            new_board = Board(name = board_name, category_num=num_categories, user_id = current_user.id)
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
    return render_template("boardview.html", user = current_user, board = board, edit_title = True)

@views.route('/boards/delete-board', methods=['POST'])
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
def edit_board():
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