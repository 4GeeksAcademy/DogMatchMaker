import click
from api.models import db, UserAccount

def setup_commands(app):
    """ 
    Add CLI commands here
    """
    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = UserAccount()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"  # Remember to hash passwords in production
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")
        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        # Implement test data insertion logic here
        print("Inserting test data...")
