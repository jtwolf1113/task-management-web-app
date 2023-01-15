from website import create_app

def create_and_run(debug=True):
    app = create_app()
    app.run(debug = debug)

def create():
    app = create_app()
    return app

if __name__ == '__main__':
    create_and_run(debug = True)